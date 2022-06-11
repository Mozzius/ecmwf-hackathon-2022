## Stuart Evans
## Peak Over Threshold algorithm to detect storms based on signifcant wave height
# Storm Parameter Definitions:
# . Min Duration 3hrs
# . Max downtime between values over peak - 30hrs
# . Threshold - calculated based on having only 5% of all values above the threshold
# Expected input data is a pandas DataFrame with a header with format {variable_name}|{sensor_number}|{units}


######### REFACTOR TO USE HEADER CLASS
import pandas as pd
import scipy.cluster.hierarchy as hclust
import numpy as np


class RequiredHeaders:
    TIME_UNIX = "Time UNIX"
    WAVE_SIG_HEIGHT = "Wave Significant Height"
    WAVE_PEAK_PERIOD = "Wave Peak Period"
    WAVE_PEAK_DIRECTION = "Wave Peak Direction"
    WIND_U_10 = "Wind 10min Ave at 10m "
    WIND_DIRECTION = "Wind Direction"


class POT:
    ## Constants

    # Storm threshold parameter 0-1
    STORM_THRESHOLD_PARAMETER = 0.95

    ## Unix time conversions
    # Seconds in hour
    SECONDS_IN_HOUR = 3600

    # Storm duration parameters
    # Min duration is 3 hours
    MIN_STORM_DURATION = 3 * SECONDS_IN_HOUR

    # Max downtime between values above threshold in a storm
    MAX_STORM_DOWNTIME = 30 * SECONDS_IN_HOUR

    def __init__(self):
        super().__init__()

    def readCSV(self, csv_path):
        # Read in the given csv to a pandas DataFrame and return the frame and fill any NaN with 0
        return pd.read_csv(csv_path)

    def calcThreshold(self, data):
        ## Determine the threshold which will mean only 5% of significant wave height will be above the threshold

        # Use the pandas quantile method to return the values above the specficed qualtile store the value in a list
        threshold_list = []
        threshold_list.append(
            data[RequiredHeaders.WAVE_SIG_HEIGHT].quantile(
                self.STORM_THRESHOLD_PARAMETER
            )
        )

        # Average the values in the list and then return the threshold value
        return sum(threshold_list) / len(threshold_list)

    def peakOverThresholdStorms(self, data, threshold):
        # Return a list of pairs of timestamps where data between the indicies is a storm event.

        # 2D List to store the indicies  for the storm start and end [[(start,end)],[(start,end)]]

        # POT for storms
        # Get the number of rows
        num_rows = len(data)

        # Dictionary to store start and end indicies for each wave column {<column1>:[(start,end),(start,end)], <column2>:[(start,end),(start,end)]}
        storm_start_end_list = []

        # Step through each row if the value at the row and wave header is greaterthan or equal to the threshold
        # record the timestamp and check if there are more values above the threshold within 30 hours and for a minimum of 3 hours

        # Duration and downtime of the currently assessd event in seconds
        duration_seconds = 0
        downtime_seconds = 0

        # Index of first value over threshold
        start_row = 0

        # Current row
        cur_row = 0
        while cur_row < num_rows:
            # If the current value is above the threshold  start checking the other values
            if data[RequiredHeaders.WAVE_SIG_HEIGHT][cur_row] >= threshold:
                # Mark the index of the start time
                start_row = cur_row

                # increment to the next row
                cur_row += 1

                # Continue loop through rows until value is below threshold for more than 30 hours
                while (data[RequiredHeaders.WAVE_SIG_HEIGHT][cur_row] >= threshold) or (
                    downtime_seconds <= self.MAX_STORM_DOWNTIME
                ):

                    # Check if the value is above the threshold
                    # if true store the time difference between the first index and the current index to the duration and reset downtime
                    # if false store the time difference between the first index and the current idnexto the downtime
                    if data[RequiredHeaders.WAVE_SIG_HEIGHT][cur_row] >= threshold:
                        duration_seconds = int(
                            data[RequiredHeaders.TIME_UNIX][cur_row]
                        ) - int(data[RequiredHeaders.TIME_UNIX][start_row])
                        downtime_seconds = 0
                    else:
                        downtime_seconds = int(
                            data[RequiredHeaders.TIME_UNIX][cur_row]
                        ) - int(data[RequiredHeaders.TIME_UNIX][start_row])

                    # Increment the current row
                    cur_row += 1

                    # If the new row index is greater than the number of rows decremnt the current row and break from the loop
                    if cur_row >= num_rows:
                        cur_row -= 1
                        break

                # Check the parameters of the event are correct if they are store the start and end indicies in the dictionary array for the header
                if (
                    duration_seconds >= self.MIN_STORM_DURATION
                    and downtime_seconds >= self.MAX_STORM_DOWNTIME
                ):
                    storm_start_end_list.append((start_row, cur_row))

            cur_row += 1
            duration_seconds = 0
            downtime_seconds = 0
        return storm_start_end_list

    def runPOT(self, data_frame):
        # Run the POT algorithm and return an nparray of pandas dataframes with each dataframe being a single storm event

        # Store the dirctionary output from the POT algorithm
        storms_list = self.peakOverThresholdStorms(
            data_frame, self.calcThreshold(data_frame)
        )

        self.pot_progress_update.emit("Extracting Storms")

        # Create an empty numpy array the same size as the dictionary key
        storm_array = []

        # Extract the data between the timestamps in the storms dictionary and put into a temp dataframe
        # Then insert the generated dataframe into the storm_array
        for num, j in enumerate(storms_list):

            storm_array.append(data_frame[j[0] : j[1]])

            # Reset the index of the data array to start from 0
            storm_array[num] = storm_array[num].reset_index()

        return storm_array

    def runPOTCSV(self, file_path=""):
        # Run the POT algorithm if only a file path is given
        return self.runPOT(pd.read_csv(file_path))

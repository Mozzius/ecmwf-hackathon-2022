import netCDF4
import pandas as pd
import numpy as np


def find_closest_lat_lon_index(lat,lon,lat_arr,lon_arr):
    lat_ind = (np.abs(lat_arr - lat)).argmin()
    lon_ind = (np.abs(lon_arr - lon)).argmin()
    return lat_ind,lon_ind

def extract_data(file_path,lat,lon):
    ## Extracts the u10,v10 by time and location returns an array of pandas dataframes for each coord pair
    
    MET_VARIABLES = ["u10","v10"]
    
    # Open the file
    f = netCDF4.Dataset(file_path, "r")
    # Print the data
    print(f)
    
    # Get arrays of lat and lon
    lat_arr = f.variables["latitude"][:]
    lon_arr = f.variables["longitude"][:]
    time_arr = f.variables["time"][:]
    
    lat_ind,lon_ind = find_closest_lat_lon_index(lat,lon,lat_arr,lon_arr)
    print("Closest location in data to {0}N{1}E = {2}N{3}E".format(lat,lon,lat_arr[lat_ind],lon_arr[lon_ind]))
    
    print("Num locations = {0} * {1} = {2}".format(len(lat_arr),len(lon_arr),len(lat_arr) * len(lon_arr)))
        
    return_df = pd.DataFrame({"time":time_arr})
    for var in MET_VARIABLES:
        #print("Lat index: {0} | Lon index: {1}\n\n".format(lat_ind,lon_ind))
        
        return_df[var] = f.variables[var][0:int(len(time_arr)),(lat_ind):(lat_ind+1),(lon_ind):(lon_ind+1)].flatten()
    
    # Close the file
    f.close()
    
    return return_df
    
if __name__ == "__main__":
    LAT = 40.0
    LON = 0.0
    data_frame = extract_data("wind-data.nc",LAT,LON)
    data_frame.to_csv("extracted_wind_{0}N{0}E.csv".format(LAT,LON))
    print(data_frame.head())



import netCDF4
import pandas as pd
import numpy as np
import math

import plots

import datetime as dt

def find_closest_lat_lon_index(lat,lon,lat_arr,lon_arr):
    lat_ind = (np.abs(lat_arr - lat)).argmin()
    lon_ind = (np.abs(lon_arr - lon)).argmin()
    return lat_ind,lon_ind

def extract_data(file_path,lat,lon):
    ## Extracts the u10,v10 by time and location returns an array of pandas dataframes for each coord pair
    
    MET_VARIABLES = ["u10","v10","i10fg"]
    
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
        print(f.variables[var])
        return_df[var] = f.variables[var][0:int(len(time_arr)),(lat_ind):(lat_ind+1),(lon_ind):(lon_ind+1)].flatten()
    
    # Close the file
    f.close()
    
    return return_df

def convertU10V10toSpdDir(pandas_df):
    # inplace convert u10 & v10 to wind speed and direction
    #pandas_df["wind_speed"] = math.sqrt(math.pow(pandas_df["u10"],2) * math.pow(pandas_df["v10"],2))
    #pandas_df["wind_dir_rad"] = math.fmod(360.0+math.atan2(pandas_df["u10"],pandas_df["v10"]),360)
    print(pandas_df.shape)
    
    tmp_wind_speed = np.zeros(shape=(pandas_df.shape[0]))
    tmp_wind_dir = np.zeros(shape=(pandas_df.shape[0]))
    
    for j in range(pandas_df.shape[0]):
        tmp_wind_speed[j] = math.sqrt(math.pow(pandas_df.at[j,"u10"],2) * math.pow(pandas_df.at[j,"v10"],2))
        tmp_wind_dir[j] = math.fmod(360.0+math.atan2(pandas_df.at[j,"u10"],pandas_df.at[j,"v10"]),360)
    pandas_df["wind_speed"] = tmp_wind_speed
    pandas_df["wind_dir_rad"] = tmp_wind_dir
    
    return pandas_df   

def hoursSinceEPOCHtoUNIX(days,YEAR="1900"):
    tmp = dt.timedelta(days,0,0,0)
    return tmp + dt.strptime(YEAR,"%Y")
    
    
if __name__ == "__main__":
    LAT = 18.53
    LON = -72.3
    data_frame = extract_data("wind-data-gust-monthly-haiti.nc",LAT,LON)
    #data_frame.to_csv("extracted_wind_{0}N{0}E.csv".format(LAT,LON))
    data_frame = convertU10V10toSpdDir(data_frame)
    #data_frame.to_csv("extracted_wind_with_spd_dir_monthly_{0}N{1}E.csv".format(LAT,LON))
   
    speed_ave = np.mean(data_frame["i10fg"].to_numpy())
    print("Wind speed average:", speed_ave)
    dev_from_ave = np.zeros(shape=len(data_frame["wind_speed"]))
    for i in range(len(dev_from_ave)):
        dev_from_ave[i] = -math.exp(speed_ave - data_frame.at[i,"i10fg"])
    data_frame["wind_spd_dev_from_ave"] = dev_from_ave
    print(data_frame.head())
    
    plots.plotExportDirPolar(data_frame["time"].to_numpy(),
                            data_frame["wind_dir_rad"].to_numpy(),#np.ones(shape=(len(data_frame["time"]))),
                            data_frame["wind_spd_dev_from_ave"].to_numpy(),
                            file_name= "WindGusts_80-22.svg")
    
    """plots.plotExportHorizontalBarCode(data_frame["time"].to_numpy(),
                                      data_frame["wind_dir_rad"].to_numpy(),#np.ones(shape=(len(data_frame["time"]))),
                                    data_frame["wind_spd_dev_from_ave"].to_numpy())    
    """
    
    nat_dis_df = pd.read_csv("ALL_NAT_DIS.CSV")
    base = np.quantile(nat_dis_df["Number of Dis"].to_numpy(),[0.95])
    print("baseline", base)
    dev_from_q = np.zeros(shape=len(nat_dis_df["Number of Dis"]))
    for i in range(len(dev_from_q)):
        dev_from_q[i] = -(base - nat_dis_df.at[i,"Number of Dis"])
    nat_dis_df["dev_from_quant"] = dev_from_q
    plots.plotExportDirPolar(nat_dis_df["Year"].to_numpy(),
                             nat_dis_df["Number of Dis"].to_numpy(),
                             nat_dis_df["dev_from_quant"].to_numpy(),
                             file_name="ALL_NAT_DIS.svg")
    



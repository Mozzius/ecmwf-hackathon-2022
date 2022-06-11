import netCDF4

if __name__ == "__main__":
    # Open the file
    f = netCDF4.Dataset("data.nc", "r")
    # Print the data
    print(f)
    print(f.variables["data"][:])
    # Close the file
    f.close()

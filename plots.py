import matplotlib.pyplot as mpl
import cmocean

def plotExportDirPolar(x,y,z,color_bar=False):
    # generate and export to svg a polar plot of a directriona spectra sa given by the spectra data
    # Use the cmoceon package for the colourmaps
    axes = mpl.figure.add_subplot(projection="polar")

    
    
    cs = axes.contourf(x,y,z,100,cmap=cmocean.cm.dense)
    
    axes.set_theta_zero_location("N")
    axes.set_theta_direction(-1)
    
    if color_bar:
        c_bar = mpl.figure.colorbar(cs)
        c_bar.ax.set_xlabel("Wind Magnitude")
        

def plotExportHorizontalBarCode(x,y,z):
    axes = mpl.figure.add_subplot()
    
    

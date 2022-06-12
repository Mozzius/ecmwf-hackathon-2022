import matplotlib.pyplot as mpl
import cmocean
import numpy as np

def plotExportDirPolar(x,y,z,color_bar=False):
    # generate and export to svg a polar plot of a directriona spectra sa given by the spectra data
    # Use the cmoceon package for the colourmaps
    #axes = mpl.figure.add_subplot(projection="polar")
    figure = mpl.figure()
    axes = figure.add_subplot()
    #axes2 = figure.add_subplot()
    
    newcmap = cmocean.tools.crop_by_percent(cmocean.cm.balance, 20, which="both", N=None)
    
    x2d,y2d = np.meshgrid(x,y)
    z2d_1,z2d_2 = np.meshgrid(z,z)
                   
    
    #cs = axes.contourf(x,y,z,100,cmap=newcmap)
    cs = axes.pcolormesh(x2d,y2d,z2d_1,cmap=newcmap)
    #cs2 = axes2.pcolormesh(x2d,y2d,z2d_2,cmap=newcmap)
    #cs = axes.scatter(x,y,z,cmap=newcmap)
    
    #axes.set_theta_zero_location("N")
    #axes.set_theta_direction(-1)
    
    if color_bar:
        c_bar = mpl.figure.colorbar(cs)
        c_bar.ax.set_xlabel("Wind Magnitude")
        
    mpl.show()
        

def plotExportHorizontalBarCode(x,y,z):
    figure = mpl.figure()
    axes = figure.add_subplot()#projection="polar")
    
    newcmap = cmocean.tools.crop_by_percent(cmocean.cm.balance, 20, which="both", N=None)
    
    axes.tripcolor(x,y,z,cmap=newcmap)
    #axes.tricontourf(x,y,z,cmap=newcmap)
    axes.get_xaxis().set_visible(False);
    axes.get_yaxis().set_visible(False);
    
    
    
    mpl.show()
    
    

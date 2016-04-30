def setAxis(ax=None):
    # If no axis is explicitly sent, use the current axis
    if ax==None:
        curAxis = gca()
        #print "No Axis found using current axis in memory", curAxis
    else:
        curAxis = ax
        sca(ax)
    #sca(curAxis)
    return curAxis

def setXLim(Xs, xLims=None, minScale=0.9, maxScale=1.1, ax=None):
    setAxis(ax)
    sca(ax)
    if type(xLims)==str:
        if xLims=="N":
            xlim(Xs.min()*minScale, 0)
        elif xLims=="P":
            xlim(0, Xs.max()*maxScale)
        elif xLims=='NP' or xLims=='PN':
            xlim(Xs.min()*minScale, Xs.max()*maxScale)
    elif type(xLims)==tuple:
        xlim(xLims)

def setYLim(Ys, yLims=None, minScale=0.9, maxScale=1.1, ax=None):
    setAxis(ax)
    sca(ax)
    if type(yLims)==str:
        if yLims=="N":
            ylim(Ys.min()*minScale, 0)
        elif yLims=="P":
            ylim(0, Ys.max()*maxScale)
        elif yLims=='NP' or yLims=='PN':
            ylim(Ys.min()*minScale, Ys.max()*maxScale)
    elif type(yLims)==tuple:
        ylim(yLims)

def plotXY(Xs, Ys, marker='.', lineStyle='', ttl="Y vs X", xLbl="X", yLbl="Y", pltLbl=None,
           color=(1,0,0), fntSz=16, xLims=None, yLims=None, ax=None):
    ax = setAxis(ax)
    # Determine whether or not there are multiple columns worth of (x,y) plots.
    # If so, color code the plots from blue to red, otherwise, use the input color
    if len(shape(Ys))>1 and shape(Ys)[1]>1:
        numCols = shape(Ys)[1]
        for i in range(numCols):
            ax.plot(Xs, Ys.T[i], marker=marker, linestyle=lineStyle, label=pltLbl,
                    color=(1.*i/(numCols-1), 0, 1.-(1.*i/(numCols-1))))
    else:
        ax.plot(Xs, Ys, marker=marker, linestyle=lineStyle, label=pltLbl, color=color)
    sca(ax)
    xlabel(xLbl, fontsize=fntSz)
    ylabel(yLbl, fontsize=fntSz)
    setXLim(Xs, xLims, minScale=0.9, maxScale=1.1, ax=ax)
    setYLim(Ys, yLims, minScale=0.9, maxScale=1.1, ax=ax)
    title(ttl, fontsize=fntSz-4)

def plotXlogY(Xs, Ys, marker='.', lineStyle='', ttl="Log[Y] vs X", xLbl="X", yLbl="Log[Y]", pltLbl=None,
              color=(1,0,0), fntSz=16, xLims=None, yLims=None, ax=None):
    ax = setAxis(ax)
    # Determine whether or not there are multiple columns worth of (x,y) plots.
    # If so, color code the plots from blue to red, otherwise, use the input color
    if len(shape(Ys))>1 and shape(Ys)[1]>1:
        numCols = shape(Ys)[1]
        for i in range(numCols):
            ax.semilogy(Xs, Ys.T[i], marker=marker, linestyle=lineStyle, label=pltLbl,
                        color=(1.*i/(numCols-1), 0, 1.-(1.*i/(numCols-1))))
    else:
        ax.semilogy(Xs, Ys, marker=marker, linestyle=lineStyle, label=pltLbl, color=color)
    sca(ax)
    xlabel(xLbl, fontsize=fntSz)
    ylabel(yLbl, fontsize=fntSz)
    setXLim(Xs, xLims, minScale=0.1, maxScale=10, ax=ax)
    setYLim(Ys, yLims, minScale=0.1, maxScale=10, ax=ax)
    title(ttl, fontsize=fntSz-4)

def plotlogXlogY(Xs, Ys, marker='.', lineStyle='', ttl="Log[Y] vs Log[X]", xLbl="Log[X]", yLbl="Log[Y]",
                 pltLbl=None, color=(1,0,0), fntSz=16, xLims=None, yLims=None, ax=None):
    ax = setAxis(ax)
    # Determine whether or not there are multiple columns worth of (x,y) plots.
    # If so, color code the plots from blue to red, otherwise, use the input color
    if len(shape(Ys))>1 and shape(Ys)[1]>1:
        numCols = shape(Ys)[1]
        for i in range(numCols):
            ax.loglog(Xs, Ys.T[i], marker=marker, linestyle=lineStyle, label=pltLbl,
                      color=(1.*i/(numCols-1), 0, 1.-(1.*i/(numCols-1))))
    else:
        ax.loglog(Xs, Ys, marker=marker, linestyle=lineStyle, label=pltLbl, color=color)
    sca(ax)
    xlabel(xLbl, fontsize=fntSz)
    ylabel(yLbl, fontsize=fntSz)
    setXLim(Xs, xLims, minScale=0.1, maxScale=10, ax=ax)
    setYLim(Ys, yLims, minScale=0.1, maxScale=10, ax=ax)
    title(ttl, fontsize=fntSz-4)

# This function plots the derivative of any data set.
def plotDeriv(Xs, Ys, marker='.', lineStyle='', ttl="dY/dX vs X", xLbl='X', yLbl='dY/dX', pltLbl=None,
              color=(1,0,0), fntSz=16, xLims=None, yLims=None, ax=None):
    ax = setAxis(ax)
    dYs = diff(Ys)
    dXs = diff(Xs)
    ax.plot(elementWiseAvg(Xs), dYs/dXs, marker=marker, linestyle=lineStyle, label=pltLbl, color=color)
    sca(ax)
    xlabel(xLbl, fontsize=fntSz)
    ylabel(yLbl, fontsize=fntSz)
    setXLim(Xs, xLims, minScale=0.9, maxScale=1.1, ax=ax)
    setYLim(dYs, yLims, minScale=0.9, maxScale=1.1, ax=ax)
    title(ttl, fontsize=fntSz-4)
    return dYs/dXs

# Plot a histogram of the gmOverId values to see what value I should be using for my maximum
def plotHist(Xs, numBins=100, ttl=r'$Histogram$', color=(1,0,0),
             xLbl=r'Xs', yLbl=r'Count', pltLbl=None, fntSz=16, ax=None):
    ax = setAxis(ax)
    # Determine whether or not there are multiple columns worth of (x,y) plots.
    # If so, color code the plots from blue to red, otherwise, use the input color
    if len(shape(Xs))>1 and shape(Xs)[1]>1:
        numCols = shape(Xs)[1]
        for i in range(numCols):
            ax.hist(Xs.T[i], bins=numBins, label=pltLbl,
                    color=(1.*i/(numCols-1), 0, 1.-(1.*i/(numCols-1))), alpha=0.5,
                    histtype="stepfilled")
    else:
        ax.hist(Xs, bins=numBins, label=pltLbl, color=color, alpha=0.5, histtype="stepfilled")
    (cnts, binBoundaries) = histogram(Xs, numBins)
    sca(ax)
    xlabel(xLbl, fontsize=fntSz)
    ylabel(yLbl, fontsize=fntSz)
    ylim([cnts.min(), cnts.max()*1.1])
    title(ttl)
    return cnts, binBoundaries

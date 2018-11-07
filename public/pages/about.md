### Guide

The clothsography shows most [Outlier](http://www.outlier.cc) releases made in the period from April 2011 to {this.props.endmonth} {this.props.endyear}, and a few from earlier as well.

To focus on certain kinds of items, turn on one or more of the filters from the top left. For example, to see just shirts released in the summer, click on **Filters** and select **Category/Shirts** **Season/Summer**.

Click on an individual item to see details about that product.

#### UI Elements

**Filters**

![filters ui](/images/filters.png)

Filters can be used to focus on certain kinds of product. The filter buttons toggle on when clicked and toggle off when clicked again. Filters for garment type (e.g., hoodie, vest, shorts, etc.) and fabric are turned on by finding the desired type from the list. More than one garment or fabric filter can be turned on, but you may need to hit the down arrow to see the list.The garment type list is sorted alphabetically, the fabric list is sorted by frequency of occurrence.

**Histograms**

![season histogram](/images/season.png) ![month histogram](/images/month.png) ![price histogram](/images/price.png)

These histograms show the number of drops for each season, month, or price-range bin, respectively.

**Release Gap**

![release-gap histogram](/images/release-gap.png)

The release-gap view shows the historical number of weeks between drops of products grouped by year. Each dot represents the number of weeks since the previous drop. The size of the dot represents number of times two drops were separated by that many weeks.


### Data Sources

The data on release dates is from [Milled/Outlier](http://milled.com/outlier), [twitter](https://twitter.com/outlier), [reddit](https://reddit.com/r/outlier); price data is mostly from the Outlier web site; any mistakes are mine alone. If you spot something, let [me (@ciyer) know](https://twitter.com/ciyer).

### Code
The code is available on [GitHub](https://github.com/ciyer/outlier), in particular the data is available as [outlier-data.csv](https://github.com/ciyer/outlier/blob/master/public/outlier-data.csv)

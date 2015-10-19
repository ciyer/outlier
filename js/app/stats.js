/**
 *  Independent Outlier Archive
 *
 *  Copyright (c) 2014-2015 Chandrasekhar Ramakrishnan
 *
 *  Released under GPL license.
 */

 /**
  * Implementation of the component that displays stats about the selected releases.
  */
define(["d3", "react"], function(d3, React) {

  var dateFormat = d3.time.format("%Y-%m-%d");
  function unpack(d) { return d;}
  var msInWeekRecip = 1 / (60 * 60 * 24 * 7 * 1000);

  function drawChart(container, props, hist, bins, labels) {

    var margin = props.chartMargin;
    var numBins = bins.length - 1;
    var width = props.chartWidth, height = props.chartHeight;

    var blockWidth = Math.floor(width / numBins);
    var y = d3.scale.linear()
      .domain([0, d3.max(hist, function(d) { return d.y })])
      .range([height, 0]);
    var svg = container.selectAll("svg").data([0]);
    svg.enter().append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var barg = svg.selectAll("g.bar")
      .data(hist);
    barg.enter()
      .append("g")
        .attr("class", "bar")
        .attr("transform", function(d, i) { return "translate(" + (i * blockWidth) + "," + y(d.y) + ")"; });
    barg.transition().duration(1000)
      .attr("transform", function(d, i) { return "translate(" + (i * blockWidth) + "," + y(d.y) + ")"; });

    var bar = barg.selectAll("rect")
      .data(function(d) { return [d] });
    bar.enter()
      .append("rect")
      .attr("x", 1)
      .attr("y", function(d) { return height - y(d.y) })
      .attr("width", blockWidth - 1)
      .attr("height", 1);
    bar.transition().duration(1000)
      .attr("y", 0)
      .attr("height", function(d) { return height - y(d.y) });

    var textData = labels.map(function(d, i) { return {bar: hist[i], label: d} });
    var textg = svg.selectAll("g.graphlabel")
      .data(textData);

    var shouldRotate = labels[0].length > 2;
    function textTransform(d, i) {
      var yTranslate = (height - 2);
      var xTranslate = blockWidth * (i + 0.5);
      if (shouldRotate) xTranslate += 4;
      return "translate(" + xTranslate + "," + yTranslate + ")";
    }

    var textgEnter = textg.enter().append("g")
      .attr("class", "graphlabel")
      .attr("transform", textTransform);

  //  TODO CHART FILTERING
  //    .on("click", function(d, i) { console.log(hist); });

    var text = textg.selectAll("text")
      .data(function(d, i) { return [d] });
    var textEnter = text.enter()
        .append("text");
    (shouldRotate) ?
      textEnter.attr("transform", "rotate(-90)") :
      textEnter.attr("text-anchor", "middle");

    text.text(function(d) { return d.label });
  };

  function statusElementDom(name, subs) {
    // Key is necessary to keep react from complaining
    var title = React.DOM.h4({key: "title"}, name);
    var statElts = subs.map(function(s) { return React.DOM.span({id: s, key: s}) });
    statElts.unshift(title);
    return React.DOM.div({className: 'col-xs-2 col-md-2', style: {width: '110px'}}, statElts);
  }

  function statusElementDomAsDiv(name, subs) {
    // Key is necessary to keep react from complaining
    var title = React.DOM.h4({key: "title"}, name);
    var statElts = subs.map(function(s) { return React.DOM.div({id: s, key: s}) });
    statElts.unshift(title);
    return React.DOM.div({className: 'col-xs-4 col-md-4', style: {width: '110px'}}, statElts);
  }

  var PriceStatsClass = React.createClass({
    displayName: 'PriceStats',
    drawPriceInfo: function(products, allProducts, priceContainer, priceMedianContainer) {
      function pricesToConsider(list) {
        return list
          .filter(function(d) { return "FALSE" == d["Historic"]})
          .map(function(d) { return d["Price"] })
          .filter(function(d) { return d > 0 });
      }
      var prices = pricesToConsider(products);
      var sortedPrices = prices.sort(d3.ascending);
      var allPrices = pricesToConsider(allProducts);
      var allSortedPrices = allPrices.sort(d3.ascending);

      var quartiles = [0.0, 0.25, 0.5, 0.75, 1.0];
      var quintiles = [0.0, 0.2, 0.4, 0.6, 0.8, 1.0];
      var bins = quintiles.map(function(q) { return d3.quantile(allSortedPrices, q) - 1 });
      bins[bins.length - 1] = bins[bins.length - 1] + 1;
      var hist = d3.layout.histogram().bins(bins)(sortedPrices);
      var labels = [];
      var numberFormat = d3.format(".0f")
      bins.reduce(function(prev, next) { labels.push("$" + numberFormat(prev) + " - " + (numberFormat(next) - 1)); return next; });

      drawChart(priceContainer, this.props, hist, bins, labels);

      var median = d3.median(prices);
      median = d3.format("3.0f")(median);
      var medianContainer = priceMedianContainer.data([median]);
      medianContainer.text(function(d) { return "Median: $" + d });
    },

    componentDidMount: function() {
      // Just update the component
      this.componentDidUpdate();
    },

    componentDidUpdate: function() {
      var products = this.props.products;
      var allProducts = this.props.presenter.allProducts;

      this.drawPriceInfo(products, allProducts, d3.select("#price-container"), d3.select("#price-median-container"));
    },

    render: function() {
      return statusElementDom("Price", ["price-container", "price-median-container"])
    }
  });
  var PriceStats = React.createFactory(PriceStatsClass);

  var MonthStatsClass = React.createClass({

    displayName: 'MonthStats',

    drawMonthInfo: function(products, monthContainer) {
      function monthsToConsider(list) {
        return list
          .filter(function(d) { return "FALSE" == d["Historic"] && null != d.releaseDate})
          .map(function(d) { return d.releaseDate.getMonth() });
      }
      var labels = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"]
      var months = monthsToConsider(products);
      var bins = [0,1,2,3,4,5,6,7,8,9,10,11,12];
      var hist = d3.layout.histogram().bins(bins)(months);
      drawChart(monthContainer, this.props, hist, bins, labels);
    },

    componentDidMount: function() {
      // Just update the component
      this.componentDidUpdate();
    },

    componentDidUpdate: function() {
      var products = this.props.products;

      this.drawMonthInfo(products, d3.select("#month-container"));
    },

    render: function() {
      return statusElementDom("Month", ["month-container"]);
    }
  });
  var MonthStats = React.createFactory(MonthStatsClass);

  var SeasonStatsClass = React.createClass({

    displayName: 'SeasonStats',

    drawMonthInfo: function(products, seasonContainer) {
      function seasonsToConsider(list) {
        // Maps months to seasons
        return list
          .filter(function(d) { return "FALSE" == d["Historic"] && null != d.releaseDate})
          .map(function(d) { return d.releaseDate.getMonth() })
          .map(function(d) {
            if (d < 2)
              return 0; // Jan, Feb -> Winter
            if (d < 5)
              return 1; // Mar, Apr, May -> Spring
            if (d < 8)
              return 2; // Jun, Jul, Aug -> Summer
            if (d < 11)
              return 3; // Sep, Oct, Nov -> Fall
            return 0; // Dec -> Winter
          });
      }
      var labels = ["W", "S", "S", "F"]
      var seasons = seasonsToConsider(products);
      var bins = [0,1,2,3,4];
      var hist = d3.layout.histogram().bins(bins)(seasons);
      drawChart(seasonContainer, this.props, hist, bins, labels);
    },

    componentDidMount: function() {
      // Just update the component
      this.componentDidUpdate();
    },

    componentDidUpdate: function() {
      var products = this.props.products;

      this.drawMonthInfo(products, d3.select("#season-container"));
    },

    render: function() {
      return statusElementDom("Season", ["season-container"]);
    }
  });
  var SeasonStats = React.createFactory(SeasonStatsClass);

  var WeekdayStatsClass = React.createClass({
    displayName: 'WeekdayStats',
    drawWeekdayInfo: function(products, weekdayContainer) {
      function daysToConsider(list) {
        return list
          .filter(function(d) { return "FALSE" == d["Historic"] && null != d.releaseDate})
          .map(function(d) { return d.releaseDate.getDay() });
      }

      var labels = ["S", "M", "T", "W", "T", "F", "S"];
      var days = daysToConsider(products);
      var bins = [0,1,2,3,4,5,6,7];
      var hist = d3.layout.histogram().bins(bins)(days);
      drawChart(weekdayContainer, this.props, hist, bins, labels);
    },

    // CHART FILTERING -- Use this version of draw weekday info to get the actual items as the data in the histogram
    drawWeekdayInfoValuer: function(products, weekdayContainer) {
      function daysToConsider(list) {
        return list
          .filter(function(d) { return "FALSE" == d["Historic"] && null != d.releaseDate});
      }

      function valuer(d) { return d.releaseDate.getDay(); }

      var labels = ["S", "M", "T", "W", "T", "F", "S"];
      var days = daysToConsider(products);
      var bins = [0,1,2,3,4,5,6,7];
      var hist = d3.layout.histogram().value(valuer).bins(bins)(days);
      drawChart(weekdayContainer, this.props, hist, bins, labels);
    },

    componentDidMount: function() {
      // Just update the component
      this.componentDidUpdate();
    },

    componentDidUpdate: function() {
      var products = this.props.products;
      this.drawWeekdayInfo(products, d3.select("#weekday-container"));
    },

    render: function() {
      return statusElementDom("Weekday", ["weekday-container"]);
    }
  });
  var WeekdayStats = React.createFactory(WeekdayStatsClass);

  var FrequencyStatsClass = React.createClass({

    displayName: 'FrequencyStats',

    drawFrequencyInfo: function() {

      function drawNotEnoughInfo() {
        d3.select("#releases-per-year").style("font-size", "9pt").text("Not enough data.");
        d3.select("#avg-gap").text("");
        d3.select("#avg-dev").text("");
        if (products.length > 0) {
          d3.select("#last-release")
            .style("font-size", "9pt")
            .text("Last: " + dateFormat(products[0].releaseDate));
        } else {
          d3.select("#last-release").text("");
        }
      }

      var cutoffDate = dateFormat.parse("2013-01-01");
      var products =
        this.props.products.filter(function(d, i, a) {
          if ("TRUE" == d["Historic"]) return false;
          if (null == d.releaseDate) return false;
          if (i > 0) {
            // Ignore situations where the same product is re-released within two weeks.
            var n = a[i - 1]
            if (  (n["Product"] == d["Product"]) &&
                  ((n.releaseDate - d.releaseDate) * msInWeekRecip < 2)) {
              return false;
            }
          }
          return d.releaseDate > cutoffDate;
      });
      if (products.length < 3) {
        drawNotEnoughInfo();
        return;
      }
      // These are already sorted
      var last = products[0].releaseDate;
      var productMaxIdx = products.length - 1
      var first = products[productMaxIdx].releaseDate;
      var numWeeks = (last - first) * msInWeekRecip
      if (numWeeks > 52) {
        var numberFormat = d3.format(".2f");
        // Use the max index in the calculations below because 1 release per year
        // means you would see two releases in 365 days
        d3.select("#releases-per-year")
          .style("font-size", "9pt")
          .text("Per Year: " + numberFormat(productMaxIdx / (numWeeks / 52.0)));
        var avgGap = numWeeks / productMaxIdx;
        numberFormat = d3.format(".1f");
        d3.select("#avg-gap")
          .style("font-size", "9pt")
          .text("Avg Gap: " + numberFormat(avgGap) + "w");
        var devs = [];
        products.reduce(function(b, a) {
          var gap = (b.releaseDate - a.releaseDate) * msInWeekRecip;
          devs.push(Math.abs(gap - avgGap));
          return a });
        d3.select("#avg-dev")
          .style("font-size", "9pt")
          .text("(+/- " + numberFormat(d3.mean(devs)) + "w" + ")");
          d3.select("#last-release")
            .style("font-size", "9pt")
            .text("Last: " + dateFormat(products[0].releaseDate));
      } else {
        drawNotEnoughInfo();
      }
    },

    componentDidMount: function() {
      // Just update the component
      this.componentDidUpdate();
    },

    componentDidUpdate: function() {
      this.drawFrequencyInfo();
    },

    render: function() {
      return statusElementDomAsDiv("Frequency", ["releases-per-year", "avg-gap", "avg-dev", "last-release"]);
    }
  });
  var FrequencyStats = React.createFactory(FrequencyStatsClass);

  var StatsClass = React.createClass({
    displayName: 'Stats',
    render: function() {
      var stats = [
        PriceStats(_.extend({key: 'priceStats'}, this.props)),
        SeasonStats(_.extend({key: 'seasonStats'}, this.props)),
        MonthStats(_.extend({key: 'monthStats'}, this.props)),
        WeekdayStats(_.extend({key: 'weekdayStats'}, this.props)),
        FrequencyStats(_.extend({key: 'frequencyStats'}, this.props))
      ];
      var statsGroup = React.DOM.div({key: 'statsGroup', className:'row'}, stats);
      var title = React.DOM.h3({key: 'statsTitle'}, 'Stats');
      var column = React.DOM.div({key: 'statusCol', className: 'col-xs-8 col-md-8'}, [title, statsGroup]);
      return column;
    }
  });
  var Stats = React.createFactory(StatsClass);

  return {
    Stats: Stats,
    SeasonStats: SeasonStats,
    MonthStats: MonthStats,
    FrequencyStats: FrequencyStats
  }
})

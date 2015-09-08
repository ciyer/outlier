/*!
 * Independent Outlier Archive
 *
 * Copyright (c) 2014, 2015 Chandrasekhar Ramakrishnan
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
var dateParser = d3.time.format("%Y-%m-%d");
var dateFormatter = d3.time.format("%b %d %Y");
var monthFormatter = d3.time.format("%B")
var yearFormatter = d3.time.format("%Y")

/**
 * @class
 */
function OaiModel() {
  this.products = [];
  this.filteredProducts = [];
  this.categories = [];
  this.clothes = [];
  this.accessories = [];
  this.fabrics = [];
  this.orFilters = [];
  this.andFilters = [];
  this.mwu = [];
  this.reup = [];
}

function cleanCsvRow(d) {
  var price = d["Price"];
  if (price.length > 0) d["Price"] = +d["Price"];

  var release = d["Release"];
  if (release.length > 0) {
    var releaseDate = dateParser.parse(d["Release"]);
    d.releaseDate = releaseDate;
    d["Release"] = dateFormatter(releaseDate);
  } else {
    d.releaseDate = null;
  }

  return d;
}

// Load the data then invoke the callback
OaiModel.prototype.loadData = function(callback) {
  var _this = this;
  d3.csv("outlier-data.csv")
    .row(cleanCsvRow)
    .get(function(err, rows) {
      if (err) {
        console.log(err);
        return;
      }
      _this.initializeProducts(rows);
      callback(rows);
    })
}

OaiModel.prototype.initializeProducts = function(rows) {
  this.products = rows;
  this.filteredProducts = this.products;
  this.orFilters = [];
  this.andFilters = [];

  var fabricsMap = {}, typeCategoriesMap = {}, mwuMap = {}, reupMap = {};
  this.products.forEach(function(d) {
    var cat = typeCategoriesMap[d["Category"]];
    if (!cat) { cat = {}; typeCategoriesMap[d["Category"]] = cat; }
    cat[d["Type"]] = true;
    fabricsMap[d["Fabric"]] = true;
    mwuMap[d["MWU"]] = true;
    reupMap[d["Re-up"]] = true;
  });

  var categories = {};
  for (cat in typeCategoriesMap) {
    var filters, types = [];
    this.initializeFilterCodes(types, typeCategoriesMap[cat]);
    filters = types.map(function(type) {
      return {
        isOn: false,
        category: cat,
        type: type,
        isHit: function(d) { return type == d["Type"] }
      }
    });
    categories[cat] = filters;
    this.orFilters = this.orFilters.concat(filters);
  }
  this.clothes = categories["Clothes"];
  this.accessories = categories["Accessory"];

  var fabrics = [];
  this.initializeFilterCodes(fabrics, fabricsMap);
  this.fabrics = fabrics.map(function(fabric) {
    return {
      isOn: false,
      category: "Fabric",
      type: fabric,
      isHit: function(d) { return fabric == d["Fabric"] }
    }
  });
  this.orFilters = this.orFilters.concat(this.fabrics);

  var mwu = [];
  this.initializeFilterCodes(mwu, mwuMap);
  this.mwu = mwu.map(function(option) {
    return {
      isOn: false,
      category: "Male/Female/Unisex",
      type: option,
      isHit: function(d) { return option == d["MWU"] }
    }
  });
  this.andFilters = this.andFilters.concat(this.mwu);

  var reup = [];
  this.initializeFilterCodes(reup, reupMap);
  this.reup = reup.map(function(option) {
    var type = option;
    if (option == "TRUE") type = 'Yes';
    if (option == "FALSE") type = 'No';
    return {
      isOn: false,
      category: "Re-Up?",
      catName: "reup",
      type: type,
      isHit: function(d) { return option == d["Re-up"] }
    }
  });
  this.andFilters = this.andFilters.concat(this.reup);
};

OaiModel.prototype.initializeFilterCodes = function(coll, map) {
  for (key in map) {
    coll.push(key);
  }
  coll.sort(d3.ascending);
};

OaiModel.prototype.toggleFilter = function(filter) {
  filter.isOn = !filter.isOn;
  var _this = this;
  var onFilters = this.orFilters.filter(function(d) { return d.isOn });
  if (onFilters.length < 1) {
    this.filteredProducts = this.products;
  } else {
    this.filteredProducts = this.products.filter(function(d) {
      var hits = 0;
      onFilters.forEach(function(filter) {
        if (filter.isHit(d)) ++hits;
      });
      return hits > 0;
    });
  }

  var onAndFilters = this.andFilters.filter(function(d) { return d.isOn });
  if (onAndFilters.length < 1) return;

  var runAndFiltersInOrMode = (onFilters.length < 1);
  this.filteredProducts = this.filteredProducts.filter(function(d) {
    var hits = 0;
    onAndFilters.forEach(function(filter) {
      if (filter.isHit(d)) ++hits;
    });
    return (runAndFiltersInOrMode) ? hits > 0 : hits == onAndFilters.length;
  });

};

OaiModel.prototype.clearFilters = function() {
  this.orFilters.forEach(function(d) { d.isOn = false; });
  this.andFilters.forEach(function(d) { d.isOn = false; });
  this.filteredProducts = this.products;
};

 /**
  * @class
  */
function OaiPresenter(model) {
  this.model = model;
  this.showImages = true;
  this.productsTable = d3.select("#products-table");
  this.priceContainer = d3.select("#price-container");
  this.priceMedianContainer = d3.select("#price-median-container");
  this.monthContainer = d3.select("#month-container");
  this.weekdayContainer = d3.select("#weekday-container");
  this.clothesFilterContainer = d3.select("#clothes-filter");
  this.accessoryFilterContainer = d3.select("#accessory-filter");
  this.fabricFilterContainer = d3.select("#fabric-filter");
  this.mwuFilterContainer = d3.select("#mwu-filter");
  this.reupFilterContainer = d3.select("#reup-filter");

  this.endMonthContainer = d3.select("#endmonth");
  this.endYearContainer = d3.select("#endyear");

  var margin = {top: 0, right: 0, bottom: 0, left: 0};
  this.chartMargin = margin;
  this.chartWidth = 100 - margin.left - margin.right;
  this.chartHeight = 100 - margin.top - margin.bottom;
}

/**
 * @function Unpack data from a join
 */
function unpack(d) { return d;}

OaiPresenter.prototype.productTableHeaders = function() {
  return (this.showImages) ? ["Image", "Product", "Price", "Release"] : ["Product", "Price", "Release"];
}

OaiPresenter.prototype.productTableColumns = function(row, headers) {
  var showImages = this.showImages;
  var imageColumnIdx = (showImages) ? 0 : -1;
  var productColumnIdx = (showImages) ? 1 : 0;
  return headers.map(function(d, i) {
    var links = [];
    var images = [];
    if (i == productColumnIdx && row["InSitu"].length > 0)
      links = [{label: row[d], link: row["InSitu"]}];
    if (i == imageColumnIdx && row["Image"] && row["Image"].length > 0) {
      link = null;
      if (row["InSitu"].length > 0) link = row["InSitu"].length;
      images = [{src: row["Image"], link: link }];
    }
    return {label: row[d], links: links, images: images}
  })
}

function rowLabel(d) {
  if (d.links.length > 0) return "";
  if (d.images.length > 0) return "";
  return d.label;
}

OaiPresenter.prototype.drawProductTable = function() {
  var headers = this.productTableHeaders();
  var thead = this.productsTable.selectAll("thead").data([[headers]]);
  thead.enter().append("thead");
  var headerRow = thead.selectAll("tr").data(unpack);
  headerRow.enter().append("tr");
  var headerData = headerRow.selectAll("th").data(unpack);
  headerData.enter().append("th").text(unpack);

  var tbody = this.productsTable.selectAll("tbody").data([this.model.filteredProducts]);
  tbody.enter().append("tbody");
  var tr = tbody.selectAll("tr").data(unpack);
  tr.enter().append("tr");
  tr.exit().transition(1000).style("opacity", 0).remove();
  var _this = this;
  var td = tr.selectAll("td").data(function(row) { return _this.productTableColumns(row, headers)});
  td.enter().append("td");
  td.text(rowLabel);

  var links = td.selectAll("a.product")
    .data(function(d) { return d.links});
  links.enter().append("a")
    .attr("class", "product")
    .attr("href", function(d) { return d.link })
    .text(function(d) { return d.label });

var images = td.selectAll("a.image")
    .data(function(d) { return d.images});
  images.enter().append("img")
    .attr("src", function(d) { return d.src })
    .attr("height", "40");
};

OaiPresenter.prototype.drawChart = function(container, hist, bins, labels) {

  var margin = this.chartMargin;
  var numBins = bins.length - 1;
  var width = this.chartWidth, height = this.chartHeight;

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

//  CHART FILTERING
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

OaiPresenter.prototype.drawPriceInfo = function() {
  function pricesToConsider(list) {
    return list
      .filter(function(d) { return "FALSE" == d["Historic"]})
      .map(function(d) { return d["Price"] })
      .filter(function(d) { return d > 0 });
  }
  var products = this.model.filteredProducts;
  var prices = pricesToConsider(products);
  var sortedPrices = prices.sort(d3.ascending);
  var allProducts = this.model.products;
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

  this.drawChart(this.priceContainer, hist, bins, labels);

  var median = d3.median(prices);
  median = d3.format("3.0f")(median);
  var medianContainer = this.priceMedianContainer.data([median]);
  medianContainer.text(function(d) { return "Median: $" + d });
};

OaiPresenter.prototype.drawMonthInfo = function() {
  function monthsToConsider(list) {
    return list
      .filter(function(d) { return "FALSE" == d["Historic"] && null != d.releaseDate})
      .map(function(d) { return d.releaseDate.getMonth() });
  }
  var labels = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"]
  var months = monthsToConsider(this.model.filteredProducts);
  var bins = [0,1,2,3,4,5,6,7,8,9,10,11,12];
  var hist = d3.layout.histogram().bins(bins)(months);
  this.drawChart(this.monthContainer, hist, bins, labels);
};

OaiPresenter.prototype.drawWeekdayInfo = function() {
  function daysToConsider(list) {
    return list
      .filter(function(d) { return "FALSE" == d["Historic"] && null != d.releaseDate})
      .map(function(d) { return d.releaseDate.getDay() });
  }

  var labels = ["S", "M", "T", "W", "T", "F", "S"];
  var days = daysToConsider(this.model.filteredProducts);
  var bins = [0,1,2,3,4,5,6,7];
  var hist = d3.layout.histogram().bins(bins)(days);
  this.drawChart(this.weekdayContainer, hist, bins, labels);
};

// CHART FILTERING -- Use this version of draw weekday info to get the actual items as the data in the histogram
OaiPresenter.prototype.drawWeekdayInfoValuer = function() {
  function daysToConsider(list) {
    return list
      .filter(function(d) { return "FALSE" == d["Historic"] && null != d.releaseDate});
  }

  function valuer(d) { return d.releaseDate.getDay(); }

  var labels = ["S", "M", "T", "W", "T", "F", "S"];
  var days = daysToConsider(this.model.filteredProducts);
  var bins = [0,1,2,3,4,5,6,7];
  var hist = d3.layout.histogram().value(valuer).bins(bins)(days);
  this.drawChart(this.weekdayContainer, hist, bins, labels);
};

OaiPresenter.prototype.drawFilter = function(container, categoryDescription) {
  var _this = this;
  var toggles, group, panelCollapse, category, link;

  function onFiltersCount(d) {
    return d.filters.map(function(f) { return f.isOn ?  1 : 0 }).reduce(function(sum, b) { return b + sum });
  }

  category = container.selectAll("h5.panel-title").data([categoryDescription]);
  category.enter()
    .append("h5")
      .attr("class", "panel-title");
  link = category.selectAll("a").data(function(d) { return [d] });
  link.enter()
    .append("a")
      .attr("data-toggle", "collapse")
      .attr("data-parent", "#filters")
      .attr("href", function(d) { return "#collapse-" + d.catName; });
  link.text(function(d) {
    var count = onFiltersCount(d);
    return (count > 0) ?
      d.category + " (" + count + ")" :
      d.category;
  });

  panelCollapse = container.selectAll("div.panel-collapse").data([categoryDescription]);
  panelCollapse.enter()
    .append("div")
      .attr("class", "panel-collapse collapse")
      .attr("id", function(d) { return "collapse-" + d.catName; });
  var buttonGroupClass = (categoryDescription.filters.length > 3) ? 'btn-group-vertical' : 'btn-group';
  group = panelCollapse.selectAll("div." + buttonGroupClass).data(function(d) { return [d.filters] });
  group.enter().append("div")
    .attr("class", buttonGroupClass + " btn-group-xs");
  toggles = group.selectAll("button").data(unpack);
  toggles.enter()
    .append("button")
    .attr("class", "btn btn-default")
    .attr("data-toggle", "button")
    .on("click", function(d) { _this.model.toggleFilter(d); _this.update(); })
    .text(function(d) { return d.type; });
}

OaiPresenter.prototype.drawFilters = function() {
  this.drawFilter(this.clothesFilterContainer, {category: "Clothes", catName: "clothes", filters: this.model.clothes});
  this.drawFilter(this.accessoryFilterContainer, {category: "Accessories", catName: "accessories", filters: this.model.accessories});
  this.drawFilter(this.fabricFilterContainer, {category: "Fabric", catName: "fabric", filters: this.model.fabrics});
  this.drawFilter(this.mwuFilterContainer, {category: "Men/Woman/Unisex", catName: "mwu", filters: this.model.mwu});
  this.drawFilter(this.reupFilterContainer, {category: "Re-up?", catName: "reup", filters: this.model.reup});
};

OaiPresenter.prototype.updateEndDateInfo = function() {
  var lastEntry = this.model.products[0]
  var lastEntryDate = lastEntry.releaseDate
  this.endMonthContainer.text(monthFormatter(lastEntryDate));
  this.endYearContainer.text(yearFormatter(lastEntryDate));
};

OaiPresenter.prototype.update = function() {
  this.drawProductTable();
  this.drawPriceInfo();
  this.drawMonthInfo();
  this.drawWeekdayInfo();
  this.drawFilters();
  this.updateEndDateInfo();
}

OaiPresenter.prototype.clearFilters = function() {
  this.model.clearFilters();
  // Remove the active state from all buttons
  d3.select('#filters').selectAll("button").classed("active", false)
  this.update();
}

OaiPresenter.prototype.initialDraw = function() {
  this.update();
  var _this = this;
  $('#clear-button').on("click", function(e) { _this.clearFilters() });
};

var model = new OaiModel();
var presenter = new OaiPresenter(model);


function enterApp() {
  model.loadData(function(rows) { presenter.initialDraw(); });
}

$(document).ready(enterApp)

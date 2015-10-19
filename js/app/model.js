/**
 *  Independent Outlier Archive
 *
 *  Copyright (c) 2014-2015 Chandrasekhar Ramakrishnan
 *
 *  Released under GPL license.
 */

 /**
  * Implementation of the model.
  *
  * The is no business model for this app, since it is just about data presentation;
  * the model is only for the UI.
  */
define(["d3"], function(d3) {

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
    this.andFilters = this.andFilters.concat(this.fabrics);

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

    // TODO This needs to done by category -- within a category they are or
    // between categories they are and
    //var runAndFiltersInOrMode = (onFilters.length < 1);
    var runAndFiltersInOrMode = true;
    var filtersByCategory = {};
    onAndFilters.forEach(function(f) {
      if (filtersByCategory[f.category] != null) {
        filtersByCategory[f.category].push(f);
      } else {
        filtersByCategory[f.category] = [f];
      }
    });
    var onCategories = [];
    for (var key in filtersByCategory) {
      if (filtersByCategory.hasOwnProperty(key))
        onCategories.push(key);
    }

    this.filteredProducts = this.filteredProducts.filter(function(d) {
      var hitsPerCategory = 0;
      onCategories.forEach(function(category) {
        var filters = filtersByCategory[category];
        for (var i = 0; i < filters.length; ++i) {
          if (filters[i].isHit(d)) {
            ++hitsPerCategory;
            break;
          }
        }
      });
      return hitsPerCategory == onCategories.length;
    });

  };

  OaiModel.prototype.clearFilters = function() {
    this.orFilters.forEach(function(d) { d.isOn = false; });
    this.andFilters.forEach(function(d) { d.isOn = false; });
    this.filteredProducts = this.products;
  };

  return {
    "Model": OaiModel,
    "monthFormatter": monthFormatter,
    "yearFormatter": yearFormatter
  };
});

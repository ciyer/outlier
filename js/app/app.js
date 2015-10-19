/**
 *  Independent Outlier Archive
 *
 *  Copyright (c) 2014-2015 Chandrasekhar Ramakrishnan
 *
 *  Released under GPL license.
 */

 /**
  * Implementation of the top-level logic for the archive.
  */
define(function(require, exports, module) {

  var d3 = require("d3");
  var React = require("react");
  var ReactDOM = require("react-dom");
  var enquire = require("enquire");
  var Backbone = require("backbone");
  var model = require("app/model");
  var dashboard = require("app/dashboard");
  var products = require("app/products");
  var about = require("es6!app/about");
  var details = require("app/details");

  OaiRouter = Backbone.Router.extend({
    routes: {
      "": "home",
      "about":  "about",
      "product/:product": "product"
    }
  });

  var AppClass = React.createClass({
    displayName: 'App',
    render: function() {
      if (this.props.showAbout) {
        var lastEntry = this.props.model.products[0];
        var lastEntryDate = lastEntry.releaseDate;
        return about.About({
          endmonth: model.monthFormatter(lastEntryDate),
          endyear: model.yearFormatter(lastEntryDate)
        });
      } else if (this.props.selectedProductName){
        return details.Details(_.extend({
          product: this.props.presenter.compileProduct(this.props.selectedProductName)
        }, this.props));
      } else {
        return React.DOM.div({key:'App'}, [
          dashboard.dashboard(_.extend({key: 'dashboard-container'}, this.props)),
          products.Products(
            _.extend({key: 'products-container'}, this.props)
          )
        ]);
      }
    }
  });

  var App = React.createFactory(AppClass);

  function OaiPresenter() {
    this.model = new model.Model();
    this.hasData = false;

    var _this = this;
    this.router = new OaiRouter();
    this.router.presenter = this;
    this.router.on("route:home", function() { _this.showHomePage() });
    this.router.on("route:product", function(product) { _this.showProductPage(product) });
    this.router.on("route:about", function() { _this.showAboutPage() });

    this.props = {};
    var margin = {top: 0, right: 0, bottom: 0, left: 0};
    this.props.chartMargin = margin;
    this.props.chartWidth = 100 - margin.left - margin.right;
    this.props.chartHeight = 100 - margin.top - margin.bottom;
    this.props.showAbout = false;
    this.props.mode =  "table";
    this.props.showImages = false;
    this.props.showLabels = true;
  }

  OaiPresenter.prototype.update = function() {
    if (!this.hasData) return;
    this.clothes = this.model.clothes;
    this.accessories = this.model.accessories;
    this.fabrics = this.model.fabrics;
    this.mwu = this.model.mwu;
    this.allProducts = this.model.products;
    this.products = this.model.filteredProducts;

    this.props.products = this.products;

    if (this.props.showAbout) {
      $('#about-widget').addClass("active");
    } else {
      $('#about-widget').removeClass("active");
    }
    if (this.props.showImages) {
      $('#images-widget').addClass("active");
    } else {
      $('#images-widget').removeClass("active");
    }
    ReactDOM.render(
      App(_.extend({model: this.model, presenter: this}, this.props)),
      $("#app-container")[0]);
  }

  OaiPresenter.prototype.compileProduct = function(productName) {
    var releases = this.model.products.filter(function(d) { return d["Product"] == productName});
    if (releases.length < 1) return releases;
    var product = {"Product": releases[0]["Product"], "InSitu": releases[0]["InSitu"]};
    product.releases = releases;
    return product;
  }

  OaiPresenter.prototype.showProductPage = function(productName) {
    // Show the product details page
    this.props.selectedProductName = productName;
    this.update();
  }

  OaiPresenter.prototype.showAboutPage = function() {
    // Show the about page
    this.props.showAbout = true;
    this.update();
  }

  OaiPresenter.prototype.showHomePage = function() {
    this.props.showAbout = false;
    this.props.selectedProductName = null;
    this.update();
  }

  OaiPresenter.prototype.clearFilters = function() {
    this.model.clearFilters();
    // Remove the active state from all buttons
    d3.select('#filters').selectAll("button").classed("active", false)
    this.update();
  }

  OaiPresenter.prototype.initialDraw = function() {
    this.hasData = true;
    this.update();
    var _this = this;
    $('#clear-button').on("click", function(e) { _this.clearFilters() });
  };

  OaiPresenter.prototype.clickedProduct = function(d) {
    this.router.navigate(d, {trigger: true});
  }

  OaiPresenter.prototype.loadData = function(callback) {
    this.model.loadData(callback);
  }

  OaiPresenter.prototype.toggleFilter = function(d) {
    this.model.toggleFilter(d);
    this.update();
  };

  OaiPresenter.prototype.isFilterOn = function(d) {
    return d.isOn;
  };

  OaiPresenter.prototype.toggleImages = function() {
    this.props.showImages = !this.props.showImages;
    this.props.mode = (this.props.showImages) ? "list" : "table";
    this.update();
  };

  OaiPresenter.prototype.onLargeScreen = function() {
    // We have already initialized
    if (this.hasData) return;
    this.props.showImages = true;
    this.props.mode = "list";
  };

  var presenter = new OaiPresenter();
  Backbone.history.start({root: "/outlier/"});

  function enterApp() {
    $('#images-control').click(function(event) {
      presenter.toggleImages();
    });
    enquire
      .register("(min-width: 768px)",
        { setup: function() { presenter.onLargeScreen() },
          deferSetup: true});
    presenter.loadData(function(rows) { presenter.initialDraw(); });
  }

  return { enter: enterApp }
});

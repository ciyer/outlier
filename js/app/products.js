/**
 *  Independent Outlier Archive
 *
 *  Copyright (c) 2014-2015 Chandrasekhar Ramakrishnan
 *
 *  Released under GPL license.
 */

 /**
  * Implementation of the products display.
  */
define(["d3", "react"], function(d3, React) {

  function unpack(d) { return d;}

  function urlStringForProductName(name) {
    return "#product/" + name.replace(/\//g, "%2F")
  }

  function rowLabel(d) {
    if (d.links.length > 0) return "";
    if (d.images.length > 0) return "";
    return d.label;
  }

  function groupBy(products, size) {
    var groups = [[]];
    products.reduce(function(gps, elt) {
      var group = gps[gps.length - 1];
      if (group.length == size) {
        group = [];
        gps.push(group);
      }
      group.push(elt);
      return gps;
    }, groups);
    return groups;
  }

  function drawProductTable(productsTable, products, headers, drawLinks, drawImages, columnsDataFunc) {
    var thead = productsTable.selectAll("thead").data([[headers]]);
    thead.enter().append("thead");
    var headerRow = thead.selectAll("tr").data(unpack);
    headerRow.enter().append("tr");
    var headerData = headerRow.selectAll("th").data(unpack);
    headerData.enter().append("th").text(unpack);

    var tbody = productsTable.selectAll("tbody").data([products]);
    tbody.enter().append("tbody");
    var tr = tbody.selectAll("tr").data(unpack);
    tr.enter().append("tr");
    tr.exit().transition(1000).style("opacity", 0).remove();
    var td = tr.selectAll("td").data(columnsDataFunc);
    td.enter().append("td");
    td.text(rowLabel);

    var links = td.selectAll("a.product")
      .data(function(d) { return d.links});
    links.enter().append("a")
      .attr("class", "product")
      .attr("href", function(d) { return urlStringForProductName(d.productName) } )
      .text(function(d) { return d.productName });

    if (drawImages) {
      var images = td.selectAll("img")
          .data(function(d) { return d.images});
        images.enter().append("img")
          .attr("class", "img-responsive")
        images
          .attr("src", function(d) { return d.src });
    }
  }

  var ProductsTableClass = React.createClass({
    displayName: 'ProductsTable',

    productTableHeaders: function() {
      return (this.props.showImages) ? ["Image", "Product", "Price", "Release"] : ["Product", "Price", "Release"];
    },

    productTableColumns: function(row, headers) {
      var showImages = this.props.showImages;
      var imageColumnIdx = (showImages) ? 0 : -1;
      var productColumnIdx = (showImages) ? 1 : 0;
      return headers.map(function(d, i) {
        var links = [];
        var images = [];
        // Link the product column to the product page
        if (i == productColumnIdx)
          links = [{productName: row[d]}];
        if (i == imageColumnIdx && row["Image"] && row["Image"].length > 0) {
          images = [{src: row["Image"] }];
        }
        return {label: row[d], links: links, images: images}
      })
    },

    drawProductTable: function(productsTable, products) {
      var headers = this.productTableHeaders();
      var _this = this;
      drawProductTable(productsTable, products, headers,
        true, this.props.showImages,
        function(row) { return _this.productTableColumns(row, headers)});
    },

    isShowLabels: function() { return this.props.showLabels },
    isDrawLinks: function() { return this.props.drawLinks },

    componentDidMount: function() {
      // Just update the component
      this.componentDidUpdate();
    },

    componentDidUpdate: function() {
      var products = this.props.products;
      this.drawProductTable(d3.select("#products-table"), products);
    },

    render: function() {
      return React.DOM.table({id: 'products-table', className: 'table' });
    }
  });
  var ProductsTable = React.createFactory(ProductsTableClass);

  var ProductsGridClass = React.createClass({
    displayName: 'ProductsGrid',

    drawProductList: function(container, products) {
      // Split the products into groups depending on the size of the screen
      // Check props.images_per_col
      // Break the products into groups of 12

      var groups = groupBy(products, 12);
      var productsList = container.selectAll("ul").data(groups);
      productsList
          .enter()
        .append("ul")
          .classed("row", true)
          .style("padding", "0 0 0 0")
          .style("margin", "0 0 0 0");
      var list = productsList.selectAll("li").data(unpack);
      var presenter = this.props.presenter;
      list
        .enter().append("li")
          .classed("col-lg-2 col-md-2 col-sm-3 col-xs-4", true)
          .style("list-style", "none")
          .style("margin-bottom", "25px");
      list.exit().transition(1000).style("opacity", 0).remove();
      var imageContainers = list.selectAll("a.image")
          .data(function(d) { return [d]});
      imageContainers
        .enter().append("a")
          .classed("image", true);
      imageContainers
        .attr("href", function(d) { return urlStringForProductName(d["Product"])});
      if (this.isShowLabels()) imageContainers.text(function(d) { return d["Product"]})
      var images = imageContainers.selectAll("img").data(function(d) { return [d["Image"]]});
      images
          .enter()
        .append("img")
          .classed("img-responsive", true);
      images
        .attr("src", function(d) { return d });
    },

    isShowLabels: function() { return this.props.showLabels },
    isDrawLinks: function() { return this.props.drawLinks },

    componentDidMount: function() {
      // Just update the component
      this.componentDidUpdate();
    },

    componentDidUpdate: function() {
      var products = this.props.products;
      this.drawProductList(d3.select("#products-container"), products);
    },

    render: function() {
      return React.DOM.div({id: 'products-container'});
    }
  });
  var ProductsGrid = React.createFactory(ProductsGridClass);

  var ProductsClass = React.createClass({
    displayName: 'Products',

    isTableMode: function() { return this.props.mode == "table" },
    isGridMode: function() { return this.props.mode == "grid" },

    render: function() {
      var title = React.DOM.h3({key: 'productsTitle'}, "Products");
      var elts = [title];
      if (this.isTableMode()) {
        var table = ProductsTable(_.extend({key: 'productsTable'}, this.props));
        elts.push(table);
      } else {
        var list = ProductsGrid(_.extend({key: 'productsList'}, this.props));
        elts.push(list);
      }
      var column = React.DOM.div({key: 'productsColumn', className: 'col-xs-12 col-md-12'}, elts);
      var row = React.DOM.div({key: 'productsRow', className: 'row'}, [column]);
      return row;
    }
  });
  var Products = React.createFactory(ProductsClass);

  var ReleasesClass = React.createClass({
    displayName: 'Releases',

    productTableHeaders: function() {
      return ["Price", "Colors", "Release"];
    },

    productTableColumns: function(row, headers) {
      return headers.map(function(d, i) { return {label: row[d], links: [], images: []} });
    },

    drawProductTable: function(productsTable, products) {
      var headers = this.productTableHeaders();
      var _this = this;
      drawProductTable(productsTable, products, headers, false, false,
        function(row) { return _this.productTableColumns(row, headers)});
    },

    componentDidMount: function() {
      // Just update the component
      this.componentDidUpdate();
    },

    componentDidUpdate: function() {
      var products = this.props.products;
      this.drawProductTable(d3.select("#products-table"), products);
    },

    render: function() {
      var title = React.DOM.h3({key: 'productsTitle'}, "Releases (" + this.props.products.length + ")");
      var elts = [title];
      var table = React.DOM.table({key: 'productsTable', id: 'products-table', className: 'table' });
      elts.push(table);
      var column = React.DOM.div({key: 'productsColumn', className: 'col-xs-12 col-md-12'}, elts);
      var row = React.DOM.div({key: 'productsRow', className: 'row'}, [column]);
      return row;
    }
  });
  var Releases = React.createFactory(ReleasesClass);

  return {
    Products: Products,
    ProductsGrid: ProductsGrid,
    ProductsTable: ProductsTable,
    Releases: Releases
  };
})

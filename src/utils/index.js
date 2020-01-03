import * as d3Collection from 'd3-collection';

import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';


function groupedByYearQuarter(data) {
  if (data.length < 1) return [{name:"Chronological", entries: data}];
  const keyFunc = (d) => {
    if (d.releaseDate == null) return '??';
    let year = d.releaseDate.getFullYear() - 2000;
    // Winter spans two years
    if (d.season === 'Winter')
      if (d.releaseDate.getMonth() < 3)
        year = `${year - 1}-'${year}`
      else
        year = `${year}-'${year+1}`
    return `'${year} ${d.season}`;
  }
  // Group the data chronologically (by year, quarter)
  const groups = d3Collection.nest()
    .key(keyFunc)
    .entries(data)
    .map(g => ({name: g.key, entries: g.values}));
  return groups;
}

function groupedByYearQuarterType(data) {
  // Group the data by year, quarter, type
  return [{name:"foo", entries: data}];
}

function groupedData(data, settings) {
  // Group the data according to the settings
  if (settings.display.listing === "chronological")
    return groupedByYearQuarter(data.filtered)
  else
    return groupedByYearQuarterType(data.filtered)
}

function urlStringForProductName(name) {
  return name.replace(/\//g, "%2F").replace(/ /g, "+");
}

function productNameFromUrlString(urlString) {
  return urlString.replace(/%2F/g, "/").replace(/\+/g, " ");
}


// Spinner from https://loading.io/css/
class LoadingSpinner extends Component {
  render() {
    return <Row>
      <Col xs={{offset: 6}}>
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
      </Col>
    </Row>
  }
}

export { groupedData, urlStringForProductName, productNameFromUrlString, LoadingSpinner }

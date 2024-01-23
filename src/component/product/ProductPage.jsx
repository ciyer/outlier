import React, { Component } from 'react';

import { Col, Row } from 'reactstrap';
import { Table } from 'reactstrap';

import { ReleaseImagesUnique } from '../ReleaseImages';
import { Histogram, BinnedScatter } from '../chart';
import { outlierProductUrls } from '../../data';

function howItFitsSearchName(productName) {
  const name = productName.replace("T-Shirt", "");
  const comps = name.split("-");
  const lastComp =
    comps.length < 3
      ? comps[comps.length - 1].trim()
      : comps
          .slice(1, -1)
          .map((s) => s.trim())
          .join("-")
          .trim();
  const nameComps = lastComp.split(" ");
  const lastNameComp = nameComps[nameComps.length - 1].trim();
  return lastNameComp;
}

function howItFitsSearchString(searchName) {
  const howItFitsSearchString = `how+it+fits+-+${searchName}`;
  return howItFitsSearchString;
}

class ProductPageHeader extends Component {
  render() {
    const category = this.props.category;
    const productName = this.props.productName;
    const outlierCcUrl = this.props.outlierCcUrl;
    const outlierNycUrl = this.props.outlierNycUrl;
    const archiveUrl = this.props.archiveUrl;
    const productUrlString = encodeURI(productName);
    const searchName = howItFitsSearchName(productName);
    const howItFitsUrl = `https://www.reddit.com/r/Outlier/search?q=${howItFitsSearchString(
      searchName
    )}`;
    const googleUrl = `https://google.com/search?q=Outlier+${productUrlString}`;
    const redditUrl = `https://www.reddit.com/r/Outlier/search?q=${productUrlString}`;
    const archiveUrls = [];
    if (outlierCcUrl != null) {
      archiveUrls.push(
        <a
          key="outlierccurl"
          href={`https://web.archive.org/web/*/${outlierCcUrl}`}
        >
          Archive.org [outlier.cc]
        </a>
      );
      archiveUrls.push(<span key="outlierccurl_space">&nbsp;</span>);
    }
    if (outlierNycUrl != null)
      archiveUrls.push(
        <a
          key="outliernycurl"
          href={`https://web.archive.org/web/*/${outlierNycUrl}`}
        >
          Archive.org [outlier.nyc]
        </a>
      );
    let linkUrl = null,
      linkDesc = null;
    if (archiveUrl != null) {
      linkUrl = archiveUrl;
      linkDesc = "archive-m2";
    } else {
      linkUrl = outlierNycUrl != null ? outlierNycUrl : outlierCcUrl;
      linkDesc = "outlier.nyc";
    }
    return [
      <h3 key="heading">
        <a href={linkUrl}>
          {productName} [{linkDesc}]
        </a>
      </h3>,
      <p key="refs">
        <a href={googleUrl}>Google</a> &nbsp;
        <a href={redditUrl}>Reddit</a> &nbsp;
        {archiveUrls}
        {category === "Clothes" && (
          <>
            <br />
            <a href={howItFitsUrl}>How It Fits - {searchName}</a>
          </>
        )}
      </p>,
      <p key="prices">{this.props.priceString}</p>,
    ];
  }
}

class ProductImages extends Component {
  render() {
    const releases = this.props.releases;
    return [
      <h3 key="header">Images</h3>,
      <ReleaseImagesUnique key="images" releases={releases} />,
    ];
  }
}

class ProductSummary extends Component {
  render() {
    const monthHistogram = this.props.summary.monthHistogram;
    const seasonHistogram = this.props.summary.seasonHistogram;
    const releaseGapWeeks = this.props.summary.releaseGapWeeks;
    const releaseGap = releaseGapWeeks.every((d) => d.count < 1) ? (
      <div></div>
    ) : (
      <div>
        <h3 key="releaseDurationHeader">
          Release Gap{" "}
          <span style={{ fontSize: "small", fontWeight: "normal" }}>
            (weeks)
          </span>
        </h3>
        <BinnedScatter key="releaseDuration" data={releaseGapWeeks} />
      </div>
    );

    return (
      <div className="d-flex flex-wrap">
        <div>
          <h3 key="seasonHeader">Season</h3>
          <Histogram key="seasonHistogram" data={seasonHistogram} />
        </div>
        <div>
          <h3 key="monthHeader">Month</h3>
          <Histogram key="monthHistogram" data={monthHistogram} />
        </div>
        {releaseGap}
      </div>
    );
  }
}

class ProductReleasesTable extends Component {
  render() {
    const releases = this.props.releases;
    const showReleaseNames = this.props.showReleaseNames;
    function rowReleaseNameTd(r) {
      if (!showReleaseNames) return null;
      const releaseName =
        r["Release Name"] === "" ? r.Product : r["Release Name"];
      return <td>{releaseName}</td>;
    }
    const releaseRows = releases.map((r, i) => (
      <tr key={i}>
        <td>{r.Price}</td>
        <td>{r.Colors}</td>
        <td>{r.Release}</td>
        {rowReleaseNameTd(r)}
      </tr>
    ));
    return (
      <Table>
        <thead>
          <tr>
            <th>Price</th>
            <th>Colors</th>
            <th>Release</th>
            {showReleaseNames ? <th>Release Name</th> : null}
          </tr>
        </thead>
        <tbody>{releaseRows}</tbody>
      </Table>
    );
  }
}

class ProductReleases extends Component {
  render() {
    const releases = this.props.releases;
    const releasesCount = releases.length;
    return [
      <h3 key="header">Releases ({releasesCount})</h3>,
      <ProductReleasesTable
        key="table"
        releases={releases}
        showReleaseNames={this.props.showReleaseNames}
      />,
    ];
  }
}

class ProductPage extends Component {
  render() {
    const releases = this.props.releases;
    if (releases.length < 1) return [];
    const productName = this.props.productName;
    const category = releases[0].Category;
    const { outlierCcUrl, outlierNycUrl, archiveUrl } =
      outlierProductUrls(releases);
    var prices = releases.map(function (d) {
      return d["Price"];
    });
    var minPrice = Math.min(...prices);
    var maxPrice = Math.max(...prices);
    var priceString =
      "Price: $" +
      (minPrice === maxPrice
        ? "" + minPrice
        : "" + minPrice + " - " + maxPrice);
    return [
      <Row key="header">
        <Col>
          <ProductPageHeader
            category={category}
            productName={productName}
            priceString={priceString}
            outlierCcUrl={outlierCcUrl}
            outlierNycUrl={outlierNycUrl}
            archiveUrl={archiveUrl}
          />
        </Col>
      </Row>,
      <Row key="summary">
        <Col md={6}>
          <ProductImages releases={releases} />
        </Col>
        <Col md={6}>
          <ProductSummary summary={this.props.summary} />
        </Col>
      </Row>,
      <Row key="releases">
        <Col>
          <ProductReleases
            releases={releases}
            showReleaseNames={this.props.showReleaseNames}
          />
        </Col>
      </Row>,
    ];
  }
}

export default ProductPage;

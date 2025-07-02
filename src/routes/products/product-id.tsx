import { Col, Row, Table } from "reactstrap";
import { useMatch, useNavigate } from "react-router";

import {
  ReleaseBaselineStats,
  ReleaseSummary,
  augmentWithReleaseDate,
  outlierProductUrls,
  releasesForProduct,
  useGetArchiveDataQuery,
  type DataRow,
  type ReduxDataRow,
} from "../../features/archive";
import LoadingSpinner from "../../features/LoadingSpinner";
import { PATHS } from "../route-paths";
import { productNameFromUrlString } from "../../features/utils";
import { useEffect } from "react";

import ReleaseImagesUnique from "../../features/images/ReleaseImagesUnique";
import Histogram from "../../features/chart/Histogram";
// import BinnedScatter from "../../features/chart/BinnedScatter";

type ComputedReleaseSummary = ReturnType<ReleaseSummary["compute"]>;

interface ProductComponentProps {
  releases: DataRow[];
}

function howItFitsSearchName(productName: string): string {
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

function howItFitsSearchString(searchName: string): string {
  const howItFitsSearchString = `how+it+fits+-+${searchName}`;
  return howItFitsSearchString;
}

type ProductPageHeaderProps = {
  archiveUrl: string | null;
  category: string;
  productName: string;
  outlierCcUrl: string | null;
  outlierNycUrl: string | null;
  priceString: string;
};

function ProductPageHeader({
  archiveUrl,
  category,
  outlierCcUrl,
  outlierNycUrl,
  priceString,
  productName,
}: ProductPageHeaderProps) {
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
  const { linkUrl, linkDesc } =
    archiveUrl != null
      ? { linkUrl: archiveUrl, linkDesc: "archive-m2" }
      : {
          linkUrl: outlierNycUrl != null ? outlierNycUrl : outlierCcUrl,
          linkDesc: "outlier.nyc",
        };
  return (
    <>
      <h3 key="heading">
        <a href={linkUrl!}>
          {productName} [{linkDesc}]
        </a>
      </h3>
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
      </p>
      <p key="prices">{priceString}</p>
    </>
  );
}

function ProductImages({ releases }: ProductComponentProps) {
  return (
    <>
      <h3 key="header">Images</h3>
      <ReleaseImagesUnique key="images" releases={releases} />
    </>
  );
}

function ProductSummary({
  summary,
}: {
  summary: ComputedReleaseSummary | null;
}) {
  if (summary == null) {
    return (
      <div className="d-flex flex-wrap">
        <div>
          <h3 key="seasonHeader">Season</h3>
          <p>No summary data available.</p>
        </div>
        <div>
          <h3 key="monthHeader">Month</h3>
          <p>No summary data available.</p>
        </div>
      </div>
    );
  }
  const monthHistogram = summary.monthHistogram;
  const seasonHistogram = summary.seasonHistogram;
  const releaseGapWeeks = summary.releaseGapWeeks;
  const releaseGap = releaseGapWeeks.every((d) => d.count < 1) ? (
    <div></div>
  ) : (
    <div>
      <h3 key="releaseDurationHeader">
        Release Gap{" "}
        <span style={{ fontSize: "small", fontWeight: "normal" }}>(weeks)</span>
      </h3>
      {/*
      <BinnedScatter key="releaseDuration" data={releaseGapWeeks} />
      */}
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

interface ProductReleasesTableProps extends ProductComponentProps {
  releases: DataRow[];
  showReleaseNames: boolean;
}
function ProductReleasesTable({
  releases,
  showReleaseNames,
}: ProductReleasesTableProps) {
  function rowReleaseNameTd(r: DataRow) {
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

function ProductReleases({
  releases,
  showReleaseNames,
}: ProductReleasesTableProps) {
  const releasesCount = releases.length;
  return (
    <>
      <h3 key="header">Releases ({releasesCount})</h3>
      <ProductReleasesTable
        key="table"
        releases={releases}
        showReleaseNames={showReleaseNames}
      />
    </>
  );
}

type ProductBodyProps = {
  data: ReduxDataRow[];
  productName: string;
};

function ProductBody({ data, productName }: ProductBodyProps) {
  const { filteredReleases: rawFilteredReleases, numberOfReleaseNames } =
    releasesForProduct(data, productName);
  const filteredReleases = rawFilteredReleases.map(augmentWithReleaseDate);
  const baseline = new ReleaseBaselineStats(data).compute();
  const summary =
    baseline.priceBins == null
      ? null
      : new ReleaseSummary(filteredReleases, baseline).compute();

  const releases = filteredReleases;
  if (releases.length < 1)
    return <div>No releases found for {productName}</div>;
  const category = releases[0].Category;
  const { outlierCcUrl, outlierNycUrl, archiveUrl } =
    outlierProductUrls(releases);
  const prices = releases
    .map(function (d) {
      return d["Price"];
    })
    .filter((p) => p != null);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceString =
    "Price: $" +
    (minPrice === maxPrice ? "" + minPrice : "" + minPrice + " - " + maxPrice);
  return (
    <>
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
      </Row>
      <Row key="summary">
        <Col md={6}>
          <ProductImages releases={releases} />
        </Col>
        <Col md={6}>
          <ProductSummary summary={summary} />
        </Col>
      </Row>
      <Row key="releases">
        <Col>
          <ProductReleases
            releases={releases}
            showReleaseNames={numberOfReleaseNames > 1}
          />
        </Col>
      </Row>
    </>
  );
}

export default function Product() {
  const { data, isLoading } = useGetArchiveDataQuery();
  const navigate = useNavigate();
  const match = useMatch(PATHS.product);
  useEffect(() => {
    if (match == null || match.params.productId == null) {
      navigate("/");
    }
  }, [match, navigate]);

  if (data == null || isLoading) {
    return (
      <>
        <Row>
          <Col xs={12}>
            <LoadingSpinner />
          </Col>
        </Row>
      </>
    );
  }
  // This is handled in the effect, but we still need to check here
  if (match == null || match.params.productId == null) return null;
  const { params } = match;
  const productId = params.productId;
  const productName = productNameFromUrlString(productId ?? "");
  return (
    <>
      <Row>
        <Col xs={12}>
          <ProductBody data={data} productName={productName} />
        </Col>
      </Row>
    </>
  );
}

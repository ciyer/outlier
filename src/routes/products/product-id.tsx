import cx from "classnames";
import { useEffect } from "react";
import { Col, Row, Table } from "reactstrap";
import {
  Link,
  ScrollRestoration,
  generatePath,
  useMatch,
  useNavigate,
} from "react-router";

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
import Histogram from "../../features/chart/Histogram";
import BinnedScatter from "../../features/chart/BinnedScatter";
import ReleaseImagesUnique from "../../features/images/ReleaseImagesUnique";
import LoadingSpinner from "../../features/LoadingSpinner";
import {
  productNameFromUrlString,
  urlStringForProductName,
} from "../../features/utils";

import { PATHS } from "../route-paths";

import styles from "./product-styles.module.css";

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
  productName: string;
  releases: DataRow[];
};

function ProductPageHeader({ productName, releases }: ProductPageHeaderProps) {
  if (releases.length < 1)
    return <div>No releases found for {productName}</div>;
  const { outlierCcUrl, outlierNycUrl, archiveUrl } =
    outlierProductUrls(releases);

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
      <ProductPageHeaderLinks productName={productName} releases={releases} />
      <ProductPageHeaderDetails releases={releases} />
    </>
  );
}

function ProductPageHeaderLinks({
  productName,
  releases,
}: ProductPageHeaderProps) {
  const category = releases[0].category;
  const { outlierCcUrl, outlierNycUrl } = outlierProductUrls(releases);

  const productUrlString = encodeURI(productName);
  const searchName = howItFitsSearchName(productName);
  const howItFitsUrl = `https://www.reddit.com/r/Outlier/search?q=${howItFitsSearchString(
    searchName
  )}`;
  const googleUrl = `https://google.com/search?q=Outlier+${productUrlString}`;
  const redditUrl = `https://www.reddit.com/r/Outlier/search?q=${productUrlString}`;
  const bothUrls = outlierCcUrl != null && outlierNycUrl != null;
  const archiveUrls = [];
  if (outlierCcUrl != null) {
    archiveUrls.push(
      <a
        key="outlierccurl"
        href={`https://web.archive.org/web/*/${outlierCcUrl}`}
      >
        Archive.org{bothUrls && <span className="ps-1">[outlier.cc]</span>}
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
        Archive.org{bothUrls && <span className="ps-1">[outlier.nyc]</span>}
      </a>
    );
  return (
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
  );
}

function ProductPageHeaderDetails({
  releases,
}: Pick<ProductPageHeaderProps, "releases">) {
  const prices: number[] = releases
    .map(function (d) {
      return d["Price"];
    })
    .filter((p) => p != null) as number[];
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const colors = releases
    .map(function (d) {
      return d["Colors"];
    })
    .filter((c) => c != null);
  const colorSet = new Set<string>();
  colors.forEach((c) => {
    c.split(",").forEach((color) => {
      colorSet.add(color.trim());
    });
  });
  const colorCount = colorSet.size;
  const fabric = releases[0]["Fabric"];
  const fabrics = fabric.split(",").map((f) => f.trim());
  const webStyles = releases
    .map((d) => d["Web Style"])
    .filter((ws) => ws != null && ws.length > 0);
  const releaseStyles = new Set(webStyles.map((d) => d.split("-")[0].trim()));

  return (
    <Row>
      <Col xs={6} md={8} lg={6}>
        <table
          className={cx(
            "table table-sm table-borderless",
            styles.productHeaderTable
          )}
        >
          <tbody>
            <tr>
              <th scope="row">
                {minPrice === maxPrice ? "Price" : "Price Range"}
              </th>
              <td>
                $
                {minPrice === maxPrice
                  ? "" + minPrice
                  : "" + minPrice + " - " + maxPrice}
              </td>
            </tr>
            <tr>
              <th scope="row">Fabric</th>
              <td>
                {fabrics.map((fabric) => (
                  <Link
                    key={fabric}
                    className="me-1"
                    to={`${generatePath(PATHS.fabric, {
                      fabricId: urlStringForProductName(fabric),
                    })}`}
                  >
                    {fabric}
                  </Link>
                ))}
              </td>
            </tr>
            {releaseStyles.size > 0 ? (
              <tr>
                <th scope="row">Style</th>
                <td>
                  {Array.from(releaseStyles).map((style, i) => (
                    <span key={style}>
                      {i > 0 ? ", " : ""}
                      <Link
                        to={`${generatePath(PATHS.style, {
                          styleId: style,
                        })}`}
                      >
                        {style}
                      </Link>
                    </span>
                  ))}
                </td>
              </tr>
            ) : null}
            <tr>
              <th scope="row">Colors</th>
              <td>{colorCount}</td>
            </tr>
          </tbody>
        </table>
      </Col>
    </Row>
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
  return (
    <>
      <Row key="header">
        <Col md={6}>
          <ProductPageHeader productName={productName} releases={releases} />
        </Col>
        <Col md={6}>
          <ProductSummary summary={summary} />
        </Col>
      </Row>
      <Row key="summary">
        <Col md={6}>
          <ProductImages releases={releases} />
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
      <ScrollRestoration />
      <Row>
        <Col xs={12}>
          <ProductBody data={data} productName={productName} />
        </Col>
      </Row>
    </>
  );
}

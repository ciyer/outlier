import * as d3Collection from "d3-collection";

import type { DataRow, ReduxDataRow } from "./Data";

function productMatchesNames(
  product: ReduxDataRow,
  productNames: d3Collection.Set
) {
  if (productNames.has(product.Product)) return true;
  if (productNames.has(product["Release Name"])) return true;
  if (productNames.has(product["Previous Iteration"])) return true;
  return false;
}

function releasesForProduct<T extends ReduxDataRow>(
  fullReleases: T[],
  productName: string
) {
  // N.b. the current implementation does not fully resolve earlier names, in particular when
  // the depth of names exceeds 2.
  const releaseNames = d3Collection.set().add(productName);
  const filteredReleases = fullReleases.filter((p) => {
    if (productMatchesNames(p, releaseNames)) {
      releaseNames.add(p.Product);
      if (p["Release Name"] !== "") releaseNames.add(p["Release Name"]);
      if (p["Previous Iteration"] !== "")
        releaseNames.add(p["Previous Iteration"]);
      return true;
    }
    return false;
  });
  return { filteredReleases, numberOfReleaseNames: releaseNames.size() };
}

function urlToHttps(url: string) {
  return url.replace(/^http:\/\//, "https://");
}

function siteUrl(
  productUrl: string,
  filteredReleases: ReduxDataRow[],
  tld: string
) {
  if (filteredReleases.length < 1) return null;
  let search = null,
    replace = null;
  if (tld === ".cc") {
    search = /outlier\.nyc/;
    replace = "outlier.cc";
  }
  if (tld === ".nyc") {
    search = /outlier\.cc/;
    replace = "outlier.nyc";
  }
  if (search === null || replace === null) return productUrl;
  return productUrl.replace(search, replace);
}

function outlierProductUrls(releases: DataRow[]) {
  // The switch to .nyc happened 2016-07-07 was the first .nyc url
  const dotNycCutoffDate = new Date(2016, 7, 7);
  const productUrl = urlToHttps(releases[0]["InSitu"]);
  const ccReleases = releases.filter(
    (r) => r.releaseDate == null || r.releaseDate < dotNycCutoffDate
  );
  const nycReleases = releases.filter(
    (r) => r.releaseDate != null && r.releaseDate >= dotNycCutoffDate
  );
  const outlierCcUrl = siteUrl(productUrl, ccReleases, ".cc");
  const outlierNycUrl = siteUrl(productUrl, nycReleases, ".nyc");

  // The new site was turned on on after the 2020-08-14 drop const siteCutoffDate = new Date(2020, 8, 14);
  // use the most recent release as a reference for this
  const archiveUrl =
    releases[0]["Archive"] !== "" ? releases[0]["Archive"] : null;
  return { outlierCcUrl, outlierNycUrl, archiveUrl };
}

function releaseDetailsSummary(releases: DataRow[]) {
  const numberOfColors = releases.reduce((acc, r) => {
    const color = r["Colors"];
    const number = color?.split(",").length;
    return acc + (number ?? 0);
  }, 0);
  const priceRange = {
    min: Math.min(...releases.map((r) => r.Price ?? Infinity)),
    max: Math.max(...releases.map((r) => r.Price ?? -Infinity)),
  };
  const priceString =
    priceRange.min == -Infinity
      ? "(unknown)"
      : priceRange.min == priceRange.max
      ? `$${priceRange.min}`
      : `$${priceRange.min} - $${priceRange.max}`;
  return {
    numberOfColors,
    numberOfDrops: releases.length,
    priceRange,
    priceString,
  };
}

export { releasesForProduct, outlierProductUrls, releaseDetailsSummary };

import * as d3Collection from 'd3-collection';

function productMatchesNames(product, productNames) {
   if (productNames.has(product.Product)) return true;
   if (productNames.has(product['Release Name'])) return true;
   if (productNames.has(product['Previous Iteration'])) return true;
   return false;
}

function releasesForProduct(fullReleases, productName) {
  // N.b. the current implementation does not fully resolve earlier names, in particular when
  // the depth of names exceeds 2.
  const releaseNames = d3Collection.set().add(productName);
  const filteredReleases = fullReleases.filter(p => {
    if (productMatchesNames(p, releaseNames)) {
      releaseNames.add(p.Product);
      if (p['Release Name'] !== '') releaseNames.add(p['Release Name']);
      if (p['Previous Iteration'] !== '') releaseNames.add(p['Previous Iteration']);
      return true;
    } else {
      return false;
    }
  });
  return {filteredReleases, numberOfReleaseNames: releaseNames.size()}
}

function urlToHttps(url) { return url.replace(/^http:\/\//, "https://") }

function siteUrl(productUrl, filteredReleases, tld) {
  if (filteredReleases.length < 1) return null;
  let search = null, replace = null;
  if (tld === ".cc") { search = /outlier\.nyc/; replace = "outlier.cc" }
  if (tld === ".nyc") { search = /outlier\.cc/; replace = "outlier.nyc" }

  return productUrl.replace(search, replace);
}

function outlierProductUrls(releases) {
  // The switch to .nyc happened 2016-07-07 was the first .nyc url
  const dotNycCutoffDate = new Date(2016, 7, 7);
  const productUrl = urlToHttps(releases[0]['InSitu']);
  const ccReleases = releases.filter(r => r.releaseDate < dotNycCutoffDate);
  const nycReleases = releases.filter(r => r.releaseDate >= dotNycCutoffDate);
  const outlierCcUrl = siteUrl(productUrl, ccReleases, '.cc');
  const outlierNycUrl = siteUrl(productUrl, nycReleases, '.nyc');

  const siteCutoffDate = new Date(2020, 8, 14);
  const postSiteReleases = releases.filter(r => r.releaseDate >= siteCutoffDate);
  let archiveUrl = null;
  if (postSiteReleases.length < 1)
    archiveUrl = releases.map(r => r['Archive']).filter(u => u !== '').find(e => true);
  return {outlierCcUrl, outlierNycUrl, archiveUrl}
}

export { releasesForProduct, outlierProductUrls};

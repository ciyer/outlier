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

export { releasesForProduct };

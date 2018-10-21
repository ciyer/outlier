import { releasesForProduct } from './Utils.js';

import Data from './Data';

// A version of the data with names fudged to test following the release name chain
const simpleData =
`Product,Type,Category,Fabric,Release,Colors,Price,Re-up,Historic,MWU,InSitu,Image,Release Name,Previous Iteration
Latest Name,Pants,Clothes,Strongtwill,2018-04-10,"Black, Gray Space, Navy",188,TRUE,FALSE,Men,http://shop.outlier.nyc/shop/retail/strong-dungarees.html,https://outlier.nyc/productentries/products/strongdungarees/202-Outlier-StrongDungarees-grayspace.jpg,,Previous Name
Previous Name,Pants,Clothes,Strongtwill,2018-04-03,"Artificial Grape, Black Rock, Gray Rock, Lemon, Orange, Sky Blue",59,TRUE,FALSE,Unisex,http://shop.outlier.cc/shop/retail/grid-linen-towel.html,https://outlier.nyc/productentries/products/gridlinentowel/204-Outlier-GridLinenTowel-artificialgrape.jpg,,
Beach Thing,Pants,Clothes,Strongtwill,2018-03-24,"Artificial Grape, Black Rock, Gray Rock, Lemon, Orange, Sky Blue",125,TRUE,FALSE,Unisex,https://shop.outlier.nyc/shop/retail/beach-thing.html,https://outlier.nyc/productentries/products/beachthing/201-Outlier-BeachThing-artificialgrape.jpg,,
Previous Name,Pants,Clothes,Strongtwill,2018-03-22,"Flat Black, Deep Gray, Blue AF, Blade Gray, Titian Blue, Refraction, Dry Rose",130,TRUE,FALSE,Men,http://shop.outlier.cc/shop/retail/new-way-longs.html,https://outlier.nyc/productentries/products/newwaylongs/205-Outlier-NewWayLongs-titianblue.jpg,,Earliest Name
Earliest Name,Pants,Clothes,Strongtwill,2018-03-15,"Flat Black, Deep Gray, Blue AF, Blade Gray, Titian Blue, Refraction, Dry Rose",120,TRUE,FALSE,Men,http://shop.outlier.cc/shop/retail/new-way-shorts.html,https://outlier.nyc/productentries/products/newwayshorts/206-Outlier-NewWayShorts-dryrose.jpg,,`


describe('summary', () => {
  beforeEach(() => { fetch.resetMocks() });

  it('Computes Releases for Latest Name', () => {
    fetch.mockResponseOnce(simpleData);
    return Data.read().then(releases => {
      const {filteredReleases, numberOfReleaseNames} = releasesForProduct(releases, "Latest Name")
      expect(filteredReleases.length).toEqual(4);
      expect(numberOfReleaseNames).toEqual(3);
    });
  });

  it('Computes Releases for Previous Name', () => {
    fetch.mockResponseOnce(simpleData);
    return Data.read().then(releases => {
      const {filteredReleases, numberOfReleaseNames} = releasesForProduct(releases, "Previous Name")
      expect(filteredReleases.length).toEqual(4);
      expect(numberOfReleaseNames).toEqual(3);
    });
  });

  // The current implementation does not fully resolve earlier names, in particular when
  // the depth of names exceeds 2.
  it('Computes Releases for Earliest Name', () => {
    fetch.mockResponseOnce(simpleData);
    return Data.read().then(releases => {
      const {filteredReleases, numberOfReleaseNames} = releasesForProduct(releases, "Earliest Name")
      expect(filteredReleases.length).toEqual(2);
      expect(numberOfReleaseNames).toEqual(2);
    });
  });
});

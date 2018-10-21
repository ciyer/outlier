import Data from './Data';

const simpleData =
`Product,Type,Category,Fabric,Release,Colors,Price,Re-up,Historic,MWU,InSitu,Image,Release Name,Previous Iteration
Strong Dungarees,Pants,Clothes,Strongtwill,2018-04-10,"Black, Gray Space, Navy",188,TRUE,FALSE,Men,http://shop.outlier.nyc/shop/retail/strong-dungarees.html,https://outlier.nyc/productentries/products/strongdungarees/202-Outlier-StrongDungarees-grayspace.jpg,,
Experiment 075 - Ultrahigh Bigroll,Bag,Accessory,Dyneema,2018-04-10,Black,495,FALSE,FALSE,Unisex,https://shop.outlier.nyc/shop/retail/experiment-075-ultrahigh-bigroll.html,https://outlier.nyc/productentries/products/ultrahighbigroll/201-Outlier-UltrahighBigroll-full-closure-1.jpg,,
Grid Linen Towel L,Towel,Accessory,Linen,2018-04-03,"Artificial Grape, Black Rock, Gray Rock, Lemon, Orange, Sky Blue",59,TRUE,FALSE,Unisex,http://shop.outlier.cc/shop/retail/grid-linen-towel.html,https://outlier.nyc/productentries/products/gridlinentowel/204-Outlier-GridLinenTowel-artificialgrape.jpg,,
Beach Thing,Outerwear,Clothes,Linen,2018-04-03,"Artificial Grape, Black Rock, Gray Rock, Lemon, Orange, Sky Blue",125,TRUE,FALSE,Unisex,https://shop.outlier.nyc/shop/retail/beach-thing.html,https://outlier.nyc/productentries/products/beachthing/201-Outlier-BeachThing-artificialgrape.jpg,,
New Way Longs,Shorts,Clothes,F. Cloth,2018-03-22,"Flat Black, Deep Gray, Blue AF, Blade Gray, Titian Blue, Refraction, Dry Rose",130,TRUE,FALSE,Men,http://shop.outlier.cc/shop/retail/new-way-longs.html,https://outlier.nyc/productentries/products/newwaylongs/205-Outlier-NewWayLongs-titianblue.jpg,,
New Way Shorts,Shorts,Clothes,F. Cloth,2018-03-22,"Flat Black, Deep Gray, Blue AF, Blade Gray, Titian Blue, Refraction, Dry Rose",120,TRUE,FALSE,Men,http://shop.outlier.cc/shop/retail/new-way-shorts.html,https://outlier.nyc/productentries/products/newwayshorts/206-Outlier-NewWayShorts-dryrose.jpg,,`


describe('data retrieval', () => {
  beforeEach(() => { fetch.resetMocks() });

  it('parses data', () => {
    fetch.mockResponseOnce(simpleData);
    return Data.read().then(data => expect(data.length).toEqual(6));
  });
});

describe('data retrieval', () => {
  beforeEach(() => { fetch.resetMocks() });

  it('loads data', () => {
    fetch.mockResponseOnce(simpleData);
    fetch("outlier-data.csv")
    .then((res) => res.text())
    .then((res) => {
      expect(res).toEqual(simpleData);
    })
  });
});

export { simpleData }

import Data from './Data';

const simpleData =
`Product,Type,Category,Fabric,Release,Colors,Price,Re-up,Historic,MWU,InSitu,Image,Release Name,Previous Iteration,Family,Notes,Archive
New Way Longs,Shorts,Clothes,F. Cloth,2018-04-10,"Blade Gray, Blue AF, Deep Gray, Dry Rose, Flat Black, Refraction, Titian Blue",130,TRUE,FALSE,Men,http://shop.outlier.cc/shop/retail/new-way-longs.html,https://mt2.outlier.nyc/productentries/products/newwaylongs/206-Outlier-NewWayLongs-blueaf.jpg,,,,,https://archive-m2.outlier.nyc/shop/retail/new-way-longs.html
New Way Shorts,Shorts,Clothes,F. Cloth,2018-04-10,"Blade Gray, Blue AF, Deep Gray, Dry Rose, Flat Black, Refraction, Titian Blue",120,TRUE,FALSE,Men,http://shop.outlier.cc/shop/retail/new-way-shorts.html,https://mt2.outlier.nyc/productentries/products/newwayshorts/203-Outlier-NewWayShorts-bladegray.jpg,,,,,
Strong Dungarees,Pants,Clothes,Strongtwill,2018-04-10,"Black, Gray Space, Navy",188,TRUE,FALSE,Men,http://shop.outlier.nyc/shop/retail/strong-dungarees.html,https://mt2.outlier.nyc/productentries/products/strongdungarees/202-Outlier-StrongDungarees-grayspace.jpg,,,,,
Experiment 075 - Ultrahigh Bigroll,Bag,Accessory,Dyneema,2018-04-10,Black,495,FALSE,FALSE,Unisex,https://shop.outlier.nyc/shop/retail/experiment-075-ultrahigh-bigroll.html,https://mt2.outlier.nyc/productentries/products/ultrahighbigroll/201-Outlier-UltrahighBigroll-full-closure-1.jpg,,,,,https://archive-m2.outlier.nyc/shop/retail/experiment-075-ultrahigh-bigroll.html
Beach Thing,Poncho,Clothes,Linen,2018-04-03,"Artificial Grape, Black Rock, Gray Rock, Lemon, Orange, Sky Blue",125,TRUE,FALSE,Unisex,https://shop.outlier.nyc/shop/retail/beach-thing.html,https://mt2.outlier.nyc/productentries/products/beachthing/201-Outlier-BeachThing-artificialgrape.jpg,,,,,https://archive-m2.outlier.nyc/shop/retail/beach-thing.html
Grid Linen Towel L,Towel,Accessory,Linen,2018-04-03,"Artificial Grape, Black Rock, Gray Rock, Lemon, Orange, Sky Blue",59,TRUE,FALSE,Unisex,http://shop.outlier.cc/shop/retail/grid-linen-towel.html,https://mt2.outlier.nyc/productentries/products/gridlinentowel/204-Outlier-GridLinenTowel-artificialgrape.jpg,,,,,
Grid Linen Towel XL,Towel,Accessory,Linen,2018-04-03,"Artificial Grape, Black Rock, Gray Rock, Lemon, Orange, Sky Blue",88,TRUE,FALSE,Unisex,http://shop.outlier.cc/shop/retail/grid-linen-towel.html,https://mt2.outlier.nyc/productentries/products/gridlinentowel/203-Outlier-GridLinenTowel-orange.jpg,,,,,
60/30 Chinos,Pants,Clothes,“60/30”,2018-03-29,"Brick, Earth Taupe, Charcoal, Dark Marine",267,TRUE,FALSE,Men,http://shop.outlier.cc/shop/retail/chino.html,https://mt2.outlier.nyc/productentries/products/6030chino/201-Outlier-6030Chino-Brick.jpg,,,,,https://archive-m2.outlier.nyc/shop/retail/chino.html
Ramielust Cut One T-Shirt,T-Shirt,Clothes,Ramie,2018-03-27,"Black, Charcoal Brown, Magenta, Navy, Olive, Purple, Sand, Teal, White",125,TRUE,FALSE,Men,http://shop.outlier.cc/shop/retail/ramielust-tshirt.html,https://mt2.outlier.nyc/productentries/products/ramielusttshirt/201-Outlier-RamielustTShirt-magenta.jpg,Ramielust T-Shirt,,,,https://archive-m2.outlier.nyc/shop/retail/ramielust-tshirt.html
New Way Longs,Shorts,Clothes,F. Cloth,2018-03-22,"Flat Black, Deep Gray, Blue AF, Blade Gray, Titian Blue, Refraction, Dry Rose",130,TRUE,FALSE,Men,http://shop.outlier.cc/shop/retail/new-way-longs.html,https://mt2.outlier.nyc/productentries/products/newwaylongs/205-Outlier-NewWayLongs-titianblue.jpg,,,,,https://archive-m2.outlier.nyc/shop/retail/new-way-longs.html
New Way Shorts,Shorts,Clothes,F. Cloth,2018-03-22,"Flat Black, Deep Gray, Blue AF, Blade Gray, Titian Blue, Refraction, Dry Rose",120,TRUE,FALSE,Men,http://shop.outlier.cc/shop/retail/new-way-shorts.html,https://mt2.outlier.nyc/productentries/products/newwayshorts/206-Outlier-NewWayShorts-dryrose.jpg,,,,,
Experiment 076 - Ultra Ultra Easy Shorts,Shorts,Clothes,Ultra Ultra,2018-03-20,"Black, Charcoal, Matte Navy",175,FALSE,FALSE,Men,https://shop.outlier.nyc/shop/retail/experiment-076-ultra-ultra-easy-shorts.html,https://mt2.outlier.nyc/productentries/products/ultraultraeasyshorts/201-Outlier-UltraUltraEasyShorts-mattenavy.jpg,,,,,https://archive-m2.outlier.nyc/shop/retail/experiment-076-ultra-ultra-easy-shorts.html
`

describe('data retrieval', () => {
  beforeEach(() => { fetch.resetMocks() });

  it('parses data', () => {
    fetch.mockResponseOnce(simpleData);
    return Data.read().then(data => expect(data.length).toEqual(12));
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

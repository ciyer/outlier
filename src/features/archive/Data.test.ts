import { beforeEach, describe, expect, it } from "vitest";
import { type FetchMock } from "vitest-fetch-mock";

import Data from "./Data";

const fetch = global.fetch as FetchMock;

/* eslint-disable max-len */
/* eslint-disable @cspell/spellchecker */
const simpleData = `Product,Type,Category,Fabric,Release,Colors,Price,Re-up,Historic,MWU,InSitu,Image,Release Name,Previous Iteration,Family,Notes,Web Style,Archive
Experiment 546 - Air/jex Camp Collar,Shirt,Clothes,Air/jex,2025-07-29,"Bluestripe, Crossedlines, Darkstripe, Freakedflag, Lightglitch, Subprintblack",350,FALSE,FALSE,Men,https://outlier.nyc/products/air-jex-camp-collar,https://cdn.shopify.com/s/files/1/0065/5055/2666/files/LC_FLATS_JULY_Airjex_Campcollar_Lightglitch1261copy.jpg?v=1753456522,Air/jex Camp Collar,,,,S314,
Experiment 545 - Air/jex Oversize,Shirt,Clothes,Air/jex,2025-07-29,"Alienseahorsedog, Bluestripe, Crossedlines, Pinkgeometries",350,FALSE,FALSE,Men,https://outlier.nyc/products/air-jex-oversize,https://cdn.shopify.com/s/files/1/0065/5055/2666/files/LC_FLATS_JULY_8_Airjex_Oversize_ALienDog5267copy.jpg?v=1753456485,Air/jex Oversize,,,,S315,
Experiment 525 - Injex Trackpocketjacket,Outerwear,Clothes,Injected Linen,2025-07-24,"Black + White, Doubleblack, Gothic + Black, Navylit + Lightlines, Olive + Sativa, White + Black",750,FALSE,FALSE,Men,https://outlier.nyc/products/injex-trackpocketjacket,https://cdn.shopify.com/s/files/1/0065/5055/2666/files/LC_FLATS_JULY_Injex_Trackpocketjacket_Navylit_Lightlines1222copy.jpg?v=1752508994,Injex Trackpocketjacket,,,,O634,
Experiment 544 - Freecotton Shortsleeve,Shirt,Clothes,Freecotton,2025-07-22,"Black, Pale Sky",120,FALSE,FALSE,Men,https://outlier.nyc/products/freecotton-shortsleeve,https://cdn.shopify.com/s/files/1/0065/5055/2666/files/002-Outlier-FreecottonShortsleeve-Thumbnail.jpg?v=1752700368,Freecotton Shortsleeve,,,,S273-i2,
Experiment 543 - Freecotton Boxford,Shirt,Clothes,Freecotton,2025-07-22,"Black, Pale Sky",140,FALSE,FALSE,Men,https://outlier.nyc/products/freecotton-boxford,https://cdn.shopify.com/s/files/1/0065/5055/2666/files/002-Outlier-FreecottonBoxford-Thumbnail-Black.jpg?v=1752700303,Freecotton Boxford,,,,S259-i2,
Daydry Merino Cut Two T-Shirt,T-Shirt,Clothes,Daydry Merino Ciclo Jersey,2025-07-22,"Anthracite,Dryblack,Mauvesmoke",140,TRUE,FALSE,Men,https://outlier.nyc/products/daydry-merino-cut-two-t-shirt,https://cdn.shopify.com/s/files/1/0065/5055/2666/files/LC_FLATS_APRIL_03_Daydry_Cut_Two_Flint0100_copy.jpg?v=1744389322,,,,,K413,
Futurecorps,Pants,Clothes,F. Cloth,2025-07-15,"Anthracite, Black,Concrete, Dark Navy, Dust Olive",200,TRUE,FALSE,Men,https://outlier.nyc/products/futurecorps,https://cdn.shopify.com/s/files/1/0065/5055/2666/files/LC_FLATS_JULY_8_FUTURECORPS_Concrete5159_copy.jpg?v=1752595630,,,,,P169-i4,
Nycogaze Loose Tank,T-Shirt,Clothes,Nycogaze,2025-07-15,"Blackgauze, Bluegauze, Olivegauze",110,FALSE,FALSE,Men,https://outlier.nyc/products/nycogaze-loose-tank,https://cdn.shopify.com/s/files/1/0065/5055/2666/files/LC_FLATS_JULY_8_Nycogaze_Loose_Tank_Olivegauze5216copy.jpg?v=1752253691,,,,,K548,
Nycogaze Cut Two T-Shirt,T-Shirt,Clothes,Nycogaze,2025-07-15,"Blackgauze, Bluegauze, Olivegauze",120,TRUE,FALSE,Men,https://outlier.nyc/products/nycogaze-cut-two-t-shirt,https://cdn.shopify.com/s/files/1/0065/5055/2666/files/LC_FLATS_JULY_8_Nycogaze_Cut_Two_Tshirt_Bluegauze5243_copy.jpg?v=1752511433,,Experiment 448 - Nycogaze Cut Two T-Shirt,,,K413-I2,
Experiment 542 - Sunwarp Sunguard,T-Shirt,Clothes,Sunwarp,2025-07-15,"Darkpink Irigrid, Darkyellow Irigrid, Darkyellow Sweethome, Hi Viz Yellow, Pink Snakelightning, Yellow Rockstatic",200,FALSE,FALSE,Men,https://outlier.nyc/products/sunwarp-sunguard,https://cdn.shopify.com/s/files/1/0065/5055/2666/files/LC_FLATS_JULY_Sunwarp_Sunguard_Pink_Snakelightning1051copy.jpg?v=1752162322,Sunwarp Sunguard,,,,K567,
Experiment 541 - Trackwool Lightsplitter,Outerwear,Clothes,Trackwool,2025-07-08,"Ravenwing, Taupedusk",500,FALSE,FALSE,Men,https://outlier.nyc/products/trackwool-lightsplitter,https://cdn.shopify.com/s/files/1/0065/5055/2666/files/LC_FLATS_JULY_Trackwool_Lightsplitter_Tan1045copy.jpg?v=1751990487,Trackwool Lightsplitter,,,,O636,
Futurehighdarts,Pants,Clothes,F. Cloth,2025-07-08,"Black, Chillbrown, Dark Navy, Smoketaupe",220,TRUE,FALSE,Men,https://outlier.nyc/products/futurehighdarts,https://cdn.shopify.com/s/files/1/0065/5055/2666/files/002-Outlier-Futurehighdarts-Thumbnail-Smoketaupe.jpg?v=1751988994,,,,,P245,
`;
/* eslint-enable @cspell/spellchecker */

describe("data retrieval", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("parses data", () => {
    fetch.mockResponseOnce(simpleData);
    return Data.read().then((data) => expect(data.length).toEqual(12));
  });
});

describe("data retrieval", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("loads data", () => {
    fetch.mockResponseOnce(simpleData);
    fetch("outlier-data.csv")
      .then((res) => res.text())
      .then((res) => {
        expect(res).toEqual(simpleData);
      });
  });
});

export { simpleData };

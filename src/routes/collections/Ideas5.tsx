import { useState } from "react";
import { Gallery } from "react-grid-gallery";
import Lightbox from "./Lightbox";
import "./collections.css";

/* eslint-disable @cspell/spellchecker */

const images = [
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/orig/IDEAS5-OUTLIER-WN-LOOK-1.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/thumb/IDEAS5-OUTLIER-WN-LOOK-1.jpg",
    width: 5586,
    height: 8377,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/orig/IDEAS5-OUTLIER-WN-LOOK-2.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/thumb/IDEAS5-OUTLIER-WN-LOOK-2.jpg",
    width: 6112,
    height: 9166,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/orig/IDEAS5-OUTLIER-WN-LOOK-3.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/thumb/IDEAS5-OUTLIER-WN-LOOK-3.jpg",
    width: 5677,
    height: 8511,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/orig/IDEAS5-OUTLIER-WN-LOOK-4.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/thumb/IDEAS5-OUTLIER-WN-LOOK-4.jpg",
    width: 5711,
    height: 8565,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/orig/IDEAS5-OUTLIER-WN-LOOK-5.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/thumb/IDEAS5-OUTLIER-WN-LOOK-5.jpg",
    width: 5007,
    height: 7508,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/orig/IDEAS5-OUTLIER-WN-LOOK-6.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/thumb/IDEAS5-OUTLIER-WN-LOOK-6.jpg",
    width: 5644,
    height: 8464,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/orig/IDEAS5-OUTLIER-WN-LOOK-7.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/thumb/IDEAS5-OUTLIER-WN-LOOK-7.jpg",
    width: 5730,
    height: 8592,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/orig/IDEAS5-OUTLIER-WN-LOOK-8.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/thumb/IDEAS5-OUTLIER-WN-LOOK-8.jpg",
    width: 5566,
    height: 8347,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/orig/IDEAS5-OUTLIER-WN-LOOK-9.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/thumb/IDEAS5-OUTLIER-WN-LOOK-9.jpg",
    width: 5490,
    height: 8232,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/orig/IDEAS5-OUTLIER-WN-LOOK-10.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/thumb/IDEAS5-OUTLIER-WN-LOOK-10.jpg",
    width: 5670,
    height: 8503,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/orig/IDEAS5-OUTLIER-WN-LOOK-11.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/thumb/IDEAS5-OUTLIER-WN-LOOK-11.jpg",
    width: 4955,
    height: 7430,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/orig/IDEAS5-OUTLIER-WN-LOOK-12.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/thumb/IDEAS5-OUTLIER-WN-LOOK-12.jpg",
    width: 5939,
    height: 8906,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/orig/IDEAS5-OUTLIER-WN-LOOK-13.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/thumb/IDEAS5-OUTLIER-WN-LOOK-13.jpg",
    width: 6158,
    height: 9233,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/orig/IDEAS5-OUTLIER-WN-LOOK-14.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/thumb/IDEAS5-OUTLIER-WN-LOOK-14.jpg",
    width: 5450,
    height: 8173,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/orig/IDEAS5-OUTLIER-WN-LOOK-15.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/thumb/IDEAS5-OUTLIER-WN-LOOK-15.jpg",
    width: 5589,
    height: 8381,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/orig/IDEAS5-OUTLIER-WN-LOOK-16.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/thumb/IDEAS5-OUTLIER-WN-LOOK-16.jpg",
    width: 6029,
    height: 9041,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/orig/IDEAS5-OUTLIER-WN-LOOK-17.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/thumb/IDEAS5-OUTLIER-WN-LOOK-17.jpg",
    width: 5928,
    height: 8889,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/orig/IDEAS5-OUTLIER-WN-LOOK-18.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/thumb/IDEAS5-OUTLIER-WN-LOOK-18.jpg",
    width: 5172,
    height: 7754,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/orig/IDEAS5-OUTLIER-WN-LOOK-19.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/thumb/IDEAS5-OUTLIER-WN-LOOK-19.jpg",
    width: 6248,
    height: 9370,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/orig/IDEAS5-OUTLIER-WN-LOOK-20.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/thumb/IDEAS5-OUTLIER-WN-LOOK-20.jpg",
    width: 4933,
    height: 7397,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/orig/IDEAS5-OUTLIER-WN-LOOK-21.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/thumb/IDEAS5-OUTLIER-WN-LOOK-21.jpg",
    width: 2556,
    height: 3820,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/orig/IDEAS5-OUTLIER-WN-LOOK-22.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/thumb/IDEAS5-OUTLIER-WN-LOOK-22.jpg",
    width: 5526,
    height: 8288,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/orig/IDEAS5-OUTLIER-WN-LOOK-23.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/thumb/IDEAS5-OUTLIER-WN-LOOK-23.jpg",
    width: 5086,
    height: 7629,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/orig/IDEAS5-OUTLIER-WN-LOOK-24.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/thumb/IDEAS5-OUTLIER-WN-LOOK-24.jpg",
    width: 5234,
    height: 7848,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/orig/IDEAS5-OUTLIER-WN-LOOK-25.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/thumb/IDEAS5-OUTLIER-WN-LOOK-25.jpg",
    width: 5375,
    height: 8060,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/orig/IDEAS5-OUTLIER-WN-LOOK-26.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/thumb/IDEAS5-OUTLIER-WN-LOOK-26.jpg",
    width: 6096,
    height: 9140,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/orig/IDEAS5-OUTLIER-WN-LOOK-27.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/thumb/IDEAS5-OUTLIER-WN-LOOK-27.jpg",
    width: 5232,
    height: 7845,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/orig/IDEAS5-OUTLIER-WN-LOOK-28.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/thumb/IDEAS5-OUTLIER-WN-LOOK-28.jpg",
    width: 6026,
    height: 9035,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/orig/IDEAS5-OUTLIER-WN-LOOK-29.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas5/thumb/IDEAS5-OUTLIER-WN-LOOK-29.jpg",
    width: 6084,
    height: 9124,
  },
];

function Ideas5Credits() {
  return (
    <div className="row mt-5">
      <div className="col-md-8 col-lg-6 col-xxl-4">
        <h3>Credits</h3>
        <table className="credits-table table table-borderless table-sm">
          <tbody>
            <tr>
              <th scope="row">Design/Creative Direction</th>
              <td>Willie Norris</td>
            </tr>
            <tr>
              <th scope="row">Photography</th>
              <td>Jon-Paul Rodriguez</td>
            </tr>
            <tr>
              <th scope="row">Photography Assistant</th>
              <td>Chris Chin</td>
            </tr>
            <tr>
              <th scope="row">Lighting Direction and Digi Tech</th>
              <td>Haley Varacallo</td>
            </tr>
            <tr>
              <th scope="row">Design Assistant</th>
              <td>Jeremy Wood</td>
            </tr>
            <tr>
              <th scope="row">FX Artist</th>
              <td>Izzi Galindo, Nina Carelli</td>
            </tr>
            <tr>
              <th scope="row">FX Assistant</th>
              <td>Sophie Hartnett</td>
            </tr>
            <tr>
              <th scope="row">Makeup</th>
              <td>Sterling Tull, Griffin Hall</td>
            </tr>
            <tr>
              <th scope="row">Hair</th>
              <td>John Notovy</td>
            </tr>
            <tr>
              <th scope="row">Models</th>
              <td>
                Noma, Montez, Juju, Panthera, Kirill, Omar, Amarilla, Cameron,
                West Dakota
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Ideas5() {
  const [index, setIndex] = useState(-1);

  const handleClick = (index: number) => setIndex(index);

  return (
    <>
      <h1>IDEAS 5</h1>
      <div>
        <Gallery
          images={images}
          onClick={handleClick}
          enableImageSelection={false}
        />
        <Lightbox
          images={images}
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
        />
      </div>
      <Ideas5Credits />
    </>
  );
}

export default Ideas5;

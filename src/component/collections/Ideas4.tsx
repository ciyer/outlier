import { useState } from "react";
import { Gallery } from "react-grid-gallery";
import Lightbox from "./Lightbox";
import "./collections.css";

const images = [
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/orig/IDEAS4-OUTLIER-WN-LOOK-18.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/thumb/IDEAS4-OUTLIER-WN-LOOK-18.jpg",
    width: 2732,
    height: 4098,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/orig/IDEAS4-OUTLIER-WN-LOOK-15.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/thumb/IDEAS4-OUTLIER-WN-LOOK-15.jpg",
    width: 2732,
    height: 4098,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/orig/IDEAS4-OUTLIER-WN-LOOK-29.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/thumb/IDEAS4-OUTLIER-WN-LOOK-29.jpg",
    width: 2732,
    height: 4098,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/orig/IDEAS4-OUTLIER-WN-LOOK-28.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/thumb/IDEAS4-OUTLIER-WN-LOOK-28.jpg",
    width: 2732,
    height: 4098,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/orig/IDEAS4-OUTLIER-WN-LOOK-14.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/thumb/IDEAS4-OUTLIER-WN-LOOK-14.jpg",
    width: 2732,
    height: 4098,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/orig/IDEAS4-OUTLIER-WN-LOOK-3.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/thumb/IDEAS4-OUTLIER-WN-LOOK-3.jpg",
    width: 2732,
    height: 4098,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/orig/IDEAS4-OUTLIER-WN-LOOK-1.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/thumb/IDEAS4-OUTLIER-WN-LOOK-1.jpg",
    width: 2732,
    height: 4098,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/orig/IDEAS4-OUTLIER-WN-LOOK-16.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/thumb/IDEAS4-OUTLIER-WN-LOOK-16.jpg",
    width: 2732,
    height: 4098,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/orig/IDEAS4-OUTLIER-WN-LOOK-17.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/thumb/IDEAS4-OUTLIER-WN-LOOK-17.jpg",
    width: 2732,
    height: 4098,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/orig/IDEAS4-OUTLIER-WN-LOOK-0.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/thumb/IDEAS4-OUTLIER-WN-LOOK-0.jpg",
    width: 2732,
    height: 4098,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/orig/IDEAS4-OUTLIER-WN-LOOK-4.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/thumb/IDEAS4-OUTLIER-WN-LOOK-4.jpg",
    width: 2732,
    height: 4098,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/orig/IDEAS4-OUTLIER-WN-LOOK-13.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/thumb/IDEAS4-OUTLIER-WN-LOOK-13.jpg",
    width: 2732,
    height: 4098,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/orig/IDEAS4-OUTLIER-WN-LOOK-12.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/thumb/IDEAS4-OUTLIER-WN-LOOK-12.jpg",
    width: 2732,
    height: 4098,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/orig/IDEAS4-OUTLIER-WN-LOOK-5.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/thumb/IDEAS4-OUTLIER-WN-LOOK-5.jpg",
    width: 2732,
    height: 4098,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/orig/IDEAS4-OUTLIER-WN-LOOK-7.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/thumb/IDEAS4-OUTLIER-WN-LOOK-7.jpg",
    width: 2732,
    height: 4098,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/orig/IDEAS4-OUTLIER-WN-LOOK-38.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/thumb/IDEAS4-OUTLIER-WN-LOOK-38.jpg",
    width: 2732,
    height: 4098,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/orig/IDEAS4-OUTLIER-WN-LOOK-10.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/thumb/IDEAS4-OUTLIER-WN-LOOK-10.jpg",
    width: 2732,
    height: 4098,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/orig/IDEAS4-OUTLIER-WN-LOOK-11.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/thumb/IDEAS4-OUTLIER-WN-LOOK-11.jpg",
    width: 2732,
    height: 4098,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/orig/IDEAS4-OUTLIER-WN-LOOK-39.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/thumb/IDEAS4-OUTLIER-WN-LOOK-39.jpg",
    width: 2732,
    height: 4098,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/orig/IDEAS4-OUTLIER-WN-LOOK-6.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/thumb/IDEAS4-OUTLIER-WN-LOOK-6.jpg",
    width: 2732,
    height: 4098,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/orig/IDEAS4-OUTLIER-WN-LOOK-43.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/thumb/IDEAS4-OUTLIER-WN-LOOK-43.jpg",
    width: 2732,
    height: 4098,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/orig/IDEAS4-OUTLIER-WN-LOOK-42.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/thumb/IDEAS4-OUTLIER-WN-LOOK-42.jpg",
    width: 2732,
    height: 4098,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/orig/IDEAS4-OUTLIER-WN-LOOK-40.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/thumb/IDEAS4-OUTLIER-WN-LOOK-40.jpg",
    width: 2732,
    height: 4098,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/orig/IDEAS4-OUTLIER-WN-LOOK-41.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/thumb/IDEAS4-OUTLIER-WN-LOOK-41.jpg",
    width: 2732,
    height: 4098,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/orig/IDEAS4-OUTLIER-WN-LOOK-45.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/thumb/IDEAS4-OUTLIER-WN-LOOK-45.jpg",
    width: 2719,
    height: 4078,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/orig/IDEAS4-OUTLIER-WN-LOOK-44.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/thumb/IDEAS4-OUTLIER-WN-LOOK-44.jpg",
    width: 2732,
    height: 4098,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/orig/IDEAS4-OUTLIER-WN-LOOK-20.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/thumb/IDEAS4-OUTLIER-WN-LOOK-20.jpg",
    width: 2732,
    height: 4098,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/orig/IDEAS4-OUTLIER-WN-LOOK-34.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/thumb/IDEAS4-OUTLIER-WN-LOOK-34.jpg",
    width: 2732,
    height: 4098,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/orig/IDEAS4-OUTLIER-WN-LOOK-35.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/thumb/IDEAS4-OUTLIER-WN-LOOK-35.jpg",
    width: 2732,
    height: 4098,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/orig/IDEAS4-OUTLIER-WN-LOOK-21.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/thumb/IDEAS4-OUTLIER-WN-LOOK-21.jpg",
    width: 2732,
    height: 4098,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/orig/IDEAS4-OUTLIER-WN-LOOK-8.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/thumb/IDEAS4-OUTLIER-WN-LOOK-8.jpg",
    width: 2732,
    height: 4098,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/orig/IDEAS4-OUTLIER-WN-LOOK-37.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/thumb/IDEAS4-OUTLIER-WN-LOOK-37.jpg",
    width: 2732,
    height: 4098,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/orig/IDEAS4-OUTLIER-WN-LOOK-23.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/thumb/IDEAS4-OUTLIER-WN-LOOK-23.jpg",
    width: 2732,
    height: 4098,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/orig/IDEAS4-OUTLIER-WN-LOOK-22.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/thumb/IDEAS4-OUTLIER-WN-LOOK-22.jpg",
    width: 2732,
    height: 4098,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/orig/IDEAS4-OUTLIER-WN-LOOK-36.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/thumb/IDEAS4-OUTLIER-WN-LOOK-36.jpg",
    width: 2732,
    height: 4098,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/orig/IDEAS4-OUTLIER-WN-LOOK-9.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/thumb/IDEAS4-OUTLIER-WN-LOOK-9.jpg",
    width: 2731,
    height: 4098,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/orig/IDEAS4-OUTLIER-WN-LOOK-32.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/thumb/IDEAS4-OUTLIER-WN-LOOK-32.jpg",
    width: 2732,
    height: 4098,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/orig/IDEAS4-OUTLIER-WN-LOOK-26.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/thumb/IDEAS4-OUTLIER-WN-LOOK-26.jpg",
    width: 2732,
    height: 4098,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/orig/IDEAS4-OUTLIER-WN-LOOK-27.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/thumb/IDEAS4-OUTLIER-WN-LOOK-27.jpg",
    width: 2732,
    height: 4098,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/orig/IDEAS4-OUTLIER-WN-LOOK-33.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/thumb/IDEAS4-OUTLIER-WN-LOOK-33.jpg",
    width: 2732,
    height: 4098,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/orig/IDEAS4-OUTLIER-WN-LOOK-19.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/thumb/IDEAS4-OUTLIER-WN-LOOK-19.jpg",
    width: 2732,
    height: 4098,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/orig/IDEAS4-OUTLIER-WN-LOOK-25.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/thumb/IDEAS4-OUTLIER-WN-LOOK-25.jpg",
    width: 2732,
    height: 4098,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/orig/IDEAS4-OUTLIER-WN-LOOK-31.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/thumb/IDEAS4-OUTLIER-WN-LOOK-31.jpg",
    width: 2732,
    height: 4098,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/orig/IDEAS4-OUTLIER-WN-LOOK-30.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/thumb/IDEAS4-OUTLIER-WN-LOOK-30.jpg",
    width: 2732,
    height: 4098,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/orig/IDEAS4-OUTLIER-WN-LOOK-24.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/thumb/IDEAS4-OUTLIER-WN-LOOK-24.jpg",
    width: 2732,
    height: 4098,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/orig/IDEAS4-OUTLIER-WN-LOOK-2.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas4/thumb/IDEAS4-OUTLIER-WN-LOOK-2.jpg",
    width: 2732,
    height: 4098,
  },
];
function Ideas4Credits() {
  return (
    <div className="row mt-5">
      <div className="col-md-8 col-lg-6 col-xxl-4">
        <h3>Credits</h3>
        <table className="credits-table table table-borderless table-sm">
          <tbody>
            <tr>
              <th scope="row">Photography</th>
              <td>Jon-Paul Rodriguez</td>
            </tr>
            <tr>
              <th scope="row">Photography Assistant</th>
              <td>Mimi D’Autremont, Chris Chin</td>
            </tr>
            <tr>
              <th scope="row">Design Assistant</th>
              <td>Jeremy Wood, Lee Copperwheat</td>
            </tr>
            <tr>
              <th scope="row">Hair</th>
              <td>Sergio Estrada, Gabe Jenkins</td>
            </tr>
            <tr>
              <th scope="row">Hair Assistant</th>
              <td>Kayla Miranda</td>
            </tr>
            <tr>
              <th scope="row">Makeup</th>
              <td>Laurel Charleston</td>
            </tr>
            <tr>
              <th scope="row">Makeup Assistant</th>
              <td>Chiquitita</td>
            </tr>
            <tr>
              <th scope="row">Aliens</th>
              <td>Zak Krevitt</td>
            </tr>
            <tr>
              <th scope="row">Models</th>
              <td>
                Lauren, June, West, Panthera, Nick, Will, Mariee, Alex, Soouizz,
                Seyoum, Uriah, Umesi, Angus
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Ideas4() {
  const [index, setIndex] = useState(-1);

  const handleClick = (index: number) => setIndex(index);

  return (
    <>
      <h1>IDEAS 4</h1>
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
      <Ideas4Credits />
    </>
  );
}

export default Ideas4;

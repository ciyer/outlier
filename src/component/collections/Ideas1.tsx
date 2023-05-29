import { useState } from "react";
import { Gallery } from "react-grid-gallery";
import Lightbox from "./Lightbox";
import "./collections.css";

const images = [
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas1/orig/OutlierXWillieNorris_Idea+1.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas1/thumb/OutlierXWillieNorris_Idea+1.jpg",
    width: 1334,
    height: 2000,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas1/orig/OutlierXWillieNorris_Idea+2.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas1/thumb/OutlierXWillieNorris_Idea+2.jpg",
    width: 1333,
    height: 2000,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas1/orig/OutlierXWillieNorris_Idea+3.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas1/thumb/OutlierXWillieNorris_Idea+3.jpg",
    width: 1333,
    height: 2000,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas1/orig/OutlierXWillieNorris_Idea+4.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas1/thumb/OutlierXWillieNorris_Idea+4.jpg",
    width: 1333,
    height: 2000,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas1/orig/OutlierXWillieNorris_Idea+5.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas1/thumb/OutlierXWillieNorris_Idea+5.jpg",
    width: 2000,
    height: 1333,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas1/orig/OutlierXWillieNorris_Idea+6.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas1/thumb/OutlierXWillieNorris_Idea+6.jpg",
    width: 2000,
    height: 1333,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas1/orig/OutlierXWillieNorris_Idea+7.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas1/thumb/OutlierXWillieNorris_Idea+7.jpg",
    width: 1333,
    height: 2000,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas1/orig/OutlierXWillieNorris_Idea+8.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas1/thumb/OutlierXWillieNorris_Idea+8.jpg",
    width: 3000,
    height: 2000,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas1/orig/OutlierXWillieNorris_Idea+9.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas1/thumb/OutlierXWillieNorris_Idea+9.jpg",
    width: 1333,
    height: 2000,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas1/orig/OutlierXWillieNorris_Idea+10.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas1/thumb/OutlierXWillieNorris_Idea+10.jpg",
    width: 1333,
    height: 2000,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas1/orig/OutlierXWillieNorris_Idea+11.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas1/thumb/OutlierXWillieNorris_Idea+11.jpg",
    width: 3000,
    height: 2000,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas1/orig/OutlierXWillieNorris_Idea+12.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas1/thumb/OutlierXWillieNorris_Idea+12.jpg",
    width: 1333,
    height: 2000,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas1/orig/OutlierXWillieNorris_Idea+13.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas1/thumb/OutlierXWillieNorris_Idea+13.jpg",
    width: 1333,
    height: 2000,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas1/orig/OutlierXWillieNorris_Idea+14.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas1/thumb/OutlierXWillieNorris_Idea+14.jpg",
    width: 1333,
    height: 2000,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas1/orig/OutlierXWillieNorris_Idea+15.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas1/thumb/OutlierXWillieNorris_Idea+15.jpg",
    width: 2000,
    height: 1333,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas1/orig/OutlierXWillieNorris_Idea+16.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas1/thumb/OutlierXWillieNorris_Idea+16.jpg",
    width: 1333,
    height: 2000,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas1/orig/OutlierXWillieNorris_Idea+17.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas1/thumb/OutlierXWillieNorris_Idea+17.jpg",
    width: 1333,
    height: 2000,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas1/orig/OutlierXWillieNorris_Idea+18.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas1/thumb/OutlierXWillieNorris_Idea+18.jpg",
    width: 1333,
    height: 2000,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas1/orig/OutlierXWillieNorris_Idea+19.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas1/thumb/OutlierXWillieNorris_Idea+19.jpg",
    width: 1333,
    height: 2000,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas1/orig/OutlierXWillieNorris_Idea+20.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas1/thumb/OutlierXWillieNorris_Idea+20.jpg",
    width: 1333,
    height: 2000,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas1/orig/OutlierXWillieNorris_Idea+21.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas1/thumb/OutlierXWillieNorris_Idea+21.jpg",
    width: 1333,
    height: 2000,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas1/orig/OutlierXWillieNorris_Idea+22.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas1/thumb/OutlierXWillieNorris_Idea+22.jpg",
    width: 1333,
    height: 2000,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas1/orig/OutlierXWillieNorris_Idea+23.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas1/thumb/OutlierXWillieNorris_Idea+23.jpg",
    width: 1333,
    height: 2000,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas1/orig/OutlierXWillieNorris_Idea+24.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas1/thumb/OutlierXWillieNorris_Idea+24.jpg",
    width: 1333,
    height: 2000,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas1/orig/OutlierXWillieNorris_Idea+25.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas1/thumb/OutlierXWillieNorris_Idea+25.jpg",
    width: 1333,
    height: 2000,
  },
];

function Ideas1Credits() {
  return (
    <div className="row mt-5">
      <div className="col-md-8 col-lg-6 col-xxl-4">
        <h3>Credits</h3>
        <table className="credits-table table table-borderless table-sm">
          <tbody>
            <tr>
              <th scope="row">Photography</th>
              <td>Laurel Golio</td>
            </tr>
            <tr>
              <th scope="row">Photography Assistant</th>
              <td>Jean Lin</td>
            </tr>
            <tr>
              <th scope="row">Additional Photography</th>
              <td>Jon-Paul Rodriguez and Dylan Thomas</td>
            </tr>
            <tr>
              <th scope="row">Design Assistant</th>
              <td>Jeremy Wood</td>
            </tr>
            <tr>
              <th scope="row">Hair/makeup</th>
              <td>Michael Moreno</td>
            </tr>
            <tr>
              <th scope="row">Models</th>
              <td>June, Leul and Pace</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Ideas1() {
  const [index, setIndex] = useState(-1);

  const handleClick = (index: number) => setIndex(index);

  return (
    <>
      <h1>IDEAS 1</h1>
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
      <Ideas1Credits />
    </>
  );
}

export default Ideas1;

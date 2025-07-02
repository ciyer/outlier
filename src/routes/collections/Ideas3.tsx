import { useState } from "react";
import { Gallery } from "react-grid-gallery";
import Lightbox from "./Lightbox";
import "./collections.css";

/* eslint-disable @cspell/spellchecker */

const images = [
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/orig/2022-Outlier-IdeasForSpring-01.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/thumb/2022-Outlier-IdeasForSpring-01.jpg",
    width: 1997,
    height: 3550,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/orig/2022-Outlier-IdeasForSpring-02.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/thumb/2022-Outlier-IdeasForSpring-02.jpg",
    width: 1997,
    height: 3550,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/orig/2022-Outlier-IdeasForSpring-03.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/thumb/2022-Outlier-IdeasForSpring-03.jpg",
    width: 1997,
    height: 3550,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/orig/2022-Outlier-IdeasForSpring-04.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/thumb/2022-Outlier-IdeasForSpring-04.jpg",
    width: 1997,
    height: 3550,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/orig/2022-Outlier-IdeasForSpring-05.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/thumb/2022-Outlier-IdeasForSpring-05.jpg",
    width: 1997,
    height: 3550,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/orig/2022-Outlier-IdeasForSpring-06.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/thumb/2022-Outlier-IdeasForSpring-06.jpg",
    width: 1997,
    height: 3550,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/orig/2022-Outlier-IdeasForSpring-07.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/thumb/2022-Outlier-IdeasForSpring-07.jpg",
    width: 1997,
    height: 3550,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/orig/2022-Outlier-IdeasForSpring-08.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/thumb/2022-Outlier-IdeasForSpring-08.jpg",
    width: 1997,
    height: 3550,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/orig/2022-Outlier-IdeasForSpring-09.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/thumb/2022-Outlier-IdeasForSpring-09.jpg",
    width: 1997,
    height: 3550,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/orig/2022-Outlier-IdeasForSpring-10.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/thumb/2022-Outlier-IdeasForSpring-10.jpg",
    width: 1997,
    height: 3550,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/orig/2022-Outlier-IdeasForSpring-11.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/thumb/2022-Outlier-IdeasForSpring-11.jpg",
    width: 1997,
    height: 3550,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/orig/2022-Outlier-IdeasForSpring-12.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/thumb/2022-Outlier-IdeasForSpring-12.jpg",
    width: 1997,
    height: 3550,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/orig/2022-Outlier-IdeasForSpring-13.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/thumb/2022-Outlier-IdeasForSpring-13.jpg",
    width: 1997,
    height: 3550,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/orig/2022-Outlier-IdeasForSpring-14.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/thumb/2022-Outlier-IdeasForSpring-14.jpg",
    width: 1997,
    height: 3550,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/orig/2022-Outlier-IdeasForSpring-15.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/thumb/2022-Outlier-IdeasForSpring-15.jpg",
    width: 1997,
    height: 3550,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/orig/2022-Outlier-IdeasForSpring-16.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/thumb/2022-Outlier-IdeasForSpring-16.jpg",
    width: 1997,
    height: 3550,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/orig/2022-Outlier-IdeasForSpring-17.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/thumb/2022-Outlier-IdeasForSpring-17.jpg",
    width: 1997,
    height: 3550,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/orig/2022-Outlier-IdeasForSpring-18.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/thumb/2022-Outlier-IdeasForSpring-18.jpg",
    width: 1997,
    height: 3550,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/orig/2022-Outlier-IdeasForSpring-19.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/thumb/2022-Outlier-IdeasForSpring-19.jpg",
    width: 1997,
    height: 3550,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/orig/2022-Outlier-IdeasForSpring-20.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/thumb/2022-Outlier-IdeasForSpring-20.jpg",
    width: 1997,
    height: 3550,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/orig/2022-Outlier-IdeasForSpring-21.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/thumb/2022-Outlier-IdeasForSpring-21.jpg",
    width: 1997,
    height: 3550,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/orig/2022-Outlier-IdeasForSpring-22.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/thumb/2022-Outlier-IdeasForSpring-22.jpg",
    width: 1997,
    height: 3550,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/orig/2022-Outlier-IdeasForSpring-23.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/thumb/2022-Outlier-IdeasForSpring-23.jpg",
    width: 1997,
    height: 3550,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/orig/2022-Outlier-IdeasForSpring-24.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/thumb/2022-Outlier-IdeasForSpring-24.jpg",
    width: 1997,
    height: 3550,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/orig/2022-Outlier-IdeasForSpring-25.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/thumb/2022-Outlier-IdeasForSpring-25.jpg",
    width: 1997,
    height: 3550,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/orig/2022-Outlier-IdeasForSpring-26.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/thumb/2022-Outlier-IdeasForSpring-26.jpg",
    width: 1997,
    height: 3550,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/orig/2022-Outlier-IdeasForSpring-27.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/thumb/2022-Outlier-IdeasForSpring-27.jpg",
    width: 1997,
    height: 3550,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/orig/2022-Outlier-IdeasForSpring-28.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/thumb/2022-Outlier-IdeasForSpring-28.jpg",
    width: 1997,
    height: 3550,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/orig/2022-Outlier-IdeasForSpring-29.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/thumb/2022-Outlier-IdeasForSpring-29.jpg",
    width: 1997,
    height: 3550,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/orig/2022-Outlier-IdeasForSpring-30.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/thumb/2022-Outlier-IdeasForSpring-30.jpg",
    width: 1997,
    height: 3550,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/orig/2022-Outlier-IdeasForSpring-31.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/thumb/2022-Outlier-IdeasForSpring-31.jpg",
    width: 1997,
    height: 3550,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/orig/2022-Outlier-IdeasForSpring-32.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/thumb/2022-Outlier-IdeasForSpring-32.jpg",
    width: 1997,
    height: 3550,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/orig/2022-Outlier-IdeasForSpring-33.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/thumb/2022-Outlier-IdeasForSpring-33.jpg",
    width: 1997,
    height: 3550,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/orig/2022-Outlier-IdeasForSpring-34.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/thumb/2022-Outlier-IdeasForSpring-34.jpg",
    width: 1997,
    height: 3550,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/orig/2022-Outlier-IdeasForSpring-35.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/thumb/2022-Outlier-IdeasForSpring-35.jpg",
    width: 1997,
    height: 3550,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/orig/2022-Outlier-IdeasForSpring-36.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/thumb/2022-Outlier-IdeasForSpring-36.jpg",
    width: 1997,
    height: 3550,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/orig/2022-Outlier-IdeasForSpring-37.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/thumb/2022-Outlier-IdeasForSpring-37.jpg",
    width: 1997,
    height: 3550,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/orig/2022-Outlier-IdeasForSpring-38.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/thumb/2022-Outlier-IdeasForSpring-38.jpg",
    width: 1997,
    height: 3550,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/orig/2022-Outlier-IdeasForSpring-39.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/thumb/2022-Outlier-IdeasForSpring-39.jpg",
    width: 1997,
    height: 3550,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/orig/2022-Outlier-IdeasForSpring-40.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/thumb/2022-Outlier-IdeasForSpring-40.jpg",
    width: 1997,
    height: 3550,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/orig/2022-Outlier-IdeasForSpring-41.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/thumb/2022-Outlier-IdeasForSpring-41.jpg",
    width: 1997,
    height: 3550,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/orig/2022-Outlier-IdeasForSpring-42.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/thumb/2022-Outlier-IdeasForSpring-42.jpg",
    width: 1997,
    height: 3550,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/orig/2022-Outlier-IdeasForSpring-43.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/thumb/2022-Outlier-IdeasForSpring-43.jpg",
    width: 1997,
    height: 3550,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/orig/2022-Outlier-IdeasForSpring-44.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/thumb/2022-Outlier-IdeasForSpring-44.jpg",
    width: 1997,
    height: 3550,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/orig/2022-Outlier-IdeasForSpring-45.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/thumb/2022-Outlier-IdeasForSpring-45.jpg",
    width: 1997,
    height: 3550,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/orig/2022-Outlier-IdeasForSpring-46.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/thumb/2022-Outlier-IdeasForSpring-46.jpg",
    width: 1997,
    height: 3550,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/orig/2022-Outlier-IdeasForSpring-47.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/thumb/2022-Outlier-IdeasForSpring-47.jpg",
    width: 1997,
    height: 3550,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/orig/2022-Outlier-IdeasForSpring-48.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/thumb/2022-Outlier-IdeasForSpring-48.jpg",
    width: 1997,
    height: 3550,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/orig/2022-Outlier-IdeasForSpring-49.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/thumb/2022-Outlier-IdeasForSpring-49.jpg",
    width: 1997,
    height: 3550,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/orig/2022-Outlier-IdeasForSpring-50.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/thumb/2022-Outlier-IdeasForSpring-50.jpg",
    width: 1997,
    height: 3550,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/orig/2022-Outlier-IdeasForSpring-51.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas3/thumb/2022-Outlier-IdeasForSpring-51.jpg",
    width: 1997,
    height: 3550,
  },
];

function Ideas3Credits() {
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
              <th scope="row">Design Assistant</th>
              <td>Jeremy Wood</td>
            </tr>
            <tr>
              <th scope="row">Hair</th>
              <td>Sergio Estrada</td>
            </tr>
            <tr>
              <th scope="row">Makeup</th>
              <td>Laurel Charleston, Brian Vu</td>
            </tr>
            <tr>
              <th scope="row">Models</th>
              <td>
                Bowen, Nick, Tony, June, Brett, Liam, Jameel, CJR, Panthera,
                Sasha, Omar, Jeremy, Hasan
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Ideas3() {
  const [index, setIndex] = useState(-1);

  const handleClick = (index: number) => setIndex(index);

  return (
    <>
      <h1>IDEAS 3</h1>
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
      <Ideas3Credits />
    </>
  );
}

export default Ideas3;

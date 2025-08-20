import { useState } from "react";
import { Gallery } from "react-grid-gallery";
import Lightbox from "./Lightbox";
import "./collections.css";

/* eslint-disable @cspell/spellchecker, max-len */

const images = [
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/orig/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-1.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/thumb/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-1.jpg",
    width: 4815,
    height: 7246,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/orig/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-2.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/thumb/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-2.jpg",
    width: 4815,
    height: 7246,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/orig/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-3.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/thumb/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-3.jpg",
    width: 4815,
    height: 7246,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/orig/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-4.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/thumb/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-4.jpg",
    width: 4815,
    height: 7246,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/orig/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-5.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/thumb/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-5.jpg",
    width: 4815,
    height: 7246,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/orig/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-6.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/thumb/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-6.jpg",
    width: 4815,
    height: 7246,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/orig/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-7.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/thumb/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-7.jpg",
    width: 4815,
    height: 7246,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/orig/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-8.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/thumb/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-8.jpg",
    width: 4815,
    height: 7240,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/orig/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-9.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/thumb/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-9.jpg",
    width: 4815,
    height: 7240,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/orig/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-10.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/thumb/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-10.jpg",
    width: 4815,
    height: 7240,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/orig/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-11.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/thumb/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-11.jpg",
    width: 4815,
    height: 7240,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/orig/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-12.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/thumb/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-12.jpg",
    width: 4833,
    height: 7240,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/orig/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-13.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/thumb/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-13.jpg",
    width: 4836,
    height: 7240,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/orig/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-14.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/thumb/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-14.jpg",
    width: 4831,
    height: 7240,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/orig/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-15.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/thumb/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-15.jpg",
    width: 4815,
    height: 7240,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/orig/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-16.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/thumb/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-16.jpg",
    width: 4815,
    height: 7240,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/orig/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-17.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/thumb/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-17.jpg",
    width: 4815,
    height: 7240,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/orig/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-18.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/thumb/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-18.jpg",
    width: 4815,
    height: 7240,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/orig/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-19.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/thumb/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-19.jpg",
    width: 4836,
    height: 7240,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/orig/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-20.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/thumb/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-20.jpg",
    width: 4815,
    height: 7240,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/orig/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-21.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/thumb/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-21.jpg",
    width: 4820,
    height: 7240,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/orig/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-22.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/thumb/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-22.jpg",
    width: 4815,
    height: 7240,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/orig/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-23.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/thumb/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-23.jpg",
    width: 4815,
    height: 7240,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/orig/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-24.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/thumb/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-24.jpg",
    width: 4815,
    height: 7240,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/orig/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-25.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/thumb/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-25.jpg",
    width: 4815,
    height: 7240,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/orig/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-26.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/thumb/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-26.jpg",
    width: 4815,
    height: 7240,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/orig/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-27.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/thumb/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-27.jpg",
    width: 4815,
    height: 7240,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/orig/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-28.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/thumb/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-28.jpg",
    width: 4827,
    height: 7240,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/orig/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-29.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/thumb/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-29.jpg",
    width: 4815,
    height: 7240,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/orig/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-30.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/thumb/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-30.jpg",
    width: 4815,
    height: 7240,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/orig/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-31.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/thumb/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-31.jpg",
    width: 4815,
    height: 7226,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/orig/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-32.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/thumb/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-32.jpg",
    width: 4815,
    height: 7240,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/orig/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-33.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/thumb/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-33.jpg",
    width: 4818,
    height: 7255,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/orig/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-34.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/thumb/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-34.jpg",
    width: 4815,
    height: 7226,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/orig/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-35.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/thumb/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-35.jpg",
    width: 4815,
    height: 7240,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/orig/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-36.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/thumb/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-36.jpg",
    width: 4815,
    height: 7240,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/orig/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-37.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/thumb/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-37.jpg",
    width: 4815,
    height: 7240,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/orig/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-38.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/thumb/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-38.jpg",
    width: 4815,
    height: 7240,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/orig/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-39.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/thumb/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-39.jpg",
    width: 4815,
    height: 7240,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/orig/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-40.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas6/thumb/WILLIENORRIS-FOR-OUTLIER-SS24-LOOK-40.jpg",
    width: 4815,
    height: 7240,
  },
];

function Ideas6Credits() {
  return (
    <div className="row mt-5">
      <div className="col-md-8 col-lg-6 col-xxl-4">
        <h3>Credits</h3>
        <table className="credits-table table table-borderless table-sm">
          <tbody>
            <tr>
              <th scope="row">Design and Creative Direction</th>
              <td>Willie Norris</td>
            </tr>
            <tr>
              <th scope="row">Photography</th>
              <td>Jon-Paul Rodriguez</td>
            </tr>
            <tr>
              <th scope="row">Set Design</th>
              <td>Taylor Horne</td>
            </tr>
            <tr>
              <th scope="row">Lighting Direction</th>
              <td>Jimmy Kim</td>
            </tr>
            <tr>
              <th scope="row">Digi Tech</th>
              <td>Jordan Zuppa</td>
            </tr>
            <tr>
              <th scope="row">Set Design Assistance</th>
              <td>Javier Rivera Scalley</td>
            </tr>
            <tr>
              <th scope="row">Design Assistance</th>
              <td>Jeremy Wood</td>
            </tr>
            <tr>
              <th scope="row">On-Set Hair Styling</th>
              <td>Sergio Estrada</td>
            </tr>
            <tr>
              <th scope="row">Assisting Sergio</th>
              <td>Thomas Cook</td>
            </tr>
            <tr>
              <th scope="row">Buzzcut Wigs</th>
              <td>Shannon Romano</td>
            </tr>
            <tr>
              <th scope="row">Sun and Sand Makeup</th>
              <td>Alex Levy</td>
            </tr>
            <tr>
              <th scope="row">Assisting Alex</th>
              <td>Gabriel Barse</td>
            </tr>
            <tr>
              <th scope="row">Natural Makeup</th>
              <td>Chloe Grae</td>
            </tr>
            <tr>
              <th scope="row">Models</th>
              <td>
                Aiden, Dylan, Emeka, Jessica, Lars, Lauren, Nick, Norbu, Papi,
                Phillip, Presley, West
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Ideas6() {
  const [index, setIndex] = useState(-1);

  const handleClick = (index: number) => setIndex(index);

  return (
    <>
      <h1>IDEAS 6</h1>
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
      <Ideas6Credits />
    </>
  );
}

export default Ideas6;

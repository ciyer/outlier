import { useState } from "react";
import { Gallery } from "react-grid-gallery";
import Lightbox from "./Lightbox";
import "./collections.css";

const images = [
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/orig/01-Olly1-Outlier-MartiansGoHome.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/thumb/01-Olly1-Outlier-MartiansGoHome.jpg",
    width: 2000,
    height: 2499,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/orig/02-Anarcius1-Outlier-MartiansGoHome.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/thumb/02-Anarcius1-Outlier-MartiansGoHome.jpg",
    width: 2000,
    height: 2499,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/orig/03-Nick1-Outlier-MartiansGoHome.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/thumb/03-Nick1-Outlier-MartiansGoHome.jpg",
    width: 2000,
    height: 2499,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/orig/04-Pace1-Outlier-MartiansGoHome.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/thumb/04-Pace1-Outlier-MartiansGoHome.jpg",
    width: 2000,
    height: 2499,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/orig/05-Eddie1-Outlier-MartiansGoHome.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/thumb/05-Eddie1-Outlier-MartiansGoHome.jpg",
    width: 2000,
    height: 2499,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/orig/06-Kiril3-Outlier-MartiansGoHome.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/thumb/06-Kiril3-Outlier-MartiansGoHome.jpg",
    width: 2000,
    height: 2499,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/orig/07-Jeremy1-Outlier-MartiansGoHome.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/thumb/07-Jeremy1-Outlier-MartiansGoHome.jpg",
    width: 2000,
    height: 2499,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/orig/08-Leul1-Outlier-MartiansGoHome.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/thumb/08-Leul1-Outlier-MartiansGoHome.jpg",
    width: 2000,
    height: 2499,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/orig/09-Tony3-Outlier-MartiansGoHome.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/thumb/09-Tony3-Outlier-MartiansGoHome.jpg",
    width: 2000,
    height: 2500,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/orig/10-Pace3-Outlier-MartiansGoHome.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/thumb/10-Pace3-Outlier-MartiansGoHome.jpg",
    width: 2000,
    height: 2500,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/orig/11-Anarcius3-Outlier-MartiansGoHome.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/thumb/11-Anarcius3-Outlier-MartiansGoHome.jpg",
    width: 2000,
    height: 2500,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/orig/12-Eddie3-Outlier-MartiansGoHome.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/thumb/12-Eddie3-Outlier-MartiansGoHome.jpg",
    width: 2000,
    height: 2500,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/orig/13-Olly3-Outlier-MartiansGoHome.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/thumb/13-Olly3-Outlier-MartiansGoHome.jpg",
    width: 2000,
    height: 2500,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/orig/14-June3-Outlier-MartiansGoHome.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/thumb/14-June3-Outlier-MartiansGoHome.jpg",
    width: 2000,
    height: 2500,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/orig/15-Nick3-Outlier-MartiansGoHome.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/thumb/15-Nick3-Outlier-MartiansGoHome.jpg",
    width: 2000,
    height: 2500,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/orig/16-Leul3-Outlier-MartiansGoHome.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/thumb/16-Leul3-Outlier-MartiansGoHome.jpg",
    width: 2000,
    height: 2500,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/orig/17-Eddie2-Outlier-MartiansGoHome.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/thumb/17-Eddie2-Outlier-MartiansGoHome.jpg",
    width: 2000,
    height: 2500,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/orig/18-Pace2-Outlier-MartiansGoHome.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/thumb/18-Pace2-Outlier-MartiansGoHome.jpg",
    width: 2000,
    height: 2500,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/orig/19-Tony2-Outlier-MartiansGoHome.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/thumb/19-Tony2-Outlier-MartiansGoHome.jpg",
    width: 2000,
    height: 2500,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/orig/20-Anarcius2-Outlier-MartiansGoHome.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/thumb/20-Anarcius2-Outlier-MartiansGoHome.jpg",
    width: 2000,
    height: 2500,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/orig/21-June2-Outlier-MartiansGoHome.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/thumb/21-June2-Outlier-MartiansGoHome.jpg",
    width: 2000,
    height: 2500,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/orig/22-Leul2-Outlier-MartiansGoHome.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/thumb/22-Leul2-Outlier-MartiansGoHome.jpg",
    width: 2000,
    height: 2500,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/orig/23-Nick2-Outlier-MartiansGoHome.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/thumb/23-Nick2-Outlier-MartiansGoHome.jpg",
    width: 2000,
    height: 2500,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/orig/24-Olly2-Outlier-MartiansGoHome.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/thumb/24-Olly2-Outlier-MartiansGoHome.jpg",
    width: 2000,
    height: 2500,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/orig/25-Tony1-Outlier-MartiansGoHome.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/thumb/25-Tony1-Outlier-MartiansGoHome.jpg",
    width: 2000,
    height: 2499,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/orig/26-Kiril2-Outlier-MartiansGoHome.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/thumb/26-Kiril2-Outlier-MartiansGoHome.jpg",
    width: 2000,
    height: 2499,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/orig/27-Kiril1-Outlier-MartiansGoHome.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/thumb/27-Kiril1-Outlier-MartiansGoHome.jpg",
    width: 2000,
    height: 2499,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/orig/28-June4-Outlier-MartiansGoHome.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas2/thumb/28-June4-Outlier-MartiansGoHome.jpg",
    width: 2000,
    height: 2499,
  },
];

function Ideas2Credits() {
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
              <td>Mimi D’Autremont</td>
            </tr>
            <tr>
              <th scope="row">Design Assistant</th>
              <td>Jeremy Wood, Lee Copperwheat</td>
            </tr>
            <tr>
              <th scope="row">Groomer</th>
              <td>Michael Moreno</td>
            </tr>
            <tr>
              <th scope="row">Hair</th>
              <td>Sergio Estrada</td>
            </tr>
            <tr>
              <th scope="row">Makeup</th>
              <td>Chloe Grae</td>
            </tr>
            <tr>
              <th scope="row">Makeup Assistant</th>
              <td>Will Metiver</td>
            </tr>
            <tr>
              <th scope="row">Models</th>
              <td>
                Kirill, Tony, Leul, Pace, Olly, Eddie Nick, Anarcius, June
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Ideas2() {
  const [index, setIndex] = useState(-1);

  const handleClick = (index: number) => setIndex(index);

  return (
    <>
      <h1>IDEAS 2</h1>
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
      <Ideas2Credits />
    </>
  );
}

export default Ideas2;

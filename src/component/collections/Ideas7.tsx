import { useState } from "react";
import { Gallery } from "react-grid-gallery";
import Lightbox from "./Lightbox";
import "./collections.css";

const images = [
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-1.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-1.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-2.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-2.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-3.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-3.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-4.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-4.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-5.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-5.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-6.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-6.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-7.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-7.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-8.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-8.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-9.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-9.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-10.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-10.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-11.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-11.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-12.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-12.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-13.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-13.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-14.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-14.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-15.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-15.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-16.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-16.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-17.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-17.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-18.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-18.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-19.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-19.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-20.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-20.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-21.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-21.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-22.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-22.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-23.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-23.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-24.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-24.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-25.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-25.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-26.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-26.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-27.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-27.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-28.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-28.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-29.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-29.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-30.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-30.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-31.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-31.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-32.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-32.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-33.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-33.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-34.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-34.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-35.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-35.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-36.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-36.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-37.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-37.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-38.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-38.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-39.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-39.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-40.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-40.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-41.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-41.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-42.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-42.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-43.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-43.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-44.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-44.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-45.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-45.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-46.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-46.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-47.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-47.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-48.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-48.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-49.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-49.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-50.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-50.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-51.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-51.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-52.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-52.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-53.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-53.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-54.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-54.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-55.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-55.jpg",
    width: 2732,
    height: 4096,
  },
  {
    original:
      "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/orig/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-56.jpg",
    src: "https://s3.amazonaws.com/com.illposed.outlier/collections/ideas7/thumb/WILLIENORRIS-FOR-OUTLIER-FW24-LOOK-56.jpg",
    width: 2732,
    height: 4096,
  },
];
function Ideas7Credits() {
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
              <th scope="row">Runway Photography</th>
              <td>Hunter Abrams</td>
            </tr>
            <tr>
              <th scope="row">Runway Videographer</th>
              <td>Jon-Paul Rodriguez</td>
            </tr>
            <tr>
              <th scope="row">Runway Video Details</th>
              <td>Chris Chin</td>
            </tr>
            <tr>
              <th scope="row">Art Direction And Production</th>
              <td>Lauren Piven</td>
            </tr>
            <tr>
              <th scope="row">Styling</th>
              <td>Roberto Johnson</td>
            </tr>
            <tr>
              <th scope="row">On-Set Styling Assistance</th>
              <td>Ashleigh Aston, Wayne Phillips-Gelley</td>
            </tr>
            <tr>
              <th scope="row">Set Design</th>
              <td>Jacob Burstein</td>
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
              <th scope="row">Makeup And Slime</th>
              <td>Alex Levy</td>
            </tr>
            <tr>
              <th scope="row">Assisting Alex</th>
              <td>Gabriel Barse</td>
            </tr>
            <tr>
              <th scope="row">Ice Makeup</th>
              <td>Sterling Tull</td>
            </tr>
            <tr>
              <th scope="row">Assisting Sterling</th>
              <td>Desiree Rose</td>
            </tr>
            <tr>
              <th scope="row">Movement Coordinator</th>
              <td>Jesse Kovarsky</td>
            </tr>
            <tr>
              <th scope="row">Lighting Direction</th>
              <td>Julian Tran</td>
            </tr>
            <tr>
              <th scope="row">Digi Tech</th>
              <td>Sam Lee</td>
            </tr>
            <tr>
              <th scope="row">Set Design Assistance</th>
              <td>Cullen O’Grady</td>
            </tr>
            <tr>
              <th scope="row">Design Assistance</th>
              <td>Jeremy Wood</td>
            </tr>
            <tr>
              <th scope="row">BTS Photography</th>
              <td>Maxwell Vice, River Delito</td>
            </tr>
            <tr>
              <th scope="row">BTS Reporting</th>
              <td>Liana Satenstein</td>
            </tr>
            <tr>
              <th scope="row">Modeling</th>
              <td>Emeka, Julio, Oscar, Ian, Ben, Nick, Marquis, Paige</td>
            </tr>
            <tr>
              <th scope="row">Production Coordination</th>
              <td>Christine Sharifian</td>
            </tr>
            <tr>
              <th scope="row">Press</th>
              <td>Sydney Reising, BPCM</td>
            </tr>
            <tr>
              <th scope="row">Executive Production</th>
              <td>Abe Burmeister and Tyler Clemens</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Ideas7() {
  const [index, setIndex] = useState(-1);

  const handleClick = (index: number) => setIndex(index);

  return (
    <>
      <h1>IDEAS 7</h1>
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
      <Ideas7Credits />
    </>
  );
}

export default Ideas7;

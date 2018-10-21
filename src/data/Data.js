import * as d3fetch from 'd3-fetch';
import * as d3time from 'd3-time-format';

const dateParser = d3time.timeParse("%Y-%m-%d");
const dateFormatter = d3time.timeFormat("%b %d %Y");

function dateToSeason(date) {
  const month = date.getMonth();
  if (month < 2) return "Winter"
  else if (month < 5) return "Spring";
  else if (month < 8) return "Summer";
  else if (month < 11) return "Fall";
  return "Winter"
}

function dataToSubcategory(data) {
  if (data['Category'] !== 'Clothes') return "Object";
  const dtype = data['Type'];
  if (dtype === 'Pants' || dtype === 'Shorts' || dtype === 'Sweatpants') return 'Pants';
  if (dtype === 'Shirt' || dtype === 'T-Shirt' || dtype === 'Tank Top') return 'Shirts';
  return 'Outerwear';
}

function cleanCsvRow(d) {
  const price = d["Price"];
  if (price.length > 0) d["Price"] = +d["Price"];

  const release = d["Release"];
  d.subcategory = dataToSubcategory(d)
  if (release.length > 0) {
    const releaseDate = dateParser(d["Release"]);
    d.releaseDate = releaseDate;
    d["Release"] = dateFormatter(releaseDate);
    d.season = dateToSeason(releaseDate);
  } else {
    d.releaseDate = null;
  }

  return d;
}

async function read() {
  const rows = await d3fetch.csv("/outlier-data.csv", cleanCsvRow);
  return rows;
}

export default { read, cleanCsvRow }

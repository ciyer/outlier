import React, { Component } from 'react';

import { Link } from 'react-router-dom'

import { urlStringForProductName } from '../utils';

// Not currently used, but keeping around in case...
// function isSingleProduct(releases) {
//   const productName = releases[0]['Product']
//   return releases.every(r => r['Product'] === productName);
// }

class ReleaseImageUnique extends Component {
  render() {
    const r = this.props.release;
    const seenmap = this.props.seenmap;
    const src = r['Image'];
    const notSeen = (seenmap[src] == null);
    if (notSeen) seenmap[src] = true;
    // Return just the image once
    if (notSeen)
      return <img src={src} alt={r['Product']} style={{width:"calc(20%)", height:"calc(20%)"}} />;
    return <span></span>;
  }
}

class ReleaseImagesUnique extends Component {

  render() {
    const releases = this.props.releases;
    const seenmap = {};
    const images = releases.map((r, i) => <ReleaseImageUnique key={i} release={r} seenmap={seenmap} />);
    return <div className="d-flex flex-wrap p-2">
      {images}
    </div>
  }
}

class ReleaseImageTitled extends Component {
  render() {
    const r = this.props.release;
    const src = r['Image'];
    // Return img and text
    return <div className="p-2" style={{width: "calc(15%)", height:"calc(15%)", minWidth: "100px", minHeight: "100px"}}>
      <Link to={`${this.props.productUrl}/${urlStringForProductName(r.Product)}`}>
        <p key="title">{r.Product}</p>
        <img key="image" src={src} alt={r.Product} style={{width: "100%", height:"100%"}} />
      </Link>
    </div>
  }
}

class ReleaseImagesTitled extends Component {

  render() {
    const releases = this.props.releases;
    const productUrl = this.props.productUrl;
    const images = releases.map((r, i) => <ReleaseImageTitled key={i} release={r} productUrl={productUrl} />);
    return <div className="d-flex flex-wrap">
      {images}
    </div>
  }
}


export { ReleaseImagesUnique, ReleaseImagesTitled };

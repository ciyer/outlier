/**
 *  Independent Outlier Archive
 *
 *  Copyright (c) 2014-2015 Chandrasekhar Ramakrishnan
 *
 *  Released under GPL license.
 */


// Development config
// require.config({
//   "urlArgs": "bust=" +  (new Date()).getTime(),
//   "paths": {
//     "babel": "babel/babel-5.8.22.min",
//     "es6": "babel/es6",
//     "backbone": "backbone/backbone",
//     "d3": "d3/d3",
//     "enquire": "enquire/enquire",
//     "jquery": "jquery/jquery",
//     "react": "react/react",
//     "react-dom": "react/react-dom",
//     "underscore": "underscore/underscore"
//   }
// });

// Production config
require.config({
  "paths": {
    "babel": "babel/babel-5.8.22.min",
    "es6": "babel/es6",
    "backbone": "https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.2.3/backbone-min",
    "d3": "https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min",
    "enquire": "enquire/enquire",
    "jquery": "https://code.jquery.com/jquery-1.11.3.min",
    "react": "https://cdnjs.cloudflare.com/ajax/libs/react/0.14.0/react.min",
    "react-dom": "https://cdnjs.cloudflare.com/ajax/libs/react/0.14.0/react-dom.min",
    "underscore": "https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min"
  }
});

requirejs(["app/app"], function(app) {
  $(document).ready(app.enter)
});

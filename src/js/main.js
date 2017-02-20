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
    "backbone": "https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.2.3/backbone-min",
    "d3": "https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min",
    "enquire": "enquire/enquire",
    "jquery": "https://code.jquery.com/jquery-1.11.3.min",
    "react": "https://unpkg.com/react@15/dist/react.min",
    "react-dom": "https://unpkg.com/react-dom@15/dist/react-dom.min",
    "underscore": "https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min"
  }
});

requirejs(["app/app"], function(app) {
  $(document).ready(app.enter)
});

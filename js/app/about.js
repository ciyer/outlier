/**
 *  Independent Outlier Archive
 *
 *  Copyright (c) 2014-2015 Chandrasekhar Ramakrishnan
 *
 *  Released under GPL license.
 */

 /**
  * Implementation of the about information.
  */

import React from 'react'

var Guide = React.createClass({
  render: function() {
    return (<div className="col-md-8">
              <h3>Guide</h3>
                <h4>Use</h4>
                  <p>The clothsography shows most <a href="http://www.outlier.cc">Outlier</a> releases made in the period from April 2011 to {this.props.endmonth} {this.props.endyear}, and a few from earlier as well.</p>
                  <p>
                    To focus on certain kinds of items, turn on one or more of the filters from the top left. For example, to see just shirts for women, expand <strong>Clothes</strong> and select <strong>Shirts</strong> then expand <strong>Men/Women/Unisex</strong> and select <strong>Women</strong>.
                  </p>
                  <h4>Release Frequency Stats</h4>
                  <p>
                    The frequency statistics try to convey how often items are released. The statistics are computed for individual products and the filtered release table as well. The statistics only show historical patterns and may not extrapolate to the future.
                  </p>
                  <p>
                    The stats show the following:
                  </p>
                  <ul>
                    <li>Releases per year &mdash; computed by counting at all matching releases and dividing by the number of years covered.</li>
                    <li>Average gap between releases &mdash; computed by dividing 52 by the number of releases per year.</li>
                    <li>Expected deviation from gap &mdash; computed by taking the average absolute difference between the average gap and actual gaps between releases.</li>
                    <li>Last release &mdash; date of the last matching release.</li>
                  </ul>
                  <h4>Data Sources</h4>
                  <p>
                    The data on release dates is from <a href="http://milled.com/outlier">Milled/Outlier</a>, <a href="https://twitter.com/outlier">twitter</a>, and <a href="https://reddit.com/r/outlier">reddit</a>; price data is mostly from the Outlier web site; any mistakes are mine alone. If you spot something, let <a href="https://twitter.com/ciyer">me (@ciyer) know</a>.
                  </p>
                  <h4>Code</h4>
                  <p>
                    The code is available on <a href="https://github.com/ciyer/outlier">GitHub</a>, in particular the data is available as <a href="https://github.com/ciyer/outlier/blob/master/outlier-data.csv">outlier-data.csv</a>.
                  </p>
            </div>)
  }
});


var AboutClass = React.createClass({
  displayName: 'About',
  render: function() {
    return (<div className='row' style={{padding: "10px 0px 0px 0px"}}><Guide {...this.props} /></div>)
  }
});

var About = React.createFactory(AboutClass);

export default { About: About }

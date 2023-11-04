import React, { Component } from 'react';

import * as vega from 'vega';

class Histogram extends Component {
  constructor(props) {
    super(props)
    this._container = null;
    this.state = { view: null }
  }

  componentDidMount() {
    const spec = this._spec();
    const hist = this.props.data;
    const view = new vega.View(vega.parse(spec))
      .renderer('canvas')  // set renderer (canvas or svg)
      .initialize(this._container) // initialize view within parent DOM container
      .hover()             // enable hover encode set processing
      .change("hist", vega.changeset().insert(hist))
      .run();
    this.setState({ view });
  }

componentDidUpdate(prevProps, prevState) {
    const view = prevState.view;
    if (view == null) return;
    const oldHist = prevProps.data;
    if (oldHist === this.props.data) return;
    view.change("hist", vega.changeset().remove(oldHist).insert(this.props.data));
    view.run();
}

  render() {
//     const monthHistogram = this.props.data;
//     const displayHist = monthHistogram.map(d => `${d.label}:${d.count} `)
    return <div ref={(e) => this._container = e} />
  }

  _spec() {
    const width = this.props.width || 200;
    const height = this.props.height || width / 2;
    const hist = this.props.data;
    const counts = hist.map(d => d.count);
    const maxCount = Math.max(...counts);
    const yTickCount = maxCount < 8 ? maxCount : 8;
    const labelLength = this.props.labellength || 1;
    const xLabelExpr =
      (labelLength > 0) ?
        `substring(datum.value, 0, ${labelLength})` :
        "datum.value"

      const colors = this.props.colors || {}
      const fill = colors.fill || "#0570b0", hover = colors.hover || "#74a9cf";
    return {
      "$schema": "https://vega.github.io/schema/vega/v4.json",
      "width": width,
      "height": height,
      "padding": 5,
      "data": [{"name": "hist"}],
      "signals": [
        {
          "name": "tooltip",
          "value": {},
          "on": [
            {"events": "rect:mouseover", "update": "datum"},
            {"events": "rect:mouseout",  "update": "{}"}
          ]
        }
      ],

      "scales": [
        {
          "name": "xscale",
          "type": "band",
          "domain": {"data": "hist", "field": "name"},
          "range": "width",
          "padding": 0.05,
          "round": true
        },
        {
          "name": "yscale",
          "domain": {"data": "hist", "field": "count"},
          "nice": true,
          "range": "height"
        },
      ],

      "axes": [
        {
          "orient": "bottom", "scale": "xscale",
          "encode": { "labels":
            {
              "update": {
                "text": {
                  "signal": xLabelExpr
                }
              }
            }
          }
        },
        { "orient": "left", "scale": "yscale", "tickCount": yTickCount }
      ],

      "marks": [
        {
          "type": "rect",
          "from": {"data":"hist"},
          "encode": {
            "enter": {
              "x": {"scale": "xscale", "field": "name"},
              "width": {"scale": "xscale", "band": 1},
              "y": {"scale": "yscale", "field": "count"},
              "y2": {"scale": "yscale", "value": 0}
            },
            "update": {
              "fill": {"value": fill}
            },
            "hover": {
              "fill": {"value": hover}
            }
          }
        },
        {
          "type": "text",
          "encode": {
            "enter": {
              "align": {"value": "center"},
              "baseline": {"value": "bottom"},
              "fill": {"value": "#333"}
            },
            "update": {
              "x": {"scale": "xscale", "signal": "tooltip.name", "band": 0.5},
              "y": {"scale": "yscale", "signal": "tooltip.count", "offset": -2},
              "text": {"signal": "tooltip.count"},
              "fillOpacity": [
                {"test": "datum === tooltip", "value": 0},
                {"value": 1}
              ]
            }
          }
        }
      ]
    }
  }
}

// function _spec() {
//   return {
//     "$schema": "https://vega.github.io/schema/vega/v4.json",
//     "width": 200,
//     "height": 100,
//     "padding": 5,
//
//     "data": [
//       {
//         "name": "table",
//         "values": [
//           {"category": "A", "amount": 28},
//           {"category": "B", "amount": 55},
//           {"category": "C", "amount": 43},
//           {"category": "D", "amount": 91},
//           {"category": "E", "amount": 81},
//           {"category": "F", "amount": 53},
//           {"category": "G", "amount": 19},
//           {"category": "H", "amount": 87}
//         ]
//       }
//     ],
//
//     "signals": [
//       {
//         "name": "tooltip",
//         "value": {},
//         "on": [
//           {"events": "rect:mouseover", "update": "datum"},
//           {"events": "rect:mouseout",  "update": "{}"}
//         ]
//       }
//     ],
//
//     "scales": [
//       {
//         "name": "xscale",
//         "type": "band",
//         "domain": {"data": "table", "field": "category"},
//         "range": "width",
//         "padding": 0.05,
//         "round": true
//       },
//       {
//         "name": "yscale",
//         "domain": {"data": "table", "field": "amount"},
//         "nice": true,
//         "range": "height"
//       }
//     ],
//
//     "axes": [
//       { "orient": "bottom", "scale": "xscale" },
//       { "orient": "left", "scale": "yscale" }
//     ],
//
//     "marks": [
//       {
//         "type": "rect",
//         "from": {"data":"table"},
//         "encode": {
//           "enter": {
//             "x": {"scale": "xscale", "field": "category"},
//             "width": {"scale": "xscale", "band": 1},
//             "y": {"scale": "yscale", "field": "amount"},
//             "y2": {"scale": "yscale", "value": 0}
//           },
//           "update": {
//             "fill": {"value": "steelblue"}
//           },
//           "hover": {
//             "fill": {"value": "red"}
//           }
//         }
//       },
//       {
//         "type": "text",
//         "encode": {
//           "enter": {
//             "align": {"value": "center"},
//             "baseline": {"value": "bottom"},
//             "fill": {"value": "#333"}
//           },
//           "update": {
//             "x": {"scale": "xscale", "signal": "tooltip.category", "band": 0.5},
//             "y": {"scale": "yscale", "signal": "tooltip.amount", "offset": -2},
//             "text": {"signal": "tooltip.amount"},
//             "fillOpacity": [
//               {"test": "datum === tooltip", "value": 0},
//               {"value": 1}
//             ]
//           }
//         }
//       }
//     ]
//   }
// }

export default Histogram;

import React, { Component } from 'react';

import * as vega from 'vega';

class BinnedScatter extends Component {
  constructor(props) {
    super(props)
    this._container = null;
    this.state = { view: null }
  }

  componentDidMount() {
    const spec = this._spec();
    const source = this.props.data;
    const view = new vega.View(vega.parse(spec))
      .renderer('canvas')  // set renderer (canvas or svg)
      .initialize(this._container) // initialize view within parent DOM container
      .hover()             // enable hover encode set processing
      .change("source", vega.changeset().insert(source))
      .run();
    this.setState({ view });
  }

componentDidUpdate(prevProps, prevState) {
    const view = prevState.view;
    if (view == null) return;
    const oldHist = prevProps.data;
    if (oldHist === this.props.data) return;
    view.change("source", vega.changeset().remove(oldHist).insert(this.props.data));
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
    const source = this.props.data;
    const bins = source.map(d => d.bin);
    const maxBin = Math.max(...bins);
    const yTickCount = maxBin < 8 ? maxBin : 8;
    const colors = this.props.colors || {};
    // TODO Use maxCount to dertermine the range of point size.
    // const counts = source.map(d => d.count);
    // const maxCount = Math.max(...counts);
    const fill = colors.fill || "#0570b0", hover = colors.hover || "#74a9cf";
    return {
      "$schema": "https://vega.github.io/schema/vega/v4.json",
      "width": width,
      "height": height,
      "padding": 5,
      "autosize": "pad",
      "data": [
        {"name": "source"},
        // TODO Filter out 0s
      ],
      "signals": [
        {
          "name": "tooltip",
          "value": {},
          "on": [
            {"events": "symbol:mouseover", "update": "datum"},
            {"events": "symbol:mouseout",  "update": "{}"}
          ]
        }
      ],

      "scales": [
        {
          "name": "xscale",
          "type": "point",
          "domain": {"data": "source", "field": "year"},
          "range": "width",
          "padding": 0.05
        },
        {
          "name": "yscale",
          "domain": {"data": "source", "field": "bin"},
          "nice": true,
          "round": true,
          "range": "height"
        },
        {
          "name": "size",
          "type": "sqrt",
          "domain": {"data": "source", "field": "count"},
          "range": [20, 100]
        },
      ],

      "axes": [
        {"orient": "bottom", "scale": "xscale" },
        { "orient": "left", "scale": "yscale", "tickCount": yTickCount }
      ],

      "marks": [
        {
          "name": "marks",
          "type": "symbol",
          "from": {"data":"source"},
          "encode": {
            "enter": {
              "x": {"scale": "xscale", "field": "year"},
              "y": {"scale": "yscale", "field": "bin"},
              "size": {"scale": "size", "field": "count"},
              "shape": {"value": "circle"},
              "fillOpacity": {"value": 0.7}
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
              "fill": {"value": "#000"}
            },
            "update": {
              "x": {"scale": "xscale", "signal": "tooltip.year"},
              "y": {"scale": "yscale", "signal": "tooltip.bin"},
              "text": {"signal": "(tooltip.bin != null) ? toString(tooltip.bin) + '(' + tooltip.count + ')' : ''"},
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

export default BinnedScatter;

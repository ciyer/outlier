import { useEffect, useRef, useState } from "react";
import * as vega from "vega";

import type { ChartBounds, ChartColors, HistogramData } from "./chart.types";

function _spec(
  data: HistogramData,
  bounds: ChartBounds | undefined,
  labelLength: number | undefined,
  colors: ChartColors = {}
): vega.Spec {
  const width = bounds?.width || 200;
  const height = bounds?.height || width / 2;
  const hist = data;
  const counts = hist.map((d) => d.count);
  const maxCount = Math.max(...counts);
  const yTickCount = maxCount < 6 ? maxCount : 6;
  labelLength = labelLength || 1;
  const xLabelExpr =
    labelLength > 0
      ? `substring(datum.value, 0, ${labelLength})`
      : "datum.value";

  const fill = colors.fill || "#0570b0",
    hover = colors.hover || "#74a9cf";
  return {
    $schema: "https://vega.github.io/schema/vega/v4.json",
    width: width,
    height: height,
    padding: 5,
    data: [{ name: "hist" }],
    signals: [
      {
        name: "tooltip",
        value: {},
        on: [
          { events: "rect:mouseover", update: "datum" },
          { events: "rect:mouseout", update: "{}" },
        ],
      },
    ],

    scales: [
      {
        name: "xscale",
        type: "band",
        domain: { data: "hist", field: "name" },
        range: "width",
        padding: 0.05,
        round: true,
      },
      {
        name: "yscale",
        domain: { data: "hist", field: "count" },
        nice: true,
        range: "height",
      },
    ],

    axes: [
      {
        orient: "bottom",
        scale: "xscale",
        encode: {
          labels: {
            update: {
              text: {
                signal: xLabelExpr,
              },
            },
          },
        },
      },
      { orient: "left", scale: "yscale", tickCount: yTickCount },
    ],

    marks: [
      {
        type: "rect",
        from: { data: "hist" },
        encode: {
          enter: {
            x: { scale: "xscale", field: "name" },
            width: { scale: "xscale", band: 1 },
            y: { scale: "yscale", field: "count" },
            y2: { scale: "yscale", value: 0 },
          },
          update: {
            fill: { value: fill },
          },
          hover: {
            fill: { value: hover },
          },
        },
      },
      {
        type: "text",
        encode: {
          enter: {
            align: { value: "center" },
            baseline: { value: "bottom" },
            fill: { value: "#333" },
          },
          update: {
            x: { scale: "xscale", signal: "tooltip.name", band: 0.5 },
            y: { scale: "yscale", signal: "tooltip.count", offset: -2 },
            text: { signal: "tooltip.count" },
            fillOpacity: [
              { test: "datum === tooltip", value: 0 },
              { value: 1 },
            ],
          },
        },
      },
    ],
  };
}

type HistogramProps = {
  bounds?: ChartBounds;
  labelLength?: number;
  data: HistogramData;
  colors?: ChartColors;
};
export default function Histogram({
  bounds,
  data,
  colors,
  labelLength,
}: HistogramProps) {
  const [view, setView] = useState<vega.View | null>(null);
  const [oldData, setOldData] = useState<HistogramData | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (ref.current == null) return;
    const spec = _spec(data, bounds, labelLength, colors);
    if (view == null) {
      const v = new vega.View(vega.parse(spec))
        .renderer("canvas") // set renderer (canvas or svg)
        .initialize(ref.current) // initialize view within parent DOM container
        .hover() // enable hover encode set processing
        .change("hist", vega.changeset().insert(data))
        .run();
      setOldData(data);
      setView(v);
    } else if (oldData !== data) {
      view.change("hist", vega.changeset().remove(oldData).insert(data));
      view.run();
      setOldData(data);
    }
  }, [bounds, data, colors, oldData, labelLength, ref, view]);

  return <div ref={ref} />;
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

import { useEffect, useRef, useState } from "react";
import * as vega from "vega";

import type {
  ChartBounds,
  ChartColors,
  BinnedScatterData,
} from "./chart.types";

function _spec(
  data: BinnedScatterData,
  bounds?: ChartBounds,
  colors?: ChartColors
): vega.Spec {
  const width = bounds?.width || 200;
  const height = bounds?.height || width / 2;
  const source = data;
  const bins = source.map((d) => d.bin);
  const maxBin = Math.max(...bins);
  const yTickCount = maxBin < 8 ? maxBin : 8;
  // TODO Use maxCount to determine the range of point size.
  // const counts = source.map(d => d.count);
  // const maxCount = Math.max(...counts);
  const fill = colors?.fill || "#0570b0",
    hover = colors?.hover || "#74a9cf";
  return {
    $schema: "https://vega.github.io/schema/vega/v4.json",
    width: width,
    height: height,
    padding: 5,
    autosize: "pad",
    data: [
      { name: "source" },
      // TODO Filter out 0s
    ],
    signals: [
      {
        name: "tooltip",
        value: {},
        on: [
          { events: "symbol:mouseover", update: "datum" },
          { events: "symbol:mouseout", update: "{}" },
        ],
      },
    ],

    scales: [
      {
        name: "xscale",
        type: "point",
        domain: { data: "source", field: "year" },
        range: "width",
        padding: 0.05,
      },
      {
        name: "yscale",
        domain: { data: "source", field: "bin" },
        nice: true,
        round: true,
        range: "height",
      },
      {
        name: "size",
        type: "sqrt",
        domain: { data: "source", field: "count" },
        range: [20, 100],
      },
    ],

    axes: [
      { orient: "bottom", scale: "xscale" },
      { orient: "left", scale: "yscale", tickCount: yTickCount },
    ],

    marks: [
      {
        name: "marks",
        type: "symbol",
        from: { data: "source" },
        encode: {
          enter: {
            x: { scale: "xscale", field: "year" },
            y: { scale: "yscale", field: "bin" },
            size: { scale: "size", field: "count" },
            shape: { value: "circle" },
            fillOpacity: { value: 0.7 },
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
            fill: { value: "#000" },
          },
          update: {
            x: { scale: "xscale", signal: "tooltip.year" },
            y: { scale: "yscale", signal: "tooltip.bin" },
            text: {
              signal:
                "(tooltip.bin != null) ? toString(tooltip.bin) + '(' + tooltip.count + ')' : ''",
            },
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

type BinnedScatterProps = {
  bounds?: ChartBounds;
  data: BinnedScatterData;
  colors?: ChartColors;
};
export default function BinnedScatter({
  bounds,
  data,
  colors,
}: BinnedScatterProps) {
  const [view, setView] = useState<vega.View | null>(null);
  const [oldData, setOldData] = useState<BinnedScatterData | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current == null) return;
    const spec = _spec(data, bounds, colors);
    if (view == null) {
      const v = new vega.View(vega.parse(spec))
        .renderer("canvas") // set renderer (canvas or svg)
        .initialize(ref.current) // initialize view within parent DOM container
        .hover() // enable hover encode set processing
        .change("source", vega.changeset().insert(data))
        .run();
      setOldData(data);
      setView(v);
    } else if (oldData !== data) {
      view.change("source", vega.changeset().remove(oldData).insert(data));
      view.run();
      setOldData(data);
    }
  }, [bounds, data, colors, oldData, ref, view]);

  return <div ref={ref} />;
}

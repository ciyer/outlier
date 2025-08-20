export type BinnedScatterData = Array<{
  year: number;
  bin: number;
  count: number;
}>;

export type ChartBounds = {
  width?: number;
  height?: number;
};

export type ChartColors = {
  fill?: string;
  hover?: string;
};

export type HistogramData = Array<{
  name: string;
  count: number;
}>;

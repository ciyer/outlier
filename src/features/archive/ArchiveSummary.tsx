import Histogram from "../chart/Histogram";

import {
  ReleaseBaselineStats,
  ReleaseSummary,
  type ComputedReleaseSummary,
} from "./ReleaseSummary";

import { type FilterArchiveResult } from "../controls/filter";

export type ArchiveSummaryProps = {
  data: FilterArchiveResult | null;
};

type ArchiveSummaryMaximalProps = {
  data: NonNullable<ArchiveSummaryProps["data"]>;
} & {
  summary: ComputedReleaseSummary | null;
};

function ArchiveSummaryMaximal({ data, summary }: ArchiveSummaryMaximalProps) {
  if (summary == null) return <p></p>;
  const totalNumberOfEntries = data.full ? data.full.length : 0;
  const numberOfEntries = data.filtered ? data.filtered.length : 0;
  const sizeText =
    numberOfEntries === totalNumberOfEntries
      ? `${totalNumberOfEntries} entries`
      : `${numberOfEntries} of ${totalNumberOfEntries} entries`;
  const monthHistogram = summary.monthHistogram;
  const seasonHistogram = summary.seasonHistogram;
  const priceHistogram = summary.priceHistogram;
  return (
    <>
      <p className="my-0">{sizeText}</p>
      <div className="d-flex flex-wrap">
        <div>
          <h3>Season</h3>
          <Histogram data={seasonHistogram} bounds={{ width: 175 }} />
        </div>
        <div>
          <h3>Month</h3>
          <Histogram data={monthHistogram} bounds={{ width: 175 }} />
        </div>
        <div>
          <h3>
            Price
            <span style={{ fontSize: "small", fontWeight: "normal" }}>
              {" "}
              (Median ${`${summary.priceMedian}`})
            </span>
          </h3>
          <Histogram
            data={priceHistogram}
            labelLength={-1}
            bounds={{ width: 175 }}
          />
        </div>
      </div>
    </>
  );
}

function ArchiveSummaryMinimal({ data, summary }: ArchiveSummaryMaximalProps) {
  if (summary == null) return <p></p>;
  const totalNumberOfEntries = data.full ? data.full.length : 0;
  const numberOfEntries = data.filtered ? data.filtered.length : 0;
  const sizeText =
    numberOfEntries === totalNumberOfEntries
      ? `${totalNumberOfEntries} entries`
      : `${numberOfEntries} of ${totalNumberOfEntries} entries`;
  return (
    <>
      <p className="my-0">{sizeText}</p>
    </>
  );
}

export default function ArchiveSummary({ data }: ArchiveSummaryProps) {
  if (data == null) return null;
  const baseline = new ReleaseBaselineStats(data.full).compute();
  const summary =
    baseline.priceBins == null
      ? null
      : new ReleaseSummary(data.filtered, baseline).compute();
  const useMinimalSummary = false;
  if (useMinimalSummary)
    return <ArchiveSummaryMinimal data={data} summary={summary} />;

  return <ArchiveSummaryMaximal data={data} summary={summary} />;
}

import Histogram from "../chart/Histogram";

import type { DataRow } from "./Data";
import {
  //  ReleaseColorSummary,
  //  ReleaseFabricSummary,
  ReleaseBaselineStats,
  ReleaseSummary,
  type ComputedReleaseSummary,
} from "./ReleaseSummary";

type ArchiveSummaryProps = {
  data: {
    full: DataRow[];
    filtered: DataRow[];
  } | null;
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
  return [
    <p key="sizetext">{sizeText}</p>,
    <div key="summary" className="d-flex flex-wrap">
      <div>
        <h3 key="seasonHeader">Season</h3>
        <Histogram
          key="seasonHistogram"
          data={seasonHistogram}
          bounds={{ width: 175 }}
        />
      </div>
      <div>
        <h3 key="monthHeader">Month</h3>
        <Histogram
          key="monthHistogram"
          data={monthHistogram}
          bounds={{ width: 175 }}
        />
      </div>
      <div>
        <h3 key="priceHeader">
          Price
          <span style={{ fontSize: "small", fontWeight: "normal" }}>
            {" "}
            (Median ${`${summary.priceMedian}`})
          </span>
        </h3>
        <Histogram
          key="priceHistogram"
          data={priceHistogram}
          labelLength={-1}
          bounds={{ width: 175 }}
        />
      </div>
    </div>,
  ];
}

function ArchiveSummaryMinimal({ data, summary }: ArchiveSummaryMaximalProps) {
  if (summary == null) return <p></p>;
  const totalNumberOfEntries = data.full ? data.full.length : 0;
  const numberOfEntries = data.filtered ? data.filtered.length : 0;
  const sizeText =
    numberOfEntries === totalNumberOfEntries
      ? `${totalNumberOfEntries} entries`
      : `${numberOfEntries} of ${totalNumberOfEntries} entries`;
  return [<p key="sizetext">{sizeText}</p>];
}

export default function ArchiveSummary({ data }: ArchiveSummaryProps) {
  if (data == null) return null;
  const baseline = new ReleaseBaselineStats(data.full).compute();
  const summary =
    baseline.priceBins == null
      ? null
      : new ReleaseSummary(data.filtered, baseline).compute();
  //   const fabricSummary =
  //     archive.summary.baseline.priceBins == null
  //       ? null
  //       : new ReleaseFabricSummary(archive.data.preFabricFilter).compute();
  //   const colorSummary =
  //     archive.summary.baseline.priceBins == null
  //       ? null
  //       : new ReleaseColorSummary(archive.data.filtered).compute();
  //   if (fabricSummary != null) {
  //     fabricSummary.colorUseCount = colorSummary.colorUseCount;
  //   }
  const useMinimalSummary = false;
  if (useMinimalSummary)
    return <ArchiveSummaryMinimal data={data} summary={summary} />;

  return <ArchiveSummaryMaximal data={data} summary={summary} />;
}

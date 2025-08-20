import React from "react";
import { Button, ButtonGroup, ButtonToolbar } from "reactstrap";

import Histogram from "../chart/Histogram";
import {
  Period,
  setPeriod,
  useControlsStateDispatch,
  useControlsStateSelector,
} from "../controls/controls.slice";

import {
  ReleaseBaselineStats,
  ReleaseSummary,
  type ComputedReleaseSummary,
} from "./ReleaseSummary";

import {
  periodFilterDescription,
  type FilterArchiveResult,
} from "../controls/filter";

export type ArchiveSummaryProps = {
  data: FilterArchiveResult | null;
  hidePeriod?: boolean;
};

type ArchiveSummaryMaximalProps = {
  data: NonNullable<ArchiveSummaryProps["data"]>;
  hidePeriod: NonNullable<ArchiveSummaryProps["hidePeriod"]>;
} & {
  summary: ComputedReleaseSummary | null;
};

function ArchivePeriodControls() {
  const { period } = useControlsStateSelector((state) => state.controls);
  const dispatch = useControlsStateDispatch();
  const onSetPeriod = React.useCallback(
    (period: Period) => {
      dispatch(setPeriod({ period }));
    },
    [dispatch]
  );
  const periodDescription = periodFilterDescription(period);
  return (
    <div className="mt-0 mb-3 d-flex align-items-center">
      <div className="fw-bold me-2">Period</div>
      <div>
        <ButtonToolbar role="toolbar">
          <ButtonGroup style={{ width: "100%" }} size="sm">
            <Button
              active={period === Period.CURRENT}
              color={period === Period.CURRENT ? "primary" : "secondary"}
              onClick={() => onSetPeriod(Period.CURRENT)}
            >
              Current
            </Button>
            <Button
              active={period === Period.LAST_5_YEARS}
              color={period === Period.LAST_5_YEARS ? "primary" : "secondary"}
              onClick={() => onSetPeriod(Period.LAST_5_YEARS)}
            >
              5 Years
            </Button>
            <Button
              active={period === Period.ALL}
              color={period === Period.ALL ? "primary" : "secondary"}
              onClick={() => onSetPeriod(Period.ALL)}
            >
              All
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
      <div>
        {periodDescription && <span className="ms-2">{periodDescription}</span>}
      </div>
    </div>
  );
}

function ArchiveSummaryMaximal({
  data,
  summary,
  hidePeriod,
}: ArchiveSummaryMaximalProps) {
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
      {!hidePeriod && <ArchivePeriodControls />}
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

function ArchiveSummaryMinimal({
  data,
  summary,
  hidePeriod,
}: ArchiveSummaryMaximalProps) {
  if (summary == null) return <p></p>;
  const totalNumberOfEntries = data.full ? data.full.length : 0;
  const numberOfEntries = data.filtered ? data.filtered.length : 0;
  const sizeText =
    numberOfEntries === totalNumberOfEntries
      ? `${totalNumberOfEntries} entries`
      : `${numberOfEntries} of ${totalNumberOfEntries} entries`;
  return (
    <>
      {!hidePeriod && <ArchivePeriodControls />}
      <p className="my-0">{sizeText}</p>
    </>
  );
}

export default function ArchiveSummary({
  data,
  hidePeriod,
}: ArchiveSummaryProps) {
  if (data == null) return null;
  const baseline = new ReleaseBaselineStats(data.full).compute();
  const summary =
    baseline.priceBins == null
      ? null
      : new ReleaseSummary(data.filtered, baseline).compute();
  const useMinimalSummary = false;
  if (useMinimalSummary)
    return (
      <ArchiveSummaryMinimal
        data={data}
        hidePeriod={!!hidePeriod}
        summary={summary}
      />
    );

  return (
    <ArchiveSummaryMaximal
      data={data}
      hidePeriod={!!hidePeriod}
      summary={summary}
    />
  );
}

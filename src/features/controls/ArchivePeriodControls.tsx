import React from "react";
import { Button, ButtonGroup, ButtonToolbar, FormText } from "reactstrap";

import {
  Period,
  setPeriod,
  useControlsStateDispatch,
  useControlsStateSelector,
} from "./controls.slice";

import { periodFilterDescription } from "./filter";

type ArchivePeriodControlsExplanationsProps = {
  period: Period;
};

function ArchivePeriodControlsExplanations({
  period,
}: ArchivePeriodControlsExplanationsProps) {
  if (period != Period.ALL) {
    return (
      <FormText color="muted">
        Only showing drops in the selected time period. Switch to <i>All</i> to
        see all drops.
      </FormText>
    );
  }
  return (
    <FormText color="muted">
      Showing all drops. Select a period to only see recent drops.
    </FormText>
  );
}

type ArchivePeriodControlsProps = {
  showExplanations: boolean;
};

export default function ArchivePeriodControls({
  showExplanations,
}: ArchivePeriodControlsProps) {
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
    <div className="d-flex flex-column mb-2">
      <div className="mt-0 mb-0 d-flex align-items-center">
        {!showExplanations && <div className="fw-bold me-2">Period &nbsp;</div>}
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
          {periodDescription && (
            <span className="ms-2">{periodDescription}</span>
          )}
        </div>
      </div>
      {showExplanations && (
        <ArchivePeriodControlsExplanations period={period} />
      )}
    </div>
  );
}

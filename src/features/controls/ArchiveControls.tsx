import React from "react";
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Col,
  FormText,
  Row,
} from "reactstrap";


import { type ArchiveSummaryProps } from "../archive/ArchiveSummary";
import {
  ReleaseColorSummary,
  ReleaseFabricSummary,
  ReleaseTextSummary,
} from "../archive/ReleaseSummary";

import ArchivePeriodControls from "./ArchivePeriodControls";
import ArchiveSortControls from "./ArchiveSortControls";
import {
  clearAllFilters,
  setShowImages,
  useControlsStateDispatch,
  useControlsStateSelector,
} from "./controls.slice";
import {
  ColorFilterGroup,
  FabricFilterGroup,
  TextFilterGroup,
} from "./autocomplete-controls";
import { CategoryFilterGroup } from "./basic-controls";
import { computeFilterSummary } from "./filter-summary";

type ArchiveDisplayControlsExplanationsProps = {
  showImages: boolean;
};
function ArchiveDisplayControlsExplanations({
  showImages,
}: ArchiveDisplayControlsExplanationsProps) {
  return showImages ? (
    <FormText color="muted">
      Switch to <i>Text</i> mode to see the drops as a textual table.
    </FormText>
  ) : (
    <FormText color="muted">
      <i>Images</i> mode shows the archive as an image grid.
    </FormText>
  );
}

type ArchiveDisplayControlsProps = {
  showExplanations: boolean;
};

function ArchiveDisplayControls({
  showExplanations,
}: ArchiveDisplayControlsProps) {
  const dispatch = useControlsStateDispatch();
  const { showImages } = useControlsStateSelector((state) => state.controls);
  const buttonClicked = React.useCallback(
    (option: string) => {
      if ("images" === option) dispatch(setShowImages({ showImages: true }));
      else if ("text" === option)
        dispatch(setShowImages({ showImages: false }));
    },
    [dispatch]
  );

  return (
    <>
      <div className="d-flex align-items-center w-100">
        {!showExplanations && <div className="fw-bold me-2">Display</div>}
        <ButtonToolbar className="flex-grow-1" role="toolbar">
          <ButtonGroup style={{ width: "100%" }} size="sm">
            <Button
              style={{ width: "100%" }}
              onClick={() => buttonClicked("images")}
              active={showImages}
              color={showImages ? "primary" : "secondary"}
            >
              Images
            </Button>
            <Button
              style={{ width: "100%" }}
              onClick={() => buttonClicked("text")}
              active={!showImages}
              color={!showImages ? "primary" : "secondary"}
            >
              Text
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
      {showExplanations && (
        <ArchiveDisplayControlsExplanations showImages={showImages} />
      )}
    </>
  );
}

type ArchiveFiltersProps = Pick<ArchiveControlsProps, "showExplanations"> & {
  showCategoryFilters: boolean;
  summary: {
    colorUseCount: Record<string, number>;
    fabricUseCount: Record<string, number>;
    textUseCount: Record<string, number>;
  };
};
function ArchiveFilters({
  showCategoryFilters,
  showExplanations,
  summary,
}: ArchiveFiltersProps) {
  const [expanded, setExpanded] = React.useState(!showExplanations);
  const onExpand = React.useCallback(() => {
    // e.preventDefault();
    setExpanded(!expanded);
  }, [expanded]);
  const { filters } = useControlsStateSelector((state) => state.controls);
  const dispatch = useControlsStateDispatch();
  const onClearAll = React.useCallback(() => {
    dispatch(clearAllFilters());
  }, [dispatch]);
  const filterSummary = computeFilterSummary(filters);
  const filterHeader = `Filters: ${filterSummary}`;
  const filtersUI =
    !expanded || !showCategoryFilters ? null : (
      <>
        <CategoryFilterGroup />
      </>
    );
  // Fabrics filter works a bit differently.
  const fabricFilterUI = expanded ? (
    <FabricFilterGroup summary={summary.fabricUseCount} />
  ) : null;
  // Name filter works a bit differently.
  const textFilterUI = expanded ? (
    <TextFilterGroup summary={summary.textUseCount} />
  ) : null;
  // Name filter works a bit differently.
  const colorFilterUI = expanded ? (
    <ColorFilterGroup summary={summary.colorUseCount} />
  ) : null;
  const clearButton =
    filterSummary !== "(show all)" ? (
      <Button
        key="clearAll"
        style={{ width: "100%" }}
        size="sm"
        onClick={onClearAll}
      >
        Clear All
      </Button>
    ) : null;

  return (
    <div style={{ paddingBottom: 20 }}>
      <div>
        <Button
          color="link"
          style={{ paddingLeft: 0, paddingBottom: 0 }}
          onClick={onExpand}
        >
          <b>{filterHeader}</b>
        </Button>
      </div>
      <div>
        <FormText color="muted">
          {expanded ? null : showCategoryFilters ? (
            <span>
              Use filters to focus on a specific set of drops by <i>Category</i>
              , <i>Fabric</i>, etc.
            </span>
          ) : (
            <span>
              Use filters to focus on a specific set of drops by <i>Fabric</i>,{" "}
              <i>Color</i>, etc.
            </span>
          )}
        </FormText>
      </div>
      {clearButton}
      {filtersUI}
      {fabricFilterUI}
      {textFilterUI}
      {colorFilterUI}
    </div>
  );
}

interface ArchiveControlsProps extends ArchiveSummaryProps {
  hidePeriod?: boolean;
  showCategoryFilters?: boolean;
  showExplanations?: boolean;
  showSort?: boolean;
}

export default function ArchiveControls({
  data,
  hidePeriod,
  showCategoryFilters,
  showExplanations,
  showSort,
}: ArchiveControlsProps) {
  if (showCategoryFilters == null) {
    showCategoryFilters = true;
  }
  if (showExplanations == null) {
    showExplanations = true;
  }
  let summary = { colorUseCount: {}, fabricUseCount: {}, textUseCount: {} };
  if (data != null) {
    const fabricSummary = new ReleaseColorSummary(
      data.topLevelFiltered
    ).compute() ?? {
      colorUseCount: {},
    };
    const colorSummary = new ReleaseFabricSummary(
      data.topLevelFiltered
    ).compute() ?? {
      fabricUseCount: {},
    };
    const textUseCount = new ReleaseTextSummary(
      data.topLevelFiltered
    ).compute();
    summary = {
      ...colorSummary,
      ...fabricSummary,
      ...textUseCount,
    };
  }
  return (
    <>
      <Row>
        <Col>
          {!hidePeriod && (
            <ArchivePeriodControls showExplanations={showExplanations} />
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <ArchiveDisplayControls showExplanations={showExplanations} />
        </Col>
      </Row>
      {showSort && (
        <Row className="my-2">
          <Col>
            <ArchiveSortControls />
          </Col>
        </Row>
      )}
      <Row>
        <Col>
          <ArchiveFilters
            showCategoryFilters={showCategoryFilters}
            showExplanations={showExplanations}
            summary={summary}
          />
        </Col>
      </Row>
    </>
  );
}

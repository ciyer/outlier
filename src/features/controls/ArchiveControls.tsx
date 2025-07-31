import React from "react";
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Col,
  FormText,
  Row,
} from "reactstrap";

import { CategoryFilterGroup } from "./basic-controls";
import { computeFilterSummary } from "./filter-summary";

import { type ArchiveSummaryProps } from "../archive/ArchiveSummary";
import {
  ReleaseColorSummary,
  ReleaseFabricSummary,
  ReleaseTextSummary,
} from "../archive/ReleaseSummary";
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

function ArchiveDisplayControls() {
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
      <ButtonToolbar role="toolbar">
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
      {showImages ? (
        <FormText color="muted">
          Switch to <i>Text</i> mode to see the drops as a textual table.
        </FormText>
      ) : (
        <FormText color="muted">
          <i>Images</i> mode shows the archive as an image grid.
        </FormText>
      )}
    </>
  );
}

type ArchiveFiltersProps = {
  summary: {
    colorUseCount: Record<string, number>;
    fabricUseCount: Record<string, number>;
    textUseCount: Record<string, number>;
  };
};
function ArchiveFilters({ summary }: ArchiveFiltersProps) {
  const [expanded, setExpanded] = React.useState(false);
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
  const filtersUI = !expanded ? null : (
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
          Use filters to focus on a specific set of drops by <i>Category</i>,{" "}
          <i>Fabric</i>, etc.
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

export default function ArchiveControls({ data }: ArchiveSummaryProps) {
  let summary = { colorUseCount: {}, fabricUseCount: {}, textUseCount: {} };
  if (data != null) {
    const fabricSummary = new ReleaseColorSummary(data.filtered).compute() ?? {
      colorUseCount: {},
    };
    const colorSummary = new ReleaseFabricSummary(data.filtered).compute() ?? {
      fabricUseCount: {},
    };
    const textUseCount = new ReleaseTextSummary(data.filtered).compute();
    summary = {
      ...colorSummary,
      ...fabricSummary,
      ...textUseCount,
    };
  }
  return (
    <>
      <Row key="display">
        <Col>
          <ArchiveDisplayControls />
        </Col>
      </Row>
      <Row key="filters">
        <Col>
          <ArchiveFilters summary={summary} />
        </Col>
      </Row>
    </>
  );
}

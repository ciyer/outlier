import React from "react";
import { Button, ButtonGroup, ButtonToolbar, Col, Row } from "reactstrap";

import {
  SortKind,
  setSorting,
  useControlsStateDispatch,
  useControlsStateSelector,
} from "./controls.slice";

function SortFilters() {
  const { sorting } = useControlsStateSelector((state) => state.controls);
  const dispatch = useControlsStateDispatch();
  const onClick = React.useCallback(
    (sorting: SortKind) => {
      dispatch(setSorting({ sorting }));
    },
    [dispatch]
  );

  return (
    <div className="d-flex align-items-center w-100">
      <div className="fw-bold me-2">Sorting</div>
      <ButtonToolbar className="flex-grow-1" role="toolbar">
        <ButtonGroup style={{ width: "100%" }} size="sm">
          <Button
            style={{ width: "100%" }}
            onClick={() => onClick(SortKind.CHRONOLOGICAL)}
            active={sorting == SortKind.CHRONOLOGICAL}
            color={sorting == SortKind.CHRONOLOGICAL ? "primary" : "secondary"}
          >
            Chronological
          </Button>
          <Button
            style={{ width: "100%" }}
            onClick={() => onClick(SortKind.COUNT)}
            active={sorting == SortKind.COUNT}
            color={sorting == SortKind.COUNT ? "primary" : "secondary"}
          >
            Count
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
    </div>
  );
}

export default function ArchiveSortControls() {
  return (
    <>
      <Row>
        <Col>
          <SortFilters />
        </Col>
      </Row>
    </>
  );
}

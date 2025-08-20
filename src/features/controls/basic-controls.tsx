import React from "react";
import { Button, ButtonGroup, ButtonToolbar } from "reactstrap";

import {
  toggleCategoryFilter,
  useControlsStateDispatch,
  useControlsStateSelector,
} from "../controls/controls.slice";

type BasicFilterGroupProps = {
  filters: string[] | null;
  onFilters: string[];
  name: string;
  onToggle: (filter: string) => void;
};

function BasicArchiveFilterGroup({
  filters,
  onFilters,
  name,
  onToggle,
}: BasicFilterGroupProps) {
  const onClick = React.useCallback(
    (filter: string) => onToggle(filter),
    [onToggle]
  );
  if (filters == null) return <p></p>;
  const filterButtons = filters.map((f) => {
    const isOn = onFilters.includes(f);
    return (
      <Button
        key={f}
        style={{ width: "100%" }}
        onClick={() => onClick(f)}
        active={isOn}
        color={isOn ? "primary" : "secondary"}
      >
        {f}
      </Button>
    );
  });

  return (
    <div>
      <span style={{ fontWeight: "bold" }}>{name}</span>
      <ButtonToolbar role="toolbar">
        <ButtonGroup style={{ width: "100%" }} size="sm">
          {filterButtons}
        </ButtonGroup>
      </ButtonToolbar>
    </div>
  );
}

export function CategoryFilterGroup() {
  const { category } = useControlsStateSelector(
    (state) => state.controls.filters
  );
  const dispatch = useControlsStateDispatch();
  const onToggle = React.useCallback(
    (filter: string) => {
      dispatch(toggleCategoryFilter({ category: filter }));
    },
    [dispatch]
  );

  return (
    <BasicArchiveFilterGroup
      name="Category"
      filters={["Object", "Outerwear", "Pants", "Shirts"]}
      onFilters={category}
      onToggle={onToggle}
    />
  );
}

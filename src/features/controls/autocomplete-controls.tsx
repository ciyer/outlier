import React from "react";
import { Button, ButtonGroup, ButtonToolbar } from "reactstrap";
import ldCollection from "lodash";

import AutocompleteInput from "../autocomplete-input/AutocompleteInput";

import {
  toggleColorFilter,
  toggleFabricFilter,
  toggleTextFilter,
  useControlsStateDispatch,
  useControlsStateSelector,
} from "./controls.slice";

type FilterButtonToolbarProps = {
  groups: Record<string, { button: React.ReactNode }[]>;
};

function FilterButtonToolbar({
  groups: buttonGroups,
}: FilterButtonToolbarProps) {
  return Object.keys(buttonGroups)
    .sort()
    .map((idx) => (
      <ButtonToolbar key={idx} role="toolbar" style={{ paddingBottom: "5px" }}>
        <ButtonGroup style={{ width: "100%" }} size="sm">
          {buttonGroups[idx].map((d) => d.button)}
        </ButtonGroup>
      </ButtonToolbar>
    ));
}
interface GroupFilterWithSummaryProps {
  summary: Record<string, number>;
}

interface AutocompleteFilterGroupProps extends GroupFilterWithSummaryProps {
  activeFilters: string[];
  fieldName: string;
  fieldTitle: string;
  onToggle: (name: string) => void;
}

function AutocompleteFilterGroup({
  activeFilters,
  fieldName,
  fieldTitle,
  onToggle,
  summary,
}: AutocompleteFilterGroupProps) {
  const filterMap: Record<string, boolean> = {};
  activeFilters.forEach((f) => {
    filterMap[f] = true;
  });
  const availableFilters = Object.keys(summary)
    .map((name) => ({
      name,
      count: summary[name],
      displayName: `${name} (${summary[name]})`,
      isOn: filterMap[name],
    }))
    .sort((a, b) => b.count - a.count); // Sort in reverse order
  const filterButtons = availableFilters
    .filter((f) => f.isOn)
    .map((f) => (
      <Button
        key={f.name}
        style={{ width: "100%" }}
        onClick={() => onToggle(f.name)}
        active={f.isOn}
        color={f.isOn ? "primary" : "secondary"}
      >
        {f.name} ({f.count}) &nbsp;<b>x</b>
      </Button>
    ));
  // Grouping the fabric buttons does not always prevent overflow.
  const groupSize = 3;
  const buttonGroups = ldCollection.groupBy(
    filterButtons.map((button, index) => ({ index, button })),
    (d) => Math.floor(d.index / groupSize)
  );

  return (
    <div>
      <span style={{ fontWeight: "bold" }}>{fieldTitle}</span>
      <FilterButtonToolbar groups={buttonGroups} />
      <AutocompleteInput
        fieldName={fieldName}
        filters={availableFilters.filter((f) => !f.isOn)}
        onSelect={onToggle}
      />
    </div>
  );
}

export function ColorFilterGroup({ summary }: GroupFilterWithSummaryProps) {
  // The labels for the colors should be [color name] ([count]), sorted by count.
  const { color } = useControlsStateSelector((state) => state.controls.filters);
  const dispatch = useControlsStateDispatch();
  const onToggle = React.useCallback(
    (name: string) => {
      dispatch(toggleColorFilter({ color: name }));
    },
    [dispatch]
  );
  return (
    <AutocompleteFilterGroup
      activeFilters={color}
      fieldName="Color"
      fieldTitle="Color"
      onToggle={onToggle}
      summary={summary}
    />
  );
}

export function FabricFilterGroup({ summary }: GroupFilterWithSummaryProps) {
  // The labels for the fabrics should be [fabric name] ([count]), sorted by count.
  const { fabric } = useControlsStateSelector(
    (state) => state.controls.filters
  );
  const dispatch = useControlsStateDispatch();
  const onToggle = React.useCallback(
    (name: string) => {
      dispatch(toggleFabricFilter({ fabric: name }));
    },
    [dispatch]
  );
  return (
    <AutocompleteFilterGroup
      activeFilters={fabric}
      fieldName="Fabric name"
      fieldTitle="Fabric"
      onToggle={onToggle}
      summary={summary}
    />
  );
}

export function TextFilterGroup({ summary }: GroupFilterWithSummaryProps) {
  const { text } = useControlsStateSelector((state) => state.controls.filters);
  const dispatch = useControlsStateDispatch();
  const onToggle = React.useCallback(
    (name: string) => {
      dispatch(toggleTextFilter({ text: name }));
    },
    [dispatch]
  );
  return (
    <AutocompleteFilterGroup
      activeFilters={text}
      fieldName="Text"
      fieldTitle="Text"
      onToggle={onToggle}
      summary={summary}
    />
  );
}

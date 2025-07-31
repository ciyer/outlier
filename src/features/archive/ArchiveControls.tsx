import React from "react";
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Col,
  FormText,
  Row,
} from "reactstrap";
import ldCollection from "lodash";

import AutocompleteInput, {
  type Suggestion,
} from "../autocomplete-input/AutocompleteInput";

import { type ArchiveSummaryProps } from "./ArchiveSummary";
import FilterSummary from "./FilterSummary";
import { ReleaseColorSummary, ReleaseFabricSummary } from "./ReleaseSummary";

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

type ArchiveFilter = {
  isOn: boolean;
  type: string;
};

type ArchiveFilterGroupProps = {
  filters: ArchiveFilter[] | null;
  name: string;
  onToggle: (suggestion: Suggestion) => void;
};

function ArchiveFilterGroup({
  filters,
  name,
  onToggle,
}: ArchiveFilterGroupProps) {
  const onClick = React.useCallback(
    (filter: Suggestion) => onToggle(filter),
    [onToggle]
  );
  if (filters == null) return <p></p>;
  const filterButtons = filters.map((f) => (
    <Button
      key={f.type}
      style={{ width: "100%" }}
      onClick={() => onClick(f)}
      active={f.isOn}
      color={f.isOn ? "primary" : "secondary"}
    >
      {f.type}
    </Button>
  ));

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

interface GroupFilterProps {
  filters: NonNullable<ArchiveFilterGroupProps["filters"]>;
  onToggle: ArchiveFilterGroupProps["onToggle"];
}

function GarmentTypeFilterGroup({
  filters: gtFilters,
  onToggle,
}: GroupFilterProps) {
  const filters = gtFilters.map((f) => ({
    name: f.type,
    displayName: f.type,
    filter: f,
  }));
  const filterButtons = filters
    .filter((f) => f.filter.isOn)
    .map((f) => (
      <Button
        key={f.filter.type}
        style={{ width: "100%" }}
        onClick={() => onToggle(f.filter)} // Use a function here to capture the filter
        active={f.filter.isOn}
        color={f.filter.isOn ? "primary" : "secondary"}
      >
        {f.filter.type} &nbsp;<b>x</b>
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
      <span style={{ fontWeight: "bold" }}>Garment Types</span>
      <FilterButtonToolbar groups={buttonGroups} />
      <AutocompleteInput
        fieldName="Garment Types"
        filters={filters.filter((f) => !f.filter.isOn)}
        onSelect={onToggle}
      />
    </div>
  );
}

interface GroupFilterWithSummaryProps extends GroupFilterProps {
  summary: Record<string, number>;
}

function ArchiveFabricFilterGroup({
  filters,
  onToggle,
  summary,
}: GroupFilterWithSummaryProps) {
  // The labels for the fabrics should be [fabric name] ([count]), sorted by count.
  const filterMap: Record<string, ArchiveFilter> = {};
  filters.forEach((f) => {
    filterMap[f["type"]] = f;
  });
  const availableFilters = Object.keys(summary)
    .map((name) => ({
      name,
      count: summary[name],
      displayName: `${name} (${summary[name]})`,
      filter: filterMap[name],
    }))
    .sort((a, b) => b.count - a.count); // Sort in reverse order
  const filterButtons = availableFilters
    .filter((f) => f.filter.isOn)
    .map((f) => (
      <Button
        key={f.filter.type}
        style={{ width: "100%" }}
        onClick={() => onToggle(f.filter)} // Use a function here to capture the filter
        active={f.filter.isOn}
        color={f.filter.isOn ? "primary" : "secondary"}
      >
        {f.filter.type} ({f.count}) &nbsp;<b>x</b>
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
      <span style={{ fontWeight: "bold" }}>Fabrics</span>
      <FilterButtonToolbar groups={buttonGroups} />
      <AutocompleteInput
        fieldName="Fabric name"
        filters={availableFilters.filter((f) => !f.filter.isOn)}
        onSelect={onToggle}
      />
    </div>
  );
}

function TextFilterGroup({ filters: tFilters, onToggle }: GroupFilterProps) {
  const filters = tFilters.map((f) => ({
    name: f.type,
    displayName: f.type,
    filter: f,
  }));
  const filterButtons = filters
    .filter((f) => f.filter.isOn)
    .map((f) => (
      <Button
        key={f.filter.type}
        style={{ width: "100%" }}
        onClick={() => onToggle(f.filter)} // Use a function here to capture the
        active={f.filter.isOn}
        color={f.filter.isOn ? "primary" : "secondary"}
      >
        {f.filter.type} &nbsp;<b>x</b>
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
      <span style={{ fontWeight: "bold" }}>Text</span>
      <FilterButtonToolbar groups={buttonGroups} />
      <AutocompleteInput
        fieldName="Text"
        filters={filters.filter((f) => !f.filter.isOn)}
        onSelect={onToggle}
      />
    </div>
  );
}

function ColorFilterGroup({
  filters,
  onToggle,
  summary,
}: GroupFilterWithSummaryProps) {
  // The labels for the colors should be [color name] ([count]), sorted by count.
  const filterMap: Record<string, ArchiveFilter> = {};
  filters.forEach((f) => {
    filterMap[f["type"]] = f;
  });
  const availableFilters = Object.keys(summary)
    .map((name) => ({
      name,
      count: summary[name],
      displayName: `${name} (${summary[name]})`,
      filter: filterMap[name],
    }))
    .sort((a, b) => b.count - a.count); // Sort in reverse order
  const filterButtons = availableFilters
    .filter((f) => f.filter.isOn)
    .map((f) => (
      <Button
        key={f.filter.type}
        style={{ width: "100%" }}
        onClick={() => onToggle(f.filter)} // Use a function here to capture the filter
        active={f.filter.isOn}
        color={f.filter.isOn ? "primary" : "secondary"}
      >
        {f.filter.type} ({f.count}) &nbsp;<b>x</b>
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
      <span style={{ fontWeight: "bold" }}>Color</span>
      <FilterButtonToolbar groups={buttonGroups} />
      <AutocompleteInput
        fieldName="Color"
        filters={availableFilters.filter((f) => !f.filter.isOn)}
        onSelect={onToggle}
      />
    </div>
  );
}

type ArchiveFiltersProps = {
  filters: Record<string, ArchiveFilter[]>;
  onArchiveFilterClearAll: () => void;
  onArchiveFilterToggle: GroupFilterProps["onToggle"];
  summary: {
    colorUseCount: Record<string, number>;
    fabricUseCount: Record<string, number>;
  };
};
function ArchiveFilters({
  filters,
  onArchiveFilterClearAll: onClearAll,
  onArchiveFilterToggle,
  summary,
}: ArchiveFiltersProps) {
  const [expanded, setExpanded] = React.useState(false);
  const onExpand = React.useCallback(() => {
    // e.preventDefault();
    setExpanded(!expanded);
  }, [expanded]);
  const onToggle = onArchiveFilterToggle;
  const filterSummary = new FilterSummary(filters).compute();
  const filterHeader = `Filters: ${filterSummary}`;
  // const filterGroups = ["Category", "Clothes", "Experiments", "Season", "Fabrics"];
  const filterGroups = ["Category", "Experiment", "Season"];
  const filterMap = {
    Category: filters.Category,
    Experiment: filters.Experiment,
    Season: filters.Season,
  };
  const filtersUI = expanded
    ? filterGroups.map((g) => (
        <ArchiveFilterGroup
          key={g}
          name={g}
          filters={filterMap[g]}
          onToggle={onToggle}
        />
      ))
    : null;
  // Garment-type filter works a bit differently.
  const garmentTypeFilterUI = expanded ? (
    <GarmentTypeFilterGroup
      filters={filters.GarmentTypes}
      onToggle={onToggle}
    />
  ) : null;
  // Fabrics filter works a bit differently.
  const fabricFilterUI = expanded ? (
    <ArchiveFabricFilterGroup
      filters={filters.Fabrics}
      onToggle={onToggle}
      summary={summary.fabricUseCount}
    />
  ) : null;
  // Name filter works a bit differently.
  const textFilterUI = expanded ? (
    <TextFilterGroup filters={filters.Text} onToggle={onToggle} />
  ) : null;
  // Name filter works a bit differently.
  const colorFilterUI = expanded ? (
    <ColorFilterGroup
      filters={filters.Color}
      onToggle={onToggle}
      summary={summary.colorUseCount}
    />
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
      <Button
        color="link"
        style={{ paddingLeft: 0, paddingBottom: 0 }}
        onClick={onExpand}
      >
        <b>{filterHeader}</b>
      </Button>
      <FormText color="muted">
        Use filters to focus on a specific set of drops by <i>Category</i>,{" "}
        <i>Season</i>, etc.
      </FormText>
      {clearButton}
      {filtersUI}
      {garmentTypeFilterUI}
      {fabricFilterUI}
      {textFilterUI}
      {colorFilterUI}
    </div>
  );
}

export default function ArchiveControls({ data }: ArchiveSummaryProps) {
  let summary = { colorUseCount: {}, fabricUseCount: {} };
  if (data != null) {
    const fabricSummary = new ReleaseColorSummary(data.filtered).compute() ?? {
      colorUseCount: {},
    };
    const colorSummary = new ReleaseFabricSummary(data.filtered).compute() ?? {
      fabricUseCount: {},
    };
    summary = {
      ...colorSummary,
      ...fabricSummary,
    };
  }
  return (
    <>
      <Row key="display">
        <Col>
          <ArchiveDisplayControls
            settings={this.props.settings.display}
            handlers={this.props.handlers}
          />
        </Col>
      </Row>
      <Row key="filters">
        <Col>
          <ArchiveFilters
            filters={this.props.settings.filters}
            summary={summary}
            handlers={this.props.handlers}
          />
        </Col>
      </Row>
    </>
  );
}

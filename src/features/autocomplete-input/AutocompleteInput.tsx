import React, { useCallback, useState } from "react";

import Autosuggest from "react-autosuggest";

import "./autocomplete.css";

export type Suggestion = {
  name: string;
  displayName: string;
};

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getSuggestionValue(suggestion: Suggestion) {
  return suggestion.name;
}

function renderSuggestion(suggestion: Suggestion) {
  return <span>{suggestion.displayName}</span>;
}

type AutocompleteInputProps = {
  fieldName: string;
  filters: Suggestion[];
  onSelect: (name: string) => void;
};

export default function AutocompleteInput({
  fieldName,
  filters,
  onSelect,
}: AutocompleteInputProps) {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const onChange = (
    _event: React.FormEvent<HTMLElement>,
    params: Autosuggest.ChangeEvent
  ) => {
    const { newValue } = params;
    setValue(newValue);
  };

  const suggestionsForInput = useCallback(
    (value: string) => {
      const escapedValue = escapeRegexCharacters(value.trim());

      if (escapedValue === "") {
        return filters;
      }

      const regex = new RegExp(escapedValue, "i");
      return filters.filter((f) => regex.test(f.name));
    },
    [filters]
  );

  const onSuggestionSelected = useCallback(
    (_event: unknown, info: { suggestion: Suggestion }) => {
      const { suggestion } = info;
      onSelect(suggestion.name);
      setValue("");
    },
    [onSelect, setValue]
  );

  const onSuggestionsFetchRequested = useCallback(
    ({ value }: { value: string }) => {
      setSuggestions(suggestionsForInput(value));
    },
    [setSuggestions, suggestionsForInput]
  );

  const onSuggestionsClearRequested = useCallback(() => {
    setSuggestions(suggestionsForInput(""));
  }, [setSuggestions, suggestionsForInput]);

  const placeholder = `${fieldName} or ↓ for List`;
  const inputProps = {
    placeholder,
    value,
    onChange,
  };

  // See https://github.com/moroshko/react-autosuggest#themeProp
  const defaultTheme = {
    container: "react-autosuggest__container",
    containerOpen: "react-autosuggest__container--open",
    input: "react-autosuggest__input",
    inputOpen: "react-autosuggest__input--open",
    inputFocused: "react-autosuggest__input--focused",
    suggestionsContainer: "react-autosuggest__suggestions-container",
    suggestionsContainerOpen: "react-autosuggest__suggestions-container--open",
    suggestionsList: "react-autosuggest__suggestions-list",
    suggestion: "react-autosuggest__suggestion",
    suggestionFirst: "react-autosuggest__suggestion--first",
    suggestionHighlighted: "react-autosuggest__suggestion--highlighted",
    sectionContainer: "react-autosuggest__section-container",
    sectionContainerFirst: "react-autosuggest__section-container--first",
    sectionTitle: "react-autosuggest__section-title",
  };
  // Override the input theme to match our visual style
  const theme = { ...defaultTheme, ...{ input: "form-control" } };

  return (
    <Autosuggest
      suggestions={suggestions}
      theme={theme}
      highlightFirstSuggestion={true}
      shouldRenderSuggestions={() => true}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      onSuggestionSelected={onSuggestionSelected}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
}

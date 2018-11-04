import React, { Component } from 'react';

import Autosuggest from 'react-autosuggest';

import './autocomplete.css';

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.displayName}</span>
  );
}

class Autocomplete extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: []
    };

    this.handlers = {
      onChange: this.onChange.bind(this),
      onSuggestionsFetchRequested: this.onSuggestionsFetchRequested.bind(this),
      onSuggestionsClearRequested: this.onSuggestionsClearRequested.bind(this),
      onSuggestionSelected: this.onSuggestionSelected.bind(this)
    }
  }

  suggestionsForInput(value) {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
      return this.props.filters;
    }

    const regex = new RegExp(escapedValue, 'i');
    return this.props.filters.filter(f => regex.test(f.name));
  }

  onChange(event, { newValue, method }) {
    this.setState({value: newValue});
  }

  onSuggestionSelected(event, info) {
    const {suggestion} = info;
    this.props.onSelect(suggestion.filter);
    this.setState({value: ''});
  }

  onSuggestionsFetchRequested({ value }) {
    this.setState({suggestions: this.suggestionsForInput(value)});
  }

  onSuggestionsClearRequested() {
    this.setState({suggestions: this.suggestionsForInput('')});
  }

  render() {
    const { value, suggestions } = this.state;
    const placeholder = `${this.props.fieldName} or ↓ for List`;
    const inputProps = {
      placeholder,
      value,
      onChange: this.handlers.onChange
    };

    // See https://github.com/moroshko/react-autosuggest#themeProp
    const defaultTheme = {
      container:                'react-autosuggest__container',
      containerOpen:            'react-autosuggest__container--open',
      input:                    'react-autosuggest__input',
      inputOpen:                'react-autosuggest__input--open',
      inputFocused:             'react-autosuggest__input--focused',
      suggestionsContainer:     'react-autosuggest__suggestions-container',
      suggestionsContainerOpen: 'react-autosuggest__suggestions-container--open',
      suggestionsList:          'react-autosuggest__suggestions-list',
      suggestion:               'react-autosuggest__suggestion',
      suggestionFirst:          'react-autosuggest__suggestion--first',
      suggestionHighlighted:    'react-autosuggest__suggestion--highlighted',
      sectionContainer:         'react-autosuggest__section-container',
      sectionContainerFirst:    'react-autosuggest__section-container--first',
      sectionTitle:             'react-autosuggest__section-title'
    };
    // Override the input theme to match our visual style
    const theme = {...defaultTheme, ...{input: 'form-control'}};

    return (
      <Autosuggest
        suggestions={suggestions}
        theme={theme}
        highlightFirstSuggestion={true}
        shouldRenderSuggestions={(v) => true}
        onSuggestionsFetchRequested={this.handlers.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handlers.onSuggestionsClearRequested}
        onSuggestionSelected={this.handlers.onSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps} />
    );
  }
}

export default Autocomplete;

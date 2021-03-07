import { CategoryTitle } from './CategoryTitle';

import React, { FC, useState } from 'react';
import Autosuggest, {
  RenderInputComponent,
  RenderSuggestionParams,
} from 'react-autosuggest';
import { Menu, Text, Input, Card } from 'fiber-ui';

const categories = [
  'Category 1',
  'Category 2',
  'Category 3',
  'Price',
  'Description',
  'Miscellaneous',
  'Image',
  'Name',
  'Stock',
];

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = (value: string) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  const result =
    inputLength === 0
      ? []
      : categories
          .filter(
            (lang) => lang.toLowerCase().slice(0, inputLength) === inputValue
          )
          .slice(0, 5);

  if (result.length === 0) result.push(value);

  return result;
};

const renderInputComponent: RenderInputComponent = (inputProps) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <Input style={{ width: '160px' }} {...inputProps} size="sm" />
);

type TagsInputProps = {
  category: string;
  setIsCategorizing: (isCategorizing: boolean) => void;
  setCategory: (category: string) => void;
};

export const CategoryTags: FC<TagsInputProps> = ({
  category,
  setCategory,
  setIsCategorizing,
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const onChange = (_: never, { newValue }: { newValue: string }) => {
    setCategory(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    setSuggestions(getSuggestions(value));
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleFinishCategorizing = () => {
    if (!category) setCategory('Category');
    setIsCategorizing(false);
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      onSuggestionSelected={handleFinishCategorizing}
      getSuggestionValue={(v) => v}
      renderSuggestion={(
        suggestion: string,
        { isHighlighted }: RenderSuggestionParams
      ) => {
        return (
          <Menu.Item
            // selected={isHighlighted}
            // component="div"
            style={{
              zIndex: 1000000000,
              background: isHighlighted ? '#BDBDBD' : '#fff',
            }}
          >
            {suggestion === category &&
              !categories
                .map((c) => c.toLowerCase())
                .includes(suggestion.toLowerCase()) && (
                <Text
                  style={{
                    fontSize: 12,
                    color: '#828282',
                    marginRight: 8,
                  }}
                >
                  Create
                </Text>
              )}
            <CategoryTitle
              style={{
                color: '#4F4F4F',
                fontWeight: 'normal',
              }}
            >
              {suggestion}
            </CategoryTitle>
          </Menu.Item>
        );
      }}
      renderSuggestionsContainer={(options) => (
        <Card
          {...options.containerProps}
          style={{
            position: 'absolute',
            width: '168px',
            height: '168px',
          }}
        >
          {options.children && (
            <Text
              style={{
                fontSize: 10,
                textAlign: 'center',
                color: '#666',
              }}
            >
              Select an option or create one
            </Text>
          )}
          {options.children}
        </Card>
      )}
      theme={{
        suggestionsList: {
          listStyleType: 'none',
        },
        suggestionsContainer: {
          boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.2)',
          borderRadius: '4px',
        },
      }}
      renderInputComponent={renderInputComponent}
      inputProps={{
        placeholder: 'Enter a Category',
        value: category,
        onChange,
        onBlur: handleFinishCategorizing,
        onKeyDown: ({ key }) => {
          if (key === 'Enter') handleFinishCategorizing();
        },
      }}
    />
  );
};

import React, { FC } from 'react';
import { Menu, Text, Dropdown } from 'fiber-ui';

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

type TagsInputProps = {
  category: string;
  setCategory: (category: string) => void;
};

export const CategoryInput: FC<TagsInputProps> = ({
  category,
  setCategory,
}) => {
  const getSuggestions = () => {
    const inputValue = category.trim().toLowerCase();
    const inputLength = inputValue.length;

    const result =
      inputLength === 0
        ? []
        : categories
            .filter(
              (lang) => lang.toLowerCase().slice(0, inputLength) === inputValue
            )
            .slice(0, 5);

    if (result.length === 0) result.push(category);

    const menuItemsNode = result.map((suggestion) => (
      <Menu.Item
        onClick={() => {
          setCategory(suggestion);
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {suggestion === category &&
            !categories
              .map((c) => c.toLowerCase())
              .includes(suggestion.toLowerCase()) && (
              <Text
                style={{
                  fontSize: 10,
                  color: '#828282',
                  marginRight: 8,
                }}
              >
                Create
              </Text>
            )}
          {suggestion}
        </div>
      </Menu.Item>
    ));

    return <Menu>{menuItemsNode}</Menu>;
  };

  return (
    <Dropdown.Input
      overlay={getSuggestions()}
      description={
        <Text style={{ fontSize: 12 }}>Select an option or create one</Text>
      }
      input={{
        value: category,
        onChange: (event: any) => {
          setCategory(event.target.value);
        },
        style: { width: '100%' },
      }}
      dropdownStyle={{ fontWeight: 400, top: 'auto' }}
      style={{ position: 'static' }}
    />
  );
};

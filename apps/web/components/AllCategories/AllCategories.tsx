import { CardStack } from '../CardStack';

import React, { FC } from 'react';
import { Input } from 'fiber-ui';

type AllCategoriesProps = {
  data: {
    categoryName: string;
    pinned: boolean;
    value: string;
    type: 'number' | 'string';
    notify:
      | 'changes'
      | 'contains'
      | 'is equal to'
      | 'is greater than'
      | 'is less than';
    payload?: string;
  }[];
};

const AllCategories: FC<AllCategoriesProps> = ({ data }) => {
  return (
    <div>
      <Input.Search
        style={{
          width: '100%',
          boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.2)',
          padding: '16px 20px',
          borderRadius: 10,
        }}
        placeholder="Search for any category"
        bordered={false}
      />
      <div style={{ marginTop: 30 }}>
        <CardStack data={data} type="categories" />
      </div>
    </div>
  );
};

export { AllCategories };

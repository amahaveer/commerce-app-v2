import CategoryTable from '@/components/organisms/categories/categoryTable';
import React from 'react';
import { CategoryColumns } from './column';

const page = () => {
  return (
    <div>
      <CategoryTable columns={CategoryColumns} />
    </div>
  );
};

export default page;

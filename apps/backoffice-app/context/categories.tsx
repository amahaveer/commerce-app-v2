'use client';

import { initialAddCategoryValues } from 'constants/categories.constant';
import { eToolbarButtonActions } from '@/components/molecules/SaveToolBar/type';
import { createContext, useContext, useEffect, useState } from 'react';
import { useStepper } from './stepper';
import { AddCategoryForm, IExposeCategory } from 'types/category.type';

export const CategoryContext = createContext<IExposeCategory>({
  categories: [],
  openDrawer: false,
  addCategoryForm: {},
  setAddCategoryForm: () => {},
  setOpenDrawer: () => {},
  setMappedCategoryData: () => {},
  mappedCategoryData: initialAddCategoryValues,
  onToolbarAction: () => {}
});

export const CategoryProvider = ({ children, customerId }: any) => {
  const { onNext, onBack } = useStepper();
  const [categories, setCategories] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [customerDetail, setCustomerdetail] = useState([]);
  const [addCategoryForm, setAddCategoryForm] = useState<any>(
    initialAddCategoryValues
  );
  const [mappedCategoryData, setMappedCategoryData] = useState(
    initialAddCategoryValues
  );
  const [selectedFilters, setSelectedFilters] = useState([
    { label: '', field: '', selectedValue: [], exact: true }
  ]);

  const onToolbarAction = (actionType: eToolbarButtonActions) => {
    const actions = {
      cancel: null,
      save: null,
      next: onNext,
      back: onBack
    };
    actions[actionType]?.();
  };
  const expose: IExposeCategory = {
    categories: categories,
    openDrawer,
    addCategoryForm,
    setAddCategoryForm,
    setOpenDrawer,
    setMappedCategoryData,
    mappedCategoryData,
    onToolbarAction
  };

  const categoryFormMapper = (categories?: any) => {
    const data = categories.category.body;
    const categoryForm: AddCategoryForm = {
      generalInfo: {
        id: data?.id,
        categoryName: data?.email,
        categoryDescription: data?.firstName,
        categoryKey: data?.lastName,
        externalId: data?.externalId,
        categoryOrderHint: data?.customerGroup
      }
    };
    setMappedCategoryData(categoryForm);
  };
  return (
    <CategoryContext.Provider value={expose}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoryContext);

  if (context === undefined) {
    throw new Error('Component Must be used within a Product Provider');
  }

  return context;
};

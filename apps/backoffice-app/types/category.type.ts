import { eToolbarButtonActions } from '@/components/molecules/SaveToolBar/type';
import { Dispatch, SetStateAction } from 'react';

export interface ICategoryTableProps {
  columns: Array<any>;
}

export interface AddCategoryForm {
  generalInfo: {
    id: string;
    categoryName: { 'en-US': string };
    categoryDescription: string;
    categoryKey: string;
    externalId: string;
    categoryOrderHint: string;
  };
}
export interface IExposeCategory {
  categories: Array<any>;
  openDrawer: boolean;
  addCategoryForm: any;
  setAddCategoryForm: Dispatch<SetStateAction<AddCategoryForm>>;
  setOpenDrawer: Dispatch<SetStateAction<boolean>>;
  setMappedCategoryData: Dispatch<SetStateAction<AddCategoryForm>>;
  mappedCategoryData: AddCategoryForm;
  onToolbarAction: (action: eToolbarButtonActions) => void;
}

import { ISwitchViewerData } from '@/components/molecules/viewSwitcher/type';
import { DataGridProps } from '@mui/x-data-grid';

export interface IListTemplateProps {
  children: React.ReactElement;
  className?: string;
}

export interface IListTemplateHeader {
  title: string;
  totalCount?: number;
  infoIcon?: { onClick: () => void };
  childrens?: React.ReactElement;
  viewsDropdown?: {
    options: [];
    onSelect: () => void;
  };
  switcherIcons?: {
    data: ISwitchViewerData[];
    onSelect: (item: any) => void;
  };
  addButton?: {
    title: string;
    className?: string;
    onClick: () => void;
  };
}

export interface IListTemplateSubHeader {
  fieldsDropdown?: {
    placeholder?: string;
    options: Array<any>;
    defaultValue?: string;
    onSelect: (value: string) => void;
  };
  searchBar?: {
    placeholder: string;
    onClickSearch: (text: string) => void;
  };
  filterPanelBtn?: boolean;
  leftFilterPanelBtn?: boolean;
  children?: React.ReactElement;
}

export interface IListTemplateSubContent {
  title?: string;
  className?: string;
  actionDropdown?: {
    options: Array<any>;
    placeholder?: string;
  };
  children?: React.ReactElement;
}

export interface ListTemplateMainContent {
  dataTable: DataGridProps;
}

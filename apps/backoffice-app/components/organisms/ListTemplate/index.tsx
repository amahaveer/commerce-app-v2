import ViewSwitcher from '@/components/molecules/viewSwitcher';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, IconButton, Typography } from '@mui/material';
import { useAppContext } from 'context/application.context';
import CustomButton from '../../atoms/Button';
import CardComponent from '../../atoms/Card/index';
import DataTable from '../../atoms/DataTable';
import SearchBar from '../../atoms/SearchBar';
import SelectDropdown from '../../atoms/SelectDropdown';
import {
  IListTemplateHeader,
  IListTemplateProps,
  IListTemplateSubContent,
  IListTemplateSubHeader,
  ListTemplateMainContent
} from './type';

const ListTemplate = ({ children, className }: IListTemplateProps) => {
  const { openFilterDrawer } = useAppContext();

  return (
    <Box
      className={`transition-all duration-300 ${openFilterDrawer ? 'w-3/4' : 'w-full'} ${className}`}
    >
      <CardComponent shadow={0}>{children}</CardComponent>
    </Box>
  );
};

ListTemplate.Header = (props: IListTemplateHeader) => {
  const {
    title,
    infoIcon,
    viewsDropdown,
    switcherIcons,
    addButton,
    totalCount,
    childrens
  } = props;

  return (
    <CardComponent.Title
      text={title}
      className="flex justify-center items-center"
    >
      <Box className="flex items-center font-inter text-customGray ml-4 mt-1">
        {totalCount !== undefined && (
          <Typography>{totalCount} results</Typography>
        )}
        {infoIcon && (
          <IconButton
            onClick={infoIcon.onClick}
            className="text-customBlue-sky"
            aria-label="Info"
          >
            <InfoOutlinedIcon className="w-[16px] h-[16px] mt-1" />
          </IconButton>
        )}
      </Box>
      <Box className="ml-auto flex" gap={2}>
        {switcherIcons?.data?.length && (
          <ViewSwitcher
            switchData={switcherIcons.data}
            defaultSelected={0}
            onClick={switcherIcons.onSelect}
          />
        )}
        {viewsDropdown && (
          <SelectDropdown
            options={viewsDropdown.options}
            placeholder="Default"
            className="w-[14.9rem]"
          />
        )}
        {addButton && (
          <CustomButton.Add
            title={addButton.title}
            className={`${addButton.className || 'min-w-[9.29rem] h-[2.5rem]'} normal-case`}
            onClick={addButton.onClick}
          />
        )}
        {childrens}
      </Box>
    </CardComponent.Title>
  );
};

ListTemplate.SubHeader = (props: IListTemplateSubHeader) => {
  const {
    searchBar,
    fieldsDropdown,
    filterPanelBtn,
    children,
    leftFilterPanelBtn
  } = props;
  const { openFilterDrawer, setOpenFilterDrawer } = useAppContext();

  return (
    <Box className="w-100 mt-8 flex">
      {fieldsDropdown && (
        <SelectDropdown
          options={fieldsDropdown?.options}
          placeholder={fieldsDropdown.placeholder || ''}
          className="w-[15.125rem] rounded-r-[0px]"
          defaultValue={fieldsDropdown.defaultValue}
        />
      )}

      {leftFilterPanelBtn && (
        <CustomButton.Filter
          title="Filters"
          className={`mr-4 normal-case ${openFilterDrawer && 'bg-customBlue-selection'}`}
          onClick={() => setOpenFilterDrawer(!openFilterDrawer)}
        />
      )}

      {searchBar && (
        <SearchBar
          inputClass="rounded-l-none"
          className="w-[37rem]"
          placeholder={searchBar.placeholder}
          onClickSearch={searchBar.onClickSearch}
        />
      )}

      {filterPanelBtn && (
        <CustomButton.Filter
          title="Filters"
          className={`ml-2 normal-case ${openFilterDrawer && 'bg-customBlue-selection'}`}
          onClick={() => setOpenFilterDrawer(!openFilterDrawer)}
        />
      )}

      {children}
    </Box>
  );
};

ListTemplate.SubContent = (props: IListTemplateSubContent) => {
  const { actionDropdown, className, children, title } = props;
  return (
    <Box className={`mt-5 ${className}`}>
      {actionDropdown && (
        <Box className="flex justify-between items-center ">
          {title && <Typography className="mr-2">{title}</Typography>}
          <SelectDropdown
            options={actionDropdown?.options}
            placeholder={actionDropdown.placeholder || ''}
            className="w-[15.125rem]"
          />
        </Box>
      )}
      {children}
    </Box>
  );
};

ListTemplate.MainContent = (props: ListTemplateMainContent) => {
  const { dataTable } = props;
  return (
    <Box className="mt-2">
      {dataTable && (
        <DataTable {...dataTable} sx={{ border: 0, textAlign: 'center' }} />
      )}
    </Box>
  );
};

export default ListTemplate;

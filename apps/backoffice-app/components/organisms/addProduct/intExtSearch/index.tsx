import { useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  TextField,
  FormControl
} from '@mui/material';
import AccordianUnControlled from '@/components/atoms/Accordian';
import SelectDropdown from '@/components/atoms/SelectDropdown';
import { getProductSearchOptions } from 'utils/product';
import { languages } from 'utils/languages';
import AlertBasicDialog from '@/components/molecules/modal/alertBasic';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import useTranslate from 'hooks/useTranslate';
import SaveToolbar from '@/components/molecules/SaveToolBar';
import { useProducts } from 'context/product';
import { useStepper } from 'context/stepper';

const IntExtSearch = () => {
  const [rowsInternal, setRowsInternal] = useState(1);
  const [rowsExternal, setRowsExternal] = useState(1);
  const [expandedInternal, setExpandedInternal] = useState(false);
  const [expandedExternal, setExpandedExternal] = useState(false);
  const [open, setOpen] = useState(false);
  const { translate } = useTranslate();
  const { onClickToolbarAction } = useProducts();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addRowInternal = () => {
    if (rowsInternal < languages.length) {
      setRowsInternal((prevRows) => prevRows + 1);
    }
    if (rowsInternal + 1 === languages.length) {
      setExpandedInternal(true);
    }
  };

  const collapseRowsInternal = () => {
    setRowsInternal(1);
    setExpandedInternal(false);
  };

  const addRowExternal = () => {
    if (rowsExternal < languages.length) {
      setRowsExternal((prevRows) => prevRows + 1);
    }
    if (rowsExternal + 1 === languages.length) {
      setExpandedExternal(true);
    }
  };

  const collapseRowsExternal = () => {
    setRowsExternal(1);
    setExpandedExternal(false);
  };

  const formFields = [
    {
      title: translate('product.autoSuggestionsSearchImprovement'),
      description: translate('product.productSearchKeywords'),
      required: true
    }
  ];

  const formFields_external = [
    {
      title: translate('product.externalSEO'),
      description: translate('product.seoImprovementDescription'),
      required: true
    }
  ];

  const renderRowInternal = (key: number, language: { value: string; label: string }) => (
    <Box key={key} sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
      <TextField
        label=""
        defaultValue={language.value}
        InputProps={{ readOnly: true }}
        size="small"
        sx={{ minWidth: 120 }}
      />
      <FormControl sx={{ minWidth: 120 }}>
        <SelectDropdown
          options={getProductSearchOptions()}
          valueAlias="field"
          placeholder=""
          fullWidth={true}
        />
      </FormControl>
      <FormControl sx={{ minWidth: 240 }}>
        <SelectDropdown
          options={getProductSearchOptions()}
          valueAlias="field"
          placeholder=""
          fullWidth={true}
        />
      </FormControl>
    </Box>
  );

  const renderRowExternal = (key: number, language: { value: string; label: string }) => (
    <Box key={key} sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
      <TextField
        label=""
        defaultValue={language.value}
        InputProps={{ readOnly: true }}
        size="small"
        sx={{ minWidth: 600 }}
      />
    </Box>
  );

  return (
    <Box className="flex pl-[10%] pt-8">
      <Box className="w-[50%]">
        {/* Internal Section */}
        <AccordianUnControlled
          className="border-0"
          labelClass="text-[1.25rem]"
          title={'product.internalProductSearch'}
        >
          <Box className="flex flex-col pl-8">
            {formFields.map((item, index) => (
              <Box key={index} className="mb-2">
                <Typography className="text-[0.87rem]" fontWeight={500}>
                  {item.title}
                </Typography>
                <Typography className="text-[0.87rem] mt-2 mb-2 font-bold">
                  {translate('common.keywords')}
                </Typography>
                <Typography className="text-[0.87rem] text-custom-gray">
                  {item.description}
                </Typography>
                <Typography className="text-[0.87rem] mt-2">
                  {translate('product.keywordInterpretationChoice')}
                  <span
                    className="text-blue-600 cursor-pointer"
                    onClick={handleClickOpen}
                  >
                    {' '}
                    {translate('common.options')}
                  </span>
                  {translate('product.dropdownSelection')}
                  <InfoOutlinedIcon
                    className="ml-96 text-gray-500 align-middle cursor-pointer"
                    fontSize="small"
                    onClick={handleClickOpen}
                  />
                </Typography>
              </Box>
            ))}

            {[...Array(rowsInternal)].map((_, index) =>
              renderRowInternal(index, languages[index])
            )}

            {!expandedInternal ? (
              <span
                className="cursor-pointer text-blue-600"
                onClick={addRowInternal}
              >
                + Expand All Languages
              </span>
            ) : (
              <span
                className="cursor-pointer text-blue-600"
                onClick={collapseRowsInternal}
              >
                - Collapse
              </span>
            )}
          </Box>
          <AlertBasicDialog open={open} handleClose={handleClose} />
        </AccordianUnControlled>

        <Divider />

        {/* External Section */}
        <AccordianUnControlled
          className="border-0"
          labelClass="text-[1.25rem]"
          title={'product.externalseo'}
        >
          <Box className="flex flex-col pl-8">
            {formFields_external.map((item, index) => (
              <Box key={index} className="mb-4">
                <Typography className="text-[0.87rem]" fontWeight={500}>
                  {item.title}
                </Typography>
                <Typography className="text-[0.87rem] text-custom-gray">
                  {item.description}
                </Typography>
                <Typography className="text-[0.87rem] mt-2 mb-2 font-bold">
                  {translate('common.urlSlug')}
                </Typography>
                <Typography className="text-[0.87rem] mt-2">
                  {translate('product.urlSlugDetail')}
                </Typography>
              </Box>
            ))}

            {[...Array(rowsExternal)].map((_, index) =>
              renderRowExternal(index, languages[index])
            )}

            {!expandedExternal ? (
              <span
                className="cursor-pointer text-blue-600"
                onClick={addRowExternal}
              >
                + Show all Languages
              </span>
            ) : (
              <span
                className="cursor-pointer text-blue-600"
                onClick={collapseRowsExternal}
              >
                - Hide Languages
              </span>
            )}
          </Box>
        </AccordianUnControlled>
      </Box>
      <Box className="w-[30%]"></Box>

      <SaveToolbar
					onClickAction={onClickToolbarAction}
					isVisible={true}
					showNext={false}
					showBack={true}
					showSave={true}
				/>
    </Box>
  );
};

export default IntExtSearch;

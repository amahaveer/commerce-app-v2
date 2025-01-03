import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import IconTextLink from '@/components/atoms/IconTextLink';
import { ManageSearchOutlined } from '@mui/icons-material';
import CustomButton from '@/components/atoms/Button';
import useTranslate from 'hooks/useTranslate';
import { TranslationKeys } from 'types/global';
import { formatDateTime } from 'utils';

const DateInfo = () => {
  const { translate } = useTranslate();
  const displayText = (label: TranslationKeys, value: string) => {
    return (
      <Box className="flex flex-row">
        <Typography className="font-normal w-28 text-[0.875rem] text-customGray ">
          {translate(label)}
        </Typography>
        <Typography className="font-normal text-[0.875rem] text-customGray ">
          {value}
        </Typography>
      </Box>
    );
  };
  return (
    <Box>
      <Box className="my-5 flex-flex-col ">
        <Box className="flex  justify-between mb-4">
          {displayText(
            'common.dateCreated',
            formatDateTime('mappedCategoryData')
          )}
          {displayText(
            'common.dateModified',
            formatDateTime('mappedCategoryData')
          )}
        </Box>
        <Typography className="text-[#545978]">
          View, filter and search products related to this category branch or
          category.
        </Typography>
      </Box>
    </Box>
  );
};

export default DateInfo;

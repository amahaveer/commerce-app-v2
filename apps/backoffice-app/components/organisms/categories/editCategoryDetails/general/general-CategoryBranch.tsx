import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import AccordianUnControlled from '@/components/atoms/Accordian';
import CustomButton from '@/components/atoms/Button';
import useTranslate from 'hooks/useTranslate';

const CategoryBranch = () => {
  const { translate } = useTranslate();
  return (
    <Box>
      <AccordianUnControlled
        className="border-0 w-[50.688rem]"
        labelClass="text-[1.25rem]"
        title={'categories.categoryEditBranchTitle'}
      >
        <Box className="flex flex-col px-4">
          <Box className="flex flex-col gap-1 mb-4">
            <Typography className="text-base font-medium">
              {translate('categories.categoryEditBranchParentCategory')}
            </Typography>
            <Typography className="text-lg font-normal pl-3">
              {translate('categories.categoryEditBranchDesc')}
            </Typography>
          </Box>

          <Typography className="text-base font-medium">Branch</Typography>
          <CustomButton
            type="button"
            className="bg-white normal-case w-[6.872rem] h-[2.5rem]"
            title={translate('categories.categoryEditBranchButtonTitle')}
            disabled
          />
        </Box>
      </AccordianUnControlled>
      ;
    </Box>
  );
};

export default CategoryBranch;

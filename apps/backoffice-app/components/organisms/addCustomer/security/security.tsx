import React from 'react';
import { Box, Typography, TextField, IconButton, Switch } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AccordianUnControlled from '@/components/atoms/Accordian';
import PrefixInputBase from '@/components/atoms/PrefixInputBase';
import useTranslate from 'hooks/useTranslate';
import CustomButton from '@/components/atoms/Button';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';

function CustomerSecurity() {
  const { translate } = useTranslate();
  function setCategoryModal(arg0: boolean): void {
    throw new Error('Function not implemented.');
  }
  const handleChange = ()=>{

  }
const label = { inputProps: { 'aria-label': 'Switch demo' } };
  return (
    <Box className="flex flex-row px-[30px] w-100 mt-10">
      <Box className="w-[48%] ml-32">
        <AccordianUnControlled
          className="border-0 mt-6"
          labelClass="text-[1.25rem]"
          title={'common.authentication'}
        >
          <Box className="flex flex-col pl-8">
            <Box className="mb-4 mt-2 w-full">
              <Typography>{translate('common.authmode')}</Typography>
              <span></span>
              <Box className="flex items-center mt-1">
                <WarningAmberOutlinedIcon className="text-orange-500 mr-1 text-[16px]" />
                <Typography className="text-[0.875rem] font-normal text-[#1a1a1a]">
                  {translate('common.extrnalAuth')}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Switch {...label} disabled />
                <Typography>{translate('common.customerPassword')}</Typography>
              </Box>
              <Box display="flex" alignItems="center" className="mt-16">
                <Typography>{translate('common.customerPassword')}</Typography>
              </Box>
              <Box display="flex" alignItems="center" className="gap-2 ">
                <PrefixInputBase
                  wrapperClass="w-[45rem]"
                  prefix={null}
                  placeholder={'.......'}
                  onChange={handleChange}
                />
                <CustomButton
                  title={translate('common.resetPassword')}
                  className="w-[10rem]"
                />
              </Box>
            </Box>
          </Box>
        </AccordianUnControlled>
      </Box>
    </Box>
  );
}

export default CustomerSecurity;

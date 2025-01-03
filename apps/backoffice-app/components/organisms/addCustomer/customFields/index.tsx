'use client'
import AccordianUnControlled from '@/components/atoms/Accordian';
import SaveToolbar from '@/components/molecules/SaveToolBar';
import { Box, Typography } from '@mui/material';
import { useCustomers } from 'context/customers';
function CustomFields() {
  const { onToolbarAction } = useCustomers();
  return (
    <Box className="flex flex-row mt-10">
      <AccordianUnControlled
        className="border-0 mt-6"
        labelClass="text-[1.25rem]"
        title={'common.customFields'}
      >
        <Box className="flex flex-col pl-8">
          <Typography>
            There are no custom types defined. To extend the information, create
            custom types through the API first.
          </Typography>
        </Box>
      </AccordianUnControlled>
      <SaveToolbar
          isVisible={true}
          showNext
          showBack
          onClickAction={onToolbarAction}
        />
    </Box>
  );
}

export default CustomFields
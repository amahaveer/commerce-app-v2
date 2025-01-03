'use client';

import { Box } from '@mui/material';
import { useStepper } from 'context/stepper';

const AddNewCustomer = () => {
  const { Component } = useStepper();

  return (
    <Box className="flex flex-row w-full h-[75vh] overflow-y-auto">
      {/* Stepper component */}
      <Box className="ml-14 w-3/5">
        <Component />
      </Box>
    </Box>
  );
};

export default AddNewCustomer;

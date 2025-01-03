'use client';

import { Box } from '@mui/material';
import { useStepper } from 'context/stepper';

const AddNewCategory = () => {
  const { Component } = useStepper();

  return (
    <Box className=" w-full h-[75vh] overflow-y-auto px-10">
      <Component />
    </Box>
  );
};

export default AddNewCategory;

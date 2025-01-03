'use client';
import AddNewCustomer from '@/components/organisms/addCustomer';
import { Box } from '@mui/material';
import { CustomerProvider } from 'context/customers';
import { StepperProvider } from 'context/stepper';
import { getStepList } from './tabDef';
import AddNewCategory from '@/components/organisms/categories/addCategory';
import { CategoryProvider } from 'context/categories';

function AddCustomer() {
  const steps = getStepList();

  return (
    <Box>
      <StepperProvider stepList={steps} title="Create a category">
        <CategoryProvider>
          <AddNewCategory />
        </CategoryProvider>
      </StepperProvider>
    </Box>
  );
}

export default AddCustomer;

'use client';
import AddNewCustomer from '@/components/organisms/addCustomer';
import { Box } from '@mui/material';
import { CustomerProvider } from 'context/customers';
import { StepperProvider } from 'context/stepper';
import { getStepList } from './tabDef';

function AddCustomer() {
  const steps = getStepList();

  return (
    <Box>
      <StepperProvider stepList={steps} title="Create a customer">
        <CustomerProvider>
          <AddNewCustomer />
        </CustomerProvider>
      </StepperProvider>
    </Box>
  );
}

export default AddCustomer;

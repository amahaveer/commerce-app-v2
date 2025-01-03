
'use client'
import React from "react";
import { Box } from '@mui/material';
import { StepperProvider } from "context/stepper";
import { OrdersProvider } from "context/orders";
import { getStepList } from "./tabDef";
import AddNewOrder from "@/components/organisms/addOrder";


const AddProducts = () => {

    const steps = getStepList()
  
    return (
      <Box>
        <StepperProvider stepList={steps} title="Create Order">
          <OrdersProvider>
            <AddNewOrder />
          </OrdersProvider>
        </StepperProvider>
      </Box>
    );
}

export default AddProducts;
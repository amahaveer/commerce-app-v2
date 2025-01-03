'use client'
import React from "react";
import { Box } from '@mui/material';
import { getStepList } from "./tabDef";
import { StepperProvider } from "context/stepper";
import AddNewProduct from "@/components/organisms/addProduct";
import { ProductProvider } from "context/product";


const AddProducts = () => {

    const steps = getStepList()
  
    return (
      <Box>
        <StepperProvider stepList={steps} title="Multi Store">
          <ProductProvider>
            <AddNewProduct />
          </ProductProvider>
        </StepperProvider>
      </Box>
    );
}

export default AddProducts;
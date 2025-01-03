"use client"

import { Box } from '@mui/material';
import { useStepper } from 'context/stepper';
import OrderPlaceSummary from './orderPlaceSummary';


const AddNewOrder = () => {

      const { Component, activeStep } = useStepper();
      
      return (
            <Box className="flex flex-row w-[100%] h-[76vh] overflow-y-auto">
                  {/* Stepper component */}
                  <Box className="w-[68.7rem]">
                        <Component />
                  </Box>
                  {/* Summary component */}
                  {activeStep > 0 &&
                        <Box className="pt-6 px-6 w-[21.25rem] border-l border-gray-300">
                              <OrderPlaceSummary/>
                        </Box>
                  }

            </Box>
      )
}

export default AddNewOrder;
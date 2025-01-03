'use client';
import AccordianUnControlled from '@/components/atoms/Accordian';

import { Box, Typography } from '@mui/material';
import React from 'react';

const CartCondition = () => {
  return (
    <Box>
      <Typography
        className={`font-inter text-black font-semibold text-2xl pb-2 mb-7`}
      >
        Discount configurations
      </Typography>
      <Typography className="text-gray-500">
        Cart conditions define when the discount will be triggered and effects
        determine where, how and on what the discount is applied.
      </Typography>
      <Box className="mt-7">
        <AccordianUnControlled
          title="common.cartCondition"
          className="border-0"
          labelClass="text-[1rem] "
        >
          <Box className="flex flex-col mt-4 pl-8" gap={2}>
            <Typography>
              Cart conditions define when the discount will be triggered and
              effects determine where, how and on what the discount is applied.
            </Typography>
          </Box>
        </AccordianUnControlled>
      </Box>
    </Box>
  );
};

export default CartCondition;

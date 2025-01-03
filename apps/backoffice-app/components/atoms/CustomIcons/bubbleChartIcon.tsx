import React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const BubbleChartIcon = (props: SvgIconProps) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path
      fillRule="nonzero"
      d="M15.023 18.375H8.977A3 3 0 1 1 6.49 15.04l3.511-6.803a3 3 0 1 1 4.053-.051l3.74 6.82Q17.898 15 18 15a3 3 0 1 1-2.977 3.375m.195-1.5a3 3 0 0 1 1.133-1.381l-3.612-6.586a3 3 0 0 1-1.405.018l-3.47 6.723c.403.32.722.742.918 1.226z"
    />
  </SvgIcon>
);

export default BubbleChartIcon;

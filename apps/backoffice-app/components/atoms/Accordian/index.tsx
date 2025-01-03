import * as React from 'react';
import Typography from '@mui/material/Typography';
import { XAccordion, XAccordionDetails, XAccordionSummary } from './style';
import { IAccordianProps } from './type';
import useTranslate from 'hooks/useTranslate';
import { Box } from '@mui/material';

export default function AccordianUnControlled(props: IAccordianProps) {
  const {
    children,
    title,
    className,
    labelClass,
    isTranslate = true,
    inLineNode
  } = props;
  const { translate } = useTranslate();

  return (
    <XAccordion className={className} defaultExpanded>
      <XAccordionSummary
        className="border-b border-gray-300   "
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Box className="flex justify-between w-full">
          <Typography
            className={`font-inter text-black font-semibold ${labelClass}`}
          >
            {isTranslate ? translate(title as any) : title}
          </Typography>
          {inLineNode}
        </Box>
      </XAccordionSummary>
      <XAccordionDetails className="font-inter">{children}</XAccordionDetails>
    </XAccordion>
  );
}

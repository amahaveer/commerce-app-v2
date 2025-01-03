"use client";
import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { GlobalTabsProps } from './type';

const TabsComponent: React.FC<GlobalTabsProps> = (props) => {

  const { contentClass, tabs, tabsWrapperClass, tabsChildren } = props;
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box className="w-full">
      {/* Tabs container */}
      <Box className={`flex flex-row relative border-b border-gray-300 px-2 ${tabsWrapperClass}`}>
        <Tabs className='' value={value} onChange={handleChange} aria-label="global tabs">
          {tabs.map((tab, index) => (
            <Tab className='font-inter text-[1.125rem] normal-case text-commerceBlack' label={tab.label} key={index} />
          ))}
        </Tabs>
        {tabsChildren}
      </Box>

      {/* Tab panels */}
      {tabs.map((tab, index) => (
        <Box
          key={index}
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          className={`${contentClass}`}
        >
          {value === index && (
              tab.content
          )}
        </Box>
      ))}
    </Box>
  );
};

export default TabsComponent;

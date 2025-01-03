import React from 'react';
import { Drawer, Box, IconButton, Typography } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import IconTextLink from '../IconTextLink';
import { IAppDrawerProps } from './type';

export default function AppDrawer(props: IAppDrawerProps) {

  const { position, breadcrumb = ["To Variant List", "sku"], open, children, drawerWidth, onClose } = props;

  return (
    <Drawer
      anchor={position || 'right'}
      open={open}
      onClose={onClose}
      variant="persistent"
      PaperProps={{
        sx: {
          height: '100vh',
          top: '64px',
        }
      }}
    >
      <Box className="flex flex-col px-[30px] pt-[10px]" sx={{ width: drawerWidth || "90vw", }}>
        <Box className="flex flex-row">

          {breadcrumb.length > 0 && (
            <Box className="flex flex-row items-center">
              {breadcrumb.map((label, index) => (
                <React.Fragment key={index}>
                  {index === 0 ? (
                    <IconTextLink
                      wrapperClass="text-customBlue-periwinkle cursor-pointer"
                      text={label}
                      icon={<ChevronLeftIcon />}
                    />
                  ) : (
                    <>
                      <span className="px-2">{index < breadcrumb.length - 1 ? '/' : ''}</span>
                      <Typography className="">{`${label}`}</Typography>
                    </>
                  )}
                </React.Fragment>
              ))}
            </Box>
          )}


          <Box className="ml-auto">
            <IconButton className="hover:bg-transparent" aria-label="Info" onClick={onClose}>
              <CloseOutlinedIcon className='text-commerceBlack hover:text-primary-common' />
            </IconButton>
          </Box>

        </Box>
        {children}
      </Box>
    </Drawer >
  );
}

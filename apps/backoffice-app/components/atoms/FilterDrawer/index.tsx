"use client"
import { Drawer, Box,  } from '@mui/material';
import { useAppContext } from 'context/application.context';

const FilterDrawer = ({ children }: any) => {

  const { openFilterDrawer,  } = useAppContext();
  const drawerWidth = 370

  return (
    <Box>
      <Drawer
        anchor="right" open={openFilterDrawer} variant="persistent"
        PaperProps={{
          sx: {
            height: '100vh',
            top: '64px',
            width: `${drawerWidth}px`
          }
        }}
      >
        <>
          {children}
        </>
      </Drawer>
    </Box>

  );
}

export default FilterDrawer;

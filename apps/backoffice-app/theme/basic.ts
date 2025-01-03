import { createTheme } from '@mui/material/styles';

export const basicTheme = createTheme({
  palette: {
    primary: {
      main: "#4f4fd8",  
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: ['Inter', 'system-ui', 'sans-serif'].join(','),
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#4f4fd8", 
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#4f4fd8", 
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontFamily: ['Inter', 'system-ui', 'sans-serif'].join(','),  
          fontSize: '1rem',  
        },
      },
    },
  },
});

import { createTheme } from '@mui/material/styles';


interface Colors {
  gray: string;
  blue: string;
  success: string;
  warning: string;
  error: string;
  main: string;
  light: string;
  dark: string;
  info: string;
  secondary: string;
}
const COLORS: Colors = {
  gray: '#363440',
  blue: '#150926',
  success: '#20C654',
  warning: '#E1A02F',
  error: '#FF0F2F',
  main: '#FFF',
  light: '#DDD',
  dark: '#222',
  info: '#3A3844',
  secondary: '#211f27',
};

const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.main,
    },
    success: {
      main: COLORS.success
    },
    secondary: {
      main: COLORS.secondary,
    },
    warning: {
      main: COLORS.warning
    },
    error: {
      main: COLORS.error
    },
    info: {
      main: COLORS.info
    },
    text: {
      primary: COLORS.main,
      secondary: COLORS.dark,
    },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: COLORS.light,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          'color': COLORS.main,
          '& hover': {
            borderColor: COLORS.main
          },
          '& fieldset': {
            borderColor: COLORS.main,
          },
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& fieldset': {
            borderColor: COLORS.main,
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: COLORS.success, // Define a cor do Checkbox não selecionado
          '&.Mui-checked': {
            color: COLORS.success, // Define a cor do Checkbox selecionado
          },
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
  // outras opções de estilo...
});

export default theme;

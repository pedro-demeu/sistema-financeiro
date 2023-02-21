import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#DDD',
    },
    secondary: {
      main: '#4affab',
    },
    error: {
      main: '#DE1F53'
    },
    info: {
      main: '#DDD'
    },
    text: {
      primary: "#DDD",
      secondary: "#DDD"
    }
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#DDD',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& fieldset': {
            borderColor: '#DDD',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#6eca9f', // Define a cor do Checkbox não selecionado
          '&.Mui-checked': {
            color: '#6eca9f', // Define a cor do Checkbox selecionado
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

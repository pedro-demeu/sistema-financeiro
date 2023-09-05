import React from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from './routes';
import { AppContainer } from './components';
import { RecoilRoot } from 'recoil';
import theme from './theme/theme';
import { UserLoggedAtom } from './atoms/login';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export const App: React.FC = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <RecoilRoot initializeState={({ set }) => set(UserLoggedAtom, currentUser)}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>

            <AppContainer>
              <BrowserRouter>
                <Routes />
              </BrowserRouter>
            </AppContainer>
          </LocalizationProvider>

        </RecoilRoot>
      </ThemeProvider>
    </>
  );
};

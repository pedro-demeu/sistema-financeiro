import React from 'react';
import { Box, useTheme } from '@mui/material';

interface Props {
  children: JSX.Element
}
export const AppContainer: React.FC<Props> = ({ children }) => {
  
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: theme.palette.secondary.main
      }}
    >
      <Box sx={{ flex: '1 auto' }} >
        {children}
      </Box>
      
    </Box>
  );
};

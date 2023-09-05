import React from 'react';
import { Box } from '@mui/material';
import { CreateAccountForm } from '@/components/forms';

export const AccountPage: React.FC = () => {
  return (
    <Box
      height="100%"
      component="main"
    >
      <CreateAccountForm />
    </Box>
  );
};

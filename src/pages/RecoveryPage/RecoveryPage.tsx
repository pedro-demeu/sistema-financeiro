import { transactionsAtom } from '@/atoms/transactions';
import { FooterBar, ForgotPassword } from '@/components';
import { Box, useTheme } from '@mui/material';
import React from 'react';
import { useRecoilValue } from 'recoil';

export const RecoveryPage: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: theme.palette.secondary.main,
        alignItems: 'center'
      }}
    >
      <Box flex="1 auto" mt={10}>
        <ForgotPassword />
      </Box>
      <FooterBar />
    </Box>
  );
};

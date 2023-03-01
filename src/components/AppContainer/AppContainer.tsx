import React from 'react';
import { Box } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { transactionsAtom } from '@/atoms/transactions';
import { FooterBar } from '@/components'

interface Props {
  children: JSX.Element
}
export const AppContainer: React.FC<Props> = ({ children }) => {
  const transactions = useRecoilValue(transactionsAtom)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: '#211f27'
      }}
    >
      <Box sx={{ flex: '1 auto' }} >
        {children}
      </Box>
      {transactions.length > 0 && <FooterBar />}
    </Box>
  );
};

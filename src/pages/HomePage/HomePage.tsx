import React from 'react';
import { Box, useTheme } from '@mui/material';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  DEFAULT_TRANSACTION_VALUE,
  type Transaction,
  transactionModalAtom,
  transactionsAtom,
  useTransaction,
  currentTransactionAtom
} from '@/atoms/transactions';

import { useNavigate } from 'react-router-dom';
import { UserLoggedAtom } from '@/atoms/login';
import { TopBar, TransactionsTableContainer, CustomModal, FooterBar } from '@/components';
import { TransactionForm } from '@/components/forms';

export const HomePage: React.FC = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(
    transactionModalAtom
  );
  const loggedUser = useRecoilValue(UserLoggedAtom);
  const navigate = useNavigate();
  const [transactions, setTransactions] = useRecoilState(transactionsAtom);
  const currentTransaction = useRecoilValue(currentTransactionAtom);
  const { createTransaction, editTransaction } = useTransaction();
  const theme = useTheme();
  const handleSubmit = async (newTransaction: Transaction) => {
    try {
      await createTransaction(newTransaction);
    } catch (error) {
      alert(`Error: ${error}`);
    }
  };

  const handleEdit = async (newTransaction: Transaction) => {
    try {
      await editTransaction(newTransaction);
    } catch (error) {
      alert(`Error: ${error}`);
    }
  };

  const handleModalState = (): void => {
    setIsModalOpen(!isModalOpen);
  };

  React.useEffect(
    function handleUserLoggedVerification() {
      if (!loggedUser) {
        navigate('/');
      }
    },
    [loggedUser]
  );

  React.useEffect(function refreshTransactions() {
    loggedUser && setTransactions(loggedUser.finances);
  }, [loggedUser?.finances]
  );
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: theme.palette.secondary.main
      }}
    >
      <Box display="flex" alignItems="center" flexDirection="column" flex='1 auto'>
        <TopBar />
        <TransactionsTableContainer onSubmit={currentTransaction.id === '' ? handleSubmit : handleEdit} transactions={transactions} />

        <CustomModal open={isModalOpen} setOpen={handleModalState}>
          <TransactionForm onSubmit={handleSubmit} initialValues={DEFAULT_TRANSACTION_VALUE} />
        </CustomModal>
      </Box>
      {transactions.length > 0 && <FooterBar inHomePage userHaveTransactions />}
    </Box>
  );
};

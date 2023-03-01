import React from 'react';
import { Box } from '@mui/material';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  DEFAULT_TRANSACTION_VALUE,
  type Transaction,
  transactionModalAtom,
  transactionsAtom,
  useTransaction,
  currentTransactionAtom} from '@/atoms/transactions';

import { useNavigate } from 'react-router-dom';
import { UserLoggedAtom } from '@/atoms/login';
import { TopBar, TransactionsTableContainer, CustomModal } from '@/components';
import { FinantialForm } from '@/components/forms';

export const HomePage: React.FC = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(
    transactionModalAtom
  );
  const [loggedUser, setLoggedUser] = useRecoilState(UserLoggedAtom);
  const navigate = useNavigate();
  const [transactions, setTransactions] = useRecoilState(transactionsAtom)
  const currentTransaction = useRecoilValue(currentTransactionAtom)
  const { createTransaction, editTransaction } = useTransaction();

  const handleSubmit = async (newTransaction: Transaction) => {
    try {
      await createTransaction(newTransaction)
    } catch (error: any) {
      alert(`Error: ${error}`);
    }
  }

  const handleEdit = async (newTransaction: Transaction) => {
    try {
      await editTransaction(newTransaction)
    } catch (error: any) {
      alert(`Error: ${error}`);
    }
  }

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
    loggedUser && setTransactions(loggedUser.finances)
  }, [loggedUser?.finances]
  );
  return (
    <>
      <Box display="flex" alignItems="center" flexDirection="column">
        <TopBar />
        <TransactionsTableContainer onSubmit={currentTransaction.id === '' ? handleSubmit : handleEdit} transactions={transactions} />

        <CustomModal open={isModalOpen} setOpen={handleModalState}>
          <FinantialForm onSubmit={handleSubmit} initialValues={DEFAULT_TRANSACTION_VALUE} />
        </CustomModal>
      </Box>
    </>
  );
};

import { Box } from '@mui/material';
import React from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { TransactionTable } from '..';
import { UserLoggedAtom } from '../../atoms/login';
import { Transaction, transactionModalAtom, deleteTransactionModalAtom, currentTransactionAtom, transactionsAtom } from '../../atoms/transactions';
import { EmptyState } from '../EmptyState/EmptyState';
import { FinanceControls } from '../FinanceControls/FinanceControls';
import { HeaderTable } from '../HeaderTable/HeaderTable';

interface TransactionsTableContainerProps {
  transactions: Transaction[];
  onSubmit: (transaction: Transaction) => Promise<void>;
}
export const TransactionsTableContainer: React.FC<TransactionsTableContainerProps> = (
  {
    transactions,
    onSubmit
  }
) => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(transactionModalAtom);
  const loggedUser = useRecoilValue(UserLoggedAtom);

  const handleModalState = (): void => { setIsModalOpen(!isModalOpen); };
  const { totalIncome, totalSpending, total } = React.useMemo(function Calculate() {
    if (loggedUser) {

      const totalIncome = loggedUser.finances
        .filter((item) => item.type === "INCOME")
        .reduce((accumulator, currentItem) => !(currentItem.value) ? 0 : accumulator + currentItem.value, 0);

      const totalSpending = loggedUser.finances
        .filter((item) => item.type === "SPENDING")
        .reduce((accumulator, currentItem) => !(currentItem.value) ? 0 : accumulator + currentItem.value, 0);

      const total = Number(totalIncome) - Number(totalSpending)

      return { totalSpending, totalIncome, total }
    }

    return { totalSpending: 0, totalIncome: 0, total: 0 }

  }, [loggedUser?.finances])

  if (transactions.length === 0) {
    return (
      <EmptyState
        mt="15rem"
        title="Crie sua primeira finança"
        description="Não há finanças cadastradas, clique no ícone a baixo:"
        onClick={handleModalState}
      />
    );
  }
  return (
    <>
      <FinanceControls
        totalIncome={totalIncome}
        totalSpending={totalSpending}
        total={total}
      />
      <Box
        sx={{
          width: '80%',
          maxWidth: '1200px',
          marginTop: '10rem'
        }}
      >
        <Box width="100%">
          <HeaderTable />
          <TransactionTable onSubmit={onSubmit} transactions={transactions} />
        </Box>
      </Box>
    </>
  );
};
import React from 'react';
import { Box } from '@mui/material';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  DEFAULT_VALUES,
  type Finance,
  finantialTransactionModalAtom
} from '../../atoms/finantial';
import {
  CustomModal,
  FinantialTransactionsTable,
  TopBar
} from '../../components';
import { FinantialForm } from '../../components/forms';
import { transformDate } from '../../utils/transformDate';
import { useNavigate } from 'react-router-dom';
import { UserLoggedAtom, UserType } from '../../atoms/login';
import * as uuid from 'uuid'

export const HomePage: React.FC = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(
    finantialTransactionModalAtom
  );
  const [loggedUser, setLoggedUser] = useRecoilState(UserLoggedAtom);
  const navigate = useNavigate();

  const handleModalState = (): void => {
    setIsModalOpen(!isModalOpen);
  };

  function handleSubmit(data: Finance): void {
    try {
      const users: UserType[] = JSON.parse(localStorage.getItem('users') || '[]');

      if (loggedUser){

      const currentUserIndex = users.findIndex(user => user.id === loggedUser.id);

      if (currentUserIndex !== -1) {
        const transformedData = {
          ...data,
          createdAt: transformDate(new Date()),
          id: uuid.v4()
        };
        const newFinances = [...loggedUser.finances, transformedData];
        const updatedUser: UserType = {
          ...loggedUser,
          finances: newFinances
        };
        const updatedUsers = [...users];
        updatedUsers[currentUserIndex] = updatedUser;

        localStorage.setItem('users', JSON.stringify(updatedUsers));
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));

        setLoggedUser(updatedUser);
      }
      }

    } catch (error: any) {
      alert(`Error: ${error}`);
    }
  }


  React.useEffect(
    function handleUserLoggedVerification() {
      if (!loggedUser) {
        navigate('/');
      }
    },
    [loggedUser]
  );
  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <TopBar />
      <FinantialTransactionsTable />

      <CustomModal open={isModalOpen} setOpen={handleModalState}>
        <FinantialForm onSubmit={handleSubmit} initialValues={DEFAULT_VALUES} />
      </CustomModal>
    </Box>
  );
};

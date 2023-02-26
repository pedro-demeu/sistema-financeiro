import { Box, Button, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { t } from 'i18next';
import React from 'react';
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import { FormPattern } from '../..';
import { deleteTransactionModalAtom, Finance, financialTransactionsAtom } from '../../../atoms/finantial';
import { UserLoggedAtom, UserType } from '../../../atoms/login';

interface DeleteFormProps {
  name: string
  id: string
}
export const DeleteForm: React.FC<DeleteFormProps> = ({ name, id }) => {
  const setOpenDeleteModal = useSetRecoilState(deleteTransactionModalAtom);
  const handleClose = (): void => { setOpenDeleteModal(false); };
  const [loggedUser, setLoggedUser] = useRecoilState(UserLoggedAtom);
  
  const deleteItem = (itemId: string) => {
    if (loggedUser) {
      const users: UserType[] = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedItems = loggedUser.finances.filter(item => item.id !== itemId);
      const updatedUser: UserType = {
        ...loggedUser,
        finances: updatedItems
      };

      const currentUserIndex = users.findIndex(user => user.id === loggedUser.id);
      if (currentUserIndex !== -1) {
        users[currentUserIndex] = updatedUser;
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        setLoggedUser({
          ...loggedUser,
          finances: updatedItems
        })
        handleClose()
      }
    }
  }
  const formik = useFormik({
    initialValues: {
      id: 0
    },
    onSubmit: () => deleteItem(id)
  });
  return (
    <FormPattern
      onSubmit={formik.handleSubmit}
      title={t('forms_actions:exclude')}
      borderColor="#DE1F53"
    >
      <Typography sx={{ color: 'white' }}>
        {t('_common:delete_alert')}
      </Typography>
      <Box paddingTop="3rem" paddingBottom="5rem" width="100%">
        <Typography align="left" sx={{ color: 'white' }}>
          - {name}
        </Typography>
      </Box>
      <Button
        fullWidth
        type="submit"
        variant="contained"
        sx={{
          bgcolor: '#DE1F53',
          '&:hover': {
            bgcolor: '#B51943'
          }
        }}
      >
        {t('forms_actions:confirm')}
      </Button>
    </FormPattern>
  );
};

export default DeleteForm;

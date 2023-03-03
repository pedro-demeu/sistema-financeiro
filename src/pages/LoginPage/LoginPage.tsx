import { Box, useTheme } from '@mui/material';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as CryptoJS from 'crypto-js';
import { FeedbackLoginMessageAtom, LoginSchema, UserLoggedAtom, UserType } from '@/atoms/login';
import { LoginForm } from '@/components/forms';

export const LoginPage: React.FC = () => {
  const setLoggedUser = useSetRecoilState(UserLoggedAtom);
  const setFeedBackMessage = useSetRecoilState(FeedbackLoginMessageAtom);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSubmit = (data: LoginSchema): void => {
    const encryptedPassword = CryptoJS.SHA256(data.password).toString();
    const users: UserType[] = localStorage.getItem('users')
      // @ts-ignore
      ? JSON.parse(localStorage.getItem('users'))
      : [];

    const CAN_BE_LOGIN = users.some(user => user.email === data.email && user.password === encryptedPassword);

    if (!CAN_BE_LOGIN) {
      setFeedBackMessage({
        color: theme.palette.error.main,
        message: `${t('_common:login_fails')}`
      })
      return;
    }
    const currentUser = users.find(user => user.email === data.email && user.password === encryptedPassword);
    currentUser && setLoggedUser(currentUser);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    navigate('/home');
  };

  React.useEffect(function cleanUpCurrentUser(){
    localStorage.removeItem('currentUser');
    setLoggedUser(null);
  });
  
  return (
    <Box component="main" height="100%" mt={15}>
      <LoginForm
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

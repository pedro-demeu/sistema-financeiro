import { Box, Button, FormControl, TextField, Typography, useTheme } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  AppContainer,
  CustomLink,
  FormPattern
} from '../..';
import * as CryptoJS from 'crypto-js';
import * as uuid from 'uuid';
import { FeedbackType, UserType } from '@/atoms/login';
import { useLogin } from '@/atoms/account';
import { useYupObject } from '@/hooks';


export const CreateAccountForm: React.FC = () => {
  const [feedbackMessage, setFeedbackMessage] = React.useState<FeedbackType>({
    color: undefined,
    message: ''
  });
  const usernameInputRef = React.useRef(null);
  const { createAccount } = useLogin();
  const theme = useTheme();
  const { t } = useTranslation();
  const yup = useYupObject();
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      id: '',
    },
    validationSchema: yup.object({
      username: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required(),
      // @ts-ignore
      confirmPassword: yup.string().oneOf([yup.ref('password'), null], t('_common:password_must_match')).required()
    }),
    onSubmit: (newUser) => {
      const users: UserType[] = JSON.parse(localStorage.getItem('users') || '[]');
      const theme = useTheme();
      const isDuplicate = users.some(user => user.id === newUser.id || user.email === newUser.email);
      if (isDuplicate) {
        setFeedbackMessage({
          color: theme.palette.error.main,
          message: t('_common:email_already_exists'),
        });
        formik.resetForm();
        return;
      }

      createAccount({
        email: newUser.email,
        finances: [],
        id: '',
        password: newUser.password,
        username: newUser.username
      })
      setFeedbackMessage({
        color: theme.palette.success.main,
        message: t('_common:new_user_created')
      });
      formik.resetForm();
    }
  });

  React.useEffect(function cleanupFeedbackMessage() {
    if (feedbackMessage) {
      const timeoutId = setTimeout(() => {
        setFeedbackMessage({
          color: undefined,
          message: null
        });
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [feedbackMessage]);

  return (
    <AppContainer>
      <FormPattern title={t('_common:create_account')} onSubmit={formik.handleSubmit}>
        <FormControl
          sx={{
            display: 'block',
            marginBottom: '1rem'
          }}
        >
          <TextField
            ref={usernameInputRef}
            autoFocus
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            autoComplete="off"
            label={t('_common:name')}
            value={formik.values.username}
            name="username"
            fullWidth
            id="username"
          />
        </FormControl>
        <FormControl
          sx={{
            display: 'block',
            marginBottom: '1rem'
          }}
        >
          <TextField
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            autoComplete="off"
            label={t('_common:email')}
            value={formik.values.email}
            name="email"
            fullWidth
            id="email"
            type="email"
          />
        </FormControl>
        <FormControl
          sx={{
            display: 'block',
            marginBottom: '1rem'
          }}
        >
          <TextField
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            autoComplete="off"
            label={t('login:password')}
            value={formik.values.password}
            name="password"
            fullWidth
            id="password"
            type="password"
          />
        </FormControl>
        <FormControl
          sx={{
            display: 'block',
            marginBottom: '1rem'
          }}
        >
          <TextField
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            autoComplete="off"
            label={t('_common:confirm_pass')}
            value={formik.values.confirmPassword}
            name="confirmPassword"
            fullWidth
            id="confirmPassword"
            type="password"
          />
        </FormControl>
        <FormControl
          sx={{
            display: 'block',
            marginBottom: '1rem'
          }}
        >
        </FormControl>
        <FormControl
          sx={{
            display: 'block',
            margin: '2rem 0'
          }}
        >
          <FormControl
            sx={{
              display: 'flex',
              alignItems: 'end'
            }}
          >
            <Button
              type="submit"
              disabled={formik.isSubmitting}
              variant="contained"
              fullWidth
              sx={{
                bgcolor: theme.palette.success.main,
                '&:hover': {
                  bgcolor: theme.palette.success.dark
                }
              }}
            >
              {t('forms_actions:create')}
            </Button>
          </FormControl>
          <Box mt={4} mb={4} display="flex" width="100%" justifyContent="center" alignItems="center">
            <Typography align='center' sx={{
              color: feedbackMessage.color
            }}>
              {feedbackMessage.message}
            </Typography>
          </Box>
        </FormControl>
        <CustomLink title={t('forms_actions:back')} to="/" />
      </FormPattern>
    </AppContainer>
  );
};

import { Box, Button, FormControl, Typography } from '@mui/material';
import React from 'react';
import { useFormik } from 'formik';
import {
  AppContainer,
  CustomLink,
  CustomTextField,
  FormPattern
} from '../../components';
import { useTranslation } from 'react-i18next';
import { useYupObject } from '../../hooks';

export const ForgotPassword: React.FC = () => {
  const [feedbackMessage, setFeedbackMessage] = React.useState('');
  const { t } = useTranslation();
  const yup = useYupObject();

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: yup.object({
      email: yup.string().required().email()
    }),
    onSubmit: (values) => {
      setFeedbackMessage(`Enviamos um e-mail para ${values.email}`);
    }
  });
  return (
    <AppContainer>
      <FormPattern onSubmit={formik.handleSubmit} title={t('login:recovery_account')}>
        <FormControl
          sx={{
            display: 'block',
            marginBottom: '1rem'
          }}
        >
          <CustomTextField
            variant="outlined"
            label="E-mail"
            fullWidth
            autoComplete="off"
            id="email"
            name="email"
            helperText={formik.errors.email}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.errors.email)}
            type="email"
          />
        </FormControl>

        <FormControl
          sx={{
            display: 'block',
            margin: '2rem 0'
          }}
        >
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: '100%',
              bgcolor: '#289E71',
              '&:hover': {
                bgcolor: '#2FBA85'
              }
            }}
          >
            {t('forms_actions:recovery')}
          </Button>
        </FormControl>
        <Box mt={2} mb={2} width="100%">
          <Typography align="center" sx={{ color: 'white' }}>{feedbackMessage}</Typography>
        </Box>
        <CustomLink title={t('forms_actions:back')} to="/" />
      </FormPattern>
    </AppContainer>
  );
};

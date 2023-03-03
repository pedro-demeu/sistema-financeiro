import { Box, Button, FormControl, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useFormik } from 'formik';

import { useTranslation } from 'react-i18next';
import { useYupObject } from '@/hooks';
import { AppContainer, CustomLink, CustomTextField, FormPattern } from '@/components';

export const ForgotPassword: React.FC = () => {
  const [feedbackMessage, setFeedbackMessage] = React.useState('');
  const { t } = useTranslation();
  const yup = useYupObject();
  const theme = useTheme();

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
              bgcolor: theme.palette.success.light,
              '&:hover': {
                bgcolor: theme.palette.success.dark
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

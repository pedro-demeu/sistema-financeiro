import React from 'react';
import { Box, Button, Checkbox, FormControl, FormControlLabel, Typography, TextField, useTheme } from '@mui/material';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import { LoginSchema, FeedbackLoginMessageAtom, DEFAULT_VALUES } from '@/atoms/login';
import { CustomLink, FormPattern } from '@/components/';
import { useYupObject } from '@/hooks';

interface LoginFormProps {
  onSubmit: (data: LoginSchema) => void
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit
}) => {
  const { t } = useTranslation();
  const yup = useYupObject();
  const [feedbackMessage, setFeedbackMessage] = useRecoilState(FeedbackLoginMessageAtom);
  const theme = useTheme();
  const loginValidations = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
    rememberMe: yup.boolean()
  });

  const formik = useFormik({
    initialValues: DEFAULT_VALUES,
    validationSchema: loginValidations,
    onSubmit: (receivedValues, { setSubmitting }) => {
      setSubmitting(true);
      onSubmit(receivedValues);
      setSubmitting(false);
    }
  });

  React.useEffect(function cleanupFeedbackMessage() {
    if (feedbackMessage) {
      const timeoutId = setTimeout(() => {
        setFeedbackMessage({
          color: undefined,
          message: null
        });
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [feedbackMessage, setFeedbackMessage]);


  return (
    <FormPattern
      onSubmit={formik.handleSubmit}
      title={t('login:login_to_continue')}
    >
      <FormControl
        sx={{
          display: 'block',
          marginBottom: '1rem'
        }}
      >
        <TextField
          onBlur={formik.handleBlur}
          autoComplete="off"
          fullWidth
          id="email"
          name="email"
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          value={formik.values.email}
          label={t('_common:email')}
        />
      </FormControl>
      <FormControl
        sx={{
          display: 'block'
        }}
      >
        <TextField
          onBlur={formik.handleBlur}
          fullWidth
          id="password"
          name="password"
          onChange={formik.handleChange}
          autoComplete="off"
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          value={formik.values.password}
          type="password"
          label={t('login:password')}
        />
      </FormControl>
      <FormControl
        sx={{
          display: 'block',
          margin: '1rem 0 0'
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={formik.values.rememberMe}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="rememberMe"
              name="rememberMe"
            />
          }
          label={t('login:rememberme')}
          sx={{
            color: 'white'
          }}
        />
        <Box mt={2} mb={2} display="flex" width="100%" justifyContent="center" alignItems="center">
          <Typography align='center' sx={{
            color: feedbackMessage.color
          }}>
            {feedbackMessage.message}
          </Typography>
        </Box>
        <FormControl
          sx={{
            display: 'flex',
            alignItems: 'end',
            margin: '2rem 0 1rem'
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
            {t('forms_actions:login')}
          </Button>
        </FormControl>
      </FormControl>
      <FormControl
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <CustomLink title={t('login:create_an_account')} to="/create-account" />
      </FormControl>
    </FormPattern>
  );
};

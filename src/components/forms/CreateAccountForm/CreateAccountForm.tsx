import { Button, FormControl } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import { object, string } from 'yup'
import { useTranslation } from 'react-i18next'
import {
  AppContainer,
  CustomLink,
  CustomTextField,
  FormPattern
} from '../..'

export const CreateAccountForm: React.FC = () => {
  const { t } = useTranslation()
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: object({
      username: string().required().min(5),
      email: string().email().required(),
      password: string().required().min(4),
      confirmPassword: string().required().min(4)
    }),
    onSubmit: (values) => { console.log(values) }
  })
  return (
    <AppContainer>
      <FormPattern title={t('_common:create_account')} onSubmit={formik.handleSubmit}>
        <FormControl
          sx={{
            display: 'block',
            marginBottom: '1rem'
          }}
        >
          <CustomTextField
            error={Boolean(formik.errors.username)}
            InputLabelProps={{
              style: {
                color: '#DDD'
              }
            }}
            InputProps={{
              style: {
                color: 'white'
              }
            }}
            autoComplete="off"
            label={t('_common:name')}
            value={formik.values.username}
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={{
              borderColor: 'white',
              color: 'white'
            }}
            fullWidth
            id="fullname"
          />
        </FormControl>
        <FormControl
          sx={{
            display: 'block',
            marginBottom: '1rem'
          }}
        >
          <CustomTextField
            error={Boolean(formik.errors.email)}
            InputLabelProps={{
              style: {
                color: '#DDD'
              }
            }}
            InputProps={{
              style: {
                color: 'white'
              }
            }}
            autoComplete="off"
            label={t('_common:email')}
            value={formik.values.email}
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={{
              borderColor: 'white',
              color: 'white'
            }}
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
          <CustomTextField
            error={Boolean(formik.errors.password)}
            InputLabelProps={{
              style: {
                color: '#DDD'
              }
            }}
            InputProps={{
              style: {
                color: 'white'
              }
            }}
            autoComplete="off"
            label={t('login:password')}
            value={formik.values.password}
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={{
              borderColor: 'white',
              color: 'white'
            }}
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
          <CustomTextField
            error={Boolean(formik.errors.confirmPassword)}
            InputLabelProps={{
              style: {
                color: '#DDD'
              }
            }}
            InputProps={{
              style: {
                color: 'white'
              }
            }}
            autoComplete="off"
            label={t('_common:confirm_pass')}
            value={formik.values.confirmPassword}
            name="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={{
              borderColor: 'white',
              color: 'white'
            }}
            fullWidth
            id="password-repeat"
            type="password"
          />
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
              disabled={
                Boolean(formik.errors.username) ||
                Boolean(formik.errors.password) ||
                Boolean(formik.errors.confirmPassword) ||
                Boolean(formik.errors.email)
              }
              className="actionButton"
            >
              {t('forms_actions:create')}
            </Button>
          </FormControl>
        </FormControl>
        <CustomLink title={t('forms_actions:back')} to="/" />
      </FormPattern>
    </AppContainer>
  )
}

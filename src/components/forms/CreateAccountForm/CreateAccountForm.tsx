import { Button, FormControl } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  AppContainer,
  CustomLink,
  CustomTextField,
  FormPattern
} from '../..'
import { useYupObject } from '../../../hooks'

export const CreateAccountForm: React.FC = () => {
  const { t } = useTranslation()
  const yup = useYupObject()
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: yup.object({
      username: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required(),
      confirmPassword: yup.string().required()
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
            autoComplete="off"
            label={t('_common:name')}
            value={formik.values.username}
            helperText={formik.errors.username}
            name="username"
            onChange={formik.handleChange}
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
            helperText={formik.errors.email}
            autoComplete="off"
            label={t('_common:email')}
            value={formik.values.email}
            name="email"
            onChange={formik.handleChange}
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
            helperText={formik.errors.password}
            autoComplete="off"
            label={t('login:password')}
            value={formik.values.password}
            name="password"
            onChange={formik.handleChange}
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
            helperText={formik.errors.confirmPassword}
            autoComplete="off"
            label={t('_common:confirm_pass')}
            value={formik.values.confirmPassword}
            name="confirmPassword"
            onChange={formik.handleChange}
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

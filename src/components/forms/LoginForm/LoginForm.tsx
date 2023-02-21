import React from 'react'
import { Button, Checkbox, FormControl, FormControlLabel } from '@mui/material'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { CustomLink, CustomTextField, FormPattern } from '../../../components'
import { DEFAULT_VALUES, type LoginSchema } from '../../../atoms/login'
import { useYupObject } from '../../../hooks'
import { loginValidations } from './validations'

interface LoginFormProps {
  onSubmit: (data: LoginSchema) => void
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit
}) => {
  const { t } = useYupObject()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: DEFAULT_VALUES,
    validationSchema: loginValidations,
    onSubmit: (receivedValues, { setSubmitting }) => {
      setSubmitting(true)
      onSubmit(receivedValues)
      navigate('/home')
      setSubmitting(false)
    }
  })

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
        <CustomTextField
          autoFocus
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
          fullWidth
          id="username"
          name="username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={!(formik.errors.username == null)}
          helperText={formik.errors.username}
          value={formik.values.username}
          label={t('login:username')}
        />
      </FormControl>
      <FormControl
        sx={{
          display: 'block'
        }}
      >
        <CustomTextField
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
          fullWidth
          id="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          autoComplete="off"
          error={Boolean(formik.errors.password)}
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
              sx={{
                color: 'white'
              }}
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
            className="actionButton"
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
        <CustomLink title={t('login:forgot_password')} to="/forgot-password" />
      </FormControl>
    </FormPattern>
  )
}

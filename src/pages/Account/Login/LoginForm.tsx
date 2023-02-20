import { Button, Checkbox, FormControl, FormControlLabel } from '@mui/material'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import { boolean, object, string } from 'yup'
import { CustomLink, CustomTextField, FormPattern } from '../../../components'
import { DEFAULT_VALUES, UserLoggedAtom } from '../../../atoms/login'
import { useSetRecoilState } from 'recoil'

export const LoginForm: React.FC = () => {
  const setLoggedUser = useSetRecoilState(UserLoggedAtom)
  const navigate = useNavigate()
  const loginValidations = object({
    username: string().required().min(4).max(50),
    password: string().required().min(4).max(8),
    rememberMe: boolean()
  })

  const formik = useFormik({
    initialValues: DEFAULT_VALUES,
    validationSchema: loginValidations,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true)
      setLoggedUser(values)
      navigate('/home')
      setSubmitting(false)
    }
  })

  return (
    <FormPattern
      onSubmit={formik.handleSubmit}
      title="Faça login para continuar"
    >
      <FormControl
        sx={{
          display: 'block',
          marginBottom: '1rem'
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
          autoComplete="off"
          fullWidth
          id="username"
          name="username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={!(formik.errors.username == null)}
          value={formik.values.username}
          label="Usuário"
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
          label="Senha"
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
          label="Lembrar-me"
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
            Entrar
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
        <CustomLink title="Criar uma conta" to="/create-account" />
        <CustomLink title="Esqueci minha senha" to="/forgot-password" />
      </FormControl>
    </FormPattern>
  )
}

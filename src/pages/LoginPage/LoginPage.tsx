import { Box } from '@mui/material'
import React from 'react'
import { useSetRecoilState } from 'recoil'
import { UserLoggedAtom, type LoginSchema } from '../../atoms/login'
import { LoginForm } from '../../components/forms'

export const LoginPage: React.FC = () => {
  const setLoggedUser = useSetRecoilState(UserLoggedAtom)

  const handleSubmit = (data: LoginSchema): void => {
    setLoggedUser(data)
  }

  return (
    <Box component="main" height="100%">
      <LoginForm
        onSubmit={handleSubmit}
      />
    </Box>
  )
}

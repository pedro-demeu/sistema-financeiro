import { Box } from '@mui/material'
import React from 'react'
import { LoginForm } from '../../components/forms'

export const LoginPage: React.FC = () => {
  return (
    <Box component="main" height="100%">
      <LoginForm />
    </Box>
  )
}

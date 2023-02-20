import React from 'react'
import { Box } from '@mui/material'

interface Props {
  children: JSX.Element
}
export const AppContainer: React.FC<Props> = ({ children }) => {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        background: '#211f27'
      }}
    >
      {children}
    </Box>
  )
}

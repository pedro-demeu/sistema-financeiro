import React from 'react'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { CssBaseline } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { Routes } from './routes'
import { AppContainer } from './components'
import { RecoilRoot } from 'recoil'

export const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
        <RecoilRoot>
          <AppContainer>
            <BrowserRouter>
              <Routes />
            </BrowserRouter>
          </AppContainer>
        </RecoilRoot>
    </>
  )
}

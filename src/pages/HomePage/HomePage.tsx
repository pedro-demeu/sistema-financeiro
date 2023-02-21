import { Box } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useRecoilState } from 'recoil'
import {
  DEFAULT_VALUES,
  type FinancialTransaction,
  finantialTransactionModalAtom
} from '../../atoms/finantial'
import {
  CustomModal,
  FinantialTransactionsTable,
  TopBar
} from '../../components'
import { FinantialForm } from '../../components/forms'
import { transformDate } from '../../utils/transformDate'

export const HomePage: React.FC = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(
    finantialTransactionModalAtom
  )
  const handleModalState = (): void => {
    setIsModalOpen(!isModalOpen)
  }
  async function handleSubmit (data: FinancialTransaction): Promise<void> {
    try {
      await axios.post('http://localhost:3000/items', {
        ...data,
        createdAt: transformDate(new Date())
      })
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      alert(`error: ${error}`)
    }
  }

  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <TopBar />
      <FinantialTransactionsTable />

      <CustomModal open={isModalOpen} setOpen={handleModalState}>
        <FinantialForm onSubmit={handleSubmit} initialValues={DEFAULT_VALUES} />
      </CustomModal>
    </Box>
  )
}

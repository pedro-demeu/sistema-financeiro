import { Box, Button, Typography } from '@mui/material'
import axios from 'axios'
import { useFormik } from 'formik'
import { t } from 'i18next'
import React from 'react'
import { useSetRecoilState } from 'recoil'
import { FormPattern } from '../..'
import { deleteTransactionModalAtom } from '../../../atoms/finantial'

interface DeleteFormProps {
  name: string
  id: number
}
export const DeleteForm: React.FC<DeleteFormProps> = ({ name, id }) => {
  const setOpenDeleteModal = useSetRecoilState(deleteTransactionModalAtom)
  const handleClose = (): void => { setOpenDeleteModal(false) }

  const formik = useFormik({
    initialValues: {
      id: 0
    },
    onSubmit: async () => {
      try {
        await axios.delete(`http://localhost:3000/items/${id}`)
        handleClose()
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        alert(`Error: ${error}`)
      }
    }
  })
  return (
    <FormPattern
      onSubmit={formik.handleSubmit}
      title={t('forms_actions:exclude')}
      borderColor="#DE1F53"
    >
      <Typography sx={{ color: 'white' }}>
        {t('_common:delete_alert')}
      </Typography>
      <Box paddingTop="3rem" paddingBottom="5rem" width="100%">
        <Typography align="left" sx={{ color: 'white' }}>
          - {name}
        </Typography>
      </Box>
      <Button
        fullWidth
        type="submit"
        variant="contained"
        sx={{
          bgcolor: '#DE1F53',
          '&:hover': {
            bgcolor: '#B51943'
          }
        }}
      >
        {t('forms_actions:confirm')}
      </Button>
    </FormPattern>
  )
}

export default DeleteForm

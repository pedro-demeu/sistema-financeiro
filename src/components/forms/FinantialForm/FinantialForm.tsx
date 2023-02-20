import React from 'react'
import {
  FormControl,
  Box,
  Button,
  TextField,
  styled,
  InputAdornment,
  Typography
} from '@mui/material'
import { FormPattern, SelectTypeFinantial } from '../..'
import { useSetRecoilState } from 'recoil'
import {
  editTransactionModalAtom,
  type FinancialTransaction,
  finantialTransactionModalAtom
} from '../../../atoms/finantial'
import { useFormik } from 'formik'
import { boolean, number, object, string } from 'yup'

const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#888'
    },
    '&:hover fieldset': {
      borderColor: '#888'
    },
    '&.Mui-focused fieldset': {
      borderColor: '#888'
    }
  }
})

interface FinantialFormProps {
  initialValues: FinancialTransaction
  onSubmit: (data: FinancialTransaction) => Promise<void>
}

export const FinantialForm: React.FC<FinantialFormProps> = ({
  initialValues,
  onSubmit
}) => {
  const setModalClose = useSetRecoilState(finantialTransactionModalAtom)
  const setEditModalClose = useSetRecoilState(editTransactionModalAtom)
  const formik = useFormik({
    initialValues,
    validationSchema: object({
      name: string().required().min(3).max(55),
      value: number().required().min(0),
      type: string().required(),
      isDone: boolean()
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true)
      await onSubmit({
        ...values,
        createdAt: initialValues.createdAt
      })
      setSubmitting(false)
      ;(initialValues.id !== 0) ? setEditModalClose(false) : setModalClose(false)
    },
    enableReinitialize: true
  })

  return (
    <FormPattern
      onSubmit={formik.handleSubmit}
      title={
        (initialValues.id !== 0) ? 'Altere suas finanças' : 'Cadastre uma nova finança'
      }
      borderColor={(initialValues.id !== 0) ? '#E3BA40' : ''}
    >
      <FormControl
        sx={{
          display: 'block',
          marginBottom: '1rem'
        }}
      >
        <CustomTextField
          label="Apelido"
          autoComplete="off"
          variant="outlined"
          fullWidth
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={!(formik.errors.name == null)}
          onBlur={formik.handleBlur}
          type="text"
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
        />
      </FormControl>
      <FormControl
        sx={{
          display: 'block',
          marginBottom: '1rem'
        }}
      >
        <CustomTextField
          label="Valor"
          variant="outlined"
          fullWidth
          id="value"
          autoComplete="off"
          name="value"
          value={formik.values.value}
          onChange={formik.handleChange}
          error={!(formik.errors.value == null)}
          onBlur={formik.handleBlur}
          type="number"
          InputLabelProps={{
            style: {
              color: '#DDD'
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Typography color="white">R$</Typography>
              </InputAdornment>
            ),
            style: {
              color: 'white'
            }
          }}
        />
      </FormControl>
      <FormControl
        sx={{
          display: 'block',
          marginBottom: '1rem'
        }}
      >
        <SelectTypeFinantial
          id="type"
          name="type"
          currentValue={formik.values.type}
          onChange={(event) => {
            formik.handleChange(event)
          }}
        />

        <Box display="flex" justifyContent="end" width="100%" marginTop="1rem">
          <Button
            type="submit"
            disabled={!(formik.errors.name == null) || !(formik.errors.value == null)}
            variant="contained"
            sx={{
              width: '100%',
              bgcolor: (initialValues.id !== 0) ? '#E3BA40' : '#289E71',
              '&:hover': {
                bgcolor: (initialValues.id !== 0) ? '#AB8338' : '#E0AC4A'
              }
            }}
          >
            {(formik.values.id !== 0) ? 'Alterar' : 'Adicionar'}
          </Button>
        </Box>
      </FormControl>
    </FormPattern>
  )
}

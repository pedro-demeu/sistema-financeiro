import React from 'react'
import {
  FormControl,
  Box,
  Button
} from '@mui/material'
import { CustomTextField, FormPattern, SelectTypeFinantial } from '../..'
import { useSetRecoilState } from 'recoil'
import {
  editTransactionModalAtom,
  type FinancialTransaction,
  finantialTransactionModalAtom
} from '../../../atoms/finantial'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useYupObject } from '../../../hooks'

interface FinantialFormProps {
  initialValues: FinancialTransaction
  onSubmit: (data: FinancialTransaction) => Promise<void>
}

export const FinantialForm: React.FC<FinantialFormProps> = ({
  initialValues,
  onSubmit
}) => {
  const { t } = useTranslation()
  const yup = useYupObject()
  const setModalClose = useSetRecoilState(finantialTransactionModalAtom)
  const setEditModalClose = useSetRecoilState(editTransactionModalAtom)
  const formik = useFormik({
    initialValues,
    validationSchema: yup.object({
      name: yup.string().required().max(55),
      value: yup.number().required().positive(),
      type: yup.string().required(),
      isDone: yup.boolean()
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
        (initialValues.id !== 0) ? t('_common:change_your_finances') : t('_common:create_your_finance')
      }
      borderColor={(initialValues.id !== 0) ? '#E3BA40' : '#6eca9f'}
    >
      <FormControl
        sx={{
          display: 'block',
          marginBottom: '1rem'
        }}
      >
        <CustomTextField
          label={t('columns:name')}
          autoComplete="off"
          fullWidth
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.name)}
          type="text"
          helperText={formik.errors.name}
        />
      </FormControl>
      <FormControl
        sx={{
          display: 'block',
          marginBottom: '1rem'
        }}
      >
        <CustomTextField
          label={t('columns:value')}
          fullWidth
          id="value"
          autoComplete="off"
          name="value"
          value={formik.values.value}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.value)}
          onBlur={formik.handleBlur}
          type="number"
          helperText={formik.errors.value}
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
          label={t('_common:select_type')}
          currentValue={formik.values.type}
          onChange={(event) => {
            formik.handleChange(event)
          }}
        />

        <Box display="flex" justifyContent="end" width="100%" marginTop="1rem">
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: '100%',
              bgcolor: (initialValues.id !== 0) ? '#E3BA40' : '#289E71',
              '&:hover': {
                bgcolor: !(initialValues.id >= 1) ? '#3d825b  ' : '#AB8338'
              }
            }}
          >
            {(formik.values.id !== 0) ? t('forms_actions:edit') : t('forms_actions:add')}
          </Button>
        </Box>
      </FormControl>
    </FormPattern>
  )
}

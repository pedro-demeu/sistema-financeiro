import React from 'react'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent
} from '@mui/material'
import { type FinancialTransactionType } from '../../atoms/finantial'
import { useTranslation } from 'react-i18next'

interface SelectTypeProps {
  currentValue: FinancialTransactionType
  onChange: (value: SelectChangeEvent<FinancialTransactionType>) => void
  id: string
  name: string
  label: string
}

interface MenuValue {
  label: string
  id: number
  value: FinancialTransactionType
}

export const SelectTypeFinantial: React.FC<SelectTypeProps> = ({
  currentValue,
  onChange,
  id,
  name,
  label
}) => {
  const { t } = useTranslation()

  const menuItemValues: MenuValue[] = [
    {
      label: t('_common:spending'),
      id: Math.random(),
      value: 'SPENDING'
    },
    {
      label: t('_common:income'),
      id: Math.random(),
      value: 'INCOME'
    }
  ]
  return (
    <FormControl fullWidth>
      <InputLabel sx={{ color: 'white' }} id="FinantialSelectID">
        {label}
      </InputLabel>
      <Select
        variant="outlined"
        sx={{
          color: 'white',
          borderColor: '#888',
          '& fieldset': {
            borderColor: '#888'
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#888'
          }
        }}
        labelId="FinantialSelectID"
        id={id}
        name={name}
        value={currentValue}
        label="Selecione o tipo"
        onChange={onChange}
      >
        {menuItemValues.map((item) => (
          <MenuItem key={item.id} id={String(item.id)} value={item.value}>
            {String(item.label).toUpperCase()}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

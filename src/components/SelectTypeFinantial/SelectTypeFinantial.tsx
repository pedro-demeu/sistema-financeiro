import React from 'react'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent
} from '@mui/material'
import { type FinancialTransactionType } from '../../atoms/finantial'

interface SelectTypeProps {
  currentValue: FinancialTransactionType
  onChange: (value: SelectChangeEvent<FinancialTransactionType>) => void
  id: string
  name: string
}

interface MenuValue {
  label: string
  id: number
  value: FinancialTransactionType
}
const menuItemValues: MenuValue[] = [
  {
    label: 'RECEITA',
    id: Math.random(),
    value: 'INCOME'
  },
  {
    label: 'SAÍDA',
    id: Math.random(),
    value: 'SPENDING'
  }
]

export const SelectTypeFinantial: React.FC<SelectTypeProps> = ({
  currentValue,
  onChange,
  id,
  name
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel sx={{ color: 'white' }} id="FinantialSelectID">
        Selecione o tipo
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
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

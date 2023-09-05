import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
  Typography
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import './styles.css';
import { FinancialType } from '@/atoms/transactions';

interface SelectTypeProps {
  currentValue: FinancialType
  onChange: (value: SelectChangeEvent<FinancialType>) => void
  id: string
  name: string
  label: string
}

interface MenuValue {
  label: string
  id: number
  value: FinancialType
}

export const SelectTypeFinantial: React.FC<SelectTypeProps> = ({
  currentValue,
  onChange,
  id,
  name,
  label
}) => {
  const { t } = useTranslation();

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
  ];
  return (
    <FormControl fullWidth>
      <InputLabel sx={{ color: 'white' }} id="FinantialSelectID">
        {label}
      </InputLabel>
      <Select
        variant="outlined"
        labelId="FinantialSelectID"
        id={id}
        name={name}
        value={currentValue}
        label="Selecione o tipo"
        onChange={onChange}
        MenuProps={{
          classes: {
            paper: 'custom-modal'
          }
        }}
      >
        {menuItemValues.map((item) => (
          <MenuItem key={item.id} id={String(item.id)} value={item.value}>
            <Typography color="white">
              {String(item.label).toUpperCase()}
            </Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

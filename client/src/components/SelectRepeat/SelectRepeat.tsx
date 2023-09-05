import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { t } from 'i18next';
import React from 'react';

interface SelectRepeatProps {
  value: string;
  handleChange: (event: SelectChangeEvent) => void;
}
export function SelectRepeat({ value, handleChange }: SelectRepeatProps) {
  return (
    <FormControl sx={{
      mt: 2
    }} fullWidth>
      <InputLabel id="SelectRepeatID">{t('_common:repeat')}</InputLabel>
      <Select
        labelId="SelectRepeatID"
        id="repeat"
        name="repeat"
        value={value}
        defaultValue='Never'
        label={t('_common:repeat')}
        fullWidth
        onChange={handleChange}
        MenuProps={{
          classes: {
            paper: 'custom-modal'
          }
        }}
      >
        <MenuItem value="Monthly">{t('_common:monthly')}</MenuItem>
        <MenuItem value="Weekly">{t('_common:weekly')}</MenuItem>
        <MenuItem value="Yearly">{t('_common:yearly')}</MenuItem>
        <MenuItem value="Never">{t('_common:never')}</MenuItem>
      </Select>

    </FormControl>
  );
}

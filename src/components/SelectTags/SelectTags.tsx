import { FormControl, InputLabel, OutlinedInput, Box, Chip, MenuItem, useTheme, SelectChangeEvent, Select } from '@mui/material';
import React from 'react';
import { Tag, TAGS } from '@/atoms/transactions';

interface SelectTagsProps {
  values: Tag[];
  handleChange: (values: SelectChangeEvent<Tag[]>) => void;
  name: string;
  id: string;
}
export function SelectTags({
  values,
  handleChange: onChange,
  id,
  name
}: SelectTagsProps) {
  const theme = useTheme();
  const tags = [...TAGS];
  const [tagName, setTagName] = React.useState<Tag[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof tagName>) => {
    const {
      target: { value },
    } = event;
    setTagName(
      // @ts-ignore
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  return (
    <FormControl sx={{ width: 300 }}>
      <InputLabel id={`${id}/label`}>Tags</InputLabel>
      <Select
        labelId={`${id}/label`}
        id={id}
        name={name}
        variant="outlined"
        multiple
        value={values ?? []}
        onChange={(event) => {
          handleChange(event);
          onChange(event);
        }}
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {
              selected.map((value) => {
                return (
                  // @ts-ignore
                  <Chip
                    key={value}
                    label={value}
                    sx={{
                      borderColor: theme.palette.success.main,
                      bgcolor: theme.palette.success.main
                    }}
                  />
                );
              })
            }
          </Box>
        )}
        MenuProps={{
          classes: {
            paper: 'custom-modal'
          }
        }}
      >
        {tags.map((name) => (
          <MenuItem
            key={name}
            value={name}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

  );
}

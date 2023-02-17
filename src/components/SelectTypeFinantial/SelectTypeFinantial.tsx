import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  styled,
} from "@mui/material";
import { FinancialTransactionType } from "../../atoms/finantial";

export const SelectTypeFinantial: React.FC = () => {
  const [finantialType, setFinantialType] =
    React.useState<FinancialTransactionType>("SPENDING");

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setFinantialType(event.target.value as FinancialTransactionType);
  };
  return (
    <FormControl fullWidth>
      <InputLabel sx={{ color: "white" }} id="FinantialSelectID">
        Selecione o tipo
      </InputLabel>
      <Select
        variant="outlined"
        sx={{
          color: "white",
          borderColor: "#888",
          "& fieldset": {
            borderColor: "#888",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#888",
          },
        }}
        labelId="FinantialSelectID"
        id="SelectID"
        value={finantialType}
        label="Selecione o tipo"
        onChange={handleChange}
      >
        <MenuItem value="INCOME">RECEITA</MenuItem>
        <MenuItem value="SPENDING">DESPESA</MenuItem>
      </Select>
    </FormControl>
  );
};

import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { FinancialTransactionType } from "../../atoms/finantial";

export const SelectTypeFinantial: React.FC = () => {
  const [finantialType, setFinantialType] =
    React.useState<FinancialTransactionType>("INCOME");

  const handleChange = (event: SelectChangeEvent) => {
    setFinantialType(event.target.value as FinancialTransactionType);
  };
  return (
    <FormControl fullWidth>
      <InputLabel sx={{ color: "white" }} id="FinantialSelectID">
        Selecione o tipo
      </InputLabel>
      <Select
        sx={{ color: "white", borderColor: "white" }}
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

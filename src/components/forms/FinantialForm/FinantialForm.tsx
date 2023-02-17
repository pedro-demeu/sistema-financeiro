import React from "react";
import {
  FormControl,
  InputLabel,
  Input,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { ActionButton, FormPattern, SelectTypeFinantial } from "../..";
import "../styles.css";

export const FinantialForm: React.FC = () => {
  return (
    <FormPattern title="Cadastre uma nova finança">
      <FormControl
        sx={{
          display: "block",
          marginBottom: "1rem",
        }}
      >
        <InputLabel sx={{ color: "white" }} htmlFor="name">
          Apelido
        </InputLabel>
        <Input fullWidth id="name" className="inputPattern" />
      </FormControl>
      <FormControl
        sx={{
          display: "block",
          marginBottom: "1rem",
        }}
      >
        <InputLabel sx={{ color: "white" }} htmlFor="value">
          Valor (R$)
        </InputLabel>
        <Input
          type="number"
          sx={{
            borderColor: "white",
            color: "white",
          }}
          fullWidth
          id="value"
        />
      </FormControl>
      <FormControl
        sx={{
          display: "block",
          marginBottom: "1rem",
        }}
      >
        <SelectTypeFinantial />

        <Box display="flex" justifyContent="end" width="100%" marginTop="1rem">
          <Button
            variant="contained"
            sx={{
              width: "100%",
              bgcolor: "#6eca9f",
            }}
          >
            Salvar
          </Button>
        </Box>
      </FormControl>
    </FormPattern>
  );
};

import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  Link,
  Typography,
} from "@mui/material";
import React from "react";
import {
  ActionButton,
  AppContainer,
  CustomLink,
  FormPattern,
} from "../../../components";

export const ForgotPassword: React.FC = () => {
  return (
    <AppContainer>
      <FormPattern title="Recuperação de conta">
        <FormControl
          sx={{
            display: "block",
            marginBottom: "1rem",
          }}
        >
          <InputLabel
            sx={{
              color: "white",
            }}
            htmlFor="email"
          >
            Digite seu e-mail da conta
          </InputLabel>
          <Input
            sx={{
              borderColor: "white",
              color: "white",
            }}
            fullWidth
            id="email"
            type="email"
          />
        </FormControl>

        <FormControl
          sx={{
            display: "block",
            margin: "2rem 0",
          }}
        >
          <ActionButton title="Recuperar" />
        </FormControl>
        <CustomLink title="Voltar" to="/login" />
      </FormPattern>
    </AppContainer>
  );
};

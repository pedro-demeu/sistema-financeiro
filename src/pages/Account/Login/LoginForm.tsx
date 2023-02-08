import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  Link,
  Typography,
} from "@mui/material";
import React from "react";
import { ActionButton, CustomLink, FormPattern } from "../../../components";

export const LoginForm: React.FC = () => {
  const [checked, setChecked] = React.useState(false);

  function handleChange() {
    setChecked(!checked);
  }
  return (
    <FormPattern title="Faça login para continuar">
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
          htmlFor="user"
        >
          Usuário
        </InputLabel>
        <Input
          sx={{
            borderColor: "white",
            color: "white",
          }}
          fullWidth
          id="user"
        />
      </FormControl>
      <FormControl
        sx={{
          display: "block",
        }}
      >
        <InputLabel
          sx={{
            color: "white",
          }}
          htmlFor="password"
        >
          Senha
        </InputLabel>
        <Input
          sx={{
            borderColor: "white",
            color: "white",
          }}
          fullWidth
          id="password"
        />
      </FormControl>
      <FormControl
        sx={{
          display: "block",
          margin: "1rem 0 0",
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              sx={{
                color: "white",
              }}
              checked={checked}
              onChange={handleChange}
            />
          }
          label="Lembrar-me"
          sx={{
            color: "white",
          }}
        />
        <FormControl
          sx={{
            display: "flex",
            alignItems: "end",
            margin: "2rem 0 1rem",
          }}
        >
          <ActionButton title="Entrar" />
        </FormControl>
      </FormControl>
      <FormControl
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CustomLink title="Criar uma conta" to="/create-account" />
        <CustomLink title="Esqueci minha senha" to="/forgot-password" />
      </FormControl>
    </FormPattern>
  );
};

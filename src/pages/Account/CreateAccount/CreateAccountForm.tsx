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

export const CreateAccountForm: React.FC = () => {
  return (
    <AppContainer>
      <FormPattern title="Criar uma conta">
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
            htmlFor="fullname"
          >
            Nome completo
          </InputLabel>
          <Input
            sx={{
              borderColor: "white",
              color: "white",
            }}
            fullWidth
            id="fullname"
          />
        </FormControl>
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
            E-mail principal
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
            marginBottom: "1rem",
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
            type="password"
          />
        </FormControl>
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
            htmlFor="password-repeat"
          >
            Repita a senha
          </InputLabel>
          <Input
            sx={{
              borderColor: "white",
              color: "white",
            }}
            fullWidth
            id="password-repeat"
            type="password"
          />
        </FormControl>
        <FormControl
          sx={{
            display: "block",
            margin: "2rem 0",
          }}
        >
          <FormControl
            sx={{
              display: "flex",
              alignItems: "end",
            }}
          >
            <ActionButton title="Criar" />
          </FormControl>
        </FormControl>
        <CustomLink title="Voltar" to="/" />
      </FormPattern>
    </AppContainer>
  );
};

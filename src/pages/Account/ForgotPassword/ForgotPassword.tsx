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

export const ForgotPassword: React.FC = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        background: "#0D0D0D",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        style={{
          borderRadius: "5px",
          padding: "3rem",
          width: "400px",
          height: "600px",
          backgroundColor: "#585858",
        }}
      >
        <Typography
          variant="h1"
          color="white"
          sx={{
            fontSize: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          Recuperação de senha!
        </Typography>
        <Typography
          variant="body1"
          sx={{
            marginBottom: "2rem",
          }}
          color="white"
        >
          Digite seu e-mail cadastrado, nós enviaremos um e-mail de recuperação
          para trocar a senha
        </Typography>

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
            margin: "2rem 0",
          }}
        >
          <FormControl
            sx={{
              flexDirection: "row",
              display: "flex",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <Button variant="contained">Voltar</Button>
            <Button variant="contained" color="error">
              Recuperar
            </Button>
          </FormControl>
        </FormControl>
      </form>
    </Box>
  );
};

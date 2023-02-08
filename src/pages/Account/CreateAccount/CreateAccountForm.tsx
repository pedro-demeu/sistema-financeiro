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

export const CreateAccountForm: React.FC = () => {
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
          Crie uma conta para acessar o sistema
        </Typography>
        <Typography
          variant="body1"
          sx={{
            marginBottom: "2rem",
          }}
          color="white"
        >
          informe seus dados abaixo:
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
            <Button fullWidth variant="contained" color="success">
              Entrar
            </Button>
          </FormControl>
        </FormControl>
        <FormControl
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Link
            href=""
            sx={{
              color: "white",
              textDecoration: "none",
            }}
          >
            Criar uma conta
          </Link>
          <Link
            href=""
            sx={{
              color: "white",
              textDecoration: "none",
            }}
          >
            Esqueci minha senha
          </Link>
        </FormControl>
      </form>
    </Box>
  );
};

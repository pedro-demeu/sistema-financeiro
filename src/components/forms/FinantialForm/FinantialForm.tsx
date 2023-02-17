import React from "react";
import {
  FormControl,
  InputLabel,
  Input,
  Box,
  Button,
  TextField,
  styled,
  InputAdornment,
  Typography,
} from "@mui/material";
import { ActionButton, FormPattern, SelectTypeFinantial } from "../..";
import { useSetRecoilState } from "recoil";
import {
  DEFAULT_VALUES,
  financialTransactionsAtom,
  finantialTransactionModalAtom,
} from "../../../atoms/finantial";
import { useFormik } from "formik";
import { boolean, number, object, string } from "yup";

const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#888",
    },
    "&:hover fieldset": {
      borderColor: "#888",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#888",
    },
  },
});

export const FinantialForm: React.FC = () => {
  const setFinantialItems = useSetRecoilState(financialTransactionsAtom);
  const setModalClose = useSetRecoilState(finantialTransactionModalAtom);
  const loginValidations = object({
    name: string().required().min(3).max(55),
    value: number().required().min(0),
    type: string().required(),
    isDone: boolean(),
  });

  const formik = useFormik({
    initialValues: DEFAULT_VALUES,
    validationSchema: loginValidations,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      await setFinantialItems((e) => {
        return [...e, values];
      });
      setModalClose(false);
      setSubmitting(false);
    },
  });
  return (
    <FormPattern
      onSubmit={formik.handleSubmit}
      title="Cadastre uma nova finança"
    >
      <FormControl
        sx={{
          display: "block",
          marginBottom: "1rem",
        }}
      >
        <CustomTextField
          label="Apelido"
          autoComplete="off"
          variant="outlined"
          fullWidth
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={!!formik.errors.name}
          onBlur={formik.handleBlur}
          type="text"
          InputLabelProps={{
            style: {
              color: "#DDD",
            },
          }}
          InputProps={{
            style: {
              color: "white",
            },
          }}
        />
      </FormControl>
      <FormControl
        sx={{
          display: "block",
          marginBottom: "1rem",
        }}
      >
        <CustomTextField
          label="Valor"
          variant="outlined"
          fullWidth
          id="value"
          autoComplete="off"
          name="value"
          value={formik.values.value}
          onChange={formik.handleChange}
          error={!!formik.errors.value}
          onBlur={formik.handleBlur}
          type="number"
          InputLabelProps={{
            style: {
              color: "#DDD",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Typography color="white">R$</Typography>
              </InputAdornment>
            ),
            style: {
              color: "white",
            },
          }}
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
            type="submit"
            disabled={
              !!formik.errors.name ||
              !!formik.errors.value ||
              !!(formik.values.name === "")
            }
            variant="contained"
            sx={{
              width: "100%",
              bgcolor: "#289E71",
              "&:hover": {
                bgcolor: "#2FBA85",
              },
            }}
          >
            Adicionar
          </Button>
        </Box>
      </FormControl>
    </FormPattern>
  );
};

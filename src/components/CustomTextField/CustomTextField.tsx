import React from "react";
import styled from "@emotion/styled";
import { TextField } from "@mui/material";

export const CustomTextField = styled(TextField)({
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

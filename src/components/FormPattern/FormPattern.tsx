import { Box, Typography } from "@mui/material";
import React from "react";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  title: string;
}
export const FormPattern: React.FC<FormProps> = ({
  children,
  title,
  ...props
}) => {
  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="center"
      height="100%"
      alignItems="center"
    >
      <form
        style={{
          borderRadius: "5px",
          padding: "3rem",
          width: "400px",
          minHeight: "470px",
          backgroundColor: "#3A3844",
        }}
        {...props}
      >
        <Box display="flex" alignItems="center" justifyContent="center">
          <Typography
            variant="h1"
            color="white"
            sx={{
              fontSize: "1.5rem",
              marginBottom: "3rem",
              fontWeight: "bold",
              borderBottom: "2px solid #6eca9f",
              paddingBottom: "1rem",
              width: "100%",
              textAlign: "left",
            }}
          >
            {title}
          </Typography>
        </Box>

        {children}
      </form>
    </Box>
  );
};

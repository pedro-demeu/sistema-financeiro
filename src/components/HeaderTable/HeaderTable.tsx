import React from "react";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  Modal,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ActionButton, CustomModal, FormPattern } from "..";
import { FinantialForm } from "../forms";
import DeleteIcon from "@mui/icons-material/Delete";
export const HeaderTable: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <Box
      sx={{
        marginBottom: "1rem",
        borderBottom: "1px solid #6eca9f",
        paddingBottom: "0.5rem",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Button onClick={handleOpen}>
        <DeleteIcon sx={{ color: "#DE1F53" }} />
      </Button>
      <Button onClick={handleOpen}>
        <AddIcon sx={{ color: "#6eca9f" }} />
      </Button>

      <CustomModal open={open} setOpen={handleOpen}>
        <FinantialForm />
      </CustomModal>
    </Box>
  );
};

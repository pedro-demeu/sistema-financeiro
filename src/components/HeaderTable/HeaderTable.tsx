import React from "react";
import { Box, Button } from "@mui/material";
import { CustomModal } from "..";
import { FinantialForm } from "../forms";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";

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
        justifyContent: "end",
      }}
    >
      <Button>
        <DownloadRoundedIcon fontSize="medium" sx={{ color: "#7D9DBD" }} />
      </Button>
      <Button onClick={handleOpen}>
        <DeleteIcon fontSize="medium" sx={{ color: "#DE1F53" }} />
      </Button>
      <Button>
        <EditRoundedIcon fontSize="medium" sx={{ color: "#FACA41" }} />
      </Button>
      <Button onClick={handleOpen}>
        <AddCircleRoundedIcon fontSize="medium" sx={{ color: "#6eca9f" }} />
      </Button>

      <CustomModal open={open} setOpen={handleOpen}>
        <FinantialForm />
      </CustomModal>
    </Box>
  );
};

import React from "react";
import { Box, Button } from "@mui/material";
import { CustomModal } from "..";
import { FinantialForm } from "../forms";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import { useRecoilState } from "recoil";
import { finantialTransactionModalAtom } from "../../atoms/finantial";

export const HeaderTable: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(
    finantialTransactionModalAtom
  );
  const handleModalState = () => setIsModalOpen(!isModalOpen);

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
        <DownloadRoundedIcon fontSize="small" sx={{ color: "white" }} />
      </Button>
      <Button onClick={handleModalState}>
        <DeleteIcon fontSize="small" sx={{ color: "white" }} />
      </Button>
      <Button>
        <EditRoundedIcon fontSize="small" sx={{ color: "white" }} />
      </Button>
      <Button onClick={handleModalState}>
        <AddCircleRoundedIcon fontSize="small" sx={{ color: "white" }} />
      </Button>
    </Box>
  );
};

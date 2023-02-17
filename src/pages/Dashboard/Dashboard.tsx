import { Box } from "@mui/material";
import React from "react";
import { useRecoilState } from "recoil";
import { finantialTransactionModalAtom } from "../../atoms/finantial";
import {
  CustomModal,
  FinantialTransactionsTable,
  TopBar,
} from "../../components";
import { FinantialForm } from "../../components/forms";

export const Dashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(
    finantialTransactionModalAtom
  );
  const handleModalState = () => setIsModalOpen(!isModalOpen);

  return (
    <Box
      height="60%"
      display="flex"
      alignItems="center"
      flexDirection="column"
      justifyContent="space-between"
    >
      <TopBar />
      <FinantialTransactionsTable />

      <CustomModal open={isModalOpen} setOpen={handleModalState}>
        <FinantialForm />
      </CustomModal>
    </Box>
  );
};

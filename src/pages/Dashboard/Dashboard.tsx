import { Box } from "@mui/material";
import axios from "axios";
import React from "react";
import { useRecoilState } from "recoil";
import {
  DEFAULT_VALUES,
  FinancialTransaction,
  finantialTransactionModalAtom,
} from "../../atoms/finantial";
import {
  CustomModal,
  FinantialTransactionsTable,
  TopBar,
} from "../../components";
import { FinantialForm } from "../../components/forms";
import { transformDate } from "../../utils/transformDate";

export const Dashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(
    finantialTransactionModalAtom
  );
  const handleModalState = () => setIsModalOpen(!isModalOpen);
  async function handleSubmit(data: FinancialTransaction) {
    try {
      await axios.post("http://localhost:3000/items", {
        ...data,
        createdAt: transformDate(new Date()),
      });
    } catch (error: any) {
      alert(`error: ${error}`);
    }
  }
  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <TopBar />
      <FinantialTransactionsTable />

      <CustomModal open={isModalOpen} setOpen={handleModalState}>
        <FinantialForm onSubmit={handleSubmit} initialValues={DEFAULT_VALUES} />
      </CustomModal>
    </Box>
  );
};

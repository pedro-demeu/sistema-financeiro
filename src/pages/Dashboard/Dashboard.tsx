import { Box } from "@mui/material";
import React from "react";
import { FinantialTransactionsTable, TopBar } from "../../components";

export const Dashboard: React.FC = () => {
  return (
    <Box>
      <TopBar />
      <FinantialTransactionsTable />
    </Box>
  );
};

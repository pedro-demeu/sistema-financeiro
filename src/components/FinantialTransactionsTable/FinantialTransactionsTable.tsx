import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Checkbox, Typography } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import {
  FinancialTransaction,
  FinancialTransactionType,
} from "../../atoms/finantial";
import { HeaderTable } from "..";

function createData(
  name: string,
  value: number,
  type: FinancialTransactionType,
  createdAt: Date,
  isDone: boolean
): FinancialTransaction {
  return { name, value, type, createdAt, isDone };
}

const rows = [
  createData("Aluguel", 850, "SPENDING", new Date(), true),
  createData("Condomínio", 75, "SPENDING", new Date(), false),
  createData("Internet", 70, "SPENDING", new Date(), true),
];

function BasicTable() {
  return (
    <Box>
      <TableContainer
        component={Paper}
        sx={{
          bgcolor: "#3A3844",
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell color="white">
                <Checkbox />
              </TableCell>
              <TableCell color="white">
                <Typography sx={{ color: "white" }}>Nome</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography sx={{ color: "white" }}>Valor</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography sx={{ color: "white" }}>Tipo</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography sx={{ color: "white" }}>Está pago?</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography sx={{ color: "white" }}>Criado em</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Checkbox />
                </TableCell>
                <TableCell component="th" scope="row">
                  <Typography sx={{ color: "white" }}>{row.name}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography sx={{ color: "white" }}>{row.value}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography sx={{ color: "white" }}>{row.type}</Typography>
                </TableCell>
                <TableCell align="right">
                  {row.isDone ? (
                    <CheckBoxIcon
                      sx={{
                        color: "#4affab",
                      }}
                    />
                  ) : (
                    <IndeterminateCheckBoxIcon
                      sx={{
                        color: "#994A5E",
                      }}
                    />
                  )}
                </TableCell>
                <TableCell align="right">
                  <Typography sx={{ color: "white" }}>
                    {row.createdAt.toDateString()}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
export function FinantialTransactionsTable() {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "80%",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box width="100%">
        <HeaderTable />
        {BasicTable()}
      </Box>
    </Box>
  );
}

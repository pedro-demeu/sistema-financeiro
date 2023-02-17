import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Checkbox, Typography } from "@mui/material";
import {
  FinancialTransaction,
  financialTransactionsAtom,
  FinancialTransactionType,
  finantialTransactionModalAtom,
} from "../../atoms/finantial";
import { EmptyState, HeaderTable } from "..";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

function createData(
  name: string,
  value: number,
  type: FinancialTransactionType,
  createdAt: Date,
  isDone: boolean
): FinancialTransaction {
  return { name, value, type, createdAt, isDone };
}

// const rows = [
//   createData("Aluguel", 850, "SPENDING", new Date(), true),
//   createData("Condomínio", 75, "SPENDING", new Date(), false),
//   createData("Internet", 70, "SPENDING", new Date(), true),
// ];

const columns = [
  {
    label: "Está pago?",
    dataKey: "isDone",
  },
  {
    label: "Apelido",
    dataKey: "name",
  },
  {
    label: "Tipo de despesa",
    dataKey: "type",
    renderValue: (e: FinancialTransactionType) =>
      e === "INCOME" ? "ENTRADA" : "SAÍDA",
  },
  {
    label: "Valor (R$)",
    dataKey: "value",
    renderValue: (e: number) =>
      Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(e),
  },
  {
    label: "Criado em",
    dataKey: "created_at",
  },
];

function renderFormatedDate(date: Date) {
  const dayToFormat = date.getDate().toString();
  const day = dayToFormat.length === 1 ? "0" + dayToFormat : dayToFormat;
  const monthToFormat = (date.getMonth() + 1).toString();
  const month =
    monthToFormat.length === 1 ? "0" + monthToFormat : monthToFormat;
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

function BasicTable(finantialList: FinancialTransaction[]) {
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
              {columns.map((column) => (
                <TableCell id={column.dataKey}>
                  <Typography color="white" align="left">
                    {column.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {finantialList.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left" component="th" scope="row">
                  <Checkbox checked={row.isDone} />
                </TableCell>
                <TableCell align="left" component="th" scope="row">
                  <Typography sx={{ color: "white" }}>{row.name}</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography sx={{ color: "white" }}>
                    {Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(row.value)}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography sx={{ color: "white" }}>
                    {row.type === "INCOME" ? "ENTRADA" : "SAÍDA"}
                  </Typography>
                </TableCell>

                <TableCell align="left">
                  <Typography sx={{ color: "white" }}>
                    {renderFormatedDate(row.createdAt)}
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
  const finantialList = useRecoilValue(financialTransactionsAtom);
  const [isModalOpen, setIsModalOpen] = useRecoilState(
    finantialTransactionModalAtom
  );
  const handleModalState = () => setIsModalOpen(!isModalOpen);

  if (finantialList.length === 0)
    return (
      <EmptyState
        title="Crie sua primeira finança"
        description="Não há finanças cadastradas, clique no ícone a baixo:"
        onClick={handleModalState}
      />
    );
  return (
    <Box
      sx={{
        width: "80%",
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box width="100%">
        <HeaderTable />
        {BasicTable(finantialList)}
      </Box>
    </Box>
  );
}

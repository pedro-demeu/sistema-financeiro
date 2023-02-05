import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "tipo", headerName: "Tipo", width: 130 },
  { field: "descricao", headerName: "Descricao", width: 330 },
  {
    field: "valor",
    headerName: "Valor",
    type: "number",
    width: 90,
  },
  {
    field: "datacriacao",
    headerName: "Data de criação",
    width: 160,
  },
  {
    field: "datavencimento",
    headerName: "Data de vencimento",
    width: 160,
  },
];

const rows = [
  {
    id: 1,
    tipo: "DESPESA",
    descricao: "Aluguel",
    valor: 900,
    datacriacao: new Date(),
    datavencimento: "11/02/2000",
  },
  {
    id: 2,
    tipo: "DESPESA",
    descricao: "Condominio",
    valor: 70,
    datacriacao: new Date(),
    datavencimento: "11/02/2000",
  },
  {
    id: 3,
    tipo: "ENTRADA",
    descricao: "SALARIO",
    valor: 4500,
    datacriacao: new Date(),
    datavencimento: "-",
  },
  {
    id: 4,
    tipo: "ENTRADA",
    descricao: "BONUS Q4",
    valor: 1000,
    datacriacao: new Date(),
    datavencimento: "-",
  },
  {
    id: 1,
    tipo: "DESPESA",
    descricao: "Aluguel",
    valor: 900,
    datacriacao: new Date(),
    datavencimento: "11/02/2000",
  },
  {
    id: 1,
    tipo: "DESPESA",
    descricao: "Aluguel",
    valor: 900,
    datacriacao: new Date(),
    datavencimento: "11/02/2000",
  },
  {
    id: 1,
    tipo: "DESPESA",
    descricao: "Aluguel",
    valor: 900,
    datacriacao: new Date(),
    datavencimento: "11/02/2000",
  },
  {
    id: 1,
    tipo: "DESPESA",
    descricao: "Aluguel",
    valor: 900,
    datacriacao: new Date(),
    datavencimento: "11/02/2000",
  },
  {
    id: 1,
    tipo: "DESPESA",
    descricao: "Aluguel",
    valor: 900,
    datacriacao: new Date(),
    datavencimento: "11/02/2000",
  },
];

export const TabelaDeFinancas = () => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
};

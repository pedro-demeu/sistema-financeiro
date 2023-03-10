import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Checkbox, Typography, useTheme } from '@mui/material';
import {
  deleteTransactionModalAtom,
  currentTransactionAtom,
  type Transaction,
  type FinancialType,
  editTransactionModalAtom
} from '../../atoms/transactions';
import DeleteIcon from '@mui/icons-material/Delete';
import { CustomModal } from '..';
import { useRecoilState } from 'recoil';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { useTranslation } from 'react-i18next';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { DeleteForm, TransactionForm } from '@/components/forms';
import { useTransaction } from '@/atoms/transactions';

interface ColumnObject {
  label: string
  dataKey?: string
  align?: 'left' | 'center' | 'right' | 'inherit' | 'justify' | undefined
  renderValue?: (e: number | FinancialType) => string
}

interface TransactionTableProps {
  transactions: Transaction[];
  onSubmit: (transaction: Transaction) => Promise<void>;
}

export const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  onSubmit,

}) => {
  const [openDeleteModal, setOpenDeleteModal] = useRecoilState(
    deleteTransactionModalAtom
  );
  const [editModal, setEditModal] = useRecoilState(editTransactionModalAtom);
  const { t } = useTranslation();
  const theme = useTheme();

  const columns: ColumnObject[] = [
    {
      label: 'columns:name',
      dataKey: 'name',
      align: 'left'
    },
    {
      label: 'columns:value',
      dataKey: 'value',
      renderValue: (e) =>
        Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(e as number),
      align: 'left'
    },
    {
      label: 'columns:type',
      dataKey: 'type',
      renderValue: (e) =>
        e as FinancialType === 'INCOME' ? t('_common:income') : t('spending'),
      align: 'left'
    },
    {
      label: 'columns:create_at',
      dataKey: 'created_at',
      align: 'left'
    },
    {
      label: 'columns:updated_at',
      dataKey: 'updated_at',
      align: 'left'
    },
    {
      label: 'columns:is_done',
      dataKey: 'isDone',
      align: 'left'
    },
    {
      label: '_common:actions',
      align: 'center'
    }
  ];

  const [finantialSelected, setFinantialSelected] = useRecoilState(currentTransactionAtom);

  const { editTransaction } = useTransaction();
  const handleDoneTransaction = (row: Transaction) => {
    setFinantialSelected(row);
    const newRow = {...row, isDone: !row.isDone};
    editTransaction(newRow);
  };
  return (
    <Box>
      <TableContainer
        component={Paper}
        sx={{
          bgcolor: theme.palette.info.main
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell id={column.dataKey} key={column.dataKey}>
                  <Typography color="white" align={column.align}>
                    {t(`${column.label}`)}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                tabIndex={-1}
                role="checkbox"
                hover
              >
                <TableCell align="left" component="th" scope="row">
                  <Typography sx={{ color: 'white', textDecoration: row.isDone ? 'line-through' : 'none' }}>{row.name}</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography sx={{ color: 'white', textDecoration: row.isDone ? 'line-through' : 'none' }}>
                    {Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(row?.value || 0)}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Box display="flex" alignItems="center" gap="1rem">
                    {row.type === 'SPENDING' ? <ArrowDownwardIcon sx={{ color: theme.palette.error.main }} /> : <ArrowUpwardIcon sx={{ color: theme.palette.success.main }} />}
                    <Typography sx={{ color: 'white', textDecoration: row.isDone ? 'line-through' : 'none' }}>
                      {row.type === 'INCOME' ? t('_common:income').toUpperCase() : t('_common:spending').toUpperCase()}
                    </Typography>
                  </Box>
                </TableCell>

                <TableCell align="left">
                  <Typography sx={{ color: 'white', textDecoration: row.isDone ? 'line-through' : 'none' }}>
                    {row.createdAt}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography sx={{ color: 'white', textDecoration: row.isDone ? 'line-through' : 'none' }}>
                    {row.updatedAt || row.createdAt}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ color: 'white', textDecoration: row.isDone ? 'line-through' : 'none' }}>{row.isDone ? t('_common:done') : t('_common:undone')}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => {
                      setFinantialSelected(row);
                      setEditModal(!editModal);
                    }}
                  >
                    <EditRoundedIcon fontSize="small" sx={{ color: 'white' }} />
                  </Button>
                  <Button
                    onClick={() => {
                      setFinantialSelected(row);
                      setOpenDeleteModal(!openDeleteModal);
                    }}
                  >
                    <DeleteIcon fontSize="small" sx={{ color: 'white' }} />
                  </Button>

                  <Checkbox onChange={() => handleDoneTransaction(row)} checked={row.isDone} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <CustomModal open={openDeleteModal} setOpen={setOpenDeleteModal}>
        <DeleteForm name={finantialSelected.name} id={finantialSelected.id} />
      </CustomModal>
      <CustomModal open={editModal} setOpen={setEditModal}>
        <TransactionForm
          key={finantialSelected.id ?? Math.random()}
          initialValues={finantialSelected}
          onSubmit={onSubmit}
        />
      </CustomModal>
    </Box>
  );
};


import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Checkbox, Typography } from '@mui/material';
import {
  DEFAULT_VALUES,
  deleteTransactionModalAtom,
  editTransactionModalAtom,
  type Finance,
  type FinancialTransactionType,
  finantialTransactionModalAtom,
  financialTransactionsAtom
} from '../../atoms/finantial';
import DeleteIcon from '@mui/icons-material/Delete';
import { CustomModal, EmptyState, HeaderTable } from '..';
import { useRecoilState, useRecoilValue } from 'recoil';
import { DeleteForm, FinantialForm } from '../forms';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { transformDate } from '../../utils/transformDate';
import { useTranslation } from 'react-i18next';
import * as uuid from 'uuid';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { UserLoggedAtom, UserType } from '../../atoms/login';

interface ColumnObject {
  label: string
  dataKey?: string
  align?: 'left' | 'center' | 'right' | 'inherit' | 'justify' | undefined
  renderValue?: (e: number | FinancialTransactionType) => string
}

interface BasicTableProps {
  finantialList: Finance[]
}

const BasicTable: React.FC<BasicTableProps> = ({
  finantialList
}) => {
  const [openDeleteModal, setOpenDeleteModal] = useRecoilState(
    deleteTransactionModalAtom
  );
  const [editModal, setEditModal] = useRecoilState(editTransactionModalAtom);
  const { t } = useTranslation();

  const columns: ColumnObject[] = [
    {
      label: 'columns:is_done',
      dataKey: 'isDone',
      align: 'left'
    },
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
        e as FinancialTransactionType === 'INCOME' ? t('_common:income') : t('spending'),
      align: 'left'
    },
    {
      label: 'columns:create_at',
      dataKey: 'created_at',
      align: 'left'
    },
    {
      label: '#',
      align: 'center'
    }
  ];

  const [finantialSelected, setFinantialSelected] =
    React.useState<Finance>(DEFAULT_VALUES);
  const [loggedUser, setLoggedUser] = useRecoilState(UserLoggedAtom)
  function handleSubmit(data: Finance): void {
    try {
      const transformedData = {
        ...data,
        createdAt: transformDate(new Date()),
        id: uuid.v4()
      };
      const oldFinances = JSON.parse(localStorage.getItem('finances') || '[]');

      const newFinances = [...oldFinances, transformedData];
      localStorage.setItem('finances', JSON.stringify(newFinances));


    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      alert(`error: ${error}`);
    }
  }

  function handleEdit(currentFinance: Finance): void {
    try {
      const users: UserType[] = JSON.parse(localStorage.getItem('users') || '[]');
      const oldFinances: Finance[] = loggedUser?.finances || []
      const financeChanges = oldFinances.map(finance => finance.id === currentFinance.id ? currentFinance : finance);

      if (loggedUser) {

        const currentUserIndex = users.findIndex(user => user.id === loggedUser.id);

        if (currentUserIndex !== -1) {
          const updatedUser: UserType = {
            ...loggedUser,
            finances: financeChanges
          };
          const updatedUsers = [...users];
          updatedUsers[currentUserIndex] = updatedUser;

          localStorage.setItem('users', JSON.stringify(updatedUsers));
          localStorage.setItem('currentUser', JSON.stringify(updatedUser));

          setLoggedUser(updatedUser);
        }
      }

    } catch (error: any) {
      alert(`Error: ${error}`);
    }
  }


  return (
    <Box>
      <TableContainer
        component={Paper}
        sx={{
          bgcolor: '#3A3844'
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
            {finantialList.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left" component="th" scope="row">
                  <Checkbox checked={row.isDone} />
                </TableCell>
                <TableCell align="left" component="th" scope="row">
                  <Typography sx={{ color: 'white' }}>{row.name}</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography sx={{ color: 'white' }}>
                    {Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(row.value)}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Box display="flex" alignItems="center" gap="1rem">
                    {row.type === 'SPENDING' ? <ArrowDownwardIcon sx={{ color:'#DE1F53'}} /> : <ArrowUpwardIcon sx={{ color: '#4affab'}} />}
                  <Typography sx={{ color: 'white' }}>
                    {row.type === 'INCOME' ? t('_common:income').toUpperCase() : t('_common:spending').toUpperCase()}
                  </Typography>
                  </Box>
                </TableCell>

                <TableCell align="left">
                  <Typography sx={{ color: 'white' }}>
                    {row.createdAt}
                  </Typography>
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
        <FinantialForm
          key={finantialSelected.id ?? Math.random()}
          initialValues={finantialSelected}
          onSubmit={(finantialSelected.id !== '') ? handleEdit : handleSubmit}
        />
      </CustomModal>
    </Box>
  );
};
export const FinantialTransactionsTable: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(
    finantialTransactionModalAtom
  );
  const isDeleteModalOpen = useRecoilValue(deleteTransactionModalAtom);
  const isEditModalOpen = useRecoilValue(editTransactionModalAtom);
  const [finantialList, setFinantialList] = useRecoilState(financialTransactionsAtom)
  const [loggedUser, setLoggedUser] = useRecoilState(UserLoggedAtom);

  const handleModalState = (): void => { setIsModalOpen(!isModalOpen); };



  React.useEffect(function updateListWhenChangeModalState(){
    if (loggedUser){
      setFinantialList(loggedUser.finances)
    }
  },[isModalOpen, isDeleteModalOpen, isEditModalOpen]
  );

  if (finantialList.length === 0) {
    return (
      <EmptyState
        mt="15rem"
        title="Crie sua primeira finança"
        description="Não há finanças cadastradas, clique no ícone a baixo:"
        onClick={handleModalState}
      />
    );
  }
  return (
    <Box
      sx={{
        width: '80%',
        maxWidth: '1200px',
        marginTop: '10rem'
      }}
    >
      <Box width="100%">
        <HeaderTable />
        <BasicTable finantialList={finantialList} />
      </Box>
    </Box>
  );
};

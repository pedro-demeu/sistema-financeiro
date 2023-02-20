import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Box, Button, Checkbox, Typography } from '@mui/material'
import {
  DEFAULT_VALUES,
  deleteTransactionModalAtom,
  editTransactionModalAtom,
  type FinancialTransaction,
  type FinancialTransactionType,
  finantialTransactionModalAtom
} from '../../atoms/finantial'
import DeleteIcon from '@mui/icons-material/Delete'
import { CustomModal, EmptyState, HeaderTable } from '..'
import { useRecoilState, useRecoilValue } from 'recoil'
import axios from 'axios'
import { DeleteForm, FinantialForm } from '../forms'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import { transformDate } from '../../utils/transformDate'

interface ColumnObject {
  label: string
  dataKey?: string
  align?: 'left' | 'center' | 'right' | 'inherit' | 'justify' | undefined
  renderValue?: (e: any) => string
}
const columns: ColumnObject[] = [
  {
    label: 'Está pago?',
    dataKey: 'isDone',
    align: 'left'
  },
  {
    label: 'Apelido',
    dataKey: 'name',
    align: 'left'
  },
  {
    label: 'Tipo de despesa',
    dataKey: 'type',
    renderValue: (e: FinancialTransactionType) =>
      e === 'INCOME' ? 'ENTRADA' : 'SAÍDA',
    align: 'left'
  },
  {
    label: 'Valor (R$)',
    dataKey: 'value',
    renderValue: (e: number) =>
      Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(e),
    align: 'left'
  },
  {
    label: 'Criado em',
    dataKey: 'created_at',
    align: 'left'
  },
  {
    label: '#',
    align: 'center'
  }
]

interface BasicTableProps {
  finantialList: FinancialTransaction[]
}

const BasicTable: React.FC<BasicTableProps> = ({
  finantialList
}) => {
  const [openDeleteModal, setOpenDeleteModal] = useRecoilState(
    deleteTransactionModalAtom
  )
  const [editModal, setEditModal] = useRecoilState(editTransactionModalAtom)

  const [finantialSelected, setFinantialSelected] =
    React.useState<FinancialTransaction>(DEFAULT_VALUES)

  async function handleSubmit (data: FinancialTransaction): Promise<void> {
    try {
      await axios.post('http://localhost:3000/items', {
        ...data,
        createdAt: transformDate(new Date())
      })
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      alert(`error: ${error}`)
    }
  }

  async function handleEdit (data: FinancialTransaction): Promise<void> {
    try {
      await axios.put(`http://localhost:3000/items/${data.id}`, data)
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      alert(`Erro na edição: ${error}`)
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
                    {column.label}
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
                  <Typography sx={{ color: 'white' }}>
                    {row.type === 'INCOME' ? 'ENTRADA' : 'SAÍDA'}
                  </Typography>
                </TableCell>

                <TableCell align="left">
                  <Typography sx={{ color: 'white' }}>
                    {row.createdAt}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => {
                      setFinantialSelected(row)
                      setEditModal(!editModal)
                    }}
                  >
                    <EditRoundedIcon fontSize="small" sx={{ color: 'white' }} />
                  </Button>
                  <Button
                    onClick={() => {
                      setFinantialSelected(row)
                      setOpenDeleteModal(!openDeleteModal)
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
          onSubmit={(finantialSelected.id !== 0) ? handleEdit : handleSubmit}
        />
      </CustomModal>
    </Box>
  )
}
export const FinantialTransactionsTable: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(
    finantialTransactionModalAtom
  )
  const isDeleteModalOpen = useRecoilValue(deleteTransactionModalAtom)
  const isEditModalOpen = useRecoilValue(editTransactionModalAtom)
  const [finantialList, setFinantialList] = React.useState([])

  const handleModalState = (): void => { setIsModalOpen(!isModalOpen) }

  const getData = async (): Promise<void> => {
    const { data } = await axios.get('http://localhost:3000/items')
    setFinantialList(data)
  }

  React.useEffect(
    function getList () {
      void getData()
    },
    [isModalOpen, isDeleteModalOpen, isEditModalOpen]
  )

  if (finantialList.length === 0) {
    return (
      <EmptyState
        mt="15rem"
        title="Crie sua primeira finança"
        description="Não há finanças cadastradas, clique no ícone a baixo:"
        onClick={handleModalState}
      />
    )
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
  )
}

import { atom, useRecoilState } from "recoil";
import { transformDate } from '../utils/transformDate';
import { UserLoggedAtom, UserType } from './login';
import * as uuid from 'uuid';

export type FinancialType = "INCOME" | "SPENDING";

export interface Transaction {
  name: string;
  value: number | undefined;
  type: FinancialType;
  createdAt: string;
  isDone: boolean;
  id: string;
}

export const DEFAULT_TRANSACTION_VALUE: Transaction = {
  name: "",
  value: undefined,
  type: "SPENDING",
  isDone: false,
  createdAt: "",
  id: '',
};

export const transactionsAtom = atom<Transaction[]>({
  key: "transactionsAtom",
  default: [],
});

export const transactionModalAtom = atom({
  key: "transactionModalAtom",
  default: false,
});

export const deleteTransactionModalAtom = atom({
  key: "deleteTransactionModalAtom",
  default: false,
});

export const editTransactionModalAtom = atom({
  key: "editTransactionModalAtom",
  default: false,
});

export const currentTransactionAtom = atom<Transaction>({
  key: "currentTransactionAtom",
  default: DEFAULT_TRANSACTION_VALUE,
});

export const useTransaction = () => {

  const listUsers: UserType[] = JSON.parse(localStorage.getItem('users') || '[]');
  const [loggedUser, setLoggedUser] = useRecoilState(UserLoggedAtom);

  function createTransaction(newTransaction: Transaction) {

    if (!loggedUser) throw new Error('Usuário não está logado!!');
    const currentUserIndex = listUsers.findIndex(user => user.id === loggedUser.id);

    if (!(currentUserIndex !== -1)) return;

    const transformedTransaction = {
      ...newTransaction,
      createdAt: transformDate(new Date()),
      id: uuid.v4()
    };
    const currentUser: UserType = {
      ...loggedUser,
      finances: [...loggedUser.finances, transformedTransaction]
    };
    const updatedUsers = [...listUsers];
    updatedUsers[currentUserIndex] = currentUser;

    setLoggedUser(currentUser);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }

  function editTransaction(transaction: Transaction) {
    const oldFinances: Transaction[] = loggedUser?.finances || []
    const financeChanges = oldFinances.map(finance => finance.id === transaction.id ? transaction : finance);

    if (!loggedUser) throw new Error('Usuário não está logado!!');
    const currentUserIndex = listUsers.findIndex(user => user.id === loggedUser.id);
    if (!(currentUserIndex !== -1)) return;

    const updatedUser: UserType = {
      ...loggedUser,
      finances: financeChanges
    };
    const updatedUsers = [...listUsers];
    updatedUsers[currentUserIndex] = updatedUser;

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    setLoggedUser(updatedUser);
  }

  function deleteTransaction(transactionID: string) {
    if (!loggedUser) throw new Error('Usuário não está logado!!');
    const currentUserIndex = listUsers.findIndex(user => user.id === loggedUser.id);
    if (!(currentUserIndex !== -1)) return;
    const updatedItems = loggedUser.finances.filter(item => item.id !== transactionID);
    const updatedUser: UserType = {
      ...loggedUser,
      finances: updatedItems
    };
    listUsers[currentUserIndex] = updatedUser;
    localStorage.setItem('users', JSON.stringify(listUsers));
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setLoggedUser({
      ...loggedUser,
      finances: updatedItems
    })

  }

  function markAsDone(transactionID: string) {
    // TODO
  }

  function markAllAsDone() {
    // TODO
  }

  return {
    createTransaction,
    editTransaction,
    deleteTransaction,
    markAsDone,
    markAllAsDone
  }
}
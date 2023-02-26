import { atom } from "recoil";

export type FinancialTransactionType = "INCOME" | "SPENDING";

export interface Finance {
  name: string;
  value: number;
  type: FinancialTransactionType;
  createdAt: string;
  isDone: boolean;
  id: string;
}

export const DEFAULT_VALUES: Finance = {
  name: "",
  value: 0,
  type: "SPENDING",
  isDone: false,
  createdAt: "",
  id: '',
};

export const financialTransactionsAtom = atom<Finance[]>({
  key: "financialTransactionsAtom",
  default: [],
});

export const finantialTransactionModalAtom = atom({
  key: "finantialTransactionModalAtom",
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

import { atom } from "recoil";

export type FinancialTransactionType = "INCOME" | "SPENDING";
export interface FinancialTransaction {
  name: string;
  value: number;
  type: FinancialTransactionType;
  createdAt: string;
  isDone: boolean;
  id?: number;
}

export const DEFAULT_VALUES: FinancialTransaction = {
  name: "",
  value: 0,
  type: "SPENDING",
  isDone: false,
  createdAt: "",
};

export const financialTransactionsAtom = atom<FinancialTransaction[]>({
  key: "financialTransactionsAtom",
  default: [],
});

export const finantialTransactionModalAtom = atom({
  key: "finantialTransactionModalAtom",
  default: false,
});

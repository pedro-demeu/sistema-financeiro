import { atom } from "recoil";

export type FinancialTransactionType = "INCOME" | "SPENDING";
export interface FinancialTransaction {
  name: string;
  value: number;
  type: FinancialTransactionType;
  createdAt: Date;
  isDone: boolean;
}
export const financialTransactionsAtom = atom<FinancialTransaction[]>({
  key: "financialTransactionsAtom",
  default: [],
});

export type FinanceType = 'INCOME' | 'SPENDING';
export type RepeatType = 'Monthly' | 'Weekly' | 'Yearly' | 'Never';

export interface IFinance {
  id?: number;
  userId: string;
  name: string;
  value: number;
  type: FinanceType | string;
  isPaid: boolean;
  expiresAt?: Date;
  repeat: boolean;
  repeatType: RepeatType | string;
  repeatUntil?: Date;
  createdAt: Date;
  updatedAt: Date;
}

import { ICategory } from './Category';

export type FinanceType = 'INCOME' | 'SPENDING';
export type RepeatType = 'Monthly' | 'Weekly' | 'Yearly' | 'Never';

export interface Finance {
  id: number;
  userId: string;
  name: string;
  value: number;
  type: FinanceType;
  isPaid: boolean;
  expiresAt?: Date;
  repeat: boolean;
  repeatType: RepeatType;
  tags: ICategory[];
  repeatUntil?: Date;
  createdAt: Date;
  updatedAt: Date;
}

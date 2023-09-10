import { FinanceType, IFinance, RepeatType } from '../../../models/Finance';

export interface CreateFinanceParams {
  userId: string;
  name: string;
  value: number;
  type: FinanceType;
  isPaid: boolean;
  expiresAt?: Date;
  repeat: boolean;
  repeatType: RepeatType;
  repeatUntil?: Date;
  createdAt: Date;
  updatedAt: Date;
  categories: number[];
}

export interface ICreateFinanceRepository {
  createFinance: (params: CreateFinanceParams) => Promise<IFinance>;
}

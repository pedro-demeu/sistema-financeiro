import { FinanceType, IFinance, RepeatType } from '../../../models/Finance';

export interface UpdateFinanceParams {
  name: string;
  value: number;
  type: FinanceType;
  isPaid: boolean;
  expiresAt?: Date;
  repeat: boolean;
  repeatType: RepeatType;
  repeatUntil?: Date;
}

export interface IUpdateFinanceRepository {
  updateFinance: (id: number, params: UpdateFinanceParams) => Promise<IFinance>;
}

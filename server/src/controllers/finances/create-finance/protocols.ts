import { FinanceType, IFinance, PaymentMethod } from '../../../models/Finance';

export interface CreateFinanceParams {
  userId: string;
  name: string;
  beneficiary: string;
  value: number;
  type: FinanceType;
  paymentMethod: PaymentMethod;
  paymentKey: string;
  isPaid: boolean;
  expiration: Date;
  expirationDay: number;
  createdAt: Date;
  updatedAt: Date;
  categories: number[];
}

export interface ICreateFinanceRepository {
  createFinance: (params: CreateFinanceParams) => Promise<IFinance>;
}

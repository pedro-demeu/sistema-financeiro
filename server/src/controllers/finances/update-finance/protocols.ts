import { FinanceType, IFinance, PaymentMethod } from '../../../models/Finance';

export interface UpdateFinanceParams {
  name: string;
  beneficiary: string;
  value: number;
  type: FinanceType;
  paymentMethod: PaymentMethod;
  paymentKey: string;
  expiration: Date;
  expirationDay: number;
  isPaid: boolean;
  repeat: boolean;
  categories?: number[];
}

export interface IUpdateFinanceRepository {
  updateFinance: (id: number, params: UpdateFinanceParams) => Promise<IFinance>;
}

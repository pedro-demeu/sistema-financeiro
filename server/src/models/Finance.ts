export type FinanceType =
  | 'SALARY'
  | 'BONUS'
  | 'SPENDING'
  | 'INVESTMENT'
  | 'OTHERS';

export type PaymentMethod =
  | 'CREDIT_CARD'
  | 'DEBIT_CARD'
  | 'MONEY'
  | 'PIX'
  | 'TRANSFER'
  | 'BANK_SLIP'
  | 'SPECIAL_CHECK'
  | 'OTHERS';

export interface IFinance {
  id?: number;
  name: string;
  beneficiary: string;
  value: number;
  type: FinanceType;
  paymentMethod: PaymentMethod;
  paymentKey: string;
  expiration: Date;
  expirationDay: number;
  isPaid: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

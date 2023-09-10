import { IFinance } from '../../../models/Finance';

export interface IDeleteFinancecRepository {
  deleteFinance(id: number): Promise<IFinance>;
}

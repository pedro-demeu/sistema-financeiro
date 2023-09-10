import { IFinance } from '../../../models/Finance';

export interface IGetFinanceRepository {
  getFinances: () => Promise<IFinance[]>;
}

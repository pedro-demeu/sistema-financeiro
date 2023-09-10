import { IGetFinanceRepository } from '../../../controllers/finances/get-finances/protocols';
import prismaClient from '../../../database/prismaClient';
import { IFinance } from '../../../models/Finance';

export class PostgresGetFinances implements IGetFinanceRepository {
  async getFinances(): Promise<IFinance[]> {
    const finances = await prismaClient.finance.findMany();
    return finances;
  }
}

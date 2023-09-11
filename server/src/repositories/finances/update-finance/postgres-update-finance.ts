import {
  IUpdateFinanceRepository,
  UpdateFinanceParams,
} from '../../../controllers/finances/update-finance/protocols';
import prismaClient from '../../../database/prismaClient';
import { IFinance } from '../../../models/Finance';

export class PostgresUpdateFinanceRepository
  implements IUpdateFinanceRepository
{
  async updateFinance(
    id: number,
    params: Omit<UpdateFinanceParams, 'categories'>,
  ): Promise<IFinance> {
    const updatedFinance = await prismaClient.finance.update({
      where: {
        id,
      },
      data: {
        ...params,
        updatedAt: new Date(),
      },
    });

    if (!updatedFinance) {
      throw new Error('category_not_updated');
    }

    return updatedFinance;
  }
}

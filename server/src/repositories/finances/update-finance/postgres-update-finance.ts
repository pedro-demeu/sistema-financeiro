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
    params: UpdateFinanceParams,
  ): Promise<IFinance> {
    const finance = await prismaClient.finance.findUnique({
      where: {
        id,
      },
    });

    if (finance?.name === params.name) {
      throw new Error('finance_already_exists');
    }

    if (!finance) {
      throw new Error('finance_not_found');
    }

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

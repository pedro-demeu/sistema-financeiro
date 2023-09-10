import prismaClient from '../../../database/prismaClient';
import { IDeleteFinancecRepository } from '../../../controllers/finances/delete-finance/protocols';
import { IFinance } from '../../../models/Finance';

export class PostgresDeleteFinanceRepository
  implements IDeleteFinancecRepository
{
  async deleteFinance(id: number): Promise<IFinance> {
    const finance = await prismaClient.finance.findUnique({
      where: {
        id,
      },
    });

    if (!finance) {
      throw new Error('finance_not_found');
    }

    await prismaClient.financeCategories.deleteMany({
      where: {
        financeId: id,
      },
    });

    const deletedFinance = await prismaClient.finance.delete({
      where: {
        id,
      },
    });

    if (!deletedFinance) {
      throw new Error('finance_not_deleted');
    }

    return {
      ...finance,
    };
  }
}

import { IGetFinanceRepository } from '../../../controllers/finances/get-finances/protocols';
import prismaClient from '../../../database/prismaClient';
import { IFinance } from '../../../models/Finance';

export class PostgresGetFinances implements IGetFinanceRepository {
  async getFinances(): Promise<IFinance[]> {
    const finances = await prismaClient.finance.findMany();
    const financesWithCategories = await Promise.all(
      finances.map(async (finance) => {
        const categories = await prismaClient.financeCategories.findMany({
          where: {
            financeId: finance.id,
          },
          select: {
            category: true,
          },
        });

        return {
          ...finance,
          categories: categories.map((category) => category.category),
        };
      }),
    );
    return financesWithCategories;
  }
}

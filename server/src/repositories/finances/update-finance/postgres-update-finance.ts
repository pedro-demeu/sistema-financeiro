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

    const { categories, ...rest } = params;

    if (!finance) {
      throw new Error('finance_not_found');
    }

    const updatedFinance = await prismaClient.finance.update({
      where: {
        id,
      },
      data: {
        ...rest,
        updatedAt: new Date(),
      },
    });

    if (categories?.length) {
      await prismaClient.financeCategories.deleteMany({
        where: {
          financeId: id,
        },
      });

      for (const categoryId of categories) {
        const categoryExists = await prismaClient.category.findUnique({
          where: {
            id: categoryId,
          },
        });

        if (!categoryExists) {
          throw new Error('category_not_found');
        }

        await prismaClient.financeCategories.create({
          data: {
            financeId: id,
            categoryId,
          },
        });
      }
    } else {
      await prismaClient.financeCategories.deleteMany({
        where: {
          financeId: id,
        },
      });
    }
    if (!updatedFinance) {
      throw new Error('category_not_updated');
    }

    return updatedFinance;
  }
}

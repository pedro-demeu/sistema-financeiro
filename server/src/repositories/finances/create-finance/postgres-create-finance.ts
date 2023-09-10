import {
  CreateFinanceParams,
  ICreateFinanceRepository,
} from '../../../controllers/finances/create-finance/protocols';
import prismaClient from '../../../database/prismaClient';
import { IFinance } from '../../../models/Finance';

export class PostgresCreateFinance implements ICreateFinanceRepository {
  async createFinance(data: CreateFinanceParams): Promise<IFinance> {
    const finance = await prismaClient.finance.create({
      data: {
        name: data.name,
        value: data.value,
        type: data.type,
        isPaid: data.isPaid,
        expiresAt: data.expiresAt || new Date(),
        repeat: data.repeat,
        repeatType: data.repeatType,
        repeatUntil: data.repeatUntil || '',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: data.userId,
      },
    });

    if (data.categories?.length) {
      for (const categoryId of data.categories) {
        await prismaClient.financeCategories.create({
          data: {
            financeId: finance.id,
            categoryId,
          },
        });
      }
    }

    const financeCreated = await prismaClient.finance.findUnique({
      where: {
        id: finance.id,
      },
    });

    if (!financeCreated) throw new Error('Finance not created');

    return financeCreated;
  }
}

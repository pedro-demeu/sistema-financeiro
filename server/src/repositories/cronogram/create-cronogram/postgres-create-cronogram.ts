import {
  CreateCronogramParams,
  ICreateCronogramRepository,
} from '../../../controllers/cronograms/create-cronogram/protocols';
import prismaClient from '../../../database/prismaClient';
import { ICronogram } from '../../../models/Cronogram';

export class PostgresCreateCronogram implements ICreateCronogramRepository {
  async createCronogram(data: CreateCronogramParams): Promise<ICronogram> {
    const cronogram = await prismaClient.cronogram.create({
      data: {
        financeId: data.financeId,
        repeat: data.repeat,
        dueDate: data.dueDate,
        type: data.type,
        status: data.status,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      },
    });

    const cronogramCreated = await prismaClient.cronogram.findUnique({
      where: {
        id: cronogram.id,
      },
    });

    if (!cronogramCreated) throw new Error('Cronogram not created');

    return cronogramCreated;
  }
}

import { IDeleteCronogramRepository } from '../../../controllers/cronograms/delete-cronogram/protocols';
import prismaClient from '../../../database/prismaClient';
import { ICronogram } from '../../../models/Cronogram';

export class PostgresDeleteCronogramRepository
  implements IDeleteCronogramRepository
{
  async deleteCronogram(id: number): Promise<ICronogram> {
    const cronogram = await prismaClient.cronogram.findUnique({
      where: {
        id,
      },
    });

    if (!cronogram) {
      throw new Error('finance_not_found');
    }

    const deletedCronogram = await prismaClient.cronogram.delete({
      where: {
        id,
      },
    });

    if (!deletedCronogram) {
      throw new Error('cronogram_not_deleted');
    }

    return {
      ...cronogram,
    };
  }
}

import {
  CronogramRepository,
  CronogramUpdateParams,
} from '../../../controllers/cronograms/update-cronogram/protocols';
import prismaClient from '../../../database/prismaClient';
import { ICronogram } from '../../../models/Cronogram';

export class PostgresUpdateCronogramRepository implements CronogramRepository {
  async updateCronogram(
    id: number,
    params: CronogramUpdateParams,
  ): Promise<ICronogram> {
    const updatedCronogram = await prismaClient.cronogram.update({
      where: {
        id,
      },
      data: {
        ...params,
        updatedAt: new Date(),
      },
    });

    if (!updatedCronogram) {
      throw new Error('cronogram_not_updated');
    }

    return updatedCronogram;
  }
}

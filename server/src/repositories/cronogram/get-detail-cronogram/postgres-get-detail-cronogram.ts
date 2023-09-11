import { IGetCronogramsRepository } from '../../../controllers/cronograms/get-cronograms/protocols';
import { IGetDetailCronogramRepository } from '../../../controllers/cronograms/get-detail-cronogram/protocols';
import prismaClient from '../../../database/prismaClient';
import { ICronogram } from '../../../models/Cronogram';

export class PostgresGetDetailCronogram
  implements IGetDetailCronogramRepository
{
  async getCronogram(id: number): Promise<ICronogram> {
    const cronogram = await prismaClient.cronogram.findUnique({
      where: {
        id,
      },
    });

    if (!cronogram) throw new Error('failed_to_get_cronogram');

    return cronogram;
  }
}

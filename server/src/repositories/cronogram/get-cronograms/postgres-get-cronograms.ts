import { IGetCronogramsRepository } from '../../../controllers/cronograms/get-cronograms/protocols';
import prismaClient from '../../../database/prismaClient';
import { ICronogram } from '../../../models/Cronogram';

export class PostgresGetCronograms implements IGetCronogramsRepository {
  async getAllCronograms(): Promise<ICronogram[]> {
    const cronogram = await prismaClient.cronogram.findMany();
    return cronogram;
  }
}

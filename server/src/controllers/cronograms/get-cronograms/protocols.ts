import { ICronogram } from '../../../models/Cronogram';

export interface IGetCronogramsRepository {
  getAllCronograms(): Promise<ICronogram[]>;
}

import { ICronogram } from '../../../models/Cronogram';

export interface IDeleteCronogramRepository {
  deleteCronogram(id: number): Promise<ICronogram>;
}

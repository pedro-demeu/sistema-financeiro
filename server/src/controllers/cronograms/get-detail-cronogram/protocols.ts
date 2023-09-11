import { ICronogram } from '../../../models/Cronogram';

export interface IGetDetailCronogramRepository {
  getCronogram(id: number): Promise<ICronogram>;
}

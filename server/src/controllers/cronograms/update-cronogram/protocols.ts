import { ICronogram } from '../../../models/Cronogram';

export interface CronogramUpdateParams {
  repeat: boolean;
  status: boolean;
  dueDate: Date;
  type: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
  updatedAt: Date;
}
export interface CronogramRepository {
  updateCronogram(
    id: number,
    params: CronogramUpdateParams,
  ): Promise<ICronogram>;
}

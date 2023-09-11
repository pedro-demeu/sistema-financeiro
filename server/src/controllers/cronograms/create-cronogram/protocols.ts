import { ICronogram } from '../../../models/Cronogram';

export interface CreateCronogramParams {
  financeId: number;
  repeat: boolean;
  status: boolean;
  dueDate: Date;
  type: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
  createdAt: Date;
  updatedAt: Date;
}
export interface ICreateCronogramRepository {
  createCronogram(params: CreateCronogramParams): Promise<ICronogram>;
}

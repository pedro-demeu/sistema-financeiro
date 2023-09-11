export interface ICronogram {
  id?: number;

  financeId: number;
  repeat: boolean;
  status: boolean;
  dueDate: Date;
  type: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
  createdAt: Date;
  updatedAt: Date;
}

import { ICategory } from '../../models/Category';

export interface CreateCategoryParams {
  name: string;
}
export interface ICreateCategoryRepository {
  createCategory: (params: CreateCategoryParams) => Promise<ICategory>;
}

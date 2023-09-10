import { ICategory } from '../../../models/Category';

export interface UpdateCategoryParams {
  name: string;
}

export interface IUpdateCategoryRepository {
  updateCategory: (
    id: number,
    params: UpdateCategoryParams,
  ) => Promise<ICategory>;
}

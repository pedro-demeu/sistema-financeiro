import { ICategory } from '../../../models/Category';

export interface IDeleteCategoryRepository {
  deleteCategory(id: number): Promise<ICategory>;
}

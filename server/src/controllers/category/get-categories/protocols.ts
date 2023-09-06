import { ICategory } from '../../models/Category';

export interface IGetCategoriesRepository {
  getCategories: () => Promise<ICategory[]>;
}

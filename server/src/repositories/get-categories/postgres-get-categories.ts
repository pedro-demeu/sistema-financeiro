import { IGetCategoriesRepository } from '../../controllers/get-categories/protocols';
import prismaClient from '../../database/prismaClient';
import { ICategory } from '../../models/Category';

export class PostgresGetCategories implements IGetCategoriesRepository {
  async getCategories(): Promise<ICategory[]> {
    const categories = await prismaClient.category.findMany();
    return categories;
  }
}

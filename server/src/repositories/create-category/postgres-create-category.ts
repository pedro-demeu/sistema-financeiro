import {
  CreateCategoryParams,
  ICreateCategoryRepository,
} from '../../controllers/category/create-category/protocols';
import prismaClient from '../../database/prismaClient';
import { ICategory } from '../../models/Category';

export class PostgresCreateCategory implements ICreateCategoryRepository {
  async createCategory(params: CreateCategoryParams): Promise<ICategory> {
    const category = await prismaClient.category.create({
      data: {
        name: params.name,
      },
    });

    const categoryCreated = await prismaClient.category.findUnique({
      where: {
        id: category.id,
      },
    });

    if (!categoryCreated) throw new Error('Category not created');

    return categoryCreated;
  }
}

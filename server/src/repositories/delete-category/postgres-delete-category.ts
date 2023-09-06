import { ICategory } from '../../models/Category';
import prismaClient from '../../database/prismaClient';
import { IDeleteCategoryRepository } from '../../controllers/delete-category/protocols';

export class PostgresDeleteCategoryRepository
  implements IDeleteCategoryRepository
{
  async deleteCategory(id: number): Promise<ICategory> {
    const category = await prismaClient.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      throw new Error('category_not_found');
    }

    const deletedCategory = await prismaClient.category.delete({
      where: {
        id,
      },
    });

    if (!deletedCategory) {
      throw new Error('category_not_deleted');
    }

    return {
      id,
      name: category.name,
      createdAt: category.createdAt,
    };
  }
}

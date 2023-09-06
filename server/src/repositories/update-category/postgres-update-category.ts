import {
  IUpdateCategoryRepository,
  UpdateCategoryParams,
} from '../../controllers/category/update-category/protocols';
import prismaClient from '../../database/prismaClient';
import { ICategory } from '../../models/Category';

export class PostgresUpdateCategoryRepository
  implements IUpdateCategoryRepository
{
  async updateCategory(
    id: number,
    params: UpdateCategoryParams,
  ): Promise<ICategory> {
    const category = await prismaClient.category.findUnique({
      where: {
        id,
      },
    });

    if (category?.name === params.name) {
      throw new Error('category_already_exists');
    }

    if (!category) {
      throw new Error('category_not_found');
    }

    const updatedCategory = await prismaClient.category.update({
      where: {
        id,
      },
      data: {
        name: params.name,
      },
    });

    if (!updatedCategory) {
      throw new Error('category_not_updated');
    }

    return {
      id: updatedCategory.id,
      name: updatedCategory.name,
      createdAt: updatedCategory.createdAt,
    };
  }
}

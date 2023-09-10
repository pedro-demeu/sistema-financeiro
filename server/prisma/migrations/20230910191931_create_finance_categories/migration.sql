/*
  Warnings:

  - You are about to drop the column `tags` on the `finances` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "finances" DROP COLUMN "tags";

-- CreateTable
CREATE TABLE "finance_categories" (
    "id" SERIAL NOT NULL,
    "financeId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "finance_categories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "finance_categories" ADD CONSTRAINT "finance_categories_financeId_fkey" FOREIGN KEY ("financeId") REFERENCES "finances"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "finance_categories" ADD CONSTRAINT "finance_categories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `expiresAt` on the `finances` table. All the data in the column will be lost.
  - You are about to drop the column `repeat` on the `finances` table. All the data in the column will be lost.
  - You are about to drop the column `repeatType` on the `finances` table. All the data in the column will be lost.
  - You are about to drop the column `repeatUntil` on the `finances` table. All the data in the column will be lost.
  - Added the required column `expiration` to the `finances` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expirationDay` to the `finances` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `finances` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "RepeatType" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY');

-- CreateEnum
CREATE TYPE "FinanceType" AS ENUM ('INCOME', 'SPENDING', 'INVESTMENT', 'RESERVE', 'OTHERS');

-- AlterTable
ALTER TABLE "finances" DROP COLUMN "expiresAt",
DROP COLUMN "repeat",
DROP COLUMN "repeatType",
DROP COLUMN "repeatUntil",
ADD COLUMN     "expiration" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "expirationDay" INTEGER NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "FinanceType" NOT NULL;

-- CreateTable
CREATE TABLE "cronograms" (
    "id" SERIAL NOT NULL,
    "financeId" INTEGER NOT NULL,
    "repeat" BOOLEAN NOT NULL,
    "status" BOOLEAN NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "type" "RepeatType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cronograms_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cronograms" ADD CONSTRAINT "cronograms_financeId_fkey" FOREIGN KEY ("financeId") REFERENCES "finances"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

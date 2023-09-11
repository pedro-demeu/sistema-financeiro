/*
  Warnings:

  - The values [INCOME,RESERVE] on the enum `FinanceType` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `benefeiciary` to the `finances` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentKey` to the `finances` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethod` to the `finances` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentMethodType" AS ENUM ('CREDIT_CARD', 'DEBIT_CARD', 'MONEY', 'PIX', 'TRANSFER', 'BANK_SLIP', 'SPECIAL_CHECK', 'OTHERS');

-- AlterEnum
BEGIN;
CREATE TYPE "FinanceType_new" AS ENUM ('SALARY', 'BONUS', 'SPENDING', 'INVESTMENT', 'OTHERS');
ALTER TABLE "finances" ALTER COLUMN "type" TYPE "FinanceType_new" USING ("type"::text::"FinanceType_new");
ALTER TYPE "FinanceType" RENAME TO "FinanceType_old";
ALTER TYPE "FinanceType_new" RENAME TO "FinanceType";
DROP TYPE "FinanceType_old";
COMMIT;

-- AlterTable
ALTER TABLE "finances" ADD COLUMN     "benefeiciary" TEXT NOT NULL,
ADD COLUMN     "paymentKey" TEXT NOT NULL,
ADD COLUMN     "paymentMethod" "PaymentMethodType" NOT NULL;

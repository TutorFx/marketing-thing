/*
  Warnings:

  - You are about to drop the column `dailyBudgetId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_dailyBudgetId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "dailyBudgetId";

-- CreateTable
CREATE TABLE "_userBudget" (
    "A" TIMESTAMP(3) NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_userBudget_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_userBudget_B_index" ON "_userBudget"("B");

-- AddForeignKey
ALTER TABLE "_userBudget" ADD CONSTRAINT "_userBudget_A_fkey" FOREIGN KEY ("A") REFERENCES "DailyBudget"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_userBudget" ADD CONSTRAINT "_userBudget_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

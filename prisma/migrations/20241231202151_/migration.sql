-- AlterTable
ALTER TABLE "User" ADD COLUMN     "dailyBudgetId" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Connection" (
    "ip" TEXT NOT NULL,

    CONSTRAINT "Connection_pkey" PRIMARY KEY ("ip")
);

-- CreateTable
CREATE TABLE "DailyBudget" (
    "id" TIMESTAMP(3) NOT NULL,
    "dailyPoints" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "DailyBudget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_userConnection" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_userConnection_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_userConnection_B_index" ON "_userConnection"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_dailyBudgetId_fkey" FOREIGN KEY ("dailyBudgetId") REFERENCES "DailyBudget"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_userConnection" ADD CONSTRAINT "_userConnection_A_fkey" FOREIGN KEY ("A") REFERENCES "Connection"("ip") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_userConnection" ADD CONSTRAINT "_userConnection_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

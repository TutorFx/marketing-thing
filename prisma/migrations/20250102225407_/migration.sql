-- CreateTable
CREATE TABLE "_guestBudget" (
    "A" TIMESTAMP(3) NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_guestBudget_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_guestBudget_B_index" ON "_guestBudget"("B");

-- AddForeignKey
ALTER TABLE "_guestBudget" ADD CONSTRAINT "_guestBudget_A_fkey" FOREIGN KEY ("A") REFERENCES "DailyBudget"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_guestBudget" ADD CONSTRAINT "_guestBudget_B_fkey" FOREIGN KEY ("B") REFERENCES "Guest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

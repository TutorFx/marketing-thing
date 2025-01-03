-- CreateTable
CREATE TABLE "Guest" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Guest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_guestConnection" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_guestConnection_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_guestConnection_B_index" ON "_guestConnection"("B");

-- AddForeignKey
ALTER TABLE "_guestConnection" ADD CONSTRAINT "_guestConnection_A_fkey" FOREIGN KEY ("A") REFERENCES "Connection"("ip") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_guestConnection" ADD CONSTRAINT "_guestConnection_B_fkey" FOREIGN KEY ("B") REFERENCES "Guest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

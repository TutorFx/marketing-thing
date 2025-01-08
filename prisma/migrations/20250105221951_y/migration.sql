-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('PRO', 'HOBBY');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "picture" TEXT,
    "password" TEXT,
    "firstname" TEXT,
    "lastname" TEXT,
    "role" "Role" DEFAULT 'USER',
    "plan" "Plan" NOT NULL DEFAULT 'HOBBY',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guest" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Guest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Connection" (
    "ip" TEXT NOT NULL,

    CONSTRAINT "Connection_pkey" PRIMARY KEY ("ip")
);

-- CreateTable
CREATE TABLE "DailyBudget" (
    "internalId" TEXT NOT NULL,
    "id" TIMESTAMP(3) NOT NULL,
    "candidatesTokenCount" INTEGER NOT NULL DEFAULT 0,
    "promptTokenCount" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT,
    "guestId" TEXT,

    CONSTRAINT "DailyBudget_pkey" PRIMARY KEY ("internalId")
);

-- CreateTable
CREATE TABLE "_userConnection" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_userConnection_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_guestConnection" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_guestConnection_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "DailyBudget_id_userId_key" ON "DailyBudget"("id", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "DailyBudget_id_guestId_key" ON "DailyBudget"("id", "guestId");

-- CreateIndex
CREATE INDEX "_userConnection_B_index" ON "_userConnection"("B");

-- CreateIndex
CREATE INDEX "_guestConnection_B_index" ON "_guestConnection"("B");

-- AddForeignKey
ALTER TABLE "DailyBudget" ADD CONSTRAINT "DailyBudget_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyBudget" ADD CONSTRAINT "DailyBudget_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "Guest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_userConnection" ADD CONSTRAINT "_userConnection_A_fkey" FOREIGN KEY ("A") REFERENCES "Connection"("ip") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_userConnection" ADD CONSTRAINT "_userConnection_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_guestConnection" ADD CONSTRAINT "_guestConnection_A_fkey" FOREIGN KEY ("A") REFERENCES "Connection"("ip") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_guestConnection" ADD CONSTRAINT "_guestConnection_B_fkey" FOREIGN KEY ("B") REFERENCES "Guest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

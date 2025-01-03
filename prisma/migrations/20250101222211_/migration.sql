-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('PRO', 'HOBBY');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "plan" "Plan" NOT NULL DEFAULT 'HOBBY';

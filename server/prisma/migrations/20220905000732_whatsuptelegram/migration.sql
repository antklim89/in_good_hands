-- AlterTable
ALTER TABLE "User" ADD COLUMN     "telegram" TEXT DEFAULT '',
ADD COLUMN     "whatsup" TEXT DEFAULT '',
ALTER COLUMN "tel" SET DEFAULT '';

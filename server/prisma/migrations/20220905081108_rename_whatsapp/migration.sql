/*
  Warnings:

  - You are about to drop the column `whatsup` on the `Ad` table. All the data in the column will be lost.
  - You are about to drop the column `whatsup` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ad" DROP COLUMN "whatsup",
ADD COLUMN     "whatsapp" TEXT DEFAULT '';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "whatsup",
ADD COLUMN     "whatsapp" TEXT DEFAULT '';

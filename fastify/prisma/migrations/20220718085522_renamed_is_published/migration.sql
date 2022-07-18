/*
  Warnings:

  - You are about to drop the column `published` on the `Ad` table. All the data in the column will be lost.
  - Added the required column `isPublished` to the `Ad` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ad" DROP COLUMN "published",
ADD COLUMN     "isPublished" BOOLEAN NOT NULL;

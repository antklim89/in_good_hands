/*
  Warnings:

  - Changed the type of `type` on the `Ad` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "AnimalType" AS ENUM ('cat', 'dog', 'bird', 'aquarium', 'rodent');

-- AlterTable
ALTER TABLE "Ad" DROP COLUMN "type",
ADD COLUMN     "type" "AnimalType" NOT NULL;

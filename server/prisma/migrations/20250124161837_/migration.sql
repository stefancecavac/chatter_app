/*
  Warnings:

  - You are about to drop the column `friendCode` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_friendCode_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "friendCode";

/*
  Warnings:

  - A unique constraint covering the columns `[friendCode]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "friendCode" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "isPrivate" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "User_friendCode_key" ON "User"("friendCode");

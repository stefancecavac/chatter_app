/*
  Warnings:

  - You are about to alter the column `content` on the `Message` table. The data in that column could be lost. The data in that column will be cast from `VarChar(300)` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "isRead" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "content" SET DATA TYPE VARCHAR(255);

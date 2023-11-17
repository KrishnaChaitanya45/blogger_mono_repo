/*
  Warnings:

  - You are about to drop the column `tokens` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "tokens",
ADD COLUMN     "token" TEXT;

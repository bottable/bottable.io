/*
  Warnings:

  - Added the required column `name` to the `Selector` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Selector` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SelectorType" AS ENUM ('STRING', 'NUMBER');

-- AlterTable
ALTER TABLE "Selector" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "type" "SelectorType" NOT NULL;

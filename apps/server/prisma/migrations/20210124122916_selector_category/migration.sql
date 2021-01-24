/*
  Warnings:

  - Added the required column `category` to the `Selector` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SelectorCategoryType" AS ENUM ('PRICE', 'NAME', 'DESCRIPTION', 'IMAGE', 'OTHER');

-- AlterTable
ALTER TABLE "AlertTrigger" ALTER COLUMN "type" SET DEFAULT E'CHANGE';

-- AlterTable
ALTER TABLE "Memberships" ALTER COLUMN "role" SET DEFAULT E'MEMBER';

-- AlterTable
ALTER TABLE "Selector" ADD COLUMN     "category" "SelectorCategoryType" NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "confirmed" SET DEFAULT false;

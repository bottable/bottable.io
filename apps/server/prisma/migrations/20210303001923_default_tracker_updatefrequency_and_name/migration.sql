-- AlterTable
ALTER TABLE "Tracker" ALTER COLUMN "name" SET DEFAULT E'New Tracker',
ALTER COLUMN "updateFrequency" SET DEFAULT E'0 5 29 2 *',
ALTER COLUMN "updateFrequency" SET DATA TYPE TEXT;

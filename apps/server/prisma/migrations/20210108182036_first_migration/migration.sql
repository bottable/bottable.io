-- CreateEnum
CREATE TYPE "AlertTriggerTypes" AS ENUM ('CHANGE', 'INCREASE', 'DECREASE', 'GREATER_THAN', 'LESS_THAN', 'CONTAIN');

-- CreateEnum
CREATE TYPE "NotificationMethods" AS ENUM ('EMAIL', 'SMS');

-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('ADMIN', 'MEMBER');

-- CreateTable
CREATE TABLE "User" (
"id" SERIAL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "confirmed" BOOLEAN NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tracker" (
"id" SERIAL,
    "userId" INTEGER,
    "notificationMethods" "NotificationMethods"[],
    "description" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "notifyAnyway" BOOLEAN NOT NULL DEFAULT false,
    "pinned" BOOLEAN NOT NULL DEFAULT false,
    "updateFrequency" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "teamId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Selector" (
"id" SERIAL,
    "location" TEXT NOT NULL,
    "trackerId" INTEGER NOT NULL,
    "alertTriggerId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Value" (
"id" SERIAL,
    "selectorId" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "value" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlertTrigger" (
"id" SERIAL,
    "type" "AlertTriggerTypes" NOT NULL,
    "payload" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
"id" SERIAL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "trackerId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Memberships" (
"id" SERIAL,
    "userId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "role" "RoleType" NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
"id" SERIAL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Tracker" ADD FOREIGN KEY("userId")REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tracker" ADD FOREIGN KEY("teamId")REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Selector" ADD FOREIGN KEY("trackerId")REFERENCES "Tracker"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Selector" ADD FOREIGN KEY("alertTriggerId")REFERENCES "AlertTrigger"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Value" ADD FOREIGN KEY("selectorId")REFERENCES "Selector"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD FOREIGN KEY("trackerId")REFERENCES "Tracker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Memberships" ADD FOREIGN KEY("userId")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Memberships" ADD FOREIGN KEY("teamId")REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

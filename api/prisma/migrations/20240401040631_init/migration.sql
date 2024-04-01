/*
  Warnings:

  - You are about to alter the column `covid19` on the `Participant` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Boolean`.
  - You are about to alter the column `diabetes` on the `Participant` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Boolean`.
  - Made the column `covid19` on table `Participant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `diabetes` on table `Participant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `height` on table `Participant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Participant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `trialId` on table `Participant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `weight` on table `Participant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Trial` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Participant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "height" REAL NOT NULL,
    "weight" REAL NOT NULL,
    "diabetes" BOOLEAN NOT NULL,
    "covid19" BOOLEAN NOT NULL,
    "trialId" TEXT NOT NULL,
    CONSTRAINT "Participant_trialId_fkey" FOREIGN KEY ("trialId") REFERENCES "Trial" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Participant" ("covid19", "diabetes", "height", "id", "name", "trialId", "weight") SELECT "covid19", "diabetes", "height", "id", "name", "trialId", "weight" FROM "Participant";
DROP TABLE "Participant";
ALTER TABLE "new_Participant" RENAME TO "Participant";
CREATE TABLE "new_Trial" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL
);
INSERT INTO "new_Trial" ("description", "id") SELECT "description", "id" FROM "Trial";
DROP TABLE "Trial";
ALTER TABLE "new_Trial" RENAME TO "Trial";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

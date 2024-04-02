/*
  Warnings:

  - Made the column `covid19` on table `Participant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `diabetes` on table `Participant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `height` on table `Participant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Participant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `trialId` on table `Participant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `uid` on table `Participant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `weight` on table `Participant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `id` on table `Trial` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Participant" (
    "uid" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "height" REAL NOT NULL,
    "weight" REAL NOT NULL,
    "diabetes" BOOLEAN NOT NULL,
    "covid19" BOOLEAN NOT NULL,
    "trialId" INTEGER NOT NULL,
    CONSTRAINT "Participant_trialId_fkey" FOREIGN KEY ("trialId") REFERENCES "Trial" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Participant" ("covid19", "diabetes", "height", "name", "trialId", "uid", "weight") SELECT "covid19", "diabetes", "height", "name", "trialId", "uid", "weight" FROM "Participant";
DROP TABLE "Participant";
ALTER TABLE "new_Participant" RENAME TO "Participant";
CREATE TABLE "new_Trial" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Trial" ("id", "name") SELECT "id", "name" FROM "Trial";
DROP TABLE "Trial";
ALTER TABLE "new_Trial" RENAME TO "Trial";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

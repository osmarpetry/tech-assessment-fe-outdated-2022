/*
  Warnings:

  - The primary key for the `Participant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `uid` on the `Participant` table. All the data in the column will be lost.
  - Added the required column `id` to the `Participant` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Participant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "height" REAL NOT NULL,
    "weight" REAL NOT NULL,
    "diabetes" BOOLEAN NOT NULL,
    "covid19" BOOLEAN NOT NULL,
    "trialId" INTEGER NOT NULL,
    CONSTRAINT "Participant_trialId_fkey" FOREIGN KEY ("trialId") REFERENCES "Trial" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Participant" ("covid19", "diabetes", "height", "name", "trialId", "weight") SELECT "covid19", "diabetes", "height", "name", "trialId", "weight" FROM "Participant";
DROP TABLE "Participant";
ALTER TABLE "new_Participant" RENAME TO "Participant";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateTable
CREATE TABLE "Trial" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT
);

CREATE TABLE "Participant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "height" REAL,
    "weight" REAL,
    "diabetes" INTEGER,
    "covid19" INTEGER,
    "trialId" TEXT,
    FOREIGN KEY ("trialId") REFERENCES "Trial"("id")
);

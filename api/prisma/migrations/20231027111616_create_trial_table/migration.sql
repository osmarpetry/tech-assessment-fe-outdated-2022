-- CreateTable
CREATE TABLE "Trial" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL
);

CREATE TABLE "Participant" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT,
    "height" REAL,
    "weight" REAL,
    "diabetes" BOOLEAN,
    "covid19" BOOLEAN,
    "trialId" INTEGER REFERENCES "Trial"("id")
);

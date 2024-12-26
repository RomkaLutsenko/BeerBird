/*
  Warnings:

  - You are about to alter the column `nowScore` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - You are about to alter the column `totalScore` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "telegramId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userName" TEXT,
    "totalScore" BIGINT NOT NULL DEFAULT 0,
    "nowScore" BIGINT NOT NULL DEFAULT 0,
    "clickBoost" INTEGER NOT NULL DEFAULT 1,
    "timeBoost" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_User" ("clickBoost", "nowScore", "telegramId", "timeBoost", "totalScore", "userName") SELECT "clickBoost", "nowScore", "telegramId", "timeBoost", "totalScore", "userName" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

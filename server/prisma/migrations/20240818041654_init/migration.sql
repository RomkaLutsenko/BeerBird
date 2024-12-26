/*
  Warnings:

  - You are about to alter the column `nowScore` on the `User` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `totalScore` on the `User` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "telegramId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userName" TEXT,
    "totalScore" INTEGER NOT NULL DEFAULT 0,
    "nowScore" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_User" ("nowScore", "telegramId", "totalScore", "userName") SELECT "nowScore", "telegramId", "totalScore", "userName" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

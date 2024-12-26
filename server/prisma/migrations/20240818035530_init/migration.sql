-- CreateTable
CREATE TABLE "User" (
    "telegramId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userName" TEXT,
    "totalScore" BIGINT NOT NULL DEFAULT 0,
    "nowScore" BIGINT NOT NULL DEFAULT 0
);

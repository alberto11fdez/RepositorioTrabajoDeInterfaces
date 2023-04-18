-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Purchase" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "amount" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Purchase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Purchase" ("amount", "id", "userId") SELECT "amount", "id", "userId" FROM "Purchase";
DROP TABLE "Purchase";
ALTER TABLE "new_Purchase" RENAME TO "Purchase";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

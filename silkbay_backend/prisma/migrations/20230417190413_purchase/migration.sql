-- CreateTable
CREATE TABLE "Purchase" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "amount" REAL NOT NULL,
    CONSTRAINT "Purchase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ProductToPurchase" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ProductToPurchase_A_fkey" FOREIGN KEY ("A") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProductToPurchase_B_fkey" FOREIGN KEY ("B") REFERENCES "Purchase" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToPurchase_AB_unique" ON "_ProductToPurchase"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToPurchase_B_index" ON "_ProductToPurchase"("B");

/*
  Warnings:

  - You are about to drop the `_ProductToPurchase` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ProductToPurchase";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "PurchaseItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "count" INTEGER NOT NULL,
    "purchaseId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    CONSTRAINT "PurchaseItem_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PurchaseItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

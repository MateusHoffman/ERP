/*
  Warnings:

  - You are about to drop the `customers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `suppliers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `quantity` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `sku` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `sales` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `sales` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `sales` table. All the data in the column will be lost.
  - You are about to drop the column `totalPrice` on the `sales` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `sales` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "customers_email_key";

-- DropIndex
DROP INDEX "suppliers_email_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "customers";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "suppliers";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "stock" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "minStock" INTEGER NOT NULL DEFAULT 5,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "stock_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "sale_items" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "saleId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    CONSTRAINT "sale_items_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "sales" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "sale_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" REAL NOT NULL,
    "barcode" TEXT,
    "categoryId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_products" ("createdAt", "id", "name", "price", "updatedAt") SELECT "createdAt", "id", "name", "price", "updatedAt" FROM "products";
DROP TABLE "products";
ALTER TABLE "new_products" RENAME TO "products";
CREATE UNIQUE INDEX "products_barcode_key" ON "products"("barcode");
CREATE TABLE "new_sales" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "total" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_sales" ("createdAt", "id") SELECT "createdAt", "id" FROM "sales";
DROP TABLE "sales";
ALTER TABLE "new_sales" RENAME TO "sales";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "stock_productId_key" ON "stock"("productId");

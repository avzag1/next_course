/*
  Warnings:

  - You are about to drop the column `rating` on the `Ingredient` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "rating";

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "rating" INTEGER NOT NULL DEFAULT 0;

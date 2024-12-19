-- AlterTable
ALTER TABLE "Chief" ALTER COLUMN "bio" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Ingredient" ADD COLUMN     "rating" INTEGER NOT NULL DEFAULT 0;

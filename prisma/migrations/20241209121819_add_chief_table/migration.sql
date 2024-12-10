-- CreateTable
CREATE TABLE "Chief" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT NOT NULL,

    CONSTRAINT "Chief_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeChief" (
    "recipeId" INTEGER NOT NULL,
    "chiefId" INTEGER NOT NULL,

    CONSTRAINT "RecipeChief_pkey" PRIMARY KEY ("recipeId","chiefId")
);

-- AddForeignKey
ALTER TABLE "RecipeChief" ADD CONSTRAINT "RecipeChief_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeChief" ADD CONSTRAINT "RecipeChief_chiefId_fkey" FOREIGN KEY ("chiefId") REFERENCES "Chief"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

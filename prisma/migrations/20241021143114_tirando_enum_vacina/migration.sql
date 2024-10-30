/*
  Warnings:

  - The `especie` column on the `Vacina` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Vacina" DROP COLUMN "especie",
ADD COLUMN     "especie" TEXT;

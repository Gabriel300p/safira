/*
  Warnings:

  - Added the required column `especie` to the `Vacina` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vacina" ADD COLUMN     "especie" "TIPO_ANIMAL" NOT NULL;

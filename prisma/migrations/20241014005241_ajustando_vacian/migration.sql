/*
  Warnings:

  - The values [Cachorro,Gato] on the enum `TIPO_ANIMAL` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TIPO_ANIMAL_new" AS ENUM ('CACHORRO', 'GATO');
ALTER TABLE "Animal" ALTER COLUMN "tipo" TYPE "TIPO_ANIMAL_new" USING ("tipo"::text::"TIPO_ANIMAL_new");
ALTER TYPE "TIPO_ANIMAL" RENAME TO "TIPO_ANIMAL_old";
ALTER TYPE "TIPO_ANIMAL_new" RENAME TO "TIPO_ANIMAL";
DROP TYPE "TIPO_ANIMAL_old";
COMMIT;

-- AlterTable
ALTER TABLE "Vacina" ALTER COLUMN "ultima" DROP NOT NULL,
ALTER COLUMN "proxima" DROP NOT NULL;

/*
  Warnings:

  - You are about to drop the column `proxima` on the `Vacina` table. All the data in the column will be lost.
  - You are about to drop the column `ultima` on the `Vacina` table. All the data in the column will be lost.
  - Added the required column `especie` to the `Vacina` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Animal" ADD COLUMN     "vacinasProvisorio" TEXT;

-- AlterTable
ALTER TABLE "Vacina" DROP COLUMN "proxima",
DROP COLUMN "ultima",
ADD COLUMN     "especie" "TIPO_ANIMAL" NOT NULL;

-- AlterTable
ALTER TABLE "VacinaAnimal" ADD COLUMN     "proxima" TIMESTAMP(3),
ADD COLUMN     "ultima" TIMESTAMP(3);

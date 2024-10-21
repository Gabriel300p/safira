/*
  Warnings:

  - You are about to drop the column `proxima` on the `Vacina` table. All the data in the column will be lost.
  - You are about to drop the column `ultima` on the `Vacina` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Vacina" DROP COLUMN "proxima",
DROP COLUMN "ultima";

-- AlterTable
ALTER TABLE "VacinaAnimal" ADD COLUMN     "proxima" TIMESTAMP(3),
ADD COLUMN     "ultima" TIMESTAMP(3);

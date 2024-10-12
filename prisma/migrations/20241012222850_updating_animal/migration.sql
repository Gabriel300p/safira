/*
  Warnings:

  - You are about to drop the column `vacinaId` on the `Animal` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Animal" DROP CONSTRAINT "Animal_vacinaId_fkey";

-- AlterTable
ALTER TABLE "Animal" DROP COLUMN "vacinaId",
ALTER COLUMN "atualizadoEm" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Categoria" ALTER COLUMN "atualizadoEm" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Financeiro" ALTER COLUMN "atualizadoEm" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Raca" ALTER COLUMN "atualizadoEm" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Tutor" ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "atualizadoEm" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Vacina" ALTER COLUMN "atualizadoEm" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "VacinaAnimal" ALTER COLUMN "atualizadoEm" SET DEFAULT CURRENT_TIMESTAMP;

/*
  Warnings:

  - A unique constraint covering the columns `[google_id]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "user_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "user_google_id_key" ON "user"("google_id");

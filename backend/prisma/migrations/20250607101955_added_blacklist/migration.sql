-- CreateTable
CREATE TABLE "Blacklist" (
    "token" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Blacklist_token_key" ON "Blacklist"("token");

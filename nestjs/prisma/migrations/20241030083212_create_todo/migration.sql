-- CreateTable
CREATE TABLE "Todo" (
    "userId" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deal" (
    "id" TEXT NOT NULL,
    "dealId" INTEGER NOT NULL,
    "buyer" TEXT NOT NULL,
    "seller" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "txHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Deal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Deal_dealId_key" ON "Deal"("dealId");

-- CreateIndex
CREATE UNIQUE INDEX "Deal_txHash_key" ON "Deal"("txHash");

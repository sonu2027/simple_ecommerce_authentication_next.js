-- CreateTable
CREATE TABLE "MarkedProductId" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "MarkedProductId_pkey" PRIMARY KEY ("id")
);

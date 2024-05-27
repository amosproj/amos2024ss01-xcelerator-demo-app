-- CreateTable
CREATE TABLE "Case" (
    "id" SERIAL NOT NULL,
    "handle" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "eTag" TEXT NOT NULL,
    "modifiedBy" TEXT NOT NULL,
    "modifiedDate" TIMESTAMP(3) NOT NULL,
    "overdue" BOOLEAN NOT NULL,

    CONSTRAINT "Case_pkey" PRIMARY KEY ("id")
);

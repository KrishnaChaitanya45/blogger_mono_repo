-- AlterTable
ALTER TABLE "users" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "profession" JSONB,
ADD COLUMN     "profilePhoto" TEXT,
ADD COLUMN     "socials" JSONB;

-- CreateTable
CREATE TABLE "Blog" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "descriptionShort" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "banner" TEXT NOT NULL,
    "isFeatured" BOOLEAN NOT NULL,
    "Topic" TEXT NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

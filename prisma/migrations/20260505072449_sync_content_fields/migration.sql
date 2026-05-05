-- AlterTable
ALTER TABLE "public"."District" ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "public"."Event" ADD COLUMN     "audience" TEXT,
ADD COLUMN     "contact" TEXT;

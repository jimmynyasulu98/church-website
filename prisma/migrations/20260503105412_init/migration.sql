-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('ADMIN', 'STAFF', 'MEMBER');

-- CreateEnum
CREATE TYPE "public"."UserStatus" AS ENUM ('ACTIVE', 'INVITED', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "public"."ContentStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "public"."GivingType" AS ENUM ('TITHE', 'OFFERING', 'PLEDGE', 'THANKSGIVING', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."TransferType" AS ENUM ('PERMANENT', 'TEMPORARY');

-- CreateEnum
CREATE TYPE "public"."ReceiptStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED');

-- CreateEnum
CREATE TYPE "public"."RequestStatus" AS ENUM ('PENDING', 'REVIEWED', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "public"."Church" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "websiteUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Church_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "churchId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "public"."UserRole" NOT NULL DEFAULT 'MEMBER',
    "status" "public"."UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Permission" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserPermission" (
    "userId" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,

    CONSTRAINT "UserPermission_pkey" PRIMARY KEY ("userId","permissionId")
);

-- CreateTable
CREATE TABLE "public"."District" (
    "id" TEXT NOT NULL,
    "churchId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "area" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "District_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MemberProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "churchId" TEXT NOT NULL,
    "districtId" TEXT,
    "memberNumber" TEXT,
    "gender" TEXT,
    "maritalStatus" TEXT,
    "previousChurch" TEXT,
    "currentLocation" TEXT,
    "baptizedAt" TEXT,
    "currentWork" TEXT,
    "transferType" "public"."TransferType",
    "transferLetterUrl" TEXT,
    "joinedAt" TIMESTAMP(3),
    "bio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MemberProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Ministry" (
    "id" TEXT NOT NULL,
    "churchId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT,
    "status" "public"."ContentStatus" NOT NULL DEFAULT 'PUBLISHED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ministry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Event" (
    "id" TEXT NOT NULL,
    "churchId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3),
    "venue" TEXT NOT NULL,
    "imageUrl" TEXT,
    "status" "public"."ContentStatus" NOT NULL DEFAULT 'PUBLISHED',
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."NewsArticle" (
    "id" TEXT NOT NULL,
    "churchId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "imageUrl" TEXT,
    "publishedAt" TIMESTAMP(3),
    "status" "public"."ContentStatus" NOT NULL DEFAULT 'PUBLISHED',
    "authorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NewsArticle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Sermon" (
    "id" TEXT NOT NULL,
    "churchId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "passage" TEXT NOT NULL,
    "preacher" TEXT NOT NULL,
    "series" TEXT,
    "videoUrl" TEXT,
    "imageUrl" TEXT,
    "preachedAt" TIMESTAMP(3) NOT NULL,
    "status" "public"."ContentStatus" NOT NULL DEFAULT 'PUBLISHED',
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sermon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MlagaSchedule" (
    "id" TEXT NOT NULL,
    "churchId" TEXT NOT NULL,
    "districtId" TEXT,
    "host" TEXT NOT NULL,
    "preacher" TEXT NOT NULL,
    "venue" TEXT NOT NULL,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MlagaSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Vacancy" (
    "id" TEXT NOT NULL,
    "churchId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "requirements" TEXT[],
    "closingAt" TIMESTAMP(3),
    "status" "public"."ContentStatus" NOT NULL DEFAULT 'PUBLISHED',
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vacancy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."OfferingReceipt" (
    "id" TEXT NOT NULL,
    "churchId" TEXT NOT NULL,
    "userId" TEXT,
    "fullName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "district" TEXT,
    "type" "public"."GivingType" NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "receiptUrl" TEXT NOT NULL,
    "status" "public"."ReceiptStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OfferingReceipt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MembershipRequest" (
    "id" TEXT NOT NULL,
    "churchId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "maritalStatus" TEXT NOT NULL,
    "primaryPhone" TEXT NOT NULL,
    "otherPhone" TEXT,
    "email" TEXT,
    "previousChurch" TEXT NOT NULL,
    "currentLocation" TEXT NOT NULL,
    "baptizedAt" TEXT,
    "currentWork" TEXT,
    "preferredService" TEXT NOT NULL,
    "transferType" "public"."TransferType" NOT NULL,
    "transferLetterStatus" TEXT NOT NULL,
    "transferLetterUrl" TEXT,
    "familyMembers" TEXT,
    "notes" TEXT,
    "status" "public"."RequestStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MembershipRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ContactMessage" (
    "id" TEXT NOT NULL,
    "churchId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" "public"."RequestStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ApiClient" (
    "id" TEXT NOT NULL,
    "churchId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "keyHash" TEXT NOT NULL,
    "scopes" TEXT[],
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApiClient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MemberVerification" (
    "id" TEXT NOT NULL,
    "memberProfileId" TEXT NOT NULL,
    "requestingChurch" TEXT,
    "requestRef" TEXT,
    "result" TEXT NOT NULL,
    "checkedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MemberVerification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Church_slug_key" ON "public"."Church"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE INDEX "User_churchId_role_idx" ON "public"."User"("churchId", "role");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_key_key" ON "public"."Permission"("key");

-- CreateIndex
CREATE UNIQUE INDEX "District_churchId_name_key" ON "public"."District"("churchId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "MemberProfile_userId_key" ON "public"."MemberProfile"("userId");

-- CreateIndex
CREATE INDEX "MemberProfile_churchId_districtId_idx" ON "public"."MemberProfile"("churchId", "districtId");

-- CreateIndex
CREATE UNIQUE INDEX "MemberProfile_churchId_memberNumber_key" ON "public"."MemberProfile"("churchId", "memberNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Ministry_churchId_slug_key" ON "public"."Ministry"("churchId", "slug");

-- CreateIndex
CREATE INDEX "Event_churchId_startsAt_idx" ON "public"."Event"("churchId", "startsAt");

-- CreateIndex
CREATE UNIQUE INDEX "Event_churchId_slug_key" ON "public"."Event"("churchId", "slug");

-- CreateIndex
CREATE INDEX "NewsArticle_churchId_publishedAt_idx" ON "public"."NewsArticle"("churchId", "publishedAt");

-- CreateIndex
CREATE UNIQUE INDEX "NewsArticle_churchId_slug_key" ON "public"."NewsArticle"("churchId", "slug");

-- CreateIndex
CREATE INDEX "Sermon_churchId_preachedAt_idx" ON "public"."Sermon"("churchId", "preachedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Sermon_churchId_slug_key" ON "public"."Sermon"("churchId", "slug");

-- CreateIndex
CREATE INDEX "MlagaSchedule_churchId_startsAt_idx" ON "public"."MlagaSchedule"("churchId", "startsAt");

-- CreateIndex
CREATE UNIQUE INDEX "Vacancy_churchId_slug_key" ON "public"."Vacancy"("churchId", "slug");

-- CreateIndex
CREATE INDEX "OfferingReceipt_churchId_userId_idx" ON "public"."OfferingReceipt"("churchId", "userId");

-- CreateIndex
CREATE INDEX "OfferingReceipt_churchId_createdAt_idx" ON "public"."OfferingReceipt"("churchId", "createdAt");

-- CreateIndex
CREATE INDEX "MembershipRequest_churchId_status_idx" ON "public"."MembershipRequest"("churchId", "status");

-- CreateIndex
CREATE INDEX "ContactMessage_churchId_status_idx" ON "public"."ContactMessage"("churchId", "status");

-- CreateIndex
CREATE INDEX "ApiClient_churchId_active_idx" ON "public"."ApiClient"("churchId", "active");

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "public"."Church"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserPermission" ADD CONSTRAINT "UserPermission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserPermission" ADD CONSTRAINT "UserPermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "public"."Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."District" ADD CONSTRAINT "District_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "public"."Church"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MemberProfile" ADD CONSTRAINT "MemberProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MemberProfile" ADD CONSTRAINT "MemberProfile_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "public"."District"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Ministry" ADD CONSTRAINT "Ministry_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "public"."Church"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Event" ADD CONSTRAINT "Event_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "public"."Church"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Event" ADD CONSTRAINT "Event_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."NewsArticle" ADD CONSTRAINT "NewsArticle_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "public"."Church"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."NewsArticle" ADD CONSTRAINT "NewsArticle_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Sermon" ADD CONSTRAINT "Sermon_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "public"."Church"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Sermon" ADD CONSTRAINT "Sermon_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MlagaSchedule" ADD CONSTRAINT "MlagaSchedule_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "public"."Church"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MlagaSchedule" ADD CONSTRAINT "MlagaSchedule_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "public"."District"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Vacancy" ADD CONSTRAINT "Vacancy_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "public"."Church"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Vacancy" ADD CONSTRAINT "Vacancy_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OfferingReceipt" ADD CONSTRAINT "OfferingReceipt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MembershipRequest" ADD CONSTRAINT "MembershipRequest_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "public"."Church"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ContactMessage" ADD CONSTRAINT "ContactMessage_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "public"."Church"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ApiClient" ADD CONSTRAINT "ApiClient_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "public"."Church"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MemberVerification" ADD CONSTRAINT "MemberVerification_memberProfileId_fkey" FOREIGN KEY ("memberProfileId") REFERENCES "public"."MemberProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const churchData = {
  name: "CCAP Zomba",
  slug: "ccap-zomba",
  email: "info@ccapzomba.org",
  phone: "+265 88 123 4567",
  address: "Ndirande Road, Zomba, Malawi",
  websiteUrl: "https://ccapzomba.org",
};

const districts = [
  ["District 1", "Chinamwali", "Serving the communities of Chinamwali and surrounding areas."],
  ["District 2", "Ndirande", "Serving the areas of Ndirande and surrounding communities."],
  ["District 3", "Kadango", "Serving the areas of Kadango and surrounding communities."],
  ["District 4", "Zomba Town", "Serving the areas of Zomba Town and surrounding communities."],
  ["District 5", "Mt. Bise", "Serving the areas of Mt. Bise and surrounding communities."],
  ["District 6", "Kachere", "Serving the areas of Kachere and surrounding communities."],
];

const ministries = [
  ["Praise Team", "praise-team", "Leading the church in worship."],
  ["Nvana Choir", "nvana-choir", "Uplifting the church through song."],
  ["Chigwirizano Choir", "chigwirizano-choir", "Bringing voices together in unity."],
  ["Sunday School", "sunday-school", "Teaching the next generation."],
  ["Women's Fellowship", "womens-fellowship", "Empowering women to grow in Christ."],
  ["Men's Fellowship", "mens-fellowship", "Building godly men of purpose."],
  ["Youth Ministry", "youth-ministry", "Raising a generation that fears God."],
  ["Ushering Ministry", "ushering-ministry", "Serving with excellence and a joyful heart."],
];

const permissions = [
  ["content.manage", "Create and update events, news, sermons, mlaga and vacancies."],
  ["members.manage", "Create and update member records."],
  ["giving.verify", "Review and verify giving receipts."],
  ["users.manage", "Create users and assign roles or permissions."],
];

async function main() {
  const church = await prisma.church.upsert({
    where: { slug: churchData.slug },
    update: churchData,
    create: churchData,
  });

  for (const [key, description] of permissions) {
    await prisma.permission.upsert({
      where: { key },
      update: { description },
      create: { key, description },
    });
  }

  const districtRows = [];
  for (const [name, area, description] of districts) {
    const district = await prisma.district.upsert({
      where: { churchId_name: { churchId: church.id, name } },
      update: { area, description },
      create: { churchId: church.id, name, area, description },
    });
    districtRows.push(district);
  }

  for (const [name, slug, description] of ministries) {
    await prisma.ministry.upsert({
      where: { churchId_slug: { churchId: church.id, slug } },
      update: { name, description },
      create: { churchId: church.id, name, slug, description },
    });
  }

  const passwordHash = await bcrypt.hash("ChangeMe123!", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@ccapzomba.org" },
    update: {},
    create: {
      churchId: church.id,
      email: "admin@ccapzomba.org",
      passwordHash,
      role: "ADMIN",
      firstName: "System",
      lastName: "Admin",
      phone: "+265 88 123 4567",
    },
  });

  const staff = await prisma.user.upsert({
    where: { email: "staff@ccapzomba.org" },
    update: {},
    create: {
      churchId: church.id,
      email: "staff@ccapzomba.org",
      passwordHash,
      role: "STAFF",
      firstName: "Church",
      lastName: "Staff",
    },
  });

  const member = await prisma.user.upsert({
    where: { email: "member@example.com" },
    update: {},
    create: {
      churchId: church.id,
      email: "member@example.com",
      passwordHash,
      role: "MEMBER",
      firstName: "Grace",
      lastName: "Banda",
      phone: "+265 88 000 0000",
    },
  });

  await prisma.memberProfile.upsert({
    where: { userId: member.id },
    update: {},
    create: {
      userId: member.id,
      churchId: church.id,
      districtId: districtRows[0]?.id,
      memberNumber: "CCAPZ-0001",
      gender: "Female",
      maritalStatus: "Single",
      previousChurch: "CCAP Blantyre",
      currentLocation: "Zomba",
      transferType: "PERMANENT",
      joinedAt: new Date("2026-05-03T00:00:00.000Z"),
      bio: "Seed member record used for local development and API verification testing.",
    },
  });

  await prisma.event.upsert({
    where: { churchId_slug: { churchId: church.id, slug: "youth-conference-2026" } },
    update: {},
    create: {
      churchId: church.id,
      title: "Youth Conference 2026",
      slug: "youth-conference-2026",
      description: "A youth gathering for worship, teaching, prayer and fellowship.",
      startsAt: new Date("2026-05-18T08:00:00.000Z"),
      endsAt: new Date("2026-05-20T17:00:00.000Z"),
      venue: "CCAP Zomba Main Hall",
      createdById: staff.id,
    },
  });

  await prisma.newsArticle.upsert({
    where: { churchId_slug: { churchId: church.id, slug: "successful-youth-conference" } },
    update: {},
    create: {
      churchId: church.id,
      title: "CCAP Zomba Hosts Successful Youth Conference",
      slug: "successful-youth-conference",
      excerpt: "Youth gathered for worship, teaching and fellowship.",
      body: "CCAP Zomba hosted a youth conference focused on worship, discipleship and service.",
      publishedAt: new Date("2026-05-18T08:00:00.000Z"),
      authorId: staff.id,
    },
  });

  await prisma.sermon.upsert({
    where: { churchId_slug: { churchId: church.id, slug: "walking-by-faith" } },
    update: {},
    create: {
      churchId: church.id,
      title: "Walking by Faith",
      slug: "walking-by-faith",
      passage: "2 Corinthians 5:7",
      preacher: "Rev. John Phiri",
      series: "Faith Foundations",
      preachedAt: new Date("2026-05-12T08:00:00.000Z"),
      createdById: staff.id,
    },
  });

  for (const [index, district] of districtRows.entries()) {
    await prisma.mlagaSchedule.create({
      data: {
        churchId: church.id,
        districtId: district.id,
        host: index % 2 === 0 ? "Mr. Banda" : "Mrs. Kachale",
        preacher: index % 2 === 0 ? "Elder Phiri" : "Elder Chirimwemwe",
        venue: district.area ?? district.name,
        startsAt: new Date("2026-05-15T18:00:00.000Z"),
      },
    });
  }

  await prisma.vacancy.upsert({
    where: { churchId_slug: { churchId: church.id, slug: "youth-ministry-coordinator" } },
    update: {},
    create: {
      churchId: church.id,
      title: "Youth Ministry Coordinator",
      slug: "youth-ministry-coordinator",
      type: "Full Time",
      department: "Youth Ministry",
      summary: "Coordinate youth ministry programs and outreach initiatives.",
      requirements: [
        "Active Christian faith and commitment to youth discipleship.",
        "Experience leading youth groups or ministry programs.",
      ],
      closingAt: new Date("2026-06-15T23:59:59.000Z"),
      createdById: admin.id,
    },
  });

  console.log("Seed complete.");
  console.log("Admin login: admin@ccapzomba.org / ChangeMe123!");
  console.log("Staff login: staff@ccapzomba.org / ChangeMe123!");
  console.log("Member login: member@example.com / ChangeMe123!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

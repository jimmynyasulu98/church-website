import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const churchData = {
  name: "CCAP Zomba",
  slug: "ccap-zomba",
  email: "info@ccapzomba.org",
  phone: "+265 88 123 4567",
  address: "Zomba Zero, Zomba, Malawi",
  websiteUrl: "https://ccapzomba.org",
};

const districts = [
  {
    name: "District 1",
    area: "Chinamwali",
    description: "Serving the communities of Chinamwali and surrounding areas.",
    imageUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "District 2",
    area: "Chilunga",
    description: "Serving the areas of Ndirande and surrounding communities.",
    imageUrl:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "District 3",
    area: "Kadango",
    description: "Serving the areas of Kadango and surrounding communities.",
    imageUrl:
      "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "District 4",
    area: "Zomba Town",
    description: "Serving the areas of Zomba Town and surrounding communities.",
    imageUrl:
      "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "District 5",
    area: "Mt. Bise",
    description: "Serving the areas of Mt. Bise and surrounding communities.",
    imageUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "District 6",
    area: "Kachere",
    description: "Serving the areas of Kachere and surrounding communities.",
    imageUrl:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=700&q=80",
  },
];

const ministries = [
  {
    name: "Praise Team",
    slug: "praise-team",
    description: "Leading the church in worship.",
    imageUrl:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Nvana Choir",
    slug: "nvana-choir",
    description: "Uplifting the church through song.",
    imageUrl:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Chigwirizano Choir",
    slug: "chigwirizano-choir",
    description: "Bringing voices together in unity.",
    imageUrl:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Sunday School",
    slug: "sunday-school",
    description: "Teaching the next generation.",
    imageUrl:
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Women's Fellowship",
    slug: "womens-fellowship",
    description: "Empowering women to grow in Christ.",
    imageUrl:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Men's Fellowship",
    slug: "mens-fellowship",
    description: "Building godly men of purpose.",
    imageUrl:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Youth Ministry",
    slug: "youth-ministry",
    description: "Raising a generation that fears God.",
    imageUrl:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Ushering Ministry",
    slug: "ushering-ministry",
    description: "Serving with excellence and a joyful heart.",
    imageUrl:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=700&q=80",
  },
];

const events = [
  {
    title: "Youth Conference 2026",
    slug: "youth-conference-2026",
    description: "A youth gathering for worship, teaching, prayer and fellowship.",
    startsAt: "2026-05-18T08:00:00.000Z",
    endsAt: "2026-05-20T17:00:00.000Z",
    venue: "CCAP Zomba Main Hall",
    audience: "Youth, young adults and ministry leaders",
    contact: "Youth Ministry",
    imageUrl:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Women's Fellowship",
    slug: "womens-fellowship-2026",
    description: "A fellowship meeting for women to grow in faith and service.",
    startsAt: "2026-05-26T10:00:00.000Z",
    venue: "District 2",
    audience: "Women and invited guests",
    contact: "Women's Fellowship",
    imageUrl:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Communion Sunday",
    slug: "communion-sunday-2026",
    description: "A communion service across the Sunday worship gatherings.",
    startsAt: "2026-06-02T06:00:00.000Z",
    venue: "CCAP Zomba",
    audience: "All members and visitors",
    contact: "Church Office",
    imageUrl:
      "https://images.unsplash.com/photo-1520637836862-4d197d17c36a?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Men's Fellowship Meeting",
    slug: "mens-fellowship-meeting-2026",
    description: "A meeting for men focused on discipleship and purpose.",
    startsAt: "2026-06-16T14:00:00.000Z",
    venue: "District 3",
    audience: "Men's Fellowship members and guests",
    contact: "Men's Fellowship",
    imageUrl:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Church Anniversary",
    slug: "church-anniversary-2026",
    description: "A church-wide celebration of God's faithfulness to CCAP Zomba.",
    startsAt: "2026-06-30T06:00:00.000Z",
    venue: "CCAP Zomba",
    audience: "All congregants, families and invited guests",
    contact: "Church Office",
    imageUrl:
      "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Easter Celebration Service",
    slug: "easter-celebration-service-2026",
    description: "A worship celebration remembering the resurrection of Jesus Christ.",
    startsAt: "2026-04-21T06:00:00.000Z",
    venue: "CCAP Zomba",
    audience: "All members and visitors",
    contact: "Church Office",
    imageUrl:
      "https://images.unsplash.com/photo-1515169067865-5387ec356754?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Sunday School Teachers Workshop",
    slug: "sunday-school-teachers-workshop-2026",
    description: "A training workshop for Sunday School teachers and helpers.",
    startsAt: "2026-04-14T09:00:00.000Z",
    venue: "CCAP Zomba Classrooms",
    audience: "Sunday School teachers and volunteers",
    contact: "Sunday School Ministry",
    imageUrl:
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "District Fellowship Sunday",
    slug: "district-fellowship-sunday-2026",
    description: "A district-level fellowship gathering for prayer and encouragement.",
    startsAt: "2026-03-30T14:00:00.000Z",
    venue: "District Host Homes",
    audience: "District members and families",
    contact: "District Leadership",
    imageUrl:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80",
  },
];

const newsArticles = [
  {
    title: "CCAP Zomba Hosts Successful Youth Conference",
    slug: "successful-youth-conference",
    excerpt: "Youth gathered for worship, teaching and fellowship.",
    body: "CCAP Zomba hosted a youth conference focused on worship, discipleship and service.",
    publishedAt: "2026-05-18T08:00:00.000Z",
    imageUrl:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Baptism Service Brings Joy to Many Families",
    slug: "baptism-service-brings-joy",
    excerpt: "Families celebrated as new believers publicly professed their faith.",
    body: "The baptism service brought joy to many families as the congregation celebrated faith, discipleship and new life in Christ.",
    publishedAt: "2026-05-10T08:00:00.000Z",
    imageUrl:
      "https://images.unsplash.com/photo-1515169067865-5387ec356754?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Women's Fellowship Outreach Program",
    slug: "womens-fellowship-outreach-program",
    excerpt: "The Women's Fellowship served the community through prayer and outreach.",
    body: "The Women's Fellowship outreach program encouraged service, care and Christian witness in the wider Zomba community.",
    publishedAt: "2026-05-03T08:00:00.000Z",
    imageUrl:
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Church Renovation Project Underway",
    slug: "church-renovation-project-underway",
    excerpt: "Renovation work has begun to improve church facilities.",
    body: "CCAP Zomba has begun a church renovation project to improve worship, fellowship and ministry spaces for the congregation.",
    publishedAt: "2026-04-28T08:00:00.000Z",
    imageUrl:
      "https://images.unsplash.com/photo-1520637836862-4d197d17c36a?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Sunday School Easter Celebration",
    slug: "sunday-school-easter-celebration",
    excerpt: "Children marked Easter with songs, Bible lessons and celebration.",
    body: "The Sunday School Easter celebration helped children learn and celebrate the message of Christ's resurrection.",
    publishedAt: "2026-04-15T08:00:00.000Z",
    imageUrl:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "New Members Welcome Service",
    slug: "new-members-welcome-service",
    excerpt: "New members were welcomed into the CCAP Zomba church family.",
    body: "CCAP Zomba welcomed new members and encouraged them to connect with districts, ministries and fellowship groups.",
    publishedAt: "2026-04-07T08:00:00.000Z",
    imageUrl:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
  },
];

const sermons = [
  {
    title: "Walking by Faith",
    slug: "walking-by-faith",
    passage: "2 Corinthians 5:7",
    preacher: "Rev. John Phiri",
    series: "Faith Foundations",
    preachedAt: "2026-05-12T08:00:00.000Z",
    imageUrl:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "The Power of Prayer",
    slug: "the-power-of-prayer",
    passage: "Philippians 4:6-7",
    preacher: "Elder Chirimwemwe",
    series: "Prayer Life",
    preachedAt: "2026-05-05T08:00:00.000Z",
    imageUrl:
      "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Grace That Saves",
    slug: "grace-that-saves",
    passage: "Ephesians 2:8-9",
    preacher: "Rev. John Phiri",
    series: "Grace and Salvation",
    preachedAt: "2026-04-28T08:00:00.000Z",
    imageUrl:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Trust in the Lord",
    slug: "trust-in-the-lord",
    passage: "Proverbs 3:5-6",
    preacher: "Elder Phiri",
    series: "Faith Foundations",
    preachedAt: "2026-04-21T08:00:00.000Z",
    imageUrl:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Living a Holy Life",
    slug: "living-a-holy-life",
    passage: "1 Peter 1:15-16",
    preacher: "Rev. John Phiri",
    series: "Holy Living",
    preachedAt: "2026-04-14T08:00:00.000Z",
    imageUrl:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=700&q=80",
  },
];

const mlagaSchedule = [
  ["District 1", "Mr. Banda", "Elder Phiri", "Chinamwali"],
  ["District 2", "Mrs. Kachale", "Elder Chirimwemwe", "Chipembere"],
  ["District 3", "Mr. Jere", "Deaconess Thoko", "Kadango"],
  ["District 4", "Mrs. Mvula", "Elder Mambo", "Zomba Town"],
  ["District 5", "Mr. Phiri", "Rev. Chigona", "Mt. Bise"],
  ["District 6", "Mrs. Lungu", "Elder Mbewe", "Kachere"],
];

const vacancies = [
  {
    title: "Youth Ministry Coordinator",
    slug: "youth-ministry-coordinator",
    type: "Full Time",
    department: "Youth Ministry",
    summary:
      "Coordinate youth ministry programs, discipleship activities, meetings and outreach initiatives for CCAP Zomba.",
    requirements: [
      "Active Christian faith and commitment to youth discipleship.",
      "Experience leading youth groups or ministry programs.",
      "Strong communication, planning and teamwork skills.",
    ],
    closingAt: "2026-06-15T23:59:59.000Z",
  },
  {
    title: "Accountant",
    slug: "accountant",
    type: "Full Time",
    department: "Finance",
    summary:
      "Support church financial administration, reporting, reconciliations and stewardship processes.",
    requirements: [
      "Accounting qualification or relevant finance experience.",
      "Good knowledge of financial records and reporting.",
      "High integrity and attention to detail.",
    ],
    closingAt: "2026-06-15T23:59:59.000Z",
  },
  {
    title: "Administrative Assistant",
    slug: "administrative-assistant",
    type: "Full Time",
    department: "Administration",
    summary:
      "Assist the church office with records, correspondence, scheduling and member support.",
    requirements: [
      "Strong organizational and computer skills.",
      "Professional communication and confidentiality.",
      "Experience in office administration is preferred.",
    ],
    closingAt: "2026-06-15T23:59:59.000Z",
  },
  {
    title: "Choir Director",
    slug: "choir-director",
    type: "Part Time",
    department: "Music Ministry",
    summary: "Lead choir rehearsals, coordinate music selections and support worship services.",
    requirements: [
      "Experience directing a church choir or worship group.",
      "Ability to read or arrange music is an advantage.",
      "Commitment to worship ministry and teamwork.",
    ],
    closingAt: "2026-06-15T23:59:59.000Z",
  },
];

const permissions = [
  ["content.manage", "Create and update events, news, sermons, mlaga and vacancies."],
  ["members.manage", "Create and update member records."],
  ["giving.verify", "Review and verify giving receipts."],
  ["users.manage", "Create users and assign roles or permissions."],
];

function requiredEnv(name) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`${name} is required for seeding.`);
  }

  return value;
}

function optionalSeedUser(emailName, passwordName) {
  const email = process.env[emailName]?.trim();
  const password = process.env[passwordName]?.trim();

  if (!email && !password) {
    return null;
  }

  if (!email || !password) {
    throw new Error(`${emailName} and ${passwordName} must be provided together.`);
  }

  return {
    email: email.toLowerCase(),
    password,
  };
}

async function ensureUser({
  churchId,
  email,
  password,
  role,
  firstName,
  lastName,
  phone,
}) {
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return existingUser;
  }

  return prisma.user.create({
    data: {
      churchId,
      email,
      passwordHash: await bcrypt.hash(password, 12),
      role,
      firstName,
      lastName,
      phone,
    },
  });
}

async function main() {
  const seedUsers = {
    admin: {
      email: requiredEnv("SEED_ADMIN_EMAIL").toLowerCase(),
      password: requiredEnv("SEED_ADMIN_PASSWORD"),
    },
    staff: optionalSeedUser("SEED_STAFF_EMAIL", "SEED_STAFF_PASSWORD"),
    member: optionalSeedUser("SEED_MEMBER_EMAIL", "SEED_MEMBER_PASSWORD"),
  };

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
  for (const districtData of districts) {
    const district = await prisma.district.upsert({
      where: { churchId_name: { churchId: church.id, name: districtData.name } },
      update: {
        area: districtData.area,
        description: districtData.description,
        imageUrl: districtData.imageUrl,
      },
      create: { churchId: church.id, ...districtData },
    });
    districtRows.push(district);
  }

  for (const ministry of ministries) {
    await prisma.ministry.upsert({
      where: { churchId_slug: { churchId: church.id, slug: ministry.slug } },
      update: {
        name: ministry.name,
        description: ministry.description,
        imageUrl: ministry.imageUrl,
      },
      create: { churchId: church.id, ...ministry },
    });
  }

  const admin = await ensureUser({
    churchId: church.id,
    email: seedUsers.admin.email,
    password: seedUsers.admin.password,
    role: "ADMIN",
    firstName: "System",
    lastName: "Admin",
    phone: "+265 88 123 4567",
  });

  const staff = seedUsers.staff
    ? await ensureUser({
        churchId: church.id,
        email: seedUsers.staff.email,
        password: seedUsers.staff.password,
        role: "STAFF",
        firstName: "Church",
        lastName: "Staff",
      })
    : admin;

  const member = seedUsers.member
    ? await ensureUser({
        churchId: church.id,
        email: seedUsers.member.email,
        password: seedUsers.member.password,
        role: "MEMBER",
        firstName: "Grace",
        lastName: "Banda",
        phone: "+265 88 000 0000",
      })
    : null;

  if (member) {
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
  }

  for (const event of events) {
    const eventData = {
      title: event.title,
      slug: event.slug,
      description: event.description,
      startsAt: new Date(event.startsAt),
      endsAt: event.endsAt ? new Date(event.endsAt) : null,
      venue: event.venue,
      audience: event.audience,
      contact: event.contact,
      imageUrl: event.imageUrl,
      createdById: staff.id,
    };

    await prisma.event.upsert({
      where: { churchId_slug: { churchId: church.id, slug: event.slug } },
      update: eventData,
      create: {
        churchId: church.id,
        ...eventData,
      },
    });
  }

  for (const article of newsArticles) {
    const articleData = {
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      body: article.body,
      imageUrl: article.imageUrl,
      publishedAt: new Date(article.publishedAt),
      authorId: staff.id,
    };

    await prisma.newsArticle.upsert({
      where: { churchId_slug: { churchId: church.id, slug: article.slug } },
      update: articleData,
      create: {
        churchId: church.id,
        ...articleData,
      },
    });
  }

  for (const sermon of sermons) {
    const sermonData = {
      title: sermon.title,
      slug: sermon.slug,
      passage: sermon.passage,
      preacher: sermon.preacher,
      series: sermon.series,
      imageUrl: sermon.imageUrl,
      preachedAt: new Date(sermon.preachedAt),
      createdById: staff.id,
    };

    await prisma.sermon.upsert({
      where: { churchId_slug: { churchId: church.id, slug: sermon.slug } },
      update: sermonData,
      create: {
        churchId: church.id,
        ...sermonData,
      },
    });
  }

  for (const [districtName, host, preacher, venue] of mlagaSchedule) {
    const district = districtRows.find((row) => row.name === districtName);
    const startsAt = new Date("2026-05-15T18:00:00.000Z");
    const existingMlaga = await prisma.mlagaSchedule.findFirst({
      where: {
        churchId: church.id,
        districtId: district?.id,
        startsAt,
      },
    });

    const mlagaData = {
      churchId: church.id,
      districtId: district?.id,
      host,
      preacher,
      venue,
      startsAt,
    };

    if (existingMlaga) {
      await prisma.mlagaSchedule.update({
        where: { id: existingMlaga.id },
        data: mlagaData,
      });
    } else {
      await prisma.mlagaSchedule.create({
        data: mlagaData,
      });
    }
  }

  for (const vacancy of vacancies) {
    const vacancyData = {
      title: vacancy.title,
      slug: vacancy.slug,
      type: vacancy.type,
      department: vacancy.department,
      summary: vacancy.summary,
      requirements: vacancy.requirements,
      closingAt: new Date(vacancy.closingAt),
      createdById: admin.id,
    };

    await prisma.vacancy.upsert({
      where: { churchId_slug: { churchId: church.id, slug: vacancy.slug } },
      update: vacancyData,
      create: {
        churchId: church.id,
        ...vacancyData,
      },
    });
  }

  console.log("Seed complete.");
  console.log("Static content ensured: 6 districts, 8 ministries, 8 events, 6 news articles, 5 sermons, 6 mlaga entries and 4 vacancies.");
  console.log(`Admin user ensured: ${seedUsers.admin.email}`);
  console.log(
    seedUsers.staff
      ? `Staff user ensured: ${seedUsers.staff.email}`
      : "Staff user skipped: SEED_STAFF_EMAIL and SEED_STAFF_PASSWORD not set.",
  );
  console.log(
    seedUsers.member
      ? `Member user ensured: ${seedUsers.member.email}`
      : "Member user skipped: SEED_MEMBER_EMAIL and SEED_MEMBER_PASSWORD not set.",
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { getChurchOrThrow } from "@/lib/church";
import { prisma } from "@/lib/db";

const shortDateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

const longDateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const weekdayDateFormatter = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
});

const shortWeekdayDateFormatter = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short",
});

const monthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
});

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

export const fallbackContentImage =
  "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=700&q=80";

export type DistrictItem = {
  id: string;
  name: string;
  area: string;
  description: string;
  image: string;
};

export type EventItem = {
  id: string;
  month: string;
  day: string;
  title: string;
  date: string;
  displayDate: string;
  venue: string;
  description: string;
  audience: string;
  contact: string;
};

export type HomeEventItem = {
  id: string;
  month: string;
  day: string;
  title: string;
  detail: string;
  place: string;
};

export type MlagaItem = {
  id: string;
  name: string;
  district: string;
  area: string;
  host: string;
  preacher: string;
  date: string;
  time: string;
  dateTime: string;
  venue: string;
  location: string;
};

export type NewsItem = {
  id: string;
  title: string;
  date: string;
  displayDate: string;
  image: string;
};

export type SermonItem = {
  id: string;
  title: string;
  passage: string;
  preacher: string;
  series: string;
  date: string;
  displayDate: string;
  image: string;
};

export type VacancyItem = {
  id: string;
  title: string;
  type: string;
  department: string;
  closingDate: string;
  closingDateIso: string;
  summary: string;
  requirements: string[];
};

function toDateString(date: Date) {
  return date.toISOString().slice(0, 10);
}

function toMonth(date: Date) {
  return monthFormatter.format(date).toUpperCase();
}

function toDay(date: Date) {
  return String(date.getUTCDate()).padStart(2, "0");
}

function toTime(date: Date) {
  return timeFormatter.format(date);
}

function toEventDisplayDate(startsAt: Date, endsAt: Date | null) {
  if (endsAt) {
    const sameDay = toDateString(startsAt) === toDateString(endsAt);

    return sameDay
      ? `${longDateFormatter.format(startsAt)} - ${toTime(startsAt)}`
      : `${longDateFormatter.format(startsAt)} - ${longDateFormatter.format(endsAt)}`;
  }

  return `${longDateFormatter.format(startsAt)} - ${toTime(startsAt)}`;
}

function toMlagaDateTime(startsAt: Date) {
  return `${shortWeekdayDateFormatter.format(startsAt)} | ${toTime(startsAt)}`;
}

async function getChurchId() {
  const church = await getChurchOrThrow();
  return church.id;
}

export async function getDistricts(): Promise<DistrictItem[]> {
  const churchId = await getChurchId();
  const districts = await prisma.district.findMany({
    where: { churchId },
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      area: true,
      description: true,
      imageUrl: true,
    },
  });

  return districts.map((district) => ({
    id: district.id,
    name: district.name,
    area: district.area ?? "",
    description: district.description ?? "",
    image: district.imageUrl ?? fallbackContentImage,
  }));
}

export async function getEvents() {
  const churchId = await getChurchId();
  const today = toDateString(new Date());
  const rows = await prisma.event.findMany({
    where: {
      churchId,
      status: "PUBLISHED",
    },
    orderBy: { startsAt: "asc" },
    select: {
      id: true,
      title: true,
      description: true,
      startsAt: true,
      endsAt: true,
      venue: true,
      audience: true,
      contact: true,
    },
  });

  const events = rows.map<EventItem>((event) => ({
    id: event.id,
    month: toMonth(event.startsAt),
    day: toDay(event.startsAt),
    title: event.title,
    date: toDateString(event.startsAt),
    displayDate: toEventDisplayDate(event.startsAt, event.endsAt),
    venue: event.venue,
    description: event.description,
    audience: event.audience ?? "All members and visitors",
    contact: event.contact ?? "Church Office",
  }));

  return {
    upcomingEvents: events.filter((event) => event.date >= today),
    pastEvents: events
      .filter((event) => event.date < today)
      .sort((first, second) => second.date.localeCompare(first.date)),
  };
}

export async function getHomeEvents(limit = 3): Promise<HomeEventItem[]> {
  const { upcomingEvents } = await getEvents();

  return upcomingEvents.slice(0, limit).map((event) => ({
    id: event.id,
    month: event.month,
    day: event.day,
    title: event.title,
    detail: event.displayDate,
    place: event.venue,
  }));
}

export async function getMlagaSchedule(limit?: number): Promise<MlagaItem[]> {
  const churchId = await getChurchId();
  const rows = await prisma.mlagaSchedule.findMany({
    where: { churchId },
    orderBy: { startsAt: "asc" },
    take: limit,
    select: {
      id: true,
      host: true,
      preacher: true,
      venue: true,
      startsAt: true,
      district: {
        select: {
          name: true,
          area: true,
        },
      },
    },
  });

  return rows.map((item) => {
    const districtName = item.district?.name ?? "District";

    return {
      id: item.id,
      name: districtName,
      district: districtName,
      area: item.district?.area ?? item.venue,
      host: item.host,
      preacher: item.preacher,
      date: weekdayDateFormatter.format(item.startsAt),
      time: toTime(item.startsAt),
      dateTime: toMlagaDateTime(item.startsAt),
      venue: item.venue,
      location: item.venue,
    };
  });
}

export async function getNewsItems(): Promise<NewsItem[]> {
  const churchId = await getChurchId();
  const rows = await prisma.newsArticle.findMany({
    where: {
      churchId,
      status: "PUBLISHED",
    },
    orderBy: { publishedAt: "desc" },
    select: {
      id: true,
      title: true,
      publishedAt: true,
      imageUrl: true,
    },
  });

  return rows.map((item) => {
    const publishedAt = item.publishedAt ?? new Date();

    return {
      id: item.id,
      title: item.title,
      date: toDateString(publishedAt),
      displayDate: shortDateFormatter.format(publishedAt),
      image: item.imageUrl ?? fallbackContentImage,
    };
  });
}

export async function getSermons(limit?: number): Promise<SermonItem[]> {
  const churchId = await getChurchId();
  const rows = await prisma.sermon.findMany({
    where: {
      churchId,
      status: "PUBLISHED",
    },
    orderBy: { preachedAt: "desc" },
    take: limit,
    select: {
      id: true,
      title: true,
      passage: true,
      preacher: true,
      series: true,
      preachedAt: true,
      imageUrl: true,
    },
  });

  return rows.map((sermon) => ({
    id: sermon.id,
    title: sermon.title,
    passage: sermon.passage,
    preacher: sermon.preacher,
    series: sermon.series ?? "Sermons",
    date: toDateString(sermon.preachedAt),
    displayDate: shortDateFormatter.format(sermon.preachedAt),
    image: sermon.imageUrl ?? fallbackContentImage,
  }));
}

export async function getVacancies(): Promise<VacancyItem[]> {
  const churchId = await getChurchId();
  const rows = await prisma.vacancy.findMany({
    where: {
      churchId,
      status: "PUBLISHED",
    },
    orderBy: { closingAt: "asc" },
    select: {
      id: true,
      title: true,
      type: true,
      department: true,
      summary: true,
      requirements: true,
      closingAt: true,
    },
  });

  return rows.map((vacancy) => {
    const closingAt = vacancy.closingAt ?? new Date();

    return {
      id: vacancy.id,
      title: vacancy.title,
      type: vacancy.type,
      department: vacancy.department,
      closingDate: longDateFormatter.format(closingAt),
      closingDateIso: toDateString(closingAt),
      summary: vacancy.summary,
      requirements: vacancy.requirements,
    };
  });
}

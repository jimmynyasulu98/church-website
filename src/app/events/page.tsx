import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

const pageUrl = "https://ccapzomba.org/events";

export const metadata: Metadata = {
  title: "Events | CCAP Zomba",
  description:
    "View CCAP Zomba church events, conferences, fellowship meetings, communion services and anniversary gatherings.",
  alternates: {
    canonical: "/events",
  },
  keywords: [
    "CCAP Zomba events",
    "Zomba church events",
    "CCAP youth conference",
    "CCAP fellowship meeting",
    "CCAP communion Sunday",
  ],
  openGraph: {
    title: "Events | CCAP Zomba",
    description:
      "Explore upcoming and recent events at CCAP Zomba, including worship, fellowship and special church gatherings.",
    url: pageUrl,
    siteName: "CCAP Zomba",
    type: "website",
  },
};

const events = [
  {
    month: "MAY",
    day: "18",
    title: "Youth Conference 2026",
    date: "2026-05-18",
    displayDate: "18 May 2026 - 20 May 2026",
    venue: "CCAP Zomba Main Hall",
    description:
      "A youth gathering for worship, teaching, prayer and fellowship.",
  },
  {
    month: "MAY",
    day: "26",
    title: "Women's Fellowship",
    date: "2026-05-26",
    displayDate: "26 May 2026 - 10:00 AM",
    venue: "District 2",
    description:
      "A fellowship meeting for women to grow in faith and service.",
  },
  {
    month: "JUN",
    day: "02",
    title: "Communion Sunday",
    date: "2026-06-02",
    displayDate: "02 June 2026 - All Services",
    venue: "CCAP Zomba",
    description:
      "A communion service across the Sunday worship gatherings.",
  },
  {
    month: "JUN",
    day: "16",
    title: "Men's Fellowship Meeting",
    date: "2026-06-16",
    displayDate: "16 June 2026 - 2:00 PM",
    venue: "District 3",
    description: "A meeting for men focused on discipleship and purpose.",
  },
  {
    month: "JUN",
    day: "30",
    title: "Church Anniversary",
    date: "2026-06-30",
    displayDate: "30 June 2026 - All Day",
    venue: "CCAP Zomba",
    description:
      "A church-wide celebration of God's faithfulness to CCAP Zomba.",
  },
];

const faqs = [
  {
    question: "Where can I find CCAP Zomba upcoming events?",
    answer:
      "CCAP Zomba events are listed on this page with dates, venues and details for conferences, fellowship meetings and worship gatherings.",
  },
  {
    question: "How do I get details for a CCAP Zomba event?",
    answer:
      "Use the event details link or contact the church office for confirmation, directions and participation information.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: "Events | CCAP Zomba",
      description: metadata.description,
      isPartOf: {
        "@type": "WebSite",
        name: "CCAP Zomba",
        url: "https://ccapzomba.org",
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://ccapzomba.org",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Events",
          item: pageUrl,
        },
      ],
    },
    {
      "@type": "ItemList",
      name: "CCAP Zomba Events",
      itemListElement: events.map((event, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Event",
          name: event.title,
          startDate: event.date,
          description: event.description,
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          eventStatus: "https://schema.org/EventScheduled",
          location: {
            "@type": "Place",
            name: event.venue,
            address: {
              "@type": "PostalAddress",
              addressLocality: "Zomba",
              addressCountry: "MW",
            },
          },
          organizer: {
            "@type": "Church",
            name: "CCAP Zomba",
            url: "https://ccapzomba.org",
          },
        },
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

export default function EventsPage() {
  return (
    <div className="bg-white text-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section
        className="relative overflow-hidden bg-cover bg-center text-white"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1800&q=85)",
        }}
      >
        <div className="absolute inset-0 bg-primary/72" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/50 to-primary/10" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black uppercase tracking-tight sm:text-5xl">
            Events
          </h1>
          <nav
            aria-label="Breadcrumb"
            className="mt-4 flex items-center gap-2 text-sm font-bold text-white/90"
          >
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
            <span>Events</span>
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-4 text-sm font-black">
            <span className="border-b-2 border-accent pb-2 text-accent">
              Upcoming Events
            </span>
            <span className="pb-2 text-slate-500">Past Events</span>
          </div>
          <Link
            href="/#contact"
            className="text-sm font-black text-accent transition hover:text-primary"
          >
            View Calendar
          </Link>
        </div>

        <div className="overflow-hidden rounded-md border border-slate-200 bg-white">
          {events.map((event) => (
            <article
              key={event.title}
              className="grid gap-5 border-b border-slate-200 px-5 py-5 last:border-b-0 sm:grid-cols-[80px_1fr_auto] sm:items-center"
            >
              <div className="w-20 rounded-md border border-slate-200 bg-white py-3 text-center">
                <p className="text-xs font-black text-accent">{event.month}</p>
                <p className="text-3xl font-black">{event.day}</p>
              </div>
              <div>
                <h2 className="text-base font-black text-accent">
                  {event.title}
                </h2>
                <p className="mt-1 text-sm font-semibold text-slate-700">
                  <time dateTime={event.date}>{event.displayDate}</time>
                </p>
                <p className="mt-1 text-sm text-slate-600">{event.venue}</p>
              </div>
              <Link
                href="/#contact"
                className="text-sm font-black text-accent transition hover:text-primary"
              >
                View Details +
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button asChild className="h-12 rounded-sm bg-accent px-8 font-black">
            <Link href="/#contact">
              <CalendarDays className="mr-2 h-4 w-4" aria-hidden="true" />
              View All Events
            </Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-5 border-t border-slate-200 pt-8 md:grid-cols-2">
          {faqs.map((faq) => (
            <article key={faq.question}>
              <h2 className="text-lg font-black">{faq.question}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {faq.answer}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

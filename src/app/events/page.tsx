import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { EventsBrowser } from "@/components/media/events-browser";
import { absoluteUrl, siteConfig } from "@/lib/site";

const pageUrl = absoluteUrl("/events");

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

const upcomingEvents = [
  {
    month: "MAY",
    day: "18",
    title: "Youth Conference 2026",
    date: "2026-05-18",
    displayDate: "18 May 2026 - 20 May 2026",
    venue: "CCAP Zomba Main Hall",
    description:
      "A youth gathering for worship, teaching, prayer and fellowship.",
    audience: "Youth, young adults and ministry leaders",
    contact: "Youth Ministry",
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
    audience: "Women and invited guests",
    contact: "Women's Fellowship",
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
    audience: "All members and visitors",
    contact: "Church Office",
  },
  {
    month: "JUN",
    day: "16",
    title: "Men's Fellowship Meeting",
    date: "2026-06-16",
    displayDate: "16 June 2026 - 2:00 PM",
    venue: "District 3",
    description: "A meeting for men focused on discipleship and purpose.",
    audience: "Men's Fellowship members and guests",
    contact: "Men's Fellowship",
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
    audience: "All congregants, families and invited guests",
    contact: "Church Office",
  },
];

const pastEvents = [
  {
    month: "APR",
    day: "21",
    title: "Easter Celebration Service",
    date: "2026-04-21",
    displayDate: "21 April 2026 - All Services",
    venue: "CCAP Zomba",
    description:
      "A worship celebration remembering the resurrection of Jesus Christ.",
    audience: "All members and visitors",
    contact: "Church Office",
  },
  {
    month: "APR",
    day: "14",
    title: "Sunday School Teachers Workshop",
    date: "2026-04-14",
    displayDate: "14 April 2026 - 9:00 AM",
    venue: "CCAP Zomba Classrooms",
    description:
      "A training workshop for Sunday School teachers and helpers.",
    audience: "Sunday School teachers and volunteers",
    contact: "Sunday School Ministry",
  },
  {
    month: "MAR",
    day: "30",
    title: "District Fellowship Sunday",
    date: "2026-03-30",
    displayDate: "30 March 2026 - 2:00 PM",
    venue: "District Host Homes",
    description:
      "A district-level fellowship gathering for prayer and encouragement.",
    audience: "District members and families",
    contact: "District Leadership",
  },
];

const events = [...upcomingEvents, ...pastEvents];

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
        name: siteConfig.name,
        url: siteConfig.url,
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteConfig.url,
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
          eventStatus:
            event.date < "2026-05-03"
              ? "https://schema.org/EventCompleted"
              : "https://schema.org/EventScheduled",
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
            name: siteConfig.name,
            url: siteConfig.url,
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

      <EventsBrowser
        upcomingEvents={upcomingEvents}
        pastEvents={pastEvents}
      />

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

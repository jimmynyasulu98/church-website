import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { EventsBrowser } from "@/components/media/events-browser";
import { getEvents, type EventItem } from "@/lib/content";
import { absoluteUrl, siteConfig } from "@/lib/site";

const pageUrl = absoluteUrl("/events");

export const dynamic = "force-dynamic";

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

function getStructuredData(events: EventItem[]) {
  return {
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
              new Date(event.date) < new Date()
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
}

export default async function EventsPage() {
  const { upcomingEvents, pastEvents } = await getEvents();
  const structuredData = getStructuredData([...upcomingEvents, ...pastEvents]);

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

      <EventsBrowser upcomingEvents={upcomingEvents} pastEvents={pastEvents} />

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

import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  CalendarDays,
  ChevronRight,
  Clock3,
  MapPin,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const pageUrl = "https://ccapzomba.org/mlaga";

export const metadata: Metadata = {
  title: "Mlaga Schedule | CCAP Zomba",
  description:
    "View this week's CCAP Zomba Mlaga schedule with district hosts, preachers, dates, times and venues for midweek prayer, fellowship and Bible study.",
  alternates: {
    canonical: "/mlaga",
  },
  keywords: [
    "CCAP Zomba Mlaga",
    "Mlaga schedule",
    "CCAP Zomba district fellowship",
    "Zomba Bible study",
    "CCAP midweek prayer",
    "church fellowship in Zomba",
  ],
  openGraph: {
    title: "Mlaga Schedule | CCAP Zomba",
    description:
      "Find this week's Mlaga hosts, preachers, dates, times and venues for CCAP Zomba districts.",
    url: pageUrl,
    siteName: "CCAP Zomba",
    type: "website",
  },
};

const mlagaSchedule = [
  {
    district: "District 1",
    area: "Chinamwali",
    host: "Mr. Banda",
    preacher: "Elder Phiri",
    dateTime: "Wed, 15 May | 6:00 PM",
    venue: "Chinamwali",
  },
  {
    district: "District 2",
    area: "Ndirande",
    host: "Mrs. Kachale",
    preacher: "Elder Chirimwemwe",
    dateTime: "Wed, 15 May | 6:00 PM",
    venue: "Chipembere",
  },
  {
    district: "District 3",
    area: "Kadango",
    host: "Mr. Jere",
    preacher: "Deaconess Thoko",
    dateTime: "Wed, 15 May | 6:00 PM",
    venue: "Kadango",
  },
  {
    district: "District 4",
    area: "Zomba Town",
    host: "Mrs. Mvula",
    preacher: "Elder Mambo",
    dateTime: "Wed, 15 May | 6:00 PM",
    venue: "Zomba Town",
  },
  {
    district: "District 5",
    area: "Mt. Bise",
    host: "Mr. Phiri",
    preacher: "Rev. Chigona",
    dateTime: "Wed, 15 May | 6:00 PM",
    venue: "Mt. Bise",
  },
  {
    district: "District 6",
    area: "Kachere",
    host: "Mrs. Lungu",
    preacher: "Elder Mbewe",
    dateTime: "Wed, 15 May | 6:00 PM",
    venue: "Kachere",
  },
];

const faqs = [
  {
    question: "What is Mlaga at CCAP Zomba?",
    answer:
      "Mlaga is CCAP Zomba's midweek gathering for prayer, fellowship and the Word, usually organized through church districts.",
  },
  {
    question: "When does Mlaga happen?",
    answer:
      "The listed Mlaga meetings are scheduled for Wednesday at 6:00 PM across the six CCAP Zomba districts.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: "Mlaga Schedule | CCAP Zomba",
      description: metadata.description,
      isPartOf: {
        "@type": "WebSite",
        name: "CCAP Zomba",
        url: "https://ccapzomba.org",
      },
      about: {
        "@type": "Church",
        name: "CCAP Zomba",
        url: "https://ccapzomba.org",
        email: "info@ccapzomba.org",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Zomba",
          addressCountry: "MW",
        },
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
          name: "Mlaga",
          item: pageUrl,
        },
      ],
    },
    {
      "@type": "ItemList",
      name: "This Week's CCAP Zomba Mlaga",
      numberOfItems: mlagaSchedule.length,
      itemListElement: mlagaSchedule.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `${item.district} Mlaga`,
        description: `${item.district} meets at ${item.venue}. Host: ${item.host}. Preacher: ${item.preacher}. Time: ${item.dateTime}.`,
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

export default function MlagaPage() {
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
            "url(https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1800&q=85)",
        }}
      >
        <div className="absolute inset-0 bg-primary/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/56 to-primary/10" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black uppercase tracking-tight sm:text-5xl">
            Mlaga
          </h1>
          <nav
            aria-label="Breadcrumb"
            className="mt-4 flex items-center gap-2 text-sm font-bold text-white/90"
          >
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
            <span>Mlaga</span>
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-3xl">
            <p className="text-sm font-extrabold uppercase tracking-wide text-accent">
              Midweek Fellowship
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight">
              This Week&apos;s Mlaga
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-700">
              Mlaga is our midweek gathering for prayer, fellowship and the
              Word. It is held at district level and rotates in members&apos;
              homes so the church can grow together in faith and unity.
            </p>
          </div>
          <Button asChild className="h-12 rounded-sm bg-accent px-7 font-black">
            <Link href="/#contact">
              <CalendarDays className="mr-2 h-4 w-4" aria-hidden="true" />
              Notify Mlaga Hosts
            </Link>
          </Button>
        </div>

        <div className="mt-8 overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
          <div className="hidden grid-cols-[1.2fr_1fr_1.15fr_1.15fr_1fr] border-b border-slate-200 bg-slate-50 px-5 py-4 text-sm font-black text-slate-600 md:grid">
            <span>District</span>
            <span>Host</span>
            <span>Preacher</span>
            <span>Date &amp; Time</span>
            <span>Venue</span>
          </div>
          <div className="divide-y divide-slate-200">
            {mlagaSchedule.map((item) => (
              <article
                key={item.district}
                className="grid gap-4 px-5 py-5 md:grid-cols-[1.2fr_1fr_1.15fr_1.15fr_1fr] md:items-center"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-blue-50 text-accent">
                    <BookOpen className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-black">{item.district}</h3>
                    <p className="text-sm text-slate-600">{item.area}</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-slate-700">
                  <span className="mr-2 font-black text-primary md:hidden">
                    Host:
                  </span>
                  {item.host}
                </p>
                <p className="text-sm font-semibold text-slate-700">
                  <span className="mr-2 font-black text-primary md:hidden">
                    Preacher:
                  </span>
                  {item.preacher}
                </p>
                <p className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Clock3 className="h-4 w-4 text-accent md:hidden" />
                  {item.dateTime}
                </p>
                <p className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <MapPin className="h-4 w-4 text-accent md:hidden" />
                  {item.venue}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div
          className="overflow-hidden rounded-md bg-cover bg-center shadow-xl shadow-slate-200"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(11,31,58,0.98) 0%, rgba(11,31,58,0.86) 55%, rgba(11,31,58,0.42) 100%), url(https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=85)",
          }}
        >
          <div className="grid gap-5 px-6 py-7 text-white sm:grid-cols-[1fr_auto] sm:items-center sm:px-8">
            <div>
              <h2 className="text-2xl font-black">Join your district this Wednesday</h2>
              <p className="mt-2 text-sm leading-6 text-blue-50">
                Mlaga is more than a meeting. It is a place of encounter,
                growth and unity.
              </p>
            </div>
            <Button asChild className="h-12 rounded-sm bg-accent px-7 font-black">
              <Link href="/districts">Find Your District</Link>
            </Button>
          </div>
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

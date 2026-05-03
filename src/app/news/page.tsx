import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Newspaper } from "lucide-react";

import { Button } from "@/components/ui/button";

const pageUrl = "https://ccapzomba.org/news";

export const metadata: Metadata = {
  title: "News | CCAP Zomba",
  description:
    "Read the latest CCAP Zomba church news, announcements, fellowship updates, baptism reports and ministry stories.",
  alternates: {
    canonical: "/news",
  },
  keywords: [
    "CCAP Zomba news",
    "Zomba church news",
    "CCAP announcements",
    "CCAP Zomba baptism",
    "CCAP Zomba fellowship updates",
  ],
  openGraph: {
    title: "News | CCAP Zomba",
    description:
      "Latest news and ministry updates from CCAP Zomba in Zomba, Malawi.",
    url: pageUrl,
    siteName: "CCAP Zomba",
    type: "website",
  },
};

const newsItems = [
  {
    title: "CCAP Zomba Hosts Successful Youth Conference",
    date: "2026-05-18",
    displayDate: "18 May 2026",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Baptism Service Brings Joy to Many Families",
    date: "2026-05-10",
    displayDate: "10 May 2026",
    image:
      "https://images.unsplash.com/photo-1515169067865-5387ec356754?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Women's Fellowship Outreach Program",
    date: "2026-05-03",
    displayDate: "3 May 2026",
    image:
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Church Renovation Project Underway",
    date: "2026-04-28",
    displayDate: "28 Apr 2026",
    image:
      "https://images.unsplash.com/photo-1520637836862-4d197d17c36a?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Sunday School Easter Celebration",
    date: "2026-04-15",
    displayDate: "15 Apr 2026",
    image:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "New Members Welcome Service",
    date: "2026-04-07",
    displayDate: "7 Apr 2026",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
  },
];

const faqs = [
  {
    question: "What kind of news does CCAP Zomba publish?",
    answer:
      "CCAP Zomba publishes church announcements, ministry updates, event reports, baptism news, fellowship stories and community outreach updates.",
  },
  {
    question: "Where can I find recent CCAP Zomba announcements?",
    answer:
      "Recent announcements and stories are listed on the News page and may also be shared during Sunday services.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: "News | CCAP Zomba",
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
          name: "News",
          item: pageUrl,
        },
      ],
    },
    {
      "@type": "ItemList",
      name: "CCAP Zomba News",
      itemListElement: newsItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "NewsArticle",
          headline: item.title,
          datePublished: item.date,
          image: item.image,
          author: {
            "@type": "Organization",
            name: "CCAP Zomba",
          },
          publisher: {
            "@type": "Organization",
            name: "CCAP Zomba",
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

export default function NewsPage() {
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
            "url(https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1800&q=85)",
        }}
      >
        <div className="absolute inset-0 bg-primary/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/86 via-primary/50 to-primary/10" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black uppercase tracking-tight sm:text-5xl">
            News
          </h1>
          <nav
            aria-label="Breadcrumb"
            className="mt-4 flex items-center gap-2 text-sm font-bold text-white/90"
          >
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
            <span>News</span>
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {newsItems.map((item) => (
            <article
              key={item.title}
              className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200"
            >
              <div
                className="h-44 bg-cover bg-center"
                style={{ backgroundImage: `url(${item.image})` }}
                aria-label={item.title}
              />
              <div className="p-5">
                <h2 className="text-base font-black leading-6">{item.title}</h2>
                <p className="mt-3 text-sm text-slate-600">
                  <time dateTime={item.date}>{item.displayDate}</time>
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button asChild className="h-12 rounded-sm bg-accent px-8 font-black">
            <Link href="/#contact">
              <Newspaper className="mr-2 h-4 w-4" aria-hidden="true" />
              View All News
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

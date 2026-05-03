import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Play } from "lucide-react";

import { Button } from "@/components/ui/button";

const pageUrl = "https://ccapzomba.org/sermons";

export const metadata: Metadata = {
  title: "Sermons | CCAP Zomba",
  description:
    "Watch and browse CCAP Zomba sermons by topic, Bible passage, preacher and date.",
  alternates: {
    canonical: "/sermons",
  },
  keywords: [
    "CCAP Zomba sermons",
    "Zomba church sermons",
    "CCAP sermon videos",
    "Malawi Presbyterian sermons",
    "CCAP preaching",
  ],
  openGraph: {
    title: "Sermons | CCAP Zomba",
    description:
      "Latest sermons from CCAP Zomba, including Bible passages, preachers and watch links.",
    url: pageUrl,
    siteName: "CCAP Zomba",
    type: "website",
  },
};

const sermons = [
  {
    title: "Walking by Faith",
    passage: "2 Corinthians 5:7",
    preacher: "Rev. John Phiri",
    date: "2026-05-12",
    displayDate: "12 May 2026",
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "The Power of Prayer",
    passage: "Philippians 4:6-7",
    preacher: "Elder Chirimwemwe",
    date: "2026-05-05",
    displayDate: "5 May 2026",
    image:
      "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Grace That Saves",
    passage: "Ephesians 2:8-9",
    preacher: "Rev. John Phiri",
    date: "2026-04-28",
    displayDate: "28 Apr 2026",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Trust in the Lord",
    passage: "Proverbs 3:5-6",
    preacher: "Elder Phiri",
    date: "2026-04-21",
    displayDate: "21 Apr 2026",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Living a Holy Life",
    passage: "1 Peter 1:15-16",
    preacher: "Rev. John Phiri",
    date: "2026-04-14",
    displayDate: "14 Apr 2026",
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=700&q=80",
  },
];

const faqs = [
  {
    question: "Where can I watch CCAP Zomba sermons?",
    answer:
      "CCAP Zomba sermons are listed on the Sermons page with titles, Bible passages, preachers and watch links.",
  },
  {
    question: "Can sermons be browsed by preacher or series?",
    answer:
      "The Sermons page is organized for browsing latest sermons, series and preachers as the sermon archive grows.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: "Sermons | CCAP Zomba",
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
          name: "Sermons",
          item: pageUrl,
        },
      ],
    },
    {
      "@type": "ItemList",
      name: "CCAP Zomba Sermons",
      itemListElement: sermons.map((sermon, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: sermon.title,
          datePublished: sermon.date,
          about: sermon.passage,
          creator: {
            "@type": "Person",
            name: sermon.preacher,
          },
          publisher: {
            "@type": "Church",
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

export default function SermonsPage() {
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
            "url(https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1800&q=85)",
        }}
      >
        <div className="absolute inset-0 bg-primary/78" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/62 to-primary/20" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mb-5 h-1 w-14 rounded-full bg-accent" />
          <h1 className="text-4xl font-black uppercase tracking-tight sm:text-5xl">
            Sermons
          </h1>
          <p className="mt-3 max-w-xl text-sm font-bold text-blue-50">
            Listen, watch and be blessed.
          </p>
          <nav
            aria-label="Breadcrumb"
            className="mt-4 flex items-center gap-2 text-sm font-bold text-white/90"
          >
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
            <span>Sermons</span>
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap gap-6 text-sm font-black">
          <span className="border-b-2 border-accent pb-2 text-accent">
            Latest Sermons
          </span>
          <span className="pb-2 text-slate-500">By Series</span>
          <span className="pb-2 text-slate-500">By Preacher</span>
        </div>

        <div className="overflow-hidden rounded-md border border-slate-200 bg-white">
          {sermons.map((sermon) => (
            <article
              key={sermon.title}
              className="grid gap-4 border-b border-slate-200 px-4 py-4 last:border-b-0 sm:grid-cols-[120px_1fr_auto] sm:items-center"
            >
              <div
                className="h-24 rounded-md bg-cover bg-center sm:h-20"
                style={{ backgroundImage: `url(${sermon.image})` }}
                aria-label={`${sermon.title} sermon`}
              />
              <div>
                <h2 className="text-base font-black">{sermon.title}</h2>
                <p className="mt-1 text-sm font-semibold text-slate-700">
                  {sermon.passage}
                </p>
                <p className="mt-1 text-sm text-slate-600">{sermon.preacher}</p>
                <p className="mt-1 text-sm text-slate-600">
                  <time dateTime={sermon.date}>{sermon.displayDate}</time>
                </p>
              </div>
              <Button
                asChild
                variant="outline"
                className="h-10 rounded-sm border-accent px-5 font-black text-accent"
              >
                <Link href="/#contact">
                  <Play className="mr-2 h-4 w-4" aria-hidden="true" />
                  Watch
                </Link>
              </Button>
            </article>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button asChild className="h-12 rounded-sm bg-accent px-8 font-black">
            <Link href="/#contact">View All Sermons</Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
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

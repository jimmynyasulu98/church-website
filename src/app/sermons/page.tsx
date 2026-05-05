import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { SermonsBrowser } from "@/components/media/sermons-browser";
import { getSermons, type SermonItem } from "@/lib/content";
import { absoluteUrl, siteConfig } from "@/lib/site";

const pageUrl = absoluteUrl("/sermons");

export const dynamic = "force-dynamic";

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

function getStructuredData(sermons: SermonItem[]) {
  return {
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
            genre: sermon.series,
            creator: {
              "@type": "Person",
              name: sermon.preacher,
            },
            publisher: {
              "@type": "Church",
              name: siteConfig.name,
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

export default async function SermonsPage() {
  const sermons = await getSermons();
  const structuredData = getStructuredData(sermons);

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

      <SermonsBrowser sermons={sermons} />

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

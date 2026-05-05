import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Newspaper } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getNewsItems, type NewsItem } from "@/lib/content";
import { absoluteUrl, siteConfig } from "@/lib/site";

const pageUrl = absoluteUrl("/news");

export const dynamic = "force-dynamic";

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

function getStructuredData(newsItems: NewsItem[]) {
  return {
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
              name: siteConfig.name,
            },
            publisher: {
              "@type": "Organization",
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

export default async function NewsPage() {
  const newsItems = await getNewsItems();
  const structuredData = getStructuredData(newsItems);

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
              key={item.id}
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
            <Link href="/contact">
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

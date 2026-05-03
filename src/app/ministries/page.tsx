import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { absoluteUrl, siteConfig } from "@/lib/site";

const pageUrl = absoluteUrl("/ministries");

export const metadata: Metadata = {
  title: "Ministries | CCAP Zomba",
  description:
    "Explore CCAP Zomba ministries including praise team, choirs, Sunday School, women's fellowship, men's fellowship, youth ministry and ushering ministry.",
  alternates: {
    canonical: "/ministries",
  },
  keywords: [
    "CCAP Zomba ministries",
    "Zomba church ministries",
    "CCAP youth ministry",
    "CCAP Sunday School",
    "church choirs in Zomba",
    "CCAP women's fellowship",
  ],
  openGraph: {
    title: "Ministries | CCAP Zomba",
    description:
      "Find a place to serve and grow through the ministries of CCAP Zomba.",
    url: pageUrl,
    siteName: "CCAP Zomba",
    type: "website",
  },
};

const ministries = [
  {
    name: "Praise Team",
    description: "Leading the church in worship.",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Nvana Choir",
    description: "Uplifting the church through song.",
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Chigwirizano Choir",
    description: "Bringing voices together in unity.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Sunday School",
    description: "Teaching the next generation.",
    image:
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Women's Fellowship",
    description: "Empowering women to grow in Christ.",
    image:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Men's Fellowship",
    description: "Building godly men of purpose.",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Youth Ministry",
    description: "Raising a generation that fears God.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Ushering Ministry",
    description: "Serving with excellence and a joyful heart.",
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=700&q=80",
  },
];

const faqs = [
  {
    question: "What ministries are available at CCAP Zomba?",
    answer:
      "CCAP Zomba has worship, choir, Sunday School, women's fellowship, men's fellowship, youth and ushering ministries.",
  },
  {
    question: "How can I join a ministry at CCAP Zomba?",
    answer:
      "You can contact the church office or speak with a ministry leader after a Sunday service to find a place to serve.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: "Ministries | CCAP Zomba",
      description: metadata.description,
      isPartOf: {
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.url,
      },
      about: {
        "@type": "Church",
        name: siteConfig.name,
        url: siteConfig.url,
        email: siteConfig.email,
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
          item: siteConfig.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Ministries",
          item: pageUrl,
        },
      ],
    },
    {
      "@type": "ItemList",
      name: "CCAP Zomba Ministries",
      itemListElement: ministries.map((ministry, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: ministry.name,
        description: ministry.description,
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

export default function MinistriesPage() {
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
            "url(https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1800&q=85)",
        }}
      >
        <div className="absolute inset-0 bg-primary/68" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/58 to-primary/15" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black uppercase tracking-tight sm:text-5xl">
            Ministries
          </h1>
          <nav
            aria-label="Breadcrumb"
            className="mt-4 flex items-center gap-2 text-sm font-bold text-white/90"
          >
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
            <span>Ministries</span>
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-extrabold uppercase tracking-wide text-accent">
            Serve and Grow
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            Find your place in the life of the church
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-700">
            We have various ministries that help us fulfill our mission and
            serve in different areas of the church. Each ministry creates space
            for worship, discipleship, fellowship and service.
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ministries.map((ministry) => (
            <article
              key={ministry.name}
              className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200"
            >
              <div
                className="h-40 bg-cover bg-center"
                style={{ backgroundImage: `url(${ministry.image})` }}
                aria-label={`${ministry.name} at CCAP Zomba`}
              />
              <div className="p-5">
                <h3 className="text-base font-black">{ministry.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {ministry.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 rounded-md bg-primary px-6 py-7 text-white shadow-xl shadow-slate-200 sm:grid-cols-[1fr_auto] sm:items-center sm:px-8">
          <div>
            <h2 className="text-2xl font-black">Want to join a ministry?</h2>
            <p className="mt-2 text-sm leading-6 text-blue-50">
              There is a place for you to serve and grow at CCAP Zomba.
            </p>
          </div>
          <Button asChild className="h-12 rounded-sm bg-accent px-7 font-black">
            <Link href="/#contact">
              <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
              Contact Us
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

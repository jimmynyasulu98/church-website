import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import {
  SendCvButton,
  VacanciesList,
} from "@/components/vacancies/vacancies-list";
import { getVacancies, type VacancyItem } from "@/lib/content";
import { absoluteUrl, siteConfig } from "@/lib/site";

const pageUrl = absoluteUrl("/vacancies");

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Vacancies | CCAP Zomba",
  description:
    "View current CCAP Zomba vacancies and church job opportunities, including ministry, finance, administration and choir roles.",
  alternates: {
    canonical: "/vacancies",
  },
  keywords: [
    "CCAP Zomba vacancies",
    "CCAP Zomba jobs",
    "church jobs in Zomba",
    "Malawi church vacancies",
    "CCAP employment opportunities",
  ],
  openGraph: {
    title: "Vacancies | CCAP Zomba",
    description:
      "Current job and ministry service opportunities at CCAP Zomba.",
    url: pageUrl,
    siteName: siteConfig.name,
    type: "website",
  },
};

const faqs = [
  {
    question: "How do I apply for a CCAP Zomba vacancy?",
    answer:
      "Send your CV by email to the church office and include the vacancy title in the subject line.",
  },
  {
    question: "Where are CCAP Zomba vacancies posted?",
    answer:
      "Current church vacancies and service opportunities are posted on the Vacancies page.",
  },
];

function getStructuredData(vacancies: VacancyItem[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Vacancies | CCAP Zomba",
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
            name: "Vacancies",
            item: pageUrl,
          },
        ],
      },
      ...vacancies.map((vacancy) => ({
        "@type": "JobPosting",
        title: vacancy.title,
        description: vacancy.summary,
        datePosted: "2026-05-03",
        validThrough: vacancy.closingDateIso,
        employmentType: vacancy.type === "Full Time" ? "FULL_TIME" : "PART_TIME",
        hiringOrganization: {
          "@type": "Church",
          name: siteConfig.name,
          sameAs: siteConfig.url,
        },
        jobLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            streetAddress: siteConfig.address,
            addressLocality: "Zomba",
            addressCountry: "MW",
          },
        },
      })),
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

export default async function VacanciesPage() {
  const vacancies = await getVacancies();
  const structuredData = getStructuredData(vacancies);

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
        <div className="absolute inset-0 bg-primary/68" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/52 to-primary/10" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black uppercase tracking-tight sm:text-5xl">
            Vacancies
          </h1>
          <nav
            aria-label="Breadcrumb"
            className="mt-4 flex items-center gap-2 text-sm font-bold text-white/90"
          >
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
            <span>Vacancies</span>
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 max-w-2xl">
          <p className="text-sm font-extrabold uppercase tracking-wide text-accent">
            Join Our Team
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight">
            Be part of what God is doing at CCAP Zomba
          </h2>
          <p className="mt-4 text-sm leading-6 text-slate-700">
            Explore current vacancies and ministry service roles. Open each role
            to read the details before sending your CV.
          </p>
        </div>

        <VacanciesList vacancies={vacancies} />

        <div className="mt-8 grid gap-5 rounded-md bg-primary px-6 py-7 text-white shadow-xl shadow-slate-200 sm:grid-cols-[1fr_auto] sm:items-center sm:px-8">
          <div>
            <h2 className="text-2xl font-black">Don&apos;t see the right role?</h2>
            <p className="mt-2 text-sm leading-6 text-blue-50">
              Send us your CV and we&apos;ll keep you in mind.
            </p>
          </div>
          <SendCvButton />
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

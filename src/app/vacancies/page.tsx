import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import {
  SendCvButton,
  VacanciesList,
  type Vacancy,
} from "@/components/vacancies/vacancies-list";
import { absoluteUrl, siteConfig } from "@/lib/site";

const pageUrl = absoluteUrl("/vacancies");

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

const vacancies: Vacancy[] = [
  {
    title: "Youth Ministry Coordinator",
    type: "Full Time",
    department: "Youth Ministry",
    closingDate: "15 June 2026",
    summary:
      "Coordinate youth ministry programs, discipleship activities, meetings and outreach initiatives for CCAP Zomba.",
    requirements: [
      "Active Christian faith and commitment to youth discipleship.",
      "Experience leading youth groups or ministry programs.",
      "Strong communication, planning and teamwork skills.",
    ],
  },
  {
    title: "Accountant",
    type: "Full Time",
    department: "Finance",
    closingDate: "15 June 2026",
    summary:
      "Support church financial administration, reporting, reconciliations and stewardship processes.",
    requirements: [
      "Accounting qualification or relevant finance experience.",
      "Good knowledge of financial records and reporting.",
      "High integrity and attention to detail.",
    ],
  },
  {
    title: "Administrative Assistant",
    type: "Full Time",
    department: "Administration",
    closingDate: "15 June 2026",
    summary:
      "Assist the church office with records, correspondence, scheduling and member support.",
    requirements: [
      "Strong organizational and computer skills.",
      "Professional communication and confidentiality.",
      "Experience in office administration is preferred.",
    ],
  },
  {
    title: "Choir Director",
    type: "Part Time",
    department: "Music Ministry",
    closingDate: "15 June 2026",
    summary:
      "Lead choir rehearsals, coordinate music selections and support worship services.",
    requirements: [
      "Experience directing a church choir or worship group.",
      "Ability to read or arrange music is an advantage.",
      "Commitment to worship ministry and teamwork.",
    ],
  },
];

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

const structuredData = {
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
      validThrough: "2026-06-15",
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

export default function VacanciesPage() {
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

import type { Metadata } from "next";
import Link from "next/link";
import {
  Banknote,
  ChevronRight,
  ClipboardList,
  HandCoins,
  HeartHandshake,
  Landmark,
  ReceiptText,
} from "lucide-react";

import { ReceiptUploadForm } from "@/components/giving/receipt-upload-form";
import { absoluteUrl, siteConfig } from "@/lib/site";

const pageUrl = absoluteUrl("/giving");

export const metadata: Metadata = {
  title: "Giving & Upload Receipt | CCAP Zomba",
  description:
    "Give to CCAP Zomba by bank deposit and upload your receipt for tithes, offerings and pledges.",
  alternates: {
    canonical: "/giving",
  },
  keywords: [
    "CCAP Zomba giving",
    "CCAP Zomba upload receipt",
    "CCAP Zomba tithes",
    "CCAP Zomba offerings",
    "CCAP Zomba pledges",
  ],
  openGraph: {
    title: "Giving & Upload Receipt | CCAP Zomba",
    description:
      "Bank details and receipt upload form for CCAP Zomba tithes, offerings and pledges.",
    url: pageUrl,
    siteName: siteConfig.name,
    type: "website",
  },
};

const givingOptions = [
  { label: "Tithes", icon: HandCoins },
  { label: "Offerings", icon: HeartHandshake },
  { label: "Pledges", icon: ClipboardList },
];

const bankDetails = [
  ["Bank", "NBS Bank"],
  ["Account Name", "CCAP Zomba Presbytery"],
  ["Account Number", "1560201000"],
  ["Branch", "Zomba Branch"],
];

const faqs = [
  {
    question: "How do I upload a CCAP Zomba giving receipt?",
    answer:
      "Use the upload receipt form on this page after making your bank deposit. Add your name, phone number, district, giving type, amount and receipt file.",
  },
  {
    question: "What can I give online for CCAP Zomba?",
    answer:
      "You can submit receipts for tithes, offerings, pledges, thanksgiving gifts and other giving support for the church.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: "Giving & Upload Receipt | CCAP Zomba",
      description: metadata.description,
      isPartOf: {
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.url,
      },
      about: {
        "@type": "DonateAction",
        name: "Give to CCAP Zomba",
        recipient: {
          "@type": "Church",
          name: siteConfig.name,
          url: siteConfig.url,
          email: siteConfig.email,
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
          name: "Giving",
          item: pageUrl,
        },
      ],
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

export default function GivingPage() {
  return (
    <div className="bg-slate-50 text-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-black uppercase tracking-tight sm:text-4xl">
            Giving / Upload Receipt
          </h1>
          <nav
            aria-label="Breadcrumb"
            className="mt-3 flex items-center gap-2 text-sm font-bold text-slate-600"
          >
            <Link href="/" className="transition hover:text-accent">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
            <span>Giving</span>
          </nav>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[0.85fr_1.25fr_0.9fr] lg:px-8">
        <aside className="rounded-md bg-primary p-8 text-white shadow-xl shadow-slate-200">
          <p className="text-sm font-extrabold uppercase tracking-wide text-blue-100">
            Give Online
          </p>
          <h2 className="mt-3 text-2xl font-black">Support the work of God</h2>
          <p className="mt-5 text-sm leading-6 text-blue-50">
            You can give your tithes, offerings and pledges securely through
            the bank or upload your receipt after making a deposit.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4">
            {givingOptions.map((option) => {
              const Icon = option.icon;

              return (
                <div key={option.label} className="text-center">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-white/10 text-blue-100">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <p className="mt-3 text-xs font-black">{option.label}</p>
                </div>
              );
            })}
          </div>

          <p className="mt-8 text-sm leading-6 text-blue-50">
            Your giving supports the mission of the church and the community.
          </p>
        </aside>

        <section className="rounded-md bg-white p-6 shadow-xl shadow-slate-200 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-md bg-blue-50 text-accent">
              <ReceiptText className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-xl font-black">Upload Receipt</h2>
              <p className="mt-1 text-sm text-slate-600">
                Submit your bank deposit details for church records.
              </p>
            </div>
          </div>
          <ReceiptUploadForm />
        </section>

        <aside className="rounded-md bg-white p-6 shadow-xl shadow-slate-200 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-md bg-blue-50 text-accent">
              <Landmark className="h-6 w-6" aria-hidden="true" />
            </span>
            <h2 className="text-xl font-black">Bank Details</h2>
          </div>

          <dl className="space-y-6 text-sm">
            {bankDetails.map(([label, value]) => (
              <div key={label}>
                <dt className="font-black text-primary">{label}</dt>
                <dd className="mt-1 text-slate-700">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 rounded-md bg-slate-50 p-4 text-sm leading-6 text-slate-700">
            <Banknote className="mb-3 h-6 w-6 text-accent" aria-hidden="true" />
            Please use your name and district as the deposit reference.
          </div>
        </aside>
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

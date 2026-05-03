import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  ClipboardCheck,
  HeartHandshake,
  UserPlus,
  UsersRound,
} from "lucide-react";

import { JoinRequestForm } from "@/components/new-here/join-request-form";
import { absoluteUrl, siteConfig } from "@/lib/site";

const pageUrl = absoluteUrl("/new-here");

export const metadata: Metadata = {
  title: "Join CCAP Zomba | New Here",
  description:
    "Request to join CCAP Zomba by submitting your personal details, church background, transfer type and contact information.",
  alternates: {
    canonical: "/new-here",
  },
  keywords: [
    "Join CCAP Zomba",
    "CCAP Zomba new member",
    "church membership Zomba",
    "CCAP transfer letter",
    "new here CCAP Zomba",
  ],
  openGraph: {
    title: "Join CCAP Zomba | New Here",
    description:
      "Submit a new member or transfer request to join the CCAP Zomba church family.",
    url: pageUrl,
    siteName: siteConfig.name,
    type: "website",
  },
};

const steps = [
  {
    title: "Submit your details",
    text: "Share your contact information, church background and transfer type.",
    icon: ClipboardCheck,
  },
  {
    title: "Church office review",
    text: "The church office or district leadership follows up with you.",
    icon: UsersRound,
  },
  {
    title: "Join the family",
    text: "You are guided into worship, district fellowship and ministries.",
    icon: HeartHandshake,
  },
];

const faqs = [
  {
    question: "Can I join CCAP Zomba with a transfer letter later?",
    answer:
      "Yes. The join request form allows you to indicate that your transfer letter will be submitted later.",
  },
  {
    question: "Can temporary members request to join CCAP Zomba?",
    answer:
      "Yes. You can choose whether your transfer is permanent or temporary when submitting the request.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: "Join CCAP Zomba | New Here",
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
        telephone: siteConfig.phone,
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
          name: "New Here",
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

export default function NewHerePage() {
  return (
    <div className="bg-slate-50 text-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section
        className="relative overflow-hidden bg-cover bg-center text-white"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1800&q=85)",
        }}
      >
        <div className="absolute inset-0 bg-primary/76" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/92 via-primary/60 to-primary/20" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-md bg-white/10">
            <UserPlus className="h-6 w-6" aria-hidden="true" />
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tight sm:text-5xl">
            New Here?
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-blue-50">
            Request to join CCAP Zomba and help us learn how best to welcome,
            contact and connect you with the right district and ministry.
          </p>
          <nav
            aria-label="Breadcrumb"
            className="mt-5 flex items-center gap-2 text-sm font-bold text-white/90"
          >
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
            <span>New Here</span>
          </nav>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.8fr_1.35fr] lg:px-8">
        <aside className="space-y-6">
          <div className="rounded-md bg-primary p-8 text-white shadow-xl shadow-slate-200">
            <p className="text-sm font-extrabold uppercase tracking-wide text-blue-100">
              Welcome Home
            </p>
            <h2 className="mt-3 text-2xl font-black">We would love to meet you</h2>
            <p className="mt-5 text-sm leading-6 text-blue-50">
              Whether you are transferring permanently, joining temporarily or
              still preparing your transfer letter, this form helps us begin
              the right conversation with you.
            </p>
          </div>

          <div className="rounded-md bg-white p-6 shadow-xl shadow-slate-200">
            <h2 className="text-xl font-black">What happens next?</h2>
            <div className="mt-6 space-y-5">
              {steps.map((step) => {
                const Icon = step.icon;

                return (
                  <article key={step.title} className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-blue-50 text-accent">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-black">{step.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {step.text}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </aside>

        <section className="rounded-md bg-white p-6 shadow-xl shadow-slate-200 sm:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-black">Request to Join</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Fields marked by the browser as required must be completed before
              submitting.
            </p>
          </div>
          <JoinRequestForm />
        </section>
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

import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ChevronRight, LockKeyhole, ShieldCheck, UserRoundCheck } from "lucide-react";

import { LoginForm } from "@/components/auth/login-form";
import { absoluteUrl, siteConfig } from "@/lib/site";

const pageUrl = absoluteUrl("/login");

export const metadata: Metadata = {
  title: "Login | CCAP Zomba",
  description:
    "Sign in to the CCAP Zomba member, staff and admin portal to access church records, offerings, content management and member services.",
  alternates: {
    canonical: "/login",
  },
  keywords: [
    "CCAP Zomba login",
    "CCAP Zomba member portal",
    "CCAP Zomba staff login",
    "church member login Zomba",
    "CCAP Zomba admin portal",
  ],
  openGraph: {
    title: "Login | CCAP Zomba",
    description:
      "Access the CCAP Zomba member, staff and admin portal securely.",
    url: pageUrl,
    siteName: siteConfig.name,
    type: "website",
  },
};

const accessItems = [
  {
    title: "Members",
    text: "View your profile, district details and giving receipt records.",
    icon: UserRoundCheck,
  },
  {
    title: "Staff",
    text: "Manage church news, events, sermons, Mlaga schedules and vacancies.",
    icon: ShieldCheck,
  },
  {
    title: "Admins",
    text: "Create users, assign roles and guide access to church systems.",
    icon: LockKeyhole,
  },
];

const faqs = [
  {
    question: "Who can log in to the CCAP Zomba portal?",
    answer:
      "The portal is intended for CCAP Zomba members, staff and administrators with active user accounts.",
  },
  {
    question: "What should I do if I cannot access my CCAP Zomba account?",
    answer:
      "Contact the church office using the contact page so your account details or access can be reviewed.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: "Login | CCAP Zomba",
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
          name: "Login",
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

export default function LoginPage() {
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
            "url(https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=85)",
        }}
      >
        <div className="absolute inset-0 bg-primary/82" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/70 to-primary/30" />
        <div className="relative mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-md bg-white/10">
            <LockKeyhole className="h-6 w-6" aria-hidden="true" />
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tight sm:text-5xl">
            Login
          </h1>
          <nav
            aria-label="Breadcrumb"
            className="mt-5 flex items-center gap-2 text-sm font-bold text-white/90"
          >
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
            <span>Login</span>
          </nav>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <aside className="space-y-6">
          <div className="rounded-md bg-primary p-8 text-white shadow-xl shadow-slate-200">
            <p className="text-sm font-extrabold uppercase tracking-wide text-blue-100">
              Secure Access
            </p>
            <h2 className="mt-3 text-2xl font-black">
              One portal for church service
            </h2>
            <p className="mt-5 text-sm leading-6 text-blue-50">
              The portal is prepared for members, staff and administrators.
              Use your approved account to continue into the right member,
              staff or administration area.
            </p>
          </div>

          <div className="rounded-md bg-white p-6 shadow-xl shadow-slate-200">
            <h2 className="text-xl font-black">Portal Access</h2>
            <div className="mt-6 space-y-5">
              {accessItems.map((item) => {
                const Icon = item.icon;

                return (
                  <article key={item.title} className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-blue-50 text-accent">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-black">{item.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {item.text}
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
            <p className="text-sm font-extrabold uppercase tracking-wide text-accent">
              Account Login
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">
              Sign in to your account
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Use the email address and password provided by the church office.
            </p>
          </div>
          <Suspense fallback={<div className="h-72 rounded-md bg-slate-50" />}>
            <LoginForm />
          </Suspense>
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

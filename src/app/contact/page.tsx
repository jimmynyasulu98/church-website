import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  Clock3,
  Globe2,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import { ContactForm } from "@/components/contact/contact-form";
import { absoluteUrl, siteConfig } from "@/lib/site";

const pageUrl = absoluteUrl("/contact");

export const metadata: Metadata = {
  title: "Contact | CCAP Zomba",
  description:
    "Contact CCAP Zomba for church information, service times, directions, prayer requests and general inquiries.",
  alternates: {
    canonical: "/contact",
  },
  keywords: [
    "Contact CCAP Zomba",
    "CCAP Zomba phone",
    "CCAP Zomba email",
    "CCAP Zomba service times",
    "church in Zomba contact",
  ],
  openGraph: {
    title: "Contact | CCAP Zomba",
    description:
      "Get in touch with CCAP Zomba by phone, email or contact form.",
    url: pageUrl,
    siteName: siteConfig.name,
    type: "website",
  },
};

const contactItems = [
  {
    label: "Address",
    value: siteConfig.address,
    detail: "Zomba, Malawi",
    icon: MapPin,
  },
  {
    label: "Phone",
    value: siteConfig.phone,
    detail: "Call the church office",
    icon: Phone,
  },
  {
    label: "Email",
    value: siteConfig.email,
    detail: "General inquiries",
    icon: Mail,
  },
];

const faqs = [
  {
    question: "How can I contact CCAP Zomba?",
    answer:
      "You can contact CCAP Zomba by phone, email or by submitting the contact form on this page.",
  },
  {
    question: "What are CCAP Zomba service times?",
    answer:
      "CCAP Zomba has Chichewa services from 6:00 AM to 8:00 AM and 10:00 AM to 12:00 PM, and an English service from 8:00 AM to 10:00 AM.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: "Contact | CCAP Zomba",
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
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.address,
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
          name: "Contact",
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

export default function ContactPage() {
  return (
    <div className="bg-white text-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-black uppercase tracking-tight sm:text-4xl">
            Contact
          </h1>
          <nav
            aria-label="Breadcrumb"
            className="mt-3 flex items-center gap-2 text-sm font-bold text-slate-600"
          >
            <Link href="/" className="transition hover:text-accent">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
            <span>Contact</span>
          </nav>
        </div>
      </section>

      <section
        className="mx-auto grid max-w-7xl gap-8 bg-cover bg-center px-4 py-10 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.92), rgba(255,255,255,0.92)), url(https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1800&q=85)",
        }}
      >
        <aside>
          <p className="text-sm font-extrabold uppercase tracking-wide text-accent">
            Get In Touch
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight">
            We would love to hear from you
          </h2>
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-700">
            Reach out to us using any of the contact details below, or send a
            message through the form.
          </p>

          <div className="mt-8 space-y-6">
            {contactItems.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.label} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-blue-50 text-accent">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-black">{item.label}</h3>
                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {item.value}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">{item.detail}</p>
                  </div>
                </div>
              );
            })}

            <div className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-blue-50 text-accent">
                <Clock3 className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-black">Service Times</h3>
                <div className="mt-1 space-y-1 text-sm text-slate-700">
                  {siteConfig.serviceTimes.map((time) => (
                    <p key={time}>{time}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            {[Globe2, Phone, Mail].map((Icon, index) => (
              <span
                key={index}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
            ))}
          </div>
        </aside>

        <section className="rounded-md border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200 sm:p-8">
          <ContactForm />
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

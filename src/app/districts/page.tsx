import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, MapPin, UsersRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { absoluteUrl, siteConfig } from "@/lib/site";

const pageUrl = absoluteUrl("/districts");

export const metadata: Metadata = {
  title: "Districts | CCAP Zomba",
  description:
    "Learn about the six CCAP Zomba districts that support worship, fellowship, pastoral care and local church activities across Zomba.",
  alternates: {
    canonical: "/districts",
  },
  keywords: [
    "CCAP Zomba districts",
    "Zomba church districts",
    "CCAP district leadership",
    "church fellowship groups in Zomba",
    "CCAP Zomba pastoral care",
  ],
  openGraph: {
    title: "Districts | CCAP Zomba",
    description:
      "Find your CCAP Zomba district and connect with local fellowship, care and church activities.",
    url: pageUrl,
    siteName: "CCAP Zomba",
    type: "website",
  },
};

const districts = [
  {
    name: "District 1",
    description: "Serving the communities of Chinamwali and surrounding areas.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "District 2",
    description: "Serving the areas of Ndirande and surrounding communities.",
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "District 3",
    description: "Serving the areas of Kadango and surrounding communities.",
    image:
      "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "District 4",
    description: "Serving the areas of Zomba Town and surrounding communities.",
    image:
      "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "District 5",
    description: "Serving the areas of Mt. Bise and surrounding communities.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "District 6",
    description: "Serving the areas of Kachere and surrounding communities.",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=700&q=80",
  },
];

const faqs = [
  {
    question: "How many districts does CCAP Zomba have?",
    answer:
      "CCAP Zomba has six districts that help organize pastoral care, fellowship and local church activities.",
  },
  {
    question: "What is the purpose of a CCAP Zomba district?",
    answer:
      "Each district helps members connect with nearby believers, receive care from church leadership and participate in fellowship, prayer and service.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: "Districts | CCAP Zomba",
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
          name: "Districts",
          item: pageUrl,
        },
      ],
    },
    {
      "@type": "ItemList",
      name: "CCAP Zomba Districts",
      numberOfItems: districts.length,
      itemListElement: districts.map((district, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: district.name,
        description: district.description,
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

export default function DistrictsPage() {
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
            "url(https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1800&q=85)",
        }}
      >
        <div className="absolute inset-0 bg-primary/64" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/86 via-primary/48 to-primary/10" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black uppercase tracking-tight sm:text-5xl">
            Districts
          </h1>
          <nav
            aria-label="Breadcrumb"
            className="mt-4 flex items-center gap-2 text-sm font-bold text-white/90"
          >
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
            <span>Districts</span>
          </nav>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.8fr_1.6fr] lg:px-8">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-wide text-accent">
            Local Fellowship
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight">
            Our 6 Districts
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-700">
            CCAP Zomba is made up of six districts. Each district plays a vital
            role in the growth of the church and the community through pastoral
            care, fellowship, prayer and service.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {districts.map((district, index) => (
            <article
              key={district.name}
              className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200"
            >
              <div className="relative">
                <div
                  className="h-36 bg-cover bg-center"
                  style={{ backgroundImage: `url(${district.image})` }}
                  aria-label={`${district.name} community area`}
                />
                <span className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-md bg-primary text-xs font-black text-white">
                  {index + 1}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-base font-black">{district.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {district.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 rounded-md bg-primary px-6 py-7 text-white shadow-xl shadow-slate-200 sm:grid-cols-[1fr_auto] sm:items-center sm:px-8">
          <div>
            <h2 className="text-2xl font-black">Find your district</h2>
            <p className="mt-2 text-sm leading-6 text-blue-50">
              Get connected with your district leadership and activities.
            </p>
          </div>
          <Button asChild className="h-12 rounded-sm bg-accent px-7 font-black">
            <Link href="/contact">
              <MapPin className="mr-2 h-4 w-4" aria-hidden="true" />
              View All Districts
            </Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-5 border-t border-slate-200 pt-8 md:grid-cols-2">
          {faqs.map((faq) => (
            <article key={faq.question}>
              <UsersRound className="mb-3 h-6 w-6 text-accent" />
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

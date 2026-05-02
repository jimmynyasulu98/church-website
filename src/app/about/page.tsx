import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpenCheck,
  ChevronRight,
  HeartHandshake,
  ScrollText,
  Target,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | CCAP Zomba",
  description:
    "Learn about CCAP Zomba, a Christ-centered church community in Zomba.",
};

const values = [
  {
    title: "Our Vision",
    text: "A transformed community experiencing Christ's love.",
    icon: Target,
  },
  {
    title: "Our Mission",
    text: "To share, disciple, strengthen believers and serve our nation.",
    icon: BookOpenCheck,
  },
  {
    title: "Our Values",
    text: "Faith, Integrity, Love, Unity and Excellence.",
    icon: ScrollText,
  },
];

const stats = [
  ["1898", "Established"],
  ["6", "Districts"],
  ["20+", "Ministries"],
  ["1000+", "Members"],
];

export default function AboutPage() {
  return (
    <div className="bg-white text-primary">
      <section
        className="relative overflow-hidden bg-cover bg-center text-white"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1520637736862-4d197d17c48a?auto=format&fit=crop&w=1800&q=85)",
        }}
      >
        <div className="absolute inset-0 bg-primary/62" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/45 to-primary/10" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black uppercase tracking-tight sm:text-5xl">
            About Us
          </h1>
          <nav
            aria-label="Breadcrumb"
            className="mt-4 flex items-center gap-2 text-sm font-bold text-white/90"
          >
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
            <span>About Us</span>
          </nav>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.25fr] lg:px-8">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-wide text-accent">
            Who We Are
          </p>
          <h2 className="mt-3 max-w-md text-3xl font-black leading-tight tracking-tight sm:text-4xl">
            We are a Christ-centered Church
          </h2>
          <div className="mt-5 space-y-4 text-base leading-7 text-slate-700">
            <p>
              CCAP Zomba is a family of believers committed to making disciples
              of Jesus Christ through worship, fellowship, discipleship and
              service.
            </p>
            <p>
              We exist to glorify God, love people and impact our community
              with the gospel of Jesus Christ.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {values.map((item) => {
              const Icon = item.icon;

              return (
                <article key={item.title}>
                  <span className="flex h-11 w-11 items-center justify-center rounded-md bg-blue-50 text-accent">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-base font-black">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        <div
          className="min-h-[340px] rounded-md bg-cover bg-center shadow-xl shadow-slate-200 sm:min-h-[430px]"
          style={{
            backgroundImage:
              "linear-gradient(0deg, rgba(11,31,58,0.12), rgba(11,31,58,0.12)), url(https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=1300&q=85)",
          }}
          aria-label="Congregation gathered in worship"
        />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-md bg-primary text-white shadow-xl shadow-slate-200 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(([value, label], index) => (
            <div
              key={label}
              className="relative px-8 py-7 text-center after:absolute after:bottom-0 after:left-8 after:right-8 after:h-px after:bg-white/20 sm:after:hidden lg:after:left-auto lg:after:right-0 lg:after:top-7 lg:after:h-auto lg:after:w-px lg:last:after:hidden"
            >
              <p className="text-3xl font-black">{value}</p>
              <p className="mt-2 text-sm font-bold text-blue-50">{label}</p>
              {index === 0 ? (
                <HeartHandshake className="absolute left-6 top-6 h-5 w-5 text-white/25" />
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

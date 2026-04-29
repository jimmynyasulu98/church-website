import Link from "next/link";
import {
  CalendarDays,
  HandHeart,
  MapPin,
  Mic2,
  Newspaper,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const highlights = [
  {
    id: "about",
    title: "About",
    text: "Rooted in Scripture, prayer, and warm community life across Mlaga.",
    icon: Users,
  },
  {
    id: "ministries",
    title: "Ministries",
    text: "Children, youth, families, outreach, worship, and pastoral care.",
    icon: HandHeart,
  },
  {
    id: "districts",
    title: "Districts",
    text: "Neighborhood gatherings that make fellowship close and practical.",
    icon: MapPin,
  },
  {
    id: "sermons",
    title: "Sermons",
    text: "Weekly teaching for faith that grows beyond Sunday.",
    icon: Mic2,
  },
  {
    id: "events",
    title: "Events",
    text: "Services, studies, community visits, and church calendar updates.",
    icon: CalendarDays,
  },
  {
    id: "news",
    title: "News",
    text: "Stories and announcements from the life of the church.",
    icon: Newspaper,
  },
];

export default function Home() {
  return (
    <>
      <section id="home" className="bg-white">
        <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">
              Welcome to Mlaga Church
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight text-primary sm:text-5xl lg:text-6xl">
              A faithful community for worship, service, and everyday grace.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Join us as we gather, learn, serve, and care for our neighbors
              through Christ-centered ministry across Mlaga and surrounding
              districts.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link href="#events">View Events</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="#contact">Plan a Visit</Link>
              </Button>
            </div>
          </div>

          <div
            className="relative min-h-[360px] overflow-hidden rounded-md bg-primary p-8 text-white shadow-2xl shadow-slate-300"
            aria-label="Church service summary"
          >
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-accent/35 to-transparent" />
            <div className="relative flex h-full min-h-[300px] flex-col justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-100">
                  Sunday Worship
                </p>
                <p className="mt-4 text-5xl font-bold">08:30</p>
                <p className="mt-2 text-blue-100">
                  Morning service and fellowship
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-md bg-white/10 p-4 backdrop-blur">
                  <p className="text-sm text-blue-100">Bible Study</p>
                  <p className="mt-1 text-xl font-semibold">Wednesday</p>
                </div>
                <div className="rounded-md bg-white/10 p-4 backdrop-blur">
                  <p className="text-sm text-blue-100">Prayer Meeting</p>
                  <p className="mt-1 text-xl font-semibold">Friday</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">
              Church Life
            </p>
            <h2 className="mt-3 text-3xl font-bold text-primary sm:text-4xl">
              Everything you need for the first version of the site.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  id={item.id}
                  key={item.id}
                  className="scroll-mt-28 rounded-md border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-md bg-blue-50 text-accent">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="mlaga" className="scroll-mt-28 bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">
              Mlaga
            </p>
            <h2 className="mt-3 text-3xl font-bold text-primary sm:text-4xl">
              Serving the place we call home.
            </h2>
          </div>
          <p className="text-lg leading-8 text-slate-600">
            This starter structure gives the church room to grow: ministries,
            districts, sermons, events, news, giving, and contact are already
            represented as scroll targets and ready to become full pages.
          </p>
        </div>
      </section>

      <section id="giving" className="scroll-mt-28 bg-primary py-20 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-100">
              Giving
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Support the work of ministry.
            </h2>
          </div>
          <Button asChild variant="secondary">
            <Link href="#contact">Contact the Treasurer</Link>
          </Button>
        </div>
      </section>

      <section id="contact" className="scroll-mt-28 bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-md border border-slate-200 bg-slate-50 p-8 md:p-10">
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">
              Contact
            </p>
            <h2 className="mt-3 text-3xl font-bold text-primary">
              Visit, call, or send a message.
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-slate-600">
              Replace these starter details with the church office phone,
              address, service times, and pastoral contact information.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

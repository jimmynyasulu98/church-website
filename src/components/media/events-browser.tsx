"use client";

import { useMemo, useState } from "react";
import { CalendarDays } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type EventItem = {
  month: string;
  day: string;
  title: string;
  date: string;
  displayDate: string;
  venue: string;
  description: string;
  audience: string;
  contact: string;
};

type EventTab = "upcoming" | "past" | "all";

const tabs: { label: string; value: EventTab }[] = [
  { label: "Upcoming Events", value: "upcoming" },
  { label: "Past Events", value: "past" },
];

export function EventsBrowser({
  upcomingEvents,
  pastEvents,
}: {
  upcomingEvents: EventItem[];
  pastEvents: EventItem[];
}) {
  const [activeTab, setActiveTab] = useState<EventTab>("upcoming");
  const [openEvent, setOpenEvent] = useState<string | null>(null);

  const events = useMemo(() => {
    if (activeTab === "past") {
      return pastEvents;
    }

    if (activeTab === "all") {
      return [...upcomingEvents, ...pastEvents];
    }

    return upcomingEvents;
  }, [activeTab, pastEvents, upcomingEvents]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-4 text-sm font-black" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.value}
              onClick={() => {
                setActiveTab(tab.value);
                setOpenEvent(null);
              }}
              className={cn(
                "border-b-2 border-transparent pb-2 text-slate-500 transition hover:text-accent",
                activeTab === tab.value && "border-accent text-accent",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            setActiveTab("all");
            setOpenEvent(null);
          }}
          className={cn(
            "text-sm font-black text-accent transition hover:text-primary",
            activeTab === "all" && "text-primary",
          )}
        >
          View Calendar
        </button>
      </div>

      <div className="overflow-hidden rounded-md border border-slate-200 bg-white">
        {events.map((event) => {
          const isOpen = openEvent === event.title;

          return (
            <article
              key={`${event.title}-${event.date}`}
              className="border-b border-slate-200 px-5 py-5 last:border-b-0"
            >
              <div className="grid gap-5 sm:grid-cols-[80px_1fr_auto] sm:items-center">
                <div className="w-20 rounded-md border border-slate-200 bg-white py-3 text-center">
                  <p className="text-xs font-black text-accent">{event.month}</p>
                  <p className="text-3xl font-black">{event.day}</p>
                </div>
                <div>
                  <h2 className="text-base font-black text-accent">
                    {event.title}
                  </h2>
                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    <time dateTime={event.date}>{event.displayDate}</time>
                  </p>
                  <p className="mt-1 text-sm text-slate-600">{event.venue}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpenEvent(isOpen ? null : event.title)}
                  className="text-left text-sm font-black text-accent transition hover:text-primary sm:text-right"
                  aria-expanded={isOpen}
                >
                  {isOpen ? "Hide Details -" : "View Details +"}
                </button>
              </div>

              {isOpen ? (
                <div className="mt-5 rounded-md bg-slate-50 p-5 text-sm leading-6 text-slate-700 sm:ml-[100px]">
                  <p>{event.description}</p>
                  <dl className="mt-4 grid gap-3 sm:grid-cols-3">
                    <div>
                      <dt className="font-black text-primary">Audience</dt>
                      <dd>{event.audience}</dd>
                    </div>
                    <div>
                      <dt className="font-black text-primary">Venue</dt>
                      <dd>{event.venue}</dd>
                    </div>
                    <div>
                      <dt className="font-black text-primary">Contact</dt>
                      <dd>{event.contact}</dd>
                    </div>
                  </dl>
                </div>
              ) : null}
            </article>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <Button
          type="button"
          onClick={() => {
            setActiveTab("all");
            setOpenEvent(null);
          }}
          className="h-12 rounded-sm bg-accent px-8 font-black"
        >
          <CalendarDays className="mr-2 h-4 w-4" aria-hidden="true" />
          View All Events
        </Button>
      </div>
    </section>
  );
}

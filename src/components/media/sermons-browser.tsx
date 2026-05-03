"use client";

import { useMemo, useState } from "react";
import { Play, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type SermonItem = {
  title: string;
  passage: string;
  preacher: string;
  series: string;
  date: string;
  displayDate: string;
  image: string;
};

type SermonTab = "latest" | "series" | "preacher";

const tabs: { label: string; value: SermonTab }[] = [
  { label: "Latest Sermons", value: "latest" },
  { label: "By Series", value: "series" },
  { label: "By Preacher", value: "preacher" },
];

export function SermonsBrowser({ sermons }: { sermons: SermonItem[] }) {
  const [activeTab, setActiveTab] = useState<SermonTab>("latest");
  const [selectedSermon, setSelectedSermon] = useState<SermonItem | null>(null);

  const groupedSermons = useMemo(() => {
    const key = activeTab === "series" ? "series" : "preacher";

    return sermons.reduce<Record<string, SermonItem[]>>((groups, sermon) => {
      const group = sermon[key];
      groups[group] = [...(groups[group] ?? []), sermon];
      return groups;
    }, {});
  }, [activeTab, sermons]);

  const sermonRows =
    activeTab === "latest" ? (
      <SermonList sermons={sermons} onWatch={setSelectedSermon} />
    ) : (
      <div className="space-y-6">
        {Object.entries(groupedSermons).map(([group, items]) => (
          <section key={group}>
            <h2 className="mb-3 text-lg font-black">{group}</h2>
            <div className="overflow-hidden rounded-md border border-slate-200 bg-white">
              <SermonList sermons={items} onWatch={setSelectedSermon} />
            </div>
          </section>
        ))}
      </div>
    );

  return (
    <>
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div
          className="mb-6 flex flex-wrap gap-6 text-sm font-black"
          role="tablist"
        >
          {tabs.map((tab) => (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={cn(
                "border-b-2 border-transparent pb-2 text-slate-500 transition hover:text-accent",
                activeTab === tab.value && "border-accent text-accent",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "latest" ? (
          <div className="overflow-hidden rounded-md border border-slate-200 bg-white">
            {sermonRows}
          </div>
        ) : (
          sermonRows
        )}

        <div className="mt-8 flex justify-center">
          <Button className="h-12 rounded-sm bg-accent px-8 font-black">
            View All Sermons
          </Button>
        </div>
      </section>

      {selectedSermon ? (
        <div
          className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-slate-950/80 px-4 py-4 sm:py-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="sermon-player-title"
        >
          <div className="flex max-h-[calc(100vh-2rem)] w-full max-w-3xl flex-col overflow-hidden rounded-md bg-white shadow-2xl sm:max-h-[calc(100vh-3rem)]">
            <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-5 py-4">
              <div className="min-w-0 pr-4">
                <h2 id="sermon-player-title" className="text-lg font-black">
                  {selectedSermon.title}
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  {selectedSermon.preacher} - {selectedSermon.passage}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSermon(null)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-slate-600 transition hover:bg-slate-100 hover:text-primary"
                aria-label="Close sermon player"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="overflow-y-auto">
              <div className="bg-slate-950 p-3 sm:p-4">
                <div
                  className="flex h-[38vh] min-h-48 max-h-[360px] items-center justify-center rounded-md bg-cover bg-center"
                  style={{
                    backgroundImage: `linear-gradient(rgba(11,31,58,0.58), rgba(11,31,58,0.58)), url(${selectedSermon.image})`,
                  }}
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-accent shadow-xl sm:h-20 sm:w-20">
                    <Play
                      className="ml-1 h-8 w-8 fill-current sm:h-10 sm:w-10"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </div>

              <div className="grid gap-3 px-5 py-4 text-sm text-slate-700 sm:grid-cols-3">
                <p>
                  <span className="font-black text-primary">Series:</span>{" "}
                  {selectedSermon.series}
                </p>
                <p>
                  <span className="font-black text-primary">Date:</span>{" "}
                  <time dateTime={selectedSermon.date}>
                    {selectedSermon.displayDate}
                  </time>
                </p>
                <p>
                  <span className="font-black text-primary">Preacher:</span>{" "}
                  {selectedSermon.preacher}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function SermonList({
  sermons,
  onWatch,
}: {
  sermons: SermonItem[];
  onWatch: (sermon: SermonItem) => void;
}) {
  return (
    <>
      {sermons.map((sermon) => (
        <article
          key={`${sermon.title}-${sermon.date}`}
          className="grid gap-4 border-b border-slate-200 px-4 py-4 last:border-b-0 sm:grid-cols-[120px_1fr_auto] sm:items-center"
        >
          <div
            className="h-24 rounded-md bg-cover bg-center sm:h-20"
            style={{ backgroundImage: `url(${sermon.image})` }}
            aria-label={`${sermon.title} sermon`}
          />
          <div>
            <h3 className="text-base font-black">{sermon.title}</h3>
            <p className="mt-1 text-sm font-semibold text-slate-700">
              {sermon.passage}
            </p>
            <p className="mt-1 text-sm text-slate-600">{sermon.preacher}</p>
            <p className="mt-1 text-sm text-slate-600">
              <time dateTime={sermon.date}>{sermon.displayDate}</time>
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => onWatch(sermon)}
            className="h-10 rounded-sm border-accent px-5 font-black text-accent"
          >
            <Play className="mr-2 h-4 w-4" aria-hidden="true" />
            Watch
          </Button>
        </article>
      ))}
    </>
  );
}

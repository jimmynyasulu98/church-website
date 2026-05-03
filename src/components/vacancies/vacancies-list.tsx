"use client";

import { useState } from "react";
import { BriefcaseBusiness, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type Vacancy = {
  title: string;
  type: string;
  department: string;
  closingDate: string;
  summary: string;
  requirements: string[];
};

export function VacanciesList({ vacancies }: { vacancies: Vacancy[] }) {
  const [openVacancy, setOpenVacancy] = useState<string | null>(null);

  return (
    <div className="overflow-hidden rounded-md border border-slate-200 bg-white">
      {vacancies.map((vacancy) => {
        const isOpen = openVacancy === vacancy.title;

        return (
          <article
            key={vacancy.title}
            className="border-b border-slate-200 px-5 py-5 last:border-b-0"
          >
            <div className="grid gap-4 sm:grid-cols-[auto_1fr_auto] sm:items-center">
              <span className="flex h-11 w-11 items-center justify-center rounded-md bg-blue-50 text-accent">
                <BriefcaseBusiness className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-black">{vacancy.title}</h2>
                <p className="mt-1 text-sm text-slate-600">
                  {vacancy.type} - {vacancy.department}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpenVacancy(isOpen ? null : vacancy.title)}
                className="inline-flex items-center gap-2 text-left text-sm font-black text-accent transition hover:text-primary sm:text-right"
                aria-expanded={isOpen}
              >
                {isOpen ? "Hide Details" : "View Details"}
                <ChevronDown
                  className={cn("h-4 w-4 transition", isOpen && "rotate-180")}
                  aria-hidden="true"
                />
              </button>
            </div>

            {isOpen ? (
              <div className="mt-5 rounded-md bg-slate-50 p-5 text-sm leading-6 text-slate-700 sm:ml-[60px]">
                <p>{vacancy.summary}</p>
                <p className="mt-4 font-black text-primary">
                  Closing date: {vacancy.closingDate}
                </p>
                <h3 className="mt-4 font-black text-primary">Requirements</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {vacancy.requirements.map((requirement) => (
                    <li key={requirement}>{requirement}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}

export function SendCvButton() {
  return (
    <Button asChild className="h-12 rounded-sm bg-accent px-8 font-black">
      <a href="mailto:info@ccapzomba.org?subject=Vacancy%20Application">
        Send CV
      </a>
    </Button>
  );
}

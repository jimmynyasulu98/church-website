"use client";

import { FormEvent, useMemo, useState } from "react";
import { CheckCircle2, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";

const genders = ["Male", "Female"];
const maritalStatuses = ["Single", "Married", "Widowed", "Divorced"];
const transferTypes = ["Permanent", "Temporary"];
const transferLetterStatuses = [
  "I have a transfer letter",
  "I will submit it later",
  "Not applicable",
];
const services = [
  "Chichewa Service - 6:00 AM",
  "English Service - 8:00 AM",
  "Chichewa Service - 10:00 AM",
];

export function JoinRequestForm() {
  const [transferLetter, setTransferLetter] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const transferLetterLabel = useMemo(() => {
    if (!transferLetter) {
      return "No file chosen";
    }

    return `${transferLetter.name} (${Math.ceil(transferLetter.size / 1024)} KB)`;
  }, [transferLetter]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(
      "Request captured on this page. Connect this form to an API endpoint to send it to the church office.",
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="First Name" id="firstName" required autoComplete="given-name" />
        <Field label="Last Name" id="lastName" required autoComplete="family-name" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <SelectField label="Gender" id="gender" options={genders} required />
        <SelectField
          label="Marital Status"
          id="maritalStatus"
          options={maritalStatuses}
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Primary Phone Number" id="primaryPhone" required type="tel" />
        <Field label="Other Phone Number" id="otherPhone" type="tel" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Email Address (Optional)" id="email" type="email" />
        <Field label="Current Location" id="currentLocation" required />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Previous Church" id="previousChurch" required />
        <Field label="Church Baptised At (Optional)" id="baptisedAt" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Current Work (Optional)" id="currentWork" />
        <SelectField
          label="Preferred Service"
          id="preferredService"
          options={services}
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <SelectField
          label="Type of Transfer"
          id="transferType"
          options={transferTypes}
          required
        />
        <SelectField
          label="Transfer Letter"
          id="transferLetterStatus"
          options={transferLetterStatuses}
          required
        />
      </div>

      <div>
        <label htmlFor="transferLetterFile" className="text-sm font-black text-primary">
          Upload Transfer Letter (Optional)
        </label>
        <label
          htmlFor="transferLetterFile"
          className="mt-2 flex min-h-12 cursor-pointer items-center justify-between gap-3 rounded-md border border-dashed border-slate-300 px-4 text-sm text-slate-600 transition hover:border-accent hover:bg-blue-50"
        >
          <span className="inline-flex items-center gap-2">
            <Upload className="h-4 w-4 text-accent" aria-hidden="true" />
            Choose File
          </span>
          <span className="truncate text-right">{transferLetterLabel}</span>
        </label>
        <input
          id="transferLetterFile"
          name="transferLetterFile"
          type="file"
          accept="image/*,.pdf"
          className="sr-only"
          onChange={(event) => setTransferLetter(event.target.files?.[0] ?? null)}
        />
      </div>

      <div>
        <label htmlFor="familyMembers" className="text-sm font-black text-primary">
          Family Members Joining With You (Optional)
        </label>
        <textarea
          id="familyMembers"
          name="familyMembers"
          rows={3}
          className="mt-2 w-full resize-none rounded-md border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>

      <div>
        <label htmlFor="notes" className="text-sm font-black text-primary">
          Other Recommended Details
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          placeholder="Share anything helpful for the church office or district leadership."
          className="mt-2 w-full resize-none rounded-md border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>

      {message ? (
        <div
          className="rounded-md bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700"
          role="status"
        >
          <CheckCircle2 className="mr-2 inline h-4 w-4" aria-hidden="true" />
          {message}
        </div>
      ) : null}

      <Button type="submit" className="h-14 w-full rounded-sm bg-accent font-black">
        Submit Join Request
      </Button>
    </form>
  );
}

function Field({
  label,
  id,
  required,
  type = "text",
  autoComplete,
}: {
  label: string;
  id: string;
  required?: boolean;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-black text-primary">
        {label}
      </label>
      <input
        id={id}
        name={id}
        required={required}
        type={type}
        autoComplete={autoComplete}
        className="mt-2 h-12 w-full rounded-md border border-slate-200 px-4 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
      />
    </div>
  );
}

function SelectField({
  label,
  id,
  options,
  required,
}: {
  label: string;
  id: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-black text-primary">
        {label}
      </label>
      <select
        id={id}
        name={id}
        required={required}
        defaultValue=""
        className="mt-2 h-12 w-full rounded-md border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
      >
        <option value="" disabled>
          Select {label}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

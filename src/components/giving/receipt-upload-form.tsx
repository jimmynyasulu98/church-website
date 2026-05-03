"use client";

import { FormEvent, useMemo, useState } from "react";
import { CheckCircle2, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";

const districts = [
  "District 1",
  "District 2",
  "District 3",
  "District 4",
  "District 5",
  "District 6",
];

const givingTypes = ["Tithe", "Offering", "Pledge", "Thanksgiving", "Other"];

export function ReceiptUploadForm() {
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const fileLabel = useMemo(() => {
    if (!receiptFile) {
      return "No file chosen";
    }

    return `${receiptFile.name} (${Math.ceil(receiptFile.size / 1024)} KB)`;
  }, [receiptFile]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!receiptFile) {
      setStatus("error");
      setMessage("Please attach your receipt before submitting.");
      return;
    }

    if (receiptFile.size > 5 * 1024 * 1024) {
      setStatus("error");
      setMessage("Receipt files should be 5 MB or smaller.");
      return;
    }

    setStatus("success");
    setMessage(
      "Receipt captured on this page. Connect this form to an API endpoint to store submissions.",
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="fullName" className="text-sm font-black text-primary">
          Full Name
        </label>
        <input
          id="fullName"
          name="fullName"
          required
          autoComplete="name"
          className="mt-2 h-12 w-full rounded-md border border-slate-200 px-4 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>

      <div>
        <label htmlFor="phone" className="text-sm font-black text-primary">
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          required
          type="tel"
          autoComplete="tel"
          className="mt-2 h-12 w-full rounded-md border border-slate-200 px-4 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>

      <div>
        <label htmlFor="district" className="text-sm font-black text-primary">
          District
        </label>
        <select
          id="district"
          name="district"
          required
          defaultValue=""
          className="mt-2 h-12 w-full rounded-md border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
        >
          <option value="" disabled>
            Select District
          </option>
          {districts.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="type" className="text-sm font-black text-primary">
            Type
          </label>
          <select
            id="type"
            name="type"
            required
            defaultValue="Tithe"
            className="mt-2 h-12 w-full rounded-md border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
          >
            {givingTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="amount" className="text-sm font-black text-primary">
            Amount (MWK)
          </label>
          <input
            id="amount"
            name="amount"
            required
            type="number"
            min="1"
            inputMode="numeric"
            className="mt-2 h-12 w-full rounded-md border border-slate-200 px-4 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </div>
      </div>

      <div>
        <label htmlFor="receipt" className="text-sm font-black text-primary">
          Upload Receipt
        </label>
        <label
          htmlFor="receipt"
          className="mt-2 flex min-h-12 cursor-pointer items-center justify-between gap-3 rounded-md border border-dashed border-slate-300 px-4 text-sm text-slate-600 transition hover:border-accent hover:bg-blue-50"
        >
          <span className="inline-flex items-center gap-2">
            <Upload className="h-4 w-4 text-accent" aria-hidden="true" />
            Choose File
          </span>
          <span className="truncate text-right">{fileLabel}</span>
        </label>
        <input
          id="receipt"
          name="receipt"
          type="file"
          required
          accept="image/*,.pdf"
          className="sr-only"
          onChange={(event) => {
            setReceiptFile(event.target.files?.[0] ?? null);
            setStatus("idle");
            setMessage("");
          }}
        />
        <p className="mt-2 text-xs text-slate-500">
          Accepted formats: image or PDF. Maximum file size: 5 MB.
        </p>
      </div>

      {message ? (
        <div
          className={`rounded-md px-4 py-3 text-sm font-semibold ${
            status === "success"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-700"
          }`}
          role="status"
        >
          {status === "success" ? (
            <CheckCircle2 className="mr-2 inline h-4 w-4" aria-hidden="true" />
          ) : null}
          {message}
        </div>
      ) : null}

      <Button type="submit" className="h-14 w-full rounded-sm bg-accent font-black">
        Submit Receipt
      </Button>
    </form>
  );
}

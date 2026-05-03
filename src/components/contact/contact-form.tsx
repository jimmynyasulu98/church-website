"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(
      "Message prepared on this page. Connect this form to an API endpoint to send it to the church office.",
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="sr-only">
          Your Name
        </label>
        <input
          id="name"
          name="name"
          required
          autoComplete="name"
          placeholder="Your Name"
          className="h-12 w-full rounded-md border border-slate-200 px-4 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>
      <div>
        <label htmlFor="phone" className="sr-only">
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="Phone Number"
          className="h-12 w-full rounded-md border border-slate-200 px-4 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>
      <div>
        <label htmlFor="email" className="sr-only">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          required
          type="email"
          autoComplete="email"
          placeholder="Email Address"
          className="h-12 w-full rounded-md border border-slate-200 px-4 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>
      <div>
        <label htmlFor="subject" className="sr-only">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          required
          placeholder="Subject"
          className="h-12 w-full rounded-md border border-slate-200 px-4 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>
      <div>
        <label htmlFor="message" className="sr-only">
          Your Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          placeholder="Your Message"
          rows={6}
          className="w-full resize-none rounded-md border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
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

      <Button type="submit" className="h-12 rounded-sm bg-accent px-8 font-black">
        Send Message
      </Button>
    </form>
  );
}

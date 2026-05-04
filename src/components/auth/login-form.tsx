"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertCircle, CheckCircle2, Eye, EyeOff, Loader2, LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";

type LoginResponse = {
  ok: boolean;
  data?: {
    id: string;
    email: string;
    role: string;
    firstName: string;
    lastName: string;
  };
  error?: {
    message?: string;
  };
};

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = (await response.json()) as LoginResponse;

      if (!response.ok || !result.ok) {
        setError(result.error?.message ?? "Login failed. Please try again.");
        return;
      }

      setMessage(`Welcome, ${result.data?.firstName ?? "friend"}.`);
      const redirectTo = searchParams.get("next") || "/";

      router.refresh();
      router.push(redirectTo.startsWith("/") ? redirectTo : "/");
    } catch {
      setError("We could not reach the login service. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="email" className="text-sm font-black text-primary">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className="mt-2 h-12 w-full rounded-md border border-slate-200 px-4 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>

      <div>
        <label htmlFor="password" className="text-sm font-black text-primary">
          Password
        </label>
        <div className="relative mt-2">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            minLength={8}
            autoComplete="current-password"
            placeholder="Enter your password"
            className="h-12 w-full rounded-md border border-slate-200 px-4 pr-12 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md text-slate-500 transition hover:bg-blue-50 hover:text-accent"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Eye className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
        <label className="inline-flex items-center gap-2 font-semibold text-slate-600">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-slate-300 text-accent focus:ring-accent"
          />
          Remember this device
        </label>
        <Link href="/contact" className="font-black text-accent transition hover:text-primary">
          Need help?
        </Link>
      </div>

      {error ? (
        <div
          className="rounded-md bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
          role="alert"
        >
          <AlertCircle className="mr-2 inline h-4 w-4" aria-hidden="true" />
          {error}
        </div>
      ) : null}

      {message ? (
        <div
          className="rounded-md bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700"
          role="status"
        >
          <CheckCircle2 className="mr-2 inline h-4 w-4" aria-hidden="true" />
          {message}
        </div>
      ) : null}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-12 w-full rounded-sm bg-accent font-black"
      >
        {isSubmitting ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <LogIn className="mr-2 h-4 w-4" aria-hidden="true" />
        )}
        Sign In
      </Button>
    </form>
  );
}

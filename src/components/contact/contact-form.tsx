"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { ButtonEl } from "@/components/ui/button";

const budgetOptions = ["< ₹1L", "₹1L – ₹5L", "₹5L – ₹15L", "₹15L+"];

export function ContactForm({ email }: { email: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("submitting");

    const subject = encodeURIComponent(`New enquiry from ${data.get("name") || "website"}`);
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nCompany: ${data.get("company")}\nEmail: ${data.get("email")}\nPhone: ${data.get("phone")}\nBudget: ${data.get("budget")}\n\nMessage:\n${data.get("message")}`
    );

    window.setTimeout(() => {
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      setStatus("sent");
    }, 500);
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-surface/60 px-8 py-16 text-center">
        <CheckCircle2 className="size-10 text-signal" />
        <h3 className="mt-4 font-display text-xl font-medium text-mist">Almost there</h3>
        <p className="mt-2 max-w-sm text-sm text-mist-dim">
          Your email app should now be open with your message ready to send.
          If it didn&apos;t open, email us directly at{" "}
          <a href={`mailto:${email}`} className="text-brand-bright">
            {email}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-surface/60 p-7 sm:p-9">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" required placeholder="Ananya Rao" />
        <Field label="Company" name="company" required placeholder="Your brand" />
        <Field label="Email" name="email" type="email" required placeholder="you@company.com" />
        <Field label="Phone" name="phone" type="tel" placeholder="+91 98765 43210" />
      </div>

      <div className="mt-5">
        <span className="mb-2 block text-sm font-medium text-mist-dim">Approx. monthly budget</span>
        <div className="flex flex-wrap gap-2">
          {budgetOptions.map((b, i) => (
            <label key={b} className="cursor-pointer">
              <input
                type="radio"
                name="budget"
                value={b}
                defaultChecked={i === 0}
                className="peer sr-only"
              />
              <span className="inline-flex rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-mist-dim transition-colors peer-checked:border-brand/40 peer-checked:bg-brand/20 peer-checked:text-brand-bright">
                {b}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-mist-dim">
          Tell us about your campaign
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Sites you're interested in, timelines, campaign goals…"
          className="w-full rounded-xl border border-white/10 bg-ink px-4 py-3 text-sm text-mist placeholder:text-mist-faint focus:border-brand/40 focus:outline-none"
        />
      </div>

      <ButtonEl type="submit" className="mt-6 w-full justify-center sm:w-auto" disabled={status === "submitting"}>
        {status === "submitting" ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Preparing your message…
          </>
        ) : (
          "Send enquiry"
        )}
      </ButtonEl>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-mist-dim">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-ink px-4 py-3 text-sm text-mist placeholder:text-mist-faint focus:border-brand/40 focus:outline-none"
      />
    </div>
  );
}

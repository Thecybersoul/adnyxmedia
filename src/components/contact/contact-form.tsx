"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { ButtonEl } from "@/components/ui/button";
import { company } from "@/lib/data/site";

const budgetOptions = ["< ₹1L", "₹1L – ₹5L", "₹5L – ₹15L", "₹15L+"];

type FormStatus = "idle" | "submitting" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    setStatus("submitting");
    setErrorMessage("");

    // Prepare data for API
    const data = {
      name: formData.get("name") as string,
      company: formData.get("company") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string || undefined,
      budget: formData.get("budget") as string || undefined,
      message: formData.get("message") as string,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle specific error cases
        if (response.status === 429) {
          setErrorMessage("Too many requests. Please try again in a few minutes.");
        } else if (response.status === 400 && result.details) {
          // Validation errors
          const errors = result.details.map((d: any) => d.message).join(", ");
          setErrorMessage(errors);
        } else {
          setErrorMessage(result.error || "Something went wrong. Please try again.");
        }
        setStatus("error");
        return;
      }

      // Success
      setSuccessMessage(result.message || "Your enquiry has been sent successfully!");
      setStatus("sent");
      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
      setErrorMessage("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-surface/60 px-8 py-16 text-center">
        <CheckCircle2 className="size-12 text-cyan" />
        <h3 className="mt-4 font-display text-xl font-medium text-mist">Message sent!</h3>
        <p className="mt-2 max-w-sm text-sm text-mist-dim">
          {successMessage || "We've received your enquiry and will get back to you within one business day."}
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm text-violet-soft hover:text-violet transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="rounded-2xl border border-white/10 bg-surface/60 p-7 sm:p-9">
        <div className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 mb-6">
          <AlertCircle className="size-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-red-300">Failed to send message</p>
            <p className="mt-1 text-sm text-red-200/80">{errorMessage}</p>
          </div>
        </div>
        <p className="text-sm text-mist-dim mb-4">
          You can also reach us directly at{" "}
          <a href={`mailto:${company.email}`} className="text-violet-soft hover:text-violet transition-colors">
            {company.email}
          </a>
          {" "}or call{" "}
          <a href={`tel:${company.phone}`} className="text-violet-soft hover:text-violet transition-colors">
            {company.phone}
          </a>
          .
        </p>
        <button
          onClick={() => {
            setStatus("idle");
            setErrorMessage("");
          }}
          className="text-sm text-violet-soft hover:text-violet transition-colors"
        >
          Try again
        </button>
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
              <span className="inline-flex rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-mist-dim transition-colors peer-checked:border-violet/40 peer-checked:bg-violet/20 peer-checked:text-violet-soft">
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
          className="w-full rounded-xl border border-white/10 bg-ink px-4 py-3 text-sm text-mist placeholder:text-mist-faint focus:border-violet/40 focus:outline-none"
        />
      </div>

      <ButtonEl type="submit" className="mt-6 w-full justify-center sm:w-auto" disabled={status === "submitting"}>
        {status === "submitting" ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Sending…
          </>
        ) : (
          "Send enquiry"
        )}
      </ButtonEl>
      
      <p className="mt-4 text-xs text-mist-faint">
        We typically respond within one business day. Your information is kept confidential.
      </p>
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
        className="w-full rounded-xl border border-white/10 bg-ink px-4 py-3 text-sm text-mist placeholder:text-mist-faint focus:border-violet/40 focus:outline-none"
      />
    </div>
  );
}

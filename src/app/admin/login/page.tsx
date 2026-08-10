"use client";

import { useActionState } from "react";
import { Loader2, Lock } from "lucide-react";
import { login, type LoginState } from "@/lib/auth/actions";
import { Logo } from "@/components/ui/logo";
import { ButtonEl } from "@/components/ui/button";

const initialState: LoginState = {};

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <div className="mb-8">
        <Logo />
      </div>
      <form
        action={formAction}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-surface/60 p-8"
      >
        <div className="flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-brand-bright">
          <Lock className="size-5" />
        </div>
        <h1 className="mt-5 font-display text-xl font-medium text-mist">Admin sign in</h1>
        <p className="mt-1 text-sm text-mist-dim">Enter the admin password to manage site content.</p>

        <div className="mt-6">
          <label htmlFor="password" className="mb-2 block text-sm font-medium text-mist-dim">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoFocus
            className="w-full rounded-xl border border-white/10 bg-ink px-4 py-3 text-sm text-mist placeholder:text-mist-faint focus:border-brand/40 focus:outline-none"
          />
        </div>

        {state?.error && (
          <p className="mt-4 rounded-lg border border-amber/25 bg-amber/10 px-3 py-2 text-sm text-amber">
            {state.error}
          </p>
        )}

        <ButtonEl type="submit" className="mt-6 w-full justify-center" disabled={pending}>
          {pending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Signing in…
            </>
          ) : (
            "Sign in"
          )}
        </ButtonEl>
      </form>
    </div>
  );
}

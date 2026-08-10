import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" className="shrink-0">
        <rect width="30" height="30" rx="9" fill="url(#logo-grad)" />
        <path
          d="M9 21.5 15 8l6 13.5M11.4 16.5h7.2"
          stroke="#050508"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id="logo-grad" x1="0" y1="0" x2="30" y2="30" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7c5cff" />
            <stop offset="0.55" stopColor="#2ee6d6" />
            <stop offset="1" stopColor="#ff4fd8" />
          </linearGradient>
        </defs>
      </svg>
      <span className="font-display text-lg font-semibold tracking-tight text-mist">
        ADNYX
      </span>
    </span>
  );
}

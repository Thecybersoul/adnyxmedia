import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none" className="shrink-0">
        <path d="M17 3 L30 29 L21.5 29 L17 18.5 L11.5 29 L3 29 Z" fill="#E4262A" />
      </svg>
      <span className="font-display text-lg font-semibold tracking-tight text-mist">
        ADNYX
      </span>
    </span>
  );
}

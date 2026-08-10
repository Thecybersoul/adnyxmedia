import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
  tone = "default",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "success" | "warning" | "muted";
}) {
  const toneClasses: Record<string, string> = {
    default: "bg-brand/15 text-brand-bright border-brand/25",
    success: "bg-signal/15 text-signal border-signal/25",
    warning: "bg-amber/15 text-amber border-amber/25",
    muted: "bg-white/5 text-mist-dim border-white/10",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        toneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

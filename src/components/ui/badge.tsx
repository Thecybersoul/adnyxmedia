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
    default: "bg-violet/15 text-violet-soft border-violet/25",
    success: "bg-cyan/15 text-cyan border-cyan/25",
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

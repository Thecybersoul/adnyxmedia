import { cn } from "@/lib/utils";

export function GridBackdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:56px_56px] mask-fade-x",
        className
      )}
    />
  );
}

export function GlowOrbs({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="absolute -top-40 left-1/4 size-[36rem] rounded-full bg-violet/25 blur-[140px] animate-pulse-glow" />
      <div
        className="absolute top-1/3 right-0 size-[28rem] rounded-full bg-cyan/20 blur-[130px] animate-pulse-glow"
        style={{ animationDelay: "1.2s" }}
      />
      <div
        className="absolute bottom-0 left-1/3 size-[30rem] rounded-full bg-magenta/15 blur-[140px] animate-pulse-glow"
        style={{ animationDelay: "2.1s" }}
      />
    </div>
  );
}

export function Noise() {
  return <div aria-hidden className="pointer-events-none absolute inset-0 grain" />;
}

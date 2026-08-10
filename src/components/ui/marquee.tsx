import { cn } from "@/lib/utils";

export function Marquee({
  children,
  className,
  reverse = false,
  slow = false,
}: {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
  slow?: boolean;
}) {
  return (
    <div className={cn("relative flex overflow-hidden mask-fade-x", className)}>
      <div
        className={cn(
          "flex shrink-0 items-center gap-16 pr-16",
          slow ? "animate-marquee-slow" : "animate-marquee",
          reverse && "[animation-direction:reverse]"
        )}
      >
        {children}
      </div>
      <div
        aria-hidden
        className={cn(
          "flex shrink-0 items-center gap-16 pr-16",
          slow ? "animate-marquee-slow" : "animate-marquee",
          reverse && "[animation-direction:reverse]"
        )}
      >
        {children}
      </div>
    </div>
  );
}

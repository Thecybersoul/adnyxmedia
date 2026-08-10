import { cn } from "@/lib/utils";
import Image from "next/image";

export function Logo({ className, variant = "full" }: { className?: string; variant?: "full" | "icon" }) {
  if (variant === "icon") {
    return (
      <div className={cn("relative shrink-0", className)}>
        <Image
          src="/images/adnyx-icon-red.svg"
          alt="ADNYX"
          width={36}
          height={36}
          className="object-contain w-8 h-8 sm:w-9 sm:h-9"
          priority
        />
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      <Image
        src="/images/adnyx-logo-white.svg"
        alt="ADNYX - Your Ad-vantage"
        width={160}
        height={44}
        className="object-contain h-10 w-auto sm:h-11"
        priority
      />
    </div>
  );
}

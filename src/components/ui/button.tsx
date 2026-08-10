import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type BaseProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  showArrow?: boolean;
};

const variantClasses: Record<string, string> = {
  primary:
    "bg-mist text-ink hover:bg-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)]",
  secondary:
    "bg-white/5 text-mist border border-white/15 hover:bg-white/10 hover:border-white/25",
  ghost: "text-mist hover:text-white",
};

const sizeClasses: Record<string, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

function classes(variant: BaseProps["variant"] = "primary", size: BaseProps["size"] = "md", className?: string) {
  return cn(
    "group relative inline-flex items-center gap-2 rounded-full font-medium transition-all duration-300 will-change-transform",
    variantClasses[variant],
    sizeClasses[size],
    className
  );
}

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  showArrow = true,
  href,
  ...rest
}: BaseProps & { href: string } & React.ComponentPropsWithoutRef<"a">) {
  return (
    <Link href={href} className={classes(variant, size, className)} {...rest}>
      {children}
      {showArrow && (
        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </Link>
  );
}

export function ButtonEl({
  children,
  className,
  variant = "primary",
  size = "md",
  showArrow = false,
  ...rest
}: BaseProps & React.ComponentPropsWithoutRef<"button">) {
  return (
    <button className={classes(variant, size, className)} {...rest}>
      {children}
      {showArrow && (
        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </button>
  );
}

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full text-xs font-semibold transition-colors line-clamp-1 text-center truncate",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-orange-600 text-neutral-50 hover:bg-neutral-900/80 ",
        gray: "text-neutral-600 text-sm bg-neutral-50 px-2.5 py-1 ",
        red: "text-red-600 text-sm bg-red-50 px-2.5 py-1",
        outline: "text-neutral-950 dark:text-neutral-50",
        green: "text-emerald-700 text-sm bg-emerald-50 px-2.5 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
const dotColors = {
  default: "bg-neutral-900",
  gray: "bg-neutral-600",
  red: "bg-red-600",
  green: "bg-emerald-600",
  outline: "bg-neutral-900",
};

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const dotColor =
    dotColors[variant as keyof typeof dotColors] || dotColors.default;

  return (
    <div
      className={`${cn(
        badgeVariants({ variant }),
        className
      )} flex items-center gap-1.5 `}
      {...props}
    >
      {dotColor && <div className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />}
      <span>{props.children}</span>
    </div>
  );
}

function BadgeWithoutDot({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <div
      className={`${cn(
        badgeVariants({ variant }),
        className
      )} flex items-center gap-1.5 `}
      {...props}
    >
      <span>{props.children}</span>
    </div>
  );
}

export { Badge, badgeVariants, BadgeWithoutDot };

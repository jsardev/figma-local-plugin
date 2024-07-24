import { ComponentChildren, h } from "preact";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../../utils";
import { LoadingIndicator } from "@create-figma-plugin/ui";

const button = cva(
  "rounded disabled:opacity-50 disabled:pointer-events-none flex items-center",
  {
    variants: {
      intent: {
        primary: "bg-figma-bg-brand hover:bg-figma-bg-brand-hover",
        tertiary: "bg-figma-bg-tertiary hover:bg-figma-bg-hover",
        danger: "bg-figma-bg-danger hover:bg-figma-bg-danger-hover",
        icon: "p-0 bg-figma-bg-tertiary hover:bg-figma-bg-hover",
      },
      size: {
        large: "p-2",
        small: "px-2 py-1",
      },
    },
    compoundVariants: [
      { intent: "icon", size: ["large", "small"], class: "p-0" },
    ],
    defaultVariants: {
      size: "large",
      intent: "primary",
    },
  }
);

type ButtonProps = VariantProps<typeof button> & {
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
  children: ComponentChildren;
  onClick?: () => void;
};

export const Button = ({
  intent,
  size,
  disabled,
  isLoading,
  className,
  children,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={cn(
        button({
          intent: isLoading ? "icon" : intent,
          size,
        }),
        className
      )}
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {isLoading ? (
        <div className="px-2 flex items-center justify-center cursor-pointer">
          <LoadingIndicator className="relative cursor-pointer w-4 h-4" />
        </div>
      ) : (
        children
      )}
    </button>
  );
};

import { h } from "preact";
import { cn } from "../../utils";

type SeparatorProps = {
  orientation: "horizontal" | "vertical";
};

export const Separator = ({ orientation }: SeparatorProps) => {
  return (
    <hr
      className={cn({
        "w-full h-1px": orientation === "horizontal",
        "h-full w-1px": orientation === "vertical",
      })}
    />
  );
};

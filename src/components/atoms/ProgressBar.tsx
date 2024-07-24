import { h } from "preact";

type ProgressBarProps = {
  value: number;
};

export const ProgressBar = ({ value }: ProgressBarProps) => {

  console.log(`${value}%`)

  return (
    <div class="w-full bg-figma-bg-tertiary rounded h-2">
      <div
        class="bg-figma-bg-brand h-2 rounded transition-all"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};

import { h } from "preact";
import { ProgressBar } from "../atoms/ProgressBar";
import { Button } from "../atoms/Button";
import { Progress } from "../../modules/app";

type ContentProgressProps = {
  progress: Progress;
  onCancelClick: () => void;
};

export const ContentProgress = ({
  progress,
  onCancelClick,
}: ContentProgressProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <span className="text-2xl tabular-nums">{progress.percentage}%</span>
      <ProgressBar value={progress.percentage} />
      <span>
        {progress.current} / {progress.total}
      </span>
      <div className="flex flex-col gap-4 justify-center items-center">
        <span>Traversing the tree...</span>
        <Button intent="danger" onClick={onCancelClick}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

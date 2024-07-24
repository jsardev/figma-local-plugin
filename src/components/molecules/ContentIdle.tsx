import { h } from "preact";
import { Button } from "../atoms/Button";

type ContentIdleProps = {
  onScanClick: () => void;
};

export const ContentIdle = ({ onScanClick }: ContentIdleProps) => {
  return (
    <div className="flex flex-col gap-4 text-center justify-center items-center">
      <span>
        Scan your selection
        <br />
        or the whole page.
      </span>
      <Button intent="primary" onClick={onScanClick}>
        Scan
      </Button>
    </div>
  );
};

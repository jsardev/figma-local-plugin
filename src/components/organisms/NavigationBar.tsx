import { IconAdjust32, LoadingIndicator } from "@create-figma-plugin/ui";
import { h } from "preact";
import { Button } from "../atoms/Button";
import { useAppState } from "../../modules/app/ui/context";

type NavigationBarProps = {
  onSettingsClick: () => void;
};

export const NavigationBar = ({ onSettingsClick }: NavigationBarProps) => {
  return (
    <div className="flex container h-16 items-center gap-2 border-b border-figma-border justify-between">
      <div className="flex gap-2">
        <Button>Variables</Button>
        <Button intent="tertiary" disabled>
          Styles
        </Button>
        <Button intent="tertiary" disabled>
          Components
        </Button>
      </div>
      <div className="flex gap-2">
        <Button intent="icon" onClick={onSettingsClick}>
          <IconAdjust32 />
        </Button>
      </div>
    </div>
  );
};

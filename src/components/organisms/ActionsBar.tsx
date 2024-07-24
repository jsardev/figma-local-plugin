import {
  IconCheckCircle32,
  IconCheckCircleFilled32,
} from "@create-figma-plugin/ui";
import { h } from "preact";
import { useAppState } from "../../modules/app/ui/context";
import { Button } from "../atoms/Button";

type ActionsBarProps = {
  onLink: () => void;
  onToggleAll: () => void;
};

export const ActionsBar = ({ onLink, onToggleAll }: ActionsBarProps) => {
  const { selectedFields, areAllFieldsSelected, itemsFields } = useAppState();

  return (
    <div className="w-full flex justify-between items-center container border-b border-figma-border h-16">
      <div className="flex gap-2 items-center">
        <Button disabled={selectedFields.value.length === 0} onClick={onLink}>
          Link to local variables
        </Button>
      </div>
      <div className="flex gap-2 items-center">
        <div className="flex items-center">
          <button onClick={onToggleAll}>
            {areAllFieldsSelected.value ? (
              <IconCheckCircleFilled32 />
            ) : (
              <IconCheckCircle32 />
            )}
          </button>
          {selectedFields.value.length} of {itemsFields.value.length} selected
        </div>
        <Button intent="tertiary" onClick={onToggleAll}>
          {areAllFieldsSelected.value ? "Unselect all" : "Select all"}
        </Button>
      </div>
    </div>
  );
};

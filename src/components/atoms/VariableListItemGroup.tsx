import { FunctionalComponent, h } from "preact";

import {
  IconCheckCircle32,
  IconCheckCircleFilled32,
  IconLayerComponent16,
  IconLayerFrame16,
  IconTarget32,
} from "@create-figma-plugin/ui";
import { ReactNode } from "preact/compat";
import { emit } from "@create-figma-plugin/utilities";
import { Button } from "./Button";
import { ProcessableNodeType } from "../../modules/app";
import {
  VariableItem,
  SelectableVariableFieldItem,
  LinkableVariableFieldItem,
  selectableItemsToLinkableItems,
  SelectableVariableItem,
} from "../../modules/variables";

const NODE_TYPE_TO_ICON: {
  [key in ProcessableNodeType]?: FunctionalComponent;
} = {
  FRAME: IconLayerFrame16,
  COMPONENT: IconLayerComponent16,
};

type VariableItemProps = {
  data: SelectableVariableItem;
  areAllFieldsSelected: boolean;
  onToggleAll: (fields: LinkableVariableFieldItem[]) => void;
  children: (fields: SelectableVariableFieldItem[]) => ReactNode;
};

export const VariableListItemGroup = ({
  data,
  areAllFieldsSelected,
  onToggleAll,
  children,
}: VariableItemProps) => {
  const TypeIcon = NODE_TYPE_TO_ICON[data.node.type];

  const handleToggleAllClick = () => {
    onToggleAll(selectableItemsToLinkableItems(data.fields));
  };

  const handleTargetClick = () => {
    emit("NODE_FOCUS", data.node.id);
  };

  return (
    <div className="flex flex-col border-b border-figma-border last-of-type:border-none sticky">
      <div className="flex w-full items-center gap-1 border-b border-figma-border px-4 py-2 bg-figma-bg-secondary">
        {TypeIcon && <TypeIcon />}
        <span className="truncate">{data.node.name}</span>
        <div className="ml-auto flex gap-2">
          <Button intent="icon" size="small" onClick={handleToggleAllClick}>
            {areAllFieldsSelected ? (
              <IconCheckCircleFilled32 />
            ) : (
              <IconCheckCircle32 />
            )}
          </Button>
          <Button intent="icon" onClick={handleTargetClick}>
            <IconTarget32 />
          </Button>
        </div>
      </div>
      <table>
        <thead>
          <tr className="table-thead-row">
            <th>Remote</th>
            <th>Local</th>
            <th>Field</th>
          </tr>
        </thead>
        <tbody>{children(data.fields)}</tbody>
      </table>
    </div>
  );
};

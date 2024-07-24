import { h } from "preact";

import { FieldTag } from "./FieldTag";
import { Select } from "./Select";
import { useState } from "preact/hooks";
import { cn } from "../../utils";
import {
  LinkableVariableFieldItem,
  SelectableVariableFieldItem,
} from "../../modules/variables";
import { omit } from "remeda";

type VariableItemProps = {
  data: SelectableVariableFieldItem;
  selected: boolean;
  onSelect: (data: LinkableVariableFieldItem, selected: boolean) => void;
};

export const VariableListItem = ({
  data,
  selected,
  onSelect,
}: VariableItemProps) => {
  const [selectedLocalVariableId, setSelectedLocalVariableId] = useState(() => {
    if (data.localVariables.length === 1) return data.localVariables[0].id;
  });

  const localVariableOptions = data.localVariables.map((variable) => ({
    label: variable.name,
    value: variable.id,
  }));

  const handleSelect = () => {
    const selectedLocalVariable = data.localVariables.find(
      (variable) => variable.id === selectedLocalVariableId
    );

    if (selectedLocalVariable) {
      onSelect(
        {
          ...omit(data, ["localVariables"]),
          localVariable: selectedLocalVariable,
        },
        !selected
      );
    }
  };

  return (
    <tr
      className={cn(
        "last-of-type:border-none hover:bg-figma-bg-hover hover:cursor-pointer table-row",
        {
          "bg-figma-bg-selected hover:bg-figma-bg-selected-hover border-figma-border-onselected":
            selected,
        }
      )}
      onClick={handleSelect}
    >
      <td className="table-cell break-all">{data.remoteVariable.name}</td>
      <td className="table-cell">
        <Select
          options={localVariableOptions}
          value={selectedLocalVariableId}
          onChange={setSelectedLocalVariableId}
        />
      </td>
      <td className="table-cell">
        <FieldTag className="w-full" field={data.meta.nodeField} />
      </td>
    </tr>
  );
};

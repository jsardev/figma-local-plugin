import { Fragment, h } from "preact";
import { VariableListItem } from "../atoms/VariableListItem";
import { VariableListItemGroup } from "../atoms/VariableListItemGroup";
import { useAppState } from "../../modules/app/ui/context";
import { LinkableVariableFieldItem } from "../../modules/variables";

export const ContentData = () => {
  const { pagedItems, selectedFields, page } = useAppState();

  const handleItemSelect = (
    data: LinkableVariableFieldItem,
    selected: boolean
  ) => {
    selectedFields.value = selected
      ? [...selectedFields.value, data]
      : selectedFields.value.filter((item) => item.id !== data.id);
  };

  const handleItemToggleAll = (data: LinkableVariableFieldItem[]) => {
    const areAllSelected = data.every((item) =>
      selectedFields.value.includes(item)
    );

    selectedFields.value = areAllSelected
      ? selectedFields.value.filter((item) => !data.includes(item))
      : Array.from(new Set([...selectedFields.value, ...data]));
  };

  return (
    <Fragment>
      {pagedItems.value[page.value - 1].map((item) => (
        <VariableListItemGroup
          key={item.node.id}
          data={item}
          areAllFieldsSelected={item.fields.every((field) =>
            selectedFields.value.some((_field) => _field.id === field.id)
          )}
          onToggleAll={handleItemToggleAll}
        >
          {(fields) =>
            fields.map((field) => (
              <VariableListItem
                key={field.remoteVariable.id}
                data={field}
                selected={selectedFields.value.some(
                  (_field) => _field.id === field.id
                )}
                onSelect={handleItemSelect}
              />
            ))
          }
        </VariableListItemGroup>
      ))}
    </Fragment>
  );
};

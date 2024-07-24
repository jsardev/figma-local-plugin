import { h } from "preact";
import { cn } from "../../utils";
import {
  BoundVariablesKey,
  VariableBindableField,
  VariableFieldItemMetaNodeField,
} from "../../modules/variables";

const FIELD_TO_BG_COLOR: Record<VariableFieldItemMetaNodeField, string> = {
  width: "bg-green-600",
  minWidth: "bg-green-600",
  maxWidth: "bg-green-600",
  height: "bg-yellow-600",
  minHeight: "bg-yellow-600",
  maxHeight: "bg-yellow-600",
  topLeftRadius: "bg-orange-600",
  topRightRadius: "bg-orange-600",
  bottomRightRadius: "bg-orange-600",
  bottomLeftRadius: "bg-orange-600",
  itemSpacing: "bg-sky-600",
  counterAxisSpacing: "bg-sky-600",
  strokeWeight: "bg-fuchsia-600",
  strokeTopWeight: "bg-fuchsia-600",
  strokeRightWeight: "bg-fuchsia-600",
  strokeBottomWeight: "bg-fuchsia-600",
  strokeLeftWeight: "bg-fuchsia-600",
  paddingTop: "bg-indigo-600",
  paddingRight: "bg-indigo-600",
  paddingBottom: "bg-indigo-600",
  paddingLeft: "bg-indigo-600",
  characters: "bg-rose-600",
  visible: "bg-cyan-600",
  opacity: "bg-cyan-600",

  fills: "bg-violet-600",
  strokes: "bg-fuchsia-600",
  effects: "bg-emerald-600",
  layoutGrids: "bg-pink-600",
};

type FieldTagProps = {
  field: VariableFieldItemMetaNodeField;
  className?: string;
};

export const FieldTag = ({ field, className }: FieldTagProps) => {
  return (
    <div
      className={cn("rounded p-1 px-2", FIELD_TO_BG_COLOR[field], className)}
    >
      {field}
    </div>
  );
};

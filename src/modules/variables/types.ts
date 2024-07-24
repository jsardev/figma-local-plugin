import { EventHandler } from "@create-figma-plugin/utilities";
import { ProcessableNode } from "../app";

type BoundVariables = NonNullable<SceneNodeMixin["boundVariables"]>;
export type BoundVariablesKey = keyof BoundVariables;
export type BoundVariablesValue = VariableAlias | VariableAlias[] | undefined;

// TODO: Support `componentProperties`
export type VariableBindableField =
  | VariableBindableNodeField
  | VariableBindablePaintField
  | VariableBindableEffectField
  | VariableBindableLayoutGridField;

// @TODO: add support for: `VariableBindableTextField`, componentProperties, textRangeFills
export type SupportedBoundVariableKey =
  | Exclude<VariableBindableNodeField, "characters">
  | "fills"
  | "strokes"
  | "effects"
  | "layoutGrids";

export type VariableFieldItemMetaNodeField = VariableFieldItemMeta["nodeField"];

export type VariableFieldItem = {
  id: string;
  meta: VariableFieldItemMeta;
};

export type VariableBindableNodeObjectField =
  | "fills"
  | "strokes"
  | "effects"
  | "layoutGrids";

export type VariableBindableNodeObjectFieldValue =
  | SolidPaint
  | Effect
  | LayoutGrid;

type VariableCommonFieldMeta = {
  nodeFieldIndex?: number;
};

export type VariableNodeFieldMeta = VariableCommonFieldMeta & {
  field: VariableBindableNodeField;
  nodeField: VariableBindableNodeField;
  value: number | boolean | symbol | null;
};

export type VariablePaintFieldMeta = VariableCommonFieldMeta & {
  field: VariableBindablePaintField;
  nodeField: "fills" | "strokes";
  value: SolidPaint;
};

export type VariableEffectFieldMeta = VariableCommonFieldMeta & {
  field: VariableBindableEffectField;
  nodeField: "effects";
  value: Effect;
};

export type VariableLayoutGridFieldMeta = VariableCommonFieldMeta & {
  field: VariableBindableLayoutGridField;
  nodeField: "layoutGrids";
  value: LayoutGrid;
};

export type VariableFieldItemMeta =
  | VariableNodeFieldMeta
  | VariablePaintFieldMeta
  | VariableEffectFieldMeta
  | VariableLayoutGridFieldMeta;

export type SelectableVariableFieldItem = VariableFieldItem & {
  remoteVariable: Variable;
  localVariables: Variable[];
};

export type LinkableVariableFieldItem = VariableFieldItem & {
  localVariable: Variable;
};

export type VariableItem = {
  node: Pick<ProcessableNode, "id" | "name" | "type">;
};

export type SelectableVariableItem = VariableItem & {
  fields: SelectableVariableFieldItem[];
};

export type LinkableVariableItem = VariableItem & {
  fields: LinkableVariableFieldItem[];
};

export interface ScanVariablesHandler extends EventHandler {
  name: "SCAN_VARIABLES";
  handler: () => void;
}

export interface ScanVariablesCompletedHandler extends EventHandler {
  name: "SCAN_VARIABLES_COMPLETED";
  handler: (data: SelectableVariableItem[]) => void;
}

export interface LinkVariablesHandler extends EventHandler {
  name: "LINK_VARIABLES";
  handler: (data: LinkableVariableItem[]) => void;
}

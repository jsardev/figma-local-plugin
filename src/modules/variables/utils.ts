import { pipe, filter, isNonNull, isArray, pick, keys, clone } from "remeda";
import {
  BoundVariablesKey,
  BoundVariablesValue,
  LinkableVariableFieldItem,
  SelectableVariableFieldItem,
  SupportedBoundVariableKey,
  VariableBindableField,
  VariableBindableNodeObjectFieldValue,
  VariableEffectFieldMeta,
  VariableFieldItemMeta,
  VariableLayoutGridFieldMeta,
  VariableNodeFieldMeta,
  VariablePaintFieldMeta,
} from "./types";
import { ProcessableNode } from "../app";
import { SUPPORTED_FIELDS } from "./constants";

export const isRemoteVariable = (variable: Variable) =>
  variable.remote === true;

export const mapVariableAliasesToRemoteVariables = async (
  variables: VariableAlias[]
) =>
  pipe(
    await Promise.all(
      variables.map((variable) =>
        figma.variables.getVariableByIdAsync(variable.id)
      )
    ),
    filter(isNonNull),
    filter(isRemoteVariable)
  );

export const resolveBoundVariable = async (
  value: BoundVariablesValue
): Promise<Variable[] | undefined> => {
  if (value) {
    const valueAsArray = isArray(value) ? value : [value];
    const remoteVariables = await mapVariableAliasesToRemoteVariables(
      valueAsArray
    );

    // const collection = await figma.variables.getVariableCollectionByIdAsync(
    //   remoteValue[0]?.variableCollectionId
    // );

    return clone(remoteVariables);
  }
};

export const resolveMatchingLocalVariables = async (
  localVariables: Variable[],
  remoteVariable: Variable
): Promise<Variable[]> => {
  const matchingLocalVariables = localVariables
    .filter((localVariable) => localVariable.name === remoteVariable.name)
    .map((localVariable) => clone(localVariable));

  const result: Variable[] = [];

  for (const matchingLocalVariable of matchingLocalVariables) {
    const collection = await figma.variables.getVariableCollectionByIdAsync(
      matchingLocalVariable.variableCollectionId
    );
    result.push(clone(matchingLocalVariable));
  }

  return result;
};

export const selectableItemsToLinkableItems = (
  fields: SelectableVariableFieldItem[]
): LinkableVariableFieldItem[] => {
  return fields
    .filter((field) => field.localVariables.length === 1)
    .map(({ localVariables, ...field }) => ({
      ...field,
      localVariable: localVariables[0],
    }));
};

const getMatchingBoundVariable = <T extends VariableBindableField>(
  boundVariables: Record<any, VariableAlias> | undefined,
  variable: Variable
): [T, VariableAlias] | [] => {
  if (!boundVariables) return [];

  return Object.keys(boundVariables).reduce<[T, VariableAlias] | []>(
    (result, key) => {
      const value = boundVariables[key];
      if (value.id === variable.id) {
        return [key, value] as [T, VariableAlias];
      }
      return result;
    },
    []
  );
};

export const getVariableMetaForPaint = (
  paints: readonly Paint[] | typeof figma.mixed,
  variable: Variable,
  nodeField: "fills" | "strokes"
): VariablePaintFieldMeta | undefined => {
  if (typeof paints === "symbol") {
    return;
  }

  for (const [index, value] of paints.entries()) {
    if (value.type === "SOLID") {
      const [field, boundVariable] =
        getMatchingBoundVariable<VariableBindablePaintField>(
          value.boundVariables,
          variable
        );
      if (field && boundVariable) {
        return {
          field,
          nodeField,
          nodeFieldIndex: index,
          value,
        };
      }
    }
  }
};

export const getVariableMetaForEffect = (
  effects: readonly Effect[],
  variable: Variable
): VariableEffectFieldMeta | undefined => {
  for (const [index, value] of effects.entries()) {
    const [field, boundVariable] =
      getMatchingBoundVariable<VariableBindableEffectField>(
        value.boundVariables,
        variable
      );
    if (field && boundVariable) {
      return {
        field,
        nodeField: "effects",
        nodeFieldIndex: index,
        value,
      };
    }
  }
};

export const getVariableMetaForLayoutGrid = (
  layoutGrids: readonly LayoutGrid[],
  variable: Variable
): VariableLayoutGridFieldMeta | undefined => {
  for (const [index, value] of layoutGrids.entries()) {
    const [field, boundVariable] =
      getMatchingBoundVariable<VariableBindableLayoutGridField>(
        value.boundVariables,
        variable
      );
    if (field && boundVariable) {
      return {
        field,
        nodeField: "layoutGrids",
        nodeFieldIndex: index,
        value,
      };
    }
  }
};

// export const getVariableMetaForGeneric = (
//   value: VariableValue,
//   variable: Variable
// ): VariableNodeFieldMeta | undefined => {
//   for (const [index, value] of layoutGrids.entries()) {
//     const [field, boundVariable] =
//       getMatchingBoundVariable<VariableBindableLayoutGridField>(
//         value.boundVariables,
//         variable
//       );
//     if (field && boundVariable) {
//       return {
//         field,
//         nodeField: "layoutGrids",
//         nodeFieldIndex: index,
//         value,
//       };
//     }
//   }
// };

export const isSupportedBoundVariable = (
  field: string
): field is SupportedBoundVariableKey => {
  return SUPPORTED_FIELDS.includes(field);
};

import { on, emit, getSceneNodeById } from "@create-figma-plugin/utilities";
import { chunk, isEmpty, keys, pick, clone } from "remeda";
import { AppState, ProcessableNode, ScanProgressHandler } from "../app/types";
import {
  ScanVariablesHandler,
  BoundVariablesValue,
  SelectableVariableFieldItem,
  ScanVariablesCompletedHandler,
  LinkVariablesHandler,
  SelectableVariableItem,
  VariableFieldItemMeta,
} from "./types";
import {
  getVariableMetaForEffect,
  getVariableMetaForFills,
  getVariableMetaForLayoutGrid,
  getVariableMetaForPaint,
  isSupportedBoundVariable,
  resolveBoundVariable,
  resolveMatchingLocalVariables,
} from "./utils";
import { getProcessableNodes } from "../app";

export const setupVariablesEventHandlers = (state: AppState) => {
  on<ScanVariablesHandler>("SCAN_VARIABLES", async function () {
    state.scan.active = true;

    const nodes = getProcessableNodes();

    emit<ScanProgressHandler>("SCAN_PROGRESS", {
      current: 0,
      total: nodes.length,
      percentage: 0,
    });

    let current = 0;
    const items: SelectableVariableItem[] = [];
    const chunkedNodes = chunk(nodes, 5);
    const localVariables = await figma.variables.getLocalVariablesAsync();

    const registerField = (
      node: ProcessableNode,
      field: SelectableVariableFieldItem
    ) => {
      const existingItem = items.find((item) => item.node.id === node.id);

      if (existingItem) {
        existingItem.fields.push(field);
      } else {
        items.push({
          node: pick(node, ["id", "name", "type"]),
          fields: [field],
        });
      }
    };

    for (const nodeChunk of chunkedNodes) {
      if (!state.scan.active) {
        break;
      }

      for (const node of nodeChunk) {
        if (!state.scan.active) {
          break;
        }

        if (!node.boundVariables || isEmpty(node.boundVariables)) {
          continue;
        }

        for (const nodeField of keys.strict(node.boundVariables)) {
          if (!isSupportedBoundVariable(nodeField)) {
            console.warn(`skipping unsupported field: ${nodeField}`);
            continue;
          }

          const boundVariable = node.boundVariables[
            nodeField
          ] as BoundVariablesValue;
          const remoteVariables = await resolveBoundVariable(boundVariable);

          if (remoteVariables && remoteVariables.length > 0) {
            for (const remoteVariable of remoteVariables) {
              const matchingLocalVariables =
                await resolveMatchingLocalVariables(
                  localVariables,
                  remoteVariable
                );

              let meta: VariableFieldItemMeta | undefined;

              switch (nodeField) {
                case "fills": {
                  meta = getVariableMetaForPaint(
                    node.fills,
                    remoteVariable,
                    "fills"
                  );
                  break;
                }
                case "strokes": {
                  meta = getVariableMetaForPaint(
                    node.strokes,
                    remoteVariable,
                    "strokes"
                  );
                  break;
                }
                case "effects": {
                  meta = getVariableMetaForEffect(node.effects, remoteVariable);
                  break;
                }
                case "layoutGrids": {
                  meta = getVariableMetaForLayoutGrid(
                    node.layoutGrids,
                    remoteVariable
                  );
                  break;
                }
                default: {
                  meta = {
                    field: nodeField,
                    nodeField,
                    value: node[nodeField],
                  };
                }
              }

              console.log({ meta });

              if (!meta) {
                console.warn(`meta not found for field ${nodeField}`);
                continue;
              }

              const itemFieldEntry: SelectableVariableFieldItem = {
                id: `${node.id}-${nodeField}`,
                remoteVariable,
                localVariables: matchingLocalVariables,
                meta,
              };

              console.log({ itemFieldEntry });

              const existingItem = items.find(
                (item) => item.node.id === node.id
              );

              if (existingItem) {
                existingItem.fields.push(itemFieldEntry);
              } else {
                items.push({
                  node: pick(node, ["id", "name", "type"]),
                  fields: [itemFieldEntry],
                });
              }
            }
          }
        }
      }

      emit<ScanProgressHandler>("SCAN_PROGRESS", {
        current: (current += nodeChunk.length),
        total: nodes.length,
        percentage: Math.ceil((current / nodes.length) * 100),
      });

      // This allows the UI to catch up and unfreeze for a while to update the UI
      await new Promise((resolve) => setTimeout(resolve, 10));
    }

    emit<ScanVariablesCompletedHandler>(
      "SCAN_VARIABLES_COMPLETED",
      !state.scan.active ? [] : items
    );

    on<LinkVariablesHandler>("LINK_VARIABLES", async (data) => {
      console.log({ data });

      for (const item of data) {
        const node = getSceneNodeById(item.node.id) as ProcessableNode;

        console.log({ node });

        // for (const fieldItem of item.fields) {
        //   switch (fieldItem.meta.field) {
        //     case "color": {
        //       const nodeFillsCopy = clone(node.fills) as SolidPaint[];
        //       const localVariable = await figma.variables.getVariableByIdAsync(
        //         fieldItem.localVariable.id
        //       );

        //       nodeFillsCopy[fieldItem.meta.index] =
        //         figma.variables.setBoundVariableForPaint(
        //           nodeFillsCopy[fieldItem.meta.index],
        //           fieldItem.meta.field,
        //           localVariable
        //         );

        //       console.log({ nodeFillsCopy, localVariable });

        //       node.fills = nodeFillsCopy;
        //     }
        //   }
        // }
      }
    });
  });
};

// const setBoundVariable = async (node: SceneNode, field: BoundVariablesKey, variableId: string) => {

//   switch(field) {
//     case 'fills': {
//       return figma.variables.setBoundVariableForPaint
//       return node.
//     }
//   }
// }

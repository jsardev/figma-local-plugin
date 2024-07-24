import { ProcessableNodeType, ProcessableNode } from "./types";

export const PROCESSABLE_NODE_TYPES: ProcessableNodeType[] = [
  "FRAME",
  "COMPONENT",
  "COMPONENT_SET",
];

export const PROCESSABLE_FIND_ALL_CRITERIA: FindAllCriteria<
  ProcessableNodeType[]
> = {
  types: PROCESSABLE_NODE_TYPES,
};

export const isProcessableNodeType = (
  node: SceneNode
): node is ProcessableNode =>
  PROCESSABLE_NODE_TYPES.includes(node.type as ProcessableNodeType);

export const getProcessableNodes = () => {
  let nodes: ProcessableNode[] = [];

  if (figma.currentPage.selection.length) {
    nodes = figma.currentPage.selection
      .filter(isProcessableNodeType)
      .reduce(
        (result, node) => [
          ...result,
          node,
          ...node.findAllWithCriteria(PROCESSABLE_FIND_ALL_CRITERIA),
        ],
        [] as ProcessableNode[]
      );
  } else {
    nodes = figma.currentPage.findAllWithCriteria(
      PROCESSABLE_FIND_ALL_CRITERIA
    ) as ProcessableNode[];
  }

  return nodes;
};

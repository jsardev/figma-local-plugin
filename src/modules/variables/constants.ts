export const SUPPORTED_VARIABLE_BINDABLE_NODE_SCALAR_FIELDS =
  [
    "height",
    "width",
    "itemSpacing",
    "paddingLeft",
    "paddingRight",
    "paddingTop",
    "paddingBottom",
    "visible",
    "topLeftRadius",
    "topRightRadius",
    "bottomLeftRadius",
    "bottomRightRadius",
    "minWidth",
    "maxWidth",
    "minHeight",
    "maxHeight",
    "counterAxisSpacing",
    "strokeWeight",
    "strokeTopWeight",
    "strokeRightWeight",
    "strokeBottomWeight",
    "strokeLeftWeight",
    "opacity",
  ]

export const SUPPORTED_VARIABLE_BINDABLE_NODE_OBJECT_FIELDS = [
  "fills",
  "strokes",
  "effects",
  "layoutGrids",
];

export const SUPPORTED_FIELDS = [
  ...SUPPORTED_VARIABLE_BINDABLE_NODE_SCALAR_FIELDS,
  ...SUPPORTED_VARIABLE_BINDABLE_NODE_OBJECT_FIELDS,
];

import { range } from "remeda";

const BOUNDARY_COUNT = 1;
const SIBLING_COUNT = 1;

type UsePaginationProps = {
  page: number;
  count: number;
  disabled?: boolean;
  onChange: (page: number) => void;
};

export type UsePaginationItemType =
  | "page"
  | "first"
  | "previous"
  | "ellipsis"
  | "next"
  | "last";

export type UsePaginationItem = {
  type: UsePaginationItemType;
  page: number;
  selected: boolean;
  disabled: boolean;
  onClick: () => void;
};

export const usePagination = ({
  page,
  count,
  disabled = false,
  onChange,
}: UsePaginationProps): {
  items: UsePaginationItem[];
} => {
  const startPages = range(1, Math.min(BOUNDARY_COUNT, count) + 1);
  const endPages = range(
    Math.max(count - BOUNDARY_COUNT + 1, BOUNDARY_COUNT + 1),
    count + 1
  );

  const siblingsStart = Math.max(
    Math.min(
      page - SIBLING_COUNT,
      count - BOUNDARY_COUNT - SIBLING_COUNT * 2 - 1
    ),
    BOUNDARY_COUNT + 2
  );

  const siblingsEnd = Math.min(
    Math.max(page + SIBLING_COUNT, BOUNDARY_COUNT + SIBLING_COUNT * 2 + 2),
    endPages.length > 0 ? endPages[0] - 2 : count - 1
  );

  // Basic list of items to render
  // for example itemList = ['first', 'previous', 1, 'ellipsis', 4, 5, 6, 'ellipsis', 10, 'next', 'last']
  const itemList = [
    "first",
    "previous",
    ...startPages,
    ...(siblingsStart > BOUNDARY_COUNT + 2
      ? ["ellipsis"]
      : BOUNDARY_COUNT + 1 < count - BOUNDARY_COUNT
      ? [BOUNDARY_COUNT + 1]
      : []),
    ...range(siblingsStart, siblingsEnd + 1),
    ...(siblingsEnd < count - BOUNDARY_COUNT - 1
      ? ["ellipsis"]
      : count - BOUNDARY_COUNT > BOUNDARY_COUNT
      ? [count - BOUNDARY_COUNT]
      : []),
    ...endPages,
    "next",
    "last",
  ];

  const buttonPage = (type: UsePaginationItemType) => {
    switch (type) {
      case "first":
        return 1;
      case "previous":
        return page - 1;
      case "next":
        return page + 1;
      case "last":
        return count;
      default:
        return 1;
    }
  };

  const items = itemList.map((item) => {
    if (typeof item === "number") {
      return {
        type: "page",
        page: item,
        selected: item === page,
        disabled,
        onClick: () => onChange(item),
      };
    }

    const buttonTypePage = buttonPage(item as UsePaginationItemType);
    const buttonTypeDisabled =
      disabled ||
      (item !== "ellipsis" &&
        (item === "next" || item === "last" ? page >= count : page <= 1));

    return {
      type: item,
      page: buttonTypePage,
      selected: false,
      disabled: buttonTypeDisabled,
      onClick: () => onChange(buttonTypePage),
    };
  }) as UsePaginationItem[];

  return { items };
};

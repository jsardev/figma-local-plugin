import { h } from "preact";
import {
  UsePaginationItemType,
  UsePaginationItem,
} from "../../hooks/usePagination";
import { cn } from "../../utils";

const PAGINATION_ITEM_VALUE: Record<
  UsePaginationItemType,
  (value?: any) => string | number
> = {
  first: () => "<<",
  previous: () => "<",
  ellipsis: () => "...",
  next: () => ">",
  last: () => ">>",
  page: (page: number) => page,
};

type PaginationItemProps = {
  item: UsePaginationItem;
};

export const PaginationItem = ({ item }: PaginationItemProps) => {
  const paginationItemValue = PAGINATION_ITEM_VALUE[item.type];

  return (
    <li
      className={cn(
        "py-1 rounded-lg cursor-pointer w-[3ch] flex justify-center items-center",
        item.selected ? "bg-figma-bg-brand" : "bg-figma-bg-tertiary",
        item.disabled && "opacity-50 pointer-events-none"
      )}
      onClick={item.onClick}
    >
      {paginationItemValue(item.page)}
    </li>
  );
};

import { Fragment, h } from "preact";
import { cn } from "../../utils";
import { PaginationItem } from "../atoms/PaginationItem";
import { useAppState } from "../../modules/app/ui/context";
import { usePagination } from "../../hooks/usePagination";

const ITEMS_PER_PAGE_OPTIONS = [25, 50, 100];

export const PaginationBar = () => {
  const { items, pagedItems, hasItems, page, itemsPerPage, isLoading } =
    useAppState();

  const { items: paginationItems } = usePagination({
    count: pagedItems.value.length,
    page: page.value,
    onChange: (value) => {
      page.value = value;
    },
  });

  const onItemClick = (value: number) => () => {
    page.value = 1;
    itemsPerPage.value = value;
  };

  return (
    <div className="w-full flex justify-between items-center container border-t border-figma-border h-12">
      {hasItems.value && !isLoading.value && (
        <Fragment>
          <div className="flex gap-2 items-center">
            <span className="shrink-0">Items per page:</span>
            <ul className="flex gap-2">
              {ITEMS_PER_PAGE_OPTIONS.map((itemsPerPageItem, index) => (
                <li
                  className={cn(
                    "px-2 py-1 rounded-lg cursor-pointer disabled:pointer-events-none disabled:opacity-50",
                    itemsPerPageItem === itemsPerPage.value
                      ? "bg-figma-bg-brand"
                      : "bg-figma-bg-tertiary"
                  )}
                  disabled={
                    index !== 0 && items.value.length < itemsPerPageItem
                  }
                  onClick={onItemClick(itemsPerPageItem)}
                >
                  {itemsPerPageItem}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ul className="flex gap-2">
              {paginationItems.map((paginationItem) => (
                <PaginationItem
                  key={`${paginationItem.type}-${paginationItem.page}`}
                  item={paginationItem}
                />
              ))}
            </ul>
          </div>
        </Fragment>
      )}
    </div>
  );
};

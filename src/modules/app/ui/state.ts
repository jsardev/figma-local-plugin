import { computed, signal } from "@preact/signals";
import { chunk } from "remeda";
import {
  LinkableVariableFieldItem,
  LinkableVariableItem,
  SelectableVariableItem,
} from "../../variables";
import { Progress } from "../types";

export const createAppState = () => {
  const page = signal(1);
  const itemsPerPage = signal(25);
  const items = signal<SelectableVariableItem[]>([]);
  const pagedItems = computed(() => chunk(items.value, itemsPerPage.value));
  const itemsFields = computed(() =>
    items.value.flatMap((item) => item.fields)
  );
  const hasItems = computed(() => items.value.length > 0);
  const selectedFields = signal<LinkableVariableFieldItem[]>([]);
  const areAllFieldsSelected = computed(
    () => selectedFields.value.length === itemsFields.value.length
  );
  const isLoading = signal(false);
  const progress = signal<Progress | null>(null);

  return {
    page,
    itemsPerPage,
    items,
    pagedItems,
    itemsFields,
    hasItems,
    selectedFields,
    areAllFieldsSelected,
    isLoading,
    progress,
  };
};

export type AppState = ReturnType<typeof createAppState>;

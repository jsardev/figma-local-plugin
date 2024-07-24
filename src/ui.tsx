import "!./output.css";

import { render, useWindowResize } from "@create-figma-plugin/ui";
import { emit, on } from "@create-figma-plugin/utilities";
import { h } from "preact";
import { useCallback, useEffect } from "preact/hooks";

import { cn } from "./utils";
import { NavigationBar } from "./components/organisms/NavigationBar";
import { PaginationBar } from "./components/organisms/PaginationBar";
import { ActionsBar } from "./components/organisms/ActionsBar";
import { ContentProgress } from "./components/molecules/ContentProgress";
import { ContentIdle } from "./components/molecules/ContentIdle";
import { ContentData } from "./components/molecules/ContentData";
import { AppStateProvider, useAppState } from "./modules/app/ui/context";
import {
  Progress,
  ScanCancelHandler,
  ScanProgressHandler,
} from "./modules/app";
import {
  LinkVariablesHandler,
  ScanVariablesCompletedHandler,
  ScanVariablesHandler,
  SelectableVariableItem,
  VariableItem,
  selectableItemsToLinkableItems,
} from "./modules/variables";

function App() {
  return (
    <AppStateProvider>
      <Plugin />
    </AppStateProvider>
  );
}

function Plugin() {
  const {
    items,
    itemsFields,
    selectedFields,
    areAllFieldsSelected,
    hasItems,
    isLoading,
    progress,
  } = useAppState();

  // TODO: should be generic, not tied to variables
  const handleScanClick = useCallback(() => {
    isLoading.value = true;
    emit<ScanVariablesHandler>("SCAN_VARIABLES");
  }, []);

  const handleScanCancelClick = useCallback(() => {
    isLoading.value = false;
    emit<ScanCancelHandler>("SCAN_CANCEL");
  }, []);

  const handleScanProgress = useCallback((data: Progress) => {
    progress.value = data;
  }, []);

  // TODO: should be generic, not tied to variables
  const handleScanCompleted = useCallback((data: SelectableVariableItem[]) => {
    items.value = data;
    selectedFields.value = [];
    isLoading.value = false;
    progress.value = null;
  }, []);

  const handleLink = () => {
    emit<LinkVariablesHandler>(
      "LINK_VARIABLES",
      items.value.map((item) => {
        const itemFieldIds = item.fields.flatMap((field) => field.id);

        return {
          ...item,
          fields: selectedFields.value.filter((field) =>
            itemFieldIds.includes(field.id)
          ),
        };
      })
    );
  };

  const handleToggleAll = () => {
    if (areAllFieldsSelected.value) {
      selectedFields.value = [];
    } else {
      selectedFields.value = selectableItemsToLinkableItems(itemsFields.value);
    }
  };

  // TODO: add settings page
  const handleSettingsClick = () => {};

  useEffect(() => {
    on<ScanProgressHandler>("SCAN_PROGRESS", handleScanProgress);
    on<ScanVariablesCompletedHandler>(
      "SCAN_VARIABLES_COMPLETED",
      handleScanCompleted
    );
  }, []);

  const handleWindowResize = (windowSize: {
    width: number;
    height: number;
  }) => {
    emit("WINDOW_RESIZE", windowSize);
  };

  useWindowResize(handleWindowResize, {
    minWidth: 640,
    minHeight: 640,
    maxWidth: 1024,
    maxHeight: 1024,
  });

  return (
    <div className="h-screen relative flex flex-col overflow-hidden">
      <NavigationBar onSettingsClick={handleSettingsClick} />
      {!isLoading.value && hasItems.value && (
        <ActionsBar onLink={handleLink} onToggleAll={handleToggleAll} />
      )}
      <div
        className={cn("flex-1 overflow-auto text-figma-base block", {
          "flex items-center justify-center":
            (isLoading.value && progress.value) || !hasItems.value,
        })}
      >
        {isLoading.value && progress.value !== null ? (
          <ContentProgress
            progress={progress.value}
            onCancelClick={handleScanCancelClick}
          />
        ) : !hasItems.value ? (
          <ContentIdle onScanClick={handleScanClick} />
        ) : (
          <ContentData />
        )}
      </div>
      <PaginationBar />
    </div>
  );
}

export default render(App);

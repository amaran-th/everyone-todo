import { useState, useCallback, useRef, useEffect } from "react";

export interface ContextMenuItem {
  label: string;
  action: () => void;
}

interface ContextMenuState {
  x: number;
  y: number;
  menuItems: ContextMenuItem[];
  isOpen: boolean;
}

const useContextMenu = () => {
  const [contextMenuState, setContextMenuState] = useState<ContextMenuState>({
    x: 0,
    y: 0,
    menuItems: [],
    isOpen: false,
  });

  const contextMenuRef = useRef<HTMLDivElement>(null);
  const initialPositionRef = useRef<{
    x: number;
    y: number;
    scrollX: number;
    scrollY: number;
  }>({ x: 0, y: 0, scrollX: 0, scrollY: 0 });
  const scrollContainerRef = useRef<HTMLElement | null>(null);
  const standardContainerRef = useRef<HTMLElement | null>(null);

  const handleContextMenu = useCallback(
    (
      event: React.MouseEvent,
      menuItems: ContextMenuItem[],
      scrollContainer: HTMLElement | null,
      standardContainer: HTMLElement | null
    ) => {
      event.preventDefault();

      const clickX = event.clientX;
      const clickY = event.clientY;

      initialPositionRef.current = {
        x: clickX,
        y: clickY,
        scrollX: scrollContainer?.scrollLeft ?? 0,
        scrollY: scrollContainer?.scrollTop ?? 0,
      };
      scrollContainerRef.current = scrollContainer;
      standardContainerRef.current = standardContainer;

      setContextMenuState({
        x: clickX,
        y: clickY,
        menuItems: menuItems,
        isOpen: true,
      });
    },
    []
  );

  const handleCloseContextMenu = useCallback(() => {
    setContextMenuState((prevState) => ({
      ...prevState,
      isOpen: false,
    }));
  }, []);

  const handleMenuItemClick = useCallback(
    (action: () => void) => {
      action();
      handleCloseContextMenu();
    },
    [handleCloseContextMenu]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target as Node)
      ) {
        handleCloseContextMenu();
      }
    };

    const adjustPositionOnScroll = () => {
      if (contextMenuState.isOpen && scrollContainerRef.current) {
        const {
          x: initialX,
          y: initialY,
          scrollX: initialScrollX,
          scrollY: initialScrollY,
        } = initialPositionRef.current;
        const { scrollLeft, scrollTop } = scrollContainerRef.current;
        const top = standardContainerRef.current?.offsetTop;
        const adjustedX = initialX + (initialScrollX - scrollLeft);
        const adjustedY = initialY + (initialScrollY - scrollTop);

        setContextMenuState((prevState) => ({
          ...prevState,
          x: adjustedX,
          y: adjustedY,
        }));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener(
        "scroll",
        adjustPositionOnScroll
      );
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener(
          "scroll",
          adjustPositionOnScroll
        );
      }
    };
  }, [contextMenuState.isOpen, handleCloseContextMenu]);

  return {
    contextMenuState,
    handleContextMenu,
    handleMenuItemClick,
    contextMenuRef,
  };
};

export default useContextMenu;

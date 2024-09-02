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
  const initialPositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const scrollContainerRef = useRef<HTMLElement | null>(null);

  const handleContextMenu = useCallback(
    (
      event: React.MouseEvent,
      menuItems: ContextMenuItem[],
      scrollContainer: HTMLElement | null
    ) => {
      event.preventDefault();

      const clickX = event.clientX;
      const clickY = event.clientY;

      initialPositionRef.current = { x: clickX, y: clickY };
      scrollContainerRef.current = scrollContainer;

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
        const { x: initialX, y: initialY } = initialPositionRef.current;
        const { scrollLeft, scrollTop } = scrollContainerRef.current;

        const adjustedX = initialX - scrollLeft;
        const adjustedY = initialY - scrollTop;

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

import useContextMenu, { ContextMenuItem } from "@/lib/hooks/useContextMenu";

const ContextMenu = () => {
  const {
    contextMenuRef,
    contextMenuState,
    handleContextMenu,
    handleMenuItemClick,
  } = useContextMenu();

  const handleRightClick = (event: React.MouseEvent) => {
    const menuItems: ContextMenuItem[] = [
      {
        label: "수정",
        action: () =>
          handleMenuItemClick(() => {
            console.log("Open action is triggering");
          }),
      },
      {
        label: "삭제",
        action: () =>
          handleMenuItemClick(() => {
            console.log("Rename action is triggering");
          }),
      },
    ];

    handleContextMenu(event, menuItems);
  };
  return (
    <div>
      {contextMenuState.isOpen && (
        <div
          ref={contextMenuRef}
          className="fixed rounded bg-gray-100 border border-gray-300 shadow shadow-gray-500 py-1 z-50"
          style={{ top: contextMenuState.y, left: contextMenuState.x }}
        >
          {contextMenuState.menuItems.map((item) => (
            <div
              key={item.label}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              onClick={() => item.action()}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContextMenu;

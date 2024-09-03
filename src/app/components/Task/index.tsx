import { useAppSelector } from "@/lib/hooks/redux";
import useContextMenu, { ContextMenuItem } from "@/lib/hooks/useContextMenu";
import { TaskResponseDto } from "@/types/dto/task.dto";
import { Draggable } from "@hello-pangea/dnd";
import classNames from "classnames";
import { RefObject, useRef } from "react";

interface TaskProps {
  task: TaskResponseDto;
  index: number;
  scrollContainerRef: RefObject<HTMLElement>;
}

const Task = ({ task, index, scrollContainerRef }: TaskProps) => {
  const auth = useAppSelector((state) => state.auth.value);
  const standardContainerRef = useRef<HTMLElement | null>(null);

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

    handleContextMenu(
      event,
      menuItems,
      scrollContainerRef.current!!,
      standardContainerRef.current!!
    );
  };

  if (
    auth.user_id > 0 &&
    (task.owner_id === auth.user_id || task.owner_id === null)
  )
    return (
      <Draggable
        key={task.todo_id}
        draggableId={task.todo_id.toString()}
        index={index}
      >
        {(provided, snapshot) => (
          <>
            <div
              ref={(node) => {
                provided.innerRef(node);
                standardContainerRef.current = node;
              }}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className={classNames(
                "w-full bg-white rounded-md border border-border shadow-md p-2 transition-colors hover:bg-border touch-none",
                snapshot.isDragging && "bg-border"
              )}
              onContextMenu={handleRightClick}
              style={{
                ...provided.draggableProps.style,
                zIndex: snapshot.isDragging ? 1000 : "auto",
                transform: snapshot.isDragging
                  ? provided.draggableProps.style?.transform
                  : "none", // 드래그 중이 아닐 때는 이동이 없도록
              }}
            >
              <div className="flex w-full">
                <p className="font-bold flex-grow truncate">{task.title}</p>
                {task.owner_id > 0 && (
                  <p className="text-primary text-xs">@{task.owner_name}</p>
                )}
              </div>
              <p
                className="text-comment text-sm text-ellipsis overflow-hidden"
                style={{ WebkitLineClamp: 2 }}
              >
                {task.description}
              </p>
              {contextMenuState.isOpen && (
                <div
                  ref={contextMenuRef}
                  className="fixed rounded bg-white border border-border shadow"
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
          </>
        )}
      </Draggable>
    );
  return (
    <div
      className={classNames(
        "select-none w-full bg-white rounded-md border border-border shadow-md p-2 transition-colors hover:bg-border touch-none"
      )}
    >
      <div className="flex w-full">
        <p className="font-bold flex-grow truncate">{task.title}</p>
        {task.owner_id > 0 && (
          <p className="text-primary text-xs">@{task.owner_name}</p>
        )}
      </div>
      <p
        className="text-comment text-sm text-ellipsis overflow-hidden"
        style={{ WebkitLineClamp: 2 }}
      >
        {task.description}
      </p>
    </div>
  );
};

export default Task;

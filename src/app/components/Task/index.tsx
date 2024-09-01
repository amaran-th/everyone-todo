import { useAppSelector } from "@/lib/hooks/redux";
import { TaskResponseDto } from "@/types/dto/task.dto";
import { Draggable } from "@hello-pangea/dnd";
import classNames from "classnames";

interface TaskProps {
  task: TaskResponseDto;
  index: number;
}

const Task = ({ task, index }: TaskProps) => {
  const auth = useAppSelector((state) => state.auth.value);
  if (task.owner_id === auth.user_id || task.owner_id === null)
    return (
      <Draggable
        key={task.todo_id}
        draggableId={task.todo_id.toString()}
        index={index}
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={classNames(
              "w-full bg-white rounded-md border border-border shadow-md p-2 transition-colors hover:bg-border touch-none",
              snapshot.isDragging && "bg-border"
            )}
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
              {task.owner_id && (
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
        )}
      </Draggable>
    );
  return (
    <div
      className={classNames(
        "w-full bg-white rounded-md border border-border shadow-md p-2 transition-colors hover:bg-border touch-none"
      )}
    >
      <div className="flex w-full">
        <p className="font-bold flex-grow truncate">{task.title}</p>
        <p className="text-primary text-xs">@{task.owner_name}</p>
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

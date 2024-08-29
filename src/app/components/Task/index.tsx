import { TaskResponseDto } from "@/types/dto/task.dto";

interface TaskProps {
  task: TaskResponseDto;
}

const Task = ({ task }: TaskProps) => {
  return (
    <div className="w-full bg-white rounded-md border border-border shadow-md p-2">
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
  );
};

export default Task;

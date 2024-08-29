import { useTodoQuery } from "@/lib/hooks/useApi";
import { TaskStatus } from "@/types/dto/task.dto";
import { CgMathPlus } from "@react-icons/all-files/cg/CgMathPlus";
import Task from "../Task";

interface TaskGroupProps {
  status: TaskStatus;
  openBackLogAddModal: () => void;
}

const TaskGroup = ({ status, openBackLogAddModal }: TaskGroupProps) => {
  const { data: tasks } = useTodoQuery(status, 20, 0);
  return (
    <div className="flex flex-col gap-1 flex-1 w-full max-w-[300px]">
      <div className="flex justify-between items-center">
        <p className="font-bold">{status}</p>
        {status === TaskStatus.BACKLOG && (
          <button
            onClick={openBackLogAddModal}
            className="rounded-md border-border px-1 bg-gray-300"
          >
            <CgMathPlus className="w-6 h-6" />
          </button>
        )}
      </div>
      <div className="h-0 border border-black" />
      <div className="flex overflow-y-scroll h-[70vh] flex-col gap-2">
        {tasks?.todos.map((task) => (
          <Task key={task.todo_id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskGroup;

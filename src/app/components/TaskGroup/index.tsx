import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { useTodoCursorQuery } from "@/lib/hooks/useApi";
import { initializeTasks, setTasks } from "@/store/task.slice";
import { TaskResponseDto, TaskStatus } from "@/types/dto/task.dto";
import { Droppable } from "@hello-pangea/dnd";
import { CgMathPlus } from "@react-icons/all-files/cg/CgMathPlus";
import classNames from "classnames";
import { useCallback, useEffect, useRef } from "react";
import Task from "../Task";

interface TaskGroupProps {
  status: TaskStatus;
  keyword: string;
  openBackLogAddModal: () => void;
}

const TaskGroup = ({
  status,
  keyword,
  openBackLogAddModal,
}: TaskGroupProps) => {
  const taskGroup = useAppSelector((state) => state.tasks.value);
  const userId = useAppSelector((state) => state.auth.value.user_id);
  const dispatch = useAppDispatch();

  const {
    data: loadedTasks,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useTodoCursorQuery(status, keyword);

  const observer = useRef<IntersectionObserver | null>(null);
  const scrollContainerRef = useRef<HTMLElement | null>(null);

  const lastTaskElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (isFetching || !hasNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [fetchNextPage, isFetching, hasNextPage]
  );
  useEffect(() => {
    if (loadedTasks) {
      dispatch(
        setTasks({
          status,
          tasks: loadedTasks.pages.flatMap(
            (page: { todos: TaskResponseDto[] }) => page.todos
          ),
        })
      );
    }
  }, [loadedTasks, dispatch, status]);

  useEffect(() => {
    if (!taskGroup[status].initialized && loadedTasks) {
      dispatch(
        initializeTasks({
          status,
          tasks: loadedTasks.pages[0],
        })
      );
    }
  }, [dispatch, loadedTasks, status, taskGroup]);

  return (
    <div className="flex flex-col gap-1 flex-1 w-full max-w-[300px]">
      <div className="flex justify-between items-center">
        <p className="font-bold">{status}</p>
        {status === TaskStatus.BACKLOG && userId > 0 && (
          <button
            onClick={openBackLogAddModal}
            className="rounded-md border-border px-1 bg-gray-300"
          >
            <CgMathPlus className="w-6 h-6" />
          </button>
        )}
      </div>
      <div className="h-0 border border-black" />

      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={(node) => {
              provided.innerRef(node);
              scrollContainerRef.current = node;
            }}
            className={classNames(
              "flex relative overflow-y-scroll h-[70vh] flex-col gap-2 overflow-x-visible",
              snapshot.isDraggingOver && "bg-border"
            )}
          >
            {taskGroup[status].tasks?.map((task, index) => {
              if (taskGroup[status].tasks.length === index + 1) {
                return (
                  <div ref={lastTaskElementRef} key={task.todo_id}>
                    <Task
                      task={task}
                      index={index}
                      scrollContainerRef={scrollContainerRef}
                    />
                  </div>
                );
              }
              return (
                <Task
                  task={task}
                  index={index}
                  scrollContainerRef={scrollContainerRef}
                  key={task.todo_id}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskGroup;

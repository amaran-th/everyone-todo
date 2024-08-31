"use client";

import { QueryKeys } from "@/data/queryKey";
import { useTodoChangeStatus } from "@/lib/hooks/useApi";
import { insertSortedTask } from "@/lib/utils/utils";
import { TaskPageableResponseDto, TaskStatus } from "@/types/dto/task.dto";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import BackLogAddModal from "./components/BackLogAddModal";
import TaskGroup from "./components/TaskGroup";

const Page = () => {
  const [backlogAddModalOpen, setBacklogAddModalOpen] =
    useState<boolean>(false);
  const { mutate: changeTaskStatus } = useTodoChangeStatus();
  const queryClient = useQueryClient();

  const onDragEnd = (result: DropResult) => {
    console.log(result.source.droppableId);
    if (!result.destination) {
      return;
    }
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const taskId = result.draggableId;
      const sourceStatus = source.droppableId as TaskStatus;
      const destinationStatus = destination.droppableId as TaskStatus;

      const sourceTasks = queryClient.getQueryData<TaskPageableResponseDto>(
        QueryKeys.TASKS(sourceStatus, 20, 0)
      )?.todos;

      if (!sourceTasks) return;

      const movedTask = sourceTasks.find(
        (task) => task.todo_id.toString() === taskId
      );
      if (!movedTask) return;

      queryClient.setQueryData<TaskPageableResponseDto | undefined>(
        QueryKeys.TASKS(sourceStatus, 20, 0),
        (oldData) => {
          if (!oldData) return undefined;
          return {
            ...oldData,
            todos: oldData.todos.filter(
              (task) => task.todo_id.toString() != taskId
            ),
          };
        }
      );
      queryClient.setQueryData<TaskPageableResponseDto | undefined>(
        QueryKeys.TASKS(destinationStatus, 20, 0),
        (oldData) => {
          if (!oldData) return undefined;
          const updatedTasks = insertSortedTask(oldData.todos, movedTask);
          return {
            ...oldData,
            todos: updatedTasks,
          };
        }
      );

      changeTaskStatus(
        { todo_id: result.draggableId, new_status: destination.droppableId },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: QueryKeys.TASKS(sourceStatus, 20, 0),
            });
            queryClient.invalidateQueries({
              queryKey: QueryKeys.TASKS(destinationStatus, 20, 0),
            });
          },
          onError: (e) => {
            toast.error(e.message);
            // rollback
            queryClient.invalidateQueries({
              queryKey: QueryKeys.TASKS(sourceStatus, 20, 0),
            });
            queryClient.invalidateQueries({
              queryKey: QueryKeys.TASKS(destinationStatus, 20, 0),
            });
          },
        }
      );
    }
  };
  return (
    <>
      <div className="flex-grow justify-center flex gap-8 pt-4">
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.values(TaskStatus).map((status) => (
            <TaskGroup
              key={status}
              status={status}
              openBackLogAddModal={() => setBacklogAddModalOpen(true)}
            />
          ))}
        </DragDropContext>
      </div>
      <BackLogAddModal
        isOpen={backlogAddModalOpen}
        onClose={() => setBacklogAddModalOpen(false)}
      />
    </>
  );
};

export default Page;

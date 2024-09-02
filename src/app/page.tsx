"use client";

import { QueryKeys } from "@/data/queryKey";
import { useTodoChangeStatus } from "@/lib/hooks/useApi";
import { TaskStatus } from "@/types/dto/task.dto";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import BackLogAddModal from "./components/BackLogAddModal";
import SearchBar from "./components/SearchBar";
import TaskGroup from "./components/TaskGroup";

const Page = () => {
  const [backlogAddModalOpen, setBacklogAddModalOpen] =
    useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");
  const { mutate: changeTaskStatus } = useTodoChangeStatus();
  const queryClient = useQueryClient();

  const onDragEnd = (result: DropResult) => {
    console.log(result.source.droppableId);
    if (!result.destination) {
      return;
    }
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceStatus = source.droppableId as TaskStatus;
      const destinationStatus = destination.droppableId as TaskStatus;

      changeTaskStatus(
        { todo_id: result.draggableId, new_status: destination.droppableId },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: QueryKeys.TASKS(sourceStatus),
            });

            queryClient.invalidateQueries({
              queryKey: QueryKeys.TASKS(destinationStatus),
            });
          },

          onError: (e) => {
            toast.error(e.message);
            // rollback
            queryClient.invalidateQueries({
              queryKey: QueryKeys.TASKS(sourceStatus),
            });
            queryClient.invalidateQueries({
              queryKey: QueryKeys.TASKS(destinationStatus),
            });
          },
        }
      );
    }
  };
  return (
    <>
      <SearchBar keyword={keyword} setKeyword={setKeyword} />
      <div className="w-full justify-center flex gap-8 pt-4">
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.values(TaskStatus).map((status) => (
            <TaskGroup
              key={status}
              status={status}
              keyword={keyword}
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

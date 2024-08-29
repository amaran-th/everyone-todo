"use client";

import { TaskStatus } from "@/types/dto/task.dto";
import { useState } from "react";
import BackLogAddModal from "./components/BackLogAddModal";
import TaskGroup from "./components/TaskGroup";

const Page = () => {
  const [backlogAddModalOpen, setBacklogAddModalOpen] =
    useState<boolean>(false);
  return (
    <>
      <div className="flex-grow justify-center flex gap-8 pt-4">
        {Object.values(TaskStatus).map((status) => (
          <TaskGroup
            key={status}
            status={status}
            openBackLogAddModal={() => setBacklogAddModalOpen(true)}
          />
        ))}
      </div>
      <BackLogAddModal
        isOpen={backlogAddModalOpen}
        onClose={() => setBacklogAddModalOpen(false)}
      />
    </>
  );
};

export default Page;

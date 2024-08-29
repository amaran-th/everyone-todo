import { TaskStatus } from "@/types/dto/task.dto";

export const QueryKeys = {
  TASKS: (todo_status?: TaskStatus, page_size?: number, page_num?: number) => [
    "tasks",
    todo_status,
    page_size,
    page_num,
  ],
};

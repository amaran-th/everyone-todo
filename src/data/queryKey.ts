import { TaskStatus } from "@/types/dto/task.dto";

export const QueryKeys = {
  TASKS: (todo_status?: TaskStatus) => ["tasks", todo_status],
};

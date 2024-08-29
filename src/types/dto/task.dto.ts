export enum TaskStatus {
  BACKLOG = "BackLog",
  TODO = "ToDo",
  DOING = "Doing",
  DONE = "Done",
}

export interface TaskResponseDto {
  todo_id: number;
  owner_id: number;
  owner_name: string;
  title: string;
  description: string;
  status: TaskStatus;
  created_at: string;
}

export interface TaskPageableResponseDto {
  todos: TaskResponseDto[];
  total_count: number;
  total_pages: number;
  current_page: number;
}

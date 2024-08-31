import { TaskResponseDto } from "@/types/dto/task.dto";

export const insertSortedTask = (
  tasks: TaskResponseDto[],
  taskToAdd: TaskResponseDto
) => {
  // 이진 탐색을 통해 삽입할 위치를 찾습니다.
  let left = 0;
  let right = tasks.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (tasks[mid].todo_id < taskToAdd.todo_id) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  // 찾은 위치에 새로운 Task를 삽입합니다.
  return [...tasks.slice(0, left), taskToAdd, ...tasks.slice(left)];
};

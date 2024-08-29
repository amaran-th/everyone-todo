import { TaskPageableResponseDto, TaskStatus } from "@/types/dto/task.dto";

const tasks: TaskPageableResponseDto = {
  todos: [
    {
      todo_id: 1,
      owner_id: 1,
      owner_name: "amaranth",
      title: "집안일하기",
      description: "설거지, 빨래, 쓰레기 버리기, 청소",
      status: TaskStatus.BACKLOG,
      created_at: "2024-08-30T00:00:00",
    },
    {
      todo_id: 2,
      owner_id: 1,
      owner_name: "amaranth",
      title: "코딩하기",
      description: "알고리즘 문제 풀기",
      status: TaskStatus.BACKLOG,
      created_at: "2024-08-30T00:00:00",
    },
    {
      todo_id: 3,
      owner_id: 1,
      owner_name: "amaranth",
      title: "책읽기",
      description: "데일 카네기의 자기관리론 읽기",
      status: TaskStatus.BACKLOG,
      created_at: "2024-08-30T00:00:00",
    },
    {
      todo_id: 1,
      owner_id: 1,
      owner_name: "amaranth",
      title: "집안일하기",
      description: "설거지, 빨래, 쓰레기 버리기, 청소",
      status: TaskStatus.BACKLOG,
      created_at: "2024-08-30T00:00:00",
    },
    {
      todo_id: 2,
      owner_id: 1,
      owner_name: "amaranth",
      title: "코딩하기",
      description: "알고리즘 문제 풀기",
      status: TaskStatus.BACKLOG,
      created_at: "2024-08-30T00:00:00",
    },
    {
      todo_id: 3,
      owner_id: 1,
      owner_name: "amaranth",
      title: "책읽기",
      description: "데일 카네기의 자기관리론 읽기",
      status: TaskStatus.BACKLOG,
      created_at: "2024-08-30T00:00:00",
    },
    {
      todo_id: 4,
      owner_id: 1,
      owner_name: "amaranth",
      title: "집안일하기",
      description: "설거지, 빨래, 쓰레기 버리기, 청소",
      status: TaskStatus.BACKLOG,
      created_at: "2024-08-30T00:00:00",
    },
    {
      todo_id: 5,
      owner_id: 1,
      owner_name: "amaranth",
      title: "코딩하기",
      description: "알고리즘 문제 풀기",
      status: TaskStatus.BACKLOG,
      created_at: "2024-08-30T00:00:00",
    },
    {
      todo_id: 6,
      owner_id: 1,
      owner_name: "amaranth",
      title: "책읽기",
      description: "데일 카네기의 자기관리론 읽기",
      status: TaskStatus.BACKLOG,
      created_at: "2024-08-30T00:00:00",
    },
    {
      todo_id: 7,
      owner_id: 1,
      owner_name: "amaranth",
      title: "집안일하기",
      description: "설거지, 빨래, 쓰레기 버리기, 청소",
      status: TaskStatus.BACKLOG,
      created_at: "2024-08-30T00:00:00",
    },
    {
      todo_id: 8,
      owner_id: 1,
      owner_name: "amaranth",
      title: "코딩하기",
      description: "알고리즘 문제 풀기",
      status: TaskStatus.BACKLOG,
      created_at: "2024-08-30T00:00:00",
    },
    {
      todo_id: 9,
      owner_id: 1,
      owner_name: "amaranth",
      title: "책읽기",
      description: "데일 카네기의 자기관리론 읽기",
      status: TaskStatus.BACKLOG,
      created_at: "2024-08-30T00:00:00",
    },
  ],
  total_count: 9,
  total_pages: 1,
  current_page: 1,
};

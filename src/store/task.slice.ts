/* eslint-disable import/no-extraneous-dependencies */
import {
  TaskPageableResponseDto,
  TaskResponseDto,
  TaskStatus,
} from "@/types/dto/task.dto";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface TaskState {
  value: {
    [k in TaskStatus]: {
      tasks: TaskResponseDto[];
      pageNum: number;
      existNextPage: boolean;
      initialized: boolean;
    };
  };
}

const initialState: TaskState = {
  value: {
    [TaskStatus.BACKLOG]: {
      tasks: [],
      pageNum: 1,
      existNextPage: false,
      initialized: false,
    },
    [TaskStatus.TODO]: {
      tasks: [],
      pageNum: 1,
      existNextPage: false,
      initialized: false,
    },
    [TaskStatus.DOING]: {
      tasks: [],
      pageNum: 1,
      existNextPage: false,
      initialized: false,
    },
    [TaskStatus.DONE]: {
      tasks: [],
      pageNum: 1,
      existNextPage: false,
      initialized: false,
    },
  },
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    nextPage: (
      state,
      action: PayloadAction<{
        status: TaskStatus;
      }>
    ) => {
      const { status } = action.payload;
      state.value[status].pageNum += 1;
    },
    setTasks: (
      state,
      action: PayloadAction<{
        status: TaskStatus;
        tasks: TaskResponseDto[];
      }>
    ) => {
      const { status, tasks } = action.payload;
      state.value[status].tasks = tasks;
    },
    setLastTasks: (
      state,
      action: PayloadAction<{
        status: TaskStatus;
        tasks: TaskPageableResponseDto;
      }>
    ) => {
      const { status, tasks } = action.payload;
      state.value[status].pageNum = tasks.current_page;
      state.value[status].tasks = [
        ...state.value[status].tasks.slice(0, 20 * (tasks.current_page - 1)),
        ...tasks.todos,
      ];
      state.value[status].existNextPage =
        tasks.current_page < tasks.total_pages;
    },
    initializeTasks: (
      state,
      action: PayloadAction<{
        status: TaskStatus;
        tasks: TaskPageableResponseDto;
      }>
    ) => {
      const { status, tasks } = action.payload;
      state.value[status].initialized = true;
      state.value[status].pageNum = 1;
      state.value[status].tasks = tasks.todos;
      state.value[status].existNextPage = 1 < tasks.total_pages;
    },
  },
});

export const { nextPage, setLastTasks, initializeTasks, setTasks } =
  taskSlice.actions;
export default taskSlice.reducer;

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
      existNextPage: boolean;
      initialized: boolean;
    };
  };
}

const initialState: TaskState = {
  value: {
    [TaskStatus.BACKLOG]: {
      tasks: [],
      existNextPage: false,
      initialized: false,
    },
    [TaskStatus.TODO]: {
      tasks: [],
      existNextPage: false,
      initialized: false,
    },
    [TaskStatus.DOING]: {
      tasks: [],
      existNextPage: false,
      initialized: false,
    },
    [TaskStatus.DONE]: {
      tasks: [],
      existNextPage: false,
      initialized: false,
    },
  },
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
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
    initializeTasks: (
      state,
      action: PayloadAction<{
        status: TaskStatus;
        tasks: TaskPageableResponseDto;
      }>
    ) => {
      const { status, tasks } = action.payload;
      state.value[status].initialized = true;
      state.value[status].tasks = tasks.todos;
      state.value[status].existNextPage = tasks.next_cursor !== null;
    },
  },
});

export const { initializeTasks, setTasks } = taskSlice.actions;
export default taskSlice.reducer;

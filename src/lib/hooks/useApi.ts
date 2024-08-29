import { QueryKeys } from "@/data/queryKey";
import { LoginRequestDto, LoginResponseDto } from "@/types/dto/auth.dto";
import { TaskPageableResponseDto, TaskStatus } from "@/types/dto/task.dto";
import { authClient, client } from "../api/client.axios";
import { useAxiosMutation, useAxiosQuery } from "./useAxios";

export const useTodoQuery = (
  todo_status?: TaskStatus,
  page_size?: number,
  page_num?: number
) =>
  useAxiosQuery({
    queryKey: QueryKeys.TASKS(todo_status, page_size, page_num),
    queryFn: async (): Promise<TaskPageableResponseDto | null> => {
      const response = await client.get(`/Todo`, {
        params: { todo_status, page_size, page_num },
      });
      return response?.data;
    },
  });

export const useLogin = () =>
  useAxiosMutation({
    mutationFn: async ({
      username,
      password,
    }: LoginRequestDto): Promise<LoginResponseDto | null> => {
      const response = await client.post(`/Auth/login`, {
        username,
        password,
      });
      return response?.data;
    },
  });

export const useMemberCreate = () =>
  useAxiosMutation({
    mutationFn: async ({
      username,
      password,
    }: LoginRequestDto): Promise<LoginResponseDto | null> => {
      const response = await client.post(`/Auth/register`, {
        username,
        password,
      });
      return response?.data;
    },
  });

export const useBackLogFileImport = () =>
  useAxiosMutation({
    mutationFn: async (file: File) => {
      const formdata = new FormData();
      formdata.append("file", file!);
      await authClient.post("/Todo/import", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
  });

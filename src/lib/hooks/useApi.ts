import { QueryKeys } from "@/data/queryKey";
import { LoginRequestDto, LoginResponseDto } from "@/types/dto/auth.dto";
import { TaskStatus } from "@/types/dto/task.dto";
import { authClient, client } from "../api/client.axios";
import { useAxiosInfiniteQuery, useAxiosMutation } from "./useAxios";

export const useTodoQuery = (todo_status: TaskStatus, keyword: string) =>
  useAxiosInfiniteQuery({
    queryKey: QueryKeys.TASKS(todo_status), // 쿼리 키
    queryFn: async ({ pageParam }) => {
      const searchParam =
        keyword.trim().charAt(0) === "@"
          ? { username: keyword.slice(1) }
          : { title: keyword };
      const response = await client.get(`/Todo`, {
        params: {
          todo_status,
          page_size: 20,
          page_number: pageParam,
          ...searchParam,
        },
      });
      return response.data;
    },
    getNextPageParam: (lastPage) => {
      const { current_page, total_pages } = lastPage;
      if (current_page < total_pages) {
        return current_page + 1;
      } else {
        return undefined;
      }
    },
    initialPageParam: 1,
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

export const useTodoChangeStatus = () =>
  useAxiosMutation({
    mutationFn: async ({
      todo_id,
      new_status,
    }: {
      todo_id: string;
      new_status: string;
    }) => {
      await authClient.patch(`/Todo/${todo_id}/status`, null, {
        params: { new_status },
      });
    },
  });

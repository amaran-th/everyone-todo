import { LoginRequestDto, LoginResponseDto } from "@/types/dto/auth.dto";
import { client } from "../api/client.axios";
import { useAxiosMutation } from "./useAxios";

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

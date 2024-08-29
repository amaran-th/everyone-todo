import {
  DefaultError,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { BusinessError, UnauthorizedError } from "@/types/error";
import { redirect, RedirectType, usePathname } from "next/navigation";

const handleError = (error: Error, pathname: string) => {
  if (error instanceof UnauthorizedError) {
    toast.error("로그인이 필요합니다.");
    redirect(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/login?redirect=${
        process.env.NEXT_PUBLIC_CLIENT_URL + pathname
      }`,
      RedirectType.replace
    );
  }
  if (
    error instanceof BusinessError &&
    error.originalError instanceof AxiosError &&
    error.originalError.response
  ) {
    toast.error(error.originalError.response.data.detail);
  }
};

export const useAxiosQuery = <TQueryFnData>(
  options: UseQueryOptions<TQueryFnData>
) => {
  const query = useQuery<TQueryFnData>(options);
  const { error, isError } = query;
  const pathname = usePathname();

  useEffect(() => {
    if (isError) {
      handleError(error, pathname);
    }
  }, [error, isError, pathname]);

  return query;
};

export const useAxiosMutation = <TData, TVariables>(
  options: UseMutationOptions<TData, DefaultError, TVariables>
) => {
  const mutation = useMutation<TData, DefaultError, TVariables>(options);
  const { error, isError } = mutation;
  const pathname = usePathname();

  useEffect(() => {
    if (isError) {
      handleError(error, pathname);
    }
  }, [error, isError, pathname]);

  return mutation;
};

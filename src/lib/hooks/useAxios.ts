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

import { BusinessError } from "@/types/error";

const handleError = (error: Error) => {
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

  useEffect(() => {
    if (isError) {
      handleError(error);
    }
  }, [error, isError]);

  return query;
};

export const useAxiosMutation = <TData, TVariables>(
  options: UseMutationOptions<TData, DefaultError, TVariables>
) => {
  const mutation = useMutation<TData, DefaultError, TVariables>(options);
  const { error, isError } = mutation;

  useEffect(() => {
    if (isError) {
      handleError(error);
    }
  }, [error, isError]);

  return mutation;
};

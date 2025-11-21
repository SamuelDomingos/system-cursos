"use client";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

interface UseFetchOptions {
  successMessage?: string;
  errorMessage?: string;
  auto?: boolean;
  defaultArgs?: any[];
}

export const useFetch = <TArgs extends any[], TResult>(
  fetcher: (...args: TArgs) => Promise<TResult>,
  options?: UseFetchOptions
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<TResult | null>(null);

  const execute = useCallback(
    async (...args: TArgs) => {
      setIsLoading(true);
      setError(null);
      setData(null);
      try {
        const result = await fetcher(...args);
        setData(result);
        if (options?.successMessage) {
          toast.success(options.successMessage);
        }
        return result;
      } catch (err: any) {
        setError(err);
        toast.error(options?.errorMessage || "Erro ao realizar a operação.", {
          description: err.message || "Tente novamente mais tarde.",
        });
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [fetcher, options?.successMessage, options?.errorMessage]
  );

  useEffect(() => {
    if (
      options?.auto &&
      Array.isArray(options.defaultArgs) &&
      options.defaultArgs.every((arg) => arg !== undefined && arg !== null)
    ) {
      execute(...(options.defaultArgs as TArgs));
    }
  }, [execute, options?.auto, options?.defaultArgs]);

  return {
    execute,
    isLoading,
    error,
    data,
  };
};

export const usePaginatedFetch = <TResult,>(
  fetcher: (page?: number, limit?: number, search?: string) => Promise<TResult>,
  options?: UseFetchOptions & {
    auto?: boolean;
    defaults?: { page?: number; limit?: number; search?: string };
  }
) => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") ?? options?.defaults?.page ?? 1);
  const limit = Number(
    searchParams.get("limit") ?? options?.defaults?.limit ?? 10
  );
  const search = searchParams.get("search") ?? options?.defaults?.search ?? "";

  const { execute, isLoading, error, data } = useFetch<
    [number, number, string],
    TResult
  >(fetcher, options);

  const refetch = useCallback(() => {
    return execute(page, limit, search);
  }, [execute, page, limit, search]);

  useEffect(() => {
    if (options?.auto ?? true) {
      refetch();
    }
  }, [refetch, options?.auto]);

  return {
    data,
    isLoading,
    error,
    page,
    limit,
    search,
    refetch,
  };
};

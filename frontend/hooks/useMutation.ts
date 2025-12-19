"use client";
import { useState, useCallback } from "react";
import { toast } from "sonner";

interface UseMutationOptions<TResult> {
  successMessage?: string | ((data: TResult) => string);
  errorMessage?: string;
  onSuccess?: (data: TResult) => void | Promise<void>;
  onError?: (error: Error) => void;
}

export const useMutation = <TArgs extends any[], TResult>(
  mutationFn: (...args: TArgs) => Promise<TResult>,
  options?: UseMutationOptions<TResult>
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<TResult | null>(null);

  const mutate = useCallback(
    async (...args: TArgs) => {
      setIsLoading(true);
      setError(null);
      
      try {
        const result = await mutationFn(...args);
        setData(result);

        if (options?.successMessage) {
          const message = typeof options.successMessage === 'function' 
            ? options.successMessage(result)
            : options.successMessage;
          toast.success(message);
        }

        if (options?.onSuccess) {
          await options.onSuccess(result);
        }

        return result;
      } catch (err: any) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);

        toast.error(options?.errorMessage || "Erro ao realizar a operação.", {
          description: error.message || "Tente novamente mais tarde.",
        });

        if (options?.onError) {
          options.onError(error);
        }

        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [mutationFn, options]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    mutate,
    isLoading,
    error,
    data,
    reset,
    isSuccess: data !== null && error === null,
    isError: error !== null,
  };
};
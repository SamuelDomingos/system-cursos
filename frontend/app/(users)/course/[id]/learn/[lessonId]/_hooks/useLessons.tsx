import { useFetch } from "@/hooks/useFetch";
import { findLessonById } from "@/lib/api/lessons/lessons";
import { useMemo } from "react";

export const useLessons = (id: string) => {

  const fetchOptions = useMemo(() => ({
    auto: !!id,
    defaultArgs: [id],
    errorMessage: "Erro ao carregar o curso.",
  }), [id]);
  

  const {
    execute: fetchLessons,
    data,
    isLoading,
    error,
  } = useFetch(findLessonById, fetchOptions);

  return {
    fetchLessons,
    data,
    isLoading,
    error,
  };
};

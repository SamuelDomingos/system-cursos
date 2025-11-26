import { useFetch } from "@/hooks/useFetch";
import { findCourseById } from "@/lib/api/courses/courses";
import { useMemo } from "react";

export const useCourse = (id: string) => {

  const fetchOptions = useMemo(() => ({
    auto: !!id,
    defaultArgs: [id],
    errorMessage: "Erro ao carregar o curso.",
  }), [id]);

  const {
    execute: fetchCourse,
    data: course,
    isLoading,
    error,
  } = useFetch(findCourseById, fetchOptions);

  return {
    fetchCourse,
    course,
    isLoading,
    error,
  };
};

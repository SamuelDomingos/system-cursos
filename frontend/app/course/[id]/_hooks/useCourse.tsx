import { useFetch } from "@/hooks/useFetch";
import { findCourseById } from "@/lib/api/courses/courses";
import { useMemo } from "react";

export const useCourse = (id: string, userId: string) => {

  const fetchOptions = useMemo(() => ({
    auto: !!id,
    defaultArgs: [id, userId],
    errorMessage: "Erro ao carregar o curso.",
  }), [id, userId]);

  const {
    execute: fetchCourse,
    data: course,
    isLoading,
    error,
  } = useFetch(findCourseById, fetchOptions);

  console.log(course);
  

  return {
    fetchCourse,
    course,
    isLoading,
    error,
  };
};

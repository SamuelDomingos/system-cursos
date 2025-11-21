import { useFetch } from "@/hooks/useFetch";
import { findCourseById } from "@/lib/api/courses/courses";

export const useCourse = (id: string) => {

  const {
    execute: fetchCourse,
    data: course,
    isLoading,
    error,
  } = useFetch(findCourseById, {
    auto: !!id,
    defaultArgs: [id],
    errorMessage: "Erro ao carregar o curso.",
  });

  return {
    fetchCourse,
    course,
    isLoading,
    error,
  };
};

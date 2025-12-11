import { usePaginatedFetch } from "@/hooks/useFetch";
import { findUserAvailableCourses } from "@/lib/api/courses/courses";
import { useCallback } from "react";

export const useFetchCoursesByUser = (userId: string) => {
  const fetcher = useCallback(async (page?: number, limit?: number) => {
    return findUserAvailableCourses(userId, page, limit);
  }, [userId]);

  const {
    data: courses,
    isLoading,
    error,
    page,
    limit,
    refetch,
  } = usePaginatedFetch(fetcher, {
    errorMessage: "Erro ao carregar os cursos do usuário.",
    auto: true,
    defaults: {
      page: 1,
      limit: 10,
    },
  });
  
  return {
    fetchCoursesByUser: refetch,
    courses,
    isLoading,
    error,
    page,
    limit,
  };
};

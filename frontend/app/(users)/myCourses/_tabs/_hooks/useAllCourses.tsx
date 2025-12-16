import { usePaginatedFetch } from "@/hooks/useFetch";
import { findUserAvailableCourses } from "@/lib/api/courses/courses";
import { useCallback } from "react";

export const useFetchCoursesByUser = (userId: string) => {
  const fetcher = useCallback(
    async (page?: number, limit?: number) => {
      return findUserAvailableCourses(userId, page, limit);
    },
    [userId]
  );

  const {
    data: courses,
    isLoading,
    page,
    limit,
    refetch,
  } = usePaginatedFetch(fetcher, {
    auto: true,
    disableErrorMessage: true,
    defaults: {
      page: 1,
      limit: 10,
    },
  });

  return {
    fetchCoursesByUser: refetch,
    courses,
    isLoading,
    page,
    limit,
  };
};

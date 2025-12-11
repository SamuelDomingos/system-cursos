
"use client";

import { useCallback } from "react";
import { findAllTopics } from "@/lib/api/topic/topic";
import { usePaginatedFetch } from "@/hooks/useFetch";

export const useFetchAllTopics = (coursePage = 1, courseLimit = 5) => {

  const fetchFunction = useCallback(
    (page?: number, limit?: number) => {
      return findAllTopics(page ?? 1, limit ?? 10, coursePage, courseLimit);
    },
    [coursePage, courseLimit] 
  );

  const {
    data,
    isLoading,
    error,
    page: topicPage,
    limit: topicLimit,
    refetch,
  } = usePaginatedFetch(fetchFunction, {
    errorMessage: "Erro ao carregar os tópicos.",
    auto: true,
    defaults: {
      page: 1,
      limit: 10,
    },
  });

  return {
    topics: data?.topics ?? [],
    isLoading,
    error,
    topicPage,
    topicLimit,
    topicTotal: data?.topicTotal ?? 0,
    topicTotalPages: data?.topicTotalPages ?? 0,
    refetch,
  };
};
  
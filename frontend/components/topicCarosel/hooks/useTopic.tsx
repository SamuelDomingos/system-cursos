'use client';

import { findAllTopics, findCoursesByTopic } from "@/lib/api/topic/topic";
import { usePaginatedFetch } from "@/hooks/useFetch";

export const useFetchAllTopics = () => {
  const { 
    data: topics, 
    isLoading, 
    error, 
    page, 
    limit, 
    search, 
    refetch 
  } = usePaginatedFetch(findAllTopics, {
    errorMessage: "Erro ao carregar os tópicos.",
    auto: true,
    defaults: {
      page: 1,
      limit: 10,
      search: "",
    },
  });
  
  return {
    topics,
    isLoading,
    error,
    page,
    limit,
    search,
    refetch,
  };
};

export const useFetchCoursesByTopic = (slug: string) => {
  const fetcher = async (page?: number, limit?: number, search?: string) => {
    if (!slug) {
      return Promise.resolve({ data: [], total: 0, page: 1, limit: 10 });
    }
    return findCoursesByTopic(slug, page, limit, search);
  };

  const { 
    data: courses, 
    isLoading, 
    error, 
    page, 
    limit, 
    search, 
    refetch 
  } = usePaginatedFetch(fetcher, {
    errorMessage: "Erro ao carregar os cursos do tópico.",
    auto: true,
    defaults: {
      page: 1,
      limit: 10,
      search: "",
    },
  });

  return {
    fetchCoursesByTopic: refetch,
    courses,
    isLoading,
    error,
    page,
    limit,
    search,
  };
};
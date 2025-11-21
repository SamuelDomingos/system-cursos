'use client';

import { TopicCarousel } from "./components/topicCarosel";
import { useFetchAllTopics } from "./hooks/useTopic";

export const TopicCarousels = () => {
  const { topics, isLoading } = useFetchAllTopics();

  if (isLoading) {
    return <div className="mt-20 text-center">Carregando...</div>;
  }

  return (
    <div className="mt-20">
      {topics.map((topic) => (
        <div key={topic.id} className="mt-20">
          <h2 className="text-4xl font-bold mb-4 max-w-screen-2xl mx-auto">
            {topic.name}
          </h2>
          {topic.courses && topic.courses.length > 0 ? (
            <TopicCarousel courses={topic.courses} />
          ) : (
            <p className="text-center text-gray-500">Nenhum curso disponível.</p>
          )}
        </div>
      ))}
    </div>
  );
}

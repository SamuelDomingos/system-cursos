import { TopicCarousel } from "./components/topicCarosel";

interface TopicSection {
  title: string;
  topics: {
    title: string;
    description: string;
    value: string;
    imageSrc?: string;
  }[];
}

interface TopicCarouselsProps {
  sections: TopicSection[];
}

export function TopicCarousels({ sections }: TopicCarouselsProps) {
  return (
    <div className="mt-20">
      {sections.map((section, index) => (
        <div key={index} className="mt-20">
          <h2 className="text-4xl font-bold mb-4 max-w-screen-2xl mx-auto">{section.title}</h2>
          <TopicCarousel topics={section.topics} />
        </div>
      ))}
    </div>
  );
}

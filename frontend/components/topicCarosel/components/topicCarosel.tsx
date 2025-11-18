import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TopicCard } from "./topicCard";

interface TopicCarouselProps {
  topics: {
    title: string;
    description: string;
    value: string;
    imageSrc?: string;
  }[];
}

export function TopicCarousel({ topics }: TopicCarouselProps) {
  return (
    <Carousel
      opts={{
        align: "start",
        slidesToScroll: 1,
      }}
      className="w-full max-w-screen-2xl mx-auto"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {topics.map((topic, index) => (
          <CarouselItem 
            key={index} 
            className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 "
          >
            <div className="p-1">
              <TopicCard
                title={topic.title}
                description={topic.description}
                value={topic.value}
                imageSrc={topic.imageSrc || "https://via.placeholder.com/150"}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
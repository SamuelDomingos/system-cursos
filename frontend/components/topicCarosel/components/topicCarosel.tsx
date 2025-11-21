import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TopicCard } from "./topicCard";

export const TopicCarousel = ({ courses }) => {
  
  console.log(courses);
  
  return (
    <Carousel
      opts={{
        align: "start",
        slidesToScroll: 1,
      }}
      className="w-full max-w-screen-2xl mx-auto"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {courses.map((courseTopic) => (
          <CarouselItem 
            key={courseTopic.course.id} 
            className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 "
          >
            <div className="p-1">
              <TopicCard
                course={courseTopic.course}
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
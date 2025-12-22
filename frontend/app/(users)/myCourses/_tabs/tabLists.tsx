"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SingleCursorAll from "./_components/singleCursorAll";
import { useList } from "./_hooks/useList";
import { Course } from "@/lib/api/types/courses";

export default function TabLists() {
  const { allLists } = useList();

  return (
    <div>
      {allLists?.map((list) => (
        <Card key={list.id} className="mb-6">
          <CardHeader>
            <CardTitle>{list.title}</CardTitle>
            <CardDescription>{list.description}</CardDescription>
          </CardHeader>

          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
            {list?.listCourses?.map((item) => (
              <SingleCursorAll
                key={item.course.id}
                course={item.course as Course}
                progressPercentage={item.userProgress?.progressPercentage as number}
              />
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

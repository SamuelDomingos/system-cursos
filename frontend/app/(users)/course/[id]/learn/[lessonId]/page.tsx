"use client";

import { VideoPlayer } from "./_components/VideoPlayer";
import { DetailsCourse } from "./_components/DetailsCourse";
import { SidebarCourse } from "./_components/SidebarCourse";
import { useLessons } from "./_hooks/useLessons";
import { useParams } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

export default function CoursePlayer() {
    const { lessonId } = useParams();
  const {data, isLoading} = useLessons(lessonId as string);

    if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 p-6 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 p-6 flex items-center justify-center text-white text-2xl">
        Licao não encontrado.
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-auto">
        <VideoPlayer lessonData={data.lesson}/>
        <DetailsCourse courseData={data.courseStructure}/>
      </div>

      <SidebarCourse courseData={data.courseStructure}/>
    </div>
  );
}

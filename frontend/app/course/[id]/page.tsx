"use client";

import { useParams } from "next/navigation";

import { useCourse } from "./_hooks/useCourse";
import CourseHeader from "./_components/CourseHeader";
import PriceCard from "./_components/PriceCard";
import CourseContent from "./_components/CourseContent";
import ReviewsSection from "./_components/ReviewsSection";

import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/contexts/AuthContext";

const CursorPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { course, isLoading } = useCourse(id as string, user?.id as string);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const imageSrc = course?.thumbnail
    ? `${API_BASE_URL}${course.thumbnail}`
    : "https://via.placeholder.com/150";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 p-6 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 p-6 flex items-center justify-center text-white text-2xl">
        Curso não encontrado.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6 grid lg:grid-cols-3 gap-8">
          <CourseHeader course={course} />
        </div>
      </div>

      <PriceCard imageSrc={imageSrc} course={course} />

      <div className="container mx-auto px-6 py-8 lg:pr-[450px]">
        <CourseContent course={course} />
        <ReviewsSection />
      </div>
    </div>
  );
};

export default CursorPage;

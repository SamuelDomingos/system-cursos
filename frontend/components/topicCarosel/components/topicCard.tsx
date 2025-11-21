
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { formatCurrency } from "@/lib/utils";

interface CourseData {
  id: string;
  title: string;
  description: string;
  price: string;
  thumbnail?: string;
}

interface TopicCardProps {
  course: CourseData;
}

export function TopicCard({
  course
}: TopicCardProps) {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const imageSrc = course.thumbnail ? `${API_BASE_URL}${course.thumbnail}` : "https://via.placeholder.com/150";

  return (
    <Link href={`/cursor/${course.id}`}>
      <Card className="group w-[360px] h-[250px] flex flex-col justify-between relative overflow-hidden cursor-pointer">
      <div className="absolute inset-0 flex items-center justify-center">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={course.title}
            className="object-cover w-full h-full"
          />
        ) : (
          <span className="text-lg font-semibold text-gray-500">Curso</span>
        )}
      </div>

      <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-black/50 text-white">
        <CardHeader className="p-0">
          <CardTitle className="text-lg">{course.title}</CardTitle>
          <CardDescription className="text-sm">{course.description}</CardDescription>
        </CardHeader>

        <CardContent className="flex-grow p-0">
        </CardContent>

        <CardFooter className="p-0">
          <span className="text-md font-bold">{formatCurrency(Number(course.price))}</span>
        </CardFooter>
      </div>
    </Card>
    </Link>
  );
}

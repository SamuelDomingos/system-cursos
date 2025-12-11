import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Heart, MoreHorizontal, PlayCircle, Plus, Share2, Star } from "lucide-react";
import { CourseSingleUser } from "@/lib/api/types/courses";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface SingleCursorAllProps {
  course: CourseSingleUser;
}

const SingleCursorAll = ({ course }: SingleCursorAllProps) => {;
  
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const imageSrc = course.course.thumbnail ? `${API_BASE_URL}${course.course.thumbnail}` : "https://via.placeholder.com/150";

  return (
    <Card className="group w-full overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <Link href={`/cursor/${course.course.id}`} className="block">
          <Image
            src={imageSrc}
            alt={course.course.title}
            width={400}
            height={225}
            className="w-full object-cover"
            unoptimized={true}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <PlayCircle className="h-16 w-16 text-white" />
          </div>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger className="absolute top-2 right-2 bg-white p-1 shadow-md cursor-pointer">
            <MoreHorizontal className="h-5 w-5 text-gray-700" />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Listas</DropdownMenuLabel>

            <DropdownMenuGroup>
              <DropdownMenuItem></DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Plus className="mr-2 h-4 w-4" />
                Criar nova lista
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="mr-2 h-4 w-4" />
                Compartilhar
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Heart className="mr-2 h-4 w-4" />
                Favoritar
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-base font-semibold leading-tight">
          {course.course.title}
        </CardTitle>
        <CardDescription className="text-xs text-gray-600 mt-1">
          {course.course.instructor.name}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 py-2 pt-0">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span>{course.userProgress.progressPercentage}% concluído</span>
          <div className="flex items-center">
            {[...Array(4)].map((_, i) => (
              <Star
                key={`filled-${i}`}
                className="h-3 w-3 text-yellow-400 fill-current"
              />
            ))}
            <Star className="h-3 w-3 text-gray-300" />
            <span className="ml-1">Sua classificação</span>
          </div>
        </div>
        <Progress value={course.userProgress.progressPercentage} className="h-1.5" />
      </CardContent>
    </Card>
  );
};

export default SingleCursorAll;

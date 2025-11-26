import { Badge } from "@/components/ui/badge";
import { Clock, Star } from "lucide-react";

export default function CourseHeader({ course }: { course: any }) {
  return (
    <div className="lg:col-span-2">
      <Badge className="bg-yellow-600 text-white mb-2">Mais vendido</Badge>
      <h1 className="text-3xl md:text-4xl font-bold mb-3">{course.title}</h1>
      <p className="text-lg text-gray-300 mb-4">{course.description}</p>
      <div className="flex flex-wrap items-center gap-3 text-sm mb-4">
        <div className="flex items-center gap-1">
          <span className="font-bold text-yellow-400">4.8</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-gray-400" />
            ))}
          </div>
          <span className="text-yellow-400">(exemplo de avaliações)</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span>
            Criado por{" "}
            <span className="text-purple-400 underline">
              {course.instructor?.name}
            </span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>
            Última atualização{" "}
            {new Date(course.updatedAt).toLocaleDateString("pt-BR")}
          </span>
        </div>
      </div>
    </div>
  );
}
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function CourseContent({ course }: { course: any }) {
  const modules = Array.isArray(course.modules) ? course.modules : [];
  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Conteúdo do curso</h2>
        <div className="flex flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
          <span>{modules.length} módulos</span>
          <span>•</span>
          <span>{course.duration} horas de duração total</span>
        </div>
        <div className="space-y-2">
          {modules.length > 0 ? (
            modules.map((module: any, index: number) => (
              <Card key={module.id ?? index} className="overflow-hidden">
                <div className="w-full p-4 flex items-center justify-between">
                  <div className="text-left">
                    <h3 className="font-semibold dark:text-white">{module.title ?? "Módulo"}</h3>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">Nenhum módulo disponível ainda.</span>
            </Card>
          )}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">O que você aprenderá</h2>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="flex items-start gap-2">
            <span className="text-sm">Exemplos de tópicos serão adicionados futuramente.</span>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Requisitos</h2>
        <p className="text-gray-700 dark:text-gray-300">Informações de requisitos serão adicionadas futuramente.</p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Para quem é este curso</h2>
        <p className="text-gray-700 dark:text-gray-300">Detalhes sobre o público-alvo serão adicionados futuramente.</p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6 dark:text-white">Instrutor</h2>
        {course.instructor && (
          <Card className="p-6">
            <div className="flex gap-6 items-center">
              {course.instructor.avatar ? (
                <Avatar className="w-32 h-32 flex-shrink-0">
                  <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} className="object-cover" />
                  <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
                </Avatar>
              ) : (
                <Avatar className="w-32 h-32 flex-shrink-0">
                  <AvatarFallback className="bg-gray-200 dark:bg-gray-800 text-3xl font-bold">
                    {course.instructor.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              )}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-purple-600 mb-1">{course.instructor.name}</h3>
              </div>
            </div>
          </Card>
        )}
      </div>
    </>
  );
}
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Play, Check, Clock } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export const SidebarCourse = ({ courseData }: { courseData: any }) => {
  const { id } = useParams();

  return (
    <div className="w-96 border-l border-muted flex flex-col">
      <div className="p-4 border-b border-muted">
        <h2 className="font-semibold text-lg">Conteúdo do curso</h2>
        <p className="text-sm  mt-1">
          {courseData.modules.length} seções •{" "}
          {courseData.modules.reduce(
            (acc: number, m: any) => acc + m.lessons.length,
            0
          )}{" "}
          aulas • {/* {courseData.totalHours}h de duração total */}
        </p>
      </div>

      <div className="flex-1 overflow-auto">
        <Accordion type="multiple">
          {courseData.modules.map((module: any, moduleIndex: number) => (
            <AccordionItem
              key={module.id}
              value={module.id}
            >
              <AccordionTrigger className="w-full px-4 hover:bg-muted transition-colors">
                <div className="flex flex-col items-start">
                  <div className="font-medium text-sm text-foreground">
                    {`${moduleIndex + 1}. ${module.title}`}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {module.lessons.length} aulas •
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="bg-background">
                {module.lessons.map((lesson: any, lessonIndex: number) => (
                  <Link
                    href={`/course/${id}/learn/${lesson.id}`}
                    key={lesson.id}
                    className="flex items-center gap-3 py-2 px-4 hover:bg-accent transition-colors cursor-pointer"
                  >
                    <div className="shrink-0">
                      {lesson.completed ? (
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                          <Check className="w-4 h-4 text-primary-foreground" />
                        </div>
                      ) : lesson.current ? (
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                          <Play className="w-3 h-3 text-primary-foreground" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-border flex items-center justify-center">
                          <Play className="w-3 h-3 fill-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-sm font-medium text-foreground">
                        {`${lessonIndex + 1}. ${lesson.title}`}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        {lesson.duration}
                      </div>
                    </div>
                  </Link>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

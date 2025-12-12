import { Play, Check, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export const SidebarCourse = ({
  courseData,
}: {
  courseData: { lessons: number; totalHours: number };
}) => {
  const [activeLesson, setActiveLesson] = useState(0);
  const [expandedSections, setExpandedSections] = useState([0]);
  
  const sections = [
    {
      title:
        "Seção 1: Os 3 Pilares que o Gestor de Tráfego Pago precisa Dominar!",
      duration: "11.4m",
      lessons: [
        {
          title: "Os 3 Pilares que o Gestor de Tráfego Pago precisa Dominar!",
          duration: "4m",
          completed: true,
          current: true,
        },
      ],
    },
    {
      title: "Seção 2: Não Pule, essas informações são importantes!",
      duration: "11.0m",
      lessons: [
        {
          title: "Introdução às informações essenciais",
          duration: "6m",
          completed: false,
          current: false,
        },
        {
          title: "Por que você não pode pular esta seção",
          duration: "5m",
          completed: false,
          current: false,
        },
      ],
    },
    {
      title: "Seção 3: Tráfego Pago (Google Ads e Youtube Ads)",
      duration: "8h 12min",
      lessons: [
        {
          title: "Introdução ao Google Ads",
          duration: "12m",
          completed: false,
          current: false,
        },
        {
          title: "Configuração da primeira campanha",
          duration: "18m",
          completed: false,
          current: false,
        },
        {
          title: "Youtube Ads - Primeiros Passos",
          duration: "15m",
          completed: false,
          current: false,
        },
        {
          title: "Otimização de campanhas",
          duration: "22m",
          completed: false,
          current: false,
        },
      ],
    },
    {
      title: "Seção 4: Tráfego Pago (Facebook Ads e Instagram Ads)",
      duration: "8h 53min",
      lessons: [
        {
          title: "Gerenciador de Anúncios do Facebook",
          duration: "14m",
          completed: false,
          current: false,
        },
        {
          title: "Criando sua primeira campanha",
          duration: "16m",
          completed: false,
          current: false,
        },
        {
          title: "Instagram Ads - Estratégias",
          duration: "19m",
          completed: false,
          current: false,
        },
      ],
    },
    {
      title:
        "Seção 5: Conversão Online (Copywriting, Neuromarketing e Gatilhos Mentais)",
      duration: "5h 28min",
      lessons: [
        {
          title: "Fundamentos do Copywriting",
          duration: "20m",
          completed: false,
          current: false,
        },
        {
          title: "Gatilhos Mentais que Convertem",
          duration: "25m",
          completed: false,
          current: false,
        },
        {
          title: "Neuromarketing Aplicado",
          duration: "18m",
          completed: false,
          current: false,
        },
      ],
    },
    {
      title: "Seção 6: Google Analytics 4 (GA4)",
      duration: "3h 16min",
      lessons: [
        {
          title: "Introdução ao GA4",
          duration: "10m",
          completed: false,
          current: false,
        },
        {
          title: "Configuração inicial",
          duration: "15m",
          completed: false,
          current: false,
        },
      ],
    },
    {
      title: "Seção 7: Próximos Passos!",
      duration: "11.6m",
      lessons: [
        {
          title: "Recapitulação do curso",
          duration: "6m",
          completed: false,
          current: false,
        },
        {
          title: "Próximos passos na sua carreira",
          duration: "5m",
          completed: false,
          current: false,
        },
      ],
    },
  ];

  const toggleSection = (index: number) => {
    setExpandedSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="w-96 border-l border-muted flex flex-col">
      <div className="p-4 border-b border-muted">
        <h2 className="font-semibold text-lg">Conteúdo do curso</h2>
        <p className="text-sm  mt-1">
          {sections.length} seções • {courseData.lessons} aulas •{" "}
          {courseData.totalHours}h de duração total
        </p>
      </div>

      <div className="flex-1 overflow-auto">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="border-b border-border">
            <button
              onClick={() => toggleSection(sectionIndex)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted transition-colors"
            >
              <div className="flex-1 text-left">
                <div className="font-medium text-sm text-foreground">
                  {section.title}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {section.lessons.length} aulas • {section.duration}
                </div>
              </div>
              {expandedSections.includes(sectionIndex) ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              )}
            </button>
            {expandedSections.includes(sectionIndex) && (
              <div className="bg-background">
                {section.lessons.map((lesson, lessonIndex) => (
                  <button
                    key={lessonIndex}
                    onClick={() => setActiveLesson(lessonIndex)}
                    className={`w-full px-6 py-3 flex items-center gap-3 hover:bg-muted transition-colors ${
                      lesson.current ? "bg-muted border-l-4 border-primary" : ""
                    }`}
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
                        {lesson.title}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        {lesson.duration}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

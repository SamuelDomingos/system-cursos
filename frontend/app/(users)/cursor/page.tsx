'use client';

import { useSearchParams } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BookOpen, PlayCircle } from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  duration: string;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface Course {
  title: string;
  description: string;
  value: string;
  imageSrc: string;
  modules: Module[];
}

// Dados simulados de cursos
const coursesData: Course[] = [
  {
    title: "Desenvolvimento Web com React",
    description: "Aprenda a criar interfaces de usuário modernas e reativas com React, do básico ao avançado. Este curso cobre hooks, roteamento, gerenciamento de estado e integração com APIs.",
    value: "R$ 299,90",
    imageSrc: "https://via.placeholder.com/800x400/FF5733/FFFFFF?text=React+Course",
    modules: [
      {
        id: "mod1",
        title: "Módulo 1: Fundamentos do React",
        lessons: [
          { id: "les1", title: "Introdução ao React e JSX", duration: "15 min" },
          { id: "les2", title: "Componentes Funcionais e Props", duration: "20 min" },
          { id: "les3", title: "Estado e Ciclo de Vida", duration: "25 min" },
        ],
      },
      {
        id: "mod2",
        title: "Módulo 2: Hooks Essenciais",
        lessons: [
          { id: "les4", title: "useState e useEffect", duration: "30 min" },
          { id: "les5", title: "useContext e useReducer", duration: "35 min" },
          { id: "les6", title: "Hooks Personalizados", duration: "20 min" },
        ],
      },
      {
        id: "mod3",
        title: "Módulo 3: Roteamento com React Router",
        lessons: [
          { id: "les7", title: "Configurando Rotas", duration: "20 min" },
          { id: "les8", title: "Navegação Programática", duration: "18 min" },
        ],
      },
    ],
  },
  {
    title: "Backend com Node.js e Express",
    description: "Construa APIs robustas e escaláveis utilizando Node.js e o framework Express. Aprenda sobre middlewares, banco de dados (MongoDB), autenticação e deploy.",
    value: "R$ 349,90",
    imageSrc: "https://via.placeholder.com/800x400/33FF57/FFFFFF?text=Node.js+Course",
    modules: [
      {
        id: "mod4",
        title: "Módulo 1: Introdução ao Node.js",
        lessons: [
          { id: "les9", title: "O que é Node.js e npm", duration: "10 min" },
          { id: "les10", title: "Primeira API com Express", duration: "20 min" },
        ],
      },
      {
        id: "mod5",
        title: "Módulo 2: Banco de Dados com MongoDB",
        lessons: [
          { id: "les11", title: "Conectando ao MongoDB", duration: "25 min" },
          { id: "les12", title: "Modelagem de Dados com Mongoose", duration: "30 min" },
        ],
      },
    ],
  },
  {
    title: "Introdução ao Python para Dados",
    description: "Dê os primeiros passos na análise de dados com Python. Este curso aborda fundamentos da linguagem, manipulação de dados com Pandas e visualização com Matplotlib.",
    value: "R$ 199,90",
    imageSrc: "https://via.placeholder.com/800x400/3357FF/FFFFFF?text=Python+Data",
    modules: [
      {
        id: "mod6",
        title: "Módulo 1: Fundamentos do Python",
        lessons: [
          { id: "les13", title: "Variáveis e Tipos de Dados", duration: "15 min" },
          { id: "les14", title: "Estruturas de Controle", duration: "20 min" },
        ],
      },
      {
        id: "mod7",
        title: "Módulo 2: Manipulação de Dados com Pandas",
        lessons: [
          { id: "les15", title: "Introdução ao Pandas e DataFrames", duration: "30 min" },
          { id: "les16", title: "Filtragem e Agregação de Dados", duration: "35 min" },
        ],
      },
    ],
  },
];

const CursorPage = () => {
  const searchParams = useSearchParams();
  const courseTitle = searchParams.get('title');

  const course = coursesData.find(c => c.title === courseTitle);

  if (!course) {
    return (
      <div className="container mx-auto p-6 text-center mt-20">
        <h1 className="text-3xl font-bold text-red-500">Curso não encontrado!</h1>
        <p className="text-lg text-gray-600 mt-4">Verifique o título do curso e tente novamente.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 mt-10">
      <div className="mb-8">
        <img src={course.imageSrc} alt={course.title} className="w-full h-64 object-cover rounded-lg shadow-md" />
        <h1 className="text-4xl font-bold mt-6 dark:text-white">{course.title}</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">{course.description}</p>
        <p className="text-2xl font-bold text-primary mt-4">{course.value}</p>
      </div>

      <Separator className="my-8" />

      <h2 className="text-3xl font-bold mb-6 dark:text-white">Módulos do Curso</h2>
      <div className="space-y-6">
        {course.modules.map((moduleItem) => (
          <Card key={moduleItem.id} className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl dark:text-white">
                <BookOpen className="w-5 h-5 text-primary" />
                {moduleItem.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {moduleItem.lessons.map((lesson) => (
                  <li key={lesson.id} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    <PlayCircle className="w-4 h-4 text-green-500" />
                    <span>{lesson.title}</span>
                    <span className="ml-auto text-sm text-slate-500 dark:text-slate-400">{lesson.duration}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CursorPage;
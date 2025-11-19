"use client";

import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  PlayCircle,
  Clock,
  Award,
  Download,
  Smartphone,
  Infinity,
  Star,
  CheckCircle,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: "video" | "article" | "quiz";
}

interface Module {
  id: string;
  title: string;
  lectures: number;
  duration: string;
  lessons: Lesson[];
}

interface Instructor {
  name: string;
  title: string;
  rating: number;
  reviews: number;
  students: number;
  courses: number;
  image: string;
  bio: string;
}

interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
}

interface Course {
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  lastUpdated: string;
  language: string;
  price: string;
  originalPrice: string;
  imageSrc: string;
  bestseller: boolean;
  level: string;
  duration: string;
  whatYouLearn: string[];
  requirements: string[];
  forWho: string[];
  modules: Module[];
  instructors: Instructor[];
  reviews: Review[];
}

const coursesData: Course[] = [
  {
    title: "Desenvolvimento Web com React",
    subtitle: "Aprenda React do zero ao avançado com projetos práticos",
    description:
      "Aprenda a criar interfaces de usuário modernas e reativas com React, do básico ao avançado. Este curso cobre hooks, roteamento, gerenciamento de estado e integração com APIs.",
    longDescription:
      "Neste curso completo de React, você vai aprender desde os fundamentos até conceitos avançados. Vamos construir projetos reais do zero, incluindo um e-commerce completo, uma rede social e um sistema de gerenciamento. Você vai dominar hooks, context API, Redux, React Router, styled-components e muito mais.",
    rating: 4.7,
    reviewsCount: 12453,
    studentsCount: 45821,
    lastUpdated: "11/2024",
    language: "Português",
    price: "R$ 29,90",
    originalPrice: "R$ 299,90",
    imageSrc:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
    bestseller: true,
    level: "Todos os níveis",
    duration: "42 horas",
    whatYouLearn: [
      "Criar aplicações React modernas do zero",
      "Dominar React Hooks (useState, useEffect, useContext, useReducer)",
      "Trabalhar com React Router para navegação",
      "Gerenciar estado global com Context API e Redux",
      "Integrar APIs REST e trabalhar com dados assíncronos",
      "Implementar autenticação e autorização",
      "Criar componentes reutilizáveis e escaláveis",
      "Aplicar boas práticas e padrões de projeto",
    ],
    requirements: [
      "Conhecimento básico de HTML, CSS e JavaScript",
      "Familiaridade com ES6+ (arrow functions, destructuring, etc)",
      "Um computador com acesso à internet",
      "Vontade de aprender e praticar",
    ],
    forWho: [
      "Desenvolvedores que querem aprender React",
      "Estudantes de programação buscando se especializar em front-end",
      "Profissionais que desejam adicionar React ao seu portfólio",
      "Qualquer pessoa interessada em desenvolvimento web moderno",
    ],
    modules: [
      {
        id: "mod1",
        title: "Introdução e Fundamentos do React",
        lectures: 15,
        duration: "2h 30min",
        lessons: [
          {
            id: "les1",
            title: "Bem-vindo ao curso",
            duration: "5 min",
            type: "video",
          },
          {
            id: "les2",
            title: "O que é React e por que usar?",
            duration: "12 min",
            type: "video",
          },
          {
            id: "les3",
            title: "Configurando o ambiente de desenvolvimento",
            duration: "15 min",
            type: "video",
          },
          {
            id: "les4",
            title: "Seu primeiro componente React",
            duration: "20 min",
            type: "video",
          },
          {
            id: "les5",
            title: "JSX: JavaScript + HTML",
            duration: "18 min",
            type: "video",
          },
          {
            id: "les6",
            title: "Props e composição de componentes",
            duration: "25 min",
            type: "video",
          },
          {
            id: "les7",
            title: "Quiz: Fundamentos",
            duration: "10 min",
            type: "quiz",
          },
        ],
      },
      {
        id: "mod2",
        title: "Estado e Ciclo de Vida",
        lectures: 12,
        duration: "2h 15min",
        lessons: [
          {
            id: "les8",
            title: "Introdução ao estado com useState",
            duration: "20 min",
            type: "video",
          },
          {
            id: "les9",
            title: "Eventos e manipulação de estado",
            duration: "25 min",
            type: "video",
          },
          {
            id: "les10",
            title: "Renderização condicional",
            duration: "15 min",
            type: "video",
          },
          {
            id: "les11",
            title: "Listas e keys",
            duration: "20 min",
            type: "video",
          },
          {
            id: "les12",
            title: "useEffect para efeitos colaterais",
            duration: "30 min",
            type: "video",
          },
        ],
      },
      {
        id: "mod3",
        title: "Hooks Avançados",
        lectures: 18,
        duration: "3h 45min",
        lessons: [
          {
            id: "les13",
            title: "useContext para estado global",
            duration: "25 min",
            type: "video",
          },
          {
            id: "les14",
            title: "useReducer para lógica complexa",
            duration: "30 min",
            type: "video",
          },
          {
            id: "les15",
            title: "useMemo e useCallback para otimização",
            duration: "28 min",
            type: "video",
          },
          {
            id: "les16",
            title: "useRef e manipulação do DOM",
            duration: "20 min",
            type: "video",
          },
          {
            id: "les17",
            title: "Custom Hooks",
            duration: "35 min",
            type: "video",
          },
        ],
      },
    ],
    instructors: [
      {
        name: "João Silva",
        title: "Desenvolvedor Full Stack Sênior",
        rating: 4.8,
        reviews: 45123,
        students: 152340,
        courses: 12,
        image: "https://i.pravatar.cc/150?img=12",
        bio: "Desenvolvedor com mais de 10 anos de experiência em tecnologias web. Trabalhou em empresas como Google e Microsoft, e agora se dedica a ensinar programação online.",
      },
    ],
    reviews: [
      {
        id: "rev1",
        userName: "Maria Santos",
        rating: 5,
        date: "há 2 semanas",
        comment:
          "Curso excelente! Muito bem explicado e com projetos práticos que realmente ajudam a fixar o conteúdo. Recomendo!",
      },
      {
        id: "rev2",
        userName: "Pedro Costa",
        rating: 5,
        date: "há 1 mês",
        comment:
          "Melhor curso de React que já fiz. O instrutor é muito didático e os exemplos são bem práticos.",
      },
      {
        id: "rev3",
        userName: "Ana Oliveira",
        rating: 4,
        date: "há 2 meses",
        comment:
          "Muito bom! Só achei que algumas partes poderiam ser mais aprofundadas, mas no geral está ótimo.",
      },
    ],
  },
];

const CursorPage = () => {
  const searchParams = useSearchParams();
  const courseTitle =
    searchParams.get("title") || "Desenvolvimento Web com React";
  const course =
    coursesData.find((c) => c.title === courseTitle) || coursesData[0];
  const [expandedModules, setExpandedModules] = useState<string[]>([]);

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6 grid lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2">
            {course.bestseller && (
              <Badge className="bg-yellow-600 text-white mb-2">
                Mais vendido
              </Badge>
            )}
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              {course.title}
            </h1>
            <p className="text-lg text-gray-300 mb-4">{course.subtitle}</p>

            <div className="flex flex-wrap items-center gap-3 text-sm mb-4">
              <div className="flex items-center gap-1">
                <span className="font-bold text-yellow-400">
                  {course.rating}
                </span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(course.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-400"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-yellow-400">
                  ({course.reviewsCount.toLocaleString()} avaliações)
                </span>
              </div>
              <span>{course.studentsCount.toLocaleString()} alunos</span>
            </div>

            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span>
                  Criado por{" "}
                  <span className="text-purple-400 underline">
                    {course.instructors[0].name}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Última atualização {course.lastUpdated}</span>
              </div>
              <div>
                <span>{course.language}</span>
              </div>
            </div>
          </div>

          {/* Right Card - Sticky on Desktop */}
          <div className="hidden lg:block">
            {/* This will be positioned fixed in actual implementation */}
          </div>
        </div>
      </div>

      {/* Floating Card for Mobile/Tablet */}
      <div className="lg:hidden container mx-auto px-6 -mt-6 relative z-10">
        <Card className="shadow-2xl">
          <img
            src={course.imageSrc}
            alt={course.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <CardContent className="p-6">
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-3xl font-bold">{course.price}</span>
              <span className="text-lg text-gray-500 line-through">
                {course.originalPrice}
              </span>
              <Badge variant="destructive">90% OFF</Badge>
            </div>
            <Button className="w-full mb-2 bg-purple-600 hover:bg-purple-700 text-white">
              Adicionar ao carrinho
            </Button>
            <Button variant="outline" className="w-full">
              Comprar agora
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Desktop Floating Card */}
      <div className="hidden lg:block fixed right-8 top-24 w-96 z-50">
        <Card className="shadow-2xl">
          <img
            src={course.imageSrc}
            alt={course.title}
            className="w-full h-52 object-cover rounded-t-lg"
          />
          <CardContent className="p-6">
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-3xl font-bold dark:text-white">
                {course.price}
              </span>
              <span className="text-lg text-gray-500 line-through">
                {course.originalPrice}
              </span>
              <Badge variant="destructive">90% OFF</Badge>
            </div>
            <Button className="w-full mb-2 bg-purple-600 hover:bg-purple-700 text-white text-lg py-6">
              Adicionar ao carrinho
            </Button>
            <Button variant="outline" className="w-full mb-4 py-6 text-lg">
              Comprar agora
            </Button>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{course.duration} de vídeo sob demanda</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                <span>Recursos para download</span>
              </div>
              <div className="flex items-center gap-2">
                <Infinity className="w-4 h-4" />
                <span>Acesso completo vitalício</span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4" />
                <span>Acesso no celular e TV</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>Certificado de conclusão</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 lg:pr-[450px]">
        {/* What you'll learn */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">O que você aprenderá</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              {course.whatYouLearn.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Course Content */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">
            Conteúdo do curso
          </h2>
          <div className="flex flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <span>{course.modules.length} seções</span>
            <span>•</span>
            <span>
              {course.modules.reduce((acc, m) => acc + m.lectures, 0)} aulas
            </span>
            <span>•</span>
            <span>{course.duration} de duração total</span>
          </div>

          <div className="space-y-2">
            {course.modules.map((module) => (
              <Card key={module.id} className="overflow-hidden">
                <button
                  onClick={() => toggleModule(module.id)}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {expandedModules.includes(module.id) ? (
                      <ChevronDown className="w-5 h-5" />
                    ) : (
                      <ChevronRight className="w-5 h-5" />
                    )}
                    <div className="text-left">
                      <h3 className="font-semibold dark:text-white">
                        {module.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {module.lectures} aulas • {module.duration}
                      </p>
                    </div>
                  </div>
                </button>

                {expandedModules.includes(module.id) && (
                  <div className="border-t dark:border-gray-700">
                    {module.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="p-4 pl-12 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <div className="flex items-center gap-3">
                          <PlayCircle className="w-4 h-4 text-gray-600" />
                          <span className="text-sm dark:text-gray-300">
                            {lesson.title}
                          </span>
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {lesson.duration}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">
            Requisitos
          </h2>
          <ul className="space-y-2">
            {course.requirements.map((req, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
              >
                <span className="text-gray-400">•</span>
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">Descrição</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {course.description}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              {course.longDescription}
            </p>
          </div>
        </div>

        {/* For Who */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">
            Para quem é este curso:
          </h2>
          <ul className="space-y-2">
            {course.forWho.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
              >
                <span className="text-gray-400">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Instructor */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 dark:text-white">Instrutor</h2>
          {course.instructors.map((instructor) => (
            <Card key={instructor.name} className="p-6">
              <div className="flex gap-6">
                <img
                  src={instructor.image}
                  alt={instructor.name}
                  className="w-32 h-32 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-purple-600 mb-1">
                    {instructor.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {instructor.title}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{instructor.rating} Avaliação</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      <span>
                        {instructor.reviews.toLocaleString()} Avaliações
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      <span>{instructor.students.toLocaleString()} Alunos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PlayCircle className="w-4 h-4" />
                      <span>{instructor.courses} Cursos</span>
                    </div>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300">
                    {instructor.bio}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Reviews */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 dark:text-white">
            Avaliações dos alunos
          </h2>
          <div className="space-y-4">
            {course.reviews.map((review) => (
              <Card key={review.id} className="p-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {review.userName.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold dark:text-white">
                      {review.userName}
                    </h4>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {review.date}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      {review.comment}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CursorPage;

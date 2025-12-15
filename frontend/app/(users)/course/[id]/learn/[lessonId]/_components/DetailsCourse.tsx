import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Users,
  Clock,
  FileText,
  MessageSquare,
  Award,
} from "lucide-react";

export const DetailsCourse = ({ courseData }: { courseData: any }) => {
  console.log(courseData);

  return (
    <div className="flex-1">
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-2">{courseData.title}</h1>

        <div className="flex items-center gap-6 mb-6 flex-wrap">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-sm">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
              {courseData.rating}
            </Badge>
            <span className="text-sm ">9.968 classificações</span>
          </div>
          <div className="flex items-center gap-2 text-sm ">
            <Users className="w-4 h-4" />
            {/* {courseData.students.toLocaleString()} alunos */}
          </div>
          <div className="flex items-center gap-2 text-sm ">
            <Clock className="w-4 h-4" />
            {courseData.totalHours} horas no total
          </div>
          <div className="flex items-center gap-2 text-sm ">
            <FileText className="w-4 h-4" />
            {courseData.modules.reduce(
              (acc: number, m: any) => acc + m.lessons.length,
              0
            )}{" "}
            aulas
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Visão geral</TabsTrigger>
            <TabsTrigger value="qa">Perguntas e respostas</TabsTrigger>
            <TabsTrigger value="notes">Observações</TabsTrigger>
            <TabsTrigger value="announcements">Anúncios</TabsTrigger>
            <TabsTrigger value="reviews">Avaliações</TabsTrigger>
            <TabsTrigger value="tools">Ferramentas de aprendizado</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">Descrição</h3>
                <p className=" leading-relaxed">{courseData.description}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Certificados</h3>
                <p className=" mb-4">
                  Termine o curso por completo para receber um certificado da
                  Udemy
                </p>
                <Button variant="outline">
                  <Award className="w-4 h-4 mr-2" />
                  Certificado da Udemy
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="qa">
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 mx-auto mb-4" />
              <p className="">
                Nenhuma pergunta ainda. Seja o primeiro a perguntar!
              </p>
            </div>
          </TabsContent>

          <TabsContent value="notes">
            <div className="text-center py-12">
              <FileText className="w-12 h-12 mx-auto mb-4" />
              <p className="">Você ainda não fez nenhuma anotação</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

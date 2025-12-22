"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AllCourses from "./_tabs/allCourses";
import TabLists from "./_tabs/tabLists";

export default function MyLearningPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Meu aprendizado</h1>

      <Tabs defaultValue="all">
        <TabsList className="w-full justify-start mb-8 overflow-x-auto">
          <TabsTrigger value="all">Todos os cursos</TabsTrigger>
          <TabsTrigger value="lists">Minhas listas</TabsTrigger>
          <TabsTrigger value="wishlist">Lista de desejos</TabsTrigger>
          <TabsTrigger value="certifications">Certificações</TabsTrigger>
          <TabsTrigger value="archived">Arquivados</TabsTrigger>
          <TabsTrigger value="tools">Ferramentas de aprendizado</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <AllCourses />
        </TabsContent>
         <TabsContent value="lists">
          <TabLists />
        </TabsContent>
        
      </Tabs>
    </div>
  );
}

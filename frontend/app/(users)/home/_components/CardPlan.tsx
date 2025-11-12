import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, BookOpen, Headphones, RefreshCw } from "lucide-react";

export function CardPlan() {
  return (
    <div className="flex justify-center mt-16">
      <Card className="w-full max-w-6xl bg-gray-900 text-white p-6 md:p-8 lg:p-12 min-h-[500px]">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1 space-y-4">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">
                Plano Top: Acesso Total e Vitalício
              </CardTitle>
              <CardDescription className="text-gray-400 text-sm md:text-base">
                Prepare suas habilidades para o futuro com o Plano Top. Tenha
                acesso a uma variedade de conteúdo atualizado de especialistas
                reais, para sempre.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 flex flex-col md:flex-row md:space-x-4 md:space-y-0">
                <div className="flex items-center space-x-2">
                  <BookOpen className="text-blue-400" size={20} />
                  <p className="text-sm md:text-base">
                    Todos os cursos disponíveis
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="text-yellow-400" size={20} />
                  <p className="text-sm md:text-base">
                    Acesso vitalício a todo o conteúdo
                  </p>
                </div>
              </div>
              <div className="space-y-3 flex flex-col md:flex-row md:space-x-4 md:space-y-0">
                <div className="flex items-center space-x-2">
                  <RefreshCw className="text-green-400" size={20} />
                  <p className="text-sm md:text-base">
                    Atualizações constantes sem custo adicional
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Headphones className="text-red-400" size={20} />
                  <p className="text-sm md:text-base">Suporte prioritário</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start space-y-2">
              <Button variant="default" className="w-full">
                Saiba mais
              </Button>
              <p className="text-xs md:text-sm text-gray-400">
                A partir de R$99.90/mês
              </p>
            </CardFooter>
          </div>
          <div className="flex-1 p-4">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=60"
              alt="Exemplo de intent"
              className="w-full h-auto rounded-md"
            />
          </div>
        </div>
      </Card>
    </div>
  );
}

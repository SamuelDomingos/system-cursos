import { ProgressCircle } from "@/components/circularProgress";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Info, Flame } from "lucide-react";
import { useEffect, useState } from "react";

export default function WeeklyProgressCard() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate progress animation
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 65) return 65;
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(timer);
  }, []);

  return (
    <Card className="p-6 w-full">
      <div className="flex items-center justify-between w-full">
        <div className="max-w-md">
          <CardTitle className="text-xl mb-1">
            Comece uma sequência semanal
          </CardTitle>
          <CardDescription>
            Um círculo concluído! Agora, assista aos seus cursos.
          </CardDescription>
        </div>

        <div className="relative flex items-center gap-3">
          <div className="relative">
            <ProgressCircle
              value={progress}
              size={100}
              strokeWidth={6}
              indicatorClassName="text-green-500"
            >
              <ProgressCircle
                value={progress}
                size={60}
                strokeWidth={6}
                indicatorClassName="text-yellow-500"
              />
            </ProgressCircle>
          </div>

          <div className="text-sm ">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-orange-400"></span>
              <span>0/30 min no curso</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              <span>1/1 visita</span>
            </div>
            <div className="text-gray-500">7 de dez. - 13</div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Info className="absolute top-0 right-0 h-4 w-4 text-gray-400 cursor-pointer" />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold mb-2">
                  Sobre sequências
                </DialogTitle>
                <DialogDescription className="text-base ">
                  Conclua os círculos de acessos e minutos assistidos para
                  manter sua sequência semanal.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex items-start gap-2">
                  <span className="h-3 w-3 mt-1 rounded-full bg-orange-400 flex-shrink-0"></span>
                  <div>
                    <p className="font-semibold">
                      Para concluir o círculo de visualizações
                    </p>
                    <p>Assista a 30 minutos de vídeos do curso.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="h-3 w-3 mt-1 rounded-full bg-green-500 flex-shrink-0"></span>
                  <div>
                    <p className="font-semibold">
                      Para concluir o círculo de acessos
                    </p>
                    <p>Abra o app ou site uma vez por semana</p>
                  </div>
                </div>
              </div>
              <div className="border-t pt-4">
                <p className="font-semibold mb-1">Atualizações de dados</p>
                <p>
                  Os minutos assistidos são atualizados três vezes por dia.
                  Volte daqui a algumas horas para ver seu progresso.
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Card>
  );
}

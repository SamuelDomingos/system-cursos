import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play } from "lucide-react";

export const VideoPlayer = () => {
  return (
    <div className="bg-black aspect-video relative">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl font-bold mb-4">PILARES</div>
          <div className="bg-black/80 px-4 py-2 text-sm max-w-2xl mx-auto">
            Tem gente que acha que o gestor de tráfego só precisa dominar os
            anúncios on line e anúncios no Facebook.
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 left-4 right-4 flex items-center gap-4">
        <Button size="sm" variant="secondary" className="rounded-full">
          <Play className="w-4 h-4" />
        </Button>
        <Progress value={35} className="flex-1 h-1" />
        <span className="text-sm">6:12 / 17:36</span>
      </div>
    </div>
  );
};

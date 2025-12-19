import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Download, Infinity, Smartphone, Award } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

export default function PriceCard({
  imageSrc,
  course,
}: {
  imageSrc: string;
  course: any;
}) {
  const { addItemToCart } = useCart();

  return (
    <div>
      <div className="lg:hidden container mx-auto px-6 -mt-6 relative z-10">
        <Card className="shadow-2xl">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={course.title}
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-lg font-semibold text-gray-500">Curso</span>
          )}
          <CardContent className="p-6">
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-3xl font-bold">
                {formatCurrency(course.price)}
              </span>
              <span className="text-lg text-gray-500 line-through">
                {formatCurrency(1000)}
              </span>
              <Badge variant="destructive">90% OFF</Badge>
            </div>
            <Button
              className="w-full mb-2 bg-purple-600 hover:bg-purple-700 text-white"
              onClick={() =>
                addItemToCart({
                  id: course.id,
                  imageSrc: imageSrc,
                  title: course.title,
                  description: course.description,
                  price: course.price,
                })
              }
            >
              Adicionar ao carrinho
            </Button>
            <Button variant="outline" className="w-full">
              Comprar agora
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="hidden lg:block fixed right-8 top-24 w-96 z-50">
        <Card className="shadow-2xl">
          <img
            src={imageSrc}
            alt={course.title}
            className="w-full h-52 object-cover rounded-t-lg"
          />
          <CardContent className="p-6">
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-3xl font-bold dark:text-white">
                {formatCurrency(course.price)}
              </span>
              <span className="text-lg text-gray-500 line-through">
                {formatCurrency(1000)}
              </span>
              <Badge variant="destructive">90% OFF</Badge>
            </div>
            {course.userHasCourse === true ? (
              <Link href={`/course/${course.id}/learn/${course.lastLessonId}`}>
                <Button className="w-full text-white text-lg py-6 mb-8 mt-4">
                  Assistir Aula
                </Button>
              </Link>
            ) : (
              <div>
                <Button
                  className="w-full mb-2 text-white text-lg py-6"
                  onClick={() =>
                    addItemToCart({
                      id: course.id,
                      imageSrc: imageSrc,
                      title: course.title,
                      description: course.description,
                      price: course.price,
                    })
                  }
                >
                  Adicionar ao carrinho
                </Button>
                <Button variant="outline" className="w-full mb-4 py-6 text-lg">
                  Comprar agora
                </Button>
              </div>
            )}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{course.duration} de duração total</span>
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
    </div>
  );
}

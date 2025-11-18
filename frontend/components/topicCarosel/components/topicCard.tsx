
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TopicCardProps {
  title: string;
  description: string;
  value: string;
  imageSrc?: string;
}

export function TopicCard({
  title,
  description,
  value,
  imageSrc,
}: TopicCardProps) {
  return (
    <Link href={`/cursor?title=${encodeURIComponent(title)}`}>
      <Card className="group w-[360px] h-[250px] flex flex-col justify-between relative overflow-hidden cursor-pointer">
      <div className="absolute inset-0 flex items-center justify-center">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={title}
            className="object-cover w-full h-full"
          />
        ) : (
          <span className="text-lg font-semibold text-gray-500">Curso</span>
        )}
      </div>

      <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-black/50 text-white">
        <CardHeader className="p-0">
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription className="text-sm">{description}</CardDescription>
        </CardHeader>

        <CardContent className="flex-grow p-0">
        </CardContent>

        <CardFooter className="p-0">
          <span className="text-md font-bold">{value}</span>
        </CardFooter>
      </div>
    </Card>
    </Link>
  );
}

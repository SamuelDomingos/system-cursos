import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

export function Banner() {
  return (
    <div
      className="relative h-[500px] w-full bg-cover bg-center"
      style={{ backgroundImage: "url('/images/banner-bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex h-full items-center justify-center">
        <Carousel className="w-[90%]" opts={{ loop: true }}>
          <CarouselContent>
            <CarouselItem>
              <Card className="w-[350px] ml-12">
                <CardHeader>
                  <CardTitle>Welcome! (Item 1)</CardTitle>
                  <CardDescription>This is your banner card.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>You can put any content here.</p>
                </CardContent>
                <CardFooter>
                  <p>Enjoy!</p>
                </CardFooter>
              </Card>
            </CarouselItem>
            <CarouselItem>
              <Card className="w-[350px]">
                <CardHeader>
                  <CardTitle>Welcome! (Item 2)</CardTitle>
                  <CardDescription>This is your banner card.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>You can put any content here.</p>
                </CardContent>
                <CardFooter>
                  <p>Enjoy!</p>
                </CardFooter>
              </Card>
            </CarouselItem>
            <CarouselItem>
              <Card className="w-[350px]">
                <CardHeader>
                  <CardTitle>Welcome! (Item 3)</CardTitle>
                  <CardDescription>This is your banner card.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>You can put any content here.</p>
                </CardContent>
                <CardFooter>
                  <p>Enjoy!</p>
                </CardFooter>
              </Card>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
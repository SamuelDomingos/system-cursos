import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background w-full">
      {/* Header */}
      <header className="container sticky top-0 z-40 bg-background">
        <div className="flex h-16 items-center justify-between border-b border-border">
          <a href="#" className="text-2xl font-bold">
            Cursos
          </a>
          <nav className="space-x-4">
            <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
              Cursos
            </a>
            <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
              Sobre
            </a>
            <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
              Contato
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section with Scroll Animation */}
      <section className="flex flex-col overflow-hidden">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-black dark:text-white">
                Aprenda e Cresça com Nossos Cursos
              </h1>
              <p className="max-w-[700px] mx-auto mt-4 text-lg text-muted-foreground sm:text-xl">
                Oferecemos uma ampla variedade de cursos para você aprimorar suas habilidades e alcançar seus objetivos.
              </p>
            </>
          }
        >
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&h=720&fit=crop"
            alt="Estudantes aprendendo juntos"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-center"
            draggable={false}
          />
        </ContainerScroll>
      </section>

      {/* Features Section */}
      <section className="container grid grid-cols-1 gap-8 py-16 md:grid-cols-3 md:py-24 lg:py-32">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold">Cursos Diversificados</h2>
          <p className="text-muted-foreground">
            Explore uma vasta gama de cursos em diversas áreas do conhecimento.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold">Instrutores Qualificados</h2>
          <p className="text-muted-foreground">
            Aprenda com os melhores profissionais do mercado, com experiência comprovada.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold">Flexibilidade de Estudo</h2>
          <p className="text-muted-foreground">
            Estude no seu ritmo, de onde quiser e quando puder, com acesso 24/7.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="container flex h-16 items-center justify-center border-t border-border">
        <p className="text-muted-foreground">
          © 2023 Cursos. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}
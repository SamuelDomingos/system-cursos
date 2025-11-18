import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Users, Sparkles } from "lucide-react";

export default function PricingPlans() {
  const plans = [
    {
      name: "Plano Team",
      subtitle: "2 a 50 pessoas — Para sua equipe",
      price: "R$169.00",
      period: "por mês por usuário",
      note: "Cobrança anual. Cancele a qualquer momento.",
      buttonText: "Experimente grátis",
      color: "from-primary to-primary-foreground",
      features: [
        "Acesso a mais de 13.000 cursos conceituados",
        "Preparação para certificação",
        "Recomendações com foco em objetivo",
        "Coaching baseado em IA",
        "Relatórios de análise e adoção",
      ],
    },
    {
      name: "Plano Enterprise",
      subtitle: "Mais de 20 pessoas — Para toda sua organização",
      price: null,
      buttonText: "Solicite uma demonstração",
      color: "from-secondary to-secondary-foreground",
      note: "Entre em contato com a equipe de vendas para conhecer os preços",
      features: [
        "Acesso a mais de 30.000 cursos conceituados",
        "Preparação para certificação",
        "Recomendações com foco em objetivo",
        "Coaching baseado em IA",
        "Análises e insights avançados",
        "Equipe dedicada de sucesso do cliente",
        "Coleções internacionais de cursos com 15 idiomas",
        "Conteúdo personalizável",
        "Treinamento técnico prático com complemento",
        "Serviços de implementação estratégica com complemento",
      ],
    },
    {
      name: "fluência em IA",
      subtitle: "Desde conceitos básicos de IA até transformação empresarial",
      buttonText: "Fale conosco",
      color: "from-accent to-accent-foreground",
      sections: [
        {
          title: "Acervo AI Readiness",
          subtitle: "Mais de 100 pessoas",
          description:
            "Desenvolva rapidamente fluência em IA em toda a organização com 50 cursos selecionados + AI Assistant para acelerar o aprendizado.",
        },
        {
          title: "Acervo AI Growth",
          subtitle: "Mais de 20 pessoas",
          description:
            "Amplie o conhecimento técnico e em IA com mais de 800 cursos especializados e mais de 30 trilhas de aprendizado específicas para cargos em vários idiomas.",
        },
      ],
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-8 mt-60">
      <div className="text-center space-y-3 mb-12">
        <h1 className="text-4xl font-bold dark:text-white">
          Amplie as habilidades da sua equipe e seus negócios
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
          Alcance metas mais rapidamente com um dos nossos planos ou programas.
          Experimente um gratuitamente hoje mesmo ou fale com a equipe de vendas
          para saber mais.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, idx) => (
          <Card key={idx} className="relative overflow-hidden flex flex-col">
            <div className={`h-1 bg-gradient-to-r ${plan.color}`} />

            <CardHeader className="space-y-4">
              <div className="flex items-start gap-2">
                <Users className="w-5 h-5 text-slate-600 mt-1" />
                <div>
                  <CardTitle className="text-xl font-bold dark:text-white">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-sm mt-1 dark:text-slate-400">
                    {plan.subtitle}
                  </CardDescription>
                </div>
              </div>

              <Button
                variant="default"
                className="w-full font-semibold"
              >
                {plan.buttonText}
              </Button>

              {plan.price && (
                <div className="pt-2">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {plan.price}{" "}
                    <span className="text-base fonta_normal text-slate-600 dark:text-slate-400">
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    {plan.note}
                  </p>
                </div>
              )}

              {plan.note && !plan.price && (
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {plan.note}
                </p>
              )}
            </CardHeader>

            <CardContent className="flex-1">
              {plan.features && (
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-700 dark:text-slate-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {plan.sections && (
                <div className="space-y-6">
                  {plan.sections.map((section, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-slate-600" />
                        <h3 className="font-bold text-slate-900 dark:text-white">
                          {section.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-slate-600" />
                        <span className="text-slate-700 dark:text-slate-300">
                          {section.subtitle}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {section.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

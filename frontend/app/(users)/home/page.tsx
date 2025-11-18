
import { Banner } from "./_components/banner";
import { CardPlan } from "./_components/CardPlan";
import { TopicCarousels } from "@/components/topicCarosel";
import PricingPlans from "./_components/pricingPlans";

const HomePage = () => {
  const exampleSections = [
    {
      title: "Cursos Populares",
      topics: [
        {
          title: "Desenvolvimento Web com React",
          description: "Aprenda a criar interfaces de usuário modernas e reativas.",
          value: "R$ 299,90",
          imageSrc: "https://via.placeholder.com/150/FF5733/FFFFFF?text=React",
        },
        {
          title: "Backend com Node.js e Express",
          description: "Construa APIs robustas e escaláveis.",
          value: "R$ 349,90",
          imageSrc: "https://via.placeholder.com/150/33FF57/FFFFFF?text=Node",
        },
        {
          title: "Introdução ao Python para Dados",
          description: "Primeiros passos na análise de dados com Python.",
          value: "R$ 199,90",
          imageSrc: "https://via.placeholder.com/150/3357FF/FFFFFF?text=Python",
        },
        {
          title: "Desenvolvimento Web com React",
          description: "Aprenda a criar interfaces de usuário modernas e reativas.",
          value: "R$ 299,90",
          imageSrc: "https://via.placeholder.com/150/FF5733/FFFFFF?text=React",
        },
        {
          title: "Backend com Node.js e Express",
          description: "Construa APIs robustas e escaláveis.",
          value: "R$ 349,90",
          imageSrc: "https://via.placeholder.com/150/33FF57/FFFFFF?text=Node",
        },
        {
          title: "Introdução ao Python para Dados",
          description: "Primeiros passos na análise de dados com Python.",
          value: "R$ 199,90",
          imageSrc: "https://via.placeholder.com/150/3357FF/FFFFFF?text=Python",
        },
      ],
    },
    {
      title: "Novidades em Tecnologia",
      topics: [
        {
          title: "Machine Learning com TensorFlow",
          description: "Explore o mundo da inteligência artificial.",
          value: "R$ 499,90",
          imageSrc: "https://via.placeholder.com/150/FF33A8/FFFFFF?text=ML",
        },
        {
          title: "Blockchain e Criptomoedas",
          description: "Entenda a tecnologia por trás das moedas digitais.",
          value: "R$ 399,90",
          imageSrc: "https://via.placeholder.com/150/A833FF/FFFFFF?text=Crypto",
        },
      ],
    },
  ];

  return (
    <div>
      <Banner />
      <CardPlan />
      <TopicCarousels sections={exampleSections} />
      <PricingPlans/>
    </div>
  );
};

export default HomePage;
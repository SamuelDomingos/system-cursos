
import { Banner } from "./_components/banner";
import { CardPlan } from "./_components/CardPlan";
import { TopicCarousels } from "@/components/topicCarosel";
import PricingPlans from "./_components/pricingPlans";

const HomePage = () => {

  return (
    <div>
      <Banner />
      <CardPlan />
      <TopicCarousels />
      <PricingPlans/>
    </div>
  );
};

export default HomePage;
import { Banner } from "./_components/banner";
import { CardPlan } from "./_components/CardPlan";
import { TopicCarousels } from "@/components/topicCarosel";
import PricingPlans from "./_components/pricingPlans";

export default function Home() {
  return (
    <div>
      <Banner />
      <CardPlan />
      <TopicCarousels />
      <PricingPlans/>
    </div>
  );
}
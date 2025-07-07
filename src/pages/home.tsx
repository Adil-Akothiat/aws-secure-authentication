import type React from "react";
import { features } from "../data/features";
import Section from "../components/section";
import IntroSection from "../layouts/introSection";
import FeatureCard from "../components/featureCard";

const Home: React.FC = () => {
  return (
    <main className="grid grid-cols-1 gap-y-10">
      <IntroSection />
      <Section className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {features.map((f, i) => (
          <FeatureCard
            key={i}
            icon={f.icon}
            title={f.title}
            description={f.description}
            bgColor={f.bgColor}
            iconBgColor={f.iconBgColor}
            iconTextColor={f.iconTextColor}
          />
        ))}
      </Section>
    </main>
  );
};

export default Home;
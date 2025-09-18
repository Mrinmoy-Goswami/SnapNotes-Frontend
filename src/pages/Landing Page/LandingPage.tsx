import React from "react"
import HeroSection from "./components/Hero"
import { BookOpen, FileText, Sparkles, Zap } from "lucide-react";
import FeatureCard from "./components/FeatureCard";
import HowItWorks from "./components/HowItWorks";
import CTASection from "./components/CTASection";



const LandingPage = ()=>{

   const features = [
    { icon: <Sparkles />, title: "Summarize Notes Instantly" },
    { icon: <FileText />, title: "Generate Deep Notes" },
    { icon: <BookOpen />, title: "Quick Notes Before Exams" },
    { icon: <Zap />, title: "Fast, AI-powered Insights" },
  ];
    return (
      <div className="w-screen">
      <HeroSection/>
      <section className="py-20 bg-black text-white px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-12">
          Why Snapnotes?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((f, idx) => (
            <FeatureCard key={idx} icon={f.icon} title={f.title} />
          ))}
        </div>
      </div>
    </section>
    <HowItWorks/>
    <CTASection/>
      </div>
    )
}

export default React.memo(LandingPage)
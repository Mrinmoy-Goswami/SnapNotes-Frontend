import React from "react"
import HeroSection from "./components/Hero"
import { BookOpen, FileText, Sparkles, Zap } from "lucide-react";
import FeatureCard from "./components/FeatureCard";
import HowItWorks from "./components/HowItWorks";
import CTASection from "./components/CTASection";

const LandingPage = () => {
  const features = [
    { icon: <Sparkles />, title: "Summarize Notes Instantly" },
    { icon: <FileText />, title: "Generate Deep Notes" },
    { icon: <BookOpen />, title: "Quick Notes Before Exams" },
    { icon: <Zap />, title: "Fast, AI-powered Insights" },
  ];

  return (
    <div className="w-screen bg-background">
      <HeroSection />
      
      {/* Features Section */}
      <section className="py-20 bg-card border-y border-border px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-foreground">
            Why Snapnotes?
          </h2>
          <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
            Experience the power of AI-driven note-taking that adapts to your learning style
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {features.map((f, idx) => (
              <FeatureCard key={idx} icon={f.icon} title={f.title} />
            ))}
          </div>
        </div>
      </section>

      <HowItWorks />
      <CTASection />
    </div>
  )
}

export default React.memo(LandingPage)
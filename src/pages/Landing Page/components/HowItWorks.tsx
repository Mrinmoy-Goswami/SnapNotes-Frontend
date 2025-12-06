import { Upload, Sparkles, Book } from "lucide-react";
import { memo } from "react";
import FeatureCard from "./FeatureCard";

function HowItWorksSection() {
  const steps = [
    {
      icon: <Upload />,
      title: "Upload Your Notes",
      description: "Start by uploading your notes or documents. You can upload your handwritten notes too!",
    },
    {
      icon: <Sparkles />,
      title: "AI Summarizes Or Generates Deep Notes",
      description: "Our AI creates concise summaries and short notes/MCQs or dives way deeper than your textbooks.",
    },
    {
      icon: <Book />,
      title: "Revise Smarter",
      description: "Use AI created short notes the night before your exams, practice MCQs or get equipped with the deepest knowledge on any topic",
    },
  ];

  return (
    <section className="py-20 bg-background text-foreground px-6 border-y border-border">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-foreground">
          How It Works
        </h2>
        <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
          Three simple steps to transform your learning experience
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {steps.map((s, idx) => (
            <div key={idx} className="relative">
              {/* Step number badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold shadow-lg z-10">
                {idx + 1}
              </div>
              <FeatureCard
                icon={s.icon}
                title={s.title}
                description={s.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(HowItWorksSection)
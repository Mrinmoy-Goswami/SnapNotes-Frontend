import { Upload, Sparkles, Book } from "lucide-react";
import { memo} from "react";
import FeatureCard from "./FeatureCard";


function HowItWorksSection() {
  const steps = [
    {
      icon: <Upload />,
      title: "Upload Your Notes",
      description: "Start by uploading your notes or documents. You can upload your handwritten notes too !",
    },
    {
      icon: <Sparkles />,
      title: "AI Summarizes Or Generates Deep Notes",
      description: "Our AI creates concise summaries and short notes or dives way deeper than your textbooks.",
    },
    {
      icon: <Book />,
      title: "Revise Smarter",
      description: "Use AI created short notes the night before your exams or get equipped with the deepest knowledge on any topic",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900 text-white px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-12">
          How It Works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {steps.map((s, idx) => (
            <FeatureCard
              key={idx}
              icon={s.icon}
              title={s.title}
              description={s.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(HowItWorksSection)
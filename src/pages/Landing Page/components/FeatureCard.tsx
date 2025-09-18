import type { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description ?: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-900/50 border
     border-gray-800 hover:border-purple-500 transition shadow-md shadow-purple-500">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      {description && <p className="text-sm text-gray-400 mt-2">{description}</p>}
    </div>
  );
}

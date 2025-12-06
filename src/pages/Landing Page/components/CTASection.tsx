import { memo, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import PricingModal from "@/pages/components/PricingModal";
 // Import the modal

function CTASection() {
  const [isPricingOpen, setIsPricingOpen] = useState(false);

  return (
    <>
      <section className="py-20 bg-primary text-primary-foreground text-center px-6 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary-foreground rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-primary-foreground rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Limited Time Offer</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            Ready to study smarter?
          </h2>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto opacity-90">
            Stop wasting time rewriting notes. Snapnotes makes exam prep effortless with AI-powered summaries and insights.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => setIsPricingOpen(true)}
              className="group px-8 py-4 rounded-lg bg-primary-foreground text-primary font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-2"
            >
              Check Plans
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 rounded-lg border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold transition-all duration-300 w-full sm:w-auto">
              Learn More
            </button>
          </div>

          {/* Social proof */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm opacity-75">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-primary-foreground/20 border-2 border-primary"></div>
                <div className="w-8 h-8 rounded-full bg-primary-foreground/20 border-2 border-primary"></div>
                <div className="w-8 h-8 rounded-full bg-primary-foreground/20 border-2 border-primary"></div>
              </div>
              <span>Join 10,000+ students</span>
            </div>
            <span>•</span>
            <span>⭐️ 4.9/5 rating</span>
            <span>•</span>
            <span>🚀 Free to start</span>
          </div>
        </div>
      </section>

      {/* Pricing Modal */}
      <PricingModal 
        isOpen={isPricingOpen} 
        onClose={() => setIsPricingOpen(false)} 
      />
    </>
  );
}

export default memo(CTASection);
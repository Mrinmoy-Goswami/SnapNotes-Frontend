import { motion } from "framer-motion";
import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate()

  const handleUploadNotesClick = useCallback(() => {
    navigate('/upload')
  }, [navigate])

  return (
    <section className="w-full relative flex items-center justify-center min-h-[90vh] bg-background text-foreground overflow-hidden px-4">
     
      {/* Animated background blobs - hidden in light mode, visible in dark */}
      <div className="absolute -top-40 -left-40 w-[400px] h-[400px] rounded-full bg-primary/10 dark:bg-primary/30 blur-3xl animate-pulse"></div>
      <div className="absolute top-20 right-10 w-[250px] h-[250px] rounded-full bg-primary/5 dark:bg-primary/20 blur-2xl animate-pulse"></div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-card pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-10 text-center max-w-full"
      >
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight leading-snug">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground via-primary to-foreground">
            Leverage AI to prepare for exams
          </span>
        </h1>

        <p className="mt-5 text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
          Snapnotes helps you study smarter — summarize notes, generate quizzes,
          and accelerate your exam prep with AI.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={handleUploadNotesClick}
            className="group px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-2"
          >
            Upload Notes
            <svg 
              className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>

          <button
            className="px-8 py-4 rounded-lg bg-card border-2 border-border text-foreground font-semibold hover:border-primary transition-all duration-300 w-full sm:w-auto"
          >
            Learn More
          </button>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Free to start</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Cancel anytime</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default memo(HeroSection)
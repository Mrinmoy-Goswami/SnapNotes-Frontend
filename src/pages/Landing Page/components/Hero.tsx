import { motion } from "framer-motion";
import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();

  const handleUploadNotesClick = useCallback(() => {
    navigate('/upload');
  }, [navigate]);

  // Floating element animation variants
  const floatingVariants = {
    initial: { y: 0, x: 0, opacity: 0 },
    animate: (custom: { duration: number; x: number; delay: number }) => ({
      y: [0, -20, 0],
      x: [0, custom.x, 0],
      opacity: [0, 0.6, 0],
      transition: {
        duration: custom.duration,
        repeat: Infinity,
        ease: "easeInOut" as const,
        delay: custom.delay,
      },
    }),
  };

  // Floating elements configuration
  const floatingElements = [
    { icon: "📝", top: "15%", left: "10%", duration: 6, x: 15, delay: 0 },
    { icon: "🎓", top: "25%", right: "15%", duration: 7, x: -20, delay: 1 },
    { icon: "✨", top: "60%", left: "8%", duration: 5, x: 10, delay: 2 },
    { icon: "📚", top: "70%", right: "12%", duration: 6.5, x: -15, delay: 0.5 },
    { icon: "💡", top: "40%", left: "5%", duration: 8, x: 20, delay: 1.5 },
    { icon: "🚀", top: "50%", right: "8%", duration: 7.5, x: -10, delay: 2.5 },
  ];

  return (
    <section className="w-full relative flex items-center justify-center min-h-[90vh] bg-background text-foreground overflow-hidden px-4">
      
      {/* Animated background blobs */}
      <div className="absolute -top-40 -left-40 w-[400px] h-[400px] rounded-full bg-primary/10 dark:bg-primary/30 blur-3xl animate-pulse"></div>
      <div className="absolute top-20 right-10 w-[250px] h-[250px] rounded-full bg-primary/5 dark:bg-primary/20 blur-2xl animate-pulse"></div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-card pointer-events-none z-[2]"></div>

      {/* Floating Icons - Subtle & Non-intrusive */}
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl pointer-events-none select-none z-[5] floating-icon"
          style={{
            top: element.top,
            left: element.left,
            right: element.right,
          }}
          custom={{
            duration: element.duration,
            x: element.x,
            delay: element.delay,
          }}
          variants={floatingVariants}
          initial="initial"
          animate="animate"
        >
          {element.icon}
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-10 text-center max-w-full"
      >
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight leading-snug">
          <span className="relative inline-block bg-clip-text text-transparent bg-gradient-to-r from-foreground via-primary to-foreground">
            Leverage AI to prepare for exams
            {/* Shimmer overlay effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent blur-sm animate-shimmer bg-[length:200%_100%]"></span>
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
            71d34dfa-60b1-708f-39be-685625b10b96#2025-12
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default memo(HeroSection);
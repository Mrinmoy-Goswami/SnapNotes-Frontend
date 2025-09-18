import { motion } from "framer-motion";
import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

function HeroSection() {
    const navigate = useNavigate()

    const handleUploadNotesClick = useCallback(()=>{
        navigate('/upload')
    },[navigate])
  return (
    <section className="w-full relative flex items-center justify-center min-h-[90vh] bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white overflow-hidden px-4">
     
      <div className="absolute -top-40 -left-40 w-[400px] h-[400px] rounded-full bg-purple-600/30 blur-3xl animate-pulse"></div>
      <div className="absolute top-20 right-10 w-[250px] h-[250px] rounded-full bg-pink-500/20 blur-2xl animate-pulse"></div>

     
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-10 text-center max-w-full"
      >
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 leading-snug">
          Leverage AI to prepare for exams
        </h1>

        <p className="mt-5 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-2">
          Snapnotes helps you study smarter — summarize notes, generate quizzes,
          and accelerate your exam prep with AI.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <button
          onClick={handleUploadNotesClick}
          className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-medium shadow-lg hover:shadow-xl transition w-full sm:w-auto">
            Upload Notes
          </button>
          <button className="px-6 py-3 rounded-2xl border border-gray-600 hover:border-purple-400 text-gray-300 hover:text-white transition w-full sm:w-auto">
            Learn More
          </button>
        </div>
      </motion.div>
    </section>
  );
}
export default memo(HeroSection)

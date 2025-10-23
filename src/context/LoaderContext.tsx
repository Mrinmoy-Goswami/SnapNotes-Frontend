import React, { createContext, useContext, useState, useEffect } from "react";

interface LoaderContextType {
  showLoader: (message?: string) => void;
  hideLoader: () => void;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

const facts = [
  "Did you know? The average person spends 6 months of their life waiting for red lights to turn green.",
  "Fun fact: Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs!",
  "Interesting: A group of flamingos is called a flamboyance.",
  "AI fact: The first chatbot, ELIZA, was created in the 1960s — way before ChatGPT or Gemini!",
  "Science fact: Your brain generates about 20 watts of power — enough to power a dim light bulb.",
];

export const LoaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState<string>("Loading...");
  const [currentFact, setCurrentFact] = useState(facts[0]);

  const showLoader = (msg?: string) => {
    if (msg) setMessage(msg);
    setIsVisible(true);
  };

  const hideLoader = () => {
    setIsVisible(false);
    setMessage("Loading...");
  };

  // rotate facts every 3 seconds while visible
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setCurrentFact(facts[Math.floor(Math.random() * facts.length)]);
    }, 3000);
    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <LoaderContext.Provider value={{ showLoader, hideLoader }}>
      {children}

      {isVisible && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm z-[1000]">
          <div className="bg-white dark:bg-neutral-900 text-center p-6 rounded-2xl shadow-lg w-80">
            <div className="flex justify-center mb-4">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
              {message}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">{currentFact}</p>
          </div>
        </div>
      )}
    </LoaderContext.Provider>
  );
};

export const useLoader = (): LoaderContextType => {
  const context = useContext(LoaderContext);
  if (!context) throw new Error("useLoader must be used within LoaderProvider");
  return context;
};

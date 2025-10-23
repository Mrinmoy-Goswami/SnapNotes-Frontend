import Container from "@/components/ui/Container";
import React from "react";

interface FormattedDisplayProps {
  displayNotes: string;
}

function FormattedDisplay({ displayNotes }: FormattedDisplayProps) {
  // Helper: parse inline **bold** markdown
  const parseInlineBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={idx} className="font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  };

  const lines = displayNotes.split("\n");

  return (
    <Container className="py-6 px-4 md:px-8 lg:px-16">
      <div className="prose prose-slate max-w-none dark:prose-invert">
        {lines.map((line, idx) => {
          const trimmedLine = line.trim();
          if (!trimmedLine) return <br key={idx} />;

          // Header 3
          if (trimmedLine.startsWith("### ")) {
            return (
              <h3 key={idx} className="mt-6 mb-3 text-xl md:text-2xl font-semibold">
                {parseInlineBold(trimmedLine.replace("### ", ""))}
              </h3>
            );
          }

          // Header 2
          if (trimmedLine.startsWith("## ")) {
            return (
              <h2 key={idx} className="mt-5 mb-2 text-lg md:text-xl font-semibold">
                {parseInlineBold(trimmedLine.replace("## ", ""))}
              </h2>
            );
          }

          // Bullet points
          if (trimmedLine.startsWith("* ")) {
            return (
              <li key={idx} className="ml-4 my-1 list-disc">
                {parseInlineBold(trimmedLine.replace("* ", ""))}
              </li>
            );
          }

          // Numbered lists
          if (/^\d+\./.test(trimmedLine)) {
            return (
              <li key={idx} className="ml-4 my-1 list-decimal">
                {parseInlineBold(trimmedLine.replace(/^\d+\.\s*/, ""))}
              </li>
            );
          }

          // Default paragraph
          return (
            <p key={idx} className="mt-2 leading-relaxed">
              {parseInlineBold(trimmedLine)}
            </p>
          );
        })}
      </div>
    </Container>
  );
}

export default React.memo(FormattedDisplay)
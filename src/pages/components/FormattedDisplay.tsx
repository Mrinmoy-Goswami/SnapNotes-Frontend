import Container from "@/components/ui/Container";
import React from "react";
import { Download, FileText, Copy, Check } from "lucide-react";

interface FormattedDisplayProps {
  displayNotes: string;
}

function FormattedDisplay({ displayNotes }: FormattedDisplayProps) {
  const [copied, setCopied] = React.useState(false);

  // Helper: parse inline markdown (bold and italic)
  const parseInlineMarkdown = (text: string) => {
    // Split by both **bold** and *italic* patterns
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    
    return parts.map((part, idx) => {
      // Handle **bold**
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={idx} className="font-semibold text-foreground">
            {part.slice(2, -2)}
          </strong>
        );
      }
      // Handle *italic* (single asterisk)
      if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
        return (
          <em key={idx} className="italic text-foreground">
            {part.slice(1, -1)}
          </em>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(displayNotes);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleDownloadPDF = () => {
    // Placeholder for PDF download functionality
    console.log("Download PDF clicked - implement jsPDF or similar");
  };

  const lines = displayNotes.split("\n");

  return (
    <Container className="py-8 px-4 md:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-card border border-border rounded-t-lg p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Your Generated Notes</h3>
              <p className="text-sm text-muted-foreground">
                {lines.length} lines • Ready to study
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleCopyToClipboard}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-background border border-border rounded-lg text-foreground hover:border-primary transition-all duration-300 text-sm font-medium"
              aria-label="Copy to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-success" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadPDF}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 text-sm font-medium shadow-sm"
              aria-label="Download as PDF"
            >
              <Download className="w-4 h-4" />
              <span>PDF</span>
            </button>
          </div>
        </div>

        {/* Notes Content */}
        <div className="bg-card border-x border-b border-border rounded-b-lg p-8 shadow-sm">
          <div className="prose prose-slate max-w-none dark:prose-invert">
            {lines.map((line, idx) => {
              const trimmedLine = line.trim();
              if (!trimmedLine) return <div key={idx} className="h-4" />;

              // Header 3
              if (trimmedLine.startsWith("### ")) {
                return (
                  <h3
                    key={idx}
                    className="mt-8 mb-4 text-xl md:text-2xl font-bold text-foreground border-l-4 border-primary pl-4"
                  >
                    {parseInlineMarkdown(trimmedLine.replace("### ", ""))}
                  </h3>
                );
              }

              // Header 2
              if (trimmedLine.startsWith("## ")) {
                return (
                  <h2
                    key={idx}
                    className="mt-6 mb-3 text-lg md:text-xl font-semibold text-foreground"
                  >
                    {parseInlineMarkdown(trimmedLine.replace("## ", ""))}
                  </h2>
                );
              }

              // Bullet points
              if (trimmedLine.startsWith("* ")) {
                return (
                  <li
                    key={idx}
                    className="ml-6 my-2 list-disc text-foreground marker:text-primary"
                  >
                    {parseInlineMarkdown(trimmedLine.replace("* ", ""))}
                  </li>
                );
              }

              // Numbered lists
              if (/^\d+\./.test(trimmedLine)) {
                return (
                  <li
                    key={idx}
                    className="ml-6 my-2 list-decimal text-foreground marker:text-primary marker:font-semibold"
                  >
                    {parseInlineMarkdown(trimmedLine.replace(/^\d+\.\s*/, ""))}
                  </li>
                );
              }

              // Default paragraph
              return (
                <p key={idx} className="mt-3 leading-relaxed text-foreground">
                  {parseInlineMarkdown(trimmedLine)}
                </p>
              );
            })}
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-4 flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success"></div>
            <span>Generated successfully</span>
          </div>
          <span>•</span>
          <span>{new Date().toLocaleDateString()}</span>
        </div>
      </div>
    </Container>
  );
}

export default React.memo(FormattedDisplay);
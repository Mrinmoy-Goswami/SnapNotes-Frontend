import React from "react";
import { Download, FileText, Copy, Check } from "lucide-react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import Container from "@/components/ui/Container";

interface FormattedDisplayProps {
  displayNotes: string;
}

function FormattedDisplay({ displayNotes }: FormattedDisplayProps) {
  const [copied, setCopied] = React.useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = React.useState(false);

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

 const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    console.log('PDF generation started');
    try {
      console.log('Creating PDF document...');
      const pdfDoc = await PDFDocument.create();
      console.log('PDF document created');
      
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      console.log('Fonts embedded');
      
      let page = pdfDoc.addPage([612, 792]); // US Letter size
      console.log('First page added');
      const { width, height } = page.getSize();
      const margin = 50;
      const maxWidth = width - 2 * margin;
      let yPosition = height - margin;
      const lineHeight = 20;
      const titleSize = 24;
      const h3Size = 18;
      const h2Size = 16;
      const bodySize = 12;

      // Helper function to add a new page
      const addNewPage = () => {
        page = pdfDoc.addPage([612, 792]);
        yPosition = height - margin;
      };

      // Helper function to wrap text
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const wrapText = (text: string, maxWidth: number, fontSize: number, font: any) => {
        const words = text.split(' ');
        const lines: string[] = [];
        let currentLine = '';

        for (const word of words) {
          const testLine = currentLine ? `${currentLine} ${word}` : word;
          const testWidth = font.widthOfTextAtSize(testLine, fontSize);

          if (testWidth > maxWidth && currentLine) {
            lines.push(currentLine);
            currentLine = word;
          } else {
            currentLine = testLine;
          }
        }

        if (currentLine) {
          lines.push(currentLine);
        }

        return lines;
      };

      // Helper function to strip markdown
      const stripMarkdown = (text: string) => {
        return text.replace(/\*\*/g, '').replace(/\*/g, '');
      };

      // Add title
      page.drawText('Study Notes', {
        x: margin,
        y: yPosition,
        size: titleSize,
        font: boldFont,
        color: rgb(0.2, 0.2, 0.8),
      });
      yPosition -= titleSize + 20;

      // Add date
      page.drawText(new Date().toLocaleDateString(), {
        x: margin,
        y: yPosition,
        size: 10,
        font: font,
        color: rgb(0.5, 0.5, 0.5),
      });
      yPosition -= 30;

      const lines = displayNotes.split("\n");
      console.log(`Processing ${lines.length} lines...`);

      for (const line of lines) {
        const trimmedLine = line.trim();
        
        if (!trimmedLine) {
          yPosition -= lineHeight / 2;
          continue;
        }

        // Check if we need a new page
        if (yPosition < margin + 40) {
          addNewPage();
        }

        // Header 3
        if (trimmedLine.startsWith("### ")) {
          const text = stripMarkdown(trimmedLine.replace("### ", ""));
          const wrappedLines = wrapText(text, maxWidth - 10, h3Size, boldFont);
          
          for (const wrappedLine of wrappedLines) {
            if (yPosition < margin + 40) addNewPage();
            
            // Draw border line
            page.drawLine({
              start: { x: margin, y: yPosition + 5 },
              end: { x: margin + 4, y: yPosition + 5 },
              thickness: 4,
              color: rgb(0.2, 0.2, 0.8),
            });

            page.drawText(wrappedLine, {
              x: margin + 10,
              y: yPosition,
              size: h3Size,
              font: boldFont,
              color: rgb(0.1, 0.1, 0.1),
            });
            yPosition -= h3Size + 8;
          }
          yPosition -= 10;
          continue;
        }

        // Header 2
        if (trimmedLine.startsWith("## ")) {
          const text = stripMarkdown(trimmedLine.replace("## ", ""));
          const wrappedLines = wrapText(text, maxWidth, h2Size, boldFont);
          
          for (const wrappedLine of wrappedLines) {
            if (yPosition < margin + 40) addNewPage();
            
            page.drawText(wrappedLine, {
              x: margin,
              y: yPosition,
              size: h2Size,
              font: boldFont,
              color: rgb(0.1, 0.1, 0.1),
            });
            yPosition -= h2Size + 6;
          }
          yPosition -= 5;
          continue;
        }

        // Bullet points
        if (trimmedLine.startsWith("* ")) {
          const text = stripMarkdown(trimmedLine.replace("* ", ""));
          const wrappedLines = wrapText(text, maxWidth - 30, bodySize, font);
          
          for (let i = 0; i < wrappedLines.length; i++) {
            if (yPosition < margin + 40) addNewPage();
            
            if (i === 0) {
              // Draw bullet point
              page.drawCircle({
                x: margin + 15,
                y: yPosition + 4,
                size: 2.5,
                color: rgb(0.2, 0.2, 0.8),
              });
            }

            page.drawText(wrappedLines[i], {
              x: margin + 25,
              y: yPosition,
              size: bodySize,
              font: font,
              color: rgb(0.2, 0.2, 0.2),
            });
            yPosition -= lineHeight;
          }
          continue;
        }

        // Numbered lists
        if (/^\d+\./.test(trimmedLine)) {
          const match = trimmedLine.match(/^(\d+)\.\s*(.*)$/);
          if (match) {
            const number = match[1];
            const text = stripMarkdown(match[2]);
            const wrappedLines = wrapText(text, maxWidth - 35, bodySize, font);
            
            for (let i = 0; i < wrappedLines.length; i++) {
              if (yPosition < margin + 40) addNewPage();
              
              if (i === 0) {
                page.drawText(`${number}.`, {
                  x: margin + 10,
                  y: yPosition,
                  size: bodySize,
                  font: boldFont,
                  color: rgb(0.2, 0.2, 0.8),
                });
              }

              page.drawText(wrappedLines[i], {
                x: margin + 30,
                y: yPosition,
                size: bodySize,
                font: font,
                color: rgb(0.2, 0.2, 0.2),
              });
              yPosition -= lineHeight;
            }
            continue;
          }
        }

        // Default paragraph
        const text = stripMarkdown(trimmedLine);
        const wrappedLines = wrapText(text, maxWidth, bodySize, font);
        
        for (const wrappedLine of wrappedLines) {
          if (yPosition < margin + 40) addNewPage();
          
          page.drawText(wrappedLine, {
            x: margin,
            y: yPosition,
            size: bodySize,
            font: font,
            color: rgb(0.2, 0.2, 0.2),
          });
          yPosition -= lineHeight;
        }
        yPosition -= 5;
      }

      console.log('Saving PDF...');
      const pdfBytes = await pdfDoc.save();
      console.log('PDF saved, size:', pdfBytes.length);
      
      console.log('Creating blob...');
      const blob = new Blob([pdfBytes as BlobPart], { type: 'application/pdf' });
      console.log('Blob created, size:', blob.size);
      
      console.log('Creating object URL...');
      const url = URL.createObjectURL(blob);
      console.log('Object URL created:', url);
      
      console.log('Creating download link...');
      const link = document.createElement('a');
      link.href = url;
      link.download = `study-notes-${new Date().toISOString().split('T')[0]}.pdf`;
      console.log('Download filename:', link.download);
      
      console.log('Triggering download...');
      link.click();
      console.log('Download triggered');
      
      // Clean up
      setTimeout(() => {
        console.log('Cleaning up URL...');
        URL.revokeObjectURL(url);
      }, 100);
      
      console.log('PDF generation completed successfully');
    } catch (err) {
      console.error("Failed to generate PDF:", err);
      console.error("Error details:", err instanceof Error ? err.message : err);
      console.error("Error stack:", err instanceof Error ? err.stack : 'No stack');
      alert(`Failed to generate PDF: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsGeneratingPDF(false);
      console.log('PDF generation state reset');
    }
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
              className="cursor-pointer flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 text-sm font-medium shadow-sm"
              aria-label="Download as PDF"
            >
              <Download className="w-4 h-4" />
              <span>{isGeneratingPDF ? "Generating..." : "PDF"}</span>
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
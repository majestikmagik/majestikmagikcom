'use client';

import React from 'react';

interface AIConceptTemplateSectionProps {
  conceptUserPrompt: string;
  setConceptUserPrompt: (prompt: string) => void;
  handleGenerateConceptPreview: () => void;
  isConceptLoading: boolean;
  conceptError: string | null;
  generatedCodeContent: string;
  generatedOutputType: 'html' | 'react-tsx' | null;
  handleProceedToPayment: () => void;
  isProcessingPayment: boolean;
  paymentError: string | null;
  isGeminiInitialized: boolean;
}

const AIConceptTemplateSection: React.FC<AIConceptTemplateSectionProps> = ({
  conceptUserPrompt,
  setConceptUserPrompt,
  handleGenerateConceptPreview,
  isConceptLoading,
  conceptError,
  generatedCodeContent,
  generatedOutputType,
  isGeminiInitialized,
}) => {
  const handleDownloadHtml = () => {
    if (!generatedCodeContent || generatedOutputType !== 'html') return;

    const blob = new Blob([generatedCodeContent], { type: 'text/html' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = 'majestik-magik-concept.html'; // Suggested filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href); // Clean up
  };

  return (
    <section
      id="ai-web-templates"
      aria-labelledby="ai-website-concept-heading"
      className="py-24 md:py-28 bg-slate-950"
    >
      <div className="container px-6 mx-auto">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2
            id="ai-website-concept-heading"
            className="flex items-center justify-center mb-4 text-3xl text-slate-100 font-bold md:text-4xl scroll-animate"
          >

            AI Website Templates
          </h2>
          <p
            className="max-w-xl mx-auto font-semibold text-slate-400 md:text-xl scroll-animate"
            style={{ transitionDelay: '0.2s' }}
          >
            Need a quick idea? Describe a basic HTML template or website section, and our AI will generate a concept using the Gemini large language model. Contact us if you need a more complex design, API integration, and database connectivity.
          </p>
        </div>

        {/* Input and Buttons */}
        <div
          className="max-w-8xl p-6 mx-auto rounded-xl shadow-2xl md:p-8 bg-slate-800 scroll-animate"
          style={{ transitionDelay: '0.3s' }}
        >
          <textarea
            value={conceptUserPrompt}
            onChange={(e) => setConceptUserPrompt(e.target.value)}
            placeholder="e.g., 'A simple hero section for a tech startup', 'A 3-column feature list', 'A basic product card design'"
            rows={10}
            className="w-full p-3 transition-colors duration-300 border rounded-md bg-slate-700 text-slate-200 border-slate-600 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 placeholder-slate-500"
            aria-label="Describe your desired concept template"
          />
          <div className="flex justify-center">
            <button
              onClick={handleGenerateConceptPreview}
              disabled={isConceptLoading || !isGeminiInitialized}
              className="flex items-center justify-center w-60 px-6 py-3 mt-4 font-semibold text-white transition-all duration-300 cursor-pointer rounded-md shadow-md bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-600 disabled:cursor-not-allowed scroll-animate"
              aria-live="polite"
            >
              {isConceptLoading ? (
                <>
                  <svg
                    className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Generating AI Web Template...
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5 mr-3 -ml-1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 6v6l4.5 2.25M12 18h.01"
                    ></path>
                  </svg>
                  Generate
                </>
              )}
            </button>
          </div>
        </div>

        {/* Warning/Error Messages */}
        {!isGeminiInitialized && (
          <p className="p-3 mt-4 text-sm rounded-md text-yellow-400 bg-yellow-900/30">
            Warning: Gemini AI is not available or not initialized. Concept generation will not function.
          </p>
        )}
        {conceptError && (
          <p className="p-3 mt-4 text-sm text-red-400 rounded-md bg-red-900/30" role="alert">
            Error: {conceptError}
          </p>
        )}

        {/* Generated Content */}
        {generatedCodeContent && generatedOutputType && (
          <div className="mt-8">
            <h3 className="mb-3 text-xl font-semibold text-teal-400 scroll-animate">
              AI Generated Concept ({generatedOutputType === 'html' ? 'HTML Preview' : 'React TSX Preview'}):
            </h3>
            {generatedOutputType === 'html' && (
              <div className="overflow-hidden border rounded-md shadow-inner bg-slate-900 border-slate-700">
                <iframe
                  srcDoc={generatedCodeContent}
                  title="AI Generated Concept Template (HTML)"
                  className="w-full h-[800px] border-0"
                  sandbox="allow-scripts"
                ></iframe>
              </div>
            )}
            {/* Download Button */}
            <button
              onClick={handleDownloadHtml}
              className="flex items-center justify-end px-6 py-3 mt-4 cursor-pointer font-semibold text-white transition-all duration-300 rounded-md shadow-md bg-green-600 hover:bg-green-500 disabled:bg-slate-600 disabled:cursor-not-allowed"
              aria-label="Download HTML Template"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
              Download HTML
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default AIConceptTemplateSection;

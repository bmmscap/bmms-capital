
import React, { useState } from 'react';
import { CloseIcon, SparklesIcon } from './IconComponents';
import { MarkdownRenderer } from './MarkdownRenderer';
import { analyzeRfp } from '../services/geminiService';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [response, setResponse] = useState('');

  const handleGenerate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const textarea = form.elements.namedItem('rfp-text') as HTMLTextAreaElement;
    const rfpText = textarea.value;

    if (!rfpText || !rfpText.trim()) {
        alert("Please paste some text from the RFP to analyze.");
        return;
    }

    setIsGenerating(true);
    setResponse('');
    try {
      const analysis = await analyzeRfp(rfpText);
      setResponse(analysis);
    } catch (error) {
      console.error("Error in handleGenerate:", error);
      setResponse("Sorry, an unexpected error occurred. Please check the console for details.");
    } finally {
        setIsGenerating(false);
    }
  };
  
  const handleClose = () => {
    setResponse('');
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-brand-light rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-700 flex-shrink-0">
          <h2 className="text-xl font-bold text-slate-100">
            Live Demo: RFP Analysis
          </h2>
          <button
            onClick={handleClose}
            className="p-1 rounded-full hover:bg-gray-700"
            aria-label="Close modal"
          >
            <CloseIcon className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <form onSubmit={handleGenerate}>
            <label
              htmlFor="rfp-text"
              className="block text-sm font-medium text-slate-300 mb-2"
            >
              Paste a snippet from an RFP to see the AI in action:
            </label>
            <textarea
              id="rfp-text"
              name="rfp-text"
              rows={5}
              className="w-full bg-gray-900 border-gray-600 text-slate-200 placeholder-gray-500 rounded-lg shadow-sm focus:ring-brand-primary focus:border-brand-primary"
              placeholder="e.g., 'The vendor must provide a cloud-native solution with 99.99% uptime...'"
              defaultValue="The City of Metropolis is seeking proposals for a comprehensive Smart City infrastructure upgrade. The selected partner will be responsible for the design, deployment, and maintenance of an integrated network of IoT sensors, data analytics platforms, and public-facing applications. Key requirements include real-time traffic monitoring, smart street lighting, public Wi-Fi access, and an emergency alert system. The solution must adhere to all federal and state data privacy regulations."
            ></textarea>
            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                disabled={isGenerating}
                className="inline-flex items-center bg-brand-primary text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:bg-pink-700 transition-colors duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <SparklesIcon className="w-5 h-5 mr-2" />
                    Generate Analysis
                  </>
                )}
              </button>
            </div>
          </form>

          {response && (
             <div className="mt-6 border-t border-gray-700 pt-6">
                <MarkdownRenderer text={response} />
             </div>
          )}
        </div>
      </div>
    </div>
  );
};
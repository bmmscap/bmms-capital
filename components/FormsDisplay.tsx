import React from 'react';
import { MarkdownRenderer } from './MarkdownRenderer';
import { ChecklistIcon } from './IconComponents';

interface FormsDisplayProps {
  content: string;
}

export const FormsDisplay: React.FC<FormsDisplayProps> = ({ content }) => {
  return (
    <div className="prose max-w-none w-full">
      <section className="p-4 bg-teal-50 border-l-4 border-teal-400 rounded-r-lg">
        <div className="flex items-center mb-2">
            <ChecklistIcon className="w-6 h-6 mr-3 text-teal-600 flex-shrink-0" />
            <h2 className="text-2xl font-bold text-teal-800 m-0">Mandatory Submission Checklist</h2>
        </div>
        <MarkdownRenderer text={content} />
      </section>
    </div>
  );
};

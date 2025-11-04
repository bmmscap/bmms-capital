
import React from 'react';

// Fix: Implement a basic MarkdownRenderer component.
// This file was empty, which caused the "not a module" error when imported.
// By adding an export, we make it a valid module and resolve the import error.
export const MarkdownRenderer = ({ text }: { text: string }) => {
  // A real implementation would use a library like react-markdown.
  // For now, we render the text in a pre tag to preserve whitespace and formatting for the demo.
  // The 'prose' class on the parent element in FormsDisplay will apply some styling.
  return <pre className="whitespace-pre-wrap font-sans text-sm">{text}</pre>;
};

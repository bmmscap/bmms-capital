
import React from 'react';
import { LogoIcon } from './IconComponents';

export const Header: React.FC = () => {
  return (
    <header className="bg-brand-light shadow-sm border-b border-gray-700">
      <div className="container mx-auto max-w-7xl px-4 md:px-8 py-4 flex items-center">
        <LogoIcon className="w-10 h-10 text-brand-primary" />
        <h1 className="ml-3 text-2xl font-bold text-slate-100 tracking-tight">
          IgniteProposals
        </h1>
        <span className="ml-2 text-sm font-medium bg-brand-primary/10 text-brand-primary px-2 py-0.5 rounded-full">
          RFP Assistant
        </span>
      </div>
    </header>
  );
};
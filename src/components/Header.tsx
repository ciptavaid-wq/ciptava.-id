import React from 'react';
import { Film, Sparkles, BookOpen, Wrench, ShieldAlert } from 'lucide-react';

interface HeaderProps {
  activeTab: 'generator' | 'workflow' | 'tools' | 'troubleshooting';
  setActiveTab: (tab: 'generator' | 'workflow' | 'tools' | 'troubleshooting') => void;
  onOpenPresets?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenPresets }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-8">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-rose-900 flex items-center justify-center text-white shadow-sm">
              <Film className="w-5 h-5 text-rose-200" />
            </div>
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('generator'); }} className="text-xl font-extrabold tracking-tight text-rose-950 whitespace-nowrap">
              AI Timelapse Generator <span className="text-rose-700">Pro</span>
            </a>
          </div>

          {/* Zone 2: 4 single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2 text-sm font-semibold text-stone-600">
            <button
              onClick={() => setActiveTab('generator')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'generator'
                  ? 'bg-rose-50 text-rose-950 font-bold'
                  : 'hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Sparkles className="w-4 h-4 text-rose-700" />
              <span>Generator Prompt</span>
            </button>

            <button
              onClick={() => setActiveTab('workflow')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'workflow'
                  ? 'bg-rose-50 text-rose-950 font-bold'
                  : 'hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <BookOpen className="w-4 h-4 text-rose-700" />
              <span>Workflow Editing</span>
            </button>

            <button
              onClick={() => setActiveTab('tools')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'tools'
                  ? 'bg-rose-50 text-rose-950 font-bold'
                  : 'hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Wrench className="w-4 h-4 text-rose-700" />
              <span>Formula Tools</span>
            </button>

            <button
              onClick={() => setActiveTab('troubleshooting')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'troubleshooting'
                  ? 'bg-rose-50 text-rose-950 font-bold'
                  : 'hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-rose-700" />
              <span>Troubleshooting</span>
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenPresets}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-rose-900 hover:bg-rose-800 rounded-lg shadow-sm transition-all whitespace-nowrap flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-rose-200" />
              <span>Preset Contoh</span>
            </button>
          </div>
        </div>

        {/* Mobile secondary navigation */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-2 border-t border-stone-100 scrollbar-none text-xs font-semibold">
          <button
            onClick={() => setActiveTab('generator')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
              activeTab === 'generator' ? 'bg-rose-900 text-white' : 'bg-stone-100 text-stone-700'
            }`}
          >
            Generator Prompt
          </button>
          <button
            onClick={() => setActiveTab('workflow')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
              activeTab === 'workflow' ? 'bg-rose-900 text-white' : 'bg-stone-100 text-stone-700'
            }`}
          >
            Workflow Editing
          </button>
          <button
            onClick={() => setActiveTab('tools')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
              activeTab === 'tools' ? 'bg-rose-900 text-white' : 'bg-stone-100 text-stone-700'
            }`}
          >
            Formula Tools
          </button>
          <button
            onClick={() => setActiveTab('troubleshooting')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
              activeTab === 'troubleshooting' ? 'bg-rose-900 text-white' : 'bg-stone-100 text-stone-700'
            }`}
          >
            Troubleshooting
          </button>
        </div>
      </div>
    </header>
  );
};

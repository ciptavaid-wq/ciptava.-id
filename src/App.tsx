import React, { useState } from 'react';
import { Header } from './components/Header';
import { GeneratorView } from './components/GeneratorView';
import { WorkflowView } from './components/WorkflowView';
import { ToolsView } from './components/ToolsView';
import { TroubleshootView } from './components/TroubleshootView';
import { PresetsModal } from './components/PresetsModal';
import { Toast } from './components/Toast';
import { Film, Sparkles, BookOpen, Wrench, ShieldAlert } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'generator' | 'workflow' | 'tools' | 'troubleshooting'>('generator');
  const [isPresetsOpen, setIsPresetsOpen] = useState(false);
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col text-stone-900 font-sans selection:bg-rose-900 selection:text-white">
      {/* Top Bar Contract compliant Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenPresets={() => setIsPresetsOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {activeTab === 'generator' && (
          <GeneratorView
            onShowToast={showToast}
            selectedPresetId={selectedPresetId}
          />
        )}
        {activeTab === 'workflow' && (
          <WorkflowView onShowToast={showToast} />
        )}
        {activeTab === 'tools' && (
          <ToolsView onShowToast={showToast} />
        )}
        {activeTab === 'troubleshooting' && (
          <TroubleshootView onShowToast={showToast} />
        )}
      </main>

      {/* Presets Modal */}
      <PresetsModal
        isOpen={isPresetsOpen}
        onClose={() => setIsPresetsOpen(false)}
        onSelectPreset={(presetId) => {
          setSelectedPresetId(presetId);
          setActiveTab('generator');
        }}
      />

      {/* Toast Alert */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-8 border-t border-stone-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-rose-900 flex items-center justify-center text-white font-bold text-xs">
              AI
            </div>
            <span className="font-bold text-stone-200">AI Timelapse Generator Pro</span>
            <span className="text-stone-500">·</span>
            <span>Ekosistem Workflow & Prompt Presisi Tinggi</span>
          </div>

          <div className="flex items-center gap-6 font-medium text-stone-400">
            <button onClick={() => setActiveTab('generator')} className="hover:text-stone-200 transition-colors">
              Generator
            </button>
            <button onClick={() => setActiveTab('workflow')} className="hover:text-stone-200 transition-colors">
              Workflow (A-Z)
            </button>
            <button onClick={() => setActiveTab('tools')} className="hover:text-stone-200 transition-colors">
              Formula Tools
            </button>
            <button onClick={() => setActiveTab('troubleshooting')} className="hover:text-stone-200 transition-colors">
              Troubleshooting
            </button>
          </div>

          <div className="text-stone-500">
            Kompatibel dengan Midjourney v6.1, Flux.1, Kling AI 1.5, Luma, Runway Gen-3
          </div>
        </div>
      </footer>
    </div>
  );
}

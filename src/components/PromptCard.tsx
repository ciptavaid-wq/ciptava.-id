import React, { useState } from 'react';
import { Copy, Check, Sparkles, RefreshCw, Edit3 } from 'lucide-react';

interface PromptCardProps {
  title: string;
  badge: string;
  content: string;
  onCopy: (text: string) => void;
  onEnhanceWithAI?: (currentText: string) => Promise<string>;
  isAiLoading?: boolean;
}

export const PromptCard: React.FC<PromptCardProps> = ({
  title,
  badge,
  content,
  onCopy,
  onEnhanceWithAI,
  isAiLoading = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editableContent, setEditableContent] = useState(content);

  // Sync if prop changes and not currently user-editing
  React.useEffect(() => {
    if (!isEditing) {
      setEditableContent(content);
    }
  }, [content, isEditing]);

  const handleCopy = () => {
    onCopy(editableContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAiRefine = async () => {
    if (!onEnhanceWithAI) return;
    try {
      const refined = await onEnhanceWithAI(editableContent);
      if (refined) {
        setEditableContent(refined);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-[#1C1917] rounded-xl overflow-hidden border border-stone-800 shadow-md transition-all hover:border-stone-700">
      {/* Top Header of Card */}
      <div className="bg-[#2D0A14] px-4 py-2.5 flex items-center justify-between border-b border-[#4A1020]">
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-bold text-rose-100 tracking-wide">
            {title}
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-rose-950/80 text-rose-300 border border-rose-800/60 rounded">
            {badge}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {onEnhanceWithAI && (
            <button
              onClick={handleAiRefine}
              disabled={isAiLoading}
              title="Perkaya dengan AI Gemini"
              className="px-2.5 py-1 text-xs font-semibold text-rose-200 bg-rose-900/60 hover:bg-rose-900 border border-rose-700/50 rounded flex items-center gap-1 transition-colors disabled:opacity-50"
            >
              {isAiLoading ? (
                <RefreshCw className="w-3 h-3 animate-spin" />
              ) : (
                <Sparkles className="w-3 h-3 text-rose-300" />
              )}
              <span className="hidden sm:inline">AI Enhance</span>
            </button>
          )}

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-1 text-xs text-stone-300 hover:text-white hover:bg-stone-800 rounded transition-colors"
            title={isEditing ? 'Selesai Edit' : 'Edit Prompt'}
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleCopy}
            className={`px-3 py-1 text-xs font-bold rounded flex items-center gap-1.5 transition-all shadow-sm ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-rose-800 hover:bg-rose-700 text-white border border-rose-600'
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Tersalin' : 'Salin'}</span>
          </button>
        </div>
      </div>

      {/* Prompt Body */}
      <div className="p-3 sm:p-4 bg-[#141211]">
        {isEditing ? (
          <textarea
            value={editableContent}
            onChange={(e) => setEditableContent(e.target.value)}
            rows={7}
            className="w-full bg-stone-900 text-stone-200 font-mono text-xs sm:text-[13px] leading-relaxed p-3 rounded-lg border border-rose-900/60 focus:outline-none focus:ring-1 focus:ring-rose-500 custom-scrollbar resize-y"
          />
        ) : (
          <div className="max-h-56 overflow-y-auto custom-scrollbar pr-2">
            <p className="font-mono text-xs sm:text-[13px] text-stone-300 leading-relaxed tracking-wide select-all whitespace-pre-wrap">
              {editableContent}
            </p>
          </div>
        )}

        {/* Footer info: Character count and tips */}
        <div className="mt-2.5 pt-2 border-t border-stone-800/80 flex items-center justify-between text-[11px] text-stone-400">
          <span className="font-mono tabular-nums">
            {editableContent.length} karakter · {editableContent.split(/\s+/).filter(Boolean).length} kata
          </span>
          <span className="text-stone-500 italic hidden sm:inline">
            Siap untuk Midjourney, Flux, Kling & Luma
          </span>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { TOOLS_DATA, TOOL_COMBINATION_RECIPES } from '../data/tools';
import {
  Wrench,
  Sparkles,
  Zap,
  DollarSign,
  ShieldCheck,
  Copy,
  ExternalLink,
  Tag,
} from 'lucide-react';

interface ToolsViewProps {
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const ToolsView: React.FC<ToolsViewProps> = ({ onShowToast }) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredTools =
    filterCategory === 'all'
      ? TOOLS_DATA
      : TOOLS_DATA.filter((t) => t.category === filterCategory);

  const categories = [
    { id: 'all', label: 'Semua Kategori' },
    { id: 'Image Gen', label: 'Image Generators' },
    { id: 'Video Gen', label: 'Video Generators' },
    { id: 'Consistency & Clean', label: 'Retouch & Inpainting' },
    { id: 'Post-Production', label: 'Editing & Sound' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-100 text-rose-900 rounded-full text-xs font-bold mb-2">
          <Zap className="w-3.5 h-3.5 text-rose-700" />
          <span>Formula Kompatibilitas Tools</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-rose-950 tracking-tight">
          Kombinasi Platform AI Paling Efisien
        </h1>
        <p className="mt-2 text-stone-600 text-xs sm:text-sm leading-relaxed">
          Trik mengkombinasikan berbagai platform AI berbayar dan gratisan untuk memproduksi video timelapse dengan hasil maksimal tanpa boros credit atau biaya langganan membengkak.
        </p>
      </div>

      {/* 3 Recommended Stacks / Recipes */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-stone-900 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-rose-800" />
          <span>Rekomendasi Stack Siap Pakai Sesuai Budget:</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TOOL_COMBINATION_RECIPES.map((recipe, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-5 border border-stone-200 shadow-sm flex flex-col justify-between space-y-3 hover:border-rose-300 transition-colors"
            >
              <div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-rose-50 text-rose-800 border border-rose-200 rounded uppercase">
                  Formula #{i + 1}
                </span>
                <h3 className="text-sm font-extrabold text-stone-900 mt-2">
                  {recipe.title}
                </h3>
                <div className="my-2.5 p-2 bg-stone-50 rounded-lg border border-stone-200 text-xs font-mono text-rose-950 font-medium">
                  {recipe.tools}
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {recipe.description}
                </p>
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(`${recipe.title}\nTools: ${recipe.tools}\nDetail: ${recipe.description}`);
                  onShowToast('Formula disalin!', 'success');
                }}
                className="w-full py-1.5 px-3 text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Salin Catatan Formula</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setFilterCategory(c.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
              filterCategory === c.id
                ? 'bg-rose-900 text-white shadow-sm'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Tools Detail Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredTools.map((tool) => (
          <div
            key={tool.name}
            className="bg-white rounded-xl p-5 border border-stone-200 shadow-sm space-y-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-extrabold text-stone-900">
                    {tool.name}
                  </h3>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      tool.costTier.includes('Free')
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {tool.costTier}
                  </span>
                </div>
                <span className="text-xs font-mono text-stone-500">
                  Model: {tool.recommendedModel}
                </span>
              </div>
              <span className="text-xs px-2 py-0.5 bg-stone-100 text-stone-700 font-semibold rounded">
                {tool.category}
              </span>
            </div>

            <p className="text-xs text-stone-700 leading-relaxed font-medium">
              <span className="font-bold text-stone-900">Fungsi Utama:</span> {tool.bestFor}
            </p>

            {/* Secret Formula */}
            <div className="p-3 bg-stone-900 text-stone-200 rounded-lg text-xs font-mono space-y-1">
              <span className="text-[11px] font-bold text-rose-400 block">
                ⚡ Secret Formula / Setting:
              </span>
              <p className="text-stone-300 text-xs leading-relaxed">{tool.secretFormula}</p>
            </div>

            {/* Efficiency Hack */}
            <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg text-xs space-y-1">
              <span className="text-[11px] font-bold text-emerald-800 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                <span>Trik Hemat Credit & Biaya:</span>
              </span>
              <p className="text-emerald-950 font-medium leading-relaxed">
                {tool.efficiencyHack}
              </p>
            </div>

            <div className="text-[11px] text-stone-500 pt-2 border-t border-stone-100 flex items-center justify-between">
              <span>Rasio: <code className="text-stone-700 font-semibold">{tool.aspectRatios}</code></span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`${tool.name}: ${tool.secretFormula}`);
                  onShowToast(`Formula ${tool.name} disalin!`, 'success');
                }}
                className="text-rose-800 hover:text-rose-950 font-bold flex items-center gap-1"
              >
                <Copy className="w-3 h-3" />
                <span>Salin Trik</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

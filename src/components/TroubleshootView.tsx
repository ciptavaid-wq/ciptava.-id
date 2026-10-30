import React, { useState } from 'react';
import { TROUBLESHOOTING_GUIDE } from '../data/troubleshooting';
import {
  ShieldAlert,
  Zap,
  Copy,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  Sparkles,
  PiggyBank,
} from 'lucide-react';

interface TroubleshootViewProps {
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const TroubleshootView: React.FC<TroubleshootViewProps> = ({ onShowToast }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'Semua Masalah' },
    { id: 'Frame Bocor', label: 'Frame Bocor / Meleleh' },
    { id: 'Skala / Perspektif', label: 'Skala Melompat' },
    { id: 'Pekerja Hantu', label: 'Pekerja Glitch / Transparan' },
    { id: 'Flicker & Glitch', label: 'Kedipan Cahaya / Flicker' },
    { id: 'Hemat Credit', label: 'Strategi Hemat Credit' },
  ];

  const filteredItems = TROUBLESHOOTING_GUIDE.filter((item) => {
    const matchesCat =
      selectedCategory === 'all' || item.category === selectedCategory;
    const matchesQuery =
      item.problem.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.symptom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.instantFix.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-100 text-rose-900 rounded-full text-xs font-bold mb-2">
          <ShieldAlert className="w-3.5 h-3.5 text-rose-700" />
          <span>Troubleshooting Guide & Anti Frame Bocor</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-rose-950 tracking-tight">
          Perbaiki Frame Rusak Tanpa Re-Render Ulang
        </h1>
        <p className="mt-2 text-stone-600 text-xs sm:text-sm leading-relaxed">
          Trik instan mengatasi frame meleleh, skala melompat, dan glitch AI dalam 60 detik langsung di timeline editing. Hemat waktu dan hemat kuota kredit video AI kamu!
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                selectedCategory === c.id
                  ? 'bg-rose-900 text-white shadow-sm'
                  : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari kendala (contoh: meleleh, melompat, flicker)..."
          className="w-full sm:w-72 bg-stone-50 border border-stone-300 rounded-lg px-3 py-1.5 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-800/30"
        />
      </div>

      {/* Issues List */}
      <div className="space-y-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden hover:border-rose-300 transition-colors"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 bg-stone-50/70 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-md bg-rose-900 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  !
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-900">
                      {item.category}
                    </span>
                    <span className="text-xs font-mono text-emerald-700 font-bold flex items-center gap-1">
                      <PiggyBank className="w-3.5 h-3.5" />
                      {item.creditCostAvoided}
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-stone-900 mt-1">
                    {item.problem}
                  </h3>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 space-y-4">
              {/* Gejala / Symptom */}
              <div>
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wide block mb-1">
                  🔍 Gejala Kerusakan:
                </span>
                <p className="text-xs sm:text-sm text-stone-700 bg-stone-50 p-3 rounded-lg border border-stone-200">
                  {item.symptom}
                </p>
              </div>

              {/* Instant Fix */}
              <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-xl space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-xs">
                  <Zap className="w-4 h-4 text-emerald-700" />
                  <span>SOLUSI INSTAN (TANPA RENDER ULANG):</span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
                  {item.instantFix}
                </p>
              </div>

              {/* Prevention Prompt */}
              <div className="p-4 bg-stone-900 text-stone-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Prompt Pencegahan (Kunci di Awal):</span>
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(item.preventionPrompt);
                      onShowToast('Prompt pencegahan disalin!', 'success');
                    }}
                    className="px-2.5 py-1 text-xs font-bold bg-rose-900 hover:bg-rose-800 text-white rounded transition-colors flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Salin Formula</span>
                  </button>
                </div>
                <p className="text-xs font-mono text-stone-300 leading-relaxed bg-stone-950 p-3 rounded-lg border border-stone-800 select-all">
                  {item.preventionPrompt}
                </p>
              </div>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-stone-200">
            <HelpCircle className="w-8 h-8 text-stone-400 mx-auto mb-2" />
            <p className="text-sm font-bold text-stone-700">Tidak ada kendala yang cocok</p>
            <p className="text-xs text-stone-500 mt-1">Coba kata kunci lain atau pilih Semua Masalah.</p>
          </div>
        )}
      </div>
    </div>
  );
};

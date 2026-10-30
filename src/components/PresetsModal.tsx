import React from 'react';
import { PRESET_SCENARIOS } from '../data/categories';
import { PresetScenario } from '../types';
import { X, Sparkles, Check, ArrowRight } from 'lucide-react';

interface PresetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPreset: (presetId: string) => void;
}

export const PresetsModal: React.FC<PresetsModalProps> = ({
  isOpen,
  onClose,
  onSelectPreset,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-stone-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-rose-950 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-rose-300" />
            <h2 className="text-base font-extrabold tracking-tight">
              Pilih Preset Template Siap Pakai
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-stone-300 hover:text-white p-1 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 max-h-[75vh] overflow-y-auto space-y-3 custom-scrollbar">
          <p className="text-xs text-stone-600 mb-2">
            Klik salah satu skenario untuk langsung memuat konfigurasi kontrol, foto referensi acuan, dan formula prompt presisi tinggi:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PRESET_SCENARIOS.map((preset) => (
              <div
                key={preset.id}
                onClick={() => {
                  onSelectPreset(preset.id);
                  onClose();
                }}
                className="group p-3.5 rounded-xl border border-stone-200 hover:border-rose-700 bg-stone-50 hover:bg-rose-50/40 cursor-pointer transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="h-28 rounded-lg overflow-hidden mb-2.5 bg-stone-200">
                    <img
                      src={preset.referenceImage}
                      alt={preset.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-xs font-bold text-stone-900 group-hover:text-rose-950">
                    {preset.name}
                  </h3>
                  <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-2">
                    {preset.customNotes}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-stone-200/80 flex items-center justify-between text-[11px] font-bold text-rose-800">
                  <span>Gunakan Preset Ini</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-stone-700 bg-stone-200 hover:bg-stone-300 rounded-lg transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

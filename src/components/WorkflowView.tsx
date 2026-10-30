import React, { useState } from 'react';
import { WORKFLOW_STEPS } from '../data/workflow';
import {
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Sliders,
  Sparkles,
  ChevronRight,
  Clock,
  Layers,
} from 'lucide-react';

interface WorkflowViewProps {
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const WorkflowView: React.FC<WorkflowViewProps> = ({ onShowToast }) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = WORKFLOW_STEPS[activeStepIndex];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Title & Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-100 text-rose-900 rounded-full text-xs font-bold mb-2">
          <CheckCircle className="w-3.5 h-3.5 text-rose-700" />
          <span>Workflow Editing Bebas Cacat</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-rose-950 tracking-tight">
          Panduan Langkah Demi Langkah (A-Z)
        </h1>
        <p className="mt-2 text-stone-600 text-xs sm:text-sm leading-relaxed">
          SOP profesional mengolah 5 gambar hasil generate AI mentah menjadi video timelapse arsitektur dan properti yang stabil, mulus, dan siap FYP.
        </p>
      </div>

      {/* Interactive Step Navigator */}
      <div className="bg-white rounded-xl p-3 border border-stone-200 shadow-sm overflow-x-auto scrollbar-none">
        <div className="flex items-center justify-between min-w-[650px] gap-2">
          {WORKFLOW_STEPS.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            return (
              <button
                key={step.stepNumber}
                onClick={() => setActiveStepIndex(idx)}
                className={`flex-1 p-3 rounded-lg border text-left transition-all relative ${
                  isActive
                    ? 'bg-rose-900 text-white border-rose-900 shadow-md ring-2 ring-rose-300'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded ${
                      isActive ? 'bg-rose-950 text-rose-200' : 'bg-stone-200 text-stone-700'
                    }`}
                  >
                    TAHAP {step.stepNumber}
                  </span>
                  {isActive && <ChevronRight className="w-4 h-4 text-rose-300" />}
                </div>
                <h3 className="text-xs font-bold line-clamp-1">{step.title}</h3>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detailed Step Content Card */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-6">
        {/* Step Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold px-2 py-0.5 bg-rose-100 text-rose-900 rounded">
                Langkah {activeStep.stepNumber} dari 05
              </span>
              <span className="text-xs font-medium text-stone-500">
                Estimasi Pengerjaan: 5 - 10 Menit
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900">
              {activeStep.title}
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm mt-1">
              {activeStep.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 sm:justify-end">
            {activeStep.tools.map((tool) => (
              <span
                key={tool}
                className="px-2.5 py-1 text-xs font-semibold bg-stone-100 text-stone-800 rounded-lg border border-stone-200"
              >
                🛠️ {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Core Actions Checklist */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-rose-800" />
            <span>Tindakan Teknis Wajib:</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {activeStep.keyActions.map((action, i) => (
              <div
                key={i}
                className="p-3.5 bg-stone-50 rounded-xl border border-stone-200/80 flex items-start gap-3"
              >
                <div className="w-5 h-5 rounded-full bg-rose-900 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-xs sm:text-sm text-stone-800 leading-relaxed">
                  {action}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Pro-Tips and Pitfalls Banners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Pro Tip */}
          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
              <Lightbulb className="w-4 h-4 text-emerald-600" />
              <span>PRO-TIP RAHASIA</span>
            </div>
            <p className="text-xs text-emerald-950 leading-relaxed font-medium">
              {activeStep.proTips}
            </p>
          </div>

          {/* Pitfalls to Avoid */}
          <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1.5">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-xs">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>KESALAHAN FATAL (HINDARI)</span>
            </div>
            <p className="text-xs text-amber-950 leading-relaxed font-medium">
              {activeStep.pitfalls}
            </p>
          </div>
        </div>

        {/* Speed Ramping Preset Helper (Especially for Step 4) */}
        {activeStepIndex === 3 && (
          <div className="p-4 bg-stone-900 text-stone-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-300 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Rekomendasi Curve Speed Ramping di CapCut</span>
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    'Preset Curve Speed Ramping CapCut: Point 1 (0.0s) = 1.0x -> Point 2 (0.3s) = 4.5x -> Point 3 (1.5s) = 5.0x -> Point 4 (2.0s) = 1.2x (Landing) -> Optical Flow Smooth Slow Motion Active.'
                  );
                  onShowToast('Preset Speed Curve disalin!', 'success');
                }}
                className="px-2.5 py-1 text-xs font-bold bg-rose-900 hover:bg-rose-800 text-white rounded transition-colors"
              >
                Salin Setting Curve
              </button>
            </div>
            <p className="text-xs text-stone-300 font-mono leading-relaxed bg-stone-950 p-3 rounded-lg border border-stone-800">
              Titik 1 (Detik 0.0): 1.0x (Start stabil) ➔ Titik 2 (Detik 0.4): 4.5x (Percepatan konstruksi) ➔ Titik 3 (Detik 1.8): 5.0x (Pengecoran cepat) ➔ Titik 4 (Detik 2.4): 1.0x (Mendarat sempurna di keyframe akhir). Aktifkan Optical Flow!
            </p>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-stone-100">
          <button
            onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
            disabled={activeStepIndex === 0}
            className="px-4 py-2 text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg disabled:opacity-40 transition-colors"
          >
            ← Tahap Sebelumnya
          </button>

          <button
            onClick={() =>
              setActiveStepIndex((prev) => Math.min(WORKFLOW_STEPS.length - 1, prev + 1))
            }
            disabled={activeStepIndex === WORKFLOW_STEPS.length - 1}
            className="px-4 py-2 text-xs font-bold text-white bg-rose-900 hover:bg-rose-800 rounded-lg disabled:opacity-40 transition-colors"
          >
            Tahap Berikutnya →
          </button>
        </div>
      </div>
    </div>
  );
};

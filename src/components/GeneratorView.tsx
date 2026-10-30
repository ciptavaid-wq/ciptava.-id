import React, { useState, useRef, useEffect } from 'react';
import {
  Upload,
  Image as ImageIcon,
  Check,
  Copy,
  Download,
  Sparkles,
  RefreshCw,
  X,
  Users,
  User,
  Truck,
  Wand2,
  Lock,
  Layers,
  ChevronDown,
} from 'lucide-react';
import {
  CategoryId,
  ActorType,
  ActorGender,
  RoofConstructionType,
  ReferenceStage,
  PromptFrame,
  VideoClip,
} from '../types';
import {
  CATEGORIES,
  PRESET_SCENARIOS,
  generatePhotoPrompts,
  generateVideoClips,
} from '../data/categories';
import { PromptCard } from './PromptCard';

interface GeneratorViewProps {
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
  selectedPresetId?: string | null;
}

export const GeneratorView: React.FC<GeneratorViewProps> = ({ onShowToast, selectedPresetId }) => {
  // Generator State
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('property_building');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('Modern Tropis');
  const [actorType, setActorType] = useState<ActorType>('solo');
  const [actorGender, setActorGender] = useState<ActorGender>('laki_laki');
  const [roofType, setRoofType] = useState<RoofConstructionType>('ikuti_ai');
  const [customNotes, setCustomNotes] = useState<string>('');
  const [referenceStage, setReferenceStage] = useState<ReferenceStage>('100%');
  const [referenceImage, setReferenceImage] = useState<string>(
    '/assets/aistudio/WhatsApp_Image_2026-10-30_at_10.04.08_c0b79451.jpeg'
  );

  // Active Tab on Right Pane
  const [activeRightTab, setActiveRightTab] = useState<'photo' | 'video' | 'parameters'>('photo');

  // Prompts State
  const [photoPrompts, setPhotoPrompts] = useState<PromptFrame[]>([]);
  const [videoClips, setVideoClips] = useState<VideoClip[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [copyAllSuccess, setCopyAllSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Active Category Meta
  const currentCategoryObj =
    CATEGORIES.find((c) => c.id === selectedCategory) || CATEGORIES[0];

  // Re-generate prompts when inputs change
  useEffect(() => {
    const generatedPhotos = generatePhotoPrompts({
      category: selectedCategory,
      subCategory: selectedSubCategory,
      actor: actorType,
      gender: actorGender,
      roofType: roofType,
      customNotes: customNotes,
      referenceStage: referenceStage,
    });
    setPhotoPrompts(generatedPhotos);

    const generatedVideos = generateVideoClips({
      category: selectedCategory,
      subCategory: selectedSubCategory,
      actor: actorType,
      gender: actorGender,
      customNotes: customNotes,
    });
    setVideoClips(generatedVideos);
  }, [selectedCategory, selectedSubCategory, actorType, actorGender, roofType, customNotes, referenceStage]);

  // Apply selectedPresetId when passed from parent modal
  useEffect(() => {
    if (selectedPresetId) {
      applyPreset(selectedPresetId);
    }
  }, [selectedPresetId]);

  // Handle Category Change
  const handleCategoryChange = (catId: CategoryId) => {
    setSelectedCategory(catId);
    const cat = CATEGORIES.find((c) => c.id === catId);
    if (cat) {
      setSelectedSubCategory(cat.subCategories[0]);
    }
  };

  // Image Upload Handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReferenceImage(reader.result as string);
        onShowToast('Foto referensi berhasil dimuat!', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  // Preset Selection
  const applyPreset = (presetId: string) => {
    const p = PRESET_SCENARIOS.find((item) => item.id === presetId);
    if (p) {
      setSelectedCategory(p.categoryId);
      setSelectedSubCategory(p.subCategory);
      setActorType(p.actorType);
      if (p.actorGender) setActorGender(p.actorGender);
      if (p.roofType) setRoofType(p.roofType);
      setCustomNotes(p.customNotes);
      setReferenceStage(p.referenceStage);
      setReferenceImage(p.referenceImage);
      onShowToast(`Preset "${p.name}" diterapkan!`, 'success');
    }
  };

  // Copy Single Prompt
  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    onShowToast('Prompt berhasil disalin ke clipboard!', 'success');
  };

  // Copy All in Active Tab
  const handleCopyAll = () => {
    let fullText = '';
    if (activeRightTab === 'photo') {
      fullText = photoPrompts
        .map((p) => `=== ${p.title} (${p.badge}) ===\n${p.content}\n`)
        .join('\n');
    } else if (activeRightTab === 'video') {
      fullText = videoClips
        .map((v) => `=== ${v.title} (${v.range}) ===\nDurasi: ${v.recommendedDuration}\nKamera: ${v.cameraMovement}\nTips: ${v.tips}\n\nPROMPT:\n${v.prompt}\n`)
        .join('\n');
    } else {
      fullText = `=== PARAMETER & NEGATIVE PROMPTS AI TIMELAPSE ===\n\n[NEGATIVE PROMPT UNTUK KLING & LUMA]:\nmelting, morphing, warping, disconnected walls, floating pillars, gelatin artifacts, blurry, sudden zoom, camera panning, flickering, strobe lighting, deformed limbs, floating human figures.\n\n[PROMPT KONSISTENSI KAMERA]:\nFixed locked camera tripod, 0 pan, 0 zoom, 0 tilt, eye-level 3/4 architectural perspective, consistent daylight continuity, natural hyperlapse motion blur.\n\n[ASPECT RATIO]:\nTikTok/Reels/Shorts: --ar 9:16\nYouTube: --ar 16:9\n`;
    }

    navigator.clipboard.writeText(fullText);
    setCopyAllSuccess(true);
    onShowToast(`Semua prompt pada tab ${activeRightTab.toUpperCase()} berhasil disalin!`, 'success');
    setTimeout(() => setCopyAllSuccess(false), 2000);
  };

  // Download .txt
  const handleDownloadTxt = () => {
    const content = `=====================================================
AI TIMELAPSE GENERATOR PRO - HASIL EXPORT LENGKAP
Kategori: ${currentCategoryObj.name}
Sub-Kategori: ${selectedSubCategory}
Pelaku: ${actorType} (${actorGender || ''})
Konstruksi: ${roofType}
Catatan Kustom: ${customNotes || 'None'}
Tanggal: ${new Date().toLocaleString('id-ID')}
=====================================================

1. PROMPT FOTO KEYFRAMES (MIDJOURNEY / FLUX):
-----------------------------------------------------
${photoPrompts.map((p) => `[${p.title}]\n${p.content}\n`).join('\n')}

2. PROMPT VIDEO KLIP (KLING AI / LUMA DREAM MACHINE / RUNWAY):
-----------------------------------------------------
${videoClips.map((v) => `[${v.title}]\nRentang: ${v.range} | Durasi: ${v.recommendedDuration}\nTips: ${v.tips}\nPROMPT:\n${v.prompt}\n`).join('\n')}

3. PARAMETER & NEGATIVE PROMPT LOCK:
-----------------------------------------------------
Negative Prompt: melting, morphing, warping, disconnected walls, floating pillars, gelatin artifacts, blurry, sudden zoom, camera panning, flickering, strobe lighting, deformed limbs, floating human figures.
Camera Instruction: Fixed locked tripod framing, 0 motion camera, 8k resolution, 60fps feel.
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `timelapse_prompts_${selectedCategory}_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    onShowToast('File prompt .txt berhasil didownload!', 'success');
  };

  // Gemini AI Refine Single Prompt
  const handleAiRefineSingle = async (currentPrompt: string): Promise<string> => {
    setIsAiLoading(true);
    try {
      const res = await fetch('/api/enhance-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: currentCategoryObj.name,
          subCategory: selectedSubCategory,
          actor: actorType,
          roofType: roofType,
          customNotes: customNotes,
          stage: 'Custom Refine',
          currentPrompt: currentPrompt,
        }),
      });
      const data = await res.json();
      if (data.warning) {
        onShowToast(data.warning, 'info');
      } else {
        onShowToast('Prompt berhasil diperkaya dengan Gemini AI!', 'success');
      }
      return data.enhancedPrompt || currentPrompt;
    } catch (err: any) {
      onShowToast('Gagal memanggil API AI. Menggunakan prompt presisi bawaan.', 'error');
      return currentPrompt;
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Banner / Heading */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-rose-950 tracking-tight">
          AI Timelapse Generator Pro
        </h1>
        <p className="mt-2 text-stone-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Kumpulan prompt presisi tinggi dan formula arsitektural untuk mengunci konsistensi objek dari awal hingga akhir video.
        </p>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ================= LEFT COLUMN: CONTROLS (5 cols on lg) ================= */}
        <div className="lg:col-span-5 space-y-5">
          {/* STEP 1: Pilih Kategori Timelapse */}
          <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-rose-900 text-white text-xs font-bold flex items-center justify-center">
                1
              </span>
              <h2 className="text-sm font-bold text-stone-900">
                Pilih Kategori Timelapse
              </h2>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-600">
                Kategori
              </label>
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value as CategoryId)}
                  className="w-full appearance-none bg-stone-50 border border-stone-300 hover:border-stone-400 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm font-medium text-stone-800 pr-10 focus:outline-none focus:ring-2 focus:ring-rose-800/30"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-stone-500 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* STEP 2: Sub-Kategori & Pelaku */}
          <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-rose-900 text-white text-xs font-bold flex items-center justify-center">
                2
              </span>
              <h2 className="text-sm font-bold text-stone-900">
                Sub-Kategori & Pelaku
              </h2>
            </div>

            {/* Sub-Kategori / Gaya Spesifik */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-600">
                Sub-Kategori / Gaya Spesifik
              </label>
              <div className="relative">
                <select
                  value={selectedSubCategory}
                  onChange={(e) => setSelectedSubCategory(e.target.value)}
                  className="w-full appearance-none bg-stone-50 border border-stone-300 hover:border-stone-400 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm font-medium text-stone-800 pr-10 focus:outline-none focus:ring-2 focus:ring-rose-800/30"
                >
                  {currentCategoryObj.subCategories.map((sc) => (
                    <option key={sc} value={sc}>
                      {sc}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-stone-500 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Pelaku dalam Video */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-600">
                Pelaku dalam Video
              </label>
              <div className="grid grid-cols-2 gap-2">
                {/* 1. Tim Profesional */}
                <button
                  type="button"
                  onClick={() => setActorType('tim')}
                  className={`p-2.5 rounded-lg border text-left transition-all flex flex-col gap-1 items-center justify-center text-center ${
                    actorType === 'tim'
                      ? 'bg-rose-900 text-white border-rose-900 shadow-sm'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <Users className={`w-5 h-5 ${actorType === 'tim' ? 'text-rose-200' : 'text-stone-500'}`} />
                  <span className="text-[11px] font-bold leading-tight">
                    Tim Profesional
                  </span>
                </button>

                {/* 2. Solo / Creator (1 Orang) */}
                <button
                  type="button"
                  onClick={() => setActorType('solo')}
                  className={`p-2.5 rounded-lg border text-left transition-all flex flex-col gap-1 items-center justify-center text-center ${
                    actorType === 'solo'
                      ? 'bg-rose-900 text-white border-rose-900 shadow-sm ring-1 ring-rose-700'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <User className={`w-5 h-5 ${actorType === 'solo' ? 'text-rose-200' : 'text-stone-500'}`} />
                  <span className="text-[11px] font-bold leading-tight">
                    Solo / Creator (1 Orang)
                  </span>
                </button>

                {/* 3. Tanpa Pekerja (Alat Berat) */}
                <button
                  type="button"
                  onClick={() => setActorType('alat_berat')}
                  className={`p-2.5 rounded-lg border text-left transition-all flex flex-col gap-1 items-center justify-center text-center ${
                    actorType === 'alat_berat'
                      ? 'bg-rose-900 text-white border-rose-900 shadow-sm'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <Truck className={`w-5 h-5 ${actorType === 'alat_berat' ? 'text-rose-200' : 'text-stone-500'}`} />
                  <span className="text-[11px] font-bold leading-tight">
                    Tanpa Pekerja (Alat Berat)
                  </span>
                </button>

                {/* 4. Tanpa Pekerja/Alat (Otomatis) */}
                <button
                  type="button"
                  onClick={() => setActorType('otomatis')}
                  className={`p-2.5 rounded-lg border text-left transition-all flex flex-col gap-1 items-center justify-center text-center ${
                    actorType === 'otomatis'
                      ? 'bg-rose-900 text-white border-rose-900 shadow-sm'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <Wand2 className={`w-5 h-5 ${actorType === 'otomatis' ? 'text-rose-200' : 'text-stone-500'}`} />
                  <span className="text-[11px] font-bold leading-tight">
                    Tanpa Pekerja/Alat (Otomatis)
                  </span>
                </button>
              </div>
            </div>

            {/* Pilih Karakter (Solo) - Visible when Solo is selected */}
            {actorType === 'solo' && (
              <div className="space-y-1.5 pt-1">
                <label className="text-xs font-semibold text-stone-600">
                  Pilih Karakter (Solo)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setActorGender('laki_laki')}
                    className={`py-2 px-3 rounded-lg border text-xs font-bold text-center transition-all ${
                      actorGender === 'laki_laki'
                        ? 'bg-rose-900 text-white border-rose-900 shadow-sm'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    Laki-laki
                  </button>
                  <button
                    type="button"
                    onClick={() => setActorGender('wanita')}
                    className={`py-2 px-3 rounded-lg border text-xs font-bold text-center transition-all ${
                      actorGender === 'wanita'
                        ? 'bg-rose-900 text-white border-rose-900 shadow-sm'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    Wanita
                  </button>
                </div>
              </div>
            )}

            {/* Tipe Konstruksi Atap / Detail Khusus */}
            {currentCategoryObj.roofOptions && (
              <div className="space-y-1.5 pt-1">
                <label className="text-xs font-semibold text-stone-600">
                  {currentCategoryObj.roofLabel || 'Tipe Konstruksi Atap'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {currentCategoryObj.roofOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setRoofType(opt.id)}
                      className={`p-2 rounded-lg border text-[11px] font-bold text-center transition-all flex flex-col justify-center items-center ${
                        roofType === opt.id
                          ? 'bg-rose-900 text-white border-rose-900 shadow-sm'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Deskripsi Tambahan (opsional) */}
            <div className="space-y-1.5 pt-1">
              <label className="text-xs font-semibold text-stone-600">
                Deskripsi Tambahan (opsional)
              </label>
              <textarea
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                rows={3}
                placeholder={currentCategoryObj.defaultNotesPlaceholder}
                className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-800/30"
              />
            </div>
          </div>

          {/* STEP 3: Foto Referensi */}
          <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-rose-900 text-white text-xs font-bold flex items-center justify-center">
                3
              </span>
              <h2 className="text-sm font-bold text-stone-900">Foto Referensi</h2>
            </div>

            {/* Dropzone */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-stone-300 hover:border-rose-700 rounded-xl p-4 text-center cursor-pointer transition-colors bg-stone-50/50 hover:bg-rose-50/30"
            >
              <Upload className="w-6 h-6 text-stone-400 mx-auto mb-1.5" />
              <p className="text-xs font-semibold text-stone-700">
                Klik atau tarik foto ke sini <span className="font-normal text-stone-500">(opsional, tapi disarankan)</span>
              </p>
            </div>

            {/* Thumbnail Preview if available */}
            {referenceImage && (
              <div className="relative rounded-lg overflow-hidden border border-stone-300 bg-stone-100 group">
                <img
                  src={referenceImage}
                  alt="Reference Preview"
                  className="w-full h-36 object-cover"
                />
                <button
                  type="button"
                  onClick={() => setReferenceImage('')}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/70 text-white flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
                  title="Hapus foto referensi"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] backdrop-blur-sm">
                  Acuan Visual Aktif
                </div>
              </div>
            )}

            {/* Foto Ini Sebagai Acuan Tahap Apa? */}
            <div className="space-y-1.5 pt-1">
              <label className="text-xs font-semibold text-stone-600">
                Foto Ini Sebagai Acuan Tahap Apa?
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setReferenceStage('0%')}
                  className={`py-2 px-2 rounded-lg border text-xs font-bold text-center transition-all ${
                    referenceStage === '0%'
                      ? 'bg-rose-900 text-white border-rose-900 shadow-sm'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  AWAL (0%)
                </button>
                <button
                  type="button"
                  onClick={() => setReferenceStage('50%')}
                  className={`py-2 px-2 rounded-lg border text-xs font-bold text-center transition-all ${
                    referenceStage === '50%'
                      ? 'bg-rose-900 text-white border-rose-900 shadow-sm'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  TENGAH (50%)
                </button>
                <button
                  type="button"
                  onClick={() => setReferenceStage('100%')}
                  className={`py-2 px-2 rounded-lg border text-xs font-bold text-center transition-all ${
                    referenceStage === '100%'
                      ? 'bg-rose-900 text-white border-rose-900 shadow-sm'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  AKHIR (100%)
                </button>
              </div>
            </div>

            {/* Built-in Preset Carousel */}
            <div className="pt-2">
              <span className="text-[11px] font-semibold text-stone-500 block mb-1.5">
                Atau pilih contoh referensi instan:
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {PRESET_SCENARIOS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => applyPreset(p.id)}
                    className="text-left p-2 rounded-lg border border-stone-200 bg-stone-50 hover:bg-rose-50 hover:border-rose-300 transition-colors"
                  >
                    <span className="text-[11px] font-bold text-stone-800 line-clamp-1">
                      {p.name}
                    </span>
                    <span className="text-[10px] text-stone-500 block">
                      {p.subCategory}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: PROMPTS OUTPUT (7 cols on lg) ================= */}
        <div className="lg:col-span-7 space-y-4">
          {/* Top Tabs Bar */}
          <div className="bg-white rounded-xl p-2 border border-stone-200 shadow-sm">
            <div className="flex flex-wrap sm:flex-nowrap gap-1.5">
              <button
                type="button"
                onClick={() => setActiveRightTab('photo')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
                  activeRightTab === 'photo'
                    ? 'bg-rose-900 text-white shadow-sm'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Prompt Foto (First / End Frame)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveRightTab('video')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
                  activeRightTab === 'video'
                    ? 'bg-rose-900 text-white shadow-sm'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Prompt Video (4 Klip, 32-40 Detik)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveRightTab('parameters')}
                className={`py-2 px-3 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
                  activeRightTab === 'parameters'
                    ? 'bg-rose-900 text-white shadow-sm'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
                title="Parameter & Negative Prompt"
              >
                <Lock className="w-4 h-4" />
                <span className="hidden sm:inline">Anti-Glitch</span>
              </button>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="bg-white rounded-xl p-3 border border-stone-200 shadow-sm flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyAll}
                className="px-3.5 py-2 text-xs font-bold text-white bg-rose-900 hover:bg-rose-800 rounded-lg shadow-sm flex items-center gap-2 transition-all"
              >
                {copyAllSuccess ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copyAllSuccess ? 'Semua Tersalin!' : 'Salin Semua (Tab Aktif)'}</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadTxt}
                className="px-3 py-2 text-xs font-bold text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-lg flex items-center gap-1.5 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .txt</span>
              </button>
            </div>

            <div className="text-xs text-stone-500 font-medium hidden sm:block">
              {activeRightTab === 'photo' && '5 Frame Sekuensial Terkunci'}
              {activeRightTab === 'video' && '4 Klip Transisi Start & End Frame'}
              {activeRightTab === 'parameters' && 'Parameter Anti-Glitch & Negative'}
            </div>
          </div>

          {/* TAB 1: PROMPT FOTO (First / End Frame) */}
          {activeRightTab === 'photo' && (
            <div className="space-y-4">
              {photoPrompts.map((frame) => (
                <PromptCard
                  key={frame.id}
                  title={frame.title}
                  badge={frame.badge}
                  content={frame.content}
                  onCopy={handleCopyText}
                  onEnhanceWithAI={handleAiRefineSingle}
                  isAiLoading={isAiLoading}
                />
              ))}
            </div>
          )}

          {/* TAB 2: PROMPT VIDEO (4 Klip, 32-40 Detik) */}
          {activeRightTab === 'video' && (
            <div className="space-y-4">
              <div className="bg-rose-50 border border-rose-200 p-3.5 rounded-xl text-xs text-rose-950 leading-relaxed">
                <span className="font-bold">💡 Aturan Emas Video Timelapse:</span> Selalu gunakan mode{' '}
                <span className="font-semibold underline">Start Frame & End Frame</span> di Kling AI / Luma Dream Machine. Masukkan Foto awal dan Foto akhir sesuai tahapan klip di bawah ini agar AI tidak halusinasi!
              </div>

              {videoClips.map((clip) => (
                <div
                  key={clip.id}
                  className="bg-[#1C1917] rounded-xl overflow-hidden border border-stone-800 shadow-md"
                >
                  <div className="bg-[#2D0A14] px-4 py-2.5 flex items-center justify-between border-b border-[#4A1020]">
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-bold text-rose-100">
                        {clip.title}
                      </span>
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-rose-950 text-rose-300 border border-rose-800/60 rounded">
                        {clip.range}
                      </span>
                    </div>

                    <button
                      onClick={() => handleCopyText(clip.prompt)}
                      className="px-3 py-1 text-xs font-bold rounded flex items-center gap-1.5 bg-rose-800 hover:bg-rose-700 text-white border border-rose-600 transition-all"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Prompt</span>
                    </button>
                  </div>

                  <div className="p-4 bg-[#141211] space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-stone-300 bg-stone-900/70 p-2.5 rounded-lg border border-stone-800">
                      <div>
                        <span className="text-stone-500">Rekomendasi Durasi:</span>{' '}
                        <span className="font-semibold text-rose-200">{clip.recommendedDuration}</span>
                      </div>
                      <div>
                        <span className="text-stone-500">Pergerakan Kamera:</span>{' '}
                        <span className="font-semibold text-stone-200">{clip.cameraMovement}</span>
                      </div>
                    </div>

                    <div className="max-h-44 overflow-y-auto custom-scrollbar pr-2">
                      <p className="font-mono text-xs sm:text-[13px] text-stone-300 leading-relaxed select-all whitespace-pre-wrap">
                        {clip.prompt}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-[11px] text-stone-400">
                      <span className="text-amber-400 font-medium">📌 {clip.tips}</span>
                      <span className="font-mono tabular-nums text-stone-500">{clip.prompt.length} chars</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: PARAMETER & NEGATIVE PROMPTS */}
          {activeRightTab === 'parameters' && (
            <div className="space-y-4">
              {/* Negative Prompt Card */}
              <div className="bg-[#1C1917] rounded-xl overflow-hidden border border-stone-800 shadow-md">
                <div className="bg-[#2D0A14] px-4 py-2.5 flex items-center justify-between border-b border-[#4A1020]">
                  <span className="text-xs sm:text-sm font-bold text-rose-100">
                    Formula Negative Prompt Anti-Glitch (Kling / Luma / Midjourney)
                  </span>
                  <button
                    onClick={() =>
                      handleCopyText(
                        'melting, morphing, warping, disconnected walls, floating pillars, gelatin artifacts, blurry, sudden zoom, camera panning, flickering, strobe lighting, deformed limbs, floating human figures, watermark, low quality, oversaturated colors, shaky cam.'
                      )
                    }
                    className="px-3 py-1 text-xs font-bold rounded flex items-center gap-1.5 bg-rose-800 hover:bg-rose-700 text-white border border-rose-600 transition-all"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin Negative Prompt</span>
                  </button>
                </div>
                <div className="p-4 bg-[#141211]">
                  <p className="font-mono text-xs sm:text-sm text-stone-300 leading-relaxed select-all">
                    melting, morphing, warping, disconnected walls, floating pillars, gelatin artifacts, blurry, sudden zoom, camera panning, flickering, strobe lighting, deformed limbs, floating human figures, watermark, low quality, oversaturated colors, shaky cam.
                  </p>
                  <p className="text-xs text-stone-400 mt-3 pt-2 border-t border-stone-800">
                    Masukkan kalimat di atas ke kolom <code className="text-rose-300">Negative Prompt</code> di Kling AI untuk mencegah dinding atau pondasi mencair di detik ke-3.
                  </p>
                </div>
              </div>

              {/* Camera Lock Formula Card */}
              <div className="bg-[#1C1917] rounded-xl overflow-hidden border border-stone-800 shadow-md">
                <div className="bg-[#2D0A14] px-4 py-2.5 flex items-center justify-between border-b border-[#4A1020]">
                  <span className="text-xs sm:text-sm font-bold text-rose-100">
                    Camera Movement Command (Kunci Sudut Tripod)
                  </span>
                  <button
                    onClick={() =>
                      handleCopyText(
                        'Fixed locked camera on heavy tripod, 0 pan, 0 zoom, 0 tilt, eye-level 3/4 architectural perspective, 50mm lens framing, stable horizon, no handheld shake.'
                      )
                    }
                    className="px-3 py-1 text-xs font-bold rounded flex items-center gap-1.5 bg-rose-800 hover:bg-rose-700 text-white border border-rose-600 transition-all"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin Perintah Kamera</span>
                  </button>
                </div>
                <div className="p-4 bg-[#141211]">
                  <p className="font-mono text-xs sm:text-sm text-stone-300 leading-relaxed select-all">
                    Fixed locked camera on heavy tripod, 0 pan, 0 zoom, 0 tilt, eye-level 3/4 architectural perspective, 50mm lens framing, stable horizon, no handheld shake.
                  </p>
                </div>
              </div>

              {/* Aspect Ratio Guide */}
              <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-sm space-y-3">
                <h3 className="text-sm font-bold text-stone-900">
                  Panduan Aspek Rasio & Export Video
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                    <span className="font-bold text-rose-950 block mb-1">
                      📱 9:16 Vertikal (TikTok / Reels / Shorts)
                    </span>
                    <p className="text-stone-600 leading-relaxed">
                      Tambahkan <code className="bg-stone-200 px-1 rounded">--ar 9:16</code> di Midjourney. Resolusi video akhir: 1080 x 1920 px (Full HD) atau 2160 x 3840 px (4K).
                    </p>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                    <span className="font-bold text-rose-950 block mb-1">
                      🖥️ 16:9 Horizontal (YouTube / TV / Presentasi)
                    </span>
                    <p className="text-stone-600 leading-relaxed">
                      Tambahkan <code className="bg-stone-200 px-1 rounded">--ar 16:9</code> di Midjourney. Resolusi video akhir: 1920 x 1080 px atau 3840 x 2160 px.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

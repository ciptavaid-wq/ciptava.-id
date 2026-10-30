import { CategoryOption, CategoryId, ActorType, ActorGender, RoofConstructionType, ReferenceStage, PromptFrame, VideoClip, PresetScenario } from '../types';

export const CATEGORIES: CategoryOption[] = [
  {
    id: 'property_building',
    name: 'Rumah/Properti Bangun dari 0',
    subCategories: [
      'Modern Tropis',
      'Minimalis Scandinavian',
      'Industrial Kontemporer',
      'Villa Mewah Bali Modern',
      'Klasik Eropa Elegan',
      'Japandi Estetik',
      'Rumah Compact 2 Lantai',
    ],
    roofLabel: 'Tipe Konstruksi Atap',
    roofOptions: [
      { id: 'kuda_kuda_kayu', label: 'Kuda-kuda Kayu' },
      { id: 'baja_ringan', label: 'Baja Ringan' },
      { id: 'cor_dak', label: 'Cor Dak (Tanpa Kuda-kuda)' },
      { id: 'ikuti_ai', label: 'Ikuti Langkah AI' },
    ],
    defaultStyle: 'Modern Tropis',
    defaultNotesPlaceholder: 'Contoh: warna cat putih broken white & aksen kayu jati, bukaan kaca besar, taman depan minimalis, kolam renang di samping.',
  },
  {
    id: 'interior_renovation',
    name: 'Renovasi Interior / Kamar Estetik',
    subCategories: [
      'Kamar Tidur Utama Japandi',
      'Dapur & Kitchen Island Minimalis Modern',
      'Ruang Tamu Warm Industrial',
      'Studio Konten Kreator / Gaming Room',
      'Walk-in Closet Mewah',
      'Kamar Mandi Semi-Outdoor Tropis',
    ],
    roofLabel: 'Tipe Plafon / Ceiling',
    roofOptions: [
      { id: 'kuda_kuda_kayu', label: 'Plafon Drop Ceiling Kayu' },
      { id: 'baja_ringan', label: 'Gypsum Rata Hidden LED' },
      { id: 'cor_dak', label: 'Exposed Concrete Industrial' },
      { id: 'ikuti_ai', label: 'Ikuti Langkah AI' },
    ],
    defaultStyle: 'Kamar Tidur Utama Japandi',
    defaultNotesPlaceholder: 'Contoh: lantai vinyl oak alami, headboard dipan kayu built-in, indirect warm lighting 3000K, jendela kaca besar.',
  },
  {
    id: 'art_mural',
    name: 'Lukisan / Seni / Mural Dinding Besar',
    subCategories: [
      'Mural Dinding Cafe Modern Street Art',
      'Lukisan Kanvas Lanskap Impresionis Cat Minyak',
      'Kaligrafi Kontemporer Gold Leaf',
      'Ilustrasi Karakter Anime Hyper-Realistic',
      'Abstrak Geometris Bertekstur',
    ],
    roofLabel: 'Teknik Medium',
    roofOptions: [
      { id: 'kuda_kuda_kayu', label: 'Cat Akrilik & Kuas Tradisional' },
      { id: 'baja_ringan', label: 'Pilox / Spray Can Graffiti' },
      { id: 'cor_dak', label: 'Mix Media & Pisau Palet Tekstur' },
      { id: 'ikuti_ai', label: 'Ikuti Langkah AI' },
    ],
    defaultStyle: 'Mural Dinding Cafe Modern Street Art',
    defaultNotesPlaceholder: 'Contoh: palet warna terakota, sage green, aksen emas metalik, logo kafe di sudut atas, dinding semen ekspos.',
  },
  {
    id: 'plant_growth',
    name: 'Pertumbuhan Tanaman / Bonsai Eksotis',
    subCategories: [
      'Bonsai Beringin Kimeng Pembentukan Ranting',
      'Monstera Variegata Tumbuh Daun Baru',
      'Bunga Anggrek Hitam Mekar Sempurna',
      'Bonsai Pinus Gaya Formal Miring',
      'Tanaman Hias Sukulen & Kaktus Gurun',
    ],
    roofLabel: 'Media Tanam & Pot',
    roofOptions: [
      { id: 'kuda_kuda_kayu', label: 'Pot Keramik Antik Tradisional' },
      { id: 'baja_ringan', label: 'Pot Semen Beton Minimalis' },
      { id: 'cor_dak', label: 'Terrarium Kaca Transparan' },
      { id: 'ikuti_ai', label: 'Ikuti Langkah AI' },
    ],
    defaultStyle: 'Bonsai Beringin Kimeng Pembentukan Ranting',
    defaultNotesPlaceholder: 'Contoh: kawat tempaan membentuk liukan batang, lumut hijau segar di dasar akar gantung, pencahayaan studio lembut.',
  },
  {
    id: 'food_baking',
    name: 'Pematangan Buah / Makanan / Baking',
    subCategories: [
      'Croissant French Pastry Mengembang & Golden Crust',
      'Sourdough Bread Oven Spring & Cracking Crust',
      'Kue Tart Cokelat Ganache Layering & Drip',
      'Steak Wagyu A5 Searing & Caramelization',
      'Pizza Napoletana Fermentasi & Pembakaran Tungku',
    ],
    roofLabel: 'Setting Tempat / Oven',
    roofOptions: [
      { id: 'kuda_kuda_kayu', label: 'Oven Kaca Transparan dengan Lampu' },
      { id: 'baja_ringan', label: 'Meja Marmer Dapur Bakery Chef' },
      { id: 'cor_dak', label: 'Tungku Kayu Tradisional Api Menyala' },
      { id: 'ikuti_ai', label: 'Ikuti Langkah AI' },
    ],
    defaultStyle: 'Croissant French Pastry Mengembang & Golden Crust',
    defaultNotesPlaceholder: 'Contoh: lapisan lamination butter terlihat jelas, mengembang 3x lipat, glossy egg wash glaze kemilau.',
  },
  {
    id: 'car_restoration',
    name: 'Restorasi Mobil Klasik / Perakitan Mesin',
    subCategories: [
      'Restorasi Porsche 911 Classic RWB Bodykit',
      'Restorasi Toyota Hardtop Land Cruiser FJ40',
      'Perakitan Mesin V8 Twin Turbo dari Baut Pertama',
      'Motor Custom Cafe Racer Honda CB',
      'Restorasi Vespa Super Klasik 1966',
    ],
    roofLabel: 'Area Garasi / Workshop',
    roofOptions: [
      { id: 'kuda_kuda_kayu', label: 'Bengkel Vintage Industrial Hangat' },
      { id: 'baja_ringan', label: 'Cleanroom Garage Lantai Epoxy Putih' },
      { id: 'cor_dak', label: 'Ruang Perakitan Balap Neon Pitlane' },
      { id: 'ikuti_ai', label: 'Ikuti Langkah AI' },
    ],
    defaultStyle: 'Restorasi Toyota Hardtop Land Cruiser FJ40',
    defaultNotesPlaceholder: 'Contoh: warna cat army green matte, velg beadlock hitam ban MT, interior kulit saddle brown, shockbreaker kuning.',
  },
  {
    id: 'body_transformation',
    name: 'Transformasi Tubuh / Fitness / Gym 90 Hari',
    subCategories: [
      'Bulking Bersih & Pembentukan Otot Atletis',
      'Fat Loss Ekstrem dari Perut Buncit ke Six-Pack',
      'Transformasi Postur & Calisthenics Strength',
      'Pematangan Otot Bahu & Punggung V-Taper',
    ],
    roofLabel: 'Setting Latar / Studio',
    roofOptions: [
      { id: 'kuda_kuda_kayu', label: 'Gym Komersial Lampu Overhead Keras' },
      { id: 'baja_ringan', label: 'Studio Foto Minimalis Abu-Abu Netral' },
      { id: 'cor_dak', label: 'Home Gym Minimalis Cermin Besar' },
      { id: 'ikuti_ai', label: 'Ikuti Langkah AI' },
    ],
    defaultStyle: 'Fat Loss Ekstrem dari Perut Buncit ke Six-Pack',
    defaultNotesPlaceholder: 'Contoh: celana pendek kompresi hitam, pose relaks frontal konsisten, lighting rim highlight otot.',
  },
  {
    id: 'deep_cleaning',
    name: 'Pembersihan Karpet / Deep Cleaning / Cuci',
    subCategories: [
      'Restorasi Karpet Persia Kotor Ekstrem Berpasir',
      'Deep Cleaning Jok Mobil Kulit Berlumpur Kering',
      'Restorasi Sepatu Sneakers Langka Menguning',
      'Pembersihan Kolam Renang Berlumut Pekat',
    ],
    roofLabel: 'Peralatan Utama',
    roofOptions: [
      { id: 'kuda_kuda_kayu', label: 'Sikat Rotari & Mesin Ekstraktor Busa' },
      { id: 'baja_ringan', label: 'Pressure Washer Jet Spray Air Bertekanan' },
      { id: 'cor_dak', label: 'Bahan Kimia Khusus & Kape Pengerik' },
      { id: 'ikuti_ai', label: 'Ikuti Langkah AI' },
    ],
    defaultStyle: 'Restorasi Karpet Persia Kotor Ekstrem Berpasir',
    defaultNotesPlaceholder: 'Contoh: pola motif bunga klasik timur tengah di bawah lapisan debu, air busa cokelat kotor mengalir.',
  },
];

export const PRESET_SCENARIOS: PresetScenario[] = [
  {
    id: 'modern_tropis_house',
    name: 'Rumah Modern Tropis 2 Lantai (Default Contoh)',
    categoryId: 'property_building',
    subCategory: 'Modern Tropis',
    actorType: 'solo',
    actorGender: 'laki_laki',
    roofType: 'ikuti_ai',
    customNotes: 'Fasad kayu kisi-kisi jati, balkon tanaman gantung, kaca lebar, dinding beton acian halus.',
    referenceStage: '100%',
    referenceImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'japandi_bedroom',
    name: 'Renovasi Kamar Estetik Japandi',
    categoryId: 'interior_renovation',
    subCategory: 'Kamar Tidur Utama Japandi',
    actorType: 'solo',
    actorGender: 'wanita',
    roofType: 'baja_ringan',
    customNotes: 'Lantai kayu oak hangat, kasur dipan rendah platform, lampu gantung washi paper, tanaman monstera.',
    referenceStage: '100%',
    referenceImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'classic_car_fj40',
    name: 'Restorasi Toyota FJ40 Hardtop',
    categoryId: 'car_restoration',
    subCategory: 'Restorasi Toyota Hardtop Land Cruiser FJ40',
    actorType: 'solo',
    actorGender: 'laki_laki',
    roofType: 'kuda_kuda_kayu',
    customNotes: 'Bodi awal berkarat parah, sasis diamplas, cat warna mustard yellow retro vintage, ban pacul BFGoodrich.',
    referenceStage: '100%',
    referenceImage: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'mural_cafe',
    name: 'Mural Dinding Cafe Artistik',
    categoryId: 'art_mural',
    subCategory: 'Mural Dinding Cafe Modern Street Art',
    actorType: 'solo',
    actorGender: 'wanita',
    roofType: 'baja_ringan',
    customNotes: 'Palet terracotta, siluet dedaunan tropis monstera, tipografi nama kafe bernuansa artisan.',
    referenceStage: '100%',
    referenceImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
  },
];

// Structural prompt builder engine
export function generatePhotoPrompts(params: {
  category: CategoryId;
  subCategory: string;
  actor: ActorType;
  gender?: ActorGender;
  roofType?: RoofConstructionType;
  customNotes?: string;
  referenceStage: ReferenceStage;
}): PromptFrame[] {
  const { category, subCategory, actor, gender, roofType, customNotes } = params;

  // Actor description segment
  let actorText = '';
  if (actor === 'solo') {
    const gText = gender === 'wanita' ? 'a female creator/worker' : 'a male creator/worker';
    actorText = ` Featuring ${gText} in high-visibility workwear actively measuring, inspecting, and guiding the work at key intervals, naturally blurred with long-exposure timelapse motion blur so structural elements remain crisp.`;
  } else if (actor === 'tim') {
    actorText = ` A synchronized team of professional uniformed workers with safety helmets and vests operating across the site, naturally motion-blurred by rapid hyperlapse speed, keeping all physical structures completely sharp and stationary.`;
  } else if (actor === 'alat_berat') {
    actorText = ` Heavy machinery (mini-excavators, boom lifts, and precision hydraulic cranes) operating with timelapse motion trails, no chaotic human clutter.`;
  } else {
    actorText = ` Automated clean commercial advertising hyperlapse style with no workers visible, purely organic self-assembling architectural precision.`;
  }

  const customText = customNotes && customNotes.trim().length > 0 ? ` Specific design accents: ${customNotes.trim()}.` : '';

  if (category === 'property_building') {
    let roofDesc = 'modern minimalist roof line';
    if (roofType === 'kuda_kuda_kayu') roofDesc = 'traditional engineered timber roof truss rafters and purlins';
    if (roofType === 'baja_ringan') roofDesc = 'cold-formed light gauge steel truss framing (baja ringan) with silver zinc coating';
    if (roofType === 'cor_dak') roofDesc = 'reinforced monolithic concrete flat roof slab (cor dak beton) with parapet drainage';
    if (roofType === 'ikuti_ai') roofDesc = 'architecturally integrated roof framework strictly matching the final facade style';

    return [
      {
        id: 'foto_1',
        title: 'FOTO 1 — First Frame (0%)',
        badge: 'FIRST FRAME (0%)',
        percentage: 0,
        content: `An empty plot of raw land, marked only with wooden survey stakes and bright string lines outlining the exact footprint and orientation of the future house. Style/context: ${subCategory}.${customText} Surrounded by a natural or residential neighborhood environment, under warm natural daylight, consistent camera framing across all stages. Structural accuracy (mandatory): every foundation, footing, column, beam, truss, or framework element visible at this stage must follow real-world professional architectural and structural engineering logic - correct column/pier spacing and load-bearing placement exactly matching the final building's actual structural grid, accurate right angles, true-to-scale proportions, correct perspective, no floating or unsupported elements, no impossible cantilevers, no sagging, warping, or misaligned structural members, no structural defects of any kind - rendered with the precision and craft of a professional architectural visualization. Visually consistent with, and progressing naturally toward/from, the uploaded reference photo at the 100% stage. Footprint & scale lock (mandatory regardless of construction progress at this stage): the building's exact footprint size, shape, orientation, and number of floors/levels must precisely match the completed structure shown in the uploaded reference photo - never larger, smaller, or differently proportioned. The same footprint boundary, structural column/pier grid, and overall scale established in the reference photo must already be visible or clearly implied at this stage, so that every stage in the sequence stays perfectly consistent in scale with every other stage.${actorText} Ultra-realistic photography, sharp focus, correct perspective, straight vertical and horizontal lines, accurate right angles, physically accurate structural geometry, no melting or warping structures, no distorted proportions, no floating or disconnected elements, no structural defects, consistent camera angle and framing, consistent lighting continuity, 8k, photorealistic, professional architectural/product photography quality. --ar 9:16 --v 6.1 --style raw`,
      },
      {
        id: 'foto_2',
        title: 'FOTO 2 — End Frame (25%)',
        badge: 'END FRAME (25%)',
        percentage: 25,
        content: `Substructure and foundation stage completed: precisely excavated trenches, compacted gravel bed, tied steel rebar reinforcement cages, poured reinforced concrete strip and pad footings, and stub rebar starter bars protruding upward for the structural columns. Style/context: ${subCategory}.${customText} Perfectly aligned to the exact survey lines and footprint boundary established in Frame 1. Footprint & scale lock (mandatory): identical eye-level 3/4 camera position, exact same focal length, zero camera movement. Load-bearing placement precisely matching the structural grid of the final building.${actorText} Damp cured concrete textures, clean excavation site, accurate right angles, true-to-scale engineering proportions, no floating or distorted geometry. Consistent bright natural daylight, crisp shadows, ultra-sharp architectural photography, 8k resolution, photorealistic. --ar 9:16 --v 6.1 --style raw`,
      },
      {
        id: 'foto_3',
        title: 'FOTO 3 — End Frame (50%)',
        badge: 'END FRAME (50%)',
        percentage: 50,
        content: `The main structural frame erected - concrete and steel columns and floor slabs for all levels standing precisely level and square, completely open to the sky, no exterior walls or finished roof yet. Style/context: ${subCategory}.${customText} Structural framework following strict real-world engineering: correct column spacing, formwork marks on cast concrete, smooth floor slabs, beam connections aligned with geometric accuracy. Locked camera framing matching Frame 1 and 2 exactly from the identical 3/4 eye-level perspective.${actorText} Structural scale and footprint 100% locked to the final building design. Bright midday sunlight with realistic ambient occlusion, high depth of field, hyper-detailed architectural framing, 8k, photorealistic. --ar 9:16 --v 6.1 --style raw`,
      },
      {
        id: 'foto_4',
        title: 'FOTO 4 — End Frame (75%)',
        badge: 'END FRAME (75%)',
        percentage: 75,
        content: `Enclosure and rough framing stage: exterior red brick and lightweight aerated autoclaved concrete (hebel) masonry walls laid true and plumb, rough cement plaster scratch coat applied, window and sliding door aluminum frames installed without glass yet. Roof structure fully mounted: ${roofDesc}.${customText} Style/context: ${subCategory}. Temporary scaffolding along the outer walls. Same identical camera position, angle, and framing as all previous stages.${actorText} Crisp architectural lines, consistent proportions, no structural warping or artifacts, golden hour late afternoon natural lighting, cinematic depth, 8k resolution, photorealistic. --ar 9:16 --v 6.1 --style raw`,
      },
      {
        id: 'foto_5',
        title: 'FOTO 5 — Final Frame (100%)',
        badge: 'FINAL FRAME (100%)',
        percentage: 100,
        content: `The fully completed, pristine modern architectural masterwork: clean exterior facade finished with smooth painted stucco, wood slat accent panels, double-glazed panoramic windows with warm glowing interior lights turned on. Style/context: ${subCategory}.${customText} Roof fully sealed with clean architectural gutters. Surrounding landscape completed with manicured green grass lawn, tropical ornamental plants, modern paved driveway, and ambient outdoor ground spotlights. Exact identical 3/4 eye-level camera framing, locked perspective and scale identical to the initial 0% plot. Dusk/blue hour natural daylight paired with 3000K warm interior illumination, ultra-realistic architectural digest magazine cover quality, 8k, photorealistic, sharp focus, zero distortion. --ar 9:16 --v 6.1 --style raw`,
      },
    ];
  }

  if (category === 'interior_renovation') {
    return [
      {
        id: 'foto_1',
        title: 'FOTO 1 — First Frame (0%)',
        badge: 'FIRST FRAME (0%)',
        percentage: 0,
        content: `A completely stripped, empty raw room before renovation, exposed bare brick walls, peeled paint, dusty raw concrete subfloor, hanging exposed electrical conduits, empty window openings. Style/context: ${subCategory}.${customText} Room boundary, dimensions, ceiling height, and window placement strictly locked. Wide fixed camera angle on a sturdy locked tripod looking into the room corner.${actorText} Daylight streaming from the raw window opening, realistic gritty textures, photorealistic interior photography, 8k. --ar 9:16 --v 6.1 --style raw`,
      },
      {
        id: 'foto_2',
        title: 'FOTO 2 — End Frame (25%)',
        badge: 'END FRAME (25%)',
        percentage: 25,
        content: `Rough electrical and plumbing rough-in completed, wall chasing channels cut and conduits neatly installed, metal stud wall furring channels mounted, leveling screed poured smoothly on the floor. Style/context: ${subCategory}.${customText} Camera framing 100% identical to Frame 1. Crisp geometrical alignment, laser leveling lines visible.${actorText} Bright work-light illumination, dust motes in light beams, hyper-detailed renovation progress, 8k. --ar 9:16 --v 6.1 --style raw`,
      },
      {
        id: 'foto_3',
        title: 'FOTO 3 — End Frame (50%)',
        badge: 'END FRAME (50%)',
        percentage: 50,
        content: `Drywall and plastering stage: smooth skim-coated gypsum boards mounted on walls and ceiling with taped joints and primer coat applied. Recessed lighting cutouts and HVAC vents cleanly prepared. Subfloor cured and ready for finish flooring. Style/context: ${subCategory}.${customText} Exactly locked room geometry and perspective matching Frame 1 and 2.${actorText} Soft diffused natural daylight, clean architectural lines, no distortions, 8k. --ar 9:16 --v 6.1 --style raw`,
      },
      {
        id: 'foto_4',
        title: 'FOTO 4 — End Frame (75%)',
        badge: 'END FRAME (75%)',
        percentage: 75,
        content: `Finishes installed: warm natural oak wood flooring laid with protective felt paper partially rolled back, walls painted in elegant neutral tones, custom built-in cabinetry and headboard framework securely mounted. Style/context: ${subCategory}.${customText} Same locked camera viewport.${actorText} Warm ambient light fixtures installed, clean modern lines, photorealistic interior craftsmanship, 8k. --ar 9:16 --v 6.1 --style raw`,
      },
      {
        id: 'foto_5',
        title: 'FOTO 5 — Final Frame (100%)',
        badge: 'FINAL FRAME (100%)',
        percentage: 100,
        content: `The completed luxurious aesthetic bedroom/interior fully styled: premium upholstered bed with plush textured linens, soft sheer curtains framing the window, integrated warm LED cove lighting glowing at 3000K, designer bedside table with ceramic lamp and art books, potted fiddle-leaf fig plant. Style/context: ${subCategory}.${customText} Identical camera framing and focal length as the original raw room in Frame 1. Cozy atmospheric interior design magazine photography, hyper-realistic, 8k. --ar 9:16 --v 6.1 --style raw`,
      },
    ];
  }

  // Universal high-precision prompt generator for other categories
  return [
    {
      id: 'foto_1',
      title: 'FOTO 1 — First Frame (0%)',
      badge: 'FIRST FRAME (0%)',
      percentage: 0,
      content: `The absolute initial raw state of ${subCategory}: completely untouched base materials, clean preparatory workstation, guidelines and initial markings laid out with precision.${customText} Fixed locked camera angle, studio/natural balanced illumination, true-to-scale object proportions, crisp outlines, no warping, consistent perspective across all future stages.${actorText} Photorealistic commercial grade photography, 8k, sharp focus. --ar 9:16 --v 6.1 --style raw`,
    },
    {
      id: 'foto_2',
      title: 'FOTO 2 — End Frame (25%)',
      badge: 'END FRAME (25%)',
      percentage: 25,
      content: `Early foundation and rough assembly stage of ${subCategory}: basic primary shapes and initial structural mass established, clean raw textures, precise connection points.${customText} Exactly matching the scale and camera framing of Frame 1.${actorText} Hyper-realistic details, balanced studio lighting, sharp depth of field, 8k. --ar 9:16 --v 6.1 --style raw`,
    },
    {
      id: 'foto_3',
      title: 'FOTO 3 — End Frame (50%)',
      badge: 'END FRAME (50%)',
      percentage: 50,
      content: `The core mid-stage evolution of ${subCategory}: main structure and silhouette clearly defined, primary textures and base colors applied, 50% progression toward final vision.${customText} Locked identical camera position, scale perfectly preserved with zero jumping or distortion.${actorText} Beautiful natural contrast, photorealistic textures, 8k. --ar 9:16 --v 6.1 --style raw`,
    },
    {
      id: 'foto_4',
      title: 'FOTO 4 — End Frame (75%)',
      badge: 'END FRAME (75%)',
      percentage: 75,
      content: `Advanced detailing and refinement stage of ${subCategory}: intricate finishing touches, smooth surface gradients, secondary details fully assembled.${customText} Same locked camera framing and focal distance.${actorText} Cinematic lighting, high-end commercial quality, 8k. --ar 9:16 --v 6.1 --style raw`,
    },
    {
      id: 'foto_5',
      title: 'FOTO 5 — Final Frame (100%)',
      badge: 'FINAL FRAME (100%)',
      percentage: 100,
      content: `The final completed, polished masterpiece of ${subCategory}: flawless execution, rich micro-textures, specular highlights, premium styling and lighting, ready for luxury display.${customText} Exact same camera angle, perspective, and scale established in Frame 1.${actorText} Award-winning commercial photography, 8k, photorealistic, pristine perfection. --ar 9:16 --v 6.1 --style raw`,
    },
  ];
}

// Generate Video Prompts for Kling AI / Luma / Runway Gen-3 / Minimax
export function generateVideoClips(params: {
  category: CategoryId;
  subCategory: string;
  actor: ActorType;
  gender?: ActorGender;
  customNotes?: string;
}): VideoClip[] {
  const { subCategory, actor, gender } = params;

  let actorMotion = '';
  if (actor === 'solo') {
    const gText = gender === 'wanita' ? 'a female worker/creator' : 'a male worker/creator';
    actorMotion = `A fast-moving ${gText} appears intermittently measuring, leveling, and assembling materials, motion-blurred by high speed timelapse.`;
  } else if (actor === 'tim') {
    actorMotion = 'Multiple energetic workers in safety gear move rapidly across the frame with natural hyperlapse motion blur.';
  } else if (actor === 'alat_berat') {
    actorMotion = 'Hydraulic construction machinery operates rapidly in fast motion, moving earth and lifting structural elements.';
  } else {
    actorMotion = 'Clean self-assembling hyperlapse motion with architectural elements seamlessly appearing in place with realistic physics.';
  }

  return [
    {
      id: 'klip_1',
      clipNumber: 1,
      title: 'KLIP 1: Transisi Tahap 0% ke 25% (Groundwork & Substructure)',
      range: '0% ➔ 25%',
      recommendedDuration: '8-10 Detik (Hasil Akhir 2-3s setelah speed ramp)',
      cameraMovement: 'Static Tripod Lock (0 pan, 0 zoom, 0 tilt)',
      prompt: `Hyperlapse timelapse video transitioning smoothly from the empty site marked with survey stakes (0%) to the completed reinforced concrete foundation footings and rebar grid (25%). Style: ${subCategory}. ${actorMotion} Ground soil being excavated in fast motion, gravel spread evenly, rebar cages tied into place, concrete mixer pouring slurry into trenches and footings. Sunlight transitions smoothly across the sky with soft cloud shadows passing by. Camera is rigidly locked on a fixed tripod, eye-level 3/4 angle, zero shake, zero perspective shifting, no morphing or gelatin artifacts. Ultra photorealistic, 4k 60fps cinematic timelapse video, natural motion blur.`,
      tips: 'Gunakan Foto 1 sebagai First Frame (Start Frame) dan Foto 2 sebagai End Frame di Kling AI / Luma Dream Machine.',
    },
    {
      id: 'klip_2',
      clipNumber: 2,
      title: 'KLIP 2: Transisi Tahap 25% ke 50% (Columns, Beams & Floor Slabs)',
      range: '25% ➔ 50%',
      recommendedDuration: '8-10 Detik (Hasil Akhir 2-3s setelah speed ramp)',
      cameraMovement: 'Static Tripod Lock (0 pan, 0 zoom, 0 tilt)',
      prompt: `Fast-paced hyperlapse video transitioning smoothly from the concrete footings (25%) to the fully erected structural frame of concrete columns, beams, and second-story floor slabs (50%). Style: ${subCategory}. ${actorMotion} Wooden and steel formwork shutters rapidly erected around column rebar, concrete pumped into vertical forms, formwork stripped away to reveal cured concrete pillars, scaffolding assembled. Day to afternoon lighting progression, passing clouds. Fixed locked tripod framing, identical perspective, zero scale jumping, crystal clear architectural engineering accuracy, 4k 60fps.`,
      tips: 'Gunakan Foto 2 sebagai First Frame dan Foto 3 sebagai End Frame. Kunci konsistensi tinggi dengan Motion Value 4-5 di Kling.',
    },
    {
      id: 'klip_3',
      clipNumber: 3,
      title: 'KLIP 3: Transisi Tahap 50% ke 75% (Walls, Enclosure & Roof Framing)',
      range: '50% ➔ 75%',
      recommendedDuration: '8-10 Detik (Hasil Akhir 2-3s setelah speed ramp)',
      cameraMovement: 'Static Tripod Lock (0 pan, 0 zoom, 0 tilt)',
      prompt: `High-speed construction hyperlapse transitioning from the open structural skeleton (50%) to the enclosed building with masonry brick walls, scratch plaster coat, and roof truss framing (75%). Style: ${subCategory}. ${actorMotion} Exterior brickwork rapidly stacking course by course, mortar spreading, window framing being mounted into structural openings, roof rafters hoisted and fixed into place. Golden hour lighting shifting into twilight and back to dawn. Rigidly static camera tripod, zero perspective drift, stable geometry, sharp focus, 4k 60fps realistic hyperlapse.`,
      tips: 'Gunakan Foto 3 sebagai First Frame dan Foto 4 sebagai End Frame. Jangan aktifkan kamera zoom agar bangunan tidak melompat.',
    },
    {
      id: 'klip_4',
      clipNumber: 4,
      title: 'KLIP 4: Transisi Tahap 75% ke 100% (Finishing, Glass, Paint & Landscaping)',
      range: '75% ➔ 100%',
      recommendedDuration: '8-10 Detik (Hasil Akhir 2-3s setelah speed ramp)',
      cameraMovement: 'Static Tripod Lock (0 pan, 0 zoom, 0 tilt)',
      prompt: `Breathtaking cinematic timelapse transitioning from the raw enclosed shell (75%) to the completed luxury finished architectural masterpiece (100%). Style: ${subCategory}. ${actorMotion} Exterior walls being spray-painted and clad with architectural wood panels, glass window panes installed reflecting the passing sky, scaffolding removed, landscaping sod and tropical plants planted in fast hyperlapse motion, warm interior and garden lights turning on as dusk falls. Camera remains locked in the exact same position, scale and footprint 100% stable, photorealistic 4k, smooth cinematic speed ramp.`,
      tips: 'Gunakan Foto 4 sebagai First Frame dan Foto 5 sebagai End Frame. Ending klip ini menjadi punchline visual paling memukau!',
    },
  ];
}

export type CategoryId =
  | 'property_building'
  | 'interior_renovation'
  | 'art_mural'
  | 'plant_growth'
  | 'food_baking'
  | 'car_restoration'
  | 'body_transformation'
  | 'deep_cleaning';

export type ActorType = 'tim' | 'solo' | 'alat_berat' | 'otomatis';
export type ActorGender = 'laki_laki' | 'wanita';

export type RoofConstructionType = 'kuda_kuda_kayu' | 'baja_ringan' | 'cor_dak' | 'ikuti_ai';

export type ReferenceStage = '0%' | '50%' | '100%';

export interface CategoryOption {
  id: CategoryId;
  name: string;
  subCategories: string[];
  roofLabel?: string;
  roofOptions?: { id: RoofConstructionType; label: string }[];
  defaultStyle: string;
  defaultNotesPlaceholder: string;
}

export interface PromptFrame {
  id: string;
  title: string;
  badge: string;
  percentage: number;
  content: string;
}

export interface VideoClip {
  id: string;
  clipNumber: number;
  title: string;
  range: string;
  recommendedDuration: string;
  cameraMovement: string;
  prompt: string;
  tips: string;
}

export interface PresetScenario {
  id: string;
  name: string;
  categoryId: CategoryId;
  subCategory: string;
  actorType: ActorType;
  actorGender?: ActorGender;
  roofType?: RoofConstructionType;
  customNotes: string;
  referenceStage: ReferenceStage;
  referenceImage: string;
}

export interface WorkflowStep {
  stepNumber: string;
  title: string;
  subtitle: string;
  tools: string[];
  keyActions: string[];
  proTips: string;
  pitfalls: string;
}

export interface ToolItem {
  name: string;
  category: 'Image Gen' | 'Video Gen' | 'Consistency & Clean' | 'Post-Production';
  costTier: 'Free Trial' | 'Freemium' | 'Berbayar Efisien' | 'Pro';
  recommendedModel: string;
  bestFor: string;
  secretFormula: string;
  efficiencyHack: string;
  aspectRatios: string;
}

export interface TroubleshootingItem {
  id: string;
  problem: string;
  category: 'Frame Bocor' | 'Skala / Perspektif' | 'Flicker & Glitch' | 'Pekerja Hantu' | 'Hemat Credit';
  symptom: string;
  instantFix: string;
  preventionPrompt: string;
  creditCostAvoided: string;
}

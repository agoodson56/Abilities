
import React from 'react';
import { Difficulty, SystemCategory } from './types';

export const SYSTEM_THEMES = {
  [SystemCategory.SECURITY]: 'bg-blue-600',
  [SystemCategory.CABLING]: 'bg-amber-600',
  [SystemCategory.AUDIO_VIDEO]: 'bg-purple-600',
  [SystemCategory.FIRE_LIFE_SAFETY]: 'bg-red-600',
  [SystemCategory.NETWORKING]: 'bg-green-600',
  [SystemCategory.DAS]: 'bg-teal-600',
  [SystemCategory.INTRUSION]: 'bg-orange-600',
};

export const DIFFICULTY_COLORS = {
  [Difficulty.BEGINNER]: 'text-emerald-600 bg-emerald-50',
  [Difficulty.INTERMEDIATE]: 'text-sky-600 bg-sky-50',
  [Difficulty.ADVANCED]: 'text-orange-600 bg-orange-50',
  [Difficulty.EXPERT_JOURNEYMAN]: 'text-rose-600 bg-rose-50',
};

export const DIFFICULTY_ORDER = [
  Difficulty.BEGINNER,
  Difficulty.INTERMEDIATE,
  Difficulty.ADVANCED,
  Difficulty.EXPERT_JOURNEYMAN,
];

export const BRAND_NAME = "3D Technology Services";

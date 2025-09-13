
import type React from 'react';

export type ModelGender = 'pria' | 'wanita';

export interface Vibe {
  id: string;
  name: string;
  prompt: string;
  icon: React.ReactNode;
}

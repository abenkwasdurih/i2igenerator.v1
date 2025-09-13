
import React from 'react';
import type { Vibe } from './types';

const LeafIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);
const BuildingIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>);
const SparklesIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L11 12l2.293 2.293a1 1 0 010 1.414L11 18l-2.293-2.293a1 1 0 010-1.414L11 12l-2.293-2.293a1 1 0 010-1.414L11 3zm7 4l2.293-2.293a1 1 0 000-1.414L18 3l-2.293 2.293a1 1 0 000 1.414L18 9l2.293-2.293a1 1 0 000-1.414L18 7z" /></svg>);
const DiamondIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>);
const FireIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.657 7.343A8 8 0 0117.657 18.657z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.343 17.657a8 8 0 0110.607-10.607L15 10c-1.5 1.5-3 1.5-4.5 0s-1.5-3 0-4.5L14.657 2.343a8 8 0 01-10.607 10.607c1.5-1.5 3-1.5 4.5 0s1.5 3 0 4.5L9.343 17.657z" /></svg>);
const FilmIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" /></svg>);
const ChipIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M9 5h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V7a2 2 0 012-2z" /></svg>);
const HomeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>);
const EmojiHappyIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);
const CompassIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);

export const VIBES: Vibe[] = [
  {
    id: 'minimalist',
    name: 'Minimalist & Clean',
    prompt: 'A minimalist and clean aesthetic. Bright, soft, natural lighting. Simple, uncluttered background, perhaps a solid neutral color or a simple studio setup. Focus on the product\'s form and texture.',
    icon: <SparklesIcon />,
  },
  {
    id: 'urban',
    name: 'Urban & Edgy',
    prompt: 'An urban, edgy vibe. Set in a modern city environment, like graffiti walls, neon-lit streets at night, or brutalist architecture. Dramatic, high-contrast lighting. A confident and cool mood.',
    icon: <BuildingIcon />,
  },
  {
    id: 'natural',
    name: 'Natural & Organic',
    prompt: 'A natural and organic setting. Outdoors in a lush forest, a sunny beach, or a field of flowers. Warm, golden hour lighting. Emphasizes sustainability and connection to nature. Earthy tones.',
    icon: <LeafIcon />,
  },
  {
    id: 'luxury',
    name: 'Luxury & Elegant',
    prompt: 'A luxury and elegant atmosphere. Sophisticated interior, like a modern mansion, a classic ballroom, or with rich textures like marble and silk. Soft, professional studio lighting that highlights quality. Looks expensive and exclusive.',
    icon: <DiamondIcon />,
  },
  {
    id: 'vibrant',
    name: 'Bold & Vibrant',
    prompt: 'A bold, vibrant, and energetic scene. Use of strong, saturated colors and dynamic shapes in the background. Bright, even lighting. Playful and eye-catching mood, full of life.',
    icon: <FireIcon />,
  },
  {
    id: 'vintage',
    name: 'Vintage & Retro',
    prompt: 'A vintage and retro style. Inspired by the 70s or 80s, with period-appropriate colors, patterns, and props. A warm, nostalgic, film-grain look. Lighting could be hazy and dreamlike.',
    icon: <FilmIcon />,
  },
  {
    id: 'futuristic',
    name: 'Futuristic & Tech',
    prompt: 'A futuristic and high-tech setting. Clean lines, metallic surfaces, neon and LED lighting. A sleek, innovative, and cutting-edge mood. Cool color palette with blues, silvers, and purples.',
    icon: <ChipIcon />,
  },
  {
    id: 'cozy',
    name: 'Cozy & Warm',
    prompt: 'A cozy and warm, inviting atmosphere. Like a comfortable living room with a fireplace, a soft blanket, or a warm cup of coffee. Soft, warm lighting. Creates a feeling of comfort and relaxation.',
    icon: <HomeIcon />,
  },
  {
    id: 'playful',
    name: 'Playful & Fun',
    prompt: 'A playful and fun scene. Use of whimsical props, confetti, or unexpected elements. Bright and cheerful lighting. A lighthearted, joyful, and spontaneous mood.',
    icon: <EmojiHappyIcon />,
  },
  {
    id: 'adventurous',
    name: 'Adventurous & Rugged',
    prompt: 'An adventurous and rugged outdoor setting. On a mountaintop, in a desert, or during a hike. Dynamic, natural sunlight, possibly during sunrise or sunset. A mood of exploration, durability, and freedom.',
    icon: <CompassIcon />,
  },
];

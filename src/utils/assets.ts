// Curated watercolor illustrations and SVG graphics for Bhaavabot

export const ASSETS = {
  // Avatar for Bhaavabot and header
  avatar: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
      <defs>
        <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#E8F4D9"/>
          <stop offset="70%" stop-color="#C5DEAB"/>
          <stop offset="100%" stop-color="#93B874"/>
        </radialGradient>
        <linearGradient id="leafGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#80A64C"/>
          <stop offset="100%" stop-color="#4C7026"/>
        </linearGradient>
        <radialGradient id="faceGrad" cx="45%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#FFFDF7"/>
          <stop offset="85%" stop-color="#F2E8CE"/>
          <stop offset="100%" stop-color="#E2D0A7"/>
        </radialGradient>
      </defs>
      <!-- Background Halo -->
      <circle cx="50" cy="50" r="48" fill="url(#bgGrad)" stroke="#749649" stroke-width="2"/>
      
      <!-- Forest Crown Leaves -->
      <path d="M50 14 C40 8 28 20 38 28 C45 22 50 14 50 14 Z" fill="url(#leafGrad)"/>
      <path d="M50 14 C60 8 72 20 62 28 C55 22 50 14 50 14 Z" fill="url(#leafGrad)"/>
      <path d="M50 8 C46 2 54 2 50 8 Z" fill="#6A8F36"/>
      <circle cx="34" cy="26" r="3.5" fill="#EE7960"/>
      <circle cx="66" cy="26" r="3.5" fill="#F4A261"/>
      <circle cx="50" cy="18" r="2.5" fill="#E9C46A"/>

      <!-- Spirit Head / Body -->
      <ellipse cx="50" cy="54" rx="28" ry="26" fill="url(#faceGrad)"/>
      
      <!-- Rosy Cheeks -->
      <circle cx="36" cy="58" r="5" fill="#EE7960" opacity="0.35"/>
      <circle cx="64" cy="58" r="5" fill="#EE7960" opacity="0.35"/>
      
      <!-- Gentle Eyes -->
      <ellipse cx="40" cy="50" rx="2.5" ry="3.5" fill="#314421"/>
      <circle cx="41" cy="48.5" r="1" fill="#FFFFFF"/>
      <ellipse cx="60" cy="50" rx="2.5" ry="3.5" fill="#314421"/>
      <circle cx="61" cy="48.5" r="1" fill="#FFFFFF"/>
      
      <!-- Peaceful Smile -->
      <path d="M46 58 Q50 63 54 58" fill="none" stroke="#314421" stroke-width="2" stroke-linecap="round"/>
      
      <!-- Sprout antenna -->
      <path d="M50 28 Q50 18 45 15 Q43 14 47 13 Q53 14 50 28" fill="#5F832B"/>
      
      <!-- Small Clover in hands -->
      <path d="M46 72 Q50 70 54 72" stroke="#688A3B" stroke-width="3" fill="none" stroke-linecap="round"/>
      <circle cx="50" cy="70" r="3" fill="#88B849"/>
    </svg>
  `) }`,

  // Postcard 1: Pine Forest Sunlit Path
  pineForest: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80',
  
  // Postcard 2: Rainy Afternoon Window
  rainyWindow: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=1000&q=80',

  // Postcard 3: Cozy Fireplace & Cat
  hearthFire: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80',

  // Meadow landscape for Home background
  meadowLandscape: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85',

  // Window with gramophone art fallback / illustration
  windowGramophone: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1000&q=80',
};

// Custom SVG Stamps
export const SVG_STAMPS = {
  pineTree: (color = "#4D6B35", value = "20¢") => `
    <svg viewBox="0 0 70 85" width="48" height="58" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="64" height="79" rx="4" fill="#F8FAF4" stroke="${color}" stroke-width="1.5" stroke-dasharray="3,2.5"/>
      <rect x="7" y="7" width="56" height="71" fill="#EDF3E6"/>
      <!-- Pine tree art -->
      <polygon points="35,16 23,32 47,32" fill="${color}"/>
      <polygon points="35,27 20,44 50,44" fill="${color}"/>
      <polygon points="35,39 17,58 53,58" fill="${color}"/>
      <rect x="32" y="58" width="6" height="8" fill="#755230"/>
      <!-- Value text -->
      <text x="35" y="73" font-family="'Newsreader', serif" font-size="9" font-weight="bold" fill="${color}" text-anchor="middle">${value}</text>
    </svg>
  `,
  raindrop: (color = "#4C758F", value = "15¢") => `
    <svg viewBox="0 0 70 85" width="48" height="58" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="64" height="79" rx="4" fill="#F4F8FA" stroke="${color}" stroke-width="1.5" stroke-dasharray="3,2.5"/>
      <rect x="7" y="7" width="56" height="71" fill="#E6EEF3"/>
      <!-- Droplet art -->
      <path d="M35 18 C35 18 20 38 20 48 C20 57 26.7 62 35 62 C43.3 62 50 57 50 48 C50 38 35 18 35 18 Z" fill="${color}"/>
      <ellipse cx="30" cy="46" rx="3.5" ry="6" fill="#FFFFFF" opacity="0.4" transform="rotate(-25 30 46)"/>
      <!-- Value text -->
      <text x="35" y="73" font-family="'Newsreader', serif" font-size="9" font-weight="bold" fill="${color}" text-anchor="middle">${value}</text>
    </svg>
  `,
  hearthFire: (color = "#995838", value = "30¢") => `
    <svg viewBox="0 0 70 85" width="48" height="58" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="64" height="79" rx="4" fill="#FAF5F0" stroke="${color}" stroke-width="1.5" stroke-dasharray="3,2.5"/>
      <rect x="7" y="7" width="56" height="71" fill="#F4E9DF"/>
      <!-- Fireplace / Hearth art -->
      <path d="M22 60 L22 32 Q35 24 48 32 L48 60 Z" fill="none" stroke="${color}" stroke-width="2"/>
      <path d="M28 58 Q35 34 42 58 Z" fill="#EE7960"/>
      <path d="M32 58 Q35 44 38 58 Z" fill="#F4A261"/>
      <line x1="18" y1="60" x2="52" y2="60" stroke="${color}" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Value text -->
      <text x="35" y="73" font-family="'Newsreader', serif" font-size="9" font-weight="bold" fill="${color}" text-anchor="middle">${value}</text>
    </svg>
  `,
};

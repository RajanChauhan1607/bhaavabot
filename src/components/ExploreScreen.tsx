import React, { useState } from 'react';
import { Play, PlayCircle, Sparkles, Clock, Compass } from 'lucide-react';
import { PostcardItem, SoundType } from '../types';
import { ASSETS } from '../utils/assets';
import { PostcardExperienceModal } from './PostcardExperienceModal';

export const POSTCARDS: PostcardItem[] = [
  {
    id: 'path-pines',
    expNumber: 'EXP. 01',
    title: 'The Path through the Pines',
    description:
      'A gentle breeze carries the scent of pine needles as you walk along an ancient, sun-dappled trail...',
    stampIcon: 'pine',
    stampValue: '20¢',
    stampColor: '#4A6B32',
    image: ASSETS.pineForest,
    ambientType: 'wind',
    durationMinutes: 3,
    storyLines: [
      'You step onto the soft carpet of dried pine needles.',
      'The morning sun filters through tall evergreens in warm, golden beams.',
      'A cool mountain breeze whispers through the canopy above.',
      'Inhale the crisp, grounding scent of cedar, pine, and damp earth.',
      'Here on the sunlit trail, there is nowhere else you need to be.',
    ],
  },
  {
    id: 'rainy-afternoon',
    expNumber: 'EXP. 02',
    title: 'A Rainy Afternoon',
    description:
      'Listen to the rhythmic tapping of rain against the glass while safely ensconced in a cozy room.',
    stampIcon: 'rain',
    stampValue: '15¢',
    stampColor: '#3B6885',
    image: ASSETS.rainyWindow,
    ambientType: 'rain',
    durationMinutes: 4,
    storyLines: [
      'Raindrops tap a gentle, soothing rhythm against the windowpane.',
      'Outside, the hills drink deeply from the grey mist and cool shower.',
      'You are warm and safe inside, wrapped in quiet comfort.',
      'Let each falling droplet wash away a thought that no longer serves you.',
      'Rest in the steady, patient rhythm of the passing storm.',
    ],
  },
  {
    id: 'evening-hearth',
    expNumber: 'EXP. 03',
    title: 'Evening by the Hearth',
    description:
      'The comforting crackle of firewood and the warm glow of embers invite you to simply rest.',
    stampIcon: 'hearth',
    stampValue: '30¢',
    stampColor: '#8C4B29',
    image: ASSETS.hearthFire,
    ambientType: 'hearth',
    durationMinutes: 3,
    storyLines: [
      'A gentle fire crackles softly in the stone hearth.',
      'The cat slumbers peacefully on the warm woven rug.',
      'Golden embers pulse with a steady, quiet warmth.',
      'Feel the tension melt from your shoulders as warmth fills the room.',
      'The day is finished. You may gently let go and rest.',
    ],
  },
  {
    id: 'starlit-meadow',
    expNumber: 'EXP. 04',
    title: 'Starlit Meadow Sanctuary',
    description:
      'Bask in the quiet glow of fireflies dancing across clover under a crystal starry sky.',
    stampIcon: 'pine',
    stampValue: '25¢',
    stampColor: '#53457D',
    image: ASSETS.meadowLandscape,
    ambientType: 'cicadas',
    durationMinutes: 3,
    storyLines: [
      'The twilight deepens into a velvet indigo sky.',
      'Tiny fireflies blink like friendly stars around your feet.',
      'The cool night breeze brings the sweet fragrance of night-blooming jasmine.',
      'Look up into the vast, quiet universe that holds you safely.',
      'Rest under the ancient starlight and breathe in pure peace.',
    ],
  },
];

interface ExploreScreenProps {
  onPlaySound: (type: SoundType) => void;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({ onPlaySound }) => {
  const [selectedPostcard, setSelectedPostcard] = useState<PostcardItem | null>(null);

  const handleOpenExperience = (postcard: PostcardItem) => {
    setSelectedPostcard(postcard);
    onPlaySound(postcard.ambientType);
  };

  return (
    <div
      id="explore-screen"
      className="min-h-[calc(100vh-60px)] pb-28 pt-4 px-4 sm:px-6 max-w-md mx-auto relative bg-[#FBF8F1]"
    >
      {/* Title & Subtitle (Matches Image 7) */}
      <div className="text-center mb-7 pt-2">
        <h1
          id="postcards-title"
          className="font-display italic text-3xl sm:text-4xl font-bold text-[#1F3314] tracking-tight mb-2"
        >
          Postcards from Memory
        </h1>
        <p
          id="postcards-subtitle"
          className="text-xs sm:text-sm text-[#5B714D] font-normal leading-relaxed max-w-xs mx-auto text-balance"
        >
          Select a serene moment to immerse yourself in. Each postcard holds a unique, tranquil
          experience.
        </p>
      </div>

      {/* Postcards Stack */}
      <div className="space-y-6">
        {POSTCARDS.map((postcard) => (
          <div
            key={postcard.id}
            id={`postcard-card-${postcard.id}`}
            onClick={() => handleOpenExperience(postcard)}
            className="bg-white rounded-2xl sm:rounded-3xl border border-[#E4DEC9] shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer group"
          >
            {/* Postcard Painting with Vintage Postage Stamp */}
            <div className="relative w-full h-44 sm:h-50 bg-[#E8F0DF] overflow-hidden">
              {/* Watercolor Artwork Rendering */}
              {postcard.id === 'path-pines' && (
                <svg
                  viewBox="0 0 400 200"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="forestSky" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="#E1EEFA"/>
                      <stop offset="100%" stop-color="#F7F3E2"/>
                    </linearGradient>
                  </defs>
                  <rect width="400" height="200" fill="url(#forestSky)"/>
                  {/* Sunbeams */}
                  <polygon points="120,0 200,0 290,200 170,200" fill="#FFFCE6" opacity="0.35"/>
                  <polygon points="220,0 280,0 360,200 280,200" fill="#FFFCE6" opacity="0.25"/>
                  {/* Distant Hills & Forest */}
                  <ellipse cx="200" cy="140" rx="220" ry="60" fill="#88B264" opacity="0.7"/>
                  <ellipse cx="100" cy="150" rx="140" ry="50" fill="#699446" opacity="0.8"/>
                  {/* Sunlit Trail */}
                  <path d="M190 120 Q200 150 230 200 L160 200 Q180 150 190 120 Z" fill="#D7BE93"/>
                  {/* Ancient Tall Pine Trees */}
                  <polygon points="60,30 35,90 85,90" fill="#3D5F23"/>
                  <polygon points="60,70 30,130 90,130" fill="#2E4D18"/>
                  <polygon points="60,110 25,170 95,170" fill="#243F13"/>
                  <rect x="54" y="160" width="12" height="40" fill="#54371C"/>

                  <polygon points="130,50 110,100 150,100" fill="#4B702D"/>
                  <polygon points="130,85 105,135 155,135" fill="#3B5D21"/>
                  <rect x="126" y="130" width="8" height="60" fill="#54371C"/>

                  <polygon points="320,25 290,95 350,95" fill="#37571E"/>
                  <polygon points="320,75 280,140 360,140" fill="#2A4515"/>
                  <polygon points="320,120 275,185 365,185" fill="#1F350E"/>
                  <rect x="313" y="170" width="14" height="30" fill="#4A3119"/>

                  {/* Ferns on path border */}
                  <circle cx="150" cy="180" r="15" fill="#75A448" opacity="0.8"/>
                  <circle cx="250" cy="185" r="18" fill="#649139" opacity="0.8"/>
                </svg>
              )}

              {postcard.id === 'rainy-afternoon' && (
                <svg
                  viewBox="0 0 400 200"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="rainSky" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="#BBCEDD"/>
                      <stop offset="60%" stop-color="#D7E4E9"/>
                      <stop offset="100%" stop-color="#C9DBC2"/>
                    </linearGradient>
                  </defs>
                  <rect width="400" height="200" fill="url(#rainSky)"/>
                  <ellipse cx="200" cy="160" rx="240" ry="70" fill="#7FA86D" opacity="0.75"/>
                  {/* Rain streaks */}
                  {Array.from({ length: 25 }).map((_, i) => (
                    <line
                      key={i}
                      x1={(i * 18) % 400}
                      y1={((i * 23) % 150)}
                      x2={((i * 18) % 400) - 10}
                      y2={((i * 23) % 150) + 35}
                      stroke="#FFFFFF"
                      stroke-width="1.2"
                      opacity="0.4"
                    />
                  ))}
                  {/* Open Window Frame */}
                  <rect x="15" y="10" width="370" height="180" fill="none" stroke="#685038" stroke-width="8" rx="2"/>
                  <line x1="200" y1="10" x2="200" y2="190" stroke="#685038" stroke-width="6"/>
                  <line x1="15" y1="100" x2="385" y2="100" stroke="#685038" stroke-width="5"/>
                  {/* Teapot & little potted plant */}
                  <ellipse cx="140" cy="180" rx="10" ry="9" fill="#EAE5D8" stroke="#7A6854"/>
                  <circle cx="80" cy="175" r="12" fill="#B35F42"/>
                  <circle cx="80" cy="165" r="8" fill="#5F883B"/>
                </svg>
              )}

              {postcard.id === 'evening-hearth' && (
                <svg
                  viewBox="0 0 400 200"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="roomBg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="#473228"/>
                      <stop offset="100%" stop-color="#2D1F18"/>
                    </linearGradient>
                    <radialGradient id="fireGlow" cx="50%" cy="65%" r="60%">
                      <stop offset="0%" stop-color="#FFC15E" stop-opacity="0.9"/>
                      <stop offset="40%" stop-color="#E86C3F" stop-opacity="0.6"/>
                      <stop offset="100%" stop-color="#473228" stop-opacity="0"/>
                    </radialGradient>
                  </defs>
                  <rect width="400" height="200" fill="url(#roomBg)"/>
                  <rect width="400" height="200" fill="url(#fireGlow)"/>

                  {/* Stone Fireplace */}
                  <g transform="translate(140, 45)">
                    <rect x="0" y="0" width="120" height="120" fill="#695346" rx="4"/>
                    <rect x="15" y="25" width="90" height="85" fill="#1C1410" rx="3"/>
                    <path d="M15 50 Q60 25 105 50 L105 110 L15 110 Z" fill="#17100D"/>
                    {/* Glowing Logs & Flames */}
                    <rect x="30" y="90" width="60" height="14" fill="#3D2619" rx="3"/>
                    <polygon points="60,45 42,95 78,95" fill="#F49E42"/>
                    <polygon points="60,55 48,95 72,95" fill="#FFE885"/>
                    <polygon points="45,65 35,95 55,95" fill="#E85D3B"/>
                    <polygon points="75,65 65,95 85,95" fill="#E85D3B"/>
                  </g>

                  {/* Cozy Armchair */}
                  <g transform="translate(280, 80)">
                    <rect x="0" y="30" width="65" height="50" fill="#84523A" rx="6"/>
                    <ellipse cx="32" cy="30" rx="30" ry="12" fill="#9E684E"/>
                    <rect x="-8" y="20" width="16" height="50" fill="#6D412D" rx="4"/>
                    <rect x="58" y="20" width="16" height="50" fill="#6D412D" rx="4"/>
                  </g>

                  {/* Sleeping Cat on Rug */}
                  <g transform="translate(170, 160)">
                    <ellipse cx="30" cy="15" rx="35" ry="12" fill="#A88B69" opacity="0.6"/>
                    <ellipse cx="30" cy="12" rx="14" ry="9" fill="#E28945"/>
                    <circle cx="20" cy="10" r="6" fill="#E28945"/>
                    <polygon points="17,5 19,0 22,5" fill="#9C4F1A"/>
                    <polygon points="21,5 23,0 25,5" fill="#9C4F1A"/>
                  </g>
                </svg>
              )}

              {postcard.id === 'starlit-meadow' && (
                <svg
                  viewBox="0 0 400 200"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="nightSky" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="#12182E"/>
                      <stop offset="60%" stop-color="#1D2A4D"/>
                      <stop offset="100%" stop-color="#2D4645"/>
                    </linearGradient>
                  </defs>
                  <rect width="400" height="200" fill="url(#nightSky)"/>
                  <circle cx="80" cy="50" r="22" fill="#FFFCE6"/>
                  <circle cx="87" cy="46" r="19" fill="#1D2A4D"/>
                  {/* Stars */}
                  {Array.from({ length: 30 }).map((_, i) => (
                    <circle
                      key={i}
                      cx={(i * 37) % 390 + 5}
                      cy={(i * 19) % 110 + 5}
                      r={(i % 3) * 0.6 + 0.8}
                      fill="#FFFFFF"
                      opacity={(i % 5) * 0.15 + 0.4}
                    />
                  ))}
                  {/* Hills & glowing fireflies */}
                  <path d="M0 130 Q120 90 250 140 T400 130 L400 200 L0 200 Z" fill="#15261F"/>
                  <circle cx="120" cy="155" r="3" fill="#D6F88E" opacity="0.9"/>
                  <circle cx="210" cy="140" r="3.5" fill="#D6F88E" opacity="0.95"/>
                  <circle cx="310" cy="160" r="3" fill="#D6F88E" opacity="0.9"/>
                </svg>
              )}

              {/* Vintage Postage Stamp (Top-Right of Painting) */}
              <div className="absolute top-3 right-3 z-10 drop-shadow-md">
                <div
                  className="bg-[#F8FAF4] px-2 py-1.5 rounded-sm border border-dashed border-[#A1B898] flex flex-col items-center justify-center min-w-[42px]"
                  style={{
                    backgroundColor: '#F7FAF3',
                    borderWidth: '1.5px',
                  }}
                >
                  <span className="text-[9px] font-mono font-bold tracking-tighter text-[#375225]">
                    POST
                  </span>
                  <div className="w-4 h-4 my-0.5 flex items-center justify-center text-[#4A6D30]">
                    {postcard.stampIcon === 'rain' ? (
                      <span className="text-xs">💧</span>
                    ) : postcard.stampIcon === 'hearth' ? (
                      <span className="text-xs">🔥</span>
                    ) : (
                      <span className="text-xs">🌲</span>
                    )}
                  </div>
                  <span className="text-[10px] font-serif font-bold text-[#375225]">
                    {postcard.stampValue}
                  </span>
                </div>
              </div>

              {/* Scalloped Decorative Bottom Edge (Exact match to Image 7) */}
              <div className="absolute -bottom-1 left-0 right-0 h-3 flex overflow-hidden">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={i} className="w-5 h-4 -mt-2 rounded-full bg-white shrink-0"></div>
                ))}
              </div>
            </div>

            {/* Postcard Body Content */}
            <div className="p-4 sm:p-5">
              <h3
                id={`postcard-title-${postcard.id}`}
                className="font-display italic text-xl sm:text-2xl font-bold text-[#1C3212] tracking-tight mb-2 group-hover:text-[#385C22] transition-colors"
              >
                {postcard.title}
              </h3>

              <p className="text-xs sm:text-[13px] text-[#556D47] font-normal leading-relaxed mb-4">
                {postcard.description}
              </p>

              {/* Footer: EXP Tag and Green Play Button */}
              <div className="flex items-center justify-between pt-1 border-t border-[#EFE9DB]">
                <span className="text-[11px] font-mono tracking-wider font-semibold text-[#738B67]">
                  {postcard.expNumber}
                </span>

                <button
                  id={`play-postcard-btn-${postcard.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenExperience(postcard);
                  }}
                  className="text-[#4E752D] group-hover:text-[#3A5A1F] group-hover:scale-110 active:scale-95 transition-all p-1"
                  title="Begin Tranquil Experience"
                >
                  <PlayCircle className="w-7 h-7 stroke-[1.8] fill-[#EDF4E7]" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Immersive Experience Modal */}
      {selectedPostcard && (
        <PostcardExperienceModal
          postcard={selectedPostcard}
          onClose={() => setSelectedPostcard(null)}
        />
      )}
    </div>
  );
};

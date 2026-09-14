import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Droplets,
  Sun,
  Wind,
  Flame,
  Waves,
  ListMusic,
  Trees,
  Volume2,
} from 'lucide-react';
import { SoundTrack, SoundType } from '../types';
import { natureAudio } from '../utils/audioEngine';

interface RhythmScreenProps {
  currentTrackId: string;
  isPlaying: boolean;
  onTrackChange: (track: SoundTrack) => void;
  onTogglePlay: () => void;
}

export const SOUND_TRACKS: SoundTrack[] = [
  {
    id: 'rain-forest',
    title: 'Rain in the Forest',
    subtitle: 'Gentle patter on broad leaves',
    recordSubtitle: 'ST - Rain over Whispering Pines',
    type: 'rain',
    duration: 330, // 5:30
    iconBg: 'bg-[#E0EFF8]',
    iconColor: 'text-[#2D739B]',
    description: 'Soft raindrops falling through lush green canopy.',
  },
  {
    id: 'summer-cicadas',
    title: 'Summer Cicadas',
    subtitle: 'Midday in the Valley',
    recordSubtitle: 'ST - Town with an Ocean View',
    type: 'cicadas',
    duration: 330, // 5:30
    iconBg: 'bg-[#7EA449]',
    iconColor: 'text-[#1D3609]',
    description: 'Warm rhythmic chorus of valley cicadas in the noon sun.',
  },
  {
    id: 'ocean-breeze',
    title: 'Ocean Breeze',
    subtitle: 'Distant waves and coastal air',
    recordSubtitle: 'ST - Coastal Hillside Breeze',
    type: 'ocean',
    duration: 330, // 5:30
    iconBg: 'bg-[#FDE8E3]',
    iconColor: 'text-[#D36047]',
    description: 'Rhythmic rolling surf washing over sunlit sands.',
  },
  {
    id: 'babbling-brook',
    title: 'Babbling Brook',
    subtitle: 'Clear water over smooth pebbles',
    recordSubtitle: 'ST - Meadow Stream Symphony',
    type: 'stream',
    duration: 330,
    iconBg: 'bg-[#E3F5F0]',
    iconColor: 'text-[#2E8B75]',
    description: 'A cool, pure mountain stream trickling through wildflowers.',
  },
  {
    id: 'evening-hearth',
    title: 'Evening Hearth',
    subtitle: 'Gentle crackle of firewood & embers',
    recordSubtitle: 'ST - Hearthside Slumber',
    type: 'hearth',
    duration: 330,
    iconBg: 'bg-[#FAECE0]',
    iconColor: 'text-[#C86427]',
    description: 'Comforting warmth of a crackling fire on a quiet evening.',
  },
  {
    id: 'wind-pines',
    title: 'Wind in the Pines',
    subtitle: 'Soft whispers through ancient needles',
    recordSubtitle: 'ST - Mountain Ridge Canopy',
    type: 'wind',
    duration: 330,
    iconBg: 'bg-[#E8F0DC]',
    iconColor: 'text-[#486E2A]',
    description: 'A gentle mountain breeze rustling the ancient pine canopy.',
  },
];

export const RhythmScreen: React.FC<RhythmScreenProps> = ({
  currentTrackId,
  isPlaying,
  onTrackChange,
  onTogglePlay,
}) => {
  const [currentSeconds, setCurrentSeconds] = useState(105); // 1:45 default from screenshot
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(true);

  const activeTrack =
    SOUND_TRACKS.find((t) => t.id === currentTrackId) || SOUND_TRACKS[1];

  // Track playback time progress simulation
  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSeconds((prev) => {
          if (prev >= activeTrack.duration) {
            if (isRepeat) return 0;
            return activeTrack.duration;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, activeTrack.duration, isRepeat]);

  const formatTime = (totalSec: number) => {
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setCurrentSeconds(val);
  };

  const handleNext = () => {
    const currentIndex = SOUND_TRACKS.findIndex((t) => t.id === activeTrack.id);
    let nextIndex = 0;
    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * SOUND_TRACKS.length);
    } else {
      nextIndex = (currentIndex + 1) % SOUND_TRACKS.length;
    }
    onTrackChange(SOUND_TRACKS[nextIndex]);
    setCurrentSeconds(0);
  };

  const handlePrev = () => {
    const currentIndex = SOUND_TRACKS.findIndex((t) => t.id === activeTrack.id);
    const prevIndex = (currentIndex - 1 + SOUND_TRACKS.length) % SOUND_TRACKS.length;
    onTrackChange(SOUND_TRACKS[prevIndex]);
    setCurrentSeconds(0);
  };

  const getTrackIcon = (type: SoundType, customClass = 'w-5 h-5') => {
    switch (type) {
      case 'rain':
        return <Droplets className={customClass} />;
      case 'cicadas':
        return <Sun className={customClass} />;
      case 'ocean':
        return <Waves className={customClass} />;
      case 'stream':
        return <Droplets className={customClass} />;
      case 'hearth':
        return <Flame className={customClass} />;
      case 'wind':
        return <Wind className={customClass} />;
      default:
        return <Trees className={customClass} />;
    }
  };

  return (
    <div
      id="rhythm-screen"
      className="min-h-[calc(100vh-60px)] pb-28 pt-3 px-4 sm:px-6 max-w-md mx-auto relative bg-[#FBF8F1]"
    >
      {/* Top Now Playing Player Card (Matches Image 3) */}
      <div
        id="soundscape-player-card"
        className="bg-white rounded-3xl border border-[#E5DECD] shadow-lg overflow-hidden mb-6 relative transition-all duration-300"
      >
        {/* Watercolor Window Scene with Gramophone */}
        <div className="relative w-full h-56 sm:h-64 bg-[#EAF2E5] overflow-hidden">
          <svg
            viewBox="0 0 400 280"
            className="w-full h-full object-cover"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="windowSky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#CFE5F8"/>
                <stop offset="50%" stop-color="#E8F4EC"/>
                <stop offset="100%" stop-color="#DAECCE"/>
              </linearGradient>
              <linearGradient id="woodFrame" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#CBB391"/>
                <stop offset="100%" stop-color="#8F6B43"/>
              </linearGradient>
            </defs>

            {/* Outdoor View */}
            <rect width="400" height="280" fill="url(#windowSky)"/>
            {/* Soft rolling hills outside */}
            <ellipse cx="120" cy="180" rx="190" ry="70" fill="#9BC378" opacity="0.8"/>
            <ellipse cx="300" cy="185" rx="160" ry="60" fill="#88B463" opacity="0.85"/>
            <circle cx="280" cy="80" r="45" fill="#FFF8DC" opacity="0.5"/>

            {/* Distant cottage & trees */}
            <polygon points="170,140 185,128 200,140" fill="#B4654F"/>
            <rect x="175" y="140" width="20" height="15" fill="#EAE2CE"/>

            {/* Potted plants on sill */}
            <circle cx="340" cy="170" r="14" fill="#C8724F"/>
            <path d="M330 160 Q340 135 345 155 Q355 138 350 162" stroke="#486F28" stroke-width="2.5" fill="none"/>

            {/* Cozy Teapot on sill */}
            <ellipse cx="270" cy="188" rx="9" ry="8" fill="#F0EBE0" stroke="#C5BAA2"/>
            <path d="M260 188 Q255 183 260 178" stroke="#C5BAA2" stroke-width="2" fill="none"/>

            {/* Wooden Window Frame (French opening style) */}
            <rect x="10" y="0" width="18" height="280" fill="url(#woodFrame)"/>
            <rect x="372" y="0" width="18" height="280" fill="url(#woodFrame)"/>
            <rect x="10" y="0" width="380" height="18" fill="url(#woodFrame)"/>
            {/* Open Right Shutter */}
            <polygon points="260,20 370,10 370,240 260,225" fill="#EAE2D2" stroke="#8F6B43" stroke-width="3"/>
            <line x1="315" y1="15" x2="315" y2="232" stroke="#8F6B43" stroke-width="2"/>
            <line x1="260" y1="90" x2="370" y2="85" stroke="#8F6B43" stroke-width="2"/>
            <line x1="260" y1="160" x2="370" y2="155" stroke="#8F6B43" stroke-width="2"/>

            {/* Wooden Window Sill Table */}
            <rect x="0" y="195" width="400" height="85" fill="#BFA37E"/>
            <line x1="0" y1="195" x2="400" y2="195" stroke="#7A5832" stroke-width="3"/>

            {/* Vintage Turntable / Record Player on Window Sill */}
            <g transform="translate(45, 125)">
              {/* Wooden Turntable Box */}
              <rect x="0" y="45" width="165" height="55" rx="5" fill="#8B572A" stroke="#5E3816" stroke-width="2"/>
              <rect x="8" y="52" width="150" height="40" fill="#A77242" rx="3"/>
              {/* Open Lid */}
              <polygon points="0,45 15,0 150,0 165,45" fill="#75451D" stroke="#502F12" stroke-width="2" opacity="0.9"/>
              {/* Turntable Platter & Vinyl Record */}
              <ellipse cx="78" cy="48" rx="46" ry="18" fill="#1C1C1C" stroke="#333333" stroke-width="1.5"/>
              <ellipse cx="78" cy="48" rx="16" ry="6" fill="#C79654"/>
              <circle cx="78" cy="48" r="2" fill="#EAEAEA"/>
              {/* Tonearm */}
              <line x1="135" y1="40" x2="105" y2="48" stroke="#D1B27B" stroke-width="3" stroke-linecap="round"/>
              <circle cx="135" cy="40" r="4" fill="#694625"/>
              {/* Knobs */}
              <circle cx="35" cy="78" r="4" fill="#D1B27B"/>
              <circle cx="55" cy="78" r="4" fill="#D1B27B"/>
              {/* Speaker Grille slats */}
              <line x1="90" y1="72" x2="145" y2="72" stroke="#502F12" stroke-width="2"/>
              <line x1="90" y1="78" x2="145" y2="78" stroke="#502F12" stroke-width="2"/>
              <line x1="90" y1="84" x2="145" y2="84" stroke="#502F12" stroke-width="2"/>
            </g>

            {/* Overlaid Subtle Track Subtitle Tag on Painting */}
            <text
              x="20"
              y="265"
              font-family="'Plus Jakarta Sans', sans-serif"
              font-size="11"
              font-weight="600"
              fill="#FFFFFF"
              opacity="0.85"
            >
              {activeTrack.recordSubtitle || 'ST - Town with an Ocean View'}
            </text>
          </svg>

          {/* Decorative Scalloped Bottom Edge for Card (Exact match to Image 3) */}
          <div className="absolute -bottom-1 left-0 right-0 h-4 flex overflow-hidden">
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                className="w-5 h-5 -mt-2.5 rounded-full bg-white shrink-0"
              ></div>
            ))}
          </div>
        </div>

        {/* Audio Player Controls Section */}
        <div className="p-5 sm:p-6 text-center">
          {/* NOW PLAYING Subtitle */}
          <span className="text-[11px] font-bold tracking-widest text-[#577933] uppercase inline-block mb-1">
            NOW PLAYING
          </span>

          {/* Track Title */}
          <h2
            id="current-track-title"
            className="font-display text-2xl sm:text-3xl font-bold text-[#1F3314] tracking-tight mb-0.5"
          >
            {activeTrack.title}
          </h2>

          {/* Track Subtitle */}
          <p
            id="current-track-subtitle"
            className="text-xs sm:text-sm text-[#617751] font-normal mb-5"
          >
            {activeTrack.subtitle}
          </p>

          {/* Audio Scrub Bar & Timestamps */}
          <div className="space-y-1.5 mb-6 px-1">
            <div className="relative flex items-center">
              <input
                id="audio-scrub-slider"
                type="range"
                min="0"
                max={activeTrack.duration}
                value={currentSeconds}
                onChange={handleSeek}
                className="w-full h-1.5 bg-[#E4DEC9] rounded-lg appearance-none cursor-pointer accent-[#759B46]"
                style={{
                  background: `linear-gradient(to right, #7DA347 0%, #7DA347 ${
                    (currentSeconds / activeTrack.duration) * 100
                  }%, #E5DFD0 ${(currentSeconds / activeTrack.duration) * 100}%, #E5DFD0 100%)`,
                }}
              />
            </div>
            <div className="flex justify-between text-xs text-[#708462] font-mono px-0.5">
              <span>{formatTime(currentSeconds)}</span>
              <span>{formatTime(activeTrack.duration)}</span>
            </div>
          </div>

          {/* Main Media Controls Row */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 mb-2">
            {/* Previous */}
            <button
              id="audio-prev-btn"
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-[#F4EFE2] hover:bg-[#EAE2D0] active:scale-95 text-[#375225] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
              title="Previous Track"
            >
              <SkipBack className="w-5 h-5 fill-current" />
            </button>

            {/* Play / Pause Main Circle */}
            <button
              id="audio-play-pause-btn"
              onClick={onTogglePlay}
              className="w-15 h-15 rounded-full bg-[#486C27] hover:bg-[#3D5C20] active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer shadow-md shadow-[#486C27]/30"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-7 h-7 fill-white text-white stroke-[2.5]" />
              ) : (
                <Play className="w-7 h-7 fill-white text-white ml-0.5 stroke-[2.5]" />
              )}
            </button>

            {/* Next */}
            <button
              id="audio-next-btn"
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-[#F4EFE2] hover:bg-[#EAE2D0] active:scale-95 text-[#375225] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
              title="Next Track"
            >
              <SkipForward className="w-5 h-5 fill-current" />
            </button>
          </div>

          {/* Secondary shuffle & repeat row */}
          <div className="flex justify-between items-center text-[#7F9572] px-4 pt-2">
            <button
              id="shuffle-toggle-btn"
              onClick={() => setIsShuffle(!isShuffle)}
              className={`p-1.5 rounded-full transition-colors ${
                isShuffle ? 'text-[#486C27] bg-[#EAF2DE]' : 'hover:text-[#3B5424]'
              }`}
              title="Shuffle"
            >
              <Shuffle className="w-4 h-4" />
            </button>

            <span className="text-[11px] text-[#7E9371]">Lo-Fi Organic Synthesizer</span>

            <button
              id="repeat-toggle-btn"
              onClick={() => setIsRepeat(!isRepeat)}
              className={`p-1.5 rounded-full transition-colors ${
                isRepeat ? 'text-[#486C27] bg-[#EAF2DE]' : 'hover:text-[#3B5424]'
              }`}
              title="Repeat"
            >
              <Repeat className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Nature Sounds Collection List (Matches Image 3 lower section) */}
      <div className="space-y-3">
        {/* Section Header */}
        <div className="flex items-center gap-2 text-[#2B431E] font-display font-semibold text-lg sm:text-xl pl-1">
          <ListMusic className="w-5 h-5 text-[#4D742B]" />
          <span>Nature Sounds</span>
        </div>

        {/* Track List Cards */}
        <div className="space-y-2.5">
          {SOUND_TRACKS.map((track) => {
            const isSelected = track.id === activeTrack.id;

            return (
              <button
                key={track.id}
                id={`track-item-${track.id}`}
                onClick={() => {
                  if (isSelected) {
                    onTogglePlay();
                  } else {
                    onTrackChange(track);
                  }
                }}
                className={`w-full text-left p-3 rounded-2xl transition-all duration-200 flex items-center justify-between border cursor-pointer ${
                  isSelected
                    ? 'bg-[#E5EFD8] border-[#BED6A7] shadow-xs'
                    : 'bg-[#F9F7F1] hover:bg-[#F3EFE4] border-[#E8E1CE]'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  {/* Track Icon Tile */}
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-2xs ${track.iconBg} ${track.iconColor}`}
                  >
                    {getTrackIcon(track.type, 'w-5 h-5')}
                  </div>

                  {/* Track Info */}
                  <div>
                    <h4
                      className={`text-sm sm:text-[15px] font-semibold leading-snug ${
                        isSelected ? 'text-[#1D350D]' : 'text-[#283E1B]'
                      }`}
                    >
                      {track.title}
                    </h4>
                    <p className="text-xs text-[#627753] leading-normal">{track.subtitle}</p>
                  </div>
                </div>

                {/* Right Status / Equalizer Animation for Selected Playing Track */}
                <div className="pr-1">
                  {isSelected && isPlaying ? (
                    <div className="flex items-end gap-0.5 h-4 text-[#436724]">
                      <span className="w-1 bg-[#436724] rounded-full animate-eq-1"></span>
                      <span className="w-1 bg-[#436724] rounded-full animate-eq-2"></span>
                      <span className="w-1 bg-[#436724] rounded-full animate-eq-3"></span>
                    </div>
                  ) : isSelected ? (
                    <span className="w-2 h-2 rounded-full bg-[#52772E]"></span>
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

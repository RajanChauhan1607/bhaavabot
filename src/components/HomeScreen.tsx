import React from 'react';
import { MessageSquare, Music2, Sprout, Sparkles, Wind } from 'lucide-react';
import { TabType } from '../types';
import { ASSETS } from '../utils/assets';
import { natureAudio } from '../utils/audioEngine';

interface HomeScreenProps {
  onNavigate: (tab: TabType) => void;
  onPlaySound?: (type: 'cicadas' | 'rain' | 'ocean' | 'stream' | 'hearth' | 'wind') => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate, onPlaySound }) => {
  const handleListenToWind = () => {
    if (onPlaySound) {
      onPlaySound('wind');
    } else {
      natureAudio.play('wind');
    }
    onNavigate('rhythm');
  };

  return (
    <div
      id="home-screen"
      className="relative min-h-[calc(100vh-60px)] pb-24 flex flex-col items-center justify-between px-5 text-center overflow-hidden"
      style={{
        backgroundImage: `radial-gradient(circle at 50% 25%, rgba(255,255,255,0.75) 0%, rgba(240, 246, 233, 0.6) 50%, rgba(214, 230, 199, 0.8) 100%), url(${ASSETS.meadowLandscape})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Decorative Sunbeam / Cloud Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FBF8F1]/40 via-transparent to-[#E3EBDC]/70 pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md mx-auto flex flex-col items-center pt-8 sm:pt-12">
        {/* Central Postcard Art: Forest Spirit Sitting in Wildflowers */}
        <div
          id="forest-spirit-card"
          className="relative bg-white/95 p-3 rounded-2xl shadow-xl border border-[#E3DCBD]/80 backdrop-blur-xs transition-transform duration-500 hover:scale-105 animate-gentle-float mb-7 sm:mb-9"
          style={{
            boxShadow: '0 12px 30px -10px rgba(50, 70, 30, 0.25), 0 2px 6px rgba(0,0,0,0.06)',
          }}
        >
          <div className="relative w-48 h-36 sm:w-56 sm:h-40 rounded-xl overflow-hidden bg-[#F2F7EC] border border-[#E6EFE0]">
            {/* Watercolor Forest Spirit Illustration */}
            <svg
              viewBox="0 0 240 160"
              className="w-full h-full object-cover"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#DEEDFB"/>
                  <stop offset="60%" stop-color="#F2F8EE"/>
                  <stop offset="100%" stop-color="#E2EED3"/>
                </linearGradient>
                <radialGradient id="sunGlow" cx="60%" cy="30%" r="40%">
                  <stop offset="0%" stop-color="#FFF8D6" stop-opacity="0.9"/>
                  <stop offset="100%" stop-color="#FFF8D6" stop-opacity="0"/>
                </radialGradient>
              </defs>
              {/* Sky and sun */}
              <rect width="240" height="160" fill="url(#skyGrad)"/>
              <circle cx="150" cy="40" r="50" fill="url(#sunGlow)"/>

              {/* Background Birch Trees & Hills */}
              <ellipse cx="60" cy="110" rx="90" ry="30" fill="#BED9A5" opacity="0.6"/>
              <ellipse cx="180" cy="115" rx="80" ry="25" fill="#A8CD8C" opacity="0.6"/>

              <rect x="30" y="20" width="4" height="100" fill="#EAE8DF" rx="2"/>
              <rect x="32" y="35" width="2" height="4" fill="#696459"/>
              <rect x="30" y="55" width="3" height="3" fill="#696459"/>

              <rect x="200" y="25" width="5" height="95" fill="#EAE8DF" rx="2"/>
              <rect x="202" y="42" width="2" height="5" fill="#696459"/>

              {/* Foreground Rolling Meadow */}
              <path d="M0 110 Q70 95 140 112 T240 110 L240 160 L0 160 Z" fill="#88B460"/>
              <path d="M0 125 Q110 110 240 122 L240 160 L0 160 Z" fill="#719F46"/>

              {/* Sitting Leaf Spirit */}
              <g transform="translate(100, 68)">
                {/* Back leaf halo */}
                <path d="M20 10 C5 0 0 25 15 32 C18 20 20 10 20 10 Z" fill="#5F8835"/>
                <path d="M20 10 C35 0 40 25 25 32 C22 20 20 10 20 10 Z" fill="#5F8835"/>
                {/* Body / Head */}
                <ellipse cx="20" cy="38" rx="19" ry="18" fill="#F4EDE0" stroke="#729846" stroke-width="1.5"/>
                {/* Moss overlay */}
                <path d="M5 34 Q20 24 35 34 Q20 30 5 34 Z" fill="#93BD58"/>
                {/* Little eyes & smile */}
                <ellipse cx="14" cy="36" rx="1.8" ry="2.5" fill="#2D401D"/>
                <ellipse cx="26" cy="36" rx="1.8" ry="2.5" fill="#2D401D"/>
                <circle cx="15" cy="35" r="0.7" fill="#FFFFFF"/>
                <circle cx="27" cy="35" r="0.7" fill="#FFFFFF"/>
                <circle cx="10" cy="40" r="3" fill="#EE7960" opacity="0.4"/>
                <circle cx="30" cy="40" r="3" fill="#EE7960" opacity="0.4"/>
                <path d="M17 41 Q20 44 23 41" stroke="#2D401D" stroke-width="1.2" fill="none" stroke-linecap="round"/>
                {/* Little folded hands */}
                <ellipse cx="20" cy="48" rx="6" ry="3.5" fill="#E8DEC8"/>
                {/* Head sprout */}
                <path d="M20 20 Q16 10 20 5 Q24 10 20 20" fill="#699238"/>
                <circle cx="20" cy="5" r="2" fill="#EE7960"/>
              </g>

              {/* Wildflowers & Ferns */}
              <circle cx="65" cy="130" r="3.5" fill="#F4A261"/>
              <circle cx="65" cy="130" r="1.5" fill="#FFFFFF"/>
              <circle cx="85" cy="142" r="4" fill="#EE7960"/>
              <circle cx="85" cy="142" r="1.5" fill="#FFF275"/>
              <circle cx="145" cy="138" r="3" fill="#70A0DE"/>
              <circle cx="165" cy="128" r="3.5" fill="#FCE268"/>
              <circle cx="185" cy="145" r="3" fill="#E76F51"/>
              <circle cx="45" cy="145" r="3" fill="#FFFFFF"/>
              <circle cx="120" cy="148" r="2.5" fill="#FFF59D"/>

              {/* Fern leaves */}
              <path d="M25 140 Q40 125 45 135" stroke="#486D26" stroke-width="1.5" fill="none"/>
              <path d="M210 142 Q195 125 190 138" stroke="#486D26" stroke-width="1.5" fill="none"/>
            </svg>
          </div>
        </div>

        {/* Hero Title */}
        <h1
          id="home-heading"
          className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#1D3213] mb-3 leading-[1.15]"
        >
          Quiet<br className="sm:hidden" /> Intelligence.
        </h1>

        {/* Subtitle */}
        <p
          id="home-subtitle"
          className="text-base sm:text-lg text-[#3D5230] max-w-xs sm:max-w-sm font-normal leading-relaxed mb-8 text-balance"
        >
          A peaceful companion for your thoughts, resting gently on your digital desk.
        </p>

        {/* Main Coral / Terracotta CTA Button */}
        <button
          id="start-conversation-btn"
          onClick={() => onNavigate('bhaava')}
          className="w-full max-w-xs bg-[#EE7960] hover:bg-[#E8684D] active:scale-98 text-white font-medium text-lg py-4 px-6 rounded-2xl shadow-lg shadow-[#EE7960]/30 flex items-center justify-center gap-3 transition-all duration-200 cursor-pointer mb-5"
        >
          <MessageSquare className="w-6 h-6 stroke-[2.2]" />
          <span>Start a Conversation</span>
        </button>

        {/* Secondary Pill Buttons */}
        <div className="w-full max-w-xs space-y-2.5">
          <button
            id="explore-forest-pill-btn"
            onClick={() => onNavigate('forest')}
            className="w-full bg-[#E5EEDD]/90 hover:bg-[#D9E6CE] active:scale-98 text-[#314A22] text-sm font-semibold py-2.5 px-4 rounded-full border border-[#CBDBC0]/90 backdrop-blur-xs flex items-center justify-center gap-2 transition-all duration-150 shadow-xs cursor-pointer"
          >
            <Sprout className="w-4 h-4 text-[#476C2E]" />
            <span>Explore the Forest</span>
          </button>

          <button
            id="listen-wind-pill-btn"
            onClick={handleListenToWind}
            className="w-full bg-[#E5EEDD]/90 hover:bg-[#D9E6CE] active:scale-98 text-[#314A22] text-sm font-semibold py-2.5 px-4 rounded-full border border-[#CBDBC0]/90 backdrop-blur-xs flex items-center justify-center gap-2 transition-all duration-150 shadow-xs cursor-pointer"
          >
            <Music2 className="w-4 h-4 text-[#476C2E]" />
            <span>Listen to the Wind</span>
          </button>
        </div>
      </div>

      {/* Subtle bottom peaceful indicator */}
      <div className="relative z-10 text-[11px] text-[#556F45] tracking-wide mt-6 opacity-75">
        Resting gently in the sunlit meadow
      </div>
    </div>
  );
};

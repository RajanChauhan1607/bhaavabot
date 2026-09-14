import React, { useState } from 'react';
import { Trees, Volume2, VolumeX, Sparkles, RefreshCw, Heart, X, Info } from 'lucide-react';
import { TabType } from '../types';
import { ASSETS } from '../utils/assets';
import { natureAudio } from '../utils/audioEngine';

interface HeaderProps {
  currentTab: TabType;
  onNavigate: (tab: TabType) => void;
  onResetChat?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onNavigate, onResetChat }) => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);

  const toggleMute = () => {
    if (isMuted) {
      natureAudio.setVolume(volume);
      setIsMuted(false);
    } else {
      natureAudio.setVolume(0);
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    setIsMuted(newVol === 0);
    natureAudio.setVolume(newVol);
  };

  return (
    <>
      <header
        id="app-header"
        className="w-full bg-[#FBF8F1]/95 backdrop-blur-md sticky top-0 z-40 border-b border-[#EAE3D2]/80 px-4 py-3 sm:px-6 transition-all duration-300"
      >
        <div className="max-w-md mx-auto flex items-center justify-between">
          {/* Logo & Brand Name */}
          <button
            id="brand-logo-btn"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-left group transition-transform active:scale-95 focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-[#E5EED8] flex items-center justify-center text-[#3D5A24] group-hover:bg-[#D6E6C4] transition-colors shadow-xs">
              <Trees className="w-5 h-5 text-[#3D5A24]" />
            </div>
            <span className="font-display font-semibold text-2xl tracking-tight text-[#2B461E]">
              Bhaavabot
            </span>
          </button>

          {/* Right Profile / Companion Avatar */}
          <button
            id="user-profile-btn"
            onClick={() => setShowProfileModal(true)}
            className="relative p-0.5 rounded-full ring-2 ring-[#7B9B4B]/30 hover:ring-[#7B9B4B] transition-all duration-300 active:scale-95 focus:outline-none"
            title="Companion Details & Audio"
          >
            <img
              src={ASSETS.avatar}
              alt="Bhaavabot Companion"
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-full object-cover bg-[#EAF2DE]"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#69A036] border-2 border-white rounded-full"></span>
          </button>
        </div>
      </header>

      {/* Companion Settings & Info Modal */}
      {showProfileModal && (
        <div
          id="companion-profile-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div className="w-full max-w-sm bg-[#FDFCFA] rounded-2xl p-5 border border-[#E4DCB] shadow-xl text-[#2D3E24] relative">
            <button
              id="close-profile-modal-btn"
              onClick={() => setShowProfileModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-[#EFE9DB] text-[#63765A] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3.5 mb-4">
              <div className="relative">
                <img
                  src={ASSETS.avatar}
                  alt="Bhaavabot Avatar"
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 rounded-full bg-[#E5EED8] ring-3 ring-[#7B9B4B]/30 object-cover shadow-sm"
                />
                <span className="absolute -bottom-1 -right-1 bg-[#5A872E] text-white p-0.5 rounded-full">
                  <Sparkles className="w-3.5 h-3.5" />
                </span>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-[#2A441D]">Bhaavabot</h3>
                <p className="text-xs text-[#6A7F60] flex items-center gap-1">
                  <span>Forest Spirit Companion</span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#69A036]"></span>
                  <span>Serene</span>
                </p>
              </div>
            </div>

            <p className="text-xs text-[#526449] leading-relaxed mb-4 bg-[#F5F2E8] p-3 rounded-xl border border-[#E9E1CD]">
              "Like morning dew on moss, rest gently on this moment. You don't have to hurry today."
            </p>

            {/* Audio Volume Control */}
            <div className="mb-4 bg-white p-3 rounded-xl border border-[#EBE4D5] shadow-2xs">
              <div className="flex items-center justify-between text-xs font-semibold text-[#445B37] mb-2">
                <span className="flex items-center gap-1.5">
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4 text-[#5A872E]" />}
                  Nature Sound Volume
                </span>
                <span>{isMuted ? 'Muted' : `${Math.round(volume * 100)}%`}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  id="mute-toggle-btn"
                  onClick={toggleMute}
                  className="p-1 text-xs rounded bg-[#F0EBE0] hover:bg-[#E5DDCF] transition-colors"
                >
                  {isMuted ? 'Unmute' : 'Mute'}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="w-full accent-[#6B9438] cursor-pointer h-1.5 bg-[#E6DEC9] rounded-lg"
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2">
              {onResetChat && (
                <button
                  id="reset-conversation-btn"
                  onClick={() => {
                    onResetChat();
                    setShowProfileModal(false);
                  }}
                  className="w-full py-2 px-3 text-xs font-medium text-[#465E39] bg-[#F2ECE0] hover:bg-[#E8DFC8] rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Clear & Begin Fresh Conversation
                </button>
              )}

              <button
                id="close-companion-btn"
                onClick={() => setShowProfileModal(false)}
                className="w-full py-2.5 text-xs font-semibold text-white bg-[#557A2B] hover:bg-[#466523] rounded-xl transition-colors shadow-xs"
              >
                Return to Sanctuary
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

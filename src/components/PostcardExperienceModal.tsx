import React, { useState, useEffect } from 'react';
import { X, Volume2, VolumeX, Sparkles, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PostcardItem } from '../types';
import { natureAudio } from '../utils/audioEngine';

interface PostcardExperienceModalProps {
  postcard: PostcardItem;
  onClose: () => void;
}

export const PostcardExperienceModal: React.FC<PostcardExperienceModalProps> = ({
  postcard,
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(true);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');

  // Breathing loop cycle: 4s Inhale, 4s Hold, 4s Exhale
  useEffect(() => {
    const interval = setInterval(() => {
      setBreathPhase((prev) => {
        if (prev === 'Inhale') return 'Hold';
        if (prev === 'Hold') return 'Exhale';
        return 'Inhale';
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleSound = () => {
    if (isPlayingAudio) {
      natureAudio.stop();
      setIsPlayingAudio(false);
    } else {
      natureAudio.play(postcard.ambientType);
      setIsPlayingAudio(true);
    }
  };

  const handleNextStep = () => {
    if (currentStep < postcard.storyLines.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Completed experience celebration
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#A4C686', '#EE7960', '#F7D674', '#99C1DE'],
        });
      } catch (e) {}
      onClose();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div
      id="postcard-experience-modal"
      className="fixed inset-0 z-50 bg-[#1A2616]/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300"
    >
      <div className="w-full max-w-md bg-[#FDFCFA] rounded-3xl overflow-hidden shadow-2xl border border-[#E0D8C3] relative flex flex-col max-h-[90vh]">
        {/* Top Control Bar */}
        <div className="p-4 flex items-center justify-between border-b border-[#EAE3D2] bg-[#F9F7F0]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#557A33] px-2.5 py-1 bg-[#E7EEDB] rounded-full">
              {postcard.expNumber}
            </span>
            <h4 className="font-display italic font-bold text-base text-[#253A1B] truncate max-w-[200px]">
              {postcard.title}
            </h4>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="modal-sound-toggle-btn"
              onClick={handleToggleSound}
              className={`p-2 rounded-full transition-colors ${
                isPlayingAudio
                  ? 'bg-[#E3EED5] text-[#3D6321]'
                  : 'bg-[#F2ECE0] text-[#7E8F75]'
              }`}
              title="Toggle Sound"
            >
              {isPlayingAudio ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              id="modal-close-btn"
              onClick={onClose}
              className="p-2 rounded-full bg-[#F2ECE0] hover:bg-[#E8DFC8] text-[#55694D] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Center Content: Interactive Mindful Story & Breathing Canvas */}
        <div className="p-6 flex-1 flex flex-col items-center justify-between text-center overflow-y-auto">
          {/* Breathing Guide Orb */}
          <div className="my-6 relative flex flex-col items-center justify-center">
            <div
              className={`w-32 h-32 rounded-full flex items-center justify-center border-4 transition-all duration-4000 ease-in-out ${
                breathPhase === 'Inhale'
                  ? 'scale-120 bg-[#E3F2D4]/70 border-[#7EA44E]'
                  : breathPhase === 'Hold'
                  ? 'scale-120 bg-[#F7F2D8]/70 border-[#E5C158]'
                  : 'scale-90 bg-[#FBEAE5]/70 border-[#EE7960]'
              }`}
            >
              <div className="text-center">
                <span className="font-display font-semibold text-lg text-[#2A431A] block">
                  {breathPhase}
                </span>
                <span className="text-[10px] text-[#607750] uppercase tracking-wider">
                  {breathPhase === 'Inhale' ? 'Breathe In' : breathPhase === 'Hold' ? 'Rest gently' : 'Release tension'}
                </span>
              </div>
            </div>
          </div>

          {/* Current Story Line */}
          <div className="my-4 min-h-[90px] flex items-center justify-center px-4">
            <p className="font-display italic text-lg sm:text-xl text-[#223816] leading-relaxed transition-all duration-300">
              "{postcard.storyLines[currentStep]}"
            </p>
          </div>

          {/* Step Progress Indicators */}
          <div className="flex items-center gap-1.5 mb-6">
            {postcard.storyLines.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentStep
                    ? 'w-6 bg-[#618A35]'
                    : idx < currentStep
                    ? 'w-2 bg-[#9EC277]'
                    : 'w-2 bg-[#E2DDCB]'
                }`}
              />
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="w-full flex items-center justify-between gap-3 pt-2">
            <button
              id="experience-prev-step-btn"
              onClick={handlePrevStep}
              disabled={currentStep === 0}
              className="px-4 py-2.5 rounded-xl border border-[#DFD6C2] text-xs font-semibold text-[#546A47] hover:bg-[#F2ECE0] disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            <button
              id="experience-next-step-btn"
              onClick={handleNextStep}
              className="flex-1 py-3 px-5 rounded-xl bg-[#52772C] hover:bg-[#436322] text-white text-xs sm:text-sm font-semibold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              {currentStep === postcard.storyLines.length - 1 ? (
                <>
                  <Check className="w-4 h-4" />
                  Complete Experience
                </>
              ) : (
                <>
                  <span>Next Reflection</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

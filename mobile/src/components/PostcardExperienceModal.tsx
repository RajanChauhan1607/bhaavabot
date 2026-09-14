import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable, Modal, Animated, StyleSheet } from 'react-native';
import { X, Volume2, VolumeX, ChevronRight, ChevronLeft, Check } from 'lucide-react-native';
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

  // Breathing scale animation using native Animated API
  const scaleAnim = useRef(new Animated.Value(1.0)).current;

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

  // Sync Animated values with breathPhase
  useEffect(() => {
    let toValue = 1.0;
    if (breathPhase === 'Inhale') toValue = 1.2;
    else if (breathPhase === 'Hold') toValue = 1.2;
    else toValue = 0.9;

    Animated.timing(scaleAnim, {
      toValue,
      duration: 3800, // Slightly shorter than the 4s step to allow buffer
      useNativeDriver: true,
    }).start();
  }, [breathPhase]);

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
      // Completed experience
      onClose();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Determine breathing bubble classes based on state
  const getBreathingColors = () => {
    switch (breathPhase) {
      case 'Inhale':
        return { bg: 'bg-[#E3F2D4]', border: 'border-[#7EA44E]' };
      case 'Hold':
        return { bg: 'bg-[#F7F2D8]', border: 'border-[#E5C158]' };
      case 'Exhale':
        return { bg: 'bg-[#FBEAE5]', border: 'border-[#EE7960]' };
    }
  };

  const colors = getBreathingColors();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-[#1A2616]/90 justify-center items-center p-4">
        <View className="w-full max-w-md bg-[#FDFCFA] rounded-3xl overflow-hidden shadow-2xl border border-[#E0D8C3] flex flex-col max-h-[85vh]">
          
          {/* Top Control Bar */}
          <View className="p-4 flex flex-row items-center justify-between border-b border-[#EAE3D2] bg-[#F9F7F0]">
            <View className="flex flex-row items-center space-x-2 flex-1">
              <Text className="text-[10px] font-mono font-bold text-[#557A33] px-2.5 py-1 bg-[#E7EEDB] rounded-full">
                {postcard.expNumber}
              </Text>
              <Text className="font-bold text-base text-[#253A1B] truncate flex-1">
                {postcard.title}
              </Text>
            </View>

            <View className="flex flex-row items-center space-x-2">
              <Pressable
                onPress={handleToggleSound}
                className={`p-2 rounded-full ${
                  isPlayingAudio ? 'bg-[#E3EED5]' : 'bg-[#F2ECE0]'
                }`}
              >
                {isPlayingAudio ? (
                  <Volume2 size={16} color="#3D6321" />
                ) : (
                  <VolumeX size={16} color="#7E8F75" />
                )}
              </Pressable>

              <Pressable
                onPress={onClose}
                className="p-2 rounded-full bg-[#F2ECE0] active:opacity-75"
              >
                <X size={16} color="#55694D" />
              </Pressable>
            </View>
          </View>

          {/* Modal Center Content: Interactive Mindful Story & Breathing Canvas */}
          <View className="p-6 flex-1 items-center justify-between">
            
            {/* Breathing Guide Orb */}
            <View className="my-6 items-center justify-center">
              <Animated.View
                style={{
                  transform: [{ scale: scaleAnim }],
                }}
                className={`w-32 h-32 rounded-full flex items-center justify-center border-4 ${colors.bg} ${colors.border}`}
              >
                <View className="items-center">
                  <Text className="font-bold text-lg text-[#2A431A]">
                    {breathPhase}
                  </Text>
                  <Text className="text-[9px] text-[#607750] uppercase tracking-wider text-center px-1 mt-0.5">
                    {breathPhase === 'Inhale'
                      ? 'Breathe In'
                      : breathPhase === 'Hold'
                      ? 'Rest gently'
                      : 'Release tension'}
                  </Text>
                </View>
              </Animated.View>
            </View>

            {/* Current Story Line */}
            <View className="my-4 min-h-[100px] items-center justify-center px-4">
              <Text className="text-lg italic text-[#223816] text-center leading-relaxed font-serif">
                "{postcard.storyLines[currentStep]}"
              </Text>
            </View>

            {/* Step Progress Indicators */}
            <View className="flex flex-row items-center space-x-2 mb-6">
              {postcard.storyLines.map((_, idx) => (
                <View
                  key={idx}
                  className={`h-1.5 rounded-full ${
                    idx === currentStep
                      ? 'w-6 bg-[#618A35]'
                      : idx < currentStep
                      ? 'w-2 bg-[#9EC277]'
                      : 'w-2 bg-[#E2DDCB]'
                  }`}
                />
              ))}
            </View>

            {/* Navigation Controls */}
            <View className="w-full flex flex-row items-center justify-between space-x-3 pt-2">
              <Pressable
                onPress={handlePrevStep}
                disabled={currentStep === 0}
                className="px-4 py-3 rounded-xl border border-[#DFD6C2] flex flex-row items-center space-x-1 active:opacity-75 disabled:opacity-30"
              >
                <ChevronLeft size={16} color="#546A47" />
                <Text className="text-xs font-semibold text-[#546A47]">Previous</Text>
              </Pressable>

              <Pressable
                onPress={handleNextStep}
                className="flex-1 py-3.5 px-5 rounded-xl bg-[#52772C] flex flex-row items-center justify-center space-x-2 active:opacity-75"
              >
                {currentStep === postcard.storyLines.length - 1 ? (
                  <>
                    <Check size={16} color="white" />
                    <Text className="text-white text-sm font-bold">Complete</Text>
                  </>
                ) : (
                  <>
                    <Text className="text-white text-sm font-bold">Next Reflection</Text>
                    <ChevronRight size={16} color="white" />
                  </>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

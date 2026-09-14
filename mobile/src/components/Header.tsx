import React, { useState } from 'react';
import { View, Text, Pressable, Modal } from 'react-native';
import { Trees, Volume2, VolumeX, Sparkles, RefreshCw, X } from 'lucide-react-native';
import Slider from '@react-native-community/slider';
import { TabType } from '../types';
import { AvatarImage } from '../utils/assets';
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
      <View className="w-full bg-[#FBF8F1] border-b border-[#EAE3D2] px-5 py-3.5 flex flex-row items-center justify-between">
        {/* Logo & Brand Name */}
        <Pressable
          onPress={() => onNavigate('home')}
          className="flex flex-row items-center space-x-2.5 active:opacity-75"
        >
          <View className="w-9 h-9 rounded-full bg-[#E5EED8] flex items-center justify-center">
            <Trees size={20} color="#3D5A24" />
          </View>
          <Text className="font-semibold text-2xl tracking-tight text-[#2B461E]">
            Bhaavabot
          </Text>
        </Pressable>

        {/* Right Profile / Companion Avatar */}
        <Pressable
          onPress={() => setShowProfileModal(true)}
          className="relative p-0.5 rounded-full border-2 border-[#7B9B4B]/30 active:opacity-75"
        >
          <View className="w-8 h-8 rounded-full overflow-hidden bg-[#EAF2DE] items-center justify-center">
            <AvatarImage size={32} />
          </View>
          <View className="absolute bottom-0 right-0 w-3 h-3 bg-[#69A036] border-2 border-white rounded-full" />
        </Pressable>
      </View>

      {/* Companion Settings & Info Modal */}
      <Modal
        visible={showProfileModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowProfileModal(false)}
      >
        <View className="flex-1 bg-black/40 justify-center items-center p-5">
          <View className="w-full max-w-sm bg-[#FDFCFA] rounded-3xl p-6 border border-[#E4DCBD] shadow-2xl relative">
            <Pressable
              onPress={() => setShowProfileModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#F0EBE0] active:opacity-75"
            >
              <X size={18} color="#63765A" />
            </Pressable>

            <View className="flex flex-row items-center space-x-4 mb-4">
              <View className="relative">
                <View className="w-14 h-14 rounded-full bg-[#E5EED8] overflow-hidden items-center justify-center border-2 border-[#7B9B4B]/30">
                  <AvatarImage size={56} />
                </View>
                <View className="absolute -bottom-1 -right-1 bg-[#5A872E] p-1 rounded-full">
                  <Sparkles size={11} color="white" />
                </View>
              </View>
              <View>
                <Text className="text-xl font-bold text-[#2A441D]">Bhaavabot</Text>
                <View className="flex flex-row items-center space-x-1.5">
                  <Text className="text-xs text-[#6A7F60]">Forest Spirit Companion</Text>
                  <View className="w-1.5 h-1.5 rounded-full bg-[#69A036]" />
                  <Text className="text-xs text-[#6A7F60]">Serene</Text>
                </View>
              </View>
            </View>

            <Text className="text-xs text-[#526449] leading-relaxed mb-4 bg-[#F5F2E8] p-4 rounded-2xl border border-[#E9E1CD]">
              "Like morning dew on moss, rest gently on this moment. You don't have to hurry today."
            </Text>

            {/* Audio Volume Control */}
            <View className="mb-5 bg-white p-4 rounded-2xl border border-[#EBE4D5]">
              <View className="flex flex-row items-center justify-between mb-2">
                <View className="flex flex-row items-center space-x-2">
                  {isMuted ? (
                    <VolumeX size={16} color="#EE7960" />
                  ) : (
                    <Volume2 size={16} color="#5A872E" />
                  )}
                  <Text className="text-xs font-semibold text-[#445B37]">
                    Nature Sound Volume
                  </Text>
                </View>
                <Text className="text-xs font-bold text-[#445B37]">
                  {isMuted ? 'Muted' : `${Math.round(volume * 100)}%`}
                </Text>
              </View>
              <View className="flex flex-row items-center space-x-3">
                <Pressable
                  onPress={toggleMute}
                  className="px-3 py-1.5 rounded-xl bg-[#F0EBE0] active:opacity-75"
                >
                  <Text className="text-xs font-semibold text-[#63765A]">
                    {isMuted ? 'Unmute' : 'Mute'}
                  </Text>
                </Pressable>
                <Slider
                  minimumValue={0}
                  maximumValue={1}
                  step={0.05}
                  value={isMuted ? 0 : volume}
                  onValueChange={handleVolumeChange}
                  minimumTrackTintColor="#6B9438"
                  maximumTrackTintColor="#E6DEC9"
                  thumbTintColor="#6B9438"
                  className="flex-1 h-8"
                />
              </View>
            </View>

            {/* Quick Actions */}
            <View className="space-y-3">
              {onResetChat && (
                <Pressable
                  onPress={() => {
                    onResetChat();
                    setShowProfileModal(false);
                  }}
                  className="w-full py-3 px-4 rounded-2xl bg-[#F2ECE0] flex flex-row items-center justify-center space-x-2 active:opacity-75"
                >
                  <RefreshCw size={14} color="#465E39" />
                  <Text className="text-xs font-semibold text-[#465E39]">
                    Clear & Begin Fresh Conversation
                  </Text>
                </Pressable>
              )}

              <Pressable
                onPress={() => setShowProfileModal(false)}
                className="w-full py-3.5 rounded-2xl bg-[#557A2B] items-center active:opacity-75"
              >
                <Text className="text-xs font-bold text-white">
                  Return to Sanctuary
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

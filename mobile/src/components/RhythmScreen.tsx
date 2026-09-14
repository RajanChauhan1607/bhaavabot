import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Droplets,
  Sun,
  Flame,
  Wind,
  Waves,
  ListMusic,
  Trees,
} from 'lucide-react-native';
import Slider from '@react-native-community/slider';
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Rect,
  Ellipse,
  Polygon,
  Circle,
  Path,
  Line,
  G,
  Text as SvgText,
} from 'react-native-svg';
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
    duration: 330,
    iconBg: 'bg-[#E0EFF8]',
    iconColor: '#2D739B',
    description: 'Soft raindrops falling through lush green canopy.',
  },
  {
    id: 'summer-cicadas',
    title: 'Summer Cicadas',
    subtitle: 'Midday in the Valley',
    recordSubtitle: 'ST - Town with an Ocean View',
    type: 'cicadas',
    duration: 330,
    iconBg: 'bg-[#7EA449]',
    iconColor: '#1D3609',
    description: 'Warm rhythmic chorus of valley cicadas in the noon sun.',
  },
  {
    id: 'ocean-breeze',
    title: 'Ocean Breeze',
    subtitle: 'Distant waves and coastal air',
    recordSubtitle: 'ST - Coastal Hillside Breeze',
    type: 'ocean',
    duration: 330,
    iconBg: 'bg-[#FDE8E3]',
    iconColor: '#D36047',
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
    iconColor: '#2E8B75',
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
    iconColor: '#C86427',
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
    iconColor: '#486E2A',
    description: 'A gentle mountain breeze rustling the ancient pine canopy.',
  },
];

export const RhythmScreen: React.FC<RhythmScreenProps> = ({
  currentTrackId,
  isPlaying,
  onTrackChange,
  onTogglePlay,
}) => {
  const [currentSeconds, setCurrentSeconds] = useState(105); // 1:45 default
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

  const handleSeek = (val: number) => {
    setCurrentSeconds(Math.round(val));
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

  const getTrackIcon = (type: SoundType, iconColor: string) => {
    switch (type) {
      case 'rain':
        return <Droplets size={20} color={iconColor} />;
      case 'cicadas':
        return <Sun size={20} color={iconColor} />;
      case 'ocean':
        return <Waves size={20} color={iconColor} />;
      case 'stream':
        return <Droplets size={20} color={iconColor} />;
      case 'hearth':
        return <Flame size={20} color={iconColor} />;
      case 'wind':
        return <Wind size={20} color={iconColor} />;
      default:
        return <Trees size={20} color={iconColor} />;
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      className="flex-1 bg-[#FBF8F1] px-4 pt-3"
    >
      {/* Top Now Playing Player Card */}
      <View style={styles.playerCard} className="bg-white rounded-3xl border border-[#E5DECD] overflow-hidden mb-6">
        {/* Watercolor Window Scene with Gramophone */}
        <View className="relative w-full h-56 bg-[#EAF2E5] overflow-hidden">
          <Svg viewBox="0 0 400 280" width="100%" height="100%">
            <Defs>
              <LinearGradient id="windowSky" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0%" stopColor="#CFE5F8" />
                <Stop offset="50%" stopColor="#E8F4EC" />
                <Stop offset="100%" stopColor="#DAECCE" />
              </LinearGradient>
              <LinearGradient id="woodFrame" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0%" stopColor="#CBB391" />
                <Stop offset="100%" stopColor="#8F6B43" />
              </LinearGradient>
            </Defs>

            {/* Outdoor View */}
            <Rect width="400" height="280" fill="url(#windowSky)" />
            <Ellipse cx="120" cy="180" rx="190" ry="70" fill="#9BC378" opacity="0.8" />
            <Ellipse cx="300" cy="185" rx="160" ry="60" fill="#88B463" opacity="0.85" />
            <Circle cx="280" cy="80" r="45" fill="#FFF8DC" opacity="0.5" />

            {/* Distant cottage & trees */}
            <Polygon points="170,140 185,128 200,140" fill="#B4654F" />
            <Rect x="175" y="140" width="20" height="15" fill="#EAE2CE" />

            {/* Potted plants on sill */}
            <Circle cx="340" cy="170" r="14" fill="#C8724F" />
            <Path d="M330 160 Q340 135 345 155 Q355 138 350 162" stroke="#486F28" strokeWidth="2.5" fill="none" />

            {/* Cozy Teapot on sill */}
            <Ellipse cx="270" cy="188" rx="9" ry="8" fill="#F0EBE0" stroke="#C5BAA2" />
            <Path d="M260 188 Q255 183 260 178" stroke="#C5BAA2" strokeWidth="2" fill="none" />

            {/* Wooden Window Frame */}
            <Rect x="10" y="0" width="18" height="280" fill="url(#woodFrame)" />
            <Rect x="372" y="0" width="18" height="280" fill="url(#woodFrame)" />
            <Rect x="10" y="0" width="380" height="18" fill="url(#woodFrame)" />
            
            {/* Open Right Shutter */}
            <Polygon points="260,20 370,10 370,240 260,225" fill="#EAE2D2" stroke="#8F6B43" strokeWidth="3" />
            <Line x1="315" y1="15" x2="315" y2="232" stroke="#8F6B43" strokeWidth="2" />
            <Line x1="260" y1="90" x2="370" y2="85" stroke="#8F6B43" strokeWidth="2" />
            <line x1="260" y1="160" x2="370" y2="155" stroke="#8F6B43" strokeWidth="2" />

            {/* Wooden Window Sill Table */}
            <Rect x="0" y="195" width="400" height="85" fill="#BFA37E" />
            <Line x1="0" y1="195" x2="400" y2="195" stroke="#7A5832" strokeWidth="3" />

            {/* Vintage Turntable / Record Player on Window Sill */}
            <G transform="translate(45, 125)">
              <Rect x="0" y="45" width="165" height="55" rx="5" fill="#8B572A" stroke="#5E3816" strokeWidth="2" />
              <Rect x="8" y="52" width="150" height="40" fill="#A77242" rx="3" />
              <Polygon points="0,45 15,0 150,0 165,45" fill="#75451D" stroke="#502F12" strokeWidth="2" opacity="0.9" />
              <Ellipse cx="78" cy="48" rx="46" ry="18" fill="#1C1C1C" stroke="#333333" strokeWidth="1.5" />
              <Ellipse cx="78" cy="48" rx="16" ry="6" fill="#C79654" />
              <Circle cx="78" cy="48" r="2" fill="#EAEAEA" />
              <Line x1="135" y1="40" x2="105" y2="48" stroke="#D1B27B" strokeWidth="3" strokeLinecap="round" />
              <Circle cx="135" cy="40" r="4" fill="#694625" />
              <Circle cx="35" cy="78" r="4" fill="#D1B27B" />
              <Circle cx="55" cy="78" r="4" fill="#D1B27B" />
              <Line x1="90" y1="72" x2="145" y2="72" stroke="#502F12" strokeWidth="2" />
              <Line x1="90" y1="78" x2="145" y2="78" stroke="#502F12" strokeWidth="2" />
              <Line x1="90" y1="84" x2="145" y2="84" stroke="#502F12" strokeWidth="2" />
            </G>

            {/* Overlaid Subtle Track Subtitle Tag on Painting */}
            <SvgText
              x="20"
              y="265"
              fontFamily="System"
              fontSize="11"
              fontWeight="600"
              fill="#FFFFFF"
              opacity="0.85"
            >
              {activeTrack.recordSubtitle || 'ST - Town with an Ocean View'}
            </SvgText>
          </Svg>

          {/* Decorative Scalloped Bottom Edge */}
          <View className="absolute -bottom-1.5 left-0 right-0 h-4 flex flex-row overflow-hidden">
            {Array.from({ length: 24 }).map((_, i) => (
              <View
                key={i}
                className="w-5 h-5 -mt-3 rounded-full bg-white"
              />
            ))}
          </View>
        </View>

        {/* Audio Player Controls Section */}
        <View className="p-5 items-center">
          <Text className="text-[10px] font-bold tracking-widest text-[#577933] uppercase mb-1">
            NOW PLAYING
          </Text>

          <Text className="text-2xl font-bold text-[#1F3314] text-center mb-0.5">
            {activeTrack.title}
          </Text>

          <Text className="text-xs text-[#617751] text-center mb-4">
            {activeTrack.subtitle}
          </Text>

          {/* Audio Slider */}
          <View className="w-full mb-4 px-1">
            <Slider
              minimumValue={0}
              maximumValue={activeTrack.duration}
              value={currentSeconds}
              onValueChange={handleSeek}
              minimumTrackTintColor="#7DA347"
              maximumTrackTintColor="#E5DFD0"
              thumbTintColor="#7DA347"
              className="w-full h-8"
            />
            <View className="flex flex-row justify-between text-xs px-1">
              <Text className="text-xs text-[#708462] font-mono">{formatTime(currentSeconds)}</Text>
              <Text className="text-xs text-[#708462] font-mono">{formatTime(activeTrack.duration)}</Text>
            </View>
          </View>

          {/* Media Playback Controls Row */}
          <View className="flex flex-row items-center justify-center space-x-6 mb-3">
            <Pressable
              onPress={handlePrev}
              className="w-10 h-10 rounded-full bg-[#F4EFE2] items-center justify-center active:scale-95 shadow-sm"
            >
              <SkipBack size={18} color="#375225" fill="#375225" />
            </Pressable>

            <Pressable
              onPress={onTogglePlay}
              className="w-14 h-14 rounded-full bg-[#486C27] items-center justify-center active:scale-95 shadow-md shadow-[#486C27]/30"
            >
              {isPlaying ? (
                <Pause size={24} color="white" fill="white" />
              ) : (
                <Play size={24} color="white" fill="white" className="ml-1" />
              )}
            </Pressable>

            <Pressable
              onPress={handleNext}
              className="w-10 h-10 rounded-full bg-[#F4EFE2] items-center justify-center active:scale-95 shadow-sm"
            >
              <SkipForward size={18} color="#375225" fill="#375225" />
            </Pressable>
          </View>

          {/* Secondary shuffle & repeat row */}
          <View className="w-full flex flex-row justify-between items-center px-4 pt-1.5 border-t border-[#F2ECE0]">
            <Pressable
              onPress={() => setIsShuffle(!isShuffle)}
              className={`p-2 rounded-full ${isShuffle ? 'bg-[#EAF2DE]' : ''}`}
            >
              <Shuffle size={15} color={isShuffle ? '#486C27' : '#7F9572'} />
            </Pressable>

            <Text className="text-[10px] font-bold text-[#7E9371] uppercase tracking-wide">
              Lo-Fi Organic Synthesizer
            </Text>

            <Pressable
              onPress={() => setIsRepeat(!isRepeat)}
              className={`p-2 rounded-full ${isRepeat ? 'bg-[#EAF2DE]' : ''}`}
            >
              <Repeat size={15} color={isRepeat ? '#486C27' : '#7F9572'} />
            </Pressable>
          </View>
        </View>
      </View>

      {/* Nature Sounds Collection List */}
      <View className="mb-24">
        <View className="flex flex-row items-center space-x-2 mb-3 pl-1">
          <ListMusic size={18} color="#4D742B" />
          <Text className="font-bold text-lg text-[#2B431E]">Nature Sounds</Text>
        </View>

        {/* Track List Cards */}
        <View className="space-y-3">
          {SOUND_TRACKS.map((track) => {
            const isSelected = track.id === activeTrack.id;

            return (
              <Pressable
                key={track.id}
                onPress={() => {
                  if (isSelected) {
                    onTogglePlay();
                  } else {
                    onTrackChange(track);
                  }
                }}
                className={`p-3 rounded-2xl flex flex-row items-center justify-between border ${
                  isSelected
                    ? 'bg-[#E5EFD8] border-[#BED6A7] shadow-xs'
                    : 'bg-[#F9F7F1] border-[#E8E1CE]'
                }`}
              >
                <View className="flex flex-row items-center space-x-3.5">
                  <View
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${track.iconBg}`}
                  >
                    {getTrackIcon(track.type, track.iconColor)}
                  </View>
                  <View>
                    <Text
                      className={`text-sm font-bold leading-snug ${
                        isSelected ? 'text-[#1D350D]' : 'text-[#283E1B]'
                      }`}
                    >
                      {track.title}
                    </Text>
                    <Text className="text-xs text-[#627753] leading-normal">{track.subtitle}</Text>
                  </View>
                </View>

                {/* Right Status Indicator */}
                <View className="pr-1">
                  {isSelected && isPlaying ? (
                    <View className="flex flex-row items-end space-x-0.5 h-3">
                      <View className="w-1 h-3 bg-[#436724] rounded-full" />
                      <View className="w-1 h-2 bg-[#436724] rounded-full" />
                      <View className="w-1 h-2.5 bg-[#436724] rounded-full" />
                    </View>
                  ) : isSelected ? (
                    <View className="w-2 h-2 rounded-full bg-[#52772E]" />
                  ) : null}
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 40,
  },
  playerCard: {
    shadowColor: '#57422C',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
});

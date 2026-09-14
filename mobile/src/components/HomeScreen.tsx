import React from 'react';
import { View, Text, Pressable, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import { MessageSquare, Music2, Sprout } from 'lucide-react-native';
import Svg, {
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  Rect,
  Circle,
  Ellipse,
  Path,
  G,
  Polygon,
} from 'react-native-svg';
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

  const screenHeight = Dimensions.get('window').height;

  return (
    <ImageBackground
      source={{ uri: ASSETS.meadowLandscape }}
      resizeMode="cover"
      style={[styles.container, { minHeight: screenHeight - 80 }]}
    >
      {/* Decorative Sunbeam / Cloud Ambient Glow overlay */}
      <View className="absolute inset-0 bg-[#E3EBDC]/40" />

      <View className="flex-1 justify-between items-center w-full max-w-md px-5 pt-8 pb-28 relative z-10">
        
        {/* Central Postcard Art: Forest Spirit Sitting in Wildflowers */}
        <View
          style={styles.spiritCard}
          className="bg-white p-3.5 rounded-3xl border border-[#E3DCBD]/80 items-center justify-center mb-6"
        >
          <View className="w-60 h-40 rounded-2xl overflow-hidden bg-[#F2F7EC] border border-[#E6EFE0]">
            <Svg viewBox="0 0 240 160" width="100%" height="100%">
              <Defs>
                <LinearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0%" stopColor="#DEEDFB" />
                  <Stop offset="60%" stopColor="#F2F8EE" />
                  <Stop offset="100%" stopColor="#E2EED3" />
                </LinearGradient>
                <RadialGradient id="sunGlow" cx="60%" cy="30%" rx="40%" ry="40%">
                  <Stop offset="0%" stopColor="#FFF8D6" stopOpacity="0.9" />
                  <Stop offset="100%" stopColor="#FFF8D6" stopOpacity="0" />
                </RadialGradient>
              </Defs>
              
              {/* Sky and sun */}
              <Rect width="240" height="160" fill="url(#skyGrad)" />
              <Circle cx="150" cy="40" r="50" fill="url(#sunGlow)" />

              {/* Background Birch Trees & Hills */}
              <Ellipse cx="60" cy="110" rx="90" ry="30" fill="#BED9A5" opacity="0.6" />
              <Ellipse cx="180" cy="115" rx="80" ry="25" fill="#A8CD8C" opacity="0.6" />

              <Rect x="30" y="20" width="4" height="100" fill="#EAE8DF" rx="2" />
              <Rect x="32" y="35" width="2" height="4" fill="#696459" />
              <Rect x="30" y="55" width="3" height="3" fill="#696459" />

              <Rect x="200" y="25" width="5" height="95" fill="#EAE8DF" rx="2" />
              <Rect x="202" y="42" width="2" height="5" fill="#696459" />

              {/* Foreground Rolling Meadow */}
              <Path d="M0 110 Q70 95 140 112 T240 110 L240 160 L0 160 Z" fill="#88B460" />
              <Path d="M0 125 Q110 110 240 122 L240 160 L0 160 Z" fill="#719F46" />

              {/* Sitting Leaf Spirit */}
              <G transform="translate(100, 68)">
                {/* Back leaf halo */}
                <Path d="M20 10 C5 0 0 25 15 32 C18 20 20 10 20 10 Z" fill="#5F8835" />
                <Path d="M20 10 C35 0 40 25 25 32 C22 20 20 10 20 10 Z" fill="#5F8835" />
                {/* Body / Head */}
                <Ellipse cx="20" cy="38" rx="19" ry="18" fill="#F4EDE0" stroke="#729846" strokeWidth="1.5" />
                {/* Moss overlay */}
                <Path d="M5 34 Q20 24 35 34 Q20 30 5 34 Z" fill="#93BD58" />
                {/* Little eyes & smile */}
                <Ellipse cx="14" cy="36" rx="1.8" ry="2.5" fill="#2D401D" />
                <Ellipse cx="26" cy="36" rx="1.8" ry="2.5" fill="#2D401D" />
                <Circle cx="15" cy="35" r="0.7" fill="#FFFFFF" />
                <Circle cx="27" cy="35" r="0.7" fill="#FFFFFF" />
                <Circle cx="10" cy="40" r="3" fill="#EE7960" opacity="0.4" />
                <Circle cx="30" cy="40" r="3" fill="#EE7960" opacity="0.4" />
                <Path d="M17 41 Q20 44 23 41" stroke="#2D401D" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                {/* Little folded hands */}
                <Ellipse cx="20" cy="48" rx="6" ry="3.5" fill="#E8DEC8" />
                {/* Head sprout */}
                <Path d="M20 20 Q16 10 20 5 Q24 10 20 20" fill="#699238" />
                <Circle cx="20" cy="5" r="2" fill="#EE7960" />
              </G>

              {/* Wildflowers & Ferns */}
              <Circle cx="65" cy="130" r="3.5" fill="#F4A261" />
              <Circle cx="65" cy="130" r="1.5" fill="#FFFFFF" />
              <Circle cx="85" cy="142" r="4" fill="#EE7960" />
              <Circle cx="85" cy="142" r="1.5" fill="#FFF275" />
              <Circle cx="145" cy="138" r="3" fill="#70A0DE" />
              <Circle cx="165" cy="128" r="3.5" fill="#FCE268" />
              <Circle cx="185" cy="145" r="3" fill="#E76F51" />
              <Circle cx="45" cy="145" r="3" fill="#FFFFFF" />
              <Circle cx="120" cy="148" r="2.5" fill="#FFF59D" />

              {/* Fern leaves */}
              <Path d="M25 140 Q40 125 45 135" stroke="#486D26" strokeWidth="1.5" fill="none" />
              <Path d="M210 142 Q195 125 190 138" stroke="#486D26" strokeWidth="1.5" fill="none" />
            </Svg>
          </View>
        </View>

        {/* Hero Text */}
        <View className="items-center mb-6">
          <Text className="text-4xl font-extrabold text-[#1D3213] text-center leading-tight">
            Quiet Intelligence.
          </Text>
          <Text className="text-base text-[#3D5230] text-center max-w-[280px] leading-relaxed mt-2.5">
            A peaceful companion for your thoughts, resting gently on your digital desk.
          </Text>
        </View>

        {/* Action Buttons */}
        <View className="w-full items-center space-y-4">
          {/* Main Chat CTA */}
          <Pressable
            onPress={() => onNavigate('bhaava')}
            className="w-full max-w-xs bg-[#EE7960] active:scale-98 py-4 px-6 rounded-2xl flex flex-row items-center justify-center space-x-3 shadow-lg shadow-[#EE7960]/30"
          >
            <MessageSquare size={22} color="white" />
            <Text className="text-white font-bold text-lg">Start a Conversation</Text>
          </Pressable>

          {/* Secondary Options */}
          <View className="w-full max-w-xs space-y-3">
            <Pressable
              onPress={() => onNavigate('forest')}
              className="w-full bg-[#E5EEDD]/95 active:scale-98 py-3 px-4 rounded-full border border-[#CBDBC0] flex flex-row items-center justify-center space-x-2 shadow-xs"
            >
              <Sprout size={16} color="#476C2E" />
              <Text className="text-[#314A22] text-sm font-semibold">Explore the Forest</Text>
            </Pressable>

            <Pressable
              onPress={handleListenToWind}
              className="w-full bg-[#E5EEDD]/95 active:scale-98 py-3 px-4 rounded-full border border-[#CBDBC0] flex flex-row items-center justify-center space-x-2 shadow-xs"
            >
              <Music2 size={16} color="#476C2E" />
              <Text className="text-[#314A22] text-sm font-semibold">Listen to the Wind</Text>
            </Pressable>
          </View>
        </View>

        {/* Bottom indicator */}
        <Text className="text-[11px] text-[#556F45] tracking-wide mt-6 opacity-75">
          Resting gently in the sunlit meadow
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spiritCard: {
    shadowColor: '#32461E',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 30,
    elevation: 8,
  },
});

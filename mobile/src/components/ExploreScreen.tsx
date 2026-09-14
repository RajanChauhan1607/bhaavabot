import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { PlayCircle, Compass } from 'lucide-react-native';
import Svg, {
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  Rect,
  Circle,
  Ellipse,
  Path,
  Polygon,
  Line,
  G,
} from 'react-native-svg';
import { PostcardItem, SoundType } from '../types';
import { renderStampIcon } from '../utils/assets';
import { PostcardExperienceModal } from './PostcardExperienceModal';

export const POSTCARDS: PostcardItem[] = [
  {
    id: 'path-pines',
    expNumber: 'EXP. 01',
    title: 'The Path through the Pines',
    description:
      'A gentle breeze carries the scent of pine needles as you walk along an ancient, sun-dappled trail...',
    stampIcon: 'pineTree',
    stampValue: '20¢',
    stampColor: '#4A6B32',
    image: '',
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
    stampIcon: 'raindrop',
    stampValue: '15¢',
    stampColor: '#3B6885',
    image: '',
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
    stampIcon: 'hearthFire',
    stampValue: '30¢',
    stampColor: '#8C4B29',
    image: '',
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
    stampIcon: 'pineTree',
    stampValue: '25¢',
    stampColor: '#53457D',
    image: '',
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
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      className="flex-1 bg-[#FBF8F1] px-4 pt-4"
    >
      {/* Title & Subtitle */}
      <div className="text-center mb-6 items-center justify-center pt-2">
        <Text style={styles.titleText} className="font-serif italic text-3xl font-bold text-[#1F3314] text-center mb-2">
          Postcards from Memory
        </Text>
        <Text className="text-xs text-[#5B714D] text-center max-w-[280px] leading-relaxed">
          Select a serene moment to immerse yourself in. Each postcard holds a unique, tranquil experience.
        </Text>
      </div>

      {/* Postcards Stack */}
      <View className="space-y-6 mb-24">
        {POSTCARDS.map((postcard) => (
          <Pressable
            key={postcard.id}
            onPress={() => handleOpenExperience(postcard)}
            style={styles.card}
            className="bg-white rounded-3xl border border-[#E4DEC9] overflow-hidden mb-6 active:opacity-95"
          >
            {/* Postcard Painting with Vintage Postage Stamp */}
            <View className="relative w-full h-44 bg-[#E8F0DF] overflow-hidden">
              
              {/* Svg Drawings based on ID */}
              {postcard.id === 'path-pines' && (
                <Svg viewBox="0 0 400 200" width="100%" height="100%">
                  <Defs>
                    <LinearGradient id="forestSky" x1="0" y1="0" x2="0" y2="1">
                      <Stop offset="0%" stopColor="#E1EEFA" />
                      <Stop offset="100%" stopColor="#F7F3E2" />
                    </LinearGradient>
                  </Defs>
                  <Rect width="400" height="200" fill="url(#forestSky)" />
                  <Polygon points="120,0 200,0 290,200 170,200" fill="#FFFCE6" opacity="0.35" />
                  <Polygon points="220,0 280,0 360,200 280,200" fill="#FFFCE6" opacity="0.25" />
                  <Ellipse cx="200" cy="140" rx="220" ry="60" fill="#88B264" opacity="0.7" />
                  <Ellipse cx="100" cy="150" rx="140" ry="50" fill="#699446" opacity="0.8" />
                  <Path d="M190 120 Q200 150 230 200 L160 200 Q180 150 190 120 Z" fill="#D7BE93" />
                  
                  <Polygon points="60,30 35,90 85,90" fill="#3D5F23" />
                  <Polygon points="60,70 30,130 90,130" fill="#2E4D18" />
                  <Polygon points="60,110 25,170 95,170" fill="#243F13" />
                  <Rect x="54" y="160" width="12" height="40" fill="#54371C" />

                  <Polygon points="130,50 110,100 150,100" fill="#4B702D" />
                  <Polygon points="130,85 105,135 155,135" fill="#3B5D21" />
                  <Rect x="126" y="130" width="8" height="60" fill="#54371C" />

                  <Polygon points="320,25 290,95 350,95" fill="#37571E" />
                  <Polygon points="320,75 280,140 360,140" fill="#2A4515" />
                  <Polygon points="320,120 275,185 365,185" fill="#1F350E" />
                  <Rect x="313" y="170" width="14" height="30" fill="#4A3119" />

                  <Circle cx="150" cy="180" r="15" fill="#75A448" opacity="0.8" />
                  <Circle cx="250" cy="185" r="18" fill="#649139" opacity="0.8" />
                </Svg>
              )}

              {postcard.id === 'rainy-afternoon' && (
                <Svg viewBox="0 0 400 200" width="100%" height="100%">
                  <Defs>
                    <LinearGradient id="rainSky" x1="0" y1="0" x2="0" y2="1">
                      <Stop offset="0%" stopColor="#BBCEDD" />
                      <Stop offset="60%" stopColor="#D7E4E9" />
                      <Stop offset="100%" stopColor="#C9DBC2" />
                    </LinearGradient>
                  </Defs>
                  <Rect width="400" height="200" fill="url(#rainSky)" />
                  <Ellipse cx="200" cy="160" rx="240" ry="70" fill="#7FA86D" opacity="0.75" />
                  {/* Rain streaks */}
                  {Array.from({ length: 25 }).map((_, i) => (
                    <Line
                      key={i}
                      x1={(i * 18) % 400}
                      y1={((i * 23) % 150)}
                      x2={((i * 18) % 400) - 10}
                      y2={((i * 23) % 150) + 35}
                      stroke="#FFFFFF"
                      strokeWidth="1.2"
                      opacity={0.4}
                    />
                  ))}
                  <Rect x="15" y="10" width="370" height="180" fill="none" stroke="#685038" strokeWidth={8} rx={2} />
                  <Line x1="200" y1="10" x2="200" y2="190" stroke="#685038" strokeWidth={6} />
                  <Line x1="15" y1="100" x2="385" y2="100" stroke="#685038" strokeWidth={5} />
                  <Ellipse cx="140" cy="180" rx="10" ry="9" fill="#EAE5D8" stroke="#7A6854" />
                  <Circle cx="80" cy="175" r="12" fill="#B35F42" />
                  <Circle cx="80" cy="165" r="8" fill="#5F883B" />
                </Svg>
              )}

              {postcard.id === 'evening-hearth' && (
                <Svg viewBox="0 0 400 200" width="100%" height="100%">
                  <Defs>
                    <LinearGradient id="roomBg" x1="0" y1="0" x2="0" y2="1">
                      <Stop offset="0%" stopColor="#473228" />
                      <Stop offset="100%" stopColor="#2D1F18" />
                    </LinearGradient>
                    <RadialGradient id="fireGlow" cx="50%" cy="65%" rx="60%" ry="60%">
                      <Stop offset="0%" stopColor="#FFC15E" stopOpacity="0.9" />
                      <Stop offset="40%" stopColor="#E86C3F" stopOpacity="0.6" />
                      <Stop offset="100%" stopColor="#473228" stopOpacity="0" />
                    </RadialGradient>
                  </Defs>
                  <Rect width="400" height="200" fill="url(#roomBg)" />
                  <Rect width="400" height="200" fill="url(#fireGlow)" />

                  <G transform="translate(140, 45)">
                    <Rect x="0" y="0" width="120" height="120" fill="#695346" rx="4" />
                    <Rect x="15" y="25" width="90" height="85" fill="#1C1410" rx="3" />
                    <Path d="M15 50 Q60 25 105 50 L105 110 L15 110 Z" fill="#17100D" />
                    <Rect x="30" y="90" width="60" height="14" fill="#3D2619" rx="3" />
                    <Polygon points="60,45 42,95 78,95" fill="#F49E42" />
                    <Polygon points="60,55 48,95 72,95" fill="#FFE885" />
                    <Polygon points="45,65 35,95 55,95" fill="#E85D3B" />
                    <Polygon points="75,65 65,95 85,95" fill="#E85D3B" />
                  </G>

                  <G transform="translate(280, 80)">
                    <Rect x="0" y="30" width="65" height="50" fill="#84523A" rx="6" />
                    <Ellipse cx="32" cy="30" rx="30" ry="12" fill="#9E684E" />
                    <Rect x="-8" y="20" width="16" height="50" fill="#6D412D" rx="4" />
                    <Rect x="58" y="20" width="16" height="50" fill="#6D412D" rx="4" />
                  </G>

                  <G transform="translate(170, 160)">
                    <Ellipse cx="30" cy="15" rx="35" ry="12" fill="#A88B69" opacity={0.6} />
                    <Ellipse cx="30" cy="12" rx="14" ry="9" fill="#E28945" />
                    <Circle cx="20" cy="10" r="6" fill="#E28945" />
                    <Polygon points="17,5 19,0 22,5" fill="#9C4F1A" />
                    <Polygon points="21,5 23,0 25,5" fill="#9C4F1A" />
                  </G>
                </Svg>
              )}

              {postcard.id === 'starlit-meadow' && (
                <Svg viewBox="0 0 400 200" width="100%" height="100%">
                  <Defs>
                    <LinearGradient id="nightSky" x1="0" y1="0" x2="0" y2="1">
                      <Stop offset="0%" stopColor="#12182E" />
                      <Stop offset="60%" stopColor="#1D2A4D" />
                      <Stop offset="100%" stopColor="#2D4645" />
                    </LinearGradient>
                  </Defs>
                  <Rect width="400" height="200" fill="url(#nightSky)" />
                  <Circle cx="80" cy="50" r="22" fill="#FFFCE6" />
                  <Circle cx="87" cy="46" r="19" fill="#1D2A4D" />
                  {/* Stars */}
                  {Array.from({ length: 30 }).map((_, i) => (
                    <Circle
                      key={i}
                      cx={(i * 37) % 390 + 5}
                      cy={(i * 19) % 110 + 5}
                      r={(i % 3) * 0.6 + 0.8}
                      fill="#FFFFFF"
                      opacity={(i % 5) * 0.15 + 0.4}
                    />
                  ))}
                  <Path d="M0 130 Q120 90 250 140 T400 130 L400 200 L0 200 Z" fill="#15261F" />
                  <Circle cx="120" cy="155" r="3" fill="#D6F88E" opacity={0.9} />
                  <Circle cx="210" cy="140" r="3.5" fill="#D6F88E" opacity={0.95} />
                  <Circle cx="310" cy="160" r="3" fill="#D6F88E" opacity={0.9} />
                </Svg>
              )}

              {/* Vintage Postage Stamp (Top-Right of Painting) */}
              <View className="absolute top-3 right-3 z-10 shadow-md">
                {renderStampIcon(postcard.stampIcon, postcard.stampColor, postcard.stampValue)}
              </View>

              {/* Scalloped Decorative Bottom Edge */}
              <View className="absolute -bottom-1.5 left-0 right-0 h-4 flex flex-row overflow-hidden">
                {Array.from({ length: 24 }).map((_, i) => (
                  <View
                    key={i}
                    className="w-5 h-5 -mt-3 rounded-full bg-white"
                  />
                ))}
              </View>
            </View>

            {/* Postcard Body Content */}
            <View className="p-5">
              <Text className="font-serif italic text-xl font-bold text-[#1C3212] mb-1.5">
                {postcard.title}
              </Text>

              <Text numberOfLines={3} className="text-xs text-[#556D47] leading-relaxed mb-4">
                {postcard.description}
              </Text>

              {/* Footer: EXP Tag and Play Button */}
              <View className="flex flex-row items-center justify-between pt-2 border-t border-[#EFE9DB]">
                <Text className="text-[10px] font-mono font-bold tracking-wider text-[#738B67]">
                  {postcard.expNumber}
                </Text>

                <Pressable
                  onPress={(e) => {
                    e.stopPropagation();
                    handleOpenExperience(postcard);
                  }}
                  className="p-1 active:scale-95"
                >
                  <PlayCircle size={28} color="#4E752D" fill="#EDF4E7" />
                </Pressable>
              </View>
            </View>
          </Pressable>
        ))}
      </View>

      {/* Fullscreen Immersive Experience Modal */}
      {selectedPostcard && (
        <PostcardExperienceModal
          postcard={selectedPostcard}
          onClose={() => setSelectedPostcard(null)}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 40,
  },
  titleText: {
    fontFamily: 'System',
  },
  card: {
    shadowColor: '#5C4E3D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
});

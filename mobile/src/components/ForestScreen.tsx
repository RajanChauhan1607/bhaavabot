import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, ScrollView, StyleSheet } from 'react-native';
import { Sprout, Sun, Moon, CloudSun, Sparkles, Plus } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ForestPlant } from '../types';
import { AvatarImage } from '../utils/assets';

interface ForestScreenProps {
  onPlaySound?: (type: 'cicadas' | 'rain' | 'ocean' | 'stream' | 'hearth' | 'wind') => void;
}

export const ForestScreen: React.FC<ForestScreenProps> = ({ onPlaySound }) => {
  const [spiritMoodText, setSpiritMoodText] = useState(
    'Welcome to the Sanctuary! Tap me gently or plant a thought seed.'
  );
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'noon' | 'twilight' | 'night'>('morning');
  const [thoughtInput, setThoughtInput] = useState('');
  const [isPlanting, setIsPlanting] = useState(false);
  const [plants, setPlants] = useState<ForestPlant[]>([
    {
      id: 'p1',
      name: 'Patience Willow',
      color: '#84B854',
      emotion: 'Growing slowly and with deep roots',
      plantedAt: 'Today',
      stage: 3,
    },
    {
      id: 'p2',
      name: 'Peace Clover',
      color: '#4DA686',
      emotion: 'Resting without guilt',
      plantedAt: 'Yesterday',
      stage: 3,
    },
  ]);

  const spiritQuotes = [
    '"Even the tallest ancient trees start as small seeds."',
    '"Like morning dew on moss, rest gently on this moment."',
    '"You are allowed to take up space and grow at your own natural pace."',
    '"The forest does not rush, yet everything is accomplished."',
    '"Take a deep breath. Let the wind carry away today\'s worries."',
    '"Thank you for spending a quiet moment with me on your digital desk!"',
  ];

  const handleSpiritTap = () => {
    const randomQuote = spiritQuotes[Math.floor(Math.random() * spiritQuotes.length)];
    setSpiritMoodText(randomQuote);
  };

  const handlePlantThought = () => {
    if (!thoughtInput.trim()) return;

    const flowerColors = ['#EE7960', '#F4A261', '#729846', '#4D908E', '#E76F51', '#9C6644'];
    const flowerNames = [
      'Mindful Daisy',
      'Golden Sunshine Buttercup',
      'Serene Iris',
      'Whispering Fern',
      'Tranquil Poppy',
    ];

    const newPlant: ForestPlant = {
      id: Date.now().toString(),
      name: flowerNames[Math.floor(Math.random() * flowerNames.length)],
      color: flowerColors[Math.floor(Math.random() * flowerColors.length)],
      emotion: thoughtInput.trim(),
      plantedAt: 'Just now',
      stage: 3,
    };

    setPlants([newPlant, ...plants]);
    setThoughtInput('');
    setIsPlanting(false);
    setSpiritMoodText(`Your seed "${newPlant.name}" has sprouted in the meadow!`);
  };

  const getTimeGradient = (): string[] => {
    switch (timeOfDay) {
      case 'morning':
        return ['#FDFBF7', '#F4F9ED', '#E2EED7'];
      case 'noon':
        return ['#FFFDF7', '#FDF5E2', '#E9F2D8'];
      case 'twilight':
        return ['#FAF2E8', '#F3E3D3', '#DFD0BC'];
      case 'night':
        return ['#1A2634', '#243542', '#1E2E28'];
      default:
        return ['#FDFBF7', '#F4F9ED', '#E2EED7'];
    }
  };

  const isDark = timeOfDay === 'night';
  const textTheme = isDark ? 'text-white' : 'text-[#2D3E24]';
  const subtitleTheme = isDark ? 'text-slate-300' : 'text-[#5D7550]';
  const titleTheme = isDark ? 'text-white' : 'text-[#1F3314]';

  return (
    <LinearGradient
      colors={getTimeGradient() as [string, string, ...string[]]}
      className="flex-1"
      style={styles.gradientContainer}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        className="flex-1 px-4 pt-4"
      >
        {/* Top Header: Time of Day Selector */}
        <View className="flex flex-row items-center justify-between mb-5">
          <View>
            <Text className={`font-serif text-2xl font-bold ${titleTheme}`}>
              Forest Sanctuary
            </Text>
            <Text className={`text-xs ${subtitleTheme}`}>Your peaceful meadow garden</Text>
          </View>

          {/* Time of Day Switcher Pills */}
          <View className="flex flex-row bg-[#E4ECD8]/85 p-1 rounded-full border border-[#D1DDC2]">
            <Pressable
              onPress={() => setTimeOfDay('morning')}
              className={`p-1.5 rounded-full ${
                timeOfDay === 'morning' ? 'bg-[#7C9D48]' : ''
              }`}
            >
              <CloudSun size={14} color={timeOfDay === 'morning' ? 'white' : '#445E36'} />
            </Pressable>
            <Pressable
              onPress={() => setTimeOfDay('noon')}
              className={`p-1.5 rounded-full ${
                timeOfDay === 'noon' ? 'bg-[#7C9D48]' : ''
              }`}
            >
              <Sun size={14} color={timeOfDay === 'noon' ? 'white' : '#445E36'} />
            </Pressable>
            <Pressable
              onPress={() => setTimeOfDay('twilight')}
              className={`p-1.5 rounded-full ${
                timeOfDay === 'twilight' ? 'bg-[#7C9D48]' : ''
              }`}
            >
              <Sparkles size={14} color={timeOfDay === 'twilight' ? 'white' : '#445E36'} />
            </Pressable>
            <Pressable
              onPress={() => setTimeOfDay('night')}
              className={`p-1.5 rounded-full ${
                timeOfDay === 'night' ? 'bg-[#7C9D48]' : ''
              }`}
            >
              <Moon size={14} color={timeOfDay === 'night' ? 'white' : '#445E36'} />
            </Pressable>
          </View>
        </View>

        {/* Interactive Companion Display Card */}
        <Pressable
          onPress={handleSpiritTap}
          style={styles.card}
          className="bg-white/90 p-5 rounded-3xl border border-[#E3DCBD] flex flex-row items-center space-x-4 mb-6"
        >
          <View className="relative shrink-0">
            <View className="w-16 h-16 rounded-full overflow-hidden bg-[#E5EED8] items-center justify-center border-4 border-[#7C9D48]/30 shadow-sm">
              <AvatarImage size={64} />
            </View>
            <View className="absolute bottom-0 right-0 bg-[#5A872E] p-1 rounded-full">
              <Sparkles size={10} color="white" />
            </View>
          </View>

          <View className="flex-1">
            <Text className="text-[10px] font-extrabold uppercase tracking-wider text-[#5A7E36] mb-1">
              Tap Companion for Peace
            </Text>
            <Text className="text-xs font-semibold text-[#2C411D] italic leading-relaxed">
              {spiritMoodText}
            </Text>
          </View>
        </Pressable>

        {/* Plant a Thought Seed Section */}
        <View className="mb-24">
          <View className="flex flex-row items-center justify-between mb-3 pl-1">
            <View className="flex flex-row items-center space-x-1.5">
              <Sprout size={18} color="#4C752D" />
              <Text className={`font-serif text-lg font-bold ${textTheme}`}>
                Thought Garden
              </Text>
            </View>
            <Pressable
              onPress={() => setIsPlanting(!isPlanting)}
              className="bg-[#E8F0DE] px-3.5 py-1.5 rounded-full flex flex-row items-center space-x-1 active:opacity-75"
            >
              <Plus size={14} color="#406222" />
              <Text className="text-xs font-bold text-[#406222]">Plant Seed</Text>
            </Pressable>
          </View>

          {/* Planting Form Input */}
          {isPlanting && (
            <View className="bg-white p-4 rounded-2xl border border-[#DFD6C2] shadow-sm mb-4">
              <Text className="text-xs font-semibold text-[#465E39] mb-2">
                What gratitude, intention, or thought would you like to plant today?
              </Text>
              <TextInput
                value={thoughtInput}
                onChangeText={setThoughtInput}
                placeholder="e.g. Taking it slow today..."
                placeholderTextColor="#819672"
                className="w-full text-sm p-3 bg-[#F9F7F1] border border-[#D5DCB8] rounded-xl text-[#263C1B] mb-3"
                autoFocus={true}
              />
              <View className="flex flex-row justify-end space-x-2">
                <Pressable
                  onPress={() => setIsPlanting(false)}
                  className="px-3.5 py-2 rounded-lg active:bg-slate-100"
                >
                  <Text className="text-xs font-semibold text-[#6F8264]">Cancel</Text>
                </Pressable>
                <Pressable
                  onPress={handlePlantThought}
                  className="px-4 py-2 rounded-lg bg-[#54792C] active:opacity-75 shadow-xs"
                >
                  <Text className="text-xs font-bold text-white">Sprout in Meadow</Text>
                </Pressable>
              </View>
            </View>
          )}

          {/* Garden Plant Cards */}
          <View className="space-y-3">
            {plants.map((plant) => (
              <View
                key={plant.id}
                style={styles.card}
                className="bg-white/95 p-4 rounded-2xl border border-[#E7DFCC] flex flex-row items-center justify-between mb-2.5"
              >
                <View className="flex flex-row items-center space-x-3 flex-1 pr-4">
                  <View
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 bg-[#EE7960]/10"
                    style={{ backgroundColor: `${plant.color}15` }}
                  >
                    <Text className="text-lg">🌸</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm font-bold text-[#283E1B]">
                      {plant.name}
                    </Text>
                    <Text numberOfLines={1} className="text-xs text-[#5F7550] mt-0.5">
                      "{plant.emotion}"
                    </Text>
                  </View>
                </View>
                <Text className="text-[10px] text-[#86997B] font-mono">
                  {plant.plantedAt}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  card: {
    shadowColor: '#5C4E3D',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
});

import React, { useState } from 'react';
import {
  Sprout,
  Sun,
  Moon,
  CloudSun,
  Heart,
  Sparkles,
  Smile,
  Check,
  Plus,
  Compass,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ForestPlant } from '../types';
import { ASSETS } from '../utils/assets';
import { natureAudio } from '../utils/audioEngine';

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
    try {
      confetti({
        particleCount: 15,
        spread: 45,
        origin: { y: 0.4 },
        colors: ['#88B849', '#EE7960', '#F7D674'],
      });
    } catch (e) {}
  };

  const handlePlantThought = (e: React.FormEvent) => {
    e.preventDefault();
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

    try {
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#A4C686', '#EE7960', '#F7D674'],
      });
    } catch (e) {}
  };

  const getTimeBg = () => {
    switch (timeOfDay) {
      case 'morning':
        return 'from-[#FDFBF7] via-[#F4F9ED] to-[#E2EED7]';
      case 'noon':
        return 'from-[#FFFDF7] via-[#FDF5E2] to-[#E9F2D8]';
      case 'twilight':
        return 'from-[#FAF2E8] via-[#F3E3D3] to-[#DFD0BC]';
      case 'night':
        return 'from-[#1A2634] via-[#243542] to-[#1E2E28] text-white';
      default:
        return 'from-[#FDFBF7] via-[#F4F9ED] to-[#E2EED7]';
    }
  };

  return (
    <div
      id="forest-screen"
      className={`min-h-[calc(100vh-60px)] pb-28 pt-4 px-4 sm:px-6 max-w-md mx-auto relative bg-gradient-to-b ${getTimeBg()} transition-colors duration-700`}
    >
      {/* Top Header: Time of Day Selector */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-display font-bold text-2xl tracking-tight text-[#1F3314]">
            Forest Sanctuary
          </h2>
          <p className="text-xs text-[#5D7550]">Your peaceful meadow garden</p>
        </div>

        {/* Time of Day Switcher Pills */}
        <div className="flex bg-[#E4ECD8]/80 backdrop-blur-xs p-1 rounded-full border border-[#D1DDC2]">
          <button
            id="time-morning-btn"
            onClick={() => setTimeOfDay('morning')}
            className={`p-1.5 rounded-full transition-colors ${
              timeOfDay === 'morning' ? 'bg-[#7C9D48] text-white' : 'text-[#445E36]'
            }`}
            title="Morning Dew"
          >
            <CloudSun className="w-3.5 h-3.5" />
          </button>
          <button
            id="time-noon-btn"
            onClick={() => setTimeOfDay('noon')}
            className={`p-1.5 rounded-full transition-colors ${
              timeOfDay === 'noon' ? 'bg-[#7C9D48] text-white' : 'text-[#445E36]'
            }`}
            title="Midday Sun"
          >
            <Sun className="w-3.5 h-3.5" />
          </button>
          <button
            id="time-twilight-btn"
            onClick={() => setTimeOfDay('twilight')}
            className={`p-1.5 rounded-full transition-colors ${
              timeOfDay === 'twilight' ? 'bg-[#7C9D48] text-white' : 'text-[#445E36]'
            }`}
            title="Twilight Sunset"
          >
            <Sparkles className="w-3.5 h-3.5" />
          </button>
          <button
            id="time-night-btn"
            onClick={() => setTimeOfDay('night')}
            className={`p-1.5 rounded-full transition-colors ${
              timeOfDay === 'night' ? 'bg-[#7C9D48] text-white' : 'text-[#445E36]'
            }`}
            title="Starlit Night"
          >
            <Moon className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Interactive Desk Spirit Companion Display */}
      <div
        id="desk-companion-card"
        onClick={handleSpiritTap}
        className="bg-white/90 backdrop-blur-xs p-5 rounded-3xl border border-[#E3DCBD] shadow-md mb-6 cursor-pointer hover:shadow-lg transition-all group"
      >
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <img
              src={ASSETS.avatar}
              alt="Bhaavabot"
              referrerPolicy="no-referrer"
              className="w-18 h-18 rounded-full bg-[#E5EED8] ring-4 ring-[#7C9D48]/30 group-hover:scale-105 transition-transform duration-300 shadow-sm"
            />
            <span className="absolute bottom-0 right-0 bg-[#5A872E] text-white p-1 rounded-full animate-bounce">
              <Sparkles className="w-3 h-3" />
            </span>
          </div>

          <div className="flex-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#5A7E36] block mb-1">
              Tap Companion for Peace
            </span>
            <p className="text-xs sm:text-[13px] text-[#2C411D] italic font-medium leading-relaxed">
              {spiritMoodText}
            </p>
          </div>
        </div>
      </div>

      {/* Plant a Thought Seed Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <Sprout className="w-4 h-4 text-[#4C752D]" />
            <h3 className="font-display font-semibold text-lg text-[#253B18]">Thought Garden</h3>
          </div>
          <button
            id="open-plant-modal-btn"
            onClick={() => setIsPlanting(!isPlanting)}
            className="text-xs font-semibold text-[#406222] bg-[#E8F0DE] hover:bg-[#DCE7CF] px-3 py-1.5 rounded-full flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Plant Seed</span>
          </button>
        </div>

        {/* Planting Form Input */}
        {isPlanting && (
          <form
            onSubmit={handlePlantThought}
            className="bg-white p-3.5 rounded-2xl border border-[#DFD6C2] shadow-sm mb-3 animate-in fade-in"
          >
            <label className="block text-xs font-medium text-[#465E39] mb-1.5">
              What gratitude, intention, or thought would you like to plant today?
            </label>
            <input
              type="text"
              value={thoughtInput}
              onChange={(e) => setThoughtInput(e.target.value)}
              placeholder="e.g. Taking it slow today..."
              className="w-full text-xs sm:text-sm p-2.5 bg-[#F9F7F1] border border-[#D5DCB8] rounded-xl text-[#263C1B] focus:outline-none focus:ring-1 focus:ring-[#759B46] mb-2"
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsPlanting(false)}
                className="px-3 py-1.5 text-xs text-[#6F8264] hover:bg-[#F2ECE0] rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3.5 py-1.5 text-xs font-semibold bg-[#54792C] hover:bg-[#436220] text-white rounded-lg transition-colors shadow-2xs"
              >
                Sprout in Meadow
              </button>
            </div>
          </form>
        )}

        {/* Garden Plant Cards */}
        <div className="space-y-2">
          {plants.map((plant) => (
            <div
              key={plant.id}
              className="bg-white/95 p-3 rounded-2xl border border-[#E7DFCC] shadow-2xs flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${plant.color}25`, color: plant.color }}
                >
                  🌸
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-[#283E1B]">
                    {plant.name}
                  </h4>
                  <p className="text-[11px] text-[#5F7550] line-clamp-1">"{plant.emotion}"</p>
                </div>
              </div>
              <span className="text-[10px] text-[#86997B] font-mono shrink-0">
                {plant.plantedAt}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

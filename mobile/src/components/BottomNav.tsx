import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { MessageSquare, Music2, Sparkles, Sprout } from 'lucide-react-native';
import { TabType } from '../types';

interface BottomNavProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab }) => {
  const effectiveTab = currentTab === 'home' ? 'home' : currentTab;

  const navItems = [
    {
      id: 'bhaava' as TabType,
      label: 'Bhaava',
      icon: MessageSquare,
    },
    {
      id: 'rhythm' as TabType,
      label: 'Rhythm',
      icon: Music2,
    },
    {
      id: 'explore' as TabType,
      label: 'Explore',
      icon: Sparkles,
    },
    {
      id: 'forest' as TabType,
      label: 'Forest',
      icon: Sprout,
    },
  ];

  return (
    <View className="absolute bottom-5 left-4 right-4 z-40 flex flex-row justify-center">
      <View className="w-full max-w-sm bg-[#E3EBDC]/95 border border-[#CCD8C2] rounded-full px-3 py-2 shadow-lg flex flex-row items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            effectiveTab === item.id ||
            (currentTab === 'home' && item.id === 'bhaava');

          return (
            <Pressable
              key={item.id}
              onPress={() => onSelectTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 rounded-full ${
                isActive ? 'bg-[#7C9D48] px-4 py-1.5 shadow-sm' : 'px-3'
              }`}
            >
              <Icon
                size={18}
                color={isActive ? '#14290A' : '#48633B'}
                strokeWidth={isActive ? 2.4 : 1.8}
              />
              <Text
                className={`text-[10px] tracking-tight leading-none mt-0.5 whitespace-nowrap ${
                  isActive ? 'font-bold text-[#14290A]' : 'font-medium text-[#48633B]'
                }`}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

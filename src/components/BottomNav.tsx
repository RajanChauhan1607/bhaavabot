import React from 'react';
import { MessageSquare, Music2, Sparkles, Sprout } from 'lucide-react';
import { TabType } from '../types';

interface BottomNavProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab }) => {
  // If we are on 'home', we can still highlight 'bhaava' or show standard dock
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
    <div className="fixed bottom-3 left-0 right-0 z-40 px-4 pointer-events-none flex justify-center">
      <nav
        id="bottom-navigation-dock"
        aria-label="Main Navigation"
        className="pointer-events-auto w-full max-w-sm bg-[#E3EBDC]/90 backdrop-blur-lg border border-[#CCD8C2]/90 rounded-full px-2 py-1.5 shadow-lg flex items-center justify-around transition-all duration-300"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            effectiveTab === item.id ||
            (currentTab === 'home' && item.id === 'bhaava');

          return (
            <button
              key={item.id}
              id={`nav-tab-${item.id}`}
              onClick={() => onSelectTab(item.id)}
              className={`flex flex-col items-center justify-center transition-all duration-200 focus:outline-none ${
                isActive
                  ? 'bg-[#7C9D48] text-[#1B320F] px-4 py-1.5 rounded-full shadow-xs'
                  : 'text-[#48633B] hover:text-[#253D1C] px-3 py-1 hover:bg-[#D7E3CE]/60 rounded-full'
              }`}
            >
              <Icon
                className={`transition-transform duration-200 ${
                  isActive ? 'w-5 h-5 text-[#14290A] stroke-[2.4]' : 'w-5 h-5 stroke-[1.8]'
                }`}
              />
              {/* On home screen screenshot, active tab is a compact green capsule with just the icon, or text on other tabs */}
              <span
                className={`text-[11px] tracking-tight leading-none mt-0.5 font-medium whitespace-nowrap ${
                  isActive ? 'font-semibold text-[#14290A]' : 'text-[#48633B]'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

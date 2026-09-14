import React, { useState, useEffect } from 'react';
import { TabType, ChatMessage, SoundTrack, SoundType } from './types';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { BhaavaScreen } from './components/BhaavaScreen';
import { RhythmScreen, SOUND_TRACKS } from './components/RhythmScreen';
import { ExploreScreen } from './components/ExploreScreen';
import { ForestScreen } from './components/ForestScreen';
import { natureAudio } from './utils/audioEngine';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [currentTrackId, setCurrentTrackId] = useState<string>('summer-cicadas');
  const [isPlayingSound, setIsPlayingSound] = useState<boolean>(false);
  const [isLoadingChat, setIsLoadingChat] = useState<boolean>(false);

  // Initial messages matching the exact sample from Image 5
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'bot',
      text: "Hello there! I'm Bhaavabot, your friendly forest spirit companion. It's a beautiful, quiet day in the meadow. How are you feeling today?",
      timestamp: '10:00 AM',
    },
    {
      id: 'm2',
      sender: 'user',
      text: "I'm feeling a bit overwhelmed with work, to be honest. Just need a moment of peace.",
      timestamp: '10:01 AM',
    },
    {
      id: 'm3',
      sender: 'bot',
      text: "Take a deep breath. Imagine the gentle rustle of leaves above you. Let's sit by the stream for a while. What's the heaviest thing on your mind right now?",
      gentleReminder: {
        title: 'Gentle Reminder',
        text: "Even the tallest ancient trees start as small seeds. It's okay to grow slowly today.",
      },
      timestamp: '10:02 AM',
    },
  ]);

  const handleSendMessage = async (text: string) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoadingChat(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-6).map((m) => ({ role: m.sender, content: m.text })),
        }),
      });

      const data = await response.json();

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text:
          data.reply ||
          "Take a slow, deep breath with me. Even in busy moments, you carry a quiet meadow inside you.",
        gentleReminder: data.gentleReminder || {
          title: 'Gentle Reminder',
          text: "Like a tree bending with the wind, give yourself permission to be flexible and soft today.",
        },
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      // Fallback message
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text:
          "The breeze in the meadow is gentle and calm. Let your shoulders drop, soften your gaze, and take one deep breath in and out.",
        gentleReminder: {
          title: 'Quiet Moment',
          text: 'Rest is not something you must earn; it is where your strength is born.',
        },
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoadingChat(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        sender: 'bot',
        text: "Hello! Welcome back to our quiet meadow. How is your heart feeling in this moment?",
        gentleReminder: {
          title: 'Gentle Reminder',
          text: "Pause for three full breaths. The world will wait for you.",
        },
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const handleTrackChange = (track: SoundTrack) => {
    setCurrentTrackId(track.id);
    natureAudio.play(track.type);
    setIsPlayingSound(true);
  };

  const handleTogglePlay = () => {
    if (isPlayingSound) {
      natureAudio.stop();
      setIsPlayingSound(false);
    } else {
      const activeTrack =
        SOUND_TRACKS.find((t) => t.id === currentTrackId) || SOUND_TRACKS[1];
      natureAudio.play(activeTrack.type);
      setIsPlayingSound(true);
    }
  };

  const handlePlaySound = (type: SoundType) => {
    const matchingTrack = SOUND_TRACKS.find((t) => t.type === type) || SOUND_TRACKS[0];
    setCurrentTrackId(matchingTrack.id);
    natureAudio.play(type);
    setIsPlayingSound(true);
  };

  return (
    <div className="min-h-screen bg-[#FBF8F1] flex flex-col font-sans text-[#2D3E24] selection:bg-[#D5E4C4]">
      {/* Top Application Header */}
      <Header
        currentTab={currentTab}
        onNavigate={setCurrentTab}
        onResetChat={handleResetChat}
      />

      {/* Main View Container */}
      <main className="flex-1 w-full max-w-lg mx-auto">
        {currentTab === 'home' && (
          <HomeScreen onNavigate={setCurrentTab} onPlaySound={handlePlaySound} />
        )}

        {currentTab === 'bhaava' && (
          <BhaavaScreen
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoadingChat}
          />
        )}

        {currentTab === 'rhythm' && (
          <RhythmScreen
            currentTrackId={currentTrackId}
            isPlaying={isPlayingSound}
            onTrackChange={handleTrackChange}
            onTogglePlay={handleTogglePlay}
          />
        )}

        {currentTab === 'explore' && (
          <ExploreScreen onPlaySound={handlePlaySound} />
        )}

        {currentTab === 'forest' && (
          <ForestScreen onPlaySound={handlePlaySound} />
        )}
      </main>

      {/* Floating Bottom Dock Navigation */}
      <BottomNav currentTab={currentTab} onSelectTab={setCurrentTab} />
    </div>
  );
}

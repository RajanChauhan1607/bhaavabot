import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { Send, Leaf, Volume2 } from 'lucide-react-native';
import * as Speech from 'expo-speech';
import { ChatMessage } from '../types';
import { AvatarImage } from '../utils/assets';

interface BhaavaScreenProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => Promise<void>;
  isLoading: boolean;
}

export const BhaavaScreen: React.FC<BhaavaScreenProps> = ({
  messages,
  onSendMessage,
  isLoading,
}) => {
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async () => {
    if (!inputText.trim() || isLoading) return;
    const text = inputText;
    setInputText('');
    await onSendMessage(text);
  };

  const handlePromptClick = (promptText: string) => {
    if (isLoading) return;
    onSendMessage(promptText);
  };

  // Soothing speech synthesis for gentle reminder
  const speakReminder = (text: string) => {
    Speech.stop();
    Speech.speak(text, {
      rate: 0.85,
      pitch: 1.05,
    });
  };

  const starterPrompts = [
    "I'm feeling a bit overwhelmed with work, to be honest.",
    "Can you guide me through a 2-minute calm breathing exercise?",
    "What is the meadow like this afternoon?",
    "Help me let go of today's tension.",
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 20}
      className="flex-1 bg-[#FBF8F1]"
    >
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent}
        className="flex-1 px-4 pt-4"
      >
        {messages.map((msg) => {
          if (msg.sender === 'bot') {
            return (
              <View
                key={msg.id}
                className="flex flex-row items-start space-x-2.5 max-w-[88%] mb-5"
              >
                {/* Bot Forest Spirit Avatar */}
                <View className="w-9 h-9 rounded-full overflow-hidden bg-[#EAF2DE] items-center justify-center border border-[#7C9D4B]/40 shadow-sm mt-0.5">
                  <AvatarImage size={36} />
                </View>

                {/* Bot Message Bubble */}
                <View className="bg-[#F8F6EF] border border-[#E7DFC8] rounded-2xl rounded-tl-none p-4 shadow-sm">
                  <Text className="text-[#2C3E21] text-base leading-relaxed">
                    {msg.text}
                  </Text>

                  {/* Signature "Gentle Reminder" Inset Card */}
                  {msg.gentleReminder && (
                    <View className="bg-[#EDF4E7] border border-[#D5E4C8] rounded-2xl p-4 mt-3 shadow-xs">
                      <View className="flex flex-row items-center justify-between mb-2">
                        <View className="flex flex-row items-center space-x-1.5">
                          <Leaf size={14} color="#4F7A2D" fill="#C7DEAF" />
                          <Text className="font-bold text-sm text-[#355720]">
                            {msg.gentleReminder.title || 'Gentle Reminder'}
                          </Text>
                        </View>
                        <Pressable
                          onPress={() => speakReminder(msg.gentleReminder?.text || '')}
                          className="text-[#658253] p-1 rounded bg-[#E4ECCF] active:opacity-75"
                        >
                          <Volume2 size={14} color="#4F7A2D" />
                        </Pressable>
                      </View>
                      <Text className="text-xs text-[#3E562F] font-normal leading-relaxed">
                        {msg.gentleReminder.text}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            );
          } else {
            return (
              <View key={msg.id} className="flex flex-row justify-end mb-5">
                {/* User Message Bubble */}
                <View className="bg-white border border-[#E3DCBD] rounded-2xl rounded-tr-none p-4 max-w-[80%] shadow-sm">
                  <Text className="text-[#25391B] text-base leading-relaxed">
                    {msg.text}
                  </Text>
                </View>
              </View>
            );
          }
        })}

        {/* Loading / Typing indicator */}
        {isLoading && (
          <View className="flex flex-row items-start space-x-2.5 max-w-[85%] mb-5">
            <View className="w-9 h-9 rounded-full overflow-hidden bg-[#EAF2DE] items-center justify-center border border-[#7C9D4B]/40 shadow-sm mt-0.5">
              <AvatarImage size={36} />
            </View>
            <View className="bg-[#F8F6EF] border border-[#E7DFC8] rounded-2xl rounded-tl-none p-4 shadow-sm flex flex-row items-center space-x-2">
              <View className="flex flex-row space-x-1">
                <Text className="text-[#759E44] font-bold">...</Text>
              </View>
              <Text className="text-xs text-[#5D734F] font-medium">
                Bhaavabot is listening gently...
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Suggested Quick Starters */}
      {messages.length <= 3 && !isLoading && (
        <View className="px-4 mb-3">
          <Text className="text-[11px] font-bold text-[#738A65] mb-2 uppercase tracking-wide">
            🌱 Gentle reflections:
          </Text>
          <View className="flex flex-row flex-wrap gap-2">
            {starterPrompts.map((prompt, idx) => (
              <Pressable
                key={idx}
                onPress={() => handlePromptClick(prompt)}
                className="bg-[#F1EBDD] border border-[#DFD6C2] px-3.5 py-2 rounded-full active:opacity-75"
              >
                <Text className="text-xs text-[#395328] font-semibold">{prompt}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}

      {/* Chat Input Bar */}
      <View className="px-4 pb-24 pt-2 bg-[#FBF8F1] border-t border-[#EAE3D2]/45">
        <View className="flex flex-row items-center bg-white border border-[#D5DCB8] rounded-full shadow-sm px-4 py-2 relative">
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            placeholder="Tell Bhaavabot what's on your mind..."
            placeholderTextColor="#819672"
            editable={!isLoading}
            className="flex-1 bg-transparent text-[#263C1B] text-sm py-1.5 pr-10"
          />
          <Pressable
            onPress={handleSubmit}
            disabled={!inputText.trim() || isLoading}
            className="absolute right-2 w-9 h-9 rounded-full bg-[#4E762E] items-center justify-center active:opacity-75 disabled:opacity-40"
          >
            <Send size={15} color="white" />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 20,
  },
});

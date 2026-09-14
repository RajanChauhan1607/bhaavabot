import React, { useState, useRef, useEffect } from 'react';
import { Send, Leaf, Sparkles, Volume2, Sprout, CornerDownLeft } from 'lucide-react';
import { ChatMessage } from '../types';
import { ASSETS } from '../utils/assets';

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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85;
      utterance.pitch = 1.05;
      window.speechSynthesis.speak(utterance);
    }
  };

  const starterPrompts = [
    "I'm feeling a bit overwhelmed with work, to be honest. Just need a moment of peace.",
    "Can you guide me through a 2-minute calm breathing exercise?",
    "What is the meadow like this afternoon?",
    "Help me let go of today's tension.",
  ];

  return (
    <div
      id="bhaava-chat-screen"
      className="min-h-[calc(100vh-60px)] pb-28 pt-4 px-4 sm:px-6 flex flex-col justify-between max-w-md mx-auto relative bg-[#FBF8F1]"
    >
      {/* Chat Messages Feed */}
      <div className="space-y-4 flex-1 overflow-y-auto pt-2 pb-6">
        {messages.map((msg) => {
          if (msg.sender === 'bot') {
            return (
              <div
                key={msg.id}
                id={`chat-msg-${msg.id}`}
                className="flex items-start gap-2.5 max-w-[92%] sm:max-w-[88%] animate-in fade-in slide-in-from-bottom-2 duration-300"
              >
                {/* Bot Forest Spirit Avatar */}
                <div className="shrink-0 mt-0.5">
                  <img
                    src={ASSETS.avatar}
                    alt="Bhaavabot Avatar"
                    referrerPolicy="no-referrer"
                    className="w-9 h-9 rounded-full object-cover bg-[#EAF2DE] ring-1.5 ring-[#7C9D4B]/40 shadow-xs"
                  />
                </div>

                {/* Bot Message Bubble */}
                <div className="bg-[#F8F6EF] text-[#2C3E21] border border-[#E7DFC8] rounded-2xl rounded-tl-xs p-4 shadow-2xs text-[15px] sm:text-[15.5px] leading-relaxed space-y-3">
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* Signature "Gentle Reminder" Inset Card (as shown in Image 5) */}
                  {msg.gentleReminder && (
                    <div
                      id="gentle-reminder-card"
                      className="bg-[#EDF4E7] border border-[#D5E4C8] rounded-xl p-3.5 mt-2 transition-all hover:border-[#BED6AC] shadow-2xs"
                    >
                      <div className="flex items-center justify-between gap-1.5 mb-1.5 text-[#355720]">
                        <div className="flex items-center gap-1.5 font-semibold text-sm">
                          <Leaf className="w-4 h-4 text-[#4F7A2D] fill-[#C7DEAF]" />
                          <span>{msg.gentleReminder.title || 'Gentle Reminder'}</span>
                        </div>
                        <button
                          id="listen-reminder-btn"
                          onClick={() => speakReminder(msg.gentleReminder?.text || '')}
                          title="Listen to peaceful voice"
                          className="text-[#658253] hover:text-[#2A4418] p-1 rounded-md transition-colors"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs sm:text-[13px] text-[#3E562F] font-normal leading-relaxed">
                        {msg.gentleReminder.text}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          } else {
            return (
              <div
                key={msg.id}
                id={`chat-msg-${msg.id}`}
                className="flex justify-end animate-in fade-in slide-in-from-bottom-2 duration-300"
              >
                {/* User Message Bubble */}
                <div className="bg-white text-[#25391B] border border-[#E3DCBD] rounded-2xl rounded-tr-xs p-3.5 sm:p-4 max-w-[85%] sm:max-w-[80%] shadow-2xs text-[15px] sm:text-[15.5px] leading-relaxed">
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            );
          }
        })}

        {/* Loading / Typing indicator */}
        {isLoading && (
          <div className="flex items-start gap-2.5 max-w-[85%] animate-in fade-in">
            <div className="shrink-0 mt-0.5">
              <img
                src={ASSETS.avatar}
                alt="Bhaavabot Avatar"
                referrerPolicy="no-referrer"
                className="w-9 h-9 rounded-full object-cover bg-[#EAF2DE] ring-1.5 ring-[#7C9D4B]/40"
              />
            </div>
            <div className="bg-[#F8F6EF] border border-[#E7DFC8] rounded-2xl rounded-tl-xs p-3.5 shadow-2xs flex items-center gap-2 text-xs text-[#5D734F]">
              <span className="inline-flex gap-1">
                <span className="w-2 h-2 rounded-full bg-[#759E44] animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-[#759E44] animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-[#759E44] animate-bounce [animation-delay:0.4s]"></span>
              </span>
              <span>Bhaavabot is listening gently...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Starters (if conversation is fresh or for quick tap) */}
      {messages.length <= 3 && !isLoading && (
        <div className="mb-3">
          <p className="text-[11px] font-medium text-[#738A65] mb-1.5 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#7B9E4C]" />
            <span>Gentle reflections:</span>
          </p>
          <div className="flex flex-wrap gap-1.5">
            {starterPrompts.map((prompt, idx) => (
              <button
                key={idx}
                id={`prompt-pill-${idx}`}
                onClick={() => handlePromptClick(prompt)}
                className="text-xs text-[#395328] bg-[#F1EBDD]/80 hover:bg-[#E7DFC8] active:scale-98 border border-[#DFD6C2] px-3 py-1.5 rounded-full transition-all text-left line-clamp-1 shadow-2xs"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Input Bar (Matches Image 5 bottom bar) */}
      <div className="sticky bottom-16 z-30 pt-1">
        <form
          onSubmit={handleSubmit}
          className="relative flex items-center bg-white border border-[#D5DCB8] rounded-full shadow-md px-4 py-2 focus-within:ring-2 focus-within:ring-[#759B46]/50 focus-within:border-[#759B46] transition-all"
        >
          <input
            ref={inputRef}
            id="bhaavabot-input-field"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Tell Bhaavabot what's on your mind..."
            disabled={isLoading}
            className="w-full bg-transparent text-[#263C1B] placeholder-[#819672] text-sm sm:text-base focus:outline-none pr-10"
          />

          <button
            id="send-message-btn"
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="absolute right-1.5 w-9 h-9 rounded-full bg-[#4E762E] hover:bg-[#406224] active:scale-95 disabled:opacity-40 disabled:hover:bg-[#4E762E] text-white flex items-center justify-center transition-all cursor-pointer shadow-xs"
            title="Send to Bhaavabot"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </form>
      </div>
    </div>
  );
};

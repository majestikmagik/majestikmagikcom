import React from 'react';
import { XMarkIcon, MagicWandIcon } from './Icons'; // Assuming Icons.tsx exists and exports these

interface ChatMessage {
  id: string;
  text: string | undefined;
  sender: 'user' | 'ai';
}

interface ChatbotProps {
  isChatOpen: boolean;
  handleToggleChat: () => void;
  chatMessages: ChatMessage[];
  chatInput: string;
  handleChatInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSendChatMessage: (e?: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isChatLoading: boolean;
  chatError: string | null;
  isGeminiInitialized: boolean;
  chatMessagesEndRef: React.RefObject<HTMLDivElement>;
  handleViewPolicy: (policy: string) => void; 
}

const Chatbot: React.FC<ChatbotProps> = ({
  isChatOpen,
  handleToggleChat,
  chatMessages,
  chatInput,
  handleChatInputChange,
  handleSendChatMessage,
  isChatLoading,
  chatError,
  isGeminiInitialized,
  chatMessagesEndRef,
  handleViewPolicy,
  // Assuming this is passed down for policy viewing
}) => {
return (
  <>
    <button
      onClick={handleToggleChat}
      className="fixed bottom-6 right-6 bg-gradient-to-br from-indigo-600 to-purple-700 hover:from-indigo-500 hover:to-purple-600 text-white p-4 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 cursor-pointer z-50 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:ring-opacity-50"
      aria-label={isChatOpen ? "Close chat" : "Open chat assistant"}
      disabled={!isGeminiInitialized && chatMessages.length === 0}
    >
      {isChatOpen ? <XMarkIcon className="w-8 h-8" /> : <img src="https://www.svgrepo.com/show/97854/headphones.svg" alt="Support icon" className="w-8 h-8 filter brightness-0 invert" />}
    </button>

    <div
      className={`fixed bottom-20 right-6 w-[300px] max-w-sm h-[70vh] max-h-[500px] bg-slate-800 rounded-xl shadow-2xl flex flex-col z-50 overflow-hidden border border-slate-700 transition-all duration-300 ease-out transform origin-bottom-right 
        ${isChatOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="chat-assistant-heading"
    >
        <div className="flex items-center justify-between p-4 border-b bg-slate-900 border-slate-700">
          <h3 id="chat-assistant-heading" className="flex items-center text-md font-semibold text-indigo-400">
            <MagicWandIcon className="w-5 h-5 mr-2 text-pink-500" />
            Majestik Magik AI Agent
          </h3>
          <button
            onClick={handleToggleChat}
            className="transition-colors text-slate-400 hover:text-slate-200"
            aria-label="Close chat window"
          >
            <XMarkIcon className="cursor-pointer w-6 h-6" />
          </button>
        </div>

        <div className="flex-grow p-4 overflow-y-auto space-y-3 bg-slate-800/50" id="chat-messages-container" aria-live="polite">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-xl text-sm leading-relaxed whitespace-pre-wrap
                    ${msg.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-none'
                    : 'bg-slate-700 text-slate-200 rounded-bl-none'
                  }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isChatLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] p-3 rounded-xl text-sm bg-slate-700 text-slate-200 rounded-bl-none animate-pulse" aria-label="AI is typing">
                <span className="inline-block w-2 h-2 mr-1 rounded-full bg-slate-400 animate-bounce delay-0"></span>
                <span className="inline-block w-2 h-2 mr-1 rounded-full bg-slate-400 animate-bounce delay-150"></span>
                <span className="inline-block w-2 h-2 rounded-full bg-slate-400 animate-bounce delay-300"></span>
              </div>
            </div>
          )}
          <div ref={chatMessagesEndRef} />
        </div>

        {chatError && !isChatLoading && (
          <p className="px-4 pb-2 text-xs text-center text-red-400" role="alert">
            {chatError}
          </p>
        )}
        {!isGeminiInitialized && !chatError && chatMessages.length > 0 && chatMessages[0].text && chatMessages[0].text.includes("unavailable") && (
          <p className="px-4 pb-2 text-xs text-center text-yellow-400" role="status">
            Chatbot functionality requires Gemini AI to be initialized.
          </p>
        )}

        <div className="px-3 pt-2 text-xs text-center text-slate-500">
            By using chat, you agree to our{' '}
            <button
              onClick={() => handleViewPolicy('privacy-policy')}
              className="underline transition-colors cursor-pointer hover:text-indigo-400"
              aria-label="View Privacy Policy"
            >
              Privacy Policy
            </button>
            . AI conversations may be reviewed.
          </div>
        <form onSubmit={handleSendChatMessage} className="flex items-center p-3 space-x-2 border-t bg-slate-900 border-slate-700">
          <input
            type="text"
            value={chatInput}
            onChange={handleChatInputChange}
            placeholder={isGeminiInitialized ? "Ask about Majestik Magik..." : "Chat unavailable..."}
            className="flex-grow p-2.5 text-sm transition-colors duration-300 border rounded-md bg-slate-700 text-slate-200 border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-slate-500"
            aria-label="Chat message input"
            disabled={isChatLoading || !isGeminiInitialized}
          />
          <button
            type="submit"
            disabled={isChatLoading || !chatInput.trim() || !isGeminiInitialized}
            className="cursor-pointer p-2.5 text-white transition-colors duration-300 rounded-md shadow-md bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-600 disabled:cursor-not-allowed"
            aria-label="Send chat message"
          >
            <img src="https://www.svgrepo.com/show/489766/paperplane.svg" className="w-5 h-5 filter brightness-0 invert" alt="Send message" />
          </button>
        </form>
    </div>
  </>
);
};

export default Chatbot;
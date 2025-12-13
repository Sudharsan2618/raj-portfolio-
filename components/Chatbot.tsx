import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import { useChatbot } from '../contexts/ChatbotContext';

const Chatbot: React.FC = () => {
  const { isChatbotOpen: isOpen, setIsChatbotOpen: setIsOpen } = useChatbot();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Vanakkam! I am the AI assistant for Raj Kanna.S. Ask me about his lineage, his work with the Youth Congress, or his recent book initiatives.',
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Prepare history for API context (excluding the very first welcome message if needed, or keeping it)
      const historyForApi = messages.map(m => ({ role: m.role, text: m.text }));

      const responseText = await sendMessageToGemini(userMsg.text, historyForApi);

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error("Chat error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 bg-red-600 text-white p-3 sm:p-4 rounded-full shadow-2xl hover:bg-red-700 focus:bg-red-700 transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-gray-50"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
        aria-controls="chatbot-window"
      >
        {isOpen ? <X size={24} aria-hidden="true" /> : <MessageCircle size={28} aria-hidden="true" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chatbot-window"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 sm:bottom-24 right-4 left-4 sm:left-auto sm:right-6 sm:w-[90vw] md:w-96 max-w-md h-[calc(100vh-6rem)] sm:h-[500px] max-h-[600px] bg-white rounded-xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden"
            role="dialog"
            aria-label="Chat with Raj Kanna AI Assistant"
            aria-modal="true"
          >
            {/* Header */}
            <div className="bg-black text-white p-3 sm:p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center font-bold border-2 border-white shrink-0" aria-hidden="true">
                AI
              </div>
              <div>
                <h3 className="font-bold text-sm">Raj Kanna AI Assistant</h3>
                <p className="text-xs text-gray-400">Online | Dravidian Ideology</p>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gray-50" role="log" aria-live="polite" aria-label="Chat messages">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm leading-relaxed ${msg.role === 'user'
                      ? 'bg-red-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 border border-gray-200 shadow-sm rounded-bl-none'
                      }`}
                  >
                    {msg.role === 'model' ? (
                      <ReactMarkdown
                        components={{
                          strong: ({ children }) => <strong className="font-bold text-red-700">{children}</strong>,
                          em: ({ children }) => <em className="italic">{children}</em>,
                          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                          ul: ({ children }) => <ul className="list-disc list-inside mb-2">{children}</ul>,
                          ol: ({ children }) => <ol className="list-decimal list-inside mb-2">{children}</ol>,
                          li: ({ children }) => <li className="mb-1">{children}</li>,
                        }}
                      >
                        {msg.text}
                      </ReactMarkdown>
                    ) : (
                      msg.text
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 p-3 rounded-lg rounded-bl-none shadow-sm flex items-center gap-2">
                    <Loader2 className="animate-spin text-red-600" size={16} />
                    <span className="text-xs text-gray-500">Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 border-t bg-white flex gap-2">
              <label htmlFor="chat-input" className="sr-only">Type your message</label>
              <input
                id="chat-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about Raj or his legacy..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600 transition-all"
                aria-label="Chat input"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="p-2 bg-black text-white rounded-full hover:bg-gray-800 focus:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
                aria-label="Send message"
              >
                <Send size={18} aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;

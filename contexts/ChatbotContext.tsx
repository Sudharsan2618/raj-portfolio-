import React, { createContext, useContext, useState, useRef, ReactNode } from 'react';

interface ChatbotContextType {
    isChatbotOpen: boolean;
    setIsChatbotOpen: (isOpen: boolean) => void;
    isVideoPlaying: boolean;
    setIsVideoPlaying: (isPlaying: boolean) => void;
    pauseBackgroundMusic: () => void;
    resumeBackgroundMusic: () => void;
    registerMusicControls: (controls: { pause: () => void; resume: () => void }) => void;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export const ChatbotProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const musicControlsRef = useRef<{ pause: () => void; resume: () => void } | null>(null);

    const registerMusicControls = (controls: { pause: () => void; resume: () => void }) => {
        musicControlsRef.current = controls;
    };

    const pauseBackgroundMusic = () => {
        musicControlsRef.current?.pause();
    };

    const resumeBackgroundMusic = () => {
        musicControlsRef.current?.resume();
    };

    return (
        <ChatbotContext.Provider value={{
            isChatbotOpen,
            setIsChatbotOpen,
            isVideoPlaying,
            setIsVideoPlaying,
            pauseBackgroundMusic,
            resumeBackgroundMusic,
            registerMusicControls
        }}>
            {children}
        </ChatbotContext.Provider>
    );
};

export const useChatbot = (): ChatbotContextType => {
    const context = useContext(ChatbotContext);
    if (context === undefined) {
        throw new Error('useChatbot must be used within a ChatbotProvider');
    }
    return context;
};

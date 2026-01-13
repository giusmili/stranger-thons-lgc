'use client';

import React, { useCallback, useState } from 'react';
import { Header } from '@/components/Header';
import { ConnectScreen } from '@/components/ConnectScreen';
import { ChatInterface } from '@/components/ChatInterface';
import type { ChatState, Persona } from '@/types';
import { PERSONAS, SEARCH_DURATION_MS } from '@/constants';
import { initializeChat } from '@/services/geminiService';

export default function HomePage() {
  const [chatState, setChatState] = useState<ChatState>('idle');
  const [currentPersona, setCurrentPersona] = useState<Persona | null>(null);
  const currentYear = new Date().getFullYear();

  const startConnection = useCallback(() => {
    setChatState('searching');
    setCurrentPersona(null);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * PERSONAS.length);
      const persona = PERSONAS[randomIndex];

      initializeChat(persona);

      setCurrentPersona(persona);
      setChatState('connected');
    }, SEARCH_DURATION_MS);
  }, []);

  const handleDisconnect = () => {
    if (window.confirm('Disconnect signal? Connection will be lost.')) {
      setChatState('idle');
      setCurrentPersona(null);
    }
  };

  const handleSkip = () => {
    startConnection();
  };

  return (
    <div className="app-shell">
      <Header />

      <main className="main-content">
        {chatState === 'connected' && currentPersona ? (
          <ChatInterface persona={currentPersona} onDisconnect={handleDisconnect} onNewStranger={handleSkip} />
        ) : (
          <ConnectScreen onConnect={startConnection} chatState={chatState} />
        )}
      </main>

      {chatState !== 'connected' && (
        <>
          <div className="red-fog pulse-slow" />
          <div className="dark-fog" />
          <div className="top-gradient" />
        </>
      )}

      <footer className="site-footer">
        <p>&copy; - Stranger Thing LGC - {currentYear}</p>
      </footer>
    </div>
  );
}

import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ConnectScreen } from './components/ConnectScreen';
import { ChatInterface } from './components/ChatInterface';
import { ChatState, Persona } from './types';
import { PERSONAS, SEARCH_DURATION_MS } from './constants';
import { initializeChat } from './services/geminiService';

const App: React.FC = () => {
  const [chatState, setChatState] = useState<ChatState>('idle');
  const [currentPersona, setCurrentPersona] = useState<Persona | null>(null);

  const startConnection = useCallback(() => {
    setChatState('searching');
    setCurrentPersona(null);

    // Simulate "Finding" delay
    setTimeout(() => {
      // Pick random persona
      const randomIndex = Math.floor(Math.random() * PERSONAS.length);
      const persona = PERSONAS[randomIndex];
      
      // Initialize Gemini Service
      initializeChat(persona);

      setCurrentPersona(persona);
      setChatState('connected');
    }, SEARCH_DURATION_MS);
  }, []);

  const handleDisconnect = () => {
    if (window.confirm("Disconnect signal? Connection will be lost.")) {
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
           <ChatInterface 
             persona={currentPersona} 
             onDisconnect={handleDisconnect}
             onNewStranger={handleSkip}
           />
        ) : (
           <ConnectScreen 
             onConnect={startConnection} 
             chatState={chatState} 
           />
        )}
      </main>

      {/* Atmospheric Background Elements */}
      {chatState !== 'connected' && (
        <>
          <div className="red-fog pulse-slow"></div>
          
          <div className="dark-fog"></div>
          
          <div className="top-gradient"></div>
        </>
      )}

      <footer className="site-footer">
        <p>&copy; - Stranger Thing LGC - </p>
      </footer>
    </div>
   
  );
};

export default App;

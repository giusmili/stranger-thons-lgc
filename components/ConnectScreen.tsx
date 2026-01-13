import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Zap } from 'lucide-react';
import { Button } from './Button';
import { ChatState } from '../types';

interface ConnectScreenProps {
  onConnect: () => void;
  chatState: ChatState;
}

export const ConnectScreen: React.FC<ConnectScreenProps> = ({ onConnect, chatState }) => {
  const [dots, setDots] = useState('');

  const loadingMessages = [
    "TUNING INTO THE UPSIDE DOWN",
    "ESTABLISHING PSYCHIC LINK",
    "SEARCHING HAWKINS LAB RECORDS",
    "AVOIDING DEMOGORGONS",
  ];
  
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    if (chatState === 'searching') {
      const interval = setInterval(() => {
        setDots(prev => prev.length >= 3 ? '' : prev + '.');
      }, 500);
      const msgInterval = setInterval(() => {
        setMsgIndex(prev => (prev + 1) % loadingMessages.length);
      }, 2000);
      return () => {
        clearInterval(interval);
        clearInterval(msgInterval);
      }
    } else {
      setDots('');
    }
  }, [chatState]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="connect-screen fade-in">
      
      {/* Central Image Container */}
      <div className="hero-wrapper">
        <div className="hero-glow"></div>
        
        <div className="hero-frame">
          <Image
            src="/asset/cover.png"
            alt="Stranger Things LGC"
            className="hero-image"
            fill
            priority
            sizes="(max-width: 768px) 90vw, 720px"
          />
        </div>
      </div>

      <div className="connect-copy">
        <p className="status-text">
          {chatState === 'searching' 
            ? <span className="status-highlight pulse-slow">{loadingMessages[msgIndex]}{dots}</span>
            : "Connect with a mystery persona from the other side. Do not trust what you see."}
        </p>
      </div>

      <div className="connect-actions">
        <Button 
          onClick={onConnect} 
          disabled={chatState === 'searching'}
          className="btn-wide"
        >
          {chatState === 'searching' ? (
            'CONNECTING...'
          ) : (
            <>
              ENTER THE VOID <Zap size={16} className="icon-inline" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { Send, X, RefreshCw, Radio } from 'lucide-react';
import { Message, Persona, Sender } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import { TypingIndicator } from './TypingIndicator';

interface ChatInterfaceProps {
  persona: Persona;
  onDisconnect: () => void;
  onNewStranger: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ persona, onDisconnect, onNewStranger }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      text: `*SIGNAL ESTABLISHED*\n\n**${persona.name}**\n${persona.tagline}`,
      sender: Sender.SYSTEM,
      timestamp: Date.now()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    const fetchGreeting = async () => {
      setIsTyping(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      let fullResponse = "";
      const stream = sendMessageToGemini("Hello! Who are you?");
      
      for await (const chunk of stream) {
        fullResponse += chunk;
      }
      
      const newMsg: Message = {
        id: Date.now().toString(),
        text: fullResponse,
        sender: Sender.BOT,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, newMsg]);
      setIsTyping(false);
    };

    fetchGreeting();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: Sender.USER,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    let fullResponse = '';
    const botMsgId = (Date.now() + 1).toString();
    
    setMessages(prev => [
      ...prev, 
      { id: botMsgId, text: '', sender: Sender.BOT, timestamp: Date.now() }
    ]);

    try {
      const stream = sendMessageToGemini(userMsg.text);
      
      for await (const chunk of stream) {
        fullResponse += chunk;
        setMessages(prev => prev.map(msg => 
          msg.id === botMsgId ? { ...msg, text: fullResponse } : msg
        ));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chat-panel">
      {/* Vignette effect */}
      <div className="vignette-overlay"></div>

      {/* Persona Header */}
      <div className="persona-bar">
        <div className="persona-meta">
          <div className="avatar-wrapper">
             <div className="avatar-glow"></div>
             <div className="avatar-circle">
                {persona.avatarEmoji}
             </div>
             <div className="status-light"></div>
          </div>
          <div>
            <h3 className="persona-name">{persona.name}</h3>
            <div className="live-status">
               <Radio size={12} className="live-icon" />
               LIVE SIGNAL
            </div>
          </div>
        </div>
        <div className="persona-actions">
          <button 
            onClick={onNewStranger}
            className="icon-button"
            title="Next Stranger"
          >
            <RefreshCw size={20} />
          </button>
          <button 
            onClick={onDisconnect}
            className="icon-button danger"
            title="Disconnect"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="chat-body">
        {messages.map((msg) => {
           if (msg.sender === Sender.SYSTEM) {
             return (
               <div key={msg.id} className="system-banner">
                  <span className="system-pill">
                    {msg.text.split('\n')[0]}
                  </span>
               </div>
             );
           }

           const isUser = msg.sender === Sender.USER;
           return (
             <div key={msg.id} className={`message-row ${isUser ? 'align-right' : 'align-left'} slide-up`}>
               <div 
                 className={`message-card ${isUser ? 'from-user' : 'from-bot'}`}
               >
                 <div className={`message-corner ${isUser ? 'user-corner' : 'bot-corner'}`}></div>
                 
                 {msg.text || <span className="message-placeholder">receiving transmission...</span>}
               </div>
             </div>
           );
        })}
        
        {isTyping && (
          <div className="typing-row fade-in">
             <TypingIndicator />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="input-bar">
        <form 
          onSubmit={handleSendMessage}
          className="input-form"
        >
          <div className="input-shell">
             <div className="input-glow"></div>
             <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message..."
                className="chat-input"
                autoFocus
              />
          </div>
          <button aria-label="Send Message"
            type="submit" 
            disabled={!inputValue.trim() || isTyping}
            className="send-button"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

'use client';

import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { Persona } from '../types';

let chatSession: Chat | null = null;

export const initializeChat = (persona: Persona): void => {
  try {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    if (!apiKey) {
      console.error("API Key not found");
      return;
    }

    const ai = new GoogleGenAI({ apiKey });
    
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `You are roleplaying as a character named ${persona.name}. 
        Your tagline is: ${persona.tagline}.
        Character Description: ${persona.description}.
        
        RULES:
        1. Stay in character at all times. Never admit you are an AI.
        2. Keep responses concise (under 3-4 sentences usually) to keep the chat flowing, unless a story is requested.
        3. Be engaging, funny, and unpredictable based on your character.
        4. If the user asks who you are, introduce yourself as ${persona.name}.
        `,
        temperature: 0.9, // High creativity for fun characters
        topK: 40,
        maxOutputTokens: 500,
      },
    });
  } catch (error) {
    console.error("Failed to initialize chat:", error);
    chatSession = null;
  }
};

export const sendMessageToGemini = async function* (message: string): AsyncGenerator<string, void, unknown> {
  if (!chatSession) {
    yield "Error: Connection lost. Please reconnect.";
    return;
  }

  try {
    const result = await chatSession.sendMessageStream({ message });
    
    for await (const chunk of result) {
      const responseChunk = chunk as GenerateContentResponse;
      if (responseChunk.text) {
        yield responseChunk.text;
      }
    }
  } catch (error) {
    console.error("Error sending message:", error);
    yield " *Connection glitch...* (The stranger seems to have vanished)";
  }
};

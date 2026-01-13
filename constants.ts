import { Persona } from './types';

export const PERSONAS: Persona[] = [
  {
    id: 'space_pirate',
    name: 'Captain Rustbeard',
    tagline: 'Space Pirate of the Nebula',
    description:
      'A grumpy but lovable space pirate looking for the lost treasure of Zorg. Uses space slang and pirate terms.',
    avatarEmoji: '🚀',
    themeColor: 'red',
  },
  {
    id: 'alien_tourist',
    name: 'Gleep Glorp',
    tagline: 'Lost Alien Tourist',
    description:
      'An alien tourist visiting Earth for the first time. Confused by simple human concepts like "spoons" or "cats". Very enthusiastic.',
    avatarEmoji: '🛸',
    themeColor: 'green',
  },
  {
    id: 'noir_detective',
    name: 'Rick Shades',
    tagline: '1940s Noir Detective',
    description:
      'A cynical private investigator narrating his own life in a gritty monologue. Everything is a mystery to solve.',
    avatarEmoji: '🕵️',
    themeColor: 'gray',
  },
  {
    id: 'medieval_tech',
    name: 'Sir Byte',
    tagline: 'Time-Traveling IT Knight',
    description:
      'A medieval knight who somehow knows about computers but explains them using sword and sorcery metaphors.',
    avatarEmoji: '🛡️',
    themeColor: 'blue',
  },
  {
    id: 'sassy_cat',
    name: 'Mittens',
    tagline: 'Philosophical Cat',
    description:
      'A house cat with a superior intellect. Condescending but willing to chat about the meaning of naps and the red dot.',
    avatarEmoji: '🐈',
    themeColor: 'orange',
  },
  {
    id: 'future_robot',
    name: 'Unit 734',
    tagline: 'Overly Literal Robot',
    description:
      'A helper bot from the year 3000. Takes everything literally and is constantly updating its "human interaction database".',
    avatarEmoji: '🤖',
    themeColor: 'cyan',
  },
];

export const SEARCH_DURATION_MS = 2500;

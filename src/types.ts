export type FlashcardCategory =
  | 'types-of-homes'
  | 'house-parts'
  | 'adjectives'
  | 'eco-house'
  | 'strange-buildings'
  | 'famous-places'
  | 'hobbit-words';

export interface Flashcard {
  id: string;
  word: string;
  translation: string;
  category: FlashcardCategory;
  example: string;
  lesson: '3.1' | '3.2' | '3.3' | '3.4' | '3.5' | '3.6';
  funFact?: string;
  imageUrl?: string;
}

export interface MatchPair {
  id: string;
  sentence: string;
  purpose: string;
  verb: string;
}

export interface RhymePair {
  id: string;
  word1: string;
  word2: string;
  verse: number;
}

export type QuestionCategory = 
  | 'listening'
  | 'vocabulary' 
  | 'grammar' 
  | 'reading' 
  | 'writing';

export interface SATQuestion {
  id: number;
  number: number;
  category: QuestionCategory;
  part: 1 | 2 | 3 | 4 | 5;
  points: number;
  question: string;
  options?: string[]; // Multiple choice options
  correctAnswer: string | boolean; // Option text, word, or true/false
  explanation: string;
  hint: string;
  matchLetter?: string; // For Part 2 matching letter A-K
  adjective?: string; // For Part 2 adjective word (e.g. famous, colourful)
  anagramLetters?: string[]; // For word anagram cards
  blankWordOptions?: string[]; // For Part 1 fill in the blanks
}

export interface StudentProgress {
  vocabReviewed: string[]; // Set of Flashcard IDs
  grammarAccuracy: { [key: string]: number }; // Practice category -> percentage
  mockExamScore: number | null;
  mockExamCompleted: boolean;
  gamesPlayed: string[]; // Set of game keys
  unlockedBadges: string[];
  projectSaved?: boolean;
}

export interface ClassroomScores {
  teamA: number;
  teamB: number;
}

export interface DreamHomeProjectData {
  homeName: string;
  homeType: string;
  style: string;
  location: string;
  materials: string[];
  adjectives: string[];
  specialFeatures: string[];
  rooms: {
    bedrooms: number;
    bathrooms: number;
    functionalRooms: string[];
  };
  landWidth: number;
  landLength: number;
  visitorImpression: string;
  whyLove: string;
}

// Backward compatibility alias during transition
export type ShuttleProjectData = DreamHomeProjectData;

// =============================================================================
// SPELLING BEE CONTEST TYPES
// =============================================================================
export type SpellingTopic = 'Homes & Buildings' | 'Descriptive Adjectives' | 'Eco & Materials' | 'Famous Places & Hobbit' | 'Custom';
export type SpellingDifficulty = 'Easy' | 'Medium' | 'Hard' | 'Championship';

export interface SpellingWord {
  id: string;
  word: string;
  topic: SpellingTopic;
  sentence: string;
  translation: string;
  definition: string;
  syllables: string;
  difficulty: SpellingDifficulty;
  phoneticHint?: string;
  isFromOfficialList?: boolean;
}

export interface AuditionCandidate {
  id: string;
  name: string;
  classroom: string;
  score: number; // Written score
  totalTested: number; // Total written words (e.g., 10 or 16)
  status: 'pending' | 'qualified' | 'eliminated';
  notes?: string;
  wordsHistory?: {
    word: string;
    isCorrect: boolean;
    timestamp: number;
  }[];
}

export interface Finalist {
  id: string;
  name: string;
  classroom: string;
  score: number;
  strikes: number; // Max strikes before elimination
  isEliminated: boolean;
  stageRank?: number;
  wordsHistory: {
    word: string;
    isCorrect: boolean;
  }[];
}


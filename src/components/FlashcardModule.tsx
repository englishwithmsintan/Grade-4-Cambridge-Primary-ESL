import React, { useState } from 'react';
import { FLASHCARDS } from '../data/reviewData';
import { Flashcard, FlashcardCategory } from '../types';
import { sound } from './SoundManager';
import { humanVoice } from '../utils/humanVoice';
import { ChevronLeft, ChevronRight, RefreshCw, CheckCircle2, Circle, Eye, BookOpen, Layers, Volume2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const ALPHAZ_HOMES_LINGO: { [word: string]: { slang: string, desc: string, eg: string } } = {
  'Stilt house': {
    slang: 'Flood-Proof Elevated Base 🏝️',
    desc: 'Tall wooden poles keeping the living area 100% dry from flood water and tidal waves.',
    eg: 'That stilt house has supreme high ground aura above the river!'
  },
  'Eco-house': {
    slang: 'Infinite Green Aura Cabin ☀️',
    desc: 'Earth shelter with solar panels and grass roof stacking pure sustainability and zero electric bills.',
    eg: 'Bro built an eco-house from recycled rocks and saved infinite energy.'
  },
  'Apartment': {
    slang: 'Skyscraper Penthouse Floor 🏙️',
    desc: 'One floor of a massive tower in the city with panoramic skyline views.',
    eg: 'Living on floor 30 gives you high vantage point vision over the whole city!'
  },
  'Bungalow': {
    slang: 'Zero-Stairs Chill Haven 🏡',
    desc: 'All rooms laid out on one level so nobody ever has to climb stairs.',
    eg: 'Grandma’s bungalow is pure relaxation, zero cardio stairs required.'
  },
  'Detached house': {
    slang: 'Solo Kingdom Villa 🏰',
    desc: 'Standalone home with no shared walls, giant garden and private boundary.',
    eg: 'A detached house gives you 100% privacy and max yard space.'
  },
  'Yurt': {
    slang: 'Nomad Mongolian Dome ⛺',
    desc: 'Circular felt tent that packs up in an hour to migrate across grasslands.',
    eg: 'Nomadic families migrate with their yurt like true survival speedrunners.'
  },
  'Houseboat': {
    slang: 'Aqua Cruiser Residence 🛥️',
    desc: 'A floating home on a canal where you fish right off your front porch.',
    eg: 'Living on a houseboat is pure tranquility drifting along the river.'
  },
  'Tree house': {
    slang: 'Canopy Forest Outpost 🌳',
    desc: 'Cosy timber room built high in tree branches close to birds and nature.',
    eg: 'Building a tree house gives you prime treetop views of the forest.'
  },
  'Enormous': {
    slang: 'Gigantic Colossal Scale 🏔️',
    desc: 'Extremely big, towering over everything else in the lobby.',
    eg: 'The Colosseum is enormous, holding 50,000 Roman spectators!'
  },
  'Famous': {
    slang: 'Viral Global Icon 🌟',
    desc: 'Known and recognized by millions of people across the globe.',
    eg: 'The Eiffel Tower and Colosseum are world-famous landmarks.'
  },
  'Colourful': {
    slang: 'RGB Rainbow Palette 🎨',
    desc: 'Decorated with vibrant, dazzling bright colors.',
    eg: 'Seaside harbor houses are colourful and vibrant with max saturation.'
  },
  'Comfortable': {
    slang: 'Cozy Slumber Buff 🛋️',
    desc: 'Super nice to relax in with soft cushions, warmth, and peace.',
    eg: 'Bilbo Baggins’ armchair has +10000 cozy aura.'
  },
  'Mysterious': {
    slang: 'Secret Lore Riddles 🕵️',
    desc: 'Full of unexplained wonder, secrets, and puzzles.',
    eg: 'That strange shoe house has deep mysterious aura.'
  },
  'Ancient': {
    slang: 'OG Historical Monument 🏛️',
    desc: 'Built thousands of years ago in classical history.',
    eg: 'The ancient Colosseum was built almost 2,000 years ago!'
  },
  'Tiny': {
    slang: 'Micro Pocket Sized 🔬',
    desc: 'Very, very small in size; opposite of enormous.',
    eg: 'The shoe building has tiny windows and a little door.'
  },
  'Wooden': {
    slang: 'Natural Timber Crafted 🪵',
    desc: 'Constructed from natural wood or forest logs.',
    eg: 'The stilt house stands firmly on tall wooden poles.'
  },
  'Spacious': {
    slang: 'Infinite Room Layout 🚪',
    desc: 'Having lots and lots of open room inside; opposite of cramped.',
    eg: 'The new villa has a spacious lounge where you can run and play.'
  },
  'Modern': {
    slang: 'Futuristic High-Tech Spec ⚡',
    desc: 'New, contemporary, and filled with smart technology.',
    eg: 'Modern eco-houses use solar tech and automated sensors.'
  },
  'Relaxing': {
    slang: 'Zen Calm Serenity 🧘',
    desc: 'Brings peace, tranquility, and washes away stress.',
    eg: 'The sound of raindrops on the eco-roof is completely relaxing.'
  },
  'The Colosseum': {
    slang: 'Roman Gladiator Arena ⚔️',
    desc: 'Ancient stone arena where gladiators fought before 50,000 screaming Romans.',
    eg: 'Over 6 million tourists visit the Colosseum every year!'
  },
  'Comfort': {
    slang: 'Max Well-Being State 🛋️',
    desc: 'An easy, pleasant feeling of satisfaction and peace.',
    eg: 'A hobbit-hole means comfort with warm hearths and good food.'
  },
  'Tunnel': {
    slang: 'Underground Tube Passage 🚇',
    desc: 'A tube-shaped hall carved through the ground or hill.',
    eg: 'Bilbo’s green door opened into a long, comfortable tunnel.'
  },
  'Fond of': {
    slang: 'Deep Affection & Kindness ❤️',
    desc: 'Liking someone or something very much; welcoming visitors generously.',
    eg: 'Bilbo Baggins was fond of visitors, hanging lots of coat pegs.'
  },
  'Respectable': {
    slang: 'High Honor & Good Manners 🏅',
    desc: 'Polite, well-behaved, and respected by the community.',
    eg: 'The Baggins family was respectable because they never caused trouble.'
  }
};

interface FlashcardModuleProps {
  progress: { vocabReviewed: string[] };
  onMarkReviewed: (id: string, mastered: boolean) => void;
  isTeacherMode: boolean;
  genAlphaMode?: boolean;
  forceCategory?: FlashcardCategory;
}

export default function FlashcardModule({
  progress,
  onMarkReviewed,
  isTeacherMode,
  genAlphaMode = false,
  forceCategory
}: FlashcardModuleProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(forceCategory || 'all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Filter cards
  const filteredCards = FLASHCARDS.filter(card => {
    return selectedCategory === 'all' || card.category === selectedCategory;
  });

  const activeCard: Flashcard | undefined = filteredCards[currentIndex];

  const handleNext = () => {
    sound.playClick();
    setIsFlipped(false);
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back
    }
  };

  const handlePrev = () => {
    sound.playClick();
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(filteredCards.length - 1); // Loop to end
    }
  };

  const handleFlip = () => {
    sound.playClick();
    setIsFlipped(!isFlipped);
  };

  const speakWord = (text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    sound.playClick();
    humanVoice.speak(text, { rate: 0.9 });
  };

  const toggleMastery = (cardId: string) => {
    const isMastered = progress.vocabReviewed.includes(cardId);
    if (!isMastered) {
      sound.playCorrect();
    } else {
      sound.playClick();
    }
    onMarkReviewed(cardId, !isMastered);
  };

  const categories = [
    { id: 'all', label: 'All Unit 3 Cards 🏡' },
    { id: 'types-of-homes', label: 'Types of Homes (3.1) 🏘️' },
    { id: 'adjectives', label: 'Descriptive Adjectives (3.1 & 3.4) ✨' },
    { id: 'eco-house', label: 'Eco-House & Materials (3.2) 🌿' },
    { id: 'strange-buildings', label: 'Strange Buildings (3.3) 🏗️' },
    { id: 'famous-places', label: 'Famous Places (3.4) 🏛️' },
    { id: 'hobbit-words', label: 'The Hobbit Vocab (3.5) 🕳️' }
  ];

  const getCategoryThemeClass = (cat: string) => {
    switch (cat) {
      case 'types-of-homes': return 'bg-emerald-100 text-emerald-800 border-emerald-400';
      case 'adjectives': return 'bg-amber-100 text-amber-800 border-amber-400';
      case 'eco-house': return 'bg-lime-100 text-lime-800 border-lime-400';
      case 'strange-buildings': return 'bg-purple-100 text-purple-800 border-purple-400';
      case 'famous-places': return 'bg-cyan-100 text-cyan-800 border-cyan-400';
      case 'hobbit-words': return 'bg-rose-100 text-rose-800 border-rose-400';
      default: return 'bg-slate-100 text-slate-700 border-slate-400';
    }
  };

  const isCurrentMastered = activeCard 
    ? progress.vocabReviewed.includes(activeCard.id)
    : false;

  return (
    <div className="max-w-4xl mx-auto px-4 py-4">
      
      {/* Intro section */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-black text-slate-950 flex items-center justify-center gap-2 uppercase tracking-tight">
          <span>🏡</span> Unit 3 Vocabulary & Homes Flashcard Deck
        </h2>
        <p className="text-sm font-semibold text-slate-650 mt-1">
          Master types of homes, descriptive adjectives, eco-house features, strange buildings, famous places, and The Hobbit!
        </p>
      </div>

      {/* Filter panel */}
      <div className="bg-white rounded-[28px] p-5 shadow-[4px_4px_0px_0px_#560e51] border-3 border-[#560e51] mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b-2 border-fuchsia-100 pb-3 mb-3 gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-[#9b2c98] flex items-center gap-1.5 font-mono">
            <Layers className="h-4 w-4 text-[#9b2c98]" /> Lesson Categories
          </span>
          <span className="text-xs font-bold font-mono text-[#560e51]">
            {filteredCards.length} Words in Selected Deck
          </span>
        </div>

        {/* Category Scroll Filter */}
        <div className="flex space-x-2 overflow-x-auto py-1 no-scrollbar">
          {categories.map((cat) => {
            const isSel = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`filter-cat-${cat.id}`}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setCurrentIndex(0);
                  setIsFlipped(false);
                  sound.playClick();
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-tight whitespace-nowrap cursor-pointer transition-all border-2 ${
                  isSel 
                    ? 'bg-[#78c222] border-[#560e51] text-[#560e51] shadow-[2px_2px_0px_0px_#560e51]' 
                    : 'bg-white border-slate-300 text-slate-700 hover:border-[#560e51] hover:bg-fuchsia-50'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Flashcard View */}
      {filteredCards.length > 0 && activeCard ? (
        <div className="flex flex-col items-center">
          
          {/* Deck Counter */}
          <div className="w-full max-w-2xl flex justify-between items-center px-1 mb-3 text-xs text-slate-600 font-mono font-black">
            <span className="text-[#9b2c98] uppercase">LESSON {activeCard.lesson}</span>
            <span className="bg-fuchsia-100 border-2 border-[#560e51] text-[#560e51] px-3 py-1 rounded-lg">CARD {currentIndex + 1} OF {filteredCards.length}</span>
          </div>

          {/* Flashcard Component */}
          <div 
            id={`flashcard-${activeCard.id}`}
            onClick={handleFlip}
            className="w-full max-w-3xl h-[420px] md:h-[460px] relative cursor-pointer group mb-4 select-none"
            style={{ perspective: '1200px' }}
          >
            <div 
              className={`w-full h-full relative transition-all duration-500 rounded-[36px] border-4 border-[#560e51] transform-gpu shadow-[6px_6px_0px_0px_#560e51] ${isFlipped ? 'rotate-y-180' : ''}`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              
              {/* CARD FRONT */}
              <div 
                className="absolute inset-0 w-full h-full p-8 rounded-[32px] flex flex-col justify-between bg-white text-slate-950 backface-hidden"
              >
                <div className="flex justify-between items-center">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-black border-2 uppercase tracking-wider ${getCategoryThemeClass(activeCard.category)}`}>
                    {activeCard.category.replace('-', ' ')}
                  </span>
                  <button
                    onClick={(e) => speakWord(activeCard.word, e)}
                    className="p-2 bg-fuchsia-50 hover:bg-fuchsia-100 border-2 border-[#560e51] rounded-xl text-[#560e51] transition cursor-pointer shadow-[1px_1px_0px_0px_#560e51]"
                    title="Audio Pronunciation"
                  >
                    <Volume2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex-1 flex flex-col justify-center items-center text-center py-4">
                  <h3 className={`font-black tracking-tight text-slate-950 uppercase font-sans select-none leading-tight ${
                    activeCard.word.length > 20
                      ? 'text-2xl sm:text-3xl md:text-4xl'
                      : activeCard.word.length > 12
                      ? 'text-3xl sm:text-4xl md:text-5xl'
                      : 'text-4xl sm:text-5xl md:text-6xl'
                  }`}>
                    {activeCard.word}
                  </h3>

                  {genAlphaMode && ALPHAZ_HOMES_LINGO[activeCard.word] && (
                    <span className="mt-3 px-4 py-1 bg-fuchsia-100 text-[#9b2c98] border-2 border-[#560e51] text-xs sm:text-sm rounded-full font-black uppercase font-mono shadow-[1px_1px_0px_0px_#560e51] animate-pulse">
                      ⚡ Homes Aura Slang Active!
                    </span>
                  )}

                  {activeCard.funFact && !genAlphaMode && (
                    <div className="mt-4 px-4 py-2 text-xs sm:text-sm font-semibold bg-emerald-50 text-emerald-900 rounded-xl border-2 border-emerald-300 max-w-lg">
                      💡 <strong>Did you know?</strong> {activeCard.funFact}
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center text-xs sm:text-sm text-slate-500 font-bold border-t-2 border-slate-100 pt-3">
                  <span className="flex items-center gap-1.5"><Eye className="h-4 w-4 text-[#9b2c98]" /> Click to view Bahasa translation</span>
                  <span className="flex items-center gap-1.5 bg-fuchsia-50 hover:bg-fuchsia-100 border-2 border-[#560e51] text-[#560e51] px-3 py-1.5 rounded-xl transition-all font-mono font-black select-none"><RefreshCw className="h-3.5 w-3.5" /> FLIP</span>
                </div>
              </div>

              {/* CARD BACK */}
              <div 
                className={`absolute inset-0 w-full h-full p-8 rounded-[32px] flex flex-col justify-between text-white rotate-y-180 backface-hidden ${genAlphaMode ? 'bg-[#560e51]' : 'bg-[#1e1b4b]'}`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black bg-[#78c222] border-2 border-white/40 text-[#560e51] px-4 py-1.5 rounded-full uppercase tracking-widest">
                    {genAlphaMode ? '🧠 HOMES AURA DECODED' : '🇮🇩 BAHASA INDONESIA'}
                  </span>
                  <button
                    onClick={(e) => speakWord(activeCard.word, e)}
                    className="p-2 bg-white/20 hover:bg-white/30 border-2 border-white/40 rounded-xl text-white transition cursor-pointer"
                  >
                    <Volume2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex-1 flex flex-col justify-center items-center text-center py-2">
                  {genAlphaMode && ALPHAZ_HOMES_LINGO[activeCard.word] ? (
                    <>
                      <p className="text-xs font-black uppercase tracking-wider text-fuchsia-200">
                        Homes Aura Description:
                      </p>
                      <h4 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#78c222] tracking-tight mt-1 mb-2 uppercase select-none">
                        {ALPHAZ_HOMES_LINGO[activeCard.word].slang}
                      </h4>
                      <p className="text-xs font-black uppercase tracking-wider text-fuchsia-200 mt-1">
                        Arti Kata (Bahasa Indonesia):
                      </p>
                      <span className="inline-block mt-0.5 mb-2 px-4 py-1 bg-white/20 border-2 border-white/30 rounded-xl text-white font-black text-sm md:text-base">
                        🇮🇩 {activeCard.translation}
                      </span>
                    </>
                  ) : (
                    <>
                      <p className="text-xs font-black uppercase tracking-wider text-indigo-200">
                        Arti Kata (Bahasa Indonesia):
                      </p>
                      <h4 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#78c222] tracking-tight mt-1 mb-3 uppercase select-none">
                        {activeCard.translation}
                      </h4>
                    </>
                  )}
                  
                  <div className="w-full max-w-xl bg-black/40 p-4 rounded-2xl border-2 border-fuchsia-400 text-sm">
                    <p className="text-fuchsia-200 text-xs font-black uppercase tracking-wider text-left font-mono">
                      {genAlphaMode ? 'Slang Insight:' : 'Example in Sentence:'}
                    </p>
                    <p className="text-white text-center font-bold italic mt-1 leading-relaxed text-sm md:text-base">
                      {genAlphaMode && ALPHAZ_HOMES_LINGO[activeCard.word]
                        ? `"${ALPHAZ_HOMES_LINGO[activeCard.word].desc}"`
                        : `"${activeCard.example}"`}
                    </p>
                    {genAlphaMode && ALPHAZ_HOMES_LINGO[activeCard.word] && (
                      <div className="mt-2 border-t border-white/10 pt-1.5 text-left">
                        <span className="text-[#78c222] text-[10px] font-black uppercase tracking-wider font-mono">Example:</span>
                        <p className="text-white text-xs font-semibold italic mt-0.5">"{ALPHAZ_HOMES_LINGO[activeCard.word].eg}"</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs text-fuchsia-200 font-bold border-t border-fuchsia-500/40 pt-2.5 select-none">
                  <span>Click anywhere to flip</span>
                  <span className="flex items-center gap-1.5 text-white px-3 py-1 rounded-lg font-mono font-bold bg-white/20"><RefreshCw className="h-3.5 w-3.5" /> FLIP BACK</span>
                </div>
              </div>

            </div>
          </div>

          {/* Card Control Panel */}
          <div className="flex items-center justify-between w-full max-w-md mt-4 gap-3">
            <button
              id="btn-prev-card"
              onClick={handlePrev}
              className="w-12 h-12 bg-white border-3 border-[#560e51] text-[#560e51] rounded-full flex items-center justify-center hover:bg-fuchsia-50 shadow-[3px_3px_0px_0px_#560e51] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer shrink-0"
              title="Previous Word"
            >
              <ChevronLeft className="h-6 w-6 stroke-[3px]" />
            </button>

            {/* Tap to flip button */}
            <button
              id="btn-flip-card"
              onClick={handleFlip}
              className="flex-1 bg-[#78c222] text-[#560e51] font-black text-xs uppercase tracking-tight py-3 px-4 rounded-xl hover:bg-[#68ab1c] transition-all border-3 border-[#560e51] shadow-[3px_3px_0px_0px_#560e51] active:translate-y-[2px] active:shadow-none cursor-pointer flex items-center justify-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Reveal / Flip Card</span>
            </button>

            <button
              id="btn-next-card"
              onClick={handleNext}
              className="w-12 h-12 bg-white border-3 border-[#560e51] text-[#560e51] rounded-full flex items-center justify-center hover:bg-fuchsia-50 shadow-[3px_3px_0px_0px_#560e51] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer shrink-0"
              title="Next Word"
            >
              <ChevronRight className="h-6 w-6 stroke-[3px]" />
            </button>
          </div>

          {/* Self-Study Mastery Tracker Button */}
          {!isTeacherMode && (
            <div className="mt-6 bg-[#fefaf0] border-3 border-[#560e51] rounded-2xl p-4 w-full max-w-md text-center shadow-[3px_3px_0px_0px_#560e51] flex flex-col items-center">
              <span className="text-xs font-black uppercase tracking-wider text-[#9b2c98] font-mono mb-0.5">Self-Mastery Check</span>
              <p className="text-xs font-bold text-slate-600 mb-3">Do you know this spelling & meaning for Unit 3?</p>
              
              <button
                id={`btn-toggle-mastered-${activeCard.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMastery(activeCard.id);
                }}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-tight flex items-center justify-center gap-2 border-2 transition-all cursor-pointer ${
                  isCurrentMastered
                    ? 'bg-[#78c222] border-[#560e51] text-[#560e51] shadow-[2px_2px_0px_0px_#560e51]'
                    : 'bg-white border-[#560e51] text-slate-700 hover:bg-fuchsia-50 shadow-[2px_2px_0px_0px_#560e51]'
                }`}
              >
                {isCurrentMastered ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-[#560e51] block" />
                    <span>Mastered! (Saved to Stamp Book)</span>
                  </>
                ) : (
                  <>
                    <Circle className="h-4 w-4 text-slate-400 block" />
                    <span>Still Practicing (Mark Mastered)</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Teacher presentation advice prompt */}
          {isTeacherMode && (
            <div className="mt-6 bg-fuchsia-50 border-3 border-[#560e51] rounded-2xl p-4 w-full max-w-2xl text-slate-900 text-xs shadow-[3px_3px_0px_0px_#560e51]">
              <span className="font-extrabold text-[#9b2c98] uppercase tracking-widest text-[10px] block mb-1 font-mono">👨‍🏫 Classroom Review Tip</span>
              Prompt students to form purpose sentences with the vocabulary (e.g. <em>"They used wood to build the stilt house"</em> or <em>"They installed solar panels to provide clean electricity"</em>) and award scoreboard points!
            </div>
          )}

        </div>
      ) : (
        <div className="text-center bg-white border-3 border-[#560e51] rounded-2xl p-8 max-w-md mx-auto shadow-[4px_4px_0px_0px_#560e51]">
          <BookOpen className="h-10 w-10 text-slate-400 mx-auto mb-3" />
          <p className="text-slate-900 font-extrabold uppercase text-sm">No cards in selected category</p>
          <button
            onClick={() => { setSelectedCategory('all'); sound.playClick(); }}
            className="mt-3 px-4 py-2 bg-[#78c222] border-2 border-[#560e51] font-black rounded-xl text-xs uppercase cursor-pointer text-[#560e51]"
          >
            Reset Filter
          </button>
        </div>
      )}

    </div>
  );
}

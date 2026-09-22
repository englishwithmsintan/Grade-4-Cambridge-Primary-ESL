import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  ChevronRight, 
  CheckCircle2, 
  Check, 
  HelpCircle, 
  Award, 
  Home, 
  Layers, 
  Bookmark, 
  Compass, 
  Quote 
} from 'lucide-react';
import { STORIES, FLASHCARDS } from '../data/reviewData';
import { sound } from './SoundManager';
import { humanVoice, isAbortError } from '../utils/humanVoice';
import { motion, AnimatePresence } from 'motion/react';

interface LiteratureStudyProps {
  onNavigateTab?: (tabId: string) => void;
  genAlphaMode?: boolean;
}

export default function LiteratureStudy({ onNavigateTab, genAlphaMode = false }: LiteratureStudyProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState<number>(1.0);
  const [activeParagraphIndex, setActiveParagraphIndex] = useState<number>(0);
  const [highlightVocab, setHighlightVocab] = useState<boolean>(true);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  const hobbitData = STORIES.theHobbitExtract;
  const hobbitVocab = FLASHCARDS.filter(f => f.category === 'hobbit-words');

  // Full extract text for text-to-speech fallback
  const fullTextToRead = hobbitData?.paragraphs
    ? hobbitData.paragraphs.map(p => `${p.heading}. ${p.text}`).join('\n\n')
    : '';

  // Handle Audio Playback
  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      humanVoice.stop();
      setIsPlayingAudio(false);
      sound.playClick();
      return;
    }

    sound.playClick();
    humanVoice.playAudioUrl('/audio/hobbit.mp3', {
      onStart: () => setIsPlayingAudio(true),
      onEnd: () => setIsPlayingAudio(false),
    }).catch((err) => {
      if (isAbortError(err)) return;
      humanVoice.speak(fullTextToRead, {
        rate: audioSpeed,
        onStart: () => setIsPlayingAudio(true),
        onEnd: () => setIsPlayingAudio(false),
      });
    });
  };

  const handleStopAudio = () => {
    humanVoice.stop();
    setIsPlayingAudio(false);
    sound.playClick();
  };

  useEffect(() => {
    return () => {
      humanVoice.stop();
    };
  }, []);

  // Quick Literature Comprehension Quiz
  const QUIZ_QUESTIONS = [
    {
      id: 1,
      question: 'According to opening line of the story, what does a "hobbit-hole" mean?',
      options: ['It means comfort.', 'It means dirt and darkness.', 'It means danger and cold.', 'It means an empty cave.'],
      correct: 0,
      clue: 'Paragraph 1: "...it was a hobbit-hole, and that means comfort."'
    },
    {
      id: 2,
      question: 'What special shape was the front door of Bag End, and what colour was it painted?',
      options: [
        'A square wooden door painted brown.',
        'A round door like a porthole, painted green with a shiny brass knob.',
        'A sliding glass door painted white.',
        'A heavy iron gate painted black.'
      ],
      correct: 1,
      clue: 'Paragraph 2: "It had a perfectly round door like a porthole, painted green, with a shiny yellow brass knob in the exact middle."'
    },
    {
      id: 3,
      question: 'Why did the hobbit’s hallway have "lots and lots of pegs for hats and coats"?',
      options: [
        'He liked to sell coats at the market.',
        'The hallway was very cold and draughty.',
        'The hobbit was very fond of visitors and welcoming guests.',
        'He kept his winter clothes there.'
      ],
      correct: 2,
      clue: 'Paragraph 2: "...lots and lots of pegs for hats and coats - the hobbit was fond of visitors."'
    },
    {
      id: 4,
      question: 'Why were the best rooms all situated on the left-hand side of the passage?',
      options: [
        'They were closer to the pantries and kitchen.',
        'They were the only rooms with deep-set round windows looking over his garden and the river.',
        'They had carpeted stairs leading to the roof.',
        'They were built with thick stone walls to stop worms.'
      ],
      correct: 1,
      clue: 'Paragraph 2: "The best rooms were all on the left-hand side... for these were the only ones to have windows, deep-set round windows looking over his garden, and meadows beyond, sloping down to the river."'
    },
    {
      id: 5,
      question: 'Why did neighbours in The Hill consider the Baggins family "very respectable"?',
      options: [
        'Because they had lived there a long time, were rich, and never had wild adventures or did unexpected things.',
        'Because they were famous gladiators in ancient Rome.',
        'Because they lived on nomadic yurts that moved every week.',
        'Because they built tall apartments in busy cities.'
      ],
      correct: 0,
      clue: 'Paragraph 3: "...people considered them very respectable, not only because most of them were rich, but also because they never had any adventures or did anything unexpected."'
    }
  ];

  const handleSelectQuizOption = (qId: number, optIdx: number) => {
    sound.playClick();
    setQuizAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach(q => {
      if (quizAnswers[q.id] === q.correct) score++;
    });
    return score;
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto pb-12">
      
      {/* Top Banner Header */}
      <div className="bg-white rounded-[32px] p-6 sm:p-8 md:p-10 border-4 border-[#560e51] shadow-[8px_8px_0px_0px_#560e51] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 text-center md:text-left">
          <div className="flex flex-wrap gap-2 justify-center md:justify-start items-center">
            <span className="text-xs font-black uppercase tracking-widest text-[#560e51] font-mono bg-[#fdf2fe] px-4 py-1.5 rounded-full border-2 border-[#560e51] inline-flex items-center gap-1.5 shadow-[2px_2px_0px_0px_#560e51]">
              <Bookmark className="h-3.5 w-3.5 text-[#9b2c98]" /> Lesson 3.5 · Literature Study
            </span>
            <span className="text-xs font-mono font-black text-[#43780a] bg-lime-100 px-3.5 py-1.5 rounded-full border-2 border-lime-500 shadow-[2px_2px_0px_0px_#43780a]">
              Tolkien Classic 📖
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 uppercase tracking-tight leading-tight">
            The Hobbit: Bag End 🌿🏡
          </h1>
          <p className="text-xs sm:text-sm md:text-base font-bold text-slate-700 leading-relaxed max-w-2xl">
            Explore J.R.R. Tolkien's famous description of Bilbo Baggins' underground home under The Hill. Master literary vocabulary, explore architectural details of comfort, and discover the Islamic virtues of serenity and welcoming guests.
          </p>
        </div>

        {/* Audio Narration Action Widget */}
        <div className="bg-[#fefaf0] border-3 border-[#560e51] p-5 rounded-2xl shadow-[4px_4px_0px_0px_#560e51] text-center w-full md:w-80 shrink-0 space-y-3">
          <span className="text-[10px] font-mono font-black uppercase text-[#9b2c98] block">Audio Narration:</span>
          
          <button
            onClick={handleToggleAudio}
            className={`w-full py-3.5 px-4 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider border-2 border-[#560e51] flex items-center justify-center gap-2 cursor-pointer shadow-[2px_2px_0px_0px_#560e51] transition-all ${
              isPlayingAudio
                ? 'bg-amber-400 text-[#560e51] ring-4 ring-amber-200'
                : 'bg-[#78c222] hover:bg-[#68ab1c] text-[#560e51]'
            }`}
          >
            {isPlayingAudio ? (
              <>
                <Pause className="h-4 w-4" />
                <span>Pause Reading</span>
              </>
            ) : (
              <>
                <Volume2 className="h-4 w-4" />
                <span>Listen Aloud 🔊</span>
              </>
            )}
          </button>

          {isPlayingAudio && (
            <div className="flex items-center justify-center gap-1.5 py-1 animate-pulse">
              <span className="w-1.5 h-4 bg-[#560e51] rounded-full inline-block animate-bounce"></span>
              <span className="w-1.5 h-6 bg-[#9b2c98] rounded-full inline-block animate-bounce [animation-delay:0.15s]"></span>
              <span className="w-1.5 h-5 bg-[#78c222] rounded-full inline-block animate-bounce [animation-delay:0.3s]"></span>
              <span className="w-1.5 h-7 bg-[#560e51] rounded-full inline-block animate-bounce [animation-delay:0.45s]"></span>
              <span className="w-1.5 h-3 bg-[#9b2c98] rounded-full inline-block animate-bounce [animation-delay:0.6s]"></span>
            </div>
          )}

          <div className="flex items-center justify-between text-xs font-bold pt-2 border-t border-amber-200 text-slate-700">
            <span>Vocabulary Tooltips:</span>
            <button
              onClick={() => {
                sound.playClick();
                setHighlightVocab(!highlightVocab);
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-black border transition ${
                highlightVocab
                  ? 'bg-yellow-300 text-[#560e51] border-[#560e51]'
                  : 'bg-white text-slate-600 border-slate-300'
              }`}
            >
              {highlightVocab ? 'Active' : 'Muted'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Extract Paragraphs */}
      <div className="bg-white rounded-[32px] p-6 sm:p-8 border-4 border-[#560e51] shadow-[8px_8px_0px_0px_#560e51] space-y-6">
        <div className="flex items-center justify-between border-b-2 border-fuchsia-100 pb-4 flex-wrap gap-2">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-[#9b2c98] font-mono">Original Literature Extract</span>
            <h2 className="text-2xl font-black text-[#560e51] uppercase tracking-tight">
              {hobbitData?.title} by J.R.R. Tolkien
            </h2>
          </div>
          <span className="text-xs font-mono font-bold text-slate-600 bg-fuchsia-50 border border-fuchsia-200 px-3 py-1 rounded-lg">
            Cambridge Grade 4 · Unit 3.5
          </span>
        </div>

        {/* Paragraphs with interactive tabs / display */}
        <div className="space-y-6">
          {(hobbitData?.paragraphs || []).map((para, idx) => (
            <div 
              key={para.num}
              className={`p-6 rounded-2xl border-3 transition-all ${
                activeParagraphIndex === idx
                  ? 'bg-[#fefaf0] border-[#560e51] shadow-[4px_4px_0px_0px_#560e51]'
                  : 'bg-white hover:bg-slate-50 border-slate-300 hover:border-[#560e51]'
              }`}
              onClick={() => setActiveParagraphIndex(idx)}
            >
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="text-xs font-mono font-black uppercase bg-fuchsia-200 text-[#560e51] px-3 py-1 rounded-lg border border-[#560e51]">
                  Paragraph {para.num}: {para.heading}
                </span>
                <span className="text-[11px] font-mono text-slate-500 font-bold">
                  {idx === 0 ? 'Setting the Scene' : idx === 1 ? 'Architecture & Rooms' : 'Character & Reputation'}
                </span>
              </div>

              <p className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed font-sans">
                {highlightVocab ? (
                  // Inline highlight key terms
                  para.text.split(/(porthole|comfort|pegs|pantries|cellars|respectable|visitors)/gi).map((part, pIdx) => {
                    const lower = part.toLowerCase();
                    const isKey = ['porthole', 'comfort', 'pegs', 'pantries', 'cellars', 'respectable', 'visitors'].includes(lower);
                    if (isKey) {
                      return (
                        <span 
                          key={pIdx}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedWord(lower);
                            sound.playClick();
                          }}
                          className="bg-yellow-200 text-[#560e51] px-1.5 py-0.5 rounded border border-[#560e51] font-black cursor-pointer hover:bg-yellow-300 mx-0.5 shadow-sm inline-block"
                          title="Click to view definition"
                        >
                          {part}
                        </span>
                      );
                    }
                    return part;
                  })
                ) : (
                  para.text
                )}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Word Pop-up Drawer / Card */}
      {selectedWord && (
        <div className="p-4 bg-yellow-100 border-3 border-[#560e51] rounded-2xl shadow-[4px_4px_0px_0px_#560e51] flex items-center justify-between gap-4 animate-fade-in">
          <div>
            <span className="text-[10px] font-mono font-black uppercase text-[#9b2c98]">Key Word Spotlight:</span>
            <h4 className="text-base font-black text-[#560e51] uppercase">{selectedWord}</h4>
            <p className="text-xs font-bold text-slate-800 mt-0.5">
              {selectedWord === 'porthole' && 'A small circular window, traditionally found on the outside of a ship.'}
              {selectedWord === 'pegs' && 'Hooks or wooden sticks fastened to a wall to hang hats, coats, or umbrellas.'}
              {selectedWord === 'pantries' && 'Small rooms or cupboards where food, tea, and provisions are stored.'}
              {selectedWord === 'cellars' && 'Underground storage rooms beneath a building, cool and dry.'}
              {selectedWord === 'respectable' && 'Regarded by society to be proper, polite, and of good morals.'}
              {selectedWord === 'comfort' && 'A state of physical ease, warmth, peace, and freedom from pain or worry.'}
              {selectedWord === 'visitors' && 'People who come to visit or spend time in your home.'}
            </p>
          </div>
          <button
            onClick={() => setSelectedWord(null)}
            className="px-3 py-1.5 bg-white border border-[#560e51] rounded-lg text-xs font-black text-[#560e51] hover:bg-slate-50 cursor-pointer shrink-0"
          >
            Dismiss ✕
          </button>
        </div>
      )}

      {/* Literature Vocabulary Deck Cards */}
      <div className="bg-white rounded-[32px] p-6 sm:p-8 border-4 border-[#560e51] shadow-[8px_8px_0px_0px_#560e51] space-y-5">
        <div className="flex items-center justify-between border-b-2 border-fuchsia-100 pb-3 flex-wrap gap-2">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-[#9b2c98] font-mono">Cambridge Unit 3 · Lesson 3.5</span>
            <h3 className="text-xl sm:text-2xl font-black text-[#560e51] uppercase tracking-tight">
              Essential Hobbit Vocabulary (5 Key Terms) 📚
            </h3>
          </div>
          <span className="text-xs font-mono font-black text-[#43780a] bg-lime-100 px-3 py-1 rounded-full border border-lime-500">
            ESL PS Exam Words
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {hobbitVocab.map((item) => (
            <div 
              key={item.id}
              className="p-4 bg-[#fdf2fe] border-2 border-[#560e51] rounded-2xl shadow-[3px_3px_0px_0px_#560e51] flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-black text-[#560e51]">{item.word}</span>
                  <button
                    onClick={() => humanVoice.speak(item.word)}
                    className="p-1 text-[#9b2c98] hover:text-[#560e51] cursor-pointer"
                    title="Pronounce"
                  >
                    <Volume2 className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-xs font-bold text-[#9b2c98] italic block mt-0.5">{item.translation}</span>
                <p className="text-xs font-bold text-slate-700 leading-relaxed mt-2">
                  {item.example}
                </p>
              </div>
              <div className="pt-2 border-t border-fuchsia-200">
                <span className="text-[10px] font-mono font-bold text-slate-600 block">💡 {item.funFact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Islamic Character & Sanctuary Connection */}
      <div className="bg-emerald-50 rounded-[32px] p-6 sm:p-8 border-4 border-emerald-800 shadow-[8px_8px_0px_0px_#047857] space-y-6">
        <div className="flex items-center gap-3 border-b-2 border-emerald-200 pb-4">
          <span className="text-3xl">☪️</span>
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-emerald-800 font-mono">SDIT Auliya Islamic Values Integration</span>
            <h3 className="text-2xl font-black text-emerald-950 uppercase tracking-tight">
              Homes as a Place of Serenity, Rest & Generous Hospitality
            </h3>
          </div>
        </div>

        {/* 1. Surah An-Nahl (16:80) */}
        <div className="bg-white p-5 rounded-2xl border-2 border-emerald-700 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-black text-emerald-800 uppercase">Qur'anic Sanctuary:</span>
            <span className="text-xs font-mono font-bold text-slate-600">Surah An-Nahl (16:80)</span>
          </div>
          <p className="text-center font-serif text-xl sm:text-2xl font-bold text-emerald-950 py-2">
            وَاللَّهُ جَعَلَ لَكُم مِّن بُيُوتِكُمْ سَكَنًا
          </p>
          <p className="text-xs sm:text-sm font-bold italic text-emerald-900 leading-relaxed text-center">
            "And Allah has made for you from your homes a place of rest..."
          </p>
          <p className="text-xs font-semibold text-slate-700 leading-relaxed pt-2 border-t border-emerald-100">
            Just as Tolkien describes Bag End as a place that "means comfort", the Holy Qur'an reminds us that our homes are a sacred divine blessing (<em className="font-bold">sakinah</em>) where we find safety, physical peace, and spiritual refuge with our beloved families.
          </p>
        </div>

        {/* 2. Hadith on Hospitality */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4.5 rounded-2xl border-2 border-emerald-700 space-y-2">
            <span className="text-xs font-mono font-black text-emerald-800 uppercase block">Generous Hospitality (Ikram Al-Dayf):</span>
            <p className="text-xs sm:text-sm font-bold text-slate-900 italic">
              "Whoever believes in Allah and the Last Day, should serve his guest generously."
            </p>
            <span className="text-[11px] font-mono text-emerald-700 font-bold block">— Sahih Al-Bukhari</span>
            <p className="text-xs font-bold text-slate-700 mt-1">
              Bilbo Baggins prepared dozens of coat pegs and well-stocked pantries because he was <em>fond of visitors</em>. In Islam, welcoming guests with a warm smile, generous food, and respectful accommodation is a core virtue of our faith!
            </p>
          </div>

          <div className="bg-white p-4.5 rounded-2xl border-2 border-emerald-700 space-y-2">
            <span className="text-xs font-mono font-black text-emerald-800 uppercase block">Du'a for a Blessed Home:</span>
            <p className="text-center font-serif text-lg font-bold text-emerald-950 py-1">
              رَّبِّ أَنزِلْنِي مُنزَلًا مُّبَارَكًا وَأَنتَ خَيْرُ الْمُنزِلِينَ
            </p>
            <p className="text-xs font-bold italic text-slate-800 text-center">
              "My Lord, let me land at a blessed landing place, and You are the best to accommodate."
            </p>
            <span className="text-[11px] font-mono text-emerald-700 font-bold block text-center">— Surah Al-Mu'minun (23:29)</span>
          </div>
        </div>
      </div>

      {/* Quick Comprehension Quiz */}
      <div className="bg-white rounded-[32px] p-6 sm:p-8 border-4 border-[#560e51] shadow-[8px_8px_0px_0px_#560e51] space-y-6">
        <div className="flex items-center justify-between border-b-2 border-fuchsia-100 pb-4 flex-wrap gap-2">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-[#9b2c98] font-mono">Comprehension & Analysis</span>
            <h3 className="text-2xl font-black text-[#560e51] uppercase tracking-tight">
              Test Your Literature Mastery (5 Quick Questions) 🎯
            </h3>
          </div>
          {quizSubmitted && (
            <span className="px-3.5 py-1 bg-[#78c222] text-[#560e51] font-mono font-black text-xs rounded-full border border-[#560e51]">
              Score: {calculateScore()} / {QUIZ_QUESTIONS.length}
            </span>
          )}
        </div>

        <div className="space-y-5">
          {QUIZ_QUESTIONS.map((q, qIdx) => {
            const selectedOpt = quizAnswers[q.id];
            const isAnswered = selectedOpt !== undefined;
            const isCorrect = isAnswered && selectedOpt === q.correct;

            return (
              <div 
                key={q.id}
                className="p-5 bg-[#fefaf0] border-2 border-[#560e51] rounded-2xl shadow-[2px_2px_0px_0px_#560e51] space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-xs sm:text-sm font-black text-slate-900">
                    <span className="text-[#9b2c98] font-mono mr-2">{qIdx + 1}.</span>
                    {q.question}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedOpt === optIdx;
                    let btnStyle = 'bg-white hover:bg-yellow-50 border-amber-300 text-slate-800';

                    if (quizSubmitted) {
                      if (optIdx === q.correct) {
                        btnStyle = 'bg-[#78c222] text-[#560e51] border-[#560e51] font-black';
                      } else if (isSelected) {
                        btnStyle = 'bg-rose-200 text-rose-900 border-rose-500 font-bold';
                      }
                    } else if (isSelected) {
                      btnStyle = 'bg-yellow-300 text-[#560e51] border-[#560e51] font-black shadow-[2px_2px_0px_0px_#560e51]';
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectQuizOption(q.id, optIdx)}
                        className={`p-3 rounded-xl border-2 text-xs font-bold text-left transition cursor-pointer flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {quizSubmitted && optIdx === q.correct && (
                          <Check className="h-4 w-4 text-[#560e51] shrink-0 ml-1" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <div className="text-[11px] font-bold text-slate-700 bg-white p-2.5 rounded-xl border border-amber-300">
                    💡 <strong>Evidence:</strong> {q.clue}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-end gap-3 pt-3">
          {!quizSubmitted ? (
            <button
              onClick={() => {
                sound.playCorrect();
                setQuizSubmitted(true);
              }}
              disabled={Object.keys(quizAnswers).length === 0}
              className="px-6 py-3 bg-[#78c222] hover:bg-[#68ab1c] text-[#560e51] font-black text-xs uppercase tracking-wide rounded-xl border-2 border-[#560e51] shadow-[3px_3px_0px_0px_#560e51] disabled:opacity-40 cursor-pointer"
            >
              Check My Answers 📝
            </button>
          ) : (
            <button
              onClick={() => {
                sound.playClick();
                setQuizAnswers({});
                setQuizSubmitted(false);
              }}
              className="px-6 py-3 bg-white hover:bg-fuchsia-50 text-[#560e51] font-black text-xs uppercase tracking-wide rounded-xl border-2 border-[#560e51] shadow-[3px_3px_0px_0px_#560e51] cursor-pointer"
            >
              Reset Quiz ↺
            </button>
          )}
        </div>
      </div>

      {/* Navigation Footer */}
      {onNavigateTab && (
        <div className="flex flex-wrap items-center justify-between gap-4 p-5 bg-white border-3 border-[#560e51] rounded-2xl shadow-[4px_4px_0px_0px_#560e51]">
          <span className="text-xs font-black uppercase text-[#560e51] font-mono">
            Continue Unit 3 Review:
          </span>
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => onNavigateTab('flashcards')}
              className="px-4 py-2 bg-fuchsia-50 hover:bg-fuchsia-100 text-[#560e51] text-xs font-black rounded-xl border-2 border-[#560e51] cursor-pointer flex items-center gap-1.5"
            >
              <BookOpen className="h-3.5 w-3.5 text-[#9b2c98]" /> Practice Hobbit Vocab 🏡
            </button>
            <button
              onClick={() => onNavigateTab('dream-home')}
              className="px-4 py-2 bg-amber-50 hover:bg-amber-100 text-[#560e51] text-xs font-black rounded-xl border-2 border-[#560e51] cursor-pointer flex items-center gap-1.5"
            >
              <Home className="h-3.5 w-3.5 text-amber-700" /> Build Cosy Eco-House 📐
            </button>
            <button
              onClick={() => onNavigateTab('mock-sat')}
              className="px-4 py-2 bg-[#78c222] hover:bg-[#68ab1c] text-[#560e51] text-xs font-black rounded-xl border-2 border-[#560e51] cursor-pointer flex items-center gap-1.5"
            >
              <Award className="h-3.5 w-3.5 text-[#560e51]" /> Take Mock Exam 📝
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

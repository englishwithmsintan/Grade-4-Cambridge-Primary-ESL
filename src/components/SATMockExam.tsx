import React, { useState, useEffect, useRef } from 'react';
import { 
  MOCK_SAT_QUESTIONS, 
  MOCK_SAT_QUESTIONS_SET_B, 
  STORIES, 
  PART_2_DEFINITIONS, 
  PART_2_DEFINITIONS_SET_B 
} from '../data/reviewData';
import { SATQuestion } from '../types';
import { sound } from './SoundManager';
import { humanVoice, isAbortError } from '../utils/humanVoice';
import { Award, Clock, ChevronRight, ChevronLeft, Volume2, Play, Pause, RotateCcw, Eye, EyeOff, Home, CheckCircle2, FileText, Printer, Check, Sparkles, HelpCircle, Lightbulb, Copy, RefreshCw, ListOrdered, Compass } from 'lucide-react';

const SIMPLE_MODEL_ESSAY =
  'My dream home is a cosy eco-house on a green hill. ' +
  'The walls are made of stone and wood. ' +
  'On the roof, there are solar panels to make clean electricity. ' +
  'There are big round windows to let in bright sunlight. ' +
  'Outside, there is a tub to collect rainwater for our garden. ' +
  'I love my dream home because it is warm, spacious, and comfortable for my family.';

const EASY_SENTENCE_TEMPLATE =
  'My dream home is a cosy [eco-house / cottage] on [a green hill / by the river]. ' +
  'The walls and roof are made of [stone / wood / bricks]. ' +
  'It has [solar panels / big windows / a rainwater tub] to [make clean electricity / let in sunlight / water plants]. ' +
  'Inside, there is a [round green door / cosy bedroom]. ' +
  'I love my dream home because it is [cosy, warm, and comfortable for my family].';

const ESL_WRITING_CHIPS = {
  homes: ['eco-house', 'cosy cottage', 'stilt house', 'yurt', 'bungalow'],
  materials: ['stone', 'wood', 'mud', 'bricks', 'glass', 'clay tiles'],
  purposes: ['to make clean electricity', 'to let in sunlight', 'to water the garden', 'to keep the rooms warm'],
  adjectives: ['cosy', 'spacious', 'comfortable', 'warm', 'peaceful']
};

interface SATMockExamProps {
  progress: { mockExamScore: number | null; mockExamCompleted: boolean };
  onSaveMockScore: (score: number) => void;
  isTeacherMode: boolean;
  genAlphaMode?: boolean;
}

export default function SATMockExam({
  progress,
  onSaveMockScore,
  isTeacherMode,
  genAlphaMode = false
}: SATMockExamProps) {
  const [examMode, setExamMode] = useState<'practice' | 'exam' | 'paper' | null>(null);
  const [paperSet, setPaperSet] = useState<'A' | 'B'>('B');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qNum: number]: string | boolean }>({});
  const [textAnswers, setTextAnswers] = useState<{ [qNum: number]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(1800); // 30 minutes
  const [timerActive, setTimerActive] = useState(false);
  const [examFinished, setExamFinished] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [candidateName, setCandidateName] = useState('Student Architect');
  const [candidateClass, setCandidateClass] = useState('Grade 4');
  const EMBEDDED_AUDIO_PATH = '/audio/listening.mp3';
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);

  // Essay writing state for Part 5 (Q30/33) - Simplified for EFL-to-ESL transition
  const [essayText, setEssayText] = useState(SIMPLE_MODEL_ESSAY);
  const [showEslTips, setShowEslTips] = useState(false);
  const [showModelText, setShowModelText] = useState(false);
  const [isSpeakingModel, setIsSpeakingModel] = useState(false);

  // Question & passage human voice audio states
  const [isSpeakingQuestion, setIsSpeakingQuestion] = useState(false);
  const [playingPassage, setPlayingPassage] = useState<'ecohouse' | 'colosseum' | null>(null);

  // Number toggler & quick navigator states
  const [navPartFilter, setNavPartFilter] = useState<'all' | 1 | 2 | 3 | 4 | 5>('all');
  const [isNavGridExpanded, setIsNavGridExpanded] = useState(true);

  const speakModelEssay = () => {
    if (isSpeakingModel) {
      humanVoice.stop();
      setIsSpeakingModel(false);
      return;
    }
    humanVoice.playAudioUrl('/audio/model_essay.mp3', {
      onStart: () => setIsSpeakingModel(true),
      onEnd: () => setIsSpeakingModel(false),
      rate: 1.0,
    }).catch((err) => {
      if (isAbortError(err)) return;
      humanVoice.speak(SIMPLE_MODEL_ESSAY, {
        onStart: () => setIsSpeakingModel(true),
        onEnd: () => setIsSpeakingModel(false),
      });
    });
  };

  const togglePassageAudio = (passageKey: 'ecohouse' | 'colosseum') => {
    if (playingPassage === passageKey) {
      humanVoice.stop();
      setPlayingPassage(null);
      return;
    }
    humanVoice.stop();
    const filePath = passageKey === 'ecohouse' ? '/audio/ecohouse.mp3' : '/audio/colosseum.mp3';
    const fallbackText = passageKey === 'ecohouse' 
      ? (STORIES.ecoHouseOnTheHill?.text || '') 
      : (STORIES.colosseumReading?.text || '');

    humanVoice.playAudioUrl(filePath, {
      onStart: () => setPlayingPassage(passageKey),
      onEnd: () => setPlayingPassage(null),
    }).catch((err) => {
      if (isAbortError(err)) return;
      humanVoice.speak(fallbackText, {
        onStart: () => setPlayingPassage(passageKey),
        onEnd: () => setPlayingPassage(null),
      });
    });
  };

  const speakQuestionText = () => {
    if (isSpeakingQuestion) {
      humanVoice.stop();
      setIsSpeakingQuestion(false);
      return;
    }
    const q = activeQuestions[currentQuestionIndex];
    if (!q) return;

    let textToSpeak = q.question;
    if (q.options && q.options.length > 0) {
      textToSpeak += '. Options are: ' + q.options.join(', ');
    }

    humanVoice.speak(textToSpeak, {
      rate: 0.90,
      onStart: () => setIsSpeakingQuestion(true),
      onEnd: () => setIsSpeakingQuestion(false),
    });
  };

  const appendChipWord = (word: string) => {
    sound.playClick();
    setEssayText(prev => {
      const trimmed = (prev || '').trim();
      if (!trimmed) return word;
      return trimmed + ' ' + word;
    });
  };

  const currentWordCount = (essayText || '').trim().split(/\s+/).filter(w => w.length > 0).length;

  const listeningAudioText = STORIES.listeningHomesAroundTheWorld
    ? STORIES.listeningHomesAroundTheWorld.text
    : (STORIES as any).listeningPlanetEarth?.text || '';

  // Dynamic question paper set resolution (Set B has new different questions)
  const activeQuestions = paperSet === 'B' ? MOCK_SAT_QUESTIONS_SET_B : MOCK_SAT_QUESTIONS;
  const activeDefinitions = paperSet === 'B' ? PART_2_DEFINITIONS_SET_B : PART_2_DEFINITIONS;

  const part1WordBox = paperSet === 'B'
    ? ['move', 'wooden poles', 'tall', 'one', 'safe and warm', 'villages']
    : (STORIES.listeningHomesAroundTheWorld?.wordBox || [
        'homes', 'yurt', 'bungalow', 'apartment', 'stilt house', 'detached house'
      ]);

  // Stop audio on question change if question is not in Part 1
  useEffect(() => {
    humanVoice.stop();
    setIsSpeakingQuestion(false);
    setPlayingPassage(null);
    const q = activeQuestions[currentQuestionIndex];
    if (q && q.part !== 1) {
      if (audioRef.current) {
        try {
          audioRef.current.pause();
        } catch (_) {
          // Safe ignore
        }
      }
      setIsPlayingAudio(false);
    }
  }, [currentQuestionIndex, paperSet]);

  const changePlaybackSpeed = (speed: number) => {
    setPlaybackSpeed(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setAudioCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatAudioTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const playSpeechSynthesis = () => {
    humanVoice.speak(listeningAudioText, {
      rate: playbackSpeed === 0.8 ? 0.8 : 0.92,
      onStart: () => setIsPlayingAudio(true),
      onEnd: () => setIsPlayingAudio(false),
    });
  };

  const togglePlayAudio = () => {
    if (audioRef.current) {
      if (isPlayingAudio) {
        try {
          audioRef.current.pause();
        } catch (_) {
          // Safe ignore
        }
        setIsPlayingAudio(false);
      } else {
        humanVoice.stop();
        audioRef.current.playbackRate = playbackSpeed;
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlayingAudio(true))
            .catch((err) => {
              if (isAbortError(err)) {
                setIsPlayingAudio(false);
                return;
              }
              console.warn('Audio element fallback to human voice stream:', err);
              setIsPlayingAudio(false);
              playSpeechSynthesis();
            });
        }
      }
      return;
    }

    if (isPlayingAudio) {
      humanVoice.stop();
      setIsPlayingAudio(false);
    } else {
      playSpeechSynthesis();
    }
  };

  const replayAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.playbackRate = playbackSpeed;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlayingAudio(true))
          .catch((err) => {
            if (isAbortError(err)) {
              setIsPlayingAudio(false);
              return;
            }
            playSpeechSynthesis();
          });
      }
      return;
    }

    playSpeechSynthesis();
  };

  // Timer countdown hook for Exam Mode
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerActive && countdown > 0) {
      interval = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0 && timerActive) {
      finishExam();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, countdown]);

  const totalQuestions = activeQuestions.length;
  const currentQuestion = activeQuestions[currentQuestionIndex] || activeQuestions[0];

  const startExam = (mode: 'practice' | 'exam' | 'paper') => {
    sound.playClick();
    setExamMode(mode);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setTextAnswers({});
    setSubmitted(false);
    setExamFinished(false);
    setCountdown(1800); // 30 min
    setTimerActive(mode === 'exam');
  };

  const selectAnswer = (answer: string | boolean) => {
    if (examMode === 'practice' && submitted) return;

    sound.playClick();
    setSelectedAnswers(prev => ({ ...prev, [currentQuestion.number]: answer }));

    if (examMode === 'practice') {
      setSubmitted(true);
      const isCorrect = String(answer).toLowerCase() === String(currentQuestion.correctAnswer).toLowerCase();
      if (isCorrect) {
        sound.playCorrect();
      } else {
        sound.playWrong();
      }
    }
  };

  const handlePart2LetterInput = (rawVal: string, qNum: number = currentQuestion.number) => {
    if (examMode === 'practice' && submitted) return;

    // Sanitize to single uppercase letter A-K or empty
    const cleanLetter = rawVal.replace(/[^a-zA-Z]/g, '').slice(-1).toUpperCase();
    
    setTextAnswers(prev => ({ ...prev, [qNum]: cleanLetter }));

    if (!cleanLetter) {
      setSelectedAnswers(prev => {
        const copy = { ...prev };
        delete copy[qNum];
        return copy;
      });
      return;
    }

    // Find the definition matching this letter
    const def = activeDefinitions.find(d => d.letter === cleanLetter);
    const fullAnswer = def ? `${def.letter}. ${def.text}` : cleanLetter;
    setSelectedAnswers(prev => ({ ...prev, [qNum]: fullAnswer }));

    sound.playClick();

    if (examMode === 'practice') {
      const q = activeQuestions.find(item => item.number === qNum) || currentQuestion;
      const targetLetter = (q.matchLetter || '').toUpperCase();
      const isCorrect = cleanLetter === targetLetter;
      setSubmitted(true);
      if (isCorrect) {
        sound.playCorrect();
      } else {
        sound.playWrong();
      }
    }
  };

  const handleNext = () => {
    sound.playClick();
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      if (examMode === 'practice') {
        setSubmitted(selectedAnswers[activeQuestions[currentQuestionIndex + 1].number] !== undefined);
      }
    }
  };

  const isQuestionAnswered = (qNum: number, part: number) => {
    if (part === 5) {
      return (essayText || '').trim().split(/\s+/).filter(w => w.length > 0).length >= 10;
    }
    if (part === 2) {
      return Boolean(textAnswers[qNum] || selectedAnswers[qNum]);
    }
    return selectedAnswers[qNum] !== undefined || Boolean(textAnswers[qNum]);
  };

  const jumpToQuestion = (targetIndex: number) => {
    if (targetIndex < 0 || targetIndex >= totalQuestions) return;
    sound.playClick();
    setCurrentQuestionIndex(targetIndex);
    if (examMode === 'practice') {
      const targetQ = activeQuestions[targetIndex];
      const hasAns = targetQ ? isQuestionAnswered(targetQ.number, targetQ.part) : false;
      setSubmitted(hasAns);
    }
  };

  const getPartStartIndex = (partNum: number) => {
    const idx = activeQuestions.findIndex(q => q.part === partNum);
    return idx !== -1 ? idx : 0;
  };

  const answeredCount = activeQuestions.filter(q => isQuestionAnswered(q.number, q.part)).length;

  const handlePrev = () => {
    sound.playClick();
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      if (examMode === 'practice') {
        const prevQ = activeQuestions[currentQuestionIndex - 1];
        setSubmitted(prevQ ? isQuestionAnswered(prevQ.number, prevQ.part) : true);
      }
    }
  };

  const finishExam = () => {
    sound.playFanfare();
    setTimerActive(false);
    setExamFinished(true);
    setSubmitted(true);

    const totalMarks = calcTotalMarks();
    onSaveMockScore(totalMarks);
  };

  // Marks calculation based on the 50-mark test schema
  const calcTotalMarks = () => {
    let earnedMarks = 0;
    activeQuestions.forEach(q => {
      const playerAns = selectedAnswers[q.number] || textAnswers[q.number];
      const targetAns = q.correctAnswer;
      if (q.part === 5) {
        // Essay writing default to full marks if completed with >= 35 words (friendly for new ESL students)
        const words = (essayText || '').trim().split(/\s+/).filter(w => w.length > 0).length;
        if (words >= 35) {
          earnedMarks += q.points; // 15 marks
        } else if (words >= 20) {
          earnedMarks += 11;
        } else if (words >= 10) {
          earnedMarks += 7;
        } else {
          earnedMarks += 3;
        }
      } else if (q.part === 2) {
        const pLetter = String(textAnswers[q.number] || (typeof selectedAnswers[q.number] === 'string' ? (selectedAnswers[q.number] as string).charAt(0) : '') || '').trim().toUpperCase();
        const tLetter = String(q.matchLetter || '').trim().toUpperCase();
        const tAns = String(targetAns).trim().toLowerCase();
        const pAns = String(playerAns || '').trim().toLowerCase();
        if ((pLetter && pLetter === tLetter) || (tLetter && pAns.startsWith(tLetter.toLowerCase() + '.')) || pAns === tAns) {
          earnedMarks += q.points;
        }
      } else if (playerAns !== undefined && String(playerAns).trim().toLowerCase() === String(targetAns).trim().toLowerCase()) {
        earnedMarks += q.points;
      }
    });
    return earnedMarks;
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s}`;
  };

  const getReportGrade = (score: number) => {
    const percentage = (score / 50) * 100;
    if (genAlphaMode) {
      if (percentage >= 90) return { letter: '🏆 MASTER ARCHITECT SIGMA+', color: 'text-emerald-700', note: '🔥 W HOME DESIGNER! Infinite architect aura (+9999 Aura). You mastered types of homes, eco-house features, purpose infinitives, and the Colosseum with zero mistakes!' };
      if (percentage >= 80) return { letter: '⚡ ECO RIZZLER', color: 'text-[#9b2c98]', note: '⚡ Bro is building sustainably! Knowledge of homes, solar panels, and purpose infinitives is certified gigachad!' };
      if (percentage >= 70) return { letter: '🏡 COZY SHELTER BUILDER', color: 'text-indigo-700', note: '🏡 Solid test score! Just review a few modal certainty words and Colosseum facts before full mastery!' };
      if (percentage >= 55) return { letter: '😐 APPRENTICE BUILDER', color: 'text-amber-700', note: '😐 Average apprentice detected. Review the Flashcards and Grammar labs to boost your score!' };
      return { letter: '💀 HOUSE RECONSTRUCTION NEEDED', color: 'text-rose-600', note: '💀 Home blueprint needs polishing! Review types of homes and infinitives of purpose, then retest!' };
    }

    if (percentage >= 90) return { letter: 'A+ (Distinction)', color: 'text-emerald-700', note: 'Mumtaz! Outstanding mastery of Unit 3: Homes! Keep up the brilliant English skills!' };
    if (percentage >= 80) return { letter: 'A (Excellent)', color: 'text-teal-700', note: 'Jayyid Jiddan! Excellent performance across listening, vocabulary, grammar, reading, and writing!' };
    if (percentage >= 70) return { letter: 'B (Good)', color: 'text-indigo-700', note: 'Good job! A quick revision of modal verbs and reading texts will help you reach full marks.' };
    if (percentage >= 55) return { letter: 'C (Pass)', color: 'text-amber-700', note: 'Passable. Check flashcards and grammar practice to strengthen your vocabulary.' };
    return { letter: 'D (Needs Review)', color: 'text-rose-600', note: 'Needs practice! Review the lesson texts and try the mock exam again!' };
  };

  const getPartTitle = (part: number) => {
    switch (part) {
      case 1: return 'Part 1: Listening (5 Marks) — Homes Around the World';
      case 2: return 'Part 2: Vocabulary / Adjectives (10 Marks) — Match Words to Definitions (A–K)';
      case 3: return 'Part 3: Grammar (10 Marks) — The Eco-House on the Hill (Purpose & Modals)';
      case 4: return 'Part 4: Reading Comprehension (10 Marks) — The Colosseum in Rome';
      case 5: return 'Part 5: Writing (15 Marks) — My Dream Home Paragraph (40–60 words)';
      default: return 'Unit 3 ESL Summative Assessment';
    }
  };

  const showListeningContext = currentQuestion.part === 1;
  const showVocabMatchingContext = currentQuestion.part === 2;
  const showGrammarReadingContext = currentQuestion.part === 3 && currentQuestion.number <= 20;
  const showReadingContext = currentQuestion.part === 4;

  const hasContextPanel = showListeningContext || showVocabMatchingContext || showGrammarReadingContext || showReadingContext;

  return (
    <div className="max-w-6xl mx-auto px-4 py-4">
      {/* Embedded Audio Element */}
      <audio
        ref={audioRef}
        src={EMBEDDED_AUDIO_PATH}
        onTimeUpdate={() => {
          if (audioRef.current) {
            setAudioCurrentTime(audioRef.current.currentTime);
          }
        }}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            setAudioDuration(audioRef.current.duration);
          }
        }}
        onEnded={() => {
          setIsPlayingAudio(false);
          setAudioCurrentTime(0);
        }}
        onPause={() => setIsPlayingAudio(false)}
        onPlay={() => setIsPlayingAudio(true)}
      />

      {/* Intro Home Selector */}
      {examMode === null && (
        <div className="bg-white rounded-[32px] border-4 border-[#560e51] shadow-[8px_8px_0px_0px_#560e51] p-8 max-w-3xl mx-auto text-center">
          <div className="w-20 h-20 bg-[#fdf2fe] rounded-3xl flex items-center justify-center mx-auto mb-5 border-3 border-[#560e51] shadow-[3px_3px_0px_0px_#560e51]">
            <Home className="h-10 w-10 text-[#9b2c98]" />
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-[#560e51] font-mono bg-[#fdf2fe] px-4 py-1.5 rounded-full border-2 border-[#560e51]">
            UNIT 3: HOMES · GRADE 4 ESL PS
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-950 mt-4 uppercase tracking-tight">
            Summative Assessment Mock Test 📝
          </h2>
          <p className="text-sm md:text-base text-slate-700 mt-3 leading-relaxed font-bold max-w-2xl mx-auto">
            50-mark mock practice test paper: <strong>Part 1 Listening (5m)</strong>, <strong>Part 2 Vocabulary Adjectives Matching (10m)</strong>, <strong>Part 3 Grammar & Infinitives of Purpose / Modals (10m)</strong>, <strong>Part 4 Reading Comprehension - The Colosseum (10m)</strong>, and <strong>Part 5 Writing Task - My Dream Home (15m)</strong>.
          </p>

          {/* Exam Form Selection (Set A vs Set B) */}
          <div className="bg-[#fefaf0] border-3 border-[#560e51] p-3.5 sm:p-4 rounded-2xl shadow-[3px_3px_0px_0px_#560e51] mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
            <div>
              <span className="text-[10px] font-mono font-black uppercase text-[#9b2c98] block">Select Question Paper:</span>
              <span className="text-xs sm:text-sm font-black text-[#560e51] flex items-center gap-1.5">
                {paperSet === 'B' ? (
                  <>
                    <Sparkles className="h-4 w-4 text-amber-500 fill-amber-300 shrink-0" />
                    <span>Set B · Shuffled Numbers Form (Active)</span>
                  </>
                ) : (
                  <span>Set A · Original Test Order (Active)</span>
                )}
              </span>
              <p className="text-[11px] font-bold text-slate-600 mt-0.5">
                {paperSet === 'B'
                  ? 'Same original test questions from ESL PS, with question numbers shuffled to test real mastery!'
                  : 'Original question sequence (#1–33) as printed in the ESL PS exam paper.'}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                id="btn-select-set-b"
                onClick={() => {
                  sound.playClick();
                  setPaperSet('B');
                  setSelectedAnswers({});
                  setTextAnswers({});
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-tight border-2 border-[#560e51] transition cursor-pointer flex items-center gap-1.5 ${
                  paperSet === 'B'
                    ? 'bg-[#78c222] text-[#560e51] shadow-[2px_2px_0px_0px_#560e51]'
                    : 'bg-white hover:bg-fuchsia-50 text-slate-700'
                }`}
              >
                <Sparkles className="h-3.5 w-3.5 text-[#560e51]" />
                Set B (Shuffled Order)
              </button>

              <button
                type="button"
                id="btn-select-set-a"
                onClick={() => {
                  sound.playClick();
                  setPaperSet('A');
                  setSelectedAnswers({});
                  setTextAnswers({});
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-tight border-2 border-[#560e51] transition cursor-pointer ${
                  paperSet === 'A'
                    ? 'bg-[#78c222] text-[#560e51] shadow-[2px_2px_0px_0px_#560e51]'
                    : 'bg-white hover:bg-fuchsia-50 text-slate-700'
                }`}
              >
                Set A (Original #1–33)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <button
              id="btn-sat-practice"
              onClick={() => startExam('practice')}
              className="p-5 border-4 border-[#560e51] bg-[#fdf2fe] hover:bg-fuchsia-100 text-[#560e51] rounded-2xl flex flex-col items-center gap-2 transition text-center cursor-pointer shadow-[4px_4px_0px_0px_#560e51] active:translate-y-[2px] active:shadow-none"
            >
              <span className="text-3xl">✏️</span>
              <span className="font-black text-[#560e51] text-sm md:text-base uppercase">Practice Mode</span>
              <span className="text-[11px] text-[#9b2c98] leading-snug font-bold">
                Instant feedback, grammar rules & anagram clues after every question.
              </span>
            </button>

            <button
              id="btn-sat-exam"
              onClick={() => startExam('exam')}
              className="p-5 border-4 border-[#560e51] bg-[#f1fbe5] hover:bg-lime-200 text-[#560e51] rounded-2xl flex flex-col items-center gap-2 transition text-center cursor-pointer shadow-[4px_4px_0px_0px_#560e51] active:translate-y-[2px] active:shadow-none"
            >
              <span className="text-3xl">⏳</span>
              <span className="font-black text-[#560e51] text-sm md:text-base uppercase">Timed Exam (30m)</span>
              <span className="text-[11px] text-[#43780a] leading-snug font-bold">
                Timed 30-minute test simulation with 50-mark report card.
              </span>
            </button>

            <button
              id="btn-sat-paper"
              onClick={() => startExam('paper')}
              className="p-5 border-4 border-[#560e51] bg-amber-50 hover:bg-amber-100 text-[#560e51] rounded-2xl flex flex-col items-center gap-2 transition text-center cursor-pointer shadow-[4px_4px_0px_0px_#560e51] active:translate-y-[2px] active:shadow-none"
            >
              <span className="text-3xl">📄</span>
              <span className="font-black text-[#560e51] text-sm md:text-base uppercase">Full Test Sheet</span>
              <span className="text-[11px] text-amber-900 leading-snug font-bold">
                Complete continuous exam paper with audio station & print layout.
              </span>
            </button>
          </div>

          {progress.mockExamCompleted && (
            <div className="mt-8 pt-6 border-t-2 border-slate-200 flex items-center justify-between text-xs sm:text-sm text-slate-700 font-mono">
              <span>PREVIOUS EXAM SCORE:</span>
              <span className="bg-[#78c222] text-[#560e51] font-black border-2 border-[#560e51] px-4 py-1.5 rounded-lg shadow-[2px_2px_0px_0px_#560e51]">
                {progress.mockExamScore} / 50 Marks ({Math.round(((progress.mockExamScore || 0) / 50) * 100)}%)
              </span>
            </div>
          )}
        </div>
      )}

      {/* FULL TEST SHEET MODE (CONTINUOUS EXAM PAPER VIEW) */}
      {examMode === 'paper' && (
        <div className="bg-white rounded-[32px] border-4 border-[#560e51] shadow-[8px_8px_0px_0px_#560e51] p-6 sm:p-10 space-y-8 animate-fade-in">
          
          {/* Header Controls */}
          <div className="flex justify-between items-center flex-wrap gap-4 border-b-4 border-[#560e51] pb-6">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#9b2c98] font-mono">PRACTICE EXAM PAPER · GRADE 4 ESL PS</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 uppercase tracking-tight mt-1">
                SUMMATIVE ASSESSMENT MOCK TEST · UNIT 3: HOMES
              </h2>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => window.print()}
                className="px-4 py-2.5 bg-[#fdf2fe] hover:bg-fuchsia-100 border-2 border-[#560e51] text-[#560e51] text-xs font-black rounded-xl flex items-center gap-2 shadow-[2px_2px_0px_0px_#560e51] cursor-pointer"
              >
                <Printer className="h-4 w-4" /> Print Test Paper
              </button>

              <button
                onClick={() => setExamMode(null)}
                className="px-4 py-2.5 bg-[#560e51] text-white text-xs font-black rounded-xl shadow-[2px_2px_0px_0px_#560e51] cursor-pointer"
              >
                Exit Sheet View ✕
              </button>
            </div>
          </div>

          {/* Student Info Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#fdf2fe] p-5 rounded-2xl border-3 border-[#560e51] font-mono text-xs">
            <div>
              <label className="block text-[10px] font-black uppercase text-[#9b2c98]">Student Name:</label>
              <input 
                type="text" 
                value={candidateName} 
                onChange={(e) => setCandidateName(e.target.value)} 
                className="w-full bg-white p-2 rounded-lg border-2 border-[#560e51] font-bold text-slate-950 mt-1"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase text-[#9b2c98]">Class / Section:</label>
              <input 
                type="text" 
                value={candidateClass} 
                onChange={(e) => setCandidateClass(e.target.value)} 
                className="w-full bg-white p-2 rounded-lg border-2 border-[#560e51] font-bold text-slate-950 mt-1"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase text-[#9b2c98]">Total Examination Marks:</label>
              <div className="w-full bg-[#78c222] p-2 rounded-lg border-2 border-[#560e51] font-black text-[#560e51] mt-1 text-center">
                50 Marks (100%)
              </div>
            </div>
          </div>

          {/* Quick Section Navigator in Paper Mode */}
          <div className="bg-[#fdf2fe] border-3 border-[#560e51] p-3.5 rounded-2xl flex items-center justify-between flex-wrap gap-2.5 shadow-[2px_2px_0px_0px_#560e51]">
            <span className="text-xs font-mono font-black text-[#560e51] flex items-center gap-1.5">
              <Compass className="h-4 w-4 text-[#9b2c98]" /> Quick Jump to Paper Part:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'paper-part-1', label: 'Part 1: Listening (Q1–5)' },
                { id: 'paper-part-2', label: 'Part 2: Vocab (Q6–15)' },
                { id: 'paper-part-3', label: 'Part 3: Grammar (Q16–25)' },
                { id: 'paper-part-4', label: 'Part 4: Reading (Q26–32)' },
                { id: 'paper-part-5', label: 'Part 5: Writing (Q33)' },
              ].map(sec => (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-2.5 py-1 bg-white hover:bg-yellow-100 border-2 border-[#560e51] text-[#560e51] text-xs font-mono font-black rounded-lg cursor-pointer transition shadow-[1px_1px_0px_0px_#560e51]"
                >
                  {sec.label}
                </button>
              ))}
            </div>
          </div>

          {/* PART 1: LISTENING */}
          <section id="paper-part-1" className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-xl font-black text-[#560e51] uppercase tracking-tight flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-[#9b2c98] text-white flex items-center justify-center text-sm font-mono">1</span>
                Part 1: Listening (5 Marks) — Homes Around the World
              </h3>
              <span className="text-xs font-mono font-black text-[#9b2c98] bg-[#fdf2fe] px-3 py-1 rounded-full border border-[#9b2c98]">5 Marks</span>
            </div>
            <p className="text-xs font-bold text-slate-700">Listen to the audio track and fill in the missing words from the word box below.</p>

            {/* Audio Station in Paper Mode */}
            <div className="bg-[#fefaf0] border-3 border-[#560e51] p-5 rounded-2xl space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlayAudio}
                    className={`px-5 py-3 rounded-xl font-black text-xs uppercase tracking-wide border-2 border-[#560e51] flex items-center gap-2 cursor-pointer shadow-[2px_2px_0px_0px_#560e51] ${
                      isPlayingAudio ? 'bg-amber-400 text-[#560e51]' : 'bg-[#78c222] text-[#560e51]'
                    }`}
                  >
                    {isPlayingAudio ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    {isPlayingAudio ? 'Pause Audio' : 'Play Listening Audio 🔊'}
                  </button>
                  <button
                    onClick={replayAudio}
                    className="p-3 bg-white hover:bg-slate-100 text-[#560e51] rounded-xl border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#560e51] cursor-pointer"
                    title="Replay Audio"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2 bg-white p-2 rounded-xl border-2 border-[#560e51]">
                  <span className="text-[10px] font-black uppercase text-slate-500 font-mono px-1">Speed:</span>
                  {[0.8, 1.0, 1.2].map((spd) => (
                    <button
                      key={spd}
                      onClick={() => changePlaybackSpeed(spd)}
                      className={`px-2.5 py-1 text-[11px] font-black rounded-lg transition font-mono ${
                        playbackSpeed === spd
                          ? 'bg-[#9b2c98] text-white border border-[#560e51]'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {spd}x {spd === 0.8 ? '(Slow)' : ''}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setShowTranscript(!showTranscript);
                    sound.playClick();
                  }}
                  className="w-full sm:w-auto px-4 py-3 bg-white hover:bg-fuchsia-50 text-[#560e51] font-black text-xs uppercase tracking-wider rounded-xl border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#560e51] cursor-pointer flex items-center justify-center gap-1.5 sm:ml-auto"
                >
                  {showTranscript ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  {showTranscript ? 'Hide Script' : 'View Script'}
                </button>
              </div>

              {/* Progress Bar & Time */}
              <div className="space-y-1 bg-white p-3 rounded-xl border-2 border-[#560e51]">
                <div className="flex justify-between items-center text-[10px] font-black font-mono text-[#560e51]">
                  <span>Track Progress</span>
                  <span>{formatAudioTime(audioCurrentTime)} / {formatAudioTime(audioDuration || 35)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={audioDuration || 35}
                  step="0.1"
                  value={audioCurrentTime}
                  onChange={handleSeek}
                  className="w-full h-2 bg-fuchsia-100 rounded-lg appearance-none cursor-pointer accent-[#9b2c98]"
                />
              </div>

              {/* Optional Transcript */}
              {showTranscript && (
                <div className="animate-fade-in border-t-2 border-fuchsia-200 pt-3">
                  <span className="text-[10px] font-black uppercase font-mono text-[#9b2c98] block mb-1">AUDIO TRANSCRIPT:</span>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-bold whitespace-pre-wrap bg-white p-3 border-2 border-[#560e51] rounded-xl">
                    {listeningAudioText}
                  </p>
                </div>
              )}
            </div>

            {/* Word Box */}
            <div className="p-4 bg-fuchsia-50 border-2 border-[#560e51] rounded-2xl">
              <span className="text-xs font-black uppercase text-[#560e51] font-mono block mb-2">Word Box:</span>
              <div className="flex flex-wrap gap-3">
                {part1WordBox.map((w, idx) => (
                  <span key={idx} className="px-3 py-1 bg-white border-2 border-[#560e51] rounded-xl text-xs font-black text-[#560e51] shadow-[1.5px_1.5px_0px_0px_#560e51]">
                    {w}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {activeQuestions.filter(q => q.part === 1).map((q) => (
                <div key={q.id} className="p-3 bg-white border-2 border-[#560e51] rounded-xl flex items-center justify-between gap-4">
                  <p className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed">
                    <span className="font-mono font-black text-[#9b2c98] mr-2">{q.number}.</span>
                    {q.question}
                  </p>
                  <input
                    type="text"
                    placeholder="Type word..."
                    value={textAnswers[q.number] || (selectedAnswers[q.number] as string) || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setTextAnswers(prev => ({ ...prev, [q.number]: val }));
                      setSelectedAnswers(prev => ({ ...prev, [q.number]: val }));
                    }}
                    className="w-36 p-1.5 border-2 border-[#560e51] rounded-lg text-xs font-black text-[#560e51] bg-[#fdf2fe] text-center"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* PART 2: VOCABULARY & ADJECTIVES MATCHING */}
          <section id="paper-part-2" className="space-y-4 border-t-2 border-slate-200 pt-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-xl font-black text-[#560e51] uppercase tracking-tight flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-[#9b2c98] text-white flex items-center justify-center text-sm font-mono">2</span>
                Part 2: Vocabulary / Adjectives (10 Marks) — Match Words to Definitions (A–K)
              </h3>
              <span className="text-xs font-mono font-black text-[#9b2c98] bg-[#fdf2fe] px-3 py-1 rounded-full border border-[#9b2c98]">10 Marks</span>
            </div>
            
            <p className="text-xs font-bold text-slate-700 leading-relaxed">
              Read the definitions (A–K) in the box below. Type the letter of the correct definition in the box beside each adjective (1–10). There is one example (0).
            </p>

            {/* Definitions Box (A–K) */}
            <div className="bg-[#fefaf0] border-3 border-[#560e51] p-4 rounded-2xl shadow-[3px_3px_0px_0px_#560e51]">
              <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b-2 border-amber-200">
                <span className="text-xs font-mono font-black uppercase text-[#560e51] tracking-wider flex items-center gap-1.5">
                  📖 Definitions Box (A–K)
                </span>
                <span className="text-[11px] font-mono font-black text-[#560e51] bg-yellow-200 px-2.5 py-0.5 rounded-md border border-[#560e51]">
                  Example 0: enormous = [ E ]
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                {activeDefinitions.map(def => (
                  <div key={def.letter} className="p-2 bg-white border border-amber-300 rounded-xl flex items-start gap-2 shadow-sm">
                    <span className="w-6 h-6 rounded bg-[#560e51] text-white flex items-center justify-center font-mono font-black text-xs shrink-0">
                      {def.letter}
                    </span>
                    <span className="font-bold text-slate-800 leading-snug pt-0.5">
                      {def.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Questions 1-10 with highlighted adjectives and input beside word */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {activeQuestions.filter(q => q.part === 2).map((q, idx) => {
                const typed = (textAnswers[q.number] || (typeof selectedAnswers[q.number] === 'string' ? (selectedAnswers[q.number] as string).charAt(0) : '') || '').toUpperCase();
                const matchedDef = activeDefinitions.find(d => d.letter === typed);

                return (
                  <div key={q.id} className="p-4 bg-white border-2 border-[#560e51] rounded-2xl space-y-2.5 shadow-[2px_2px_0px_0px_#560e51]">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-black text-[#9b2c98]">Question {q.number} (Item {idx + 1} of 10)</span>
                      <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">1 Mark</span>
                    </div>

                    <div className="flex items-center justify-between gap-3 bg-amber-50/70 p-3 rounded-xl border border-amber-200">
                      {/* Word with highlighted adjective */}
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono font-black text-base text-[#560e51]">{idx + 1}.</span>
                        <div className="flex items-center gap-1.5">
                          <span className="px-3 py-1 bg-yellow-300 text-[#560e51] border-2 border-[#560e51] rounded-lg font-black text-base tracking-wide shadow-[1px_1px_0px_0px_#560e51]">
                            {q.adjective || q.question.replace(/Match \d+\.\s*/, '').replace(/\s+to its definition:.*/, '')}
                          </span>
                        </div>
                      </div>

                      {/* Letter Choice Input Beside Word */}
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs font-mono font-black text-slate-600 hidden sm:inline">[A–K]:</span>
                        <input
                          type="text"
                          maxLength={1}
                          placeholder="—"
                          value={typed}
                          onChange={(e) => handlePart2LetterInput(e.target.value, q.number)}
                          className="w-11 h-11 text-center font-mono font-black text-lg uppercase bg-white border-2 border-[#560e51] rounded-xl text-[#560e51] shadow-[2px_2px_0px_0px_#560e51] focus:bg-yellow-100 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Definition preview if typed */}
                    {matchedDef && (
                      <div className="text-[11px] font-bold text-slate-700 bg-fuchsia-50 border border-fuchsia-200 p-2 rounded-lg flex items-center gap-2">
                        <span className="w-4 h-4 rounded bg-[#9b2c98] text-white flex items-center justify-center font-mono font-black text-[10px]">
                          {matchedDef.letter}
                        </span>
                        <span className="truncate">{matchedDef.text}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* PART 3: GRAMMAR */}
          <section id="paper-part-3" className="space-y-4 border-t-2 border-slate-200 pt-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-xl font-black text-[#560e51] uppercase tracking-tight flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-[#9b2c98] text-white flex items-center justify-center text-sm font-mono">3</span>
                Part 3: Grammar (10 Marks) — Eco-House & Infinitives of Purpose / Modals
              </h3>
              <span className="text-xs font-mono font-black text-[#9b2c98] bg-[#fdf2fe] px-3 py-1 rounded-full border border-[#9b2c98]">10 Marks</span>
            </div>
            <p className="text-xs font-bold text-slate-700">Read the short text below about the eco-house on the hill. Then complete the sentences using infinitives of purpose or modal verbs of possibility.</p>

            {/* Reading Context */}
            <div className="bg-[#fdf2fe] border-3 border-[#560e51] p-5 rounded-2xl space-y-2">
              <span className="text-[10px] font-mono font-black uppercase text-[#9b2c98]">Reading Context:</span>
              <h4 className="font-black text-sm uppercase text-[#560e51]">{STORIES.ecoHouseOnTheHill?.title || 'Part 3: The Eco-House on the Hill'}</h4>
              <p className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed whitespace-pre-wrap">
                {STORIES.ecoHouseOnTheHill?.text || ''}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeQuestions.filter(q => q.part === 3).map((q) => (
                <div key={q.id} className="p-4 bg-white border-2 border-[#560e51] rounded-2xl space-y-2 shadow-[2px_2px_0px_0px_#560e51]">
                  <span className="text-[11px] font-mono font-black text-[#9b2c98]">Question {q.number} (1 mark)</span>
                  <p className="text-xs font-bold text-slate-900">{q.question}</p>
                  <div className="space-y-1">
                    {q.options?.map((opt, idx) => (
                      <label key={idx} className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer p-1 rounded hover:bg-fuchsia-50">
                        <input
                          type="radio"
                          name={`q-${q.number}`}
                          checked={selectedAnswers[q.number] === opt}
                          onChange={() => selectAnswer(opt)}
                          className="accent-[#560e51]"
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* PART 4: READING COMPREHENSION */}
          <section id="paper-part-4" className="space-y-4 border-t-2 border-slate-200 pt-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-xl font-black text-[#560e51] uppercase tracking-tight flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-[#9b2c98] text-white flex items-center justify-center text-sm font-mono">4</span>
                Part 4: Reading Comprehension — The Colosseum (10 Marks)
              </h3>
              <span className="text-xs font-mono font-black text-[#9b2c98] bg-[#fdf2fe] px-3 py-1 rounded-full border border-[#9b2c98]">10 Marks</span>
            </div>
            <p className="text-xs font-bold text-slate-700">Read the text about the ancient Colosseum in Rome and answer the questions below.</p>

            <div className="bg-[#f1fbe5] border-3 border-[#560e51] p-5 rounded-2xl space-y-2">
              <span className="text-[10px] font-mono font-black uppercase text-[#43780a]">Reading Passage:</span>
              <h4 className="font-black text-sm uppercase text-[#560e51]">{STORIES.colosseumReading?.title || 'Part 4: The Colosseum'}</h4>
              <p className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed whitespace-pre-wrap">
                {STORIES.colosseumReading?.text || ''}
              </p>
            </div>

            <div className="space-y-4">
              {activeQuestions.filter(q => q.part === 4).map((q) => (
                <div key={q.id} className="p-4 bg-white border-2 border-[#560e51] rounded-2xl space-y-2 shadow-[2px_2px_0px_0px_#560e51]">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-mono font-black text-[#9b2c98]">Question {q.number}</span>
                    <span className="text-[10px] font-mono font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-500">{q.points} Mark{q.points > 1 ? 's' : ''}</span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-slate-900">{q.question}</p>
                  <div className="space-y-1">
                    {q.options?.map((opt, idx) => (
                      <label key={idx} className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer p-1 rounded hover:bg-emerald-50">
                        <input
                          type="radio"
                          name={`q-${q.number}`}
                          checked={selectedAnswers[q.number] === opt}
                          onChange={() => selectAnswer(opt)}
                          className="accent-[#560e51]"
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* PART 5: WRITING */}
          <section id="paper-part-5" className="space-y-4 border-t-2 border-slate-200 pt-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-xl font-black text-[#560e51] uppercase tracking-tight flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-[#9b2c98] text-white flex items-center justify-center text-sm font-mono">5</span>
                Part 5: Writing (15 Marks) — My Dream Home Paragraph (40–60 words)
              </h3>
              <span className="text-xs font-mono font-black text-[#9b2c98] bg-[#fdf2fe] px-3 py-1 rounded-full border border-[#9b2c98]">15 Marks</span>
            </div>

            <div className="bg-[#fefaf0] border-3 border-[#560e51] p-5 rounded-2xl space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <p className="text-xs sm:text-sm font-bold text-slate-800 leading-relaxed">
                  Write a short paragraph (<strong>40 to 60 words</strong>) about your <strong>Dream Home</strong> or an <strong>Eco-House</strong>. Follow the 5 simple steps below and use words from the word bank!
                </p>
                <span className="text-xs font-mono font-black text-[#43780a] bg-lime-100 px-3 py-1 rounded-full border border-lime-400">
                  Target: 40–60 words
                </span>
              </div>

              {/* 5 Simple Planning Steps */}
              <div className="p-3 bg-fuchsia-100 border-2 border-[#560e51] rounded-xl text-[#560e51] text-xs font-bold space-y-2">
                <p>📝 <strong>5 Simple Steps to Plan Your Paragraph:</strong></p>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-[11px]">
                  <div className="bg-white p-2 rounded-lg border border-fuchsia-200">
                    <span className="block font-black text-[#560e51]">1. Home & Where</span>
                    <span className="text-slate-600 font-medium">My dream home is a cosy [eco-house / cottage] on a hill.</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-fuchsia-200">
                    <span className="block font-black text-[#560e51]">2. Materials</span>
                    <span className="text-slate-600 font-medium">The walls are made of [stone and wood].</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-fuchsia-200">
                    <span className="block font-black text-[#43780a]">3. to + verb</span>
                    <span className="text-slate-600 font-medium">It has solar panels to [make clean electricity].</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-fuchsia-200">
                    <span className="block font-black text-[#560e51]">4. Special Rooms</span>
                    <span className="text-slate-600 font-medium">Inside, there is a [round green door / cosy bedroom].</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-fuchsia-200">
                    <span className="block font-black text-[#560e51]">5. Feelings</span>
                    <span className="text-slate-600 font-medium">I love it because it is [cosy, warm, and comfortable].</span>
                  </div>
                </div>
              </div>

              {/* Helper Word Bank */}
              <div className="p-3 bg-amber-50 border-2 border-amber-300 rounded-xl text-xs space-y-1">
                <span className="font-mono font-black text-amber-950 uppercase text-[10px] block">📚 Helper Word Bank:</span>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-1.5 text-[11px] text-slate-800">
                  <div className="bg-white px-2 py-1 rounded border border-amber-200">
                    <strong>Homes:</strong> eco-house, cottage, stilt house, yurt, bungalow
                  </div>
                  <div className="bg-white px-2 py-1 rounded border border-amber-200">
                    <strong>Materials:</strong> stone, wood, bricks, glass, mud, clay tiles
                  </div>
                  <div className="bg-white px-2 py-1 rounded border border-amber-200">
                    <strong>to + verb:</strong> to make electricity, to let in sunlight, to save water
                  </div>
                  <div className="bg-white px-2 py-1 rounded border border-amber-200">
                    <strong>Feelings:</strong> cosy, spacious, comfortable, warm, peaceful
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-black uppercase font-mono text-[#560e51]">
                    Candidate Essay Response (Target: 40–60 words):
                  </label>
                  <span className="text-xs font-mono font-bold text-slate-600">
                    Word Count: <strong className={currentWordCount >= 35 && currentWordCount <= 65 ? 'text-[#43780a]' : 'text-slate-900'}>{currentWordCount}</strong> words
                  </span>
                </div>
                <textarea
                  rows={6}
                  value={essayText}
                  onChange={(e) => setEssayText(e.target.value)}
                  className="w-full p-4 border-2 border-[#560e51] rounded-xl text-xs sm:text-sm font-bold bg-white text-slate-950 focus:outline-none leading-relaxed"
                />
              </div>
            </div>
          </section>

          {/* Submit from Paper View */}
          <div className="flex justify-end gap-3 pt-4 border-t-2 border-slate-200">
            <button
              onClick={() => {
                finishExam();
              }}
              className="px-8 py-3.5 bg-[#78c222] hover:bg-[#68ab1c] border-2 border-[#560e51] text-[#560e51] font-black rounded-xl text-sm uppercase shadow-[3px_3px_0px_0px_#560e51] cursor-pointer"
            >
              Grade & Submit Test Sheet 📝
            </button>
          </div>

        </div>
      )}

      {/* Main Practice / Exam Area */}
      {examMode !== null && examMode !== 'paper' && !examFinished && (
        <div className="space-y-5 animate-fade-in">
          {/* NUMBER TOGGLER / QUESTION NAVIGATOR */}
          <div className="bg-white border-4 border-[#560e51] shadow-[6px_6px_0px_0px_#560e51] rounded-[24px] p-4 sm:p-5">
            {/* Top Bar: Title, Progress, Quick Tabs & Prev/Next Stepper */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b-2 border-fuchsia-100">
              <div className="flex items-center gap-2.5 flex-wrap">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#fdf2fe] border-2 border-[#560e51] rounded-xl text-xs font-black text-[#560e51] shadow-[2px_2px_0px_0px_#560e51]">
                  <ListOrdered className="h-4 w-4 text-[#9b2c98]" />
                  <span>Number Toggler (1–{totalQuestions})</span>
                </div>

                <div className="flex items-center gap-2 bg-[#fefaf0] border-2 border-[#560e51] px-3 py-1 rounded-xl text-xs font-mono font-bold text-slate-800 shadow-[1.5px_1.5px_0px_0px_#560e51]">
                  <span>Answered:</span>
                  <span className="font-black text-[#43780a]">{answeredCount} / {totalQuestions}</span>
                  <div className="w-16 sm:w-20 bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-[#78c222] h-full transition-all duration-300"
                      style={{ width: `${Math.round((answeredCount / totalQuestions) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Fast Part Filter Tabs & Stepper Controls */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1 p-1 bg-slate-100 border border-slate-300 rounded-xl overflow-x-auto">
                  {[
                    { label: 'All (33)', part: 'all' as const },
                    { label: 'P1: Listening', part: 1 as const },
                    { label: 'P2: Vocab', part: 2 as const },
                    { label: 'P3: Grammar', part: 3 as const },
                    { label: 'P4: Reading', part: 4 as const },
                    { label: 'P5: Essay', part: 5 as const },
                  ].map(tab => (
                    <button
                      key={tab.label}
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setNavPartFilter(tab.part);
                        if (tab.part !== 'all') {
                          jumpToQuestion(getPartStartIndex(tab.part));
                        }
                      }}
                      className={`px-2.5 py-1 text-[11px] font-black rounded-lg transition uppercase font-mono cursor-pointer ${
                        navPartFilter === tab.part
                          ? 'bg-[#560e51] text-white shadow-sm'
                          : 'text-slate-600 hover:bg-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Direct Dropdown Jumper */}
                <select
                  value={currentQuestionIndex}
                  onChange={(e) => jumpToQuestion(Number(e.target.value))}
                  className="text-xs font-mono font-bold border-2 border-[#560e51] bg-[#fdf2fe] text-[#560e51] rounded-xl py-1.5 px-2.5 cursor-pointer shadow-[2px_2px_0px_0px_#560e51]"
                  aria-label="Jump directly to question"
                >
                  {activeQuestions.map((q, idx) => {
                    const ans = isQuestionAnswered(q.number, q.part);
                    return (
                      <option key={q.id} value={idx}>
                        Q{q.number} (P{q.part}) {ans ? '✓' : '—'}
                      </option>
                    );
                  })}
                </select>

                {/* Grid expand / collapse button */}
                <button
                  type="button"
                  onClick={() => setIsNavGridExpanded(!isNavGridExpanded)}
                  className="px-2.5 py-1.5 bg-white hover:bg-fuchsia-50 border-2 border-[#560e51] rounded-xl text-xs font-black text-[#560e51] cursor-pointer shadow-[1.5px_1.5px_0px_0px_#560e51]"
                  title="Toggle question numbers panel"
                >
                  {isNavGridExpanded ? 'Collapse ▲' : 'Expand ▼'}
                </button>
              </div>
            </div>

            {/* Interactive Number Pills */}
            {isNavGridExpanded && (
              <div className="pt-3 animate-fade-in">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  {activeQuestions.map((q, idx) => {
                    const isCurrent = idx === currentQuestionIndex;
                    const isAnswered = isQuestionAnswered(q.number, q.part);
                    const isFilteredOut = navPartFilter !== 'all' && q.part !== navPartFilter;
                    const isPartStart = idx > 0 && activeQuestions[idx - 1].part !== q.part && navPartFilter === 'all';

                    return (
                      <React.Fragment key={q.id}>
                        {isPartStart && (
                          <span 
                            className="h-6 w-[2px] bg-fuchsia-200 mx-1 self-center hidden sm:inline-block" 
                            title={`Part ${q.part} starts here`}
                          />
                        )}
                        <button
                          type="button"
                          id={`toggler-q-${q.number}`}
                          onClick={() => jumpToQuestion(idx)}
                          className={`relative min-w-[34px] sm:min-w-[40px] h-8 sm:h-9 px-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer flex items-center justify-center ${
                            isFilteredOut ? 'opacity-25 hover:opacity-100' : ''
                          } ${
                            isCurrent
                              ? 'bg-[#560e51] text-yellow-300 border-2 border-[#560e51] ring-4 ring-[#9b2c98]/30 font-black shadow-md scale-105 z-10'
                              : isAnswered
                              ? 'bg-[#78c222] hover:bg-[#68ab1c] text-[#560e51] border-2 border-[#560e51] font-black shadow-[1.5px_1.5px_0px_0px_#560e51]'
                              : 'bg-white hover:bg-fuchsia-50 text-slate-800 border-2 border-slate-300 font-bold hover:border-[#9b2c98]'
                          }`}
                          title={`Question ${q.number} (Part ${q.part}) — ${isAnswered ? 'Answered' : 'Not answered yet'}. Click to jump!`}
                        >
                          <span>{q.number}</span>
                          {isAnswered && !isCurrent && (
                            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#43780a] border-2 border-white rounded-full" />
                          )}
                        </button>
                      </React.Fragment>
                    );
                  })}
                </div>

                {/* Color Legend & Helper */}
                <div className="flex items-center gap-3 sm:gap-4 text-[11px] font-mono font-bold text-slate-600 pt-3 mt-1 border-t border-fuchsia-100 flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-md bg-[#560e51] border border-[#560e51] inline-block shadow-xs" />
                    <span>Current Active (Q{currentQuestion.number})</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-md bg-[#78c222] border border-[#560e51] inline-block shadow-xs" />
                    <span>Answered ({answeredCount})</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-md bg-white border-2 border-slate-300 inline-block" />
                    <span>Unanswered ({totalQuestions - answeredCount})</span>
                  </span>
                  <span className="text-slate-400 ml-auto hidden md:inline">
                    💡 Click any number to jump back & forth anytime!
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT COLUMN: Passage / Audio Context */}
          {hasContextPanel && (
            <div className="lg:col-span-5 bg-white border-4 border-[#560e51] p-5 sm:p-6 rounded-[28px] h-[24rem] lg:h-[38rem] overflow-y-auto shadow-[6px_6px_0px_0px_#560e51]">
              
              {/* Part 1: Listening Context */}
              {showListeningContext && (
                <>
                  <span className="p-1.5 px-3.5 bg-fuchsia-200 text-[#560e51] border-2 border-[#560e51] text-xs rounded-full font-black uppercase tracking-wider font-mono block mb-3 w-fit">
                    🎧 Part 1: Listening Audio Track
                  </span>
                  
                  <h4 className="text-lg font-black text-[#560e51] mb-3 tracking-tight uppercase">
                    {STORIES.listeningHomesAroundTheWorld?.title || 'Homes Around the World'}
                  </h4>

                  {/* Audio Controls */}
                  <div className="bg-[#fdf2fe] border-3 border-[#560e51] p-4 rounded-2xl mb-4 shadow-[3px_3px_0px_0px_#560e51] space-y-3">
                    <div className="flex items-center justify-between gap-1 flex-wrap">
                      <span className="text-xs font-black uppercase tracking-widest text-[#9b2c98] font-mono flex items-center gap-1.5">
                        <Volume2 className="h-4 w-4 shrink-0" />
                        Homes Around the World Audio Track
                      </span>
                      <span className={`text-[10px] font-black uppercase font-mono px-2 py-0.5 rounded border ${isPlayingAudio ? 'bg-[#78c222] text-[#560e51] border-[#560e51] animate-pulse' : 'bg-white text-slate-600 border-slate-300'}`}>
                        {isPlayingAudio ? '● PLAYING' : '○ READY'}
                      </span>
                    </div>

                    <button
                      onClick={togglePlayAudio}
                      className={`w-full py-3 px-4 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wide border-2 border-[#560e51] flex items-center justify-center gap-2 cursor-pointer transition-all shadow-[2px_2px_0px_0px_#560e51] ${
                        isPlayingAudio
                          ? 'bg-amber-400 hover:bg-amber-500 text-[#560e51]'
                          : 'bg-[#78c222] hover:bg-[#68ab1c] text-[#560e51]'
                      }`}
                    >
                      {isPlayingAudio ? (
                        <>
                          <Pause className="h-4 w-4 fill-current" /> Pause Audio
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 fill-current" /> Play Audio Track 🔊
                        </>
                      )}
                    </button>

                    {/* Progress Slider & Time */}
                    <div className="bg-white p-2.5 rounded-xl border-2 border-[#560e51] space-y-1">
                      <div className="flex justify-between items-center text-[10px] font-black font-mono text-[#560e51]">
                        <span>Audio Progress</span>
                        <span>{formatAudioTime(audioCurrentTime)} / {formatAudioTime(audioDuration || 35)}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max={audioDuration || 35}
                        step="0.1"
                        value={audioCurrentTime}
                        onChange={handleSeek}
                        className="w-full h-1.5 bg-fuchsia-100 rounded-lg appearance-none cursor-pointer accent-[#9b2c98]"
                      />
                    </div>

                    {/* Speed Selector */}
                    <div className="flex items-center justify-between gap-1.5 bg-white p-1.5 rounded-xl border-2 border-[#560e51]">
                      <span className="text-[10px] font-black uppercase text-slate-500 font-mono px-1">Speed:</span>
                      <div className="flex gap-1">
                        {[0.8, 1.0, 1.2].map((spd) => (
                          <button
                            key={spd}
                            onClick={() => changePlaybackSpeed(spd)}
                            className={`px-2 py-0.5 text-[10px] font-black rounded-lg transition font-mono ${
                              playbackSpeed === spd
                                ? 'bg-[#9b2c98] text-white'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            {spd}x {spd === 0.8 ? '(ESL)' : ''}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Equalizer animation */}
                    <div className="flex items-center justify-center gap-1.5 py-2 bg-white border-2 border-[#560e51] rounded-xl px-3">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((bar) => (
                        <div
                          key={bar}
                          className={`w-1.5 rounded-full transition-all duration-300 ${
                            isPlayingAudio ? 'bg-[#9b2c98] animate-bounce' : 'bg-fuchsia-200 h-2'
                          }`}
                          style={{
                            height: isPlayingAudio ? `${(bar % 4 + 1) * 6 + 4}px` : '8px',
                            animationDelay: `${bar * 0.08}s`
                          }}
                        />
                      ))}
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-1">
                      <button
                        onClick={replayAudio}
                        className="flex-1 py-1.5 px-3 bg-white hover:bg-fuchsia-50 border-2 border-[#560e51] text-[#560e51] font-black text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-[1px_1px_0px_0px_#560e51]"
                      >
                        <RotateCcw className="h-3 w-3" /> Replay
                      </button>

                      <button
                        onClick={() => {
                          setShowTranscript(!showTranscript);
                          sound.playClick();
                        }}
                        className="flex-1 py-1.5 px-3 bg-white hover:bg-fuchsia-50 border-2 border-[#560e51] text-[#560e51] font-black text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-[1px_1px_0px_0px_#560e51]"
                      >
                        {showTranscript ? (
                          <>
                            <EyeOff className="h-3 w-3 text-[#9b2c98]" /> Hide Script
                          </>
                        ) : (
                          <>
                            <Eye className="h-3 w-3 text-[#9b2c98]" /> View Script
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {showTranscript ? (
                    <div className="animate-fade-in border-t-2 border-fuchsia-200 pt-3">
                      <span className="text-[10px] font-black uppercase font-mono text-[#9b2c98] block mb-1">AUDIO TRANSCRIPT:</span>
                      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-bold whitespace-pre-wrap select-text bg-[#fefaf0] p-3 border-2 border-[#560e51] rounded-xl">
                        {listeningAudioText}
                      </p>
                    </div>
                  ) : (
                    <div className="p-3 bg-fuchsia-50 border-2 border-dashed border-[#560e51]/30 rounded-xl text-center">
                      <p className="text-xs font-bold text-[#560e51]">
                        🎧 Press <span className="font-black">Play Audio Track 🔊</span> above to listen carefully and choose the missing words for Questions 1–5!
                      </p>
                    </div>
                  )}
                </>
              )}

              {/* Part 2: Vocabulary / Adjectives Matching Reference (A–K) */}
              {showVocabMatchingContext && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="p-1.5 px-3.5 bg-yellow-200 text-[#560e51] border-2 border-[#560e51] text-xs rounded-full font-black uppercase tracking-wider font-mono">
                      📖 Definitions Reference (A–K)
                    </span>
                    <span className="text-[11px] font-mono font-black text-[#9b2c98] bg-[#fdf2fe] px-2.5 py-1 rounded-lg border border-[#560e51]">
                      10 Adjectives
                    </span>
                  </div>

                  <div className="bg-[#fefaf0] border-3 border-[#560e51] p-3.5 rounded-2xl shadow-[3px_3px_0px_0px_#560e51]">
                    <p className="text-xs font-bold text-slate-800 leading-relaxed">
                      Read the definitions below. Type the matching letter <strong>(A–K)</strong> in the box beside each adjective.
                    </p>
                    <div className="mt-2.5 p-2 bg-yellow-100 border-2 border-dashed border-[#560e51] rounded-xl flex items-center justify-between text-xs font-mono">
                      <span className="font-bold text-slate-700">0. <span className="font-black text-[#560e51] bg-yellow-300 px-1.5 py-0.5 rounded border border-[#560e51]">enormous</span> (Example)</span>
                      <span className="font-black text-white bg-[#560e51] px-2 py-0.5 rounded font-mono">E</span>
                    </div>
                  </div>

                  {/* List of Definitions A to K */}
                  <div className="space-y-2">
                    {activeDefinitions.map(def => {
                      const currentTyped = (textAnswers[currentQuestion.number] || (typeof selectedAnswers[currentQuestion.number] === 'string' ? (selectedAnswers[currentQuestion.number] as string).charAt(0) : '') || '').toUpperCase();
                      const isSelected = currentTyped === def.letter;

                      return (
                        <button
                          key={def.letter}
                          type="button"
                          onClick={() => handlePart2LetterInput(def.letter)}
                          className={`w-full text-left p-2.5 rounded-xl border-2 transition-all flex items-start gap-2.5 cursor-pointer ${
                            isSelected
                              ? 'bg-amber-100 border-[#560e51] shadow-[2px_2px_0px_0px_#560e51]'
                              : 'bg-white hover:bg-yellow-50 border-amber-200 hover:border-[#560e51]'
                          }`}
                        >
                          <span className={`w-7 h-7 rounded-lg border-2 border-[#560e51] flex items-center justify-center font-mono font-black text-xs shrink-0 shadow-[1px_1px_0px_0px_#560e51] ${
                            isSelected ? 'bg-[#78c222] text-[#560e51]' : 'bg-[#fdf2fe] text-[#560e51]'
                          }`}>
                            {def.letter}
                          </span>
                          <span className="text-xs font-bold text-slate-900 pt-0.5 leading-snug">
                            {def.text}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Part 3: Reading Context The Eco-House on the Hill */}
              {showGrammarReadingContext && (
                <>
                  <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
                    <span className="p-1.5 px-3.5 bg-indigo-200 text-indigo-950 border-2 border-[#560e51] text-xs rounded-full font-black uppercase tracking-wider font-mono">
                      📖 Part 3: Reading Context
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        togglePassageAudio('ecohouse');
                      }}
                      className={`px-3 py-1.5 rounded-xl border-2 border-[#560e51] text-xs font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_0px_#560e51] transition ${
                        playingPassage === 'ecohouse'
                          ? 'bg-amber-400 text-slate-950 animate-pulse'
                          : 'bg-[#78c222] hover:bg-[#68ab1c] text-[#560e51]'
                      }`}
                    >
                      {playingPassage === 'ecohouse' ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                      {playingPassage === 'ecohouse' ? 'Pause Audio' : 'Listen to Story (Studio Voice 🔊)'}
                    </button>
                  </div>
                  <h4 className="text-lg font-black text-[#560e51] mb-2 tracking-tight uppercase">
                    {STORIES.ecoHouseOnTheHill?.title || 'Part 3: The Eco-House on the Hill'}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-bold whitespace-pre-wrap select-text border-t-2 border-fuchsia-200 pt-3">
                    {STORIES.ecoHouseOnTheHill?.text || ''}
                  </p>
                </>
              )}

              {/* Part 4: Reading The Colosseum Comprehension */}
              {showReadingContext && (
                <>
                  <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
                    <span className="p-1.5 px-3.5 bg-emerald-200 text-emerald-950 border-2 border-[#560e51] text-xs rounded-full font-black uppercase tracking-wider font-mono">
                      📖 Part 4: Reading Comprehension
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        togglePassageAudio('colosseum');
                      }}
                      className={`px-3 py-1.5 rounded-xl border-2 border-[#560e51] text-xs font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_0px_#560e51] transition ${
                        playingPassage === 'colosseum'
                          ? 'bg-amber-400 text-slate-950 animate-pulse'
                          : 'bg-[#78c222] hover:bg-[#68ab1c] text-[#560e51]'
                      }`}
                    >
                      {playingPassage === 'colosseum' ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                      {playingPassage === 'colosseum' ? 'Pause Audio' : 'Listen to Colosseum (Studio Voice 🔊)'}
                    </button>
                  </div>
                  <h4 className="text-lg font-black text-[#560e51] mb-2 tracking-tight uppercase">
                    {STORIES.colosseumReading?.title || 'Part 4: The Colosseum'}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-bold whitespace-pre-wrap select-text border-t-2 border-fuchsia-200 pt-3">
                    {STORIES.colosseumReading?.text || ''}
                  </p>
                </>
              )}

            </div>
          )}

          {/* RIGHT COLUMN: Question MCQ / Anagram / Essay */}
          <div className={`${hasContextPanel ? 'lg:col-span-7' : 'lg:col-span-12'} bg-white border-4 border-[#560e51] shadow-[8px_8px_0px_0px_#560e51] rounded-[28px] p-6 sm:p-7 flex flex-col justify-between min-h-[30rem] lg:min-h-[38rem]`}>
            
            <div>
              {/* Tracker Top Bar */}
              <div className="flex justify-between items-center pb-3 border-b-2 border-fuchsia-200 mb-5 flex-wrap gap-2 text-xs sm:text-sm">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-[#9b2c98] font-mono uppercase block text-[10px]">SUMMATIVE ASSESSMENT · UNIT 3 (50 MARKS TOTAL)</span>
                    <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded border border-[#560e51] bg-yellow-200 text-[#560e51]">
                      Form {paperSet}
                    </span>
                  </div>
                  <span className="font-mono text-[#560e51] font-black block sm:inline-block tracking-tight bg-[#fdf2fe] border-2 border-[#560e51] px-3 py-1 rounded-lg shadow-[2px_2px_0px_0px_#560e51] mt-1 text-xs">
                    {getPartTitle(currentQuestion.part)}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-right">
                  {examMode === 'exam' && (
                    <div className="flex items-center gap-1.5 bg-[#f1fbe5] border-2 border-[#560e51] p-1.5 px-3 rounded-xl text-[#560e51] font-mono font-black shadow-[2px_2px_0px_0px_#560e51] text-xs">
                      <Clock className="h-4 w-4 text-[#43780a] animate-pulse" />
                      <span>{formatTime(countdown)}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1 bg-[#fefaf0] border-2 border-[#560e51] p-1 rounded-xl shadow-[2px_2px_0px_0px_#560e51]">
                    <button
                      type="button"
                      onClick={() => jumpToQuestion(currentQuestionIndex - 1)}
                      disabled={currentQuestionIndex === 0}
                      className="p-1 rounded-lg hover:bg-fuchsia-100 disabled:opacity-20 cursor-pointer text-[#560e51] transition"
                      title="Previous Question"
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                    </button>
                    <span className="font-mono font-black px-2 text-xs text-slate-900">
                      Q: {currentQuestion.number} / {totalQuestions}
                    </span>
                    <button
                      type="button"
                      onClick={() => jumpToQuestion(currentQuestionIndex + 1)}
                      disabled={currentQuestionIndex === totalQuestions - 1}
                      className="p-1 rounded-lg hover:bg-fuchsia-100 disabled:opacity-20 cursor-pointer text-[#560e51] transition"
                      title="Next Question"
                    >
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Part 1 Word Box Indicator */}
              {currentQuestion.part === 1 && (
                <div className="mb-4 p-3 bg-fuchsia-50 border-2 border-[#560e51] rounded-xl">
                  <span className="text-[11px] font-mono font-black uppercase text-[#560e51] block mb-1.5">
                    📦 Word Box (Choose the word you hear):
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {part1WordBox.map((w, idx) => (
                      <button 
                        key={idx}
                        onClick={() => selectAnswer(w)}
                        className={`px-3 py-1 border-2 border-[#560e51] rounded-lg text-xs font-black cursor-pointer transition shadow-[1px_1px_0px_0px_#560e51] ${
                          selectedAnswers[currentQuestion.number] === w 
                            ? 'bg-[#78c222] text-[#560e51]' 
                            : 'bg-white hover:bg-fuchsia-100 text-[#560e51]'
                        }`}
                      >
                        {w}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Anagram badge indicator if present */}
              {currentQuestion.anagramLetters && (
                <div className="mb-4 p-3 bg-amber-100 border-2 border-[#560e51] rounded-xl flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs font-black uppercase text-[#560e51] font-mono">Unscramble the letters:</span>
                  <div className="flex gap-1.5">
                    {currentQuestion.anagramLetters.map((letter, idx) => (
                      <span key={idx} className="w-7 h-7 bg-white border-2 border-[#560e51] rounded-lg font-mono font-black text-sm text-[#560e51] flex items-center justify-center uppercase shadow-[1px_1px_0px_0px_#560e51]">
                        {letter}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Question Headline */}
              <div className="mb-5 flex items-start justify-between gap-3">
                <h3 className="text-lg md:text-xl font-black text-slate-950 tracking-tight leading-relaxed font-sans select-none flex-1">
                  {currentQuestion.part === 2 ? (
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="text-slate-700 font-bold">Match adjective</span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-300 text-[#560e51] border-2 border-[#560e51] rounded-xl font-black text-lg sm:text-xl shadow-[2px_2px_0px_0px_#560e51]">
                        <Sparkles className="h-4 w-4 fill-current text-[#560e51]" />
                        {currentQuestion.adjective || currentQuestion.question.replace(/Match \d+\.\s*/, '').replace(/\s+to its definition:.*/, '')}
                      </span>
                      <span className="text-slate-700 font-bold">to its definition (A–K):</span>
                    </div>
                  ) : (
                    currentQuestion.question
                  )}
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    speakQuestionText();
                  }}
                  className={`p-2.5 rounded-xl border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#560e51] cursor-pointer transition shrink-0 flex items-center gap-1.5 ${
                    isSpeakingQuestion
                      ? 'bg-amber-400 text-slate-950 animate-pulse'
                      : 'bg-[#fdf2fe] hover:bg-fuchsia-100 text-[#560e51]'
                  }`}
                  title="Listen to question (Natural human voice 🔊)"
                >
                  <Volume2 className="h-4 w-4" />
                  <span className="text-[11px] font-black uppercase font-mono hidden sm:inline">
                    {isSpeakingQuestion ? 'Stop' : 'Listen 🔊'}
                  </span>
                </button>
              </div>

              {/* Part 5: Essay Writing Task - Simplified for EFL-to-ESL Transition */}
              {currentQuestion.part === 5 ? (
                <div className="space-y-4 bg-[#fefaf0] p-4 sm:p-6 border-3 border-[#560e51] rounded-2xl shadow-[4px_4px_0px_0px_#560e51]">
                  {/* Target & Task Prompt */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-fuchsia-200 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono font-black uppercase text-[#9b2c98] bg-[#fdf2fe] px-2.5 py-0.5 rounded-full border border-[#9b2c98]">
                          Grade 4 ESL Transition
                        </span>
                        <span className="text-[11px] font-mono font-black text-[#43780a] bg-lime-100 px-2.5 py-0.5 rounded-full border border-lime-400">
                          Target: 40–60 Words
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-bold text-slate-900 mt-1">
                        Write a short paragraph (<strong>40 to 60 words</strong>) about your <strong>Dream Home</strong> or an <strong>Eco-House</strong>.
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 self-start sm:self-auto">
                      <span className={`text-xs font-mono font-black px-3 py-1 rounded-xl border-2 ${
                        currentWordCount >= 35 && currentWordCount <= 65
                          ? 'bg-lime-100 text-[#43780a] border-[#43780a]'
                          : currentWordCount > 65
                          ? 'bg-purple-100 text-[#9b2c98] border-[#9b2c98]'
                          : 'bg-amber-100 text-amber-900 border-amber-400'
                      }`}>
                        {currentWordCount} words {currentWordCount >= 35 && currentWordCount <= 65 ? '✓' : ''}
                      </span>
                    </div>
                  </div>

                  {/* 5 Simple Step Cards */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono font-black uppercase text-[#560e51] block">
                      📝 5 Simple Steps to Guide Your Paragraph:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs font-bold">
                      <div className="p-2.5 bg-fuchsia-50 rounded-xl border border-fuchsia-300">
                        <span className="font-mono font-black text-[#560e51] block text-[10px] uppercase">1. Kind & Where</span>
                        <p className="text-[11px] text-slate-700 mt-0.5">My dream home is a [eco-house] on a [green hill].</p>
                      </div>
                      <div className="p-2.5 bg-lime-50 rounded-xl border border-lime-300">
                        <span className="font-mono font-black text-[#43780a] block text-[10px] uppercase">2. Materials</span>
                        <p className="text-[11px] text-slate-700 mt-0.5">The walls and roof are made of [stone and wood].</p>
                      </div>
                      <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-300">
                        <span className="font-mono font-black text-amber-900 block text-[10px] uppercase">3. to + verb</span>
                        <p className="text-[11px] text-slate-700 mt-0.5">It has [solar panels] to [make electricity].</p>
                      </div>
                      <div className="p-2.5 bg-sky-50 rounded-xl border border-sky-300">
                        <span className="font-mono font-black text-sky-900 block text-[10px] uppercase">4. Special Rooms</span>
                        <p className="text-[11px] text-slate-700 mt-0.5">Inside, there is a [round door] and [cosy rooms].</p>
                      </div>
                      <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-300">
                        <span className="font-mono font-black text-emerald-900 block text-[10px] uppercase">5. Feelings</span>
                        <p className="text-[11px] text-slate-700 mt-0.5">I love it because it is [cosy and comfortable].</p>
                      </div>
                    </div>
                  </div>

                  {/* Scaffolding Tools Bar */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setEssayText(EASY_SENTENCE_TEMPLATE);
                      }}
                      className="px-3 py-1.5 bg-white hover:bg-fuchsia-100 border-2 border-[#560e51] rounded-xl text-xs font-black text-[#560e51] shadow-[2px_2px_0px_0px_#560e51] cursor-pointer flex items-center gap-1.5"
                    >
                      <Copy className="h-3.5 w-3.5" />
                      Load Easy Starter Template 📋
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setShowModelText(!showModelText);
                      }}
                      className={`px-3 py-1.5 border-2 border-[#560e51] rounded-xl text-xs font-black shadow-[2px_2px_0px_0px_#560e51] cursor-pointer flex items-center gap-1.5 ${
                        showModelText ? 'bg-[#9b2c98] text-white' : 'bg-white hover:bg-fuchsia-100 text-[#560e51]'
                      }`}
                    >
                      <Lightbulb className="h-3.5 w-3.5" />
                      {showModelText ? 'Hide Model Paragraph' : 'See Model Example (63 words) 💡'}
                    </button>

                    <button
                      type="button"
                      onClick={speakModelEssay}
                      className={`px-3 py-1.5 border-2 border-[#560e51] rounded-xl text-xs font-black shadow-[2px_2px_0px_0px_#560e51] cursor-pointer flex items-center gap-1.5 ${
                        isSpeakingModel ? 'bg-amber-400 text-slate-950' : 'bg-white hover:bg-amber-50 text-slate-900'
                      }`}
                    >
                      <Volume2 className="h-3.5 w-3.5 text-amber-700" />
                      {isSpeakingModel ? 'Stop Audio' : 'Listen to Model 🔊'}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setShowEslTips(!showEslTips);
                      }}
                      className={`px-3 py-1.5 border-2 border-[#560e51] rounded-xl text-xs font-black shadow-[2px_2px_0px_0px_#560e51] cursor-pointer flex items-center gap-1.5 ${
                        showEslTips ? 'bg-[#43780a] text-white' : 'bg-white hover:bg-lime-50 text-[#43780a]'
                      }`}
                    >
                      <HelpCircle className="h-3.5 w-3.5" />
                      {showEslTips ? 'Hide English Guide' : 'Easy English Guide 💡'}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setEssayText('');
                      }}
                      className="px-2.5 py-1.5 bg-white hover:bg-rose-50 border-2 border-slate-300 text-slate-500 rounded-xl text-xs font-bold cursor-pointer ml-auto"
                      title="Clear text to write from scratch"
                    >
                      Clear Draft
                    </button>
                  </div>

                  {/* Model Paragraph Accordion */}
                  {showModelText && (
                    <div className="p-4 bg-purple-50 border-2 border-[#9b2c98] rounded-xl text-slate-900 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-black uppercase text-[#9b2c98]">
                          ✨ Model Grade 4 ESL Paragraph (63 words):
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            sound.playClick();
                            setEssayText(SIMPLE_MODEL_ESSAY);
                          }}
                          className="text-[11px] font-bold text-[#9b2c98] underline cursor-pointer"
                        >
                          Use this text as my answer
                        </button>
                      </div>
                      <p className="text-xs sm:text-sm font-medium leading-relaxed bg-white p-3 rounded-lg border border-purple-200">
                        {SIMPLE_MODEL_ESSAY}
                      </p>
                    </div>
                  )}

                  {/* EFL Guidance in Easy English */}
                  {showEslTips && (
                    <div className="p-4 bg-lime-50 border-2 border-[#43780a] rounded-xl text-slate-900 space-y-2 text-xs">
                      <span className="font-mono font-black uppercase text-[#43780a] block">
                        💡 Easy English Writing Guide (For EFL Students):
                      </span>
                      <ul className="list-disc list-inside space-y-1 font-medium text-slate-800">
                        <li><strong>Target Length:</strong> Just <strong>40 – 60 words</strong> (about 5 short sentences). Keep sentences short and clear!</li>
                        <li><strong>Use "to + verb":</strong> Explain why you built each part using <em>to + base verb</em> (example: <em>to make electricity</em>, <em>to collect rainwater</em>).</li>
                        <li><strong>Choose 2 Describing Words (Adjectives):</strong> Use Unit 3 words like <em>cosy</em> (warm & safe), <em>spacious</em> (lots of room), or <em>comfortable</em>.</li>
                        <li><strong>Quick Start:</strong> Click <em>"Load Easy Starter Template"</em> above to get helpful sentence patterns you can easily fill in!</li>
                      </ul>
                    </div>
                  )}

                  {/* Clickable Word Helper Bank */}
                  <div className="p-3 bg-white border-2 border-[#560e51] rounded-xl space-y-2">
                    <span className="text-[11px] font-mono font-black uppercase text-[#560e51] flex items-center gap-1">
                      <span>📚 Word Bank</span>
                      <span className="text-slate-400 font-normal font-sans">(Click any word to add to your paragraph):</span>
                    </span>
                    
                    <div className="space-y-1.5 text-xs">
                      {/* Homes */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono font-bold text-[10px] uppercase text-[#9b2c98] w-16 shrink-0">Homes:</span>
                        {ESL_WRITING_CHIPS.homes.map(w => (
                          <button
                            key={w}
                            type="button"
                            onClick={() => appendChipWord(w)}
                            className="px-2 py-0.5 bg-fuchsia-50 hover:bg-fuchsia-100 border border-[#9b2c98] text-[#560e51] rounded-lg text-[11px] font-bold cursor-pointer transition"
                          >
                            + {w}
                          </button>
                        ))}
                      </div>

                      {/* Materials */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono font-bold text-[10px] uppercase text-[#43780a] w-16 shrink-0">Materials:</span>
                        {ESL_WRITING_CHIPS.materials.map(w => (
                          <button
                            key={w}
                            type="button"
                            onClick={() => appendChipWord(w)}
                            className="px-2 py-0.5 bg-lime-50 hover:bg-lime-100 border border-[#43780a] text-[#43780a] rounded-lg text-[11px] font-bold cursor-pointer transition"
                          >
                            + {w}
                          </button>
                        ))}
                      </div>

                      {/* Purpose */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono font-bold text-[10px] uppercase text-amber-900 w-16 shrink-0">to + verb:</span>
                        {ESL_WRITING_CHIPS.purposes.map(w => (
                          <button
                            key={w}
                            type="button"
                            onClick={() => appendChipWord(w)}
                            className="px-2 py-0.5 bg-amber-50 hover:bg-amber-100 border border-amber-500 text-amber-950 rounded-lg text-[11px] font-bold cursor-pointer transition"
                          >
                            + {w}
                          </button>
                        ))}
                      </div>

                      {/* Feelings */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono font-bold text-[10px] uppercase text-sky-900 w-16 shrink-0">Feelings:</span>
                        {ESL_WRITING_CHIPS.adjectives.map(w => (
                          <button
                            key={w}
                            type="button"
                            onClick={() => appendChipWord(w)}
                            className="px-2 py-0.5 bg-sky-50 hover:bg-sky-100 border border-sky-500 text-sky-950 rounded-lg text-[11px] font-bold cursor-pointer transition"
                          >
                            + {w}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Textarea Area */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-[11px] font-mono font-black uppercase text-[#560e51]">
                        Your Dream Home Paragraph (40–60 words):
                      </label>
                      <span className="text-xs font-mono font-bold text-slate-600">
                        {currentWordCount < 15 && <span className="text-amber-700">🌱 Keep going! Add materials</span>}
                        {currentWordCount >= 15 && currentWordCount < 35 && <span className="text-blue-700">🌿 Good progress! Add "to + verb"</span>}
                        {currentWordCount >= 35 && currentWordCount <= 65 && <span className="text-emerald-700">🎉 Perfect length for Grade 4!</span>}
                        {currentWordCount > 65 && <span className="text-purple-700">⭐ Detailed paragraph!</span>}
                      </span>
                    </div>

                    <textarea 
                      rows={6}
                      value={essayText}
                      onChange={(e) => setEssayText(e.target.value)}
                      placeholder="Write your dream home paragraph here..."
                      className="w-full p-3.5 border-2 border-[#560e51] rounded-xl text-xs sm:text-sm font-bold bg-white text-slate-950 focus:outline-none leading-relaxed shadow-inner"
                    ></textarea>
                  </div>

                  {/* Submit Essay Action */}
                  <button
                    onClick={() => {
                      selectAnswer(currentQuestion.options?.[0] || 'Dream Home Paragraph: Completed with all 5 planning requirements');
                      sound.playCorrect();
                    }}
                    className="w-full py-3.5 bg-[#78c222] hover:bg-[#68ab1c] border-2 border-[#560e51] text-[#560e51] font-black rounded-xl text-xs sm:text-sm shadow-[3px_3px_0px_0px_#560e51] cursor-pointer uppercase flex items-center justify-center gap-2 transition active:translate-y-[1px]"
                  >
                    <CheckCircle2 className="h-4 w-4" /> Save & Submit Essay Report ({currentWordCount} words) 📝
                  </button>
                </div>
              ) : currentQuestion.part === 2 ? (
                /* PART 2: VOCABULARY & ADJECTIVES MATCHING (ORIGINAL TEST FORMAT) */
                <div className="space-y-5">
                  {/* Test Row Card: Highlighted Adjective & Letter Input beside it */}
                  <div className="p-4 sm:p-5 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border-3 border-[#560e51] rounded-2xl shadow-[4px_4px_0px_0px_#560e51]">
                    <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b-2 border-amber-200">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-black uppercase text-[#560e51] tracking-wider">
                          Original Test Format
                        </span>
                        <span className="text-[10px] font-mono font-black text-[#560e51] bg-yellow-200 px-2 py-0.5 rounded border border-[#560e51]">
                          Item {currentQuestion.number - 5} of 10
                        </span>
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-700">
                        Type letter <strong>(A–K)</strong> beside the word
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2">
                      {/* Highlighted Adjective Display */}
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-mono font-black text-[#560e51]">
                          {currentQuestion.number - 5}.
                        </span>
                        <div className="relative">
                          <span className="absolute -top-3 left-3 px-2 py-0.5 bg-[#560e51] text-yellow-300 text-[10px] font-mono font-black rounded-md uppercase tracking-wider shadow-sm z-10">
                            ADJECTIVE
                          </span>
                          <div className="px-5 py-3 bg-gradient-to-r from-yellow-300 via-amber-300 to-yellow-200 border-3 border-[#560e51] rounded-2xl shadow-[3px_3px_0px_0px_#560e51] flex items-center gap-2.5">
                            <Sparkles className="h-5 w-5 text-[#560e51]" />
                            <span className="font-black text-2xl sm:text-3xl text-[#560e51] tracking-tight">
                              {currentQuestion.adjective || currentQuestion.question.replace(/Match \d+\.\s*/, '').replace(/\s+to its definition:.*/, '')}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Letter Input Box Beside the Word */}
                      <div className="flex items-center gap-3 self-end sm:self-center">
                        <div className="flex flex-col items-end">
                          <label htmlFor="part2-main-letter-input" className="text-xs font-mono font-black uppercase text-[#560e51]">
                            Type Choice:
                          </label>
                          <span className="text-[10px] font-mono font-bold text-slate-500">Letter [A–K]</span>
                        </div>
                        <input
                          id="part2-main-letter-input"
                          type="text"
                          maxLength={1}
                          autoFocus
                          disabled={examMode === 'practice' && submitted}
                          value={(textAnswers[currentQuestion.number] || (typeof selectedAnswers[currentQuestion.number] === 'string' ? (selectedAnswers[currentQuestion.number] as string).charAt(0) : '') || '').toUpperCase()}
                          onChange={(e) => handlePart2LetterInput(e.target.value)}
                          placeholder="—"
                          className={`w-16 h-16 sm:w-20 sm:h-20 text-center uppercase font-mono font-black text-3xl sm:text-4xl border-3 border-[#560e51] rounded-2xl shadow-[3px_3px_0px_0px_#560e51] transition-all focus:outline-none focus:ring-4 focus:ring-yellow-400 ${
                            submitted && examMode === 'practice'
                              ? (textAnswers[currentQuestion.number] || '').toUpperCase() === (currentQuestion.matchLetter || '').toUpperCase()
                                ? 'bg-[#78c222] text-[#560e51]'
                                : 'bg-rose-200 text-[#560e51]'
                              : 'bg-white text-[#560e51] focus:bg-yellow-100'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Active Definition Preview */}
                    {(() => {
                      const currentTyped = (textAnswers[currentQuestion.number] || (typeof selectedAnswers[currentQuestion.number] === 'string' ? (selectedAnswers[currentQuestion.number] as string).charAt(0) : '') || '').toUpperCase();
                      const matched = activeDefinitions.find(d => d.letter === currentTyped);
                      if (!matched) return null;
                      return (
                        <div className="mt-3 p-3 bg-white border-2 border-[#560e51] rounded-xl flex items-center gap-2.5 shadow-[2px_2px_0px_0px_#560e51] animate-fade-in">
                          <span className="w-7 h-7 rounded-lg bg-[#78c222] text-[#560e51] border border-[#560e51] flex items-center justify-center font-mono font-black text-sm shrink-0">
                            {matched.letter}
                          </span>
                          <div className="text-xs sm:text-sm font-bold text-slate-800">
                            <span className="text-slate-500 font-mono text-xs mr-1.5">Definition:</span>
                            {matched.text}
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Quick Letter Selection Pills (A-K) */}
                  <div className="p-3.5 bg-white border-2 border-[#560e51] rounded-2xl shadow-[2px_2px_0px_0px_#560e51]">
                    <div className="flex items-center justify-between mb-2 flex-wrap gap-1">
                      <span className="text-xs font-mono font-black uppercase text-slate-700">
                        Quick Tap or Type Any Letter (A–K):
                      </span>
                      {submitted && examMode === 'practice' && (
                        <span className="text-xs font-mono font-black text-[#560e51] bg-[#78c222]/30 px-2 py-0.5 rounded border border-[#560e51]">
                          Correct: [{currentQuestion.matchLetter}]
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'].map(letter => {
                        const currentTyped = (textAnswers[currentQuestion.number] || (typeof selectedAnswers[currentQuestion.number] === 'string' ? (selectedAnswers[currentQuestion.number] as string).charAt(0) : '') || '').toUpperCase();
                        const isTyped = currentTyped === letter;
                        const isCorrectLetter = letter === (currentQuestion.matchLetter || '').toUpperCase();
                        
                        let btnStyle = 'bg-white hover:bg-yellow-100 border-[#560e51] text-[#560e51] shadow-[1px_1px_0px_0px_#560e51]';
                        if (submitted && examMode === 'practice') {
                          if (isCorrectLetter) {
                            btnStyle = 'bg-[#78c222] border-[#560e51] text-[#560e51] font-black shadow-[2px_2px_0px_0px_#560e51]';
                          } else if (isTyped) {
                            btnStyle = 'bg-rose-300 border-[#560e51] text-[#560e51] font-black';
                          } else {
                            btnStyle = 'bg-slate-100 border-slate-300 text-slate-400 opacity-60';
                          }
                        } else if (isTyped) {
                          btnStyle = 'bg-[#78c222] border-[#560e51] text-[#560e51] font-black shadow-[2px_2px_0px_0px_#560e51] scale-105';
                        }

                        return (
                          <button
                            key={letter}
                            type="button"
                            disabled={examMode === 'practice' && submitted}
                            onClick={() => handlePart2LetterInput(letter)}
                            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl border-2 font-mono font-black text-sm flex items-center justify-center cursor-pointer transition-all active:translate-y-[1px] ${btnStyle}`}
                          >
                            {letter}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Options List for this Question */}
                  <div className="space-y-2.5">
                    <span className="text-xs font-mono font-black uppercase text-slate-700 block">
                      Definition Choices for "{currentQuestion.adjective}":
                    </span>
                    <div className="grid grid-cols-1 gap-2.5">
                      {(currentQuestion.options || []).map((option, idx) => {
                        const optionLetter = option.charAt(0).toUpperCase();
                        const currentTyped = (textAnswers[currentQuestion.number] || (typeof selectedAnswers[currentQuestion.number] === 'string' ? (selectedAnswers[currentQuestion.number] as string).charAt(0) : '') || '').toUpperCase();
                        const isSelected = currentTyped === optionLetter;
                        const isCorrect = optionLetter === (currentQuestion.matchLetter || '').toUpperCase();

                        let cardClass = 'bg-white hover:bg-yellow-50/70 border-[#560e51] text-slate-900 shadow-[2px_2px_0px_0px_#560e51]';
                        if (submitted && examMode === 'practice') {
                          if (isCorrect) {
                            cardClass = 'bg-[#78c222] border-[#560e51] text-[#560e51] font-black shadow-[3px_3px_0px_0px_#560e51]';
                          } else if (isSelected) {
                            cardClass = 'bg-rose-200 border-[#560e51] text-slate-950 font-black';
                          } else {
                            cardClass = 'bg-white border-slate-200 text-slate-400 opacity-50';
                          }
                        } else if (isSelected) {
                          cardClass = 'bg-yellow-200 border-[#560e51] text-[#560e51] font-black shadow-[3px_3px_0px_0px_#560e51]';
                        }

                        return (
                          <button
                            key={idx}
                            type="button"
                            disabled={examMode === 'practice' && submitted}
                            onClick={() => handlePart2LetterInput(optionLetter)}
                            className={`w-full text-left p-3 sm:p-3.5 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${cardClass}`}
                          >
                            <div className="flex items-center gap-3">
                              <span className={`w-7 h-7 rounded-lg border-2 border-[#560e51] flex items-center justify-center font-mono font-black text-xs shrink-0 shadow-[1px_1px_0px_0px_#560e51] ${
                                isSelected ? 'bg-white text-[#560e51]' : 'bg-[#fdf2fe] text-[#560e51]'
                              }`}>
                                {optionLetter}
                              </span>
                              <span className="text-xs sm:text-sm font-bold leading-snug">
                                {option.replace(/^[A-Z]\.\s*/, '')}
                              </span>
                            </div>
                            {isSelected && (
                              <span className="text-[11px] font-mono font-black bg-[#560e51] text-white px-2 py-0.5 rounded uppercase shrink-0">
                                Selected
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : currentQuestion.options ? (
                <div className="flex flex-col gap-3">
                  {currentQuestion.options.map((option, idx) => {
                    const isSelected = selectedAnswers[currentQuestion.number] === option;
                    const isCorrect = String(option).toLowerCase() === String(currentQuestion.correctAnswer).toLowerCase();
                    
                    let bgClass = 'bg-white hover:bg-fuchsia-50 border-[#560e51] text-slate-950 shadow-[3px_3px_0px_0px_#560e51]';
                    if (submitted) {
                      if (isCorrect) {
                        bgClass = 'bg-[#78c222] border-[#560e51] text-[#560e51] font-black shadow-[3px_3px_0px_0px_#560e51]';
                      } else if (isSelected) {
                        bgClass = 'bg-rose-300 border-[#560e51] text-slate-950 font-black shadow-[3px_3px_0px_0px_#560e51]';
                      } else {
                        bgClass = 'bg-white border-slate-200 text-slate-400 opacity-50 shadow-none';
                      }
                    } else if (isSelected) {
                      bgClass = 'bg-[#78c222] border-[#560e51] text-[#560e51] font-black shadow-[3px_3px_0px_0px_#560e51]';
                    }

                    return (
                      <button
                        key={idx}
                        id={`btn-sat-opt-${idx}`}
                        disabled={examMode === 'practice' && submitted}
                        onClick={() => selectAnswer(option)}
                        className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border-3 text-xs sm:text-sm md:text-base font-black transition-all cursor-pointer flex items-center justify-between ${bgClass} active:translate-y-[1px]`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`inline-block border-2 border-[#560e51] text-xs px-2 py-0.5 rounded-lg font-mono font-black ${isSelected ? 'bg-white text-[#560e51]' : 'bg-[#fdf2fe] text-[#9b2c98]'}`}>
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span className="tracking-normal pr-2 leading-relaxed">{option}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : null}

              {/* Practice Mode Clues & Rules */}
              {examMode === 'practice' && submitted && (
                <div className="mt-5 p-4 bg-[#fdf2fe] border-3 border-[#560e51] rounded-2xl animate-fade-in shadow-[3px_3px_0px_0px_#560e51]">
                  <span className="text-xs uppercase font-black text-[#560e51] flex items-center gap-1.5 font-mono">
                    <Check className="h-4 w-4 text-[#9b2c98]" /> EXPLANATION & CURRICULUM CLUE:
                  </span>
                  <p className="text-xs sm:text-sm text-slate-900 font-bold leading-relaxed mt-1">
                    {currentQuestion.explanation}
                    <br />
                    <span className="text-[#560e51] font-black bg-white inline-block px-2 py-0.5 border-2 border-[#560e51] rounded-lg mt-2 text-[11px] font-mono">
                      💡 EXAM TIP: {currentQuestion.hint}
                    </span>
                  </p>
                </div>
              )}
            </div>

            {/* Navigation block with fast number togglers & jumpers */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t-2 border-fuchsia-200 mt-6">
              <div className="flex items-center gap-2">
                <button
                  id="btn-sat-prev"
                  onClick={handlePrev}
                  disabled={currentQuestionIndex === 0}
                  className="flex items-center gap-1.5 px-4 py-2.5 border-2 border-[#560e51] bg-white hover:bg-fuchsia-50 text-[#560e51] text-xs font-black rounded-xl disabled:opacity-30 cursor-pointer shadow-[2px_2px_0px_0px_#560e51]"
                >
                  <ChevronLeft className="h-4 w-4" /> Prev
                </button>

                {currentQuestionIndex > 0 && (
                  <button
                    type="button"
                    onClick={() => jumpToQuestion(currentQuestionIndex - 1)}
                    className="px-2.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono font-bold rounded-lg border border-slate-300 hidden md:inline-block cursor-pointer"
                    title="Jump to previous question"
                  >
                    Q{activeQuestions[currentQuestionIndex - 1]?.number}
                  </button>
                )}
              </div>

              {/* Fast Jump Select Dropdown in Footer */}
              <div className="flex items-center gap-2 justify-center flex-wrap">
                <span className="text-xs font-mono font-black text-slate-500 hidden sm:inline">Go to:</span>
                <select
                  value={currentQuestionIndex}
                  onChange={(e) => jumpToQuestion(Number(e.target.value))}
                  className="text-xs font-mono font-black border-2 border-[#560e51] bg-[#fdf2fe] text-[#560e51] rounded-xl py-2 px-3 cursor-pointer shadow-[2px_2px_0px_0px_#560e51]"
                  aria-label="Bottom jumper select"
                >
                  {activeQuestions.map((q, idx) => (
                    <option key={q.id} value={idx}>
                      Q{q.number}: Part {q.part} {isQuestionAnswered(q.number, q.part) ? '✓ (Done)' : '—'}
                    </option>
                  ))}
                </select>

                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((pNum) => (
                    <button
                      key={pNum}
                      type="button"
                      onClick={() => jumpToQuestion(getPartStartIndex(pNum))}
                      className={`px-2 py-1 text-[11px] font-mono font-black rounded-lg border cursor-pointer ${
                        currentQuestion.part === pNum
                          ? 'bg-[#560e51] text-yellow-300 border-[#560e51]'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-fuchsia-50'
                      }`}
                      title={`Jump to Part ${pNum}`}
                    >
                      P{pNum}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 justify-end">
                {currentQuestionIndex < totalQuestions - 1 && (
                  <button
                    type="button"
                    onClick={() => jumpToQuestion(currentQuestionIndex + 1)}
                    className="px-2.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono font-bold rounded-lg border border-slate-300 hidden md:inline-block cursor-pointer"
                    title="Jump to next question"
                  >
                    Q{activeQuestions[currentQuestionIndex + 1]?.number}
                  </button>
                )}

                {examMode === 'exam' && currentQuestionIndex === totalQuestions - 1 ? (
                  <button
                    id="btn-sat-submit-exam"
                    onClick={() => {
                      const unansweredCount = totalQuestions - answeredCount;
                      if (unansweredCount > 0) {
                        if (confirm(`You have ${unansweredCount} unanswered questions! Hand in exam anyway?`)) {
                          finishExam();
                        }
                      } else if (confirm('Ready to turn in your Unit 3 Summative Assessment?')) {
                        finishExam();
                      }
                    }}
                    className="px-6 py-2.5 bg-[#78c222] hover:bg-[#68ab1c] border-2 border-[#560e51] text-[#560e51] font-black rounded-xl text-xs sm:text-sm shadow-[2px_2px_0px_0px_#560e51] cursor-pointer uppercase"
                  >
                    Turn In Assessment 📝
                  </button>
                ) : (
                  <button
                    id="btn-sat-next"
                    onClick={handleNext}
                    disabled={currentQuestionIndex === totalQuestions - 1}
                    className="flex items-center gap-1.5 px-5 py-2.5 bg-[#560e51] hover:bg-[#43093f] text-white text-xs sm:text-sm font-black rounded-xl disabled:opacity-30 cursor-pointer shadow-[2px_2px_0px_0px_#560e51]"
                  >
                    Next <ChevronRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

          </div>

        </div>
        </div>
      )}

      {/* COMPREHENSIVE REPORT CARD (50 MARKS TOTAL) */}
      {examMode !== null && examFinished && (
        <div className="bg-white text-slate-900 rounded-[32px] p-8 max-w-2xl mx-auto border-4 border-[#560e51] shadow-[8px_8px_0px_0px_#560e51] text-center">
          
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <span className="text-xs uppercase font-black tracking-widest text-[#560e51] font-mono bg-[#fdf2fe] border-2 border-[#560e51] p-1.5 px-4 rounded-full">
              Mock Assessment Results (50 Marks)
            </span>
            <span className="text-xs uppercase font-black tracking-widest text-[#560e51] font-mono bg-yellow-200 border-2 border-[#560e51] p-1.5 px-3 rounded-full">
              Paper Form {paperSet}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black mt-4 uppercase text-[#560e51]">
            Summative Assessment Performance Report
          </h2>
          
          <div className="my-6 py-5 rounded-3xl bg-[#fdf2fe] border-3 border-[#560e51] inline-block px-10 shadow-[4px_4px_0px_0px_#560e51]">
            <p className="text-xs font-black text-[#9b2c98] uppercase tracking-widest font-mono">Grade Awarded</p>
            <h3 className={`text-5xl md:text-6xl font-black font-sans my-2 leading-none ${getReportGrade(calcTotalMarks()).color}`}>
              {getReportGrade(calcTotalMarks()).letter}
            </h3>
            <p className="text-sm font-black text-[#560e51] tracking-wide font-mono mt-1 uppercase">
              SCORE: {calcTotalMarks()} / 50 Marks
            </p>
            <p className="text-xs font-mono font-black text-[#9b2c98] tracking-wide mt-1">
              ({Math.round((calcTotalMarks() / 50) * 100)}% overall mastery)
            </p>
          </div>

          <div className="bg-[#fefaf0] border-2 border-[#560e51] p-4 rounded-2xl text-xs sm:text-sm text-slate-900 max-w-md mx-auto leading-relaxed font-bold">
            Teacher note: "{getReportGrade(calcTotalMarks()).note}"
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              id="btn-result-review"
              onClick={() => {
                setExamMode('practice');
                setCurrentQuestionIndex(0);
                setSubmitted(true);
                setExamFinished(false);
                sound.playClick();
              }}
              className="px-6 py-3 bg-white border-2 border-[#560e51] hover:bg-fuchsia-50 text-[#560e51] font-black rounded-xl text-xs cursor-pointer shadow-[2px_2px_0px_0px_#560e51]"
            >
              Review Questions & Rules
            </button>

            <button
              id="btn-exam-reset"
              onClick={() => {
                setExamMode(null);
                sound.playClick();
              }}
              className="px-6 py-3 bg-[#78c222] hover:bg-[#68ab1c] border-2 border-[#560e51] text-[#560e51] font-black rounded-xl text-xs shadow-[2px_2px_0px_0px_#560e51] cursor-pointer"
            >
              Return to Assessment Menu
            </button>
          </div>

        </div>
      )}

    </div>
  );
}

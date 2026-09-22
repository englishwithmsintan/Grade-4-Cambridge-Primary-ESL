import React, { useState } from 'react';
import { sound } from './SoundManager';
import { Award, CheckCircle, AlertTriangle, RefreshCw, Sparkles, BookOpen, HelpCircle, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GrammarPracticeProps {
  progress: { grammarAccuracy: { [key: string]: number } };
  onUpdateAccuracy: (category: string, accuracy: number) => void;
  isTeacherMode: boolean;
  genAlphaMode?: boolean;
}

export default function GrammarPractice({
  progress,
  onUpdateAccuracy,
  isTeacherMode,
  genAlphaMode = false
}: GrammarPracticeProps) {
  const [activeSubTab, setActiveSubTab] = useState<'infinitives' | 'modals' | 'yesNoQuestions' | 'factOpinion'>('infinitives');

  // --- 1. INFINITIVES OF PURPOSE ("to + verb") ---
  const infinitiveQuestions = [
    {
      action: 'He used local materials',
      context: '(build) the walls of the eco-house.',
      verb: 'build',
      options: ['to build', 'building', 'built', 'to builds'],
      correct: 'to build',
      rule: 'Infinitive of purpose = to + base verb (explains WHY he used local materials).'
    },
    {
      action: 'There are big windows',
      context: '(let) in lots of natural light.',
      verb: 'let',
      options: ['to let', 'letting', 'to letting', 'for let'],
      correct: 'to let',
      rule: 'Use "to let" to explain the purpose of installing big windows.'
    },
    {
      action: 'There are solar panels on the roof',
      context: '(provide) clean energy for the lights.',
      verb: 'provide',
      options: ['to provide', 'providing', 'to provides', 'for provide'],
      correct: 'to provide',
      rule: 'Infinitive of purpose: "to provide" electricity and power.'
    },
    {
      action: 'Grass grows on the roof',
      context: '(keep) the house warm in winter.',
      verb: 'keep',
      options: ['to keep', 'keeping', 'to kept', 'for keep'],
      correct: 'to keep',
      rule: '"to keep" explains the insulation purpose of the living roof.'
    },
    {
      action: 'He put a large tub outside',
      context: '(collect) rainwater for his garden.',
      verb: 'collect',
      options: ['to collect', 'collecting', 'to collects', 'for collecting'],
      correct: 'to collect',
      rule: 'Action: put a tub outside &rarr; Purpose: to collect rainwater.'
    },
    {
      action: 'Always turn off lights when leaving',
      context: '(save) electrical power.',
      verb: 'save',
      options: ['to save', 'saving', 'to saves', 'for save'],
      correct: 'to save',
      rule: 'Purpose of turning off lights: "to save" electricity.'
    }
  ];
  const [infIdx, setInfIdx] = useState(0);
  const [infSelected, setInfSelected] = useState<string | null>(null);
  const [infScore, setInfScore] = useState(0);
  const [infCount, setInfCount] = useState(0);

  // --- 2. MODAL VERBS OF POSSIBILITY (can't, might, could, must) ---
  const modalQuestions = [
    {
      sentence: 'I am not sure what that strange building is. It ____________ be a museum.',
      options: ['might', 'must', 'can’t'],
      correct: 'might',
      certainty: '50% (Uncertain possibility)',
      rule: 'When we are not sure or guessing, we use "might" or "could".'
    },
    {
      sentence: 'Nobody lives in that building, so it ____________ be a family home.',
      options: ['can’t', 'must', 'could'],
      correct: 'can’t',
      certainty: '0% (Impossible)',
      rule: 'If nobody lives there, it is impossible (0%), so we say "it can’t be".'
    },
    {
      sentence: 'There are thousands of books on shelves inside, so it ____________ be a library!',
      options: ['must', 'might', 'can’t'],
      correct: 'must',
      certainty: '100% (Certainty based on strong proof)',
      rule: 'With clear physical evidence (thousands of books), we are sure: "it must be".'
    },
    {
      sentence: 'The shoe building is much too small, so it ____________ be a supermarket.',
      options: ['can’t', 'might', 'must'],
      correct: 'can’t',
      certainty: '0% (Impossible)',
      rule: 'A tiny shoe house cannot possibly contain supermarket aisles.'
    },
    {
      sentence: 'Look! Sarah is waving at us through the window. She ____________ be inside!',
      options: ['must', 'can’t', 'might not'],
      correct: 'must',
      certainty: '100% (Certainty)',
      rule: 'Seeing her wave proves 100% that she is inside.'
    },
    {
      sentence: 'Complete the guessing question: ____________ it be an ancient school?',
      options: ['Could', 'Does', 'Is', 'Have'],
      correct: 'Could',
      certainty: 'Modal question of possibility',
      rule: 'We use modal auxiliary "Could" to ask about possibilities ("Could it be...?").'
    }
  ];
  const [modIdx, setModIdx] = useState(0);
  const [modSelected, setModSelected] = useState<string | null>(null);
  const [modScore, setModScore] = useState(0);
  const [modCount, setModCount] = useState(0);

  // --- 3. YES/NO QUESTIONS WITH AUXILIARY VERBS & RISING INTONATION (↑) ---
  const questionExercises = [
    {
      prompt: 'Ask if the strange building is made from recycled books:',
      target: 'Is it made from books? ↑',
      options: ['Is it made from books? ↑', 'Does it made from books? ↑', 'Have it made from books? ↑'],
      correct: 'Is it made from books? ↑',
      rule: 'Passive/state uses auxiliary verb "be": Is it made...?'
    },
    {
      prompt: 'Ask if the building looks like an upside-down house:',
      target: 'Does it look like an upside-down house? ↑',
      options: ['Does it look like an upside-down house? ↑', 'Is it look like an upside-down house? ↑', 'Has it look like an upside-down house? ↑'],
      correct: 'Does it look like an upside-down house? ↑',
      rule: 'Present simple with action verb "look" uses auxiliary "Does it look...?"'
    },
    {
      prompt: 'Ask if there are solar panels on the roof:',
      target: 'Are there solar panels on the roof? ↑',
      options: ['Are there solar panels on the roof? ↑', 'Do there solar panels on the roof? ↑', 'Is there solar panels on the roof? ↑'],
      correct: 'Are there solar panels on the roof? ↑',
      rule: 'Plural subject "solar panels" takes auxiliary "Are there...?"'
    },
    {
      prompt: 'Notice rising intonation in spoken English:',
      target: 'Yes/No questions rise in pitch at the end: Is it colourful? ↑',
      options: ['Voice goes UP at the end (Rising intonation ↑)', 'Voice drops flat like a statement', 'Voice stays completely silent'],
      correct: 'Voice goes UP at the end (Rising intonation ↑)',
      rule: 'In English, Yes/No questions always end with a rising intonation arrow (↑).'
    }
  ];
  const [qIdx, setQIdx] = useState(0);
  const [qSelected, setQSelected] = useState<string | null>(null);
  const [qScore, setQScore] = useState(0);
  const [qCount, setQCount] = useState(0);

  // --- 4. FACT VS OPINION DETECTIVE ---
  const factOpinionItems = [
    {
      text: 'The Colosseum was built almost 2,000 years ago from stone, brick and sand.',
      type: 'FACT',
      reason: 'This can be proven by historical dates, archaeological records, and physical evidence.'
    },
    {
      text: 'In my opinion, the Colosseum is the most spectacular building in Rome.',
      type: 'OPINION',
      reason: 'It begins with "In my opinion" and uses an emotional adjective "most spectacular".'
    },
    {
      text: 'More than six million visitors come every year to see the Colosseum.',
      type: 'FACT',
      reason: 'Recorded ticket sales provide measurable, verifiable numbers.'
    },
    {
      text: 'Standing inside the ancient ruins feels like travelling back in time.',
      type: 'OPINION',
      reason: 'A personal feeling that depends on individual imagination.'
    },
    {
      text: 'You can travel to the Colosseum by bus or by metro.',
      type: 'FACT',
      reason: 'Verifiable city public transit route and schedule.'
    },
    {
      text: 'A yurt is the coolest and prettiest home in the entire world.',
      type: 'OPINION',
      reason: 'Words like "coolest" and "prettiest" express subjective personal feelings.'
    }
  ];
  const [foIdx, setFoIdx] = useState(0);
  const [foSelected, setFoSelected] = useState<string | null>(null);
  const [foScore, setFoScore] = useState(0);
  const [foCount, setFoCount] = useState(0);

  const subTabs = [
    { id: 'infinitives', label: '1. Infinitives of Purpose ("to + verb") 🎯' },
    { id: 'modals', label: '2. Modals of Possibility (can\'t / might / must) 🔮' },
    { id: 'yesNoQuestions', label: '3. Yes/No Questions (↑) 🗣️' },
    { id: 'factOpinion', label: '4. Fact vs. Opinion Detective 🔍' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-4">
      
      {/* Intro section */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-black text-slate-950 flex items-center justify-center gap-2 uppercase tracking-tight">
          <span>⚙️</span> Unit 3 Grammar & Language Labs
        </h2>
        <p className="text-sm font-semibold text-slate-600 mt-1">
          Master Infinitives of Purpose ("to + verb"), Modal Verbs of Possibility, Yes/No Question Intonations, and Fact vs. Opinion!
        </p>
      </div>

      {/* Sub-Tab Selectors Header */}
      <div className="bg-white p-2 rounded-2xl grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row gap-2 mb-6 border-3 border-[#560e51] shadow-[4px_4px_0px_0px_#560e51]">
        {subTabs.map((tab) => {
          const isSelected = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveSubTab(tab.id as any);
                sound.playClick();
              }}
              className={`lg:flex-1 py-2.5 px-3 rounded-xl text-xs font-black uppercase tracking-tight transition-all text-center cursor-pointer ${
                isSelected 
                  ? 'bg-[#78c222] text-[#560e51] border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#560e51]' 
                  : 'text-[#560e51] hover:bg-fuchsia-50 border-2 border-transparent'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* --- SUBTAB CONTENT --- */}
      <AnimatePresence mode="wait">
        
        {/* TAB 1: INFINITIVES OF PURPOSE */}
        {activeSubTab === 'infinitives' && (
          <motion.div
            key="tab-infinitives"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-[28px] p-6 sm:p-8 border-4 border-[#560e51] shadow-[6px_6px_0px_0px_#560e51]"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-fuchsia-200 pb-3 mb-6 gap-2">
              <div>
                <span className="text-xs font-black text-[#9b2c98] uppercase tracking-widest font-mono">Lesson 3.2 & SAT Part 3A</span>
                <h3 className="text-xl font-black text-[#560e51] mt-0.5 uppercase tracking-tight">Infinitives of Purpose: to + verb</h3>
              </div>
              <div className="bg-[#78c222] border-2 border-[#560e51] rounded-xl px-3.5 py-1 font-mono text-xs font-black text-[#560e51] shadow-[2px_2px_0px_0px_#560e51]">
                <span>SCORE: {infScore} / {infCount}</span>
              </div>
            </div>

            {/* Grammar rule reminder pill */}
            <div className="mb-6 p-4 bg-fuchsia-50 border-2 border-[#560e51] rounded-2xl text-xs text-[#560e51] flex flex-col gap-1 shadow-[2px_2px_0px_0px_#560e51]">
              <span className="font-black uppercase tracking-wider block font-mono text-[10px] text-[#9b2c98]">GRAMMAR KEY:</span>
              <p className="font-semibold">
                We use <strong>to + base verb</strong> to explain <strong>WHY</strong> an action is done (Action &rarr; Purpose).<br />
                <em>Example:</em> "He put a large tub outside <strong>to collect</strong> rainwater." (Why? To collect water!)
              </p>
            </div>

            {infCount < infinitiveQuestions.length ? (
              <div>
                <div className="bg-[#fdf2fe] border-2 border-[#560e51] rounded-2xl p-6 sm:p-8 mb-6 min-h-40 flex flex-col justify-between items-center text-center shadow-[2px_2px_0px_0px_#560e51]">
                  <span className="p-1 px-3.5 bg-[#78c222] text-[#560e51] text-xs rounded-full font-black uppercase tracking-wider border-2 border-[#560e51]">
                    Question {infIdx + 1} of {infinitiveQuestions.length}
                  </span>
                  <div className="my-4">
                    <p className="text-lg sm:text-2xl font-black text-[#560e51] font-sans leading-relaxed">
                      "{infinitiveQuestions[infIdx].action} <span className="underline decoration-4 decoration-[#78c222] text-[#9b2c98]">______</span> {infinitiveQuestions[infIdx].context}"
                    </p>
                    <span className="inline-block mt-2 px-3 py-1 bg-white border border-[#560e51] rounded-lg text-xs font-bold text-slate-700">
                      Verb in brackets: ({infinitiveQuestions[infIdx].verb})
                    </span>
                  </div>
                  <p className="text-xs text-[#9b2c98] bg-white py-1 px-3 border border-fuchsia-300 rounded-xl font-bold font-mono">
                    💡 {infinitiveQuestions[infIdx].rule}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {infinitiveQuestions[infIdx].options.map((option) => {
                    const isCorrect = infinitiveQuestions[infIdx].correct === option;
                    const isSelected = infSelected === option;
                    return (
                      <button
                        key={option}
                        disabled={infSelected !== null}
                        onClick={() => {
                          setInfSelected(option);
                          setInfCount(s => s + 1);
                          if (isCorrect) {
                            setInfScore(s => s + 1);
                            sound.playCorrect();
                            onUpdateAccuracy('infinitives', Math.round(((infScore + 1) / infinitiveQuestions.length) * 100));
                          } else {
                            sound.playWrong();
                          }
                        }}
                        className={`p-5 rounded-2xl font-black cursor-pointer transition-all border-3 flex flex-col items-center gap-1 ${
                          isSelected && isCorrect
                            ? 'bg-[#78c222] border-[#560e51] text-[#560e51] shadow-[2px_2px_0px_0px_#560e51]'
                            : isSelected && !isCorrect
                            ? 'bg-rose-300 border-[#560e51] text-slate-950 shadow-[2px_2px_0px_0px_#560e51]'
                            : 'bg-white hover:bg-fuchsia-50 border-[#560e51] text-[#560e51] shadow-[3px_3px_0px_0px_#560e51] active:translate-y-[2px]'
                        }`}
                      >
                        <span className="text-xl uppercase tracking-wider font-black font-sans">{option}</span>
                      </button>
                    );
                  })}
                </div>

                {infSelected !== null && (
                  <div className="mt-6 text-center animate-fade-in flex flex-col items-center">
                    <p className="text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 mb-3">
                      {infSelected === infinitiveQuestions[infIdx].correct ? (
                        <span className="text-emerald-700 bg-emerald-100 border-2 border-emerald-500 px-3 py-1 rounded-xl shadow-[2px_2px_0px_0px_#560e51]">
                          🎉 Correct! "to + base verb" explains the exact purpose!
                        </span>
                      ) : (
                        <span className="text-rose-700 bg-rose-100 border-2 border-rose-500 px-3 py-1 rounded-xl shadow-[2px_2px_0px_0px_#560e51]">
                          ⚠️ Notice: Infinitive of purpose uses <strong>to + {infinitiveQuestions[infIdx].verb}</strong> &rarr; "{infinitiveQuestions[infIdx].correct}"
                        </span>
                      )}
                    </p>
                    <button
                      onClick={() => {
                        setInfSelected(null);
                        setInfIdx(s => s + 1);
                        sound.playClick();
                      }}
                      className="px-6 py-2.5 bg-[#78c222] hover:bg-[#68ab1c] border-2 border-[#560e51] text-[#560e51] font-black rounded-xl text-xs uppercase shadow-[2px_2px_0px_0px_#560e51] cursor-pointer"
                    >
                      Next Question &rarr;
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="inline-block p-4 rounded-2xl bg-[#78c222] text-[#560e51] border-3 border-[#560e51] shadow-[3px_3px_0px_0px_#560e51] mb-3 text-3xl">🏆</div>
                <h4 className="text-2xl font-black text-[#560e51] uppercase">Infinitive Lab Complete!</h4>
                <p className="text-slate-700 font-bold mt-1 text-sm">
                  You scored {infScore} out of {infinitiveQuestions.length} ({Math.round((infScore / infinitiveQuestions.length) * 100)}%)!
                </p>
                <button
                  onClick={() => {
                    setInfIdx(0);
                    setInfCount(0);
                    setInfScore(0);
                    setInfSelected(null);
                    sound.playClick();
                  }}
                  className="mt-4 px-6 py-2 bg-[#78c222] border-2 border-[#560e51] font-black rounded-xl text-xs uppercase cursor-pointer text-[#560e51] shadow-[2px_2px_0px_0px_#560e51]"
                >
                  <RefreshCw className="inline h-3.5 w-3.5 mr-1" /> Retry Lab
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* TAB 2: MODAL VERBS OF POSSIBILITY */}
        {activeSubTab === 'modals' && (
          <motion.div
            key="tab-modals"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-[28px] p-6 sm:p-8 border-4 border-[#560e51] shadow-[6px_6px_0px_0px_#560e51]"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-fuchsia-200 pb-3 mb-6 gap-2">
              <div>
                <span className="text-xs font-black text-[#9b2c98] uppercase tracking-widest font-mono">Lesson 3.3 & SAT Part 3B</span>
                <h3 className="text-xl font-black text-[#560e51] mt-0.5 uppercase tracking-tight">Modal Verbs of Possibility (Certainty Meter)</h3>
              </div>
              <div className="bg-[#78c222] border-2 border-[#560e51] rounded-xl px-3.5 py-1 font-mono text-xs font-black text-[#560e51] shadow-[2px_2px_0px_0px_#560e51]">
                <span>SCORE: {modScore} / {modCount}</span>
              </div>
            </div>

            {/* Certainty Meter Graphic */}
            <div className="mb-6 p-4 bg-indigo-50 border-2 border-[#560e51] rounded-2xl text-xs text-[#560e51] shadow-[2px_2px_0px_0px_#560e51]">
              <span className="font-black uppercase tracking-wider block font-mono text-[10px] text-indigo-900 mb-2">POSSIBILITY SCALE (0% to 100%):</span>
              <div className="grid grid-cols-3 gap-2 text-center font-bold">
                <div className="bg-rose-100 border border-rose-300 p-2 rounded-xl">
                  <span className="block font-black text-rose-800 text-sm">can't</span>
                  <span className="text-[10px] text-rose-700">0% Impossible / Sure it is NOT true</span>
                </div>
                <div className="bg-amber-100 border border-amber-300 p-2 rounded-xl">
                  <span className="block font-black text-amber-800 text-sm">might / could</span>
                  <span className="text-[10px] text-amber-700">~50% Maybe / Guessing</span>
                </div>
                <div className="bg-emerald-100 border border-emerald-300 p-2 rounded-xl">
                  <span className="block font-black text-emerald-800 text-sm">must</span>
                  <span className="text-[10px] text-emerald-700">100% Certain / Clear Evidence</span>
                </div>
              </div>
            </div>

            {modCount < modalQuestions.length ? (
              <div>
                <div className="bg-[#fdf2fe] border-2 border-[#560e51] rounded-2xl p-6 sm:p-8 mb-6 min-h-40 flex flex-col justify-between items-center text-center shadow-[2px_2px_0px_0px_#560e51]">
                  <span className="p-1 px-3.5 bg-[#78c222] text-[#560e51] text-xs rounded-full font-black uppercase tracking-wider border-2 border-[#560e51]">
                    Question {modIdx + 1} of {modalQuestions.length}
                  </span>
                  <p className="text-lg sm:text-2xl font-black text-[#560e51] max-w-2xl font-sans mt-3 leading-relaxed">
                    "{modalQuestions[modIdx].sentence}"
                  </p>
                  <p className="text-xs text-[#9b2c98] bg-white py-1 px-3 border border-fuchsia-300 rounded-xl font-bold mt-4 font-mono">
                    💡 Target Certainty: {modalQuestions[modIdx].certainty}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {modalQuestions[modIdx].options.map((option) => {
                    const isCorrect = modalQuestions[modIdx].correct === option;
                    const isSelected = modSelected === option;
                    return (
                      <button
                        key={option}
                        disabled={modSelected !== null}
                        onClick={() => {
                          setModSelected(option);
                          setModCount(s => s + 1);
                          if (isCorrect) {
                            setModScore(s => s + 1);
                            sound.playCorrect();
                            onUpdateAccuracy('modals', Math.round(((modScore + 1) / modalQuestions.length) * 100));
                          } else {
                            sound.playWrong();
                          }
                        }}
                        className={`p-5 rounded-2xl font-black cursor-pointer transition-all border-3 flex flex-col items-center gap-1 ${
                          isSelected && isCorrect
                            ? 'bg-[#78c222] border-[#560e51] text-[#560e51] shadow-[2px_2px_0px_0px_#560e51]'
                            : isSelected && !isCorrect
                            ? 'bg-rose-300 border-[#560e51] text-slate-950 shadow-[2px_2px_0px_0px_#560e51]'
                            : 'bg-white hover:bg-fuchsia-50 border-[#560e51] text-[#560e51] shadow-[3px_3px_0px_0px_#560e51] active:translate-y-[2px]'
                        }`}
                      >
                        <span className="text-xl uppercase tracking-wider font-black font-sans">{option}</span>
                      </button>
                    );
                  })}
                </div>

                {modSelected !== null && (
                  <div className="mt-6 text-center animate-fade-in flex flex-col items-center">
                    <p className="text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 mb-3">
                      {modSelected === modalQuestions[modIdx].correct ? (
                        <span className="text-emerald-700 bg-emerald-100 border-2 border-emerald-500 px-3 py-1 rounded-xl shadow-[2px_2px_0px_0px_#560e51]">
                          🎉 Correct! {modalQuestions[modIdx].rule}
                        </span>
                      ) : (
                        <span className="text-rose-700 bg-rose-100 border-2 border-rose-500 px-3 py-1 rounded-xl shadow-[2px_2px_0px_0px_#560e51]">
                          ⚠️ {modalQuestions[modIdx].rule} &rarr; correct: <strong>{modalQuestions[modIdx].correct}</strong>
                        </span>
                      )}
                    </p>
                    <button
                      onClick={() => {
                        setModSelected(null);
                        setModIdx(s => s + 1);
                        sound.playClick();
                      }}
                      className="px-6 py-2.5 bg-[#78c222] hover:bg-[#68ab1c] border-2 border-[#560e51] text-[#560e51] font-black rounded-xl text-xs uppercase shadow-[2px_2px_0px_0px_#560e51] cursor-pointer"
                    >
                      Next Question &rarr;
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="inline-block p-4 rounded-2xl bg-[#78c222] text-[#560e51] border-3 border-[#560e51] shadow-[3px_3px_0px_0px_#560e51] mb-3 text-3xl">🏆</div>
                <h4 className="text-2xl font-black text-[#560e51] uppercase">Modals Lab Mastered!</h4>
                <p className="text-slate-700 font-bold mt-1 text-sm">
                  You scored {modScore} out of {modalQuestions.length}!
                </p>
                <button
                  onClick={() => {
                    setModIdx(0);
                    setModCount(0);
                    setModScore(0);
                    setModSelected(null);
                    sound.playClick();
                  }}
                  className="mt-4 px-6 py-2 bg-[#78c222] border-2 border-[#560e51] font-black rounded-xl text-xs uppercase cursor-pointer text-[#560e51] shadow-[2px_2px_0px_0px_#560e51]"
                >
                  <RefreshCw className="inline h-3.5 w-3.5 mr-1" /> Retry Lab
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* TAB 3: YES/NO QUESTIONS & RISING INTONATION */}
        {activeSubTab === 'yesNoQuestions' && (
          <motion.div
            key="tab-questions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-[28px] p-6 sm:p-8 border-4 border-[#560e51] shadow-[6px_6px_0px_0px_#560e51]"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-fuchsia-200 pb-3 mb-6 gap-2">
              <div>
                <span className="text-xs font-black text-[#9b2c98] uppercase tracking-widest font-mono">Lesson 3.3 Grammar & Speaking</span>
                <h3 className="text-xl font-black text-[#560e51] mt-0.5 uppercase tracking-tight">Yes/No Questions & Rising Intonation (↑)</h3>
              </div>
              <div className="bg-[#78c222] border-2 border-[#560e51] rounded-xl px-3.5 py-1 font-mono text-xs font-black text-[#560e51] shadow-[2px_2px_0px_0px_#560e51]">
                <span>SCORE: {qScore} / {qCount}</span>
              </div>
            </div>

            <div className="mb-6 p-4 bg-emerald-50 border-2 border-[#560e51] rounded-2xl text-xs text-[#560e51] shadow-[2px_2px_0px_0px_#560e51]">
              <span className="font-black uppercase tracking-wider block font-mono text-[10px] text-emerald-900 mb-1">AUXILIARY VERBS + RISING TONE:</span>
              <p className="font-semibold">
                Yes/No questions start with auxiliary verbs (<strong>Is/Are</strong>, <strong>Do/Does</strong>, <strong>Have/Has</strong>, <strong>Could</strong>). In spoken English, your pitch goes <strong>UP at the end (↑)</strong>!
              </p>
            </div>

            {qCount < questionExercises.length ? (
              <div>
                <div className="bg-[#fdf2fe] border-2 border-[#560e51] rounded-2xl p-6 sm:p-8 mb-6 min-h-40 flex flex-col justify-between items-center text-center shadow-[2px_2px_0px_0px_#560e51]">
                  <span className="p-1 px-3.5 bg-[#78c222] text-[#560e51] text-xs rounded-full font-black uppercase tracking-wider border-2 border-[#560e51]">
                    Question {qIdx + 1} of {questionExercises.length}
                  </span>
                  <p className="text-lg sm:text-2xl font-black text-[#560e51] max-w-2xl font-sans mt-3 leading-relaxed">
                    {questionExercises[qIdx].prompt}
                  </p>
                  <p className="text-xs text-[#9b2c98] bg-white py-1 px-3 border border-fuchsia-300 rounded-xl font-bold mt-4 font-mono">
                    💡 {questionExercises[qIdx].rule}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {questionExercises[qIdx].options.map((option) => {
                    const isCorrect = questionExercises[qIdx].correct === option;
                    const isSelected = qSelected === option;
                    return (
                      <button
                        key={option}
                        disabled={qSelected !== null}
                        onClick={() => {
                          setQSelected(option);
                          setQCount(s => s + 1);
                          if (isCorrect) {
                            setQScore(s => s + 1);
                            sound.playCorrect();
                            onUpdateAccuracy('questions', Math.round(((qScore + 1) / questionExercises.length) * 100));
                          } else {
                            sound.playWrong();
                          }
                        }}
                        className={`p-4 rounded-2xl font-black cursor-pointer transition-all border-3 text-left ${
                          isSelected && isCorrect
                            ? 'bg-[#78c222] border-[#560e51] text-[#560e51] shadow-[2px_2px_0px_0px_#560e51]'
                            : isSelected && !isCorrect
                            ? 'bg-rose-300 border-[#560e51] text-slate-950 shadow-[2px_2px_0px_0px_#560e51]'
                            : 'bg-white hover:bg-fuchsia-50 border-[#560e51] text-[#560e51] shadow-[3px_3px_0px_0px_#560e51] active:translate-y-[2px]'
                        }`}
                      >
                        <span className="text-base sm:text-lg font-bold">{option}</span>
                      </button>
                    );
                  })}
                </div>

                {qSelected !== null && (
                  <div className="mt-6 text-center animate-fade-in flex flex-col items-center">
                    <p className="text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 mb-3">
                      {qSelected === questionExercises[qIdx].correct ? (
                        <span className="text-emerald-700 bg-emerald-100 border-2 border-emerald-500 px-3 py-1 rounded-xl shadow-[2px_2px_0px_0px_#560e51]">
                          🎉 Excellent! Rising intonation ↑ detected!
                        </span>
                      ) : (
                        <span className="text-rose-700 bg-rose-100 border-2 border-rose-500 px-3 py-1 rounded-xl shadow-[2px_2px_0px_0px_#560e51]">
                          ⚠️ Remember: {questionExercises[qIdx].rule}
                        </span>
                      )}
                    </p>
                    <button
                      onClick={() => {
                        setQSelected(null);
                        setQIdx(s => s + 1);
                        sound.playClick();
                      }}
                      className="px-6 py-2.5 bg-[#78c222] hover:bg-[#68ab1c] border-2 border-[#560e51] text-[#560e51] font-black rounded-xl text-xs uppercase shadow-[2px_2px_0px_0px_#560e51] cursor-pointer"
                    >
                      Next Question &rarr;
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="inline-block p-4 rounded-2xl bg-[#78c222] text-[#560e51] border-3 border-[#560e51] shadow-[3px_3px_0px_0px_#560e51] mb-3 text-3xl">🏆</div>
                <h4 className="text-2xl font-black text-[#560e51] uppercase">Questions Mastered!</h4>
                <p className="text-slate-700 font-bold mt-1 text-sm">
                  You scored {qScore} out of {questionExercises.length}!
                </p>
                <button
                  onClick={() => {
                    setQIdx(0);
                    setQCount(0);
                    setQScore(0);
                    setQSelected(null);
                    sound.playClick();
                  }}
                  className="mt-4 px-6 py-2 bg-[#78c222] border-2 border-[#560e51] font-black rounded-xl text-xs uppercase cursor-pointer text-[#560e51] shadow-[2px_2px_0px_0px_#560e51]"
                >
                  <RefreshCw className="inline h-3.5 w-3.5 mr-1" /> Retry Lab
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* TAB 4: FACT VS OPINION DETECTIVE */}
        {activeSubTab === 'factOpinion' && (
          <motion.div
            key="tab-fact-opinion"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-[28px] p-6 sm:p-8 border-4 border-[#560e51] shadow-[6px_6px_0px_0px_#560e51]"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-fuchsia-200 pb-3 mb-6 gap-2">
              <div>
                <span className="text-xs font-black text-[#9b2c98] uppercase tracking-widest font-mono">Lesson 3.4 & SAT Part 4 Q6</span>
                <h3 className="text-xl font-black text-[#560e51] mt-0.5 uppercase tracking-tight">Fact vs. Opinion Detective</h3>
              </div>
              <div className="bg-[#78c222] border-2 border-[#560e51] rounded-xl px-3.5 py-1 font-mono text-xs font-black text-[#560e51] shadow-[2px_2px_0px_0px_#560e51]">
                <span>SCORE: {foScore} / {foCount}</span>
              </div>
            </div>

            <div className="mb-6 p-4 bg-amber-50 border-2 border-[#560e51] rounded-2xl text-xs text-[#560e51] shadow-[2px_2px_0px_0px_#560e51]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white p-2.5 rounded-xl border border-amber-300">
                  <span className="font-black uppercase text-amber-900 block text-xs">📖 FACT:</span>
                  <span className="text-slate-700">Something that can be proven true with historical evidence, measurements, or dates (e.g. "built 2,000 years ago").</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-amber-300">
                  <span className="font-black uppercase text-amber-900 block text-xs">💭 OPINION:</span>
                  <span className="text-slate-700">What someone thinks or feels. Uses words like "in my opinion", "feels like", "spectacular", "loveliest".</span>
                </div>
              </div>
            </div>

            {foCount < factOpinionItems.length ? (
              <div>
                <div className="bg-[#fdf2fe] border-2 border-[#560e51] rounded-2xl p-6 sm:p-8 mb-6 min-h-40 flex flex-col justify-between items-center text-center shadow-[2px_2px_0px_0px_#560e51]">
                  <span className="p-1 px-3.5 bg-[#78c222] text-[#560e51] text-xs rounded-full font-black uppercase tracking-wider border-2 border-[#560e51]">
                    Statement {foIdx + 1} of {factOpinionItems.length}
                  </span>
                  <p className="text-xl sm:text-2xl font-black text-[#560e51] italic max-w-2xl font-sans mt-4 leading-relaxed">
                    "{factOpinionItems[foIdx].text}"
                  </p>
                  <p className="text-xs text-[#9b2c98] font-bold mt-4 font-mono">
                    Is this statement a provable FACT or a personal OPINION?
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {['FACT', 'OPINION'].map((type) => {
                    const isCorrect = factOpinionItems[foIdx].type === type;
                    const isSelected = foSelected === type;
                    return (
                      <button
                        key={type}
                        disabled={foSelected !== null}
                        onClick={() => {
                          setFoSelected(type);
                          setFoCount(s => s + 1);
                          if (isCorrect) {
                            setFoScore(s => s + 1);
                            sound.playCorrect();
                            onUpdateAccuracy('factOpinion', Math.round(((foScore + 1) / factOpinionItems.length) * 100));
                          } else {
                            sound.playWrong();
                          }
                        }}
                        className={`p-6 rounded-2xl font-black cursor-pointer transition-all border-3 flex flex-col items-center gap-1 ${
                          isSelected && isCorrect
                            ? 'bg-[#78c222] border-[#560e51] text-[#560e51] shadow-[2px_2px_0px_0px_#560e51]'
                            : isSelected && !isCorrect
                            ? 'bg-rose-300 border-[#560e51] text-slate-950 shadow-[2px_2px_0px_0px_#560e51]'
                            : 'bg-white hover:bg-fuchsia-50 border-[#560e51] text-[#560e51] shadow-[3px_3px_0px_0px_#560e51] active:translate-y-[2px]'
                        }`}
                      >
                        <span className="text-2xl uppercase tracking-wider font-black font-sans">{type === 'FACT' ? '🔍 FACT' : '💭 OPINION'}</span>
                      </button>
                    );
                  })}
                </div>

                {foSelected !== null && (
                  <div className="mt-6 text-center animate-fade-in flex flex-col items-center">
                    <p className="text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 mb-3">
                      {foSelected === factOpinionItems[foIdx].type ? (
                        <span className="text-emerald-700 bg-emerald-100 border-2 border-emerald-500 px-3 py-1 rounded-xl shadow-[2px_2px_0px_0px_#560e51]">
                          🎉 Correct Detective! {factOpinionItems[foIdx].reason}
                        </span>
                      ) : (
                        <span className="text-rose-700 bg-rose-100 border-2 border-rose-500 px-3 py-1 rounded-xl shadow-[2px_2px_0px_0px_#560e51]">
                          ⚠️ Incorrect. This is a <strong>{factOpinionItems[foIdx].type}</strong> because: {factOpinionItems[foIdx].reason}
                        </span>
                      )}
                    </p>
                    <button
                      onClick={() => {
                        setFoSelected(null);
                        setFoIdx(s => s + 1);
                        sound.playClick();
                      }}
                      className="px-6 py-2.5 bg-[#78c222] hover:bg-[#68ab1c] border-2 border-[#560e51] text-[#560e51] font-black rounded-xl text-xs uppercase shadow-[2px_2px_0px_0px_#560e51] cursor-pointer"
                    >
                      Next Statement &rarr;
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="inline-block p-4 rounded-2xl bg-[#78c222] text-[#560e51] border-3 border-[#560e51] shadow-[3px_3px_0px_0px_#560e51] mb-3 text-3xl">🏆</div>
                <h4 className="text-2xl font-black text-[#560e51] uppercase">Detective Badge Earned!</h4>
                <p className="text-slate-700 font-bold mt-1 text-sm">
                  You correctly identified {foScore} out of {factOpinionItems.length} statements!
                </p>
                <button
                  onClick={() => {
                    setFoIdx(0);
                    setFoCount(0);
                    setFoScore(0);
                    setFoSelected(null);
                    sound.playClick();
                  }}
                  className="mt-4 px-6 py-2 bg-[#78c222] border-2 border-[#560e51] font-black rounded-xl text-xs uppercase cursor-pointer text-[#560e51] shadow-[2px_2px_0px_0px_#560e51]"
                >
                  <RefreshCw className="inline h-3.5 w-3.5 mr-1" /> Retry Detective Lab
                </button>
              </div>
            )}
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}

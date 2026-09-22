import React, { useState } from 'react';
import { BookOpen, CheckCircle2, Award, Volume2, Sparkles, HelpCircle, FileText, ChevronRight, ChevronDown, Check, ShieldCheck, Home } from 'lucide-react';
import { sound } from './SoundManager';

interface UnitSummaryGuideProps {
  onNavigateTab: (tabId: string) => void;
  genAlphaMode?: boolean;
}

export default function UnitSummaryGuide({ onNavigateTab, genAlphaMode = false }: UnitSummaryGuideProps) {
  const [activeSection, setActiveSection] = useState<'curriculum' | 'test-matrix' | 'islamic'>('curriculum');
  const [expandedLesson, setExpandedLesson] = useState<number | null>(1);

  const toggleLesson = (num: number) => {
    sound.playClick();
    setExpandedLesson(prev => prev === num ? null : num);
  };

  return (
    <div className="bg-white rounded-[32px] p-6 sm:p-8 border-4 border-[#560e51] shadow-[8px_8px_0px_0px_#560e51] space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-fuchsia-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#9b2c98] font-mono bg-[#fdf2fe] px-3.5 py-1 rounded-full border border-[#9b2c98]">
              Curriculum & Assessment Blueprint
            </span>
            <span className="text-xs font-mono font-black text-[#43780a] bg-lime-100 px-3 py-1 rounded-full border border-lime-400">
              ESL PS Test Ready
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-[#560e51] uppercase tracking-tight mt-2 flex items-center gap-2">
            <span>Unit 3: Homes — Comprehensive Summary</span>
          </h3>
          <p className="text-xs sm:text-sm font-bold text-slate-700 mt-1">
            Complete learning guide aligned directly with the Cambridge Primary English Curriculum and the 50-mark ESL PS Summative Assessment.
          </p>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center gap-2 bg-[#fdf2fe] p-1.5 rounded-2xl border-2 border-[#560e51] shrink-0 self-start md:self-auto">
          <button
            onClick={() => {
              setActiveSection('curriculum');
              sound.playClick();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-tight cursor-pointer transition ${
              activeSection === 'curriculum'
                ? 'bg-[#560e51] text-white shadow-[2px_2px_0px_0px_#78c222]'
                : 'text-[#560e51] hover:bg-fuchsia-100'
            }`}
          >
            Lessons 3.1–3.6
          </button>
          <button
            onClick={() => {
              setActiveSection('test-matrix');
              sound.playClick();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-tight cursor-pointer transition ${
              activeSection === 'test-matrix'
                ? 'bg-[#560e51] text-white shadow-[2px_2px_0px_0px_#78c222]'
                : 'text-[#560e51] hover:bg-fuchsia-100'
            }`}
          >
            ESL PS Test Matrix 📝
          </button>
          <button
            onClick={() => {
              setActiveSection('islamic');
              sound.playClick();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-tight cursor-pointer transition ${
              activeSection === 'islamic'
                ? 'bg-[#560e51] text-white shadow-[2px_2px_0px_0px_#78c222]'
                : 'text-[#560e51] hover:bg-fuchsia-100'
            }`}
          >
            Islamic Integration ☪️
          </button>
        </div>
      </div>

      {/* SECTION 1: CURRICULUM LESSONS (3.1 - 3.6) */}
      {activeSection === 'curriculum' && (
        <div className="space-y-4">
          
          {/* Lesson 3.1 */}
          <div className="border-3 border-[#560e51] rounded-2xl overflow-hidden shadow-[3px_3px_0px_0px_#560e51]">
            <button
              onClick={() => toggleLesson(1)}
              className="w-full p-4 bg-[#fefaf0] hover:bg-amber-100 flex items-center justify-between text-left cursor-pointer transition"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#560e51] text-white font-mono font-black text-xs flex items-center justify-center">
                  3.1
                </span>
                <div>
                  <h4 className="text-sm sm:text-base font-black text-[#560e51] uppercase">
                    Lesson 3.1: Types of Homes & Living Environments
                  </h4>
                  <p className="text-xs font-bold text-slate-600">
                    Vocabulary, definitions, global home structures, and living spaces.
                  </p>
                </div>
              </div>
              {expandedLesson === 1 ? <ChevronDown className="h-5 w-5 text-[#560e51]" /> : <ChevronRight className="h-5 w-5 text-[#560e51]" />}
            </button>

            {expandedLesson === 1 && (
              <div className="p-5 bg-white space-y-3 border-t-2 border-[#560e51]/20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-bold">
                  <div className="p-3 bg-[#fdf2fe] rounded-xl border border-[#9b2c98]">
                    <span className="font-black text-[#9b2c98] block mb-1 uppercase font-mono">Core Vocabulary:</span>
                    <p className="text-slate-800 leading-relaxed">
                      <strong>Detached house</strong> (standalone), <strong>Semi-detached</strong> (shares one wall), <strong>Terraced house</strong> (row of identical homes), <strong>Apartment</strong> (flat on one floor of a tall building), <strong>Bungalow</strong> (single-floor home), <strong>Cottage</strong> (cosy country house), <strong>Stilt house</strong> (raised above water/mud on poles), <strong>Yurt</strong> (circular portable nomad tent), <strong>Houseboat</strong> (home that floats on water), <strong>Caravan</strong> (mobile home on wheels).
                    </p>
                  </div>
                  <div className="p-3 bg-lime-50 rounded-xl border border-lime-600">
                    <span className="font-black text-[#43780a] block mb-1 uppercase font-mono">Descriptive Adjectives:</span>
                    <p className="text-slate-800 leading-relaxed">
                      <em>Spacious</em> (lots of space), <em>Cramped</em> (narrow/crowded), <em>Cosy</em> (warm & comfortable), <em>Modern</em> (contemporary), <em>Old-fashioned</em> (historic), <em>Relaxing</em> (calm), <em>Spectacular</em> (breathtaking).
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] font-mono text-slate-600">Tested in: Part 1 (Listening) & Part 2 (Adjectives & Definitions Matching A–K)</span>
                  <button
                    onClick={() => onNavigateTab('flashcards')}
                    className="text-xs font-black text-[#560e51] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    Study 3.1 Flashcards <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Lesson 3.2 */}
          <div className="border-3 border-[#560e51] rounded-2xl overflow-hidden shadow-[3px_3px_0px_0px_#560e51]">
            <button
              onClick={() => toggleLesson(2)}
              className="w-full p-4 bg-[#fefaf0] hover:bg-amber-100 flex items-center justify-between text-left cursor-pointer transition"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#43780a] text-white font-mono font-black text-xs flex items-center justify-center">
                  3.2
                </span>
                <div>
                  <h4 className="text-sm sm:text-base font-black text-[#560e51] uppercase">
                    Lesson 3.2: The Eco-House & Infinitives of Purpose
                  </h4>
                  <p className="text-xs font-bold text-slate-600">
                    Sustainable materials, environmental features, and "to + verb" purpose grammar.
                  </p>
                </div>
              </div>
              {expandedLesson === 2 ? <ChevronDown className="h-5 w-5 text-[#560e51]" /> : <ChevronRight className="h-5 w-5 text-[#560e51]" />}
            </button>

            {expandedLesson === 2 && (
              <div className="p-5 bg-white space-y-3 border-t-2 border-[#560e51]/20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-bold">
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-600">
                    <span className="font-black text-emerald-900 block mb-1 uppercase font-mono">Eco Innovations:</span>
                    <ul className="list-disc list-inside space-y-1 text-slate-800">
                      <li><strong>Solar panels:</strong> absorb sunlight to provide electricity</li>
                      <li><strong>Rainwater tub:</strong> collects rain to water plants</li>
                      <li><strong>Roof turf (grass):</strong> keeps the interior warm in winter</li>
                      <li><strong>Local materials:</strong> using stone, mud, and timber reduces transport pollution</li>
                      <li><strong>Double glazing:</strong> two layers of glass to trap indoor heat</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-600">
                    <span className="font-black text-indigo-900 block mb-1 uppercase font-mono">Key Grammar Rule:</span>
                    <p className="text-slate-800 leading-relaxed mb-2">
                      <strong>Infinitives of Purpose ("to + base verb"):</strong> explains <em>why</em> an action is taken.
                    </p>
                    <div className="p-2 bg-white rounded border border-indigo-300 font-mono text-[11px] text-indigo-950">
                      • They installed solar panels <strong>to generate</strong> power.<br/>
                      • He built stilt poles <strong>to keep</strong> water out.<br/>
                      • She opened the window <strong>to let</strong> in fresh air.
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] font-mono text-slate-600">Tested in: Part 3 (Grammar) & Part 5 (Writing Task)</span>
                  <button
                    onClick={() => onNavigateTab('grammar')}
                    className="text-xs font-black text-[#560e51] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    Practice Infinitives Lab <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Lesson 3.3 */}
          <div className="border-3 border-[#560e51] rounded-2xl overflow-hidden shadow-[3px_3px_0px_0px_#560e51]">
            <button
              onClick={() => toggleLesson(3)}
              className="w-full p-4 bg-[#fefaf0] hover:bg-amber-100 flex items-center justify-between text-left cursor-pointer transition"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-amber-600 text-white font-mono font-black text-xs flex items-center justify-center">
                  3.3
                </span>
                <div>
                  <h4 className="text-sm sm:text-base font-black text-[#560e51] uppercase">
                    Lesson 3.3: Strange Buildings & Modals of Possibility
                  </h4>
                  <p className="text-xs font-bold text-slate-600">
                    Unusual architecture and expressing certainty using must, might, could, and can't.
                  </p>
                </div>
              </div>
              {expandedLesson === 3 ? <ChevronDown className="h-5 w-5 text-[#560e51]" /> : <ChevronRight className="h-5 w-5 text-[#560e51]" />}
            </button>

            {expandedLesson === 3 && (
              <div className="p-5 bg-white space-y-3 border-t-2 border-[#560e51]/20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-bold">
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-600">
                    <span className="font-black text-amber-950 block mb-1 uppercase font-mono">Strange Buildings Studied:</span>
                    <p className="text-slate-800 leading-relaxed">
                      • <strong>The Haines Shoe House</strong> (Pennsylvania, 5 storeys shaped like a boot)<br/>
                      • <strong>The Upside-Down House</strong> (furniture on ceiling)<br/>
                      • <strong>The Basket Building</strong> (Ohio office shaped like a picnic basket)<br/>
                      • <strong>Library Bookshelf Facade</strong> (25-foot giant classic book spines)
                    </p>
                  </div>
                  <div className="p-3 bg-fuchsia-50 rounded-xl border border-[#9b2c98]">
                    <span className="font-black text-[#9b2c98] block mb-1 uppercase font-mono">Modal Verbs of Certainty:</span>
                    <ul className="space-y-1 text-slate-800">
                      <li><strong>Must (100% sure):</strong> "It <em>must</em> be a shoe salesman's house!"</li>
                      <li><strong>Might / Could (50% possible):</strong> "It <em>might</em> be a small museum or library."</li>
                      <li><strong>Can't (0% impossible):</strong> "It <em>can't</em> be a supermarket, it's far too small!"</li>
                    </ul>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] font-mono text-slate-600">Tested in: Part 3 (Questions 16–20)</span>
                  <button
                    onClick={() => onNavigateTab('grammar')}
                    className="text-xs font-black text-[#560e51] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    Open Modal Verbs Lab <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Lesson 3.4 */}
          <div className="border-3 border-[#560e51] rounded-2xl overflow-hidden shadow-[3px_3px_0px_0px_#560e51]">
            <button
              onClick={() => toggleLesson(4)}
              className="w-full p-4 bg-[#fefaf0] hover:bg-amber-100 flex items-center justify-between text-left cursor-pointer transition"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-sky-700 text-white font-mono font-black text-xs flex items-center justify-center">
                  3.4
                </span>
                <div>
                  <h4 className="text-sm sm:text-base font-black text-[#560e51] uppercase">
                    Lesson 3.4: Famous Places & The Colosseum Reading
                  </h4>
                  <p className="text-xs font-bold text-slate-600">
                    Ancient world landmarks, facts vs. opinions, and question intonations.
                  </p>
                </div>
              </div>
              {expandedLesson === 4 ? <ChevronDown className="h-5 w-5 text-[#560e51]" /> : <ChevronRight className="h-5 w-5 text-[#560e51]" />}
            </button>

            {expandedLesson === 4 && (
              <div className="p-5 bg-white space-y-3 border-t-2 border-[#560e51]/20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-bold">
                  <div className="p-3 bg-sky-50 rounded-xl border border-sky-600">
                    <span className="font-black text-sky-950 block mb-1 uppercase font-mono">The Colosseum (Rome, Italy):</span>
                    <ul className="list-disc list-inside space-y-1 text-slate-800">
                      <li>Started almost <strong>2,000 years ago</strong> using stone, brick, and sand</li>
                      <li>Enormous capacity: held over <strong>50,000 spectators</strong></li>
                      <li>Gladiators fought exhibitions in the central arena</li>
                      <li>Attracts over <strong>6 million visitors</strong> annually</li>
                      <li>Damaged by historic earthquakes and stone scavengers</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-teal-50 rounded-xl border border-teal-600">
                    <span className="font-black text-teal-950 block mb-1 uppercase font-mono">Fact vs. Opinion & Intonation:</span>
                    <p className="text-slate-800 leading-relaxed mb-1">
                      • <strong>Fact:</strong> "Over 50,000 people could sit inside." (Verifiable proof)<br/>
                      • <strong>Opinion:</strong> "It is the most spectacular building." (Personal belief)
                    </p>
                    <p className="text-slate-800 leading-relaxed mt-2">
                      • <strong>Rising pitch (↗):</strong> Yes/No questions ("Is it in Rome? ↗")<br/>
                      • <strong>Falling pitch (↘):</strong> Wh- questions ("Where is the Colosseum? ↘")
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] font-mono text-slate-600">Tested in: Part 4 (Reading Comprehension Questions 21–25)</span>
                  <button
                    onClick={() => onNavigateTab('mock-sat')}
                    className="text-xs font-black text-[#560e51] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    View Reading Passage in Mock Exam <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Lesson 3.5 */}
          <div className="border-3 border-[#560e51] rounded-2xl overflow-hidden shadow-[3px_3px_0px_0px_#560e51]">
            <button
              onClick={() => toggleLesson(5)}
              className="w-full p-4 bg-[#fefaf0] hover:bg-amber-100 flex items-center justify-between text-left cursor-pointer transition"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-purple-700 text-white font-mono font-black text-xs flex items-center justify-center">
                  3.5
                </span>
                <div>
                  <h4 className="text-sm sm:text-base font-black text-[#560e51] uppercase">
                    Lesson 3.5: Literature — The Hobbit (J.R.R. Tolkien)
                  </h4>
                  <p className="text-xs font-bold text-slate-600">
                    Bag End, underground hobbit-hole comfort, porthole door, and respectability.
                  </p>
                </div>
              </div>
              {expandedLesson === 5 ? <ChevronDown className="h-5 w-5 text-[#560e51]" /> : <ChevronRight className="h-5 w-5 text-[#560e51]" />}
            </button>

            {expandedLesson === 5 && (
              <div className="p-5 bg-white space-y-3 border-t-2 border-[#560e51]/20">
                <div className="p-3 bg-purple-50 rounded-xl border border-purple-400 text-xs font-bold text-slate-800 space-y-2">
                  <p className="italic leading-relaxed">
                    "In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole... it was a hobbit-hole, and that means comfort."
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-purple-200">
                    <div>
                      <span className="font-mono font-black text-purple-900 block">Round Door</span>
                      <span>Painted green with a yellow brass knob in the exact middle.</span>
                    </div>
                    <div>
                      <span className="font-mono font-black text-purple-900 block">Tunnel Hall</span>
                      <span>Panelled walls, carpeted floors, polished chairs, and lots of hat pegs.</span>
                    </div>
                    <div>
                      <span className="font-mono font-black text-purple-900 block">Fond of Visitors</span>
                      <span>Bilbo loved welcoming guests and preparing tea and pantries of food.</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] font-mono text-slate-600">Vocabulary: porthole, pegs, pantries, cellars, respectable</span>
                  <button
                    onClick={() => onNavigateTab('literature')}
                    className="text-xs font-black text-[#560e51] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    Open Literature Study Tab 📖 <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Lesson 3.6 */}
          <div className="border-3 border-[#560e51] rounded-2xl overflow-hidden shadow-[3px_3px_0px_0px_#560e51]">
            <button
              onClick={() => toggleLesson(6)}
              className="w-full p-4 bg-[#fefaf0] hover:bg-amber-100 flex items-center justify-between text-left cursor-pointer transition"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#78c222] text-[#560e51] font-mono font-black text-xs flex items-center justify-center">
                  3.6
                </span>
                <div>
                  <h4 className="text-sm sm:text-base font-black text-[#560e51] uppercase">
                    Lesson 3.6: Architecture Project — Design Your Dream Eco-Home
                  </h4>
                  <p className="text-xs font-bold text-slate-600">
                    Applying Unit 3 concepts to write a structured 40–60 word paragraph with sentence frames.
                  </p>
                </div>
              </div>
              {expandedLesson === 6 ? <ChevronDown className="h-5 w-5 text-[#560e51]" /> : <ChevronRight className="h-5 w-5 text-[#560e51]" />}
            </button>

            {expandedLesson === 6 && (
              <div className="p-5 bg-white space-y-3 border-t-2 border-[#560e51]/20">
                <p className="text-xs font-bold text-slate-800">
                  Students transitioning to ESL use 5 simple step-by-step frames to write their 40–60 word paragraph for Part 5:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-[11px] font-bold">
                  <div className="p-2.5 bg-fuchsia-50 rounded-xl border border-fuchsia-300">
                    <span className="font-mono font-black text-[#560e51] block mb-1">1. Type & Place</span>
                    My dream home is a cosy eco-house on a green hill.
                  </div>
                  <div className="p-2.5 bg-lime-50 rounded-xl border border-lime-300">
                    <span className="font-mono font-black text-[#43780a] block mb-1">2. Materials</span>
                    The walls and roof are made of stone and wood.
                  </div>
                  <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-300">
                    <span className="font-mono font-black text-amber-900 block mb-1">3. Eco-Feature (to + verb)</span>
                    It has solar panels to make clean electricity.
                  </div>
                  <div className="p-2.5 bg-sky-50 rounded-xl border border-sky-300">
                    <span className="font-mono font-black text-sky-900 block mb-1">4. Special Rooms</span>
                    There is a round green door and a cosy bedroom.
                  </div>
                  <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-300">
                    <span className="font-mono font-black text-emerald-900 block mb-1">5. Feelings</span>
                    I love it because it is cosy, warm, and comfortable.
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => onNavigateTab('dream-home')}
                    className="px-4 py-2 bg-[#78c222] hover:bg-[#68ab1c] text-[#560e51] font-black text-xs rounded-xl border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#560e51] cursor-pointer"
                  >
                    Open Dream Home Blueprint Lab 📐
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      )}

      {/* SECTION 2: ESL PS TEST BLUEPRINT MATRIX (50 MARKS TOTAL) */}
      {activeSection === 'test-matrix' && (
        <div className="space-y-6">
          <div className="p-4 bg-[#fdf2fe] rounded-2xl border-3 border-[#560e51] shadow-[3px_3px_0px_0px_#560e51]">
            <h4 className="text-base font-black text-[#560e51] uppercase tracking-tight mb-2">
              Summative Assessment Weighting & Structure (50 Marks)
            </h4>
            <p className="text-xs sm:text-sm font-bold text-slate-800 leading-relaxed">
              The Grade 4 ESL Proficiency Standard (PS) exam evaluates 5 key competencies. Each part targets specific lessons from Unit 3:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* Part 1 */}
            <div className="p-5 bg-white rounded-2xl border-3 border-[#560e51] shadow-[4px_4px_0px_0px_#560e51] flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="w-7 h-7 bg-[#9b2c98] text-white rounded-lg flex items-center justify-center font-mono font-black text-xs">1</span>
                  <span className="text-xs font-mono font-black text-[#9b2c98] bg-fuchsia-50 px-2 py-0.5 rounded border border-[#9b2c98]">5 Marks (10%)</span>
                </div>
                <h5 className="font-black text-sm text-[#560e51] uppercase">Part 1: Listening Comprehension</h5>
                <p className="text-xs font-bold text-slate-600 mt-2 leading-relaxed">
                  Audio passage: <em>Homes Around the World</em>. Students identify auditory vocabulary (yurt, stilt house, apartment, bungalow, homes).
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-200 text-[11px] font-mono text-[#43780a] font-bold">
                ✓ Tip: Listen for the key keywords in the Word Box before audio ends.
              </div>
            </div>

            {/* Part 2 */}
            <div className="p-5 bg-white rounded-2xl border-3 border-[#560e51] shadow-[4px_4px_0px_0px_#560e51] flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="w-7 h-7 bg-[#43780a] text-white rounded-lg flex items-center justify-center font-mono font-black text-xs">2</span>
                  <span className="text-xs font-mono font-black text-[#43780a] bg-lime-50 px-2 py-0.5 rounded border border-lime-400">10 Marks (20%)</span>
                </div>
                <h5 className="font-black text-sm text-[#560e51] uppercase">Part 2: Adjectives Matching (A–K)</h5>
                <p className="text-xs font-bold text-slate-600 mt-2 leading-relaxed">
                  Type letters (A–K) beside 10 highlighted adjectives (famous, colourful, comfortable, mysterious, ancient, tiny, wooden, spacious, modern, relaxing) to match their meanings.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-200 text-[11px] font-mono text-[#43780a] font-bold">
                ✓ Tip: Check keywords in definitions (e.g. "bright colours" = colourful, "wood" = wooden).
              </div>
            </div>

            {/* Part 3 */}
            <div className="p-5 bg-white rounded-2xl border-3 border-[#560e51] shadow-[4px_4px_0px_0px_#560e51] flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="w-7 h-7 bg-amber-600 text-white rounded-lg flex items-center justify-center font-mono font-black text-xs">3</span>
                  <span className="text-xs font-mono font-black text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-400">10 Marks (20%)</span>
                </div>
                <h5 className="font-black text-sm text-[#560e51] uppercase">Part 3: Grammar in Context</h5>
                <p className="text-xs font-bold text-slate-600 mt-2 leading-relaxed">
                  Reading <em>The Eco-House on the Hill</em> to test Infinitives of Purpose ("to + verb") and Modals of Possibility (must, might, could, can't).
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-200 text-[11px] font-mono text-[#43780a] font-bold">
                ✓ Tip: Purpose answers the question "Why?" (e.g. "to provide energy").
              </div>
            </div>

            {/* Part 4 */}
            <div className="p-5 bg-white rounded-2xl border-3 border-[#560e51] shadow-[4px_4px_0px_0px_#560e51] flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="w-7 h-7 bg-sky-700 text-white rounded-lg flex items-center justify-center font-mono font-black text-xs">4</span>
                  <span className="text-xs font-mono font-black text-sky-900 bg-sky-50 px-2 py-0.5 rounded border border-sky-400">10 Marks (20%)</span>
                </div>
                <h5 className="font-black text-sm text-[#560e51] uppercase">Part 4: Reading Comprehension</h5>
                <p className="text-xs font-bold text-slate-600 mt-2 leading-relaxed">
                  Non-fiction passage: <em>The Colosseum in Rome</em>. Questions 21–25 test factual retrieval, True/False, and distinguishing facts from opinions.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-200 text-[11px] font-mono text-[#43780a] font-bold">
                ✓ Tip: Verify dates (2,000 years ago) and capacity (50,000 people) in the text.
              </div>
            </div>

            {/* Part 5 */}
            <div className="p-5 bg-white rounded-2xl border-3 border-[#560e51] shadow-[4px_4px_0px_0px_#560e51] flex flex-col justify-between md:col-span-2">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="w-7 h-7 bg-[#78c222] text-[#560e51] rounded-lg flex items-center justify-center font-mono font-black text-xs">5</span>
                  <span className="text-xs font-mono font-black text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-400">15 Marks (30%)</span>
                </div>
                <h5 className="font-black text-sm text-[#560e51] uppercase">Part 5: Guided Descriptive Writing (40–60 words)</h5>
                <p className="text-xs font-bold text-slate-600 mt-2 leading-relaxed">
                  Write a simple paragraph about a <strong>Dream Home</strong> or an <strong>Eco-House</strong>.
                  Marking criteria: Content & Planning (5m), Vocabulary & Adjectives (4m), Purpose Clauses (to + verb) (4m), Spelling & Capital Letters (2m).
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#43780a] font-bold">
                  ✓ Target: 40–60 words with 5 simple steps & sentence frames.
                </span>
                <button
                  onClick={() => onNavigateTab('mock-sat')}
                  className="px-3 py-1.5 bg-[#560e51] text-white text-xs font-black rounded-lg cursor-pointer"
                >
                  Take Mock Exam 📝
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* SECTION 3: ISLAMIC INTEGRATION */}
      {activeSection === 'islamic' && (
        <div className="space-y-4">
          
          <div className="bg-emerald-50 rounded-2xl p-5 border-3 border-emerald-700 shadow-[4px_4px_0px_0px_#047857] space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🏡</span>
              <h4 className="text-base sm:text-lg font-black text-emerald-950 uppercase tracking-tight">
                Homes as a Divine Blessing and Sanctuary (Surah An-Nahl 16:80)
              </h4>
            </div>
            <p className="text-center font-serif text-xl font-bold text-emerald-950 py-2">
              وَاللَّهُ جَعَلَ لَكُم مِّن بُيُوتِكُمْ سَكَنًا
            </p>
            <p className="text-xs sm:text-sm font-bold italic text-emerald-900 text-center">
              "And Allah has made for you from your homes a place of rest..."
            </p>
            <p className="text-xs sm:text-sm font-semibold text-emerald-950 leading-relaxed pt-2 border-t border-emerald-300">
              In Unit 3, as we learn about detached houses, eco-houses, and yurts, we reflect that the word <em>Sakana</em> (سَكَن) in Arabic means peace, serenity, and emotional tranquility. A true home is not just physical walls and timber—it is a sanctuary where our families pray together, treat each other with gentleness, and thank Allah SWT.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-[#fefaf0] rounded-2xl border-3 border-[#560e51] shadow-[3px_3px_0px_0px_#560e51] space-y-2">
              <span className="text-xs font-mono font-black uppercase text-[#9b2c98]">Hadith on Hospitality (Ikramud Dhaif):</span>
              <p className="italic font-bold text-xs sm:text-sm text-slate-900">
                "Whoever believes in Allah and the Last Day, should serve his guests generously."
              </p>
              <span className="text-[11px] font-mono text-slate-500 block">— Hadith Sahih Al-Bukhari</span>
              <p className="text-xs font-medium text-slate-700 pt-2 border-t border-slate-200">
                Connected to Lesson 3.5: In <em>The Hobbit</em>, Bilbo Baggins provided many coat pegs and comfortable chairs because he was "fond of visitors". Islam places generous hospitality at the center of faith.
              </p>
            </div>

            <div className="p-5 bg-[#fdf2fe] rounded-2xl border-3 border-[#560e51] shadow-[3px_3px_0px_0px_#560e51] space-y-2">
              <span className="text-xs font-mono font-black uppercase text-[#9b2c98]">Du'a for a Blessed Landing / Dwelling:</span>
              <p className="text-center font-serif text-lg font-bold text-[#560e51] py-1">
                رَّبِّ أَنزِلْنِي مُنزَلًا مُّبَارَكًا وَأَنتَ خَيْرُ الْمُنزِلِينَ
              </p>
              <p className="italic font-bold text-xs text-slate-900 text-center">
                "My Lord, let me land at a blessed landing place, and You are the best to accommodate."
              </p>
              <span className="text-[11px] font-mono text-slate-500 text-center block">— Surah Al-Mu'minun (23:29)</span>
              <p className="text-xs font-medium text-slate-700 pt-2 border-t border-slate-200">
                A beautiful prophetic supplication to recite whenever entering a home, moving to a new residence, or designing our dream spaces.
              </p>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}

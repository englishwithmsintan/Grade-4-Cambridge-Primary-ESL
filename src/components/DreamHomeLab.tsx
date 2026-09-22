import React, { useState } from 'react';
import { DreamHomeProjectData } from '../types';
import { sound } from './SoundManager';
import { humanVoice } from '../utils/humanVoice';
import { Home, Sparkles, Volume2, Printer, CheckCircle2, ShieldCheck, Heart, Sun, Droplets, Wind, Layers } from 'lucide-react';
import { motion } from 'motion/react';

interface DreamHomeLabProps {
  initialData?: DreamHomeProjectData;
  onSave?: (data: DreamHomeProjectData) => void;
  genAlphaMode?: boolean;
}

const DEFAULT_PROJECT_DATA: DreamHomeProjectData = {
  homeName: 'The Green Hill House',
  homeType: 'Eco-House on a Hill',
  style: 'Eco-Friendly Modern Home',
  location: 'On a quiet green hill near the river',
  materials: ['Local stone', 'Recycled wood', 'Clay tiles', 'Glass windows'],
  adjectives: ['cosy', 'spacious', 'comfortable', 'eco-friendly'],
  specialFeatures: [
    'Solar panels on the roof to make clean electricity',
    'Rainwater tub outside to collect water for plants',
    'Grass on the roof to keep rooms warm in winter',
    'Round green door with a shiny brass knob'
  ],
  rooms: {
    bedrooms: 3,
    bathrooms: 2,
    functionalRooms: ['Study Room', 'Kitchen Pantry with coat pegs', 'Sunlit Dining Room']
  },
  landWidth: 20,
  landLength: 30,
  visitorImpression: 'A warm and cosy home where guests feel happy and relaxed.',
  whyLove: 'It protects nature and is very comfortable and bright for my family.'
};

const HOME_TYPES = [
  'Eco-House on a Hill',
  'Cosy Countryside Cottage',
  'Stilt House over River',
  'Traditional Nomadic Yurt',
  'Modern Detached House',
  'Solar-Powered Penthouse Apartment'
];

const AVAILABLE_MATERIALS = [
  'Local stone',
  'Recycled wood',
  'Clay roof tiles',
  'Glass windows',
  'Bamboo and straw',
  'Red bricks',
  'Mud and plaster'
];

const AVAILABLE_ECO_FEATURES = [
  'Solar panels on the roof to make electricity',
  'Rainwater tub outside to water the garden',
  'Grass on the roof to keep rooms warm',
  'Round green door with a shiny knob',
  'Big round windows to let in sunlight',
  'Compost tub to turn food scraps into soil',
  'Cool breeze windows to keep rooms cool without AC'
];

const DESCRIPTIVE_ADJECTIVES = [
  'cosy',
  'spacious',
  'eco-friendly',
  'peaceful',
  'modern',
  'warm',
  'relaxing',
  'comfortable'
];

export default function DreamHomeLab({
  initialData,
  onSave,
  genAlphaMode = false
}: DreamHomeLabProps) {
  const [data, setData] = useState<DreamHomeProjectData>(initialData || DEFAULT_PROJECT_DATA);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const toggleMaterial = (mat: string) => {
    sound.playClick();
    setData(prev => {
      const exists = prev.materials.includes(mat);
      const updated = exists ? prev.materials.filter(m => m !== mat) : [...prev.materials, mat];
      return { ...prev, materials: updated };
    });
  };

  const toggleFeature = (feat: string) => {
    sound.playClick();
    setData(prev => {
      const exists = prev.specialFeatures.includes(feat);
      const updated = exists ? prev.specialFeatures.filter(f => f !== feat) : [...prev.specialFeatures, feat];
      return { ...prev, specialFeatures: updated };
    });
  };

  const toggleAdjective = (adj: string) => {
    sound.playClick();
    setData(prev => {
      const exists = prev.adjectives.includes(adj);
      const updated = exists ? prev.adjectives.filter(a => a !== adj) : [...prev.adjectives, adj];
      return { ...prev, adjectives: updated };
    });
  };

  const generatePresentationSpeech = () => {
    const adjText = data.adjectives.length > 0 ? data.adjectives.slice(0, 2).join(' and ') : 'cosy';
    const matText = data.materials.length > 0 ? data.materials.slice(0, 2).join(' and ') : 'stone and wood';
    const featText = data.specialFeatures.length > 0 ? data.specialFeatures.slice(0, 2).join('. Also, it has ') : 'solar panels to make electricity';
    return `Hello everyone! My dream home is called ${data.homeName}. It is a ${adjText} ${data.homeType}, located ${data.location}. The walls and roof are made of ${matText}. It has ${featText}. Inside, there are ${data.rooms.bedrooms} bedrooms and ${data.rooms.bathrooms} bathrooms. When visitors visit, ${data.visitorImpression}. I love my dream home because ${data.whyLove}. Thank you!`;
  };

  const playSpeech = () => {
    if (isPlayingAudio) {
      humanVoice.stop();
      setIsPlayingAudio(false);
      return;
    }
    humanVoice.speak(generatePresentationSpeech(), {
      rate: 0.88,
      onStart: () => setIsPlayingAudio(true),
      onEnd: () => setIsPlayingAudio(false),
    });
  };

  const handleSave = () => {
    sound.playCorrect();
    setSavedSuccess(true);
    if (onSave) {
      onSave(data);
    }
    localStorage.setItem('sdit_auliya_unit3_dreamhome', JSON.stringify(data));
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-white rounded-[32px] p-6 sm:p-8 border-4 border-[#560e51] shadow-[8px_8px_0px_0px_#560e51] text-center">
        <div className="w-16 h-16 bg-lime-100 rounded-2xl flex items-center justify-center mx-auto mb-3 border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#560e51]">
          <Home className="h-8 w-8 text-[#43780a]" />
        </div>
        <span className="text-xs font-black uppercase tracking-widest text-[#9b2c98] font-mono bg-[#fdf2fe] px-4 py-1 rounded-full border-2 border-[#560e51]">
          Lesson 3.6 Architecture & Engineering Project
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-950 mt-3 uppercase tracking-tight">
          Dream Eco-House Blueprint Lab 📐🏡
        </h2>
        <p className="text-sm font-bold text-slate-600 mt-2 max-w-xl mx-auto">
          Design your custom eco-friendly house, select sustainable building materials, formulate purpose clauses, and present your spoken architectural pitch!
        </p>
      </div>

      {/* Blueprint Builder Form */}
      <div className="bg-[#fefaf0] rounded-[32px] p-6 sm:p-8 border-4 border-[#560e51] shadow-[8px_8px_0px_0px_#560e51] space-y-6">
        
        {/* Section 1: Basic Identity */}
        <div>
          <h3 className="text-xl font-black text-[#560e51] uppercase tracking-tight flex items-center gap-2 mb-4">
            <Home className="h-5 w-5 text-[#9b2c98]" /> 1. Home Identity & Location
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase font-mono text-[#560e51] mb-1">
                Home Name:
              </label>
              <input
                type="text"
                value={data.homeName}
                onChange={(e) => setData({ ...data, homeName: e.target.value })}
                className="w-full p-3 bg-white border-2 border-[#560e51] rounded-xl text-sm font-bold text-slate-950 focus:outline-none shadow-[2px_2px_0px_0px_#560e51]"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase font-mono text-[#560e51] mb-1">
                Type of Home:
              </label>
              <select
                value={data.homeType}
                onChange={(e) => setData({ ...data, homeType: e.target.value })}
                className="w-full p-3 bg-white border-2 border-[#560e51] rounded-xl text-sm font-bold text-slate-950 focus:outline-none shadow-[2px_2px_0px_0px_#560e51]"
              >
                {HOME_TYPES.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-black uppercase font-mono text-[#560e51] mb-1">
                Surrounding Location & Landscape:
              </label>
              <input
                type="text"
                value={data.location}
                onChange={(e) => setData({ ...data, location: e.target.value })}
                className="w-full p-3 bg-white border-2 border-[#560e51] rounded-xl text-sm font-bold text-slate-950 focus:outline-none shadow-[2px_2px_0px_0px_#560e51]"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Materials & Purpose */}
        <div className="pt-4 border-t-2 border-[#560e51]/20">
          <h3 className="text-xl font-black text-[#560e51] uppercase tracking-tight flex items-center gap-2 mb-2">
            <Layers className="h-5 w-5 text-[#43780a]" /> 2. Building Materials (Local & Sustainable)
          </h3>
          <p className="text-xs font-bold text-slate-600 mb-3">
            Select the eco-materials used to construct your walls, roof, and frames:
          </p>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_MATERIALS.map((mat) => {
              const selected = data.materials.includes(mat);
              return (
                <button
                  key={mat}
                  type="button"
                  onClick={() => toggleMaterial(mat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black border-2 border-[#560e51] cursor-pointer transition-all shadow-[2px_2px_0px_0px_#560e51] ${
                    selected ? 'bg-[#78c222] text-[#560e51]' : 'bg-white hover:bg-fuchsia-50 text-slate-700'
                  }`}
                >
                  {selected ? '✓ ' : '+ '} {mat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 3: Eco-Features & Infinitives of Purpose */}
        <div className="pt-4 border-t-2 border-[#560e51]/20">
          <h3 className="text-xl font-black text-[#560e51] uppercase tracking-tight flex items-center gap-2 mb-2">
            <Sun className="h-5 w-5 text-amber-600" /> 3. Eco-Features (Infinitives of Purpose: "to + verb")
          </h3>
          <p className="text-xs font-bold text-slate-600 mb-3">
            Choose sustainable innovations that explain <em>why</em> each feature was built:
          </p>
          <div className="space-y-2">
            {AVAILABLE_ECO_FEATURES.map((feat) => {
              const selected = data.specialFeatures.includes(feat);
              return (
                <div
                  key={feat}
                  onClick={() => toggleFeature(feat)}
                  className={`p-3 rounded-xl border-2 border-[#560e51] flex items-center justify-between cursor-pointer transition shadow-[2px_2px_0px_0px_#560e51] ${
                    selected ? 'bg-lime-100 text-slate-950 font-black' : 'bg-white text-slate-700 font-bold hover:bg-fuchsia-50'
                  }`}
                >
                  <span className="text-xs sm:text-sm">{feat}</span>
                  <span className={`text-xs px-2 py-0.5 rounded font-mono ${selected ? 'bg-[#43780a] text-white' : 'bg-slate-200 text-slate-600'}`}>
                    {selected ? 'ACTIVE' : 'SELECT'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 4: Descriptive Adjectives */}
        <div className="pt-4 border-t-2 border-[#560e51]/20">
          <h3 className="text-xl font-black text-[#560e51] uppercase tracking-tight flex items-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-[#9b2c98]" /> 4. Descriptive Adjectives
          </h3>
          <div className="flex flex-wrap gap-2">
            {DESCRIPTIVE_ADJECTIVES.map((adj) => {
              const selected = data.adjectives.includes(adj);
              return (
                <button
                  key={adj}
                  type="button"
                  onClick={() => toggleAdjective(adj)}
                  className={`px-3 py-1 rounded-lg text-xs font-black border-2 border-[#560e51] uppercase tracking-wider cursor-pointer shadow-[1.5px_1.5px_0px_0px_#560e51] ${
                    selected ? 'bg-[#9b2c98] text-white' : 'bg-white hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  {adj}
                </button>
              );
            })}
          </div>
        </div>

        {/* Presentation Script & Audio Box */}
        <div className="pt-4 border-t-2 border-[#560e51]/20 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <span className="text-xs font-black uppercase font-mono text-[#9b2c98]">Generated Architect Commentary:</span>
              <p className="text-xs font-bold text-slate-600">Practice speaking aloud for your oral presentation!</p>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={playSpeech}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-tight border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#560e51] flex items-center gap-2 cursor-pointer transition ${
                  isPlayingAudio ? 'bg-amber-400 text-[#560e51]' : 'bg-[#78c222] hover:bg-[#68ab1c] text-[#560e51]'
                }`}
              >
                <Volume2 className="h-4 w-4" />
                {isPlayingAudio ? 'Pause Speech' : 'Play Presentation 🔊'}
              </button>

              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 bg-[#560e51] hover:bg-[#43093f] text-white rounded-xl text-xs font-black uppercase tracking-tight shadow-[2px_2px_0px_0px_#560e51] flex items-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="h-4 w-4 text-[#78c222]" />
                {savedSuccess ? 'Saved! ✓' : 'Save Blueprint'}
              </button>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border-3 border-[#560e51] shadow-[3px_3px_0px_0px_#560e51]">
            <p className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed select-text">
              "Hello everyone! My dream home is called <span className="text-[#9b2c98] font-black bg-fuchsia-50 px-2 py-0.5 rounded border border-[#9b2c98]">{data.homeName}</span>. It is a <span className="text-[#43780a] font-black">{data.adjectives.slice(0, 2).join(' and ') || 'cosy'}</span> {data.homeType}, located <span className="font-semibold text-slate-700">{data.location}</span>. The walls and roof are made of <span className="text-indigo-900 font-bold">{data.materials.slice(0, 2).join(' and ') || 'stone and wood'}</span>. It has <span className="text-emerald-900 font-bold">{data.specialFeatures.slice(0, 2).join('. Also, it has ') || 'solar panels to make electricity'}</span>. Inside, there are <span className="text-purple-900 font-bold">{data.rooms.bedrooms} bedrooms</span> and <span className="text-purple-900 font-bold">{data.rooms.bathrooms} bathrooms</span>. When visitors visit, <span className="italic">{data.visitorImpression}</span>. I love my dream home because <span className="font-bold text-[#560e51]">{data.whyLove}</span>! Thank you!"
            </p>
          </div>
        </div>

        {/* Islamic Sanctuary Connection */}
        <div className="bg-emerald-50 rounded-2xl p-5 border-3 border-emerald-700 shadow-[4px_4px_0px_0px_#047857] space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">🏡</span>
            <h4 className="text-sm sm:text-base font-black text-emerald-950 uppercase tracking-tight">
              Homes as Divine Sanctuary (Surah An-Nahl 16:80)
            </h4>
          </div>
          <p className="text-center font-serif text-lg font-bold text-emerald-950 py-1">
            وَاللَّهُ جَعَلَ لَكُم مِّن بُيُوتِكُمْ سَكَنًا
          </p>
          <p className="text-xs sm:text-sm font-bold italic text-emerald-900 text-center">
            "And Allah has made for you from your homes a place of rest..."
          </p>
          <p className="text-xs font-semibold text-emerald-950 pt-2 border-t border-emerald-200">
            💡 <strong>Architect Reflection:</strong> In Islam, our homes are sacred shelters for family peace, hospitality to guests, and worshipping Allah SWT in safety and comfort.
          </p>
        </div>

      </div>
    </div>
  );
}

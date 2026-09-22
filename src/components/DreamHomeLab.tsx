import React, { useState } from 'react';
import { DreamHomeProjectData } from '../types';
import { sound } from './SoundManager';
import { humanVoice } from '../utils/humanVoice';
import { Home, Sparkles, Volume2, Printer, CheckCircle2, ShieldCheck, Heart, Sun, Droplets, Wind, Layers, Lightbulb, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

interface DreamHomeLabProps {
  initialData?: DreamHomeProjectData;
  onSave?: (data: DreamHomeProjectData) => void;
  genAlphaMode?: boolean;
}

const DEFAULT_PROJECT_DATA: DreamHomeProjectData = {
  homeName: 'The Green Hill House',
  homeType: 'Eco-House on a Hill',
  style: 'Eco-Friendly House',
  location: 'On a green hill near a quiet river',
  materials: ['Natural stone', 'Strong wood', 'Clay roof tiles', 'Glass windows'],
  adjectives: ['cosy', 'spacious', 'comfortable', 'eco-friendly'],
  specialFeatures: [
    'Solar panels on the roof to make electricity',
    'A rainwater tub outside to water plants',
    'Grass on the roof to keep the house warm',
    'Big round windows to let in bright sunlight'
  ],
  rooms: {
    bedrooms: 3,
    bathrooms: 2,
    functionalRooms: ['Study Room', 'Kitchen Pantry', 'Dining Room']
  },
  landWidth: 20,
  landLength: 30,
  visitorImpression: 'They feel happy, relaxed, and safe inside.',
  whyLove: 'It is warm, comfortable, and protects nature for my family.'
};

const HOME_TYPES = [
  'Eco-House on a Hill',
  'Cosy Country Cottage',
  'Stilt House over Water',
  'Nomadic Yurt (Tent)',
  'Modern Family House',
  'Apartment in the City'
];

const QUICK_LOCATIONS = [
  'On a green hill',
  'Near a quiet river',
  'By a sunny beach',
  'In a peaceful village',
  'In a big, busy city'
];

const AVAILABLE_MATERIALS = [
  'Natural stone',
  'Strong wood',
  'Clay roof tiles',
  'Glass windows',
  'Bamboo',
  'Red bricks',
  'Mud and straw'
];

const AVAILABLE_ECO_FEATURES = [
  'Solar panels on the roof to make electricity',
  'A rainwater tub outside to water plants',
  'Grass on the roof to keep the house warm',
  'Big round windows to let in bright sunlight',
  'A round wooden door to welcome friendly guests',
  'A compost bin to turn food scraps into soil',
  'Breeze windows to keep rooms cool without air conditioning'
];

const DESCRIPTIVE_ADJECTIVES = [
  { word: 'cosy', meaning: 'warm and safe' },
  { word: 'spacious', meaning: 'lots of room' },
  { word: 'comfortable', meaning: 'nice to relax in' },
  { word: 'peaceful', meaning: 'quiet and calm' },
  { word: 'modern', meaning: 'new style' },
  { word: 'colourful', meaning: 'bright colours' },
  { word: 'bright', meaning: 'full of sunlight' },
  { word: 'sturdy', meaning: 'strong and solid' }
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
    const featText = data.specialFeatures.length > 0 ? data.specialFeatures.slice(0, 2).join('. Also, it has ') : 'solar panels on the roof to make electricity';
    return `Hello everyone! My dream home is called ${data.homeName}. It is a ${adjText} ${data.homeType}, located ${data.location}. The walls and roof are made of ${matText}. Outside, it has ${featText}. Inside, there are ${data.rooms.bedrooms} bedrooms and ${data.rooms.bathrooms} bathrooms. When visitors come, ${data.visitorImpression}. I love my dream home because ${data.whyLove} Thank you!`;
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
          Unit 3 English Project • My Dream Home
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-950 mt-3 uppercase tracking-tight">
          Design Your Dream Eco-House! 📐🏡
        </h2>
        <p className="text-sm font-bold text-slate-700 mt-2 max-w-xl mx-auto">
          Design your dream green home, pick natural building materials, explain why you built each part (using <strong>to + verb</strong>), and practice speaking in English!
        </p>
      </div>

      {/* Blueprint Builder Form */}
      <div className="bg-[#fefaf0] rounded-[32px] p-6 sm:p-8 border-4 border-[#560e51] shadow-[8px_8px_0px_0px_#560e51] space-y-6">
        
        {/* Section 1: Basic Identity */}
        <div>
          <h3 className="text-xl font-black text-[#560e51] uppercase tracking-tight flex items-center gap-2 mb-4">
            <Home className="h-5 w-5 text-[#9b2c98]" /> 1. Name Your Home & Pick Location
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
                placeholder="e.g., The Green Hill House"
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
              <label className="block text-xs font-black uppercase font-mono text-[#560e51] mb-1 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-[#9b2c98]" />
                Where is your home? (Location):
              </label>
              <input
                type="text"
                value={data.location}
                onChange={(e) => setData({ ...data, location: e.target.value })}
                placeholder="e.g., On a green hill near a quiet river"
                className="w-full p-3 bg-white border-2 border-[#560e51] rounded-xl text-sm font-bold text-slate-950 focus:outline-none shadow-[2px_2px_0px_0px_#560e51] mb-2"
              />
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <span className="text-[11px] font-mono font-bold text-slate-500">Quick picks:</span>
                {QUICK_LOCATIONS.map(loc => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setData({ ...data, location: loc });
                    }}
                    className={`px-2.5 py-1 rounded-lg border text-xs font-bold transition cursor-pointer ${
                      data.location === loc
                        ? 'bg-[#9b2c98] text-white border-[#560e51]'
                        : 'bg-white hover:bg-fuchsia-50 text-slate-700 border-slate-300'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Materials */}
        <div className="pt-4 border-t-2 border-[#560e51]/20">
          <h3 className="text-xl font-black text-[#560e51] uppercase tracking-tight flex items-center gap-2 mb-2">
            <Layers className="h-5 w-5 text-[#43780a]" /> 2. Building Materials
          </h3>
          <p className="text-xs font-bold text-slate-700 mb-3">
            What are the walls and roof made of? Click to choose materials:
          </p>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_MATERIALS.map((mat) => {
              const selected = data.materials.includes(mat);
              return (
                <button
                  key={mat}
                  type="button"
                  onClick={() => toggleMaterial(mat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black border-2 border-[#560e51] cursor-pointer transition-all shadow-[2px_2px_0px_0px_#560e51] ${
                    selected ? 'bg-[#78c222] text-[#560e51]' : 'bg-white hover:bg-fuchsia-50 text-slate-800'
                  }`}
                >
                  {selected ? '✓ ' : '+ '} {mat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 3: Special Features (to + verb) */}
        <div className="pt-4 border-t-2 border-[#560e51]/20">
          <h3 className="text-xl font-black text-[#560e51] uppercase tracking-tight flex items-center gap-2 mb-2">
            <Sun className="h-5 w-5 text-amber-600" /> 3. Special Features (Tell why - use "to + verb")
          </h3>
          <p className="text-xs font-bold text-slate-700 mb-3">
            Pick special parts in your home and tell why you built them (use <strong>to + verb</strong>):
          </p>
          <div className="space-y-2">
            {AVAILABLE_ECO_FEATURES.map((feat) => {
              const selected = data.specialFeatures.includes(feat);
              return (
                <div
                  key={feat}
                  onClick={() => toggleFeature(feat)}
                  className={`p-3 rounded-xl border-2 border-[#560e51] flex items-center justify-between cursor-pointer transition shadow-[2px_2px_0px_0px_#560e51] ${
                    selected ? 'bg-lime-100 text-slate-950 font-black' : 'bg-white text-slate-800 font-bold hover:bg-fuchsia-50'
                  }`}
                >
                  <span className="text-xs sm:text-sm">{feat}</span>
                  <span className={`text-xs px-2.5 py-0.5 rounded font-mono font-black ${selected ? 'bg-[#43780a] text-white' : 'bg-slate-200 text-slate-700'}`}>
                    {selected ? 'ACTIVE ✓' : 'CHOOSE +'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 4: Describing Words (Adjectives) */}
        <div className="pt-4 border-t-2 border-[#560e51]/20">
          <h3 className="text-xl font-black text-[#560e51] uppercase tracking-tight flex items-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-[#9b2c98]" /> 4. Describing Words (Adjectives)
          </h3>
          <p className="text-xs font-bold text-slate-700 mb-3">
            Choose words to describe your house (meanings are shown in simple English):
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {DESCRIPTIVE_ADJECTIVES.map(({ word, meaning }) => {
              const selected = data.adjectives.includes(word);
              return (
                <button
                  key={word}
                  type="button"
                  onClick={() => toggleAdjective(word)}
                  className={`p-2.5 rounded-xl text-left border-2 border-[#560e51] cursor-pointer transition shadow-[2px_2px_0px_0px_#560e51] ${
                    selected ? 'bg-[#9b2c98] text-white' : 'bg-white hover:bg-slate-50 text-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider">{word}</span>
                    {selected && <span className="text-xs font-bold">✓</span>}
                  </div>
                  <span className={`text-[11px] block mt-0.5 font-medium ${selected ? 'text-fuchsia-100' : 'text-slate-500'}`}>
                    ({meaning})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 5: Rooms Count */}
        <div className="pt-4 border-t-2 border-[#560e51]/20">
          <h3 className="text-xl font-black text-[#560e51] uppercase tracking-tight flex items-center gap-2 mb-3">
            <Home className="h-5 w-5 text-indigo-700" /> 5. Rooms Inside Your Home
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 bg-white border-2 border-[#560e51] rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-black uppercase font-mono text-[#560e51] block">Bedrooms:</span>
                <span className="text-xs font-bold text-slate-600">Rooms for sleeping</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setData(prev => ({
                      ...prev,
                      rooms: { ...prev.rooms, bedrooms: Math.max(1, prev.rooms.bedrooms - 1) }
                    }));
                  }}
                  className="w-7 h-7 bg-slate-100 hover:bg-slate-200 border border-slate-400 rounded-lg font-black text-sm text-[#560e51]"
                >
                  -
                </button>
                <span className="font-mono font-black text-base text-[#560e51] px-1">{data.rooms.bedrooms}</span>
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setData(prev => ({
                      ...prev,
                      rooms: { ...prev.rooms, bedrooms: prev.rooms.bedrooms + 1 }
                    }));
                  }}
                  className="w-7 h-7 bg-slate-100 hover:bg-slate-200 border border-slate-400 rounded-lg font-black text-sm text-[#560e51]"
                >
                  +
                </button>
              </div>
            </div>

            <div className="p-3 bg-white border-2 border-[#560e51] rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-black uppercase font-mono text-[#560e51] block">Bathrooms:</span>
                <span className="text-xs font-bold text-slate-600">Rooms for washing</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setData(prev => ({
                      ...prev,
                      rooms: { ...prev.rooms, bathrooms: Math.max(1, prev.rooms.bathrooms - 1) }
                    }));
                  }}
                  className="w-7 h-7 bg-slate-100 hover:bg-slate-200 border border-slate-400 rounded-lg font-black text-sm text-[#560e51]"
                >
                  -
                </button>
                <span className="font-mono font-black text-base text-[#560e51] px-1">{data.rooms.bathrooms}</span>
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setData(prev => ({
                      ...prev,
                      rooms: { ...prev.rooms, bathrooms: prev.rooms.bathrooms + 1 }
                    }));
                  }}
                  className="w-7 h-7 bg-slate-100 hover:bg-slate-200 border border-slate-400 rounded-lg font-black text-sm text-[#560e51]"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 6: Presentation Speech & Audio */}
        <div className="pt-4 border-t-2 border-[#560e51]/20 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <span className="text-xs font-black uppercase font-mono text-[#9b2c98]">6. Your English Speech 🎤</span>
              <p className="text-xs font-bold text-slate-700">Practice reading your speech aloud! Click the play button to hear how it sounds.</p>
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
                {isPlayingAudio ? 'Pause Speech' : 'Listen to Speech 🔊'}
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
              "Hello everyone! My dream home is called <span className="text-[#9b2c98] font-black bg-fuchsia-50 px-2 py-0.5 rounded border border-[#9b2c98]">{data.homeName}</span>. It is a <span className="text-[#43780a] font-black">{data.adjectives.slice(0, 2).join(' and ') || 'cosy'}</span> {data.homeType}, located <span className="font-semibold text-slate-700">{data.location}</span>. The walls and roof are made of <span className="text-indigo-900 font-bold">{data.materials.slice(0, 2).join(' and ') || 'stone and wood'}</span>. Outside, it has <span className="text-emerald-900 font-bold">{data.specialFeatures.slice(0, 2).join('. Also, it has ') || 'solar panels on the roof to make electricity'}</span>. Inside, there are <span className="text-purple-900 font-bold">{data.rooms.bedrooms} bedrooms</span> and <span className="text-purple-900 font-bold">{data.rooms.bathrooms} bathrooms</span>. When visitors come, <span className="italic">{data.visitorImpression}</span>. I love my dream home because <span className="font-bold text-[#560e51]">{data.whyLove}</span> Thank you!"
            </p>
          </div>
        </div>

        {/* EFL Word Helper Card */}
        <div className="bg-amber-50 rounded-2xl p-5 border-3 border-amber-600 shadow-[3px_3px_0px_0px_#d97706] space-y-2">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-700" />
            <h4 className="text-xs sm:text-sm font-black text-amber-950 uppercase tracking-tight">
              EFL Word Helper (English Made Easy) 💡
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-amber-950">
            <div className="p-2.5 bg-white/80 rounded-xl border border-amber-300">
              <span className="font-black text-amber-900 block font-mono">1. to + verb (Tell Why):</span>
              <p className="mt-0.5 leading-snug">
                Use <strong>to + verb</strong> to explain <em>why</em> you do something.<br />
                <em>Example:</em> We have solar panels <strong>to make electricity</strong>.
              </p>
            </div>
            <div className="p-2.5 bg-white/80 rounded-xl border border-amber-300">
              <span className="font-black text-amber-900 block font-mono">2. cosy (Adjective):</span>
              <p className="mt-0.5 leading-snug">
                A home that feels warm, safe, and sweet inside.<br />
                <em>Example:</em> My bedroom is very <strong>cosy</strong> with soft pillows.
              </p>
            </div>
            <div className="p-2.5 bg-white/80 rounded-xl border border-amber-300">
              <span className="font-black text-amber-900 block font-mono">3. spacious (Adjective):</span>
              <p className="mt-0.5 leading-snug">
                A room that has lots of space to play and walk.<br />
                <em>Example:</em> We have a <strong>spacious</strong> living room.
              </p>
            </div>
            <div className="p-2.5 bg-white/80 rounded-xl border border-amber-300">
              <span className="font-black text-amber-900 block font-mono">4. eco-house (Noun):</span>
              <p className="mt-0.5 leading-snug">
                A green house that saves energy and helps nature.<br />
                <em>Example:</em> An <strong>eco-house</strong> uses sun and rain energy.
              </p>
            </div>
          </div>
        </div>

        {/* Islamic Sanctuary Connection */}
        <div className="bg-emerald-50 rounded-2xl p-5 border-3 border-emerald-700 shadow-[4px_4px_0px_0px_#047857] space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">🏡</span>
            <h4 className="text-sm sm:text-base font-black text-emerald-950 uppercase tracking-tight">
              Homes as a Place of Rest (Surah An-Nahl 16:80)
            </h4>
          </div>
          <p className="text-center font-serif text-lg font-bold text-emerald-950 py-1">
            وَاللَّهُ جَعَلَ لَكُم مِّن بُيُوتِكُمْ سَكَنًا
          </p>
          <p className="text-xs sm:text-sm font-bold italic text-emerald-900 text-center">
            "And Allah has made for you from your homes a place of rest..."
          </p>
          <p className="text-xs font-semibold text-emerald-950 pt-2 border-t border-emerald-200">
            💡 <strong>Muslim Student Reflection:</strong> In Islam, our homes are peaceful shelters to love our family, show kindness to guests, and thank Allah SWT for all His blessings.
          </p>
        </div>

      </div>
    </div>
  );
}

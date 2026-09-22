import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  GraduationCap, 
  Users, 
  Play, 
  CheckCircle, 
  Volume2, 
  VolumeX, 
  Award, 
  Maximize2, 
  Minimize2, 
  Menu, 
  X,
  Sparkles,
  Bookmark
} from 'lucide-react';
import { sound } from './SoundManager';

interface AnimatedMasteryBarProps {
  masteryPercentage: number;
  barWidthClass?: string;
  isMobile?: boolean;
}

function AnimatedMasteryBar({ masteryPercentage, barWidthClass = 'w-28 sm:w-36', isMobile = false }: AnimatedMasteryBarProps) {
  const [displayPercentage, setDisplayPercentage] = useState(masteryPercentage);
  const [recentGain, setRecentGain] = useState<number | null>(null);
  const [isPulsing, setIsPulsing] = useState(false);
  const prevPercentageRef = useRef(masteryPercentage);

  // Detect score updates and trigger celebratory visual feedback
  useEffect(() => {
    if (masteryPercentage !== prevPercentageRef.current) {
      const diff = masteryPercentage - prevPercentageRef.current;
      prevPercentageRef.current = masteryPercentage;
      if (diff > 0) {
        setRecentGain(diff);
        setIsPulsing(true);
        const pulseTimer = setTimeout(() => setIsPulsing(false), 1600);
        const gainTimer = setTimeout(() => setRecentGain(null), 3000);
        return () => {
          clearTimeout(pulseTimer);
          clearTimeout(gainTimer);
        };
      }
    }
  }, [masteryPercentage]);

  // Smooth numerical count-up animation
  useEffect(() => {
    const startVal = displayPercentage;
    const targetVal = masteryPercentage;
    if (startVal === targetVal) return;

    const duration = 850; // ms for smooth human-friendly count
    const startTime = performance.now();
    let frameId: number;

    const animateNumber = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutQuart for super gentle deceleration
      const ease = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(startVal + (targetVal - startVal) * ease);
      setDisplayPercentage(current);

      if (progress < 1) {
        frameId = requestAnimationFrame(animateNumber);
      } else {
        setDisplayPercentage(targetVal);
      }
    };

    frameId = requestAnimationFrame(animateNumber);
    return () => cancelAnimationFrame(frameId);
  }, [masteryPercentage]);

  return (
    <div className="relative select-none">
      <motion.div
        animate={isPulsing ? { scale: [1, 1.07, 0.98, 1], y: [0, -2, 0] } : { scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`flex items-center space-x-2 sm:space-x-2.5 p-1.5 sm:p-2 rounded-xl border-2 transition-all duration-300 ${
          isPulsing
            ? 'bg-lime-50 border-[#78c222] ring-4 ring-[#78c222]/30 shadow-[0_0_12px_rgba(120,194,34,0.5)]'
            : 'bg-[#fefaf0] border-[#560e51] shadow-[2px_2px_0px_0px_#560e51]'
        }`}
      >
        <div className="flex items-center gap-1 shrink-0">
          <Sparkles className={`h-3.5 w-3.5 transition-colors ${isPulsing ? 'text-[#78c222] fill-[#78c222] animate-bounce' : 'text-[#9b2c98]'}`} />
          {!isMobile && (
            <span className="text-[10px] font-mono font-black uppercase text-[#560e51] hidden xl:inline">
              Mastery:
            </span>
          )}
        </div>

        <div className={`relative h-3 sm:h-3.5 ${barWidthClass} bg-fuchsia-100 border border-[#560e51] rounded-full overflow-hidden shrink-0`}>
          {/* Animated fill bar using spring transition */}
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#78c222] via-[#8ae625] to-[#78c222] rounded-full relative overflow-hidden"
            initial={false}
            animate={{ width: `${displayPercentage}%` }}
            transition={{
              type: 'spring',
              stiffness: 45,
              damping: 14,
              mass: 0.8
            }}
          >
            {/* Glowing leading edge tip */}
            {displayPercentage > 3 && (
              <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/80 rounded-full shadow-[0_0_6px_#fff]" />
            )}

            {/* Shimmer sweep effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent w-full h-full"
              initial={{ x: '-100%' }}
              animate={isPulsing ? { x: ['-100%', '200%'] } : { x: '-100%' }}
              transition={{ duration: 1.0, ease: 'easeInOut', repeat: isPulsing ? 2 : 0 }}
            />
          </motion.div>
        </div>

        <span className="text-xs font-black uppercase font-mono text-[#560e51] min-w-[2.5rem] text-right">
          {displayPercentage}%
        </span>
      </motion.div>

      {/* Floating score update indicator (+X% Mastery) */}
      <AnimatePresence>
        {recentGain !== null && (
          <motion.div
            key="gain-toast"
            initial={{ opacity: 0, y: 8, scale: 0.7 }}
            animate={{ opacity: 1, y: isMobile ? -28 : -24, scale: 1 }}
            exit={{ opacity: 0, y: isMobile ? -42 : -36, scale: 0.8 }}
            transition={{ duration: 0.45, ease: 'backOut' }}
            className="absolute -top-1 right-0 bg-[#78c222] text-[#560e51] border-2 border-[#560e51] text-[10px] font-black font-mono px-2.5 py-0.5 rounded-full shadow-[2px_2px_0px_0px_#560e51] flex items-center gap-1 z-40 pointer-events-none whitespace-nowrap"
          >
            <Sparkles className="h-2.5 w-2.5 fill-current text-[#560e51] animate-spin" />
            <span>+{recentGain}% Mastery!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface HeaderProps {
  isTeacherMode: boolean;
  setIsTeacherMode: (val: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  masteryPercentage: number;
  genAlphaMode: boolean;
  setGenAlphaMode: (val: boolean) => void;
  isHeaderCollapsed: boolean;
  setIsHeaderCollapsed: (val: boolean) => void;
}

export default function Header({
  isTeacherMode,
  setIsTeacherMode,
  soundEnabled,
  setSoundEnabled,
  activeTab,
  setActiveTab,
  masteryPercentage,
  genAlphaMode,
  setGenAlphaMode,
  isHeaderCollapsed,
  setIsHeaderCollapsed
}: HeaderProps) {
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    const newVal = !soundEnabled;
    setSoundEnabled(newVal);
    sound.enabled = newVal;
    sound.playClick();
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard 🏠', icon: GraduationCap },
    { id: 'flashcards', label: 'Vocab & Homes 🏡', icon: BookOpen },
    { id: 'grammar', label: 'Grammar Labs ⚙️', icon: CheckCircle },
    { id: 'literature', label: 'Literature Study 📖', icon: Bookmark },
    { id: 'dream-home', label: 'Dream Home 📐', icon: Award },
    ...(isTeacherMode ? [{ id: 'spelling-bee', label: 'Spelling Bee 🐝', icon: Sparkles }] : []),
    { id: 'arcade', label: 'Classroom Games 🎮', icon: Play },
    { id: 'mock-sat', label: 'Mock Assessment 📝', icon: Award }
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    sound.playClick();
  };

  return (
    <header className="bg-white text-slate-900 border-b-4 border-[#560e51] sticky top-0 z-50 shadow-[0_4px_0_0_#560e51]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP BRANDING BAR */}
        <div className={`flex items-center justify-between py-3.5 md:py-4.5 ${isHeaderCollapsed ? 'lg:hidden' : 'border-b-2 border-fuchsia-200'}`}>
          <div className="flex items-center space-x-3.5">
            <div className="bg-[#9b2c98] text-white p-3 rounded-2xl border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#560e51] flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-[#78c222] animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-[#9b2c98] block leading-none font-mono">Unit 3 ESL Grade 4 · Homes (SDIT Auliya Semester 1)</span>
              <h1 className="text-lg md:text-2xl font-black font-sans tracking-tight text-slate-950 uppercase flex items-center gap-2 mt-1">
                <span>English Review Terminal</span>
                <span className="hidden sm:inline-block bg-[#78c222] text-[#560e51] text-xs font-black tracking-widest px-3 py-0.5 rounded-full border-2 border-[#560e51] shadow-[1.5px_1.5px_0px_0px_#560e51]">Unit 3: Homes</span>
              </h1>
            </div>
          </div>

          {/* Right Action Widgets for Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Mode Switcher */}
            <div className="bg-[#fdf2fe] p-1 rounded-xl border-2 border-[#560e51] flex items-center shadow-[2px_2px_0px_0px_#560e51]">
              <button
                id="btn-student-mode-desktop"
                onClick={() => {
                  setIsTeacherMode(false);
                  sound.playClick();
                }}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wide transition-all cursor-pointer ${
                  !isTeacherMode
                    ? 'bg-[#78c222] text-[#560e51] border-2 border-[#560e51] shadow-[1px_1px_0px_0px_#560e51]'
                    : 'text-[#9b2c98] hover:text-[#560e51] border-2 border-transparent'
                }`}
              >
                <BookOpen className="h-4 w-4" />
                <span>Student</span>
              </button>
              
              <button
                id="btn-teacher-mode-desktop"
                onClick={() => {
                  setIsTeacherMode(true);
                  sound.playClick();
                }}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wide transition-all cursor-pointer ${
                  isTeacherMode
                    ? 'bg-[#9b2c98] text-white border-2 border-[#560e51] shadow-[1px_1px_0px_0px_#560e51]'
                    : 'text-[#9b2c98] hover:text-[#560e51] border-2 border-transparent'
                }`}
              >
                <Users className="h-4 w-4" />
                <span>Teacher</span>
              </button>
            </div>

            {/* Aura Mode Switch */}
            <button
              id="btn-alpha-mode-desktop"
              onClick={() => {
                const newValue = !genAlphaMode;
                setGenAlphaMode(newValue);
                if (newValue) {
                  sound.playCorrect();
                } else {
                  sound.playClick();
                }
              }}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wide transition-all cursor-pointer border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#560e51] active:translate-y-[1px] active:shadow-none ${
                genAlphaMode
                  ? 'bg-fuchsia-200 text-[#560e51] font-black animate-pulse'
                  : 'bg-white hover:bg-fuchsia-50 text-[#560e51]'
              }`}
            >
              <span>🧠⚡ Aura</span>
              <span className={`text-[10px] px-1 rounded border border-[#560e51] font-black ${genAlphaMode ? 'bg-white text-[#560e51]' : 'bg-fuchsia-100 text-[#9b2c98]'}`}>
                {genAlphaMode ? 'ON' : 'OFF'}
              </span>
            </button>

            {/* Sound Toggler */}
            <button
              id="btn-sound-toggle-desktop"
              onClick={toggleSound}
              className={`p-2.5 rounded-xl border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#560e51] transition-all cursor-pointer active:translate-y-[1px] active:shadow-none ${
                soundEnabled
                  ? 'bg-[#78c222] hover:bg-[#68ab1c] text-[#560e51]'
                  : 'bg-slate-200 hover:bg-slate-300 text-slate-600'
              }`}
              title={soundEnabled ? 'Mute' : 'Unmute'}
            >
              {soundEnabled ? <Volume2 className="h-4 w-4 text-[#560e51]" /> : <VolumeX className="h-4 w-4 text-slate-500" />}
            </button>
            
            {/* Progress Bar Container with Smooth Animation */}
            <AnimatedMasteryBar masteryPercentage={masteryPercentage} barWidthClass="w-28 sm:w-36" />
          </div>

          {/* Mobile Controller Triggers */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden">
            {/* Mobile Header Mastery Indicator */}
            <AnimatedMasteryBar masteryPercentage={masteryPercentage} barWidthClass="w-10 sm:w-16" isMobile={true} />

            <button
              onClick={toggleSound}
              className={`p-2 rounded-xl border-2 border-[#560e51] shadow-[1px_1px_0px_0px_#560e51] transition-all cursor-pointer shrink-0 ${
                soundEnabled ? 'bg-[#78c222] text-[#560e51]' : 'bg-slate-200 text-slate-500'
              }`}
            >
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>

            <button
              onClick={() => {
                setIsHeaderCollapsed(!isHeaderCollapsed);
                sound.playClick();
              }}
              className={`p-2 rounded-xl border-2 border-[#560e51] shadow-[1px_1px_0px_0px_#560e51] transition-all cursor-pointer shrink-0 ${
                isHeaderCollapsed ? 'bg-fuchsia-200 text-[#560e51]' : 'bg-[#560e51] text-white'
              }`}
              title="Compact View"
            >
              {isHeaderCollapsed ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </button>

            <button
              id="btn-mobile-menu-toggle"
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                sound.playClick();
              }}
              className="p-2 rounded-xl border-2 border-[#560e51] bg-fuchsia-100 hover:bg-fuchsia-200 text-[#560e51] shadow-[2px_2px_0px_0px_#560e51] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer shrink-0"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 stroke-[2.5]" />
              ) : (
                <Menu className="h-5 w-5 stroke-[2.5]" />
              )}
            </button>
          </div>
        </div>

        {/* DESKTOP TABS BAR */}
        {!isHeaderCollapsed && (
          <div className="hidden lg:block py-2.5">
            <div className="flex items-center justify-between">
              <nav className="flex space-x-3 overflow-x-auto no-scrollbar py-1" aria-label="Tabs">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  
                  let tabBg = 'bg-white border-2 border-[#560e51] text-[#560e51] font-bold shadow-[2px_2px_0px_0px_#560e51] hover:bg-fuchsia-50 hover:translate-y-[-1px]';
                  if (isActive) {
                    tabBg = 'bg-[#9b2c98] text-white font-black border-2 border-[#560e51] shadow-[3px_3px_0px_0px_#78c222] translate-y-[-1px]';
                  }

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleTabClick(item.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-black uppercase tracking-tight transition-all duration-150 whitespace-nowrap cursor-pointer ${tabBg}`}
                    >
                      <Icon className="h-4.5 w-4.5 shrink-0" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              <button
                onClick={() => {
                  setIsHeaderCollapsed(!isHeaderCollapsed);
                  sound.playClick();
                }}
                className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer border-2 border-[#560e51] bg-[#560e51] text-[#78c222] shadow-[2px_2px_0px_0px_#560e51] active:translate-y-[1px] active:shadow-none shrink-0"
              >
                <Minimize2 className="h-4 w-4 shrink-0" />
                <span>FOCUS 📺</span>
              </button>
            </div>
          </div>
        )}

        {/* MOBILE NAVIGATION DROPDOWN DRAWER */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t-2 border-[#560e51] py-4 pb-5 space-y-4 animate-fade-in select-none">
            <div className="space-y-2">
              <p className="text-xs font-black uppercase tracking-widest text-[#9b2c98] font-mono pl-1.5">Navigation Menu</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  
                  let tabBg = 'bg-white border-2 border-[#560e51] text-[#560e51] font-extrabold hover:bg-fuchsia-50 shadow-[2px_2px_0px_0px_#560e51]';
                  if (isActive) {
                    tabBg = 'bg-[#9b2c98] text-white border-2 border-[#560e51] font-black shadow-[2px_2px_0px_0px_#78c222]';
                  }

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleTabClick(item.id)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-black uppercase tracking-tight transition-all cursor-pointer w-full text-left ${tabBg}`}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-3 border-t-2 border-dashed border-fuchsia-300 space-y-3">
              <p className="text-xs font-black uppercase tracking-widest text-[#9b2c98] font-mono pl-1.5">Classroom & Sync</p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="bg-fuchsia-100 p-1.5 rounded-xl border-2 border-[#560e51] flex items-center justify-between flex-1 shadow-[2px_2px_0px_0px_#560e51]">
                  <span className="text-xs uppercase font-mono font-black text-[#560e51] pl-2">Role:</span>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => {
                        setIsTeacherMode(false);
                        sound.playClick();
                      }}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wide transition-all ${
                        !isTeacherMode ? 'bg-[#78c222] text-[#560e51] border border-[#560e51]' : 'text-[#9b2c98]'
                      }`}
                    >
                      Student
                    </button>
                    <button
                      onClick={() => {
                        setIsTeacherMode(true);
                        sound.playClick();
                      }}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wide transition-all ${
                        isTeacherMode ? 'bg-[#9b2c98] text-white border border-[#560e51]' : 'text-[#9b2c98]'
                      }`}
                    >
                      Teacher
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => {
                    const newValue = !genAlphaMode;
                    setGenAlphaMode(newValue);
                    if (newValue) { sound.playCorrect(); } else { sound.playClick(); }
                  }}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wide transition-all border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#560e51] flex-1 ${
                    genAlphaMode ? 'bg-fuchsia-300 text-[#560e51] animate-pulse' : 'bg-white text-[#560e51]'
                  }`}
                >
                  <span>🧠⚡ Toggle Aura Mode</span>
                  <span className="text-xs bg-white px-2 py-0.5 rounded border border-[#560e51] font-black">{genAlphaMode ? "ON" : "OFF"}</span>
                </button>
              </div>

              <div className="bg-[#fefaf0] border-2 border-[#560e51] p-3 rounded-xl flex items-center justify-between shadow-[2px_2px_0px_0px_#560e51]">
                <span className="text-xs font-black uppercase tracking-wider text-[#560e51]">Mastery Level</span>
                <AnimatedMasteryBar masteryPercentage={masteryPercentage} barWidthClass="w-28" isMobile={true} />
              </div>
            </div>

          </div>
        )}

      </div>
    </header>
  );
}

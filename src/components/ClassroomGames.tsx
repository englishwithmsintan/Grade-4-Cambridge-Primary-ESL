import React, { useState, useEffect, useRef } from 'react';
import { sound } from './SoundManager';
import { humanVoice } from '../utils/humanVoice';
import {
  Play,
  Pause,
  Timer,
  Trophy,
  Volume2,
  Sparkles,
  Clock,
  CheckCircle2,
  XCircle,
  Flame,
  Eye,
  EyeOff,
  Award,
  HelpCircle,
  Home,
  Sun,
  Layers,
  Search,
  BookOpen,
  Scale,
  Zap,
  RotateCcw,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ClassroomGamesProps {
  isTeacherMode: boolean;
  onGamePlayed: (gameKey: string) => void;
  teamScores: { teamA: number; teamB: number };
  setTeamScores: React.Dispatch<React.SetStateAction<{ teamA: number; teamB: number }>>;
  genAlphaMode?: boolean;
}

export default function ClassroomGames({
  isTeacherMode,
  onGamePlayed,
  teamScores,
  setTeamScores,
  genAlphaMode = false
}: ClassroomGamesProps) {
  const [activeGame, setActiveGame] = useState<
    'mystery' | 'purpose' | 'fact-opinion' | 'deduction' | 'wheel' | 'hotseat'
  >('mystery');

  // Helper to adjust team scores globally
  const awardPoint = (team: 'A' | 'B', pts: number) => {
    if (pts > 0) sound.playCorrect();
    else sound.playWrong();
    setTeamScores(prev => ({
      ...prev,
      teamA: team === 'A' ? Math.max(0, prev.teamA + pts) : prev.teamA,
      teamB: team === 'B' ? Math.max(0, prev.teamB + pts) : prev.teamB
    }));
  };

  // Helper to speak text aloud with natural human voice
  const speakText = (text: string) => {
    humanVoice.speak(text, { rate: 0.9 });
  };

  // ===========================================================================
  // GAME 1: WHOSE HOME IS THIS? (Mystery Dwelling Clue Hunt 🕵️🏡)
  // ===========================================================================
  const mysteryCases = [
    {
      id: 1,
      name: 'A Traditional Mongolian Yurt',
      character: 'Bataar the Nomadic Herder',
      avatar: '🏕️',
      lesson: 'Lesson 3.1: Types of Homes',
      clues: [
        { level: 'Clue 1 (Hard · 300 pts)', text: 'I am a nomad who travels across the windy, cold Asian steppes with my sheep and horses. My home can be completely taken down and packed onto animals in less than two hours!' },
        { level: 'Clue 2 (Medium · 200 pts)', text: 'The circular walls are made of wooden lattice frames covered in thick sheep’s wool felt to keep us warm in temperatures below freezing.' },
        { level: 'Clue 3 (Easy · 100 pts)', text: 'My home has a round hole in the exact center of the roof so smoke from our heating stove can escape into the blue sky.' }
      ],
      options: ['A Traditional Yurt', 'A Houseboat', 'A Detached Bungalow', 'An Ancient Castle'],
      funFact: 'Yurts (called "ger" in Mongolian) have been used for over 3,000 years! Their round aerodynamic shape prevents strong winds from blowing them over.'
    },
    {
      id: 2,
      name: 'A Tropical Stilt House',
      character: 'Somchai from Bangkok, Thailand',
      avatar: '🛶',
      lesson: 'Lesson 3.1: Global Adaptations',
      clues: [
        { level: 'Clue 1 (Hard · 300 pts)', text: 'During the heavy tropical monsoon rains, the river rises several meters high, but my family’s bedroom and kitchen stay completely dry and safe.' },
        { level: 'Clue 2 (Medium · 200 pts)', text: 'To enter my front door, visitors must climb up a sturdy wooden ladder from the ground or step directly out of a river canoe.' },
        { level: 'Clue 3 (Easy · 100 pts)', text: 'Our entire house is raised high above the mud and water on tall wooden or bamboo poles called stilts.' }
      ],
      options: ['A Stilt House', 'A Terraced Townhouse', 'An Apartment Flat', 'A Nomadic Yurt'],
      funFact: 'Stilt houses not only protect against flash floods, but the open space underneath allows cooling breezes to circulate, keeping the home cool naturally.'
    },
    {
      id: 3,
      name: 'An Amsterdam Canal Houseboat',
      character: 'Anouk from the Netherlands',
      avatar: '⚓',
      lesson: 'Lesson 3.1: Waterfront Homes',
      clues: [
        { level: 'Clue 1 (Hard · 300 pts)', text: 'I don’t have a front lawn or a driveway with a garage. Instead, wild ducks and swans swim right past my living room window every morning!' },
        { level: 'Clue 2 (Medium · 200 pts)', text: 'My home is tied securely to iron mooring posts with strong thick ropes so it doesn’t drift down the city waterways when boats pass by.' },
        { level: 'Clue 3 (Easy · 100 pts)', text: 'It has a floating concrete or steel hull underneath. It is a boat that has been permanently transformed into a cosy family home!' }
      ],
      options: ['A Canal Houseboat', 'A Mountain Cottage', 'A Nomadic Caravan', 'A Stilt House'],
      funFact: 'Amsterdam has more than 2,500 registered houseboats! Many even have small floating gardens with flowers and vegetable patches.'
    },
    {
      id: 4,
      name: 'Bilbo Baggins’ Hobbit-Hole (Bag End)',
      character: 'Bilbo Baggins from the Shire',
      avatar: '🧝',
      lesson: 'Lesson 3.5: Literature (The Hobbit)',
      clues: [
        { level: 'Clue 1 (Hard · 300 pts)', text: 'This residence is not a dirty, wet, wormy hole, nor a dry, bare, sandy hole with nothing to sit on. It is synonymous with pure comfort!' },
        { level: 'Clue 2 (Medium · 200 pts)', text: 'Inside the long tunnel hall, you will see polished chairs, carpeted floors, lots of pegs for hats and coats, and multiple pantries stacked with delicious cakes.' },
        { level: 'Clue 3 (Easy · 100 pts)', text: 'The front door is perfectly round like a porthole, painted bright green with a shiny yellow brass knob situated in the exact middle!' }
      ],
      options: ['Hobbit-Hole (Bag End)', 'The Colosseum', 'The Upside-Down House', 'A Modern Penthouse'],
      funFact: 'In J.R.R. Tolkien’s novel, Bag End was built into The Hill by Bilbo’s father, Bungo Baggins. Hobbits loved hosting guests and eating second breakfasts!'
    },
    {
      id: 5,
      name: 'The Ancient Colosseum',
      character: 'Marcus the Roman Architect',
      avatar: '🏛️',
      lesson: 'Lesson 3.4: Ancient Landmarks',
      clues: [
        { level: 'Clue 1 (Hard · 300 pts)', text: 'Construction began nearly 2,000 years ago in the heart of our capital city using millions of Roman bricks, heavy stone, and volcanic sand.' },
        { level: 'Clue 2 (Medium · 200 pts)', text: 'Over 50,000 cheering citizens packed inside the enormous four-storey tiered arches to witness gladiators and spectacles in the sand arena.' },
        { level: 'Clue 3 (Easy · 100 pts)', text: 'It is the most famous elliptical amphitheatre in Rome, Italy, visited by more than 6 million tourists every year!' }
      ],
      options: ['The Roman Colosseum', 'The Haines Shoe House', 'A British Bungalow', 'An Eco-House'],
      funFact: 'The Colosseum had 80 entrance arches so the entire crowd of 50,000 spectators could exit the building in just 15 minutes!'
    },
    {
      id: 6,
      name: 'The Modern Hillside Eco-House',
      character: 'Amina the Sustainable Architect',
      avatar: '🌱',
      lesson: 'Lesson 3.2: The Eco-House',
      clues: [
        { level: 'Clue 1 (Hard · 300 pts)', text: 'Our building has no gas pipes and creates zero pollution. We used local stone, reclaimed timber, and straw bale insulation to build the walls.' },
        { level: 'Clue 2 (Medium · 200 pts)', text: 'On the roof, there is living grass turf to trap warmth in winter, and dark glass panels that absorb sunlight to power all our appliances.' },
        { level: 'Clue 3 (Easy · 100 pts)', text: 'Outside, a large rainwater tub catches rainfall to water our vegetable patch, and south-facing double-glazed windows capture heat.' }
      ],
      options: ['An Eco-House', 'A Terraced House', 'A Nomadic Yurt', 'A Traditional Igloo'],
      funFact: 'Eco-houses are designed using passive solar design: large windows face the sun during the day to heat the floor tiles, radiating heat during chilly nights.'
    },
    {
      id: 7,
      name: 'The Haines Shoe House',
      character: 'Mahlon Haines the Flamboyant Cobbler',
      avatar: '👞',
      lesson: 'Lesson 3.3: Strange Buildings',
      clues: [
        { level: 'Clue 1 (Hard · 300 pts)', text: 'Built in 1948 in Pennsylvania, USA, this eccentric building was constructed as a brilliant advertising stunt by a wealthy salesman.' },
        { level: 'Clue 2 (Medium · 200 pts)', text: 'It is 25 feet tall and has five levels: the living room is in the toe, the kitchen is in the heel, and the bedrooms are up in the ankle!' },
        { level: 'Clue 3 (Easy · 100 pts)', text: 'From the road, it looks exactly like an enormous giant leather work boot with stained glass windows showing footwear!' }
      ],
      options: ['The Haines Shoe House', 'The Basket Building', 'The Upside-Down House', 'A Thatched Cottage'],
      funFact: 'Mahlon Haines handed an architect an old work shoe and said: "Build me a house that looks just like this!" Honeymoon couples even stayed there for free!'
    },
    {
      id: 8,
      name: 'A Single-Storey Country Bungalow',
      character: 'Grandpa George & Grandma Mary',
      avatar: '🏡',
      lesson: 'Lesson 3.1: Residential Homes',
      clues: [
        { level: 'Clue 1 (Hard · 300 pts)', text: 'We recently moved out of our three-storey townhouse because our knees hurt and we were tired of climbing 40 steps every bedtime.' },
        { level: 'Clue 2 (Medium · 200 pts)', text: 'All of our bedrooms, kitchen, bathroom, and sitting room are conveniently laid out on one single flat ground level with easy garden access.' },
        { level: 'Clue 3 (Easy · 100 pts)', text: 'The word comes from the Hindi word "bangla" (belonging to Bengal). It is a standalone home with absolutely NO upper floors or stairs!' }
      ],
      options: ['A Bungalow', 'An Apartment', 'A Semi-Detached House', 'A Stilt House'],
      funFact: 'Bungalows originated in Bengal, India in the 17th century as single-storey cottages built for sailors and travelers, featuring wide covered verandas.'
    }
  ];

  const [mysteryIdx, setMysteryIdx] = useState(0);
  const [unlockedClueLevel, setUnlockedClueLevel] = useState<number>(1);
  const [mysteryRevealed, setMysteryRevealed] = useState(false);
  const [selectedGuess, setSelectedGuess] = useState<string | null>(null);

  const currentCase = mysteryCases[mysteryIdx];

  const handleGuess = (option: string) => {
    onGamePlayed('mystery');
    setSelectedGuess(option);
    if (option === currentCase.name || option.includes(currentCase.name.split(' ')[1]) || currentCase.name.includes(option)) {
      sound.playFanfare();
      setMysteryRevealed(true);
    } else {
      sound.playWrong();
    }
  };

  const nextMysteryCase = () => {
    sound.playClick();
    setMysteryIdx(p => (p < mysteryCases.length - 1 ? p + 1 : 0));
    setUnlockedClueLevel(1);
    setMysteryRevealed(false);
    setSelectedGuess(null);
  };

  // ===========================================================================
  // GAME 2: ECO-ARCHITECT: THE PURPOSE CLAUSE MATCHER ⚡🔨
  // Tests Infinitives of Purpose ("to + base verb") from Lesson 3.2 & ESL PS Exam
  // ===========================================================================
  const purposePuzzles = [
    {
      id: 1,
      feature: 'Rooftop Solar Panels ☀️',
      prompt: 'Why did the eco-architect install solar panels on the roof?',
      correctOption: 'to generate clean electricity from sunlight',
      traps: [
        'for generate clean electricity from sunlight',
        'to generating electricity for the rooms',
        'to generated power when it rains'
      ],
      explanation: 'Infinitives of purpose always use "to + base verb" (to generate), never "for + verb" or "to + ing"!'
    },
    {
      id: 2,
      feature: 'Outside Rainwater Tub 🌧️',
      prompt: 'Why did the family place a large tub beneath the drainpipe?',
      correctOption: 'to collect rainwater for watering their garden',
      traps: [
        'for collecting water for the plants',
        'to collects raindrops in winter',
        'to collected water for the kettle'
      ],
      explanation: 'We use "to collect" to show purpose. "For collecting" is informal and grammatically incorrect in this context.'
    },
    {
      id: 3,
      feature: 'Tall Wooden Stilts 🪵',
      prompt: 'Why do families build their houses on tall wooden poles over rivers?',
      correctOption: 'to prevent monsoon floods from entering the home',
      traps: [
        'for prevent the water from rising',
        'to preventing river water damage',
        'to prevented crocodiles climbing up'
      ],
      explanation: 'The infinitive of purpose is "to prevent" (to + base verb).'
    },
    {
      id: 4,
      feature: 'Grass Turf on the Roof 🌱',
      prompt: 'Why did builders plant green grass on top of the eco-house?',
      correctOption: 'to insulate the rooms and keep warmth inside',
      traps: [
        'for feed pet goats on the roof',
        'to insulating the roof in December',
        'to insulated the ceilings naturally'
      ],
      explanation: '"to insulate" explains the environmental function of the turf roof.'
    },
    {
      id: 5,
      feature: 'Double-Glazed Windows 🪟',
      prompt: 'Why did they install two thick layers of glass in every window frame?',
      correctOption: 'to trap indoor heat and block icy drafts',
      traps: [
        'for trap the warm fireplace air',
        'to trapping cold winter breezes',
        'to trapped sounds from the street'
      ],
      explanation: '"to trap" (to + base verb) describes why double glazing was chosen.'
    },
    {
      id: 6,
      feature: 'Bilbo’s Hallway Pegs 🧥',
      prompt: 'Why did Bilbo Baggins hang so many pegs in his Bag End tunnel hall?',
      correctOption: 'to hold the hats and cloaks of his visitors',
      traps: [
        'for holding the weapons of dwarves',
        'to holding coats when it was raining',
        'to held clothes inside the dark cellar'
      ],
      explanation: 'In Lesson 3.5, Bilbo was fond of visitors, so he added pegs "to hold" their coats!'
    },
    {
      id: 7,
      feature: 'Roman Stone Arches 🏛️',
      prompt: 'Why did Roman stonemasons construct tiered elliptical arches in the Colosseum?',
      correctOption: 'to support the colossal weight of 50,000 spectators',
      traps: [
        'for supporting heavy stone seating blocks',
        'to supporting the emperor’s palace',
        'to supported the gladiators entering'
      ],
      explanation: '"to support" (to + base form) explains the engineering purpose of arches.'
    },
    {
      id: 8,
      feature: 'Kitchen Compost Tumbler 🍂',
      prompt: 'Why do eco-friendly homeowners keep a compost tumbler in the yard?',
      correctOption: 'to recycle vegetable scraps into nutrient-rich soil',
      traps: [
        'for throw old plastic packaging away',
        'to recycling carrot peelings easily',
        'to recycled food waste into fuel'
      ],
      explanation: 'The infinitive of purpose is "to recycle".'
    }
  ];

  const [purposeIdx, setPurposeIdx] = useState(0);
  const [purposeAnswer, setPurposeAnswer] = useState<string | null>(null);
  const [purposeAnswered, setPurposeAnswered] = useState<boolean | null>(null);

  const currentPurpose = purposePuzzles[purposeIdx];

  // Shuffled options for purpose puzzle
  const [purposeShuffledOptions, setPurposeShuffledOptions] = useState<string[]>([]);
  useEffect(() => {
    const all = [currentPurpose.correctOption, ...currentPurpose.traps];
    setPurposeShuffledOptions(all.sort(() => Math.random() - 0.5));
    setPurposeAnswer(null);
    setPurposeAnswered(null);
  }, [purposeIdx]);

  const selectPurposeOption = (opt: string) => {
    if (purposeAnswered !== null) return;
    onGamePlayed('purpose');
    setPurposeAnswer(opt);
    const isCorrect = opt === currentPurpose.correctOption;
    setPurposeAnswered(isCorrect);
    if (isCorrect) sound.playCorrect();
    else sound.playWrong();
  };

  const nextPurpose = () => {
    sound.playClick();
    setPurposeIdx(p => (p < purposePuzzles.length - 1 ? p + 1 : 0));
  };

  // ===========================================================================
  // GAME 3: FACT VS. OPINION ARENA 🏛️⚖️
  // Directly tests Cambridge Lesson 3.4 & Exam Part 4
  // ===========================================================================
  const factOpinionStatements = [
    {
      id: 1,
      statement: 'The Colosseum in Rome could hold over 50,000 seated spectators.',
      isFact: true,
      explanation: 'FACT! Historical records and archaeological measurements prove its exact seating capacity.'
    },
    {
      id: 2,
      statement: 'The Colosseum is the most spectacular ancient monument in the entire world.',
      isFact: false,
      explanation: 'OPINION! "Most spectacular" is a personal judgment adjective; someone else might prefer the Pyramids or Machu Picchu.'
    },
    {
      id: 3,
      statement: 'Workers started building the Colosseum almost 2,000 years ago using stone, brick, and sand.',
      isFact: true,
      explanation: 'FACT! Radiocarbon dating and Roman historical records confirm it was begun around 72 AD under Emperor Vespasian.'
    },
    {
      id: 4,
      statement: 'Gladiator battles were the coolest and most exciting entertainment in history.',
      isFact: false,
      explanation: 'OPINION! Words like "coolest" and "most exciting" reflect subjective personal feelings, not verifiable facts.'
    },
    {
      id: 5,
      statement: 'A bungalow is a residential house with only one single floor.',
      isFact: true,
      explanation: 'FACT! By standard architectural definition, a bungalow is a single-storey building with no upper level.'
    },
    {
      id: 6,
      statement: 'Living in a yurt on the grasslands is much more enjoyable than living in a city apartment.',
      isFact: false,
      explanation: 'OPINION! "More enjoyable" depends entirely on personal preference and lifestyle.'
    },
    {
      id: 7,
      statement: 'Violent earthquakes in 847 AD and 1231 AD caused the southern outer wall of the Colosseum to collapse.',
      isFact: true,
      explanation: 'FACT! Geologists and historians have documented the earthquake damage that destroyed parts of the outer ring.'
    },
    {
      id: 8,
      statement: 'Green eco-houses look much nicer than traditional red brick houses.',
      isFact: false,
      explanation: 'OPINION! "Much nicer" is an aesthetic taste judgment that cannot be scientifically proven.'
    },
    {
      id: 9,
      statement: 'Solar panels convert light energy from the sun directly into electrical current.',
      isFact: true,
      explanation: 'FACT! The photovoltaic effect is a proven physical and scientific law.'
    },
    {
      id: 10,
      statement: 'Bilbo Baggins’ Bag End is the cosiest fictional dwelling ever written in English literature.',
      isFact: false,
      explanation: 'OPINION! While many readers adore Tolkien’s description of comfort, "cosiest ever" is a literary opinion.'
    }
  ];

  const [factIdx, setFactIdx] = useState(0);
  const [factChoice, setFactChoice] = useState<boolean | null>(null);
  const [factResult, setFactResult] = useState<boolean | null>(null);

  const currentFactStatement = factOpinionStatements[factIdx];

  const handleFactChoice = (choiceIsFact: boolean) => {
    if (factResult !== null) return;
    onGamePlayed('fact-opinion');
    setFactChoice(choiceIsFact);
    const correct = choiceIsFact === currentFactStatement.isFact;
    setFactResult(correct);
    if (correct) sound.playCorrect();
    else sound.playWrong();
  };

  const nextFactStatement = () => {
    sound.playClick();
    setFactChoice(null);
    setFactResult(null);
    setFactIdx(p => (p < factOpinionStatements.length - 1 ? p + 1 : 0));
  };

  // ===========================================================================
  // GAME 4: DEDUCTION DETECTIVE: MUST, MIGHT, OR CAN’T? 🔎🏰
  // Tests Modals of Certainty from Lesson 3.3 Strange Buildings
  // ===========================================================================
  const deductionPuzzles = [
    {
      id: 1,
      title: 'The Haines Shoe House (Pennsylvania)',
      imagePlaceholder: '👞🏡',
      description: 'This 25-foot building is shaped like a giant leather boot with a living room in the toe and bedrooms in the ankle.',
      question: 'Sentence: "It has curtains, running water, and three bedrooms inside. It ________ be an actual shoe you wear on your foot!"',
      correctModal: "can't",
      options: [
        { modal: "can't", certainty: '0% (Impossible)', isCorrect: true },
        { modal: 'must', certainty: '100% (Definite)', isCorrect: false },
        { modal: 'might', certainty: '50% (Possible)', isCorrect: false }
      ],
      explanation: 'It is physically impossible to wear a 25-foot building on your foot, so we use CAN’T!'
    },
    {
      id: 2,
      title: 'The Kansas City Public Library',
      imagePlaceholder: '📚🏢',
      description: 'The exterior garage wall is designed like 25-foot giant book spines including Charlotte’s Web and The Lord of the Rings.',
      question: 'Sentence: "Thousands of students and book clubs enter the doors every day to borrow novels. It ________ be a public library!"',
      correctModal: 'must',
      options: [
        { modal: 'must', certainty: '100% (Definite)', isCorrect: true },
        { modal: "can't", certainty: '0% (Impossible)', isCorrect: false },
        { modal: 'could', certainty: '50% (Possible)', isCorrect: false }
      ],
      explanation: 'With overwhelming evidence (people borrowing books), we are 100% sure, so we use MUST!'
    },
    {
      id: 3,
      title: 'The Upside-Down House in Szymbark',
      imagePlaceholder: '🙃🏠',
      description: 'The pointed roof rests directly on the lawn, the foundation points into the clouds, and visitors walk on the ceiling.',
      question: 'Sentence: "The sofa, chairs, and dinner plates are screwed upside down to the ceiling. It ________ be an ordinary family house where people live every day!"',
      correctModal: "can't",
      options: [
        { modal: "can't", certainty: '0% (Impossible)', isCorrect: true },
        { modal: 'must', certainty: '100% (Definite)', isCorrect: false },
        { modal: 'might', certainty: '50% (Possible)', isCorrect: false }
      ],
      explanation: 'People cannot live normally upside down with furniture on the ceiling; it CAN’T be an ordinary family home!'
    },
    {
      id: 4,
      title: 'The Longaberger Basket Building (Ohio)',
      imagePlaceholder: '🧺🏢',
      description: 'A 7-storey building shaped like a wooden woven market basket with two 75-ton heated steel handles on the roof.',
      question: 'Sentence: "The company that built it manufactured handcrafted woven wood baskets. It ________ be their corporate headquarters!"',
      correctModal: 'must',
      options: [
        { modal: 'must', certainty: '100% (Definite)', isCorrect: true },
        { modal: 'might', certainty: '50% (Possible)', isCorrect: false },
        { modal: "can't", certainty: '0% (Impossible)', isCorrect: false }
      ],
      explanation: 'The basket company built their exact product as their headquarters; it MUST be their office!'
    },
    {
      id: 5,
      title: 'The Inflatable Transparent Bubble Tent',
      imagePlaceholder: '🫧🌲',
      description: 'A round dome made of transparent see-through plastic sitting in a mountain pine forest.',
      question: 'Sentence: "I see a warm bed and telescope inside the clear dome. It ________ be a special eco-hotel for stargazing at night!"',
      correctModal: 'might',
      options: [
        { modal: 'might / could', certainty: '50% (Possible)', isCorrect: true },
        { modal: 'must', certainty: '100% (Definite)', isCorrect: false },
        { modal: "can't", certainty: '0% (Impossible)', isCorrect: false }
      ],
      explanation: 'We don’t know for certain without asking, but stargazing hotel is a strong possibility (50%), so we use MIGHT or COULD!'
    }
  ];

  const [deductionIdx, setDeductionIdx] = useState(0);
  const [deductionSelected, setDeductionSelected] = useState<string | null>(null);
  const [deductionResult, setDeductionResult] = useState<boolean | null>(null);

  const currentDeduction = deductionPuzzles[deductionIdx];

  const handleDeductionSelect = (opt: any) => {
    if (deductionResult !== null) return;
    onGamePlayed('deduction');
    setDeductionSelected(opt.modal);
    setDeductionResult(opt.isCorrect);
    if (opt.isCorrect) sound.playCorrect();
    else sound.playWrong();
  };

  const nextDeduction = () => {
    sound.playClick();
    setDeductionSelected(null);
    setDeductionResult(null);
    setDeductionIdx(p => (p < deductionPuzzles.length - 1 ? p + 1 : 0));
  };

  // ===========================================================================
  // GAME 5: HOMES & WORLD SPIN WHEEL 🎡
  // Classroom Team Challenge Wheel
  // ===========================================================================
  const wheelSectors = [
    {
      label: '1. Types of Homes 🏕️',
      color: '#10b981',
      task: 'Name 3 differences between a traditional yurt and a detached bungalow! (1 pt)'
    },
    {
      label: '2. Purpose Clause Sprint ⚡',
      color: '#8b5cf6',
      task: 'Formulate a correct sentence using an infinitive of purpose: "They installed solar panels to..." (1 pt)'
    },
    {
      label: '3. Fact vs. Opinion 🏛️',
      color: '#ef4444',
      task: 'Share ONE provable fact and ONE subjective opinion about the Colosseum in Rome! (2 pts)'
    },
    {
      label: '4. Modal Deduction 🔎',
      color: '#0ea5e9',
      task: 'Use "must", "might", or "can’t" to explain why a shoe-shaped house is unusual! (1 pt)'
    },
    {
      label: '5. Bilbo’s Bag End Lore 🧝',
      color: '#f59e0b',
      task: 'Describe Bilbo’s front door (colour, shape, knob) and why he had so many pegs! (2 pts)'
    },
    {
      label: '6. Adjective Challenge ✨',
      color: '#ec4899',
      task: 'Use "spacious", "cramped", and "spectacular" correctly in three rapid sentences! (2 pts)'
    }
  ];

  const [wheelDegree, setWheelDegree] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedWheelIdx, setSelectedWheelIdx] = useState<number | null>(null);
  const [wheelTimer, setWheelTimer] = useState(30);
  const [isWheelTimerRunning, setIsWheelTimerRunning] = useState(false);
  const wheelTimerRef = useRef<any>(null);

  const spinWheel = () => {
    if (isSpinning) return;
    onGamePlayed('wheel');
    setIsSpinning(true);
    setSelectedWheelIdx(null);
    setIsWheelTimerRunning(false);

    const randomSector = Math.floor(Math.random() * wheelSectors.length);
    const degreePerSector = 360 / wheelSectors.length;
    const spinDegrees =
      wheelDegree + 360 * 5 + (360 - randomSector * degreePerSector) - (wheelDegree % 360);
    setWheelDegree(spinDegrees);

    let tickCount = 0;
    const ticker = setInterval(() => {
      sound.playTick();
      tickCount++;
      if (tickCount >= 35) clearInterval(ticker);
    }, 70);

    setTimeout(() => {
      setIsSpinning(false);
      setSelectedWheelIdx(randomSector);
      sound.playFanfare();
    }, 3000);
  };

  const startWheelTimer = (seconds: number = 30) => {
    setWheelTimer(seconds);
    setIsWheelTimerRunning(true);
    sound.playClick();
  };

  useEffect(() => {
    if (isWheelTimerRunning) {
      wheelTimerRef.current = setInterval(() => {
        setWheelTimer(prev => {
          if (prev <= 1) {
            setIsWheelTimerRunning(false);
            sound.playWrong();
            clearInterval(wheelTimerRef.current);
            return 0;
          }
          if (prev <= 6) sound.playTick();
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(wheelTimerRef.current);
    }
    return () => clearInterval(wheelTimerRef.current);
  }, [isWheelTimerRunning]);

  // ===========================================================================
  // GAME 6: HOMES VOCABULARY HOT SEAT 🔥
  // ===========================================================================
  const hotseatDecks = {
    homes: {
      title: 'Types of Homes 🏠',
      words: [
        'Bungalow',
        'Apartment',
        'Stilt house',
        'Yurt',
        'Houseboat',
        'Cottage',
        'Terraced house',
        'Detached house',
        'Caravan',
        'Castle'
      ]
    },
    eco: {
      title: 'Eco-House & Materials 🌿',
      words: [
        'Solar panels',
        'Rainwater tub',
        'Roof turf',
        'Double glazing',
        'Timber',
        'Recycled materials',
        'Compost tumbler',
        'Insulation',
        'Clay tiles',
        'Mud & stone'
      ]
    },
    adjectives: {
      title: 'Descriptive Adjectives ✨',
      words: [
        'Spacious',
        'Cramped',
        'Cosy',
        'Enormous',
        'Spectacular',
        'Ancient',
        'Modern',
        'Comfortable',
        'Relaxing',
        'Unusual'
      ]
    },
    literature: {
      title: 'Bag End & Colosseum 📚',
      words: [
        'Hobbit-hole',
        'Porthole door',
        'Hat pegs',
        'Bilbo Baggins',
        'Pantries',
        'Colosseum',
        'Gladiator',
        'Spectators',
        'Arches',
        'Earthquake'
      ]
    }
  };

  const [hotseatDeckKey, setHotseatDeckKey] = useState<keyof typeof hotseatDecks>('homes');
  const [hotseatWordIdx, setHotseatWordIdx] = useState(0);
  const [isHotseatHidden, setIsHotseatHidden] = useState(true);
  const [hotseatScore, setHotseatScore] = useState(0);
  const [hotseatWordTimer, setHotseatWordTimer] = useState(20);
  const [hotseatRunning, setHotseatRunning] = useState(false);
  const [isHotseatPaused, setIsHotseatPaused] = useState(false);
  const [hotseatCompleted, setHotseatCompleted] = useState(false);
  const hotseatTimerRef = useRef<any>(null);

  const activeHotseatList = hotseatDecks[hotseatDeckKey].words;

  const startHotseat = () => {
    onGamePlayed('hotseat');
    setHotseatWordIdx(0);
    setHotseatScore(0);
    setIsHotseatHidden(true);
    setHotseatWordTimer(20);
    setHotseatRunning(true);
    setIsHotseatPaused(false);
    setHotseatCompleted(false);
    sound.playCorrect();
  };

  useEffect(() => {
    if (hotseatRunning && !isHotseatPaused && !isHotseatHidden && !hotseatCompleted) {
      hotseatTimerRef.current = setInterval(() => {
        setHotseatWordTimer(prev => {
          if (prev <= 1) {
            sound.playWrong();
            if (hotseatWordIdx < activeHotseatList.length - 1) {
              setHotseatWordIdx(i => i + 1);
              setIsHotseatHidden(true);
              return 20;
            } else {
              setHotseatRunning(false);
              setHotseatCompleted(true);
              sound.playFanfare();
              return 0;
            }
          }
          if (prev <= 5) sound.playTick();
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(hotseatTimerRef.current);
    }
    return () => clearInterval(hotseatTimerRef.current);
  }, [hotseatRunning, isHotseatPaused, isHotseatHidden, hotseatCompleted, hotseatWordIdx, activeHotseatList]);

  const handleHotseatCorrect = () => {
    sound.playCorrect();
    setHotseatScore(s => s + 1);
    if (hotseatWordIdx < activeHotseatList.length - 1) {
      setHotseatWordIdx(i => i + 1);
      setIsHotseatHidden(true);
      setHotseatWordTimer(20);
    } else {
      setHotseatRunning(false);
      setHotseatCompleted(true);
      sound.playFanfare();
    }
  };

  const handleHotseatPass = () => {
    sound.playClick();
    if (hotseatWordIdx < activeHotseatList.length - 1) {
      setHotseatWordIdx(i => i + 1);
      setIsHotseatHidden(true);
      setHotseatWordTimer(20);
    } else {
      setHotseatRunning(false);
      setHotseatCompleted(true);
      sound.playFanfare();
    }
  };

  // Nav titles
  const gameNav = [
    { id: 'mystery', label: '🕵️ Whose Home Is This?', desc: 'Mystery Clue Hunt' },
    { id: 'purpose', label: '⚡ Eco-Architect Purpose', desc: 'Infinitives of Purpose' },
    { id: 'fact-opinion', label: '🏛️ Fact vs. Opinion', desc: 'Colosseum & Homes' },
    { id: 'deduction', label: '🔎 Must, Might, Can’t', desc: 'Strange Buildings' },
    { id: 'wheel', label: '🎡 Homes Spin Wheel', desc: 'Team Challenge Wheel' },
    { id: 'hotseat', label: '🔥 Homes Hot Seat', desc: 'Classroom Guesser' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4 py-2 grid grid-cols-1 lg:grid-cols-4 gap-6">
      
      {/* LEFT COLUMN: GAME SELECTOR & TEAM SCOREBOARD */}
      <div className="lg:col-span-1 bg-white text-slate-900 rounded-[28px] p-5 shadow-[5px_5px_0px_0px_#560e51] border-4 border-[#560e51] flex flex-col justify-between space-y-6">
        <div>
          <div className="flex items-center justify-between mb-3 border-b-2 border-fuchsia-100 pb-2">
            <span className="text-[11px] font-black font-mono text-[#9b2c98] uppercase tracking-widest">
              Unit 3 Arcade
            </span>
            <span className="text-[10px] font-mono bg-lime-100 text-[#43780a] font-bold px-2 py-0.5 rounded border border-lime-400">
              Cambridge Gr 4
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {gameNav.map(g => (
              <button
                key={g.id}
                onClick={() => {
                  setActiveGame(g.id as any);
                  sound.playClick();
                }}
                className={`p-3 rounded-2xl text-left transition-all cursor-pointer border-3 ${
                  activeGame === g.id
                    ? 'bg-[#78c222] border-[#560e51] text-[#560e51] shadow-[3px_3px_0px_0px_#560e51]'
                    : 'bg-[#fefaf0] hover:bg-fuchsia-50 border-slate-300 text-slate-800'
                }`}
              >
                <span className="text-xs sm:text-sm font-black block tracking-tight">{g.label}</span>
                <span className="text-[11px] font-semibold text-slate-600 block">{g.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* CLASSROOM SCOREBOARD */}
        <div className="pt-4 border-t-3 border-[#560e51]/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black uppercase tracking-wider text-[#560e51] font-mono flex items-center gap-1.5">
              <Trophy className="h-4 w-4 text-amber-500" /> Team Battle
            </span>
            <span className="text-[10px] font-mono text-slate-500">Live Points</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center">
            {/* Team A */}
            <div className="bg-emerald-50 border-3 border-emerald-600 rounded-2xl p-2.5 shadow-[2px_2px_0px_0px_#059669]">
              <span className="text-[10px] font-black text-emerald-900 uppercase block font-mono">
                Team A (Green)
              </span>
              <span className="text-2xl font-black text-emerald-950 font-mono my-1 block">
                {teamScores.teamA}
              </span>
              <div className="flex justify-center gap-1">
                <button
                  onClick={() => awardPoint('A', 1)}
                  className="px-2 py-1 bg-emerald-600 text-white font-black text-xs rounded-lg hover:bg-emerald-700 cursor-pointer"
                  title="Add 1 pt"
                >
                  +1
                </button>
                <button
                  onClick={() => awardPoint('A', 2)}
                  className="px-2 py-1 bg-emerald-700 text-white font-black text-xs rounded-lg hover:bg-emerald-800 cursor-pointer"
                  title="Add 2 pts"
                >
                  +2
                </button>
                <button
                  onClick={() => awardPoint('A', -1)}
                  className="px-1.5 py-1 bg-slate-200 text-slate-700 font-black text-xs rounded-lg hover:bg-slate-300 cursor-pointer"
                  title="Minus 1 pt"
                >
                  -
                </button>
              </div>
            </div>

            {/* Team B */}
            <div className="bg-purple-50 border-3 border-purple-600 rounded-2xl p-2.5 shadow-[2px_2px_0px_0px_#7e22ce]">
              <span className="text-[10px] font-black text-purple-900 uppercase block font-mono">
                Team B (Purple)
              </span>
              <span className="text-2xl font-black text-purple-950 font-mono my-1 block">
                {teamScores.teamB}
              </span>
              <div className="flex justify-center gap-1">
                <button
                  onClick={() => awardPoint('B', 1)}
                  className="px-2 py-1 bg-purple-600 text-white font-black text-xs rounded-lg hover:bg-purple-700 cursor-pointer"
                  title="Add 1 pt"
                >
                  +1
                </button>
                <button
                  onClick={() => awardPoint('B', 2)}
                  className="px-2 py-1 bg-purple-700 text-white font-black text-xs rounded-lg hover:bg-purple-800 cursor-pointer"
                  title="Add 2 pts"
                >
                  +2
                </button>
                <button
                  onClick={() => awardPoint('B', -1)}
                  className="px-1.5 py-1 bg-slate-200 text-slate-700 font-black text-xs rounded-lg hover:bg-slate-300 cursor-pointer"
                  title="Minus 1 pt"
                >
                  -
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: ACTIVE GAME STAGE */}
      <div className="lg:col-span-3">

        {/* ================================================================= */}
        {/* GAME 1: WHOSE HOME IS THIS? (MYSTERY DWELLING CLUE HUNT)           */}
        {/* ================================================================= */}
        {activeGame === 'mystery' && (
          <div className="bg-white rounded-[32px] p-6 sm:p-8 border-4 border-[#560e51] shadow-[8px_8px_0px_0px_#560e51] space-y-6">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-fuchsia-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-widest text-[#9b2c98] font-mono bg-fuchsia-50 px-3 py-0.5 rounded-full border border-fuchsia-200">
                    Detective Clue Hunt · {currentCase.lesson}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#560e51] uppercase tracking-tight mt-1 flex items-center gap-2">
                  <span>Whose Home Is This? 🕵️🏡</span>
                </h3>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-xs font-mono font-black text-[#560e51] bg-[#fdf2fe] px-3 py-1.5 rounded-xl border-2 border-[#560e51]">
                  Case {mysteryIdx + 1} of {mysteryCases.length}
                </span>
              </div>
            </div>

            {/* Resident Character Intro */}
            <div className="bg-[#fefaf0] border-3 border-[#560e51] p-5 rounded-2xl shadow-[4px_4px_0px_0px_#560e51] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <span className="text-4xl sm:text-5xl">{currentCase.avatar}</span>
                <div>
                  <span className="text-[10px] font-black uppercase font-mono text-[#9b2c98] block">
                    Mystery Resident Profile:
                  </span>
                  <h4 className="text-lg sm:text-xl font-black text-[#560e51]">
                    "{currentCase.character}"
                  </h4>
                  <p className="text-xs font-bold text-slate-600">
                    Listen to their clues carefully to guess their unique dwelling!
                  </p>
                </div>
              </div>
              <button
                onClick={() => speakText(`Hello students! I am ${currentCase.character}. Can you guess my home? Listen to my clues!`)}
                className="px-3.5 py-2 bg-[#78c222] hover:bg-[#68ab1c] text-[#560e51] font-black text-xs rounded-xl border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#560e51] cursor-pointer flex items-center gap-1.5 shrink-0"
              >
                <Volume2 className="h-4 w-4" /> <span>Play Voice 🔊</span>
              </button>
            </div>

            {/* Clue Ladder */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase font-mono text-[#560e51]">
                  Progressive Clues (Earlier guess = More Team Points):
                </span>
                <div className="flex gap-1.5">
                  {[1, 2, 3].map(lvl => (
                    <button
                      key={lvl}
                      onClick={() => {
                        setUnlockedClueLevel(lvl);
                        sound.playClick();
                      }}
                      className={`px-3 py-1 rounded-lg text-xs font-black uppercase font-mono border-2 cursor-pointer transition ${
                        unlockedClueLevel >= lvl
                          ? 'bg-[#560e51] text-white border-[#560e51]'
                          : 'bg-white text-slate-400 border-slate-300'
                      }`}
                    >
                      Clue {lvl} {lvl === 1 ? '(300p)' : lvl === 2 ? '(200p)' : '(100p)'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clue cards */}
              {currentCase.clues.slice(0, unlockedClueLevel).map((clue, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-white rounded-2xl border-3 border-[#560e51] shadow-[3px_3px_0px_0px_#560e51] flex items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-black text-[#43780a] bg-lime-100 px-2.5 py-0.5 rounded border border-lime-400 uppercase inline-block">
                      {clue.level}
                    </span>
                    <p className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed pt-1">
                      "{clue.text}"
                    </p>
                  </div>
                  <button
                    onClick={() => speakText(clue.text)}
                    className="p-2 bg-fuchsia-50 hover:bg-fuchsia-100 text-[#560e51] rounded-xl border border-[#560e51] cursor-pointer shrink-0 mt-1"
                    title="Read aloud"
                  >
                    <Volume2 className="h-4 w-4" />
                  </button>
                </motion.div>
              ))}

              {unlockedClueLevel < 3 && !mysteryRevealed && (
                <button
                  onClick={() => {
                    setUnlockedClueLevel(l => Math.min(3, l + 1));
                    sound.playClick();
                  }}
                  className="w-full py-2.5 bg-amber-100 hover:bg-amber-200 text-amber-950 font-black text-xs uppercase rounded-xl border-2 border-amber-500 border-dashed cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="h-4 w-4 text-amber-600" /> Unlock Next Hint Clue ({unlockedClueLevel === 1 ? 'Clue 2' : 'Clue 3'})
                </button>
              )}
            </div>

            {/* Multiple Choice Guess Grid */}
            <div>
              <span className="text-xs font-black uppercase font-mono text-[#9b2c98] block mb-2">
                Classroom Guess: Which home does {currentCase.character} live in?
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentCase.options.map((opt) => {
                  const isSelected = selectedGuess === opt;
                  const isCorrect = opt === currentCase.name;
                  return (
                    <button
                      key={opt}
                      onClick={() => handleGuess(opt)}
                      disabled={mysteryRevealed}
                      className={`p-4 rounded-2xl text-left font-black text-sm sm:text-base border-3 transition-all cursor-pointer flex items-center justify-between ${
                        mysteryRevealed && isCorrect
                          ? 'bg-[#78c222] border-[#560e51] text-[#560e51] shadow-[4px_4px_0px_0px_#560e51]'
                          : isSelected && !isCorrect
                          ? 'bg-rose-100 border-rose-500 text-rose-900 opacity-60 line-through'
                          : 'bg-white hover:bg-fuchsia-50 border-slate-300 text-slate-900 shadow-sm'
                      }`}
                    >
                      <span>{opt}</span>
                      {mysteryRevealed && isCorrect && (
                        <CheckCircle2 className="h-5 w-5 text-[#560e51]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Reveal Box & Score Award */}
            {mysteryRevealed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-5 bg-emerald-50 rounded-2xl border-3 border-emerald-600 shadow-[4px_4px_0px_0px_#059669] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🎉</span>
                    <h4 className="text-base sm:text-lg font-black text-emerald-950 uppercase">
                      Mystery Solved: {currentCase.name}!
                    </h4>
                  </div>
                  <span className="text-xs font-mono font-black text-emerald-900 bg-emerald-200 px-3 py-1 rounded-full">
                    {unlockedClueLevel === 1 ? '+300 Pts' : unlockedClueLevel === 2 ? '+200 Pts' : '+100 Pts'}
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-bold text-emerald-900 leading-relaxed">
                  💡 <strong>Architectural Fact:</strong> {currentCase.funFact}
                </p>

                <div className="pt-2 border-t border-emerald-200 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-black font-mono">
                    <span className="text-slate-700">Award Points:</span>
                    <button
                      onClick={() => awardPoint('A', unlockedClueLevel === 1 ? 3 : unlockedClueLevel === 2 ? 2 : 1)}
                      className="px-3 py-1 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 cursor-pointer"
                    >
                      Team A (+{unlockedClueLevel === 1 ? 3 : unlockedClueLevel === 2 ? 2 : 1})
                    </button>
                    <button
                      onClick={() => awardPoint('B', unlockedClueLevel === 1 ? 3 : unlockedClueLevel === 2 ? 2 : 1)}
                      className="px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 cursor-pointer"
                    >
                      Team B (+{unlockedClueLevel === 1 ? 3 : unlockedClueLevel === 2 ? 2 : 1})
                    </button>
                  </div>

                  <button
                    onClick={nextMysteryCase}
                    className="px-5 py-2 bg-[#560e51] hover:bg-[#43093f] text-white font-black text-xs uppercase rounded-xl shadow-[2px_2px_0px_0px_#78c222] cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Next Mystery Case</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}

          </div>
        )}

        {/* ================================================================= */}
        {/* GAME 2: ECO-ARCHITECT: THE PURPOSE CLAUSE MATCHER ⚡🔨            */}
        {/* ================================================================= */}
        {activeGame === 'purpose' && (
          <div className="bg-white rounded-[32px] p-6 sm:p-8 border-4 border-[#560e51] shadow-[8px_8px_0px_0px_#560e51] space-y-6">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-fuchsia-100 pb-4">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-[#43780a] font-mono bg-lime-100 px-3 py-0.5 rounded-full border border-lime-400">
                  Lesson 3.2 & 3.6 Grammar Engine
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#560e51] uppercase tracking-tight mt-1">
                  Eco-Architect: Purpose Clause Matcher ⚡
                </h3>
              </div>
              <span className="text-xs font-mono font-black text-[#560e51] bg-[#fdf2fe] px-3 py-1.5 rounded-xl border-2 border-[#560e51] self-start sm:self-auto">
                Blueprint {purposeIdx + 1} of {purposePuzzles.length}
              </span>
            </div>

            {/* Blueprint Challenge Card */}
            <div className="bg-[#1e1b4b] text-white p-6 sm:p-8 rounded-2xl text-center border-3 border-[#560e51] shadow-lg space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#78c222] font-black block">
                Target Architectural Feature:
              </span>
              <h4 className="text-2xl sm:text-3xl font-black text-[#78c222] uppercase tracking-tight">
                {currentPurpose.feature}
              </h4>
              <p className="text-sm sm:text-base font-bold text-slate-200 pt-2 max-w-xl mx-auto">
                "{currentPurpose.prompt}"
              </p>
              <div className="inline-block bg-white/10 px-3 py-1 rounded-full text-xs font-mono text-amber-300 font-bold mt-2">
                Rule: Use Infinitives of Purpose ("to + base verb") to explain WHY!
              </div>
            </div>

            {/* Options */}
            <div className="space-y-3">
              <span className="text-xs font-black uppercase font-mono text-[#560e51] block">
                Select the grammatically correct purpose clause:
              </span>
              <div className="grid grid-cols-1 gap-3">
                {purposeShuffledOptions.map((opt, i) => {
                  const isSelected = purposeAnswer === opt;
                  const isCorrect = opt === currentPurpose.correctOption;
                  return (
                    <button
                      key={i}
                      disabled={purposeAnswered !== null}
                      onClick={() => selectPurposeOption(opt)}
                      className={`p-4 rounded-2xl text-left font-black text-sm sm:text-base border-3 transition-all cursor-pointer flex items-center justify-between ${
                        purposeAnswered !== null && isCorrect
                          ? 'bg-emerald-100 border-emerald-600 text-emerald-950 shadow-[3px_3px_0px_0px_#059669]'
                          : purposeAnswered !== null && isSelected && !isCorrect
                          ? 'bg-rose-100 border-rose-600 text-rose-950 line-through opacity-70'
                          : 'bg-white hover:bg-lime-50 border-slate-300 text-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-xl bg-slate-100 border border-slate-300 font-mono text-xs flex items-center justify-center">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {purposeAnswered !== null && isCorrect && (
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                      )}
                      {purposeAnswered !== null && isSelected && !isCorrect && (
                        <XCircle className="h-5 w-5 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Feedback & Award */}
            {purposeAnswered !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-5 rounded-2xl border-3 shadow-[3px_3px_0px_0px_#560e51] ${
                  purposeAnswered ? 'bg-emerald-50 border-emerald-600' : 'bg-rose-50 border-rose-600'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-base font-black uppercase text-slate-900">
                    {purposeAnswered ? '🎉 Perfect Grammar Construction!' : '⚠️ Watch Out for Traps!'}
                  </span>
                  <span className="text-xs font-mono font-black text-[#560e51]">
                    ESL PS Exam Matrix
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-slate-800">
                  {currentPurpose.explanation}
                </p>

                <div className="pt-3 mt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-black font-mono">
                    <span>Award point:</span>
                    <button
                      onClick={() => awardPoint('A', 1)}
                      className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 cursor-pointer"
                    >
                      Team A (+1)
                    </button>
                    <button
                      onClick={() => awardPoint('B', 1)}
                      className="px-2.5 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 cursor-pointer"
                    >
                      Team B (+1)
                    </button>
                  </div>

                  <button
                    onClick={nextPurpose}
                    className="px-5 py-2 bg-[#78c222] hover:bg-[#68ab1c] text-[#560e51] font-black text-xs uppercase rounded-xl border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#560e51] cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Next Feature</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}

          </div>
        )}

        {/* ================================================================= */}
        {/* GAME 3: FACT VS. OPINION ARENA 🏛️⚖️                              */}
        {/* ================================================================= */}
        {activeGame === 'fact-opinion' && (
          <div className="bg-white rounded-[32px] p-6 sm:p-8 border-4 border-[#560e51] shadow-[8px_8px_0px_0px_#560e51] space-y-6">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-fuchsia-100 pb-4">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-sky-800 font-mono bg-sky-100 px-3 py-0.5 rounded-full border border-sky-400">
                  Lesson 3.4 Colosseum & Architecture
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#560e51] uppercase tracking-tight mt-1">
                  Fact vs. Opinion Showdown 🏛️⚖️
                </h3>
              </div>
              <span className="text-xs font-mono font-black text-[#560e51] bg-[#fdf2fe] px-3 py-1.5 rounded-xl border-2 border-[#560e51] self-start sm:self-auto">
                Round {factIdx + 1} of {factOpinionStatements.length}
              </span>
            </div>

            {/* Concept Reminder Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-bold">
              <div className="p-3 bg-sky-50 rounded-xl border-2 border-sky-300">
                <span className="font-mono font-black text-sky-900 block uppercase">📘 A Provable FACT:</span>
                <span className="text-slate-700">Can be verified with numbers, historical evidence, or scientific proof.</span>
              </div>
              <div className="p-3 bg-amber-50 rounded-xl border-2 border-amber-300">
                <span className="font-mono font-black text-amber-900 block uppercase">💭 A Subjective OPINION:</span>
                <span className="text-slate-700">What someone feels or thinks using judgment adjectives (e.g. prettiest, coolest, best).</span>
              </div>
            </div>

            {/* Target Statement */}
            <div className="bg-[#fefaf0] border-4 border-[#560e51] p-6 sm:p-10 rounded-2xl text-center shadow-[5px_5px_0px_0px_#560e51] space-y-3">
              <span className="text-xs font-mono font-black uppercase text-[#9b2c98] block">
                Classroom Prompt — Is this statement a Fact or an Opinion?
              </span>
              <p className="text-xl sm:text-2xl font-black text-[#560e51] leading-relaxed">
                "{currentFactStatement.statement}"
              </p>
              <button
                onClick={() => speakText(currentFactStatement.statement)}
                className="px-3.5 py-1 bg-white hover:bg-fuchsia-50 text-[#560e51] rounded-lg border border-[#560e51] text-xs font-bold font-mono inline-flex items-center gap-1 cursor-pointer"
              >
                <Volume2 className="h-3.5 w-3.5" /> Listen Aloud
              </button>
            </div>

            {/* Voting Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                disabled={factResult !== null}
                onClick={() => handleFactChoice(true)}
                className={`py-5 rounded-2xl text-center font-black text-lg sm:text-xl border-4 transition-all cursor-pointer shadow-[4px_4px_0px_0px_#560e51] ${
                  factResult !== null && currentFactStatement.isFact
                    ? 'bg-sky-500 text-white border-[#560e51] ring-4 ring-sky-300'
                    : 'bg-sky-400 hover:bg-sky-500 text-white border-[#560e51]'
                }`}
              >
                📘 FACT
                <span className="text-xs block font-mono font-normal opacity-90">(Provable Truth)</span>
              </button>

              <button
                disabled={factResult !== null}
                onClick={() => handleFactChoice(false)}
                className={`py-5 rounded-2xl text-center font-black text-lg sm:text-xl border-4 transition-all cursor-pointer shadow-[4px_4px_0px_0px_#560e51] ${
                  factResult !== null && !currentFactStatement.isFact
                    ? 'bg-amber-500 text-white border-[#560e51] ring-4 ring-amber-300'
                    : 'bg-amber-400 hover:bg-amber-500 text-white border-[#560e51]'
                }`}
              >
                💭 OPINION
                <span className="text-xs block font-mono font-normal opacity-90">(Personal Belief)</span>
              </button>
            </div>

            {/* Result Breakdown */}
            {factResult !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-5 rounded-2xl border-3 shadow-[3px_3px_0px_0px_#560e51] ${
                  factResult ? 'bg-emerald-50 border-emerald-600' : 'bg-rose-50 border-rose-600'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-black text-base uppercase text-slate-900">
                    {factResult ? '🎉 Brilliant Deduction!' : '⚠️ Not Quite!'}
                  </h4>
                  <span className="text-xs font-mono font-black text-[#560e51]">
                    {currentFactStatement.isFact ? 'Target: FACT' : 'Target: OPINION'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-slate-800">
                  {currentFactStatement.explanation}
                </p>

                <div className="pt-3 mt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-black font-mono">
                    <span>Award point:</span>
                    <button
                      onClick={() => awardPoint('A', 1)}
                      className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 cursor-pointer"
                    >
                      Team A (+1)
                    </button>
                    <button
                      onClick={() => awardPoint('B', 1)}
                      className="px-2.5 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 cursor-pointer"
                    >
                      Team B (+1)
                    </button>
                  </div>

                  <button
                    onClick={nextFactStatement}
                    className="px-5 py-2 bg-[#78c222] hover:bg-[#68ab1c] text-[#560e51] font-black text-xs uppercase rounded-xl border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#560e51] cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Next Statement</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}

          </div>
        )}

        {/* ================================================================= */}
        {/* GAME 4: DEDUCTION DETECTIVE: MUST, MIGHT, OR CAN’T? 🔎🏰           */}
        {/* ================================================================= */}
        {activeGame === 'deduction' && (
          <div className="bg-white rounded-[32px] p-6 sm:p-8 border-4 border-[#560e51] shadow-[8px_8px_0px_0px_#560e51] space-y-6">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-fuchsia-100 pb-4">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-amber-800 font-mono bg-amber-100 px-3 py-0.5 rounded-full border border-amber-400">
                  Lesson 3.3 Strange Buildings & Deduction
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#560e51] uppercase tracking-tight mt-1">
                  Deduction Detective: Must, Might, or Can’t? 🔎
                </h3>
              </div>
              <span className="text-xs font-mono font-black text-[#560e51] bg-[#fdf2fe] px-3 py-1.5 rounded-xl border-2 border-[#560e51] self-start sm:self-auto">
                Mystery {deductionIdx + 1} of {deductionPuzzles.length}
              </span>
            </div>

            {/* Certainty Meter Guide */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold">
              <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-400">
                <span className="font-mono font-black text-emerald-900 block">MUST</span>
                <span className="text-[11px] text-emerald-700">100% Certain (Definite)</span>
              </div>
              <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-400">
                <span className="font-mono font-black text-amber-900 block">MIGHT / COULD</span>
                <span className="text-[11px] text-amber-700">50% Possible (Maybe)</span>
              </div>
              <div className="p-2.5 bg-rose-50 rounded-xl border border-rose-400">
                <span className="font-mono font-black text-rose-900 block">CAN’T</span>
                <span className="text-[11px] text-rose-700">0% Impossible (No way)</span>
              </div>
            </div>

            {/* Mystery Architecture Case */}
            <div className="bg-[#fefaf0] border-3 border-[#560e51] p-6 rounded-2xl shadow-[4px_4px_0px_0px_#560e51] space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{currentDeduction.imagePlaceholder}</span>
                <div>
                  <span className="text-[10px] font-mono font-black uppercase text-[#9b2c98]">Strange Architecture Case:</span>
                  <h4 className="text-lg sm:text-xl font-black text-[#560e51]">{currentDeduction.title}</h4>
                </div>
              </div>

              <p className="text-xs sm:text-sm font-bold text-slate-700 leading-relaxed">
                {currentDeduction.description}
              </p>

              <div className="bg-white p-4 rounded-xl border-2 border-[#560e51] text-center">
                <span className="text-xs font-mono font-black uppercase text-[#9b2c98] block mb-1">Fill the Blank:</span>
                <p className="text-base sm:text-lg font-black text-slate-950">
                  {currentDeduction.question}
                </p>
              </div>
            </div>

            {/* Modal Choices */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {currentDeduction.options.map((opt) => {
                const isSelected = deductionSelected === opt.modal;
                return (
                  <button
                    key={opt.modal}
                    disabled={deductionResult !== null}
                    onClick={() => handleDeductionSelect(opt)}
                    className={`p-4 rounded-2xl text-center font-black border-3 transition-all cursor-pointer ${
                      deductionResult !== null && opt.isCorrect
                        ? 'bg-[#78c222] border-[#560e51] text-[#560e51] shadow-[3px_3px_0px_0px_#560e51]'
                        : deductionResult !== null && isSelected && !opt.isCorrect
                        ? 'bg-rose-100 border-rose-500 text-rose-900 opacity-60 line-through'
                        : 'bg-white hover:bg-fuchsia-50 border-slate-300 text-slate-900'
                    }`}
                  >
                    <span className="text-xl sm:text-2xl font-black uppercase block">{opt.modal}</span>
                    <span className="text-xs font-mono font-normal opacity-80 block mt-0.5">{opt.certainty}</span>
                  </button>
                );
              })}
            </div>

            {/* Feedback & Award */}
            {deductionResult !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-5 rounded-2xl border-3 shadow-[3px_3px_0px_0px_#560e51] ${
                  deductionResult ? 'bg-emerald-50 border-emerald-600' : 'bg-rose-50 border-rose-600'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-black text-base uppercase text-slate-900">
                    {deductionResult ? '🎉 Logical Deduction Correct!' : '⚠️ Check the Degree of Certainty!'}
                  </h4>
                  <span className="text-xs font-mono font-black text-[#560e51]">
                    Correct Modal: {currentDeduction.correctModal.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-slate-800">
                  {currentDeduction.explanation}
                </p>

                <div className="pt-3 mt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-black font-mono">
                    <span>Award point:</span>
                    <button
                      onClick={() => awardPoint('A', 1)}
                      className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 cursor-pointer"
                    >
                      Team A (+1)
                    </button>
                    <button
                      onClick={() => awardPoint('B', 1)}
                      className="px-2.5 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 cursor-pointer"
                    >
                      Team B (+1)
                    </button>
                  </div>

                  <button
                    onClick={nextDeduction}
                    className="px-5 py-2 bg-[#78c222] hover:bg-[#68ab1c] text-[#560e51] font-black text-xs uppercase rounded-xl border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#560e51] cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Next Mystery</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}

          </div>
        )}

        {/* ================================================================= */}
        {/* GAME 5: HOMES & WORLD WHEEL CHALLENGE 🎡                          */}
        {/* ================================================================= */}
        {activeGame === 'wheel' && (
          <div className="bg-white rounded-[32px] p-6 sm:p-8 border-4 border-[#560e51] shadow-[8px_8px_0px_0px_#560e51] text-center space-y-6">
            
            <div className="flex justify-between items-center border-b-2 border-fuchsia-100 pb-3">
              <div className="text-left">
                <span className="text-xs font-black uppercase tracking-widest text-[#9b2c98] font-mono">
                  Team Showdown Spinner
                </span>
                <h3 className="text-2xl font-black text-[#560e51] uppercase">🎡 Homes & World Wheel Challenge</h3>
              </div>

              <div className="flex items-center gap-2">
                <Timer className="h-5 w-5 text-[#9b2c98]" />
                <span className="font-mono text-base font-black text-[#560e51] bg-fuchsia-50 px-3 py-1 rounded-xl border-2 border-[#560e51]">
                  {wheelTimer}s
                </span>
                {!isWheelTimerRunning && (
                  <button
                    onClick={() => startWheelTimer(30)}
                    className="px-3 py-1 bg-[#78c222] text-[#560e51] font-black rounded-xl text-xs border-2 border-[#560e51] cursor-pointer"
                  >
                    Start 30s
                  </button>
                )}
              </div>
            </div>

            {/* Spinner Wheel Graphic */}
            <div className="relative w-64 h-64 mx-auto my-4 flex items-center justify-center">
              <div 
                className="w-60 h-60 rounded-full border-4 border-[#560e51] shadow-[6px_6px_0px_0px_#560e51] relative overflow-hidden transition-transform duration-3000 ease-out flex items-center justify-center"
                style={{ 
                  transform: `rotate(${wheelDegree}deg)`,
                  background: 'conic-gradient(#10b981 0deg 60deg, #8b5cf6 60deg 120deg, #ef4444 120deg 180deg, #0ea5e9 180deg 240deg, #f59e0b 240deg 300deg, #ec4899 300deg 360deg)' 
                }}
              >
                <div className="w-16 h-16 bg-white rounded-full border-3 border-[#560e51] flex items-center justify-center font-black text-xs text-[#560e51] z-10 shadow-md">
                  Grade 4
                </div>
              </div>
              {/* Pointer */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-0 h-0 border-x-8 border-x-transparent border-t-[22px] border-t-[#560e51] z-20" />
            </div>

            <button
              onClick={spinWheel}
              disabled={isSpinning}
              className="px-10 py-3.5 bg-[#78c222] hover:bg-[#68ab1c] text-[#560e51] font-black text-base uppercase rounded-2xl border-3 border-[#560e51] shadow-[4px_4px_0px_0px_#560e51] cursor-pointer transition-all active:translate-y-1 active:shadow-none"
            >
              {isSpinning ? 'SPINNING WHEEL...' : 'SPIN THE WHEEL! 🎯'}
            </button>

            {selectedWheelIdx !== null && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-6 bg-[#fefaf0] border-3 border-[#560e51] rounded-2xl shadow-[4px_4px_0px_0px_#560e51] text-left space-y-2"
              >
                <span className="text-xs font-black uppercase font-mono text-[#9b2c98] block">
                  Landed Challenge:
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-[#560e51] uppercase">
                  {wheelSectors[selectedWheelIdx].label}
                </h4>
                <p className="text-sm sm:text-base font-bold text-slate-800 pt-1 leading-relaxed">
                  {wheelSectors[selectedWheelIdx].task}
                </p>

                <div className="pt-3 border-t-2 border-[#560e51]/20 flex justify-between items-center">
                  <span className="text-xs font-mono font-bold text-slate-600">
                    Timer starts when student begins answering!
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => awardPoint('A', 1)}
                      className="px-3 py-1.5 bg-emerald-600 text-white font-black text-xs rounded-xl cursor-pointer"
                    >
                      Team A (+1)
                    </button>
                    <button
                      onClick={() => awardPoint('B', 1)}
                      className="px-3 py-1.5 bg-purple-600 text-white font-black text-xs rounded-xl cursor-pointer"
                    >
                      Team B (+1)
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

          </div>
        )}

        {/* ================================================================= */}
        {/* GAME 6: HOMES VOCABULARY HOT SEAT ARENA 🔥                         */}
        {/* ================================================================= */}
        {activeGame === 'hotseat' && (
          <div className="bg-white rounded-[32px] p-6 sm:p-8 border-4 border-[#560e51] shadow-[8px_8px_0px_0px_#560e51] space-y-6">
            
            {/* Header & Deck Selector */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-fuchsia-100 pb-4 gap-3">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-[#9b2c98] font-mono">
                  Classroom Guesser
                </span>
                <h3 className="text-2xl font-black text-[#560e51] uppercase">🔥 Homes Hot Seat Arena</h3>
              </div>

              {/* Deck Tabs */}
              <div className="flex flex-wrap gap-1.5">
                {(Object.keys(hotseatDecks) as (keyof typeof hotseatDecks)[]).map(k => (
                  <button
                    key={k}
                    onClick={() => {
                      setHotseatDeckKey(k);
                      sound.playClick();
                    }}
                    className={`px-3 py-1 rounded-xl text-xs font-black uppercase tracking-tight border-2 cursor-pointer transition ${
                      hotseatDeckKey === k
                        ? 'bg-[#78c222] text-[#560e51] border-[#560e51] shadow-[2px_2px_0px_0px_#560e51]'
                        : 'bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {hotseatDecks[k].title.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {!hotseatRunning && !hotseatCompleted ? (
              <div className="text-center py-12 bg-[#fefaf0] rounded-2xl border-3 border-[#560e51] space-y-3">
                <Flame className="h-12 w-12 text-amber-500 mx-auto" />
                <h4 className="text-2xl font-black text-[#560e51] uppercase">
                  Ready for the {hotseatDecks[hotseatDeckKey].title} Hot Seat?
                </h4>
                <p className="text-xs sm:text-sm font-bold text-slate-600 max-w-md mx-auto">
                  One student sits with their back to the screen. Classmates describe the dwelling or word without saying it aloud!
                </p>
                <div className="pt-2">
                  <button
                    onClick={startHotseat}
                    className="px-8 py-3.5 bg-[#78c222] hover:bg-[#68ab1c] text-[#560e51] font-black uppercase text-sm sm:text-base rounded-2xl border-3 border-[#560e51] shadow-[4px_4px_0px_0px_#560e51] cursor-pointer"
                  >
                    START HOT SEAT NOW! 🚀
                  </button>
                </div>
              </div>
            ) : hotseatCompleted ? (
              <div className="text-center py-10 bg-emerald-50 rounded-2xl border-3 border-emerald-600 space-y-3">
                <Trophy className="h-14 w-14 text-emerald-600 mx-auto" />
                <h4 className="text-2xl font-black text-emerald-950 uppercase">
                  Hot Seat Round Finished!
                </h4>
                <p className="text-base font-bold text-emerald-900">
                  Total Correct Guesses: <span className="text-2xl font-black font-mono">{hotseatScore}</span> / {activeHotseatList.length}
                </p>
                <div className="flex justify-center gap-3 pt-2">
                  <button
                    onClick={startHotseat}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase rounded-xl cursor-pointer"
                  >
                    Play Deck Again 🔄
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-mono text-xs font-black text-[#9b2c98]">
                    WORD {hotseatWordIdx + 1} OF {activeHotseatList.length}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-rose-600 bg-rose-50 px-3.5 py-1 rounded-xl border border-rose-200 font-mono">
                      ⏱️ {hotseatWordTimer}s
                    </span>
                    <button
                      onClick={() => setIsHotseatPaused(p => !p)}
                      className="p-1.5 bg-slate-100 rounded-lg text-slate-700 cursor-pointer"
                    >
                      {isHotseatPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="bg-[#1e1b4b] text-white p-10 rounded-2xl text-center mb-6 border-3 border-[#560e51] min-h-48 flex flex-col justify-center items-center shadow-xl">
                  {isHotseatHidden ? (
                    <div>
                      <EyeOff className="h-10 w-10 text-slate-400 mx-auto mb-2" />
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                        Target Word is Hidden from Student in Hot Seat
                      </p>
                      <button
                        onClick={() => {
                          setIsHotseatHidden(false);
                          setHotseatWordTimer(20);
                          sound.playClick();
                        }}
                        className="px-6 py-2.5 bg-[#78c222] hover:bg-[#68ab1c] text-[#560e51] font-black text-xs uppercase rounded-xl border-2 border-[#560e51] cursor-pointer"
                      >
                        REVEAL WORD TO CLASSROOM 👁️
                      </button>
                    </div>
                  ) : (
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-[#78c222] font-black block mb-2">
                        Clue Target Word:
                      </span>
                      <h3 className="text-4xl sm:text-5xl font-black text-[#78c222] uppercase tracking-tight">
                        {activeHotseatList[hotseatWordIdx]}
                      </h3>
                      <button
                        onClick={() => speakText(activeHotseatList[hotseatWordIdx])}
                        className="mt-3 px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-mono inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Volume2 className="h-3 w-3" /> Pronounce
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={handleHotseatCorrect}
                    className="py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase text-sm rounded-xl border-2 border-[#560e51] shadow-[3px_3px_0px_0px_#560e51] cursor-pointer"
                  >
                    Guessed Correct! (+1 Pt) ✓
                  </button>
                  <button
                    onClick={handleHotseatPass}
                    className="py-3.5 bg-slate-400 hover:bg-slate-500 text-white font-black uppercase text-sm rounded-xl border-2 border-[#560e51] shadow-[3px_3px_0px_0px_#560e51] cursor-pointer"
                  >
                    Pass / Next Word &rarr;
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

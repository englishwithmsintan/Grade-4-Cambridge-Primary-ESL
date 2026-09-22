import { Flashcard, SATQuestion, SpellingWord } from '../types';

// =============================================================================
// FLASHCARDS: UNIT 3 - HOMES
// =============================================================================
export const FLASHCARDS: Flashcard[] = [
  // --- 3.1 TYPES OF HOMES ---
  {
    id: 'u3-home-1',
    word: 'Stilt house',
    translation: 'Rumah panggung',
    category: 'types-of-homes',
    example: 'In some parts of Asia, people build a stilt house on tall wooden poles so flood water cannot come inside.',
    lesson: '3.1',
    funFact: 'Stilt houses are popular over rivers and coastal beaches to keep families cool, dry, and safe from water.'
  },
  {
    id: 'u3-home-2',
    word: 'Eco-house',
    translation: 'Rumah ramah lingkungan',
    category: 'types-of-homes',
    example: 'An eco-house has solar panels on the roof to provide electricity and uses recycled materials.',
    lesson: '3.1',
    funFact: 'Eco-houses often have earth and green grass on the roof to naturally keep the house warm in winter!'
  },
  {
    id: 'u3-home-3',
    word: 'Apartment',
    translation: 'Apartemen',
    category: 'types-of-homes',
    example: 'In big busy cities, many families live in an apartment on one floor of a very tall building.',
    lesson: '3.1',
    funFact: 'Apartments high up in skyscrapers provide spectacular panoramic views of the city skyline.'
  },
  {
    id: 'u3-home-4',
    word: 'Bungalow',
    translation: 'Rumah bungalo (satu lantai)',
    category: 'types-of-homes',
    example: 'My grandparents love their bungalow because it is on one level and you never have to walk up stairs.',
    lesson: '3.1',
    funFact: 'The word bungalow originally comes from the Bengali word "bangla", describing single-story cottage houses.'
  },
  {
    id: 'u3-home-5',
    word: 'Detached house',
    translation: 'Rumah tapak / rumah terpisah',
    category: 'types-of-homes',
    example: 'A detached house is not connected to any other building, so it usually has a large garden and privacy.',
    lesson: '3.1',
    funFact: 'Detached houses have space on all four sides, perfect for large families and pets!'
  },
  {
    id: 'u3-home-6',
    word: 'Yurt',
    translation: 'Tenda bundar yurt',
    category: 'types-of-homes',
    example: 'In Mongolia, nomadic families live in a yurt which they can pack up and move from place to place.',
    lesson: '3.1',
    funFact: 'Yurts are insulated with thick sheep felt to protect families from freezing steppe winters.'
  },
  {
    id: 'u3-home-7',
    word: 'Houseboat',
    translation: 'Rumah perahu',
    category: 'types-of-homes',
    example: 'Sam lives on a colourful houseboat on the canal, and he loves fishing with his parents.',
    lesson: '3.1',
    funFact: 'In cities like Amsterdam and London, thousands of people live permanently on houseboats moored along waterways.'
  },
  {
    id: 'u3-home-8',
    word: 'Tree house',
    translation: 'Rumah pohon',
    category: 'types-of-homes',
    example: 'He built a cosy wooden tree house in the forest because he loves nature and watching wild birds.',
    lesson: '3.1',
    funFact: 'Tree houses use living tree trunks as foundations without damaging the tree.'
  },
  {
    id: 'u3-home-9',
    word: 'Castle',
    translation: 'Kastil / Istana batu',
    category: 'types-of-homes',
    example: 'The ancient castle in Edinburgh has thick stone walls, high towers, and grand halls.',
    lesson: '3.1',
    funFact: 'Castles were built both as fortified defensive bastions and as grand royal palaces.'
  },

  // --- 3.1 & 3.4 DESCRIPTIVE ADJECTIVES (KEY TEST VOCABULARY) ---
  {
    id: 'u3-adj-1',
    word: 'Enormous',
    translation: 'Sangat besar sekali',
    category: 'adjectives',
    example: 'The Colosseum in Rome is an enormous building that seated over 50,000 spectators.',
    lesson: '3.1',
    funFact: 'Opposite: Tiny (very, very small).'
  },
  {
    id: 'u3-adj-2',
    word: 'Famous',
    translation: 'Terkenal / Masyhur',
    category: 'adjectives',
    example: 'The Eiffel Tower in Paris is one of the most famous landmarks in the world.',
    lesson: '3.4',
    funFact: 'Famous means known and recognized by millions of people across the world.'
  },
  {
    id: 'u3-adj-3',
    word: 'Colourful',
    translation: 'Penuh warna-warni',
    category: 'adjectives',
    example: 'Along the seaside harbour, there are lovely colourful houses painted bright yellow, pink, and blue.',
    lesson: '3.1',
    funFact: 'Having many bright, vivid colours.'
  },
  {
    id: 'u3-adj-4',
    word: 'Comfortable',
    translation: 'Nyaman',
    category: 'adjectives',
    example: 'The living room has a comfortable sofa with lots of soft cushions.',
    lesson: '3.1',
    funFact: 'Opposite: Uncomfortable. In The Hobbit, Baggins’ home was defined by pure comfort!'
  },
  {
    id: 'u3-adj-5',
    word: 'Mysterious',
    translation: 'Misterius / Penuh rahasia',
    category: 'adjectives',
    example: 'The abandoned house at the edge of the forest looked dark and mysterious.',
    lesson: '3.1',
    funFact: 'Something full of unexplained secrets and wonder.'
  },
  {
    id: 'u3-adj-6',
    word: 'Ancient',
    translation: 'Kuno / Sangat tua',
    category: 'adjectives',
    example: 'Workers built the ancient Colosseum almost 2,000 years ago.',
    lesson: '3.4',
    funFact: 'Belonging to very early periods of history, centuries or millennia ago.'
  },
  {
    id: 'u3-adj-7',
    word: 'Tiny',
    translation: 'Sangat kecil',
    category: 'adjectives',
    example: 'The strange shoe-shaped building has tiny windows and a little red door.',
    lesson: '3.1',
    funFact: 'Opposite: Enormous.'
  },
  {
    id: 'u3-adj-8',
    word: 'Wooden',
    translation: 'Terbuat dari kayu',
    category: 'adjectives',
    example: 'The stilt house stands firmly on tall wooden poles.',
    lesson: '3.1',
    funFact: 'Made out of natural wood or timber.'
  },
  {
    id: 'u3-adj-9',
    word: 'Spacious',
    translation: 'Luas / Lapang',
    category: 'adjectives',
    example: 'Their new detached home has a spacious kitchen and a wide open lounge with lots of room.',
    lesson: '3.1',
    funFact: 'Opposite: Cramped (too small, narrow, crowded).'
  },
  {
    id: 'u3-adj-10',
    word: 'Modern',
    translation: 'Modern / Kekinian',
    category: 'adjectives',
    example: 'Dubai is a modern city filled with soaring glass skyscrapers and smart technology.',
    lesson: '3.1',
    funFact: 'Opposite: Old-fashioned / Ancient.'
  },
  {
    id: 'u3-adj-11',
    word: 'Relaxing',
    translation: 'Menenangkan / Santai',
    category: 'adjectives',
    example: 'Listening to the gentle rain from inside the eco-house is very relaxing.',
    lesson: '3.1',
    funFact: 'Makes you feel calm, peaceful, and free from stress.'
  },
  {
    id: 'u3-adj-12',
    word: 'Grand',
    translation: 'Megah / Hebat',
    category: 'adjectives',
    example: 'Buckingham Palace is a grand residence with 600 rooms and golden gates.',
    lesson: '3.4',
    funFact: 'Magnificent, impressive, and very large in scale.'
  },

  // --- 3.2 ECO-HOUSE & SUSTAINABILITY VOCABULARY ---
  {
    id: 'u3-eco-1',
    word: 'Rubbish',
    translation: 'Sampah / Barang terbuang',
    category: 'eco-house',
    example: 'We collect plastic bottles and paper instead of throwing them away as useless rubbish.',
    lesson: '3.2',
    funFact: 'Waste things that people no longer need or want.'
  },
  {
    id: 'u3-eco-2',
    word: 'Rubbish tip',
    translation: 'Tempat pembuangan sampah',
    category: 'eco-house',
    example: 'The owners visited the rubbish tip to find recycled metal and old timber for their eco-house.',
    lesson: '3.2',
    funFact: 'A designated site where people dispose of large pieces of rubbish or scrap.'
  },
  {
    id: 'u3-eco-3',
    word: 'Local materials',
    translation: 'Bahan bangunan lokal / sekitar',
    category: 'eco-house',
    example: 'The builders used local materials like stone, clay, and timber found nearby to avoid transporting goods.',
    lesson: '3.2',
    funFact: 'Using materials sourced within walking distance reduces carbon footprints drastically!'
  },
  {
    id: 'u3-eco-4',
    word: 'Efficiently',
    translation: 'Secara efisien dan hemat',
    category: 'eco-house',
    example: 'An eco-house uses natural resources like sunlight and rainwater efficiently without waste.',
    lesson: '3.2',
    funFact: 'Doing things quickly, well-organised, and with minimum wasted effort or fuel.'
  },
  {
    id: 'u3-eco-5',
    word: 'Solar panels',
    translation: 'Panel surya',
    category: 'eco-house',
    example: 'They installed solar panels on the roof to provide clean electricity for their home appliances.',
    lesson: '3.2',
    funFact: 'Solar photovoltaic cells turn photon rays from sunlight directly into green electrical currents.'
  },
  {
    id: 'u3-eco-6',
    word: 'Rainwater tub',
    translation: 'Tong / Bak penampung air hujan',
    category: 'eco-house',
    example: 'Outside the house, there is a large water tub to collect rainwater for watering the vegetable garden.',
    lesson: '3.2',
    funFact: 'Rainwater harvesting saves clean drinking water from being wasted on lawn irrigation.'
  },

  // --- 3.3 STRANGE BUILDINGS & ARCHITECTURE ---
  {
    id: 'u3-strg-1',
    word: 'Upside-down house',
    translation: 'Rumah terbalik',
    category: 'strange-buildings',
    example: 'The Wonderworks building looks like an upside-down mansion with its roof planted on the ground.',
    lesson: '3.3',
    funFact: 'Inside, all the furniture is bolted to the ceiling so visitors feel like they are walking upside down!'
  },
  {
    id: 'u3-strg-2',
    word: 'Basket building',
    translation: 'Gedung berbentuk keranjang',
    category: 'strange-buildings',
    example: 'The Longaberger headquarters in Ohio is shaped like a giant wooden picnic basket with handles.',
    lesson: '3.3',
    funFact: 'The two handles alone weigh almost 150 tons and are heated in winter to prevent ice build-up!'
  },
  {
    id: 'u3-strg-3',
    word: 'Shoe house',
    translation: 'Rumah berbentuk sepatu',
    category: 'strange-buildings',
    example: 'The Haines Shoe House in Pennsylvania was built by an eccentric shoe salesman in 1948.',
    lesson: '3.3',
    funFact: 'It has five stories, a boot-shaped mailbox, and even a dog house shaped like a shoe!'
  },
  {
    id: 'u3-strg-4',
    word: 'Library bookshelf wall',
    translation: 'Dinding perpustakaan berbentuk rak buku',
    category: 'strange-buildings',
    example: 'The Kansas City Community Library parking garage looks like enormous classic book spines lined up.',
    lesson: '3.3',
    funFact: 'Local citizens voted on which 22 classic literary titles to paint on the 25-foot book facades.'
  },

  // --- 3.4 FAMOUS PLACES ---
  {
    id: 'u3-fam-1',
    word: 'The Colosseum',
    translation: 'Colosseum (amfiteater kuno di Roma)',
    category: 'famous-places',
    example: 'The Colosseum in Rome was built from stone, brick, and sand, where gladiators fought long ago.',
    lesson: '3.4',
    funFact: 'Over 6 million tourists travel there every year by bus or metro.'
  },
  {
    id: 'u3-fam-2',
    word: 'The Prophet’s Nabawi Mosque',
    translation: 'Masjid Nabawi di Madinah',
    category: 'famous-places',
    example: 'Nabawi Mosque in Medina, Saudi Arabia is the second holiest mosque in Islam, founded by Prophet Muhammad SAW.',
    lesson: '3.4',
    funFact: 'Millions of pilgrims visit during Hajj and Umrah to pray peacefully under its giant retractable umbrellas.'
  },
  {
    id: 'u3-fam-3',
    word: 'Machu Picchu',
    translation: 'Machu Picchu (Kota Inca yang Hilang)',
    category: 'famous-places',
    example: 'Machu Picchu is high up in the Andes mountains above the Urubamba River in Peru.',
    lesson: '3.4',
    funFact: 'It was built by Inca emperor Pachacuti and rediscovered by American explorer Hiram Bingham in 1911.'
  },
  {
    id: 'u3-fam-4',
    word: 'The Taj Mahal',
    translation: 'Taj Mahal (India)',
    category: 'famous-places',
    example: 'The Taj Mahal in Agra, India is a magnificent white marble monument with reflecting pools.',
    lesson: '3.4',
    funFact: 'It was designated a UNESCO World Heritage site and one of the New 7 Wonders of the World.'
  },
  {
    id: 'u3-fam-5',
    word: 'Tower of London',
    translation: 'Benteng Menara London',
    category: 'famous-places',
    example: 'The Tower of London is a 1,000-year-old royal fortress built in 1066 on the north bank of the Thames.',
    lesson: '3.4',
    funFact: 'Legend says if the six resident ravens ever fly away from the Tower, the kingdom of Britain will fall!'
  },
  {
    id: 'u3-fam-6',
    word: 'Buckingham Palace',
    translation: 'Istana Buckingham',
    category: 'famous-places',
    example: 'Buckingham Palace has 600 rooms and is the official London residence of the British Royal Family.',
    lesson: '3.4',
    funFact: 'Built in 1705, tourists gather outside to watch the Changing of the Guard ceremony.'
  },

  // --- 3.5 THE HOBBIT VOCABULARY ---
  {
    id: 'u3-hob-1',
    word: 'Comfort',
    translation: 'Kenyamanan',
    category: 'hobbit-words',
    example: 'It was a hobbit-hole, and that means comfort with soft carpets, warm fireplaces, and plenty of food.',
    lesson: '3.5',
    funFact: 'An easy, pleasant, and satisfying feeling without pain or stress.'
  },
  {
    id: 'u3-hob-2',
    word: 'Tunnel',
    translation: 'Terowongan tabung',
    category: 'hobbit-words',
    example: 'The door opened onto a tube-shaped hall like a tunnel, with panelled wooden walls and tiled floors.',
    lesson: '3.5',
    funFact: 'A long passage running underground through a hill.'
  },
  {
    id: 'u3-hob-3',
    word: 'Hole',
    translation: 'Liang / Lubang dalam tanah',
    category: 'hobbit-words',
    example: 'In a hole in the ground there lived a hobbit, but it was not a dirty, nasty hole with worms.',
    lesson: '3.5',
    funFact: 'An open cavity or sheltered hollow in the ground.'
  },
  {
    id: 'u3-hob-4',
    word: 'Fond of',
    translation: 'Sangat menyukai / Gemar',
    category: 'hobbit-words',
    example: 'Bilbo Baggins was very fond of visitors, providing many pegs for their hats and coats.',
    lesson: '3.5',
    funFact: 'Having a warm affection or liking someone or something very much.'
  },
  {
    id: 'u3-hob-5',
    word: 'Meadows',
    translation: 'Padang rumput yang permai',
    category: 'hobbit-words',
    example: 'The round windows looked over his flower garden and green meadows sloping down to the river.',
    lesson: '3.5',
    funFact: 'Open tracts of grassland and wild flora, especially beside a flowing river.'
  },
  {
    id: 'u3-hob-6',
    word: 'Respectable',
    translation: 'Terhormat / Santun berakhlak baik',
    category: 'hobbit-words',
    example: 'The Baggins family was considered very respectable because they were polite, well-behaved, and never caused trouble.',
    lesson: '3.5',
    funFact: 'Regarded by society to be good, proper, and of high social standing.'
  }
];

// =============================================================================
// STORIES, POEMS & PASSAGES (UNIT 3 CURRICULUM & SAT EXAM TEXTS)
// =============================================================================
export const STORIES = {
  // Part 1 Listening Audio Track for Summative Assessment Mock Test
  listeningHomesAroundTheWorld: {
    title: 'Part 1: Listening Audio - Homes Around the World',
    text: `Homes Around the World. People live in many different kinds of homes around the world. In Mongolia, some families live in a round tent called a yurt, and they can move it easily from place to place. In some parts of Asia, people build a stilt house on tall wooden poles, so the water cannot come inside. In big, busy cities, many families live in an apartment on one floor of a very tall building. In quiet villages, you can find a bungalow which is a small house with only one floor. Every home is different, but they all keep families safe and warm.`,
    wordBox: ['yurt', 'bungalow', 'apartment', 'stilt house', 'homes', 'detached house']
  },

  // Part 3 Grammar Reading Context
  ecoHouseOnTheHill: {
    title: 'Part 3: The Eco-House on the Hill',
    text: `Mr. Baggins lives in an eco-house on a green hill. He used local materials to build the walls, so they are made of stone and mud. There are big windows to let in natural light, and there are solar panels on the roof to provide energy for the lights. Grass grows on the roof to keep the house warm in winter, and outside there is a large tub to collect rainwater for his vegetable garden. Next to his house there is a strange building shaped like a giant shoe. It has tiny windows and a bright red door, and nobody knows what it is. Nobody lives there, and through the window you can see lots and lots of books. It might be a museum, or it could be a small library. It can't be a supermarket, because it is much too small!`
  },

  // Part 4 Reading Comprehension Context
  colosseumReading: {
    title: 'Part 4: The Colosseum',
    text: `The Colosseum is an ancient building in the middle of Rome, the capital city of Italy. People started to build it almost 2,000 years ago, and workers used stone, brick and sand to make its thick walls. It is enormous, more than 50,000 people could sit inside to watch shows. Long ago, gladiators came here to fight in front of big crowds. Today the Colosseum is broken in some places, because of earthquakes and because people took its stones to build other things. Even so, more than six million visitors come every year to see it. You can travel there by bus or by metro, and it is a good idea to buy your ticket online to save time. In my opinion, it is the most spectacular building in Rome, and standing inside it feels like travelling back in time.`
  },

  // Lesson 3.5 The Hobbit Extract by J.R.R. Tolkien
  theHobbitExtract: {
    title: 'The Hobbit',
    author: 'by J.R.R. Tolkien',
    paragraphs: [
      {
        num: 1,
        heading: 'Description of a hobbit-hole',
        text: 'In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down or to eat: it was a hobbit-hole, and that means comfort.'
      },
      {
        num: 2,
        heading: 'The hobbit’s house',
        text: 'It had a perfectly round door like a porthole, painted green, with a shiny yellow brass knob in the exact middle. The door opened on to a tube-shaped hall like a tunnel: a very comfortable tunnel without smoke, with panelled walls, and floors tiled and carpeted, provided with polished chairs, and lots and lots of pegs for hats and coats - the hobbit was fond of visitors. The tunnel wound on and on, going fairly but not quite straight into the side of the hill - The Hill, as all the people for many miles around called it - and many little round doors opened out of it, first on the one side and then on another. No going upstairs for the hobbit: bedrooms, bathrooms, cellars, pantries (lots of these), wardrobes (he had whole rooms devoted to clothes), kitchens, dining-rooms, all were on the same floor, and indeed on the same passage. The best rooms were all on the left-hand side (going in), for these were the only ones to have windows, deep-set round windows looking over his garden, and meadows beyond, sloping down to the river.'
      },
      {
        num: 3,
        heading: 'What is a hobbit like?',
        text: 'This hobbit was a very well-to-do hobbit, and his name was Baggins. The Bagginses had lived in the neighbourhood of The Hill for time out of mind, and people considered them very respectable, not only because most of them were rich, but also because they never had any adventures or did anything unexpected: you could tell what a Baggins would say on any question without the bother of asking him. This is a story of how a Baggins had an adventure, and found himself doing and saying things altogether unexpected. He may have lost the neighbours\' respect, but he gained - well, you will see whether he gained anything in the end.'
      }
    ],
    hadithConnection: {
      hadith: '"Whoever believes in Allah and the Last Day, should serve his guests generously."',
      source: 'Hadith Sahih Al-Bukhari',
      lesson: 'In The Hobbit, Baggins prepared many coat pegs and comfortable chairs because he was "fond of visitors". Islam teaches us that being hospitable, welcoming guests with warm smiles and generous food, is a core duty of faith.'
    },
    quranConnection: {
      surah: 'Surah An-Nahl (16:80)',
      arabic: 'وَاللَّهُ جَعَلَ لَكُم مِّن بُيُوتِكُمْ سَكَنًا',
      translation: '"And Allah has made for you from your homes a place of rest..."',
      reflection: 'Every home is a divine blessing and refuge where families find peace, comfort, and security.'
    },
    duaHomes: {
      surah: 'Du\'a for a Blessed Home (Surah Al-Mu\'minun 23:29)',
      arabic: 'رَّبِّ أَنزِلْنِي مُنزَلًا مُّبَارَكًا وَأَنتَ خَيْرُ الْمُنزِلِينَ',
      translation: '"My Lord, let me land at a blessed landing place, and You are the best to accommodate."'
    }
  },

  // Backward compatibility mock
  plutoPoem: {
    title: 'The Hobbit: Bag End Under the Hill',
    author: 'by J.R.R. Tolkien',
    verses: [
      {
        verseNum: 1,
        lines: [
          'In a hole in the ground there lived a hobbit,',
          'Not dirty, wet, nor bare with sandy grit.',
          'It had a green round door like a ship’s porthole,',
          'And that meant comfort in his cosy hole!'
        ],
        rhymes: ['hobbit / grit', 'porthole / hole']
      },
      {
        verseNum: 2,
        lines: [
          'A tube-shaped tunnel with polished chairs,',
          'All on one floor with no steep stairs.',
          'He was fond of guests who knocked to visit,',
          'With lots of hat pegs and coats to fit it!'
        ],
        rhymes: ['chairs / stairs', 'visit / fit it']
      }
    ]
  }
};

// =============================================================================
// GRAMMAR PRACTICE LABS (UNIT 3: HOMES)
// =============================================================================
export const GRAMMAR_EXERCISES = {
  // 1. Infinitives of Purpose ("to + verb")
  infinitivesOfPurpose: [
    {
      action: 'They used local wood',
      purpose: 'to build the sturdy roof',
      verb: 'build',
      options: ['to build', 'building', 'built', 'to builds'],
      correct: 'to build',
      hint: 'Use "to + base verb" to explain the purpose (why they did it).'
    },
    {
      action: 'The house has solar panels',
      purpose: 'to provide clean energy for the lights',
      verb: 'provide',
      options: ['providing', 'to provide', 'for provide', 'to provides'],
      correct: 'to provide',
      hint: 'Infinitives of purpose take "to + provide".'
    },
    {
      action: 'There are big windows',
      purpose: 'to let in lots of natural sunlight',
      verb: 'let',
      options: ['to let', 'to letting', 'letted', 'for let'],
      correct: 'to let',
      hint: '"to let" explains why the windows are big.'
    },
    {
      action: 'Grass grows on the roof',
      purpose: 'to keep the eco-house warm in winter',
      verb: 'keep',
      options: ['to keep', 'keeping', 'to kept', 'for keep'],
      correct: 'to keep',
      hint: '"to keep" explains the purpose of the turf grass roof.'
    },
    {
      action: 'He put a large tub outside',
      purpose: 'to collect rainwater for the garden',
      verb: 'collect',
      options: ['for collecting', 'to collect', 'to collects', 'collected'],
      correct: 'to collect',
      hint: 'Why did he put a tub outside? "To collect rainwater".'
    },
    {
      action: 'Lina always unplugs her phone charger',
      purpose: 'to save electricity and energy',
      verb: 'save',
      options: ['to save', 'saving', 'to saved', 'for save'],
      correct: 'to save',
      hint: 'Why does Lina unplug the charger? "To save energy".'
    }
  ],

  // 2. Modal Verbs of Possibility (can't, might, could, must)
  modalVerbsOfPossibility: [
    {
      sentence: 'I am not sure what that odd shoe building is. It ____________ be a museum.',
      options: ['might', 'must', 'can’t'],
      correct: 'might',
      certainty: '50% (Uncertain possibility)',
      explanation: '"I am not sure" signals uncertainty, so we use might or could.'
    },
    {
      sentence: 'Nobody lives in that building, so it ____________ be a family home.',
      options: ['can’t', 'must', 'could'],
      correct: 'can’t',
      certainty: '0% (Impossible)',
      explanation: 'If nobody lives there, it is impossible for it to be a family home!'
    },
    {
      sentence: 'There are thousands of books on shelves inside, so it ____________ be a library!',
      options: ['must', 'might', 'can’t'],
      correct: 'must',
      certainty: '100% (Certainty based on clear evidence)',
      explanation: 'Thousands of books make it almost certain to be a library.'
    },
    {
      sentence: 'That shoe building is much too small, so it ____________ be a supermarket.',
      options: ['can’t', 'might', 'must'],
      correct: 'can’t',
      certainty: '0% (Impossible)',
      explanation: 'Supermarkets require huge floor space; a tiny shoe house can’t be one.'
    },
    {
      sentence: 'Ana is waving at us through the window. She ____________ be inside the house!',
      options: ['must', 'can’t', 'might not'],
      correct: 'must',
      certainty: '100% (Certainty)',
      explanation: 'We can clearly see her waving, so she must be inside.'
    },
    {
      sentence: 'Joe is very tall, so he ____________ be only four years old!',
      options: ['can’t', 'could', 'must'],
      correct: 'can’t',
      certainty: '0% (Impossible)',
      explanation: 'A four-year-old child cannot be exceptionally tall like an adult.'
    }
  ],

  // 3. Yes/No Questions with Auxiliary Verbs & Rising Intonation (↑)
  yesNoQuestions: [
    {
      question: 'Is it made from books? ↑',
      auxiliary: 'Is (verb be)',
      answerType: 'Yes, it is. / No, it isn\'t.',
      options: ['Is', 'Does', 'Have', 'Do'],
      correct: 'Is',
      intonation: 'Rising intonation ↑ at the end of yes/no questions.'
    },
    {
      question: 'Does it look like an upside-down house? ↑',
      auxiliary: 'Does (auxiliary do)',
      answerType: 'Yes, it does. / No, it doesn\'t.',
      options: ['Does', 'Is', 'Are', 'Have'],
      correct: 'Does',
      intonation: 'Singular third person with main verb "look" uses "Does".'
    },
    {
      question: 'Are there solar panels on the roof? ↑',
      auxiliary: 'Are (verb be plural)',
      answerType: 'Yes, there are. / No, there aren\'t.',
      options: ['Are', 'Is', 'Do', 'Does'],
      correct: 'Are',
      intonation: 'Plural subject "solar panels" takes "Are there...?"'
    },
    {
      question: 'Could it be an ancient castle? ↑',
      auxiliary: 'Could (modal auxiliary)',
      answerType: 'Yes, it could. / No, it couldn\'t.',
      options: ['Could', 'Does', 'Is', 'Do'],
      correct: 'Could',
      intonation: 'Expressing polite guessing or possibility with modal "Could".'
    }
  ],

  // 4. Fact vs. Opinion Detective (Workbook Pg 38 & Lesson 3.4)
  factVsOpinion: [
    {
      statement: 'The Colosseum was built almost 2,000 years ago from stone, brick and sand.',
      type: 'FACT',
      reason: 'This can be proven by historical records, archaeology, and dates.'
    },
    {
      statement: 'In my opinion, the Colosseum is the most spectacular building in Rome.',
      type: 'OPINION',
      reason: 'Contains "In my opinion" and descriptive value words ("most spectacular").'
    },
    {
      statement: 'More than six million visitors come every year to see it.',
      type: 'FACT',
      reason: 'Measurable statistic recorded by museum ticket sales.'
    },
    {
      statement: 'Standing inside the ancient amphitheater feels like travelling back in time.',
      type: 'OPINION',
      reason: 'A personal feeling that depends on individual imagination.'
    },
    {
      statement: 'You can travel to the monument by bus or by metro.',
      type: 'FACT',
      reason: 'A verifiable public transportation fact.'
    }
  ],

  // Backward compatibility alias keys for GrammarPractice component
  comparatives: [
    { sentence: 'A detached house is ____________ (spacious) than a studio apartment.', options: ['more spacious', 'spaciouser', 'most spacious'], correct: 'more spacious', explanation: 'Long adjective "spacious" takes "more spacious than".' },
    { sentence: 'The ancient Colosseum is ____________ (old) than Tower Bridge.', options: ['older', 'more old', 'oldest'], correct: 'older', explanation: 'Short adjective "old" adds -er: older than.' },
    { sentence: 'An eco-house is ____________ (efficient) than an old castle.', options: ['more efficient', 'efficienter', 'most efficient'], correct: 'more efficient', explanation: 'Multi-syllable adjective takes "more efficient".' }
  ],
  superlatives: [
    { sentence: 'The Colosseum is the ____________ (famous) amphitheater in Europe.', options: ['most famous', 'famousest', 'more famous'], correct: 'most famous', explanation: 'Superlative of famous is "the most famous".' },
    { sentence: 'The Burj Khalifa is the ____________ (tall) building in the world.', options: ['tallest', 'most tall', 'taller'], correct: 'tallest', explanation: 'Short adjective adds -est: the tallest.' }
  ],
  presentSimpleFacts: [
    { sentence: 'Grass ____________ (grow) on the roof to insulate the house.', options: ['grows', 'grow', 'growing'], correct: 'grows', explanation: 'Singular subject "Grass" takes "grows".' },
    { sentence: 'Solar panels ____________ (provide) energy for lighting.', options: ['provide', 'provides', 'providing'], correct: 'provide', explanation: 'Plural subject "Solar panels" takes "provide".' }
  ],
  rhymeDetective: [
    { word1: 'porthole', word2: 'hole', options: ['hole', 'ship', 'door', 'brass'], correct: 'hole', explanation: 'Porthole and hole both end with the /oʊl/ sound!' },
    { word1: 'stairs', word2: 'chairs', options: ['chairs', 'floors', 'tunnel', 'round'], correct: 'chairs', explanation: 'Stairs and chairs rhyme with the /ɛərz/ sound!' }
  ]
};

// =============================================================================
// COMPLETE MOCK SAT / ESL PS EXAM (MATCHING EXACT SDIT AULIYA ASSESSMENT)
// =============================================================================

export const PART_2_DEFINITIONS = [
  { letter: 'A', text: 'has lots of bright colours' },
  { letter: 'B', text: 'known by lots of people' },
  { letter: 'C', text: 'very old' },
  { letter: 'D', text: 'with lots of secrets' },
  { letter: 'E', text: 'very, very big (Example: 0. enormous)' },
  { letter: 'F', text: 'nice to sit or relax in' },
  { letter: 'G', text: 'with a lot of room inside' },
  { letter: 'H', text: 'new, not old-fashioned' },
  { letter: 'I', text: 'makes you feel calm' },
  { letter: 'J', text: 'made of wood' },
  { letter: 'K', text: 'very, very small' },
];

export const MOCK_SAT_QUESTIONS: SATQuestion[] = [
  // --- PART 1: LISTENING (5 Points) ---
  // Passage: "HOMES AROUND THE WORLD"
  // Word Box: yurt, bungalow, apartment, stilt house, homes, detached house
  {
    id: 1,
    number: 1,
    category: 'listening',
    part: 1,
    points: 1,
    question: 'Fill in blank (1): "People live in many different kinds of (1) ____________ around the world."',
    options: ['homes', 'yurt', 'bungalow', 'apartment', 'stilt house', 'detached house'],
    correctAnswer: 'homes',
    explanation: 'The opening line states: "People live in many different kinds of homes around the world."',
    hint: 'Listen to the first sentence introducing where people live globally.',
    blankWordOptions: ['homes', 'yurt', 'bungalow', 'apartment', 'stilt house', 'detached house']
  },
  {
    id: 2,
    number: 2,
    category: 'listening',
    part: 1,
    points: 1,
    question: 'Fill in blank (2): "In Mongolia, some families live in a round tent called a (2) ____________ and they can move it easily from place to place."',
    options: ['yurt', 'bungalow', 'apartment', 'stilt house', 'homes', 'detached house'],
    correctAnswer: 'yurt',
    explanation: 'A traditional circular felt tent in Mongolia is called a yurt.',
    hint: 'A round tent used by nomads in Mongolia that moves easily.',
    blankWordOptions: ['homes', 'yurt', 'bungalow', 'apartment', 'stilt house', 'detached house']
  },
  {
    id: 3,
    number: 3,
    category: 'listening',
    part: 1,
    points: 1,
    question: 'Fill in blank (3): "In some parts of Asia, people build a (3) ____________ on tall wooden poles, so the water cannot come inside."',
    options: ['stilt house', 'yurt', 'bungalow', 'apartment', 'homes', 'detached house'],
    correctAnswer: 'stilt house',
    explanation: 'Houses elevated on tall poles above water or muddy ground are called stilt houses.',
    hint: 'Houses built on tall wooden poles to protect from water.',
    blankWordOptions: ['homes', 'yurt', 'bungalow', 'apartment', 'stilt house', 'detached house']
  },
  {
    id: 4,
    number: 4,
    category: 'listening',
    part: 1,
    points: 1,
    question: 'Fill in blank (4): "In big, busy cities, many families live in an (4) ____________ on one floor of a very tall building."',
    options: ['apartment', 'yurt', 'bungalow', 'stilt house', 'homes', 'detached house'],
    correctAnswer: 'apartment',
    explanation: 'Note the article "an", matching the vowel in apartment (one floor of a tall skyscraper).',
    hint: 'Follows the article "an" in big, busy cities.',
    blankWordOptions: ['homes', 'yurt', 'bungalow', 'apartment', 'stilt house', 'detached house']
  },
  {
    id: 5,
    number: 5,
    category: 'listening',
    part: 1,
    points: 1,
    question: 'Fill in blank (5): "In quiet villages, you can find a (5) ____________ which is a small house with only one floor."',
    options: ['bungalow', 'yurt', 'apartment', 'stilt house', 'homes', 'detached house'],
    correctAnswer: 'bungalow',
    explanation: 'A single-story residential home with only one level is a bungalow.',
    hint: 'A small house with only one floor and no stairs.',
    blankWordOptions: ['homes', 'yurt', 'bungalow', 'apartment', 'stilt house', 'detached house']
  },

  // --- PART 2: VOCABULARY / ADJECTIVES (10 Points) ---
  // Match each word to its meaning (A-K)
  // 0. Enormous [E: very, very big - Example]
  {
    id: 6,
    number: 6,
    category: 'vocabulary',
    part: 2,
    points: 1,
    adjective: 'famous',
    question: 'Match 1. famous to its definition:',
    options: [
      'B. known by lots of people',
      'A. has lots of bright colours',
      'C. very old',
      'D. with lots of secrets'
    ],
    correctAnswer: 'B. known by lots of people',
    matchLetter: 'B',
    explanation: 'Famous means widely recognized and known by lots of people.',
    hint: 'Think of famous landmarks like the Eiffel Tower or Big Ben.'
  },
  {
    id: 7,
    number: 7,
    category: 'vocabulary',
    part: 2,
    points: 1,
    adjective: 'colourful',
    question: 'Match 2. colourful to its definition:',
    options: [
      'A. has lots of bright colours',
      'B. known by lots of people',
      'I. makes you feel calm',
      'F. nice to sit or relax in'
    ],
    correctAnswer: 'A. has lots of bright colours',
    matchLetter: 'A',
    explanation: 'Colourful describes items decorated with many vivid, bright colours.',
    hint: 'Look for the keyword "bright colours".'
  },
  {
    id: 8,
    number: 8,
    category: 'vocabulary',
    part: 2,
    points: 1,
    adjective: 'comfortable',
    question: 'Match 3. comfortable to its definition:',
    options: [
      'F. nice to sit or relax in',
      'G. with a lot of room inside',
      'I. makes you feel calm',
      'K. very, very small'
    ],
    correctAnswer: 'F. nice to sit or relax in',
    matchLetter: 'F',
    explanation: 'Comfortable describes a sofa or home that is nice to sit or relax in.',
    hint: 'Opposite of uncomfortable; cozy to sit in.'
  },
  {
    id: 9,
    number: 9,
    category: 'vocabulary',
    part: 2,
    points: 1,
    adjective: 'mysterious',
    question: 'Match 4. mysterious to its definition:',
    options: [
      'D. with lots of secrets',
      'C. very old',
      'H. new, not old-fashioned',
      'J. made of wood'
    ],
    correctAnswer: 'D. with lots of secrets',
    matchLetter: 'D',
    explanation: 'Mysterious means puzzling, enigmatic, or having lots of secrets.',
    hint: 'Related to mysteries and hidden secrets.'
  },
  {
    id: 10,
    number: 10,
    category: 'vocabulary',
    part: 2,
    points: 1,
    adjective: 'ancient',
    question: 'Match 5. ancient to its definition:',
    options: [
      'C. very old',
      'H. new, not old-fashioned',
      'G. with a lot of room inside',
      'E. very, very big'
    ],
    correctAnswer: 'C. very old',
    matchLetter: 'C',
    explanation: 'Ancient means existing from a long time ago in history; very old.',
    hint: 'Built thousands of years ago like the Colosseum.'
  },
  {
    id: 11,
    number: 11,
    category: 'vocabulary',
    part: 2,
    points: 1,
    adjective: 'tiny',
    question: 'Match 6. tiny to its definition:',
    options: [
      'K. very, very small',
      'E. very, very big',
      'G. with a lot of room inside',
      'F. nice to sit or relax in'
    ],
    correctAnswer: 'K. very, very small',
    matchLetter: 'K',
    explanation: 'Tiny means minuscule; very, very small.',
    hint: 'The opposite of enormous.'
  },
  {
    id: 12,
    number: 12,
    category: 'vocabulary',
    part: 2,
    points: 1,
    adjective: 'wooden',
    question: 'Match 7. wooden to its definition:',
    options: [
      'J. made of wood',
      'A. has lots of bright colours',
      'H. new, not old-fashioned',
      'D. with lots of secrets'
    ],
    correctAnswer: 'J. made of wood',
    matchLetter: 'J',
    explanation: 'Wooden denotes an object constructed or made out of wood.',
    hint: 'Material derived from trees and timber.'
  },
  {
    id: 13,
    number: 13,
    category: 'vocabulary',
    part: 2,
    points: 1,
    adjective: 'spacious',
    question: 'Match 8. spacious to its definition:',
    options: [
      'G. with a lot of room inside',
      'E. very, very big',
      'F. nice to sit or relax in',
      'H. new, not old-fashioned'
    ],
    correctAnswer: 'G. with a lot of room inside',
    matchLetter: 'G',
    explanation: 'Spacious means roomy, having plenty of floor area and space inside.',
    hint: 'Contains the root word "space".'
  },
  {
    id: 14,
    number: 14,
    category: 'vocabulary',
    part: 2,
    points: 1,
    adjective: 'modern',
    question: 'Match 9. modern to its definition:',
    options: [
      'H. new, not old-fashioned',
      'C. very old',
      'I. makes you feel calm',
      'J. made of wood'
    ],
    correctAnswer: 'H. new, not old-fashioned',
    matchLetter: 'H',
    explanation: 'Modern means relating to present or recent times; contemporary and new.',
    hint: 'Opposite of ancient and old-fashioned.'
  },
  {
    id: 15,
    number: 15,
    category: 'vocabulary',
    part: 2,
    points: 1,
    adjective: 'relaxing',
    question: 'Match 10. relaxing to its definition:',
    options: [
      'I. makes you feel calm',
      'F. nice to sit or relax in',
      'A. has lots of bright colours',
      'D. with lots of secrets'
    ],
    correctAnswer: 'I. makes you feel calm',
    matchLetter: 'I',
    explanation: 'Relaxing means restful, tranquil, and causing one to feel calm.',
    hint: 'Brings peace and relieves tension.'
  },

  // --- PART 3: GRAMMAR (10 Points) ---
  // Text: "THE ECO-HOUSE ON THE HILL"
  // Section A: Complete sentences using "to + verb" (infinitives of purpose)
  {
    id: 16,
    number: 16,
    category: 'grammar',
    part: 3,
    points: 1,
    question: 'Complete sentence 1: "He used local materials ____________ (build) the walls."',
    options: ['to build', 'building', 'built', 'to building'],
    correctAnswer: 'to build',
    explanation: 'Infinitives of purpose take "to + base verb": to build.',
    hint: 'Use "to" plus the verb in parentheses: (build).'
  },
  {
    id: 17,
    number: 17,
    category: 'grammar',
    part: 3,
    points: 1,
    question: 'Complete sentence 2: "There are big windows ____________ (let) in natural light."',
    options: ['to let', 'letting', 'to letting', 'for let'],
    correctAnswer: 'to let',
    explanation: 'Infinitives of purpose take "to + base verb": to let.',
    hint: 'Use "to" plus the verb in parentheses: (let).'
  },
  {
    id: 18,
    number: 18,
    category: 'grammar',
    part: 3,
    points: 1,
    question: 'Complete sentence 3: "There are solar panels on the roof ____________ (provide) energy for the lights."',
    options: ['to provide', 'providing', 'to provides', 'for provide'],
    correctAnswer: 'to provide',
    explanation: 'Infinitives of purpose take "to + base verb": to provide.',
    hint: 'Use "to" plus the verb in parentheses: (provide).'
  },
  {
    id: 19,
    number: 19,
    category: 'grammar',
    part: 3,
    points: 1,
    question: 'Complete sentence 4: "Grass grows on the roof ____________ (keep) the house warm in winter."',
    options: ['to keep', 'keeping', 'to keeping', 'for keep'],
    correctAnswer: 'to keep',
    explanation: 'Infinitives of purpose take "to + base verb": to keep.',
    hint: 'Use "to" plus the verb in parentheses: (keep).'
  },
  {
    id: 20,
    number: 20,
    category: 'grammar',
    part: 3,
    points: 1,
    question: 'Complete sentence 5: "He put a large tub outside ____________ (collect) rainwater."',
    options: ['to collect', 'collecting', 'to collects', 'for collecting'],
    correctAnswer: 'to collect',
    explanation: 'Infinitives of purpose take "to + base verb": to collect.',
    hint: 'Use "to" plus the verb in parentheses: (collect).'
  },

  // Section B: Modal Verbs of Possibility
  {
    id: 21,
    number: 21,
    category: 'grammar',
    part: 3,
    points: 1,
    question: 'Complete sentence 6: "I am not sure what the strange building is. It ____________ be a museum." (might / must)',
    options: ['might', 'must'],
    correctAnswer: 'might',
    explanation: '"I am not sure" expresses uncertainty (~50% possibility), so we use might.',
    hint: 'Look at the phrase "I am not sure" - is the speaker 100% sure or guessing?'
  },
  {
    id: 22,
    number: 22,
    category: 'grammar',
    part: 3,
    points: 1,
    question: 'Complete sentence 7: "Nobody lives there, so it ____________ be a family home." (can’t / must)',
    options: ['can\'t', 'must'],
    correctAnswer: 'can\'t',
    explanation: 'If nobody lives there, it is impossible (0%) for it to be a family home, so we use can’t.',
    hint: 'Can it be a family home if nobody lives there at all?'
  },
  {
    id: 23,
    number: 23,
    category: 'grammar',
    part: 3,
    points: 1,
    question: 'Complete sentence 8: "There are lots and lots of books inside, so it ____________ be a library!" (might / must)',
    options: ['must', 'might'],
    correctAnswer: 'must',
    explanation: 'Having lots and lots of books provides strong evidence of certainty (100%), so we use must.',
    hint: 'Strong evidence of lots of books makes the speaker completely sure.'
  },
  {
    id: 24,
    number: 24,
    category: 'grammar',
    part: 3,
    points: 1,
    question: 'Complete sentence 9: "It is much too small, so it ____________ be a supermarket." (can’t / might)',
    options: ['can\'t', 'might'],
    correctAnswer: 'can\'t',
    explanation: 'Being "much too small" makes it impossible to be a supermarket, so we use can’t.',
    hint: 'A tiny shoe building cannot possibly hold aisles of supermarket goods.'
  },
  {
    id: 25,
    number: 25,
    category: 'grammar',
    part: 3,
    points: 1,
    question: 'Complete question 10: "____________ it be a school?" (Could / Does)',
    options: ['Could', 'Does'],
    correctAnswer: 'Could',
    explanation: 'We use the modal auxiliary "Could" to ask about a possible identity ("Could it be...?" vs "Does it be" which is ungrammatical).',
    hint: 'Which auxiliary pairs with the base verb "be" to express possibility?'
  },

  // --- PART 4: READING COMPREHENSION (10 Points) ---
  // Text: "THE COLOSSEUM"
  {
    id: 26,
    number: 26,
    category: 'reading',
    part: 4,
    points: 1,
    question: '1. Where is the Colosseum located?',
    options: [
      'a) In the middle of Rome',
      'b) In a forest',
      'c) In the sea',
      'd) On a mountain'
    ],
    correctAnswer: 'a) In the middle of Rome',
    explanation: 'Sentence 1 states: "The Colosseum is an ancient building in the middle of Rome, the capital city of Italy."',
    hint: 'Check the very first line of the Colosseum text.'
  },
  {
    id: 27,
    number: 27,
    category: 'reading',
    part: 4,
    points: 1,
    question: '2. What did workers use to build the Colosseum?',
    options: [
      'a) Wood and grass',
      'b) Stone, brick and sand',
      'c) Glass and metal',
      'd) Mud and straw'
    ],
    correctAnswer: 'b) Stone, brick and sand',
    explanation: 'The text states: "...workers used stone, brick and sand to make its thick walls."',
    hint: 'Look at what materials were used for its thick walls.'
  },
  {
    id: 28,
    number: 28,
    category: 'reading',
    part: 4,
    points: 1,
    question: '3. Who fought in the Colosseum long ago?',
    options: [
      'a) Gladiators',
      'b) Professors',
      'c) Builders',
      'd) Emperors'
    ],
    correctAnswer: 'a) Gladiators',
    explanation: 'The text states: "Long ago, gladiators came here to fight in front of big crowds."',
    hint: 'Fierce Roman fighters who fought in front of big crowds.'
  },
  {
    id: 29,
    number: 29,
    category: 'reading',
    part: 4,
    points: 1,
    question: '4. How many visitors come to see the Colosseum every year?',
    options: [
      'a) More than 6 million',
      'b) About 2,000',
      'c) More than 50,000',
      'd) About 500'
    ],
    correctAnswer: 'a) More than 6 million',
    explanation: 'Paragraph 2 states: "Even so, more than six million visitors come every year to see it."',
    hint: 'Look for the annual tourist visitor count in the second paragraph.'
  },
  {
    id: 30,
    number: 30,
    category: 'reading',
    part: 4,
    points: 1,
    question: '5. Which heading best matches this sentence: "You can travel there by bus or by metro"?',
    options: [
      'a) Location',
      'b) Historical facts',
      'c) Travel information',
      'd) Opinions'
    ],
    correctAnswer: 'c) Travel information',
    explanation: 'Guidance on transportation (buses, trains, tickets) belongs to "Travel information".',
    hint: 'Explains how tourists get there.'
  },
  {
    id: 31,
    number: 31,
    category: 'reading',
    part: 4,
    points: 2,
    question: '6. Find one FACT and one OPINION from the text about the Colosseum. (2 points)',
    options: [
      'FACT: Workers used stone, brick and sand. | OPINION: In my opinion, it is the most spectacular building in Rome.',
      'FACT: Standing inside it feels nice. | OPINION: Rome is in Italy.',
      'FACT: Gladiators were very cool. | OPINION: It was built 2,000 years ago.',
      'FACT: People love holidays. | OPINION: Over 50,000 people could sit inside.'
    ],
    correctAnswer: 'FACT: Workers used stone, brick and sand. | OPINION: In my opinion, it is the most spectacular building in Rome.',
    explanation: 'Facts are provable truths (materials, numbers, dates). Opinions express subjective thoughts/feelings ("In my opinion, it is the most spectacular...").',
    hint: 'Look for phrases that state historical facts vs phrases with "In my opinion".'
  },
  {
    id: 32,
    number: 32,
    category: 'reading',
    part: 4,
    points: 3,
    question: '7. According to the text, how do we travel to the Colosseum? (3 points)',
    options: [
      'You can travel there by bus or by metro.',
      'You can only travel there by helicopter.',
      'You must walk on foot from Paris.',
      'You can travel there by camel or boat.'
    ],
    correctAnswer: 'You can travel there by bus or by metro.',
    explanation: 'The text directly states: "You can travel there by bus or by metro, and it is a good idea to buy your ticket online to save time."',
    hint: 'Look for the two public transportation methods named in paragraph 2.'
  },

  // --- PART 5: WRITING (15 Points) ---
  {
    id: 33,
    number: 33,
    category: 'writing',
    part: 5,
    points: 15,
    question: 'Part 5: My Dream Home Paragraph (40–60 Words)',
    correctAnswer: 'Architect paragraph written using Unit 3 adjectives, infinitives of purpose, and materials.',
    explanation: 'Write a 40–60 word paragraph answering 5 simple steps: home type, location, materials, eco-feature with "to + verb", and feeling adjectives (cosy, spacious, comfortable).',
    hint: 'Use the 5 simple steps: 1. Home & location, 2. Materials, 3. "to + verb" (to make electricity), 4. Special door/rooms, 5. Why you love it!'
  }
];

// =============================================================================
// MOCK SAT EXAM · QUESTION SET B (SAME ORIGINAL TEST QUESTIONS - SHUFFLED NUMBERS)
// Exact questions from the SDIT Auliya & Cambridge Primary Grade 4 ESL Assessment Paper,
// with question order / numbers shuffled for challenge & anti-memorization practice.
// =============================================================================

export const PART_2_DEFINITIONS_SET_B = PART_2_DEFINITIONS;

export const MOCK_SAT_QUESTIONS_SET_B: SATQuestion[] = [
  // --- PART 1: LISTENING (5 Points) ---
  // Source: "Homes Around the World" Audio Track (Exact Original Test Blanks, Shuffled Order)
  // Word Box: yurt | bungalow | apartment | stilt house | homes | detached house
  {
    id: 101,
    number: 1,
    category: 'listening',
    part: 1,
    points: 1,
    question: 'Fill in blank (3): "In some parts of Asia, people build a (3) ____________ on tall wooden poles, so the water cannot come inside."',
    options: ['stilt house', 'yurt', 'bungalow', 'apartment', 'homes', 'detached house'],
    correctAnswer: 'stilt house',
    explanation: 'A house raised on tall wooden poles above water or damp ground is called a stilt house.',
    hint: 'Houses built on tall wooden poles to protect from water.',
    blankWordOptions: ['homes', 'yurt', 'bungalow', 'apartment', 'stilt house', 'detached house']
  },
  {
    id: 102,
    number: 2,
    category: 'listening',
    part: 1,
    points: 1,
    question: 'Fill in blank (1): "People live in many different kinds of (1) ____________ around the world."',
    options: ['homes', 'yurt', 'bungalow', 'apartment', 'stilt house', 'detached house'],
    correctAnswer: 'homes',
    explanation: 'The opening line states: "People live in many different kinds of homes around the world."',
    hint: 'Listen to the first sentence about where families live.',
    blankWordOptions: ['homes', 'yurt', 'bungalow', 'apartment', 'stilt house', 'detached house']
  },
  {
    id: 103,
    number: 3,
    category: 'listening',
    part: 1,
    points: 1,
    question: 'Fill in blank (5): "In quiet villages, you can find a (5) ____________ which is a small house with only one floor."',
    options: ['bungalow', 'yurt', 'apartment', 'stilt house', 'homes', 'detached house'],
    correctAnswer: 'bungalow',
    explanation: 'A single-story residential home with only one level is a bungalow.',
    hint: 'A small house with only one floor and no stairs.',
    blankWordOptions: ['homes', 'yurt', 'bungalow', 'apartment', 'stilt house', 'detached house']
  },
  {
    id: 104,
    number: 4,
    category: 'listening',
    part: 1,
    points: 1,
    question: 'Fill in blank (2): "In Mongolia, some families live in a round tent called a (2) ____________ and they can move it easily from place to place."',
    options: ['yurt', 'bungalow', 'apartment', 'stilt house', 'homes', 'detached house'],
    correctAnswer: 'yurt',
    explanation: 'A traditional round portable tent used in Mongolia is called a yurt.',
    hint: 'A round tent used by nomads in Mongolia that moves easily.',
    blankWordOptions: ['homes', 'yurt', 'bungalow', 'apartment', 'stilt house', 'detached house']
  },
  {
    id: 105,
    number: 5,
    category: 'listening',
    part: 1,
    points: 1,
    question: 'Fill in blank (4): "In big, busy cities, many families live in an (4) ____________ on one floor of a very tall building."',
    options: ['apartment', 'yurt', 'bungalow', 'stilt house', 'homes', 'detached house'],
    correctAnswer: 'apartment',
    explanation: 'Notice the article "an", matching the vowel in apartment (one floor of a tall skyscraper).',
    hint: 'Follows the article "an" in big, busy cities.',
    blankWordOptions: ['homes', 'yurt', 'bungalow', 'apartment', 'stilt house', 'detached house']
  },

  // --- PART 2: VOCABULARY / ADJECTIVES (10 Points) ---
  // Exact 10 words from original test (ESL PS), matched to PART_2_DEFINITIONS (A–K)
  // Shuffled order: ancient, comfortable, modern, tiny, famous, spacious, colourful, relaxing, mysterious, wooden
  {
    id: 106,
    number: 6,
    category: 'vocabulary',
    part: 2,
    points: 1,
    adjective: 'ancient',
    question: 'Match 5. ancient to its definition:',
    options: [
      'C. very old',
      'H. new, not old-fashioned',
      'G. with a lot of room inside',
      'E. very, very big'
    ],
    correctAnswer: 'C. very old',
    matchLetter: 'C',
    explanation: 'Ancient means existing from a long time ago in history; very old (Definition C).',
    hint: 'Built thousands of years ago like the Colosseum.'
  },
  {
    id: 107,
    number: 7,
    category: 'vocabulary',
    part: 2,
    points: 1,
    adjective: 'comfortable',
    question: 'Match 3. comfortable to its definition:',
    options: [
      'F. nice to sit or relax in',
      'G. with a lot of room inside',
      'I. makes you feel calm',
      'K. very, very small'
    ],
    correctAnswer: 'F. nice to sit or relax in',
    matchLetter: 'F',
    explanation: 'Comfortable describes a sofa or home that is nice to sit or relax in (Definition F).',
    hint: 'Opposite of uncomfortable; cozy to sit in.'
  },
  {
    id: 108,
    number: 8,
    category: 'vocabulary',
    part: 2,
    points: 1,
    adjective: 'modern',
    question: 'Match 9. modern to its definition:',
    options: [
      'H. new, not old-fashioned',
      'C. very old',
      'I. makes you feel calm',
      'J. made of wood'
    ],
    correctAnswer: 'H. new, not old-fashioned',
    matchLetter: 'H',
    explanation: 'Modern means relating to present or recent times; new, not old-fashioned (Definition H).',
    hint: 'Opposite of ancient and old-fashioned.'
  },
  {
    id: 109,
    number: 9,
    category: 'vocabulary',
    part: 2,
    points: 1,
    adjective: 'tiny',
    question: 'Match 6. tiny to its definition:',
    options: [
      'K. very, very small',
      'E. very, very big',
      'G. with a lot of room inside',
      'F. nice to sit or relax in'
    ],
    correctAnswer: 'K. very, very small',
    matchLetter: 'K',
    explanation: 'Tiny means minuscule; very, very small (Definition K).',
    hint: 'The opposite of enormous.'
  },
  {
    id: 110,
    number: 10,
    category: 'vocabulary',
    part: 2,
    points: 1,
    adjective: 'famous',
    question: 'Match 1. famous to its definition:',
    options: [
      'B. known by lots of people',
      'A. has lots of bright colours',
      'C. very old',
      'D. with lots of secrets'
    ],
    correctAnswer: 'B. known by lots of people',
    matchLetter: 'B',
    explanation: 'Famous means widely recognized and known by lots of people (Definition B).',
    hint: 'Think of famous landmarks like Big Ben or the Eiffel Tower.'
  },
  {
    id: 111,
    number: 11,
    category: 'vocabulary',
    part: 2,
    points: 1,
    adjective: 'spacious',
    question: 'Match 8. spacious to its definition:',
    options: [
      'G. with a lot of room inside',
      'E. very, very big',
      'F. nice to sit or relax in',
      'H. new, not old-fashioned'
    ],
    correctAnswer: 'G. with a lot of room inside',
    matchLetter: 'G',
    explanation: 'Spacious means roomy, having with a lot of room inside (Definition G).',
    hint: 'Contains the root word "space".'
  },
  {
    id: 112,
    number: 12,
    category: 'vocabulary',
    part: 2,
    points: 1,
    adjective: 'colourful',
    question: 'Match 2. colourful to its definition:',
    options: [
      'A. has lots of bright colours',
      'B. known by lots of people',
      'I. makes you feel calm',
      'F. nice to sit or relax in'
    ],
    correctAnswer: 'A. has lots of bright colours',
    matchLetter: 'A',
    explanation: 'Colourful describes items that have lots of bright colours (Definition A).',
    hint: 'Look for the keyword "bright colours".'
  },
  {
    id: 113,
    number: 13,
    category: 'vocabulary',
    part: 2,
    points: 1,
    adjective: 'relaxing',
    question: 'Match 10. relaxing to its definition:',
    options: [
      'I. makes you feel calm',
      'F. nice to sit or relax in',
      'A. has lots of bright colours',
      'D. with lots of secrets'
    ],
    correctAnswer: 'I. makes you feel calm',
    matchLetter: 'I',
    explanation: 'Relaxing means restful and makes you feel calm (Definition I).',
    hint: 'Brings peace and makes you feel calm.'
  },
  {
    id: 114,
    number: 14,
    category: 'vocabulary',
    part: 2,
    points: 1,
    adjective: 'mysterious',
    question: 'Match 4. mysterious to its definition:',
    options: [
      'D. with lots of secrets',
      'C. very old',
      'H. new, not old-fashioned',
      'J. made of wood'
    ],
    correctAnswer: 'D. with lots of secrets',
    matchLetter: 'D',
    explanation: 'Mysterious means puzzling, with lots of secrets (Definition D).',
    hint: 'Related to mysteries and hidden secrets.'
  },
  {
    id: 115,
    number: 15,
    category: 'vocabulary',
    part: 2,
    points: 1,
    adjective: 'wooden',
    question: 'Match 7. wooden to its definition:',
    options: [
      'J. made of wood',
      'A. has lots of bright colours',
      'H. new, not old-fashioned',
      'D. with lots of secrets'
    ],
    correctAnswer: 'J. made of wood',
    matchLetter: 'J',
    explanation: 'Wooden denotes an object constructed or made of wood (Definition J).',
    hint: 'Material derived from trees and timber.'
  },

  // --- PART 3: GRAMMAR (10 Points) ---
  // Text: "THE ECO-HOUSE ON THE HILL" (Exact Original Sentences, Shuffled Order)
  // Section A: Infinitives of Purpose ("to + verb") - Shuffled order: Sentences 4, 1, 5, 2, 3
  {
    id: 116,
    number: 16,
    category: 'grammar',
    part: 3,
    points: 1,
    question: 'Complete sentence 4: "Grass grows on the roof ____________ (keep) the house warm in winter."',
    options: ['to keep', 'keeping', 'to keeping', 'for keep'],
    correctAnswer: 'to keep',
    explanation: 'Infinitives of purpose take "to + base verb": to keep.',
    hint: 'Use "to" plus the verb in parentheses: (keep).'
  },
  {
    id: 117,
    number: 17,
    category: 'grammar',
    part: 3,
    points: 1,
    question: 'Complete sentence 1: "He used local materials ____________ (build) the walls."',
    options: ['to build', 'building', 'built', 'to building'],
    correctAnswer: 'to build',
    explanation: 'Infinitives of purpose take "to + base verb": to build.',
    hint: 'Use "to" plus the verb in parentheses: (build).'
  },
  {
    id: 118,
    number: 18,
    category: 'grammar',
    part: 3,
    points: 1,
    question: 'Complete sentence 5: "He put a large tub outside ____________ (collect) rainwater."',
    options: ['to collect', 'collecting', 'to collects', 'for collecting'],
    correctAnswer: 'to collect',
    explanation: 'Infinitives of purpose take "to + base verb": to collect.',
    hint: 'Use "to" plus the verb in parentheses: (collect).'
  },
  {
    id: 119,
    number: 19,
    category: 'grammar',
    part: 3,
    points: 1,
    question: 'Complete sentence 2: "There are big windows ____________ (let) in natural light."',
    options: ['to let', 'letting', 'to letting', 'for let'],
    correctAnswer: 'to let',
    explanation: 'Infinitives of purpose take "to + base verb": to let.',
    hint: 'Use "to" plus the verb in parentheses: (let).'
  },
  {
    id: 120,
    number: 20,
    category: 'grammar',
    part: 3,
    points: 1,
    question: 'Complete sentence 3: "There are solar panels on the roof ____________ (provide) energy for the lights."',
    options: ['to provide', 'providing', 'to provides', 'for provide'],
    correctAnswer: 'to provide',
    explanation: 'Infinitives of purpose take "to + base verb": to provide.',
    hint: 'Use "to" plus the verb in parentheses: (provide).'
  },

  // Section B: Modal Verbs of Possibility - Shuffled order: Sentences 7, 9, 6, 10, 8
  {
    id: 121,
    number: 21,
    category: 'grammar',
    part: 3,
    points: 1,
    question: 'Complete sentence 7: "Nobody lives there, so it ____________ be a family home." (can’t / must)',
    options: ['can\'t', 'must'],
    correctAnswer: 'can\'t',
    explanation: 'If nobody lives there, it is impossible (0%) for it to be a family home, so we use can’t.',
    hint: 'Can it be a family home if nobody lives there at all?'
  },
  {
    id: 122,
    number: 22,
    category: 'grammar',
    part: 3,
    points: 1,
    question: 'Complete sentence 9: "It is much too small, so it ____________ be a supermarket." (can’t / might)',
    options: ['can\'t', 'might'],
    correctAnswer: 'can\'t',
    explanation: 'Being "much too small" makes it impossible to be a supermarket, so we use can’t.',
    hint: 'A tiny shoe building cannot possibly hold aisles of supermarket goods.'
  },
  {
    id: 123,
    number: 23,
    category: 'grammar',
    part: 3,
    points: 1,
    question: 'Complete sentence 6: "I am not sure what the strange building is. It ____________ be a museum." (might / must)',
    options: ['might', 'must'],
    correctAnswer: 'might',
    explanation: '"I am not sure" expresses uncertainty (~50% possibility), so we use might.',
    hint: 'Look at the phrase "I am not sure" - is the speaker 100% sure or guessing?'
  },
  {
    id: 124,
    number: 24,
    category: 'grammar',
    part: 3,
    points: 1,
    question: 'Complete question 10: "____________ it be a school?" (Could / Does)',
    options: ['Could', 'Does'],
    correctAnswer: 'Could',
    explanation: 'We use the modal auxiliary "Could" to ask about a possible identity ("Could it be...?").',
    hint: 'Which auxiliary pairs with the base verb "be" to express possibility?'
  },
  {
    id: 125,
    number: 25,
    category: 'grammar',
    part: 3,
    points: 1,
    question: 'Complete sentence 8: "There are lots and lots of books inside, so it ____________ be a library!" (might / must)',
    options: ['must', 'might'],
    correctAnswer: 'must',
    explanation: 'Having lots and lots of books provides strong evidence of certainty (100%), so we use must.',
    hint: 'Strong evidence of lots of books makes the speaker completely sure.'
  },

  // --- PART 4: READING COMPREHENSION (10 Points) ---
  // Text: "THE COLOSSEUM" (Exact Original Questions, Shuffled Order: 3, 1, 4, 2, 5, 7, 6)
  {
    id: 126,
    number: 26,
    category: 'reading',
    part: 4,
    points: 1,
    question: '3. Who fought in the Colosseum long ago?',
    options: [
      'a) Gladiators',
      'b) Professors',
      'c) Builders',
      'd) Emperors'
    ],
    correctAnswer: 'a) Gladiators',
    explanation: 'The text states: "Long ago, gladiators came here to fight in front of big crowds."',
    hint: 'Fierce Roman fighters who fought in front of big crowds.'
  },
  {
    id: 127,
    number: 27,
    category: 'reading',
    part: 4,
    points: 1,
    question: '1. Where is the Colosseum located?',
    options: [
      'a) In the middle of Rome',
      'b) In a forest',
      'c) In the sea',
      'd) On a mountain'
    ],
    correctAnswer: 'a) In the middle of Rome',
    explanation: 'Sentence 1 states: "The Colosseum is an ancient building in the middle of Rome, the capital city of Italy."',
    hint: 'Check the very first line of the Colosseum text.'
  },
  {
    id: 128,
    number: 28,
    category: 'reading',
    part: 4,
    points: 1,
    question: '4. How many visitors come to see the Colosseum every year?',
    options: [
      'a) More than 6 million',
      'b) About 2,000',
      'c) More than 50,000',
      'd) About 500'
    ],
    correctAnswer: 'a) More than 6 million',
    explanation: 'Paragraph 2 states: "Even so, more than six million visitors come every year to see it."',
    hint: 'Look for the annual tourist visitor count in the second paragraph.'
  },
  {
    id: 129,
    number: 29,
    category: 'reading',
    part: 4,
    points: 1,
    question: '2. What did workers use to build the Colosseum?',
    options: [
      'a) Wood and grass',
      'b) Stone, brick and sand',
      'c) Glass and metal',
      'd) Mud and straw'
    ],
    correctAnswer: 'b) Stone, brick and sand',
    explanation: 'The text states: "...workers used stone, brick and sand to make its thick walls."',
    hint: 'Look at what materials were used for its thick walls.'
  },
  {
    id: 130,
    number: 30,
    category: 'reading',
    part: 4,
    points: 1,
    question: '5. Which heading best matches this sentence: "You can travel there by bus or by metro"?',
    options: [
      'a) Location',
      'b) Historical facts',
      'c) Travel information',
      'd) Opinions'
    ],
    correctAnswer: 'c) Travel information',
    explanation: 'Guidance on transportation (buses, trains, tickets) belongs to "Travel information".',
    hint: 'Explains how tourists get there.'
  },
  {
    id: 131,
    number: 31,
    category: 'reading',
    part: 4,
    points: 3,
    question: '7. According to the text, how do we travel to the Colosseum? (3 points)',
    options: [
      'You can travel there by bus or by metro.',
      'You can only travel there by helicopter.',
      'You must walk on foot from Paris.',
      'You can travel there by camel or boat.'
    ],
    correctAnswer: 'You can travel there by bus or by metro.',
    explanation: 'The text directly states: "You can travel there by bus or by metro, and it is a good idea to buy your ticket online to save time."',
    hint: 'Look for the two public transportation methods named in paragraph 2.'
  },
  {
    id: 132,
    number: 32,
    category: 'reading',
    part: 4,
    points: 2,
    question: '6. Find one FACT and one OPINION from the text about the Colosseum. (2 points)',
    options: [
      'FACT: Workers used stone, brick and sand. | OPINION: In my opinion, it is the most spectacular building in Rome.',
      'FACT: Standing inside it feels nice. | OPINION: Rome is in Italy.',
      'FACT: Gladiators were very cool. | OPINION: It was built 2,000 years ago.',
      'FACT: People love holidays. | OPINION: Over 50,000 people could sit inside.'
    ],
    correctAnswer: 'FACT: Workers used stone, brick and sand. | OPINION: In my opinion, it is the most spectacular building in Rome.',
    explanation: 'Facts are provable truths (materials, numbers, dates). Opinions express subjective thoughts/feelings ("In my opinion, it is the most spectacular...").',
    hint: 'Look for phrases that state historical facts vs phrases with "In my opinion".'
  },

  // --- PART 5: WRITING (15 Points) ---
  {
    id: 133,
    number: 33,
    category: 'writing',
    part: 5,
    points: 15,
    question: 'Part 5: My Dream Home Paragraph (40–60 Words)',
    correctAnswer: 'Architect paragraph written using Unit 3 adjectives, infinitives of purpose, and materials.',
    explanation: 'Write a 40–60 word paragraph answering 5 simple steps: home type, location, materials, eco-feature with "to + verb", and feeling adjectives (cosy, spacious, comfortable).',
    hint: 'Follow the 5 simple steps: 1. Home & location, 2. Materials, 3. "to + verb" (to make electricity), 4. Inside features, 5. Why you love it!'
  }
];

// =============================================================================
// SPELLING BEE CONTEST WORDS (UNIT 3: HOMES)
// =============================================================================
export const SPELLING_BEE_WORDS: SpellingWord[] = [
  // --- TOPIC 1: HOMES & BUILDINGS ---
  {
    id: 'sb-u3-1',
    word: 'Bungalow',
    topic: 'Homes & Buildings',
    sentence: 'My grandmother lives in a cosy bungalow because she does not want to walk up stairs.',
    translation: 'Rumah bertingkat satu',
    definition: 'A house that has only one main level or floor.',
    syllables: 'bun-ga-low',
    difficulty: 'Easy',
    phoneticHint: '/ˈbʌŋ.ɡə.loʊ/',
    isFromOfficialList: true
  },
  {
    id: 'sb-u3-2',
    word: 'Apartment',
    topic: 'Homes & Buildings',
    sentence: 'Their family lives on the twelfth floor of a modern apartment building.',
    translation: 'Apartemen',
    definition: 'A set of rooms for living in, especially on one floor of a tall building.',
    syllables: 'a-part-ment',
    difficulty: 'Easy',
    phoneticHint: '/əˈpɑːrt.mənt/',
    isFromOfficialList: true
  },
  {
    id: 'sb-u3-3',
    word: 'Detached',
    topic: 'Homes & Buildings',
    sentence: 'A detached house stands on its own and does not share any walls with neighbours.',
    translation: 'Terpisah / berdiri sendiri',
    definition: 'Separated or not connected to any other building.',
    syllables: 'de-tached',
    difficulty: 'Medium',
    phoneticHint: '/dɪˈtætʃt/',
    isFromOfficialList: true
  },
  {
    id: 'sb-u3-4',
    word: 'Houseboat',
    topic: 'Homes & Buildings',
    sentence: 'Living on a houseboat allows you to float down the river every morning.',
    translation: 'Rumah perahu',
    definition: 'A boat that is fitted out for living in on water.',
    syllables: 'house-boat',
    difficulty: 'Easy',
    phoneticHint: '/ˈhaʊs.boʊt/',
    isFromOfficialList: true
  },
  {
    id: 'sb-u3-5',
    word: 'Eco-house',
    topic: 'Homes & Buildings',
    sentence: 'An eco-house uses solar panels and recycled stone to protect the environment.',
    translation: 'Rumah ramah lingkungan',
    definition: 'A house designed to have minimal negative impact on the natural environment.',
    syllables: 'e-co-house',
    difficulty: 'Medium',
    phoneticHint: '/ˈiː.koʊˌhaʊs/',
    isFromOfficialList: true
  },
  {
    id: 'sb-u3-6',
    word: 'Yurt',
    topic: 'Homes & Buildings',
    sentence: 'The Mongolian nomads kept warm inside their felt yurt during the snowstorm.',
    translation: 'Tenda bulat tradisional Asia Tengah',
    definition: 'A circular tent of felt or skins on a collapsible framework, used by nomads in Central Asia.',
    syllables: 'yurt',
    difficulty: 'Easy',
    phoneticHint: '/jɜːrt/',
    isFromOfficialList: true
  },

  // --- TOPIC 2: DESCRIPTIVE ADJECTIVES ---
  {
    id: 'sb-u3-7',
    word: 'Enormous',
    topic: 'Descriptive Adjectives',
    sentence: 'The ancient stone amphitheater was enormous enough to hold fifty thousand spectators.',
    translation: 'Sangat besar luar biasa',
    definition: 'Extremely large in size, quantity, or extent.',
    syllables: 'e-nor-mous',
    difficulty: 'Medium',
    phoneticHint: '/ɪˈnɔːr.məs/',
    isFromOfficialList: true
  },
  {
    id: 'sb-u3-8',
    word: 'Spacious',
    topic: 'Descriptive Adjectives',
    sentence: 'The living room was spacious and bright with high ceilings.',
    translation: 'Luas / lapang',
    definition: 'Having a lot of space inside.',
    syllables: 'spa-cious',
    difficulty: 'Medium',
    phoneticHint: '/ˈspeɪ.ʃəs/',
    isFromOfficialList: true
  },
  {
    id: 'sb-u3-9',
    word: 'Comfortable',
    topic: 'Descriptive Adjectives',
    sentence: 'After walking all day, sitting in the soft armchair felt wonderfully comfortable.',
    translation: 'Nyaman',
    definition: 'Providing physical ease and relaxation.',
    syllables: 'com-fort-a-ble',
    difficulty: 'Hard',
    phoneticHint: '/ˈkʌm.fər.tə.bəl/',
    isFromOfficialList: true
  },
  {
    id: 'sb-u3-10',
    word: 'Mysterious',
    topic: 'Descriptive Adjectives',
    sentence: 'Nobody knew who lived in the mysterious house at the edge of the dark woods.',
    translation: 'Misterius / penuh teka-teki',
    definition: 'Difficult or impossible to understand, explain, or identify.',
    syllables: 'mys-te-ri-ous',
    difficulty: 'Hard',
    phoneticHint: '/mɪˈstɪr.i.əs/',
    isFromOfficialList: true
  },
  {
    id: 'sb-u3-11',
    word: 'Colourful',
    topic: 'Descriptive Adjectives',
    sentence: 'The seaside village was famous for its colourful cottages painted pink, blue, and yellow.',
    translation: 'Penuh warna-warni',
    definition: 'Having bright colours or a lot of different colours.',
    syllables: 'col-our-ful',
    difficulty: 'Medium',
    phoneticHint: '/ˈkʌl.ər.fəl/',
    isFromOfficialList: true
  },
  {
    id: 'sb-u3-12',
    word: 'Ancient',
    topic: 'Descriptive Adjectives',
    sentence: 'Historians study the ancient stone ruins to learn how Roman gladiators trained.',
    translation: 'Kuno / zaman purba',
    definition: 'Belonging to the very distant past and no longer in existence.',
    syllables: 'an-cient',
    difficulty: 'Medium',
    phoneticHint: '/ˈeɪn.ʃənt/',
    isFromOfficialList: true
  },

  // --- TOPIC 3: ECO & MATERIALS ---
  {
    id: 'sb-u3-13',
    word: 'Efficiently',
    topic: 'Eco & Materials',
    sentence: 'The solar panels generate electricity efficiently on bright sunny mornings.',
    translation: 'Dengan efisien dan berdaya guna',
    definition: 'In a well-organized and competent way, achieving maximum productivity with minimum wasted effort.',
    syllables: 'ef-fi-cient-ly',
    difficulty: 'Hard',
    phoneticHint: '/ɪˈfɪʃ.ənt.li/',
    isFromOfficialList: true
  },
  {
    id: 'sb-u3-14',
    word: 'Materials',
    topic: 'Eco & Materials',
    sentence: 'Workers gathered local materials including clay, gravel, and timber.',
    translation: 'Bahan-bahan bangunan',
    definition: 'The matter from which a thing is or can be made.',
    syllables: 'ma-te-ri-als',
    difficulty: 'Medium',
    phoneticHint: '/məˈtɪr.i.əlz/',
    isFromOfficialList: true
  },
  {
    id: 'sb-u3-15',
    word: 'Rubbish',
    topic: 'Eco & Materials',
    sentence: 'Please place your empty wrappers in the bin instead of leaving rubbish on the lawn.',
    translation: 'Sampah buangan',
    definition: 'Waste material or things that are no longer wanted or needed.',
    syllables: 'rub-bish',
    difficulty: 'Easy',
    phoneticHint: '/ˈrʌb.ɪʃ/',
    isFromOfficialList: true
  },
  {
    id: 'sb-u3-16',
    word: 'Recycle',
    topic: 'Eco & Materials',
    sentence: 'We recycle glass jars and plastic tubs to prevent pollution.',
    translation: 'Mendaur ulang',
    definition: 'Convert waste into reusable material.',
    syllables: 're-cy-cle',
    difficulty: 'Easy',
    phoneticHint: '/ˌriːˈsaɪ.kəl/',
    isFromOfficialList: true
  },

  // --- TOPIC 4: FAMOUS PLACES & HOBBIT ---
  {
    id: 'sb-u3-17',
    word: 'Gladiator',
    topic: 'Famous Places & Hobbit',
    sentence: 'A Roman gladiator fought bravely before thousands of roaring fans in the Colosseum.',
    translation: 'Gladiator (petarung Romawi kuno)',
    definition: 'In ancient Rome, a man trained to fight with weapons against other men or wild animals in an arena.',
    syllables: 'glad-i-a-tor',
    difficulty: 'Hard',
    phoneticHint: '/ˈɡlæd.i.eɪ.tər/',
    isFromOfficialList: true
  },
  {
    id: 'sb-u3-18',
    word: 'Amphitheater',
    topic: 'Famous Places & Hobbit',
    sentence: 'The Colosseum is an open-air amphitheater with tiered stone seating.',
    translation: 'Amfiteater (gelanggang terbuka)',
    definition: 'A round or oval unroofed building with a central space for the presentation of dramatic or sporting events.',
    syllables: 'am-phi-the-a-ter',
    difficulty: 'Championship',
    phoneticHint: '/ˈæm.fəˌθiː.ə.tər/',
    isFromOfficialList: true
  },
  {
    id: 'sb-u3-19',
    word: 'Respectable',
    topic: 'Famous Places & Hobbit',
    sentence: 'The Baggins family was very respectable because they never did anything wild or dangerous.',
    translation: 'Terhormat / pantas dihargai',
    definition: 'Regarded by society to be good, proper, or correct in morals and behavior.',
    syllables: 're-spect-a-ble',
    difficulty: 'Hard',
    phoneticHint: '/rɪˈspek.tə.bəl/',
    isFromOfficialList: true
  },
  {
    id: 'sb-u3-20',
    word: 'Architect',
    topic: 'Famous Places & Hobbit',
    sentence: 'An architect sketches the floor plan and chooses the materials before constructing a house.',
    translation: 'Arsitek (perancang bangunan)',
    definition: 'A person who designs buildings and in many cases also supervises their construction.',
    syllables: 'ar-chi-tect',
    difficulty: 'Hard',
    phoneticHint: '/ˈɑːr.kə.tekt/',
    isFromOfficialList: true
  },
  {
    id: 'sb-u3-21',
    word: 'Scandinavian',
    topic: 'Homes & Buildings',
    sentence: 'She designed a modern Scandinavian house with light pine wood and large sunny windows.',
    translation: 'Skandinavia',
    definition: 'Relating to Scandinavian design, characterized by simplicity, minimalism, and functional beauty.',
    syllables: 'Scan-di-na-vi-an',
    difficulty: 'Championship',
    phoneticHint: '/ˌskæn.dəˈneɪ.vi.ən/',
    isFromOfficialList: true
  }
];

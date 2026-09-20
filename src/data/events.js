/**
 * Parama Terpal Event Documentation Data
 * 
 * HOW TO ADD / UPDATE PHOTOS:
 * 1. Place image files into 'public/event/<event-folder-name>/'
 * 2. Add the file path to the 'photos' array below (e.g. '/event/Jiva/photo-name.jpg')
 * 3. The /event page will automatically render new photos without modifying component code.
 * 
 * HOW TO ADD / UPDATE SPONSORS & PARTNERS:
 * - Add partner objects to the 'partners' array below (e.g. { name: 'Partner Name', src: '/patner/filename.png', alt: 'Partner Name logo' })
 */

export const events = [
  {
    id: 'jiva',
    name: 'Jiva',
    slug: 'jiva',
    category: 'STUDIO & OUTDOOR SESSION',
    description: 'Mindful movement and grounding session with the Jiva community, bringing natural comfort and mat protection to outdoor practice.',
    photos: [
      '/event/Jiva/jivastudio.jpg',
      '/event/Jiva/jivastudio1.jpg',
      '/event/Jiva/jivastudio2.jpg',
    ],
    partners: []
  },
  {
    id: 'nestari-studio',
    name: 'Nestari Studio',
    slug: 'nestari-studio',
    category: 'COMMUNITY GATHERING & YOGA',
    description: 'Outdoor yoga practice and community connection with Nestari Studio on Parama Grounding Sheets.',
    photos: [
      '/event/Nestari studio/nestaristudio.jpg',
      '/event/Nestari studio/nestaristudio1.jpg',
      '/event/Nestari studio/nestaristudio2.jpg',
      '/event/Nestari studio/nestaristudio3.jpg',
      '/event/Nestari studio/nestaristudio4.jpg',
      '/event/Nestari studio/nestaristudio5.jpg',
      '/event/Nestari studio/nestaristudio6.jpg',
    ],
    partners: []
  },
  {
    id: 'musim-piknic',
    name: 'Musim Piknic',
    slug: 'musim-piknic',
    category: 'OUTDOOR PICNIC & WELLNESS',
    description: 'Mindful picnic, breathwork, and open-air movement surrounded by nature with Musim Piknic.',
    photos: [
      '/event/Musim piknic/musimpicnik.jpg',
      '/event/Musim piknic/musimpicnik1.jpg',
    ],
    partners: [
      {
        name: 'Musim Piknic',
        src: '/patner/LOGO MUSIMpicnik.png',
        alt: 'Musim Piknik partner logo'
      }
    ]
  },
  {
    id: 'peluk-raga-jiwa',
    name: 'Peluk Raga Jiwa',
    slug: 'peluk-raga-jiwa',
    category: 'MINDFULNESS & HEALING SESSION',
    description: 'Deep relaxation and mindful nature connection session with the Peluk Raga Jiwa community.',
    photos: [],
    partners: []
  },
  {
    id: 'jeda-dulu',
    name: 'Jeda Dulu',
    slug: 'jeda-dulu',
    category: 'SLOW LIVING & MINDFUL PAUSE',
    description: 'Taking a peaceful pause from the city rhythm, grounded in nature during the Jeda Dulu session.',
    photos: [
      '/event/Jeda dulu/jedadulu.jpg',
    ],
    partners: []
  },
  {
    id: 'flow-her-way',
    name: 'Flow Her Way',
    slug: 'flow-her-way',
    category: 'WOMEN WELLNESS & MOVEMENT',
    description: 'Celebrating mindful movement, empowering wellness, and natural connection with Flow Her Way.',
    photos: [
      '/event/flow her way/flowherway.jpg',
    ],
    partners: [
      {
        name: 'Flow Her Way',
        src: '/patner/FHW BLACK@300x.png',
        alt: 'Flow Her Way partner logo'
      }
    ]
  },
  {
    id: 'the-part-of-dewi-yoga',
    name: 'The Part of Dewi Yoga',
    slug: 'the-part-of-dewi-yoga',
    category: 'NATURE & SPIRITUAL PRACTICE',
    description: 'Deep yoga practice surrounded by the tranquility of open nature with The Part of Dewi Yoga.',
    photos: [
      '/event/The part of dewi yoga/dewiyoga.jpg',
    ],
    partners: []
  }
];

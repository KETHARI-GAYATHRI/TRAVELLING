/**
 * ESCAPE — Destination Data
 * Static data for all destinations with famous places
 */

const destinations = [
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    region: 'Europe',
    category: 'Culture',
    description: 'The City of Light enchants with its iconic landmarks, world-class museums, exquisite cuisine, and timeless romantic ambiance along the Seine.',
    shortDescription: 'Iconic city of art, fashion, and gastronomy.',
    lat: 48.8566,
    lng: 2.3522,
    famousPlaces: [
      {
        id: 'eiffel-tower',
        name: 'Eiffel Tower',
        description: 'The iconic 330-meter iron lattice tower, built for the 1889 World\'s Fair, offers breathtaking panoramic views of Paris from its observation decks.',
        category: 'Landmark'
      },
      {
        id: 'louvre-museum',
        name: 'Louvre Museum',
        description: 'The world\'s largest and most visited art museum, home to the Mona Lisa and over 380,000 objects spanning thousands of years of human civilization.',
        category: 'Museum'
      },
      {
        id: 'montmartre',
        name: 'Montmartre',
        description: 'A hilltop village within Paris known for its bohemian art scene, the stunning Sacré-Cœur Basilica, and charming cobblestone streets lined with cafés.',
        category: 'Neighborhood'
      },
      {
        id: 'notre-dame',
        name: 'Notre-Dame Cathedral',
        description: 'A masterpiece of French Gothic architecture dating to the 12th century, renowned for its flying buttresses, rose windows, and gargoyles.',
        category: 'Landmark'
      },
      {
        id: 'seine-river',
        name: 'Seine River Cruise',
        description: 'A scenic boat cruise along the Seine offers a unique perspective of Paris, passing under ornate bridges and past illuminated landmarks at dusk.',
        category: 'Experience'
      }
    ]
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    region: 'Asia',
    category: 'Culture',
    description: 'A dazzling fusion of ultramodern technology and ancient tradition, Tokyo captivates with neon-lit streets, serene temples, and extraordinary culinary culture.',
    shortDescription: 'Where ancient tradition meets futuristic innovation.',
    lat: 35.6762,
    lng: 139.6503,
    famousPlaces: [
      {
        id: 'shibuya-crossing',
        name: 'Shibuya Crossing',
        description: 'The world\'s busiest pedestrian crossing, where thousands of people traverse from all directions against a backdrop of giant LED screens and towering buildings.',
        category: 'Landmark'
      },
      {
        id: 'senso-ji',
        name: 'Sensō-ji Temple',
        description: 'Tokyo\'s oldest and most significant Buddhist temple in Asakusa, featuring the iconic Kaminarimon gate and a vibrant shopping street leading to the main hall.',
        category: 'Temple'
      },
      {
        id: 'tokyo-skytree',
        name: 'Tokyo Skytree',
        description: 'At 634 meters, this broadcasting tower is the tallest structure in Japan, offering stunning city views and housing an aquarium, planetarium, and shopping complex.',
        category: 'Landmark'
      },
      {
        id: 'meiji-shrine',
        name: 'Meiji Shrine',
        description: 'A tranquil Shinto shrine set within a lush forest of 120,000 trees in the heart of Tokyo, dedicated to Emperor Meiji and Empress Shōken.',
        category: 'Temple'
      },
      {
        id: 'tsukiji-outer',
        name: 'Tsukiji Outer Market',
        description: 'A bustling marketplace offering the freshest sushi, street food, and culinary delights, preserving the spirit of Tokyo\'s legendary fish market tradition.',
        category: 'Market'
      }
    ]
  },
  {
    id: 'cape-town',
    name: 'Cape Town',
    country: 'South Africa',
    region: 'Africa',
    category: 'Adventure',
    description: 'Nestled between dramatic mountains and two oceans, Cape Town offers stunning natural beauty, rich history, world-class wine, and vibrant cultural diversity.',
    shortDescription: 'Dramatic landscapes where mountains meet the sea.',
    lat: -33.9249,
    lng: 18.4241,
    famousPlaces: [
      {
        id: 'table-mountain',
        name: 'Table Mountain',
        description: 'A flat-topped mountain forming a dramatic backdrop to the city, accessible by aerial cableway and offering panoramic views of the Atlantic coastline.',
        category: 'Nature'
      },
      {
        id: 'cape-of-good-hope',
        name: 'Cape of Good Hope',
        description: 'The legendary rocky headland at the southwestern tip of Africa, surrounded by dramatic cliffs, diverse flora, and free-roaming wildlife.',
        category: 'Nature'
      },
      {
        id: 'robben-island',
        name: 'Robben Island',
        description: 'A UNESCO World Heritage Site where Nelson Mandela was imprisoned for 18 years, now a powerful museum narrating South Africa\'s journey to freedom.',
        category: 'Historical'
      },
      {
        id: 'bo-kaap',
        name: 'Bo-Kaap',
        description: 'A vibrant neighborhood famous for its brightly painted houses and cobblestone streets, reflecting the heritage of the Cape Malay community.',
        category: 'Neighborhood'
      }
    ]
  },
  {
    id: 'new-york',
    name: 'New York',
    country: 'United States',
    region: 'Americas',
    category: 'Urban',
    description: 'The city that never sleeps pulses with energy—from Broadway shows and world-renowned museums to iconic skylines and diverse neighborhoods.',
    shortDescription: 'The city that never sleeps, full of iconic landmarks.',
    lat: 40.7128,
    lng: -74.0060,
    famousPlaces: [
      {
        id: 'central-park',
        name: 'Central Park',
        description: 'An 843-acre urban oasis in Manhattan, offering meadows, lakes, walking paths, and cultural venues amidst the towering skyline of New York City.',
        category: 'Park'
      },
      {
        id: 'statue-of-liberty',
        name: 'Statue of Liberty',
        description: 'A colossal neoclassical sculpture gifted by France in 1886, standing as a universal symbol of freedom and democracy on Liberty Island.',
        category: 'Landmark'
      },
      {
        id: 'times-square',
        name: 'Times Square',
        description: 'The brilliant, bustling intersection at the heart of Midtown Manhattan, famous for its massive LED billboards, Broadway theaters, and electric atmosphere.',
        category: 'Landmark'
      },
      {
        id: 'brooklyn-bridge',
        name: 'Brooklyn Bridge',
        description: 'An architectural marvel and engineering feat completed in 1883, connecting Manhattan and Brooklyn with stunning views of the city skyline.',
        category: 'Landmark'
      },
      {
        id: 'met-museum',
        name: 'The Metropolitan Museum of Art',
        description: 'One of the world\'s largest and finest art museums, with a collection spanning 5,000 years of culture from every corner of the globe.',
        category: 'Museum'
      }
    ]
  },
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    region: 'Asia',
    category: 'Relaxation',
    description: 'The Island of the Gods enchants visitors with its lush rice terraces, ancient temples, pristine beaches, and a deeply spiritual Balinese culture.',
    shortDescription: 'Island paradise of temples, rice terraces, and surf.',
    lat: -8.3405,
    lng: 115.0920,
    famousPlaces: [
      {
        id: 'uluwatu-temple',
        name: 'Uluwatu Temple',
        description: 'A spectacular Balinese sea temple perched on a steep cliff 70 meters above the Indian Ocean, famous for its sunset Kecak fire dance performances.',
        category: 'Temple'
      },
      {
        id: 'tegallalang',
        name: 'Tegallalang Rice Terraces',
        description: 'Stunning cascading rice paddies carved into the hillside near Ubud, showcasing the traditional Balinese cooperative irrigation system called subak.',
        category: 'Nature'
      },
      {
        id: 'sacred-monkey-forest',
        name: 'Sacred Monkey Forest',
        description: 'A sanctuary in Ubud housing over 1,260 long-tailed macaques, with ancient temple ruins draped in moss and surrounded by towering banyan trees.',
        category: 'Nature'
      },
      {
        id: 'tanah-lot',
        name: 'Tanah Lot',
        description: 'An iconic offshore rock formation hosting one of Bali\'s most important Hindu temples, particularly magical at sunset when silhouetted against the sky.',
        category: 'Temple'
      }
    ]
  },
  {
    id: 'santorini',
    name: 'Santorini',
    country: 'Greece',
    region: 'Europe',
    category: 'Relaxation',
    description: 'A volcanic island paradise in the Aegean Sea, celebrated for its whitewashed buildings with blue domes, dramatic caldera views, and legendary sunsets.',
    shortDescription: 'Whitewashed cliffs and legendary Aegean sunsets.',
    lat: 36.3932,
    lng: 25.4615,
    famousPlaces: [
      {
        id: 'oia',
        name: 'Oia Village',
        description: 'A picturesque village perched on the caldera rim, famous for its blue-domed churches, narrow marble streets, and the most photographed sunset in the world.',
        category: 'Village'
      },
      {
        id: 'red-beach',
        name: 'Red Beach',
        description: 'A striking beach surrounded by towering red volcanic cliffs, creating one of the most unique and dramatic coastal landscapes in all of Greece.',
        category: 'Beach'
      },
      {
        id: 'akrotiri',
        name: 'Akrotiri Archaeological Site',
        description: 'A remarkably preserved Minoan Bronze Age settlement, often called the "Pompeii of the Aegean," buried by a volcanic eruption around 1627 BC.',
        category: 'Historical'
      },
      {
        id: 'fira',
        name: 'Fira Town',
        description: 'The vibrant capital of Santorini, built on the edge of the caldera with stunning views, excellent restaurants, and a lively nightlife scene.',
        category: 'Village'
      }
    ]
  },
  {
    id: 'rome',
    name: 'Rome',
    country: 'Italy',
    region: 'Europe',
    category: 'Culture',
    description: 'The Eternal City is a living museum where ancient ruins stand alongside Renaissance masterpieces, vibrant piazzas, and some of the world\'s finest cuisine.',
    shortDescription: 'The Eternal City of ancient wonders and art.',
    lat: 41.9028,
    lng: 12.4964,
    famousPlaces: [
      {
        id: 'colosseum',
        name: 'Colosseum',
        description: 'The largest ancient amphitheater ever built, this iconic symbol of Imperial Rome once hosted gladiatorial contests for up to 80,000 spectators.',
        category: 'Historical'
      },
      {
        id: 'vatican',
        name: 'Vatican Museums & Sistine Chapel',
        description: 'An extraordinary collection of art and antiquities, culminating in Michelangelo\'s breathtaking ceiling frescoes in the Sistine Chapel.',
        category: 'Museum'
      },
      {
        id: 'trevi-fountain',
        name: 'Trevi Fountain',
        description: 'Rome\'s largest and most famous Baroque fountain, where legend says tossing a coin ensures your return to the Eternal City.',
        category: 'Landmark'
      },
      {
        id: 'roman-forum',
        name: 'Roman Forum',
        description: 'The ancient center of Roman public life, a sprawling site of ruins including temples, arches, and basilicas spanning centuries of history.',
        category: 'Historical'
      }
    ]
  },
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'United Arab Emirates',
    region: 'Asia',
    category: 'Urban',
    description: 'A city of superlatives rising from the desert, Dubai dazzles with futuristic architecture, luxury shopping, desert adventures, and world-record attractions.',
    shortDescription: 'Futuristic desert metropolis of luxury and innovation.',
    lat: 25.2048,
    lng: 55.2708,
    famousPlaces: [
      {
        id: 'burj-khalifa',
        name: 'Burj Khalifa',
        description: 'The world\'s tallest building at 828 meters, offering breathtaking views from its observation decks on the 124th, 125th, and 148th floors.',
        category: 'Landmark'
      },
      {
        id: 'dubai-mall',
        name: 'Dubai Mall',
        description: 'One of the world\'s largest shopping and entertainment destinations, featuring an aquarium, ice rink, and over 1,200 retail stores.',
        category: 'Shopping'
      },
      {
        id: 'palm-jumeirah',
        name: 'Palm Jumeirah',
        description: 'An engineering marvel — a man-made archipelago in the shape of a palm tree, home to luxury hotels, residences, and pristine beaches.',
        category: 'Landmark'
      },
      {
        id: 'desert-safari',
        name: 'Desert Safari',
        description: 'An exhilarating adventure through golden sand dunes, including dune bashing, camel rides, and traditional Bedouin camp experiences under the stars.',
        category: 'Experience'
      }
    ]
  }
];

/**
 * Get all destinations
 */
export function getAllDestinations() {
  return destinations;
}

/**
 * Get a single destination by ID
 */
export function getDestinationById(id) {
  return destinations.find(d => d.id === id) || null;
}

/**
 * Get unique regions from all destinations
 */
export function getRegions() {
  return [...new Set(destinations.map(d => d.region))];
}

/**
 * Get unique categories from all destinations
 */
export function getCategories() {
  return [...new Set(destinations.map(d => d.category))];
}

/**
 * Search destinations by name, country, or description
 */
export function searchDestinations(query) {
  const q = query.toLowerCase().trim();
  if (!q) return destinations;
  return destinations.filter(d =>
    d.name.toLowerCase().includes(q) ||
    d.country.toLowerCase().includes(q) ||
    d.description.toLowerCase().includes(q) ||
    d.region.toLowerCase().includes(q)
  );
}

/**
 * Filter destinations by region and/or category
 */
export function filterDestinations(destinations, { region, category } = {}) {
  let result = destinations;
  if (region) {
    result = result.filter(d => d.region === region);
  }
  if (category) {
    result = result.filter(d => d.category === category);
  }
  return result;
}

export default destinations;

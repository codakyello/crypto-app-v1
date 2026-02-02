export interface TierPricing {
  Entry?: number;
  Influence?: number;
  Power?: number;
  Legacy?: number;
}

export interface Service {
  id: string;
  name: string;
  type: "Hotel" | "Lounge" | "Event" | "Concierge" | "Experience";
  location: string;
  price: number; // Base retail price
  tierPricing?: TierPricing; // Discounted prices per tier
  image: string;
  description: string;
  amenities: string[];
  minTier: "Entry" | "Influence" | "Power" | "Legacy";
  rating?: number;
  reviews?: number;
}

export const services: Service[] = [
  {
    id: "hotel-1",
    name: "The Alpha Grand Hotel",
    type: "Hotel",
    location: "Dubai, UAE",
    price: 500,
    tierPricing: {
      Influence: 450,
      Power: 400,
      Legacy: 0 // Complimentary for Legacy
    },
    image: "/images/hotel-dubai.png",
    description: "Experience luxury at its finest. The Alpha Grand offers panoramic views of the skyline, private beach access, and world-class dining. Redeem your tokens for a premium suite stay.",
    amenities: ["Free Wi-Fi", "Spa & Wellness", "Infinity Pool", "24/7 Concierge"],
    minTier: "Influence",
    rating: 4.9,
    reviews: 128
  },
  {
    id: "lounge-1",
    name: "Skyline VIP Lounge",
    type: "Lounge",
    location: "London Heathrow",
    price: 50,
    tierPricing: {
      Entry: 45,
      Influence: 40,
      Power: 0, // Free for Power+
      Legacy: 0
    },
    image: "/images/lounge-london.png",
    description: "Escape the chaos of the terminal. Enjoy complimentary gourmet food, premium beverages, and shower facilities before your flight.",
    amenities: ["Complimentary Food", "Premium Bar", "Showers", "Quiet Zone"],
    minTier: "Entry",
    rating: 4.7,
    reviews: 842
  },
  {
    id: "lounge-2",
    name: "Executive Club Lounge",
    type: "Lounge",
    price: 2500,
    tierPricing: {
      Influence: 2400, // Small discount
      Power: 2000,     // Big discount
      Legacy: 1500,    // Best discount
    },
    location: "London, UK",
    image: "/images/executive-club-lounge.png",
    description: "An exclusive lounge experience with bespoke services and unparalleled comfort.",
    amenities: ["Private Suites", "Gourmet Dining", "Personal Assistant"],
    minTier: "Entry",
    rating: 4.9,
  },
  {
    id: "event-2", // Changed id to string to match Service interface
    name: "Alpha Founder's Dinner", // Changed title to name
    type: "Event", // Changed category to type
    price: 500,
    tierPricing: {
      Power: 250,
      Legacy: 0, // Free for Legacy
    },
    location: "Singapore",
    image: "/images/alpha-founders-dinner.png",
    description: "An exclusive dinner for Alpha token founders and top-tier members.", // Added description to match Service interface
    amenities: ["Gourmet Dining", "Networking Opportunities", "Keynote Speakers"], // Added amenities to match Service interface
    minTier: "Influence",
    rating: 5.0,
  },
  {
    id: "event-1",
    name: "Crypto Summmit 2026",
    type: "Event",
    location: "Singapore",
    price: 1500,
    tierPricing: {
      Power: 1200,
      Legacy: 1000
    },
    image: "/images/event-sg.png",
    description: "The world's largest gathering of crypto visionaries. Your ALPHA token grants you VIP access, including backstage passes and exclusive after-parties.",
    amenities: ["VIP Seating", "Networking Lunch", "After-party Access", "Swag Bag"],
    minTier: "Power",
    rating: 5.0,
    reviews: 42
  },
  {
    id: "hotel-2",
    name: "Azure Resort & Spa",
    type: "Hotel",
    location: "Maldives",
    price: 2000,
    tierPricing: {
      Legacy: 1500
    },
    image: "/images/hotel-maldives.png",
    description: "A private island paradise. Overwater villas, coral reefs, and sunset cruises. The ultimate utility for your digital assets.",
    amenities: ["Private Villa", "Butler Service", "Water Sports", "Fine Dining"],
    minTier: "Legacy",
    rating: 4.95,
    reviews: 15
  }
];

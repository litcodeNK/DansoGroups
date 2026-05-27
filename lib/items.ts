export interface Item {
  slug: string;
  name: string;
  type: 'app' | 'book';
  image: string;
  videoUrl?: string;
  description: string;
  longDescription?: string;
  author?: string;
  externalUrl?: string;
  features?: string[];
  screenshots?: string[];
  appStoreUrl?: string;
  playStoreUrl?: string;
}

export const items: Item[] = [
  {
    slug: 'danso-mall',
    name: 'Danso Mall',
    type: 'app',
    image:
      'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?q=80&w=800&auto=format&fit=crop',
    description:
      'A comprehensive e-commerce marketplace connecting buyers and sellers across Ghana and West Africa.',
    longDescription:
      'Danso Mall is a next-generation marketplace built specifically for the African market. Vendors can set up storefronts in minutes, buyers can browse thousands of products, and transactions are secured with integrated mobile money and card payments. Designed with offline resilience to handle variable connectivity.',
    features: [
      'Browse thousands of products from local vendors',
      'Secure mobile money & card payment integration',
      'Real-time order tracking and delivery notifications',
      'Vendor storefront management dashboard',
      'Multi-currency and multi-language support',
      'AI-powered product recommendations',
    ],
    appStoreUrl: '#',
    playStoreUrl: '#',
  },
  {
    slug: 'future-of-african-tech',
    name: 'The Future of African Tech',
    type: 'book',
    image:
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop',
    description:
      'An in-depth exploration of how technology is reshaping African economies, transforming industries, and creating new opportunities for the next generation of entrepreneurs.',
    longDescription:
      'Drawing on research across 12 African nations and interviews with over 50 tech founders, investors, and policymakers, this book maps the continent\'s digital transformation. From fintech in Nigeria to agritech in Kenya and cybersecurity in South Africa, Dr. Danso charts the trends, challenges, and immense opportunities that define Africa\'s tech decade.',
    author: 'Dr. Kofi Danso',
    externalUrl: 'https://amazon.com',
    features: [
      'Case studies from 12 African nations',
      'Insights from 50+ tech founders and investors',
      'In-depth investment landscape analysis',
      'Policy recommendations for governments',
      'Practical playbook for African entrepreneurs',
    ],
  },
  {
    slug: 'primetrack',
    name: 'PrimeTrack',
    type: 'app',
    image:
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?q=80&w=800&auto=format&fit=crop',
    description:
      'A powerful logistics and shipment tracking platform designed for African businesses to manage deliveries, routes, and fleet operations in real time.',
    longDescription:
      'PrimeTrack brings enterprise-grade logistics intelligence to growing African businesses. Track your entire fleet in real time, optimise delivery routes automatically, and keep customers informed with proactive SMS and push notifications. The platform scales from a single courier to a fleet of hundreds.',
    features: [
      'Live GPS fleet tracking on an interactive map',
      'AI-driven route optimisation to cut fuel costs',
      'Driver performance analytics and scoring',
      'Automated customer delivery ETA notifications',
      'Inventory and warehouse management integration',
      'Offline mode for low-connectivity zones',
    ],
    appStoreUrl: '#',
    playStoreUrl: '#',
  },
];

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
    slug: 'be-a-ghanaian',
    name: 'Be A Ghanaian',
    type: 'book',
    image: '/book-be-a-ghanaian-cover.jpg',
    description:
      'A revolutionary call to action for every Ghanaian to dare to stay and build. Liberate the mind, build the nation.',
    longDescription:
      'From a deeply personal awakening — studying belief systems, uncovering pre-colonial history, and wrestling with Ghana\'s potential — Asante Danso writes an unflinching manifesto for mind liberation and national development. Spanning 16 chapters, this book takes you from intellectual awakening through Ghana\'s rich history before colonial contact, the African mindset, unity, leadership, religion, and freedom — culminating in a practical Call to Action with your first three steps to start building tomorrow.',
    author: 'Asante Danso',
    externalUrl: '/books',
    features: [
      'A personal awakening from partial to complete consciousness',
      "Ghana's rich history before colonial contact",
      'How unity creates collective power and national control',
      'The African mindset — rewiring centuries of conditioning',
      'Leadership in Ghana — honest diagnosis and bold vision',
      'Mind liberation through intentional mass education',
      'Your first three concrete steps to start building tomorrow',
    ],
  },
  {
    slug: 'danso-secure',
    name: 'DansoSecure',
    type: 'app',
    image:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop',
    description:
      "Ghana's first all-in-one employee verification, CCTV installation, and legal contract platform. Hire with confidence. Protect your business.",
    longDescription:
      "DansoSecure helps businesses hire with confidence and secure their operations. From background checks and legally-vetted employment contracts to 4K CCTV installation and 24/7 cloud monitoring, it's the complete security stack for African enterprises. Pay via MTN MoMo, Vodafone Cash, AirtelTigo, or bank transfer.",
    features: [
      'Employee background checks with digital reports',
      'Legally-vetted employment contract templates (GH₵ 10/template)',
      'Digital signature and cloud storage for all contracts',
      '4K CCTV camera installation with cloud infrastructure',
      '24/7 monitoring with mobile access',
      'MTN MoMo, Vodafone Cash, AirtelTigo payments',
    ],
    appStoreUrl: '#',
    playStoreUrl: '#',
  },
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
    externalUrl: '/books',
    features: [
      'Case studies from 12 African nations',
      'Insights from 50+ tech founders and investors',
      'In-depth investment landscape analysis',
      'Policy recommendations for governments',
      'Practical playbook for African entrepreneurs',
    ],
  },
  {
    slug: 'cybersecurity-for-african-enterprises',
    name: 'Cybersecurity for African Enterprises',
    type: 'book',
    image:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop',
    description:
      'A comprehensive guide to protecting your business in Africa\'s rapidly evolving digital landscape, covering threats, compliance, and resilience strategies tailored for the continent.',
    longDescription:
      'As African businesses accelerate their digital transformation, cyber threats are growing at an alarming rate. This book equips enterprise leaders, IT managers, and security teams with practical frameworks for threat detection, incident response, and regulatory compliance across key African markets.',
    author: 'Dr. Kofi Danso',
    externalUrl: '/books',
    features: [
      'Africa-specific threat landscape analysis',
      'Step-by-step incident response playbooks',
      'Compliance guides for GDPA and local regulations',
      'Vendor selection and zero-trust frameworks',
      'Real-world case studies from African enterprises',
    ],
  },
  {
    slug: 'building-tech-in-africa',
    name: "Building Tech in Africa: A Founder's Guide",
    type: 'book',
    image:
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop',
    description:
      'The definitive playbook for building, funding, and scaling technology startups across Africa — from ideation through Series A and beyond.',
    longDescription:
      'Packed with first-hand accounts from founders who have navigated Africa\'s unique market dynamics, regulatory landscapes, and investor ecosystems, this guide provides an actionable roadmap for the next generation of African tech entrepreneurs.',
    author: 'Abena Mensah-Danso',
    externalUrl: '/books',
    features: [
      'Market validation strategies for African consumers',
      'Funding landscape: angels, VCs, and grants',
      'Hiring and building remote engineering teams',
      'Navigating multi-country regulatory environments',
      'Growth hacking on lean African budgets',
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

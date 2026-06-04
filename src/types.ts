export interface Testimonial {
  id: string;
  name: string;
  petName: string;
  petBreed: string;
  comment: string;
  avatar: string;
  rating: number;
}

export interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'spa' | 'grooming' | 'care' | 'products';
  basePrice: number;
  image: string;
  duration: string;
  details: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface BentoItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  sizeClass: string;
  badge?: string;
  accentColor?: string;
  image?: string;
}

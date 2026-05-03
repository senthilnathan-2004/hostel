export interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  capacity: number;
  amenities: string[];
  images: string[];
  created_at: string;
}

export interface Booking {
  id: string;
  room_id: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  check_in: string;
  check_out: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
  room?: Room;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  content: string;
  image: string;
  created_at: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  category: 'Rooms' | 'Common Area' | 'Events';
  created_at: string;
}

export interface Settings {
  hero_title: string;
  hero_tagline: string;
  hero_image: string;
  cta_text: string;
  pricing_highlight: string;
  amenities_list: { icon: string; text: string }[];
  offer_banner: {
    show: boolean;
    text: string;
    link: string;
  };
}

export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

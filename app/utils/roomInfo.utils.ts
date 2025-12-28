export interface Room {
  id: string;
  name: string;
  slug: string;
  price: string;
  images: string[];
  capacity: string;
  tag: string;
  description: string;
  highlights: string[];
  amenities: {
    category: string;
    items: string[];
  }[];
  location: string;
  size: string;
  view: string;
}

export const roomsData: Room[] = [
  {
    id: '1',
    name: 'The Alpine Loft',
    slug: 'alpine-loft',
    price: '$240',
    images: [
      'https://res.cloudinary.com/ddvhuxa9f/image/upload/v1766930262/Alpine-loft-comfort_q6nbgi.webp',
      'https://res.cloudinary.com/ddvhuxa9f/image/upload/v1766930458/Alpine-loft-bathroom_nn9seg.webp',
      'https://res.cloudinary.com/ddvhuxa9f/image/upload/v1766930558/Alpine-loft-kitchen_t1rbsz.webp',
      'https://res.cloudinary.com/ddvhuxa9f/image/upload/v1766930781/Alpine-loft-entertainment_ch5kio.webp',
      'https://res.cloudinary.com/ddvhuxa9f/image/upload/v1766930874/Alpine-loft-outdoor_po663k.webp'
    ],
    capacity: '2 Guests',
    tag: 'Best Seller',
    description: 'Perched high in the mountains, this cozy loft offers panoramic views of the Himalayan peaks. Perfect for couples seeking intimacy and breathtaking sunrises.',
    highlights: [
      'Panoramic mountain views',
      'Private balcony with hot tub',
      'Wood-burning fireplace',
      'King-size bed with premium linens'
    ],
    amenities: [
      {
        category: 'Comfort',
        items: ['King-size bed', 'Premium linens', 'Down duvet', 'Memory foam pillows', 'Wood-burning fireplace']
      },
      {
        category: 'Bathroom',
        items: ['Rainfall shower', 'Heated floors', 'Luxury toiletries', 'Hair dryer', 'Bathrobes']
      },
      {
        category: 'Kitchen',
        items: ['Fully equipped kitchen', 'Coffee maker', 'Tea selection', 'Mini bar', 'Dining area']
      },
      {
        category: 'Entertainment',
        items: ['55" Smart TV', 'Bluetooth speaker', 'Board games', 'Book collection', 'WiFi']
      },
      {
        category: 'Outdoor',
        items: ['Private balcony', 'Hot tub', 'Mountain views', 'Outdoor furniture', 'Fire pit']
      }
    ],
    location: 'Mountain Peak',
    size: '850 sq ft',
    view: 'Himalayan Peaks'
  },
  {
    id: '2',
    name: 'Forest Glass Cabin',
    slug: 'forest-glass-cabin',
    price: '$350',
    images: [
      'https://res.cloudinary.com/ddvhuxa9f/image/upload/v1766932338/Forest-glass-cabin-bedroom_qav2s8.webp',
      'https://res.cloudinary.com/ddvhuxa9f/image/upload/v1766932439/Forest-glass-cabin-livingArea_fwc1dw.webp',
      'https://res.cloudinary.com/ddvhuxa9f/image/upload/v1766935726/Forest-glass-cabin-kitchen_xuzmmq.webp',
      'https://res.cloudinary.com/ddvhuxa9f/image/upload/v1766935460/Forest-glass-cabin-technology_peezy5.webp',
      'https://res.cloudinary.com/ddvhuxa9f/image/upload/v1766935845/Forest-glass-cabin-wellness_ugbnux.webp',
      'https://res.cloudinary.com/ddvhuxa9f/image/upload/v1766936188/Forest-glass-cabin-bathroom_pjkcut.webp',
      'https://res.cloudinary.com/ddvhuxa9f/image/upload/v1766936656/Forest-glass-cabin-outdoors_ifwudl.webp'

    ],
    capacity: '4 Guests',
    tag: 'Trending',
    description: 'A stunning glass-walled cabin nestled in ancient pine forests. Wake up surrounded by nature with floor-to-ceiling windows offering 360-degree forest views.',
    highlights: [
      'Floor-to-ceiling glass walls',
      'Surrounded by pine forest',
      'Modern minimalist design',
      'Two bedrooms with en-suite bathrooms'
    ],
    amenities: [
      {
        category: 'Bedrooms',
        items: ['Master bedroom with king bed', 'Guest bedroom with queen bed', 'En-suite bathrooms', 'Walk-in closets']
      },
      {
        category: 'Living Area',
        items: ['Open-concept living', 'Floor-to-ceiling windows', 'Gas fireplace', 'Leather sofa', 'Dining for 6']
      },
      {
        category: 'Kitchen',
        items: ['Gourmet kitchen', 'Stainless steel appliances', 'Wine fridge', 'Breakfast bar', 'Coffee station']
      },
      {
        category: 'Technology',
        items: ['Smart home system', '65" curved TV', 'Sound system', 'High-speed WiFi', 'Charging stations']
      },
      {
        category: 'Wellness',
        items: ['Private sauna', 'Outdoor shower', 'Yoga deck', 'Meditation space', 'Essential oil diffuser']
      }
    ],
    location: 'Pine Forest',
    size: '1200 sq ft',
    view: 'Ancient Pine Forest'
  },
  {
    id: '3',
    name: 'Lakeside Retreat',
    slug: 'lakeside-retreat',
    price: '$420',
    images: [
      'https://res.cloudinary.com/ddvhuxa9f/image/upload/v1766936820/Lakeside-retreat-masterBedroom_l1eh5o.webp',
      'https://res.cloudinary.com/ddvhuxa9f/image/upload/v1766937128/Lakeside-retreat-guestRoom-1_j9p6z4.webp',
      'https://res.cloudinary.com/ddvhuxa9f/image/upload/v1766937606/Lakeside-retreat-guestRoom-2_oiprf3.webp',
      'https://res.cloudinary.com/ddvhuxa9f/image/upload/v1766938008/Lakeside-retreat-bunkRoom_vb2f4j.webp',
      'https://res.cloudinary.com/ddvhuxa9f/image/upload/v1766938000/Lakeside-retreat-ensuite-bathroom_a13lj7.webp',
      'https://res.cloudinary.com/ddvhuxa9f/image/upload/v1766938519/Lakeside-retreate-living-space_kljxoq.webp',
      'https://res.cloudinary.com/ddvhuxa9f/image/upload/v1766938657/Lakeside-retreat-kitchen_yseeuo.webp',
      'https://res.cloudinary.com/ddvhuxa9f/image/upload/v1766938984/Lakeside-retreat-dining_lw0gzr.webp',
      'https://res.cloudinary.com/ddvhuxa9f/image/upload/v1766939055/Lakeside-retreat-recreation-outdoors_mvlrlt.webp',
      'https://res.cloudinary.com/ddvhuxa9f/image/upload/v1766939394/Lakeside-retreat-recreation-indoors_zuawey.webp',
      'https://res.cloudinary.com/ddvhuxa9f/image/upload/v1766939452/Lakeside-retreat-home-theater_s7fn8n.webp',
      'https://res.cloudinary.com/ddvhuxa9f/image/upload/v1766939687/Lakeside-retreat-outdoor-shower-and-fire-pit_qdznsr.webp'

    ],
    capacity: '6 Guests',
    tag: 'New',
    description: 'Luxurious lakeside villa with private dock and stunning water views. Perfect for families or groups wanting to create unforgettable memories.',
    highlights: [
      'Private lake access',
      'Three bedrooms with lake views',
      'Outdoor kitchen and dining',
      'Game room with pool table'
    ],
    amenities: [
      {
        category: 'Bedrooms',
        items: ['Master suite with lake view', 'Two guest bedrooms', 'Bunk room for kids', 'En-suite bathrooms']
      },
      {
        category: 'Living Spaces',
        items: ['Great room with fireplace', 'Game room', 'Sunroom', 'Multiple balconies', 'Lake views']
      },
      {
        category: 'Kitchen & Dining',
        items: ['Professional kitchen', 'Outdoor grill', 'Dining for 8', 'Breakfast nook', 'Fully stocked pantry']
      },
      {
        category: 'Recreation',
        items: ['Private dock', 'Kayaks', 'Fishing gear', 'Pool table', 'Board games']
      },
      {
        category: 'Luxury',
        items: ['Home theater', 'Hot tub', 'Outdoor shower', 'Fire pit']
      }
    ],
    location: 'Lakeside',
    size: '1800 sq ft',
    view: 'Crystal Lake'
  }
];
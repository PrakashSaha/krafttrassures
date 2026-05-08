export interface Product {
  id: number | string;
  name: string;
  category: string;
  price: string | number;
  image: string;
  hoverImage?: string;
  slug: string;
  href: string;
  delay?: string;
}

export const CATEGORIES = [
  'All Categories', 'Masks', 'Ceremonial Pottery', 'Musical Instrument', 
  'Sacred Pieces', 'Cups and Plates', 'Decorative Ceramics', 
  'Figurine & Sculpture', 'Textile & Weaving', 'Wooden Ware', 'Jewellery'
];

export const PRODUCTS: Product[] = [
  { 
    id: 1, 
    name: 'Monpa Rangzen Rang-Dun – Tongue Drum', 
    category: 'Musical Instrument', 
    price: '₹3,499', 
    image: '/images/img_9f9a8b413ddac6051a530306ccddb534.png', 
    slug: 'monpa-rangzen-rang-dun',
    href: '/product/monpa-rangzen-rang-dun'
  },
  { 
    id: 2, 
    name: 'Sacred Ceremonial Wall Mask', 
    category: 'Masks', 
    price: '₹3,100', 
    image: '/images/img_2494a847f0389601eacab27aa7fb9c69.png', 
    slug: 'sacred-ceremonial-wall-mask',
    href: '/product/sacred-ceremonial-wall-mask'
  },
  { 
    id: 3, 
    name: 'Monpa Zang Bum – Ceremonial Pottery', 
    category: 'Ceremonial Pottery', 
    price: '₹2,499', 
    image: '/images/img_04927e860f65c51b5946f8b1b24831da.png', 
    slug: 'monpa-zang-bum',
    href: '/product/monpa-zang-bum'
  },
  { 
    id: 4, 
    name: 'Sacred Taming Monastery Wall Hanging', 
    category: 'Others', 
    price: '₹3,800', 
    image: '/images/img_a798301695a75446cda6944aecd9a0d9.jpeg', 
    slug: 'sacred-taming-monastery',
    href: '/product/sacred-taming-monastery'
  },
  { 
    id: 5, 
    name: 'Sacred Geometric Steel Tongs', 
    category: 'Sacred Pieces', 
    price: '₹6,000', 
    image: '/images/img_d81156df7b760918a15333587af8dc1b.png', 
    slug: 'sacred-geometric-steel-tongs',
    href: '/product/sacred-geometric-steel-tongs'
  },
  { 
    id: 6, 
    name: 'Imperial Dragon Motif Teacup', 
    category: 'Cups and Plates', 
    price: '₹1,800', 
    image: '/images/img_d81156df7b760918a15333587af8dc1b.png', 
    slug: 'imperial-dragon-motif-teacup',
    href: '/product/imperial-dragon-motif-teacup'
  },
  { 
    id: 7, 
    name: 'Monpa Pot-Pu – Decorative Ceramic', 
    category: 'Decorative Ceramics', 
    price: '₹1,599', 
    image: '/images/img_86a8927604bc9322fca261f48b29454a.png', 
    slug: 'monpa-pot-pu',
    href: '/product/monpa-pot-pu'
  },
  { 
    id: 8, 
    name: 'Monpa Mahakala – Sacred Deity Mask', 
    category: 'Masks', 
    price: '₹4,999', 
    image: '/images/img_86a8927604bc9322fca261f48b29454a.png', 
    slug: 'monpa-mahakala',
    href: '/product/monpa-mahakala'
  },
  { 
    id: 101, 
    name: 'Monpa Dung Kar – Sacred Painted Ceremonial Conch Shell on Stand', 
    category: 'Ritual Object', 
    price: '₹4,299', 
    image: '/images/img_04927e860f65c51b5946f8b1b24831da.png', 
    slug: 'monpa-dung-kar',
    href: '/product/monpa-dung-kar-sacred-painted-ceremonial-conch-shell-on-stand', 
    delay: '0.1s' 
  },
  { 
    id: 102, 
    name: 'Monpa Golden Dragon Figurine – Hand-Cast Celestial Guardian', 
    category: 'Figurine & Sculpture', 
    price: '₹5,499', 
    image: '/images/img_a9132c04a3411b218b8addb9be42a9ba.png', 
    slug: 'monpa-golden-dragon',
    href: '/product/monpa-golden-dragon-figurine-hand-cast-celestial-guardian', 
    delay: '0.2s' 
  },
  { 
    id: 103, 
    name: 'Majestic Ritual Soul Mask', 
    category: 'Masks', 
    price: '₹12,400', 
    image: '/images/img_86a8927604bc9322fca261f48b29454a.png', 
    slug: 'majestic-ritual-soul-mask',
    href: '/product/majestic-ritual-soul-mask', 
    delay: '0.3s' 
  },
];

export const NEW_ARRIVALS_DATA = PRODUCTS.slice(-3); // Just an example, can be specific IDs


export const SHOP_NAV_CATEGORIES = [
  { label: 'Show Pieces', href: '/shop', image: '/images/img_f08cce93af6994ee70cdee826c34c554.png', category: 'Show Pieces' },
  { label: 'Textile & Weaving', href: '/shop', image: '/images/img_5272ad50803a3ab605149781d666fb4b.png', category: 'Textile & Weaving' },
  { label: 'Wall Decor & Hanging', href: '/shop', image: '/images/img_24c6b995e700c5e6965658f7714891d6.png', category: 'Wall Decor & Hanging' },
  { label: 'Necklaces', href: '/shop', image: '/images/img_5b2209901953523b207d60b90672822f.jpeg', category: 'Necklaces' },
  { label: 'Others', href: '/shop', image: '/images/img_ea260192b5d5e7b46cb323470fd4fd8b.png', category: 'others' },
  { label: 'Figurine & Sculpture', href: '/shop', image: '/images/img_80562aee7c8a6801b8187db048b6820e.png', category: 'Figurine & Sculpture' },
];

export const HERO_DATA = [
  { name: 'Ancient Green Deity Mask', img: 'img_2494a847f0389601eacab27aa7fb9c69.png', href: '/product/ancient-green-deity-mask' },
  { name: 'Imperial Dragon Motif Teacup', img: 'img_d81156df7b760918a15333587af8dc1b.png', href: '/product/imperial-dragon-motif-teacup' },
  { name: 'Majestic Ritual Soul Mask', img: 'img_86a8927604bc9322fca261f48b29454a.png', href: '/product/majestic-ritual-soul-mask' },
  { name: 'Monpa Ashtamangala', img: 'img_24c6b995e700c5e6965658f7714891d6.png', href: '/product/monpa-ashtamangala-eight-auspicious-symbols-embroidered-wall-hanging' },
];

export const TREASURE_DATA = [
  { id: 1, name: 'Monpa Drolma – Green Tara Divine Goddess Ceremonial Mask', category: 'Wooden Mask', price: '₹6,499', image: '/images/img_8a4cf15dbca0bac08815b09d51cb335f.png', href: '/product/monpa-drolma-green-tara-divine-goddess-ceremonial-mask', delay: '0.1s' },
  { id: 2, name: 'Imperial Dragon Motif Teacup', category: 'Cups and Plates', price: '₹1,800', image: '/images/img_d81156df7b760918a15333587af8dc1b.png', href: '/product/imperial-dragon-motif-teacup', delay: '0.2s' },
  { id: 3, name: 'Monpa Ashtamangala – Eight Auspicious Symbols Embroidered Wall Hanging', category: 'Wall Decor & Hanging', price: '₹2,999', image: '/images/img_24c6b995e700c5e6965658f7714891d6.png', href: '/product/monpa-ashtamangala-eight-auspicious-symbols-embroidered-wall-hanging', delay: '0.3s' },
  { id: 4, name: 'Monpa Dung Kar – Sacred Painted Ceremonial Conch Shell on Stand', category: 'Ritual Object', price: '₹4,299', image: '/images/img_04927e860f65c51b5946f8b1b24831da.png', href: '/product/monpa-dung-kar-sacred-painted-ceremonial-conch-shell-on-stand', delay: '0.4s' },
  { id: 5, name: 'Monpa Golden Dragon Figurine – Hand-Cast Celestial Guardian', category: 'Figurine & Sculpture', price: '₹5,499', image: '/images/img_a9132c04a3411b218b8addb9be42a9ba.png', href: '/product/monpa-golden-dragon-figurine-hand-cast-celestial-guardian', delay: '0.5s' },
];

export const INSTAGRAM_POSTS = [
  { id: 1, image: '/images/img_9469c72102f2ea6ffd28fa464a161801.png', delay: '0s' },
  { id: 2, image: '/images/img_2c787285a0939bbbc45bdf59b14ab08c.png', delay: '0.1s' },
  { id: 3, image: '/images/img_2e23f832eb8d69a0328b58fe34bc67a1.png', delay: '0.2s' },
  { id: 4, image: '/images/img_7838e82ebe2fd5b011cbad76108b7314.png', delay: '0.3s' },
];

export const STORY_STEPS = [
  { id: '01', title: 'Rooted in Community', desc: 'Techniques taught within families.' },
  { id: '02', title: 'Crafted in Small Batches', desc: 'Each piece is hand-made authenticity.' },
  { id: '03', title: 'Shipped with Pride', desc: 'Secure packaging for your craft.' },
];

export const ADORNMENTS_DATA = [
  {
    title: "Heritage Bead Necklaces",
    subtitle: "Handcrafted Adornments",
    priceText: "Starting from 5,400",
    image: "/images/img_5b2209901953523b207d60b90672822f.png",
    href: "/shop",
    large: true
  },
  {
    title: "Artisanal Bangles",
    subtitle: "Silver Artistry",
    priceText: "Starting from 3,200",
    image: "/images/img_585ed4af2ec8b815204939c92c061c8a.png",
    href: "/shop"
  },
  {
    title: "Gilded Vessels",
    subtitle: "Liturgy & Ritual",
    priceText: "Starting from 2,800",
    image: "/images/img_f08cce93af6994ee70cdee826c34c554.png",
    href: "/shop"
  }
];

export const TRENDING_DATA = [
  { id: 1, name: 'Tribal Sun Guardian Shield', category: 'Show Pieces', price: '₹8,500', image: '/images/img_b8726ae1fd40b63d1df281ea827f866a.jpeg', hoverImage: '/images/img_b8726ae1fd40b63d1df281ea827f866a.png', href: '/product/tribal-sun-guardian-shield', delay: '0.1s' },
  { id: 2, name: 'Serene Buddha Head Sculpture', category: 'Show Pieces', price: '₹9,400', image: '/images/img_bb7cfcba6be6e6e066f5a39b2ed4023b.jpeg', hoverImage: '/images/img_bb7cfcba6be6e6e066f5a39b2ed4023b.png', href: '/product/serene-buddha-head-sculpture', delay: '0.2s' },
  { id: 3, name: 'Sacred Tawang Monastery Banner', category: 'others', price: '₹3,600', image: '/images/img_fe5868b7fbd6b79af0cae09fae05a834.jpeg', hoverImage: '/images/img_fe5868b7fbd6b79af0cae09fae05a834.png', href: '/product/sacred-tawang-monastery-banner', delay: '0.3s' },
  { id: 4, name: 'Sacred Geometric Steel Tongue Drum', category: 'Show Pieces', price: '₹6,800', image: '/images/img_b6b893bf9561c378a643cae02ba8ff63.jpeg', hoverImage: '/images/img_b6b893bf9561c378a643cae02ba8ff63.png', href: '/product/sacred-geometric-steel-tongue-drum', delay: '0.4s' },
  { id: 5, name: 'Majestic Ritual Soul Mask', category: 'Masks', price: '₹12,400', image: '/images/img_86a8927604bc9322fca261f48b29454a.png', hoverImage: '/images/img_86a8927604bc9322fca261f48b29454a.png', href: '/product/majestic-ritual-soul-mask', delay: '0.5s' },
];

export const FOOTER_QUICK_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'Our Story', href: '/our-story' },
  { name: 'Contact', href: '/contact' },
  { name: 'My Account', href: '/account' },
];

export const FOOTER_SERVICES_LINKS = [
  { name: 'Shipping & Delivery', href: '/shipping' },
  { name: 'Returns & Exchanges', href: '/returns' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Use', href: '/terms' },
];


export const COLLECTION_DATA = [
  { title: 'Ceremonial Pottery', desc: 'Perfect for holding altar offerings.', image: '/images/img_6f7deacbf0b665554ad82954468ac046.jpeg', delay: '0.1s' },
  { title: 'Cups and Plates', desc: 'Hand-finished porcelain and ritual vessels', image: '/images/img_6f7deacbf0b665554ad82954468ac046.png', delay: '0.2s' },
  { title: 'Decorative Ceramics', desc: 'Metalwork that reflects the blessings of ancestors.', image: '/images/img_80562aee7c8a6801b8187db048b6820e.jpeg', delay: '0.3s' },
  { title: 'Figurine & Sculpture', desc: 'Abundance and the blessings of the Himalayas to your home.', image: '/images/img_80562aee7c8a6801b8187db048b6820e.png', delay: '0.4s' },
  { title: 'Jewellery & Adornment', desc: 'A beautiful piece of Himalayan heritage and adornment.', image: '/images/img_585ed4af2ec8b815204939c92c061c8a.jpeg', delay: '0.5s' },
  { title: 'Show Pieces', desc: 'Sculptural heritage objects', image: '/images/img_f08cce93af6994ee70cdee826c34c554.png', delay: '0.6s' },
];








export const ACCOUNT_NAV = [
  { label: 'Dashboard', href: '/account' },
  { label: 'My Profile', href: '/account/profile' },
  { label: 'My Address', href: '/account/address' },
  { label: 'My Wishlist', href: '/account/wishlist' },
  { label: 'Change Password', href: '/account/password' },
  { label: 'My Orders', href: '/account/orders' },
  { label: 'My Transaction', href: '/account/transactions' },
];

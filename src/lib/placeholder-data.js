
export const sampleProducts = [
  {
    id: '1',
    name: 'Cozy Comfort Sofa',
    description: 'A plush and comfortable sofa perfect for relaxing evenings. Upholstered in soft, durable fabric.',
    price: 799.99,
    category: 'Sofas',
    imageUrl: 'https://picsum.photos/seed/sofa1/600/400',
    materials: 'Solid wood frame, high-density foam, polyester fabric',
    dimensions: '84" W x 38" D x 36" H',
    careInstructions: 'Spot clean with a mild detergent. Vacuum regularly.',
    features: ['Deep seating', 'Removable cushions'],
    aiHint: 'sofa living_room',
  },
  {
    id: '2',
    name: 'Modern Oak Dining Table',
    description: 'Sleek and stylish dining table crafted from solid oak. Comfortably seats six.',
    price: 599.50,
    category: 'Tables',
    imageUrl: 'https://picsum.photos/seed/table1/600/400',
    materials: 'Solid Oak Wood',
    dimensions: '72" L x 36" W x 30" H',
    careInstructions: 'Wipe clean with a damp cloth. Avoid harsh chemicals.',
    features: ['Seats 6', 'Natural wood grain'],
    aiHint: 'dining table',
  },
  {
    id: '3',
    name: 'DreamCloud Mattress',
    description: 'Experience ultimate comfort with our premium DreamCloud mattress. Features memory foam and cooling gel.',
    price: 999.00,
    category: 'Mattresses',
    imageUrl: 'https://picsum.photos/seed/mattress1/600/400',
    materials: 'Memory foam, cooling gel, pocketed coils, hypoallergenic cover',
    dimensions: 'Queen: 60" W x 80" L x 12" H',
    careInstructions: 'Use a mattress protector. Rotate every 6 months.',
    features: ['Cooling technology', 'Pressure relief'],
    aiHint: 'mattress bedroom',
  },
  {
    id: '4',
    name: 'Minimalist Bookshelf',
    description: 'A simple yet elegant bookshelf to display your favorite reads and decor items. Tall and space-saving.',
    price: 149.99,
    category: 'Storage',
    imageUrl: 'https://picsum.photos/seed/bookshelf1/600/400',
    materials: 'Engineered wood, metal frame',
    dimensions: '30" W x 12" D x 70" H',
    careInstructions: 'Dust regularly. Wipe with a dry cloth.',
    features: ['5 shelves', 'Anti-tip hardware'],
    aiHint: 'bookshelf office',
  },
  {
    id: '5',
    name: 'Velvet Accent Chair',
    description: 'Add a touch of luxury to your living space with this plush velvet accent chair. Available in multiple colors.',
    price: 249.00,
    category: 'Chairs',
    imageUrl: 'https://picsum.photos/seed/chair1/600/400',
    materials: 'Velvet upholstery, gold-finished metal legs',
    dimensions: '28" W x 30" D x 32" H',
    careInstructions: 'Professional cleaning recommended for velvet.',
    features: ['Ergonomic design', 'Rich texture'],
    aiHint: 'accent chair',
  },
  {
    id: '6',
    name: 'Rustic Wooden Bed Frame',
    description: 'Bring a warm, rustic charm to your bedroom with this solid wooden bed frame. Sturdy and timeless.',
    price: 650.00,
    category: 'Beds',
    imageUrl: 'https://picsum.photos/seed/bed1/600/400',
    materials: 'Reclaimed pine wood',
    dimensions: 'King: 79" W x 83" L x 48" H (headboard)',
    careInstructions: 'Wipe with a soft, dry cloth.',
    features: ['Solid wood', 'Easy assembly'],
    aiHint: 'bed bedroom',
  },
];

export const getProductById = (id) => {
  return sampleProducts.find(product => product.id === id);
};

export const getProductsByCategory = (category) => {
  if (category === 'All') return sampleProducts;
  return sampleProducts.filter(product => product.category === category);
};

export const productCategories = ['All', ...new Set(sampleProducts.map(p => p.category))];

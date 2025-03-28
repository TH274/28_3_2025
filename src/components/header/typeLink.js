const CATEGORIES = {
  GLOVES: "gloves",
  EQUIPMENT: "equipment",
  APPAREL: "apparel",
  BUNDLES: "bundles",
  SALE: "sale"
};

const GLOVE_TYPES = {
  FITNESS: "fitness",
  TRAINING: "training",
  SPARRING: "sparring"
};

const GLOVE_SIZES = {
  OZ8: "8oz",
  OZ10: "10oz",
  OZ12: "12oz",
  OZ14: "14oz"
};

const EQUIPMENT_TYPES = {
  PUNCH_BAGS: "punch-bags",
  SPEED_BAGS: "speed-bags",
  FOCUS_MITTS: "focus-mitts",
  JUMP_ROPES: "jump-ropes",
  HAND_WRAPS: "hand-wraps",
  BOXING_BOOTS: "boxing-boots",
  MOUTHGUARDS: "mouthguards"
};

const APPAREL_TYPES = {
  T_SHIRTS: "t-shirts",
  HOODIES: "hoodies",
  SHORTS: "shorts",
  JOGGERS: "joggers"
};

const createProductLink = (params = {}) => {
  const searchParams = new URLSearchParams();
  
  if (params.category) {
    searchParams.set('category', params.category);
  }
  
  if (params.type) {
    searchParams.set('type', params.type);
  }
  
  if (params.size) {
    searchParams.set('size', params.size);
  }
  
  return `/products?${searchParams.toString()}`;
};

const NAV_ITEMS = [
  { label: 'NEW ARRIVALS', link: '/new-arrivals' },
  {
    label: 'GLOVES',
    category: CATEGORIES.GLOVES,
    subMenu: [
      {
        title: 'GLOVE BY TYPE',
        links: Object.entries(GLOVE_TYPES).map(([key, type]) => ({
          label: key.replace(/_/g, ' '), 
          link: createProductLink({ category: CATEGORIES.GLOVES, type })
        }))
      },
      {
        title: 'GLOVE BY SIZE',
        links: Object.entries(GLOVE_SIZES).map(([key, size]) => ({
          label: size, 
          link: createProductLink({ category: CATEGORIES.GLOVES, size })
        }))
      }
    ]
  },
  {
    label: 'EQUIPMENT',
    category: CATEGORIES.EQUIPMENT,
    subMenu: [
      {
        title: 'EQUIPMENT',
        links: Object.entries(EQUIPMENT_TYPES).map(([key, type]) => ({
          label: key.replace(/_/g, ' '), 
          link: createProductLink({ category: CATEGORIES.EQUIPMENT, type })
        }))
      },
      {
        title: 'ACCESSORIES',
        links: [
          { label: 'Hand Wraps', link: createProductLink({ category: CATEGORIES.EQUIPMENT, type: EQUIPMENT_TYPES.HAND_WRAPS }) },
          { label: 'Boxing Boots', link: createProductLink({ category: CATEGORIES.EQUIPMENT, type: EQUIPMENT_TYPES.BOXING_BOOTS }) },
          { label: 'Mouthguards', link: createProductLink({ category: CATEGORIES.EQUIPMENT, type: EQUIPMENT_TYPES.MOUTHGUARDS }) }
        ]
      }
    ]
  },
  {
    label: 'APPAREL',
    category: CATEGORIES.APPAREL,
    subMenu: [
      {
        title: 'TOPS',
        links: [
          { label: 'View All', link: createProductLink({ category: CATEGORIES.APPAREL }) },
          { label: 'T-Shirts', link: createProductLink({ category: CATEGORIES.APPAREL, type: APPAREL_TYPES.T_SHIRTS }) },
          { label: 'Hoodies', link: createProductLink({ category: CATEGORIES.APPAREL, type: APPAREL_TYPES.HOODIES }) }
        ]
      },
      {
        title: 'BOTTOMS',
        links: [
          { label: 'Shorts', link: createProductLink({ category: CATEGORIES.APPAREL, type: APPAREL_TYPES.SHORTS }) },
          { label: 'Joggers', link: createProductLink({ category: CATEGORIES.APPAREL, type: APPAREL_TYPES.JOGGERS }) }
        ]
      }
    ]
  },
  { label: 'BUNDLES', link: createProductLink({ category: CATEGORIES.BUNDLES }) },
  { label: 'SALE', link: createProductLink({ category: CATEGORIES.SALE }) }
];

export { NAV_ITEMS };
  
/**
 * Dữ liệu mẫu cho Danh mục và Sản phẩm
 */

export const categories = [
  {
    name: 'Đồ ăn vặt',
    image: 'https://images.unsplash.com/photo-1734027899096-291063588ab3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmFja3MlMjBjaGlwc3xlbnwxfHx8fDE3Njg0NzE3NDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    itemCount: 120
  },
  {
    name: 'Trà sữa',
    image: 'https://images.unsplash.com/photo-1670468642364-6cacadfb7bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWJibGUlMjB0ZWElMjBkcmlua3xlbnwxfHx8fDE3Njg0MjU2NzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    itemCount: 85
  },
  {
    name: 'Fast Food',
    image: 'https://images.unsplash.com/photo-1656439659132-24c68e36b553?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXN0JTIwZm9vZCUyMGJ1cmdlcnxlbnwxfHx8fDE3Njg0NzE3NDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    itemCount: 95
  },
  {
    name: 'Bánh ngọt',
    image: 'https://images.unsplash.com/photo-1679942262057-d5732f732841?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNzZXJ0JTIwY2FrZXxlbnwxfHx8fDE3Njg0NTQ0MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    itemCount: 78
  },
  {
    name: 'Cà phê',
    image: 'https://images.unsplash.com/photo-1611564494260-6f21b80af7ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBsYXR0ZXxlbnwxfHx8fDE3Njg0NTI0NDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    itemCount: 65
  },
  {
    name: 'Kem',
    image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2UlMjBjcmVhbXxlbnwxfHx8fDE3Njg0NzE3OTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    itemCount: 52
  },
  {
    name: 'Món Việt',
    image: 'https://images.unsplash.com/photo-1687902409602-8b7cf039a44a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtZXNlJTIwc3RyZWV0JTIwZm9vZHxlbnwxfHx8fDE3Njg0NzE3NDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    itemCount: 145
  },
  {
    name: 'Pizza',
    image: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMHNsaWNlfGVufDF8fHx8MTc2ODM5MjY2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    itemCount: 42
  }
];

export const products = [
  {
    id: '1',
    name: 'Snack Khoai Tây Lay\'s Vị Phô Mai',
    price: 15000,
    originalPrice: 20000,
    image: 'https://images.unsplash.com/photo-1734027899096-291063588ab3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmFja3MlMjBjaGlwc3xlbnwxfHx8fDE3Njg0NzE3NDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.8,
    reviews: 256,
    description: 'Snack khoai tây giòn rụm, vị phô mai đậm đà',
    discount: 25,
    tag: 'Bán chạy',
    category: 'Đồ ăn vặt'
  },
  {
    id: '2',
    name: 'Trà Sữa Trân Châu Đường Đen',
    price: 35000,
    originalPrice: 45000,
    image: 'https://images.unsplash.com/photo-1670468642364-6cacadfb7bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWJibGUlMjB0ZWElMjBkcmlua3xlbnwxfHx8fDE3Njg0MjU2NzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.9,
    reviews: 489,
    description: 'Trà sữa trân châu đường đen thơm ngon, ngọt vừa phải',
    discount: 22,
    tag: 'Hot',
    category: 'Trà sữa'
  },
  {
    id: '3',
    name: 'Burger Bò Phô Mai Đặc Biệt',
    price: 55000,
    image: 'https://images.unsplash.com/photo-1656439659132-24c68e36b553?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXN0JTIwZm9vZCUyMGJ1cmdlcnxlbnwxfHx8fDE3Njg0NzE3NDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.7,
    reviews: 342,
    description: 'Burger bò Úc 100%, phô mai Cheddar tan chảy',
    category: 'Fast Food'
  },
  {
    id: '4',
    name: 'Bánh Donut Mix 6 Vị',
    price: 65000,
    originalPrice: 85000,
    image: 'https://images.unsplash.com/photo-1713764221892-d210a0ce0cfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb251dHMlMjBwYXN0cnl8ZW58MXx8fHwxNzY4NDcxNzkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.6,
    reviews: 198,
    description: 'Set 6 bánh donut nhiều vị, tươi mỗi ngày',
    discount: 24,
    category: 'Bánh ngọt'
  },
  {
    id: '5',
    name: 'Gà Rán Giòn Tan (8 Miếng)',
    price: 89000,
    originalPrice: 120000,
    image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllZCUyMGNoaWNrZW58ZW58MXx8fHwxNzY4NDQ0MTk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.9,
    reviews: 567,
    description: 'Gà rán giòn rụm, ướp gia vị đặc biệt',
    discount: 26,
    tag: 'Bán chạy',
    category: 'Fast Food'
  },
  {
    id: '6',
    name: 'Kem Ý Gelato Mix 3 Vị',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2UlMjBjcmVhbXxlbnwxfHx8fDE3Njg0NzE3OTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.8,
    reviews: 423,
    description: 'Kem Ý Gelato vani, chocolate, dâu tươi',
    category: 'Kem'
  },
  {
    id: '7',
    name: 'Pizza Hải Sản Cao Cấp',
    price: 129000,
    originalPrice: 179000,
    image: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMHNsaWNlfGVufDF8fHx8MTc2ODM5MjY2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.7,
    reviews: 289,
    description: 'Pizza size L, hải sản tươi ngon, phô mai mozzarella',
    discount: 28,
    tag: 'Mới',
    category: 'Pizza'
  },
  {
    id: '8',
    name: 'Sushi Roll Combo 20 Miếng',
    price: 159000,
    image: 'https://images.unsplash.com/photo-1582450871972-ab5ca641643d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMHJvbGxzfGVufDF8fHx8MTc2ODQxNTE3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.9,
    reviews: 534,
    description: 'Combo sushi 20 miếng: California, Sake, Tamago',
    tag: 'Hot',
    category: 'Món Việt'
  },
  {
    id: '9',
    name: 'Cà Phê Latte Đá',
    price: 29000,
    image: 'https://images.unsplash.com/photo-1611564494260-6f21b80af7ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBsYXR0ZXxlbnwxfHx8fDE3Njg0NTI0NDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.6,
    reviews: 312,
    description: 'Cà phê latte pha từ hạt Arabica nguyên chất',
    category: 'Cà phê'
  },
  {
    id: '10',
    name: 'Phở Bò Tái Nạm Đặc Biệt',
    price: 45000,
    originalPrice: 55000,
    image: 'https://images.unsplash.com/photo-1687902409602-8b7cf039a44a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtZXNlJTIwc3RyZWV0JTIwZm9vZHxlbnwxfHx8fDE3Njg0NzE3NDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.8,
    reviews: 678,
    description: 'Phở bò nước dùng ninh từ xương hầm 12 tiếng',
    discount: 18,
    tag: 'Bán chạy',
    category: 'Món Việt'
  },
  {
    id: '11',
    name: 'Bánh Kem Sinh Nhật Socola',
    price: 250000,
    originalPrice: 320000,
    image: 'https://images.unsplash.com/photo-1679942262057-d5732f732841?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNzZXJ0JTIwY2FrZXxlbnwxfHx8fDE3Njg0NTQ0MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 5.0,
    reviews: 156,
    description: 'Bánh kem socola Bỉ, trang trí theo yêu cầu',
    discount: 22,
    tag: 'Mới',
    category: 'Bánh ngọt'
  },
  {
    id: '12',
    name: 'Combo Ăn Vặt Mix (10 Món)',
    price: 99000,
    originalPrice: 140000,
    image: 'https://images.unsplash.com/photo-1734027899096-291063588ab3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmFja3MlMjBjaGlwc3xlbnwxfHx8fDE3Njg0NzE3NDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.7,
    reviews: 445,
    description: 'Set đồ ăn vặt mix: khoai tây chiên, gà popcorn, phô mai que...',
    discount: 29,
    tag: 'Hot',
    category: 'Đồ ăn vặt'
  }
];
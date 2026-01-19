/**
 * Dữ liệu mẫu (Mock Data) cho FoodieShop
 * Bao gồm: Danh mục, Sản phẩm, Cửa hàng và Khuyến mãi
 */

// Danh mục sản phẩm (Categories)
export const categories = [
  {
    name: 'Đồ ăn vặt',
    image: 'https://images.unsplash.com/photo-1734027899096-291063588ab3?q=80&w=1080',
    itemCount: 120
  },
  {
    name: 'Trà sữa',
    image: 'https://images.unsplash.com/photo-1670468642364-6cacadfb7bb0?q=80&w=1080',
    itemCount: 85
  },
  {
    name: 'Fast Food',
    image: 'https://images.unsplash.com/photo-1656439659132-24c68e36b553?q=80&w=1080',
    itemCount: 95
  },
  {
    name: 'Bánh ngọt',
    image: 'https://images.unsplash.com/photo-1679942262057-d5732f732841?q=80&w=1080',
    itemCount: 78
  },
  {
    name: 'Cà phê',
    image: 'https://images.unsplash.com/photo-1611564494260-6f21b80af7ea?q=80&w=1080',
    itemCount: 65
  },
  {
    name: 'Kem',
    image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?q=80&w=1080',
    itemCount: 52
  },
  {
    name: 'Món Việt',
    image: 'https://images.unsplash.com/photo-1687902409602-8b7cf039a44a?q=80&w=1080',
    itemCount: 145
  },
  {
    name: 'Pizza',
    image: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?q=80&w=1080',
    itemCount: 42
  }
];

// Danh sách sản phẩm (Products)
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
    category: 'Đồ ăn vặt',
    shopId: 'shop-1',
    shopName: 'Quán Ăn Vặt Ngon 247'
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
    category: 'Trà sữa',
    shopId: 'shop-2',
    shopName: 'Trà Sữa House'
  },
  {
    id: '3',
    name: 'Burger Bò Phô Mai Đặc Biệt',
    price: 55000,
    image: 'https://images.unsplash.com/photo-1656439659132-24c68e36b553?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXN0JTIwZm9vZCUyMGJ1cmdlcnxlbnwxfHx8fDE3Njg0NzE3NDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.7,
    reviews: 342,
    description: 'Burger bò Úc 100%, phô mai Cheddar tan chảy',
    category: 'Fast Food',
    shopId: 'shop-4',
    shopName: 'FastFood Corner'
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
    category: 'Bánh ngọt',
    shopId: 'shop-3',
    shopName: 'Tiệm Bánh Ngọt Pháp'
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
    category: 'Fast Food',
    shopId: 'shop-4',
    shopName: 'FastFood Corner'
  },
  {
    id: '6',
    name: 'Kem Ý Gelato Mix 3 Vị',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2UlMjBjcmVhbXxlbnwxfHx8fDE3Njg0NzE3OTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.8,
    reviews: 423,
    description: 'Kem Ý Gelato vani, chocolate, dâu tươi',
    category: 'Kem',
    shopId: 'shop-8',
    shopName: 'Kem Gelato Premium'
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
    category: 'Pizza',
    shopId: 'shop-5',
    shopName: 'Pizza Italia'
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
    category: 'Món Việt',
    shopId: 'shop-7',
    shopName: 'Phở Bò Hà Nội'
  },
  {
    id: '9',
    name: 'Cà Phê Latte Đá',
    price: 29000,
    image: 'https://images.unsplash.com/photo-1611564494260-6f21b80af7ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBsYXR0ZXxlbnwxfHx8fDE3Njg0NTI0NDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.6,
    reviews: 312,
    description: 'Cà phê latte pha từ hạt Arabica nguyên chất',
    category: 'Cà phê',
    shopId: 'shop-6',
    shopName: 'Cà Phê Sài Gòn'
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
    category: 'Món Việt',
    shopId: 'shop-7',
    shopName: 'Phở Bò Hà Nội'
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
    category: 'Bánh ngọt',
    shopId: 'shop-3',
    shopName: 'Tiệm Bánh Ngọt Pháp'
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
    category: 'Đồ ăn vặt',
    shopId: 'shop-1',
    shopName: 'Quán Ăn Vặt Ngon 247'
  }
];

// Danh sách cửa hàng (Shops)
export const shops = [
{
    id: 'shop-1',
    name: 'Quán Ăn Vặt Ngon 247',
    logo: 'https://images.unsplash.com/photo-1561336635-c0e118ad72a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwbG9nb3xlbnwxfHx8fDE3Njg2NTEwMTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    coverImage: 'https://images.unsplash.com/photo-1667388969250-1c7220bf3f37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY4NjQ3OTc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Chuyên cung cấp đồ ăn vặt chất lượng, giao hàng nhanh 24/7',
    rating: 4.9,
    reviews: 1250,
    address: '123 Nguyễn Huệ',
    city: 'TP.HCM',
    district: 'Q.1',
    ward: 'Phường 1',
    products: 156,
    badge: 'Bán chạy',
    isVerified: true
  },
  {
    id: 'shop-2',
    name: 'Trà Sữa House',
    logo: 'https://images.unsplash.com/photo-1670468642364-6cacadfb7bb0?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1648808694138-6706c5efc80a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwaW50ZXJpb3IlMjBtb2Rlcm58ZW58MXx8fHwxNzY4NjEyMDE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Trà sữa Đài Loan chính gốc, công thức độc quyền',
    rating: 4.8,
    reviews: 856,
    address: '456 Lê Lợi',
    city: 'TP.HCM',
    district: 'Q.3',
    ward: 'Phường 3',
    products: 45,
    isVerified: true
  },
  {
    id: 'shop-3',
    name: 'Tiệm Bánh Ngọt Pháp',
    logo: 'https://images.unsplash.com/photo-1679942262057-d5732f732841?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1711672284661-bd70e38f31b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBzaG9wfGVufDF8fHx8MTc2ODcyNzE2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Bánh ngọt, bánh mì Pháp tươi mỗi ngày',
    rating: 5.0,
    reviews: 432,
    address: '789 Pasteur',
    city: 'TP.HCM',
    district: 'Q.1',
    ward: 'Phường 1',
    products: 78,
    badge: 'Mới',
    isVerified: true
  },
  {
    id: 'shop-4',
    name: 'FastFood Corner',
    logo: 'https://images.unsplash.com/photo-1656439659132-24c68e36b553?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwdHJ1Y2t8ZW58MXx8fHwxNzY4NjMyNDg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Burger, gà rán, khoai tây chiên - Nhanh & Ngon',
    rating: 4.7,
    reviews: 678,
    address: '321 Trần Hưng Đạo',
    city: 'TP.HCM',
    district: 'Q.5',
    ward: 'Phường 5',
    products: 92,
    isVerified: true
  },
  {
    id: 'shop-5',
    name: 'Pizza Italia',
    logo: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1563245738-9169ff58eccf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzY4NjM5MDkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Pizza Ý chính gốc, lò nướng truyền thống',
    rating: 4.9,
    reviews: 543,
    address: '567 Võ Văn Tần',
    city: 'TP.HCM',
    district: 'Q.3',
    ward: 'Phường 3',
    products: 34,
    badge: 'Hot',
    isVerified: true
  },
  {
    id: 'shop-6',
    name: 'Cà Phê Sài Gòn',
    logo: 'https://images.unsplash.com/photo-1611564494260-6f21b80af7ea?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1648808694138-6706c5efc80a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwaW50ZXJpb3IlMjBtb2Rlcm58ZW58MXx8fHwxNzY4NjEyMDE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Cà phê Việt nguyên chất, không gian yên tĩnh',
    rating: 4.8,
    reviews: 934,
    address: '890 Nguyễn Trãi',
    city: 'TP.HCM',
    district: 'Q.1',
    ward: 'Phường 1',
    products: 28,
    isVerified: true
  },
  {
    id: 'shop-7',
    name: 'Phở Bò Hà Nội',
    logo: 'https://images.unsplash.com/photo-1687902409602-8b7cf039a44a?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1667388969250-1c7220bf3f37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY4NjQ3OTc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Phở bò Hà Nội truyền thống, nước dùng đậm đà',
    rating: 4.9,
    reviews: 1120,
    address: '234 Lý Thường Kiệt',
    city: 'TP.HCM',
    district: 'Q.10',
    ward: 'Phường 10',
    products: 18,
    badge: 'Bán chạy',
    isVerified: true
  },
  {
    id: 'shop-8',
    name: 'Kem Gelato Premium',
    logo: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1711672284661-bd70e38f31b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBzaG9wfGVufDF8fHx8MTc2ODcyNzE2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Kem Gelato Ý cao cấp, 100% nguyên liệu tự nhiên',
    rating: 5.0,
    reviews: 287,
    address: '678 Hai Bà Trưng',
    city: 'TP.HCM',
    district: 'Q.1',
    ward: 'Phường 1',
    products: 52,
    isVerified: false
  }
];

// Danh sách khuyến mãi (Promotions)
export const promotions = [
 {
    id: 'promo-shop-1',
    title: 'Giảm 10% toàn shop',
    description: 'Áp dụng cho tất cả sản phẩm',
    discount: 10,
    discountType: 'percentage',
    type: 'shop',
    shopId: 'shop-1',
    validUntil: '31/01/2026',
    code: 'SHOP1SALE'
  },
  {
    id: 'promo-shop-2',
    title: 'Giảm 20k đơn từ 100k',
    description: 'Giảm 20.000đ cho đơn hàng từ 100.000đ',
    discount: 20000,
    discountType: 'fixed',
    type: 'shop',
    shopId: 'shop-2',
    minPurchase: 100000,
    validUntil: '28/01/2026',
    code: 'TRASUA20K'
  },
  {
    id: 'promo-shop-3',
    title: 'Giảm 15% toàn bộ bánh',
    description: 'Khuyến mãi đặc biệt cho tất cả bánh ngọt',
    discount: 15,
    discountType: 'percentage',
    type: 'shop',
    shopId: 'shop-3',
    validUntil: '25/01/2026',
    code: 'BANH15'
  },
  {
    id: 'promo-shop-4',
    title: 'Giảm 30k đơn từ 150k',
    description: 'Giảm 30.000đ cho đơn hàng từ 150.000đ',
    discount: 30000,
    discountType: 'fixed',
    type: 'shop',
    shopId: 'shop-4',
    minPurchase: 150000,
    validUntil: '30/01/2026',
    code: 'FASTFOOD30'
  },
  {
    id: 'promo-shop-5',
    title: 'Giảm 20% Pizza',
    description: 'Khuyến mãi đặc biệt cho tất cả pizza',
    discount: 20,
    discountType: 'percentage',
    type: 'shop',
    shopId: 'shop-5',
    validUntil: '29/01/2026',
    code: 'PIZZA20'
  },
  
  // Product promotions
  {
    id: 'promo-prod-1',
    title: 'Giảm 5k sản phẩm này',
    description: 'Giảm 5.000đ cho sản phẩm',
    discount: 5000,
    discountType: 'fixed',
    type: 'product',
    productId: '1',
    validUntil: '31/01/2026',
    code: 'SNACK5K'
  },
  {
    id: 'promo-prod-2',
    title: 'Giảm 10k trà sữa',
    description: 'Giảm 10.000đ cho ly trà sữa này',
    discount: 10000,
    discountType: 'fixed',
    type: 'product',
    productId: '2',
    validUntil: '28/01/2026',
    code: 'TRASUA10K'
  },
  {
    id: 'promo-prod-5',
    title: 'Giảm 15k gà rán',
    description: 'Giảm 15.000đ cho combo gà rán',
    discount: 15000,
    discountType: 'fixed',
    type: 'product',
    productId: '5',
    validUntil: '30/01/2026',
    code: 'GARAN15K'
  },
  {
    id: 'promo-prod-7',
    title: 'Giảm 25k pizza',
    description: 'Giảm 25.000đ cho pizza hải sản',
    discount: 25000,
    discountType: 'fixed',
    type: 'product',
    productId: '7',
    validUntil: '29/01/2026',
    code: 'PIZZA25K'
  },
  {
    id: 'promo-prod-11',
    title: 'Giảm 30k bánh kem',
    description: 'Giảm 30.000đ cho bánh kem sinh nhật',
    discount: 30000,
    discountType: 'fixed',
    type: 'product',
    productId: '11',
    validUntil: '31/01/2026',
    code: 'CAKE30K'
  },
  {
    id: 'promo-prod-12',
    title: 'Giảm 20k combo',
    description: 'Giảm 20.000đ cho combo ăn vặt',
    discount: 20000,
    discountType: 'fixed',
    type: 'product',
    productId: '12',
    validUntil: '28/01/2026',
    code: 'COMBO20K'
  }
];
/**
 * Dữ liệu giả lập (Mock Data) cho hệ thống FoodieShop.
 * Bao gồm: Danh mục, Sản phẩm, Cửa hàng và Khuyến mãi.
 */

// 1. Danh sách Danh mục
export const categories = [
  {
    name: 'Đồ ăn vặt',
    image: 'https://images.unsplash.com/photo-1734027899096-291063588ab3?w=400&h=300&fit=crop',
    itemCount: 120
  },
  {
    name: 'Trà sữa',
    image: 'https://images.unsplash.com/photo-1670468642364-6cacadfb7bb0?w=400&h=300&fit=crop',
    itemCount: 85
  },
  {
    name: 'Fast Food',
    image: 'https://images.unsplash.com/photo-1656439659132-24c68e36b553?w=400&h=300&fit=crop',
    itemCount: 95
  },
  {
    name: 'Bánh ngọt',
    image: 'https://images.unsplash.com/photo-1679942262057-d5732f732841?w=400&h=300&fit=crop',
    itemCount: 78
  },
  {
    name: 'Cà phê',
    image: 'https://images.unsplash.com/photo-1611564494260-6f21b80af7ea?w=400&h=300&fit=crop',
    itemCount: 65
  },
  {
    name: 'Kem',
    image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&h=300&fit=crop',
    itemCount: 52
  },
  {
    name: 'Món Việt',
    image: 'https://images.unsplash.com/photo-1687902409602-8b7cf039a44a?w=400&h=300&fit=crop',
    itemCount: 145
  },
  {
    name: 'Pizza',
    image: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?w=400&h=300&fit=crop',
    itemCount: 42
  }
];

// 2. Danh sách Cửa hàng (Shops)
export const shops = [
  {
    id: 'shop-1',
    name: 'Quán Ăn Vặt Ngon 247',
    logo: 'https://images.unsplash.com/photo-1561336635-c0e118ad72a0?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1667388969250-1c7220bf3f37?w=1080&h=400&fit=crop',
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
    coverImage: 'https://images.unsplash.com/photo-1648808694138-6706c5efc80a?w=1080&h=400&fit=crop',
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
    coverImage: 'https://images.unsplash.com/photo-1711672284661-bd70e38f31b2?w=1080&h=400&fit=crop',
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
    coverImage: 'https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=1080&h=400&fit=crop',
    description: 'Burger, gà rán, khoai tây chiên - Nhanh & Ngon',
    rating: 4.7,
    reviews: 678,
    address: '321 Trần Hưng Đạo',
    city: 'TP.HCM',
    district: 'Q.5',
    ward: 'Phường 5',
    products: 92,
    isVerified: true
  }
];

// 3. Danh sách Sản phẩm (Products)
export const products = [
  {
    id: '1',
    name: "Snack Khoai Tây Lay's Vị Phô Mai",
    price: 15000,
    originalPrice: 20000,
    image: 'https://images.unsplash.com/photo-1734027899096-291063588ab3?w=400&h=300&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1670468642364-6cacadfb7bb0?w=400&h=300&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1656439659132-24c68e36b553?w=400&h=300&fit=crop',
    rating: 4.7,
    reviews: 342,
    description: 'Burger bò Úc 100%, phô mai Cheddar tan chảy',
    category: 'Fast Food',
    shopId: 'shop-4',
    shopName: 'FastFood Corner'
  },
  {
    id: '5',
    name: 'Gà Rán Giòn Tan (8 Miếng)',
    price: 89000,
    originalPrice: 120000,
    image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=400&h=300&fit=crop',
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
    id: '7',
    name: 'Pizza Hải Sản Cao Cấp',
    price: 129000,
    originalPrice: 179000,
    image: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?w=400&h=300&fit=crop',
    rating: 4.7,
    reviews: 289,
    description: 'Pizza size L, hải sản tươi ngon, phô mai mozzarella',
    discount: 28,
    tag: 'Mới',
    category: 'Pizza',
    shopId: 'shop-5',
    shopName: 'Pizza Italia'
  }
];

// 4. Danh sách Khuyến mãi (Promotions)
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
    id: 'promo-prod-1',
    title: 'Giảm 5k sản phẩm này',
    description: 'Giảm 5.000đ cho sản phẩm',
    discount: 5000,
    discountType: 'fixed',
    type: 'product',
    productId: '1',
    validUntil: '31/01/2026',
    code: 'SNACK5K'
  }
];
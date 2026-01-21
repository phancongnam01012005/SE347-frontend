import { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Switch } from '../ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { 
  Users, 
  Store, 
  Package, 
  AlertCircle, 
  Search, 
  CheckCircle, 
  XCircle, 
  EyeOff,
  Shield,
  TrendingUp,
  Flame,
  Mail,
  Phone,
  LogOut,
  User,
  Calendar,
  ShoppingBag,
  Building2,
  Zap,
  Trophy,
  Sparkles,
  Tag,
  Truck,
  MapPin,
  Leaf,
  Salad,
  ChefHat,
  Award
} from 'lucide-react';
import { ProductDetailPage } from './ProductDetailPage';
import { ShopDetailPage } from './ShopDetailPage';

export function AdminPage({ currentUser, onLogout }) {
  // Mock data
  const [users, setUsers] = useState([
    {
      id: '1',
      name: 'Nguyễn Văn A',
      email: 'buyer@example.com',
      phone: '0123456789',
      userType: 'buyer',
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Trần Thị B',
      email: 'seller@example.com',
      phone: '0987654321',
      userType: 'seller',
      status: 'active',
      createdAt: '2024-01-20'
    },
    {
      id: '3',
      name: 'Lê Văn C',
      email: 'buyer2@example.com',
      phone: '0912345678',
      userType: 'buyer',
      status: 'active',
      createdAt: '2024-01-22'
    }
  ]);

  const [shops, setShops] = useState([
    {
      id: '1',
      name: 'Bánh Mì Huỳnh Hoa',
      rating: 4.8,
      reviews: 1234,
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=200&fit=crop',
      address: '26 Lê Thị Riêng, Q1, TP.HCM',
      verified: true,
      trending: true,
      mall: true,
      fastShipping: true,
      topShop: false,
      isNew: false,
      hidden: false
    },
    {
      id: '2',
      name: 'Phở Hòa Pasteur',
      rating: 4.7,
      reviews: 892,
      image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300&h=200&fit=crop',
      address: '260C Pasteur, Q3, TP.HCM',
      verified: false,
      trending: false,
      mall: false,
      fastShipping: false,
      topShop: true,
      isNew: false,
      hidden: false
    },
    {
      id: '3',
      name: 'Cơm Tấm Sướn Bì',
      rating: 4.6,
      reviews: 567,
      image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&h=200&fit=crop',
      address: '123 Nguyễn Trãi, Q5, TP.HCM',
      verified: true,
      trending: false,
      mall: false,
      fastShipping: false,
      topShop: false,
      isNew: true,
      hidden: false
    }
  ]);

  const [products, setProducts] = useState([
    {
      id: '1',
      name: 'Bánh Mì Thịt Nướng',
      price: 25000,
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=200&fit=crop',
      rating: 4.8,
      sold: 1234,
      shopId: '1',
      description: 'Bánh mì thịt nướng thơm ngon',
      category: 'Bánh mì',
      hot: true,
      trending: true,
      newArrival: false,
      limited: false,
      flashSale: true,
      freeship: true,
      local: true,
      organic: false,
      spicy: false,
      healthy: false,
      homemade: true,
      bestSeller: true,
      hidden: false
    },
    {
      id: '2',
      name: 'Phở Bò Tái',
      price: 45000,
      image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300&h=200&fit=crop',
      rating: 4.7,
      sold: 892,
      shopId: '2',
      description: 'Phở bò tái nóng hổi',
      category: 'Phở',
      hot: false,
      trending: true,
      newArrival: true,
      limited: false,
      flashSale: false,
      freeship: false,
      local: true,
      organic: true,
      spicy: false,
      healthy: true,
      homemade: false,
      bestSeller: false,
      hidden: false
    },
    {
      id: '3',
      name: 'Cơm Tấm Sườn Bì Chả',
      price: 35000,
      image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&h=200&fit=crop',
      rating: 4.6,
      sold: 567,
      shopId: '3',
      description: 'Cơm tấm sườn bì chả truyền thống',
      category: 'Cơm',
      hot: true,
      trending: false,
      newArrival: false,
      limited: true,
      flashSale: false,
      freeship: false,
      local: false,
      organic: false,
      spicy: true,
      healthy: false,
      homemade: true,
      bestSeller: false,
      hidden: false
    }
  ]);

  const [reports, setReports] = useState([
    {
      id: '1',
      userId: '1',
      userName: 'Nguyễn Văn A',
      type: 'bug',
      title: 'Lỗi thanh toán',
      description: 'Không thể thanh toán bằng MoMo',
      status: 'pending',
      createdAt: '2024-01-25 10:30'
    },
    {
      id: '2',
      userId: '2',
      userName: 'Trần Thị B',
      type: 'product',
      title: 'Sản phẩm giả',
      description: 'Sản phẩm #123 là hàng giả',
      status: 'pending',
      createdAt: '2024-01-25 14:20'
    },
    {
      id: '3',
      userId: '3',
      userName: 'Lê Văn C',
      type: 'shop',
      title: 'Cửa hàng giao hàng chậm',
      description: 'Cửa hàng luôn giao hàng chậm trễ',
      status: 'resolved',
      createdAt: '2024-01-24 09:15'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('users');
  
  // Dialog states
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedShop, setSelectedShop] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Get shop products for selected shop
  const shopProducts = selectedShop 
    ? products.filter(p => p.shopId === selectedShop.id)
    : [];

  // User Management
  const toggleUserStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'banned' : 'active' }
        : user
    ));
  };

  // Shop Management Functions
  const toggleShopProperty = (shopId, property) => {
    setShops(shops.map(shop => 
      shop.id === shopId ? { ...shop, [property]: !shop[property] } : shop
    ));
  };

  // Product Management Functions
  const toggleProductProperty = (productId, property) => {
    setProducts(products.map(product => 
      product.id === productId ? { ...product, [property]: !product[property] } : product
    ));
  };

  // Report Management
  const updateReportStatus = (reportId, status) => {
    setReports(reports.map(report => 
      report.id === reportId ? { ...report, status } : report
    ));
  };

  const getReportTypeColor = (type) => {
    switch (type) {
      case 'bug': return 'bg-red-100 text-red-700';
      case 'product': return 'bg-orange-100 text-orange-700';
      case 'shop': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getReportStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'resolved': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const pendingReportsCount = reports.filter(r => r.status === 'pending').length;

  return (
    <div className={`min-h-screen bg-background ${(selectedProduct || selectedShop) ? 'overflow-hidden h-screen' : ''}`}>
      {/* Admin Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#EE4D2D] to-[#ff6b47] rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-xl text-[#EE4D2D]">FoodieShop Admin</h1>
              <p className="text-xs text-muted-foreground">Hệ thống quản trị</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">{currentUser?.name || 'Admin'}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onLogout}
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              Đăng xuất
            </Button>
          </div>
        </div>
      </header>

      {/* Admin Dashboard */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Bảng điều khiển</h2>
            <p className="text-muted-foreground">Quản lý toàn bộ hệ thống FoodieShop</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Tài khoản
                <Badge variant="secondary">{users.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="shops" className="flex items-center gap-2">
                <Store className="w-4 h-4" />
                Cửa hàng
                <Badge variant="secondary">{shops.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="products" className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                Sản phẩm
                <Badge variant="secondary">{products.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Báo lỗi
                {pendingReportsCount > 0 && (
                  <Badge variant="destructive">
                    {pendingReportsCount}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            {/* Users Management */}
            <TabsContent value="users" className="space-y-4 mt-6">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Tìm kiếm người dùng..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="border rounded-lg divide-y">
                {users.map((user) => (
                  <div key={user.id} className="p-4 hover:bg-muted/50">
                    <div className="flex items-center justify-between">
                      <div 
                        className="flex-1 cursor-pointer"
                        onClick={() => setSelectedUser(user)}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{user.name}</h4>
                          <Badge variant={user.userType === 'buyer' ? 'default' : 'secondary'}>
                            {user.userType === 'buyer' ? 'Người mua' : 'Người bán'}
                          </Badge>
                          <Badge variant={user.status === 'active' ? 'outline' : 'destructive'}>
                            {user.status === 'active' ? 'Hoạt động' : 'Bị cấm'}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {user.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {user.phone}
                          </span>
                          <span>Tham gia: {user.createdAt}</span>
                        </div>
                      </div>
                      <Button
                        variant={user.status === 'active' ? 'destructive' : 'default'}
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleUserStatus(user.id);
                        }}
                      >
                        {user.status === 'active' ? 'Cấm tài khoản' : 'Mở cấm'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Shops Management */}
            <TabsContent value="shops" className="space-y-4 mt-6">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Tìm kiếm cửa hàng..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {shops.map((shop) => (
                  <div 
                    key={shop.id} 
                    className="border rounded-lg p-4 cursor-pointer hover:border-[#EE4D2D] transition-colors"
                    onClick={() => setSelectedShop(shop)}
                  >
                    <div className="flex gap-4">
                      <img
                        src={shop.image}
                        alt={shop.name}
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <h4 className="font-semibold text-lg">{shop.name}</h4>
                              {shop.verified && <CheckCircle className="w-5 h-5 text-blue-500" title="Tích xanh" />}
                              {shop.trending && <Badge className="bg-orange-500"><TrendingUp className="w-3 h-3 mr-1" />Bán chạy</Badge>}
                              {shop.mall && <Badge className="bg-purple-500"><Building2 className="w-3 h-3 mr-1" />Mall</Badge>}
                              {shop.fastShipping && <Badge className="bg-green-500"><Zap className="w-3 h-3 mr-1" />Giao nhanh</Badge>}
                              {shop.topShop && <Badge className="bg-yellow-500"><Trophy className="w-3 h-3 mr-1" />Top Shop</Badge>}
                              {shop.isNew && <Badge className="bg-pink-500"><Sparkles className="w-3 h-3 mr-1" />Mới</Badge>}
                              {shop.hidden && <Badge variant="secondary"><EyeOff className="w-3 h-3 mr-1" />Ẩn</Badge>}
                            </div>
                            <p className="text-sm text-muted-foreground">{shop.address}</p>
                            <div className="flex items-center gap-4 mt-1 text-sm">
                              <span>⭐ {shop.rating}</span>
                              <span>{shop.reviews} đánh giá</span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 mt-3" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-between p-2 border rounded text-sm">
                            <Label htmlFor={`shop-verified-${shop.id}`} className="cursor-pointer text-xs">Tích xanh</Label>
                            <Switch
                              id={`shop-verified-${shop.id}`}
                              checked={shop.verified}
                              onCheckedChange={() => toggleShopProperty(shop.id, 'verified')}
                            />
                          </div>
                          <div className="flex items-center justify-between p-2 border rounded text-sm">
                            <Label htmlFor={`shop-trending-${shop.id}`} className="cursor-pointer text-xs">Bán chạy</Label>
                            <Switch
                              id={`shop-trending-${shop.id}`}
                              checked={shop.trending}
                              onCheckedChange={() => toggleShopProperty(shop.id, 'trending')}
                            />
                          </div>
                          <div className="flex items-center justify-between p-2 border rounded text-sm">
                            <Label htmlFor={`shop-mall-${shop.id}`} className="cursor-pointer text-xs">Mall</Label>
                            <Switch
                              id={`shop-mall-${shop.id}`}
                              checked={shop.mall}
                              onCheckedChange={() => toggleShopProperty(shop.id, 'mall')}
                            />
                          </div>
                          <div className="flex items-center justify-between p-2 border rounded text-sm">
                            <Label htmlFor={`shop-fast-${shop.id}`} className="cursor-pointer text-xs">Giao nhanh</Label>
                            <Switch
                              id={`shop-fast-${shop.id}`}
                              checked={shop.fastShipping}
                              onCheckedChange={() => toggleShopProperty(shop.id, 'fastShipping')}
                            />
                          </div>
                          <div className="flex items-center justify-between p-2 border rounded text-sm">
                            <Label htmlFor={`shop-top-${shop.id}`} className="cursor-pointer text-xs">Top Shop</Label>
                            <Switch
                              id={`shop-top-${shop.id}`}
                              checked={shop.topShop}
                              onCheckedChange={() => toggleShopProperty(shop.id, 'topShop')}
                            />
                          </div>
                          <div className="flex items-center justify-between p-2 border rounded text-sm">
                            <Label htmlFor={`shop-new-${shop.id}`} className="cursor-pointer text-xs">Mới</Label>
                            <Switch
                              id={`shop-new-${shop.id}`}
                              checked={shop.isNew}
                              onCheckedChange={() => toggleShopProperty(shop.id, 'isNew')}
                            />
                          </div>
                          <div className="col-span-3">
                            <Button
                              variant={shop.hidden ? 'default' : 'outline'}
                              size="sm"
                              className={`w-full ${shop.hidden ? 'bg-yellow-600 hover:bg-yellow-700' : 'border-yellow-600 text-yellow-600 hover:bg-yellow-50'}`}
                              onClick={() => toggleShopProperty(shop.id, 'hidden')}
                            >
                              <EyeOff className="w-4 h-4 mr-1" />
                              {shop.hidden ? 'Hiện cửa hàng' : 'Ẩn cửa hàng'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Products Management */}
            <TabsContent value="products" className="space-y-4 mt-6">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Tìm kiếm sản phẩm..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {products.map((product) => (
                  <div 
                    key={product.id} 
                    className="border rounded-lg p-4 cursor-pointer hover:border-[#EE4D2D] transition-colors"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="flex gap-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <h4 className="font-semibold text-lg">{product.name}</h4>
                              {product.hot && <Badge className="bg-red-500"><Flame className="w-3 h-3 mr-1" />Hot</Badge>}
                              {product.trending && <Badge className="bg-orange-500"><TrendingUp className="w-3 h-3 mr-1" />Bán chạy</Badge>}
                              {product.newArrival && <Badge className="bg-pink-500"><Sparkles className="w-3 h-3 mr-1" />Hàng mới</Badge>}
                              {product.limited && <Badge className="bg-purple-500"><Tag className="w-3 h-3 mr-1" />Giới hạn</Badge>}
                              {product.flashSale && <Badge className="bg-red-600"><Zap className="w-3 h-3 mr-1" />Flash Sale</Badge>}
                              {product.freeship && <Badge className="bg-green-500"><Truck className="w-3 h-3 mr-1" />Freeship</Badge>}
                              {product.local && <Badge className="bg-blue-500"><MapPin className="w-3 h-3 mr-1" />Món địa phương</Badge>}
                              {product.organic && <Badge className="bg-green-600"><Leaf className="w-3 h-3 mr-1" />Organic</Badge>}
                              {product.spicy && <Badge className="bg-red-700">🌶️ Cay</Badge>}
                              {product.healthy && <Badge className="bg-teal-500"><Salad className="w-3 h-3 mr-1" />Healthy</Badge>}
                              {product.homemade && <Badge className="bg-amber-500"><ChefHat className="w-3 h-3 mr-1" />Homemade</Badge>}
                              {product.bestSeller && <Badge className="bg-yellow-500"><Award className="w-3 h-3 mr-1" />Best Seller</Badge>}
                              {product.hidden && <Badge variant="secondary"><EyeOff className="w-3 h-3 mr-1" />Ẩn</Badge>}
                            </div>
                            <p className="text-sm text-muted-foreground">{product.category}</p>
                            <div className="flex items-center gap-4 mt-1 text-sm">
                              <span className="font-semibold text-[#EE4D2D]">
                                {product.price.toLocaleString('vi-VN')}đ
                              </span>
                              <span>⭐ {product.rating}</span>
                              <span>Đã bán: {product.sold}</span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-4 gap-2 mt-3" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-between p-2 border rounded text-sm">
                            <Label htmlFor={`product-hot-${product.id}`} className="cursor-pointer text-xs">Hot</Label>
                            <Switch
                              id={`product-hot-${product.id}`}
                              checked={product.hot}
                              onCheckedChange={() => toggleProductProperty(product.id, 'hot')}
                            />
                          </div>
                          <div className="flex items-center justify-between p-2 border rounded text-sm">
                            <Label htmlFor={`product-trending-${product.id}`} className="cursor-pointer text-xs">Bán chạy</Label>
                            <Switch
                              id={`product-trending-${product.id}`}
                              checked={product.trending}
                              onCheckedChange={() => toggleProductProperty(product.id, 'trending')}
                            />
                          </div>
                          <div className="flex items-center justify-between p-2 border rounded text-sm">
                            <Label htmlFor={`product-new-${product.id}`} className="cursor-pointer text-xs">Hàng mới</Label>
                            <Switch
                              id={`product-new-${product.id}`}
                              checked={product.newArrival}
                              onCheckedChange={() => toggleProductProperty(product.id, 'newArrival')}
                            />
                          </div>
                          <div className="flex items-center justify-between p-2 border rounded text-sm">
                            <Label htmlFor={`product-limited-${product.id}`} className="cursor-pointer text-xs">Giới hạn</Label>
                            <Switch
                              id={`product-limited-${product.id}`}
                              checked={product.limited}
                              onCheckedChange={() => toggleProductProperty(product.id, 'limited')}
                            />
                          </div>
                          <div className="flex items-center justify-between p-2 border rounded text-sm">
                            <Label htmlFor={`product-flash-${product.id}`} className="cursor-pointer text-xs">Flash Sale</Label>
                            <Switch
                              id={`product-flash-${product.id}`}
                              checked={product.flashSale}
                              onCheckedChange={() => toggleProductProperty(product.id, 'flashSale')}
                            />
                          </div>
                          <div className="flex items-center justify-between p-2 border rounded text-sm">
                            <Label htmlFor={`product-freeship-${product.id}`} className="cursor-pointer text-xs">Freeship</Label>
                            <Switch
                              id={`product-freeship-${product.id}`}
                              checked={product.freeship}
                              onCheckedChange={() => toggleProductProperty(product.id, 'freeship')}
                            />
                          </div>
                          <div className="flex items-center justify-between p-2 border rounded text-sm">
                            <Label htmlFor={`product-local-${product.id}`} className="cursor-pointer text-xs">Địa phương</Label>
                            <Switch
                              id={`product-local-${product.id}`}
                              checked={product.local}
                              onCheckedChange={() => toggleProductProperty(product.id, 'local')}
                            />
                          </div>
                          <div className="flex items-center justify-between p-2 border rounded text-sm">
                            <Label htmlFor={`product-organic-${product.id}`} className="cursor-pointer text-xs">Organic</Label>
                            <Switch
                              id={`product-organic-${product.id}`}
                              checked={product.organic}
                              onCheckedChange={() => toggleProductProperty(product.id, 'organic')}
                            />
                          </div>
                          <div className="flex items-center justify-between p-2 border rounded text-sm">
                            <Label htmlFor={`product-spicy-${product.id}`} className="cursor-pointer text-xs">Cay</Label>
                            <Switch
                              id={`product-spicy-${product.id}`}
                              checked={product.spicy}
                              onCheckedChange={() => toggleProductProperty(product.id, 'spicy')}
                            />
                          </div>
                          <div className="flex items-center justify-between p-2 border rounded text-sm">
                            <Label htmlFor={`product-healthy-${product.id}`} className="cursor-pointer text-xs">Healthy</Label>
                            <Switch
                              id={`product-healthy-${product.id}`}
                              checked={product.healthy}
                              onCheckedChange={() => toggleProductProperty(product.id, 'healthy')}
                            />
                          </div>
                          <div className="flex items-center justify-between p-2 border rounded text-sm">
                            <Label htmlFor={`product-homemade-${product.id}`} className="cursor-pointer text-xs">Homemade</Label>
                            <Switch
                              id={`product-homemade-${product.id}`}
                              checked={product.homemade}
                              onCheckedChange={() => toggleProductProperty(product.id, 'homemade')}
                            />
                          </div>
                          <div className="flex items-center justify-between p-2 border rounded text-sm">
                            <Label htmlFor={`product-best-${product.id}`} className="cursor-pointer text-xs">Best Seller</Label>
                            <Switch
                              id={`product-best-${product.id}`}
                              checked={product.bestSeller}
                              onCheckedChange={() => toggleProductProperty(product.id, 'bestSeller')}
                            />
                          </div>
                          <div className="col-span-4">
                            <Button
                              variant={product.hidden ? 'default' : 'outline'}
                              size="sm"
                              className={`w-full ${product.hidden ? 'bg-yellow-600 hover:bg-yellow-700' : 'border-yellow-600 text-yellow-600 hover:bg-yellow-50'}`}
                              onClick={() => toggleProductProperty(product.id, 'hidden')}
                            >
                              <EyeOff className="w-4 h-4 mr-1" />
                              {product.hidden ? 'Hiện sản phẩm' : 'Ẩn sản phẩm'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Reports Management */}
            <TabsContent value="reports" className="space-y-4 mt-6">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Tìm kiếm báo cáo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="border rounded-lg divide-y">
                {reports.map((report) => (
                  <div key={report.id} className="p-4 hover:bg-muted/50">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{report.title}</h4>
                          <Badge className={getReportTypeColor(report.type)}>
                            {report.type === 'bug' ? 'Lỗi hệ thống' : 
                             report.type === 'product' ? 'Sản phẩm' :
                             report.type === 'shop' ? 'Cửa hàng' : 'Khác'}
                          </Badge>
                          <Badge className={getReportStatusColor(report.status)}>
                            {report.status === 'pending' ? 'Chờ xử lý' :
                             report.status === 'resolved' ? 'Đã xử lý' : 'Từ chối'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Người gửi: {report.userName}</span>
                          <span>{report.createdAt}</span>
                        </div>
                      </div>
                      {report.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => updateReportStatus(report.id, 'resolved')}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Xử lý
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => updateReportStatus(report.id, 'rejected')}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Từ chối
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* User Detail Dialog */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Thông tin người dùng</DialogTitle>
            <DialogDescription>
              Chi tiết tài khoản và hoạt động
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#EE4D2D] to-[#ff6b47] flex items-center justify-center text-white text-2xl font-bold">
                  {selectedUser.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{selectedUser.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={selectedUser.userType === 'buyer' ? 'default' : 'secondary'}>
                      {selectedUser.userType === 'buyer' ? 'Người mua' : 'Người bán'}
                    </Badge>
                    <Badge variant={selectedUser.status === 'active' ? 'outline' : 'destructive'}>
                      {selectedUser.status === 'active' ? 'Hoạt động' : 'Bị cấm'}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-muted-foreground flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </Label>
                  <p className="font-medium">{selectedUser.email}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Số điện thoại
                  </Label>
                  <p className="font-medium">{selectedUser.phone}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Ngày tham gia
                  </Label>
                  <p className="font-medium">{selectedUser.createdAt}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4" />
                    Tổng đơn hàng
                  </Label>
                  <p className="font-medium">12 đơn</p>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setSelectedUser(null)}>
                  Đóng
                </Button>
                <Button
                  variant={selectedUser.status === 'active' ? 'destructive' : 'default'}
                  onClick={() => {
                    toggleUserStatus(selectedUser.id);
                    setSelectedUser(null);
                  }}
                >
                  {selectedUser.status === 'active' ? 'Cấm tài khoản' : 'Mở cấm'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Shop Detail Dialog */}
      <ShopDetailPage
        isOpen={!!selectedShop}
        onClose={() => setSelectedShop(null)}
        shop={selectedShop}
        shopProducts={shopProducts}
        onAddToCart={() => {}}
        showFavoriteButton={false}
        isLoggedIn={false}
        hideHeader={true}
        hideFooter={true}
      />

      {/* Product Detail Dialog - Using ProductDetailPage */}
      <ProductDetailPage
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        product={selectedProduct}
        onAddToCart={() => {}}
        showFavoriteButton={false}
        isLoggedIn={false}
      />
    </div>
  );
}
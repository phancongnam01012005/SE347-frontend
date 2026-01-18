import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';
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
  Ban,
  Mail,
  Phone,
  LogOut,
  User
} from 'lucide-react';

export function AdminPage({ currentUser, onLogout }) {
  // --- QUẢN LÝ DỮ LIỆU MOCK ---
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
      hidden: false,
      banned: false
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
      hidden: false,
      banned: false
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
      category: 'Bánh mì',
      hot: true,
      trending: true,
      hidden: false,
      banned: false
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
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('users');

  // --- HÀM XỬ LÝ (LOGIC) ---

  const toggleUserStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'banned' : 'active' }
        : user
    ));
  };

  const toggleShopAttribute = (shopId, field) => {
    setShops(shops.map(shop => 
      shop.id === shopId ? { ...shop, [field]: !shop[field] } : shop
    ));
  };

  const toggleProductAttribute = (productId, field) => {
    setProducts(products.map(product => 
      product.id === productId ? { ...product, [field]: !product[field] } : product
    ));
  };

  const updateReportStatus = (reportId, status) => {
    setReports(reports.map(report => 
      report.id === reportId ? { ...report, status } : report
    ));
  };

  // --- HELPER FUNCTIONS ---
  const getReportTypeColor = (type) => {
    const colors = {
      bug: 'bg-red-100 text-red-700',
      product: 'bg-orange-100 text-orange-700',
      shop: 'bg-blue-100 text-blue-700'
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  const getReportStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-700',
      resolved: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const pendingReportsCount = reports.filter(r => r.status === 'pending').length;

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#EE4D2D] rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-xl text-[#EE4D2D]">FoodieShop Admin</h1>
              <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Control Panel</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full">
              <User className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-bold">{currentUser?.name || 'Administrator'}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={onLogout} className="text-red-500 hover:text-red-600 hover:bg-red-50">
              <LogOut className="w-4 h-4 mr-2" /> Thoát
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm border p-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8 h-12 bg-gray-100 p-1">
              <TabsTrigger value="users" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <Users className="w-4 h-4 mr-2" /> Tài khoản
              </TabsTrigger>
              <TabsTrigger value="shops" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <Store className="w-4 h-4 mr-2" /> Cửa hàng
              </TabsTrigger>
              <TabsTrigger value="products" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <Package className="w-4 h-4 mr-2" /> Sản phẩm
              </TabsTrigger>
              <TabsTrigger value="reports" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <AlertCircle className="w-4 h-4 mr-2" /> Báo cáo
                {pendingReportsCount > 0 && <Badge className="ml-2 bg-red-500">{pendingReportsCount}</Badge>}
              </TabsTrigger>
            </TabsList>

            {/* TAB: QUẢN LÝ NGƯỜI DÙNG */}
            <TabsContent value="users" className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Tìm kiếm tên, email, sđt..." className="pl-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              <div className="border rounded-xl overflow-hidden divide-y">
                {users.map((user) => (
                  <div key={user.id} className="p-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-gray-900">{user.name}</h4>
                        <Badge variant={user.userType === 'buyer' ? 'secondary' : 'default'}>{user.userType === 'buyer' ? 'Người mua' : 'Người bán'}</Badge>
                        <Badge variant={user.status === 'active' ? 'outline' : 'destructive'}>{user.status === 'active' ? 'Hoạt động' : 'Bị cấm'}</Badge>
                      </div>
                      <div className="flex gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {user.email}</span>
                        <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {user.phone}</span>
                      </div>
                    </div>
                    <Button variant={user.status === 'active' ? 'destructive' : 'default'} size="sm" onClick={() => toggleUserStatus(user.id)}>
                      {user.status === 'active' ? 'Cấm' : 'Mở cấm'}
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* TAB: QUẢN LÝ CỬA HÀNG */}
            <TabsContent value="shops" className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                {shops.map((shop) => (
                  <div key={shop.id} className="border rounded-xl p-5 flex gap-5">
                    <img src={shop.image} alt={shop.name} className="w-24 h-24 rounded-xl object-cover shadow-sm" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-bold text-lg">{shop.name}</h4>
                        {shop.verified && <CheckCircle className="w-5 h-5 text-blue-500 fill-blue-50" />}
                        {shop.trending && <Badge className="bg-orange-500 font-bold">Trending</Badge>}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        {[
                          { label: 'Xác minh', field: 'verified' },
                          { label: 'Xu hướng', field: 'trending' },
                          { label: 'Ẩn', field: 'hidden' },
                          { label: 'Cấm', field: 'banned' }
                        ].map((item) => (
                          <div key={item.field} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border">
                            <span className="text-xs font-medium">{item.label}</span>
                            <Switch checked={shop[item.field]} onCheckedChange={() => toggleShopAttribute(shop.id, item.field)} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* TAB: QUẢN LÝ SẢN PHẨM */}
            <TabsContent value="products" className="space-y-4">
              {products.map((product) => (
                <div key={product.id} className="border rounded-xl p-5 flex gap-5">
                  <img src={product.image} className="w-20 h-20 rounded-lg object-cover" alt="" />
                  <div className="flex-1">
                    <h4 className="font-bold">{product.name}</h4>
                    <p className="text-sm text-gray-500 mb-4">{product.category} • {product.price.toLocaleString()}đ</p>
                    <div className="flex flex-wrap gap-4">
                      {['hot', 'trending', 'hidden', 'banned'].map(field => (
                        <div key={field} className="flex items-center gap-2">
                          <Switch id={`${field}-${product.id}`} checked={product[field]} onCheckedChange={() => toggleProductAttribute(product.id, field)} />
                          <Label htmlFor={`${field}-${product.id}`} className="text-xs capitalize">{field}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            {/* TAB: QUẢN LÝ BÁO CÁO */}
            <TabsContent value="reports" className="space-y-4">
              {reports.map((report) => (
                <div key={report.id} className="border rounded-xl p-5 hover:border-orange-200 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900">{report.title}</span>
                        <Badge className={getReportTypeColor(report.type)}>{report.type}</Badge>
                        <Badge className={getReportStatusColor(report.status)}>{report.status}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{report.description}</p>
                      <p className="text-[10px] text-gray-400">Gửi bởi: {report.userName} • {report.createdAt}</p>
                    </div>
                    {report.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-green-600" onClick={() => updateReportStatus(report.id, 'resolved')}>Duyệt</Button>
                        <Button size="sm" variant="destructive" onClick={() => updateReportStatus(report.id, 'rejected')}>Từ chối</Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
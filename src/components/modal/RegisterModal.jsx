import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { Textarea } from '../ui/textarea';
import { Eye, EyeOff, Facebook, Mail, Store, X } from 'lucide-react';

export function RegisterModal({
  isOpen,
  onClose,
  onRegister,
  onSwitchToLogin,
  onTermsClick,
  onPolicyClick
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [userType, setUserType] = useState('buyer');

  // Shop information states (for sellers)
  const [shopName, setShopName] = useState('');
  const [shopAddress, setShopAddress] = useState('');
  const [shopDescription, setShopDescription] = useState('');
  const [shopLogo, setShopLogo] = useState('');
  const [shopCoverImage, setShopCoverImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!');
      return;
    }

    if (!agreedToTerms) {
      alert('Vui lòng đồng ý với điều khoản sử dụng!');
      return;
    }

    onRegister(name, email, phone, password, userType, {
      shopName,
      shopAddress,
      shopDescription,
      shopLogo,
      shopCoverImage
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Đăng ký tài khoản</DialogTitle>
          <DialogDescription>
            Tạo tài khoản mới để trải nghiệm dịch vụ của chúng tôi.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* User Type Selection */}
          <div className="space-y-2">
            <Label>Loại tài khoản</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setUserType('buyer')}
                className={`p-4 border-2 rounded-lg transition-all ${
                  userType === 'buyer'
                    ? 'border-[#EE4D2D] bg-[#EE4D2D]/5'
                    : 'border-border hover:border-[#EE4D2D]/50'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">🛒</div>
                  <div className="font-medium">Người mua</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Mua sắm và đặt hàng
                  </div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setUserType('seller')}
                className={`p-4 border-2 rounded-lg transition-all ${
                  userType === 'seller'
                    ? 'border-[#EE4D2D] bg-[#EE4D2D]/5'
                    : 'border-border hover:border-[#EE4D2D]/50'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">🏪</div>
                  <div className="font-medium">Người bán</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Bán hàng trên nền tảng
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="register-name">Họ và tên</Label>
            <Input
              id="register-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập họ và tên"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="register-email">Email</Label>
            <Input
              id="register-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="register-phone">Số điện thoại</Label>
            <Input
              id="register-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Nhập số điện thoại"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="register-password">Mật khẩu</Label>
            <div className="relative">
              <Input
                id="register-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="register-confirm-password">Xác nhận mật khẩu</Label>
            <div className="relative">
              <Input
                id="register-confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Nhập lại mật khẩu"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Shop Information for Sellers */}
          {userType === 'seller' && (
            <div className="border-t pt-4 mt-4 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Store className="w-5 h-5 text-[#EE4D2D]" />
                <h4 className="font-semibold">Thông tin Shop</h4>
              </div>

              <div className="space-y-2">
                <Label htmlFor="shop-name">Tên Shop</Label>
                <Input
                  id="shop-name"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  placeholder="Nhập tên shop của bạn"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shop-address">Địa chỉ Shop</Label>
                <Input
                  id="shop-address"
                  value={shopAddress}
                  onChange={(e) => setShopAddress(e.target.value)}
                  placeholder="Nhập địa chỉ shop"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shop-description">Mô tả Shop</Label>
                <Textarea
                  id="shop-description"
                  value={shopDescription}
                  onChange={(e) => setShopDescription(e.target.value)}
                  placeholder="Giới thiệu về shop của bạn..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shop-logo">Logo Shop (URL)</Label>
                <div className="flex gap-2">
                  <Input
                    id="shop-logo"
                    value={shopLogo}
                    onChange={(e) => setShopLogo(e.target.value)}
                    placeholder="https://example.com/logo.png"
                  />
                  {shopLogo && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => setShopLogo('')}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                {shopLogo && (
                  <div className="mt-2 border rounded-lg overflow-hidden w-32 h-32">
                    <img
                      src={shopLogo}
                      alt="Shop Logo Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200&h=200&fit=crop';
                      }}
                    />
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  Bạn có thể thêm logo sau trong phần hồ sơ
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="shop-cover-image">Ảnh bìa Shop (URL)</Label>
                <div className="flex gap-2">
                  <Input
                    id="shop-cover-image"
                    value={shopCoverImage}
                    onChange={(e) => setShopCoverImage(e.target.value)}
                    placeholder="https://example.com/cover.png"
                  />
                  {shopCoverImage && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => setShopCoverImage('')}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                {shopCoverImage && (
                  <div className="mt-2 border rounded-lg overflow-hidden w-32 h-32">
                    <img
                      src={shopCoverImage}
                      alt="Shop Cover Image Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200&h=200&fit=crop';
                      }}
                    />
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  Bạn có thể thêm ảnh bìa sau trong phần hồ sơ
                </p>
              </div>
            </div>
          )}

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-1 rounded"
            />
            <label htmlFor="terms" className="text-sm text-muted-foreground">
              Tôi đã đọc và đồng ý với{' '}
              <a 
                href="#" 
                className="text-[#EE4D2D] hover:underline" 
                onClick={(e) => {
                  e.preventDefault();
                  onTermsClick?.();
                }}
              >
                Điều khoản sử dụng
              </a>{' '}
              và{' '}
              <a 
                href="#" 
                className="text-[#EE4D2D] hover:underline" 
                onClick={(e) => {
                  e.preventDefault();
                  onPolicyClick?.();
                }}
              >
                Chính sách bảo mật
              </a>
            </label>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#EE4D2D] hover:bg-[#EE4D2D]/90 text-white"
          >
            Đăng ký
          </Button>

          <div className="relative my-6">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
              Hoặc
            </span>
          </div>

          <div className="space-y-2">
            <Button
              type="button"
              variant="outline"
              className="w-full"
            >
              <Facebook className="w-4 h-4 mr-2 text-blue-600" />
              Đăng ký với Facebook
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
            >
              <Mail className="w-4 h-4 mr-2 text-red-600" />
              Đăng ký với Google
            </Button>
          </div>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Đã có tài khoản? </span>
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-[#EE4D2D] hover:underline"
            >
              Đăng nhập ngay
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Eye, EyeOff, Facebook, Mail } from 'lucide-react';

/**
 * RegisterModal Component
 * Cung cấp giao diện đăng ký tài khoản cho cả Người mua và Người bán.
 */
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

    // Trả về dữ liệu đăng ký cho hàm xử lý ở App.jsx
    onRegister(name, email, phone, password, userType);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-0 border-none shadow-2xl">
        {/* Header Section */}
        <div className="p-6 pb-0">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">Đăng ký tài khoản</DialogTitle>
            <DialogDescription className="text-sm">
              Tạo tài khoản mới để bắt đầu trải nghiệm dịch vụ tại FoodieShop.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Lựa chọn loại tài khoản */}
          <div className="space-y-3">
            <Label className="text-sm font-bold text-gray-700">Bạn muốn đăng ký với vai trò?</Label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setUserType('buyer')}
                className={`p-4 border-2 rounded-xl transition-all duration-200 text-left group ${
                  userType === 'buyer'
                    ? 'border-[#EE4D2D] bg-orange-50 shadow-inner'
                    : 'border-gray-100 hover:border-orange-200'
                }`}
              >
                <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">🛒</div>
                <div className={`font-bold ${userType === 'buyer' ? 'text-[#EE4D2D]' : 'text-gray-700'}`}>Người mua</div>
                <div className="text-[10px] text-gray-400 mt-1 uppercase font-semibold">Mua sắm & Đặt món</div>
              </button>
              
              <button
                type="button"
                onClick={() => setUserType('seller')}
                className={`p-4 border-2 rounded-xl transition-all duration-200 text-left group ${
                  userType === 'seller'
                    ? 'border-[#EE4D2D] bg-orange-50 shadow-inner'
                    : 'border-gray-100 hover:border-orange-200'
                }`}
              >
                <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">🏪</div>
                <div className={`font-bold ${userType === 'seller' ? 'text-[#EE4D2D]' : 'text-gray-700'}`}>Người bán</div>
                <div className="text-[10px] text-gray-400 mt-1 uppercase font-semibold">Mở shop & Kinh doanh</div>
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="register-name" className="text-xs font-bold text-gray-500 uppercase">Họ và tên</Label>
              <Input
                id="register-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nguyễn Văn A"
                required
                className="rounded-lg"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="register-phone" className="text-xs font-bold text-gray-500 uppercase">Số điện thoại</Label>
              <Input
                id="register-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="09xx xxx xxx"
                required
                className="rounded-lg"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="register-email" className="text-xs font-bold text-gray-500 uppercase">Email</Label>
            <Input
              id="register-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              required
              className="rounded-lg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="register-password" className="text-xs font-bold text-gray-500 uppercase">Mật khẩu</Label>
              <div className="relative">
                <Input
                  id="register-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="rounded-lg pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="register-confirm-password" className="text-xs font-bold text-gray-500 uppercase">Xác nhận</Label>
              <div className="relative">
                <Input
                  id="register-confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="rounded-lg pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-1 w-4 h-4 accent-[#EE4D2D]"
            />
            <label htmlFor="terms" className="text-xs text-gray-500 leading-relaxed">
              Tôi xác nhận đã đọc và hoàn toàn đồng ý với{' '}
              <button 
                type="button"
                className="text-[#EE4D2D] font-bold hover:underline" 
                onClick={(e) => { e.preventDefault(); onTermsClick?.(); }}
              >
                Điều khoản sử dụng
              </button>{' '}
              và{' '}
              <button 
                type="button"
                className="text-[#EE4D2D] font-bold hover:underline" 
                onClick={(e) => { e.preventDefault(); onPolicyClick?.(); }}
              >
                Chính sách bảo mật
              </button> của FoodieShop.
            </label>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#EE4D2D] hover:bg-[#d73a1e] text-white font-black h-12 rounded-xl shadow-lg shadow-orange-100 transition-all active:scale-95"
          >
            Đăng ký thành viên ngay
          </Button>

          <div className="relative my-6">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Hoặc kết nối qua
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button type="button" variant="outline" className="rounded-xl border-gray-200 hover:bg-blue-50 font-bold text-xs h-11">
              <Facebook className="w-4 h-4 mr-2 text-blue-600 fill-current" /> Facebook
            </Button>
            <Button type="button" variant="outline" className="rounded-xl border-gray-200 hover:bg-red-50 font-bold text-xs h-11">
              <Mail className="w-4 h-4 mr-2 text-red-600" /> Google
            </Button>
          </div>

          <div className="text-center text-sm pt-4 border-t border-dashed">
            <span className="text-gray-400 font-medium">Đã là thành viên? </span>
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-[#EE4D2D] font-black hover:underline"
            >
              Đăng nhập ngay
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { Eye, EyeOff, Facebook, Mail } from 'lucide-react';

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

    // Truyền dữ liệu đăng ký về hàm cha
    onRegister(name, email, phone, password, userType);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#EE4D2D]">Đăng ký tài khoản</DialogTitle>
          <DialogDescription>
            Tạo tài khoản mới để bắt đầu khám phá thiên đường đồ ăn cùng FoodieShop.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          {/* Lựa chọn loại tài khoản */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Bạn muốn tham gia với vai trò?</Label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setUserType('buyer')}
                className={`p-4 border-2 rounded-xl transition-all flex flex-col items-center gap-2 ${
                  userType === 'buyer'
                    ? 'border-[#EE4D2D] bg-[#EE4D2D]/5 ring-1 ring-[#EE4D2D]'
                    : 'border-border hover:border-[#EE4D2D]/30 bg-white'
                }`}
              >
                <span className="text-3xl">🛒</span>
                <div className="font-bold text-sm">Người mua</div>
                <div className="text-[10px] text-muted-foreground text-center">
                  Đặt món và nhận ưu đãi hấp dẫn
                </div>
              </button>
              
              <button
                type="button"
                onClick={() => setUserType('seller')}
                className={`p-4 border-2 rounded-xl transition-all flex flex-col items-center gap-2 ${
                  userType === 'seller'
                    ? 'border-[#EE4D2D] bg-[#EE4D2D]/5 ring-1 ring-[#EE4D2D]'
                    : 'border-border hover:border-[#EE4D2D]/30 bg-white'
                }`}
              >
                <span className="text-3xl">🏪</span>
                <div className="font-bold text-sm">Người bán</div>
                <div className="text-[10px] text-muted-foreground text-center">
                  Mở quán và tăng trưởng doanh thu
                </div>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="register-name">Họ và tên</Label>
              <Input
                id="register-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ví dụ: Nguyễn Văn A"
                required
                className="h-11"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-phone">Số điện thoại</Label>
                <Input
                  id="register-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="09xx xxx xxx"
                  required
                  className="h-11"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="register-password">Mật khẩu</Label>
              <div className="relative">
                <Input
                  id="register-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Tối thiểu 6 ký tự"
                  required
                  minLength={6}
                  className="h-11 pr-10"
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
                  placeholder="Nhập lại mật khẩu phía trên"
                  required
                  className="h-11 pr-10"
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
          </div>

          <div className="flex items-start gap-2 py-2">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-1 rounded border-gray-300 text-[#EE4D2D] focus:ring-[#EE4D2D]"
            />
            <label htmlFor="terms" className="text-xs text-muted-foreground leading-relaxed">
              Tôi đã đọc và đồng ý với{' '}
              <button 
                type="button"
                className="text-[#EE4D2D] font-semibold hover:underline" 
                onClick={onTermsClick}
              >
                Điều khoản dịch vụ
              </button>{' '}
              và{' '}
              <button 
                type="button"
                className="text-[#EE4D2D] font-semibold hover:underline" 
                onClick={onPolicyClick}
              >
                Chính sách bảo mật
              </button>
            </label>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-[#EE4D2D] hover:bg-[#EE4D2D]/90 text-white font-bold text-lg shadow-lg shadow-red-100"
          >
            Đăng ký ngay
          </Button>

          <div className="relative my-8">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
              Hoặc đăng ký bằng
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button type="button" variant="outline" className="h-11 border-gray-200">
              <Facebook className="w-4 h-4 mr-2 text-[#1877F2] fill-current" />
              <span className="text-xs">Facebook</span>
            </Button>
            <Button type="button" variant="outline" className="h-11 border-gray-200">
              <Mail className="w-4 h-4 mr-2 text-[#DB4437]" />
              <span className="text-xs">Google</span>
            </Button>
          </div>

          <div className="text-center text-sm pt-4 border-t border-dashed">
            <span className="text-muted-foreground">Bạn đã có tài khoản? </span>
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-[#EE4D2D] font-bold hover:underline"
            >
              Đăng nhập
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Eye, EyeOff, Facebook, Mail } from 'lucide-react';

/**
 * RegisterModal Component
 * @param {Object} props
 * @param {boolean} props.isOpen - Trạng thái đóng/mở modal
 * @param {Function} props.onClose - Hàm xử lý khi đóng modal
 * @param {Function} props.onRegister - Hàm xử lý đăng ký (name, email, phone, password)
 * @param {Function} props.onSwitchToLogin - Hàm chuyển sang modal đăng nhập
 */
export function RegisterModal({
  isOpen,
  onClose,
  onRegister,
  onSwitchToLogin
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

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

    onRegister(name, email, phone, password);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">Đăng ký tài khoản</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          {/* Họ và tên */}
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

          {/* Email */}
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

          {/* Số điện thoại */}
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

          {/* Mật khẩu */}
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
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          {/* Xác nhận mật khẩu */}
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
                {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          {/* Đồng ý điều khoản */}
          <div className="flex items-start gap-2 py-2">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-gray-300 accent-[#EE4D2D]"
            />
            <label htmlFor="terms" className="text-sm text-muted-foreground">
              Tôi đã đọc và đồng ý với{' '}
              <a href="#" className="text-[#EE4D2D] hover:underline">
                Điều khoản sử dụng
              </a>{' '}
              và{' '}
              <a href="#" className="text-[#EE4D2D] hover:underline">
                Chính sách bảo mật
              </a>
            </label>
          </div>

          {/* Nút Đăng ký */}
          <Button
            type="submit"
            className="w-full bg-[#EE4D2D] hover:bg-[#EE4D2D]/90 text-white font-medium py-6"
          >
            Đăng ký
          </Button>

          <div className="relative my-6">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground uppercase">
              Hoặc
            </span>
          </div>

          {/* Đăng ký qua MXH */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant="outline"
              className="w-full"
            >
              <Facebook className="w-4 h-4 mr-2 text-[#1877F2] fill-current" />
              Facebook
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
            >
              <Mail className="w-4 h-4 mr-2 text-[#DB4437]" />
              Google
            </Button>
          </div>

          {/* Chuyển sang Đăng nhập */}
          <div className="text-center text-sm pt-4">
            <span className="text-muted-foreground">Đã có tài khoản? </span>
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-[#EE4D2D] font-medium hover:underline"
            >
              Đăng nhập ngay
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
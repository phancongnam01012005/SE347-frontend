"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Eye, EyeOff, Facebook, Mail } from 'lucide-react';

/**
 * LoginModal Component
 * @param {Object} props
 * @param {boolean} props.isOpen - Trạng thái hiển thị modal
 * @param {Function} props.onClose - Hàm đóng modal
 * @param {Function} props.onLogin - Hàm xử lý đăng nhập (email, password)
 * @param {Function} props.onSwitchToRegister - Hàm chuyển sang modal đăng ký
 */
export function LoginModal({
  isOpen,
  onClose,
  onLogin,
  onSwitchToRegister
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gọi hàm đăng nhập từ props
    onLogin(email, password);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">Đăng nhập</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {/* Tài khoản */}
          <div className="space-y-2">
            <Label htmlFor="login-email">Email hoặc số điện thoại</Label>
            <Input
              id="login-email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email hoặc số điện thoại"
              required
            />
          </div>

          {/* Mật khẩu */}
          <div className="space-y-2">
            <Label htmlFor="login-password">Mật khẩu</Label>
            <div className="relative">
              <Input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
                required
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

          {/* Tiện ích bổ sung */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                className="rounded border-gray-300 accent-[#EE4D2D]" 
              />
              <span className="text-muted-foreground">Ghi nhớ đăng nhập</span>
            </label>
            <button 
              type="button" 
              className="text-[#EE4D2D] hover:underline font-medium"
            >
              Quên mật khẩu?
            </button>
          </div>

          {/* Nút Đăng nhập */}
          <Button
            type="submit"
            className="w-full bg-[#EE4D2D] hover:bg-[#EE4D2D]/90 text-white font-medium py-6"
          >
            Đăng nhập
          </Button>

          {/* Đường kẻ phân cách */}
          <div className="relative my-6">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground uppercase">
              Hoặc
            </span>
          </div>

          {/* Đăng nhập bằng MXH */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center justify-center"
            >
              <Facebook className="w-4 h-4 mr-2 text-[#1877F2] fill-current" />
              <span className="hidden sm:inline">Facebook</span>
              <span className="sm:hidden text-xs">FB</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center justify-center"
            >
              <Mail className="w-4 h-4 mr-2 text-[#DB4437]" />
              <span className="hidden sm:inline">Google</span>
              <span className="sm:hidden text-xs">Google</span>
            </Button>
          </div>

          {/* Chuyển hướng sang Đăng ký */}
          <div className="text-center text-sm pt-4">
            <span className="text-muted-foreground">Chưa có tài khoản? </span>
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-[#EE4D2D] font-medium hover:underline"
            >
              Đăng ký ngay
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
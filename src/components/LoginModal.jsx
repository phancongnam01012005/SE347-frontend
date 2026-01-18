import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Eye, EyeOff, Facebook, Mail } from "lucide-react";

/**
 * LoginModal Component
 * Cung cấp giao diện đăng nhập cho người dùng.
 */
export function LoginModal({
  isOpen,
  onClose,
  onLogin,
  onSwitchToRegister,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Đăng nhập</DialogTitle>
          <DialogDescription>
            Nhập thông tin tài khoản của bạn để đăng nhập.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Trường Email/SĐT */}
          <div className="space-y-2">
            <Label htmlFor="login-email">
              Email hoặc số điện thoại
            </Label>
            <Input
              id="login-email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email hoặc số điện thoại"
              required
            />
          </div>

          {/* Trường Mật khẩu */}
          <div className="space-y-2">
            <Label htmlFor="login-password">Mật khẩu</Label>
            <div className="relative">
              <Input
                id="login-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Ghi nhớ & Quên mật khẩu */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded accent-[#EE4D2D]" />
              <span>Ghi nhớ đăng nhập</span>
            </label>
            <button
              type="button"
              className="text-[#EE4D2D] hover:underline font-medium"
            >
              Quên mật khẩu?
            </button>
          </div>

          {/* Nút Đăng nhập chính */}
          <Button
            type="submit"
            className="w-full bg-[#EE4D2D] hover:bg-[#d73a1e] text-white font-bold"
          >
            Đăng nhập
          </Button>

          {/* Phân cách */}
          <div className="relative my-6">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-muted-foreground uppercase">
              Hoặc
            </span>
          </div>

          {/* Đăng nhập MXH */}
          <div className="space-y-2">
            <Button
              type="button"
              variant="outline"
              className="w-full hover:bg-blue-50 transition-colors"
            >
              <Facebook className="w-4 h-4 mr-2 text-blue-600 fill-blue-600" />
              Đăng nhập với Facebook
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full hover:bg-red-50 transition-colors"
            >
              <Mail className="w-4 h-4 mr-2 text-red-600" />
              Đăng nhập với Google
            </Button>
          </div>

          {/* Chuyển sang Đăng ký */}
          <div className="text-center text-sm pt-2">
            <span className="text-muted-foreground">
              Chưa có tài khoản?{" "}
            </span>
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-[#EE4D2D] hover:underline font-bold"
            >
              Đăng ký ngay
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Eye, EyeOff, Facebook, Mail } from "lucide-react";

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

  const handleGoogleLogin = () => {
    // Chuyển hướng sang Backend để bắt đầu quy trình OAuth2
    window.location.href = "http://localhost:8000/oauth2/authorization/google";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md md:max-w-2xl rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center md:text-left">Đăng nhập</DialogTitle>
          <DialogDescription className="text-center md:text-left">
            Chào mừng bạn quay lại! Nhập thông tin tài khoản để tiếp tục khám phá món ngon.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="space-y-2">
            <Label htmlFor="login-email" className="font-semibold">
              Email hoặc số điện thoại
            </Label>
            <Input
              id="login-email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email hoặc số điện thoại"
              required
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="login-password">Mật khẩu</Label>
            </div>
            <div className="relative">
              <Input
                id="login-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu của bạn"
                required
                className="h-11 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input 
                type="checkbox" 
                className="rounded border-gray-300 text-[#EE4D2D] focus:ring-[#EE4D2D]" 
              />
              <span className="text-muted-foreground">Ghi nhớ đăng nhập</span>
            </label>
            <button
              type="button"
              className="text-[#EE4D2D] font-medium hover:underline"
            >
              Quên mật khẩu?
            </button>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-[#EE4D2D] hover:bg-[#EE4D2D]/90 text-white font-bold text-lg shadow-lg shadow-red-100"
          >
            Đăng nhập
          </Button>

          <div className="relative my-8">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Hoặc
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              className="h-11 border-gray-200 hover:bg-blue-50 hover:border-blue-200"
            >
              <Facebook className="w-4 h-4 mr-2 text-[#1877F2] fill-current" />
              <span className="text-xs md:text-sm">Facebook</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-11 border-gray-200"
              onClick={handleGoogleLogin}
            >
              <Mail className="w-4 h-4 mr-2 text-[#DB4437]" />
              <span>Google</span>
            </Button>
          </div>

          <div className="text-center text-sm pt-4 border-t border-dashed">
            <span className="text-muted-foreground">
              Bạn là thành viên mới?{" "}
            </span>
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-[#EE4D2D] font-bold hover:underline"
            >
              Đăng ký ngay
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
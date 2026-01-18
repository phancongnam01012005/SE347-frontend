import React, { useState, useEffect } from 'react';
import { X, Star, Plus, Minus, ShoppingCart, Store, Tag, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';

/**
 * ProductDetailPage Component
 * Hiển thị chi tiết thông tin sản phẩm, khuyến mãi và đánh giá từ khách hàng.
 */
export function ProductDetailPage({
  isOpen,
  onClose,
  product,
  onAddToCart,
  onShopClick,
  isFavorite = false,
  onToggleFavorite,
  showFavoriteButton = true,
  isLoggedIn = false
}) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [rating, setRating] = useState(5);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
      setQuantity(1);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  // Dữ liệu đánh giá mẫu
  const mockReviews = product.productReviews || [
    {
      id: '1',
      userName: 'Nguyễn Văn A',
      userAvatar: 'https://images.unsplash.com/photo-1666113604293-d34734339acb?w=100&h=100&fit=crop',
      rating: 5,
      date: '15/01/2026',
      comment: 'Sản phẩm rất tuyệt vời! Đóng gói cẩn thận, giao hàng nhanh. Sẽ mua lại lần sau.',
      images: ['https://images.unsplash.com/photo-1668243074547-28f9d7d30b31?w=400&fit=crop']
    },
    {
      id: '2',
      userName: 'Trần Thị B',
      rating: 4,
      date: '14/01/2026',
      comment: 'Chất lượng tốt, giá cả hợp lý. Có điều ship hơi lâu một chút.'
    }
  ];

  // Dữ liệu khuyến mãi mẫu
  const mockPromotions = product.productPromotions || [
    {
      id: '1',
      title: 'Giảm 20% cho đơn hàng từ 200k',
      description: 'Áp dụng cho sản phẩm này khi mua từ 200.000đ',
      validUntil: '31/01/2026',
      code: 'FOOD20'
    },
    {
      id: '2',
      title: 'Freeship đơn từ 100k',
      description: 'Miễn phí vận chuyển cho đơn hàng từ 100.000đ',
      validUntil: '28/01/2026'
    }
  ];

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
  };

  const calculateRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    mockReviews.forEach(review => {
      if (distribution[review.rating] !== undefined) {
        distribution[review.rating]++;
      }
    });
    return distribution;
  };

  const ratingDistribution = calculateRatingDistribution();
  const totalReviews = mockReviews.length;

  const handleCommentSubmit = () => {
    if (!isLoggedIn) {
      toast.error('Bạn cần đăng nhập để đánh giá sản phẩm.');
      return;
    }
    if (commentText.trim() === '') {
      toast.error('Vui lòng nhập nội dung đánh giá.');
      return;
    }
    
    toast.success('Đánh giá của bạn đã được gửi và đang chờ duyệt.');
    setCommentText('');
    setShowCommentForm(false);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-300">
      <div className="min-h-screen py-8 px-4 flex items-center justify-center">
        <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden border">
          
          {/* Sticky Header */}
          <div className="sticky top-0 z-20 flex items-center justify-between p-5 border-b bg-white/80 backdrop-blur-md">
            <h2 className="text-xl font-bold text-gray-800">Chi tiết sản phẩm</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-all active:scale-90"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <div className="p-8 space-y-10">
            {/* Phần thông tin chính: Ảnh và Thông số */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Cột trái: Hình ảnh */}
              <div className="space-y-4">
                <div className="aspect-square rounded-2xl overflow-hidden border-2 border-gray-50 shadow-inner">
                  <ImageWithFallback
                    src={selectedImage}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  <div
                    onClick={() => setSelectedImage(product.image)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 cursor-pointer transition-all flex-shrink-0 ${
                      selectedImage === product.image ? 'border-[#EE4D2D] scale-95 shadow-md' : 'border-gray-100 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <ImageWithFallback src={product.image} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              {/* Cột phải: Thông tin & Đặt hàng */}
              <div className="space-y-6">
                <div>
                  {product.tag && (
                    <Badge className="mb-3 bg-orange-100 text-[#EE4D2D] border-none hover:bg-orange-100 font-bold px-3 py-1">
                      {product.tag}
                    </Badge>
                  )}
                  <h1 className="text-3xl font-black text-gray-900 leading-tight mb-3">{product.name}</h1>
                  
                  <div className="flex items-center gap-4 text-sm font-bold">
                    <div className="flex items-center gap-1 text-[#EE4D2D]">
                      <Star className="w-5 h-5 fill-current" />
                      <span className="text-lg">{product.rating}</span>
                    </div>
                    <div className="h-4 w-px bg-gray-200" />
                    <span className="text-gray-500 underline decoration-gray-300">{totalReviews} đánh giá</span>
                    <div className="h-4 w-px bg-gray-200" />
                    <span className="text-gray-500">Đã bán {product.reviews}</span>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-black text-[#EE4D2D]">
                      {product.price.toLocaleString('vi-VN')}đ
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-400 line-through font-medium">
                        {product.originalPrice.toLocaleString('vi-VN')}đ
                      </span>
                    )}
                  </div>
                </div>

                {/* Thông tin Shop */}
                <div className="border rounded-2xl p-5 hover:bg-gray-50 transition-colors cursor-pointer group" onClick={() => onShopClick?.(product.shopId)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                        <Store className="w-7 h-7 text-[#EE4D2D]" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 group-hover:text-[#EE4D2D] transition-colors">
                          {product.shopName || 'Cửa hàng Foodie'}
                        </h3>
                        <p className="text-xs text-green-600 font-bold flex items-center gap-1">
                          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Đang hoạt động
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-full font-bold border-[#EE4D2D] text-[#EE4D2D] hover:bg-[#EE4D2D] hover:text-white">
                      Xem Shop
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Mô tả món ăn</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{product.description}</p>
                </div>

                {/* Chọn số lượng */}
                <div className="flex items-center justify-between py-4 border-t border-b border-dashed">
                  <span className="font-bold text-gray-700 text-sm">Chọn số lượng</span>
                  <div className="flex items-center gap-4 bg-gray-100 p-1.5 rounded-full">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 rounded-full bg-white shadow-sm hover:text-[#EE4D2D]"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-8 text-center font-black text-lg">{quantity}</span>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 rounded-full bg-white shadow-sm hover:text-[#EE4D2D]"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Nút hành động */}
                <div className="flex gap-4 pt-2">
                  <Button
                    size="lg"
                    className="flex-1 bg-[#EE4D2D] hover:bg-[#d73a1e] text-white font-black h-14 rounded-2xl shadow-lg shadow-orange-100 transition-all hover:scale-[1.02] active:scale-95"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="w-6 h-6 mr-3" />
                    Thêm vào giỏ - {(product.price * quantity).toLocaleString('vi-VN')}đ
                  </Button>
                  {showFavoriteButton && (
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-14 h-14 rounded-2xl border-gray-200 hover:border-red-200 transition-colors"
                      onClick={() => onToggleFavorite?.(product.id)}
                    >
                      <Heart className={`w-6 h-6 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Khuyến mãi */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Tag className="w-6 h-6 text-[#EE4D2D]" /> Mã giảm giá đặc biệt
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockPromotions.map((promo) => (
                  <div key={promo.id} className="relative group overflow-hidden border border-[#EE4D2D]/20 bg-orange-50/30 p-4 rounded-2xl">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-gray-900 mb-1">{promo.title}</p>
                        <p className="text-xs text-gray-500">{promo.description}</p>
                        <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-tighter">HSD: {promo.validUntil}</p>
                      </div>
                      {promo.code && (
                        <Badge className="bg-white text-[#EE4D2D] border-[#EE4D2D] font-mono px-3">
                          {promo.code}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Đánh giá khách hàng */}
            <div className="space-y-8 pt-8 border-t">
              <h3 className="text-xl font-bold text-gray-900">Khách hàng nói gì?</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center bg-gray-50/50 p-8 rounded-3xl border">
                <div className="text-center space-y-2">
                  <div className="text-6xl font-black text-gray-900">{product.rating}</div>
                  <div className="flex justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-6 h-6 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
                    ))}
                  </div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{totalReviews} Đánh giá</p>
                </div>

                <div className="md:col-span-2 space-y-3">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-4 group">
                      <div className="flex items-center gap-1 w-12 shrink-0">
                        <span className="text-sm font-bold text-gray-600">{star}</span>
                        <Star className="w-3 h-3 fill-gray-400 text-gray-400" />
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-2.5 overflow-hidden shadow-inner">
                        <div
                          className="bg-yellow-400 h-full transition-all duration-1000 group-hover:brightness-105"
                          style={{ width: `${totalReviews > 0 ? (ratingDistribution[star] / totalReviews) * 100 : 0}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-gray-400 w-8">{ratingDistribution[star]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Danh sách bình luận */}
              <div className="space-y-8">
                {mockReviews.map((review) => (
                  <div key={review.id} className="flex gap-5 pb-8 border-b border-dashed last:border-0 transition-opacity hover:opacity-90">
                    <div className="w-12 h-12 rounded-2xl bg-gray-100 overflow-hidden shrink-0 border-2 border-white shadow-sm">
                      {review.userAvatar && <img src={review.userAvatar} alt={review.userName} className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-900">{review.userName}</span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase">{review.date}</span>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed italic">"{review.comment}"</p>
                      {review.images && review.images.length > 0 && (
                        <div className="flex gap-2 pt-2">
                          {review.images.map((img, idx) => (
                            <img key={idx} src={img} alt="review" className="w-20 h-20 rounded-xl object-cover border-2 border-gray-50" />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Nút đánh giá */}
              {isLoggedIn && (
                <div className="pt-4">
                  <Button
                    variant="outline"
                    className="rounded-full font-bold border-gray-200 hover:text-[#EE4D2D] hover:border-[#EE4D2D]"
                    onClick={() => setShowCommentForm(!showCommentForm)}
                  >
                    {showCommentForm ? 'Hủy bỏ' : 'Viết đánh giá của bạn'}
                  </Button>
                  
                  {showCommentForm && (
                    <div className="mt-6 space-y-4 animate-in slide-in-from-top-4 duration-300">
                      <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-2xl border border-orange-100">
                        <span className="text-sm font-bold text-gray-700">Mức độ hài lòng:</span>
                        <div className="flex gap-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-8 h-8 cursor-pointer transition-all hover:scale-110 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                              onClick={() => setRating(i + 1)}
                            />
                          ))}
                        </div>
                      </div>
                      <Textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Hãy chia sẻ trải nghiệm của bạn về món ăn này nhé..."
                        className="rounded-2xl border-gray-200 focus:ring-[#EE4D2D] min-h-[120px]"
                      />
                      <Button
                        className="bg-[#EE4D2D] hover:bg-[#d73a1e] font-black px-10 h-12 rounded-xl shadow-lg shadow-orange-100"
                        onClick={handleCommentSubmit}
                      >
                        Gửi đánh giá ngay
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
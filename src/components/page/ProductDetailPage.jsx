import { useState, useEffect } from 'react';
import { X, ShoppingCart, Heart, Star, Store, Tag, Plus, Minus } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner';

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

  // Mock reviews data
  const mockReviews = product.productReviews || [
    {
      id: '1',
      userName: 'Nguyễn Văn A',
      userAvatar: 'https://images.unsplash.com/photo-1666113604293-d34734339acb?w=100&h=100&fit=crop',
      rating: 5,
      date: '15/01/2026',
      comment: 'Sản phẩm rất tuyệt vời! Đóng gói cẩn thận, giao hàng nhanh. Sẽ mua lại lần sau.',
      images: ['https://images.unsplash.com/photo-1668243074547-28f9d7d30b31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwcGhvdG8lMjByZXZpZXd8ZW58MXx8fHwxNzY4NzI4NTg0fDA&ixlib=rb-4.1.0&q=80&w=1080']
    },
    {
      id: '2',
      userName: 'Trần Thị B',
      rating: 4,
      date: '14/01/2026',
      comment: 'Chất lượng tốt, giá cả hợp lý. Có điều ship hơi lâu một chút.'
    },
    {
      id: '3',
      userName: 'Lê Văn C',
      rating: 5,
      date: '13/01/2026',
      comment: 'Ngon tuyệt vời, đúng như mô tả. Cửa hàng phục vụ nhiệt tình!'
    }
  ];

  // Mock promotions data
  const mockPromotions = product.productPromotions || [
    {
      id: '1',
      title: 'Giảm 20% cho đơn hàng từ 200k',
      description: 'Áp dụng cho sản phẩm này khi mua từ 200.000đ',
      discount: 20,
      discountType: 'percentage',
      minPurchase: 200000,
      validUntil: '31/01/2026',
      code: 'FOOD20'
    },
    {
      id: '2',
      title: 'Freeship đơn từ 100k',
      description: 'Miễn phí vận chuyển cho đơn hàng từ 100.000đ',
      discount: 0,
      discountType: 'fixed',
      minPurchase: 100000,
      validUntil: '28/01/2026'
    }
  ];

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
  };

  const calculateRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    mockReviews.forEach(review => {
      distribution[review.rating]++;
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
    const newReview = {
      id: (totalReviews + 1).toString(),
      userName: 'Người dùng mới',
      userAvatar: 'https://images.unsplash.com/photo-1666113604293-d34734339acb?w=100&h=100&fit=crop',
      rating: rating,
      date: new Date().toLocaleDateString('vi-VN'),
      comment: commentText,
      images: []
    };
    mockReviews.push(newReview);
    setCommentText('');
    setShowCommentForm(false);
    toast.success('Đánh giá của bạn đã được gửi.');
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/50 overflow-hidden">
      <div className="h-full overflow-y-auto">
        <div className="max-w-6xl mx-auto bg-white min-h-full">
          {/* Product Main Info */}
          <div className="p-6 pt-8 space-y-6">
            {/* Close button at top right */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors bg-white shadow-md z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Images */}
              <div className="space-y-4">
                <div className="aspect-square rounded-xl overflow-hidden border">
                  <ImageWithFallback
                    src={selectedImage}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <div
                    onClick={() => setSelectedImage(product.image)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 cursor-pointer ${selectedImage === product.image ? 'border-[#EE4D2D]' : 'border-gray-200'
                      }`}
                  >
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-4">
                <div>
                  {product.tag && (
                    <Badge className="mb-2">{product.tag}</Badge>
                  )}
                  <h1 className="text-2xl mb-2">{product.name}</h1>

                  {/* Rating */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-lg">{product.rating}</span>
                    </div>
                    <div className="h-4 w-px bg-gray-300" />
                    <span className="text-sm text-muted-foreground">
                      {totalReviews} đánh giá
                    </span>
                    <div className="h-4 w-px bg-gray-300" />
                    <span className="text-sm text-muted-foreground">
                      Đã bán {product.reviews}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl text-[#EE4D2D]">
                        {product.price.toLocaleString('vi-VN')}đ
                      </span>
                      {product.originalPrice && (
                        <>
                          <span className="text-lg text-muted-foreground line-through">
                            {product.originalPrice.toLocaleString('vi-VN')}đ
                          </span>
                          {product.discount && (
                            <Badge className="bg-[#EE4D2D]">-{product.discount}%</Badge>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Shop Info */}
                {product.shopId && (
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <Store className="w-6 h-6 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="text-sm">{product.shopName || 'Tên cửa hàng'}</h3>
                          <p className="text-xs text-muted-foreground">Online 2 giờ trước</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onShopClick?.(product.shopId)}
                      >
                        Xem shop
                      </Button>
                    </div>
                  </div>
                )}

                {/* Description */}
                <div>
                  <h3 className="text-sm mb-2">Mô tả sản phẩm</h3>
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                </div>

                {/* Quantity Selector */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Số lượng</span>
                    <div className="flex items-center gap-3">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-12 text-center">{quantity}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  {showFavoriteButton && onToggleFavorite && (
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => onToggleFavorite(product.id)}
                      className="flex-shrink-0"
                    >
                      <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                  )}
                  <Button
                    size="lg"
                    className="flex-1 bg-[#EE4D2D] hover:bg-[#EE4D2D]/90"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Thêm vào giỏ hàng
                  </Button>
                </div>
              </div>
            </div>

            {/* Promotions */}
            {mockPromotions.length > 0 && (
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-5 h-5 text-[#EE4D2D]" />
                  <h3 className="text-sm">Khuyến mãi</h3>
                </div>
                <div className="space-y-2">
                  {mockPromotions.map((promo) => (
                    <div key={promo.id} className="bg-orange-50 p-3 rounded-lg">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <p className="text-sm mb-1">{promo.title}</p>
                          <p className="text-xs text-muted-foreground">{promo.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            HSD: {promo.validUntil}
                          </p>
                        </div>
                        {promo.code && (
                          <Badge variant="outline" className="flex-shrink-0">
                            {promo.code}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Header for Details */}
          <div className="sticky top-0 z-20 bg-white border-b shadow-sm">
            <div className="p-4">
              <h3>Chi tiết sản phẩm</h3>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="p-6">
            {/* Reviews */}
            <div className="border rounded-lg p-6">
              <h3 className="mb-4">Đánh giá sản phẩm</h3>

              {/* Rating Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 pb-6 border-b">
                <div className="flex flex-col items-center justify-center bg-orange-50 rounded-lg p-6">
                  <div className="text-4xl mb-2">{product.rating}</div>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(product.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                          }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">{totalReviews} đánh giá</p>
                </div>

                <div className="md:col-span-2 space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-3">
                      <div className="flex items-center gap-1 w-16">
                        <span className="text-sm">{star}</span>
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-yellow-400 h-full"
                          style={{
                            width: `${totalReviews > 0 ? (ratingDistribution[star] / totalReviews) * 100 : 0}%`
                          }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-12 text-right">
                        {ratingDistribution[star]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Review List */}
              <div className="space-y-4">
                {mockReviews.map((review) => (
                  <div key={review.id} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                        {review.userAvatar && (
                          <img
                            src={review.userAvatar}
                            alt={review.userName}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm">{review.userName}</span>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${i < review.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                  }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{review.date}</p>
                        <p className="text-sm mb-2">{review.comment}</p>
                        {review.images && review.images.length > 0 && (
                          <div className="flex gap-2">
                            {review.images.map((img, idx) => (
                              <div
                                key={idx}
                                className="w-20 h-20 rounded-lg overflow-hidden border"
                              >
                                <img
                                  src={img}
                                  alt={`Review ${idx + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comment Form */}
              {isLoggedIn && (
                <div className="mt-6">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowCommentForm(!showCommentForm)}
                  >
                    {showCommentForm ? 'Hủy' : 'Đánh giá sản phẩm'}
                  </Button>
                  {showCommentForm && (
                    <div className="mt-4">
                      <div className="flex items-center gap-3">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 cursor-pointer ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                }`}
                              onClick={() => setRating(i + 1)}
                            />
                          ))}
                        </div>
                      </div>
                      <Textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Nhập đánh giá của bạn..."
                        className="mt-2"
                      />
                      <Button
                        size="sm"
                        className="mt-2 bg-[#EE4D2D] hover:bg-[#EE4D2D]/90"
                        onClick={handleCommentSubmit}
                      >
                        Gửi đánh giá
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
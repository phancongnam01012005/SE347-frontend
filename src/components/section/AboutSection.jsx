export function AboutSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="mb-4">Về FoodieShop</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Nền tảng đặt đồ ăn trực tuyến hàng đầu, mang đến cho bạn những món ăn ngon từ hàng nghìn nhà hàng và quán ăn uy tín.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-[#EE4D2D]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🚀</span>
          </div>
          <h3 className="mb-2">Giao hàng nhanh</h3>
          <p className="text-sm text-muted-foreground">
            Đảm bảo giao hàng trong 30 phút hoặc hoàn tiền
          </p>
        </div>
        
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-[#EE4D2D]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⭐</span>
          </div>
          <h3 className="mb-2">Chất lượng đảm bảo</h3>
          <p className="text-sm text-muted-foreground">
            Tất cả đối tác đều được kiểm duyệt nghiêm ngặt
          </p>
        </div>
        
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-[#EE4D2D]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">💰</span>
          </div>
          <h3 className="mb-2">Giá tốt nhất</h3>
          <p className="text-sm text-muted-foreground">
            Nhiều ưu đãi và khuyến mãi hấp dẫn mỗi ngày
          </p>
        </div>
      </div>
    </section>
  );
}
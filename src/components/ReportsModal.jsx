import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { AlertTriangle, Plus, Eye, Trash2, MessageSquare, ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

/**
 * ReportsModal Component
 * Quản lý các báo cáo vi phạm, khiếu nại sản phẩm hoặc lỗi hệ thống từ người dùng.
 */
export function ReportsModal({ isOpen, onClose }) {
  // Dữ liệu mẫu (Mock Data)
  const [reports, setReports] = useState([
    {
      id: '1',
      type: 'product',
      subject: 'Sản phẩm không đúng mô tả',
      description: 'Sản phẩm tôi nhận được không giống như hình ảnh trên trang web.',
      status: 'resolved',
      createdAt: '15/01/2026 14:30',
      response: 'Cảm ơn bạn đã phản ánh. Chúng tôi đã xử lý và hoàn tiền cho bạn.'
    },
    {
      id: '2',
      type: 'shop',
      subject: 'Cửa hàng giao hàng chậm',
      description: 'Đơn hàng của tôi đã quá thời gian giao hàng dự kiến.',
      status: 'processing',
      createdAt: '17/01/2026 10:15'
    }
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [formData, setFormData] = useState({
    type: 'product',
    subject: '',
    description: ''
  });

  // Cấu hình hiển thị trạng thái
  const statusConfig = {
    pending: { label: 'Chờ xử lý', color: 'bg-yellow-500' },
    processing: { label: 'Đang xử lý', color: 'bg-blue-500' },
    resolved: { label: 'Đã giải quyết', color: 'bg-green-500' },
    rejected: { label: 'Đã từ chối', color: 'bg-red-500' }
  };

  const typeConfig = {
    product: 'Sản phẩm',
    shop: 'Cửa hàng',
    order: 'Đơn hàng',
    other: 'Khác'
  };

  const handleCreate = () => {
    setIsCreating(true);
    setFormData({ type: 'product', subject: '', description: '' });
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!formData.subject || !formData.description) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }

    const newReport = {
      id: Date.now().toString(),
      ...formData,
      status: 'pending',
      createdAt: new Date().toLocaleString('vi-VN')
    };

    setReports([newReport, ...reports]);
    setIsCreating(false);
    setFormData({ type: 'product', subject: '', description: '' });
    toast.success('Đã gửi báo cáo thành công');
  };

  const handleDelete = (id) => {
    setReports(reports.filter(r => r.id !== id));
    setSelectedReport(null);
    toast.success('Đã xóa báo cáo');
  };

  const handleCancel = () => {
    setIsCreating(false);
    setSelectedReport(null);
    setFormData({ type: 'product', subject: '', description: '' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl p-0 border-none shadow-2xl">
        {/* Header cố định */}
        <div className="sticky top-0 z-20 bg-white px-6 py-5 border-b">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
              <AlertTriangle className="text-[#EE4D2D]" /> Báo cáo & Khiếu nại
            </DialogTitle>
            <DialogDescription className="text-sm font-medium">
              Gửi phản hồi để chúng tôi cải thiện dịch vụ tốt hơn
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6">
          {/* TRƯỜNG HỢP 1: DANH SÁCH BÁO CÁO */}
          {!isCreating && !selectedReport && (
            <div className="space-y-6">
              <Button
                onClick={handleCreate}
                className="w-full bg-[#EE4D2D] hover:bg-[#d73a1e] text-white font-black h-12 rounded-xl shadow-lg shadow-orange-100 transition-all hover:scale-[1.01]"
              >
                <Plus className="w-5 h-5 mr-2" />
                Tạo báo cáo mới
              </Button>

              <div className="space-y-4">
                {reports.map((report) => (
                  <div
                    key={report.id}
                    className="border rounded-2xl p-5 hover:border-[#EE4D2D]/30 hover:bg-orange-50/10 transition-all cursor-pointer group"
                    onClick={() => setSelectedReport(report)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900 line-clamp-1">{report.subject}</span>
                          <Badge className={`${statusConfig[report.status].color} text-white border-0 text-[10px] uppercase font-bold`}>
                            {statusConfig[report.status].label}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="text-[11px] border-gray-200 text-gray-500">
                            {typeConfig[report.type]}
                          </Badge>
                          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tighter">{report.createdAt}</span>
                        </div>
                        <p className="text-sm text-gray-500 line-clamp-2 italic leading-relaxed">
                          "{report.description}"
                        </p>
                      </div>
                      <div className="flex gap-1 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="rounded-full text-gray-400 hover:text-[#EE4D2D]">
                          <Eye className="w-5 h-5" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="rounded-full text-gray-400 hover:text-red-500"
                          onClick={(e) => { e.stopPropagation(); handleDelete(report.id); }}
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                {reports.length === 0 && (
                  <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed">
                    <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p className="font-bold text-gray-400">Bạn chưa gửi báo cáo nào</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TRƯỜNG HỢP 2: FORM TẠO MỚI */}
          {isCreating && (
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-300">
              <button onClick={handleCancel} className="text-sm font-bold text-gray-400 hover:text-[#EE4D2D] flex items-center gap-1">
                <ChevronLeft size={16} /> Quay lại danh sách
              </button>

              <div className="space-y-4 bg-gray-50 p-6 rounded-2xl border">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-gray-500">Đối tượng báo cáo</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger className="rounded-xl border-gray-200 font-bold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="product">Sản phẩm món ăn</SelectItem>
                      <SelectItem value="shop">Chất lượng cửa hàng</SelectItem>
                      <SelectItem value="order">Sự cố đơn hàng</SelectItem>
                      <SelectItem value="other">Vấn đề khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-gray-500">Tiêu đề</Label>
                  <Input
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Ví dụ: Đồ ăn có vị lạ, Shop chưa chuẩn bị món..."
                    className="rounded-xl border-gray-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-gray-500">Mô tả chi tiết</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Hãy mô tả chi tiết vấn đề để chúng tôi hỗ trợ bạn tốt nhất..."
                    rows={6}
                    className="rounded-xl border-gray-200 resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <Button variant="outline" onClick={handleCancel} className="flex-1 rounded-xl font-bold border-gray-200">
                    Hủy bỏ
                  </Button>
                  <Button onClick={handleSubmit} className="flex-1 bg-[#EE4D2D] hover:bg-[#d73a1e] text-white font-black rounded-xl shadow-lg shadow-orange-100">
                    Gửi yêu cầu ngay
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* TRƯỜNG HỢP 3: CHI TIẾT BÁO CÁO */}
          {selectedReport && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <button onClick={() => setSelectedReport(null)} className="text-sm font-bold text-gray-400 hover:text-[#EE4D2D] flex items-center gap-1">
                <ChevronLeft size={16} /> Quay lại danh sách
              </button>

              <div className="border rounded-3xl p-8 bg-white shadow-sm space-y-8">
                <div className="flex items-start justify-between border-b pb-6">
                  <div className="space-y-3">
                    <h3 className="text-2xl font-black text-gray-900 leading-tight">{selectedReport.subject}</h3>
                    <div className="flex items-center gap-3">
                      <Badge className={`${statusConfig[selectedReport.status].color} text-white border-0 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-wider`}>
                        {statusConfig[selectedReport.status].label}
                      </Badge>
                      <span className="text-xs font-bold text-gray-400 uppercase">{selectedReport.createdAt}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-500" onClick={() => handleDelete(selectedReport.id)}>
                    <Trash2 size={24} />
                  </Button>
                </div>

                <div className="space-y-6">
                  <div className="p-6 bg-gray-50 rounded-2xl border-l-4 border-gray-200">
                    <p className="text-[10px] font-black text-gray-400 uppercase mb-3 tracking-widest">Nội dung đã gửi</p>
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap font-medium">
                      {selectedReport.description}
                    </p>
                  </div>

                  {selectedReport.response ? (
                    <div className="p-6 bg-green-50 rounded-2xl border-l-4 border-green-500 animate-in slide-in-from-left-4 duration-500">
                      <div className="flex items-center gap-2 mb-4 text-green-700">
                        <MessageSquare className="w-5 h-5 fill-current" />
                        <p className="text-xs font-black uppercase tracking-widest">Phản hồi từ Admin</p>
                      </div>
                      <p className="text-sm text-green-800 leading-relaxed font-bold">
                        {selectedReport.response}
                      </p>
                    </div>
                  ) : (
                    <div className="p-6 bg-blue-50 rounded-2xl border-l-4 border-blue-400 flex items-center gap-4">
                      <Clock className="text-blue-500 w-10 h-10 shrink-0 opacity-50" />
                      <div>
                        <p className="font-bold text-blue-900 text-sm">Hệ thống đang xử lý</p>
                        <p className="text-xs text-blue-700">Chúng tôi sẽ kiểm tra và phản hồi yêu cầu của bạn trong vòng 24h làm việc.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { AlertTriangle, Plus, Eye, Trash2, MessageSquare, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export function ReportsModal({ isOpen, onClose }) {
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
    if (e) e.preventDefault();
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
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl p-0">
        <DialogHeader className="p-6 border-b">
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-[#EE4D2D]" />
            Báo cáo & Phản hồi
          </DialogTitle>
          <DialogDescription>
            Gửi khiếu nại hoặc báo cáo vấn đề kỹ thuật để chúng tôi hỗ trợ bạn tốt hơn
          </DialogDescription>
        </DialogHeader>

        <div className="p-6">
          {!isCreating && !selectedReport ? (
            <div className="space-y-6">
              {/* Nút Tạo mới */}
              <Button
                onClick={handleCreate}
                className="w-full bg-[#EE4D2D] hover:bg-[#EE4D2D]/90 text-white h-12 rounded-xl shadow-lg shadow-red-100"
              >
                <Plus className="w-5 h-5 mr-2" />
                Gửi yêu cầu hỗ trợ mới
              </Button>

              {/* Danh sách báo cáo */}
              <div className="space-y-4">
                {reports.length > 0 ? (
                  reports.map((report) => (
                    <div
                      key={report.id}
                      className="group border rounded-2xl p-5 hover:border-[#EE4D2D]/30 hover:shadow-md transition-all bg-white"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 cursor-pointer" onClick={() => setSelectedReport(report)}>
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <Badge variant="outline" className="rounded-full px-3">{typeConfig[report.type]}</Badge>
                            <Badge className={`${statusConfig[report.status].color} text-white border-none rounded-full`}>
                              {statusConfig[report.status].label}
                            </Badge>
                          </div>
                          <h4 className="font-bold text-lg mb-1 group-hover:text-[#EE4D2D] transition-colors">
                            {report.subject}
                          </h4>
                          <p className="text-sm text-muted-foreground line-clamp-1 mb-3">
                            {report.description}
                          </p>
                          <p className="text-[10px] text-gray-400 uppercase font-medium">Gửi lúc: {report.createdAt}</p>
                        </div>
                        <div className="flex gap-1 ml-4 shrink-0">
                          <Button variant="ghost" size="icon" className="rounded-full hover:bg-orange-50" onClick={() => setSelectedReport(report)}>
                            <Eye className="w-4 h-4 text-blue-600" />
                          </Button>
                          <Button variant="ghost" size="icon" className="rounded-full hover:bg-red-50" onClick={() => handleDelete(report.id)}>
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed">
                    <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-muted-foreground">Bạn chưa có báo cáo nào được gửi đi.</p>
                  </div>
                )}
              </div>
            </div>
          ) : isCreating ? (
            /* Form Tạo mới */
            <div className="space-y-6 animate-in fade-in duration-300">
              <Button variant="ghost" size="sm" onClick={handleCancel} className="gap-2 -ml-2">
                <ArrowLeft className="w-4 h-4" /> Quay lại danh sách
              </Button>
              
              <div className="grid gap-5">
                <div className="space-y-2">
                  <Label className="font-bold">Loại vấn đề</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(val) => setFormData({ ...formData, type: val })}
                  >
                    <SelectTrigger className="h-11 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="product">Về món ăn / Sản phẩm</SelectItem>
                      <SelectItem value="shop">Về cửa hàng / Đối tác</SelectItem>
                      <SelectItem value="order">Về đơn hàng / Thanh toán</SelectItem>
                      <SelectItem value="other">Vấn đề khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="font-bold">Tiêu đề</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Tóm tắt vấn đề của bạn"
                    className="h-11 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="font-bold">Mô tả chi tiết</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Hãy cho chúng tôi biết chi tiết về sự cố bạn gặp phải..."
                    rows={6}
                    className="rounded-xl resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t">
                <Button variant="outline" onClick={handleCancel} className="flex-1 h-12 rounded-xl">Hủy</Button>
                <Button onClick={handleSubmit} className="flex-1 bg-[#EE4D2D] hover:bg-[#EE4D2D]/90 text-white h-12 rounded-xl font-bold shadow-lg shadow-red-100">
                  Gửi báo cáo ngay
                </Button>
              </div>
            </div>
          ) : (
            /* Chi tiết Báo cáo & Phản hồi */
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <Button variant="ghost" size="sm" onClick={() => setSelectedReport(null)} className="gap-2 -ml-2">
                <ArrowLeft className="w-4 h-4" /> Trở về danh sách
              </Button>

              <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
                <div className="p-6 space-y-6">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-xl font-bold">{selectedReport.subject}</h3>
                    <Badge className={`${statusConfig[selectedReport.status].color} text-white border-none`}>
                      {statusConfig[selectedReport.status].label}
                    </Badge>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Nội dung bạn gửi</p>
                    <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">{selectedReport.description}</p>
                    <p className="text-[10px] text-gray-400 mt-4 italic">{selectedReport.createdAt}</p>
                  </div>

                  {selectedReport.response ? (
                    <div className="p-5 bg-blue-50 border border-blue-100 rounded-xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-12 h-12 bg-blue-600/10 rounded-bl-full flex items-center justify-end pr-2 pt-1">
                        <MessageSquare className="w-5 h-5 text-blue-600" />
                      </div>
                      <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Phản hồi từ FoodieShop</p>
                      <p className="text-sm text-blue-900 leading-relaxed font-medium">
                        {selectedReport.response}
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-100 rounded-xl">
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
                        <Clock className="w-4 h-4 text-amber-600" />
                      </div>
                      <p className="text-xs text-amber-800 font-medium">
                        Báo cáo này đang được quản trị viên xem xét. Bạn sẽ nhận được thông báo ngay khi có phản hồi.
                      </p>
                    </div>
                  )}

                  <Button variant="outline" className="w-full text-red-500 border-red-100 hover:bg-red-50" onClick={() => handleDelete(selectedReport.id)}>
                    <Trash2 className="w-4 h-4 mr-2" /> Xóa bản ghi báo cáo này
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
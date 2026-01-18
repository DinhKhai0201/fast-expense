import { Category } from './types';

// Palette: Indigo, Emerald, Rose, Amber, Sky, Violet, Pink
export const CATEGORIES: Category[] = [
  { 
    id: 'food', 
    name: 'Ăn uống', 
    keywords: [
      'ăn', 'cơm', 'phở', 'bánh', 'uống', 'cafe', 'cà phê', 'coffee', 'kopi', 'capuchino', 'latte', 'espresso', 'bạc xỉu', 'trà', 'milk tea', 'trà sữa',
      'sữa', 'nhậu', 'bún', 'mì', 'noodle', 'pizza', 'thịt', 'rau', 'siêu thị', 'mart', 'chợ', 
      'ăn sáng', 'ăn trưa', 'ăn tối', 'trà đá', 'sinh tố', 'nhà hàng', 'buffet', 'lẩu', 'nướng',
      'cháo', 'xôi', 'hủ tiếu', 'bánh canh', 'bún bò', 'bún riêu', 'bánh cuốn', 'đồ ăn', 'nước ngọt'
    ], 
    color: '#FB7185', // Rose 400
    icon: 'Utensils',
    emoji: '🍔'
  },
  { 
    id: 'transport', 
    name: 'Di chuyển', 
    keywords: ['grab', 'be', 'gojek', 'xăng', 'gas', 'bus', 'xe buýt', 'taxi', 'xe ôm', 'gửi xe', 'parking', 'rửa xe', 'bảo dưỡng', 'vé xe', 'thu phí', 'bot', 'phạt xe', 'sửa xe'], 
    color: '#FBBF24', // Amber 400
    icon: 'Car',
    emoji: '🚗'
  },
  { 
    id: 'shopping', 
    name: 'Mua sắm', 
    keywords: ['quần áo', 'clothes', 'giày', 'shoes', 'dép', 'shopee', 'tiki', 'lazada', 'tiktok', 'đồ dùng', 'túi', 'bag', 'mũ', 'nón', 'đồng hồ', 'trang sức', 'mua'], 
    color: '#60A5FA', // Blue 400
    icon: 'ShoppingBag',
    emoji: '🛍️'
  },
  { 
    id: 'bills', 
    name: 'Hóa đơn', 
    keywords: ['điện', 'nước', 'water', 'bill', 'net', 'internet', 'wifi', '4g', '5g', 'điện thoại', 'topup', 'nạp thẻ', 'thuê nhà', 'rent', 'phí quản lý', 'chung cư', 'rác', 'vệ sinh'], 
    color: '#A78BFA', // Violet 400
    icon: 'Receipt',
    emoji: '🧾'
  },
  { 
    id: 'beauty', 
    name: 'Làm đẹp', 
    keywords: ['cắt tóc', 'hair', 'gội đầu', 'spa', 'massage', 'mỹ phẩm', 'son', 'lipstick', 'phấn', 'skincare', 'làm móng', 'nail', 'tẩy trang', 'sữa rửa mặt', 'facial'], 
    color: '#F472B6', // Pink 400
    icon: 'Sparkles',
    emoji: '💅'
  },
  { 
    id: 'health', 
    name: 'Sức khỏe', 
    keywords: ['thuốc', 'medicine', 'khám', 'bệnh', 'gym', 'yoga', 'bác sĩ', 'doctor', 'nha khoa', 'dental', 'bảo hiểm', 'viện phí', 'xét nghiệm'], 
    color: '#34D399', // Emerald 400
    icon: 'Activity',
    emoji: '💊'
  },
  { 
    id: 'education', 
    name: 'Giáo dục', 
    keywords: ['học phí', 'tuition', 'sách', 'book', 'vở', 'bút', 'khóa học', 'course', 'tiếng anh', 'đóng học', 'văn phòng phẩm', 'tài liệu', 'photo', 'in ấn'], 
    color: '#818CF8', // Indigo 400
    icon: 'BookOpen',
    emoji: '📚'
  },
  { 
    id: 'social', 
    name: 'Hiếu hỉ', 
    keywords: ['cưới', 'wedding', 'đám ma', 'sinh nhật', 'birthday', 'biếu', 'tặng', 'quà', 'gift', 'lì xì', 'thăm bệnh', 'đầy tháng', 'thôi nôi', 'party', 'tiệc'], 
    color: '#FB7185', // Rose 400
    icon: 'Gift',
    emoji: '💌'
  },
  { 
    id: 'entertainment', 
    name: 'Giải trí', 
    keywords: ['phim', 'cinema', 'netflix', 'spotify', 'youtube', 'game', 'du lịch', 'travel', 'vé', 'ticket', 'karaoke', 'chơi', 'bida', 'bowling', 'picnic', 'hotel', 'khách sạn'], 
    color: '#E879F9', // Fuchsia 400
    icon: 'Film',
    emoji: '🎮'
  },
  { 
    id: 'invest', 
    name: 'Đầu tư', 
    keywords: ['vàng', 'gold', 'chứng khoán', 'stock', 'tiết kiệm', 'saving', 'đất', 'land', 'coin', 'crypto', 'ngoại tệ', 'usd', 'bảo hiểm nhân thọ'], 
    color: '#38BDF8', // Sky 400
    icon: 'TrendingUp',
    emoji: '💎'
  },
  { 
    id: 'income', 
    name: 'Thu nhập', 
    keywords: ['lương', 'salary', 'thưởng', 'bonus', 'được cho', 'bán đồ', 'lãi', 'profit', 'hoàn tiền', 'cashback', 'nhận tiền', 'ting ting'], 
    color: '#10B981', // Emerald 500
    icon: 'Wallet',
    emoji: '💰'
  },
  { 
    id: 'other', 
    name: 'Khác', 
    keywords: [], 
    color: '#94A3B8', // Slate 400
    icon: 'MoreHorizontal',
    emoji: '✨'
  }
];

export const OTHER_CATEGORY = CATEGORIES.find(c => c.id === 'other')!;
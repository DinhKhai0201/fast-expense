
# NhanhChiTieu (FastExpense) - PWA Expense Tracker 💸⚡

A **lightning-fast**, **offline-first** expense tracker using **rule-based** and **fuzzy matching logic** to parse Vietnamese natural language inputs (e.g., "cafe 30k", "ăn trưa 50 nghìn") instantly.

## ✨ Features

- ⚡ **Instant Parsing**: Type natural language → Auto-detect amount & category
- 🇻🇳 **Vietnamese Language**: Understands slang (k, nghìn, triệu, lít, củ)
- 📱 **PWA Ready**: Install as mobile/desktop app, works offline
- 💾 **Offline-First**: All data stored locally in browser
- 🎨 **Beautiful UI**: Modern design with Lexend font & smooth animations
- 📊 **Smart Dashboard**: Charts, trends, and spending insights
- 🏷️ **11 Categories**: Auto-categorization using AI-powered fuzzy matching
- 💨 **Blazing Fast**: Built with Next.js 15 + Turbopack

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
```

## 📱 PWA Installation

### On Mobile (iOS/Android):
1. Open the app in your browser
2. Tap the "Share" or "Menu" button
3. Select "Add to Home Screen"
4. Enjoy the native app experience!

### On Desktop:
1. Look for the install icon in the address bar
2. Click "Install NhanhChiTieu"
3. App will open in its own window

## 🧠 How It Works

### Natural Language Parser
```
Input: "cafe 30k"
      ↓
Parser extracts:
- Amount: 30,000 VNĐ (30 × 1000)
- Keywords: "cafe"
      ↓
Fuzzy Matcher finds:
- Category: "Ăn uống" (Food & Drinks)
- Confidence: 95%
      ↓
Result: 30,000₫ | Ăn uống | cafe
```

### Technology Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Search**: Fuse.js (Fuzzy matching)
- **Icons**: Lucide React
- **PWA**: Custom Service Worker

## 📂 Project Structure

```
fastexpense/
├── app/
│   ├── layout.tsx        # Root layout with PWA metadata
│   ├── page.tsx          # Main page (client component)
│   └── globals.css       # Global styles + Tailwind
├── components/
│   ├── Dashboard.tsx     # Stats & charts
│   ├── ExpenseInput.tsx  # Magic input with live preview
│   ├── ExpenseList.tsx   # Expense list view
│   ├── Layout.tsx        # Tab navigation
│   └── Settings.tsx      # Import/Export/Clear
├── utils/
│   ├── parser.ts         # 🧠 NLP Engine
│   └── storage.ts        # LocalStorage wrapper
├── hooks/
│   └── usePWA.ts         # Service Worker registration
├── public/
│   ├── manifest.json     # PWA manifest
│   ├── sw.js             # Service worker
│   └── icon-*.png        # App icons
├── constants.ts          # Categories & keywords
└── types.ts              # TypeScript interfaces
```

## 🎯 Categories

The app recognizes **11 categories** with **100+ Vietnamese keywords**:

🍔 Ăn uống • 🚗 Di chuyển • 🛍️ Mua sắm • 🧾 Hóa đơn • 💅 Làm đẹp • 💊 Sức khỏe • 📚 Giáo dục • 💌 Hiếu hỉ • 🎮 Giải trí • 💎 Đầu tư • 💰 Thu nhập

## 🔐 Privacy

- ✅ **100% Local**: No data sent to servers
- ✅ **No Analytics**: No tracking, no cookies
- ✅ **No API Keys**: Fully offline, no external dependencies
- ✅ **Your Data**: Export/Import anytime as JSON

## 📝 License

MIT License - Feel free to use this project!

---

**Made with ❤️ for Vietnamese users**

*Type fast, spend mindfully* 🚀

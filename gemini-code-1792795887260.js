import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Bot, Palette, Layout, Search, Eye, ShoppingCart, 
  Settings, User, Check, Smartphone, Tablet, Monitor, ArrowLeft, 
  Globe, Shield, DollarSign, Plus, Edit, Trash, ChevronLeft, ChevronRight,
  Menu, X, Play, RefreshCw, Undo, Redo, Download, ExternalLink, HelpCircle
} from 'lucide-react';

// --- CRAFTO AI Custom Logo SVG ---
const CraftoLogo = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="craftoBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8D51FF" />
        <stop offset="100%" stopColor="#6325E3" />
      </linearGradient>
      <linearGradient id="craftoGlow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#C084FC" />
        <stop offset="100%" stopColor="#E9D5FF" />
      </linearGradient>
    </defs>
    {/* Hexagon Outer Container */}
    <path d="M250 40 L430 144 V356 L250 460 L70 356 V144 Z" fill="url(#craftoBg)" />
    {/* Outer Tech Circuit Trace */}
    <path d="M160 190 H220 L270 140 H340" stroke="white" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
    <circle cx="160" cy="190" r="16" fill="white" />
    <circle cx="340" cy="140" r="16" fill="white" />
    
    <path d="M340 310 H280 L230 360 H160" stroke="white" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
    <circle cx="340" cy="310" r="16" fill="white" />
    <circle cx="160" cy="360" r="16" fill="white" />

    {/* Inner Hexagon Badge */}
    <path d="M250 180 L320 220 V300 L250 340 L180 300 V220 Z" fill="none" stroke="white" strokeWidth="12" />
    {/* Letter A Icon / Circuit Node */}
    <path d="M220 290 L250 225 L280 290 M230 270 H270" stroke="white" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// --- 15 Categories ---
const CATEGORIES = [
  { id: 'perfumes', name: 'العطور والملاذات', icon: '✨', description: 'علامات العطور والروائح الفاخرة' },
  { id: 'restaurants', name: 'المطاعم والمقاهي', icon: '🍽️', description: 'المطاعم واللاونجات والمقاهي العصرية' },
  { id: 'fashion', name: 'الموضة والأزياء', icon: '👗', description: 'المتاجر والبراندات ودور الأزياء' },
  { id: 'beauty', name: 'العناية والبشرة', icon: '💄', description: 'مراكز التجميل ومنتجات العناية' },
  { id: 'portfolio', name: 'معارض الأعمال', icon: '💼', description: 'المستقلين والمبدعين والمصممين' },
  { id: 'corporate', name: 'الشركات والأعمال', icon: '🏢', description: 'المؤسسات والشركات والمكاتب' },
  { id: 'realestate', name: 'العقارات والمقاولات', icon: '🏰', description: 'الشركات العقارية والمشاريع' },
  { id: 'tech', name: 'التقنية والـ SaaS', icon: '🚀', description: 'البرمجيات والشركات الناشئة' },
  { id: 'fitness', name: 'الرياضة واللیاقة', icon: '🏋️‍♂️', description: 'الأندية الرياضية والمدربين' },
  { id: 'hotels', name: 'الفنادق والسياحة', icon: '🏨', description: 'الفنادق ومنتجعات السفر' },
  { id: 'luxury', name: 'المجوهرات والفاخرة', icon: '💎', description: 'الساعات والمجوهرات والمقتنيات' },
  { id: 'education', name: 'التعليم والأكاديميات', icon: '🎓', description: 'الدورات والمنصات التعليمية' },
  { id: 'medical', name: 'العيادات والصحة', icon: '🩺', description: 'المستشفيات والأطباء والعيادات' },
  { id: 'agencies', name: 'وكالات التسويق', icon: '⚡', description: 'وكالات الإبداع والدعاية والتسويق' },
  { id: 'events', name: 'المناسبات والأعراس', icon: '🎉', description: 'تنظيم الحفلات والأعراس والمؤتمرات' },
];

// --- GENERATE 20 DESIGNS PER CATEGORY (TOTAL 300 TEMPLATES) ---
const generateTemplates = () => {
  const templates = [];
  let globalId = 1;

  CATEGORIES.forEach(cat => {
    for (let i = 1; i <= 20; i++) {
      templates.push({
        id: `tpl-${cat.id}-${i}`,
        numericId: globalId++,
        categoryId: cat.id,
        categoryName: cat.name,
        title: `${cat.name.split(' ')[0]} ${i > 9 ? i : '0' + i} - ${
          ['إليجانت', 'مودرن', 'رويال', 'بريميوم', 'مينيمال', 'ألترا', 'لاكس', 'فيجن', 'أورا', 'نكست'][i % 10]
        }`,
        subtitle: `تصميم حرفي رقم ${i} مخصص لقطاع ${cat.name} مدعوم بنظام CRAFTO AI`,
        price: 49 + (i * 3) % 150,
        rating: (4.5 + ((i % 5) * 0.1)).toFixed(1),
        reviewsCount: 12 + i * 7,
        badge: i % 4 === 0 ? 'Best Seller' : i % 5 === 0 ? 'AI Powered' : 'Featured',
        thumbnail: `https://images.unsplash.com/photo-${
          [
            '1522337360788-8b13dee7a37e', '1517248135467-4c7edcad34c4', '1490481651871-ab68de25d43d',
            '1522337094846-8a830389a1c9', '1507238691740-187a5b1d37b8', '1486406146926-c627a92ad1ab',
            '1560518883-ce09059eeffa', '1551288049-bebda4e38f71', '1534438327276-14e5300c3a48',
            '1566073771259-6a8506099945', '1515562141207-7a88fb7ce338', '1523240795612-9a054b0db644',
            '1584515979956-d9f6e5d09982', '1460925895917-afdab827c52f', '1511795409834-ef04bbd61622'
          ][(globalId + i) % 15]
        }?auto=format&fit=crop&w=800&q=80`,
        config: {
          brandName: `${cat.name.split(' ')[0]} Craft ${i}`,
          heroTitle: `تجربة استثنائية في عالم ${cat.name}`,
          heroSubtitle: `تصميم عالي الجودة جرى إنشاؤه مخصصاً بواسطة CRAFTO AI ليواكب أحدث صيحات تجربة المستخدم.`,
          primaryColor: '#7C3AED',
          accentColor: '#A855F7',
          bgColor: '#0F172A',
          textColor: '#F8FAFC',
          fontFamily: 'Tajawal',
          sections: [
            { id: 'hero', name: 'الواجهة الرئيسية (Hero)', enabled: true },
            { id: 'features', name: 'المميزات والخدمات', enabled: true },
            { id: 'gallery', name: 'معرض الصور والمنتجات', enabled: true },
            { id: 'testimonials', name: 'آراء العملاء', enabled: true },
            { id: 'contact', name: 'التواصل والطلب', enabled: true }
          ]
        }
      });
    }
  });

  return templates;
};

const ALL_TEMPLATES = generateTemplates();

export default function App() {
  const [currentView, setCurrentView] = useState('marketplace'); // marketplace, editor, dashboard, admin
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const [activeTemplate, setActiveTemplate] = useState(ALL_TEMPLATES[0]);
  const [previewDevice, setPreviewDevice] = useState('desktop');
  const [aiApiKey, setAiApiKey] = useState('');
  const [paypalClientId, setPaypalClientId] = useState('');

  // User Purchased Sites
  const [purchasedWebsites, setPurchasedWebsites] = useState([
    {
      id: 'proj-101',
      templateId: 'tpl-perfumes-1',
      title: 'متجر عطور رويال عود',
      category: 'العطور والملاذات',
      purchaseDate: '2026-10-20',
      status: 'Published',
      domain: 'royaloud.crafto.ai',
      config: { ...ALL_TEMPLATES[0].config, brandName: 'Royal Oud Perfumes' }
    }
  ]);

  // AI Assistant Chat State
  const [chatMessages, setChatMessages] = useState([
    { sender: 'ai', text: 'مرحباً بك في CRAFTO AI! كيف يمكنني مساعدتك في تعديل وتطوير موقعك اليوم؟' }
  ]);
  const [userPrompt, setUserPrompt] = useState('');
  const [isAiProcessing, setIsAiProcessing] = useState(false);

  // Filter Templates
  const filteredTemplates = ALL_TEMPLATES.filter(tpl => {
    const matchesCategory = selectedCategory === 'all' || tpl.categoryId === selectedCategory;
    const matchesSearch = tpl.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tpl.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Pagination calculation
  const totalPages = Math.ceil(filteredTemplates.length / itemsPerPage);
  const displayedTemplates = filteredTemplates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  // Handle AI Prompt Execution
  const handleSendAiPrompt = () => {
    if (!userPrompt.trim()) return;

    const newMsg = { sender: 'user', text: userPrompt };
    setChatMessages(prev => [...prev, newMsg]);
    const promptText = userPrompt;
    setUserPrompt('');
    setIsAiProcessing(true);

    setTimeout(() => {
      let updatedConfig = { ...activeTemplate.config };
      let aiReply = "تم استلام طلبك وتحديث كود وتصميم الموقع بنجاح عبر الذكاء الاصطناعي!";

      if (promptText.includes('لون') || promptText.includes('الألوان')) {
        updatedConfig.primaryColor = '#10B981';
        updatedConfig.accentColor = '#34D399';
        aiReply = "تم تغيير نغمة الألوان إلى اللون الزمردي الحديث وفقاً لطلبك.";
      } else if (promptText.includes('اسم') || promptText.includes('العنوان')) {
        updatedConfig.brandName = 'CRAFTO Brand Pro';
        updatedConfig.heroTitle = 'المنصة الرائدة في الابتكار الرقمي';
        aiReply = "تم تحديث الهوية والنصوص الرئيسية للواجهة.";
      } else if (promptText.includes('داكن') || promptText.includes('أسود')) {
        updatedConfig.bgColor = '#090D16';
        updatedConfig.textColor = '#FFFFFF';
        aiReply = "تم تطبيق النمط الداكن الفاخر (Dark Luxury Aesthetic).";
      }

      setActiveTemplate(prev => ({ ...prev, config: updatedConfig }));
      setChatMessages(prev => [...prev, { sender: 'ai', text: aiReply }]);
      setIsAiProcessing(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 font-sans dir-rtl text-right" dir="rtl">
      
      {/* --- HEADER NAVBAR --- */}
      <header className="sticky top-0 z-50 bg-[#0F172A]/90 backdrop-blur-md border-b border-purple-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Logo */}
          <div 
            onClick={() => setCurrentView('marketplace')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <CraftoLogo className="w-10 h-10 transition-transform group-hover:scale-105" />
            <div>
              <span className="text-2xl font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-violet-300 to-indigo-400">
                CRAFTO AI
              </span>
              <span className="block text-[10px] text-purple-400 font-medium tracking-widest -mt-1">
                WEBSITE ENGINE
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button 
              onClick={() => setCurrentView('marketplace')}
              className={`hover:text-purple-400 transition-colors ${currentView === 'marketplace' ? 'text-purple-400 font-bold' : 'text-slate-300'}`}
            >
              معرض التصاميم (300+)
            </button>
            <button 
              onClick={() => setCurrentView('dashboard')}
              className={`hover:text-purple-400 transition-colors ${currentView === 'dashboard' ? 'text-purple-400 font-bold' : 'text-slate-300'}`}
            >
              مواقعي المشتراة
            </button>
            <button 
              onClick={() => setCurrentView('admin')}
              className={`hover:text-purple-400 transition-colors ${currentView === 'admin' ? 'text-purple-400 font-bold' : 'text-slate-300'}`}
            >
              لوحة التحكم (Admin)
            </button>
          </nav>

          {/* Action Button */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setCurrentView('dashboard')}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-purple-900/40 transition-all hover:scale-[1.02]"
            >
              <User className="w-4 h-4" />
              لوحة حسابي
            </button>
          </div>
        </div>
      </header>

      {/* --- VIEW 1: MARKETPLACE & CATALOG --- */}
      {currentView === 'marketplace' && (
        <main className="pb-20">
          
          {/* Hero Section */}
          <section className="relative overflow-hidden py-16 lg:py-24 bg-gradient-to-b from-purple-950/20 via-[#0B0F19] to-[#0B0F19]">
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
              
              <div className="inline-flex items-center gap-2 bg-purple-950/60 border border-purple-500/30 px-4 py-1.5 rounded-full text-purple-300 text-xs font-semibold mb-6">
                <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                منصة CRAFTO AI: أكثر من 300 قالب احترافي بدقة فائقة
              </div>

              <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight max-w-4xl mx-auto mb-6">
                اصنع موقعك الإلكتروني الفاخر بنقرة زر وبقوة <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-violet-300 to-pink-400">الذكاء الاصطناعي</span>
              </h1>
              
              <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                اختر من بين أكثر من 20 تصميماً تخصصياً في كل قطاع، وقم بتعديل المحتوى، الألوان، والمظهر كاملاً باستخدام المحرر الذكي.
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto relative">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث عن الفئة أو اسم التصميم (مثال: عطور، مطاعم، SaaS)..." 
                  className="w-full bg-[#151D2A] border border-purple-900/40 rounded-2xl py-4 pr-12 pl-4 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 shadow-xl transition-all"
                />
              </div>
            </div>
          </section>

          {/* Categories Selector */}
          <section className="max-w-7xl mx-auto px-4 mb-10">
            <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-none">
              <button 
                onClick={() => setSelectedCategory('all')}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                  selectedCategory === 'all' 
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40' 
                    : 'bg-[#151D2A] text-slate-300 hover:bg-[#1E293B]'
                }`}
              >
                🔮 جميع الفئات (300+)
              </button>
              
              {CATEGORIES.map(cat => (
                <button 
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
                    selectedCategory === cat.id 
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40' 
                      : 'bg-[#151D2A] text-slate-300 hover:bg-[#1E293B]'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Templates Grid (20 Designs per category) */}
          <section className="max-w-7xl mx-auto px-4">
            
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>التصاميم المتاحة</span>
                <span className="text-xs bg-purple-900/50 text-purple-300 px-2.5 py-1 rounded-full border border-purple-700/30">
                  {filteredTemplates.length} تصميم
                </span>
              </h2>
              <span className="text-xs text-slate-400">عرض {displayedTemplates.length} من أصل {filteredTemplates.length}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedTemplates.map((tpl) => (
                <div 
                  key={tpl.id} 
                  className="bg-[#151D2A] border border-purple-900/20 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all group hover:-translate-y-1 shadow-lg"
                >
                  {/* Thumbnail */}
                  <div className="relative h-48 overflow-hidden bg-slate-800">
                    <img 
                      src={tpl.thumbnail} 
                      alt={tpl.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-[#0F172A]/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-purple-300 border border-purple-500/30">
                      {tpl.badge}
                    </div>
                    <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button 
                        onClick={() => {
                          setActiveTemplate(tpl);
                          setCurrentView('editor');
                        }}
                        className="bg-purple-600 hover:bg-purple-500 text-white p-3 rounded-xl shadow-lg transition-transform hover:scale-110"
                        title="فتح في المحرر الذكي"
                      >
                        <Bot className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Content Details */}
                  <div className="p-5">
                    <div className="flex items-center justify-between text-xs text-purple-400 mb-2 font-medium">
                      <span>{tpl.categoryName}</span>
                      <span className="text-amber-400 flex items-center gap-1">★ {tpl.rating} ({tpl.reviewsCount})</span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                      {tpl.title}
                    </h3>
                    <p className="text-slate-400 text-xs line-clamp-2 mb-4">
                      {tpl.subtitle}
                    </p>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-xl font-black text-white">${tpl.price}</span>
                      <button 
                        onClick={() => {
                          setActiveTemplate(tpl);
                          setCurrentView('editor');
                        }}
                        className="bg-purple-950/80 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-700/40 px-4 py-2 rounded-xl text-xs font-bold transition-all"
                      >
                        معاينة وتعديل
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2.5 rounded-xl bg-[#151D2A] border border-slate-800 text-slate-300 hover:bg-purple-900/30 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                
                {Array.from({ length: totalPages }, (_, idx) => idx + 1).slice(
                  Math.max(0, currentPage - 3), 
                  Math.min(totalPages, currentPage + 2)
                ).map((page) => (
                  <button 
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${
                      currentPage === page 
                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40' 
                        : 'bg-[#151D2A] text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button 
                  onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2.5 rounded-xl bg-[#151D2A] border border-slate-800 text-slate-300 hover:bg-purple-900/30 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>
            )}

          </section>
        </main>
      )}

      {/* --- VIEW 2: AI EDITOR & LIVE PREVIEW --- */}
      {currentView === 'editor' && (
        <div className="h-[calc(100vh-4.5rem)] flex flex-col lg:flex-row overflow-hidden bg-[#090D16]">
          
          {/* LEFT PANEL: AI CHAT ASSISTANT & MANUAL CONTROLS */}
          <div className="w-full lg:w-96 border-b lg:border-b-0 lg:border-l border-purple-900/30 bg-[#0F172A] flex flex-col h-full">
            
            {/* Header */}
            <div className="p-4 border-b border-purple-900/30 flex items-center justify-between bg-[#131C2E]">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-purple-400" />
                <span className="font-bold text-sm text-white">مساعد CRAFTO AI</span>
              </div>
              <button 
                onClick={() => setCurrentView('marketplace')}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" /> العودة للمتجر
              </button>
            </div>

            {/* Chat Box History */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
              {chatMessages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex ${msg.sender === 'user' ? 'justify-start' : 'justify-end'}`}
                >
                  <div 
                    className={`max-w-[85%] p-3 rounded-2xl ${
                      msg.sender === 'user' 
                        ? 'bg-purple-600 text-white rounded-br-none' 
                        : 'bg-[#1E293B] text-slate-200 border border-purple-900/30 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isAiProcessing && (
                <div className="flex justify-end">
                  <div className="bg-[#1E293B] p-3 rounded-2xl text-purple-300 flex items-center gap-2 border border-purple-900/30">
                    <RefreshCw className="w-4 h-4 animate-spin" /> جاري تطبيق التغييرات ذكياً...
                  </div>
                </div>
              )}
            </div>

            {/* Input prompt */}
            <div className="p-3 border-t border-purple-900/30 bg-[#131C2E]">
              <div className="relative">
                <input 
                  type="text" 
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendAiPrompt()}
                  placeholder="اكتب طلبك (مثال: غير اللون للزمردي)..."
                  className="w-full bg-[#090D16] border border-purple-900/40 rounded-xl py-3 pr-4 pl-10 text-white text-xs focus:outline-none focus:border-purple-500"
                />
                <button 
                  onClick={handleSendAiPrompt}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-purple-600 text-white p-1.5 rounded-lg hover:bg-purple-500 transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Purchase CTA */}
            <div className="p-4 border-t border-purple-900/30 bg-[#0B0F19] flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">السعر الإجمالي</span>
                <span className="text-lg font-black text-white">${activeTemplate.price}</span>
              </div>
              <button 
                onClick={() => {
                  setPurchasedWebsites(prev => [
                    ...prev, 
                    {
                      id: `proj-${Date.now()}`,
                      templateId: activeTemplate.id,
                      title: activeTemplate.config.brandName,
                      category: activeTemplate.categoryName,
                      purchaseDate: new Date().toISOString().split('T')[0],
                      status: 'Published',
                      domain: `${activeTemplate.config.brandName.toLowerCase().replace(/\s+/g, '')}.crafto.ai`,
                      config: { ...activeTemplate.config }
                    }
                  ]);
                  alert('تهانينا! تم شراء القالب وتفعيله بنجاح في حسابك.');
                  setCurrentView('dashboard');
                }}
                className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-lg shadow-purple-900/40"
              >
                شراء واقتناء القالب
              </button>
            </div>

          </div>

          {/* RIGHT PANEL: LIVE PREVIEW CANVAS */}
          <div className="flex-1 bg-[#05070C] flex flex-col h-full overflow-hidden">
            
            {/* Viewport Toolbar */}
            <div className="h-12 border-b border-purple-900/30 bg-[#0F172A] px-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setPreviewDevice('desktop')}
                  className={`p-2 rounded-lg text-xs flex items-center gap-1 ${
                    previewDevice === 'desktop' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <Monitor className="w-4 h-4" /> شاشة كبيرة
                </button>
                <button 
                  onClick={() => setPreviewDevice('mobile')}
                  className={`p-2 rounded-lg text-xs flex items-center gap-1 ${
                    previewDevice === 'mobile' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <Smartphone className="w-4 h-4" /> جوال
                </button>
              </div>

              <div className="text-xs text-purple-300 font-mono bg-purple-950/60 border border-purple-800/40 px-3 py-1 rounded-full">
                {activeTemplate.config.brandName}.crafto.ai
              </div>
            </div>

            {/* Render Simulated Website */}
            <div className="flex-1 overflow-y-auto p-4 flex justify-center bg-[#05070C]">
              <div 
                className={`transition-all duration-300 shadow-2xl rounded-2xl overflow-hidden border border-purple-900/40 ${
                  previewDevice === 'mobile' ? 'w-[375px] my-4' : 'w-full max-w-5xl my-2'
                }`}
                style={{ backgroundColor: activeTemplate.config.bgColor, color: activeTemplate.config.textColor }}
              >
                
                {/* Simulated Header */}
                <header className="p-6 border-b border-white/10 flex items-center justify-between">
                  <div className="text-xl font-black tracking-wider text-purple-400">
                    {activeTemplate.config.brandName}
                  </div>
                  <nav className="flex items-center gap-6 text-xs opacity-80">
                    <span>الرئيسية</span>
                    <span>المنتجات</span>
                    <span>عن الشركة</span>
                    <span>تواصل معنا</span>
                  </nav>
                </header>

                {/* Simulated Hero Section */}
                <section className="py-20 px-8 text-center relative overflow-hidden">
                  <h1 className="text-3xl sm:text-5xl font-black mb-6 leading-tight">
                    {activeTemplate.config.heroTitle}
                  </h1>
                  <p className="max-w-xl mx-auto text-sm opacity-80 mb-8 leading-relaxed">
                    {activeTemplate.config.heroSubtitle}
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <button 
                      className="px-6 py-3 rounded-xl font-bold text-xs text-white shadow-lg"
                      style={{ backgroundColor: activeTemplate.config.primaryColor }}
                    >
                      استكشف الآن
                    </button>
                  </div>
                </section>

                {/* Simulated Sections */}
                {activeTemplate.config.sections.map(sec => sec.enabled && (
                  <section key={sec.id} className="py-12 px-8 border-t border-white/5 bg-white/5 my-4 mx-6 rounded-2xl">
                    <h2 className="text-lg font-bold mb-3">{sec.name}</h2>
                    <p className="text-xs opacity-70">
                      هذا القسم مخصص لاستعراض {sec.name} ضمن هيكلية القالب الخاصة بـ {activeTemplate.config.brandName}.
                    </p>
                  </section>
                ))}

              </div>
            </div>

          </div>

        </div>
      )}

      {/* --- VIEW 3: CUSTOMER DASHBOARD --- */}
      {currentView === 'dashboard' && (
        <main className="max-w-7xl mx-auto px-4 py-12">
          
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white">لوحة تحكم المستخدم</h1>
              <p className="text-slate-400 text-xs mt-1">إدارة وتحرير والمواقع المشتراة عبر منصة CRAFTO AI</p>
            </div>
            <button 
              onClick={() => setCurrentView('marketplace')}
              className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all"
            >
              + شراء موقع جديد
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {purchasedWebsites.map(site => (
              <div key={site.id} className="bg-[#151D2A] border border-purple-900/30 rounded-2xl p-6 relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs bg-purple-950 text-purple-300 border border-purple-800/40 px-3 py-1 rounded-full">
                    {site.category}
                  </span>
                  <span className="text-xs text-emerald-400 font-semibold">{site.status}</span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1">{site.title}</h3>
                <p className="text-xs text-slate-400 mb-6 font-mono">{site.domain}</p>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => {
                      setActiveTemplate({
                        id: site.templateId,
                        price: 99,
                        categoryName: site.category,
                        config: site.config
                      });
                      setCurrentView('editor');
                    }}
                    className="flex-1 bg-purple-600 hover:bg-purple-500 text-white py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <Bot className="w-4 h-4" /> فتح المحرر
                  </button>
                </div>
              </div>
            ))}
          </div>

        </main>
      )}

      {/* --- VIEW 4: ADMIN CONTROL PANEL --- */}
      {currentView === 'admin' && (
        <main className="max-w-7xl mx-auto px-4 py-12">
          
          <div className="bg-[#151D2A] border border-purple-900/30 rounded-2xl p-8 mb-8">
            <h1 className="text-xl font-bold text-white mb-2">إعدادات المنصة والمفاتيح (Admin)</h1>
            <p className="text-xs text-slate-400 mb-6">قم بضبط مفاتيح OpenAI و PayPal لتفعيل الميزات بالكامل.</p>

            <div className="space-y-4 max-w-xl">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">OpenAI API Key</label>
                <input 
                  type="password" 
                  value={aiApiKey}
                  onChange={(e) => setAiApiKey(e.target.value)}
                  placeholder="sk-proj-..."
                  className="w-full bg-[#090D16] border border-purple-900/40 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">PayPal Client ID</label>
                <input 
                  type="text" 
                  value={paypalClientId}
                  onChange={(e) => setPaypalClientId(e.target.value)}
                  placeholder="PAYPAL-CLIENT-ID-SANDBOX"
                  className="w-full bg-[#090D16] border border-purple-900/40 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <button 
                onClick={() => alert('تم حفظ التغييرات بنجاح!')}
                className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-lg"
              >
                حفظ الإعدادات
              </button>
            </div>
          </div>

        </main>
      )}

      {/* --- FOOTER --- */}
      <footer className="border-t border-purple-900/20 bg-[#0F172A] py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <CraftoLogo className="w-5 h-5" />
            <span>جميع الحقوق محفوظة © 2026 CRAFTO AI</span>
          </div>
          <div className="flex items-center gap-6">
            <span>الشروط والأحكام</span>
            <span>سياسة الخصوصية</span>
            <span>الدعم الفني</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
/**
 * GAME OF ECOM — Embedded Ebook Page
 * Full ebook reading experience within demanlab.ai
 * Light theme ebook reader with Be Vietnam Pro typography
 * Table of Contents + Chapter reading in single page
 */
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, BookOpen, Lightbulb, Heart, ChevronDown, ChevronUp, Search, X, Quote, ExternalLink, Music } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { bookData, getAllChapters, getPartForChapter, searchContent, HERO_IMAGE, HAI_VN_PORTRAIT, type Chapter, type ValueLayer } from '@/lib/bookData';

// ═══ CONSTANTS ═══
const EBOOK = {
  bg: '#FAFAF8',
  fg: '#1a1a2e',
  fgMuted: '#6b7280',
  fgDim: '#9ca3af',
  border: '#e5e7eb',
  borderLight: '#f3f4f6',
  card: '#ffffff',
  primary: '#0d9488',
  primaryLight: '#ccfbf1',
};

// ═══ VALUE LAYER META ═══
const layerMeta: Record<ValueLayer, { icon: typeof BookOpen; title: string; color: string; bg: string; borderColor: string }> = {
  knowledge: { icon: BookOpen, title: 'Kiến Thức Chuyên Sâu', color: '#0d9488', bg: 'rgba(13,148,136,0.06)', borderColor: '#0d9488' },
  info: { icon: Lightbulb, title: 'Thông Tin Độc Đáo', color: '#d97706', bg: 'rgba(217,119,6,0.06)', borderColor: '#d97706' },
  emotion: { icon: Heart, title: 'Cảm Xúc Chạm Đến Bạn', color: '#e11d48', bg: 'rgba(225,29,72,0.06)', borderColor: '#e11d48' },
};

const sectionTypeLabel: Record<string, { emoji: string; label: string }> = {
  story: { emoji: '📖', label: 'Câu chuyện' },
  lesson: { emoji: '💡', label: 'Bài học' },
  reflection: { emoji: '🪞', label: 'Suy ngẫm' },
  action: { emoji: '🚀', label: 'Hành động' },
};

// ═══ MAIN COMPONENT ═══
export default function GameOfEcom() {
  const { lang, toggleLang, t } = useLanguage();
  const [activeChapter, setActiveChapter] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Chapter[]>([]);
  const [readProgress, setReadProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const allChapters = getAllChapters();
  const currentChapter = activeChapter ? allChapters.find(c => c.id === activeChapter) : null;
  const currentPart = currentChapter ? getPartForChapter(currentChapter.id) : undefined;
  const currentIndex = currentChapter ? allChapters.findIndex(c => c.id === currentChapter.id) : -1;
  const prevChapter = currentIndex > 0 ? allChapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null;

  useEffect(() => {
    if (activeChapter) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeChapter]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      if (activeChapter) {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight > 0) {
          setReadProgress(Math.min((window.scrollY / docHeight) * 100, 100));
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeChapter]);

  const handleSearch = (val: string) => {
    setSearchQuery(val);
    if (val.trim().length >= 2) {
      setSearchResults(searchContent(val));
    } else {
      setSearchResults([]);
    }
  };

  const goToChapter = (id: string) => {
    setActiveChapter(id);
    setSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const goHome = () => {
    setActiveChapter(null);
    setReadProgress(0);
    window.scrollTo({ top: 0 });
  };

  // ═══ HEADER ═══
  const Header = () => (
    <header
      className="sticky top-0 z-50"
      style={{
        backgroundColor: `${EBOOK.bg}f0`,
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${EBOOK.border}`,
      }}
    >
      {/* Reading progress bar */}
      {activeChapter && currentPart && (
        <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ backgroundColor: EBOOK.borderLight }}>
          <div className="h-full transition-all duration-100" style={{ width: `${readProgress}%`, backgroundColor: currentPart.color }} />
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        <div className="flex items-center gap-3">
          {activeChapter ? (
            <button
              onClick={goHome}
              className="flex items-center gap-1.5 text-xs font-medium transition-colors"
              style={{ color: EBOOK.fgMuted, fontFamily: "'Space Grotesk', sans-serif", background: 'none', border: 'none' }}
            >
              <ArrowLeft size={14} />
              <span className="hidden sm:inline">Mục lục</span>
            </button>
          ) : (
            <a
              href="/"
              className="flex items-center gap-1.5 text-xs font-medium transition-colors no-underline"
              style={{ color: EBOOK.fgMuted, fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <ArrowLeft size={14} />
              <span className="hidden sm:inline">DEMAN AI LAB</span>
            </a>
          )}

          <div className="h-4 w-px" style={{ backgroundColor: EBOOK.border }} />

          <button onClick={goHome} className="flex items-center gap-2 no-underline" style={{ background: 'none', border: 'none' }}>
            <BookOpen size={16} style={{ color: EBOOK.primary }} />
            <span className="font-semibold text-sm" style={{ color: EBOOK.fg, fontFamily: "'Be Vietnam Pro', sans-serif" }}>
              GAME OF ECOM
            </span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs transition-colors"
            style={{
              color: EBOOK.fgMuted,
              border: `1px solid ${EBOOK.border}`,
              borderRadius: '6px',
              background: EBOOK.card,
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            <Search size={12} />
            <span className="hidden sm:inline">Tìm...</span>
          </button>

          <button
            onClick={toggleLang}
            className="text-xs font-semibold px-2 py-1 transition-colors"
            style={{
              color: EBOOK.primary,
              border: `1px solid ${EBOOK.primary}30`,
              borderRadius: '4px',
              background: 'transparent',
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {lang === 'vi' ? 'EN' : 'VN'}
          </button>
        </div>
      </div>
    </header>
  );

  // ═══ SEARCH OVERLAY ═══
  const SearchOverlay = () => (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh]"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
          onClick={() => { setSearchOpen(false); setSearchQuery(''); setSearchResults([]); }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            className="w-full max-w-xl mx-4 overflow-hidden"
            style={{ backgroundColor: EBOOK.card, borderRadius: '12px', boxShadow: '0 25px 50px rgba(0,0,0,0.15)', border: `1px solid ${EBOOK.border}` }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: `1px solid ${EBOOK.border}` }}>
              <Search size={18} style={{ color: EBOOK.fgMuted }} />
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={e => handleSearch(e.target.value)}
                placeholder="Tìm kiếm nội dung, từ khóa..."
                className="flex-1 text-base outline-none"
                style={{ background: 'transparent', color: EBOOK.fg, fontFamily: "'Be Vietnam Pro', sans-serif", border: 'none' }}
              />
              <button onClick={() => { setSearchOpen(false); setSearchQuery(''); setSearchResults([]); }} style={{ background: 'none', border: 'none' }}>
                <X size={18} style={{ color: EBOOK.fgMuted }} />
              </button>
            </div>

            {searchQuery.trim().length >= 2 && (
              <div style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                {searchResults.length > 0 ? (
                  <ul style={{ listStyle: 'none', padding: '8px 0', margin: 0 }}>
                    {searchResults.map(ch => (
                      <li key={ch.id}>
                        <button
                          onClick={() => goToChapter(ch.id)}
                          className="w-full text-left px-5 py-3 transition-colors"
                          style={{ background: 'none', border: 'none', fontFamily: "'Be Vietnam Pro', sans-serif" }}
                          onMouseEnter={e => (e.currentTarget.style.backgroundColor = EBOOK.borderLight)}
                          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                        >
                          <div className="text-xs font-medium mb-1" style={{ color: EBOOK.fgMuted }}>Chương {ch.number}</div>
                          <div className="text-sm font-semibold" style={{ color: EBOOK.fg }}>{ch.title}</div>
                          <div className="text-xs mt-1" style={{ color: EBOOK.fgMuted }}>{ch.subtitle}</div>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-5 py-8 text-center text-sm" style={{ color: EBOOK.fgMuted }}>
                    Không tìm thấy kết quả cho "{searchQuery}"
                  </div>
                )}
              </div>
            )}

            {searchQuery.trim().length < 2 && (
              <div className="px-5 py-6 text-center text-sm" style={{ color: EBOOK.fgDim }}>
                Nhập ít nhất 2 ký tự để tìm kiếm
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // ═══ TABLE OF CONTENTS VIEW ═══
  const TOCView = () => (
    <>
      {/* Hero */}
      <section className="relative min-h-[80vh] md:min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="GAME OF ECOM" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.88), rgba(0,0,0,0.65), rgba(0,0,0,0.3))' }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, rgba(0,0,0,0.35), transparent, ${EBOOK.bg})` }} />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <p className="text-xs md:text-sm font-semibold tracking-[0.25em] uppercase mb-4 md:mb-6" style={{ color: 'rgba(94,234,212,0.9)', fontFamily: "'Space Grotesk', sans-serif" }}>
              Tự truyện &middot; From Vietnam Go Global
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-4 md:mb-6" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
              GAME OF<br />
              <span style={{ color: '#5eead4' }}>ECOM</span>
            </h1>
            <p className="text-lg md:text-xl leading-relaxed mb-8 md:mb-10 max-w-lg" style={{ color: 'rgba(255,255,255,0.8)', fontFamily: "'Be Vietnam Pro', sans-serif" }}>
              Câu chuyện thật, cảm xúc thật, con người thật — hành trình từ tiệm tạp hóa nhỏ đến hệ sinh thái Human x AI của một người không bao giờ ngừng tin.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => goToChapter('ch-1')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold transition-colors"
                style={{ backgroundColor: 'white', color: EBOOK.fg, borderRadius: '9999px', border: 'none', fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Bắt đầu đọc <ArrowRight size={16} />
              </button>
              <button
                onClick={() => document.getElementById('toc')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold transition-colors"
                style={{ backgroundColor: 'transparent', color: 'white', borderRadius: '9999px', border: '1px solid rgba(255,255,255,0.3)', fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Mục lục
              </button>
            </div>
          </motion.div>
        </div>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown size={24} style={{ color: 'rgba(255,255,255,0.5)' }} />
        </motion.div>
      </section>

      {/* Prologue */}
      <section className="py-16 md:py-24 scroll-mt-16" style={{ backgroundColor: EBOOK.bg }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-4 mb-8">
              <img src={HAI_VN_PORTRAIT} alt="Hải VN" className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover" style={{ border: `2px solid ${EBOOK.primary}30` }} />
              <div>
                <p className="text-base md:text-lg font-bold" style={{ color: EBOOK.fg, fontFamily: "'Be Vietnam Pro', sans-serif" }}>Hải VN</p>
                <p className="text-xs" style={{ color: EBOOK.fgMuted, fontFamily: "'Space Grotesk', sans-serif" }}>Founder DeMAN AI LAB &middot; Oniiz &middot; V2Joy</p>
              </div>
            </div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-6" style={{ color: EBOOK.fgDim, fontFamily: "'Space Grotesk', sans-serif" }}>Lời mở đầu</p>
            <div style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
              {bookData.prologue.split('\n\n').map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="leading-relaxed mb-5"
                  style={{
                    color: `${EBOOK.fg}d9`,
                    fontSize: i === 0 ? '1.125rem' : '0.9375rem',
                    fontWeight: i === 0 ? 500 : 400,
                  }}
                >
                  {para}
                </motion.p>
              ))}
            </div>
            <div className="mt-8 pt-6" style={{ borderTop: `1px solid ${EBOOK.border}60` }}>
              <p className="text-sm font-semibold italic" style={{ color: `${EBOOK.fg}b3`, fontFamily: "'Be Vietnam Pro', sans-serif" }}>— {bookData.author}</p>
              <p className="text-xs mt-1" style={{ color: EBOOK.fgMuted, fontFamily: "'Space Grotesk', sans-serif" }}>{bookData.authorNote}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3 Value Layers */}
      <section className="py-12 md:py-16" style={{ backgroundColor: `${EBOOK.primary}08`, borderTop: `1px solid ${EBOOK.border}50`, borderBottom: `1px solid ${EBOOK.border}50` }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-center mb-8" style={{ color: EBOOK.fgDim, fontFamily: "'Space Grotesk', sans-serif" }}>
            Mỗi chương được kể qua 3 tầng giá trị
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { icon: BookOpen, title: 'Kiến Thức', desc: 'Bài học chuyên sâu từ thực chiến — không lý thuyết suông', color: '#0d9488', bg: 'rgba(13,148,136,0.08)' },
              { icon: Lightbulb, title: 'Thông Tin', desc: 'Câu chuyện hậu trường, con số thật, quyết định ngược đời', color: '#d97706', bg: 'rgba(217,119,6,0.08)' },
              { icon: Heart, title: 'Cảm Xúc', desc: 'Những khoảnh khắc chạm đến trái tim — vì mình cũng từng như bạn', color: '#e11d48', bg: 'rgba(225,29,72,0.08)' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="p-5"
                style={{ backgroundColor: item.bg, borderLeft: `4px solid ${item.color}`, borderRadius: '0 8px 8px 0' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <item.icon size={18} style={{ color: item.color }} />
                  <h3 className="text-base font-bold" style={{ color: EBOOK.fg, fontFamily: "'Be Vietnam Pro', sans-serif" }}>{item.title}</h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: EBOOK.fgMuted, fontFamily: "'Be Vietnam Pro', sans-serif" }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section id="toc" className="py-16 md:py-24 scroll-mt-16" style={{ backgroundColor: EBOOK.bg }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: EBOOK.fgDim, fontFamily: "'Space Grotesk', sans-serif" }}>Hành trình</p>
            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: EBOOK.fg, fontFamily: "'Be Vietnam Pro', sans-serif" }}>16 chương. 5 phần. Một cuộc đời.</h2>
            <p className="text-xs mb-1" style={{ color: EBOOK.fgDim, fontFamily: "'Space Grotesk', sans-serif" }}>Thời gian đọc ước tính: ~2 giờ 40 phút</p>
            <p className="leading-relaxed mb-12" style={{ color: EBOOK.fgMuted, fontFamily: "'Be Vietnam Pro', sans-serif" }}>
              Mỗi chương là một điểm chạm trên hành trình từ tiệm tạp hóa nhỏ đến hệ sinh thái Human x AI.
            </p>
          </motion.div>

          <div className="space-y-12">
            {bookData.parts.map((part, pi) => (
              <motion.div
                key={part.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: pi * 0.08, duration: 0.5 }}
              >
                {/* Part Header */}
                <div className="relative overflow-hidden mb-5" style={{ borderRadius: '12px' }}>
                  <img src={part.image} alt={part.title} className="w-full h-32 md:h-40 object-cover" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.75), rgba(0,0,0,0.5), transparent)' }} />
                  <div className="absolute inset-0 flex items-center px-6 md:px-8">
                    <div>
                      <p className="text-[10px] font-bold tracking-[0.25em] uppercase mb-1" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'Space Grotesk', sans-serif" }}>Phần {part.number}</p>
                      <h3 className="text-xl md:text-2xl font-bold text-white leading-tight" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>{part.title}</h3>
                      <p className="text-sm italic mt-1" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: "'Be Vietnam Pro', sans-serif" }}>{part.subtitle}</p>
                    </div>
                  </div>
                </div>

                {/* Chapters — Timeline */}
                <div className="relative pl-6 md:pl-8">
                  <div className="absolute left-[11px] md:left-[15px] top-0 bottom-0 w-[2px]" style={{ backgroundColor: `${part.color}30` }} />
                  <div className="space-y-3">
                    {part.chapters.map((ch, ci) => (
                      <button
                        key={ch.id}
                        onClick={() => goToChapter(ch.id)}
                        className="block w-full text-left no-underline group"
                        style={{ background: 'none', border: 'none', padding: 0 }}
                      >
                        <motion.div
                          initial={{ opacity: 0, x: -15 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: ci * 0.06 }}
                          className="relative"
                        >
                          <div
                            className="absolute -left-6 md:-left-8 top-4 w-[10px] h-[10px] md:w-[12px] md:h-[12px] rounded-full transition-transform"
                            style={{ borderColor: part.color, border: '2px solid', backgroundColor: EBOOK.bg }}
                          />
                          <div
                            className="p-4 md:p-5 transition-all duration-300"
                            style={{ backgroundColor: EBOOK.card, border: `1px solid ${EBOOK.border}80`, borderRadius: '8px' }}
                            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'; e.currentTarget.style.borderColor = EBOOK.border; }}
                            onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = `${EBOOK.border}80`; }}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1.5">
                                  <span className="text-lg md:text-xl font-bold leading-none" style={{ color: part.color, fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                                    {String(ch.number).padStart(2, '0')}
                                  </span>
                                  <span className="text-[10px] font-medium tracking-wider uppercase" style={{ color: EBOOK.fgDim, fontFamily: "'Space Grotesk', sans-serif" }}>
                                    Chương
                                  </span>
                                </div>
                                <h4 className="text-base md:text-lg font-semibold leading-snug transition-colors" style={{ color: EBOOK.fg, fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                                  {ch.title}
                                </h4>
                                <p className="text-sm leading-relaxed mt-1.5" style={{ color: EBOOK.fgMuted, fontFamily: "'Be Vietnam Pro', sans-serif", display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                  {ch.subtitle}
                                </p>
                              </div>
                              <ArrowRight size={16} className="shrink-0 mt-2 transition-all" style={{ color: `${EBOOK.fgMuted}50` }} />
                            </div>
                          </div>
                        </motion.div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Epilogue Preview */}
      <section className="py-16 md:py-24 text-center" style={{ backgroundColor: `${EBOOK.primary}08`, borderTop: `1px solid ${EBOOK.border}50` }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-6" style={{ color: EBOOK.fgDim, fontFamily: "'Space Grotesk', sans-serif" }}>Lời kết</p>
            <blockquote className="text-xl md:text-2xl font-medium italic leading-relaxed mb-6" style={{ color: `${EBOOK.fg}cc`, fontFamily: "'Be Vietnam Pro', sans-serif" }}>
              "Bạn cứ chăm chỉ, cứ chân thành, cứ tích cực — rồi mọi thứ sẽ ổn."
            </blockquote>
            <p className="text-sm" style={{ color: EBOOK.fgMuted, fontFamily: "'Be Vietnam Pro', sans-serif" }}>— Hải VN</p>
            <div className="mt-8">
              <button
                onClick={() => goToChapter('ch-1')}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-colors"
                style={{ backgroundColor: EBOOK.primary, borderRadius: '9999px', border: 'none', fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Bắt đầu từ Chương 1 <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );

  // ═══ CHAPTER VIEW ═══
  const ChapterView = () => {
    if (!currentChapter || !currentPart) return null;

    return (
      <>
        {/* Chapter Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img src={currentPart.image} alt={currentPart.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, rgba(0,0,0,0.65), rgba(0,0,0,0.5), ${EBOOK.bg})` }} />
          </div>
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-16 md:py-24 lg:py-28">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <button
                onClick={goHome}
                className="inline-flex items-center gap-1.5 text-xs mb-6 transition-colors"
                style={{ color: 'rgba(255,255,255,0.6)', background: 'none', border: 'none', fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <ArrowLeft size={14} /> Mục lục
              </button>
              <div className="flex items-center gap-2 mb-3">
                <p className="text-[10px] font-bold tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Space Grotesk', sans-serif" }}>
                  Phần {currentPart.number} &middot; {currentPart.title}
                </p>
              </div>
              <div className="flex items-baseline gap-3 md:gap-4 mb-4">
                <span className="text-5xl md:text-6xl font-bold leading-none opacity-80" style={{ color: currentPart.color, fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                  {String(currentChapter.number).padStart(2, '0')}
                </span>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                  {currentChapter.title}
                </h1>
              </div>
              <p className="text-base md:text-lg italic max-w-xl" style={{ color: 'rgba(255,255,255,0.65)', fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                {currentChapter.subtitle}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <article className="max-w-2xl mx-auto px-4 sm:px-6 py-10 md:py-16" ref={contentRef} style={{ backgroundColor: EBOOK.bg }}>
          {/* Author mini card */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.4 }} className="flex items-center gap-3 mb-8 md:mb-10">
            <img src={HAI_VN_PORTRAIT} alt="Hải VN" className="w-10 h-10 rounded-full object-cover" style={{ border: `1px solid ${EBOOK.border}80` }} />
            <div>
              <p className="text-sm font-semibold leading-tight" style={{ color: EBOOK.fg, fontFamily: "'Be Vietnam Pro', sans-serif" }}>Hải VN</p>
              <p className="text-[10px]" style={{ color: EBOOK.fgMuted, fontFamily: "'Space Grotesk', sans-serif" }}>Founder DeMAN AI LAB</p>
            </div>
          </motion.div>

          {/* Opening Quote */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="mb-10 md:mb-14">
            <div className="relative pl-6 md:pl-8" style={{ borderLeft: `3px solid ${currentPart.color}` }}>
              <Quote size={24} className="absolute -left-3 -top-1" style={{ color: currentPart.color, backgroundColor: EBOOK.bg }} />
              <blockquote className="text-lg md:text-xl font-medium italic leading-relaxed" style={{ color: `${EBOOK.fg}cc`, fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                {currentChapter.openingQuote}
              </blockquote>
            </div>
          </motion.div>

          {/* Sections */}
          <div className="space-y-10 md:space-y-14">
            {currentChapter.sections.map((section, si) => {
              const sType = sectionTypeLabel[section.type] || sectionTypeLabel.story;
              return (
                <motion.div
                  key={si}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-base">{sType.emoji}</span>
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: EBOOK.fgDim, fontFamily: "'Space Grotesk', sans-serif" }}>
                      {sType.label}
                    </span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold mb-4 leading-snug" style={{ color: EBOOK.fg, fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                    {section.title}
                  </h2>
                  <div className="ebook-page">
                    <div className="prose-chapter" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                      {section.content.split('\n\n').map((para, pi) => (
                        <p key={pi} style={{ color: `${EBOOK.fg}d9`, lineHeight: 1.85, marginBottom: '1.25rem', fontSize: '0.9375rem' }}>
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Divider */}
          <div className="my-12 md:my-16 flex items-center gap-4">
            <div className="flex-1 h-px" style={{ backgroundColor: `${EBOOK.border}80` }} />
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase" style={{ color: EBOOK.fgDim, fontFamily: "'Space Grotesk', sans-serif" }}>Đúc kết</span>
            <div className="flex-1 h-px" style={{ backgroundColor: `${EBOOK.border}80` }} />
          </div>

          {/* Takeaways */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4 mb-10">
            <h3 className="text-lg md:text-xl font-bold mb-6" style={{ color: EBOOK.fg, fontFamily: "'Be Vietnam Pro', sans-serif" }}>Ba Tầng Giá Trị</h3>
            {currentChapter.takeaways.map((takeaway, ti) => {
              const meta = layerMeta[takeaway.layer];
              const Icon = meta.icon;
              return (
                <motion.div
                  key={ti}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: ti * 0.1 }}
                  className="p-4 md:p-5"
                  style={{ borderLeft: `4px solid ${meta.borderColor}`, backgroundColor: meta.bg, borderRadius: '0 8px 8px 0' }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon size={16} style={{ color: meta.color }} />
                    <span className="text-xs font-bold" style={{ color: meta.color, fontFamily: "'Space Grotesk', sans-serif" }}>{meta.title}</span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: `${EBOOK.fg}cc`, fontFamily: "'Be Vietnam Pro', sans-serif" }}>{takeaway.text}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Closing Line */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-12 md:mb-16 text-center py-8">
            <div className="inline-block max-w-lg">
              <p className="text-lg md:text-xl font-medium italic leading-relaxed" style={{ color: `${EBOOK.fg}b3`, fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                "{currentChapter.closingLine}"
              </p>
              <div className="w-12 h-[2px] mx-auto mt-4" style={{ backgroundColor: currentPart.color }} />
            </div>
          </motion.div>

          {/* Chapter Navigation */}
          <div className="flex flex-col sm:flex-row gap-3">
            {prevChapter ? (
              <button
                onClick={() => goToChapter(prevChapter.id)}
                className="flex-1 p-4 text-left transition-all"
                style={{ backgroundColor: EBOOK.card, border: `1px solid ${EBOOK.border}80`, borderRadius: '12px' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase mb-1.5" style={{ color: EBOOK.fgDim, fontFamily: "'Space Grotesk', sans-serif" }}>
                  <ArrowLeft size={12} /> Chương trước
                </div>
                <div className="text-sm font-semibold leading-snug" style={{ color: EBOOK.fg, fontFamily: "'Be Vietnam Pro', sans-serif" }}>{prevChapter.title}</div>
              </button>
            ) : (
              <button
                onClick={goHome}
                className="flex-1 p-4 text-left transition-all"
                style={{ backgroundColor: EBOOK.card, border: `1px solid ${EBOOK.border}80`, borderRadius: '12px' }}
              >
                <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase mb-1.5" style={{ color: EBOOK.fgDim, fontFamily: "'Space Grotesk', sans-serif" }}>
                  <ArrowLeft size={12} /> Trang chủ
                </div>
                <div className="text-sm font-semibold leading-snug" style={{ color: EBOOK.fg, fontFamily: "'Be Vietnam Pro', sans-serif" }}>Quay về mục lục</div>
              </button>
            )}
            {nextChapter ? (
              <button
                onClick={() => goToChapter(nextChapter.id)}
                className="flex-1 p-4 text-right transition-all"
                style={{ backgroundColor: EBOOK.card, border: `1px solid ${EBOOK.border}80`, borderRadius: '12px' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div className="flex items-center justify-end gap-1.5 text-[10px] font-bold tracking-wider uppercase mb-1.5" style={{ color: EBOOK.fgDim, fontFamily: "'Space Grotesk', sans-serif" }}>
                  Chương tiếp <ArrowRight size={12} />
                </div>
                <div className="text-sm font-semibold leading-snug" style={{ color: EBOOK.fg, fontFamily: "'Be Vietnam Pro', sans-serif" }}>{nextChapter.title}</div>
              </button>
            ) : (
              <button
                onClick={goHome}
                className="flex-1 p-4 text-right transition-all"
                style={{ backgroundColor: EBOOK.card, border: `1px solid ${EBOOK.border}80`, borderRadius: '12px' }}
              >
                <div className="flex items-center justify-end gap-1.5 text-[10px] font-bold tracking-wider uppercase mb-1.5" style={{ color: EBOOK.fgDim, fontFamily: "'Space Grotesk', sans-serif" }}>
                  Hoàn thành <ArrowRight size={12} />
                </div>
                <div className="text-sm font-semibold leading-snug" style={{ color: EBOOK.fg, fontFamily: "'Be Vietnam Pro', sans-serif" }}>Quay về trang chủ</div>
              </button>
            )}
          </div>
        </article>
      </>
    );
  };

  // ═══ FOOTER ═══
  const Footer = () => (
    <footer className="py-8" style={{ borderTop: `1px solid ${EBOOK.border}60`, backgroundColor: EBOOK.bg }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-xs" style={{ color: EBOOK.fgMuted, fontFamily: "'Space Grotesk', sans-serif" }}>
          GAME OF ECOM &middot; Câu chuyện thật của Vũ Ngọc Hải (Hải VN) &middot;{' '}
          <a href="/" className="no-underline transition-colors" style={{ color: EBOOK.primary }}>DeMAN AI LAB</a>
        </p>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen ebook-page" style={{ backgroundColor: EBOOK.bg, color: EBOOK.fg }}>
      <Header />
      <SearchOverlay />

      {activeChapter ? <ChapterView /> : <TOCView />}

      <Footer />

      {/* Scroll to top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            style={{ backgroundColor: EBOOK.card, border: `1px solid ${EBOOK.border}`, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          >
            <ChevronUp size={20} style={{ color: EBOOK.fg }} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * DEMAN AI LAB — Main Homepage
 * Design: "The Architect's Blueprint" — Dark Luxury Minimalism
 * Tone: Authentic storytelling (gameofecom style) — first person, humble, real
 * Bilingual: VN/EN toggle
 * Data: Restructured from real Google Drive data — 8+ programs, 11+ frameworks
 */
import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Brain, Zap, BarChart3, Users, ChevronRight, ExternalLink, Layers, Cpu, MessageSquare, TrendingUp, CheckCircle2, ArrowUpRight, Globe, ShoppingCart, Star, Rocket, BookOpen, Palette, Bitcoin, Package, Megaphone, GraduationCap, Play, FileText, Headphones, Image, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// ═══ CDN Image URLs ═══
const IMAGES = {
  hero: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/demanlab-hero-njb9haQUKrzJT8CzCXjQfQ.webp',
  about: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/demanlab-about-VTRTuSp7AyYsuCBZWw8CXN.webp',
  services: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/demanlab-services-euH6NUowesCcTH57W2UT4W.webp',
  ecosystem: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/demanlab-ecosystem-LXARB7sh7bBmvKfhb7nTCX.webp',
  cta: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/demanlab-cta-RCFmWLmqeXUkURSnPsT6w2.webp',
  avatar: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/haivn-avatar_be7140ce.png',
};

// ═══ Brand Colors ═══
const C = {
  gold: '#D4A853',
  goldLight: '#E8C068',
  goldDark: '#B8860B',
  charcoal: '#0A0A0A',
  surface: '#141414',
  surfaceLight: '#1A1A1A',
  white: '#F5F5F0',
  whiteMuted: 'rgba(245, 245, 240, 0.6)',
  whiteDim: 'rgba(245, 245, 240, 0.35)',
  goldAlpha: (a: number) => `rgba(212, 168, 83, ${a})`,
  whiteAlpha: (a: number) => `rgba(245, 245, 240, ${a})`,
};

// ═══ Reusable Components ═══
function FadeInSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

function GoldDivider() {
  return <div className="gold-line w-full my-0" />;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <span className="font-display font-semibold text-xs tracking-[0.25em] uppercase block mb-5" style={{ color: C.gold }}>{children}</span>;
}

// ═══ NAVBAR ═══
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { lang, toggleLang, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: t('Dịch vụ', 'Services'), href: '#services' },
    { label: t('Chương trình', 'Programs'), href: '#programs' },
    { label: t('Dự án', 'Projects'), href: '#cases' },
    { label: t('Về mình', 'About'), href: '#about' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{ backgroundColor: scrolled ? `${C.charcoal}ee` : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none', borderBottom: scrolled ? `1px solid ${C.whiteAlpha(0.06)}` : 'none' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm flex items-center justify-center" style={{ border: `1px solid ${C.goldAlpha(0.4)}` }}>
            <span className="font-display font-bold text-xs" style={{ color: C.gold }}>D</span>
          </div>
          <span className="font-display font-semibold text-sm tracking-wide" style={{ color: C.white }}>DEMAN AI LAB</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} className="text-xs font-medium tracking-wider uppercase transition-colors duration-300" style={{ color: C.whiteDim }} onMouseEnter={e => (e.currentTarget.style.color = C.gold)} onMouseLeave={e => (e.currentTarget.style.color = C.whiteDim)}>
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button onClick={toggleLang} className="text-xs font-display font-semibold tracking-wider px-3 py-1.5 transition-all duration-300" style={{ color: C.gold, border: `1px solid ${C.goldAlpha(0.3)}`, borderRadius: '2px' }}>
            {lang === 'vi' ? 'EN' : 'VN'}
          </button>
          <a href="#contact" className="hidden sm:inline-flex items-center gap-2 px-5 py-2 font-display font-semibold text-xs tracking-wider transition-all duration-300" style={{ color: C.charcoal, backgroundColor: C.gold, borderRadius: '2px' }}>
            {t('Liên hệ', 'Contact')}
          </a>
        </div>
      </div>
    </motion.nav>
  );
}

// ═══ HERO SECTION ═══
function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={IMAGES.hero} alt="" className="w-full h-full object-cover opacity-[0.25]" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${C.charcoal} 0%, ${C.charcoal}dd 40%, ${C.charcoal}bb 100%)` }} />
      </div>

      <motion.div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1 max-w-[40px]" style={{ backgroundColor: C.gold }} />
            <span className="font-display font-semibold text-xs tracking-[0.3em] uppercase" style={{ color: C.gold }}>DEMAN AI LAB</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }} className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-8" style={{ color: C.white }}>
            {t('Biến AI thành', 'Turn AI into')}
            <br />
            <span className="gradient-text-gold">{t('đồng đội thật.', 'your real teammate.')}</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }} className="text-lg md:text-xl leading-relaxed max-w-xl mb-10" style={{ color: C.whiteMuted }}>
            {t(
              'Mình là Hải. Mình giúp doanh nghiệp & solopreneurs biến AI thành đồng đội vận hành thật — làm ít hơn, nghĩ thông minh hơn, scale bền vững hơn.',
              "I'm Hai. I help businesses & solopreneurs turn AI into real operating teammates — to do less, think smarter, and scale sustainably."
            )}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.6 }} className="flex flex-wrap gap-4">
            <a href="#services" className="inline-flex items-center gap-2 px-8 py-4 font-display font-semibold text-base transition-all duration-300" style={{ color: C.charcoal, backgroundColor: C.gold, borderRadius: '2px' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.goldLight; e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = C.gold; e.currentTarget.style.transform = 'translateY(0)'; }}>
              {t('Khám phá dịch vụ', 'Explore Services')} <ArrowRight size={16} />
            </a>
            <a href="#programs" className="inline-flex items-center gap-2 px-8 py-4 font-display font-semibold text-base transition-all duration-300" style={{ color: C.white, border: `1px solid ${C.whiteAlpha(0.2)}`, borderRadius: '2px' }} onMouseEnter={e => { e.currentTarget.style.borderColor = C.goldAlpha(0.5); e.currentTarget.style.color = C.gold; }} onMouseLeave={e => { e.currentTarget.style.borderColor = C.whiteAlpha(0.2); e.currentTarget.style.color = C.white; }}>
              {t('Xem chương trình đào tạo', 'View Training Programs')}
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }} className="flex flex-wrap gap-12 mt-20 pt-8" style={{ borderTop: `1px solid ${C.whiteAlpha(0.08)}` }}>
            {[
              { num: '11+', label: t('Chương trình đã triển khai', 'Programs Delivered') },
              { num: '6+', label: t('Thương hiệu vận hành', 'Brands Operated') },
              { num: '3M+', label: t('Sản phẩm đã bán', 'Products Sold') },
              { num: '8+', label: t('Framework độc quyền', 'Proprietary Frameworks') },
            ].map((stat, i) => (
              <div key={i}>
                <div className="font-display font-bold text-2xl md:text-3xl" style={{ color: C.gold }}>{stat.num}</div>
                <div className="text-xs tracking-wider uppercase mt-1" style={{ color: C.whiteDim }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
        <div className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5" style={{ border: `1px solid ${C.goldAlpha(0.3)}` }}>
          <div className="w-1 h-2 rounded-full" style={{ backgroundColor: C.gold }} />
        </div>
      </motion.div>
    </section>
  );
}

// ═══ PHILOSOPHY SECTION ═══
function PhilosophySection() {
  const { t } = useLanguage();

  return (
    <section className="relative py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeInSection className="max-w-4xl mx-auto text-center">
          <SectionLabel>{t('Triết lý', 'Philosophy')}</SectionLabel>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-8" style={{ color: C.white }}>
            {t('AI không thay thế con người.', "AI doesn't replace humans.")}
            <br />
            <span className="gradient-text-gold">{t('AI khuếch đại con người.', 'AI amplifies humans.')}</span>
          </h2>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: C.whiteMuted }}>
            {t(
              'Mình tin rằng AI giống như một người đồng đội — không phải thay bạn, mà gánh phần việc lặp, giải phóng năng lượng sáng tạo, để bạn tập trung vào điều thật sự quan trọng. "Đức năng thắng số" — cứ chăm chỉ, cứ chân thành, rồi mọi thứ sẽ ổn.',
              "I believe AI is like a teammate — not replacing you, but carrying the repetitive work, freeing your creative energy, so you can focus on what truly matters."
            )}
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-20">
          {[
            { icon: Brain, title: 'Clone Your Mind™', desc: t('Nhân bản tư duy, giọng điệu, quy trình ra quyết định thành tài sản AI.', 'Clone your thinking, voice, and decision-making into AI assets.') },
            { icon: Layers, title: 'AI-First Thinking', desc: t('Đặt AI làm trung tâm mọi quyết định — từ chiến lược đến thực thi.', 'Put AI at the center of every decision — from strategy to execution.') },
            { icon: Zap, title: 'Affiliate Engine™', desc: t('Hệ thống affiliate tự động — AI tìm sản phẩm, viết content, tối ưu.', 'Automated affiliate system — AI finds products, writes content, optimizes.') },
            { icon: TrendingUp, title: 'AI Architecture Playbook', desc: t('Playbook kiến trúc hệ thống AI hoàn chỉnh cho doanh nghiệp.', 'Complete AI system architecture playbook for businesses.') },
          ].map((item, i) => (
            <FadeInSection key={i} delay={i * 0.1}>
              <div className="p-7 h-full transition-all duration-500 group" style={{ backgroundColor: C.whiteAlpha(0.02), border: `1px solid ${C.whiteAlpha(0.05)}`, borderRadius: '4px' }} onMouseEnter={e => { e.currentTarget.style.borderColor = C.goldAlpha(0.2); e.currentTarget.style.backgroundColor = C.whiteAlpha(0.04); }} onMouseLeave={e => { e.currentTarget.style.borderColor = C.whiteAlpha(0.05); e.currentTarget.style.backgroundColor = C.whiteAlpha(0.02); }}>
                <item.icon size={24} style={{ color: C.gold }} className="mb-5" />
                <h3 className="font-display font-semibold text-base mb-3" style={{ color: C.white }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: C.whiteMuted }}>{item.desc}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══ SERVICES SECTION ═══
function ServicesSection() {
  const { t } = useLanguage();

  const services = [
    {
      icon: Cpu, title: t('AI System Architecture', 'AI System Architecture'),
      desc: t('Thiết kế & triển khai hệ thống AI hoàn chỉnh cho doanh nghiệp — từ SOP, workflow, CRM đến báo cáo tự động. Không lý thuyết, toàn bộ từ kinh nghiệm thực chiến.', 'Design & deploy complete AI systems for businesses — from SOP, workflow, CRM to automated reporting. No theory, all from real battle experience.'),
      tags: ['Architecture', 'SOP', 'Workflow'],
    },
    {
      icon: Zap, title: t('AI Content Factory', 'AI Content Factory'),
      desc: t('Xây dựng "Nhà Máy Content Vô Hạn" bằng AI — viết, thiết kế, lên lịch, phân tích, chạy 24/7. Mình đã dùng hệ thống này cho chính 6+ thương hiệu của mình.', 'Build an "Infinite Content Factory" with AI — write, design, schedule, analyze, running 24/7. I use this for my own 6+ brands.'),
      tags: ['Content', 'Automation', 'AI Agents'],
    },
    {
      icon: BarChart3, title: t('Performance Marketing x AI', 'Performance Marketing x AI'),
      desc: t('Tối ưu quảng cáo, funnel, và pipeline bằng AI — từ Facebook Ads đến Shopee Ads. Mỗi đồng chi ra đều được đo lường và tối ưu tự động.', 'Optimize ads, funnels, and pipelines with AI — from Facebook Ads to Shopee Ads. Every dollar spent is measured and auto-optimized.'),
      tags: ['Ads', 'Funnel', 'Analytics'],
    },
    {
      icon: Globe, title: t('Affiliate Engine x AI', 'Affiliate Engine x AI'),
      desc: t('Hệ thống affiliate tự động: AI tìm sản phẩm hot, viết content, tối ưu link, tracking doanh thu. Mô hình kiếm tiền mới cho kỷ nguyên AI.', 'Automated affiliate system: AI finds hot products, writes content, optimizes links, tracks revenue. New money-making model for the AI era.'),
      tags: ['Affiliate', 'Passive Income', 'AI'],
    },
    {
      icon: Palette, title: t('Creative AI — ZDES.AI', 'Creative AI — ZDES.AI'),
      desc: t('Biến designer thành nghệ sĩ nhờ AI. Lộ trình Visual Storyteller — từ "Thợ Thiết Kế" đến "Chủ Cuộc Chơi" trong kỷ nguyên AI.', 'Transform designers into artists with AI. Visual Storyteller pathway — from "Design Worker" to "Game Master" in the AI era.'),
      tags: ['Design', 'Visual', 'Storytelling'],
    },
    {
      icon: Users, title: t('1-on-1 Mentoring & Consulting', '1-on-1 Mentoring & Consulting'),
      desc: t('Mentor trực tiếp cho founders & leaders — khảo sát, tư vấn chiến lược, khởi tạo mô hình kinh doanh. "Cho là nhận" — mình luôn sẵn sàng chia sẻ.', 'Direct mentoring for founders & leaders — survey, strategic consulting, business model initiation. "Giving is receiving."'),
      tags: ['Mentoring', '1-on-1', 'Strategy'],
    },
  ];

  return (
    <section id="services" className="relative py-28 md:py-36">
      <div className="absolute inset-0">
        <img src={IMAGES.services} alt="" className="w-full h-full object-cover opacity-[0.06]" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${C.charcoal}, ${C.charcoal}ee 30%, ${C.charcoal}ee 70%, ${C.charcoal})` }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <FadeInSection>
          <SectionLabel>{t('Dịch vụ', 'Services')}</SectionLabel>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6" style={{ color: C.white }}>
            {t('Từ chiến lược đến', 'From strategy to')}
            <span className="gradient-text-gold"> {t('thực thi.', 'execution.')}</span>
          </h2>
          <p className="text-lg max-w-2xl mb-16" style={{ color: C.whiteMuted }}>
            {t(
              'Mỗi dịch vụ đều sinh ra từ bài toán thực tế mà mình đã phải giải — không phải từ sách giáo khoa. 6 trụ cột, 1 hệ sinh thái hoàn chỉnh.',
              'Every service was born from real problems I had to solve — not from textbooks. 6 pillars, 1 complete ecosystem.'
            )}
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((svc, i) => (
            <FadeInSection key={i} delay={i * 0.08}>
              <div className="p-8 h-full transition-all duration-500 group relative overflow-hidden" style={{ backgroundColor: C.whiteAlpha(0.02), border: `1px solid ${C.whiteAlpha(0.06)}`, borderRadius: '4px' }} onMouseEnter={e => { e.currentTarget.style.borderColor = C.goldAlpha(0.25); }} onMouseLeave={e => { e.currentTarget.style.borderColor = C.whiteAlpha(0.06); }}>
                <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle at top right, ${C.goldAlpha(0.08)}, transparent)` }} />
                <svc.icon size={28} style={{ color: C.gold }} className="mb-5" />
                <h3 className="font-display font-semibold text-lg mb-3" style={{ color: C.white }}>{svc.title}</h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: C.whiteMuted }}>{svc.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {svc.tags.map(tag => (
                    <span key={tag} className="text-xs px-3 py-1 font-medium" style={{ color: C.gold, backgroundColor: C.goldAlpha(0.08), borderRadius: '2px' }}>{tag}</span>
                  ))}
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══ PROGRAMS SECTION ═══
function ProgramsSection() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);

  const programs = [
    {
      icon: Bitcoin, name: 'AI for Crypto', sessions: t('5 buổi chuyên sâu', '5 intensive sessions'), status: t('Hoàn thành', 'Completed'),
      desc: t('Ứng dụng AI vào hệ sinh thái Crypto — từ sản xuất content hàng loạt, xây dựng đội ngũ AI, đến quản trị mục tiêu theo Work-Life Integration.', 'Apply AI to the Crypto ecosystem — from mass content production, building AI teams, to goal management with Work-Life Integration.'),
      deliverables: [t('AI Architecture Playbook', 'AI Architecture Playbook'), t('Commanding Your AI Workforce', 'Commanding Your AI Workforce'), t('CABIS Framework', 'CABIS Framework'), t('Video dài + PDF + Mind Maps', 'Long videos + PDFs + Mind Maps')],
      color: '#F59E0B',
    },
    {
      icon: ShoppingCart, name: 'AI for Affiliate', sessions: t('4 buổi + Workshop', '4 sessions + Workshop'), status: t('Hoàn thành', 'Completed'),
      desc: t('Super Affiliate x AI — xây dựng hệ thống kiếm tiền tự động bằng AI. Từ tư duy AI-First đến Affiliate Engine™ hoàn chỉnh.', 'Super Affiliate x AI — build automated money-making systems with AI. From AI-First thinking to complete Affiliate Engine™.'),
      deliverables: [t('Tư Duy AI-First & Affiliate Engine™', 'AI-First Thinking & Affiliate Engine™'), t('Case study: Nội thất 369', 'Case study: Noi That 369'), t('Mô hình Tỷ Đồng E-commerce AI', 'Billion-dollar AI E-commerce Model'), t('Sổ Tay Affiliate x AI', 'Affiliate x AI Handbook')],
      color: '#10B981',
    },
    {
      icon: Package, name: 'AI for Dropship', sessions: t('4 buổi', '4 sessions'), status: t('Hoàn thành', 'Completed'),
      desc: t('Mô hình dropship kết hợp AI — tìm sản phẩm, tạo listing, chạy ads, chăm sóc khách hàng tự động.', 'AI-powered dropship model — find products, create listings, run ads, automate customer care.'),
      deliverables: [t('Hệ thống dropship AI', 'AI Dropship System'), t('Tự động hóa listing', 'Automated Listing'), t('AI Customer Care', 'AI Customer Care')],
      color: '#8B5CF6',
    },
    {
      icon: Megaphone, name: 'Affiliate Model x AI', sessions: t('Full course', 'Full course'), status: t('Hoàn thành', 'Completed'),
      desc: t('Tái cấu trúc kênh bán hàng thương hiệu cá nhân — xây dựng tài sản số bền vững bằng AI. Case study thực tế: Chị Cúc Ngô (15K followers).', 'Restructure personal brand sales channels — build sustainable digital assets with AI. Real case study: Ms. Cuc Ngo (15K followers).'),
      deliverables: [t('Chiến lược tái cấu trúc kênh', 'Channel Restructuring Strategy'), t('Xây dựng thương hiệu cá nhân', 'Personal Brand Building'), t('AI Content cho TikTok & FB', 'AI Content for TikTok & FB')],
      color: '#EF4444',
    },
    {
      icon: Palette, name: 'ZDES.AI', sessions: t('Workshop chuyên sâu', 'Intensive Workshop'), status: t('Đang triển khai', 'In Progress'),
      desc: t('Biến designer thành nghệ sĩ nhờ AI — lộ trình Visual Storyteller. Từ "Thợ Thiết Kế" đến "Chủ Cuộc Chơi" trong kỷ nguyên AI.', 'Transform designers into artists with AI — Visual Storyteller pathway. From "Design Worker" to "Game Master" in the AI era.'),
      deliverables: [t('New Game Visual Storyteller PDF', 'New Game Visual Storyteller PDF'), t('Lộ trình thành Visual Storyteller', 'Visual Storyteller Roadmap'), t('Chiến lược sáng tạo AI', 'AI Creative Strategy')],
      color: '#EC4899',
    },
    {
      icon: Play, name: t('Brand Storytelling Video', 'Brand Storytelling Video'), sessions: t('Workshop', 'Workshop'), status: t('Đang triển khai', 'In Progress'),
      desc: t('Chiến lược kể chuyện thương hiệu bằng video AI — từ AI Persona đến "Cơn sốt" Viral. Tác nhân Hội thoại Tùy chỉnh cho tương tác số.', 'AI video brand storytelling strategy — from AI Persona to Viral "Fever". Custom Conversational Agents for digital interaction.'),
      deliverables: [t('AI Persona Framework', 'AI Persona Framework'), t('Tác nhân Hội thoại Tùy chỉnh', 'Custom Conversational Agents'), t('Chiến lược Viral Video', 'Viral Video Strategy')],
      color: '#06B6D4',
    },
    {
      icon: Megaphone, name: 'DEMAN AI x Media', sessions: t('Đang triển khai', 'In Progress'), status: t('Đang triển khai', 'In Progress'),
      desc: t('AI cho ngành media/truyền thông — tự động hóa sản xuất nội dung, phân phối đa kênh, và đo lường hiệu quả.', 'AI for media industry — automate content production, multi-channel distribution, and performance measurement.'),
      deliverables: [t('AI Media Pipeline', 'AI Media Pipeline'), t('Đa kênh tự động', 'Multi-channel Automation')],
      color: '#F97316',
    },
    {
      icon: BarChart3, name: 'DEMAN Performance x AI', sessions: t('Đang triển khai', 'In Progress'), status: t('Đang triển khai', 'In Progress'),
      desc: t('Performance marketing kết hợp AI — tối ưu quảng cáo, funnel, và ROI bằng hệ thống AI tự học.', 'AI-powered performance marketing — optimize ads, funnels, and ROI with self-learning AI systems.'),
      deliverables: [t('AI Ads Optimization', 'AI Ads Optimization'), t('Self-learning Funnel', 'Self-learning Funnel')],
      color: '#14B8A6',
    },
  ];

  const active = programs[activeTab];

  return (
    <section id="programs" className="relative py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeInSection>
          <SectionLabel>{t('Chương trình đào tạo', 'Training Programs')}</SectionLabel>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6" style={{ color: C.white }}>
            {t('Đào tạo thực chiến.', 'Battle-tested training.')}
            <span className="gradient-text-gold"> {t('Đa ngành.', 'Multi-industry.')}</span>
          </h2>
          <p className="text-lg max-w-2xl mb-16" style={{ color: C.whiteMuted }}>
            {t(
              '11+ chương trình đã triển khai thực tế — từ Crypto, Affiliate, Dropship đến Media, Design, Performance. Mỗi buổi đều có video dài, PDF chuyên sâu, Mind Maps, và Podcasts.',
              '11+ programs delivered in practice — from Crypto, Affiliate, Dropship to Media, Design, Performance. Each session includes long videos, in-depth PDFs, Mind Maps, and Podcasts.'
            )}
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Program tabs */}
          <div className="lg:col-span-4">
            <div className="flex flex-col gap-2">
              {programs.map((prog, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className="flex items-center gap-3 p-4 text-left transition-all duration-300 w-full"
                  style={{
                    backgroundColor: activeTab === i ? C.whiteAlpha(0.06) : 'transparent',
                    border: `1px solid ${activeTab === i ? C.goldAlpha(0.3) : C.whiteAlpha(0.04)}`,
                    borderRadius: '4px',
                  }}
                >
                  <prog.icon size={18} style={{ color: activeTab === i ? prog.color : C.whiteDim }} />
                  <div className="flex-1">
                    <div className="font-display font-semibold text-sm" style={{ color: activeTab === i ? C.white : C.whiteMuted }}>{prog.name}</div>
                    <div className="text-xs mt-0.5" style={{ color: C.whiteDim }}>{prog.sessions}</div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 font-medium" style={{ color: prog.status.includes('Hoàn') || prog.status.includes('Completed') ? '#10B981' : C.gold, backgroundColor: prog.status.includes('Hoàn') || prog.status.includes('Completed') ? 'rgba(16,185,129,0.1)' : C.goldAlpha(0.1), borderRadius: '2px' }}>
                    {prog.status}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Program detail */}
          <div className="lg:col-span-8">
            <FadeInSection key={activeTab}>
              <div className="p-8 md:p-10 h-full" style={{ backgroundColor: C.whiteAlpha(0.03), border: `1px solid ${C.whiteAlpha(0.08)}`, borderRadius: '4px' }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-sm flex items-center justify-center" style={{ backgroundColor: `${active.color}15`, border: `1px solid ${active.color}30` }}>
                    <active.icon size={22} style={{ color: active.color }} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-2xl" style={{ color: C.white }}>{active.name}</h3>
                    <div className="text-xs mt-1" style={{ color: C.whiteDim }}>{active.sessions}</div>
                  </div>
                </div>

                <p className="text-base leading-relaxed mb-8" style={{ color: C.whiteMuted }}>{active.desc}</p>

                <div className="mb-8">
                  <div className="font-display font-semibold text-sm mb-4" style={{ color: C.gold }}>{t('Deliverables & Frameworks', 'Deliverables & Frameworks')}</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {active.deliverables.map((d, j) => (
                      <div key={j} className="flex items-start gap-2 text-sm" style={{ color: C.whiteMuted }}>
                        <CheckCircle2 size={14} style={{ color: active.color }} className="mt-0.5 shrink-0" />
                        {d}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-6" style={{ borderTop: `1px solid ${C.whiteAlpha(0.06)}` }}>
                  <div className="flex items-center gap-2 text-xs" style={{ color: C.whiteDim }}>
                    <Play size={12} /> {t('Video dài 1-2h/buổi', '1-2h video/session')}
                  </div>
                  <div className="flex items-center gap-2 text-xs" style={{ color: C.whiteDim }}>
                    <FileText size={12} /> {t('PDF chuyên sâu', 'In-depth PDFs')}
                  </div>
                  <div className="flex items-center gap-2 text-xs" style={{ color: C.whiteDim }}>
                    <Image size={12} /> {t('Mind Maps', 'Mind Maps')}
                  </div>
                  <div className="flex items-center gap-2 text-xs" style={{ color: C.whiteDim }}>
                    <Headphones size={12} /> {t('Podcasts', 'Podcasts')}
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══ CASE STUDIES SECTION ═══
function CaseStudiesSection() {
  const { t } = useLanguage();

  const cases = [
    {
      name: 'ONIIZ',
      type: t('Menscare — Tôn vinh nam tính mới', 'Menscare — Celebrating New Masculinity'),
      desc: t(
        'Thương hiệu Menscare mà mình xây từ con số 0 giữa đại dịch COVID. Sản phẩm chiến lược Masculine Foam — tôn vinh nam tính mới. Từ cái tiệm tạp hóa nhỏ xíu của bố mẹ đến 3 triệu sản phẩm đã bán, 300K+ đánh giá 5 sao trên Shopee, và đang mở rộng ra Amazon quốc tế.',
        "The Menscare brand I built from zero during COVID. Hero product Masculine Foam — celebrating new masculinity. From my parents' tiny grocery store to 3M+ products sold, 300K+ 5-star Shopee reviews, and expanding to Amazon internationally."
      ),
      results: [t('3M+ sản phẩm đã bán', '3M+ products sold'), t('Masculine Foam', 'Masculine Foam'), t('Shopee + Amazon', 'Shopee + Amazon'), t('Mascot Ziino', 'Mascot Ziino')],
      links: [{ label: 'oniiz.vn', href: 'https://oniiz.vn' }, { label: 'Shopee', href: 'https://shopee.vn/oniizvietnam' }],
      icon: ShoppingCart, color: '#3B82F6',
    },
    {
      name: 'BIG MANZ',
      type: t('Sức khỏe nam giới', "Men's Health & Wellness"),
      desc: t(
        'Thương hiệu sức khỏe nam giới với F1 Gel + C1 Spray. AI Content Engine tạo viral content theo Golden Circle, AI product photography, 10-campaign ad structure — tất cả vận hành bằng AI.',
        "Men's health brand with F1 Gel + C1 Spray. AI Content Engine creates viral Golden Circle content, AI product photography, 10-campaign ad structure — all AI-powered."
      ),
      results: [t('AI Content Engine', 'AI Content Engine'), t('GMP certified', 'GMP certified'), t('10-campaign structure', '10-campaign structure')],
      links: [{ label: 'bigmanz.vn', href: 'https://bigmanz.vn' }],
      icon: Rocket, color: '#EF4444',
    },
    {
      name: 'V2JOY',
      type: t('Tôn vinh khoảnh khắc tình yêu', 'Celebrating Moments of Love'),
      desc: t(
        '"FUN ALL THE WAY — Bật mode yêu mới." Thương hiệu tôn vinh khoảnh khắc trong tình yêu — 80% vận hành bằng AI, từ idea đến publish chỉ cần review. Co-branded với ONIIZ tạo hệ sinh thái sản phẩm hoàn chỉnh.',
        '"FUN ALL THE WAY — Turn on the new love mode." A brand celebrating moments of love — 80% AI-powered, from idea to publish just needs review. Co-branded with ONIIZ for a complete product ecosystem.'
      ),
      results: [t('FUN ALL THE WAY', 'FUN ALL THE WAY'), t('80% AI-powered', '80% AI-powered'), t('Bật mode yêu mới', 'New love mode')],
      links: [{ label: 'Shopee', href: 'https://shopee.vn/v2joyvietnam' }],
      icon: Star, color: '#8B5CF6',
    },
    {
      name: 'GAME OF ECOM',
      type: t('Tự truyện số / Sách', 'Digital Autobiography / Book'),
      desc: t(
        'Câu chuyện thật, cảm xúc thật — hành trình từ tiệm tạp hóa nhỏ đến hệ sinh thái Human × AI. 16 chương kể về thất bại, đứng dậy, và kiến tạo tương lai.',
        'Real story, real emotions — the journey from a tiny grocery store to a Human × AI ecosystem. 16 chapters about failure, rising up, and building the future.'
      ),
      results: [t('16 chương', '16 chapters'), t('From Vietnam Go Global', 'From Vietnam Go Global'), t('Ebook miễn phí', 'Free Ebook')],
      links: [{ label: t('Đọc Ebook', 'Read Ebook'), href: 'https://gameofecom-ap55h3md.manus.space/' }, { label: 'gameofecom.com', href: 'https://gameofecom.com' }],
      icon: BookOpen, color: '#10B981',
    },
  ];

  return (
    <section id="cases" className="relative py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeInSection>
          <SectionLabel>{t('Dự án thực tế', 'Real Projects')}</SectionLabel>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6" style={{ color: C.white }}>
            {t('Không nói suông.', "No empty talk.")}
            <span className="gradient-text-gold"> {t('Đây là bằng chứng.', "Here's the proof.")}</span>
          </h2>
          <p className="text-lg max-w-2xl mb-16" style={{ color: C.whiteMuted }}>
            {t(
              'Mình kể cho các bạn nghe, không phải vì mình giỏi, mà vì mình tin rằng câu chuyện của mình có thể giúp ai đó bớt cô đơn trên hành trình của họ.',
              "I share these stories not because I'm great, but because I believe my journey can help someone feel less alone on theirs."
            )}
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {cases.map((cs, i) => (
            <FadeInSection key={i} delay={i * 0.1}>
              <div className="p-8 md:p-10 h-full transition-all duration-500 group relative overflow-hidden" style={{ backgroundColor: C.whiteAlpha(0.02), border: `1px solid ${C.whiteAlpha(0.06)}`, borderRadius: '4px' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-sm flex items-center justify-center" style={{ backgroundColor: `${cs.color}15`, border: `1px solid ${cs.color}30` }}>
                    <cs.icon size={18} style={{ color: cs.color }} />
                  </div>
                  <div className="text-xs font-medium tracking-wider uppercase" style={{ color: C.goldDark }}>{cs.type}</div>
                </div>

                <h3 className="font-display font-bold text-2xl md:text-3xl mb-4" style={{ color: C.white }}>{cs.name}</h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: C.whiteMuted }}>{cs.desc}</p>

                <div className="flex flex-wrap gap-3 mb-6">
                  {cs.results.map((r, j) => (
                    <span key={j} className="flex items-center gap-1.5 text-xs" style={{ color: C.gold }}>
                      <CheckCircle2 size={12} /> {r}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  {cs.links.map((link, j) => (
                    <a key={j} href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-display font-semibold transition-colors" style={{ color: C.gold }} onMouseEnter={e => (e.currentTarget.style.color = C.goldLight)} onMouseLeave={e => (e.currentTarget.style.color = C.gold)}>
                      {link.label} <ExternalLink size={12} />
                    </a>
                  ))}
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══ ABOUT SECTION ═══
function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeInSection>
            <div className="relative flex justify-center">
              <div className="relative">
                <img src={IMAGES.avatar} alt="Hải VN — AI Architect" className="w-80 h-80 md:w-96 md:h-96 object-cover rounded-sm" style={{ border: `2px solid ${C.goldAlpha(0.3)}` }} />
                <div className="absolute -bottom-4 -right-4 px-4 py-2" style={{ backgroundColor: C.gold, borderRadius: '2px' }}>
                  <span className="font-display font-bold text-sm" style={{ color: C.charcoal }}>Hải VN</span>
                </div>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <SectionLabel>{t('Về mình', 'About Me')}</SectionLabel>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6" style={{ color: C.white }}>
              {t('Vũ Ngọc Hải', 'Vu Ngoc Hai')}
              <br />
              <span className="gradient-text-gold">AI Architect</span>
            </h2>
            <div className="space-y-4 mb-8">
              <p className="text-base leading-relaxed" style={{ color: C.whiteMuted }}>
                {t(
                  'Mình không phải là một chuyên gia nổi tiếng. Mình chỉ là một người đã từng thất bại rất nhiều lần, đã từng mất tiền, mất người, mất cả niềm tin vào chính mình. Và rồi mình đã đứng dậy.',
                  "I'm not a famous expert. I'm just someone who has failed many times, lost money, lost people, lost faith in myself. And then I stood back up."
                )}
              </p>
              <p className="text-base leading-relaxed" style={{ color: C.whiteMuted }}>
                {t(
                  'Từ cái tiệm tạp hóa nhỏ xíu của bố mẹ ở quê, đến 3M+ sản phẩm đã bán qua ONIIZ, 11+ chương trình đào tạo AI đã triển khai, 8+ framework độc quyền — giờ đây mình đang kiến tạo DEMAN AI LAB, hệ sinh thái nơi con người và AI cùng nhau tỏa sáng.',
                  "From my parents' tiny grocery store, to 3M+ products sold through ONIIZ, 11+ AI training programs delivered, 8+ proprietary frameworks — now I'm creating DEMAN AI LAB, an ecosystem where humans and AI shine together."
                )}
              </p>
              <p className="text-base leading-relaxed italic" style={{ color: C.gold }}>
                {t(
                  '"Đức năng thắng số. Bạn cứ chăm chỉ, cứ chân thành, cứ tích cực — rồi mọi thứ sẽ ổn."',
                  '"Persistence beats luck. Stay diligent, stay authentic, stay positive — and everything will work out."'
                )}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {[
                t('Founder DeMAN AI LAB', 'Founder DeMAN AI LAB'),
                'Clone Your Mind™',
                t('11+ Chương trình', '11+ Programs'),
                t('6+ Thương hiệu', '6+ Brands'),
                'Vibe Coding',
                t('Tác giả Game of Ecom', 'Author: Game of Ecom'),
              ].map(tag => (
                <span key={tag} className="text-xs px-3 py-1.5 font-medium" style={{ color: C.gold, border: `1px solid ${C.goldAlpha(0.2)}`, borderRadius: '2px' }}>{tag}</span>
              ))}
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

// ═══ VISION SECTION ═══
function VisionSection() {
  const { t } = useLanguage();

  const phases = [
    { year: '2026–2027', title: t('Củng cố & Mở rộng', 'Consolidate & Expand'), desc: t('Hoàn thiện hệ sinh thái VN, bắt đầu quốc tế hóa ONIIZ qua Amazon, ra mắt Clone Your Mind™ Academy trên Skool. Mở rộng ZDES.AI cho creative community.', 'Complete VN ecosystem, start ONIIZ internationalization via Amazon, launch Clone Your Mind™ Academy on Skool. Expand ZDES.AI for creative community.') },
    { year: '2028–2029', title: t('Tăng tốc & Tự động', 'Accelerate & Automate'), desc: t('HAIVN.AI Platform mở, Deman AI Lab R&D, self-learning AI systems. Mục tiêu 30% revenue từ global. Mở rộng sang AI for Healthcare, AI for Education.', 'Open HAIVN.AI Platform, Deman AI Lab R&D, self-learning AI systems. Target 30% revenue from global. Expand to AI for Healthcare, AI for Education.') },
    { year: '2030–2031', title: t('Dẫn đầu & Tác động', 'Lead & Impact'), desc: t('Thought leader toàn cầu trong Human × AI. AI for Good initiatives. "Cho là nhận" — chia sẻ để cùng phát triển.', 'Global thought leader in Human × AI. AI for Good initiatives. "Giving is receiving" — share to grow together.') },
  ];

  return (
    <section className="relative py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0">
        <img src={IMAGES.cta} alt="" className="w-full h-full object-cover opacity-[0.15]" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${C.charcoal}, ${C.charcoal}cc 30%, ${C.charcoal}cc 70%, ${C.charcoal})` }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <FadeInSection className="text-center max-w-3xl mx-auto mb-20">
          <SectionLabel>{t('Tầm nhìn 5 năm', '5-Year Vision')}</SectionLabel>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6" style={{ color: C.white }}>
            {t('Từ Việt Nam', 'From Vietnam')}
            <span className="gradient-text-gold"> {t('ra thế giới.', 'to the world.')}</span>
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: C.whiteMuted }}>
            {t('"Biên giới là một lựa chọn. Tương lai là một hành trình. Và tất cả mới chỉ bắt đầu."', '"Borders are a choice. The future is a journey. And everything has just begun."')}
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {phases.map((phase, i) => (
            <FadeInSection key={i} delay={i * 0.15}>
              <div className="p-8 h-full relative" style={{ backgroundColor: C.whiteAlpha(0.03), border: `1px solid ${C.whiteAlpha(0.06)}`, borderRadius: '4px' }}>
                <div className="font-display font-bold text-sm tracking-wider mb-4" style={{ color: C.gold }}>{phase.year}</div>
                <h3 className="font-display font-semibold text-xl mb-3" style={{ color: C.white }}>{phase.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: C.whiteMuted }}>{phase.desc}</p>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ChevronRight size={20} style={{ color: C.goldAlpha(0.3) }} />
                  </div>
                )}
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══ CONTACT / CTA SECTION ═══
function ContactSection() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="relative py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeInSection className="text-center max-w-3xl mx-auto">
          <SectionLabel>{t('Bắt đầu', 'Get Started')}</SectionLabel>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6" style={{ color: C.white }}>
            {t('Sẵn sàng biến AI thành', 'Ready to turn AI into')}
            <br />
            <span className="gradient-text-gold">{t('đồng đội thật?', 'a real teammate?')}</span>
          </h2>
          <p className="text-lg leading-relaxed mb-12" style={{ color: C.whiteMuted }}>
            {t(
              'Nào, cùng mình bắt đầu nhé. Dù bạn là solopreneur muốn scale, hay doanh nghiệp cần chuyển đổi — hãy bắt đầu bằng một cuộc trò chuyện. "Cho là nhận" — mình luôn sẵn sàng chia sẻ.',
              "Let's start together. Whether you're a solopreneur wanting to scale, or a business needing transformation — let's begin with a conversation."
            )}
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <a href="https://www.facebook.com/deman.hai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 font-display font-semibold text-base transition-all duration-300" style={{ color: C.charcoal, backgroundColor: C.gold, borderRadius: '2px' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.goldLight; e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = C.gold; e.currentTarget.style.transform = 'translateY(0)'; }}>
              {t('Nhắn tin cho mình', 'Message Me')} <ExternalLink size={14} />
            </a>
            <a href="https://haivn.ai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 font-display font-semibold text-base transition-all duration-300" style={{ color: C.white, border: `1px solid ${C.whiteAlpha(0.2)}`, borderRadius: '2px' }} onMouseEnter={e => { e.currentTarget.style.borderColor = C.goldAlpha(0.5); e.currentTarget.style.color = C.gold; }} onMouseLeave={e => { e.currentTarget.style.borderColor = C.whiteAlpha(0.2); e.currentTarget.style.color = C.white; }}>
              {t('Khám phá HAIVN.AI', 'Explore HAIVN.AI')} <ArrowRight size={14} />
            </a>
          </div>

          <div className="flex justify-center gap-8">
            {[
              { label: 'Facebook', href: 'https://www.facebook.com/demanlab' },
              { label: 'HAIVN.AI', href: 'https://haivn.ai' },
              { label: 'Game of Ecom', href: 'https://gameofecom-ap55h3md.manus.space/' },
              { label: 'Skool', href: '#' },
            ].map(social => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="text-xs font-medium tracking-wider uppercase transition-colors duration-300" style={{ color: C.whiteDim }} onMouseEnter={e => (e.currentTarget.style.color = C.gold)} onMouseLeave={e => (e.currentTarget.style.color = C.whiteDim)}>
                {social.label}
              </a>
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

// ═══ FOOTER ═══
function Footer() {
  const { t } = useLanguage();

  return (
    <footer style={{ borderTop: `1px solid ${C.whiteAlpha(0.06)}` }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm flex items-center justify-center" style={{ border: `1px solid ${C.goldAlpha(0.3)}` }}>
              <span className="font-display font-bold text-xs" style={{ color: C.gold }}>D</span>
            </div>
            <span className="font-display font-semibold text-sm" style={{ color: C.whiteMuted }}>DEMAN AI LAB</span>
          </div>

          <div className="flex items-center gap-6 text-xs" style={{ color: C.whiteDim }}>
            <a href="#services" className="hover:opacity-80 transition-opacity">{t('Dịch vụ', 'Services')}</a>
            <a href="#programs" className="hover:opacity-80 transition-opacity">{t('Chương trình', 'Programs')}</a>
            <a href="#cases" className="hover:opacity-80 transition-opacity">{t('Dự án', 'Projects')}</a>
            <a href="https://haivn.ai" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">HAIVN.AI</a>
          </div>

          <div className="text-xs" style={{ color: C.whiteDim }}>
            © 2026 DEMAN AI LAB. {t('Đã đăng ký bản quyền.', 'All rights reserved.')}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ═══ MAIN PAGE ═══
export default function DemanHome() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: C.charcoal }}>
      <Navbar />
      <HeroSection />
      <GoldDivider />
      <PhilosophySection />
      <GoldDivider />
      <ServicesSection />
      <GoldDivider />
      <ProgramsSection />
      <GoldDivider />
      <CaseStudiesSection />
      <GoldDivider />
      <AboutSection />
      <GoldDivider />
      <VisionSection />
      <GoldDivider />
      <ContactSection />
      <Footer />
    </div>
  );
}

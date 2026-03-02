/**
 * DEMAN AI LAB — Main Homepage
 * Design: "The Architect's Blueprint" — Dark Luxury Minimalism
 * Tone: Authentic storytelling (gameofecom style) — first person, humble, real
 * Bilingual: VN/EN toggle
 */
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, Brain, Zap, BarChart3, Users, ChevronRight, ExternalLink, Layers, Cpu, MessageSquare, TrendingUp, CheckCircle2, ArrowUpRight, Globe, ShoppingCart, Star, Rocket, BookOpen } from 'lucide-react';
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
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function GoldDivider() {
  return <div className="gold-line w-full my-0" />;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-display font-semibold text-xs tracking-[0.25em] uppercase block mb-5" style={{ color: C.gold }}>
      {children}
    </span>
  );
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
    { label: t('Hệ sinh thái', 'Ecosystem'), href: '#ecosystem' },
    { label: t('Dự án', 'Projects'), href: '#cases' },
    { label: t('Về mình', 'About'), href: '#about' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? `1px solid ${C.goldAlpha(0.1)}` : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-sm flex items-center justify-center" style={{ border: `1.5px solid ${C.gold}` }}>
            <span className="font-display font-bold text-sm" style={{ color: C.gold }}>D</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-sm tracking-wide" style={{ color: C.white }}>DEMAN AI LAB</span>
            <span className="text-[10px] tracking-[0.15em] uppercase" style={{ color: C.whiteDim }}>AI Operations</span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors duration-300 hover:opacity-100"
              style={{ color: C.whiteMuted }}
              onMouseEnter={e => (e.currentTarget.style.color = C.gold)}
              onMouseLeave={e => (e.currentTarget.style.color = C.whiteMuted)}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {/* Language Toggle */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-display font-semibold tracking-wider transition-all duration-300"
            style={{ color: C.gold, border: `1px solid ${C.goldAlpha(0.3)}`, borderRadius: '2px' }}
          >
            <Globe size={12} />
            {lang === 'vi' ? 'EN' : 'VN'}
          </button>

          <a
            href="#contact"
            className="hidden md:flex items-center gap-2 px-5 py-2.5 text-sm font-display font-semibold transition-all duration-300"
            style={{ color: C.charcoal, backgroundColor: C.gold, borderRadius: '2px' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.goldLight; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = C.gold; }}
          >
            {t('Bắt đầu', 'Get Started')} <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </motion.nav>
  );
}

// ═══ HERO SECTION ═══
function HeroSection() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 200]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img src={IMAGES.hero} alt="" className="w-full h-[120%] object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${C.charcoal}cc 0%, ${C.charcoal}88 40%, ${C.charcoal}dd 80%, ${C.charcoal} 100%)` }} />
      </motion.div>

      <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${C.goldAlpha(0.4)}, transparent)` }} />

      <motion.div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20" style={{ opacity }}>
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-8"
            style={{ border: `1px solid ${C.goldAlpha(0.3)}`, borderRadius: '2px', backgroundColor: C.goldAlpha(0.05) }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: C.gold }} />
            <span className="font-display text-xs tracking-[0.15em] uppercase" style={{ color: C.gold }}>
              {t('AI Architect × Builder × Operator', 'AI Architect × Builder × Operator')}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] mb-8"
          >
            <span style={{ color: C.white }}>Turn AI Into</span>
            <br />
            <span className="gradient-text-gold">Your Real</span>
            <br />
            <span className="gradient-text-gold">Teammate.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-lg md:text-xl leading-relaxed max-w-2xl mb-12"
            style={{ color: C.whiteMuted }}
          >
            {t(
              'Mình là Hải. Mình giúp doanh nghiệp & solopreneurs biến AI thành đồng đội vận hành thật — để làm ít hơn, thông minh hơn, và scale bền vững.',
              "I'm Hai. I help businesses & solopreneurs turn AI into real operating teammates — to do less, think smarter, and scale sustainably."
            )}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#services"
              className="inline-flex items-center gap-2 px-8 py-4 font-display font-semibold text-base transition-all duration-300"
              style={{ color: C.charcoal, backgroundColor: C.gold, borderRadius: '2px' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.goldLight; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = C.gold; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              {t('Khám phá dịch vụ', 'Explore Services')} <ArrowRight size={16} />
            </a>
            <a
              href="#cases"
              className="inline-flex items-center gap-2 px-8 py-4 font-display font-semibold text-base transition-all duration-300"
              style={{ color: C.white, border: `1px solid ${C.whiteAlpha(0.2)}`, borderRadius: '2px' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.goldAlpha(0.5); e.currentTarget.style.color = C.gold; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.whiteAlpha(0.2); e.currentTarget.style.color = C.white; }}
            >
              {t('Xem dự án thực tế', 'View Real Projects')}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-wrap gap-12 mt-20 pt-8"
            style={{ borderTop: `1px solid ${C.whiteAlpha(0.08)}` }}
          >
            {[
              { num: '6+', label: t('Thương hiệu vận hành', 'Brands Operated') },
              { num: '3M+', label: t('Sản phẩm đã bán', 'Products Sold') },
              { num: '300K+', label: t('Đánh giá 5 sao', '5-Star Reviews') },
              { num: '90', label: t('Ngày chuyển đổi', 'Day Transformation') },
            ].map((stat, i) => (
              <div key={i}>
                <div className="font-display font-bold text-2xl md:text-3xl" style={{ color: C.gold }}>{stat.num}</div>
                <div className="text-xs tracking-wider uppercase mt-1" style={{ color: C.whiteDim }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
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
              "I believe AI is like a teammate — not replacing you, but carrying the repetitive work, freeing your creative energy, so you can focus on what truly matters. Stay diligent, stay authentic, and everything will work out."
            )}
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          {[
            {
              icon: Brain,
              title: 'Clone Your Mind™',
              desc: t(
                'Nhân bản tư duy, giọng điệu, quy trình ra quyết định của bạn thành tài sản AI — hệ thống vận hành đúng cách bạn muốn, kể cả khi bạn ngủ.',
                'Clone your thinking, voice, and decision-making into AI assets — the system operates exactly how you want, even while you sleep.'
              ),
            },
            {
              icon: Layers,
              title: t('Hệ thống, không phải công cụ', 'System, Not Tools'),
              desc: t(
                'Không phải 1 tool, mà là hệ thống hoàn chỉnh: Planning → Execution → Tracking → Learning. Mọi thứ kết nối, mọi thứ đo được.',
                'Not just a tool, but a complete system: Planning → Execution → Tracking → Learning. Everything connected, everything measurable.'
              ),
            },
            {
              icon: TrendingUp,
              title: t('Scale bền vững', 'Scale Sustainably'),
              desc: t(
                'Từ 1 người vận hành cả team, đến team 5 người làm việc bằng 50. AI là đòn bẩy, không phải phép màu — và mình đã chứng minh điều đó.',
                'From 1 person running an entire team, to a team of 5 working like 50. AI is leverage, not magic — and I\'ve proven it.'
              ),
            },
          ].map((item, i) => (
            <FadeInSection key={i} delay={i * 0.15}>
              <div
                className="p-8 h-full transition-all duration-500 group"
                style={{
                  backgroundColor: C.whiteAlpha(0.02),
                  border: `1px solid ${C.whiteAlpha(0.05)}`,
                  borderRadius: '4px',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.goldAlpha(0.2); e.currentTarget.style.backgroundColor = C.whiteAlpha(0.04); }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.whiteAlpha(0.05); e.currentTarget.style.backgroundColor = C.whiteAlpha(0.02); }}
              >
                <item.icon size={28} style={{ color: C.gold }} className="mb-6" />
                <h3 className="font-display font-semibold text-xl mb-4" style={{ color: C.white }}>{item.title}</h3>
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
      icon: Cpu,
      title: t('AI Transformation 90 Ngày', 'AI Transformation 90-Day'),
      desc: t(
        'Chương trình chuyển đổi toàn diện mà mình tâm đắc nhất: từ chiến lược → triển khai → chuyển giao hệ thống AI cho đội ngũ. 90 ngày để thay đổi cách bạn vận hành.',
        'The transformation program I\'m most proud of: from strategy → implementation → AI system handover. 90 days to change how you operate.'
      ),
      tags: ['Strategy', 'Implementation', 'Training'],
    },
    {
      icon: Zap,
      title: t('Content Engine Setup', 'Content Engine Setup'),
      desc: t(
        'Xây dựng hệ thống sản xuất nội dung tự động: AI viết, AI thiết kế, AI lên lịch, AI phân tích — chạy 24/7. Mình đã dùng hệ thống này cho chính 6+ thương hiệu của mình.',
        'Build an automated content production system: AI writes, designs, schedules, analyzes — running 24/7. I use this system for my own 6+ brands.'
      ),
      tags: ['Automation', 'Content', 'AI Agents'],
    },
    {
      icon: BarChart3,
      title: t('AI Operations Consulting', 'AI Operations Consulting'),
      desc: t(
        'Tư vấn chiến lược ứng dụng AI vào vận hành: SOP, workflow, CRM, báo cáo tự động. Không lý thuyết — toàn bộ đều từ kinh nghiệm thực chiến.',
        'Strategic AI operations consulting: SOP, workflow, CRM, automated reporting. No theory — everything from real battle experience.'
      ),
      tags: ['Consulting', 'Workflow', 'Analytics'],
    },
    {
      icon: Users,
      title: t('Clone Your Mind™ Academy', 'Clone Your Mind™ Academy'),
      desc: t(
        'Cộng đồng đào tạo trên Skool — nơi mình chia sẻ mọi thứ mình biết về AI. Từ prompt engineering đến xây dựng AI agents. "Cho là nhận" — sự chia sẻ vốn dĩ đã là hạnh phúc.',
        'Training community on Skool — where I share everything I know about AI. From prompt engineering to building AI agents. "Giving is receiving."'
      ),
      tags: ['Training', 'Community', 'Skool'],
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
              'Mỗi dịch vụ đều sinh ra từ bài toán thực tế mà mình đã phải giải — không phải từ sách giáo khoa. Và tất cả kết nối thành một hệ sinh thái hoàn chỉnh.',
              'Every service was born from real problems I had to solve — not from textbooks. And they all connect into a complete ecosystem.'
            )}
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((svc, i) => (
            <FadeInSection key={i} delay={i * 0.1}>
              <div
                className="p-8 md:p-10 h-full transition-all duration-500 group relative overflow-hidden"
                style={{
                  backgroundColor: C.whiteAlpha(0.02),
                  border: `1px solid ${C.whiteAlpha(0.06)}`,
                  borderRadius: '4px',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.goldAlpha(0.25); }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.whiteAlpha(0.06); }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle at top right, ${C.goldAlpha(0.08)}, transparent)` }} />
                <svc.icon size={32} style={{ color: C.gold }} className="mb-6" />
                <h3 className="font-display font-semibold text-xl md:text-2xl mb-4" style={{ color: C.white }}>{svc.title}</h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: C.whiteMuted }}>{svc.desc}</p>
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

// ═══ ECOSYSTEM SECTION ═══
function EcosystemSection() {
  const { t } = useLanguage();

  const modules = [
    { icon: Brain, title: 'AI Architect', desc: t('Chiến lược & thiết kế hệ thống', 'Strategy & system design') },
    { icon: Cpu, title: 'Ops Engine', desc: t('SOP, checklist, tự động hóa', 'SOP, checklist, automation') },
    { icon: MessageSquare, title: 'Content Engine', desc: t('Sản xuất & phân phối nội dung', 'Content production & distribution') },
    { icon: TrendingUp, title: 'Sales Funnel', desc: t('Offer, landing, pipeline', 'Offer, landing, pipeline') },
    { icon: Users, title: 'Support Hub', desc: t('FAQ, chatbot, chăm sóc khách', 'FAQ, chatbot, customer care') },
    { icon: BarChart3, title: 'Analytics', desc: t('Dashboard KPI, loop cải tiến', 'KPI dashboard, improvement loops') },
  ];

  return (
    <section id="ecosystem" className="relative py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeInSection>
            <SectionLabel>{t('Hệ sinh thái', 'Ecosystem')}</SectionLabel>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6" style={{ color: C.white }}>
              {t('Một hệ điều hành.', 'One operating system.')}
              <br />
              <span className="gradient-text-gold">{t('Sáu module.', 'Six modules.')}</span>
            </h2>
            <p className="text-lg leading-relaxed mb-10" style={{ color: C.whiteMuted }}>
              {t(
                'Mình xây dựng "Operating System" hoàn chỉnh cho doanh nghiệp — từ planning đến execution, từ tracking đến learning. Mỗi module là một "đồng đội AI" chuyên biệt.',
                'I build a complete "Operating System" for businesses — from planning to execution, from tracking to learning. Each module is a specialized "AI teammate."'
              )}
            </p>

            <div className="grid grid-cols-2 gap-4">
              {modules.map((mod, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 transition-all duration-300"
                  style={{ backgroundColor: C.whiteAlpha(0.02), border: `1px solid ${C.whiteAlpha(0.05)}`, borderRadius: '4px' }}
                >
                  <mod.icon size={18} style={{ color: C.gold }} className="mt-0.5 shrink-0" />
                  <div>
                    <div className="font-display font-semibold text-sm" style={{ color: C.white }}>{mod.title}</div>
                    <div className="text-xs mt-0.5" style={{ color: C.whiteDim }}>{mod.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <div className="relative">
              <img src={IMAGES.ecosystem} alt="DEMAN AI LAB Ecosystem" className="w-full rounded-sm" style={{ border: `1px solid ${C.whiteAlpha(0.08)}` }} />
              <div className="absolute inset-0 rounded-sm" style={{ background: `linear-gradient(to top, ${C.charcoal}88, transparent)` }} />
            </div>
          </FadeInSection>
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
      type: t('Thời trang nam / E-commerce', 'Men\'s Fashion / E-commerce'),
      desc: t(
        'Thương hiệu chăm sóc nam giới mà mình xây từ con số 0 giữa đại dịch COVID. Từ cái tiệm tạp hóa nhỏ xíu của bố mẹ đến 3 triệu sản phẩm đã bán — hành trình này dạy mình rằng "Đức năng thắng số".',
        'The men\'s grooming brand I built from zero during COVID. From my parents\' tiny grocery store to 3 million products sold — this journey taught me that persistence beats luck.'
      ),
      results: [
        t('3M+ sản phẩm đã bán', '3M+ products sold'),
        t('300K+ đánh giá 5 sao', '300K+ 5-star reviews'),
        t('200K followers Shopee', '200K Shopee followers'),
      ],
      link: 'https://oniiz.vn',
      external: true,
      icon: ShoppingCart,
      color: '#3B82F6',
    },
    {
      name: 'BIG MANZ',
      type: t('Sức khỏe nam giới', 'Men\'s Health & Wellness'),
      desc: t(
        'Thương hiệu sức khỏe nam giới với hệ thống F1 Gel + C1 Spray. AI Content Engine tạo viral content theo Golden Circle, AI product photography, và 10-campaign ad structure — tất cả chạy tự động.',
        'Men\'s health brand with F1 Gel + C1 Spray system. AI Content Engine creates viral Golden Circle content, AI product photography, and 10-campaign ad structure — all automated.'
      ),
      results: [
        t('Viral content engine', 'Viral content engine'),
        t('AI product photography', 'AI product photography'),
        t('GMP certified', 'GMP certified'),
      ],
      link: 'https://bigmanz.vn',
      external: true,
      icon: Rocket,
      color: '#EF4444',
    },
    {
      name: 'V2JOY',
      type: t('Lifestyle & Wellness', 'Lifestyle & Wellness'),
      desc: t(
        'Thương hiệu lifestyle & wellness — "Fun all the way". 80% vận hành bằng AI, từ idea đến publish chỉ cần review. Co-branded với ONIIZ để tạo hệ sinh thái sản phẩm hoàn chỉnh.',
        'Lifestyle & wellness brand — "Fun all the way". 80% AI-powered operations, from idea to publish just needs review. Co-branded with ONIIZ for a complete product ecosystem.'
      ),
      results: [
        t('80% AI-powered', '80% AI-powered'),
        t('Idea → Publish tự động', 'Idea → Publish automated'),
        t('Co-branded với ONIIZ', 'Co-branded with ONIIZ'),
      ],
      link: 'https://shopee.vn/v2joyvietnam',
      external: true,
      icon: Star,
      color: '#8B5CF6',
    },
    {
      name: 'GAME OF ECOM',
      type: t('Tự truyện / Sách', 'Autobiography / Book'),
      desc: t(
        'Câu chuyện thật, cảm xúc thật, con người thật — hành trình từ tiệm tạp hóa nhỏ đến hệ sinh thái Human × AI. 16 chương kể về thất bại, đứng dậy, và kiến tạo tương lai.',
        'Real story, real emotions, real person — the journey from a tiny grocery store to a Human × AI ecosystem. 16 chapters about failure, rising up, and building the future.'
      ),
      results: [
        t('16 chương', '16 chapters'),
        t('From Vietnam Go Global', 'From Vietnam Go Global'),
        t('Tự truyện số', 'Digital autobiography'),
      ],
      link: 'https://gameofecom.com',
      external: true,
      icon: BookOpen,
      color: '#10B981',
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
              <a
                href={cs.link}
                target={cs.external ? '_blank' : undefined}
                rel={cs.external ? 'noopener noreferrer' : undefined}
                className="block p-8 md:p-10 h-full transition-all duration-500 group relative overflow-hidden"
                style={{
                  backgroundColor: C.whiteAlpha(0.02),
                  border: `1px solid ${C.whiteAlpha(0.06)}`,
                  borderRadius: '4px',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.goldAlpha(0.4); e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.whiteAlpha(0.06); e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-sm flex items-center justify-center" style={{ backgroundColor: `${cs.color}15`, border: `1px solid ${cs.color}30` }}>
                    <cs.icon size={18} style={{ color: cs.color }} />
                  </div>
                  <div>
                    <div className="text-xs font-medium tracking-wider uppercase" style={{ color: C.goldDark }}>{cs.type}</div>
                  </div>
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

                <div className="flex items-center gap-2 text-sm font-display font-semibold transition-colors" style={{ color: C.gold }}>
                  {cs.external ? (
                    <>{t('Truy cập', 'Visit')} <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" /></>
                  ) : (
                    <>{t('Xem chi tiết', 'View details')} <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" /></>
                  )}
                </div>
              </a>
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
          {/* Left: Avatar */}
          <FadeInSection>
            <div className="relative flex justify-center">
              <div className="relative">
                <img
                  src={IMAGES.avatar}
                  alt="Hải VN — AI Architect"
                  className="w-80 h-80 md:w-96 md:h-96 object-cover rounded-sm"
                  style={{ border: `2px solid ${C.goldAlpha(0.3)}` }}
                />
                <div className="absolute -bottom-4 -right-4 px-4 py-2" style={{ backgroundColor: C.gold, borderRadius: '2px' }}>
                  <span className="font-display font-bold text-sm" style={{ color: C.charcoal }}>Hải VN</span>
                </div>
              </div>
            </div>
          </FadeInSection>

          {/* Right: Content */}
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
                  'Từ cái tiệm tạp hóa nhỏ xíu của bố mẹ ở quê, đến những ngày đầu bán áo thun Pokemon lỗ sấp mặt, đến lúc xây dựng ONIIZ từ con số 0 giữa đại dịch COVID — giờ đây mình đang kiến tạo DEMAN AI LAB, hệ sinh thái nơi con người và AI cùng nhau tỏa sáng.',
                  "From my parents' tiny grocery store, to losing money selling Pokemon t-shirts, to building ONIIZ from zero during COVID — now I'm creating DEMAN AI LAB, an ecosystem where humans and AI shine together."
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
                t('6+ Thương hiệu', '6+ Brands'),
                'Vibe Coding',
                'Skool Community',
                t('Tác giả Game of Ecom', 'Author: Game of Ecom'),
              ].map(tag => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1.5 font-medium"
                  style={{ color: C.gold, border: `1px solid ${C.goldAlpha(0.2)}`, borderRadius: '2px' }}
                >
                  {tag}
                </span>
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
    {
      year: '2026–2027',
      title: t('Củng cố & Mở rộng', 'Consolidate & Expand'),
      desc: t('Hoàn thiện hệ sinh thái VN, bắt đầu quốc tế hóa ONIIZ qua Amazon, ra mắt Clone Your Mind™ Academy trên Skool.', 'Complete VN ecosystem, start ONIIZ internationalization via Amazon, launch Clone Your Mind™ Academy on Skool.'),
    },
    {
      year: '2028–2029',
      title: t('Tăng tốc & Tự động', 'Accelerate & Automate'),
      desc: t('HAIVN.AI Platform mở, Deman AI Lab R&D, self-learning AI systems. Mục tiêu 30% revenue từ global.', 'Open HAIVN.AI Platform, Deman AI Lab R&D, self-learning AI systems. Target 30% revenue from global.'),
    },
    {
      year: '2030–2031',
      title: t('Dẫn đầu & Tác động', 'Lead & Impact'),
      desc: t('Thought leader toàn cầu trong Human × AI. AI for Good initiatives. "Cho là nhận" — chia sẻ để cùng phát triển.', 'Global thought leader in Human × AI. AI for Good initiatives. "Giving is receiving" — share to grow together.'),
    },
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
            {t(
              '"Biên giới là một lựa chọn. Tương lai là một hành trình. Và tất cả mới chỉ bắt đầu."',
              '"Borders are a choice. The future is a journey. And everything has just begun."'
            )}
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {phases.map((phase, i) => (
            <FadeInSection key={i} delay={i * 0.15}>
              <div
                className="p-8 h-full relative"
                style={{
                  backgroundColor: C.whiteAlpha(0.03),
                  border: `1px solid ${C.whiteAlpha(0.06)}`,
                  borderRadius: '4px',
                }}
              >
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
              "Let's start together. Whether you're a solopreneur wanting to scale, or a business needing transformation — let's begin with a conversation. I'm always ready to share."
            )}
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <a
              href="https://www.facebook.com/deman.hai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 font-display font-semibold text-base transition-all duration-300"
              style={{ color: C.charcoal, backgroundColor: C.gold, borderRadius: '2px' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.goldLight; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = C.gold; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              {t('Nhắn tin cho mình', 'Message Me')} <ExternalLink size={14} />
            </a>
            <a
              href="https://haivn.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 font-display font-semibold text-base transition-all duration-300"
              style={{ color: C.white, border: `1px solid ${C.whiteAlpha(0.2)}`, borderRadius: '2px' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.goldAlpha(0.5); e.currentTarget.style.color = C.gold; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.whiteAlpha(0.2); e.currentTarget.style.color = C.white; }}
            >
              {t('Khám phá HAIVN.AI', 'Explore HAIVN.AI')} <ArrowRight size={14} />
            </a>
          </div>

          <div className="flex justify-center gap-8">
            {[
              { label: 'Facebook', href: 'https://www.facebook.com/demanlab' },
              { label: 'HAIVN.AI', href: 'https://haivn.ai' },
              { label: 'Game of Ecom', href: 'https://gameofecom.com' },
              { label: 'Skool', href: '#' },
            ].map(social => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium tracking-wider uppercase transition-colors duration-300"
                style={{ color: C.whiteDim }}
                onMouseEnter={e => (e.currentTarget.style.color = C.gold)}
                onMouseLeave={e => (e.currentTarget.style.color = C.whiteDim)}
              >
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
            <a href="#ecosystem" className="hover:opacity-80 transition-opacity">{t('Hệ sinh thái', 'Ecosystem')}</a>
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
      <EcosystemSection />
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

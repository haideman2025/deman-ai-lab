/**
 * DEMAN AI LAB — Homepage V2 (Brand Strategy Aligned)
 * Architecture: Hub thông minh phân luồng theo 3 persona
 * Brand: Dark Luxury + Cyan/Purple System
 * Tone: Authentic storytelling — first person, humble, real
 * Built on: Existing brand asset CDN + LanguageContext + Framer Motion
 *
 * IA: Hero → Persona Router → 3 Pillars → Founder Story → 3 NỌC → Cases → Community → Final CTA
 *
 * Khác biệt v1:
 * - Tách phần About sang /about
 * - Tách phần Cases chi tiết sang /cases
 * - 3 trụ rõ ràng: Academy / Affiliate / HAIVN.AI (rebrand từ Blueprint)
 * - Persona router 3 cửa vào ngay sau hero
 * - 3 NỌC đúng thứ tự sách Game of Ecom: Chăm Chỉ → Cho Là Nhận → Tích Cực
 */
import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'wouter';
import {
  ArrowRight, Brain, Zap, ChevronRight, BookOpen, GraduationCap,
  Link2, Bot, Building2, Rocket, Sparkles, Heart, Quote, Menu, X,
  CheckCircle2, Users, Star, ExternalLink
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// ═══ CDN Image URLs (giữ nguyên từ DemanHome.tsx) ═══
const IMAGES = {
  hero: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/demanlab-hero-njb9haQUKrzJT8CzCXjQfQ.webp',
  brandLogo: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/deman-logo-transparent_731b623d.png',
  brandAvatar2k: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/deman-avatar-2k_64370c57.png',
  avatar: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/haivn-avatar_be7140ce.png',
  oniizLogo: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/oniiz-logo_a0ad3679.png',
  oniizHero: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/oniiz-hero_6b27dfab.jpeg',
  bigmanzLogo: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/bigmanz-logo_ea8613ad.png',
  bigmanzCombo: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/bigmanz-combo_9192967c.png',
  v2joyProducts: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/v2joy-products_69e610a8.jpg',
  gameofecomHero: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/gameofecom-hero_7cb7a008.jpg',
};

// ═══ Brand Colors — Cyan-Blue-Purple System (đồng bộ DemanHome.tsx hiện tại) ═══
const C = {
  gold: '#00B4FF',
  goldLight: '#00D4FF',
  goldDark: '#4A90FF',
  purple: '#7B2FBE',
  deepPurple: '#3D1A78',
  coral: '#E85B5B',
  charcoal: '#0a0a14',
  surface: '#0d0d1e',
  surfaceLight: '#14142a',
  surfaceLighter: '#1a1a30',
  white: '#E8EDF5',
  whiteMuted: 'rgba(232, 237, 245, 0.6)',
  whiteDim: 'rgba(232, 237, 245, 0.35)',
  goldAlpha: (a: number) => `rgba(0, 180, 255, ${a})`,
  purpleAlpha: (a: number) => `rgba(123, 47, 190, ${a})`,
  coralAlpha: (a: number) => `rgba(232, 91, 91, ${a})`,
  whiteAlpha: (a: number) => `rgba(232, 237, 245, ${a})`,
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

function SectionLabel({ children, color = C.gold }: { children: React.ReactNode; color?: string }) {
  return (
    <span
      className="font-display font-semibold text-xs tracking-[0.25em] uppercase block mb-5"
      style={{ color }}
    >
      {children}
    </span>
  );
}

// ═══ NAVBAR ═══
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, toggleLang, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Academy', href: '/academy' },
    { label: 'Affiliate', href: '/affiliate' },
    { label: 'HAIVN.AI', href: '/blueprint', highlight: true },
    { label: t('Cases', 'Cases'), href: '/cases' },
    { label: t('Về Hải VN', 'About'), href: '/about' },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? `${C.charcoal}f0` : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? `1px solid ${C.goldAlpha(0.15)}` : '1px solid transparent',
      }}
    >
      <div className="container mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img src={IMAGES.brandLogo} alt="DEMAN AI LAB" className="h-8 w-auto" />
          <span className="font-display font-bold text-sm hidden sm:block" style={{ color: C.white }}>
            DEMAN<span style={{ color: C.gold }}>AI</span>LAB
          </span>
        </Link>
        <div className="hidden lg:flex items-center gap-9">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-medium tracking-wider uppercase transition-colors duration-300"
              style={{ color: link.highlight ? C.gold : C.whiteDim }}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleLang}
            className="text-xs font-display font-semibold tracking-wider px-3 py-1.5 transition-all duration-300"
            style={{ color: C.gold, border: `1px solid ${C.goldAlpha(0.3)}`, borderRadius: '2px' }}
          >
            {lang.toUpperCase()}
          </button>
          <Link
            href="/game-of-ecom"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2 font-display font-semibold text-xs tracking-wider transition-all duration-300"
            style={{ color: C.charcoal, backgroundColor: C.gold, borderRadius: '2px' }}
          >
            <BookOpen className="w-3.5 h-3.5" />
            {t('Tải Game of Ecom', 'Read Game of Ecom')}
          </Link>
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ color: C.white }}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="lg:hidden absolute top-full left-0 right-0 p-6 border-t"
          style={{ backgroundColor: C.charcoal, borderColor: C.goldAlpha(0.15) }}
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-display text-base font-semibold py-2"
                style={{ color: link.highlight ? C.gold : C.white }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

// ═══ SECTION 1 — HERO ═══
function HeroSection() {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Background gradient + hex pattern */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, ${C.goldAlpha(0.15)} 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, ${C.purpleAlpha(0.12)} 0%, transparent 50%),
            ${C.charcoal}
          `,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(${C.white} 1px, transparent 1px),
            linear-gradient(90deg, ${C.white} 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'linear-gradient(to bottom, black 0%, transparent 80%)',
        }}
      />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <FadeInSection>
            <SectionLabel>{t('DEMAN AI LAB · Hệ điều hành Human × AI bản địa', 'Operating System for Human × AI')}</SectionLabel>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <h1
              className="font-display font-bold leading-[1.05] mb-8"
              style={{
                color: C.white,
                fontSize: 'clamp(40px, 7vw, 88px)',
                letterSpacing: '-0.03em',
              }}
            >
              {t('Clone Your Mind.', 'Clone Your Mind.')}<br />
              <span style={{
                background: `linear-gradient(135deg, ${C.gold} 0%, ${C.goldLight} 50%, ${C.purple} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                {t('Live Your Vibe.', 'Live Your Vibe.')}
              </span>
            </h1>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <p
              className="text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed"
              style={{ color: C.whiteMuted }}
            >
              {t(
                'Nhân bản tâm trí. Sống đúng tần số. Không học prompt — cài đặt hệ điều hành ',
                'Replicate your mind. Live your frequency. Not prompt courses — install the OS of '
              )}
              <strong style={{ color: C.white }}>
                {t('Mindset · System · Case Studies', 'Mindset · System · Case Studies')}
              </strong>
              {t(' cho chính bạn và AI của bạn.', ' for you and your AI.')}
            </p>
          </FadeInSection>

          <FadeInSection delay={0.3}>
            <div className="flex flex-wrap gap-4 justify-center mb-16">
              <Link
                href="/game-of-ecom"
                className="inline-flex items-center gap-2 px-7 py-4 font-display font-semibold text-sm tracking-wider transition-all duration-300 hover:scale-105"
                style={{
                  color: C.charcoal,
                  backgroundColor: C.gold,
                  borderRadius: '2px',
                  boxShadow: `0 8px 24px ${C.goldAlpha(0.3)}`,
                }}
              >
                <BookOpen className="w-4 h-4" />
                {t('Tải free "Game of Ecom" 71 trang', 'Free Download "Game of Ecom" 71 pages')}
              </Link>
              <Link
                href="/blueprint"
                className="inline-flex items-center gap-2 px-7 py-4 font-display font-semibold text-sm tracking-wider transition-all duration-300"
                style={{
                  color: C.gold,
                  border: `1.5px solid ${C.gold}`,
                  borderRadius: '2px',
                }}
              >
                <Bot className="w-4 h-4" />
                {t('Trải nghiệm HAIVN.AI', 'Try HAIVN.AI')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeInSection>

          {/* Stats bar */}
          <FadeInSection delay={0.4}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto pt-8 border-t" style={{ borderColor: C.goldAlpha(0.15) }}>
              {[
                { num: '10+', label: t('Năm thực chiến', 'Years battle-tested') },
                { num: '1M$+', label: t('Doanh thu Oniiz', 'Oniiz revenue') },
                { num: '3M+', label: t('Sản phẩm đã bán', 'Products sold') },
                { num: '6+', label: t('Mô hình KD', 'Business models') },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="font-display font-bold text-3xl md:text-4xl mb-1" style={{ color: C.gold }}>
                    {s.num}
                  </div>
                  <div className="text-xs uppercase tracking-wider" style={{ color: C.whiteDim }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

// ═══ SECTION 2 — PERSONA ROUTER ═══
function PersonaRouter() {
  const { t } = useLanguage();

  const personas = [
    {
      id: 'smb',
      icon: <Building2 className="w-10 h-10" />,
      tag: 'PERSONA 01',
      title: t('Chủ doanh nghiệp', 'Business Owner'),
      sub: t('SMB 5–50 NS · 5–50 tỷ/năm', 'SMB 5–50 employees · 5–50B VND/yr'),
      pain: t('"Mình là cổ chai của chính DN. Càng scale càng kiệt sức."', '"I am the bottleneck of my own business. The more I scale, the more I burn out."'),
      track: t('→ HAIVN.AI + 1-on-1 Consulting', '→ HAIVN.AI + 1-on-1 Consulting'),
      href: '/blueprint?persona=smb',
      color: C.gold,
    },
    {
      id: 'solo',
      icon: <Rocket className="w-10 h-10" />,
      tag: 'PERSONA 02',
      title: t('Solopreneur / Creator', 'Solopreneur / Creator'),
      sub: t('Freelancer · KOC · Content Creator', 'Freelancer · KOC · Content Creator'),
      pain: t('"Có chuyên môn — nhưng không biết build IP thành dòng thu nhập."', '"I have expertise — but no system to turn it into income."'),
      track: t('→ Academy + Affiliate System', '→ Academy + Affiliate System'),
      href: '/affiliate',
      color: C.coral,
    },
    {
      id: 'learner',
      icon: <GraduationCap className="w-10 h-10" />,
      tag: 'PERSONA 03',
      title: t('Học viên / Upskill', 'Learner / Upskill'),
      sub: t('Sinh viên · Nhân viên 1–7 năm KN', 'Student · Professional 1–7 yrs'),
      pain: t('"Sợ AI thay thế mình — nhưng học AI ở đâu cho thật?"', '"Afraid AI will replace me — but where do I learn real AI?"'),
      track: t('→ Academy (Entry tier)', '→ Academy (Entry tier)'),
      href: '/academy',
      color: C.purple,
    },
  ];

  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: C.surface }}>
      <div className="container mx-auto px-6 lg:px-12">
        <FadeInSection className="text-center max-w-3xl mx-auto mb-16">
          <SectionLabel>{t('Bạn đang ở đâu?', 'Where are you?')}</SectionLabel>
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-4" style={{ color: C.white }}>
            {t('Một hệ thống. Ba cửa vào.', 'One system. Three doors.')}
          </h2>
          <p style={{ color: C.whiteMuted }}>
            {t(
              'Chọn lộ trình phù hợp với bạn — DEMAN AI LAB cá nhân hoá hành trình theo nỗi đau bạn đang sống.',
              'Choose your path — DEMAN AI LAB personalizes your journey by the pain you live with.'
            )}
          </p>
        </FadeInSection>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {personas.map((p, i) => (
            <FadeInSection key={p.id} delay={i * 0.1}>
              <Link href={p.href}>
                <div
                  className="h-full p-8 cursor-pointer transition-all duration-500 hover:-translate-y-2 group"
                  style={{
                    backgroundColor: C.charcoal,
                    border: `1.5px solid ${C.goldAlpha(0.15)}`,
                    borderRadius: '4px',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = p.color)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = C.goldAlpha(0.15))}
                >
                  <div className="mb-5" style={{ color: p.color }}>{p.icon}</div>
                  <div className="text-xs font-mono tracking-widest mb-2" style={{ color: p.color }}>{p.tag}</div>
                  <h3 className="font-display font-semibold text-2xl mb-2" style={{ color: C.white }}>{p.title}</h3>
                  <p className="text-sm mb-5" style={{ color: C.whiteDim }}>{p.sub}</p>
                  <div
                    className="italic text-sm pl-4 mb-5 leading-relaxed"
                    style={{ borderLeft: `3px solid ${C.coralAlpha(0.6)}`, color: C.whiteMuted }}
                  >
                    {p.pain}
                  </div>
                  <div className="text-xs font-mono mb-4" style={{ color: C.whiteDim }}>{p.track}</div>
                  <div className="flex items-center gap-2 font-display font-semibold text-sm" style={{ color: p.color }}>
                    {t('Lộ trình của tôi', 'My path')}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══ SECTION 3 — 3 PILLAR SHOWCASE ═══
function PillarSection() {
  const { t } = useLanguage();

  const pillars = [
    {
      num: 'TRỤ 01',
      icon: <Zap className="w-9 h-9" />,
      title: 'Academy',
      subtitle: t('Huấn luyện & chuyển giao công nghệ', 'Training & Tech Transfer'),
      quote: t('"Cohort 4 tuần — học clone tâm trí vào AI, không học prompt."', '"4-week cohort — learn to clone your mind into AI, not prompts."'),
      features: ['Mindset', 'System', 'Case Studies', '1-1 Mentor', 'Lifetime'],
      cta: t('Đăng ký free workshop', 'Join free workshop'),
      href: '/academy',
      color: C.gold,
    },
    {
      num: 'TRỤ 02',
      icon: <Link2 className="w-9 h-9" />,
      title: 'Affiliate System',
      subtitle: t('Build IP + Sale System', 'Build IP + Sale System'),
      quote: t('"Biến chuyên môn của bạn thành dòng affiliate qua ecosystem DEMAN."', '"Turn your expertise into affiliate revenue through DEMAN ecosystem."'),
      features: ['Oniiz 25%', 'V2Joy 30%', 'MystiGarden 20%', 'Content kit', 'Dashboard'],
      cta: t('Apply trở thành Partner', 'Apply as Partner'),
      href: '/affiliate',
      color: C.coral,
    },
    {
      num: 'TRỤ 03',
      icon: <Bot className="w-9 h-9" />,
      title: 'HAIVN.AI',
      subtitle: t('SaaS · Customize System for Business', 'SaaS · Customize System for Business'),
      quote: t('"30 phút cài đặt — AI hiểu DN bạn như đồng nghiệp 10 năm."', '"30-min setup — AI understands your business like a 10-year colleague."'),
      features: ['Marketing Clone', 'Content 24/7', 'CRM Auto', 'Vibe Coding', 'VN-native'],
      cta: t('Trải nghiệm Blueprint™', 'Try Blueprint™'),
      href: '/blueprint',
      color: C.purple,
    },
  ];

  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: C.charcoal }}>
      <div className="container mx-auto px-6 lg:px-12">
        <FadeInSection className="text-center max-w-3xl mx-auto mb-16">
          <SectionLabel>{t('Hệ sinh thái 3 trụ cột', '3-Pillar Ecosystem')}</SectionLabel>
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-4" style={{ color: C.white }}>
            {t('Học · Triển khai · Kiếm tiền', 'Learn · Deploy · Earn')}
          </h2>
          <p style={{ color: C.whiteMuted }}>
            {t(
              'Không phải một khoá AI nữa. Là một hệ điều hành để bạn vận hành Human × AI từ tư duy đến doanh thu.',
              'Not another AI course. An operating system to run Human × AI from mindset to revenue.'
            )}
          </p>
        </FadeInSection>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {pillars.map((p, i) => (
            <FadeInSection key={p.title} delay={i * 0.1}>
              <div
                className="h-full p-8 transition-all duration-500 hover:-translate-y-2"
                style={{
                  backgroundColor: C.surface,
                  border: `1.5px solid ${C.goldAlpha(0.15)}`,
                  borderRadius: '4px',
                  borderTop: `3px solid ${p.color}`,
                }}
              >
                <div
                  className="inline-block text-xs font-mono tracking-widest mb-4 px-3 py-1"
                  style={{
                    color: p.color,
                    backgroundColor: `${p.color}1a`,
                    borderRadius: '2px',
                  }}
                >
                  {p.num}
                </div>
                <div className="mb-3" style={{ color: p.color }}>{p.icon}</div>
                <h3 className="font-display font-bold text-3xl mb-2" style={{ color: C.white }}>{p.title}</h3>
                <div className="text-xs font-mono tracking-widest uppercase mb-5" style={{ color: p.color }}>
                  {p.subtitle}
                </div>
                <div
                  className="italic text-sm pl-4 mb-5 leading-relaxed"
                  style={{ borderLeft: `3px solid ${p.color}`, color: C.whiteMuted }}
                >
                  {p.quote}
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.features.map((f) => (
                    <span
                      key={f}
                      className="text-[11px] font-mono px-2.5 py-1"
                      style={{
                        color: C.whiteDim,
                        backgroundColor: C.charcoal,
                        borderRadius: '2px',
                      }}
                    >
                      {f}
                    </span>
                  ))}
                </div>
                <Link
                  href={p.href}
                  className="inline-flex items-center justify-center gap-2 w-full py-3 font-display font-semibold text-sm tracking-wider transition-all duration-300 group"
                  style={{
                    color: p.color,
                    border: `1.5px solid ${p.color}`,
                    borderRadius: '2px',
                  }}
                >
                  {p.cta}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══ SECTION 4 — FOUNDER STORY SNIPPET ═══
function FounderStory() {
  const { t } = useLanguage();
  const milestones = [
    { year: '2016', event: t('50 triệu, áo Pokemon lỗ sấp mặt ở cổng chợ sinh viên', '50M VND seed, Pokemon shirts lost everything') },
    { year: '2019', event: t('Amber Vietnam — 1.5 tỷ tồn kho, cú reset đau nhất', 'Amber Vietnam — 1.5B inventory loss, the deepest reset') },
    { year: '7/7/2021', event: t('Oniiz ra đời giữa COVID — 1000 đơn ngày đầu', 'Oniiz launched during COVID — 1000 orders day 1') },
    { year: '2023', event: t('Oniiz cán mốc 1 triệu USD doanh thu', 'Oniiz hits 1 million USD revenue') },
    { year: '2026', event: t('DEMAN AI LAB — Clone Your Mind framework ra mắt', 'DEMAN AI LAB — Clone Your Mind framework launched') },
  ];

  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: C.surface }}>
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto items-center">
          <FadeInSection>
            <div
              className="aspect-square rounded-lg overflow-hidden"
              style={{ border: `1px solid ${C.goldAlpha(0.2)}` }}
            >
              <img src={IMAGES.gameofecomHero} alt="Game of Ecom" className="w-full h-full object-cover" />
            </div>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <SectionLabel>{t('Hành trình founder', 'Founder Journey')}</SectionLabel>
            <h2
              className="font-display font-bold text-3xl md:text-4xl mb-6 leading-tight"
              style={{ color: C.white }}
            >
              {t(
                'Từ 100 áo Pokemon lỗ sấp mặt đến 1 triệu USD. Từ 50 nhân sự đổ vỡ đến hệ sinh thái 6 thương hiệu.',
                'From 100 Pokemon shirts lost to 1 million USD. From 50-employee collapse to 6-brand ecosystem.'
              )}
            </h2>

            <div
              className="my-8 px-6 py-5 italic text-lg"
              style={{
                borderLeft: `4px solid ${C.coral}`,
                color: C.white,
                fontFamily: "'Sora', sans-serif",
                lineHeight: 1.5,
              }}
            >
              "{t('Mình là gốc rễ của mọi vấn đề. Và cũng là gốc rễ của mọi giải pháp.', 'I am the root of every problem. And the root of every solution.')}"
              <br />
              <span className="text-sm not-italic font-mono mt-3 block" style={{ color: C.whiteDim }}>
                — Hải VN, Vũ Ngọc Hải
              </span>
            </div>

            <div className="space-y-0">
              {milestones.map((m, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[100px_1fr] gap-5 py-3"
                  style={{ borderBottom: `1px solid ${C.goldAlpha(0.1)}` }}
                >
                  <span className="font-mono text-sm font-semibold" style={{ color: C.gold }}>
                    {m.year}
                  </span>
                  <span className="text-sm" style={{ color: C.whiteMuted }}>
                    {m.event}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 mt-8 font-display font-semibold text-sm tracking-wider transition-all duration-300 group"
              style={{ color: C.gold }}
            >
              {t('Đọc full hành trình →', 'Read full journey →')}
            </Link>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

// ═══ SECTION 5 — 3 NỌC (Đúng thứ tự sách Game of Ecom) ═══
function ThreeNocSection() {
  const { t } = useLanguage();
  const nocs = [
    {
      num: 'NỌC 01',
      title: t('Chăm Chỉ', 'Discipline'),
      tagline: t('"Đức năng thắng số."', '"Virtue beats fate."'),
      desc: t(
        'Có mục tiêu rõ ràng, luôn tự giác và chủ động, kiên trì theo đuổi mà không cần ai thúc ép.',
        'Clear goals, self-discipline, persistent pursuit without external pressure.'
      ),
      color: '#F5C04A', // gold-amber for NỌC 1
    },
    {
      num: 'NỌC 02',
      title: t('Cho Là Nhận', 'Giving Is Receiving'),
      tagline: t('"Sức mạnh của sự chân thành."', '"The power of sincerity."'),
      desc: t(
        'Thành thật, tử tế, sẵn sàng chia sẻ mọi thứ mình biết để giúp người khác tốt hơn. Khi cho đi bằng chân thành — bạn đang gieo hạt.',
        'Honesty, kindness, sharing everything to help others. When you give with sincerity — you are planting seeds.'
      ),
      color: C.goldLight,
    },
    {
      num: 'NỌC 03',
      title: t('Tích Cực', 'Positivity'),
      tagline: t('"Mình là gốc rễ mọi vấn đề."', '"I am the root of every problem."'),
      desc: t(
        'Tin mọi thứ có thể tốt hơn. Nhìn nhận thất bại như bài học. Chịu trách nhiệm hoàn toàn, không đổ lỗi.',
        'Believe everything can be better. See failure as a lesson. Take full responsibility, no blame.'
      ),
      color: C.coral,
    },
  ];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden" style={{ backgroundColor: C.charcoal }}>
      <div
        className="absolute"
        style={{
          width: 800,
          height: 800,
          top: -300,
          right: -200,
          background: `radial-gradient(circle, ${C.goldAlpha(0.08)} 0%, transparent 70%)`,
        }}
      />

      <div className="container mx-auto px-6 lg:px-12 relative">
        <FadeInSection className="text-center max-w-3xl mx-auto mb-16">
          <SectionLabel>{t('Triết lý sống · Kim chỉ nam', 'Living Philosophy')}</SectionLabel>
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-4" style={{ color: C.white }}>
            {t('3 NỌC — Niềm tin Ổn Cốt lõi', '3 NỌC — Core Beliefs')}
          </h2>
          <p style={{ color: C.whiteMuted }}>
            {t(
              'Không phải slogan trên tường. Đây là 3 niềm tin được đúc kết qua 10 năm thực chiến — định hướng mọi quyết định từ tuyển dụng đến chiến lược.',
              'Not slogans on a wall. These are 3 beliefs forged through 10 years of battle — guiding every decision from hiring to strategy.'
            )}
          </p>
        </FadeInSection>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {nocs.map((n, i) => (
            <FadeInSection key={n.num} delay={i * 0.1}>
              <div
                className="h-full p-8 relative"
                style={{
                  backgroundColor: C.surface,
                  border: `1.5px solid ${C.goldAlpha(0.15)}`,
                  borderRadius: '4px',
                  borderTop: `4px solid ${n.color}`,
                }}
              >
                <div className="text-xs font-mono tracking-widest mb-4" style={{ color: C.whiteDim }}>
                  {n.num}
                </div>
                <h3 className="font-display font-bold text-3xl mb-3" style={{ color: n.color }}>
                  {n.title}
                </h3>
                <div className="italic text-base mb-4 leading-relaxed" style={{ color: C.white }}>
                  {n.tagline}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: C.whiteMuted }}>
                  {n.desc}
                </p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══ SECTION 6 — CASE STUDY PREVIEW ═══
function CasesPreview() {
  const { t } = useLanguage();
  const cases = [
    {
      img: IMAGES.oniizHero,
      tag: t('Menscare · DTC', 'Menscare · DTC'),
      title: 'ONIIZ',
      desc: t('Thương hiệu chăm sóc nam giới · "Tôn vinh nam tính mới"', 'Men\'s care brand · "Celebrating new masculinity"'),
      metric: t('3M+ sản phẩm · 300K+ đánh giá 5⭐', '3M+ products · 300K+ 5⭐ reviews'),
    },
    {
      img: IMAGES.v2joyProducts,
      tag: t('Lifestyle · Co-brand', 'Lifestyle · Co-brand'),
      title: 'V2JOY',
      desc: t('"FUN ALL THE WAY" · 80% vận hành bằng AI', '"FUN ALL THE WAY" · 80% AI-operated'),
      metric: t('80% AI · 30 bài/tuần auto', '80% AI · 30 posts/week auto'),
    },
    {
      img: IMAGES.bigmanzCombo,
      tag: t('Healthcare · B2C', 'Healthcare · B2C'),
      title: 'BIG MANZ',
      desc: t('Sức khoẻ nam giới · GMP certified · F1 Gel + C1 Spray', 'Men\'s health · GMP certified · F1 Gel + C1 Spray'),
      metric: t('+200% affiliate revenue', '+200% affiliate revenue'),
    },
  ];

  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: C.surface }}>
      <div className="container mx-auto px-6 lg:px-12">
        <FadeInSection className="text-center max-w-3xl mx-auto mb-16">
          <SectionLabel>{t('Bằng chứng thực chiến', 'Battle-tested Proof')}</SectionLabel>
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-4" style={{ color: C.white }}>
            {t('Không nói suông. Đây là bằng chứng.', 'Not just talk. This is proof.')}
          </h2>
          <p style={{ color: C.whiteMuted }}>
            {t(
              'Mỗi thương hiệu là một case study sống — vận hành bằng AI từ content đến CRM. Đây không phải lý thuyết.',
              'Each brand is a living case study — AI-operated from content to CRM. Not theory.'
            )}
          </p>
        </FadeInSection>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {cases.map((c, i) => (
            <FadeInSection key={c.title} delay={i * 0.1}>
              <div
                className="overflow-hidden h-full cursor-pointer transition-all duration-500 hover:-translate-y-2"
                style={{
                  backgroundColor: C.charcoal,
                  border: `1.5px solid ${C.goldAlpha(0.15)}`,
                  borderRadius: '4px',
                }}
              >
                <div className="aspect-[16/10] overflow-hidden" style={{ backgroundColor: C.surface }}>
                  <img src={c.img} alt={c.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                </div>
                <div className="p-6">
                  <div className="text-xs font-mono tracking-widest mb-2" style={{ color: C.gold }}>
                    {c.tag}
                  </div>
                  <h4 className="font-display font-bold text-2xl mb-2" style={{ color: C.white }}>
                    {c.title}
                  </h4>
                  <p className="text-sm mb-3" style={{ color: C.whiteMuted }}>{c.desc}</p>
                  <div className="font-mono text-xs pt-3 border-t" style={{ color: '#F5C04A', borderColor: C.goldAlpha(0.15) }}>
                    {c.metric}
                  </div>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection className="text-center mt-12">
          <Link
            href="/cases"
            className="inline-flex items-center gap-2 px-6 py-3 font-display font-semibold text-sm tracking-wider transition-all duration-300 group"
            style={{ color: C.gold, border: `1.5px solid ${C.gold}`, borderRadius: '2px' }}
          >
            {t('Xem tất cả case study', 'View all case studies')}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </FadeInSection>
      </div>
    </section>
  );
}

// ═══ SECTION 7 — COMMUNITY ═══
function CommunitySection() {
  const { t } = useLanguage();
  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: C.charcoal }}>
      <div className="container mx-auto px-6 lg:px-12">
        <FadeInSection className="text-center max-w-3xl mx-auto mb-12">
          <SectionLabel>{t('Cộng đồng', 'Community')}</SectionLabel>
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-4" style={{ color: C.white }}>
            {t('Không đi một mình. Tìm đồng đội.', 'Don\'t walk alone. Find your tribe.')}
          </h2>
        </FadeInSection>

        <FadeInSection delay={0.1}>
          <div
            className="max-w-3xl mx-auto p-12 text-center"
            style={{
              background: `linear-gradient(135deg, ${C.surface} 0%, ${C.surfaceLight} 100%)`,
              border: `1.5px solid ${C.gold}`,
              borderRadius: '4px',
            }}
          >
            <GraduationCap className="w-16 h-16 mx-auto mb-6" style={{ color: C.gold }} />
            <h3 className="font-display font-bold text-3xl mb-4" style={{ color: C.white }}>
              {t('Clone Your Mind Academy', 'Clone Your Mind Academy')}
            </h3>
            <p className="mb-6 max-w-xl mx-auto leading-relaxed" style={{ color: C.whiteMuted }}>
              {t(
                'Cộng đồng chính — nơi 5,000+ người Việt cùng "Làm → Học → Đúc kết → Kể chuyện → Lặp lại". Free join, lifetime access, weekly challenge.',
                'Main community — 5,000+ Vietnamese practicing "Do → Learn → Distill → Tell → Repeat". Free, lifetime access, weekly challenges.'
              )}
            </p>
            <a
              href="https://www.skool.com/clone-your-mind-academy-4398"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 font-display font-semibold text-sm tracking-wider transition-all duration-300 hover:scale-105"
              style={{
                color: C.charcoal,
                backgroundColor: C.gold,
                borderRadius: '2px',
                boxShadow: `0 8px 24px ${C.goldAlpha(0.3)}`,
              }}
            >
              {t('Join free trên Skool', 'Join free on Skool')}
              <ExternalLink className="w-4 h-4" />
            </a>

            <div className="flex gap-3 justify-center mt-8 flex-wrap">
              <a
                href="https://www.facebook.com/groups/471620336015059"
                target="_blank" rel="noopener noreferrer"
                className="text-xs px-4 py-2 transition-colors hover:opacity-100"
                style={{
                  color: C.whiteDim, backgroundColor: C.surface,
                  border: `1px solid ${C.goldAlpha(0.15)}`, borderRadius: '2px',
                }}
              >
                📱 FB Group AI Marketing
              </a>
              <a
                href="https://www.facebook.com/groups/31029373586675973"
                target="_blank" rel="noopener noreferrer"
                className="text-xs px-4 py-2"
                style={{
                  color: C.whiteDim, backgroundColor: C.surface,
                  border: `1px solid ${C.goldAlpha(0.15)}`, borderRadius: '2px',
                }}
              >
                🛒 FB Group AI Ecom
              </a>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

// ═══ SECTION 8 — FINAL CTA WITH FORM ═══
function FinalCTA() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  return (
    <section
      className="py-24 md:py-32"
      id="contact"
      style={{ background: `linear-gradient(180deg, ${C.surface} 0%, ${C.charcoal} 100%)` }}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-2xl mx-auto text-center">
          <FadeInSection>
            <SectionLabel>{t('Bắt đầu vòng lặp của bạn', 'Start your loop')}</SectionLabel>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 leading-tight" style={{ color: C.white }}>
              {t('Sẵn sàng "Làm → Học → Đúc kết → Kể chuyện → Lặp lại"?', 'Ready to "Do → Learn → Distill → Tell → Repeat"?')}
            </h2>
            <p className="mb-8" style={{ color: C.whiteMuted }}>
              {t(
                'Tải miễn phí cuốn sách "Game of Ecom" 71 trang — câu chuyện thật của Hải VN.',
                'Free download "Game of Ecom" 71 pages — the true story of Hải VN.'
              )}
            </p>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
                // TODO: integrate with backend API (trpc.email.subscribe or similar)
              }}
              className="space-y-4 p-8 text-left"
              style={{
                backgroundColor: C.surface,
                border: `1.5px solid ${C.goldAlpha(0.2)}`,
                borderRadius: '4px',
              }}
            >
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-16 h-16 mx-auto mb-4" style={{ color: C.gold }} />
                  <h3 className="font-display text-2xl mb-2" style={{ color: C.white }}>
                    {t('Cảm ơn bạn!', 'Thank you!')}
                  </h3>
                  <p style={{ color: C.whiteMuted }}>
                    {t('PDF sẽ được gửi qua email trong 5 phút.', 'PDF will be sent to your email in 5 minutes.')}
                  </p>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-mono tracking-widest uppercase mb-2" style={{ color: C.whiteDim }}>
                      {t('Tên của bạn', 'Your name')}
                    </label>
                    <input
                      type="text" required
                      placeholder="Vũ Ngọc Hải"
                      className="w-full px-4 py-3 outline-none transition-colors"
                      style={{
                        backgroundColor: C.charcoal, color: C.white,
                        border: `1.5px solid ${C.goldAlpha(0.2)}`, borderRadius: '2px',
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = C.gold)}
                      onBlur={(e) => (e.currentTarget.style.borderColor = C.goldAlpha(0.2))}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono tracking-widest uppercase mb-2" style={{ color: C.whiteDim }}>
                      {t('Email nhận PDF', 'Email for PDF')}
                    </label>
                    <input
                      type="email" required
                      placeholder="ban@email.com"
                      className="w-full px-4 py-3 outline-none transition-colors"
                      style={{
                        backgroundColor: C.charcoal, color: C.white,
                        border: `1.5px solid ${C.goldAlpha(0.2)}`, borderRadius: '2px',
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = C.gold)}
                      onBlur={(e) => (e.currentTarget.style.borderColor = C.goldAlpha(0.2))}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono tracking-widest uppercase mb-2" style={{ color: C.whiteDim }}>
                      {t('Bạn đang ở đâu trong hành trình?', 'Where are you in the journey?')}
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 outline-none transition-colors"
                      style={{
                        backgroundColor: C.charcoal, color: C.white,
                        border: `1.5px solid ${C.goldAlpha(0.2)}`, borderRadius: '2px',
                      }}
                    >
                      <option value="">— {t('Chọn 1', 'Select')} —</option>
                      <option>{t('Chủ doanh nghiệp SMB (5–50 NS)', 'SMB Owner (5–50 employees)')}</option>
                      <option>{t('Solopreneur / Creator / Freelancer', 'Solopreneur / Creator / Freelancer')}</option>
                      <option>{t('Học viên / Nhân viên muốn upskill AI', 'Learner / Professional upskilling')}</option>
                      <option>{t('Khác / chỉ tò mò', 'Other / just curious')}</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 font-display font-semibold text-sm tracking-wider transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      color: C.charcoal,
                      backgroundColor: C.gold,
                      borderRadius: '2px',
                      boxShadow: `0 8px 24px ${C.goldAlpha(0.3)}`,
                    }}
                  >
                    {t('📕 Gửi & nhận free PDF Game of Ecom', '📕 Send & receive free PDF Game of Ecom')}
                  </button>
                </>
              )}
            </form>

            <div className="text-xs font-mono mt-6 tracking-widest" style={{ color: C.whiteDim }}>
              {t('5,000+ học viên · 100K+ follower · 3M+ sản phẩm', '5,000+ students · 100K+ followers · 3M+ products')}
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

// ═══ FOOTER ═══
function Footer() {
  const { t } = useLanguage();
  return (
    <footer style={{ backgroundColor: '#050810', borderTop: `1px solid ${C.goldAlpha(0.15)}` }}>
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={IMAGES.brandLogo} alt="DEMAN AI LAB" className="h-8 w-auto" />
              <span className="font-display font-bold text-sm" style={{ color: C.white }}>
                DEMAN<span style={{ color: C.gold }}>AI</span>LAB
              </span>
            </div>
            <p className="text-sm mb-5 max-w-md" style={{ color: C.whiteMuted }}>
              {t(
                'Hệ điều hành Human × AI bản địa hoá đầu tiên cho người Việt. Khai phá giới hạn con người trong kỷ nguyên số.',
                'First localized Human × AI operating system for Vietnamese. Unleash human potential in the digital age.'
              )}
            </p>
            <div className="flex flex-wrap gap-2">
              {['NỌC 01 · Chăm chỉ', 'NỌC 02 · Cho là nhận', 'NỌC 03 · Tích cực'].map((noc) => (
                <span
                  key={noc}
                  className="text-[10px] font-mono px-2.5 py-1"
                  style={{
                    color: C.gold,
                    backgroundColor: C.goldAlpha(0.08),
                    borderRadius: '2px',
                  }}
                >
                  {noc}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h5 className="font-display text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: C.white }}>
              {t('3 Trụ cột', '3 Pillars')}
            </h5>
            <ul className="space-y-2.5">
              <li><Link href="/academy" className="text-sm" style={{ color: C.whiteDim }}>Academy</Link></li>
              <li><Link href="/affiliate" className="text-sm" style={{ color: C.whiteDim }}>Affiliate System</Link></li>
              <li><Link href="/blueprint" className="text-sm" style={{ color: C.whiteDim }}>HAIVN.AI SaaS</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-display text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: C.white }}>
              Connect
            </h5>
            <ul className="space-y-2.5">
              <li><a href="https://www.facebook.com/demanlab" className="text-sm" style={{ color: C.whiteDim }}>Facebook</a></li>
              <li><a href="https://www.skool.com/clone-your-mind-academy-4398" className="text-sm" style={{ color: C.whiteDim }}>Skool</a></li>
              <li><Link href="/about" className="text-sm" style={{ color: C.whiteDim }}>{t('Về Hải VN', 'About Hải VN')}</Link></li>
              <li><a href="mailto:hi@demanlab.ai" className="text-sm" style={{ color: C.whiteDim }}>hi@demanlab.ai</a></li>
            </ul>
          </div>
        </div>

        <div
          className="pt-8 flex flex-wrap items-center justify-between gap-4 text-xs"
          style={{ borderTop: `1px solid ${C.goldAlpha(0.1)}`, color: C.whiteDim }}
        >
          <span>© 2026 DEMAN AI LAB. All rights reserved.</span>
          <span className="font-mono italic">{t('Clone Your Mind. Live Your Vibe.', 'Clone Your Mind. Live Your Vibe.')}</span>
        </div>
      </div>
    </footer>
  );
}

// ═══ MAIN EXPORT ═══
export default function HomePageV2() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: C.charcoal, color: C.white, fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />
      <HeroSection />
      <PersonaRouter />
      <PillarSection />
      <FounderStory />
      <ThreeNocSection />
      <CasesPreview />
      <CommunitySection />
      <FinalCTA />
      <Footer />
    </div>
  );
}

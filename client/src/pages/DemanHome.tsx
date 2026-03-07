/**
 * DEMAN AI LAB — Main Homepage
 * Design: "The Architect's Blueprint" — Dark Luxury Minimalism
 * Tone: Authentic storytelling (gameofecom style) — first person, humble, real
 * Bilingual: VN/EN toggle
 * Data: Restructured from real Google Drive data — 8+ programs, 11+ frameworks
 */
import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Brain, Zap, BarChart3, Users, ChevronRight, ExternalLink, Layers, Cpu, MessageSquare, TrendingUp, CheckCircle2, ArrowUpRight, Globe, ShoppingCart, Star, Rocket, BookOpen, Palette, Bitcoin, Package, Megaphone, GraduationCap, Play, FileText, Headphones, Image, Sparkles, Quote } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// ═══ CDN Image URLs ═══
const IMAGES = {
  hero: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/demanlab-hero-njb9haQUKrzJT8CzCXjQfQ.webp',
  about: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/demanlab-about-VTRTuSp7AyYsuCBZWw8CXN.webp',
  services: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/demanlab-services-euH6NUowesCcTH57W2UT4W.webp',
  ecosystem: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/demanlab-ecosystem-LXARB7sh7bBmvKfhb7nTCX.webp',
  cta: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/demanlab-cta-RCFmWLmqeXUkURSnPsT6w2.webp',
  brandLogo: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/deman-logo-transparent_731b623d.png',
  brandAvatar2k: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/deman-avatar-2k_64370c57.png',
  brandAvatar4k: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/deman-avatar-4k_40c0f4a0.png',
  avatar: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/haivn-avatar_be7140ce.png',
  oniizLogo: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/oniiz-logo_a0ad3679.png',
  oniizHero: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/oniiz-hero_6b27dfab.jpeg',
  bigmanzLogo: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/bigmanz-logo_ea8613ad.png',
  bigmanzCombo: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/bigmanz-combo_9192967c.png',
  v2joyProducts: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/v2joy-products_69e610a8.jpg',
  gameofecomHero: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/gameofecom-hero_7cb7a008.jpg',
};

// ═══ Brand Colors — Cyan-Blue-Purple System ═══
const C = {
  gold: '#00B4FF',
  goldLight: '#00D4FF',
  goldDark: '#4A90FF',
  purple: '#7B2FBE',
  deepPurple: '#3D1A78',
  charcoal: '#0a0a14',
  surface: '#0d0d1e',
  surfaceLight: '#14142a',
  white: '#E8EDF5',
  whiteMuted: 'rgba(232, 237, 245, 0.6)',
  whiteDim: 'rgba(232, 237, 245, 0.35)',
  goldAlpha: (a: number) => `rgba(0, 180, 255, ${a})`,
  purpleAlpha: (a: number) => `rgba(123, 47, 190, ${a})`,
  whiteAlpha: (a: number) => `rgba(232, 237, 245, ${a})`,
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
    { label: t('Bằng chứng', 'Proof'), href: '#cases' },
    { label: t('Về Hải VN', 'About Hai VN'), href: '#about' },
    { label: 'HAIVN.AI', href: 'https://haivn.ai', external: true },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{ backgroundColor: scrolled ? `${C.charcoal}ee` : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none', borderBottom: scrolled ? `1px solid ${C.whiteAlpha(0.06)}` : 'none' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-3">
          <img src={IMAGES.brandLogo} alt="DEMAN AI LAB" className="h-8 w-auto" />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} {...('external' in link && link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="text-xs font-medium tracking-wider uppercase transition-colors duration-300" style={{ color: link.label === 'HAIVN.AI' ? C.gold : C.whiteDim }} onMouseEnter={e => (e.currentTarget.style.color = C.goldLight)} onMouseLeave={e => (e.currentTarget.style.color = link.label === 'HAIVN.AI' ? C.gold : C.whiteDim)}>
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
        <img src={IMAGES.brandAvatar4k} alt="" className="w-full h-full object-cover opacity-[0.20]" style={{ objectPosition: 'center 30%' }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${C.charcoal} 0%, ${C.charcoal}cc 30%, rgba(61,26,120,0.3) 70%, ${C.charcoal}dd 100%)` }} />
      </div>

      <motion.div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1 max-w-[40px]" style={{ backgroundColor: C.gold }} />
            <span className="font-display font-semibold text-xs tracking-[0.3em] uppercase" style={{ color: C.gold }}>DEMAN AI LAB</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }} className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-8" style={{ color: C.white }}>
            {t('Thiết kế', 'Designing')}
            <br />
            <span className="gradient-text-gold">{t('bản vẽ AI cho doanh nghiệp.', 'AI blueprints for businesses.')}</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }} className="text-lg md:text-xl leading-relaxed max-w-xl mb-10" style={{ color: C.whiteMuted }}>
            {t(
              'Mình là Hải — người thiết kế bản vẽ AI cho doanh nghiệp Việt. Đã xây dựng 6 mô hình kinh doanh, bán hơn 3 triệu sản phẩm trên ecom. Đội ngũ AI Lab mới thành lập gồm 7 người.',
              "I'm Hai — the designer of AI blueprints for Vietnamese businesses. Built 6 business models, sold over 3 million products on ecom. AI Lab team newly established with 7 people."
            )}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.6 }} className="flex flex-wrap gap-4">
            <a href="https://haivn.ai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 font-display font-semibold text-base transition-all duration-300" style={{ color: C.charcoal, backgroundColor: C.gold, borderRadius: '2px' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.goldLight; e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = C.gold; e.currentTarget.style.transform = 'translateY(0)'; }}>
              {t('Tìm hiểu về Hải VN', 'Learn about Hai VN')} <ArrowRight size={16} />
            </a>
            <a href="#cases" className="inline-flex items-center gap-2 px-8 py-4 font-display font-semibold text-base transition-all duration-300" style={{ color: C.white, border: `1px solid ${C.whiteAlpha(0.2)}`, borderRadius: '2px' }} onMouseEnter={e => { e.currentTarget.style.borderColor = C.goldAlpha(0.5); e.currentTarget.style.color = C.gold; }} onMouseLeave={e => { e.currentTarget.style.borderColor = C.whiteAlpha(0.2); e.currentTarget.style.color = C.white; }}>
              {t('Xem bằng chứng thực chiến', 'See Real Proof')}
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }} className="flex flex-wrap gap-12 mt-20 pt-8" style={{ borderTop: `1px solid ${C.whiteAlpha(0.08)}` }}>
            {[
              { num: '11+', label: t('Chương trình đã triển khai', 'Programs Delivered') },
              { num: '6+', label: t('Mô hình kinh doanh', 'Business Models') },
              { num: '3M+', label: t('Sản phẩm ecom', 'Ecom Products Sold') },
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

// ═══ POSITIONING SECTION — 1-3-5 Principle ═══
function PositioningSection() {
  const { t } = useLanguage();

  return (
    <section className="relative py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Mission WHY */}
        <FadeInSection className="max-w-4xl mx-auto text-center mb-24">
          <SectionLabel>{t('Sứ mệnh', 'Our Mission')}</SectionLabel>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-8" style={{ color: C.white }}>
            {t('Khai phá giới hạn con người', 'Unlock human potential')}
            <br />
            <span className="gradient-text-gold">{t('trong kỷ nguyên số.', 'in the digital era.')}</span>
          </h2>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: C.whiteMuted }}>
            {t(
              'Chúng tôi tin rằng AI không thay thế con người — AI khai phá những gì con người chưa kịp chạm tới. Khi bạn có bản vẽ đúng, một người có thể làm được việc của mười người. Đó là lý do DEMAN AI LAB tồn tại.',
              'We believe AI doesn\'t replace humans — AI unlocks what humans haven\'t reached yet. With the right blueprint, one person can do the work of ten. That\'s why DEMAN AI LAB exists.'
            )}
          </p>
        </FadeInSection>

        {/* CEO Pain Points → Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <FadeInSection delay={0}>
            <div className="p-8 h-full" style={{ backgroundColor: C.whiteAlpha(0.02), border: `1px solid ${C.whiteAlpha(0.06)}`, borderRadius: '4px' }}>
              <h3 className="font-display font-bold text-xl mb-6" style={{ color: '#EF4444' }}>
                {t('Bạn đang ở đây?', 'Are you here?')}
              </h3>
              <div className="space-y-4">
                {[
                  t('Team 5-10 người làm content nhưng output vẫn không đủ', '5-10 person content team but output still not enough'),
                  t('Mua hàng chục tool AI nhưng không ai biết dùng đúng cách', 'Bought dozens of AI tools but nobody knows how to use them right'),
                  t('Chi phí marketing tăng nhưng hiệu quả giảm dần', 'Marketing costs rising but effectiveness declining'),
                  t('Muốn scale nhưng cứ thuê thêm người là thêm rối', 'Want to scale but hiring more people just adds chaos'),
                  t('Biết AI quan trọng nhưng không biết bắt đầu từ đâu', 'Know AI is important but don\'t know where to start'),
                ].map((pain, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-sm mt-0.5" style={{ color: '#EF4444' }}>✕</span>
                    <p className="text-sm leading-relaxed" style={{ color: C.whiteMuted }}>{pain}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.15}>
            <div className="p-8 h-full" style={{ backgroundColor: C.goldAlpha(0.04), border: `1px solid ${C.goldAlpha(0.15)}`, borderRadius: '4px' }}>
              <h3 className="font-display font-bold text-xl mb-6" style={{ color: C.gold }}>
                {t('Đây là nơi bạn cần đến.', 'This is where you need to be.')}
              </h3>
              <div className="space-y-4">
                {[
                  t('1 người vận hành cả thương hiệu quốc tế nhờ AI (ONIIZ US)', '1 person operates entire international brand with AI (ONIIZ US)'),
                  t('80% quy trình từ ý tưởng đến publish tự động (V2JOY)', '80% process from idea to publish automated (V2JOY)'),
                  t('Từ 0 đến hệ sinh thái 6 mô hình kinh doanh', 'From 0 to ecosystem of 6 business models'),
                  t('Team 7 người AI Lab vận hành ngang team 30 người truyền thống', '7-person AI Lab team operates at the level of 30-person traditional team'),
                  t('Bản vẽ hệ thống — không phải dạy dùng tool', 'System blueprint — not tool training'),
                ].map((solution, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-sm mt-0.5" style={{ color: C.gold }}>✓</span>
                    <p className="text-sm leading-relaxed" style={{ color: C.whiteMuted }}>{solution}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeInSection>
        </div>

        {/* Journey: Stranger → Partner (CEO perspective, no prices) */}
        <FadeInSection>
          <div className="text-center mb-12">
            <SectionLabel>{t('Hành trình đồng hành', 'Partnership Journey')}</SectionLabel>
            <h3 className="font-display font-bold text-2xl sm:text-3xl leading-tight" style={{ color: C.white }}>
              {t('Từ ', 'From ')}<span className="gradient-text-gold">{t('tìm hiểu đến đồng hành', 'discovery to partnership')}</span>
            </h3>
            <p className="text-sm mt-3 max-w-xl mx-auto" style={{ color: C.whiteDim }}>
              {t('Mỗi bước đều được thiết kế để bạn trải nghiệm giá trị thật trước khi quyết định đi tiếp.', 'Each step is designed for you to experience real value before deciding to go further.')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { step: '01', title: t('Khám phá', 'Discover'), desc: t('Đọc Game of Ecom, xem video behind-the-scenes, tham gia cộng đồng — cảm nhận tư duy trước khi đầu tư.', 'Read Game of Ecom, watch behind-the-scenes videos, join community — feel the thinking before investing.'), color: '#10B981', channel: t('Miễn phí', 'Free') },
              { step: '02', title: t('Trải nghiệm', 'Experience'), desc: t('Tham gia workshop, webinar chiến lược — thấy được cách AI thay đổi vận hành thực tế trong 60 phút.', 'Join workshops, strategy webinars — see how AI changes real operations in 60 minutes.'), color: '#3B82F6', channel: t('Workshop & Webinar', 'Workshop & Webinar') },
              { step: '03', title: t('Chuyển đổi', 'Transform'), desc: t('Group coaching chuyên sâu — thiết kế bản vẽ AI cho chính doanh nghiệp của bạn, thực hành ngay.', 'Intensive group coaching — design AI blueprint for your own business, practice immediately.'), color: '#F59E0B', channel: t('Group Coaching', 'Group Coaching') },
              { step: '04', title: t('Đồng hành', 'Partner'), desc: t('1-on-1 consulting — 90 ngày đồng hành trực tiếp, thiết kế hệ thống AI toàn diện, đào tạo team.', '1-on-1 consulting — 90 days direct mentoring, design complete AI system, train your team.'), color: '#EF4444', channel: t('1-on-1 Consulting', '1-on-1 Consulting') },
            ].map((item, i) => (
              <FadeInSection key={i} delay={i * 0.1}>
                <div className="p-6 h-full relative transition-all duration-500" style={{ backgroundColor: C.whiteAlpha(0.02), border: `1px solid ${C.whiteAlpha(0.06)}`, borderRadius: '4px' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = item.color + '40'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.whiteAlpha(0.06); }}>
                  <div className="font-display font-bold text-xs tracking-wider mb-3" style={{ color: item.color }}>{item.step}</div>
                  <h4 className="font-display font-bold text-lg mb-2" style={{ color: C.white }}>{item.title}</h4>
                  <p className="text-xs leading-relaxed mb-4" style={{ color: C.whiteMuted }}>{item.desc}</p>
                  <div className="text-xs font-semibold px-2 py-1 inline-block" style={{ color: item.color, backgroundColor: item.color + '12', borderRadius: '2px' }}>{item.channel}</div>
                  {i < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-2.5 transform -translate-y-1/2 z-10">
                      <ChevronRight size={16} style={{ color: C.goldAlpha(0.4) }} />
                    </div>
                  )}
                </div>
              </FadeInSection>
            ))}
          </div>
        </FadeInSection>

        {/* Community & Real Projects */}
        <FadeInSection className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Communities */}
            <div className="p-8" style={{ backgroundColor: C.whiteAlpha(0.02), border: `1px solid ${C.whiteAlpha(0.06)}`, borderRadius: '4px' }}>
              <h3 className="font-display font-bold text-lg mb-6" style={{ color: C.white }}>
                {t('Cộng đồng', 'Communities')}
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'Clone Your Mind™ Academy', desc: 'Skool', href: 'https://www.skool.com/clone-your-mind-academy-4398', icon: '🎓' },
                  { name: t('Cộng đồng AI Marketing', 'AI Marketing Community'), desc: 'Facebook Group', href: 'https://www.facebook.com/groups/471620336015059', icon: '👥' },
                  { name: t('Cộng đồng AI Ecom', 'AI Ecom Community'), desc: 'Facebook Group', href: 'https://www.facebook.com/groups/31029373586675973', icon: '🛒' },
                ].map((community, i) => (
                  <a key={i} href={community.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-3 transition-all duration-300 group" style={{ backgroundColor: C.whiteAlpha(0.02), borderRadius: '4px' }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.whiteAlpha(0.06); }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = C.whiteAlpha(0.02); }}>
                    <span className="text-xl">{community.icon}</span>
                    <div className="flex-1">
                      <span className="font-display font-semibold text-sm block" style={{ color: C.white }}>{community.name}</span>
                      <span className="text-xs" style={{ color: C.whiteDim }}>{community.desc}</span>
                    </div>
                    <ExternalLink size={14} style={{ color: C.whiteDim }} />
                  </a>
                ))}
              </div>
            </div>

            {/* Real Projects */}
            <div className="p-8" style={{ backgroundColor: C.whiteAlpha(0.02), border: `1px solid ${C.whiteAlpha(0.06)}`, borderRadius: '4px' }}>
              <h3 className="font-display font-bold text-lg mb-6" style={{ color: C.white }}>
                {t('Dự án đang triển khai', 'Active Projects')}
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'DEMAN AI LAB', desc: t('Trang chính thức', 'Official Page'), href: 'https://www.facebook.com/demanlab', icon: '🤖' },
                  { name: 'The Masculine Lab', desc: t('ONIIZ Menscare', 'ONIIZ Menscare'), href: 'https://www.facebook.com/themasculinelab', icon: '🧴' },
                  { name: 'BIG MANZ', desc: t('For The Big Things', 'For The Big Things'), href: 'https://www.facebook.com/bigmanz.forthebigthings/', icon: '💪' },
                  { name: 'Ziino Nói Thiệt', desc: t('Hệ sinh thái truyện tranh từ mascot Ziino', 'Comic ecosystem from Ziino mascot'), href: 'https://www.facebook.com/ziinonoithiet', icon: '📚' },
                ].map((project, i) => (
                  <a key={i} href={project.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-3 transition-all duration-300 group" style={{ backgroundColor: C.whiteAlpha(0.02), borderRadius: '4px' }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.whiteAlpha(0.06); }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = C.whiteAlpha(0.02); }}>
                    <span className="text-xl">{project.icon}</span>
                    <div className="flex-1">
                      <span className="font-display font-semibold text-sm block" style={{ color: C.white }}>{project.name}</span>
                      <span className="text-xs" style={{ color: C.whiteDim }}>{project.desc}</span>
                    </div>
                    <ExternalLink size={14} style={{ color: C.whiteDim }} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

// ═══ SERVICES SECTION — 3-Tier Funnel ═══
function ServicesSection() {
  const { t } = useLanguage();

  const tiers = [
    {
      tier: t('Tầng 1 — Khám phá', 'Tier 1 — Discover'),
      price: t('Miễn phí', 'Free'),
      color: '#10B981',
      desc: t('Nội dung giá trị miễn phí để bạn trải nghiệm tư duy AI-First trước khi đầu tư.', 'Free value content to experience AI-First thinking before investing.'),
      items: [
        { icon: BookOpen, name: t('Ebook Game of Ecom', 'Game of Ecom Ebook'), detail: t('16 chương — hành trình từ tiệm tạp hóa đến hệ sinh thái AI', '16 chapters — journey from grocery store to AI ecosystem') },
        { icon: Play, name: t('Video & Podcast miễn phí', 'Free Videos & Podcasts'), detail: t('Behind-the-scenes vận hành, case study thực tế', 'Operations behind-the-scenes, real case studies') },
        { icon: FileText, name: t('Blog & Newsletter haivn.ai', 'Blog & Newsletter haivn.ai'), detail: t('Bài viết chuyên sâu về AI Architecture', 'In-depth articles on AI Architecture') },
      ],
      cta: { label: t('Đọc Game of Ecom miễn phí', 'Read Game of Ecom Free'), href: '/game-of-ecom', internal: true },
    },
    {
      tier: t('Tầng 2 — Group Coaching', 'Tier 2 — Group Coaching'),
      price: t('Liên hệ tư vấn', 'Contact Us'),
      color: '#F59E0B',
      desc: t('Khóa học nhóm chuyên sâu — thiết kế bản vẽ AI trong 60 phút, thực hành với case study thực tế. Báo giá cá nhân hóa theo nhu cầu.', 'Intensive group courses — design AI blueprint in 60 min, practice with real case studies. Personalized pricing based on needs.'),
      items: [
        { icon: Bitcoin, name: 'AI for Crypto', detail: t('5 buổi chuyên sâu — AI x Crypto ecosystem', '5 intensive sessions — AI x Crypto ecosystem') },
        { icon: ShoppingCart, name: 'AI for Affiliate', detail: t('4 buổi + Workshop — Affiliate Engine™', '4 sessions + Workshop — Affiliate Engine™') },
        { icon: Package, name: 'AI for Dropship', detail: t('4 buổi — Mô hình dropship AI', '4 sessions — AI Dropship Model') },
        { icon: Palette, name: 'ZDES.AI', detail: t('Workshop — Visual Storyteller pathway', 'Workshop — Visual Storyteller pathway') },
        { icon: Megaphone, name: t('Brand Storytelling Video', 'Brand Storytelling Video'), detail: t('Workshop — AI Persona & Viral', 'Workshop — AI Persona & Viral') },
      ],
      cta: { label: t('Xem chương trình đào tạo', 'View Training Programs'), href: '#programs', internal: true },
    },
    {
      tier: t('Tầng 3 — 1-on-1 Consulting', 'Tier 3 — 1-on-1 Consulting'),
      price: t('Liên hệ tư vấn', 'Contact Us'),
      color: '#EF4444',
      desc: t('Thiết kế hệ thống AI toàn diện cho doanh nghiệp — 90 ngày chuyển đổi, đồng hành trực tiếp. Báo giá cá nhân hóa theo quy mô doanh nghiệp.', 'Design complete AI system for business — 90-day transformation, direct mentoring. Personalized pricing based on business scale.'),
      items: [
        { icon: Cpu, name: t('AI System Architecture', 'AI System Architecture'), detail: t('Thiết kế SOP, workflow, CRM tự động', 'Design SOP, workflow, automated CRM') },
        { icon: Zap, name: t('AI Content Factory', 'AI Content Factory'), detail: t('Nhà máy content vô hạn 24/7', 'Infinite content factory 24/7') },
        { icon: BarChart3, name: t('Performance Marketing x AI', 'Performance Marketing x AI'), detail: t('Tối ưu ads, funnel, pipeline', 'Optimize ads, funnel, pipeline') },
        { icon: Users, name: t('Mentoring & Đào tạo team', 'Mentoring & Team Training'), detail: t('Đồng hành 90 ngày, phỏng vấn, setup vị trí AI', '90-day support, interviews, AI role setup') },
      ],
      cta: { label: t('Liên hệ tư vấn', 'Contact for Consulting'), href: 'https://www.facebook.com/deman.hai', internal: false },
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
            {t('Hệ sinh thái giá trị.', 'Value ecosystem.')}
            <span className="gradient-text-gold"> {t('Một hành trình.', 'One journey.')}</span>
          </h2>
          <p className="text-lg max-w-2xl mb-16" style={{ color: C.whiteMuted }}>
            {t(
              'Từ nội dung miễn phí đến đồng hành 1-on-1 — mỗi tầng đều được thiết kế để bạn trải nghiệm giá trị thật trước khi quyết định đi tiếp. Báo giá cá nhân hóa theo nhu cầu của bạn.',
              'From free content to 1-on-1 partnership — each tier is designed for you to experience real value before deciding to go further. Personalized pricing based on your needs.'
            )}
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <FadeInSection key={i} delay={i * 0.12}>
              <div className="p-8 h-full transition-all duration-500 group relative overflow-hidden flex flex-col" style={{ backgroundColor: C.whiteAlpha(0.02), border: `1px solid ${i === 2 ? tier.color + '30' : C.whiteAlpha(0.06)}`, borderRadius: '4px' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = tier.color + '50'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = i === 2 ? tier.color + '30' : C.whiteAlpha(0.06); }}>
                {i === 2 && (
                  <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, ${tier.color}, ${C.gold})` }} />
                )}
                <div className="flex items-center justify-between mb-5">
                  <span className="font-display font-bold text-xs tracking-wider uppercase" style={{ color: tier.color }}>{tier.tier}</span>
                  <span className="font-display font-bold text-sm px-3 py-1" style={{ color: tier.color, backgroundColor: tier.color + '12', borderRadius: '2px' }}>{tier.price}</span>
                </div>
                <p className="text-sm leading-relaxed mb-6" style={{ color: C.whiteMuted }}>{tier.desc}</p>

                <div className="space-y-3 mb-8 flex-1">
                  {tier.items.map((item, j) => (
                    <div key={j} className="flex items-start gap-3 p-3 transition-colors" style={{ backgroundColor: C.whiteAlpha(0.02), borderRadius: '4px' }}>
                      <item.icon size={16} className="mt-0.5 flex-shrink-0" style={{ color: tier.color }} />
                      <div>
                        <span className="font-display font-semibold text-sm block" style={{ color: C.white }}>{item.name}</span>
                        <span className="text-xs" style={{ color: C.whiteDim }}>{item.detail}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <a href={tier.cta.href} {...(!tier.cta.internal ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="inline-flex items-center justify-center gap-2 w-full py-3 font-display font-semibold text-sm transition-all duration-300" style={{ color: i === 2 ? C.charcoal : tier.color, backgroundColor: i === 2 ? tier.color : 'transparent', border: i === 2 ? 'none' : `1px solid ${tier.color}40`, borderRadius: '2px' }}>
                  {tier.cta.label} {tier.cta.internal ? <ArrowRight size={14} /> : <ExternalLink size={14} />}
                </a>
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
      desc: t('Tái cấu trúc kênh bán hàng thương hiệu cá nhân — xây dựng tài sản số bền vững bằng AI. Case study thực tế: Học viên C** (15K followers).', 'Restructure personal brand sales channels — build sustainable digital assets with AI. Real case study: Student C** (15K followers).'),
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
        'Thương hiệu Menscare xây từ con số 0 giữa đại dịch COVID. Sản phẩm chiến lược Masculine Foam — tôn vinh nam tính mới. ONIIZ VN với đội ngũ vận hành riêng đã bán 3M+ sản phẩm, 300K+ đánh giá 5 sao. ONIIZ US đang mở rộng quốc tế với mô hình 1 người x AI.',
        "Menscare brand built from zero during COVID. Hero product Masculine Foam — celebrating new masculinity. ONIIZ VN with dedicated team sold 3M+ products, 300K+ 5-star reviews. ONIIZ US expanding internationally with 1 person x AI model."
      ),
      results: [t('ONIIZ VN: 3M+ sản phẩm', 'ONIIZ VN: 3M+ products'), t('ONIIZ US: 1 người x AI', 'ONIIZ US: 1 person x AI'), t('Shopee + Amazon', 'Shopee + Amazon'), t('Mascot Ziino', 'Mascot Ziino')],
      links: [{ label: 'oniiz.vn', href: 'https://oniiz.vn' }, { label: 'Shopee', href: 'https://shopee.vn/oniizvietnam' }],
      icon: ShoppingCart, color: '#3B82F6',
      image: IMAGES.oniizHero,
      logo: IMAGES.oniizLogo,
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
      image: IMAGES.bigmanzCombo,
      logo: IMAGES.bigmanzLogo,
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
      image: IMAGES.v2joyProducts,
      logo: null as string | null,
    },
    {
      name: 'GAME OF ECOM',
      type: t('Tự truyện số / Sách', 'Digital Autobiography / Book'),
      desc: t(
        'Câu chuyện thật, cảm xúc thật — hành trình từ tiệm tạp hóa nhỏ đến hệ sinh thái Human × AI. 16 chương kể về thất bại, đứng dậy, và kiến tạo tương lai.',
        'Real story, real emotions — the journey from a tiny grocery store to a Human × AI ecosystem. 16 chapters about failure, rising up, and building the future.'
      ),
      results: [t('16 chương', '16 chapters'), t('From Vietnam Go Global', 'From Vietnam Go Global'), t('Ebook miễn phí', 'Free Ebook')],
      links: [{ label: t('Đọc Ebook', 'Read Ebook'), href: '/game-of-ecom' }],
      icon: BookOpen, color: '#10B981',
      image: IMAGES.gameofecomHero,
      logo: null as string | null,
    },
  ];

  return (
    <section id="cases" className="relative py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeInSection>
          <SectionLabel>{t('3 câu chuyện chứng minh', '3 Proof Stories')}</SectionLabel>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6" style={{ color: C.white }}>
            {t('Không nói suông.', "No empty talk.")}
            <span className="gradient-text-gold"> {t('Đây là bằng chứng.', "Here's the proof.")}</span>
          </h2>
          <p className="text-lg max-w-2xl mb-12" style={{ color: C.whiteMuted }}>
            {t(
              'Mỗi thương hiệu đều được vận hành bằng AI — từ content, ads, đến chăm sóc khách hàng. Đây không phải lý thuyết, mà là hệ thống mình đang dùng mỗi ngày.',
              "Every brand is AI-operated — from content, ads, to customer care. This isn't theory, it's the system I use every day."
            )}
          </p>
          <div className="flex items-center gap-3 mb-16">
            <a href="https://haivn.ai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-display font-semibold transition-colors" style={{ color: C.gold }}
              onMouseEnter={e => (e.currentTarget.style.color = C.goldLight)}
              onMouseLeave={e => (e.currentTarget.style.color = C.gold)}>
              {t('Đọc chi tiết tại haivn.ai', 'Read details at haivn.ai')} <ArrowUpRight size={14} />
            </a>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {cases.map((cs, i) => (
            <FadeInSection key={i} delay={i * 0.1}>
              <div className="p-8 md:p-10 h-full transition-all duration-500 group relative overflow-hidden" style={{ backgroundColor: C.whiteAlpha(0.02), border: `1px solid ${C.whiteAlpha(0.06)}`, borderRadius: '4px' }}>
                {/* Brand Image with Logo Overlay */}
                {cs.image && (
                  <div className="relative w-full h-40 mb-5 overflow-hidden rounded-sm" style={{ border: `1px solid ${C.whiteAlpha(0.06)}` }}>
                    <img src={cs.image} alt={cs.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                    {cs.logo && (
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-sm p-1.5" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
                        <img src={cs.logo} alt={`${cs.name} logo`} className="h-7 w-auto object-contain" />
                      </div>
                    )}
                  </div>
                )}

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
                  {cs.links.map((link, j) => {
                    const isInternal = link.href.startsWith('/');
                    return (
                      <a key={j} href={link.href} {...(!isInternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="flex items-center gap-1.5 text-sm font-display font-semibold transition-colors" style={{ color: C.gold }} onMouseEnter={e => (e.currentTarget.style.color = C.goldLight)} onMouseLeave={e => (e.currentTarget.style.color = C.gold)}>
                        {link.label} {isInternal ? <ArrowRight size={12} /> : <ExternalLink size={12} />}
                      </a>
                    );
                  })}
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

  const nocValues = [
    {
      num: '01',
      title: t('Cho là Nhận', 'Giving is Receiving'),
      desc: t(
        'Khi bạn cho đi bằng sự chân thành, bạn không mất đi — bạn đang gieo hạt. Sự chia sẻ vốn dĩ đã là hạnh phúc.',
        'When you give with sincerity, you don\'t lose — you\'re planting seeds. Sharing itself is happiness.'
      ),
    },
    {
      num: '02',
      title: t('Mình là Gốc Rễ của Mọi Vấn Đề', 'I Am the Root of Every Problem'),
      desc: t(
        'Trước khi đổ lỗi cho hoàn cảnh, hãy nhìn vào chính mình. Mình thay đổi thì mọi thứ xung quanh sẽ thay đổi theo.',
        'Before blaming circumstances, look at yourself. When you change, everything around you changes too.'
      ),
    },
    {
      num: '03',
      title: t('Đức Năng Thắng Số', 'Virtue Conquers Fate'),
      desc: t(
        'Phẩm chất và năng lực thắng số lượng. Chăm chỉ và tích cực — hai đức tính tạo nên sự khác biệt bền vững.',
        'Quality and capability beat quantity. Diligence and positivity — two virtues that create lasting difference.'
      ),
    },
  ];

  const ecosystem = [
    { icon: '🧴', name: 'Oniiz', desc: t('Chăm sóc cá nhân nam giới — BE YOUR POWER', 'Men\'s personal care — BE YOUR POWER') },
    { icon: '🌎', name: 'Oniiz US', desc: t('Go Global qua Amazon', 'Go Global via Amazon') },
    { icon: '💜', name: 'V2Joy', desc: t('Chăm sóc cá nhân nam & nữ', 'Personal care for all') },
    { icon: '🌿', name: 'MystiGarden', desc: t('Chữa lành & nuôi dưỡng', 'Healing & nurturing') },
    { icon: '🎭', name: 'Masqmuse', desc: t('Cá tính & sáng tạo', 'Personality & creativity') },
    { icon: '🤖', name: 'DEMAN AI LAB', desc: t('AI phụng sự con người', 'AI serving humanity') },
  ];

  return (
    <section id="about" className="relative py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Hero intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
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
            <SectionLabel>{t('Về tác giả', 'About the Author')}</SectionLabel>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-3" style={{ color: C.white }}>
              {t('Hải VN', 'Hai VN')}
            </h2>
            <p className="text-base mb-2" style={{ color: C.goldLight }}>
              {t('Người thiết kế "bản vẽ AI" cho doanh nghiệp Việt', 'The designer of "AI blueprints" for Vietnamese businesses')}
            </p>
            <p className="text-sm mb-6" style={{ color: C.whiteDim }}>
              Founder & CEO DeMAN · AI Architect · {t('Tác giả Game of Ecom', 'Author of Game of Ecom')}
            </p>
            <div className="space-y-4 mb-8">
              <p className="text-base leading-relaxed" style={{ color: C.whiteMuted }}>
                {t(
                  'Vũ Ngọc Hải lớn lên trong một gia đình bình thường ở Việt Nam. Bố là người dậy sớm nhất nhà, lặng lẽ nấu cơm cho cả gia đình. Mẹ là người sáng tạo, biến tiệm tạp hóa nhỏ thành nguồn thu nuôi cả nhà. Những bài học đầu đời không đến từ sách vở — mà đến từ tấm lưng bố bên bếp lửa, từ nụ cười mẹ khi bán được hàng.',
                  'Vu Ngoc Hai grew up in an ordinary family in Vietnam. His father was the earliest riser, quietly cooking for the whole family. His mother was creative, turning a tiny grocery store into the family\'s livelihood. Life\'s first lessons didn\'t come from books — but from his father\'s back by the stove, from his mother\'s smile when she made a sale.'
                )}
              </p>
              <p className="text-base leading-relaxed" style={{ color: C.whiteMuted }}>
                {t(
                  'Hành trình kinh doanh bắt đầu từ rất sớm — và cũng thất bại từ rất sớm. Từ việc bán 100 cái áo Pokemon lỗ sấp mặt, đến "Lời Nguyền 3 Năm" khi mọi thứ dường như đổ vỡ. Nhưng mỗi lần gục ngã, Hải lại đứng dậy với một bài học mới.',
                  'The business journey started early — and failed early too. From selling 100 Pokemon shirts at a total loss, to the "3-Year Curse" when everything seemed to collapse. But every time he fell, Hai stood back up with a new lesson.'
                )}
              </p>
              <p className="text-base leading-relaxed" style={{ color: C.whiteMuted }}>
                {t(
                  'Ngày 7/7/2021, giữa đại dịch COVID, Oniiz ra đời — thương hiệu chăm sóc cá nhân cho nam giới, được xây dựng trên nền tảng niềm tin về Nam Tính Mới. Từ Oniiz, Hải tiếp tục xây dựng hệ sinh thái DeMAN — Delicious Man — với sứ mệnh Tôn Vinh Giá Trị Con Người.',
                  'On July 7, 2021, amid the COVID pandemic, Oniiz was born — a men\'s personal care brand built on the belief of New Masculinity. From Oniiz, Hai continued building the DeMAN ecosystem — Delicious Man — with the mission of Honoring Human Value.'
                )}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              {[
                t('6 mô hình kinh doanh', '6 business models'),
                t('3M+ sản phẩm ecom', '3M+ ecom products'),
                t('AI Lab 7 người', 'AI Lab 7-person team'),
                t('11+ chương trình', '11+ programs'),
                'Clone Your Mind™',
              ].map(tag => (
                <span key={tag} className="text-xs px-3 py-1.5 font-medium" style={{ color: C.gold, border: `1px solid ${C.goldAlpha(0.2)}`, borderRadius: '2px' }}>{tag}</span>
              ))}
            </div>

            {/* CTA to haivn.ai */}
            <a href="https://haivn.ai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 font-display font-semibold text-sm transition-all duration-300" style={{ color: C.charcoal, backgroundColor: C.gold, borderRadius: '2px' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.goldLight; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = C.gold; e.currentTarget.style.transform = 'translateY(0)'; }}>
              {t('Đọc thêm về Hải VN tại haivn.ai', 'Read more about Hai VN at haivn.ai')} <ArrowUpRight size={14} />
            </a>
          </FadeInSection>
        </div>

        {/* 3 NỌC — Core Values */}
        <FadeInSection className="mb-24">
          <div className="text-center mb-12">
            <SectionLabel>{t('Triết lý sống', 'Life Philosophy')}</SectionLabel>
            <h3 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl leading-tight" style={{ color: C.white }}>
              {t('3 NỌC', '3 Core Values')} — <span className="gradient-text-gold">{t('Kim chỉ nam cho mọi quyết định', 'Compass for every decision')}</span>
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nocValues.map((noc, i) => (
              <div key={i} className="p-8 transition-all duration-500 group" style={{ backgroundColor: C.surfaceLight, border: `1px solid ${C.whiteAlpha(0.06)}`, borderRadius: '4px' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.goldAlpha(0.3); e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.whiteAlpha(0.06); e.currentTarget.style.transform = 'translateY(0)'; }}>
                <span className="font-display font-bold text-3xl block mb-3" style={{ color: C.goldAlpha(0.25) }}>NỌC {noc.num}</span>
                <h4 className="font-display font-bold text-lg mb-3" style={{ color: C.gold }}>{noc.title}</h4>
                <p className="text-sm leading-relaxed" style={{ color: C.whiteMuted }}>{noc.desc}</p>
              </div>
            ))}
          </div>
        </FadeInSection>

        {/* Hệ sinh thái DeMAN */}
        <FadeInSection className="mb-16">
          <div className="text-center mb-12">
            <SectionLabel>{t('Hệ sinh thái', 'Ecosystem')}</SectionLabel>
            <h3 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl leading-tight mb-4" style={{ color: C.white }}>
              DeMAN — <span className="gradient-text-gold">{t('Tôn Vinh Giá Trị Con Người', 'Honoring Human Value')}</span>
            </h3>
            <p className="text-base max-w-2xl mx-auto" style={{ color: C.whiteMuted }}>
              {t(
                'Từ một chai bọt vệ sinh nam đến hệ sinh thái toàn cầu — mỗi thương hiệu đều mang cùng một sứ mệnh.',
                'From a men\'s foam cleanser to a global ecosystem — every brand carries the same mission.'
              )}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {ecosystem.map((brand, i) => (
              <div key={i} className="text-center p-5 transition-all duration-300" style={{ backgroundColor: C.surface, border: `1px solid ${C.whiteAlpha(0.06)}`, borderRadius: '4px' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.goldAlpha(0.3); }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.whiteAlpha(0.06); }}>
                <span className="text-2xl block mb-2">{brand.icon}</span>
                <span className="font-display font-bold text-sm block mb-1" style={{ color: C.white }}>{brand.name}</span>
                <span className="text-xs" style={{ color: C.whiteDim }}>{brand.desc}</span>
              </div>
            ))}
          </div>
        </FadeInSection>

        {/* Quotes */}
        <FadeInSection>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              t(
                '"Bạn cứ chăm chỉ, cứ chân thành, cứ tích cực — rồi mọi thứ sẽ ổn. Không phải ngay lập tức, nhưng chắc chắn sẽ ổn."',
                '"Stay diligent, stay authentic, stay positive — and everything will work out. Not immediately, but it surely will."'
              ),
              t(
                '"Sản phẩm chỉ là phương tiện. Văn hóa mới là đích đến. Bạn có thể copy sản phẩm, copy giá, copy marketing — nhưng bạn không thể copy linh hồn."',
                '"Products are just vehicles. Culture is the destination. You can copy products, prices, marketing — but you can\'t copy the soul."'
              ),
              t(
                '"Cuộc đời chỉ có một, nhưng mỗi giai đoạn là một cuộc sống nhỏ khác nhau. Hãy sống thật với từng cuộc sống nhỏ đó."',
                '"Life is one, but each phase is a different small life. Live authentically in each of those small lives."'
              ),
            ].map((quote, i) => (
              <div key={i} className="flex gap-4 items-start">
                <Quote size={20} className="flex-shrink-0 mt-1" style={{ color: C.goldAlpha(0.4) }} />
                <p className="text-base leading-relaxed italic" style={{ color: C.goldLight }}>{quote}</p>
              </div>
            ))}
            <p className="text-right text-sm font-display font-semibold" style={{ color: C.whiteDim }}>— Hải VN, Game of Ecom</p>
          </div>
        </FadeInSection>
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
        <img src={IMAGES.brandAvatar2k} alt="" className="w-full h-full object-cover opacity-[0.12]" style={{ objectPosition: 'center center' }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${C.charcoal}, rgba(61,26,120,0.15) 50%, ${C.charcoal})` }} />
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

// ═══ TESTIMONIALS SECTION ═══
function TestimonialsSection() {
  const { t } = useLanguage();

  const testimonials = [
    {
      name: t('Chị C** N.', 'Ms. C** N.'),
      role: t('Học viên AI for Affiliate', 'AI for Affiliate Student'),
      quote: t(
        'Trước khi học, mình chỉ biết đăng bài bán hàng thủ công. Sau khóa học, mình đã xây được hệ thống content tự động, từ 0 lên 15K followers trong 3 tháng. Anh Hải không chỉ dạy AI, anh ấy dạy cách tư duy.',
        'Before the course, I only knew how to post manually. After, I built an automated content system, from 0 to 15K followers in 3 months. Hai doesn\'t just teach AI, he teaches how to think.'
      ),
      result: t('0 → 15K followers / 3 tháng', '0 → 15K followers / 3 months'),
      program: 'AI for Affiliate',
    },
    {
      name: t('Anh M** T.', 'Mr. M** T.'),
      role: t('Founder startup Nội thất', 'Furniture Startup Founder'),
      quote: t(
        'Mình tham gia AI for Dropship với tâm thế hoài nghi. Nhưng sau 4 buổi, mình đã setup được store tự động, AI viết mô tả sản phẩm, AI tạo ảnh — tiết kiệm 70% thời gian so với trước. Game changer thật sự.',
        'I joined AI for Dropship skeptically. But after 4 sessions, I set up an automated store, AI writes descriptions, AI creates images — saving 70% time. A real game changer.'
      ),
      result: t('Tiết kiệm 70% thời gian vận hành', '70% time saved in operations'),
      program: 'AI for Dropship',
    },
    {
      name: t('Chị H** L.', 'Ms. H** L.'),
      role: t('Content Creator & Affiliate Marketer', 'Content Creator & Affiliate Marketer'),
      quote: t(
        'Khóa Brand Storytelling của anh Hải thay đổi hoàn toàn cách mình nhìn nhận content. Không còn là "viết bài bán hàng" nữa, mà là kể câu chuyện thương hiệu. Doanh thu affiliate tăng 200% sau 2 tháng áp dụng.',
        'Hai\'s Brand Storytelling course completely changed how I see content. It\'s no longer "writing sales posts" but telling brand stories. Affiliate revenue increased 200% after 2 months.'
      ),
      result: t('Doanh thu affiliate +200%', 'Affiliate revenue +200%'),
      program: 'Brand Storytelling',
    },
    {
      name: t('Đối tác D***', 'Partner D***'),
      role: t('Đối tác doanh nghiệp', 'Enterprise Partner'),
      quote: t(
        'DEMAN AI LAB đã giúp chúng tôi xây dựng hệ thống content marketing hoàn toàn tự động. Từ việc phải thuê team 5 người làm content, giờ chỉ cần 1 người giám sát AI. Chi phí giảm 60%, output tăng 300%.',
        'DEMAN AI LAB helped us build a fully automated content marketing system. From hiring a 5-person content team, now just 1 person supervises AI. Costs down 60%, output up 300%.'
      ),
      result: t('Chi phí -60%, Output +300%', 'Costs -60%, Output +300%'),
      program: 'AI System Architecture',
    },
    {
      name: t('Anh T** N.', 'Mr. T** N.'),
      role: t('Trader & Nhà đầu tư Crypto', 'Crypto Trader & Investor'),
      quote: t(
        'Khóa AI for Crypto mở ra một góc nhìn hoàn toàn mới. Mình đã dùng AI để phân tích on-chain data, sentiment analysis, và tự động hóa signal tracking. Từ việc trade theo cảm tính, giờ mình có hệ thống rõ ràng.',
        'AI for Crypto opened a completely new perspective. I used AI for on-chain data analysis, sentiment analysis, and automated signal tracking. From emotional trading, now I have a clear system.'
      ),
      result: t('Hệ thống trade tự động', 'Automated trading system'),
      program: 'AI for Crypto',
    },
    {
      name: t('Chị L** Đ.', 'Ms. L** D.'),
      role: t('Chủ shop thời trang online', 'Online Fashion Shop Owner'),
      quote: t(
        'Mình từng burn-out vì phải tự làm mọi thứ — chụp ảnh, viết bài, chạy ads. Sau khóa AI Marketing Automation, AI giúp mình tạo 30 bài/tuần, tự động đăng, tự động trả lời comment. Doanh thu tăng mà mình lại có thời gian cho gia đình.',
        'I was burned out doing everything — photos, writing, running ads. After AI Marketing Automation, AI helps me create 30 posts/week, auto-post, auto-reply comments. Revenue grew while I got time for family.'
      ),
      result: t('30 bài/tuần tự động', '30 posts/week automated'),
      program: 'AI Marketing Automation',
    },
  ];

  return (
    <section className="relative py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeInSection className="text-center max-w-3xl mx-auto mb-20">
          <SectionLabel>{t('Họ nói gì', 'What They Say')}</SectionLabel>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6" style={{ color: C.white }}>
            {t('Câu chuyện thật.', 'Real stories.')}
            <span className="gradient-text-gold"> {t('Kết quả thật.', 'Real results.')}</span>
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: C.whiteMuted }}>
            {t(
              'Mình không nói suông — đây là những người thật, kết quả thật, từ những chương trình mình đã đồng hành.',
              "I don't make empty promises — these are real people, real results, from programs I've personally guided."
            )}
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((tm, i) => (
            <FadeInSection key={i} delay={i * 0.1}>
              <div className="p-8 h-full relative" style={{ backgroundColor: C.whiteAlpha(0.02), border: `1px solid ${C.whiteAlpha(0.06)}`, borderRadius: '4px' }}>
                <Quote size={24} className="mb-4 opacity-30" style={{ color: C.gold }} />
                <p className="text-sm leading-relaxed mb-6 italic" style={{ color: C.whiteMuted }}>
                  "{tm.quote}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-display font-semibold text-sm" style={{ color: C.white }}>{tm.name}</div>
                    <div className="text-xs mt-0.5" style={{ color: C.whiteDim }}>{tm.role}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-semibold px-3 py-1" style={{ color: C.gold, backgroundColor: C.goldAlpha(0.08), borderRadius: '2px' }}>
                      {tm.result}
                    </div>
                    <div className="text-[10px] mt-1.5 tracking-wider uppercase" style={{ color: C.whiteDim }}>{tm.program}</div>
                  </div>
                </div>
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

          <div className="flex flex-wrap justify-center gap-6">
            {[
              { label: 'Facebook', href: 'https://www.facebook.com/demanlab' },
              { label: 'HAIVN.AI', href: 'https://haivn.ai' },
              { label: 'Skool', href: 'https://www.skool.com/clone-your-mind-academy-4398' },
              { label: 'Game of Ecom', href: '/game-of-ecom', internal: true },
              { label: 'The Masculine Lab', href: 'https://www.facebook.com/themasculinelab' },
              { label: 'BIG MANZ', href: 'https://www.facebook.com/bigmanz.forthebigthings/' },
            ].map(social => (
              <a key={social.label} href={social.href} {...(!('internal' in social) ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="text-xs font-medium tracking-wider uppercase transition-colors duration-300" style={{ color: C.whiteDim }} onMouseEnter={e => (e.currentTarget.style.color = C.gold)} onMouseLeave={e => (e.currentTarget.style.color = C.whiteDim)}>
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
            <img src={IMAGES.brandLogo} alt="DEMAN AI LAB" className="h-7 w-auto" />
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs" style={{ color: C.whiteDim }}>
            <a href="#services" className="hover:opacity-80 transition-opacity">{t('Dịch vụ', 'Services')}</a>
            <a href="#cases" className="hover:opacity-80 transition-opacity">{t('Dự án', 'Projects')}</a>
            <a href="https://haivn.ai" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">HAIVN.AI</a>
            <a href="https://www.skool.com/clone-your-mind-academy-4398" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">Skool</a>
            <a href="https://www.facebook.com/groups/471620336015059" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">{t('Cộng đồng', 'Community')}</a>
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
      <PositioningSection />
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
      <TestimonialsSection />
      <GoldDivider />
      <ContactSection />
      <Footer />
    </div>
  );
}

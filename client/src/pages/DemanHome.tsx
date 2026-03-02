/**
 * DEMAN AI LAB — Main Homepage
 * Design: "The Architect's Blueprint" — Dark Luxury Minimalism
 * Colors: Deep charcoal (#0A0A0A) + Warm gold (#D4A853) + Cool white (#F5F5F5)
 * Typography: Sora (display) + DM Sans (body)
 */
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, Brain, Zap, BarChart3, Users, Sparkles, ChevronRight, Play, ExternalLink, Target, Layers, Cpu, MessageSquare, TrendingUp, Shield, Clock, CheckCircle2, Star, ArrowUpRight } from 'lucide-react';

// ═══ CDN Image URLs ═══
const IMAGES = {
  hero: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/demanlab-hero-njb9haQUKrzJT8CzCXjQfQ.webp',
  about: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/demanlab-about-VTRTuSp7AyYsuCBZWw8CXN.webp',
  services: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/demanlab-services-euH6NUowesCcTH57W2UT4W.webp',
  ecosystem: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/demanlab-ecosystem-LXARB7sh7bBmvKfhb7nTCX.webp',
  cta: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/demanlab-cta-RCFmWLmqeXUkURSnPsT6w2.webp',
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

// ═══ Reusable Animation Components ═══
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
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Ecosystem', href: '#ecosystem' },
    { label: 'Case Studies', href: '#cases' },
    { label: 'About', href: '#about' },
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

        <a
          href="#contact"
          className="hidden md:flex items-center gap-2 px-5 py-2.5 text-sm font-display font-semibold transition-all duration-300"
          style={{
            color: C.charcoal,
            backgroundColor: C.gold,
            borderRadius: '2px',
          }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.goldLight; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = C.gold; }}
        >
          Get Started <ArrowRight size={14} />
        </a>
      </div>
    </motion.nav>
  );
}

// ═══ HERO SECTION ═══
function HeroSection() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 200]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img src={IMAGES.hero} alt="" className="w-full h-[120%] object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${C.charcoal}cc 0%, ${C.charcoal}88 40%, ${C.charcoal}dd 80%, ${C.charcoal} 100%)` }} />
      </motion.div>

      {/* Gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${C.goldAlpha(0.4)}, transparent)` }} />

      <motion.div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20" style={{ opacity }}>
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-8"
            style={{ border: `1px solid ${C.goldAlpha(0.3)}`, borderRadius: '2px', backgroundColor: C.goldAlpha(0.05) }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: C.gold }} />
            <span className="font-display text-xs tracking-[0.15em] uppercase" style={{ color: C.gold }}>AI Architect × Builder × Operator</span>
          </motion.div>

          {/* Headline */}
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

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-lg md:text-xl leading-relaxed max-w-2xl mb-12"
            style={{ color: C.whiteMuted }}
          >
            Giúp doanh nghiệp & solopreneurs biến AI thành đồng đội vận hành thật — 
            để làm ít hơn, thông minh hơn, và scale bền vững.
          </motion.p>

          {/* CTAs */}
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
              Khám phá dịch vụ <ArrowRight size={16} />
            </a>
            <a
              href="#cases"
              className="inline-flex items-center gap-2 px-8 py-4 font-display font-semibold text-base transition-all duration-300"
              style={{ color: C.white, border: `1px solid ${C.whiteAlpha(0.2)}`, borderRadius: '2px' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.goldAlpha(0.5); e.currentTarget.style.color = C.gold; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.whiteAlpha(0.2); e.currentTarget.style.color = C.white; }}
            >
              Xem Case Studies
            </a>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-wrap gap-12 mt-20 pt-8"
            style={{ borderTop: `1px solid ${C.whiteAlpha(0.08)}` }}
          >
            {[
              { num: '6+', label: 'Brands Operated' },
              { num: '50+', label: 'AI Workflows Built' },
              { num: '10x', label: 'Productivity Gain' },
              { num: '90', label: 'Day Transformation' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="font-display font-bold text-2xl md:text-3xl" style={{ color: C.gold }}>{stat.num}</div>
                <div className="text-xs tracking-wider uppercase mt-1" style={{ color: C.whiteDim }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
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
  return (
    <section className="relative py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeInSection className="max-w-4xl mx-auto text-center">
          <SectionLabel>Triết lý</SectionLabel>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-8" style={{ color: C.white }}>
            AI không thay thế con người.
            <br />
            <span className="gradient-text-gold">AI khuếch đại con người.</span>
          </h2>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: C.whiteMuted }}>
            Chúng tôi không bán công cụ. Chúng tôi xây dựng <strong style={{ color: C.gold }}>hệ điều hành</strong> — 
            nơi AI trở thành đồng đội vận hành thật sự, gánh việc lặp, giải phóng năng lượng sáng tạo, 
            và giúp bạn ra quyết định dựa trên dữ liệu.
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          {[
            {
              icon: Brain,
              title: 'Clone Your Mind™',
              desc: 'Nhân bản tư duy, giọng điệu, quy trình ra quyết định của bạn thành tài sản AI — để hệ thống vận hành đúng cách bạn muốn.',
            },
            {
              icon: Layers,
              title: 'System, Not Tools',
              desc: 'Không phải 1 tool, mà là hệ thống hoàn chỉnh: Planning → Execution → Tracking → Learning. Mọi thứ kết nối, mọi thứ đo được.',
            },
            {
              icon: TrendingUp,
              title: 'Scale Sustainably',
              desc: 'Từ 1 người vận hành cả team, đến team 5 người làm việc bằng 50. AI là đòn bẩy, không phải phép màu.',
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
  const services = [
    {
      icon: Cpu,
      title: 'AI Transformation 90-Day',
      desc: 'Chương trình chuyển đổi toàn diện: từ chiến lược → triển khai → chuyển giao hệ thống AI cho đội ngũ marketing & vận hành.',
      tags: ['Strategy', 'Implementation', 'Training'],
    },
    {
      icon: Zap,
      title: 'Content Engine Setup',
      desc: 'Xây dựng hệ thống sản xuất nội dung tự động: AI viết, AI thiết kế, AI lên lịch, AI phân tích — chạy 24/7.',
      tags: ['Automation', 'Content', 'AI Agents'],
    },
    {
      icon: BarChart3,
      title: 'AI Operations Consulting',
      desc: 'Tư vấn chiến lược ứng dụng AI vào vận hành: SOP, workflow, CRM, báo cáo tự động, ra quyết định dựa dữ liệu.',
      tags: ['Consulting', 'Workflow', 'Analytics'],
    },
    {
      icon: Users,
      title: 'Clone Your Mind™ Academy',
      desc: 'Đào tạo đội ngũ tự vận hành AI: từ prompt engineering đến xây dựng AI agents, từ cơ bản đến nâng cao.',
      tags: ['Training', 'Community', 'Skool'],
    },
  ];

  return (
    <section id="services" className="relative py-28 md:py-36">
      {/* Background accent */}
      <div className="absolute inset-0">
        <img src={IMAGES.services} alt="" className="w-full h-full object-cover opacity-[0.06]" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${C.charcoal}, ${C.charcoal}ee 30%, ${C.charcoal}ee 70%, ${C.charcoal})` }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <FadeInSection>
          <SectionLabel>Dịch vụ</SectionLabel>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6" style={{ color: C.white }}>
            Từ chiến lược đến
            <span className="gradient-text-gold"> thực thi.</span>
          </h2>
          <p className="text-lg max-w-2xl mb-16" style={{ color: C.whiteMuted }}>
            Mỗi dịch vụ được thiết kế để giải quyết một bài toán cụ thể — 
            và tất cả kết nối thành một hệ sinh thái hoàn chỉnh.
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
                {/* Gold corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle at top right, ${C.goldAlpha(0.08)}, transparent)` }} />

                <svc.icon size={32} style={{ color: C.gold }} className="mb-6" />
                <h3 className="font-display font-semibold text-xl md:text-2xl mb-4" style={{ color: C.white }}>{svc.title}</h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: C.whiteMuted }}>{svc.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {svc.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 font-medium"
                      style={{ color: C.gold, backgroundColor: C.goldAlpha(0.08), borderRadius: '2px' }}
                    >
                      {tag}
                    </span>
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
  const modules = [
    { icon: Brain, title: 'AI Architect', desc: 'Chiến lược & thiết kế hệ thống' },
    { icon: Cpu, title: 'Ops Engine', desc: 'SOP, checklist, tự động hóa' },
    { icon: MessageSquare, title: 'Content Engine', desc: 'Sản xuất & phân phối nội dung' },
    { icon: TrendingUp, title: 'Sales Funnel', desc: 'Offer, landing, pipeline' },
    { icon: Users, title: 'Support Hub', desc: 'FAQ, chatbot, chăm sóc khách' },
    { icon: BarChart3, title: 'Analytics', desc: 'Dashboard KPI, loop cải tiến' },
  ];

  return (
    <section id="ecosystem" className="relative py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <FadeInSection>
            <SectionLabel>Hệ sinh thái</SectionLabel>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6" style={{ color: C.white }}>
              Một hệ điều hành.
              <br />
              <span className="gradient-text-gold">Sáu module.</span>
            </h2>
            <p className="text-lg leading-relaxed mb-10" style={{ color: C.whiteMuted }}>
              DEMAN AI LAB xây dựng "Operating System" hoàn chỉnh cho doanh nghiệp — 
              từ planning đến execution, từ tracking đến learning. 
              Mỗi module là một "đồng đội AI" chuyên biệt.
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

          {/* Right: Visual */}
          <FadeInSection delay={0.2}>
            <div className="relative">
              <img
                src={IMAGES.ecosystem}
                alt="DEMAN AI LAB Ecosystem"
                className="w-full rounded-sm"
                style={{ border: `1px solid ${C.whiteAlpha(0.08)}` }}
              />
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
  const cases = [
    {
      name: 'MESCELLS',
      type: 'Healthcare / Biotech',
      desc: 'Viện NC Ứng Dụng Công Nghệ Tế Bào — Chuyển đổi toàn bộ hệ thống marketing bằng AI. Xây dựng Content Engine tự động, mascot Mes-Mee, và chiến lược nội dung vô hạn.',
      results: ['20+ bài/tuần tự động', '8 phong cách AI image', '17+ kênh nguồn curate'],
      link: '/mescells-proposal',
      highlight: true,
    },
    {
      name: 'ONIIZ',
      type: 'Fashion / E-commerce',
      desc: 'The Masculine Lab — Thương hiệu thời trang nam vận hành bởi 1 người + AI. Auto content, affiliate ecosystem, AI customer care.',
      results: ['1-person operation', '10x content output', 'Full AI workflow'],
      link: '#',
    },
    {
      name: 'V2JOY',
      type: 'Lifestyle / Wellness',
      desc: 'Thương hiệu lifestyle & wellness — 80% AI-powered. Từ idea đến publish, chỉ cần review.',
      results: ['80% AI-powered', 'Idea → Publish automated', 'Brand voice consistent'],
      link: '#',
    },
    {
      name: 'BIG MANZ',
      type: 'Men\'s Health',
      desc: 'Thương hiệu sức khỏe nam giới — Golden Circle viral content, AI-generated imagery, 10-campaign ad structure.',
      results: ['Viral content engine', 'AI product photography', '10 ad campaigns'],
      link: '#',
    },
  ];

  return (
    <section id="cases" className="relative py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeInSection>
          <SectionLabel>Case Studies</SectionLabel>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6" style={{ color: C.white }}>
            Không nói suông.
            <span className="gradient-text-gold"> Đây là bằng chứng.</span>
          </h2>
          <p className="text-lg max-w-2xl mb-16" style={{ color: C.whiteMuted }}>
            Mỗi case study là một hệ thống đang vận hành thực tế — 
            không phải mockup, không phải demo.
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {cases.map((cs, i) => (
            <FadeInSection key={i} delay={i * 0.1}>
              <a
                href={cs.link}
                className="block p-8 md:p-10 h-full transition-all duration-500 group relative overflow-hidden"
                style={{
                  backgroundColor: cs.highlight ? C.goldAlpha(0.04) : C.whiteAlpha(0.02),
                  border: `1px solid ${cs.highlight ? C.goldAlpha(0.2) : C.whiteAlpha(0.06)}`,
                  borderRadius: '4px',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.goldAlpha(0.4); e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = cs.highlight ? C.goldAlpha(0.2) : C.whiteAlpha(0.06); e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                {cs.highlight && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-0.5 text-[10px] font-display font-semibold tracking-wider uppercase" style={{ color: C.gold, backgroundColor: C.goldAlpha(0.1), borderRadius: '2px' }}>
                    <Star size={10} /> Featured
                  </div>
                )}

                <div className="text-xs font-medium tracking-wider uppercase mb-3" style={{ color: C.goldDark }}>{cs.type}</div>
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
                  Xem chi tiết <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
  return (
    <section id="about" className="relative py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <FadeInSection>
            <div className="relative">
              <img
                src={IMAGES.about}
                alt="Hải VN — AI Architect"
                className="w-full rounded-sm"
                style={{ border: `1px solid ${C.whiteAlpha(0.08)}` }}
              />
              <div className="absolute inset-0 rounded-sm" style={{ background: `linear-gradient(to right, transparent, ${C.charcoal}44)` }} />
            </div>
          </FadeInSection>

          {/* Right: Content */}
          <FadeInSection delay={0.2}>
            <SectionLabel>Về chúng tôi</SectionLabel>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6" style={{ color: C.white }}>
              Hải VN
              <br />
              <span className="gradient-text-gold">AI Architect</span>
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: C.whiteMuted }}>
              Founder của DEMAN AI LAB & HAIVN.AI — hệ sinh thái giúp solopreneurs và doanh nghiệp 
              biến AI thành đồng đội vận hành thật. Với triết lý <strong style={{ color: C.gold }}>"Clone Your Mind™"</strong>, 
              Hải VN đã xây dựng và vận hành 6+ thương hiệu bằng AI, 
              từ fashion (ONIIZ) đến healthcare (MESCELLS), từ lifestyle (V2JOY) đến men's health (BIG MANZ).
            </p>
            <p className="text-base leading-relaxed mb-8" style={{ color: C.whiteMuted }}>
              Tầm nhìn 2026-2031: Đưa HAIVN.AI trở thành hệ điều hành Human × AI 
              có tầm ảnh hưởng quốc tế, với 30% doanh thu từ thị trường global.
            </p>

            <div className="flex flex-wrap gap-3">
              {['AI Architect', 'Clone Your Mind™', 'Vibe Coding', '6+ Brands', 'Skool Community'].map(tag => (
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
  const phases = [
    { year: '2026–2027', title: 'Củng cố & Mở rộng', desc: 'Hoàn thiện hệ sinh thái VN, bắt đầu quốc tế hóa, ra mắt Clone Your Mind™ Academy.' },
    { year: '2028–2029', title: 'Tăng tốc & Tự động', desc: 'HAIVN.AI Platform mở, Deman AI Lab R&D, self-learning AI systems.' },
    { year: '2030–2031', title: 'Dẫn đầu & Tác động', desc: 'Thought leader toàn cầu, 30% revenue global, AI for Good initiatives.' },
  ];

  return (
    <section className="relative py-28 md:py-36 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={IMAGES.cta} alt="" className="w-full h-full object-cover opacity-[0.15]" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${C.charcoal}, ${C.charcoal}cc 30%, ${C.charcoal}cc 70%, ${C.charcoal})` }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <FadeInSection className="text-center max-w-3xl mx-auto mb-20">
          <SectionLabel>Tầm nhìn 5 năm</SectionLabel>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6" style={{ color: C.white }}>
            Từ Việt Nam
            <span className="gradient-text-gold"> ra thế giới.</span>
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: C.whiteMuted }}>
            "Đến 2031, HAIVN.AI sẽ trở thành hệ điều hành Human × AI 
            có tầm ảnh hưởng quốc tế — nơi mọi người đều có thể 
            biến AI thành đồng đội thật sự."
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
  return (
    <section id="contact" className="relative py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeInSection className="text-center max-w-3xl mx-auto">
          <SectionLabel>Bắt đầu</SectionLabel>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6" style={{ color: C.white }}>
            Sẵn sàng biến AI thành
            <br />
            <span className="gradient-text-gold">đồng đội thật?</span>
          </h2>
          <p className="text-lg leading-relaxed mb-12" style={{ color: C.whiteMuted }}>
            Dù bạn là solopreneur muốn scale, hay doanh nghiệp cần chuyển đổi — 
            hãy bắt đầu bằng một cuộc trò chuyện.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <a
              href="https://www.facebook.com/demanlab"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 font-display font-semibold text-base transition-all duration-300"
              style={{ color: C.charcoal, backgroundColor: C.gold, borderRadius: '2px' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.goldLight; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = C.gold; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Liên hệ qua Facebook <ExternalLink size={14} />
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
              Khám phá HAIVN.AI <ArrowRight size={14} />
            </a>
          </div>

          {/* Social links */}
          <div className="flex justify-center gap-8">
            {[
              { label: 'Facebook', href: 'https://www.facebook.com/demanlab' },
              { label: 'YouTube', href: '#' },
              { label: 'TikTok', href: '#' },
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
            <a href="#services" className="hover:opacity-80 transition-opacity">Services</a>
            <a href="#ecosystem" className="hover:opacity-80 transition-opacity">Ecosystem</a>
            <a href="#cases" className="hover:opacity-80 transition-opacity">Case Studies</a>
            <a href="https://haivn.ai" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">HAIVN.AI</a>
          </div>

          <div className="text-xs" style={{ color: C.whiteDim }}>
            © 2026 DEMAN AI LAB. All rights reserved.
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

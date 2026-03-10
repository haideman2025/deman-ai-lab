/**
 * AI Transformation Blueprint™ — Landing Page
 * Design: Dark Luxury Premium — DEMAN AI LAB Brand System
 * Color: Deep navy + Electric cyan (#00B4FF) + Purple (#7B2FBE)
 * Typography: Sora (display) + DM Sans (body)
 * Sections: Hero → Problem → Solution → 5-Module Showcase → Journey → Features → Social Proof → CTA
 */

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  ArrowLeft,
  Brain,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Clock,
  FileText,
  Globe,
  Heart,
  Layers,
  Lightbulb,
  MessageCircle,
  Palette,
  PenTool,
  Play,
  Rocket,
  Shield,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
  Image,
  Video,
  Mic,
  BarChart3,
  Fingerprint,
  BookOpen,
  Calendar,
  ListChecks,
} from 'lucide-react';
import { useLocation } from 'wouter';
import { useAuth } from '@/_core/hooks/useAuth';
import { getLoginUrl } from '@/const';

/* ═══ CDN ASSETS ═══ */
const IMAGES = {
  heroMain: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/blueprint-hero-main-jz4VLu7ArQJAwpqFofJ5Z7.webp',
  journey: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/blueprint-journey-visual-623r96KG67kSxfAWdKtTZF.webp',
  brandIdentity: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/blueprint-brand-identity-WicTx65giA4MXVPNiTcgUo.webp',
  contentStudio: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/blueprint-content-studio_587398e5.jpg',
  demanLogo: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/deman-logo-transparent_731b623d.png',
};

/* ═══ BRAND COLORS ═══ */
const C = {
  cyan: '#00B4FF',
  cyanDark: '#0090CC',
  cyanLight: '#00D4FF',
  purple: '#7B2FBE',
  deepPurple: '#3D1A78',
  gold: '#FFB800',
  bg: '#0a0a14',
  bgLight: '#0d0d1e',
  surface: '#14142a',
  white: '#E8EDF5',
  whiteMuted: 'rgba(232, 237, 245, 0.6)',
  whiteDim: 'rgba(232, 237, 245, 0.35)',
};

/* ═══ REUSABLE COMPONENTS ═══ */
function FadeIn({ children, className = '', delay = 0, direction = 'up' }: {
  children: React.ReactNode; className?: string; delay?: number; direction?: 'up' | 'down' | 'left' | 'right';
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const initial = {
    opacity: 0,
    ...(direction === 'up' && { y: 40 }),
    ...(direction === 'down' && { y: -40 }),
    ...(direction === 'left' && { x: 40 }),
    ...(direction === 'right' && { x: -40 }),
  };
  return (
    <motion.div ref={ref} initial={initial} animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}} transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

function SectionLabel({ children, color = C.cyan }: { children: React.ReactNode; color?: string }) {
  return (
    <span className="font-display font-semibold text-xs tracking-[0.25em] uppercase block mb-4" style={{ color }}>
      {children}
    </span>
  );
}

function GlowLine() {
  return <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${C.cyan}50, transparent)` }} />;
}

/* ═══ NAVBAR ═══ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? `${C.bg}EE` : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? `1px solid rgba(0, 180, 255, 0.08)` : '1px solid transparent',
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <button onClick={() => setLocation('/')} className="flex items-center gap-3 group">
          <img src={IMAGES.demanLogo} alt="DEMAN AI LAB" className="h-8 w-auto opacity-80 group-hover:opacity-100 transition-opacity" />
        </button>

        <div className="hidden md:flex items-center gap-8">
          <a href="#problem" className="text-sm text-white/50 hover:text-white transition-colors">Vấn đề</a>
          <a href="#modules" className="text-sm text-white/50 hover:text-white transition-colors">5 Module</a>
          <a href="#journey" className="text-sm text-white/50 hover:text-white transition-colors">Hành trình</a>
          <a href="#features" className="text-sm text-white/50 hover:text-white transition-colors">Tính năng</a>
        </div>

        <a
          href="#cta"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300"
          style={{
            background: `linear-gradient(135deg, ${C.cyan}, ${C.cyanDark})`,
            color: C.bg,
          }}
        >
          Bắt đầu miễn phí
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </motion.nav>
  );
}

/* ═══ HERO SECTION ═══ */
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <img src={IMAGES.heroMain} alt="" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${C.bg}88, ${C.bg}CC, ${C.bg})` }} />
      </motion.div>

      {/* Grid overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(0,180,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,255,0.3) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      <motion.div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-20" style={{ opacity }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
          style={{ backgroundColor: `${C.cyan}12`, border: `1px solid ${C.cyan}25` }}
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: C.cyan }} />
          <span style={{ color: C.cyan }} className="text-sm font-medium">Powered by DEMAN AI LAB</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08] mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <span className="text-white">Xây dựng </span>
          <span className="gradient-text-gold">Thương hiệu</span>
          <br />
          <span className="gradient-text-gold">Cá nhân</span>
          <span className="text-white"> cùng AI</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed"
          style={{ color: C.whiteMuted }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Từ <span style={{ color: C.cyan }} className="font-semibold">khảo sát chuyên sâu</span> đến{' '}
          <span style={{ color: C.cyanLight }} className="font-semibold">chiến lược thương hiệu</span>,{' '}
          <span style={{ color: C.cyanLight }} className="font-semibold">kế hoạch thực thi</span>,{' '}
          <span style={{ color: C.cyanLight }} className="font-semibold">nhận diện thương hiệu</span> và{' '}
          <span style={{ color: C.cyanLight }} className="font-semibold">sáng tạo nội dung</span> — tất cả trong một hệ thống duy nhất.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <a
            href="#cta"
            className="group inline-flex items-center gap-3 px-8 py-4 font-display font-bold text-lg rounded-xl transition-all duration-500"
            style={{ background: `linear-gradient(135deg, ${C.cyan}, ${C.cyanDark})`, color: C.bg }}
          >
            <Sparkles className="w-5 h-5" />
            Bắt đầu hành trình
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#modules"
            className="inline-flex items-center gap-3 px-8 py-4 border border-white/15 text-white/70 font-medium rounded-xl hover:text-white hover:border-white/30 transition-all duration-300"
          >
            <Play className="w-5 h-5" />
            Khám phá 5 module
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          {[
            { value: '5', label: 'Module AI', icon: Layers },
            { value: '30', label: 'Ngày chiến lược', icon: Calendar },
            { value: '100%', label: 'Cá nhân hóa', icon: Fingerprint },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <stat.icon className="w-4 h-4" style={{ color: C.cyan }} />
                <span className="font-display font-bold text-2xl sm:text-3xl text-white">{stat.value}</span>
              </div>
              <span className="text-xs sm:text-sm" style={{ color: C.whiteDim }}>{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/15 flex items-start justify-center p-1.5">
          <motion.div className="w-1.5 h-3 rounded-full" style={{ backgroundColor: C.cyan }} animate={{ y: [0, 12, 0] }} transition={{ duration: 2, repeat: Infinity }} />
        </div>
      </motion.div>
    </section>
  );
}

/* ═══ PROBLEM SECTION ═══ */
function ProblemSection() {
  const problems = [
    { icon: Clock, title: 'Không có thời gian', desc: 'Bận rộn với công việc chính, không còn năng lượng để xây dựng thương hiệu cá nhân một cách bài bản.' },
    { icon: Target, title: 'Thiếu chiến lược rõ ràng', desc: 'Đăng bài lung tung, không có hệ thống, không biết mình đang hướng đến đâu.' },
    { icon: MessageCircle, title: 'Không biết viết gì', desc: 'Có chuyên môn nhưng không biết cách truyền tải thành nội dung hấp dẫn, chạm đến người đọc.' },
    { icon: Palette, title: 'Nhận diện mờ nhạt', desc: 'Không có tone of voice nhất quán, không có bảng màu, không có phong cách riêng biệt.' },
  ];

  return (
    <section id="problem" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="max-w-3xl mb-16">
          <SectionLabel color="#FF6B6B">Bạn có đang gặp phải?</SectionLabel>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6 text-white">
            Xây thương hiệu cá nhân
            <br />
            <span style={{ color: C.whiteDim }}>chưa bao giờ dễ dàng.</span>
          </h2>
          <p style={{ color: C.whiteMuted }} className="text-lg leading-relaxed">
            90% chuyên gia biết rằng thương hiệu cá nhân quan trọng, nhưng chỉ 10% thực sự hành động — vì thiếu hệ thống, thiếu công cụ, và thiếu sự đồng hành.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {problems.map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div
                className="group relative p-6 rounded-2xl border transition-all duration-500"
                style={{ backgroundColor: 'rgba(255,107,107,0.03)', borderColor: 'rgba(255,107,107,0.08)' }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg text-white mb-2">{item.title}</h3>
                    <p style={{ color: C.whiteMuted }} className="text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4} className="mt-10">
          <div className="p-6 rounded-2xl border" style={{ borderColor: `${C.cyan}20`, backgroundColor: `${C.cyan}05` }}>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${C.cyan}15` }}>
                <Lightbulb className="w-6 h-6" style={{ color: C.cyan }} />
              </div>
              <div>
                <p style={{ color: C.cyan }} className="font-display font-semibold text-lg mb-2">Nhưng nếu có một hệ thống AI...</p>
                <p style={{ color: C.whiteMuted }} className="text-sm leading-relaxed">
                  ...hiểu bạn, thiết kế chiến lược riêng cho bạn, dẫn dắt bạn từng bước, và giúp bạn sáng tạo nội dung nhất quán — thì mọi thứ sẽ khác.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══ SOLUTION OVERVIEW ═══ */
function SolutionSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.04]" style={{ background: `radial-gradient(circle, ${C.cyan}, transparent 70%)` }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-4xl mx-auto mb-16">
          <SectionLabel>Giải pháp</SectionLabel>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6 text-white">
            AI Transformation
            <br />
            <span className="gradient-text-gold">Blueprint™</span>
          </h2>
          <p style={{ color: C.whiteMuted }} className="text-lg md:text-xl leading-relaxed">
            Hệ thống AI toàn diện giúp bạn xây dựng thương hiệu cá nhân từ con số 0 — với chiến lược được cá nhân hóa, kế hoạch thực thi chi tiết, và công cụ sáng tạo nội dung tích hợp.
          </p>
        </FadeIn>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Brain,
              title: 'Chiến lược AI',
              desc: 'AI phân tích dữ liệu khảo sát, xác định Brand DNA, Archetype, và định vị thương hiệu riêng cho bạn.',
              gradient: `linear-gradient(135deg, ${C.cyan}15, ${C.purple}10)`,
              borderColor: `${C.cyan}15`,
            },
            {
              icon: ListChecks,
              title: 'Thực thi có hệ thống',
              desc: 'Kế hoạch 30 ngày với nhiệm vụ cụ thể, hướng dẫn từng bước — bạn chỉ cần làm theo.',
              gradient: `linear-gradient(135deg, ${C.purple}15, ${C.cyan}10)`,
              borderColor: `${C.purple}15`,
            },
            {
              icon: PenTool,
              title: 'Sáng tạo nhất quán',
              desc: 'AI Content Studio tạo bài viết, hình ảnh, kịch bản video — tất cả theo đúng chiến lược thương hiệu.',
              gradient: `linear-gradient(135deg, ${C.cyan}15, ${C.cyanLight}10)`,
              borderColor: `${C.cyanLight}15`,
            },
          ].map((pillar, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <div
                className="relative p-8 rounded-2xl border h-full"
                style={{ background: pillar.gradient, borderColor: pillar.borderColor }}
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: `${C.cyan}12` }}>
                  <pillar.icon className="w-7 h-7" style={{ color: C.cyan }} />
                </div>
                <h3 className="font-display font-bold text-xl text-white mb-3">{pillar.title}</h3>
                <p style={{ color: C.whiteMuted }} className="text-sm leading-relaxed">{pillar.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ 5-MODULE SHOWCASE ═══ */
function ModulesSection() {
  const [activeModule, setActiveModule] = useState(0);

  const modules = [
    {
      id: 0,
      icon: ClipboardList,
      title: 'Smart Survey',
      subtitle: 'Khám phá tiềm năng',
      color: C.cyan,
      description: 'Hệ thống khảo sát 5 bước thông minh phân tích chuyên sâu về vai trò, mục tiêu, thế mạnh, thách thức và tầm nhìn của bạn. AI sẽ tính điểm và đánh giá mức độ sẵn sàng chuyển đổi.',
      features: [
        '5 bước khảo sát chuyên sâu với hệ thống tính điểm',
        'Phân tích vai trò, mục tiêu, thế mạnh & thách thức',
        'Đánh giá mức độ sẵn sàng chuyển đổi AI',
        'Kết quả phân tích tức thì với biểu đồ trực quan',
      ],
    },
    {
      id: 1,
      icon: Brain,
      title: 'Strategy Blueprint',
      subtitle: 'Bản vẽ chiến lược',
      color: '#7B2FBE',
      description: 'AI phân tích toàn bộ dữ liệu khảo sát để tạo ra bản chiến lược thương hiệu cá nhân hoàn chỉnh — bao gồm Brand DNA, Archetype, định vị, và lộ trình phát triển.',
      features: [
        'Brand DNA — Tầm nhìn, Sứ mệnh, Giá trị cốt lõi',
        'Brand Archetype — Nguyên mẫu thương hiệu phù hợp',
        'Định vị thương hiệu & Unique Value Proposition',
        'Chiến lược nội dung & kênh truyền thông',
      ],
    },
    {
      id: 2,
      icon: FileText,
      title: 'Execution Plan',
      subtitle: 'Kế hoạch thực thi',
      color: '#00D4FF',
      description: 'Kế hoạch 30 ngày chi tiết với hệ thống nhiệm vụ step-by-step. Mỗi tuần có chủ đề riêng, mỗi nhiệm vụ có hướng dẫn cụ thể — bạn chỉ cần làm theo.',
      features: [
        'Kế hoạch 4 tuần với chủ đề & mục tiêu rõ ràng',
        'Nhiệm vụ hàng ngày với hướng dẫn step-by-step',
        'Theo dõi tiến độ trực quan',
        'AI tạo hướng dẫn chi tiết cho từng nhiệm vụ',
      ],
    },
    {
      id: 3,
      icon: Palette,
      title: 'Brand Identity',
      subtitle: 'Nhận diện thương hiệu',
      color: '#FF6B6B',
      description: 'Thiết kế hệ thống nhận diện thương hiệu cá nhân hoàn chỉnh — từ tone of voice, bảng màu, từ khóa thương hiệu đến brand guidelines chi tiết.',
      features: [
        'Tone of Voice — Giọng nói thương hiệu riêng biệt',
        'Bảng màu thương hiệu với mã hex',
        'Từ khóa thương hiệu & Personality traits',
        'AI Brand Guidelines — Hướng dẫn sử dụng toàn diện',
      ],
    },
    {
      id: 4,
      icon: PenTool,
      title: 'AI Content Studio',
      subtitle: 'Xưởng sáng tạo',
      color: '#FFB800',
      description: 'Công cụ sáng tạo nội dung tích hợp AI — từ ý tưởng đơn giản đến bài viết hoàn chỉnh, prompt hình ảnh, kịch bản video. Tất cả theo đúng chiến lược thương hiệu.',
      features: [
        'Tạo bài viết từ ý tưởng — Framework Storytelling 3 tầng',
        'Prompt hình ảnh AI theo phong cách thương hiệu',
        'Kịch bản video với cấu trúc chuyên nghiệp',
        'Lịch sử nội dung & quản lý sáng tạo',
      ],
    },
  ];

  const active = modules[activeModule];

  return (
    <section id="modules" className="relative py-24 md:py-32">
      <GlowLine />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <FadeIn className="text-center max-w-3xl mx-auto mb-16">
          <SectionLabel>Hệ thống 5 Module</SectionLabel>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6 text-white">
            Mỗi module là một
            <br />
            <span className="gradient-text-gold">bước tiến hóa.</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Module tabs */}
          <div className="lg:col-span-4 space-y-2">
            {modules.map((mod, i) => (
              <FadeIn key={mod.id} delay={i * 0.08}>
                <button
                  onClick={() => setActiveModule(i)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                    activeModule === i ? 'border-opacity-100' : 'border-white/5 hover:border-white/10'
                  }`}
                  style={{
                    backgroundColor: activeModule === i ? `${mod.color}10` : 'transparent',
                    borderColor: activeModule === i ? `${mod.color}30` : undefined,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: activeModule === i ? `${mod.color}20` : 'rgba(255,255,255,0.05)' }}
                    >
                      <mod.icon className="w-5 h-5" style={{ color: activeModule === i ? mod.color : C.whiteDim }} />
                    </div>
                    <div>
                      <span className="font-display font-semibold text-sm block" style={{ color: activeModule === i ? 'white' : C.whiteMuted }}>
                        {mod.title}
                      </span>
                      <span className="text-xs" style={{ color: activeModule === i ? mod.color : C.whiteDim }}>
                        {mod.subtitle}
                      </span>
                    </div>
                    <ChevronRight
                      className="w-4 h-4 ml-auto transition-transform"
                      style={{
                        color: activeModule === i ? mod.color : C.whiteDim,
                        transform: activeModule === i ? 'translateX(2px)' : 'none',
                      }}
                    />
                  </div>
                </button>
              </FadeIn>
            ))}
          </div>

          {/* Module detail */}
          <div className="lg:col-span-8">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="p-8 rounded-2xl border h-full"
              style={{ backgroundColor: `${active.color}05`, borderColor: `${active.color}15` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${active.color}15` }}>
                  <active.icon className="w-6 h-6" style={{ color: active.color }} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-2xl text-white">{active.title}</h3>
                  <span className="text-sm" style={{ color: active.color }}>{active.subtitle}</span>
                </div>
              </div>

              <p style={{ color: C.whiteMuted }} className="text-base leading-relaxed mb-8">
                {active.description}
              </p>

              <div className="space-y-3">
                {active.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: active.color }} />
                    <span className="text-sm text-white/80">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Module number indicator */}
              <div className="mt-8 flex items-center gap-2">
                {modules.map((_, i) => (
                  <div
                    key={i}
                    className="h-1 rounded-full transition-all duration-300"
                    style={{
                      width: activeModule === i ? '32px' : '8px',
                      backgroundColor: activeModule === i ? active.color : 'rgba(255,255,255,0.1)',
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ JOURNEY SECTION ═══ */
function JourneySection() {
  return (
    <section id="journey" className="relative py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-3xl mx-auto mb-12">
          <SectionLabel>Hành trình của bạn</SectionLabel>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6 text-white">
            Từ <span className="gradient-text-gold">ý tưởng</span> đến{' '}
            <span className="gradient-text-gold">thương hiệu</span>
          </h2>
          <p style={{ color: C.whiteMuted }} className="text-lg leading-relaxed">
            5 giai đoạn chuyển hóa — mỗi bước đều được AI dẫn dắt và cá nhân hóa cho riêng bạn.
          </p>
        </FadeIn>

        {/* Journey visual */}
        <FadeIn className="mb-16">
          <div className="relative rounded-2xl overflow-hidden border" style={{ borderColor: `${C.cyan}15` }}>
            <img src={IMAGES.journey} alt="5-Stage Transformation Journey" className="w-full h-auto" />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${C.bg}, transparent 30%)` }} />
          </div>
        </FadeIn>

        {/* Journey steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { step: '01', title: 'Khảo sát', desc: 'Thu thập & phân tích dữ liệu cá nhân', icon: ClipboardList, color: C.cyan },
            { step: '02', title: 'Chiến lược', desc: 'AI tạo bản vẽ thương hiệu', icon: Brain, color: '#7B2FBE' },
            { step: '03', title: 'Kế hoạch', desc: 'Lộ trình 30 ngày chi tiết', icon: Calendar, color: '#00D4FF' },
            { step: '04', title: 'Nhận diện', desc: 'Thiết kế hệ thống thương hiệu', icon: Fingerprint, color: '#FF6B6B' },
            { step: '05', title: 'Sáng tạo', desc: 'Tạo nội dung nhất quán', icon: PenTool, color: '#FFB800' },
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="relative p-5 rounded-xl border text-center" style={{ borderColor: `${item.color}15`, backgroundColor: `${item.color}05` }}>
                <span className="font-display font-bold text-3xl block mb-2" style={{ color: `${item.color}30` }}>{item.step}</span>
                <div className="w-10 h-10 rounded-lg mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: `${item.color}15` }}>
                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <h4 className="font-display font-semibold text-white text-sm mb-1">{item.title}</h4>
                <p className="text-xs" style={{ color: C.whiteDim }}>{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ FEATURES DEEP DIVE ═══ */
function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 md:py-32">
      <GlowLine />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <FadeIn className="text-center max-w-3xl mx-auto mb-16">
          <SectionLabel>Tính năng nổi bật</SectionLabel>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6 text-white">
            Công nghệ AI
            <br />
            <span className="gradient-text-gold">phục vụ con người.</span>
          </h2>
        </FadeIn>

        {/* Feature 1: Brand Identity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <FadeIn direction="right">
            <div className="rounded-2xl overflow-hidden border" style={{ borderColor: `${C.cyan}15` }}>
              <img src={IMAGES.brandIdentity} alt="Brand Identity Designer" className="w-full h-auto" />
            </div>
          </FadeIn>
          <FadeIn direction="left">
            <SectionLabel color="#FF6B6B">Nhận diện thương hiệu</SectionLabel>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-4">
              AI thiết kế <span style={{ color: '#FF6B6B' }}>bản sắc riêng</span> cho bạn
            </h3>
            <p style={{ color: C.whiteMuted }} className="text-base leading-relaxed mb-6">
              Từ tone of voice, bảng màu, đến từ khóa thương hiệu — AI phân tích và tạo ra hệ thống nhận diện phản ánh đúng con người bạn. Upload hình ảnh cá nhân để AI sử dụng làm tham chiếu cho sáng tạo.
            </p>
            <div className="space-y-3">
              {[
                'Tone of Voice — Giọng nói thương hiệu duy nhất',
                'Bảng màu thương hiệu với tâm lý học màu sắc',
                'Brand Guidelines AI — Hướng dẫn sử dụng chi tiết',
                'Upload ảnh cá nhân làm tham chiếu sáng tạo',
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#FF6B6B' }} />
                  <span className="text-sm text-white/80">{f}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Feature 2: Content Studio */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <FadeIn direction="right" className="order-2 lg:order-1">
            <SectionLabel color="#FFB800">AI Content Studio</SectionLabel>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-4">
              Từ <span style={{ color: '#FFB800' }}>ý tưởng</span> đến <span style={{ color: '#FFB800' }}>nội dung hoàn chỉnh</span>
            </h3>
            <p style={{ color: C.whiteMuted }} className="text-base leading-relaxed mb-6">
              Chỉ cần một ý tưởng đơn giản hoặc ghi âm giọng nói — AI sẽ phát triển thành bài viết chuyên nghiệp, prompt hình ảnh, hoặc kịch bản video. Tất cả đều tuân theo chiến lược thương hiệu của bạn.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: FileText, label: 'Bài viết', desc: 'Storytelling 3 tầng + Golden Circle', color: '#FFB800' },
                { icon: Image, label: 'Hình ảnh', desc: 'Prompt AI theo brand style', color: '#00D4FF' },
                { icon: Video, label: 'Video', desc: 'Kịch bản + storyboard', color: '#7B2FBE' },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl border text-center" style={{ borderColor: `${item.color}15`, backgroundColor: `${item.color}05` }}>
                  <item.icon className="w-6 h-6 mx-auto mb-2" style={{ color: item.color }} />
                  <h4 className="font-display font-semibold text-sm text-white mb-1">{item.label}</h4>
                  <p className="text-xs" style={{ color: C.whiteDim }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn direction="left" className="order-1 lg:order-2">
            <div className="rounded-2xl overflow-hidden border" style={{ borderColor: `${C.cyan}15` }}>
              <img src={IMAGES.contentStudio} alt="AI Content Studio" className="w-full h-auto" />
            </div>
          </FadeIn>
        </div>

        {/* Feature 3: Storytelling Framework */}
        <FadeIn>
          <div className="p-8 md:p-12 rounded-2xl border" style={{ borderColor: `${C.cyan}15`, backgroundColor: `${C.cyan}03` }}>
            <div className="text-center max-w-3xl mx-auto mb-10">
              <SectionLabel>Framework sáng tạo</SectionLabel>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-4">
                Hai framework <span className="gradient-text-gold">luôn chạy ngầm</span>
              </h3>
              <p style={{ color: C.whiteMuted }} className="text-base leading-relaxed">
                Mọi nội dung được tạo ra đều ứng dụng hai framework đã được chứng minh hiệu quả — đảm bảo mỗi bài viết đều chạm đến người đọc.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Golden Circle */}
              <div className="p-6 rounded-xl border" style={{ borderColor: `${C.cyan}15`, backgroundColor: `${C.bg}80` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${C.cyan}15` }}>
                    <Target className="w-5 h-5" style={{ color: C.cyan }} />
                  </div>
                  <h4 className="font-display font-bold text-lg text-white">Vòng Tròn Vàng</h4>
                </div>
                <p style={{ color: C.whiteMuted }} className="text-sm leading-relaxed mb-4">
                  Framework của Simon Sinek — mọi nội dung đều bắt đầu từ WHY (tại sao), HOW (như thế nào), rồi mới đến WHAT (cái gì).
                </p>
                <div className="flex items-center justify-center gap-3">
                  {['WHY', 'HOW', 'WHAT'].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: `${C.cyan}${20 - i * 5}`, color: C.cyan }}>
                        {item}
                      </div>
                      {i < 2 && <ArrowRight className="w-3 h-3" style={{ color: C.whiteDim }} />}
                    </div>
                  ))}
                </div>
              </div>

              {/* 3-Layer Storytelling */}
              <div className="p-6 rounded-xl border" style={{ borderColor: `${C.purple}15`, backgroundColor: `${C.bg}80` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${C.purple}15` }}>
                    <BookOpen className="w-5 h-5" style={{ color: C.purple }} />
                  </div>
                  <h4 className="font-display font-bold text-lg text-white">Storytelling 3 Tầng</h4>
                </div>
                <p style={{ color: C.whiteMuted }} className="text-sm leading-relaxed mb-4">
                  Mỗi nội dung đều chứa 3 tầng giá trị — đảm bảo vừa có chiều sâu chuyên môn, vừa chạm đến cảm xúc người đọc.
                </p>
                <div className="space-y-2">
                  {[
                    { label: 'Kiến thức chuyên sâu', color: '#7B2FBE' },
                    { label: 'Thông tin độc đáo', color: '#00B4FF' },
                    { label: 'Cảm xúc chạm người dùng', color: '#FF6B6B' },
                  ].map((layer, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: layer.color }} />
                      <span className="text-sm" style={{ color: layer.color }}>{layer.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══ SOCIAL PROOF ═══ */
function SocialProofSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-3xl mx-auto mb-16">
          <SectionLabel>Tại sao chọn Blueprint™?</SectionLabel>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6 text-white">
            Được thiết kế bởi
            <br />
            <span className="gradient-text-gold">DEMAN AI LAB</span>
          </h2>
          <p style={{ color: C.whiteMuted }} className="text-lg leading-relaxed">
            Đội ngũ chuyên gia AI với kinh nghiệm triển khai hệ thống AI cho hơn 10 thương hiệu — từ chiến lược đến thực thi.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Shield, value: '100%', label: 'Cá nhân hóa', desc: 'Mọi chiến lược đều được tạo riêng cho bạn' },
            { icon: Brain, value: 'AI', label: 'Powered', desc: 'Công nghệ AI tiên tiến phân tích & sáng tạo' },
            { icon: Layers, value: '5-in-1', label: 'Hệ thống', desc: 'Từ khảo sát đến sáng tạo trong một nền tảng' },
            { icon: TrendingUp, value: '30', label: 'Ngày chuyển đổi', desc: 'Kế hoạch thực thi chi tiết từng ngày' },
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="p-6 rounded-2xl border text-center" style={{ borderColor: 'rgba(255,255,255,0.06)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                <item.icon className="w-8 h-8 mx-auto mb-4" style={{ color: C.cyan }} />
                <div className="font-display font-bold text-3xl text-white mb-1">{item.value}</div>
                <div className="font-display font-semibold text-sm mb-2" style={{ color: C.cyan }}>{item.label}</div>
                <p className="text-xs" style={{ color: C.whiteDim }}>{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ CTA SECTION ═══ */
function CTASection() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();

  const handleStart = () => {
    if (user) {
      setLocation('/blueprint/survey');
    } else {
      window.location.href = getLoginUrl();
    }
  };

  return (
    <section id="cta" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.06]" style={{ background: `radial-gradient(circle, ${C.cyan}, transparent 70%)` }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{ backgroundColor: `${C.cyan}12`, border: `1px solid ${C.cyan}25` }}>
            <Rocket className="w-4 h-4" style={{ color: C.cyan }} />
            <span style={{ color: C.cyan }} className="text-sm font-medium">Bắt đầu miễn phí</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 text-white">
            Sẵn sàng
            <br />
            <span className="gradient-text-gold">chuyển hóa?</span>
          </h2>

          <p style={{ color: C.whiteMuted }} className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
            Chỉ cần 5 phút khảo sát — AI sẽ tạo ra bản chiến lược thương hiệu cá nhân hoàn chỉnh cho riêng bạn. Miễn phí, không cần thẻ tín dụng.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleStart}
              className="group inline-flex items-center gap-3 px-10 py-5 font-display font-bold text-lg rounded-xl transition-all duration-500"
              style={{ background: `linear-gradient(135deg, ${C.cyan}, ${C.cyanDark})`, color: C.bg }}
            >
              <Sparkles className="w-5 h-5" />
              Bắt đầu hành trình ngay
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <p className="mt-6 text-xs" style={{ color: C.whiteDim }}>
            Không cần đăng ký phức tạp. Đăng nhập và bắt đầu ngay.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══ FOOTER ═══ */
function Footer() {
  return (
    <footer className="border-t py-12" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={IMAGES.demanLogo} alt="DEMAN AI LAB" className="h-6 w-auto opacity-60" />
            <span className="text-sm" style={{ color: C.whiteDim }}>AI Transformation Blueprint™</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="/" className="text-xs hover:text-white transition-colors" style={{ color: C.whiteDim }}>Trang chủ DEMAN</a>
            <a href="#modules" className="text-xs hover:text-white transition-colors" style={{ color: C.whiteDim }}>5 Module</a>
            <a href="#features" className="text-xs hover:text-white transition-colors" style={{ color: C.whiteDim }}>Tính năng</a>
          </div>
          <p className="text-xs" style={{ color: C.whiteDim }}>
            &copy; 2026 DEMAN AI LAB. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ═══ MAIN PAGE ═══ */
export default function BlueprintLanding() {
  return (
    <div className="relative min-h-screen text-white overflow-x-hidden" style={{ backgroundColor: C.bg }}>
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <ModulesSection />
      <JourneySection />
      <FeaturesSection />
      <SocialProofSection />
      <CTASection />
      <Footer />
    </div>
  );
}

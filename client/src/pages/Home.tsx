/**
 * AI Marketing Transformation™ 90-Day Landing Page
 * Design: Cinematic Noir — "The Awakening"
 * Color: Deep black + cyan-electric + warm gold
 * Typography: Space Grotesk (display) + Inter (body)
 * Animation: Scroll reveal, counter, stagger, parallax
 */

import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import { CountUpNumber } from '@/components/CountUpNumber';
import { ParticleBackground } from '@/components/ParticleBackground';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Brain,
  CheckCircle2,
  Clock,
  Clapperboard,
  ExternalLink,
  Eye,
  Globe,
  Image,
  Layers,
  Lightbulb,
  MessageCircle,
  Palette,
  PenTool,
  Play,
  Rocket,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

const IMAGES = {
  hero: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/hero-bg-NVfDk9eDHs6GxcpzpgtEvA.webp',
  transformation: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/transformation-visual-joAyWgiEP9vcxpfGKcTqxN.webp',
  team: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/team-power-VJ9XDsLvURZxkuKMjiByNe.webp',
  pattern: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/abstract-ai-pattern-9pE6V9Uyi3pCyfw36fxcPt.webp',
};

const MESMEE_GALLERY = [
  { src: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/post_1_fbb5542f.jpg', label: 'Mes-Mee chúc ngủ ngon' },
  { src: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/post_2_be5b035c.jpg', label: 'Tiểu đường & biến chứng' },
  { src: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/post_3_db15287a.jpg', label: 'PRP — Liệu pháp huyết tương' },
  { src: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/post_4_1f492720.jpg', label: 'Câu chuyện bệnh nhân' },
  { src: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/post_5_47b6891b.jpg', label: 'Gan — Người hùng thầm lặng' },
  { src: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/post_6_f4b60263.jpg', label: 'Phòng Lab Mescells' },
  { src: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/post_7_50dbdfc8.jpg', label: 'Mes-Mee nhắc đi khám' },
  { src: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/post_8_31f75eb3.jpg', label: 'Thoái hóa khớp gối' },
];

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0A0A0F] text-white overflow-x-hidden">
      <ParticleBackground />
      <Navbar />
      <HeroSection />
      <PainPointSection />
      <VisionSection />
      <MethodSection />
      <RoadmapSection />
      <RoleSection />
      <DeliverablesSection />
      <MesmeeShowcaseSection />
      <KPISection />
      <AccompanySection />
      <InvestmentSection />
      <ClosingSection />
      <Footer />
    </div>
  );
}

/* ─── NAVBAR ─── */
function Navbar() {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0A0A0F]/70 border-b border-white/5"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#00D4FF]" />
          <span className="font-display font-bold text-lg tracking-tight">
            AI Marketing <span className="text-[#00D4FF]">Transformation</span>™
          </span>
        </div>
        <a
          href="#investment"
          className="hidden sm:inline-flex items-center gap-2 px-5 py-2 bg-[#00D4FF]/10 border border-[#00D4FF]/30 rounded-full text-[#00D4FF] text-sm font-medium hover:bg-[#00D4FF]/20 transition-all duration-300"
        >
          Tìm hiểu thêm
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </motion.nav>
  );
}

/* ─── HERO SECTION ─── */
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <img
          src={IMAGES.hero}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F]/40 via-[#0A0A0F]/60 to-[#0A0A0F]" />
      </motion.div>

      {/* Content */}
      <motion.div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-20" style={{ opacity }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/20 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse" />
          <span className="text-[#00D4FF] text-sm font-medium tracking-wide">90-Day Implementation & System Transfer</span>
        </motion.div>

        <motion.h1
          className="font-display font-bold text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[1.05] mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <span className="text-white">AI Marketing</span>
          <br />
          <span className="gradient-text-cyan">Transformation</span>
          <span className="text-[#FFB800]">™</span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Xây dựng <span className="text-[#00D4FF] font-medium">AI Operating System</span> cho phòng Marketing.
          <br className="hidden sm:block" />
          Biến đội ngũ thành <span className="text-[#FFB800] font-medium">người sáng tạo độc lập</span> trong 90 ngày.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <a
            href="#vision"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#00D4FF] to-[#0099CC] text-[#0A0A0F] font-display font-bold text-lg rounded-xl hover:shadow-[0_0_40px_rgba(0,212,255,0.3)] transition-all duration-500"
          >
            Khám phá ngay
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#roadmap"
            className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white/80 font-medium rounded-xl hover:border-[#00D4FF]/40 hover:text-[#00D4FF] transition-all duration-300"
          >
            Xem lộ trình 90 ngày
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
            <motion.div
              className="w-1.5 h-3 rounded-full bg-[#00D4FF]"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── PAIN POINT SECTION ─── */
function PainPointSection() {
  const painPoints = [
    { icon: PenTool, text: 'Content quá tải — vừa nghĩ ý tưởng vừa quản lý triển khai' },
    { icon: Clock, text: 'Design & Media làm thủ công → chậm, tốn nguồn lực' },
    { icon: Brain, text: 'Không có hệ AI tích hợp vào quy trình' },
    { icon: BarChart3, text: 'Không có hệ đo lường tối ưu theo dữ liệu' },
  ];

  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="max-w-3xl mb-16">
          <span className="text-[#FFB800] font-display font-semibold text-sm tracking-[0.2em] uppercase mb-4 block">
            Thực trạng
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
            Marketing ngành Healthcare
            <br />
            <span className="text-white/40">đang thay đổi rất nhanh.</span>
          </h2>
          <p className="text-white/50 text-lg leading-relaxed">
            TikTok mang lại tương tác cao vượt trội. Nội dung giáo dục, livestream, case thực tế đang chiếm ưu thế.
            Bác sĩ có mức tương tác cao gấp nhiều lần bệnh viện. Nhưng thực tế vận hành lại cho thấy...
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5" staggerDelay={0.12}>
          {painPoints.map((item, i) => (
            <StaggerItem key={i}>
              <div className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-red-500/30 transition-all duration-500 hover:bg-red-500/[0.03]">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-red-400" />
                  </div>
                  <p className="text-white/70 text-lg leading-relaxed pt-2">{item.text}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimatedSection delay={0.5} className="mt-12 flex flex-col sm:flex-row gap-6 items-start">
          <div className="flex-1 p-6 rounded-2xl border border-red-500/20 bg-red-500/[0.05]">
            <p className="text-red-400 font-display font-semibold text-lg mb-2">Nếu không chuyển đổi:</p>
            <p className="text-white/50">Chi phí tăng, hiệu suất không tăng.</p>
          </div>
          <div className="flex-1 p-6 rounded-2xl border border-[#00D4FF]/20 bg-[#00D4FF]/[0.05]">
            <p className="text-[#00D4FF] font-display font-semibold text-lg mb-2">Nếu chuyển đổi đúng cách:</p>
            <p className="text-white/50">AI trở thành lợi thế cạnh tranh cốt lõi.</p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── VISION SECTION ─── */
function VisionSection() {
  return (
    <section id="vision" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img src={IMAGES.transformation} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0F] via-[#0A0A0F]/90 to-[#0A0A0F]/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection direction="left">
            <span className="text-[#00D4FF] font-display font-semibold text-sm tracking-[0.2em] uppercase mb-4 block">
              Tầm nhìn
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
              Mục tiêu không phải
              <br />
              <span className="gradient-text-gold">"dạy AI"</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-8">
              Mục tiêu là xây dựng một <span className="text-white font-medium">AI Operating System</span> hoàn chỉnh cho phòng Marketing.
              Trong 90 ngày, tập trung cao độ để tạo ra sự chuyển hóa thực sự.
            </p>
          </AnimatedSection>

          <StaggerContainer className="space-y-5" staggerDelay={0.15}>
            {[
              { icon: TrendingUp, text: 'Tăng hiệu suất sản xuất tối thiểu 150%', color: '#00D4FF' },
              { icon: Clock, text: 'Giảm thời gian hoàn thiện ấn phẩm 30%', color: '#00D4FF' },
              { icon: Target, text: 'Xây dựng Case thực chiến làm chuẩn nhân rộng', color: '#FFB800' },
              { icon: Rocket, text: 'Tạo sự chuyển hóa thực sự trong 90 ngày', color: '#FFB800' },
            ].map((item, i) => (
              <StaggerItem key={i}>
                <div className="flex items-center gap-4 p-5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-[#00D4FF]/20 transition-all duration-300">
                  <div
                    className="flex-shrink-0 w-11 h-11 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${item.color}15` }}
                  >
                    <item.icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <p className="text-white/80 font-medium">{item.text}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}

/* ─── METHOD SECTION ─── */
function MethodSection() {
  const layers = [
    {
      title: 'Tư duy làm chủ AI',
      desc: 'Hiểu bản chất AI, không chỉ biết dùng tool',
      icon: Lightbulb,
      color: '#FFB800',
    },
    {
      title: 'Nâng cấp năng lực lõi',
      desc: 'Chuyên môn sâu kết hợp AI tạo đột phá',
      icon: Layers,
      color: '#00D4FF',
    },
    {
      title: 'Công cụ & Prompt phù hợp',
      desc: 'Toolkit được thiết kế riêng cho từng vai trò',
      icon: Zap,
      color: '#00FF88',
    },
  ];

  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#00D4FF] font-display font-semibold text-sm tracking-[0.2em] uppercase mb-4 block">
            Phương pháp
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
            Tư duy dẫn dắt
            <span className="gradient-text-cyan"> công cụ</span>
          </h2>
          <p className="text-white/50 text-lg">
            Không biến nhân sự thành "thợ bấm nút". Mục tiêu là biến họ thành
            <span className="text-[#FFB800] font-medium"> "người sáng tạo độc lập"</span>.
          </p>
        </AnimatedSection>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#00D4FF]/30 to-transparent hidden md:block" />

          <StaggerContainer className="space-y-8" staggerDelay={0.2}>
            {layers.map((layer, i) => (
              <StaggerItem key={i}>
                <div className={`flex items-center gap-8 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="flex-1">
                    <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-[#00D4FF]/20 transition-all duration-500 group">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                        style={{ backgroundColor: `${layer.color}15` }}
                      >
                        <layer.icon className="w-7 h-7" style={{ color: layer.color }} />
                      </div>
                      <h3 className="font-display font-bold text-2xl mb-3" style={{ color: layer.color }}>
                        {layer.title}
                      </h3>
                      <p className="text-white/50 text-lg leading-relaxed">{layer.desc}</p>
                    </div>
                  </div>
                  {/* Center dot */}
                  <div className="hidden md:flex flex-shrink-0 w-4 h-4 rounded-full border-2 z-10" style={{ borderColor: layer.color, backgroundColor: `${layer.color}30` }} />
                  <div className="flex-1 hidden md:block" />
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}

/* ─── ROADMAP SECTION ─── */
function RoadmapSection() {
  const phases = [
    {
      phase: '01',
      title: 'Audit & Foundation',
      duration: 'Tháng 1',
      items: [
        'Đánh giá Org Chart, JD, quy trình',
        'Xác định điểm nghẽn vận hành',
        'Đào tạo AI Mindset cho toàn bộ team',
        'Thiết kế AI Workflow chuẩn',
      ],
      color: '#00D4FF',
    },
    {
      phase: '02',
      title: 'Training & Pilot',
      duration: 'Tháng 2',
      items: [
        'Đào tạo theo vai trò (Content / Design / Media)',
        'Ứng dụng ngay vào Case Mesmee',
        'So sánh hiệu suất trước & sau',
      ],
      color: '#FFB800',
    },
    {
      phase: '03',
      title: 'Optimize & Handover',
      duration: 'Tháng 3',
      items: [
        'Chuẩn hóa SOP',
        'Xây Prompt Library',
        'Thiết kế hệ thống đào tạo nội bộ',
        'Bàn giao hệ vận hành hoàn chỉnh',
      ],
      color: '#00FF88',
    },
  ];

  return (
    <section id="roadmap" className="relative py-24 md:py-32">
      {/* Subtle background */}
      <div className="absolute inset-0 z-0 opacity-10">
        <img src={IMAGES.pattern} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#FFB800] font-display font-semibold text-sm tracking-[0.2em] uppercase mb-4 block">
            Lộ trình
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
            90 ngày
            <span className="gradient-text-gold"> chuyển hóa</span>
          </h2>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.15}>
          {phases.map((phase) => (
            <StaggerItem key={phase.phase}>
              <div className="relative h-full p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 group">
                {/* Phase number */}
                <div
                  className="font-display font-bold text-6xl opacity-10 absolute top-4 right-6"
                  style={{ color: phase.color }}
                >
                  {phase.phase}
                </div>

                <div
                  className="inline-flex px-3 py-1 rounded-full text-xs font-semibold mb-4"
                  style={{ backgroundColor: `${phase.color}15`, color: phase.color }}
                >
                  {phase.duration}
                </div>

                <h3 className="font-display font-bold text-xl mb-5" style={{ color: phase.color }}>
                  {phase.title}
                </h3>

                <ul className="space-y-3">
                  {phase.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: phase.color }} />
                      <span className="text-white/60 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Bottom glow */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${phase.color}, transparent)` }}
                />
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ─── ROLE SECTION ─── */
function RoleSection() {
  const roles = [
    {
      title: 'Content Team',
      icon: PenTool,
      color: '#00D4FF',
      skills: ['AI Research & Planning', 'Prototype nhanh Visual/Video', 'Lập kế hoạch chiến dịch siêu tốc'],
    },
    {
      title: 'Design Team',
      icon: Palette,
      color: '#FFB800',
      skills: ['Text-to-Image', 'Generative Fill', 'Visual hóa ý tưởng phức tạp'],
    },
    {
      title: 'Media / Editor',
      icon: Clapperboard,
      color: '#00FF88',
      skills: ['AI Video', 'AI Sound', 'Tạo B-roll thông minh'],
    },
  ];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={IMAGES.team} alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/85 to-[#0A0A0F]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#00D4FF] font-display font-semibold text-sm tracking-[0.2em] uppercase mb-4 block">
            Đào tạo theo vai trò
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
            Mỗi vai trò,
            <span className="gradient-text-cyan"> một bộ kỹ năng AI riêng</span>
          </h2>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.15}>
          {roles.map((role) => (
            <StaggerItem key={role.title}>
              <div className="relative h-full p-8 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm hover:border-white/[0.15] transition-all duration-500 group">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${role.color}12` }}
                >
                  <role.icon className="w-7 h-7" style={{ color: role.color }} />
                </div>

                <h3 className="font-display font-bold text-xl mb-6" style={{ color: role.color }}>
                  {role.title}
                </h3>

                <ul className="space-y-4">
                  {role.skills.map((skill, j) => (
                    <li key={j} className="flex items-center gap-3">
                      <Sparkles className="w-4 h-4 flex-shrink-0" style={{ color: role.color }} />
                      <span className="text-white/60">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ─── DELIVERABLES SECTION ─── */
function DeliverablesSection() {
  const items = [
    { icon: Brain, text: 'AI Operating System hoàn chỉnh' },
    { icon: BookOpen, text: 'Prompt Library độc quyền' },
    { icon: Layers, text: 'Workflow chuẩn hóa' },
    { icon: Target, text: 'Case thực chiến Mesmee' },
    { icon: Rocket, text: 'Framework nhân rộng cho các brand khác' },
    { icon: Users, text: '5 buổi 1-1 chiến lược với Hải VN' },
    { icon: Shield, text: 'Group Coach hàng tuần cho đội ngũ' },
  ];

  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection direction="left">
            <span className="text-[#FFB800] font-display font-semibold text-sm tracking-[0.2em] uppercase mb-4 block">
              Bạn sẽ nhận được
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
              Hệ thống
              <span className="gradient-text-gold"> hoàn chỉnh</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed">
              Không chỉ là kiến thức — đây là toàn bộ hệ vận hành AI Marketing
              được thiết kế riêng cho Mesmee.
            </p>
          </AnimatedSection>

          <StaggerContainer className="space-y-4" staggerDelay={0.1}>
            {items.map((item, i) => (
              <StaggerItem key={i}>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-[#FFB800]/20 hover:bg-[#FFB800]/[0.02] transition-all duration-300">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#FFB800]/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-[#FFB800]" />
                  </div>
                  <span className="text-white/80 font-medium">{item.text}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}

/* ─── KPI SECTION ─── */
function KPISection() {
  const kpis = [
    {
      baseline: 150,
      potential: 300,
      suffix: '%',
      prefix: '+',
      label: 'Hiệu suất sản xuất nội dung',
      baselineLabel: 'Mức cam kết tối thiểu',
      potentialLabel: 'Tiềm năng thực tế',
      color: '#00D4FF',
    },
    {
      baseline: 30,
      potential: 60,
      suffix: '%',
      prefix: '-',
      label: 'Thời gian hoàn thiện ấn phẩm',
      baselineLabel: 'Mức cam kết tối thiểu',
      potentialLabel: 'Tiềm năng thực tế',
      color: '#FFB800',
    },
    {
      baseline: 10,
      potential: 50,
      suffix: 'x',
      prefix: '',
      label: 'Phương án test A/B',
      baselineLabel: 'Mức cam kết tối thiểu',
      potentialLabel: 'Tiềm năng thực tế',
      color: '#00FF88',
    },
  ];

  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#00D4FF] font-display font-semibold text-sm tracking-[0.2em] uppercase mb-4 block">
            KPI mục tiêu
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
            Kết quả sau
            <span className="gradient-text-cyan"> 90 ngày</span>
          </h2>
          <p className="text-white/40 text-lg">
            Đây là mức <span className="text-white/70 font-medium">cam kết tối thiểu</span> — khả năng thực tế có thể vượt xa hơn.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.2}>
          {kpis.map((kpi, i) => (
            <StaggerItem key={i}>
              <div className="relative text-center p-8 md:p-10 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.15] transition-all duration-500 group overflow-hidden">
                {/* Baseline */}
                <div className="mb-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/[0.06] text-white/40 mb-4">
                    <Shield className="w-3 h-3" />
                    {kpi.baselineLabel}
                  </span>
                </div>
                <div className="mb-1">
                  <CountUpNumber
                    end={kpi.baseline}
                    suffix={kpi.suffix}
                    prefix={kpi.prefix}
                    className="text-4xl md:text-5xl"
                    glowColor={kpi.color === '#FFB800' ? 'gold' : 'cyan'}
                  />
                </div>
                <p className="text-white/50 text-base mb-6">{kpi.label}</p>

                {/* Divider */}
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full h-px" style={{ background: `linear-gradient(90deg, transparent, ${kpi.color}30, transparent)` }} />
                  </div>
                  <div className="relative flex justify-center">
                    <div className="px-3 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase" style={{ backgroundColor: `${kpi.color}15`, color: kpi.color }}>
                      Có thể đạt
                    </div>
                  </div>
                </div>

                {/* Potential */}
                <div className="mt-4">
                  <div className="flex items-center justify-center gap-2">
                    <Rocket className="w-4 h-4" style={{ color: kpi.color }} />
                    <span className="font-display font-bold text-2xl md:text-3xl" style={{ color: kpi.color }}>
                      {kpi.prefix}{kpi.potential}{kpi.suffix}
                    </span>
                  </div>
                  <p className="text-white/30 text-sm mt-1">{kpi.potentialLabel}</p>
                </div>

                {/* Glow on hover */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${kpi.color}, transparent)` }}
                />
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimatedSection delay={0.4} className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-[#00D4FF]/[0.05] border border-[#00D4FF]/20">
            <TrendingUp className="w-5 h-5 text-[#00D4FF]" />
            <p className="text-white/70">
              Chuyển dịch thời gian từ <span className="text-red-400 font-medium">"làm thủ công"</span> sang{' '}
              <span className="text-[#00D4FF] font-medium">"sáng tạo & chiến lược"</span>
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── ACCOMPANY SECTION ─── */
function AccompanySection() {
  const items = [
    { num: '12', label: 'Workshop chiến lược', icon: Lightbulb },
    { num: '12', label: 'Buổi Group Coach cho team core', icon: Users },
    { num: '∞', label: 'Review dự án thực tế', icon: Target },
    { num: '✓', label: 'Onsite khi cần', icon: Rocket },
    { num: '✓', label: 'Handover đầy đủ tài liệu & hệ thống', icon: BookOpen },
  ];

  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#FFB800] font-display font-semibold text-sm tracking-[0.2em] uppercase mb-4 block">
            Hình thức đồng hành
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
            Triển khai + Chuyển giao
          </h2>
          <p className="text-white/50 text-xl">
            Không phải đào tạo lý thuyết.
            <span className="text-[#FFB800] font-medium"> Đây là thực chiến.</span>
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5" staggerDelay={0.1}>
          {items.map((item, i) => (
            <StaggerItem key={i}>
              <div className="text-center p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-[#FFB800]/20 transition-all duration-300 h-full">
                <div className="w-12 h-12 rounded-xl bg-[#FFB800]/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-[#FFB800]" />
                </div>
                <div className="font-display font-bold text-2xl text-[#FFB800] mb-2">{item.num}</div>
                <p className="text-white/50 text-sm">{item.label}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ─── INVESTMENT SECTION ─── */
function InvestmentSection() {
  const includes = [
    'Huấn luyện 1-1 chiến lược',
    'Đào tạo toàn team',
    'Thiết kế hệ thống AI',
    'Triển khai case thực chiến',
    'Chuẩn hóa & chuyển giao',
  ];

  return (
    <section id="investment" className="relative py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="relative p-10 md:p-16 rounded-3xl overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/10 via-[#0A0A0F] to-[#FFB800]/10 rounded-3xl" />
            <div className="absolute inset-0 border border-white/[0.08] rounded-3xl" />

            <div className="relative z-10 text-center">
              <span className="text-[#00D4FF] font-display font-semibold text-sm tracking-[0.2em] uppercase mb-4 block">
                Đầu tư
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-3">
                Chương trình 90 ngày
              </h2>

              <div className="my-10">
                <div className="font-display font-bold text-5xl md:text-7xl text-glow-gold">
                  <span className="gradient-text-gold">480.000.000</span>
                </div>
                <p className="text-white/40 text-lg mt-2">VNĐ</p>
              </div>

              <div className="max-w-md mx-auto mb-10">
                <p className="text-white/60 font-medium mb-4">Bao gồm:</p>
                <ul className="space-y-3 text-left">
                  {includes.map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#00D4FF] flex-shrink-0" />
                      <span className="text-white/70">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-white/[0.08]">
                <p className="text-white/30 text-sm">
                  Không bao gồm: ngân sách ads, tool trả phí, chi phí media sản xuất.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── MESMEE SHOWCASE SECTION ─── */
function MesmeeShowcaseSection() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % MESMEE_GALLERY.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const contentPillars = [
    { icon: BookOpen, label: 'Nhật ký Mes-Mee', desc: 'Câu chuyện cảm xúc hàng ngày', color: '#00D4FF', pct: 60 },
    { icon: Brain, label: 'Dr. Mescells Giải Đáp', desc: 'Giáo dục y khoa dễ hiểu', color: '#FFB800', pct: 25 },
    { icon: Target, label: 'Hành Trình Bệnh Nhân', desc: 'Kết quả điều trị thực tế', color: '#00FF88', pct: 15 },
  ];

  const sourceChannels = [
    { name: 'TT Cơ Xương Khớp MSC', followers: '99K', color: '#00D4FF' },
    { name: 'BS Trần Trọng Thắng', followers: '35K', color: '#FFB800' },
    { name: 'Viện NC Mescells', followers: '5.4K', color: '#00FF88' },
    { name: 'GS.TS Thái Hồng Quang', followers: '2.7K', color: '#00D4FF' },
    { name: 'PGS.TS Đỗ Tuấn Anh', followers: '1.3K', color: '#FFB800' },
    { name: 'BS CKII Trần Khanh', followers: '1K', color: '#00FF88' },
  ];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00D4FF]/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FFB800]/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center max-w-4xl mx-auto mb-16">
          <span className="text-[#00FF88] font-display font-semibold text-sm tracking-[0.2em] uppercase mb-4 block">
            Proof of Concept
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
            Cuộc chơi đã
            <span className="gradient-text-cyan"> thay đổi</span>
          </h2>
          <p className="text-white/50 text-lg md:text-xl leading-relaxed">
            Từ <span className="text-white/80 font-medium">17+ kênh MESCELLS</span>, AI tự động curate, viết lại theo giọng Mes-Mee, tạo hình ảnh AI, và đăng <span className="text-[#00D4FF] font-medium">5–10 bài/ngày</span> — hoàn toàn tự động.
          </p>
        </AnimatedSection>

        {/* Main showcase grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {/* Left: Gallery carousel */}
          <AnimatedSection className="relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.02]">
              {/* Browser chrome mockup */}
              <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.04] border-b border-white/[0.06]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <div className="flex-1 flex items-center gap-2 px-3 py-1 rounded-md bg-white/[0.04] text-white/30 text-xs">
                  <Globe className="w-3 h-3" />
                  facebook.com/mesmee.diary
                </div>
                <a
                  href="https://www.facebook.com/mesmee.diary/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[#00D4FF] text-xs hover:text-[#00D4FF]/80 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  Xem page
                </a>
              </div>

              {/* Image carousel */}
              <div className="relative aspect-square">
                {MESMEE_GALLERY.map((img, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0"
                    initial={false}
                    animate={{
                      opacity: i === activeIdx ? 1 : 0,
                      scale: i === activeIdx ? 1 : 1.05,
                    }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                  >
                    <img
                      src={img.src}
                      alt={img.label}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {/* Overlay label */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                      <p className="text-white font-display font-semibold text-lg">{img.label}</p>
                      <p className="text-white/50 text-sm">Nhật Ký Của Mes-Mee</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Dots */}
              <div className="flex items-center justify-center gap-2 py-3 bg-white/[0.02]">
                {MESMEE_GALLERY.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIdx(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === activeIdx ? 'bg-[#00D4FF] w-6' : 'bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Right: Stats & content strategy */}
          <div className="flex flex-col gap-6">
            {/* Live stats banner */}
            <AnimatedSection delay={0.1}>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#00D4FF]/[0.08] to-transparent border border-[#00D4FF]/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-[#00FF88] animate-pulse" />
                  <span className="text-[#00FF88] font-display font-semibold text-sm tracking-wider uppercase">AI Content Engine — Live</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="font-display font-bold text-2xl md:text-3xl text-white">20+</div>
                    <p className="text-white/40 text-xs mt-1">Bài đã đăng</p>
                  </div>
                  <div className="text-center">
                    <div className="font-display font-bold text-2xl md:text-3xl text-white">8</div>
                    <p className="text-white/40 text-xs mt-1">Phong cách ảnh AI</p>
                  </div>
                  <div className="text-center">
                    <div className="font-display font-bold text-2xl md:text-3xl text-white">17+</div>
                    <p className="text-white/40 text-xs mt-1">Kênh nguồn</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Content pillars */}
            <AnimatedSection delay={0.2}>
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <h3 className="font-display font-bold text-lg mb-4 text-white/80">3 Trụ cột nội dung</h3>
                <div className="space-y-4">
                  {contentPillars.map((pillar, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${pillar.color}15` }}>
                        <pillar.icon className="w-5 h-5" style={{ color: pillar.color }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white/70 text-sm font-medium">{pillar.label}</span>
                          <span className="text-xs font-bold" style={{ color: pillar.color }}>{pillar.pct}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: pillar.color }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${pillar.pct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: 0.3 + i * 0.15, ease: 'easeOut' }}
                          />
                        </div>
                        <p className="text-white/30 text-xs mt-1">{pillar.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Source channels */}
            <AnimatedSection delay={0.3}>
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <h3 className="font-display font-bold text-lg mb-4 text-white/80">Nguồn content vô hạn</h3>
                <p className="text-white/40 text-sm mb-4">AI curate từ hệ sinh thái 17+ kênh MESCELLS:</p>
                <div className="grid grid-cols-2 gap-2">
                  {sourceChannels.map((ch, i) => (
                    <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.04]">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: ch.color }} />
                      <div className="min-w-0">
                        <p className="text-white/60 text-xs truncate">{ch.name}</p>
                        <p className="text-xs font-bold" style={{ color: ch.color }}>{ch.followers}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* How it works pipeline */}
        <AnimatedSection delay={0.2} className="mb-16">
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
            <h3 className="font-display font-bold text-xl md:text-2xl text-center mb-8">
              Quy trình <span className="text-[#00D4FF]">AI Content Engine</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-2">
              {[
                { step: '01', title: 'Cào nội dung', desc: 'Từ 17+ kênh MESCELLS', icon: Globe, color: '#00D4FF' },
                { step: '02', title: 'AI Curate', desc: 'Chọn lọc bài chất lượng', icon: Brain, color: '#FFB800' },
                { step: '03', title: 'Viết lại', desc: 'Giọng Mes-Mee độc quyền', icon: PenTool, color: '#00FF88' },
                { step: '04', title: 'Tạo ảnh AI', desc: '8 phong cách khác nhau', icon: Image, color: '#00D4FF' },
                { step: '05', title: 'Tự động đăng', desc: '5–10 bài/ngày theo lịch', icon: Rocket, color: '#FFB800' },
              ].map((item, i) => (
                <div key={i} className="relative flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3" style={{ backgroundColor: `${item.color}12` }}>
                    <item.icon className="w-6 h-6" style={{ color: item.color }} />
                  </div>
                  <div className="font-display font-bold text-xs mb-1" style={{ color: item.color }}>{item.step}</div>
                  <h4 className="font-display font-bold text-sm text-white/80 mb-1">{item.title}</h4>
                  <p className="text-white/40 text-xs">{item.desc}</p>
                  {/* Arrow connector (hidden on mobile) */}
                  {i < 4 && (
                    <div className="hidden md:block absolute top-7 -right-1 text-white/10">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Before vs After comparison */}
        <AnimatedSection delay={0.3}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Before */}
            <div className="p-8 rounded-2xl bg-red-500/[0.04] border border-red-500/10">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <span className="text-red-400 font-display font-semibold text-sm tracking-wider uppercase">Trước AI</span>
              </div>
              <ul className="space-y-4">
                {[
                  'Team 3–5 người làm 1–2 bài/ngày',
                  'Mất 2–4 giờ cho 1 ấn phẩm',
                  'Nội dung lặp lại, thiếu đa dạng',
                  'Không tận dụng được content sẵn có',
                  'Phụ thuộc hoàn toàn vào con người',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-400 text-xs">✗</span>
                    </div>
                    <span className="text-white/50 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* After */}
            <div className="p-8 rounded-2xl bg-[#00D4FF]/[0.04] border border-[#00D4FF]/10">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-[#00FF88] animate-pulse" />
                <span className="text-[#00FF88] font-display font-semibold text-sm tracking-wider uppercase">Sau AI Transformation</span>
              </div>
              <ul className="space-y-4">
                {[
                  'AI tạo 5–10 bài/ngày tự động',
                  'Từ ý tưởng đến ấn phẩm trong 15 phút',
                  '3 trụ cột × 8 phong cách = vô hạn biến thể',
                  'Curate từ 17+ kênh — content không bao giờ cạn',
                  'Team tập trung sáng tạo & chiến lược',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#00FF88]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF88]" />
                    </div>
                    <span className="text-white/70 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </AnimatedSection>

        {/* CTA to fanpage */}
        <AnimatedSection delay={0.4} className="mt-12 text-center">
          <a
            href="https://www.facebook.com/mesmee.diary/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#00D4FF]/[0.08] border border-[#00D4FF]/20 hover:border-[#00D4FF]/40 hover:bg-[#00D4FF]/[0.12] transition-all duration-300"
          >
            <Play className="w-5 h-5 text-[#00D4FF]" />
            <span className="text-white/80 font-medium">Xem fanpage Nhật Ký Của Mes-Mee trên Facebook</span>
            <ExternalLink className="w-4 h-4 text-[#00D4FF] group-hover:translate-x-1 transition-transform" />
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── CLOSING SECTION ─── */
function ClosingSection() {
  return (
    <section className="relative py-24 md:py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-[#0A0A0F]" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#00D4FF]/5 to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <motion.div
            className="mb-8"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles className="w-10 h-10 text-[#00D4FF] mx-auto" />
          </motion.div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-6xl leading-tight mb-8">
            AI không phải xu hướng.
            <br />
            <span className="gradient-text-cyan">AI là điều kiện sống còn.</span>
          </h2>

          <p className="text-white/50 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12">
            Dự án này giúp Mesmee chuẩn hóa hệ thống Marketing, tăng hiệu suất thực tế,
            xây nền tảng tăng trưởng dài hạn, và tạo lợi thế cạnh tranh cốt lõi trong ngành Healthcare.
          </p>

          <motion.a
            href="#investment"
            className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#00D4FF] to-[#0099CC] text-[#0A0A0F] font-display font-bold text-xl rounded-2xl hover:shadow-[0_0_60px_rgba(0,212,255,0.4)] transition-all duration-500"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Bắt đầu chuyển đổi
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="relative py-12 border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#00D4FF]" />
            <span className="font-display font-semibold text-sm text-white/40">
              AI Marketing Transformation™
            </span>
          </div>
          <p className="text-white/20 text-sm">
            © 2024 — Designed for Mesmee Marketing Team
          </p>
        </div>
      </div>
    </footer>
  );
}

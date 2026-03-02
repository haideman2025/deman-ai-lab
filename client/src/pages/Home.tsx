/**
 * AI Marketing Transformation™ 90-Day Landing Page
 * Design: MESCELLS Brand — "Chiến binh chữa lành" (Mes-Mee mascot)
 * Color: Deep teal + mint/teal primary + warm gold accent + coral
 * Typography: Space Grotesk (display) + Nunito (body, warm & friendly)
 * Visual: Dreamy, magical, warm glow, DNA/cell motifs
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
  Globe,
  Heart,
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
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

/* ═══ ASSET URLS ═══ */
const IMAGES = {
  hero: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/mesmee-hero-bg-9uGTszd2ov5DkKAaNYdSPg.webp',
  transformation: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/mesmee-transformation-bg-G2DiUeFqRiwgNsFn44oSRV.webp',
  team: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/mesmee-team-collab-TdCsyjDMoyaLMuygskM2WT.webp',
  pattern: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/mesmee-pattern-bg-5CeurHMgM6pcASXmR5ePH5.webp',
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

/* ═══ BRAND COLORS ═══ */
const C = {
  teal: '#2DD4BF',
  tealDark: '#0D9488',
  gold: '#FFB800',
  coral: '#FB923C',
  mint: '#5EEAD4',
  green: '#34D399',
  bg: '#0A2E2E',
  bgLight: '#0F3D3D',
  bgCard: 'rgba(45, 212, 191, 0.04)',
};

export default function Home() {
  return (
    <div className="relative min-h-screen text-white overflow-x-hidden" style={{ backgroundColor: C.bg }}>
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
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-white/5"
      style={{ backgroundColor: `${C.bg}CC` }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5" style={{ color: C.teal }} />
          <span className="font-display font-bold text-lg tracking-tight">
            AI Marketing <span style={{ color: C.teal }}>Transformation</span>™
          </span>
        </div>
          <a
            href="#investment"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
            style={{
              backgroundColor: `${C.teal}15`,
              border: `1px solid ${C.teal}40`,
              color: C.teal,
            }}
          >
            Trao đổi phạm vi
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
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <img src={IMAGES.hero} alt="" className="w-full h-full object-cover" />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, ${C.bg}66, ${C.bg}99, ${C.bg})`,
          }}
        />
      </motion.div>

      <motion.div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-20" style={{ opacity }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
          style={{
            backgroundColor: `${C.teal}15`,
            border: `1px solid ${C.teal}30`,
          }}
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: C.teal }} />
          <span style={{ color: C.teal }} className="text-sm font-medium tracking-wide">
            Dành cho Viện NC Ứng Dụng Công Nghệ Tế Bào Mescells
          </span>
        </motion.div>

        <motion.h1
          className="font-display font-bold text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[1.05] mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <span className="text-white">AI Marketing</span>
          <br />
          <span className="gradient-text-teal">Transformation</span>
          <span style={{ color: C.gold }}>™</span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Hành trình <span style={{ color: C.teal }} className="font-semibold">90 ngày chuyển hóa</span> —
          <br className="hidden sm:block" />
          Nâng cấp hệ thống vận hành Marketing cho <span style={{ color: C.gold }} className="font-semibold">MESCELLS</span>.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <a
            href="#vision"
            className="group inline-flex items-center gap-3 px-8 py-4 font-display font-bold text-lg rounded-xl transition-all duration-500"
            style={{
              background: `linear-gradient(135deg, ${C.teal}, ${C.tealDark})`,
              color: C.bg,
            }}
          >
            <Sparkles className="w-5 h-5" />
            Xem phương án triển khai
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#investment"
            className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white/80 font-medium rounded-xl hover:text-white transition-all duration-300"
            style={{ ['--tw-border-opacity' as string]: 1 }}
          >
            Trao đổi phạm vi & ngân sách
          </a>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
            <motion.div
              className="w-1.5 h-3 rounded-full"
              style={{ backgroundColor: C.teal }}
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
          <span style={{ color: C.coral }} className="font-display font-semibold text-sm tracking-[0.2em] uppercase mb-4 block">
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
              <div className="group relative p-6 rounded-2xl border transition-all duration-500" style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}>
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

        <AnimatedSection delay={0.3} className="mt-10 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 p-6 rounded-2xl border border-red-500/20 bg-red-500/[0.05]">
            <p className="text-red-400 font-display font-semibold text-lg mb-2">Nếu không chuyển đổi:</p>
            <p className="text-white/50">Chi phí tăng, hiệu suất không tăng.</p>
          </div>
          <div className="flex-1 p-6 rounded-2xl border" style={{ borderColor: `${C.teal}30`, backgroundColor: `${C.teal}08` }}>
            <p style={{ color: C.teal }} className="font-display font-semibold text-lg mb-2">Nếu chuyển đổi đúng cách:</p>
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
      <div className="absolute inset-0 z-0">
        <img src={IMAGES.transformation} alt="" className="w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${C.bg}, ${C.bg}E6, ${C.bg}B3)` }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection direction="left">
            <span style={{ color: C.teal }} className="font-display font-semibold text-sm tracking-[0.2em] uppercase mb-4 block">
              Tầm nhìn
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
              Mục tiêu không phải
              <br />
              <span className="gradient-text-warm">"dạy AI"</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-8">
              Mục tiêu là xây dựng một <span className="text-white font-medium">AI Operating System</span> hoàn chỉnh cho phòng Marketing.
              Trong 90 ngày, tập trung cao độ để tạo ra <span className="text-white font-medium">Organizational Acceleration</span> — nâng cấp năng lực tổ chức, không chỉ cá nhân.
            </p>
          </AnimatedSection>

          <StaggerContainer className="space-y-5" staggerDelay={0.15}>
            {[
              { icon: TrendingUp, text: 'Tăng hiệu suất sản xuất tối thiểu 150%', color: C.teal },
              { icon: Clock, text: 'Giảm thời gian hoàn thiện ấn phẩm 30%', color: C.teal },
              { icon: Target, text: 'Xây dựng Case thực chiến làm chuẩn nhân rộng', color: C.gold },
              { icon: Heart, text: 'Tạo sự chuyển hóa thực sự trong 90 ngày', color: C.coral },
            ].map((item, i) => (
              <StaggerItem key={i}>
                <div className="flex items-center gap-4 p-5 rounded-xl transition-all duration-300" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
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
      desc: 'Hiểu bản chất AI, không chỉ biết dùng tool — giống như hiểu cơ chế tế bào trước khi ứng dụng',
      icon: Lightbulb,
      color: C.gold,
    },
    {
      title: 'Nâng cấp năng lực lõi',
      desc: 'Chuyên môn sâu kết hợp AI tạo đột phá — mỗi người trở thành chiến binh sáng tạo',
      icon: Layers,
      color: C.teal,
    },
    {
      title: 'Công cụ & Prompt phù hợp',
      desc: 'Toolkit được thiết kế riêng cho từng vai trò — như liệu pháp cá nhân hóa',
      icon: Zap,
      color: C.green,
    },
  ];

  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span style={{ color: C.teal }} className="font-display font-semibold text-sm tracking-[0.2em] uppercase mb-4 block">
            Phương pháp
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
            Tư duy dẫn dắt
            <span className="gradient-text-teal"> công cụ</span>
          </h2>
          <p className="text-white/50 text-lg">
            Không biến nhân sự thành "thợ bấm nút". Mục tiêu là biến họ thành
            <span style={{ color: C.gold }} className="font-medium"> "chiến binh sáng tạo độc lập"</span>.
          </p>
        </AnimatedSection>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-1/2 top-0 bottom-0 w-px hidden md:block" style={{ background: `linear-gradient(to bottom, transparent, ${C.teal}40, transparent)` }} />

          <StaggerContainer className="space-y-8" staggerDelay={0.2}>
            {layers.map((layer, i) => (
              <StaggerItem key={i}>
                <div className={`flex items-center gap-8 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="flex-1">
                    <div className="p-8 rounded-2xl transition-all duration-500 group" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
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
      color: C.teal,
    },
    {
      phase: '02',
      title: 'Training & Pilot',
      duration: 'Tháng 2',
      items: [
        'Đào tạo theo vai trò (Content / Design / Media)',
        'Ứng dụng ngay vào Case MESCELLS',
        'So sánh hiệu suất trước & sau',
      ],
      color: C.gold,
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
      color: C.green,
    },
  ];

  return (
    <section id="roadmap" className="relative py-24 md:py-32">
      <div className="absolute inset-0 z-0 opacity-8">
        <img src={IMAGES.pattern} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span style={{ color: C.gold }} className="font-display font-semibold text-sm tracking-[0.2em] uppercase mb-4 block">
            Lộ trình
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
            90 ngày
            <span className="gradient-text-warm"> chuyển hóa</span>
          </h2>
          <p className="text-white/40 text-lg">
            Như hành trình tái sinh của tế bào — mỗi giai đoạn là một bước tiến hóa.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.15}>
          {phases.map((phase) => (
            <StaggerItem key={phase.phase}>
              <div className="relative h-full p-8 rounded-2xl transition-all duration-500 group" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
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
      color: C.teal,
      skills: ['AI Research & Planning', 'Prototype nhanh Visual/Video', 'Lập kế hoạch chiến dịch siêu tốc'],
    },
    {
      title: 'Design Team',
      icon: Palette,
      color: C.gold,
      skills: ['Text-to-Image', 'Generative Fill', 'Visual hóa ý tưởng phức tạp'],
    },
    {
      title: 'Media / Editor',
      icon: Clapperboard,
      color: C.green,
      skills: ['AI Video', 'AI Sound', 'Tạo B-roll thông minh'],
    },
  ];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={IMAGES.team} alt="" className="w-full h-full object-cover opacity-15" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${C.bg}, ${C.bg}DD, ${C.bg})` }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span style={{ color: C.teal }} className="font-display font-semibold text-sm tracking-[0.2em] uppercase mb-4 block">
            Đào tạo theo vai trò
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
            Mỗi vai trò,
            <span className="gradient-text-teal"> một bộ kỹ năng AI riêng</span>
          </h2>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.15}>
          {roles.map((role) => (
            <StaggerItem key={role.title}>
              <div className="relative h-full p-8 rounded-2xl backdrop-blur-sm transition-all duration-500 group" style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
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
                      <Star className="w-4 h-4 flex-shrink-0" style={{ color: role.color }} />
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
    { icon: Target, text: 'Case thực chiến MESCELLS' },
    { icon: Rocket, text: 'Framework nhân rộng cho các brand khác' },
    { icon: Users, text: '5 buổi 1-1 chiến lược với Hải VN' },
    { icon: Shield, text: 'Group Coach hàng tuần cho đội ngũ' },
  ];

  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection direction="left">
            <span style={{ color: C.gold }} className="font-display font-semibold text-sm tracking-[0.2em] uppercase mb-4 block">
              System Deliverables
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
              Hệ thống
              <span className="gradient-text-warm"> bàn giao</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed">
              Không chỉ là kiến thức — đây là toàn bộ <span className="text-white/80 font-medium">AI Operating System</span> được thiết kế riêng cho MESCELLS, sẵn sàng vận hành độc lập sau chuyển giao.
            </p>
          </AnimatedSection>

          <StaggerContainer className="space-y-4" staggerDelay={0.1}>
            {items.map((item, i) => (
              <StaggerItem key={i}>
                <div className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${C.gold}12` }}>
                    <item.icon className="w-5 h-5" style={{ color: C.gold }} />
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
      color: C.teal,
    },
    {
      baseline: 30,
      potential: 60,
      suffix: '%',
      prefix: '-',
      label: 'Thời gian hoàn thiện ấn phẩm',
      baselineLabel: 'Mức cam kết tối thiểu',
      potentialLabel: 'Tiềm năng thực tế',
      color: C.gold,
    },
    {
      baseline: 10,
      potential: 50,
      suffix: 'x',
      prefix: '',
      label: 'Phương án test A/B',
      baselineLabel: 'Mức cam kết tối thiểu',
      potentialLabel: 'Tiềm năng thực tế',
      color: C.green,
    },
  ];

  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span style={{ color: C.teal }} className="font-display font-semibold text-sm tracking-[0.2em] uppercase mb-4 block">
            Kết quả kỳ vọng
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
            Performance Shift sau
            <span className="gradient-text-teal"> 90 ngày</span>
          </h2>
          <p className="text-white/40 text-lg">
            Đây là mức <span className="text-white/70 font-medium">cam kết tối thiểu</span> — khả năng thực tế có thể vượt xa hơn.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.2}>
          {kpis.map((kpi, i) => (
            <StaggerItem key={i}>
              <div className="relative text-center p-8 md:p-10 rounded-2xl transition-all duration-500 group overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
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
                    glowColor={kpi.color === C.gold ? 'gold' : 'cyan'}
                  />
                </div>
                <p className="text-white/50 text-base mb-6">{kpi.label}</p>

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

                <div className="mt-4">
                  <div className="flex items-center justify-center gap-2">
                    <Rocket className="w-4 h-4" style={{ color: kpi.color }} />
                    <span className="font-display font-bold text-2xl md:text-3xl" style={{ color: kpi.color }}>
                      {kpi.prefix}{kpi.potential}{kpi.suffix}
                    </span>
                  </div>
                  <p className="text-white/30 text-sm mt-1">{kpi.potentialLabel}</p>
                </div>

                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${kpi.color}, transparent)` }}
                />
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimatedSection delay={0.4} className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-xl" style={{ backgroundColor: `${C.teal}08`, border: `1px solid ${C.teal}30` }}>
            <TrendingUp className="w-5 h-5" style={{ color: C.teal }} />
            <p className="text-white/70">
              Chuyển dịch thời gian từ <span className="text-red-400 font-medium">"làm thủ công"</span> sang{' '}
              <span style={{ color: C.teal }} className="font-medium">"sáng tạo & chiến lược"</span>
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
          <span style={{ color: C.coral }} className="font-display font-semibold text-sm tracking-[0.2em] uppercase mb-4 block">
            Implementation & Transfer
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
            Triển khai + Chuyển giao
          </h2>
          <p className="text-white/50 text-xl">
            Không phải đào tạo lý thuyết.
            <span style={{ color: C.coral }} className="font-medium"> Đây là triển khai thực chiến và chuyển giao hệ thống.</span>
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5" staggerDelay={0.1}>
          {items.map((item, i) => (
            <StaggerItem key={i}>
              <div className="text-center p-6 rounded-2xl transition-all duration-300 h-full" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${C.coral}12` }}>
                  <item.icon className="w-6 h-6" style={{ color: C.coral }} />
                </div>
                <div className="font-display font-bold text-2xl mb-2" style={{ color: C.coral }}>{item.num}</div>
                <p className="text-white/50 text-sm">{item.label}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ─── INVESTMENT SECTION — 2-TIER STRATEGIC ─── */
function InvestmentSection() {
  const [hoveredTier, setHoveredTier] = useState<number | null>(null);

  const tiers = [
    {
      id: 1,
      badge: 'Đề xuất',
      title: 'Full System Transformation',
      subtitle: 'Chuyển đổi toàn diện hệ thống',
      desc: 'Triển khai đầy đủ 90 ngày — từ Audit, Training chuyên sâu, đến Chuyển giao hoàn chỉnh. Bao gồm tầng Performance Audit & KPI Restructuring.',
      includes: [
        'Lộ trình 90 ngày chuyển đổi toàn diện',
        '12 Workshop chiến lược',
        '12 buổi Group Coaching cho team core',
        '5 buổi 1-1 chiến lược với Hải VN',
        'Triển khai + Chuyển giao nội bộ',
        'AI Operating System hoàn chỉnh',
        'Performance Audit & KPI Restructuring',
        'Prompt Library + SOP + Scoreboard',
      ],
      color: C.teal,
      glowColor: C.teal,
      featured: true,
    },
    {
      id: 2,
      badge: 'Tối ưu phạm vi',
      title: 'Core System Deployment',
      subtitle: 'Triển khai hệ thống cốt lõi',
      desc: 'Cùng lộ trình 90 ngày, cùng workshop & coaching — tập trung vào triển khai hệ thống AI cốt lõi với phạm vi KPI tinh gọn hơn.',
      includes: [
        'Lộ trình 90 ngày — cùng framework',
        '12 Workshop chiến lược',
        '12 buổi Group Coaching cho team core',
        '5 buổi 1-1 chiến lược với Hải VN',
        'Triển khai + Chuyển giao nội bộ',
        'AI Operating System hoàn chỉnh',
        'Prompt Library + SOP chuẩn hóa',
      ],
      color: C.gold,
      glowColor: C.gold,
      featured: false,
    },
  ];

  return (
    <section id="investment" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px]" style={{ backgroundColor: `${C.teal}06` }} />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[150px]" style={{ backgroundColor: `${C.gold}06` }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-6">
          <span style={{ color: C.teal }} className="font-display font-semibold text-sm tracking-[0.2em] uppercase mb-4 block">
            Phạm vi & Đầu tư
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
            Hai phương án
            <span className="gradient-text-teal"> triển khai</span>
          </h2>
          <p className="text-white/50 text-lg leading-relaxed">
            Đây là đầu tư vào <span className="text-white/80 font-medium">hệ thống vận hành</span>, không phải chi phí đào tạo.
            Mỗi phương án được thiết kế để tạo ra chuyển đổi thực sự — chỉ khác nhau về độ sâu triển khai.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: `${C.gold}10`, border: `1px solid ${C.gold}25` }}>
            <MessageCircle className="w-4 h-4" style={{ color: C.gold }} />
            <span className="text-white/60 text-sm">
              Phạm vi có thể điều chỉnh theo nhu cầu thực tế của tổ chức
            </span>
          </div>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-8" staggerDelay={0.2}>
          {tiers.map((tier) => (
            <StaggerItem key={tier.id}>
              <div
                className="relative h-full rounded-3xl overflow-hidden transition-all duration-500 group"
                style={{
                  backgroundColor: hoveredTier === tier.id ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${tier.featured ? `${tier.color}30` : 'rgba(255,255,255,0.08)'}`,
                  transform: hoveredTier === tier.id ? 'translateY(-4px)' : 'translateY(0)',
                }}
                onMouseEnter={() => setHoveredTier(tier.id)}
                onMouseLeave={() => setHoveredTier(null)}
              >
                {tier.featured && (
                  <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${tier.color}, transparent)` }} />
                )}

                <div className="p-8 md:p-10">
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase"
                      style={{ backgroundColor: `${tier.color}15`, color: tier.color }}
                    >
                      {tier.featured && <Star className="w-3 h-3" />}
                      {tier.badge}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-2xl md:text-3xl mb-2" style={{ color: tier.color }}>
                    {tier.title}
                  </h3>
                  <p className="text-white/60 text-base mb-2">{tier.subtitle}</p>
                  <p className="text-white/40 text-sm leading-relaxed mb-8">{tier.desc}</p>

                  <div className="mb-8">
                    <p className="text-white/50 font-medium text-sm mb-4 tracking-wide uppercase">Bao gồm:</p>
                    <ul className="space-y-3">
                      {tier.includes.map((item, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: tier.color }} />
                          <span className="text-white/70 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6" style={{ borderTop: `1px solid rgba(255,255,255,0.06)` }}>
                    <a
                      href="#contact"
                      className="group/btn w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-display font-bold text-base transition-all duration-300"
                      style={{
                        backgroundColor: tier.featured ? `${tier.color}15` : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${tier.featured ? `${tier.color}40` : 'rgba(255,255,255,0.1)'}`,
                        color: tier.featured ? tier.color : 'rgba(255,255,255,0.7)',
                      }}
                    >
                      <MessageCircle className="w-4 h-4" />
                      Trao đổi phạm vi
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>

                {tier.featured && (
                  <div
                    className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full blur-[80px] opacity-20"
                    style={{ backgroundColor: tier.color }}
                  />
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimatedSection delay={0.4} className="mt-12">
          <div className="text-center">
            <p className="text-white/30 text-sm">
              Không bao gồm: ngân sách ads, tool trả phí, chi phí media sản xuất.
            </p>
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
    { icon: BookOpen, label: 'Nhật ký Mes-Mee', desc: 'Câu chuyện cảm xúc hàng ngày', color: C.teal, pct: 60 },
    { icon: Brain, label: 'Dr. Mescells Giải Đáp', desc: 'Giáo dục y khoa dễ hiểu', color: C.gold, pct: 25 },
    { icon: Target, label: 'Hành Trình Bệnh Nhân', desc: 'Kết quả điều trị thực tế', color: C.green, pct: 15 },
  ];

  const sourceChannels = [
    { name: 'TT Cơ Xương Khớp MSC', followers: '99K', color: C.teal },
    { name: 'BS Trần Trọng Thắng', followers: '35K', color: C.gold },
    { name: 'Viện NC Mescells', followers: '5.4K', color: C.green },
    { name: 'GS.TS Thái Hồng Quang', followers: '2.7K', color: C.teal },
    { name: 'PGS.TS Đỗ Tuấn Anh', followers: '1.3K', color: C.gold },
    { name: 'BS CKII Trần Khanh', followers: '1K', color: C.green },
  ];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[120px]" style={{ backgroundColor: `${C.teal}06` }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-[120px]" style={{ backgroundColor: `${C.gold}06` }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-4xl mx-auto mb-16">
          <span style={{ color: C.green }} className="font-display font-semibold text-sm tracking-[0.2em] uppercase mb-4 block">
            Proof of Concept
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
            Cuộc chơi đã
            <span className="gradient-text-teal"> thay đổi</span>
          </h2>
          <p className="text-white/50 text-lg md:text-xl leading-relaxed">
            Từ <span className="text-white/80 font-medium">17+ kênh MESCELLS</span>, AI tự động curate, viết lại theo giọng Mes-Mee, tạo hình ảnh AI, và đăng <span style={{ color: C.teal }} className="font-medium">5–10 bài/ngày</span> — hoàn toàn tự động.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          <AnimatedSection className="relative">
            <div className="relative rounded-2xl overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ backgroundColor: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.06)' }}>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <div className="flex-1 flex items-center gap-2 px-3 py-1 rounded-md text-white/30 text-xs" style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}>
                  <Globe className="w-3 h-3" />
                  facebook.com/mesmee.diary
                </div>
                <a
                  href="https://www.facebook.com/mesmee.diary/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs transition-colors"
                  style={{ color: C.teal }}
                >
                  <ExternalLink className="w-3 h-3" />
                  Xem page
                </a>
              </div>

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
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                      <p className="text-white font-display font-semibold text-lg">{img.label}</p>
                      <p className="text-white/50 text-sm">Nhật Ký Của Mes-Mee</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center justify-center gap-2 py-3" style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
                {MESMEE_GALLERY.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIdx(i)}
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: i === activeIdx ? '24px' : '8px',
                      backgroundColor: i === activeIdx ? C.teal : 'rgba(255,255,255,0.2)',
                    }}
                  />
                ))}
              </div>
            </div>
          </AnimatedSection>

          <div className="flex flex-col gap-6">
            <AnimatedSection delay={0.1}>
              <div className="p-6 rounded-2xl" style={{ background: `linear-gradient(135deg, ${C.teal}10, transparent)`, border: `1px solid ${C.teal}30` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: C.green }} />
                  <span style={{ color: C.green }} className="font-display font-semibold text-sm tracking-wider uppercase">AI Content Engine — Live</span>
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

            <AnimatedSection delay={0.2}>
              <div className="p-6 rounded-2xl" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
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
                        <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
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

            <AnimatedSection delay={0.3}>
              <div className="p-6 rounded-2xl" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h3 className="font-display font-bold text-lg mb-4 text-white/80">Nguồn content vô hạn</h3>
                <p className="text-white/40 text-sm mb-4">AI curate từ hệ sinh thái 17+ kênh MESCELLS:</p>
                <div className="grid grid-cols-2 gap-2">
                  {sourceChannels.map((ch, i) => (
                    <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.04)' }}>
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

        {/* Pipeline */}
        <AnimatedSection delay={0.2} className="mb-16">
          <div className="p-8 rounded-2xl" style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 className="font-display font-bold text-xl md:text-2xl text-center mb-8">
              Quy trình <span style={{ color: C.teal }}>AI Content Engine</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-2">
              {[
                { step: '01', title: 'Cào nội dung', desc: 'Từ 17+ kênh MESCELLS', icon: Globe, color: C.teal },
                { step: '02', title: 'AI Curate', desc: 'Chọn lọc bài chất lượng', icon: Brain, color: C.gold },
                { step: '03', title: 'Viết lại', desc: 'Giọng Mes-Mee độc quyền', icon: PenTool, color: C.green },
                { step: '04', title: 'Tạo ảnh AI', desc: '8 phong cách khác nhau', icon: Image, color: C.teal },
                { step: '05', title: 'Tự động đăng', desc: '5–10 bài/ngày theo lịch', icon: Rocket, color: C.gold },
              ].map((item, i) => (
                <div key={i} className="relative flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3" style={{ backgroundColor: `${item.color}12` }}>
                    <item.icon className="w-6 h-6" style={{ color: item.color }} />
                  </div>
                  <div className="font-display font-bold text-xs mb-1" style={{ color: item.color }}>{item.step}</div>
                  <h4 className="font-display font-bold text-sm text-white/80 mb-1">{item.title}</h4>
                  <p className="text-white/40 text-xs">{item.desc}</p>
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

        {/* Before vs After */}
        <AnimatedSection delay={0.3}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-2xl" style={{ backgroundColor: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.1)' }}>
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

            <div className="p-8 rounded-2xl" style={{ backgroundColor: `${C.teal}06`, border: `1px solid ${C.teal}15` }}>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: C.green }} />
                <span style={{ color: C.green }} className="font-display font-semibold text-sm tracking-wider uppercase">Sau AI Transformation</span>
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
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${C.green}20` }}>
                      <CheckCircle2 className="w-3.5 h-3.5" style={{ color: C.green }} />
                    </div>
                    <span className="text-white/70 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.4} className="mt-12 text-center">
          <a
            href="https://www.facebook.com/mesmee.diary/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl transition-all duration-300"
            style={{ backgroundColor: `${C.teal}10`, border: `1px solid ${C.teal}30` }}
          >
            <Play className="w-5 h-5" style={{ color: C.teal }} />
            <span className="text-white/80 font-medium">Xem fanpage Nhật Ký Của Mes-Mee trên Facebook</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" style={{ color: C.teal }} />
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
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${C.bg}, transparent, ${C.bg})` }} />
        <div className="absolute bottom-0 left-0 right-0 h-1/2" style={{ background: `linear-gradient(to top, ${C.teal}08, transparent)` }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <motion.div
            className="mb-8"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Heart className="w-10 h-10 mx-auto" style={{ color: C.teal }} />
          </motion.div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-6xl leading-tight mb-8">
            AI không phải xu hướng.
            <br />
            <span className="gradient-text-teal">AI là điều kiện sống còn.</span>
          </h2>

          <p className="text-white/50 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12">
            Đây không phải chi phí — đây là <span className="text-white/80 font-medium">đầu tư vào hệ thống vận hành</span>.
            Dự án giúp MESCELLS nâng cấp năng lực tổ chức, tạo lợi thế cạnh tranh dài hạn trong ngành Healthcare.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="#investment"
              className="group inline-flex items-center gap-3 px-10 py-5 font-display font-bold text-xl rounded-2xl transition-all duration-500"
              style={{
                background: `linear-gradient(135deg, ${C.teal}, ${C.tealDark})`,
                color: C.bg,
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageCircle className="w-6 h-6" />
              Trao đổi phạm vi & ngân sách
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a
              href="#roadmap"
              className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white/70 font-medium rounded-xl hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              Xem chi tiết lộ trình
            </motion.a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="relative py-12" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4" style={{ color: C.teal }} />
            <span className="font-display font-semibold text-sm text-white/40">
              AI Marketing Transformation™ × MESCELLS
            </span>
          </div>
          <p className="text-white/20 text-sm">
            © 2026 — Viện NC Ứng Dụng Công Nghệ Tế Bào Mescells
          </p>
        </div>
      </div>
    </footer>
  );
}

/**
 * AI Marketing Transformation™ 90-Day Landing Page
 * Design: MESCELLS Brand — "Chiến binh chữa lành" (Mes-Mee mascot)
 * Color: Deep teal + mint/teal primary + warm gold accent + coral
 * Typography: Space Grotesk (display) + Nunito (body, warm & friendly)
 * Visual: Dreamy, magical, warm glow, DNA/cell motifs
 */

import { useAuth } from '@/_core/hooks/useAuth';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import { CountUpNumber } from '@/components/CountUpNumber';
import { ParticleBackground } from '@/components/ParticleBackground';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowLeft,
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
  UserCog,
  Users,
  Workflow,
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

const VIDEO_URL = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/bs-trannamchung-mesmee_1de1832a.mp4';

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
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

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
      <AIMarketingRoleSection />
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
        <div className="flex items-center gap-4">
          <a href="/" className="flex items-center gap-2 text-xs font-medium opacity-50 hover:opacity-100 transition-opacity" style={{ color: C.teal }}>
            <ArrowLeft className="w-3 h-3" /> DEMAN AI LAB
          </a>
          <div className="w-px h-4 bg-white/10" />
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5" style={{ color: C.teal }} />
            <span className="font-display font-bold text-lg tracking-tight">
              AI Marketing <span style={{ color: C.teal }}>Transformation</span>™
            </span>
          </div>
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
            Dành riêng cho Viện NC Ứng Dụng Công Nghệ Tế Bào Mescells
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
          Để đội ngũ <span style={{ color: C.gold }} className="font-semibold">MESCELLS</span> tỏa sáng theo cách riêng của mình.
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
    { icon: PenTool, text: 'Content quá tải — vừa nghĩ ý tưởng vừa chạy deadline, mệt lắm phải không?' },
    { icon: Clock, text: 'Design & Media làm thủ công — chậm, tốn sức, mà chưa chắc đã hiệu quả' },
    { icon: Brain, text: 'Chưa có AI nào thực sự "hiểu" quy trình của team' },
    { icon: BarChart3, text: 'Không biết đo lường thế nào cho đúng, tối ưu ra sao cho trúng' },
  ];

  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="max-w-3xl mb-16">
          <span style={{ color: C.coral }} className="font-display font-semibold text-sm tracking-[0.2em] uppercase mb-4 block">
            Bạn ơi, tớ hiểu mà...
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
            Marketing Healthcare
            <br />
            <span className="text-white/40">đang thay đổi nhanh lắm rồi.</span>
          </h2>
          <p className="text-white/50 text-lg leading-relaxed">
            TikTok, nội dung giáo dục, livestream, case thực tế — tất cả đang thay đổi cuộc chơi.
            Bác sĩ có tương tác cao gấp nhiều lần bệnh viện. Nhưng thực tế vận hành thì sao?
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
            <p className="text-red-400 font-display font-semibold text-lg mb-2">Nếu cứ giữ nguyên:</p>
            <p className="text-white/50">Chi phí cứ tăng, mà team thì kiệt sức dần...</p>
          </div>
          <div className="flex-1 p-6 rounded-2xl border" style={{ borderColor: `${C.teal}30`, backgroundColor: `${C.teal}08` }}>
            <p style={{ color: C.teal }} className="font-display font-semibold text-lg mb-2">Nhưng nếu chuyển đổi đúng cách:</p>
            <p className="text-white/50">AI sẽ trở thành "người đồng hành" đáng tin nhất của team.</p>
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
              Tớ muốn chia sẻ với bạn
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
              Mục tiêu không phải
              <br />
              <span className="gradient-text-warm">"dạy dùng AI"</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-8">
              Mục tiêu thực sự là xây dựng một <span className="text-white font-medium">hệ thống vận hành AI</span> hoàn chỉnh — để team Marketing không chỉ "biết dùng", mà <span className="text-white font-medium">tự tin làm chủ</span>. Trong 90 ngày, mình cùng nhau tạo ra sự thay đổi thực sự cho cả tổ chức.
            </p>
          </AnimatedSection>

          <StaggerContainer className="space-y-5" staggerDelay={0.15}>
            {[
              { icon: TrendingUp, text: 'Hiệu suất sản xuất tăng ít nhất 150% — team sẽ bất ngờ đấy', color: C.teal },
              { icon: Clock, text: 'Giảm 30% thời gian hoàn thiện — để team có thời gian sáng tạo', color: C.teal },
              { icon: Target, text: 'Xây case study thực chiến — làm chuẩn để nhân rộng', color: C.gold },
              { icon: Heart, text: 'Tạo sự chuyển hóa thực sự — không chỉ kỹ năng, mà cả tư duy', color: C.coral },
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
      desc: 'Hiểu bản chất AI trước khi dùng — giống như hiểu cơ chế tế bào trước khi ứng dụng vậy đó',
      icon: Lightbulb,
      color: C.gold,
    },
    {
      title: 'Nâng cấp năng lực lõi',
      desc: 'Khi chuyên môn sâu gặp AI — mỗi người sẽ tỏa sáng theo cách riêng của mình',
      icon: Layers,
      color: C.teal,
    },
    {
      title: 'Công cụ & Prompt phù hợp',
      desc: 'Mỗi vai trò có bộ toolkit riêng — được "may đo" như liệu pháp cá nhân hóa vậy',
      icon: Zap,
      color: C.green,
    },
  ];

  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span style={{ color: C.teal }} className="font-display font-semibold text-sm tracking-[0.2em] uppercase mb-4 block">
            Cách mình làm
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
            Tư duy dẫn dắt
            <span className="gradient-text-teal"> công cụ</span>
          </h2>
          <p className="text-white/50 text-lg">
            Mình không muốn biến team thành "thợ bấm nút". Mình muốn mỗi người trở thành
            <span style={{ color: C.gold }} className="font-medium"> chiến binh sáng tạo — tự tin và độc lập</span>.
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
      duration: 'Tháng 4/2025',
      budget: '100.000.000 VNĐ',
      items: [
        'Đánh giá Org Chart, JD, quy trình hiện tại',
        'Xác định điểm nghẽn vận hành & cơ hội AI',
        'Đào tạo AI Mindset cho toàn bộ team MKT',
        'Thiết kế AI Workflow chuẩn cho từng vai trò',
        'Phỏng vấn & đánh giá năng lực AI cá nhân',
      ],
      results: [
        'Báo cáo Audit toàn diện phòng MKT',
        'AI Readiness Score cho từng thành viên',
        'Blueprint AI Workflow v1.0',
        'Kế hoạch đào tạo cá nhân hóa',
      ],
      color: C.teal,
    },
    {
      phase: '02',
      title: 'Training & Pilot',
      duration: 'Tháng 5/2025',
      budget: '100.000.000 VNĐ',
      items: [
        'Đào tạo chuyên sâu theo vai trò (Content / Design / Media)',
        'Triển khai AI Content Engine cho MESCELLS',
        'Ứng dụng thực chiến vào case MESCELLS',
        'So sánh hiệu suất trước & sau AI',
        'Nâng cấp công cụ AI cá nhân cho từng người',
      ],
      results: [
        'Team tự vận hành AI workflow cơ bản',
        'AI Content Engine hoạt động thực tế',
        'Báo cáo hiệu suất Before/After',
        'Prompt Library v1.0 cho từng vai trò',
      ],
      color: C.gold,
    },
    {
      phase: '03',
      title: 'Optimize & Handover',
      duration: 'Tháng 6/2025',
      budget: '100.000.000 VNĐ',
      items: [
        'Chuẩn hóa SOP vận hành AI',
        'Xây dựng Prompt Library hoàn chỉnh',
        'Thiết kế hệ thống đào tạo nội bộ',
        'Tối ưu & scale AI Content Engine',
        'Bàn giao toàn bộ hệ vận hành',
      ],
      results: [
        'AI Operating System hoàn chỉnh',
        'SOP + Prompt Library + Scoreboard',
        'Framework nhân rộng cho brand khác',
        'Team tự vận hành độc lập 100%',
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
            Hành trình của chúng mình
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
            90 ngày
            <span className="gradient-text-warm"> chuyển hóa</span>
          </h2>
          <p className="text-white/40 text-lg">
            Như hành trình tái sinh của tế bào — mỗi giai đoạn là một bước tiến hóa, mình sẽ đi cùng bạn.
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

                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="inline-flex px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: `${phase.color}15`, color: phase.color }}
                  >
                    {phase.duration}
                  </div>
                  <div
                    className="inline-flex px-3 py-1 rounded-full text-xs font-bold"
                    style={{ backgroundColor: `${C.coral}15`, color: C.coral }}
                  >
                    {phase.budget}
                  </div>
                </div>

                <h3 className="font-display font-bold text-xl mb-5" style={{ color: phase.color }}>
                  {phase.title}
                </h3>

                <div className="mb-5">
                  <span className="text-xs font-semibold tracking-[0.15em] uppercase mb-3 block" style={{ color: `${phase.color}99` }}>
                    Hạng mục công việc
                  </span>
                  <ul className="space-y-2.5">
                    {phase.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: phase.color }} />
                        <span className="text-white/60 text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <span className="text-xs font-semibold tracking-[0.15em] uppercase mb-3 block" style={{ color: `${C.coral}cc` }}>
                    Kết quả bàn giao
                  </span>
                  <ul className="space-y-2.5">
                    {phase.results.map((result, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <Target className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: C.coral }} />
                        <span className="text-white/50 text-sm leading-relaxed font-medium">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${phase.color}, transparent)` }}
                />
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Total Budget Summary */}
        <AnimatedSection delay={0.3} className="mt-12">
          <div className="max-w-2xl mx-auto p-6 rounded-xl text-center" style={{ backgroundColor: `${C.gold}08`, border: `1px solid ${C.gold}20` }}>
            <div className="flex items-center justify-center gap-6 flex-wrap">
              <div>
                <span className="text-white/40 text-sm block mb-1">Tổng ngân sách</span>
                <span className="font-display font-bold text-2xl" style={{ color: C.gold }}>300.000.000 VNĐ</span>
              </div>
              <div className="w-px h-10 bg-white/10 hidden sm:block" />
              <div>
                <span className="text-white/40 text-sm block mb-1">Thời gian</span>
                <span className="font-display font-bold text-2xl" style={{ color: C.teal }}>3 tháng</span>
              </div>
              <div className="w-px h-10 bg-white/10 hidden sm:block" />
              <div>
                <span className="text-white/40 text-sm block mb-1">Triển khai</span>
                <span className="font-display font-bold text-2xl" style={{ color: C.green }}>T4–T6/2025</span>
              </div>
            </div>
          </div>
        </AnimatedSection>
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
      desc: 'AI hiện thực hoá ý tưởng thành visual, brief bằng hình ảnh',
      skills: ['AI Research & Planning', 'Prototype nhanh Visual/Video', 'Lập kế hoạch chiến dịch siêu tốc'],
      details: [
        'Dùng AI để research chủ đề, insight, xu hướng ngành',
        'Tạo brief bằng hình ảnh thay vì văn bản dài',
        'Prototype nhanh ý tưởng visual/video trong vài phút',
        'Lên kế hoạch chiến dịch siêu tốc với AI assistant',
      ],
    },
    {
      title: 'Design Team',
      icon: Palette,
      color: C.gold,
      desc: 'Tìm kiếm từ stock thành tư liệu sẵn có, dùng kỹ năng hình ảnh để sản xuất sản phẩm cuối',
      skills: ['Text-to-Image', 'Generative Fill', 'Visual hóa ý tưởng phức tạp'],
      details: [
        'Tìm kiếm & tổng hợp tư liệu từ stock thành bài sẵn có',
        'Dùng AI Generative Fill để chỉnh sửa & mở rộng hình ảnh',
        'Text-to-Image: tạo visual từ mô tả ý tưởng',
        'Sản xuất sản phẩm cuối cùng với kỹ năng hình ảnh chuyên sâu',
      ],
    },
    {
      title: 'Media / Editor',
      icon: Clapperboard,
      color: C.green,
      desc: 'Sources quay của đội đi quay, thêm nhóm sources về cảnh trám, cảnh quay sản phẩm, nhạc nền',
      skills: ['AI Video', 'AI Sound', 'Tạo B-roll thông minh'],
      details: [
        'Tổng hợp sources quay từ đội đi quay thực tế',
        'Thêm nhóm sources về cảnh trám, cảnh quay sản phẩm',
        'AI tạo nhạc nền phù hợp tông video',
        'Tạo B-roll thông minh bằng AI Video',
      ],
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
            Ai cũng được quan tâm
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
            Mỗi vai trò,
            <span className="gradient-text-teal"> một "liệu trình" AI riêng</span>
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

                <h3 className="font-display font-bold text-xl mb-3" style={{ color: role.color }}>
                  {role.title}
                </h3>

                <p className="text-sm text-white/50 mb-5 leading-relaxed italic">
                  {role.desc}
                </p>

                <div className="mb-5">
                  <span className="text-xs font-semibold tracking-[0.15em] uppercase mb-3 block" style={{ color: `${role.color}99` }}>Kỹ năng AI chính</span>
                  <ul className="space-y-3">
                    {role.skills.map((skill, j) => (
                      <li key={j} className="flex items-center gap-3">
                        <Star className="w-4 h-4 flex-shrink-0" style={{ color: role.color }} />
                        <span className="text-white/60 text-sm">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <span className="text-xs font-semibold tracking-[0.15em] uppercase mb-3 block" style={{ color: `${role.color}99` }}>Quy trình thực tế</span>
                  <ul className="space-y-2.5">
                    {role.details.map((detail, j) => (
                      <li key={j} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: `${role.color}80` }} />
                        <span className="text-white/50 text-sm leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ─── AI MARKETING ROLE SECTION ─── */
function AIMarketingRoleSection() {
  const responsibilities = [
    {
      icon: UserCog,
      title: 'Phối hợp cùng TP Marketing',
      desc: 'Hỗ trợ Trưởng phòng Marketing trong việc phỏng vấn, đánh giá năng lực AI của team, và lên kế hoạch đào tạo phù hợp từng người.',
    },
    {
      icon: Brain,
      title: 'Đồng hành đào tạo 1-1',
      desc: 'Làm việc trực tiếp với từng thành viên — nâng cấp kỹ năng AI cá nhân bằng các công cụ phù hợp với vai trò (Content, Design, Media).',
    },
    {
      icon: Workflow,
      title: 'Vận hành AI Content Engine',
      desc: 'Phụ trách quy trình AI Content Engine — từ cào nội dung, AI curate, viết lại, tạo ảnh AI đến tự động đăng bài.',
    },
    {
      icon: Target,
      title: 'Cấu trúc phòng MKT mới',
      desc: 'Bổ sung vị trí AI Marketing vào org chart — người kết nối giữa chiến lược và công nghệ, đảm bảo AI được ứng dụng đúng cách.',
    },
    {
      icon: Zap,
      title: 'Nâng cấp công cụ cá nhân',
      desc: 'Trang bị cho mỗi thành viên bộ công cụ AI riêng — ChatGPT, Midjourney, Runway, Suno... tùy theo vai trò và nhu cầu.',
    },
    {
      icon: Shield,
      title: 'Đảm bảo chất lượng đầu ra',
      desc: 'Kiểm soát chất lượng nội dung AI tạo ra, đảm bảo đúng tone of voice thương hiệu và chuẩn y khoa.',
    },
  ];

  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span style={{ color: C.coral }} className="font-display font-semibold text-sm tracking-[0.2em] uppercase mb-4 block">
            Cấu trúc đội ngũ mới
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
            Vị trí <span className="gradient-text-warm">AI Marketing</span>
            <br />
            trong phòng MKT
          </h2>
          <p className="text-white/50 text-lg leading-relaxed">
            Không chỉ nâng cấp kỹ năng cá nhân — mà còn bổ sung <span className="text-white/80 font-medium">1 vị trí AI Marketing</span> vào cấu trúc phòng, phối hợp cùng TP MKT để đồng hành đào tạo và vận hành AI cho toàn bộ team.
          </p>
        </AnimatedSection>

        {/* Org Chart Visual */}
        <AnimatedSection className="mb-16">
          <div className="max-w-2xl mx-auto">
            {/* TP MKT */}
            <div className="text-center mb-3">
              <div className="inline-flex items-center gap-3 px-6 py-4 rounded-xl" style={{ backgroundColor: `${C.teal}15`, border: `1px solid ${C.teal}30` }}>
                <Users className="w-5 h-5" style={{ color: C.teal }} />
                <span className="font-display font-bold text-lg" style={{ color: C.teal }}>TP Marketing</span>
              </div>
            </div>
            {/* Connector line */}
            <div className="flex justify-center mb-3">
              <div className="w-px h-8" style={{ backgroundColor: `${C.teal}40` }} />
            </div>
            {/* AI Marketing Role - highlighted */}
            <div className="text-center mb-3">
              <div className="inline-flex items-center gap-3 px-8 py-5 rounded-xl relative" style={{ background: `linear-gradient(135deg, ${C.coral}20, ${C.gold}15)`, border: `2px solid ${C.coral}60` }}>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-xs font-bold" style={{ backgroundColor: C.coral, color: C.bg }}>MỚI</div>
                <UserCog className="w-6 h-6" style={{ color: C.coral }} />
                <div className="text-left">
                  <span className="font-display font-bold text-lg block" style={{ color: C.coral }}>AI Marketing</span>
                  <span className="text-xs text-white/50">Phối hợp & đào tạo AI cho team</span>
                </div>
              </div>
            </div>
            {/* Connector lines to 3 teams */}
            <div className="flex justify-center mb-3">
              <div className="w-px h-6" style={{ backgroundColor: `${C.coral}40` }} />
            </div>
            <div className="relative flex justify-center mb-3">
              <div className="absolute top-0 left-[16.67%] right-[16.67%] h-px" style={{ backgroundColor: `${C.coral}30` }} />
              <div className="flex justify-between w-2/3">
                <div className="w-px h-6" style={{ backgroundColor: `${C.coral}30` }} />
                <div className="w-px h-6" style={{ backgroundColor: `${C.coral}30` }} />
                <div className="w-px h-6" style={{ backgroundColor: `${C.coral}30` }} />
              </div>
            </div>
            {/* 3 Teams */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { name: 'Content Team', color: C.teal, icon: PenTool },
                { name: 'Design Team', color: C.gold, icon: Palette },
                { name: 'Media / Editor', color: C.green, icon: Clapperboard },
              ].map((team) => (
                <div key={team.name} className="text-center">
                  <div className="inline-flex flex-col items-center gap-2 px-4 py-3 rounded-xl w-full" style={{ backgroundColor: `${team.color}10`, border: `1px solid ${team.color}25` }}>
                    <team.icon className="w-4 h-4" style={{ color: team.color }} />
                    <span className="font-display font-semibold text-sm" style={{ color: team.color }}>{team.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Responsibilities Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
          {responsibilities.map((item, i) => (
            <StaggerItem key={i}>
              <div className="h-full p-6 rounded-xl transition-all duration-300" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${C.coral}12` }}>
                  <item.icon className="w-6 h-6" style={{ color: C.coral }} />
                </div>
                <h4 className="font-display font-bold text-base mb-2" style={{ color: C.coral }}>{item.title}</h4>
                <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Bottom note */}
        <AnimatedSection className="mt-12">
          <div className="max-w-3xl mx-auto p-6 rounded-xl text-center" style={{ backgroundColor: `${C.coral}08`, border: `1px solid ${C.coral}20` }}>
            <p className="text-sm leading-relaxed" style={{ color: C.coral }}>
              <span className="font-bold">Đề xuất:</span> Bổ sung vị trí AI Marketing vào cấu trúc phòng MKT hiện tại — người này sẽ là đầu mối phối hợp với DeMAN AI LAB trong suốt 90 ngày, đồng thời là người duy trì và phát triển hệ thống AI sau khi bàn giao.
            </p>
          </div>
        </AnimatedSection>
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
              Quà tặng sau hành trình
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
              Hệ thống
              <span className="gradient-text-warm"> bàn giao</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed">
              Không chỉ là kiến thức — đây là toàn bộ <span className="text-white/80 font-medium">"kho báu"</span> được thiết kế riêng cho MESCELLS. Sau 90 ngày, team sẽ tự tin vận hành mà không cần ai cầm tay chỉ việc nữa.
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
            Kết quả mình hứa
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
            Sau 90 ngày,
            <span className="gradient-text-teal"> bạn sẽ thấy</span>
          </h2>
          <p className="text-white/40 text-lg">
            Đây là mức <span className="text-white/70 font-medium">cam kết tối thiểu</span> — nhưng thực tế, mình tin team sẽ vượt xa hơn nhiều.
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
    { num: '12', label: 'Workshop chiến lược + Group Coaching', icon: Lightbulb },
    { num: '∞', label: 'Review dự án thực tế', icon: Target },
    { num: '✓', label: 'Onsite khi cần', icon: Rocket },
    { num: '✓', label: 'Handover đầy đủ tài liệu & hệ thống', icon: BookOpen },
  ];

  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span style={{ color: C.coral }} className="font-display font-semibold text-sm tracking-[0.2em] uppercase mb-4 block">
            Mình đi cùng bạn
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
            Triển khai +
            <span className="gradient-text-warm"> Chuyển giao</span>
          </h2>
          <p className="text-white/50 text-lg leading-relaxed">
            Không phải ngồi nghe lý thuyết đâu.
            <span style={{ color: C.coral }} className="font-medium"> Mình sẽ cùng team làm thực chiến, rồi bàn giao lại toàn bộ hệ thống.</span>
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.1}>
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

/* ─── INVESTMENT SECTION — SINGLE PACKAGE 300M ─── */
function InvestmentSection() {
  const monthlyBreakdown = [
    {
      month: 'Tháng 4/2025',
      title: 'Audit & Foundation',
      budget: '100.000.000',
      items: [
        'Đánh giá toàn diện Org Chart, JD, quy trình',
        'Phỏng vấn & đánh giá năng lực AI cá nhân',
        'Đào tạo AI Mindset cho toàn bộ team',
        'Thiết kế AI Workflow chuẩn',
      ],
      deliverables: [
        'Báo cáo Audit phòng MKT',
        'AI Readiness Score',
        'Blueprint AI Workflow v1.0',
        'Kế hoạch đào tạo cá nhân hóa',
      ],
      color: C.teal,
    },
    {
      month: 'Tháng 5/2025',
      title: 'Training & Pilot',
      budget: '100.000.000',
      items: [
        'Đào tạo chuyên sâu theo vai trò',
        'Triển khai AI Content Engine',
        'Ứng dụng thực chiến vào case MESCELLS',
        'Nâng cấp công cụ AI cá nhân',
      ],
      deliverables: [
        'Team vận hành AI workflow',
        'AI Content Engine hoạt động',
        'Báo cáo Before/After',
        'Prompt Library v1.0',
      ],
      color: C.gold,
    },
    {
      month: 'Tháng 6/2025',
      title: 'Optimize & Handover',
      budget: '100.000.000',
      items: [
        'Chuẩn hóa SOP vận hành AI',
        'Hoàn thiện Prompt Library',
        'Thiết kế hệ thống đào tạo nội bộ',
        'Bàn giao toàn bộ hệ vận hành',
      ],
      deliverables: [
        'AI Operating System hoàn chỉnh',
        'SOP + Prompt Library + Scoreboard',
        'Framework nhân rộng',
        'Team vận hành độc lập 100%',
      ],
      color: C.green,
    },
  ];

  const packageIncludes = [
    'Lộ trình 90 ngày chuyển đổi toàn diện (T4–T6/2025)',
    '12 buổi Workshop chiến lược + Group Coaching',
    '5 buổi 1-1 chiến lược với Hải VN',
    'Build case study thực chiến MESCELLS',
    'AI Operating System + Prompt Library + SOP',
    'Triển khai + Chuyển giao nội bộ hoàn chỉnh',
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
            Phương án đầu tư
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
            AI Marketing
            <span className="gradient-text-teal"> Transformation™</span>
          </h2>
          <p className="text-white/50 text-lg leading-relaxed">
            Đây là <span className="text-white/80 font-medium">đầu tư vào hệ thống</span>, không phải chi phí đào tạo.
            Mỗi đồng đều được phân bổ rõ ràng vào hạng mục công việc và kết quả bàn giao cụ thể.
          </p>
        </AnimatedSection>

        {/* Main Package Card */}
        <AnimatedSection delay={0.1} className="mb-12">
          <div className="relative rounded-3xl overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: `1px solid ${C.teal}30` }}>
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${C.teal}, transparent)` }} />
            
            <div className="p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-3" style={{ backgroundColor: `${C.teal}15`, color: C.teal }}>
                    <Star className="w-3 h-3" />
                    Gói chuyển đổi toàn diện
                  </span>
                  <h3 className="font-display font-bold text-2xl md:text-3xl" style={{ color: C.teal }}>
                    Full System Transformation
                  </h3>
                  <p className="text-white/50 mt-1">Triển khai tháng 4 – tháng 6/2025</p>
                </div>
                <div className="text-right">
                  <div className="flex items-baseline gap-2 justify-end">
                    <span className="font-display font-bold text-4xl md:text-5xl" style={{ color: C.gold }}>300.000.000</span>
                    <span className="text-white/30 text-sm">VNĐ</span>
                  </div>
                  <p className="text-white/40 text-sm mt-1">100.000.000 VNĐ / tháng × 3 tháng</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {packageIncludes.map((item, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: C.teal }} />
                    <span className="text-white/70 text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 flex flex-col sm:flex-row gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <a
                  href="#contact"
                  className="group/btn flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-display font-bold text-base transition-all duration-300"
                  style={{ backgroundColor: `${C.teal}15`, border: `1px solid ${C.teal}40`, color: C.teal }}
                >
                  <MessageCircle className="w-4 h-4" />
                  Trao đổi phạm vi & ngân sách
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Monthly Cost Breakdown */}
        <AnimatedSection delay={0.2} className="mb-8">
          <h3 className="font-display font-bold text-xl text-center mb-8" style={{ color: C.gold }}>
            Phân bổ chi phí & kết quả theo tháng
          </h3>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.15}>
          {monthlyBreakdown.map((m, i) => (
            <StaggerItem key={i}>
              <div className="relative h-full p-6 rounded-2xl" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: `${m.color}15`, color: m.color }}>
                    {m.month}
                  </span>
                  <span className="font-display font-bold text-sm" style={{ color: C.coral }}>
                    {m.budget} VNĐ
                  </span>
                </div>

                <h4 className="font-display font-bold text-lg mb-4" style={{ color: m.color }}>{m.title}</h4>

                <div className="mb-4">
                  <span className="text-xs font-semibold tracking-[0.12em] uppercase mb-2 block" style={{ color: `${m.color}99` }}>Hạng mục</span>
                  <ul className="space-y-2">
                    {m.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: m.color }} />
                        <span className="text-white/60 text-xs leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <span className="text-xs font-semibold tracking-[0.12em] uppercase mb-2 block" style={{ color: `${C.coral}cc` }}>Kết quả</span>
                  <ul className="space-y-2">
                    {m.deliverables.map((d, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <Target className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: C.coral }} />
                        <span className="text-white/50 text-xs leading-relaxed font-medium">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimatedSection delay={0.4} className="mt-12">
          <div className="text-center">
            <p className="text-white/30 text-sm">
              Không bao gồm: ngân sách ads, tool trả phí, chi phí media sản xuất. Phạm vi có thể điều chỉnh sau khi chốt hợp đồng tư vấn.
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
            Bạn ơi, xem này!
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
            Cuộc chơi đã
            <span className="gradient-text-teal"> thay đổi rồi</span>
          </h2>
          <p className="text-white/50 text-lg md:text-xl leading-relaxed">
            Từ <span className="text-white/80 font-medium">17+ kênh MESCELLS</span>, AI tự động curate, viết lại theo giọng Mes-Mee, tạo hình ảnh AI, và đăng <span style={{ color: C.teal }} className="font-medium">5–10 bài/ngày</span> — hoàn toàn tự động. Tớ làm được rồi, team bạn cũng sẽ làm được!
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

        {/* Video Showcase — Bs Trần Nam Chung */}
        <AnimatedSection delay={0.35} className="mb-16">
          <div className="p-8 rounded-2xl" style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: C.gold }} />
              <span style={{ color: C.gold }} className="font-display font-semibold text-sm tracking-wider uppercase">Video Demo — Curated Content</span>
            </div>
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="w-full max-w-[280px] md:max-w-[320px] flex-shrink-0 mx-auto lg:mx-0">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ border: `1px solid ${C.teal}20`, aspectRatio: '9/16' }}>
                  <video
                    controls
                    preload="metadata"
                    className="w-full h-full object-cover"
                    style={{ backgroundColor: '#000' }}
                  >
                    <source src={VIDEO_URL} type="video/mp4" />
                    Trình duyệt không hỗ trợ video.
                  </video>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-xl md:text-2xl mb-3" style={{ color: C.gold }}>
                  Bs. Trần Nam Chung — Ver Mes-Mee
                </h3>
                <p className="text-white/50 text-base leading-relaxed mb-4">
                  Đây là ví dụ thực tế về cách AI curate nội dung từ bác sĩ chuyên gia, viết lại theo giọng Mes-Mee, và tạo video hoàn chỉnh — tất cả trong vài phút.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: C.teal }} />
                    <span className="text-white/60 text-sm">Nội dung gốc từ chuyên gia y khoa</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: C.teal }} />
                    <span className="text-white/60 text-sm">AI viết lại theo giọng Mes-Mee thân thiện</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: C.teal }} />
                    <span className="text-white/60 text-sm">Video hoàn chỉnh, sẵn sàng đăng</span>
                  </div>
                </div>
              </div>
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
            <span className="gradient-text-teal">AI là người đồng hành.</span>
          </h2>

          <p className="text-white/50 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12">
            Mình tin rằng khi team MESCELLS được trang bị đúng cách, các bạn sẽ tạo ra những điều tuyệt vời.
            <span className="text-white/80 font-medium"> Hãy để mình đồng hành cùng bạn trong hành trình này nhé.</span>
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

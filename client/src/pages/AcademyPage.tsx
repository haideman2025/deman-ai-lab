/**
 * DEMAN AI LAB — Academy Page
 * Trụ cột #1 — Huấn luyện & chuyển giao công nghệ
 * Content source: drive-analysis.md (8 programs đã có thật)
 */
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'wouter';
import {
  ArrowRight, GraduationCap, CheckCircle2, BookOpen,
  Bitcoin, Megaphone, Package, Palette, Wrench, Building2, Users
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const C = {
  gold: '#00B4FF', goldLight: '#00D4FF', goldDark: '#4A90FF',
  purple: '#7B2FBE', coral: '#E85B5B',
  charcoal: '#0a0a14', surface: '#0d0d1e', surfaceLight: '#14142a',
  white: '#E8EDF5', whiteMuted: 'rgba(232, 237, 245, 0.6)', whiteDim: 'rgba(232, 237, 245, 0.35)',
  goldAlpha: (a: number) => `rgba(0, 180, 255, ${a})`,
};

function FadeInSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

export default function AcademyPage() {
  const { t } = useLanguage();

  // 8 programs from drive-analysis.md
  const programs = [
    {
      icon: <Bitcoin className="w-6 h-6" />,
      name: 'AI for Crypto',
      sessions: t('5 buổi chuyên sâu', '5 deep sessions'),
      tags: ['AI Architecture Playbook', 'CABIS Framework', 'AI Content Factory', 'Commanding AI Workforce'],
      status: t('Hoàn thành', 'Completed'),
      desc: t('Ứng dụng AI vào hệ sinh thái Crypto — sản xuất content, đội ngũ AI, quản trị Work-Life Integration.',
              'AI for Crypto ecosystem — content production, AI team, Work-Life Integration management.'),
    },
    {
      icon: <Users className="w-6 h-6" />,
      name: 'AI for Affiliate',
      sessions: t('4 buổi + Workshop', '4 sessions + Workshop'),
      tags: ['Super Affiliate x AI', 'Affiliate Engine™', 'AI-First Mindset'],
      status: t('Hoàn thành', 'Completed'),
      desc: t('Tư Duy AI-First & Affiliate Engine™ — case study Chị Cúc Ngô (15K followers), Nội thất 369.',
              'AI-First mindset & Affiliate Engine™ — case studies Chi Cuc Ngo (15K followers), Noi That 369.'),
    },
    {
      icon: <Package className="w-6 h-6" />,
      name: 'AI for Dropship',
      sessions: t('4 buổi', '4 sessions'),
      tags: ['AI Product Sourcing', 'Auto Description', 'Auto Visual'],
      status: t('Hoàn thành', 'Completed'),
      desc: t('Mô hình dropship kết hợp AI — sourcing tự động, mô tả sản phẩm bằng AI, ảnh AI.',
              'AI-powered dropship model — auto-sourcing, AI product descriptions, AI visuals.'),
    },
    {
      icon: <Megaphone className="w-6 h-6" />,
      name: 'Affiliate Model x AI',
      sessions: t('Full course', 'Full course'),
      tags: ['Personal Brand', 'Sale Channel Restructure', 'Digital Asset Building'],
      status: t('Hoàn thành', 'Completed'),
      desc: t('Tái cấu trúc kênh bán hàng thương hiệu cá nhân — xây tài sản số bền vững.',
              'Restructure personal brand sales channels — build sustainable digital assets.'),
    },
    {
      icon: <Palette className="w-6 h-6" />,
      name: 'ZDES.AI',
      sessions: t('Workshop chuyên sâu', 'Deep workshop'),
      tags: ['Visual Storyteller', 'Designer × AI', 'New Game Visual'],
      status: t('Đang triển khai', 'In progress'),
      desc: t('Design × AI — biến designer thành nghệ sĩ nhờ AI. Visual Storyteller pathway.',
              'Design × AI — turn designers into AI-powered artists. Visual Storyteller pathway.'),
    },
    {
      icon: <Wrench className="w-6 h-6" />,
      name: 'Brand Storytelling Video',
      sessions: t('Workshop', 'Workshop'),
      tags: ['AI Persona', 'Viral Content', 'Custom Dialogue Agent'],
      status: t('Đang triển khai', 'In progress'),
      desc: t('Kể chuyện thương hiệu bằng video — AI Persona đến "Cơn sốt" Viral, tương tác kỹ thuật số.',
              'Brand storytelling via video — from AI Persona to viral "fever", digital interaction.'),
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      name: 'Ecom Brands for Leadership',
      sessions: t('Workshop riêng', 'Private workshop'),
      tags: ['Founder Strategy', 'Brand Initiation'],
      status: t('Đang triển khai', 'In progress'),
      desc: t('Dành riêng cho leaders/founders — khảo sát & tư vấn chiến lược khởi tạo thương hiệu.',
              'For leaders/founders — strategic survey & brand-launch consulting.'),
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      name: 'Mentor Ecom Brands 1-1',
      sessions: t('1-on-1 dài hạn', 'Long-term 1-on-1'),
      tags: ['Personal Mentoring', 'Brand Building', 'Ecom Model'],
      status: t('Đang triển khai', 'In progress'),
      desc: t('Mentoring 1-1 cho founder ecom — khởi tạo và scale mô hình kinh doanh.',
              '1-on-1 mentoring for ecom founders — initiate and scale business models.'),
    },
  ];

  const pricing = [
    {
      tier: 'Tier 1',
      name: t('Free Workshop', 'Free Workshop'),
      price: 'Free',
      desc: t('90 phút trải nghiệm — Clone Your Mind 101 + Q&A trực tiếp với Hải VN', '90-min experience — Clone Your Mind 101 + Live Q&A with Hai VN'),
      cta: t('Đăng ký ngay', 'Register now'),
      featured: false,
    },
    {
      tier: 'Tier 2',
      name: t('Cohort 4 tuần', '4-Week Cohort'),
      price: '4.9M',
      priceUnit: 'VND',
      desc: t('8 module · 1-1 mentor · Lifetime access · Skool community', '8 modules · 1-1 mentor · Lifetime access · Skool community'),
      cta: t('Đăng ký cohort kế tiếp', 'Register next cohort'),
      featured: true,
      early: t('Early-bird 3.5M (giới hạn 10 slot)', 'Early-bird 3.5M (10 slots only)'),
    },
    {
      tier: 'Tier 3',
      name: t('Signature 8 tuần', 'Signature 8-Week'),
      price: '9.9M',
      priceUnit: 'VND',
      desc: t('Cohort 2 ra mắt Q2/2026 · Advanced Vibe Coding + Personal AI Agent', 'Cohort 2 launching Q2/2026 · Advanced Vibe Coding + Personal AI Agent'),
      cta: t('Vào danh sách chờ', 'Join waitlist'),
      featured: false,
    },
    {
      tier: 'Tier 4',
      name: t('B2B In-House', 'B2B In-House'),
      price: t('Custom', 'Custom'),
      priceUnit: '',
      desc: t('Đào tạo team 10-50 người tại doanh nghiệp · Customize theo ngành', 'In-house training 10-50 people · Industry customization'),
      cta: t('Liên hệ', 'Contact'),
      featured: false,
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: C.charcoal, color: C.white, fontFamily: "'DM Sans', sans-serif" }}>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          background: `radial-gradient(circle at 50% 0%, ${C.goldAlpha(0.12)} 0%, transparent 60%)`,
        }} />
        <div className="container mx-auto px-6 lg:px-12 relative">
          <FadeInSection>
            <Link href="/" className="text-xs font-mono tracking-widest uppercase mb-4 inline-block" style={{ color: C.gold }}>
              ← {t('Quay về Home', 'Back to Home')}
            </Link>
            <div className="text-xs font-mono tracking-[0.3em] uppercase mb-4" style={{ color: C.gold }}>
              {t('Trụ 01 · Academy', 'Pillar 01 · Academy')}
            </div>
            <h1 className="font-display font-bold mb-6" style={{ color: C.white, fontSize: 'clamp(36px, 6vw, 72px)', lineHeight: 1.1 }}>
              {t('Học AI bản địa hoá.', 'Learn localized AI.')}<br />
              <span style={{ color: C.gold }}>{t('Không học prompt.', 'Not prompts.')}</span>
            </h1>
            <p className="text-lg max-w-2xl mb-8" style={{ color: C.whiteMuted }}>
              {t(
                '8 chương trình đã chạy thật · 11+ deliverables · Mỗi chương trình có video dài, PDF chuyên sâu, Mind Maps, Podcasts.',
                '8 programs already delivered · 11+ deliverables · Each program includes long videos, deep PDFs, Mind Maps, Podcasts.'
              )}
            </p>
            <Link href="#workshop"
              className="inline-flex items-center gap-2 px-7 py-4 font-display font-semibold text-sm tracking-wider"
              style={{ color: C.charcoal, backgroundColor: C.gold, borderRadius: '2px', boxShadow: `0 8px 24px ${C.goldAlpha(0.3)}` }}
            >
              <BookOpen className="w-4 h-4" />
              {t('Đăng ký Free Workshop 90 phút', 'Join Free 90-min Workshop')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeInSection>
        </div>
      </section>

      {/* 8 Programs Grid */}
      <section className="py-24" style={{ backgroundColor: C.surface }}>
        <div className="container mx-auto px-6 lg:px-12">
          <FadeInSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="text-xs font-mono tracking-[0.3em] uppercase mb-4" style={{ color: C.gold }}>
                {t('8 chương trình đã triển khai', '8 programs delivered')}
              </div>
              <h2 className="font-display font-bold text-4xl md:text-5xl mb-4" style={{ color: C.white }}>
                {t('Đa ngành. Thực chiến.', 'Multi-industry. Battle-tested.')}
              </h2>
              <p style={{ color: C.whiteMuted }}>
                {t(
                  'Từ Crypto, Affiliate, Dropship đến Design, Media, Performance — mỗi chương trình đều bắt nguồn từ vận hành thật của Hải VN và hệ sinh thái DEMAN.',
                  'From Crypto, Affiliate, Dropship to Design, Media, Performance — each program comes from Hai VN and DEMAN ecosystem real operations.'
                )}
              </p>
            </div>
          </FadeInSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {programs.map((p, i) => (
              <FadeInSection key={p.name} delay={i * 0.05}>
                <div
                  className="h-full p-6 transition-all hover:-translate-y-1"
                  style={{
                    backgroundColor: C.charcoal,
                    border: `1.5px solid ${C.goldAlpha(0.15)}`,
                    borderRadius: '4px',
                  }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center" style={{
                      backgroundColor: C.goldAlpha(0.1), color: C.gold, borderRadius: '2px',
                    }}>
                      {p.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-bold text-xl mb-1" style={{ color: C.white }}>{p.name}</h3>
                      <div className="text-xs font-mono uppercase tracking-widest" style={{ color: C.gold }}>
                        {p.sessions}
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-1" style={{
                      color: p.status.includes('Hoàn') || p.status.includes('Completed') ? '#10b981' : '#F5C04A',
                      backgroundColor: (p.status.includes('Hoàn') || p.status.includes('Completed')) ? 'rgba(16,185,129,0.1)' : 'rgba(245,192,74,0.1)',
                      borderRadius: '2px',
                    }}>
                      {p.status}
                    </span>
                  </div>
                  <p className="text-sm mb-4 leading-relaxed" style={{ color: C.whiteMuted }}>{p.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <span key={tag} className="text-[11px] font-mono px-2.5 py-1"
                        style={{ color: C.whiteDim, backgroundColor: C.surfaceLight, borderRadius: '2px' }}>
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

      {/* Pricing Tiers */}
      <section className="py-24" id="workshop" style={{ backgroundColor: C.charcoal }}>
        <div className="container mx-auto px-6 lg:px-12">
          <FadeInSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="text-xs font-mono tracking-[0.3em] uppercase mb-4" style={{ color: C.gold }}>
                {t('Bảng giá rõ ràng', 'Transparent pricing')}
              </div>
              <h2 className="font-display font-bold text-4xl md:text-5xl mb-4" style={{ color: C.white }}>
                {t('4 cấp độ học. Lộ trình rõ.', '4 levels. Clear path.')}
              </h2>
            </div>
          </FadeInSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {pricing.map((tier, i) => (
              <FadeInSection key={tier.name} delay={i * 0.08}>
                <div className={`h-full p-6 relative transition-all hover:-translate-y-2`}
                  style={{
                    backgroundColor: tier.featured ? `${C.gold}10` : C.surface,
                    border: tier.featured ? `2px solid ${C.gold}` : `1.5px solid ${C.goldAlpha(0.15)}`,
                    borderRadius: '4px',
                  }}
                >
                  {tier.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-[10px] font-mono uppercase tracking-widest"
                      style={{ backgroundColor: C.gold, color: C.charcoal, borderRadius: '2px' }}>
                      {t('Phổ biến nhất', 'Most popular')}
                    </div>
                  )}
                  <div className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: tier.featured ? C.gold : C.whiteDim }}>
                    {tier.tier}
                  </div>
                  <h3 className="font-display font-bold text-2xl mb-3" style={{ color: C.white }}>{tier.name}</h3>
                  <div className="mb-4 flex items-baseline gap-1">
                    <span className="font-display font-bold text-4xl" style={{ color: tier.featured ? C.gold : C.white }}>
                      {tier.price}
                    </span>
                    {tier.priceUnit && <span className="text-sm" style={{ color: C.whiteDim }}>{tier.priceUnit}</span>}
                  </div>
                  {tier.early && (
                    <div className="text-xs font-mono mb-3 px-2 py-1 inline-block" style={{
                      color: C.coral, backgroundColor: 'rgba(232,91,91,0.1)', borderRadius: '2px',
                    }}>
                      🔥 {tier.early}
                    </div>
                  )}
                  <p className="text-sm mb-6 leading-relaxed" style={{ color: C.whiteMuted }}>{tier.desc}</p>
                  <button className="w-full py-3 font-display font-semibold text-sm tracking-wider transition-all"
                    style={{
                      color: tier.featured ? C.charcoal : C.gold,
                      backgroundColor: tier.featured ? C.gold : 'transparent',
                      border: `1.5px solid ${C.gold}`,
                      borderRadius: '2px',
                    }}
                  >
                    {tier.cta}
                  </button>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Frameworks */}
      <section className="py-24" style={{ backgroundColor: C.surface }}>
        <div className="container mx-auto px-6 lg:px-12">
          <FadeInSection>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="text-xs font-mono tracking-[0.3em] uppercase mb-4" style={{ color: C.gold }}>
                {t('8 frameworks độc quyền', '8 proprietary frameworks')}
              </div>
              <h2 className="font-display font-bold text-4xl md:text-5xl mb-4" style={{ color: C.white }}>
                {t('IP đã đăng ký bằng 10 năm thực chiến.', 'IP forged through 10 years.')}
              </h2>
            </div>
          </FadeInSection>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl mx-auto">
            {[
              'Clone Your Mind™',
              'AI-First Thinking',
              'Affiliate Engine™',
              'AI Architecture Playbook',
              'Commanding AI Workforce',
              'AI Content Factory',
              'Visual Storyteller',
              'CABIS Framework',
            ].map((fw) => (
              <div key={fw} className="px-4 py-3 text-center transition-all hover:-translate-y-1"
                style={{
                  backgroundColor: C.charcoal,
                  border: `1px solid ${C.goldAlpha(0.15)}`,
                  borderRadius: '2px',
                  color: C.gold,
                  fontFamily: "'Sora', sans-serif",
                  fontSize: '13px',
                  fontWeight: 600,
                }}
              >
                {fw}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ backgroundColor: C.charcoal }}>
        <div className="container mx-auto px-6 lg:px-12 text-center max-w-2xl">
          <FadeInSection>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4" style={{ color: C.white }}>
              {t('Sẵn sàng học AI bản địa?', 'Ready to learn localized AI?')}
            </h2>
            <p className="mb-8" style={{ color: C.whiteMuted }}>
              {t('Bắt đầu với free workshop 90 phút. Không cam kết. Không bán hàng. Chỉ Clone Your Mind 101.',
                  'Start with free 90-min workshop. No commitment. No selling. Just Clone Your Mind 101.')}
            </p>
            <Link href="/" className="inline-flex items-center gap-2 px-7 py-4 font-display font-semibold text-sm tracking-wider"
              style={{ color: C.charcoal, backgroundColor: C.gold, borderRadius: '2px', boxShadow: `0 8px 24px ${C.goldAlpha(0.3)}` }}
            >
              <CheckCircle2 className="w-4 h-4" />
              {t('Đăng ký Free Workshop', 'Join Free Workshop')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}

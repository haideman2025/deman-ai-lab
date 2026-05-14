/**
 * DEMAN AI LAB — About Page
 * Hải VN full story + Team 7 người + DEMAN ecosystem map
 */
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight, Heart, Brain, Sparkles, Users, ExternalLink, Quote } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const IMAGES = {
  avatar: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/haivn-avatar_be7140ce.png',
  about: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/demanlab-about-VTRTuSp7AyYsuCBZWw8CXN.webp',
  brandLogo: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/deman-logo-transparent_731b623d.png',
  gameofecomHero: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384433292/4vJRkvfMLhNshaBfpcZZas/gameofecom-hero_7cb7a008.jpg',
};

const C = {
  gold: '#00B4FF', goldLight: '#00D4FF', purple: '#7B2FBE', coral: '#E85B5B', gold2: '#F5C04A',
  charcoal: '#0a0a14', surface: '#0d0d1e', surfaceLight: '#14142a',
  white: '#E8EDF5', whiteMuted: 'rgba(232, 237, 245, 0.6)', whiteDim: 'rgba(232, 237, 245, 0.35)',
  goldAlpha: (a: number) => `rgba(0, 180, 255, ${a})`,
  coralAlpha: (a: number) => `rgba(232, 91, 91, ${a})`,
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

export default function AboutPage() {
  const { t } = useLanguage();

  const journey = [
    { year: '1990s', title: t('Tiệm tạp hóa của bố mẹ', 'Parents\' grocery store'), desc: t('Tuổi thơ trong khói bếp của bố và tiệm tóc sáng tạo của mẹ.', 'Childhood in dad\'s kitchen smoke and mom\'s creative hair salon.') },
    { year: '2010s', title: t('"Số mày đen lắm"', '"Your fate is black"'), desc: t('Bị thầy bói phán + founder cũ phán "không có số làm chủ". Cú đau đầu đời.', 'Fortune teller + ex-boss said "you\'re not meant to be a boss". First major blow.') },
    { year: '2016', title: t('100 áo Pokemon — lỗ sấp mặt', '100 Pokemon shirts — total loss'), desc: t('50 triệu vốn, mất 50 triệu. Bài học: đừng bán thứ mình thích.', '50M VND, lost 50M. Lesson: don\'t sell what YOU like.') },
    { year: '2019', title: t('Amber Vietnam — 1.5 tỷ tồn kho', 'Amber Vietnam — 1.5B inventory'), desc: t('Cú reset đau nhất. Hiểu "mình là gốc rễ của mọi vấn đề".', 'The deepest reset. Realized "I am the root of every problem".') },
    { year: '7/7/2021', title: t('Oniiz ra đời', 'Oniiz launched'), desc: t('Giữa COVID — 1000 đơn ngày đầu. Cả công ty cùng đóng gói đến sáng.', 'During COVID — 1000 orders day one. Whole team packing till dawn.') },
    { year: '2023', title: t('Oniiz 1 triệu USD', 'Oniiz 1M USD'), desc: t('Doanh thu cán mốc 1 triệu đô. Trống rỗng đến lạ kỳ.', 'Hit 1M USD revenue. Strangely empty inside.') },
    { year: '2024', title: t('Tìm thấy 3 NỌC', 'Found the 3 NỌC'), desc: t('Sau khủng hoảng "để làm gì?", đúc kết 3 niềm tin: Chăm Chỉ · Cho Là Nhận · Tích Cực.', 'After "what for?" crisis, distilled 3 beliefs: Discipline · Give-Receive · Positive.') },
    { year: '2025', title: t('Clone Your Mind framework', 'Clone Your Mind framework'), desc: t('Khái niệm IP đặt nền cho HAIVN.AI — Mindset · System · Case Studies.', 'IP concept laying foundation for HAIVN.AI — Mindset · System · Case Studies.') },
    { year: '2026', title: t('DEMAN AI LAB chính thức', 'DEMAN AI LAB official'), desc: t('Hệ điều hành Human × AI bản địa hoá đầu tiên cho người Việt.', 'First localized Human × AI operating system for Vietnamese.') },
  ];

  const team = [
    { name: 'Hải VN', role: 'AI Architect', desc: t('Kiến trúc sư AI · Vẽ kiến trúc tổng thể · Định hướng chiến lược.', 'AI architect · Drawing master plan · Strategic direction.') },
    { name: 'Thành VN', role: 'AI Systems Builder', desc: t('Người kiến tạo hệ thống · Biến bản vẽ chiến lược thành thực chiến.', 'Systems builder · Turn strategy into reality.') },
    { name: 'Huân VN', role: 'AI Automator', desc: t('Người kết nối mạch điện · Thiết kế workflow tự động hoàn hảo.', 'Circuit connector · Perfect automation workflows.') },
    { name: 'Trọng VN', role: 'AI Operator', desc: t('Trực tiếp điều khiển AI Agent · Đảm bảo cỗ máy vận hành mỗi ngày.', 'Direct AI Agent operator · Ensure smooth daily ops.') },
    { name: 'Team Design', role: 'AI Visual Storytelling', desc: t('Kể chuyện bằng thị giác · Gu thẩm mỹ con người điều khiển AI.', 'Visual storytelling · Human aesthetic guides AI.') },
    { name: 'Thúy VN', role: 'Energy Builder', desc: t('Người kiến tạo năng lượng · Duy trì sự cân bằng tích cực.', 'Energy builder · Maintain positive balance.') },
  ];

  const ecosystem = [
    { name: 'DEMAN AI LAB', icon: '🤖', desc: t('AI phụng sự con người', 'AI serves human') },
    { name: 'Oniiz', icon: '🧴', desc: t('Menscare · Tôn vinh nam tính mới', 'Menscare · Celebrating new masculinity') },
    { name: 'V2Joy', icon: '💜', desc: t('Lifestyle · Fun all the way', 'Lifestyle · Fun all the way') },
    { name: 'Big Manz', icon: '💪', desc: t('Healthcare · For the big things', 'Healthcare · For the big things') },
    { name: 'MystiGarden', icon: '🌿', desc: t('Wellness · Chữa lành & nuôi dưỡng', 'Wellness · Heal & nurture') },
    { name: 'Masqmuse', icon: '🎭', desc: t('Cá tính & sáng tạo', 'Personality & creativity') },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: C.charcoal, color: C.white, fontFamily: "'DM Sans', sans-serif" }}>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          background: `radial-gradient(circle at 30% 0%, ${C.goldAlpha(0.15)} 0%, transparent 60%)`,
        }} />
        <div className="container mx-auto px-6 lg:px-12 relative">
          <Link href="/" className="text-xs font-mono tracking-widest uppercase mb-8 inline-block" style={{ color: C.gold }}>
            ← {t('Quay về Home', 'Back to Home')}
          </Link>

          <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-center">
            <FadeInSection>
              <div className="text-xs font-mono tracking-[0.3em] uppercase mb-4" style={{ color: C.gold }}>
                {t('Về tác giả', 'About founder')}
              </div>
              <h1 className="font-display font-bold mb-6" style={{ color: C.white, fontSize: 'clamp(36px, 6vw, 72px)', lineHeight: 1.1 }}>
                {t('Mình là', 'I\'m')} <span style={{ color: C.gold }}>Hải VN.</span>
              </h1>
              <p className="text-xl mb-6 leading-relaxed" style={{ color: C.whiteMuted }}>
                {t(
                  'Mình không phải tác giả. Cũng không phải guru. Mình là người đã thất bại đủ nhiều để biết kể chuyện thật.',
                  'I\'m not an author. Not a guru. Just someone who has failed enough to tell real stories.'
                )}
              </p>
              <p className="text-sm" style={{ color: C.whiteDim, fontFamily: "'JetBrains Mono', monospace" }}>
                Vũ Ngọc Hải · Founder & CEO DEMAN · AI Architect · {t('Tác giả "Game of Ecom"', 'Author "Game of Ecom"')}
              </p>
            </FadeInSection>

            <FadeInSection delay={0.2}>
              <div className="aspect-square overflow-hidden mx-auto max-w-[400px]"
                style={{ border: `2px solid ${C.gold}`, borderRadius: '4px' }}>
                <img src={IMAGES.avatar} alt="Hai VN" className="w-full h-full object-cover" />
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24" style={{ backgroundColor: C.surface }}>
        <div className="container mx-auto px-6 lg:px-12">
          <FadeInSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="text-xs font-mono tracking-[0.3em] uppercase mb-4" style={{ color: C.gold }}>
                {t('Hành trình 30 năm', '30-year journey')}
              </div>
              <h2 className="font-display font-bold text-4xl md:text-5xl mb-4" style={{ color: C.white }}>
                {t('Mỗi vết sẹo là một chương sách.', 'Every scar is a chapter.')}
              </h2>
            </div>
          </FadeInSection>

          <div className="max-w-4xl mx-auto relative">
            {/* Vertical line */}
            <div className="absolute left-[60px] top-0 bottom-0 w-px" style={{
              background: `linear-gradient(180deg, ${C.gold} 0%, ${C.coral} 50%, ${C.purple} 100%)`,
            }} />

            <div className="space-y-8">
              {journey.map((j, i) => (
                <FadeInSection key={i} delay={i * 0.05}>
                  <div className="grid grid-cols-[120px_1fr] gap-6 relative">
                    <div className="font-mono text-sm font-semibold pt-1" style={{ color: C.gold }}>
                      {j.year}
                    </div>
                    <div className="pb-2" style={{ position: 'relative' }}>
                      {/* dot */}
                      <div style={{
                        position: 'absolute', left: -42, top: 6,
                        width: 12, height: 12, borderRadius: '50%',
                        backgroundColor: C.gold, boxShadow: `0 0 0 4px ${C.charcoal}, 0 0 12px ${C.goldAlpha(0.6)}`,
                      }} />
                      <h3 className="font-display font-bold text-xl mb-2" style={{ color: C.white }}>
                        {j.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: C.whiteMuted }}>{j.desc}</p>
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-20" style={{ backgroundColor: C.charcoal }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <FadeInSection>
            <Quote className="w-16 h-16 mb-8 opacity-30" style={{ color: C.gold }} />
            <blockquote className="font-display font-bold text-3xl md:text-5xl mb-8 leading-tight" style={{ color: C.white }}>
              "{t('Đức năng thắng số. Bạn cứ chăm chỉ, cứ chân thành, cứ tích cực — rồi mọi thứ sẽ ổn. Không phải ngay lập tức, nhưng chắc chắn sẽ ổn.', 'Virtue beats fate. Just be diligent, sincere, positive — everything will be fine. Not immediately, but certainly.')}"
            </blockquote>
            <div className="font-mono text-sm" style={{ color: C.gold }}>
              — Hải VN, Game of Ecom
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Team */}
      <section className="py-24" style={{ backgroundColor: C.surface }}>
        <div className="container mx-auto px-6 lg:px-12">
          <FadeInSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="text-xs font-mono tracking-[0.3em] uppercase mb-4" style={{ color: C.gold }}>
                {t('Đội ngũ lõi', 'Core team')}
              </div>
              <h2 className="font-display font-bold text-4xl md:text-5xl mb-4" style={{ color: C.white }}>
                {t('7 người. 1 cỗ máy.', '7 humans. 1 machine.')}
              </h2>
              <p style={{ color: C.whiteMuted }}>
                {t('Không dùng sức người để cày sự vụ — dùng năng lực thiết kế hệ thống, AI tự làm.',
                  'Not using human power to grind work — designing systems, AI does the work.')}
              </p>
            </div>
          </FadeInSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {team.map((m, i) => (
              <FadeInSection key={m.name} delay={i * 0.05}>
                <div className="p-6 transition-all hover:-translate-y-1"
                  style={{ backgroundColor: C.charcoal, border: `1.5px solid ${C.goldAlpha(0.15)}`, borderRadius: '4px' }}
                >
                  <h3 className="font-display font-bold text-xl mb-1" style={{ color: C.white }}>{m.name}</h3>
                  <div className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: C.gold }}>{m.role}</div>
                  <p className="text-sm leading-relaxed" style={{ color: C.whiteMuted }}>{m.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem map */}
      <section className="py-24" style={{ backgroundColor: C.charcoal }}>
        <div className="container mx-auto px-6 lg:px-12">
          <FadeInSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="text-xs font-mono tracking-[0.3em] uppercase mb-4" style={{ color: C.gold }}>
                {t('Hệ sinh thái', 'Ecosystem')}
              </div>
              <h2 className="font-display font-bold text-4xl md:text-5xl mb-4" style={{ color: C.white }}>
                {t('DeMAN — Delicious Man', 'DeMAN — Delicious Man')}
              </h2>
              <p style={{ color: C.whiteMuted }}>
                {t('"Ngon" từ cốt cách, "thơm" từ tâm hồn. Tôn vinh giá trị con người trong kỷ nguyên số.',
                  '"Delicious" in character, "fragrant" in soul. Celebrating human values in the digital age.')}
              </p>
            </div>
          </FadeInSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {ecosystem.map((e, i) => (
              <FadeInSection key={e.name} delay={i * 0.05}>
                <div className="p-6 text-center transition-all hover:-translate-y-1"
                  style={{ backgroundColor: C.surface, border: `1.5px solid ${C.goldAlpha(0.15)}`, borderRadius: '4px' }}
                >
                  <div className="text-5xl mb-3">{e.icon}</div>
                  <h3 className="font-display font-bold text-xl mb-2" style={{ color: C.white }}>{e.name}</h3>
                  <p className="text-sm" style={{ color: C.whiteMuted }}>{e.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: `linear-gradient(180deg, ${C.surface} 0%, ${C.charcoal} 100%)` }}>
        <div className="container mx-auto px-6 lg:px-12 text-center max-w-2xl">
          <FadeInSection>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4" style={{ color: C.white }}>
              {t('Muốn đọc full hành trình?', 'Want the full journey?')}
            </h2>
            <p className="mb-8" style={{ color: C.whiteMuted }}>
              {t('Tải miễn phí cuốn sách "Game of Ecom" 71 trang — 12 chương kể chi tiết từng vết sẹo.',
                'Free download "Game of Ecom" 71 pages — 12 chapters detailing every scar.')}
            </p>
            <Link href="/game-of-ecom" className="inline-flex items-center gap-2 px-7 py-4 font-display font-semibold text-sm tracking-wider"
              style={{ color: C.charcoal, backgroundColor: C.gold, borderRadius: '2px' }}
            >
              📕 {t('Đọc free Game of Ecom', 'Read free Game of Ecom')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}

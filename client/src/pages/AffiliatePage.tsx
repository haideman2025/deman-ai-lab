/**
 * DEMAN AI LAB — Affiliate System Page
 * Trụ cột #2 — Build IP + Sale System
 * Partner kit cho Oniiz, V2Joy, MystiGarden, BIG MANZ
 */
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight, Link2, TrendingUp, CheckCircle2, Award, DollarSign, BarChart3, FileText } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const C = {
  gold: '#00B4FF', goldLight: '#00D4FF', purple: '#7B2FBE', coral: '#E85B5B', gold2: '#F5C04A',
  charcoal: '#0a0a14', surface: '#0d0d1e', surfaceLight: '#14142a',
  white: '#E8EDF5', whiteMuted: 'rgba(232, 237, 245, 0.6)', whiteDim: 'rgba(232, 237, 245, 0.35)',
  coralAlpha: (a: number) => `rgba(232, 91, 91, ${a})`,
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

export default function AffiliatePage() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const products = [
    { name: 'ONIIZ', cat: t('Menscare', 'Menscare'), commission: '25%', metric: '3M+ products sold', color: C.coral },
    { name: 'V2JOY', cat: t('Lifestyle', 'Lifestyle'), commission: '30%', metric: '80% AI-powered', color: C.gold },
    { name: 'BIG MANZ', cat: t('Healthcare', 'Healthcare'), commission: '25%', metric: 'GMP certified', color: C.purple },
    { name: 'MystiGarden', cat: t('Wellness', 'Wellness'), commission: '20%', metric: t('Đang launch', 'Launching'), color: C.gold2 },
  ];

  const flow = [
    { num: '01', title: t('Học Free Academy', 'Learn Free Academy'), desc: t('Hoàn thành Clone Your Mind 101 workshop 90 phút', 'Complete Clone Your Mind 101 90-min workshop') },
    { num: '02', title: t('Apply Partner Account', 'Apply Partner Account'), desc: t('Điền form ở dưới · Duyệt trong 24h', 'Fill form below · Approved within 24h') },
    { num: '03', title: t('Nhận Kit Content', 'Receive Content Kit'), desc: t('Templates Reels/Post/Email · 50+ asset · Affiliate link tracking', 'Reels/Post/Email templates · 50+ assets · Affiliate link tracking') },
    { num: '04', title: t('Đăng trên kênh bạn', 'Post on your channel'), desc: t('TikTok / FB / IG / Threads / Email list · Bạn quyết định', 'TikTok / FB / IG / Threads / Email list · You decide') },
    { num: '05', title: t('Track Commission', 'Track Commission'), desc: t('Dashboard realtime · Thanh toán 2 lần/tháng · Bonus top performer', 'Realtime dashboard · Bi-weekly payout · Top performer bonus') },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: C.charcoal, color: C.white, fontFamily: "'DM Sans', sans-serif" }}>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          background: `radial-gradient(circle at 50% 0%, ${C.coralAlpha(0.12)} 0%, transparent 60%)`,
        }} />
        <div className="container mx-auto px-6 lg:px-12 relative">
          <FadeInSection>
            <Link href="/" className="text-xs font-mono tracking-widest uppercase mb-4 inline-block" style={{ color: C.coral }}>
              ← {t('Quay về Home', 'Back to Home')}
            </Link>
            <div className="text-xs font-mono tracking-[0.3em] uppercase mb-4" style={{ color: C.coral }}>
              {t('Trụ 02 · Affiliate System', 'Pillar 02 · Affiliate System')}
            </div>
            <h1 className="font-display font-bold mb-6" style={{ color: C.white, fontSize: 'clamp(36px, 6vw, 72px)', lineHeight: 1.1 }}>
              {t('Biến chuyên môn của bạn', 'Turn your expertise')}<br />
              <span style={{ color: C.coral }}>{t('thành dòng affiliate.', 'into affiliate revenue.')}</span>
            </h1>
            <p className="text-lg max-w-2xl mb-8" style={{ color: C.whiteMuted }}>
              {t(
                'Không cần build sản phẩm. Plug vào ecosystem DEMAN — Oniiz, V2Joy, BIG MANZ, MystiGarden. Hoa hồng 20–30%, kit content sẵn, dashboard realtime.',
                'No product needed. Plug into DEMAN ecosystem — Oniiz, V2Joy, BIG MANZ, MystiGarden. 20–30% commission, ready-to-use content kit, realtime dashboard.'
              )}
            </p>
            <a href="#apply"
              className="inline-flex items-center gap-2 px-7 py-4 font-display font-semibold text-sm tracking-wider"
              style={{ color: C.charcoal, backgroundColor: C.coral, borderRadius: '2px', boxShadow: `0 8px 24px ${C.coralAlpha(0.4)}` }}
            >
              <Link2 className="w-4 h-4" />
              {t('Apply trở thành Partner', 'Apply as Partner')}
              <ArrowRight className="w-4 h-4" />
            </a>
          </FadeInSection>
        </div>
      </section>

      {/* Products portfolio */}
      <section className="py-24" style={{ backgroundColor: C.surface }}>
        <div className="container mx-auto px-6 lg:px-12">
          <FadeInSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="text-xs font-mono tracking-[0.3em] uppercase mb-4" style={{ color: C.coral }}>
                {t('Portfolio sản phẩm', 'Product portfolio')}
              </div>
              <h2 className="font-display font-bold text-4xl md:text-5xl mb-4" style={{ color: C.white }}>
                {t('4 thương hiệu · Hệ sinh thái DEMAN', '4 brands · DEMAN ecosystem')}
              </h2>
              <p style={{ color: C.whiteMuted }}>
                {t('Tất cả đều có proof-of-execution thật, không phải dropshipping.',
                    'All have real proof-of-execution, not dropshipping.')}
              </p>
            </div>
          </FadeInSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {products.map((p, i) => (
              <FadeInSection key={p.name} delay={i * 0.08}>
                <div className="p-6 text-center transition-all hover:-translate-y-2"
                  style={{
                    backgroundColor: C.charcoal,
                    border: `1.5px solid ${C.goldAlpha(0.15)}`,
                    borderRadius: '4px',
                    borderTop: `4px solid ${p.color}`,
                  }}
                >
                  <h3 className="font-display font-bold text-2xl mb-1" style={{ color: C.white }}>{p.name}</h3>
                  <div className="text-xs font-mono uppercase mb-4" style={{ color: p.color }}>{p.cat}</div>
                  <div className="text-5xl font-display font-bold mb-2" style={{ color: p.color }}>{p.commission}</div>
                  <div className="text-xs font-mono mb-3" style={{ color: C.whiteDim }}>{t('Hoa hồng', 'Commission')}</div>
                  <div className="text-xs pt-3" style={{ borderTop: `1px solid ${C.goldAlpha(0.1)}`, color: C.gold2 }}>
                    {p.metric}
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>

          <FadeInSection delay={0.4}>
            <div className="mt-12 max-w-3xl mx-auto p-6 text-center"
              style={{
                backgroundColor: `${C.gold2}10`,
                border: `1.5px solid ${C.gold2}40`,
                borderRadius: '4px',
              }}
            >
              <Award className="w-8 h-8 mx-auto mb-3" style={{ color: C.gold2 }} />
              <p className="text-sm" style={{ color: C.white }}>
                <strong>{t('BONUS TIER:', 'BONUS TIER:')}</strong> {t('Top 10 partner theo doanh số mỗi tháng — extra 5% commission · Mention trên kênh chính thức DEMAN.',
                  'Top 10 partners by revenue each month — extra 5% commission · Featured on official DEMAN channels.')}
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Affiliate Engine Flow */}
      <section className="py-24" style={{ backgroundColor: C.charcoal }}>
        <div className="container mx-auto px-6 lg:px-12">
          <FadeInSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="text-xs font-mono tracking-[0.3em] uppercase mb-4" style={{ color: C.coral }}>
                {t('Affiliate Engine™', 'Affiliate Engine™')}
              </div>
              <h2 className="font-display font-bold text-4xl md:text-5xl mb-4" style={{ color: C.white }}>
                {t('5 bước. Từ học đến kiếm tiền.', '5 steps. From learning to earning.')}
              </h2>
            </div>
          </FadeInSection>

          <div className="max-w-4xl mx-auto space-y-4">
            {flow.map((s, i) => (
              <FadeInSection key={s.num} delay={i * 0.08}>
                <div className="grid grid-cols-[80px_1fr] gap-6 p-6 transition-all hover:translate-x-2"
                  style={{
                    backgroundColor: C.surface,
                    border: `1.5px solid ${C.goldAlpha(0.15)}`,
                    borderRadius: '4px',
                    borderLeft: `4px solid ${C.coral}`,
                  }}
                >
                  <div className="font-display font-bold text-4xl" style={{ color: C.coral }}>{s.num}</div>
                  <div>
                    <h3 className="font-display font-bold text-xl mb-2" style={{ color: C.white }}>{s.title}</h3>
                    <p className="text-sm" style={{ color: C.whiteMuted }}>{s.desc}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-24" style={{ backgroundColor: C.surface }}>
        <div className="container mx-auto px-6 lg:px-12">
          <FadeInSection>
            <div className="max-w-4xl mx-auto p-10"
              style={{
                backgroundColor: C.charcoal,
                border: `2px solid ${C.coralAlpha(0.4)}`,
                borderRadius: '4px',
              }}
            >
              <div className="text-xs font-mono tracking-widest uppercase mb-4" style={{ color: C.coral }}>
                {t('Case study thật', 'Real case study')}
              </div>
              <h3 className="font-display font-bold text-3xl mb-4" style={{ color: C.white }}>
                {t('"15K followers FB → 12 triệu commission/tháng"', '"15K FB followers → 12M VND commission/month"')}
              </h3>
              <p className="text-lg mb-6 leading-relaxed" style={{ color: C.whiteMuted }}>
                {t(
                  'Chị Cúc Ngô — học viên Cohort AI for Affiliate. Trong 90 ngày, từ một FB cá nhân 15K follower, chị build hệ thống affiliate với Oniiz. Hiện ổn định 12 triệu/tháng commission, không cần thuê nhân sự.',
                  'Ms. Cuc Ngo — AI for Affiliate Cohort alumni. Within 90 days, from a 15K-follower personal FB, she built an affiliate system with Oniiz. Now stable at 12M VND/month commission, no team needed.'
                )}
              </p>
              <div className="grid grid-cols-3 gap-4 pt-6" style={{ borderTop: `1px solid ${C.coralAlpha(0.2)}` }}>
                <div>
                  <div className="font-display font-bold text-3xl" style={{ color: C.coral }}>90</div>
                  <div className="text-xs font-mono uppercase" style={{ color: C.whiteDim }}>{t('Ngày', 'Days')}</div>
                </div>
                <div>
                  <div className="font-display font-bold text-3xl" style={{ color: C.gold }}>12M</div>
                  <div className="text-xs font-mono uppercase" style={{ color: C.whiteDim }}>{t('Commission/tháng', 'Commission/mo')}</div>
                </div>
                <div>
                  <div className="font-display font-bold text-3xl" style={{ color: C.gold2 }}>0</div>
                  <div className="text-xs font-mono uppercase" style={{ color: C.whiteDim }}>{t('Nhân viên', 'Employees')}</div>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Apply form */}
      <section className="py-24" id="apply" style={{ backgroundColor: C.charcoal }}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto">
            <FadeInSection>
              <div className="text-center mb-10">
                <div className="text-xs font-mono tracking-[0.3em] uppercase mb-4" style={{ color: C.coral }}>
                  {t('Apply form', 'Apply form')}
                </div>
                <h2 className="font-display font-bold text-3xl md:text-4xl mb-4" style={{ color: C.white }}>
                  {t('Bắt đầu kiếm hoa hồng từ tuần sau.', 'Start earning commission next week.')}
                </h2>
                <p style={{ color: C.whiteMuted }}>
                  {t('Duyệt trong 24h · Kit content sẵn · Dashboard realtime.',
                    'Approval in 24h · Ready content kit · Realtime dashboard.')}
                </p>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.1}>
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                className="space-y-4 p-8"
                style={{
                  backgroundColor: C.surface,
                  border: `1.5px solid ${C.coralAlpha(0.3)}`,
                  borderRadius: '4px',
                }}
              >
                {submitted ? (
                  <div className="text-center py-8">
                    <CheckCircle2 className="w-16 h-16 mx-auto mb-4" style={{ color: C.coral }} />
                    <h3 className="font-display text-2xl mb-2" style={{ color: C.white }}>
                      {t('Đã nhận đơn!', 'Application received!')}
                    </h3>
                    <p style={{ color: C.whiteMuted }}>
                      {t('Team sẽ liên hệ bạn trong 24h.', 'Team will contact you within 24h.')}
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input type="text" required placeholder={t('Tên của bạn', 'Your name')}
                        className="px-4 py-3 outline-none w-full"
                        style={{ backgroundColor: C.charcoal, color: C.white, border: `1.5px solid ${C.coralAlpha(0.2)}`, borderRadius: '2px' }} />
                      <input type="email" required placeholder={t('Email', 'Email')}
                        className="px-4 py-3 outline-none w-full"
                        style={{ backgroundColor: C.charcoal, color: C.white, border: `1.5px solid ${C.coralAlpha(0.2)}`, borderRadius: '2px' }} />
                    </div>
                    <input type="text" placeholder={t('Link kênh chính (TikTok/FB/IG)', 'Main channel link (TikTok/FB/IG)')}
                      className="w-full px-4 py-3 outline-none"
                      style={{ backgroundColor: C.charcoal, color: C.white, border: `1.5px solid ${C.coralAlpha(0.2)}`, borderRadius: '2px' }} />
                    <input type="text" placeholder={t('Số follower hiện tại', 'Current follower count')}
                      className="w-full px-4 py-3 outline-none"
                      style={{ backgroundColor: C.charcoal, color: C.white, border: `1.5px solid ${C.coralAlpha(0.2)}`, borderRadius: '2px' }} />
                    <select required className="w-full px-4 py-3 outline-none"
                      style={{ backgroundColor: C.charcoal, color: C.white, border: `1.5px solid ${C.coralAlpha(0.2)}`, borderRadius: '2px' }}>
                      <option value="">— {t('Sản phẩm bạn muốn affiliate', 'Product you want to affiliate')} —</option>
                      <option>ONIIZ (Menscare)</option>
                      <option>V2JOY (Lifestyle)</option>
                      <option>BIG MANZ (Healthcare)</option>
                      <option>MystiGarden (Wellness)</option>
                      <option>{t('Tất cả', 'All')}</option>
                    </select>
                    <button type="submit" className="w-full py-4 font-display font-semibold text-sm tracking-wider transition-all hover:scale-[1.02]"
                      style={{ color: C.charcoal, backgroundColor: C.coral, borderRadius: '2px', boxShadow: `0 8px 24px ${C.coralAlpha(0.3)}` }}
                    >
                      {t('🚀 Apply Affiliate Partner', '🚀 Apply Affiliate Partner')}
                    </button>
                  </>
                )}
              </form>
            </FadeInSection>
          </div>
        </div>
      </section>
    </div>
  );
}

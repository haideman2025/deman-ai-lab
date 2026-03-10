/**
 * AI Transformation Blueprint™ — Multi-Step Survey Form
 * Design: Dark luxury with cyan/purple accents matching DEMAN AI LAB brand
 * 5 steps with progress bar, smooth transitions, and gamified UX
 */
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SurveyAnswers,
  INITIAL_ANSWERS,
  INDUSTRIES,
  ROLES,
  ORG_SIZES,
  DEPARTMENTS,
  EXPERIENCE_LEVELS,
  AI_TOOLS,
  CHALLENGES,
  CAREER_GOALS,
  SKILLS_TO_GROW,
  TIME_INVESTMENTS,
  BUDGET_RANGES,
  INTEREST_REASONS,
} from '@/lib/blueprintEngine';

interface SurveyFormProps {
  onComplete: (answers: SurveyAnswers) => void;
}

const STEP_TITLES = [
  { title: 'Giới thiệu bản thân', subtitle: 'Để chúng tôi biết bạn là ai', icon: '👤' },
  { title: 'Vai trò & Tổ chức', subtitle: 'Bối cảnh công việc hiện tại', icon: '🏢' },
  { title: 'Năng lực AI', subtitle: 'Đánh giá mức độ sẵn sàng AI', icon: '🤖' },
  { title: 'Tầm nhìn & Khát vọng', subtitle: 'Bạn muốn trở thành ai?', icon: '🎯' },
  { title: 'Cam kết & Sẵn sàng', subtitle: 'Bước cuối cùng trước bản vẽ', icon: '🚀' },
];

// Reusable select component
function SelectField({
  label,
  value,
  options,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground/80">{label}</label>
      <div className="grid grid-cols-1 gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`text-left px-4 py-3 rounded-lg border transition-all duration-200 text-sm ${
              value === opt.value
                ? 'border-cyan bg-cyan/10 text-cyan'
                : 'border-border/50 bg-charcoal/30 text-foreground/70 hover:border-cyan/40 hover:bg-charcoal/50'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// Multi-select component
function MultiSelectField({
  label,
  values,
  options,
  onChange,
  maxSelect,
  hint,
}: {
  label: string;
  values: string[];
  options: { value: string; label: string }[];
  onChange: (v: string[]) => void;
  maxSelect?: number;
  hint?: string;
}) {
  const toggle = (val: string) => {
    if (val === 'none') {
      onChange(['none']);
      return;
    }
    const filtered = values.filter(v => v !== 'none');
    if (filtered.includes(val)) {
      onChange(filtered.filter((v) => v !== val));
    } else {
      if (maxSelect && filtered.length >= maxSelect) return;
      onChange([...filtered, val]);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground/80">{label}</label>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      <div className="grid grid-cols-2 gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => toggle(opt.value)}
            className={`text-left px-3 py-2.5 rounded-lg border transition-all duration-200 text-sm ${
              values.includes(opt.value)
                ? 'border-cyan bg-cyan/10 text-cyan'
                : 'border-border/50 bg-charcoal/30 text-foreground/70 hover:border-cyan/40 hover:bg-charcoal/50'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// Slider component
function SliderField({
  label,
  value,
  onChange,
  labels,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  labels: string[];
}) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-foreground/80">{label}</label>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={`flex-1 py-3 rounded-lg border text-center transition-all duration-200 ${
              value === n
                ? 'border-cyan bg-cyan/15 text-cyan font-semibold'
                : value > 0 && n <= value
                ? 'border-cyan/30 bg-cyan/5 text-cyan/60'
                : 'border-border/50 bg-charcoal/30 text-foreground/50 hover:border-cyan/40'
            }`}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="flex justify-between text-xs text-muted-foreground px-1">
        <span>{labels[0]}</span>
        <span>{labels[1]}</span>
      </div>
    </div>
  );
}

// Text input
function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground/80">
        {label} {required && <span className="text-cyan">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg border border-border/50 bg-charcoal/30 text-foreground placeholder:text-muted-foreground/50 focus:border-cyan focus:ring-1 focus:ring-cyan/30 outline-none transition-all"
      />
    </div>
  );
}

// Textarea
function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground/80">{label}</label>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full px-4 py-3 rounded-lg border border-border/50 bg-charcoal/30 text-foreground placeholder:text-muted-foreground/50 focus:border-cyan focus:ring-1 focus:ring-cyan/30 outline-none transition-all resize-none"
      />
    </div>
  );
}

export function SurveyForm({ onComplete }: SurveyFormProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<SurveyAnswers>(INITIAL_ANSWERS);
  const [direction, setDirection] = useState(1);

  const update = useCallback(
    <K extends keyof SurveyAnswers>(key: K, value: SurveyAnswers[K]) => {
      setAnswers((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const canProceed = (): boolean => {
    switch (step) {
      case 0:
        return answers.fullName.trim().length > 0 && answers.email.trim().length > 0 && answers.industry !== '';
      case 1:
        return answers.currentRole !== '' && answers.orgSize !== '' && answers.department.length > 0;
      case 2:
        return answers.aiUsageLevel > 0 && answers.biggestChallenge !== '';
      case 3:
        return answers.careerGoal !== '' && answers.skillsToGrow.length > 0;
      case 4:
        return answers.timeInvestment !== '' && answers.budgetRange !== '';
      default:
        return false;
    }
  };

  const next = () => {
    if (step < 4) {
      setDirection(1);
      setStep(step + 1);
    } else {
      onComplete(answers);
    }
  };

  const prev = () => {
    if (step > 0) {
      setDirection(-1);
      setStep(step - 1);
    }
  };

  const progress = ((step + 1) / 5) * 100;

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          {STEP_TITLES.map((s, i) => (
            <div
              key={i}
              className={`flex items-center gap-1.5 text-xs transition-all ${
                i <= step ? 'text-cyan' : 'text-muted-foreground/40'
              }`}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                i < step
                  ? 'bg-cyan text-charcoal-deep'
                  : i === step
                  ? 'bg-cyan/20 border border-cyan text-cyan'
                  : 'bg-charcoal/50 border border-border/30'
              }`}>
                {i < step ? '✓' : i + 1}
              </span>
              <span className="hidden sm:inline">{s.title}</span>
            </div>
          ))}
        </div>
        <div className="h-1 bg-charcoal/50 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #2DD4BF, #00B4FF, #7B2FBE)' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Step header */}
      <div className="text-center mb-6">
        <span className="text-3xl mb-2 block">{STEP_TITLES[step].icon}</span>
        <h2 className="font-display text-xl font-bold text-foreground">{STEP_TITLES[step].title}</h2>
        <p className="text-sm text-muted-foreground mt-1">{STEP_TITLES[step].subtitle}</p>
      </div>

      {/* Form content */}
      <div className="relative min-h-[400px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="space-y-5"
          >
            {step === 0 && (
              <>
                <TextField label="Họ và tên" value={answers.fullName} onChange={(v) => update('fullName', v)} placeholder="Nguyễn Văn A" required />
                <TextField label="Email" value={answers.email} onChange={(v) => update('email', v)} placeholder="email@example.com" type="email" required />
                <TextField label="Số điện thoại" value={answers.phone} onChange={(v) => update('phone', v)} placeholder="0901234567 (không bắt buộc)" />
                <SelectField label="Ngành nghề / Lĩnh vực" value={answers.industry} options={INDUSTRIES} onChange={(v) => update('industry', v)} />
              </>
            )}

            {step === 1 && (
              <>
                <SelectField label="Vai trò hiện tại" value={answers.currentRole} options={ROLES} onChange={(v) => update('currentRole', v)} />
                <SelectField label="Quy mô tổ chức" value={answers.orgSize} options={ORG_SIZES} onChange={(v) => update('orgSize', v)} />
                <MultiSelectField label="Bộ phận / Chức năng chính" values={answers.department} options={DEPARTMENTS} onChange={(v) => update('department', v)} hint="Chọn tất cả các bộ phận liên quan" />
                <SelectField label="Số năm kinh nghiệm" value={answers.yearsExperience} options={EXPERIENCE_LEVELS} onChange={(v) => update('yearsExperience', v)} />
              </>
            )}

            {step === 2 && (
              <>
                <SliderField label="Mức độ sử dụng AI trong công việc" value={answers.aiUsageLevel} onChange={(v) => update('aiUsageLevel', v)} labels={['Chưa dùng', 'Dùng hàng ngày']} />
                <MultiSelectField label="Công cụ AI đang sử dụng" values={answers.aiTools} options={AI_TOOLS} onChange={(v) => update('aiTools', v)} hint="Chọn tất cả tool bạn đã dùng" />
                <SliderField label="Tự đánh giá năng lực AI" value={answers.aiSelfAssessment} onChange={(v) => update('aiSelfAssessment', v)} labels={['Mới bắt đầu', 'Chuyên gia']} />
                <SelectField label="Thách thức lớn nhất khi dùng AI" value={answers.biggestChallenge} options={CHALLENGES} onChange={(v) => update('biggestChallenge', v)} />
              </>
            )}

            {step === 3 && (
              <>
                <SelectField label="Mục tiêu nghề nghiệp 3–5 năm tới" value={answers.careerGoal} options={CAREER_GOALS} onChange={(v) => update('careerGoal', v)} />
                <MultiSelectField label="Kỹ năng muốn phát triển nhất" values={answers.skillsToGrow} options={SKILLS_TO_GROW} onChange={(v) => update('skillsToGrow', v)} maxSelect={3} hint="Chọn tối đa 3 kỹ năng" />
                <TextAreaField label="Sứ mệnh cá nhân" value={answers.personalMission} onChange={(v) => update('personalMission', v)} placeholder="Bạn muốn tạo ra giá trị gì cho thế giới? (2–3 câu)" hint="Không cần hoàn hảo — hãy viết từ trái tim" />
                <TextAreaField label="Nếu AI giúp bạn tiết kiệm 50% thời gian..." value={answers.aiTimeFreedom} onChange={(v) => update('aiTimeFreedom', v)} placeholder="Bạn sẽ dùng thời gian đó để làm gì?" />
              </>
            )}

            {step === 4 && (
              <>
                <SelectField label="Thời gian sẵn sàng đầu tư cho AI mỗi tuần" value={answers.timeInvestment} options={TIME_INVESTMENTS} onChange={(v) => update('timeInvestment', v)} />
                <SelectField label="Ngân sách phát triển bản thân / tháng" value={answers.budgetRange} options={BUDGET_RANGES} onChange={(v) => update('budgetRange', v)} />
                <MultiSelectField label="Điều gì khiến bạn quan tâm đến DEMAN AI LAB?" values={answers.interestReason} options={INTEREST_REASONS} onChange={(v) => update('interestReason', v)} hint="Chọn tất cả lý do phù hợp" />
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8 pt-6 border-t border-border/30">
        <button
          type="button"
          onClick={prev}
          className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
            step === 0
              ? 'opacity-0 pointer-events-none'
              : 'text-foreground/70 hover:text-foreground border border-border/40 hover:border-border/70'
          }`}
        >
          ← Quay lại
        </button>

        <button
          type="button"
          onClick={next}
          disabled={!canProceed()}
          className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            canProceed()
              ? 'bg-gradient-to-r from-cyan to-electric-blue text-charcoal-deep hover:shadow-lg hover:shadow-cyan/20'
              : 'bg-charcoal/50 text-muted-foreground/50 cursor-not-allowed'
          }`}
        >
          {step === 4 ? 'Tạo bản vẽ AI Blueprint →' : 'Tiếp tục →'}
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// AI TRANSFORMATION BLUEPRINT™ — Core Engine
// Powered by Brand Strategy Engine × AI Architect
// ═══════════════════════════════════════════════════════════════

// ─── TYPES ───────────────────────────────────────────────────

export interface SurveyAnswers {
  // Step 1: Basic Info
  fullName: string;
  email: string;
  phone: string;
  industry: string;

  // Step 2: Role & Organization
  currentRole: string;
  orgSize: string;
  department: string[];
  yearsExperience: string;

  // Step 3: AI Readiness
  aiUsageLevel: number; // 1-5
  aiTools: string[];
  aiSelfAssessment: number; // 1-5
  biggestChallenge: string;

  // Step 4: Vision & Aspirations
  careerGoal: string;
  skillsToGrow: string[];
  personalMission: string;
  aiTimeFreedom: string;

  // Step 5: Commitment
  timeInvestment: string;
  budgetRange: string;
  interestReason: string[];
}

export interface ScoreDimension {
  name: string;
  score: number;
  maxScore: number;
  label: string;
  description: string;
}

export interface BlueprintResult {
  // Scores
  totalScore: number;
  level: CustomerLevel;
  dimensions: ScoreDimension[];

  // Personal Brand DNA
  brandDNA: PersonalBrandDNA;

  // AI Role Mapping
  roleMapping: AIRoleMapping;

  // Strategy
  contentPillars: ContentPillar[];
  channelStrategy: ChannelRecommendation[];
  roadmap: RoadmapPhase[];

  // Service Recommendation
  serviceRecommendation: ServiceRecommendation;
}

export interface CustomerLevel {
  id: number;
  name: string;
  nameVi: string;
  tagline: string;
  description: string;
  color: string;
  icon: string;
}

export interface PersonalBrandDNA {
  archetype: string;
  archetypeDescription: string;
  mission: string;
  coreFeeling: string;
  personality: { trait: string; expression: string; never: string }[];
  promise: string;
  coreValues: { name: string; meaning: string }[];
  positioningStatement: string;
}

export interface AIRoleMapping {
  currentRole: string;
  currentDescription: string;
  futureRole: string;
  futureDescription: string;
  transformationPath: string;
  keySkillsToAcquire: string[];
  aiToolsRecommended: { name: string; purpose: string }[];
}

export interface ContentPillar {
  name: string;
  percentage: number;
  description: string;
  topics: string[];
  formats: string[];
}

export interface ChannelRecommendation {
  channel: string;
  role: string;
  frequency: string;
  priority: 'primary' | 'secondary' | 'optional';
  actions: string[];
}

export interface RoadmapPhase {
  phase: number;
  name: string;
  duration: string;
  focus: string;
  weeklyActions: { week: string; actions: string[] }[];
  milestone: string;
}

export interface ServiceRecommendation {
  tier: string;
  name: string;
  price: string;
  reason: string;
  benefits: string[];
  cta: string;
  ctaUrl: string;
}

// ─── CONSTANTS ───────────────────────────────────────────────

export const INDUSTRIES = [
  { value: 'healthcare', label: 'Y tế / Chăm sóc sức khỏe' },
  { value: 'ecommerce', label: 'Thương mại điện tử' },
  { value: 'education', label: 'Giáo dục / Đào tạo' },
  { value: 'fnb', label: 'F&B / Nhà hàng / Khách sạn' },
  { value: 'tech', label: 'Công nghệ / Phần mềm' },
  { value: 'realestate', label: 'Bất động sản' },
  { value: 'beauty', label: 'Làm đẹp / Wellness' },
  { value: 'finance', label: 'Tài chính / Ngân hàng' },
  { value: 'media', label: 'Truyền thông / Quảng cáo' },
  { value: 'manufacturing', label: 'Sản xuất / Công nghiệp' },
  { value: 'retail', label: 'Bán lẻ' },
  { value: 'consulting', label: 'Tư vấn / Dịch vụ chuyên nghiệp' },
  { value: 'other', label: 'Khác' },
];

export const ROLES = [
  { value: 'ceo', label: 'CEO / Founder / Chủ doanh nghiệp' },
  { value: 'director', label: 'Giám đốc / Phó Giám đốc' },
  { value: 'manager', label: 'Trưởng phòng / Team Lead' },
  { value: 'specialist', label: 'Chuyên viên / Nhân viên' },
  { value: 'freelancer', label: 'Freelancer / Solopreneur' },
  { value: 'student', label: 'Sinh viên / Người chuyển ngành' },
];

export const ORG_SIZES = [
  { value: 'solo', label: '1 người (Solo)' },
  { value: 'micro', label: '2–10 người' },
  { value: 'small', label: '11–50 người' },
  { value: 'medium', label: '51–200 người' },
  { value: 'large', label: '200+ người' },
];

export const DEPARTMENTS = [
  { value: 'marketing', label: 'Marketing' },
  { value: 'content', label: 'Content / Copywriting' },
  { value: 'design', label: 'Design / Creative' },
  { value: 'media', label: 'Media / Video Production' },
  { value: 'sales', label: 'Sales / Business Development' },
  { value: 'operations', label: 'Operations / Vận hành' },
  { value: 'strategy', label: 'Strategy / Planning' },
  { value: 'hr', label: 'HR / Nhân sự' },
  { value: 'it', label: 'IT / Kỹ thuật' },
  { value: 'general', label: 'Quản lý chung / Đa vai trò' },
];

export const EXPERIENCE_LEVELS = [
  { value: 'under1', label: 'Dưới 1 năm' },
  { value: '1to3', label: '1–3 năm' },
  { value: '3to5', label: '3–5 năm' },
  { value: '5to10', label: '5–10 năm' },
  { value: 'over10', label: 'Trên 10 năm' },
];

export const AI_TOOLS = [
  { value: 'chatgpt', label: 'ChatGPT' },
  { value: 'gemini', label: 'Google Gemini' },
  { value: 'claude', label: 'Claude (Anthropic)' },
  { value: 'midjourney', label: 'Midjourney' },
  { value: 'canva_ai', label: 'Canva AI' },
  { value: 'runway', label: 'Runway / Video AI' },
  { value: 'notion_ai', label: 'Notion AI' },
  { value: 'copilot', label: 'Microsoft Copilot' },
  { value: 'cursor', label: 'Cursor / Code AI' },
  { value: 'manus', label: 'Manus AI' },
  { value: 'none', label: 'Chưa dùng tool nào' },
];

export const CHALLENGES = [
  { value: 'where_to_start', label: 'Không biết bắt đầu từ đâu' },
  { value: 'not_effective', label: 'Biết dùng nhưng chưa hiệu quả' },
  { value: 'no_system', label: 'Thiếu hệ thống / quy trình AI' },
  { value: 'convince_team', label: 'Khó thuyết phục team / sếp' },
  { value: 'measure_roi', label: 'Không biết đo lường ROI' },
  { value: 'overwhelmed', label: 'Quá nhiều tool, không biết chọn gì' },
];

export const CAREER_GOALS = [
  { value: 'leadership', label: 'Thăng tiến vị trí quản lý / lãnh đạo' },
  { value: 'personal_brand', label: 'Xây dựng thương hiệu cá nhân mạnh' },
  { value: 'entrepreneur', label: 'Khởi nghiệp / Freelance độc lập' },
  { value: 'career_change', label: 'Chuyển đổi ngành nghề với AI' },
  { value: 'scale_business', label: 'Scale business / mở rộng doanh nghiệp' },
  { value: 'expert_kol', label: 'Trở thành chuyên gia / KOL trong ngành' },
];

export const SKILLS_TO_GROW = [
  { value: 'ai_strategy', label: 'AI Strategy & Architecture' },
  { value: 'content_creation', label: 'Content Creation với AI' },
  { value: 'data_analysis', label: 'Data Analysis & Insight' },
  { value: 'automation', label: 'Automation & Workflow' },
  { value: 'personal_branding', label: 'Personal Branding' },
  { value: 'leadership', label: 'Leadership & Management' },
  { value: 'digital_marketing', label: 'Digital Marketing' },
  { value: 'product_dev', label: 'Product Development' },
];

export const TIME_INVESTMENTS = [
  { value: '1to2', label: '1–2 giờ/tuần' },
  { value: '3to5', label: '3–5 giờ/tuần' },
  { value: '5to10', label: '5–10 giờ/tuần' },
  { value: 'over10', label: 'Trên 10 giờ/tuần' },
];

export const BUDGET_RANGES = [
  { value: 'none', label: 'Chưa có ngân sách' },
  { value: 'under500k', label: 'Dưới 500K/tháng' },
  { value: '500k_2m', label: '500K – 2 triệu/tháng' },
  { value: '2m_5m', label: '2 – 5 triệu/tháng' },
  { value: '5m_10m', label: '5 – 10 triệu/tháng' },
  { value: 'over10m', label: 'Trên 10 triệu/tháng' },
];

export const INTEREST_REASONS = [
  { value: 'learn_ai', label: 'Muốn học AI bài bản' },
  { value: 'consult_biz', label: 'Cần tư vấn cho doanh nghiệp' },
  { value: 'personal_brand', label: 'Muốn xây thương hiệu cá nhân' },
  { value: 'curious', label: 'Tò mò về AI, muốn khám phá' },
  { value: 'referred', label: 'Được giới thiệu / Đã biết Hải VN' },
  { value: 'career_boost', label: 'Muốn tăng tốc sự nghiệp' },
];

// ─── CUSTOMER LEVELS ─────────────────────────────────────────

const CUSTOMER_LEVELS: CustomerLevel[] = [
  {
    id: 1,
    name: 'AI Explorer',
    nameVi: 'Người Khám Phá',
    tagline: 'Bước đầu tiên luôn là bước quan trọng nhất',
    description: 'Bạn đang ở giai đoạn khám phá — tò mò về AI nhưng chưa biết bắt đầu từ đâu. Đây là lúc xây nền tảng tư duy đúng đắn.',
    color: '#2DD4BF',
    icon: '🌱',
  },
  {
    id: 2,
    name: 'AI Practitioner',
    nameVi: 'Người Thực Hành',
    tagline: 'Từ biết dùng đến dùng đúng — khoảng cách là hệ thống',
    description: 'Bạn đã dùng AI nhưng chưa có hệ thống. Cần một bản vẽ rõ ràng để chuyển từ "dùng thử" sang "vận hành".',
    color: '#00B4FF',
    icon: '⚡',
  },
  {
    id: 3,
    name: 'AI Architect',
    nameVi: 'Kiến Trúc Sư AI',
    tagline: 'Thiết kế hệ thống — không chỉ sử dụng công cụ',
    description: 'Bạn có nền tảng vững. Đã đến lúc thiết kế hệ thống AI cho riêng mình — biến kinh nghiệm thành framework có thể nhân rộng.',
    color: '#7B2FBE',
    icon: '🏗️',
  },
  {
    id: 4,
    name: 'AI Visionary',
    nameVi: 'Người Dẫn Đường',
    tagline: 'Dẫn dắt đội ngũ và ngành nghề vào kỷ nguyên AI',
    description: 'Bạn là người tiên phong. Năng lực AI của bạn đã vượt qua mức cá nhân — bạn sẵn sàng dẫn dắt tổ chức và truyền cảm hứng cho cộng đồng.',
    color: '#FFB800',
    icon: '🚀',
  },
];

// ─── SCORING ENGINE ──────────────────────────────────────────

function scoreAIUsage(level: number): number {
  return Math.min(level * 5, 25);
}

function scoreToolDiversity(tools: string[]): number {
  if (tools.includes('none')) return 0;
  return Math.min(tools.length * 2.5, 20);
}

function scoreSelfAssessment(level: number): number {
  return Math.min(level * 3, 15);
}

function scoreExperience(exp: string): number {
  const map: Record<string, number> = {
    under1: 3,
    '1to3': 6,
    '3to5': 9,
    '5to10': 12,
    over10: 15,
  };
  return map[exp] || 5;
}

function scoreVisionClarity(goal: string, mission: string): number {
  let score = 0;
  // Career goal clarity
  if (goal) score += 7;
  // Mission statement quality (length and depth)
  if (mission.length > 20) score += 4;
  if (mission.length > 50) score += 4;
  return Math.min(score, 15);
}

function scoreInvestmentReady(time: string, budget: string): number {
  const timeMap: Record<string, number> = {
    '1to2': 1,
    '3to5': 3,
    '5to10': 4,
    over10: 5,
  };
  const budgetMap: Record<string, number> = {
    none: 0,
    under500k: 1,
    '500k_2m': 2,
    '2m_5m': 3,
    '5m_10m': 4,
    over10m: 5,
  };
  return Math.min((timeMap[time] || 1) + (budgetMap[budget] || 0), 10);
}

export function calculateScore(answers: SurveyAnswers): {
  total: number;
  dimensions: ScoreDimension[];
  level: CustomerLevel;
} {
  const d1 = scoreAIUsage(answers.aiUsageLevel);
  const d2 = scoreToolDiversity(answers.aiTools);
  const d3 = scoreSelfAssessment(answers.aiSelfAssessment);
  const d4 = scoreExperience(answers.yearsExperience);
  const d5 = scoreVisionClarity(answers.careerGoal, answers.personalMission);
  const d6 = scoreInvestmentReady(answers.timeInvestment, answers.budgetRange);

  const total = d1 + d2 + d3 + d4 + d5 + d6;

  const dimensions: ScoreDimension[] = [
    {
      name: 'aiUsage',
      score: d1,
      maxScore: 25,
      label: 'Mức độ sử dụng AI',
      description: 'Tần suất và chiều sâu sử dụng AI trong công việc hàng ngày',
    },
    {
      name: 'toolDiversity',
      score: d2,
      maxScore: 20,
      label: 'Đa dạng công cụ',
      description: 'Số lượng và loại công cụ AI đã trải nghiệm',
    },
    {
      name: 'selfAssessment',
      score: d3,
      maxScore: 15,
      label: 'Tự đánh giá năng lực',
      description: 'Mức độ tự tin về khả năng ứng dụng AI',
    },
    {
      name: 'experience',
      score: d4,
      maxScore: 15,
      label: 'Kinh nghiệm chuyên môn',
      description: 'Nền tảng kinh nghiệm trong lĩnh vực chuyên môn',
    },
    {
      name: 'visionClarity',
      score: d5,
      maxScore: 15,
      label: 'Tầm nhìn & Sứ mệnh',
      description: 'Độ rõ ràng của mục tiêu nghề nghiệp và sứ mệnh cá nhân',
    },
    {
      name: 'investmentReady',
      score: d6,
      maxScore: 10,
      label: 'Sẵn sàng đầu tư',
      description: 'Mức độ cam kết về thời gian và ngân sách',
    },
  ];

  let level: CustomerLevel;
  if (total <= 25) level = CUSTOMER_LEVELS[0];
  else if (total <= 50) level = CUSTOMER_LEVELS[1];
  else if (total <= 75) level = CUSTOMER_LEVELS[2];
  else level = CUSTOMER_LEVELS[3];

  return { total, dimensions, level };
}

// ─── STRATEGY GENERATOR ──────────────────────────────────────

// Role mapping: current → AI-enhanced future
const ROLE_TRANSFORMATIONS: Record<string, { future: string; futureDesc: string; path: string }> = {
  ceo: {
    future: 'AI-First CEO / Digital Transformation Leader',
    futureDesc: 'Lãnh đạo doanh nghiệp với tư duy AI-First — ra quyết định dựa trên data, tự động hóa vận hành, và xây dựng văn hóa đổi mới sáng tạo.',
    path: 'Từ quản lý truyền thống → Kiến trúc sư chuyển đổi số → AI-First CEO dẫn dắt ngành',
  },
  director: {
    future: 'AI Strategy Director / Chief AI Officer',
    futureDesc: 'Giám đốc chiến lược AI — thiết kế roadmap chuyển đổi cho toàn tổ chức, kết nối công nghệ với mục tiêu kinh doanh.',
    path: 'Từ quản lý bộ phận → Chiến lược gia AI → Chief AI Officer',
  },
  manager: {
    future: 'AI-Powered Team Leader / Automation Architect',
    futureDesc: 'Trưởng nhóm vận hành bằng AI — tối ưu quy trình team, xây dựng SOP tự động, nhân hiệu suất gấp 3-5 lần.',
    path: 'Từ team lead thủ công → AI workflow designer → Automation Architect',
  },
  specialist: {
    future: 'AI-Enhanced Specialist / 10x Individual Contributor',
    futureDesc: 'Chuyên viên được tăng cường bởi AI — năng suất gấp 10 lần, chất lượng output vượt trội, trở thành "one-person army".',
    path: 'Từ chuyên viên đơn lẻ → AI-powered specialist → 10x contributor & thought leader',
  },
  freelancer: {
    future: 'AI Solopreneur / One-Person Agency',
    futureDesc: 'Solopreneur vận hành bằng AI — một mình nhưng có năng lực của cả team 10 người. Tự động hóa mọi thứ, tập trung vào sáng tạo và chiến lược.',
    path: 'Từ freelancer đơn lẻ → AI-powered solopreneur → One-person agency',
  },
  student: {
    future: 'AI-Native Professional / Future-Ready Talent',
    futureDesc: 'Nhân tài thế hệ mới — sinh ra trong kỷ nguyên AI, thành thạo AI từ ngày đầu, có lợi thế cạnh tranh vượt trội so với thế hệ trước.',
    path: 'Từ người học → AI-native professional → Future industry leader',
  },
};

// Archetype mapping based on role + goal
function determineArchetype(role: string, goal: string): { name: string; description: string } {
  if (goal === 'expert_kol' || goal === 'personal_brand') {
    return {
      name: 'Sage × Creator',
      description: 'Bạn là sự kết hợp giữa Nhà Hiền Triết (chia sẻ tri thức) và Người Sáng Tạo (tạo ra cái mới). Thương hiệu của bạn xây trên nền tảng chuyên môn sâu + khả năng truyền đạt xuất sắc.',
    };
  }
  if (role === 'ceo' || role === 'director' || goal === 'leadership') {
    return {
      name: 'Ruler × Sage',
      description: 'Bạn là sự kết hợp giữa Nhà Lãnh Đạo (tầm nhìn, quyết đoán) và Nhà Hiền Triết (tri thức, chiến lược). Thương hiệu của bạn toát lên sự uy tín và trí tuệ.',
    };
  }
  if (goal === 'entrepreneur' || goal === 'scale_business') {
    return {
      name: 'Creator × Explorer',
      description: 'Bạn là sự kết hợp giữa Người Sáng Tạo (xây dựng từ con số 0) và Nhà Thám Hiểm (khám phá cơ hội mới). Thương hiệu của bạn đại diện cho tinh thần đổi mới và dám nghĩ dám làm.',
    };
  }
  if (goal === 'career_change') {
    return {
      name: 'Explorer × Hero',
      description: 'Bạn là sự kết hợp giữa Nhà Thám Hiểm (dũng cảm thay đổi) và Người Hùng (vượt qua thử thách). Câu chuyện chuyển đổi của bạn chính là thương hiệu mạnh nhất.',
    };
  }
  return {
    name: 'Sage × Creator',
    description: 'Bạn là sự kết hợp giữa Nhà Hiền Triết và Người Sáng Tạo — chia sẻ tri thức thông qua những sản phẩm sáng tạo có giá trị.',
  };
}

// Content pillars based on role and goals
function generateContentPillars(role: string, goal: string, departments: string[], industry: string): ContentPillar[] {
  const pillars: ContentPillar[] = [];

  // Pillar 1: Expertise (always 50%)
  const expertiseTopics: string[] = [];
  const industryLabel = INDUSTRIES.find(i => i.value === industry)?.label || industry;

  if (departments.includes('marketing') || departments.includes('content')) {
    expertiseTopics.push('AI trong Content Marketing', 'Prompt Engineering cho Marketer', 'Automation workflow thực chiến');
  }
  if (departments.includes('design') || departments.includes('media')) {
    expertiseTopics.push('AI Visual Creation', 'Video Production với AI', 'Design Thinking × AI');
  }
  if (departments.includes('sales') || departments.includes('operations')) {
    expertiseTopics.push('AI trong Sales Automation', 'CRM × AI', 'Tối ưu vận hành bằng AI');
  }
  if (departments.includes('strategy') || departments.includes('general')) {
    expertiseTopics.push('AI Strategy Framework', 'Digital Transformation Roadmap', 'AI cho ra quyết định');
  }
  if (expertiseTopics.length === 0) {
    expertiseTopics.push(`AI ứng dụng trong ${industryLabel}`, 'Prompt Engineering cơ bản', 'Workflow tự động hóa');
  }

  pillars.push({
    name: 'Chuyên gia AI × Ngành',
    percentage: 50,
    description: `Nội dung chuyên sâu về ứng dụng AI trong ${industryLabel} — thể hiện chuyên môn và tạo uy tín`,
    topics: expertiseTopics.slice(0, 4),
    formats: ['Bài viết chuyên sâu', 'Video hướng dẫn', 'Case study', 'Thread/Carousel'],
  });

  // Pillar 2: Proof & Story (30%)
  pillars.push({
    name: 'Bằng chứng & Câu chuyện',
    percentage: 30,
    description: 'Chia sẻ hành trình thực tế, kết quả đạt được, bài học rút ra — tạo niềm tin và kết nối cảm xúc',
    topics: [
      'Hành trình chuyển đổi AI cá nhân',
      'Before/After khi dùng AI',
      'Bài học thất bại & thành công',
      'Behind the scenes quy trình làm việc',
    ],
    formats: ['Story cá nhân', 'Video vlog', 'Infographic Before/After', 'Testimonial'],
  });

  // Pillar 3: Inspiration (20%)
  const inspirationTopics = goal === 'personal_brand' || goal === 'expert_kol'
    ? ['Tư duy phát triển bản thân', 'Triết lý sống × AI', 'Xu hướng tương lai', 'Mindset người dẫn đầu']
    : ['Tầm nhìn ngành trong 5 năm tới', 'Câu chuyện truyền cảm hứng', 'AI × Giá trị con người', 'Tương lai nghề nghiệp'];

  pillars.push({
    name: 'Cảm hứng & Tầm nhìn',
    percentage: 20,
    description: 'Nội dung truyền cảm hứng, chia sẻ tầm nhìn về tương lai AI × con người — thu hút cộng đồng',
    topics: inspirationTopics,
    formats: ['Quote card', 'Short video', 'Podcast clip', 'Opinion piece'],
  });

  return pillars;
}

// Channel strategy based on goals and readiness
function generateChannelStrategy(goal: string, level: CustomerLevel, departments: string[]): ChannelRecommendation[] {
  const channels: ChannelRecommendation[] = [];

  // TikTok — always viral house
  channels.push({
    channel: 'TikTok',
    role: 'Viral House — Lan tỏa nhận diện, thu hút người theo dõi mới',
    frequency: '3–5 video/tuần',
    priority: goal === 'personal_brand' || goal === 'expert_kol' ? 'primary' : 'secondary',
    actions: [
      'Video ngắn 30–90s chia sẻ tip AI thực chiến',
      'Trend-jacking: gắn AI insight vào xu hướng hot',
      'Before/After demo dùng AI tool',
      'Storytelling hành trình cá nhân',
    ],
  });

  // Facebook — credibility house
  channels.push({
    channel: 'Facebook',
    role: 'Credibility House — Xây dựng uy tín, tạo cộng đồng',
    frequency: '4–5 bài/tuần',
    priority: 'primary',
    actions: [
      'Bài viết chuyên sâu về AI × ngành',
      'Case study và kết quả thực tế',
      'Tương tác trong group chuyên ngành',
      'Live session chia sẻ kinh nghiệm',
    ],
  });

  // LinkedIn — professional authority
  if (goal === 'leadership' || goal === 'expert_kol' || goal === 'personal_brand') {
    channels.push({
      channel: 'LinkedIn',
      role: 'Authority House — Xây dựng uy tín chuyên nghiệp, networking B2B',
      frequency: '2–3 bài/tuần',
      priority: 'primary',
      actions: [
        'Thought leadership articles',
        'Industry insight và phân tích xu hướng',
        'Networking với decision makers',
        'Chia sẻ framework và methodology',
      ],
    });
  }

  // Website/Blog
  channels.push({
    channel: 'Website / Blog cá nhân',
    role: 'Conversion Center — Hub trung tâm, SEO dài hạn',
    frequency: '1–2 bài/tuần',
    priority: level.id >= 3 ? 'primary' : 'optional',
    actions: [
      'Blog post chuyên sâu (SEO-optimized)',
      'Portfolio / Case study showcase',
      'Lead magnet (ebook, template, checklist)',
      'Landing page cho dịch vụ/sản phẩm',
    ],
  });

  // Community
  channels.push({
    channel: 'Community (Group/Discord)',
    role: 'Nurturing — Nuôi dưỡng quan hệ sâu, tạo giá trị',
    frequency: 'Tương tác hàng ngày',
    priority: 'secondary',
    actions: [
      'Tham gia và đóng góp trong community AI',
      'Tổ chức mini workshop / AMA session',
      'Chia sẻ tài nguyên và template miễn phí',
      'Kết nối với người cùng chí hướng',
    ],
  });

  return channels;
}

// 90-day roadmap based on level
function generateRoadmap(level: CustomerLevel, goal: string, skills: string[]): RoadmapPhase[] {
  if (level.id <= 1) {
    return [
      {
        phase: 1,
        name: 'Nền tảng AI Mindset',
        duration: 'Tuần 1–4',
        focus: 'Xây dựng tư duy đúng về AI, làm quen với công cụ cơ bản',
        weeklyActions: [
          { week: 'Tuần 1–2', actions: ['Hoàn thành khóa AI Mindset cơ bản', 'Thiết lập ChatGPT/Gemini workspace', 'Viết 5 prompt đầu tiên cho công việc hàng ngày', 'Xác định 3 task lặp lại có thể AI hóa'] },
          { week: 'Tuần 3–4', actions: ['Thử nghiệm 2–3 AI tool cho vai trò cụ thể', 'Tạo prompt template cho task thường xuyên', 'Chia sẻ 1 bài viết đầu tiên về hành trình AI', 'Tham gia 1 community AI'] },
        ],
        milestone: 'Có bộ prompt cá nhân + đăng bài đầu tiên về AI',
      },
      {
        phase: 2,
        name: 'Thực hành & Xây nền THCN',
        duration: 'Tuần 5–8',
        focus: 'Ứng dụng AI vào công việc thực tế, bắt đầu xây thương hiệu cá nhân',
        weeklyActions: [
          { week: 'Tuần 5–6', actions: ['Áp dụng AI workflow vào 1 dự án thực tế', 'Tạo content plan cho THCN (3 pillar)', 'Đăng 2–3 bài/tuần chia sẻ hành trình', 'Kết nối với 10 người trong ngành'] },
          { week: 'Tuần 7–8', actions: ['Hoàn thành 1 case study Before/After', 'Tối ưu profile trên các nền tảng', 'Tạo 1 lead magnet đơn giản (checklist/template)', 'Review và điều chỉnh content strategy'] },
        ],
        milestone: 'Case study đầu tiên + 100 followers mới + workflow AI ổn định',
      },
      {
        phase: 3,
        name: 'Tăng tốc & Hệ thống hóa',
        duration: 'Tuần 9–12',
        focus: 'Scale nội dung, xây dựng hệ thống tự động, mở rộng network',
        weeklyActions: [
          { week: 'Tuần 9–10', actions: ['Xây dựng content automation pipeline', 'Tạo series nội dung chuyên sâu', 'Tham gia speaking/sharing tại 1 event', 'Đánh giá lại AI Readiness Score'] },
          { week: 'Tuần 11–12', actions: ['Hoàn thiện personal brand kit', 'Lên kế hoạch 90 ngày tiếp theo', 'Tạo 1 sản phẩm số đầu tiên (mini ebook/course)', 'Tổng kết và chia sẻ kết quả 90 ngày'] },
        ],
        milestone: 'Personal brand kit hoàn chỉnh + 1 sản phẩm số + 500 followers',
      },
    ];
  }

  if (level.id === 2) {
    return [
      {
        phase: 1,
        name: 'Hệ thống hóa AI Workflow',
        duration: 'Tuần 1–4',
        focus: 'Chuyển từ "dùng thử" sang "vận hành có hệ thống"',
        weeklyActions: [
          { week: 'Tuần 1–2', actions: ['Audit toàn bộ workflow hiện tại', 'Xác định 5 quy trình cần AI hóa', 'Xây dựng SOP + Prompt Library v1.0', 'Thiết lập hệ thống đo lường hiệu suất'] },
          { week: 'Tuần 3–4', actions: ['Triển khai AI workflow cho 3 quy trình chính', 'Tạo content strategy 3 pillar cho THCN', 'Đăng 3–4 bài/tuần với chất lượng cao', 'Xây dựng email list / community nhỏ'] },
        ],
        milestone: 'SOP + Prompt Library + Content strategy hoàn chỉnh',
      },
      {
        phase: 2,
        name: 'Scale Content & Authority',
        duration: 'Tuần 5–8',
        focus: 'Nhân rộng nội dung, xây dựng vị thế chuyên gia',
        weeklyActions: [
          { week: 'Tuần 5–6', actions: ['Launch series nội dung flagship', 'Tạo 3 case study chuyên sâu', 'Collab với 2–3 người trong ngành', 'Tổ chức 1 mini workshop online'] },
          { week: 'Tuần 7–8', actions: ['Tối ưu content funnel (Awareness → Conversion)', 'Xây dựng lead magnet chất lượng cao', 'Bắt đầu monetize (dịch vụ tư vấn/coaching)', 'Mở rộng sang 1 platform mới'] },
        ],
        milestone: '3 case study + 1 workshop + bắt đầu có revenue từ THCN',
      },
      {
        phase: 3,
        name: 'Monetize & Ecosystem',
        duration: 'Tuần 9–12',
        focus: 'Chuyển đổi audience thành khách hàng, xây hệ sinh thái',
        weeklyActions: [
          { week: 'Tuần 9–10', actions: ['Launch sản phẩm số (course/ebook/template pack)', 'Xây dựng sales funnel tự động', 'Tạo referral program', 'Đánh giá ROI và tối ưu'] },
          { week: 'Tuần 11–12', actions: ['Hoàn thiện hệ sinh thái THCN', 'Lên kế hoạch scale 6 tháng tiếp theo', 'Tổng kết 90 ngày + chia sẻ công khai', 'Xác định next level: Architect path'] },
        ],
        milestone: 'Sản phẩm số đầu tiên + revenue ổn định + 2000 followers',
      },
    ];
  }

  if (level.id === 3) {
    return [
      {
        phase: 1,
        name: 'Framework Design',
        duration: 'Tuần 1–4',
        focus: 'Đóng gói kinh nghiệm thành framework có thể nhân rộng',
        weeklyActions: [
          { week: 'Tuần 1–2', actions: ['Đúc kết methodology/framework độc quyền', 'Thiết kế AI Architecture cho tổ chức/team', 'Viết whitepaper hoặc playbook', 'Xây dựng thought leadership content plan'] },
          { week: 'Tuần 3–4', actions: ['Launch framework qua series nội dung', 'Tạo workshop curriculum', 'Bắt đầu mentoring 1-on-1', 'Xây dựng advisory board / mastermind group'] },
        ],
        milestone: 'Framework độc quyền + Playbook + Workshop curriculum',
      },
      {
        phase: 2,
        name: 'Authority & Scale',
        duration: 'Tuần 5–8',
        focus: 'Xây dựng vị thế thought leader, scale impact',
        weeklyActions: [
          { week: 'Tuần 5–6', actions: ['Tổ chức workshop/masterclass trả phí', 'Guest speaking tại 2–3 events', 'Launch podcast hoặc video series', 'Collab với industry leaders'] },
          { week: 'Tuần 7–8', actions: ['Xây dựng certification program', 'Tạo community trả phí', 'Media appearances (podcast guest, interview)', 'Scale consulting practice'] },
        ],
        milestone: 'Workshop trả phí + Community + Media presence',
      },
      {
        phase: 3,
        name: 'Ecosystem & Legacy',
        duration: 'Tuần 9–12',
        focus: 'Xây dựng hệ sinh thái bền vững, tạo legacy',
        weeklyActions: [
          { week: 'Tuần 9–10', actions: ['Launch online academy / membership', 'Xây dựng team / đào tạo người kế thừa', 'Partnership với tổ chức lớn', 'Viết sách hoặc comprehensive guide'] },
          { week: 'Tuần 11–12', actions: ['Hoàn thiện hệ sinh thái multi-product', 'Lên kế hoạch 12 tháng tiếp theo', 'Tổng kết và publish case study 90 ngày', 'Xác định next level: Visionary path'] },
        ],
        milestone: 'Academy + Multi-product ecosystem + Industry recognition',
      },
    ];
  }

  // Level 4: Visionary
  return [
    {
      phase: 1,
      name: 'Vision & Movement',
      duration: 'Tuần 1–4',
      focus: 'Định hình tầm nhìn ngành, khởi động phong trào',
      weeklyActions: [
        { week: 'Tuần 1–2', actions: ['Viết manifesto / vision paper cho ngành', 'Thiết kế AI transformation framework cho industry', 'Keynote tại 1 event lớn', 'Launch initiative / movement'] },
        { week: 'Tuần 3–4', actions: ['Xây dựng advisory practice cao cấp', 'Mentoring cho next-gen leaders', 'Media strategy: podcast, interview, panel', 'Partnership với enterprise clients'] },
      ],
      milestone: 'Vision paper + Keynote + Advisory practice',
    },
    {
      phase: 2,
      name: 'Impact & Influence',
      duration: 'Tuần 5–8',
      focus: 'Mở rộng tầm ảnh hưởng, tạo impact ở quy mô lớn',
      weeklyActions: [
        { week: 'Tuần 5–6', actions: ['Tổ chức summit / conference', 'Launch certification program cho ngành', 'Viết cho media lớn (Forbes, VnExpress...)', 'Xây dựng ecosystem of partners'] },
        { week: 'Tuần 7–8', actions: ['Advisory cho 3–5 tổ chức', 'Đào tạo trainers (train-the-trainer)', 'International networking & speaking', 'Scale revenue streams'] },
      ],
      milestone: 'Summit + Certification + International presence',
    },
    {
      phase: 3,
      name: 'Legacy & Succession',
      duration: 'Tuần 9–12',
      focus: 'Xây dựng di sản, đào tạo thế hệ kế thừa',
      weeklyActions: [
        { week: 'Tuần 9–10', actions: ['Xuất bản sách / comprehensive body of work', 'Xây dựng foundation / scholarship', 'Mentoring program cho emerging leaders', 'Tổng kết và document methodology'] },
        { week: 'Tuần 11–12', actions: ['Hoàn thiện succession plan', 'Lên kế hoạch next chapter', 'Publish 90-day transformation story', 'Celebrate & inspire community'] },
      ],
      milestone: 'Published work + Foundation + Next-gen leaders trained',
    },
  ];
}

// Service recommendation based on level and budget
function recommendService(level: CustomerLevel, budget: string, goal: string): ServiceRecommendation {
  if (level.id <= 1 || budget === 'none' || budget === 'under500k') {
    return {
      tier: 'starter',
      name: 'AI Mindset Workshop',
      price: 'Miễn phí — 990K',
      reason: 'Bạn cần xây nền tảng tư duy AI đúng đắn trước khi đầu tư sâu. Workshop là bước khởi đầu hoàn hảo.',
      benefits: [
        'Hiểu bản chất AI và cách ứng dụng đúng',
        'Bộ prompt template cho vai trò của bạn',
        'Kết nối với cộng đồng AI practitioners',
        'Lộ trình học tập cá nhân hóa',
      ],
      cta: 'Đăng ký Workshop miễn phí',
      ctaUrl: 'https://demanlab.ai',
    };
  }

  if (level.id === 2 || budget === '500k_2m' || budget === '2m_5m') {
    return {
      tier: 'growth',
      name: 'Group AI Coaching',
      price: '2.990.000 — 5.990.000 VNĐ',
      reason: 'Bạn đã có nền tảng, cần một mentor và cộng đồng để đẩy nhanh quá trình. Group coaching cho bạn cả hai.',
      benefits: [
        '8 buổi coaching nhóm với Hải VN',
        'AI Workflow Blueprint cá nhân hóa',
        'Prompt Library chuyên sâu theo ngành',
        'Community exclusive + networking',
        'Review 1-on-1 giữa khóa',
      ],
      cta: 'Tham gia Group Coaching',
      ctaUrl: 'https://demanlab.ai',
    };
  }

  if (level.id === 3) {
    return {
      tier: 'premium',
      name: '1-on-1 AI Architecture',
      price: '9.990.000 — 29.990.000 VNĐ',
      reason: 'Bạn cần một AI Architect đồng hành thiết kế hệ thống riêng — không phải template, mà là bản vẽ may đo.',
      benefits: [
        '4–8 buổi 1-on-1 với AI Architect',
        'AI Blueprint thiết kế riêng cho bạn/tổ chức',
        'SOP + Prompt Library + Automation setup',
        'Hỗ trợ triển khai thực tế 90 ngày',
        'Truy cập Clone Your Mind™ Academy',
      ],
      cta: 'Đặt lịch tư vấn 1-on-1',
      ctaUrl: 'https://demanlab.ai',
    };
  }

  // Level 4: Visionary
  return {
    tier: 'enterprise',
    name: 'AI Transformation Partnership',
    price: 'Tùy chỉnh theo quy mô',
    reason: 'Bạn là leader — cần một đối tác chiến lược, không phải một nhà cung cấp. Hãy cùng thiết kế tương lai.',
    benefits: [
      'AI Transformation Roadmap cho tổ chức',
      'Đồng hành triển khai 3–6 tháng',
      'Đào tạo đội ngũ AI Champions',
      'AI Operating System hoàn chỉnh',
      'Advisory retainer với Hải VN',
    ],
    cta: 'Trao đổi phạm vi hợp tác',
    ctaUrl: 'https://demanlab.ai',
  };
}

// AI tools recommendation based on department and level
function recommendAITools(departments: string[], level: CustomerLevel): { name: string; purpose: string }[] {
  const tools: { name: string; purpose: string }[] = [];

  // Core tools for everyone
  tools.push({ name: 'ChatGPT / Claude', purpose: 'AI assistant chính — brainstorm, viết, phân tích, lên kế hoạch' });

  if (departments.includes('content') || departments.includes('marketing')) {
    tools.push({ name: 'Manus AI', purpose: 'AI Agent — tự động hóa workflow phức tạp, nghiên cứu, tạo tài liệu' });
    tools.push({ name: 'Canva AI', purpose: 'Thiết kế visual nhanh cho social media' });
  }

  if (departments.includes('design')) {
    tools.push({ name: 'Midjourney / DALL-E', purpose: 'Tạo hình ảnh AI chất lượng cao' });
    tools.push({ name: 'Figma AI', purpose: 'Design UI/UX với AI assist' });
  }

  if (departments.includes('media')) {
    tools.push({ name: 'Runway ML', purpose: 'Video editing và generation bằng AI' });
    tools.push({ name: 'ElevenLabs', purpose: 'AI voice và text-to-speech' });
  }

  if (departments.includes('sales') || departments.includes('operations')) {
    tools.push({ name: 'Zapier / Make', purpose: 'Automation workflow giữa các tool' });
    tools.push({ name: 'Notion AI', purpose: 'Quản lý dự án và knowledge base' });
  }

  if (level.id >= 3) {
    tools.push({ name: 'Cursor / GitHub Copilot', purpose: 'AI coding — xây dựng tool và automation' });
  }

  return tools.slice(0, 6);
}

// ─── MAIN GENERATOR ──────────────────────────────────────────

export function generateBlueprint(answers: SurveyAnswers): BlueprintResult {
  const { total, dimensions, level } = calculateScore(answers);

  // Brand DNA
  const archetype = determineArchetype(answers.currentRole, answers.careerGoal);
  const roleLabel = ROLES.find(r => r.value === answers.currentRole)?.label || answers.currentRole;
  const industryLabel = INDUSTRIES.find(i => i.value === answers.industry)?.label || answers.industry;

  const brandDNA: PersonalBrandDNA = {
    archetype: archetype.name,
    archetypeDescription: archetype.description,
    mission: answers.personalMission || `Ứng dụng AI để tạo ra giá trị đột phá trong ${industryLabel}`,
    coreFeeling: level.id >= 3 ? 'Khai Sáng & Dẫn Dắt' : 'An Tâm & Khai Sáng',
    personality: [
      { trait: 'Chuyên sâu', expression: 'Luôn chia sẻ từ kinh nghiệm thực chiến, không lý thuyết suông', never: 'Không nói chung chung, không copy paste' },
      { trait: 'Thực tế', expression: 'Mọi nội dung đều có thể áp dụng ngay', never: 'Không hứa hão, không tô hồng' },
      { trait: 'Truyền cảm hứng', expression: 'Chia sẻ hành trình chân thực, cả thành công lẫn thất bại', never: 'Không khoe khoang, không toxic positivity' },
    ],
    promise: `Mỗi nội dung tôi chia sẻ đều giúp bạn tiến thêm một bước trong hành trình AI — không hứa phép màu, chỉ hứa giá trị thực.`,
    coreValues: [
      { name: 'Thực Chiến', meaning: 'Làm trước, nói sau. Mọi chia sẻ đều từ trải nghiệm thật.' },
      { name: 'Hệ Thống', meaning: 'Không chỉ biết dùng tool, mà xây được quy trình có thể nhân rộng.' },
      { name: 'Kết Nối', meaning: 'AI mạnh hơn khi con người kết nối. Cộng đồng là sức mạnh.' },
    ],
    positioningStatement: `Dành cho ${roleLabel} trong ngành ${industryLabel}, người muốn ${CAREER_GOALS.find(g => g.value === answers.careerGoal)?.label || 'phát triển sự nghiệp với AI'}, tôi cung cấp bản vẽ phát triển thương hiệu cá nhân × AI — giúp bạn không chỉ "biết dùng AI" mà trở thành người dẫn đầu trong kỷ nguyên số.`,
  };

  // Role Mapping
  const transform = ROLE_TRANSFORMATIONS[answers.currentRole] || ROLE_TRANSFORMATIONS.specialist;
  const roleMapping: AIRoleMapping = {
    currentRole: roleLabel,
    currentDescription: `${roleLabel} với ${EXPERIENCE_LEVELS.find(e => e.value === answers.yearsExperience)?.label || ''} kinh nghiệm trong ${industryLabel}`,
    futureRole: transform.future,
    futureDescription: transform.futureDesc,
    transformationPath: transform.path,
    keySkillsToAcquire: answers.skillsToGrow.map(s => SKILLS_TO_GROW.find(sk => sk.value === s)?.label || s),
    aiToolsRecommended: recommendAITools(answers.department, level),
  };

  // Content Pillars
  const contentPillars = generateContentPillars(answers.currentRole, answers.careerGoal, answers.department, answers.industry);

  // Channel Strategy
  const channelStrategy = generateChannelStrategy(answers.careerGoal, level, answers.department);

  // Roadmap
  const roadmap = generateRoadmap(level, answers.careerGoal, answers.skillsToGrow);

  // Service Recommendation
  const serviceRecommendation = recommendService(level, answers.budgetRange, answers.careerGoal);

  return {
    totalScore: total,
    level,
    dimensions,
    brandDNA,
    roleMapping,
    contentPillars,
    channelStrategy,
    roadmap,
    serviceRecommendation,
  };
}

// ─── INITIAL SURVEY STATE ────────────────────────────────────

export const INITIAL_ANSWERS: SurveyAnswers = {
  fullName: '',
  email: '',
  phone: '',
  industry: '',
  currentRole: '',
  orgSize: '',
  department: [],
  yearsExperience: '',
  aiUsageLevel: 1,
  aiTools: [],
  aiSelfAssessment: 1,
  biggestChallenge: '',
  careerGoal: '',
  skillsToGrow: [],
  personalMission: '',
  aiTimeFreedom: '',
  timeInvestment: '',
  budgetRange: '',
  interestReason: [],
};

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { trpc } from "@/lib/trpc";
import { useSearch } from "wouter";
import { Streamdown } from "streamdown";
import {
  Check,
  FileText,
  Loader2,
  Palette,
  Plus,
  Sparkles,
  Type,
  Upload,
  X,
} from "lucide-react";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────

interface ToneOfVoice {
  formalCasual: number; // 0=formal, 100=casual
  seriousPlayful: number;
  respectfulIrreverent: number;
  matterOfFactEnthusiastic: number;
  description: string;
}

interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

// ─── Preset Palettes ──────────────────────────────────────────

const presetPalettes: { name: string; colors: ColorPalette }[] = [
  {
    name: "Cyber Blue",
    colors: { primary: "#00B4FF", secondary: "#7B2FBE", accent: "#00D4FF", background: "#0A0A14", text: "#E8E8F0" },
  },
  {
    name: "Forest Sage",
    colors: { primary: "#2D9B6E", secondary: "#1A5F3A", accent: "#7BC47F", background: "#0F1A14", text: "#E0EDE5" },
  },
  {
    name: "Warm Coral",
    colors: { primary: "#FF6B6B", secondary: "#C44569", accent: "#FFE66D", background: "#1A0F14", text: "#F0E0E5" },
  },
  {
    name: "Royal Purple",
    colors: { primary: "#8B5CF6", secondary: "#6D28D9", accent: "#A78BFA", background: "#0F0A1A", text: "#E5E0F0" },
  },
  {
    name: "Ocean Teal",
    colors: { primary: "#2DD4BF", secondary: "#0D9488", accent: "#5EEAD4", background: "#0A1A1A", text: "#E0F0ED" },
  },
  {
    name: "Sunset Gold",
    colors: { primary: "#F59E0B", secondary: "#D97706", accent: "#FBBF24", background: "#1A140A", text: "#F0EDE0" },
  },
];

// ─── Component ────────────────────────────────────────────────

export default function BlueprintIdentity() {
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  const brandIdParam = params.get("brandId");
  const brandId = brandIdParam ? Number(brandIdParam) : null;

  // State
  const [tone, setTone] = useState<ToneOfVoice>({
    formalCasual: 50,
    seriousPlayful: 40,
    respectfulIrreverent: 30,
    matterOfFactEnthusiastic: 60,
    description: "",
  });
  const [colors, setColors] = useState<ColorPalette>(presetPalettes[0].colors);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [newKeyword, setNewKeyword] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isGeneratingGuidelines, setIsGeneratingGuidelines] = useState(false);
  const [guidelines, setGuidelines] = useState<string | null>(null);

  const brandQuery = trpc.brand.getById.useQuery(
    { id: brandId! },
    { enabled: !!brandId }
  );

  const updateMutation = trpc.brand.updateIdentity.useMutation();
  const guidelinesMutation = trpc.ai.generateBrandGuidelines.useMutation();

  // Load existing data
  useEffect(() => {
    if (brandQuery.data) {
      if (brandQuery.data.toneOfVoice) setTone(brandQuery.data.toneOfVoice as ToneOfVoice);
      if (brandQuery.data.colorPalette) setColors(brandQuery.data.colorPalette as ColorPalette);
      if (brandQuery.data.brandKeywords) setKeywords(brandQuery.data.brandKeywords as string[]);
      if (brandQuery.data.brandGuidelinesGenerated) {
        const gen = brandQuery.data.brandGuidelinesGenerated as { markdown: string };
        if (gen.markdown) setGuidelines(gen.markdown);
      }
    }
  }, [brandQuery.data]);

  const handleSave = async () => {
    if (!brandId) return;
    setIsSaving(true);
    try {
      await updateMutation.mutateAsync({
        id: brandId,
        toneOfVoice: tone,
        colorPalette: colors,
        brandKeywords: keywords,
      });
      toast.success("Đã lưu nhận diện thương hiệu!");
    } catch (err) {
      toast.error("Không thể lưu. Vui lòng thử lại.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleGenerateGuidelines = async () => {
    if (!brandId) return;
    setIsGeneratingGuidelines(true);
    try {
      // Save current settings first
      await updateMutation.mutateAsync({
        id: brandId,
        toneOfVoice: tone,
        colorPalette: colors,
        brandKeywords: keywords,
      });
      // Generate guidelines
      const result = await guidelinesMutation.mutateAsync({ brandProfileId: brandId });
      setGuidelines(result.guidelines);
      toast.success("Đã tạo Brand Guidelines!");
    } catch (err) {
      toast.error("Không thể tạo guidelines. Vui lòng thử lại.");
    } finally {
      setIsGeneratingGuidelines(false);
    }
  };

  const addKeyword = () => {
    const kw = newKeyword.trim();
    if (kw && !keywords.includes(kw) && keywords.length < 10) {
      setKeywords([...keywords, kw]);
      setNewKeyword("");
    }
  };

  const removeKeyword = (kw: string) => {
    setKeywords(keywords.filter((k) => k !== kw));
  };

  // ─── No brand ───────────────────────────────────────────────
  if (!brandId) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center space-y-6 max-w-md">
          <Palette className="w-16 h-16 text-primary/30 mx-auto" />
          <h2 className="font-display font-bold text-2xl">Chưa có thương hiệu</h2>
          <p className="text-muted-foreground">Hãy hoàn thành khảo sát và tạo chiến lược trước.</p>
        </div>
      </div>
    );
  }

  if (brandQuery.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // ─── Main View ──────────────────────────────────────────────
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border/30 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-primary text-xs font-medium mb-3">
            <Palette className="w-4 h-4" />
            NHẬN DIỆN THƯƠNG HIỆU
          </div>
          <h1 className="font-display font-bold text-2xl md:text-3xl mb-2">Thiết Kế Nhận Diện</h1>
          <p className="text-muted-foreground text-sm">Định hình giọng nói, màu sắc, và phong cách thương hiệu cá nhân</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-10">
        {/* Tone of Voice */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Type className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl">Tone of Voice</h2>
              <p className="text-xs text-muted-foreground">Giọng nói thương hiệu — cách bạn giao tiếp với audience</p>
            </div>
          </div>

          <div className="space-y-6 p-5 rounded-xl border border-border/50 bg-card/30">
            {[
              { key: "formalCasual" as const, left: "Trang trọng", right: "Thân mật" },
              { key: "seriousPlayful" as const, left: "Nghiêm túc", right: "Vui vẻ" },
              { key: "respectfulIrreverent" as const, left: "Tôn trọng", right: "Phá cách" },
              { key: "matterOfFactEnthusiastic" as const, left: "Khách quan", right: "Nhiệt huyết" },
            ].map((item) => (
              <div key={item.key} className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{item.left}</span>
                  <span className="text-muted-foreground">{item.right}</span>
                </div>
                <Slider
                  value={[tone[item.key]]}
                  onValueChange={([v]) => setTone((prev) => ({ ...prev, [item.key]: v }))}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>
            ))}

            <div className="pt-2">
              <label className="text-xs text-muted-foreground block mb-2">Mô tả thêm về giọng nói thương hiệu</label>
              <Textarea
                value={tone.description}
                onChange={(e) => setTone((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Ví dụ: Tôi muốn giọng nói thân thiện nhưng chuyên nghiệp, như đang trò chuyện với đồng nghiệp..."
                rows={3}
                className="bg-background/50 resize-none text-sm"
              />
            </div>
          </div>
        </section>

        {/* Color Palette */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <Palette className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl">Bảng Màu</h2>
              <p className="text-xs text-muted-foreground">Màu sắc đại diện cho thương hiệu</p>
            </div>
          </div>

          {/* Presets */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {presetPalettes.map((preset) => {
              const isSelected = colors.primary === preset.colors.primary;
              return (
                <button
                  key={preset.name}
                  onClick={() => setColors(preset.colors)}
                  className={`p-3 rounded-xl border transition-all ${
                    isSelected ? "border-primary bg-primary/5" : "border-border/50 bg-card/30 hover:border-primary/30"
                  }`}
                >
                  <div className="flex gap-1 mb-2">
                    {Object.values(preset.colors).slice(0, 3).map((c, i) => (
                      <div key={i} className="w-6 h-6 rounded-full" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                  <p className="text-xs font-medium">{preset.name}</p>
                  {isSelected && <Check className="w-3 h-3 text-primary mt-1" />}
                </button>
              );
            })}
          </div>

          {/* Custom colors */}
          <div className="p-5 rounded-xl border border-border/50 bg-card/30">
            <p className="text-xs text-muted-foreground mb-4">Tùy chỉnh màu sắc</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {(["primary", "secondary", "accent", "background", "text"] as const).map((key) => (
                <div key={key} className="space-y-2">
                  <label className="text-[10px] text-muted-foreground uppercase tracking-wider">{key}</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={colors[key]}
                      onChange={(e) => setColors((prev) => ({ ...prev, [key]: e.target.value }))}
                      className="w-8 h-8 rounded cursor-pointer border-0"
                    />
                    <Input
                      value={colors[key]}
                      onChange={(e) => setColors((prev) => ({ ...prev, [key]: e.target.value }))}
                      className="text-xs h-8 bg-background/50 font-mono"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Preview */}
            <div className="mt-6 rounded-xl overflow-hidden" style={{ backgroundColor: colors.background }}>
              <div className="p-6 space-y-3">
                <h3 className="font-display font-bold text-lg" style={{ color: colors.primary }}>
                  Thương hiệu của bạn
                </h3>
                <p className="text-sm" style={{ color: colors.text }}>
                  Đây là cách nội dung của bạn sẽ trông với bảng màu đã chọn.
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: colors.primary, color: colors.background }}>
                    Primary
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: colors.accent, color: colors.background }}>
                    Accent
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Keywords */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl">Từ Khóa Thương Hiệu</h2>
              <p className="text-xs text-muted-foreground">Những từ khóa mô tả thương hiệu cá nhân của bạn</p>
            </div>
          </div>

          <div className="p-5 rounded-xl border border-border/50 bg-card/30 space-y-4">
            <div className="flex gap-2">
              <Input
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addKeyword()}
                placeholder="Thêm từ khóa..."
                className="bg-background/50 text-sm"
              />
              <Button size="sm" variant="outline" onClick={addKeyword} disabled={!newKeyword.trim()}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {keywords.map((kw) => (
                <Badge key={kw} variant="secondary" className="gap-1 px-3 py-1.5">
                  {kw}
                  <button onClick={() => removeKeyword(kw)} className="ml-1 hover:text-destructive">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
              {keywords.length === 0 && (
                <p className="text-xs text-muted-foreground">Thêm từ khóa mô tả thương hiệu (ví dụ: AI, Sáng tạo, Chuyên nghiệp...)</p>
              )}
            </div>
          </div>
        </section>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 py-4">
          <Button onClick={handleSave} disabled={isSaving} className="gap-2">
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            Lưu Nhận Diện
          </Button>
          <Button
            variant="outline"
            onClick={handleGenerateGuidelines}
            disabled={isGeneratingGuidelines}
            className="gap-2"
          >
            {isGeneratingGuidelines ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
            Tạo Brand Guidelines
          </Button>
        </div>

        {/* Generated Guidelines */}
        {guidelines && (
          <section className="space-y-4 pb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h2 className="font-display font-bold text-xl">Brand Guidelines</h2>
                <p className="text-xs text-muted-foreground">Hướng dẫn thương hiệu được tạo bởi AI</p>
              </div>
            </div>
            <div className="p-6 rounded-xl border border-border/50 bg-card/30 prose prose-invert prose-sm max-w-none">
              <Streamdown>{guidelines}</Streamdown>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

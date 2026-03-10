import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { useSearch } from "wouter";
import { Streamdown } from "streamdown";
import {
  Camera,
  ChevronRight,
  Copy,
  FileText,
  Image,
  Loader2,
  MessageSquare,
  Mic,
  MicOff,
  PenTool,
  Play,
  Sparkles,
  Video,
  Wand2,
} from "lucide-react";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────

type ContentType = "text_post" | "image_prompt" | "video_script" | "carousel" | "story";

interface GeneratedContent {
  id: number;
  type: ContentType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>;
  imageUrl?: string;
}

// ─── Component ────────────────────────────────────────────────

export default function BlueprintStudio() {
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  const brandIdParam = params.get("brandId");
  const brandId = brandIdParam ? Number(brandIdParam) : null;

  const [selectedType, setSelectedType] = useState<ContentType>("text_post");
  const [userInput, setUserInput] = useState("");
  const [platform, setPlatform] = useState("Facebook");
  const [length, setLength] = useState<"short" | "medium" | "long">("medium");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const generateMutation = trpc.content.generate.useMutation();
  const generateImageMutation = trpc.content.generateImage.useMutation();
  const enhanceMutation = trpc.ai.enhanceIdea.useMutation();

  const contentHistory = trpc.content.getByBrandId.useQuery(
    { brandProfileId: brandId! },
    { enabled: !!brandId }
  );

  const contentTypes = [
    { id: "text_post" as ContentType, icon: MessageSquare, label: "Bài đăng", description: "Text post cho mạng xã hội" },
    { id: "image_prompt" as ContentType, icon: Image, label: "Hình ảnh", description: "Prompt tạo hình ảnh AI" },
    { id: "video_script" as ContentType, icon: Video, label: "Video", description: "Kịch bản video ngắn" },
    { id: "carousel" as ContentType, icon: FileText, label: "Carousel", description: "Bài đăng nhiều slide" },
  ];

  const platforms = ["Facebook", "LinkedIn", "Instagram", "TikTok", "Twitter/X"];
  const lengths = [
    { id: "short" as const, label: "Ngắn", desc: "100-200 từ" },
    { id: "medium" as const, label: "Vừa", desc: "200-400 từ" },
    { id: "long" as const, label: "Dài", desc: "500-800 từ" },
  ];

  // Voice recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        toast.info("Tính năng voice-to-text đang được phát triển. Vui lòng nhập text trực tiếp.");
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      toast.error("Không thể truy cập microphone");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleGenerate = async () => {
    if (!brandId || !userInput.trim()) return;
    setIsGenerating(true);
    try {
      if (selectedType === "image_prompt") {
        // First generate the image prompt, then generate the image
        const result = await generateMutation.mutateAsync({
          brandProfileId: brandId,
          contentType: "image_prompt",
          input: userInput,
          platform,
        });
        const promptData = result.content as { prompt?: string };
        if (promptData.prompt) {
          const imgResult = await generateImageMutation.mutateAsync({
            brandProfileId: brandId,
            prompt: promptData.prompt,
          });
          setGeneratedContent({
            id: imgResult.pieceId,
            type: "image_prompt",
            data: result.content,
            imageUrl: imgResult.imageUrl,
          });
        } else {
          setGeneratedContent({ id: result.pieceId, type: "image_prompt", data: result.content });
        }
      } else {
        const result = await generateMutation.mutateAsync({
          brandProfileId: brandId,
          contentType: selectedType,
          input: userInput,
          platform,
          length: selectedType === "text_post" ? length : undefined,
        });
        setGeneratedContent({ id: result.pieceId, type: selectedType, data: result.content });
      }
      contentHistory.refetch();
    } catch (err) {
      console.error("Content generation error:", err);
      toast.error("Không thể tạo nội dung. Vui lòng thử lại.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEnhance = async () => {
    if (!brandId || !userInput.trim()) return;
    setIsGenerating(true);
    try {
      const result = await enhanceMutation.mutateAsync({
        brandProfileId: brandId,
        rawIdea: userInput,
        targetFormat: selectedType === "text_post" ? "post" : "article",
      });
      setGeneratedContent({
        id: 0,
        type: "text_post",
        data: { body: result.enhanced },
      });
    } catch (err) {
      toast.error("Không thể enhance nội dung.");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyContent = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Đã copy nội dung!");
  };

  // ─── No brand ───────────────────────────────────────────────
  if (!brandId) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center space-y-6 max-w-md">
          <PenTool className="w-16 h-16 text-primary/30 mx-auto" />
          <h2 className="font-display font-bold text-2xl">AI Content Studio</h2>
          <p className="text-muted-foreground">Hoàn thành khảo sát và tạo chiến lược để mở khóa Content Studio.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border/30 px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-primary text-xs font-medium mb-3">
            <PenTool className="w-4 h-4" />
            AI CONTENT STUDIO
          </div>
          <h1 className="font-display font-bold text-2xl md:text-3xl mb-2">Sáng Tạo Nội Dung</h1>
          <p className="text-muted-foreground text-sm">Tạo nội dung nhất quán với thương hiệu — từ ý tưởng đến bài đăng hoàn chỉnh</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Input */}
          <div className="lg:col-span-2 space-y-6">
            {/* Content type */}
            <div className="space-y-3">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Loại nội dung</p>
              <div className="grid grid-cols-2 gap-2">
                {contentTypes.map((ct) => (
                  <button
                    key={ct.id}
                    onClick={() => setSelectedType(ct.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedType === ct.id
                        ? "border-primary bg-primary/10"
                        : "border-border/50 bg-card/30 hover:border-primary/30"
                    }`}
                  >
                    <ct.icon className={`w-5 h-5 mb-1.5 ${selectedType === ct.id ? "text-primary" : "text-muted-foreground"}`} />
                    <p className="text-xs font-medium">{ct.label}</p>
                    <p className="text-[10px] text-muted-foreground">{ct.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Platform (for text posts) */}
            {(selectedType === "text_post" || selectedType === "carousel") && (
              <div className="space-y-3">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Nền tảng</p>
                <div className="flex flex-wrap gap-2">
                  {platforms.map((p) => (
                    <button
                      key={p}
                      onClick={() => setPlatform(p)}
                      className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                        platform === p
                          ? "bg-primary text-primary-foreground"
                          : "bg-card/50 text-muted-foreground border border-border/50 hover:border-primary/30"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Length (for text posts) */}
            {selectedType === "text_post" && (
              <div className="space-y-3">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Độ dài</p>
                <div className="flex gap-2">
                  {lengths.map((l) => (
                    <button
                      key={l.id}
                      onClick={() => setLength(l.id)}
                      className={`flex-1 p-3 rounded-xl border text-center transition-all ${
                        length === l.id
                          ? "border-primary bg-primary/10"
                          : "border-border/50 bg-card/30 hover:border-primary/30"
                      }`}
                    >
                      <p className="text-xs font-medium">{l.label}</p>
                      <p className="text-[10px] text-muted-foreground">{l.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Ý tưởng của bạn</p>
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`p-2 rounded-lg transition-colors ${
                    isRecording ? "bg-destructive/20 text-destructive" : "bg-card/50 text-muted-foreground hover:text-foreground"
                  }`}
                  title={isRecording ? "Dừng ghi âm" : "Ghi âm"}
                >
                  {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
              </div>
              <Textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder={
                  selectedType === "text_post"
                    ? "Ví dụ: Chia sẻ về cách tôi dùng AI để tăng 3x năng suất content..."
                    : selectedType === "image_prompt"
                    ? "Ví dụ: Hình ảnh thể hiện sự kết hợp giữa con người và AI..."
                    : selectedType === "video_script"
                    ? "Ví dụ: Video 60 giây về 3 bước đầu tiên khi bắt đầu dùng AI..."
                    : "Mô tả ý tưởng nội dung..."
                }
                rows={6}
                className="bg-card/30 resize-none text-sm"
              />
            </div>

            {/* Generate buttons */}
            <div className="flex gap-2">
              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !userInput.trim()}
                className="flex-1 gap-2"
              >
                {isGenerating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                Tạo nội dung
              </Button>
              <Button
                variant="outline"
                onClick={handleEnhance}
                disabled={isGenerating || !userInput.trim()}
                className="gap-1"
                title="Phát triển ý tưởng"
              >
                <Wand2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Right: Output */}
          <div className="lg:col-span-3 space-y-6">
            {/* Generated content */}
            {isGenerating && (
              <div className="flex items-center justify-center py-20">
                <div className="text-center space-y-4">
                  <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto" />
                  <p className="text-sm text-muted-foreground">AI đang sáng tạo...</p>
                </div>
              </div>
            )}

            {!isGenerating && generatedContent && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-lg">Nội dung đã tạo</h3>
                  <Badge variant="outline" className="text-xs">
                    {contentTypes.find((ct) => ct.id === generatedContent.type)?.label}
                  </Badge>
                </div>

                {/* Image */}
                {generatedContent.imageUrl && (
                  <div className="rounded-xl overflow-hidden border border-border/50">
                    <img
                      src={generatedContent.imageUrl}
                      alt="Generated"
                      className="w-full h-auto object-contain max-h-[400px]"
                    />
                  </div>
                )}

                {/* Text content */}
                <div className="p-5 rounded-xl border border-border/50 bg-card/30 space-y-4">
                  {/* Hook */}
                  {typeof generatedContent.data.hook === "string" && (
                    <div className="space-y-1">
                      <p className="text-[10px] text-primary uppercase tracking-wider font-medium">Hook</p>
                      <p className="text-sm font-medium">{generatedContent.data.hook}</p>
                    </div>
                  )}

                  {/* Title */}
                  {typeof generatedContent.data.title === "string" && (
                    <div className="space-y-1">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Tiêu đề</p>
                      <p className="font-display font-bold">{generatedContent.data.title}</p>
                    </div>
                  )}

                  {/* Body */}
                  {typeof generatedContent.data.body === "string" && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Nội dung</p>
                        <button
                          onClick={() => copyContent(generatedContent.data.body as string)}
                          className="p-1 rounded hover:bg-accent/50 transition-colors"
                        >
                          <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                        </button>
                      </div>
                      <div className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">
                        <Streamdown>{generatedContent.data.body}</Streamdown>
                      </div>
                    </div>
                  )}

                  {/* Hashtags */}
                  {Array.isArray(generatedContent.data.hashtags) && (
                    <div className="space-y-1">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Hashtags</p>
                      <div className="flex flex-wrap gap-1.5">
                        {(generatedContent.data.hashtags as string[]).map((tag) => (
                          <span key={tag} className="text-xs text-primary">#{tag}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  {typeof generatedContent.data.cta === "string" && (
                    <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                      <p className="text-[10px] text-primary uppercase tracking-wider mb-1">Call to Action</p>
                      <p className="text-sm">{generatedContent.data.cta}</p>
                    </div>
                  )}

                  {/* Video scenes */}
                  {generatedContent.data.scenes && Array.isArray(generatedContent.data.scenes) && (
                    <div className="space-y-2">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Cảnh quay</p>
                      {(generatedContent.data.scenes as Array<{ voiceover: string; visual: string }>).map((scene, i) => (
                        <div key={i} className="p-3 rounded-lg bg-muted/20 border border-border/30 space-y-1">
                          <p className="text-xs font-medium text-primary">Cảnh {i + 1}</p>
                          {scene.voiceover && <p className="text-xs"><span className="text-muted-foreground">Voiceover:</span> {String(scene.voiceover)}</p>}
                          {scene.visual && <p className="text-xs"><span className="text-muted-foreground">Visual:</span> {String(scene.visual)}</p>}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Image prompt */}
                  {typeof generatedContent.data.prompt === "string" && generatedContent.type === "image_prompt" && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Image Prompt</p>
                        <button
                          onClick={() => copyContent(generatedContent.data.prompt as string)}
                          className="p-1 rounded hover:bg-accent/50 transition-colors"
                        >
                          <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                        </button>
                      </div>
                      <p className="text-xs text-foreground/80 font-mono bg-muted/20 p-3 rounded-lg">
                        {generatedContent.data.prompt}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {!isGenerating && !generatedContent && (
              <div className="flex items-center justify-center py-20">
                <div className="text-center space-y-4 max-w-sm">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/5 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-primary/30" />
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Nhập ý tưởng và nhấn "Tạo nội dung" để AI tạo nội dung phù hợp với thương hiệu của bạn.
                  </p>
                  <div className="text-xs text-muted-foreground/60 space-y-1">
                    <p>Áp dụng: Golden Circle + 3 Tầng Giá Trị + Storytelling</p>
                    <p>Nhất quán với Brand DNA & Tone of Voice đã thiết lập</p>
                  </div>
                </div>
              </div>
            )}

            {/* Content History */}
            {contentHistory.data && contentHistory.data.length > 0 && (
              <div className="space-y-3 pt-6 border-t border-border/30">
                <h3 className="text-sm font-medium text-muted-foreground">Nội dung đã tạo gần đây</h3>
                <div className="space-y-2">
                  {contentHistory.data.slice(0, 5).map((piece) => (
                    <div key={piece.id} className="flex items-center gap-3 p-3 rounded-lg border border-border/30 bg-card/20">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        {piece.contentType === "text_post" && <MessageSquare className="w-4 h-4 text-primary" />}
                        {piece.contentType === "image_prompt" && <Image className="w-4 h-4 text-primary" />}
                        {piece.contentType === "video_script" && <Video className="w-4 h-4 text-primary" />}
                        {piece.contentType === "carousel" && <FileText className="w-4 h-4 text-primary" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate">{piece.title || "Untitled"}</p>
                        <p className="text-[10px] text-muted-foreground">
                          {new Date(piece.createdAt).toLocaleDateString("vi-VN")}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-[10px]">{piece.status}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/*
 * ChapterMusicPlayer — Floating ambient piano player
 * Plays mood-matched piano music when reading each chapter.
 * Uses YouTube IFrame API with mobile-compatible approach.
 *
 * Key fixes:
 * 1. Unique div IDs per player instance (avoids stale DOM references)
 * 2. Player creation in direct click handler (mobile autoplay policy)
 * 3. localStorage tracks user interaction — auto-plays on new chapter mount
 * 4. playsinline=1 for iOS
 */
import { useState, useEffect, useRef, useCallback } from "react";
import { Music, Pause, Play, Volume2, VolumeX, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CHAPTER_MUSIC: Record<string, { mood: string; videoId: string }> = {
  "ch-1":  { mood: "Nostalgic & Warm", videoId: "uiwBO0KqP8k" },
  "ch-2":  { mood: "Melancholic", videoId: "CMz6mqKGsKQ" },
  "ch-3":  { mood: "Hopeful", videoId: "lRmTI119KCE" },
  "ch-4":  { mood: "Dramatic & Tense", videoId: "412YanLzZ64" },
  "ch-5":  { mood: "Inspiring", videoId: "A8hIIIV4a7k" },
  "ch-6":  { mood: "Contemplative", videoId: "-mCLzfgcAPk" },
  "ch-7":  { mood: "Gentle & Peaceful", videoId: "3NycM9lYdRI" },
  "ch-8":  { mood: "Motivational", videoId: "vn_e7HXFkt8" },
  "ch-9":  { mood: "Cinematic & Grand", videoId: "bg2r31KV-cU" },
  "ch-10": { mood: "Ambient & Futuristic", videoId: "4FhsjQ2xess" },
  "ch-11": { mood: "Meditative & Calm", videoId: "77ZozI0rw7w" },
  "ch-12": { mood: "Cinematic & Powerful", videoId: "lA4H3vQl0Kw" },
  "ch-13": { mood: "Emotional", videoId: "-vy6_1sl29I" },
  "ch-14": { mood: "Modern & Ambient", videoId: "k9UT7xfRVc8" },
  "ch-15": { mood: "Dreamy & Ethereal", videoId: "WGIVZ1b0-2A" },
  "ch-16": { mood: "Triumphant", videoId: "oj8_wufhE28" },
};

const STORAGE_KEY = "goe_music_autoplay";
let instanceCounter = 0;

function hasUserOptedIn(): boolean {
  try { return localStorage.getItem(STORAGE_KEY) === "1"; } catch { return false; }
}
function setUserOptedIn() {
  try { localStorage.setItem(STORAGE_KEY, "1"); } catch {}
}

interface Props {
  chapterId: string;
}

export default function ChapterMusicPlayer({ chapterId }: Props) {
  const music = CHAPTER_MUSIC[chapterId];

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [showPrompt, setShowPrompt] = useState(!hasUserOptedIn());
  const [ytReady, setYtReady] = useState(false);
  const playerRef = useRef<any>(null);
  const mountedRef = useRef(true);
  const autoPlayTriggered = useRef(false);

  // ── Load YouTube IFrame API ──
  useEffect(() => {
    mountedRef.current = true;
    if ((window as any).YT?.Player) {
      setYtReady(true);
      return;
    }
    if (document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const t = setInterval(() => {
        if ((window as any).YT?.Player) {
          if (mountedRef.current) setYtReady(true);
          clearInterval(t);
        }
      }, 150);
      return () => { mountedRef.current = false; clearInterval(t); };
    }
    (window as any).onYouTubeIframeAPIReady = () => {
      if (mountedRef.current) setYtReady(true);
    };
    const s = document.createElement("script");
    s.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(s);
    return () => { mountedRef.current = false; };
  }, []);

  // ── Cleanup helper ──
  const destroyPlayer = useCallback(() => {
    if (playerRef.current) {
      try { playerRef.current.destroy(); } catch {}
      playerRef.current = null;
    }
    document.querySelectorAll('[id^="yt-piano-"]').forEach(el => el.remove());
  }, []);

  // ── Create & play (must be called from user gesture for first time on mobile) ──
  const createAndPlay = useCallback((videoId: string) => {
    if (!ytReady || !mountedRef.current) return;
    destroyPlayer();

    instanceCounter += 1;
    const divId = `yt-piano-${instanceCounter}`;

    const div = document.createElement("div");
    div.id = divId;
    div.style.cssText =
      "position:fixed;bottom:-10px;left:-10px;width:2px;height:2px;opacity:0.01;pointer-events:none;z-index:-1;overflow:hidden;";
    document.body.appendChild(div);

    try {
      playerRef.current = new (window as any).YT.Player(divId, {
        width: "2",
        height: "2",
        videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          loop: 1,
          playlist: videoId,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
          playsinline: 1,
          origin: window.location.origin,
        },
        events: {
          onReady(e: any) {
            e.target.setVolume(30);
            e.target.playVideo();
            if (mountedRef.current) {
              setIsPlaying(true);
              setShowPrompt(false);
            }
          },
          onStateChange(e: any) {
            if (!mountedRef.current) return;
            const YT = (window as any).YT;
            if (!YT) return;
            switch (e.data) {
              case YT.PlayerState.PLAYING:
                setIsPlaying(true);
                break;
              case YT.PlayerState.PAUSED:
                setIsPlaying(false);
                break;
              case YT.PlayerState.ENDED:
                e.target.playVideo();
                break;
              case YT.PlayerState.UNSTARTED:
                setTimeout(() => { try { e.target.playVideo(); } catch {} }, 500);
                break;
            }
          },
          onError() {
            if (mountedRef.current) setIsPlaying(false);
          },
        },
      });
    } catch {
      if (mountedRef.current) setShowPrompt(true);
    }
  }, [ytReady, destroyPlayer]);

  // ── Auto-play on mount if user previously opted in ──
  useEffect(() => {
    if (!music || !ytReady || autoPlayTriggered.current) return;
    autoPlayTriggered.current = true;

    if (hasUserOptedIn()) {
      setShowPrompt(false);
      // Small delay to let component fully render
      const timer = setTimeout(() => {
        if (mountedRef.current) {
          createAndPlay(music.videoId);
        }
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [music, ytReady, createAndPlay]);

  // ── Cleanup on unmount ──
  useEffect(() => {
    return () => {
      mountedRef.current = false;
      destroyPlayer();
    };
  }, [destroyPlayer]);

  // ── User actions ──
  const handlePlay = useCallback(() => {
    setUserOptedIn();
    if (!music) return;

    if (playerRef.current) {
      try {
        playerRef.current.playVideo();
        setIsPlaying(true);
        setShowPrompt(false);
        return;
      } catch {}
    }
    createAndPlay(music.videoId);
  }, [music, createAndPlay]);

  const handlePause = useCallback(() => {
    try { playerRef.current?.pauseVideo(); } catch {}
    setIsPlaying(false);
  }, []);

  const handleToggleMute = useCallback(() => {
    if (!playerRef.current) return;
    try {
      if (isMuted) {
        playerRef.current.unMute();
        playerRef.current.setVolume(30);
      } else {
        playerRef.current.mute();
      }
      setIsMuted(prev => !prev);
    } catch {}
  }, [isMuted]);

  const handleClose = useCallback(() => {
    destroyPlayer();
    setIsPlaying(false);
    setIsVisible(false);
    // Remove auto-play preference so it doesn't auto-play next chapter
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  }, [destroyPlayer]);

  if (!music || !isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-6 left-4 md:left-6 z-50"
      >
        {showPrompt ? (
          <motion.button
            onClick={handlePlay}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 md:gap-2.5 px-3 md:px-4 py-2 md:py-2.5 rounded-full bg-card/95 backdrop-blur-md border border-border/60 shadow-lg hover:shadow-xl transition-all group"
          >
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
              <Music className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
            </div>
            <div className="text-left">
              <p className="font-ui text-[9px] md:text-[10px] font-bold tracking-wider uppercase text-muted-foreground/60 leading-tight">
                Nhạc nền
              </p>
              <p className="font-body text-[11px] md:text-xs text-foreground/80 leading-tight">
                {music.mood} Piano
              </p>
            </div>
            <Play className="w-3 h-3 md:w-3.5 md:h-3.5 text-primary ml-0.5 md:ml-1 shrink-0" />
          </motion.button>
        ) : (
          <motion.div
            initial={{ width: "auto" }}
            className="flex items-center gap-1 md:gap-1.5 px-2.5 md:px-3 py-1.5 md:py-2 rounded-full bg-card/95 backdrop-blur-md border border-border/60 shadow-lg"
          >
            <div className="flex items-end gap-[2px] h-4 mr-0.5 md:mr-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-[3px] rounded-full bg-primary/70"
                  animate={
                    isPlaying
                      ? { height: ["4px", "14px", "8px", "16px", "6px"] }
                      : { height: "4px" }
                  }
                  transition={
                    isPlaying
                      ? { duration: 0.8 + i * 0.15, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
                      : { duration: 0.2 }
                  }
                />
              ))}
            </div>

            <span className="font-ui text-[9px] font-bold tracking-wider uppercase text-muted-foreground/50 mr-0.5 md:mr-1 hidden sm:inline">
              {music.mood}
            </span>

            <button
              onClick={isPlaying ? handlePause : handlePlay}
              className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-secondary active:bg-secondary transition-colors"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 text-foreground" /> : <Play className="w-3.5 h-3.5 text-foreground" />}
            </button>

            <button
              onClick={handleToggleMute}
              className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-secondary active:bg-secondary transition-colors"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-muted-foreground" /> : <Volume2 className="w-3.5 h-3.5 text-foreground" />}
            </button>

            <button
              onClick={handleClose}
              className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-destructive/10 active:bg-destructive/10 transition-colors"
            >
              <X className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

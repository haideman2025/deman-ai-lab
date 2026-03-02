import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface CountUpNumberProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  glowColor?: 'cyan' | 'gold';
}

export function CountUpNumber({
  end,
  suffix = '',
  prefix = '',
  duration = 2000,
  className = '',
  glowColor = 'cyan',
}: CountUpNumberProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(end * eased));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration, isInView]);

  const glowClass = glowColor === 'cyan' ? 'text-glow-cyan' : 'text-glow-gold';

  return (
    <motion.span
      ref={ref}
      className={`font-display font-bold ${glowClass} ${className}`}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {prefix}{count}{suffix}
    </motion.span>
  );
}

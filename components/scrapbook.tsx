'use client';

import React, { useEffect, useRef, useState, ReactNode, CSSProperties } from 'react';

export const colors = {
  ink: "#2a1f17",
  rust: "#a64b2a",
  sage: "#7a8b5c",
  muted: "#5a4a32",
  paper: "#e8dcc4",
  lightPaper: "#f4ebd9",
  tan: "#d4a574",
  darkGround: "#1a140d",
} as const;

export const loadScrapbookFonts = () => {
  if (typeof document === "undefined") return;
  if (document.getElementById("dirA-fonts")) return;
  const l = document.createElement("link");
  l.id = "dirA-fonts";
  l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Work+Sans:wght@300;400;500;600&family=Caveat:wght@400;600;700&family=JetBrains+Mono:wght@400&display=swap";
  document.head.appendChild(l);
};

export const useScrapbookFonts = () => {
  useEffect(() => {
    loadScrapbookFonts();
  }, []);
};

export const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
};

export const Paper = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => (
  <div style={{
    backgroundColor: colors.paper,
    backgroundImage: `
      radial-gradient(circle at 12% 18%, rgba(80,50,20,0.06) 0px, transparent 2px),
      radial-gradient(circle at 78% 42%, rgba(80,50,20,0.05) 0px, transparent 1.5px),
      radial-gradient(circle at 33% 78%, rgba(80,50,20,0.07) 0px, transparent 2px),
      radial-gradient(circle at 88% 88%, rgba(80,50,20,0.04) 0px, transparent 1.5px),
      radial-gradient(circle at 50% 30%, rgba(80,50,20,0.04) 0px, transparent 1.5px),
      radial-gradient(circle at 22% 55%, rgba(80,50,20,0.05) 0px, transparent 2px),
      radial-gradient(ellipse at top left, rgba(255,240,210,0.5), transparent 60%),
      radial-gradient(ellipse at bottom right, rgba(60,30,10,0.08), transparent 60%)
    `,
    color: colors.ink,
    fontFamily: "'Work Sans', sans-serif",
    ...style
  }}>{children}</div>
);

export const Tape = ({ rotate = -3, top, left, right, bottom, width = 110, height = 28, color = "rgba(220, 200, 140, 0.78)", zIndex = 5 }: {
  rotate?: number; top?: number | string; left?: number | string; right?: number | string; bottom?: number | string;
  width?: number; height?: number; color?: string; zIndex?: number;
}) => (
  <div style={{
    position: "absolute", top, left, right, bottom, width, height,
    backgroundColor: color,
    backgroundImage: "repeating-linear-gradient(90deg, transparent 0 14px, rgba(255,255,255,0.18) 14px 16px)",
    transform: `rotate(${rotate}deg)`,
    boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
    borderLeft: "1px dashed rgba(120,90,40,0.25)",
    borderRight: "1px dashed rgba(120,90,40,0.25)",
    zIndex
  }} />
);

export const Stamp = ({ children, rotate = -8, color = colors.rust, style }: {
  children: ReactNode; rotate?: number; color?: string; style?: CSSProperties;
}) => (
  <div style={{
    display: "inline-block",
    border: `2.5px solid ${color}`,
    color, padding: "6px 14px",
    fontFamily: "'DM Serif Display', serif",
    fontSize: 14, letterSpacing: "0.18em", textTransform: "uppercase",
    transform: `rotate(${rotate}deg)`,
    opacity: 0.82,
    ...style
  }}>{children}</div>
);

export const WheatDoodle = ({ size = 60, color = colors.muted, style }: { size?: number; color?: string; style?: CSSProperties }) => (
  <svg width={size} height={size * 1.4} viewBox="0 0 60 84" style={style}>
    <line x1="30" y1="10" x2="30" y2="78" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    {[20, 32, 44, 56].map((y, i) => (
      <g key={i}>
        <ellipse cx="22" cy={y} rx="5" ry="3" fill="none" stroke={color} strokeWidth="1.2" transform={`rotate(-25 22 ${y})`}/>
        <ellipse cx="38" cy={y} rx="5" ry="3" fill="none" stroke={color} strokeWidth="1.2" transform={`rotate(25 38 ${y})`}/>
      </g>
    ))}
  </svg>
);

export const LoafDoodle = ({ size = 80, color = colors.muted, style }: { size?: number; color?: string; style?: CSSProperties }) => (
  <svg width={size} height={size * 0.7} viewBox="0 0 80 56" style={style}>
    <path d="M 8 40 Q 8 14 40 12 Q 72 14 72 40 Q 72 48 40 48 Q 8 48 8 40 Z"
      fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M 22 22 Q 28 18 34 22" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M 40 20 Q 46 16 52 20" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M 28 30 Q 34 26 40 30" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

export const Arrow = ({ size = 100, color = colors.rust, rotate = 0, style, flip }: {
  size?: number; color?: string; rotate?: number; style?: CSSProperties; flip?: boolean;
}) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 100 60" style={{ transform: `rotate(${rotate}deg) ${flip ? 'scaleX(-1)' : ''}`, ...style }}>
    <path d="M 6 30 Q 30 8 56 28 T 92 32" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M 86 24 L 92 32 L 84 36" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const StarDoodle = ({ size = 32, color = colors.rust, style }: { size?: number; color?: string; style?: CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" style={style}>
    <path d="M 16 4 L 16 28 M 4 16 L 28 16 M 7 7 L 25 25 M 25 7 L 7 25" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const Squiggle = ({ width = 120, color = colors.sage, style }: { width?: number; color?: string; style?: CSSProperties }) => (
  <svg width={width} height={20} viewBox="0 0 120 20" style={style}>
    <path d="M 4 10 Q 14 2 24 10 T 44 10 T 64 10 T 84 10 T 104 10 T 116 10" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

export const Reveal = ({ children, delay = 0, y = 24, style }: {
  children: ReactNode; delay?: number; y?: number; style?: CSSProperties;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); io.disconnect(); }
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : `translateY(${y}px)`,
      transition: `opacity 0.8s ease ${delay}ms, transform 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}ms`,
      ...style
    }}>{children}</div>
  );
};

export const ResultStamp = ({ tone, children }: { tone: "good" | "problem" | "pending"; children: ReactNode }) => {
  const stampColor = tone === "good" ? colors.sage : tone === "problem" ? colors.rust : colors.muted;
  return (
    <Stamp
      rotate={-4}
      color={stampColor}
      style={tone === "pending" ? { borderStyle: "dashed", opacity: 0.9 } : undefined}
    >
      {children}
    </Stamp>
  );
};

export const SiteFooter = ({ isMobile }: { isMobile: boolean }) => (
  <div style={{
    padding: isMobile ? "24px 24px" : "32px 120px",
    borderTop: `1px solid rgba(60,30,10,0.2)`,
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    justifyContent: "space-between",
    alignItems: isMobile ? "center" : undefined,
    gap: isMobile ? 8 : 0,
    fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: colors.muted,
    textAlign: isMobile ? "center" : undefined
  }}>
    <span>© CrispyCrustBoule · MMXXVI</span>
    <span style={{ fontFamily: "'Caveat', cursive", textTransform: "none", letterSpacing: 0, fontSize: 18, color: colors.rust }}>
      sourdough done right ✦
    </span>
    <span>made with flour</span>
  </div>
);

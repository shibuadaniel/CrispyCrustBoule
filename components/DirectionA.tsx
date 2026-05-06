'use client';

import React, { useEffect, useRef, useState, ReactNode, CSSProperties } from 'react';

// ---------- atoms ----------
const Paper = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => (
  <div style={{
    background: "#e8dcc4",
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
    color: "#2a1f17",
    fontFamily: "'Work Sans', sans-serif",
    ...style
  }}>{children}</div>
);

const Tape = ({ rotate = -3, top, left, right, bottom, width = 110, height = 28, color = "rgba(220, 200, 140, 0.78)", zIndex = 5 }: {
  rotate?: number; top?: number | string; left?: number | string; right?: number | string; bottom?: number | string;
  width?: number; height?: number; color?: string; zIndex?: number;
}) => (
  <div style={{
    position: "absolute", top, left, right, bottom, width, height,
    background: color,
    backgroundImage: "repeating-linear-gradient(90deg, transparent 0 14px, rgba(255,255,255,0.18) 14px 16px)",
    transform: `rotate(${rotate}deg)`,
    boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
    borderLeft: "1px dashed rgba(120,90,40,0.25)",
    borderRight: "1px dashed rgba(120,90,40,0.25)",
    zIndex
  }} />
);

const Stamp = ({ children, rotate = -8, color = "#a64b2a", style }: {
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

// ---------- doodles ----------
const WheatDoodle = ({ size = 60, color = "#5a4a32", style }: { size?: number; color?: string; style?: CSSProperties }) => (
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

const LoafDoodle = ({ size = 80, color = "#5a4a32", style }: { size?: number; color?: string; style?: CSSProperties }) => (
  <svg width={size} height={size * 0.7} viewBox="0 0 80 56" style={style}>
    <path d="M 8 40 Q 8 14 40 12 Q 72 14 72 40 Q 72 48 40 48 Q 8 48 8 40 Z"
      fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M 22 22 Q 28 18 34 22" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M 40 20 Q 46 16 52 20" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M 28 30 Q 34 26 40 30" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

const Arrow = ({ size = 100, color = "#a64b2a", rotate = 0, style, flip }: {
  size?: number; color?: string; rotate?: number; style?: CSSProperties; flip?: boolean;
}) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 100 60" style={{ transform: `rotate(${rotate}deg) ${flip ? 'scaleX(-1)' : ''}`, ...style }}>
    <path d="M 6 30 Q 30 8 56 28 T 92 32" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M 86 24 L 92 32 L 84 36" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const StarDoodle = ({ size = 32, color = "#a64b2a", style }: { size?: number; color?: string; style?: CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" style={style}>
    <path d="M 16 4 L 16 28 M 4 16 L 28 16 M 7 7 L 25 25 M 25 7 L 7 25" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const Squiggle = ({ width = 120, color = "#7a8b5c", style }: { width?: number; color?: string; style?: CSSProperties }) => (
  <svg width={width} height={20} viewBox="0 0 120 20" style={style}>
    <path d="M 4 10 Q 14 2 24 10 T 44 10 T 64 10 T 84 10 T 104 10 T 116 10" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

const PlaceholderImg = ({ label, height = 280, tilt = 0, sublabel, style }: {
  label: string; height?: number; tilt?: number; sublabel?: string; style?: CSSProperties;
}) => (
  <div style={{
    height, width: "100%",
    background: `repeating-linear-gradient(45deg, #c9b48a 0 8px, #b8a378 8px 16px)`,
    border: "1px solid rgba(60,30,10,0.3)",
    boxShadow: "0 4px 14px rgba(0,0,0,0.18)",
    transform: `rotate(${tilt}deg)`,
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    color: "#3a2a18", fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
    letterSpacing: "0.1em", textTransform: "uppercase",
    position: "relative",
    ...style
  }}>
    <span style={{ background: "#e8dcc4", padding: "4px 10px" }}>{label}</span>
    {sublabel && <span style={{ marginTop: 6, fontSize: 9, opacity: 0.7 }}>{sublabel}</span>}
  </div>
);

// ---------- scroll reveal ----------
const Reveal = ({ children, delay = 0, y = 24, style }: {
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

// ---------- loaf card with hover ----------
type Loaf = { name: string; level: string; note: string; time: string; weight: string };
const LoafCard = ({ loaf, idx, isMobile }: { loaf: Loaf; idx: number; isMobile: boolean }) => {
  const [hovered, setHovered] = useState(false);
  const baseTilt = idx === 1 ? -1 : 1;
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative", cursor: "pointer",
        transition: "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
        transform: hovered ? "translateY(-8px)" : "translateY(0)"
      }}
    >
      <Tape
        rotate={hovered ? (idx % 2 === 0 ? -8 : 6) : -2}
        top={-12}
        left={idx % 2 === 0 ? 30 : "auto"}
        right={idx % 2 === 0 ? "auto" : 30}
        width={100}
        color={hovered ? "rgba(166,75,42,0.55)" : "rgba(220,200,140,0)"}
      />
      <div style={{
        transform: `rotate(${baseTilt}deg) ${hovered ? 'scale(1.015)' : ''}`,
        transition: "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
        boxShadow: hovered ? "0 14px 32px rgba(60,30,10,0.25)" : "0 4px 14px rgba(0,0,0,0.18)",
      }}>
        <PlaceholderImg label={`loaf · 0${idx + 1}`} height={isMobile ? 200 : 300} sublabel={hovered ? loaf.weight : ""} />
      </div>

      <svg width="60" height="60" viewBox="0 0 60 60" style={{
        position: "absolute", top: 16, right: 16,
        opacity: hovered ? 0.85 : 0,
        transform: hovered ? "rotate(0deg) scale(1)" : "rotate(-30deg) scale(0.7)",
        transition: "opacity 0.4s ease, transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)"
      }}>
        <path d="M 10 30 Q 20 18 30 28 Q 40 38 50 26" fill="none" stroke="#a64b2a" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 14 42 Q 22 32 32 40 Q 42 48 50 38" fill="none" stroke="#a64b2a" strokeWidth="2" strokeLinecap="round"/>
      </svg>

      <div style={{ marginTop: 24, paddingLeft: 4 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: isMobile ? 22 : 28, margin: 0, fontWeight: 400 }}>
            {loaf.name}
          </h3>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#a64b2a", letterSpacing: "0.1em" }}>
            {loaf.time}
          </span>
        </div>
        <div style={{ fontFamily: "'Caveat', cursive", fontSize: isMobile ? 17 : 20, color: "#7a8b5c", marginTop: 6 }}>
          {loaf.note}
        </div>
        <div style={{
          marginTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center",
          fontSize: 12, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.15em", color: "#5a4a32"
        }}>
          <span>→ {loaf.level.toUpperCase()}</span>
          <span style={{
            color: "#a64b2a",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateX(0)" : "translateX(-6px)",
            transition: "opacity 0.4s ease, transform 0.4s ease"
          }}>
            see the recipe ↗
          </span>
        </div>
      </div>
    </div>
  );
};

// ---------- HERO collage ----------
const HeroCollage = ({ isMobile }: { isMobile: boolean }) => {
  const ink = "#2a1f17";
  const rust = "#a64b2a";
  const sage = "#7a8b5c";

  if (isMobile) {
    return (
      <div style={{ position: "relative", width: "100%", marginTop: 40 }}>
        <div style={{ position: "relative", transform: "rotate(1.5deg)" }}>
          <Tape rotate={-6} top={-14} left={40} />
          <Tape rotate={5} top={-10} right={40} />
          <PlaceholderImg label="the boule · cooling" height={260} />
          <div style={{
            position: "absolute", bottom: -18, right: -10,
            background: "#f4ebd9", padding: "6px 12px",
            fontFamily: "'Caveat', cursive", fontSize: 17, color: ink,
            transform: "rotate(4deg)",
            boxShadow: "0 3px 10px rgba(0,0,0,0.15)"
          }}>
            loaf no. 412 ✦ tuesday
          </div>
        </div>
        <StarDoodle size={20} color={rust} style={{ position: "absolute", top: 12, right: 12, transform: "rotate(20deg)" }} />
      </div>
    );
  }

  return (
    <div style={{ position: "relative", width: "100%", height: 580 }}>
      <div style={{ position: "absolute", top: 20, right: 40, width: 360, transform: "rotate(1.5deg)" }}>
        <Tape rotate={-6} top={-14} left={40} />
        <Tape rotate={5} top={-10} right={40} />
        <PlaceholderImg label="the boule · cooling" height={420} />
        <div style={{
          position: "absolute", bottom: -22, right: -14,
          background: "#f4ebd9", padding: "8px 14px",
          fontFamily: "'Caveat', cursive", fontSize: 20, color: ink,
          transform: "rotate(4deg)",
          boxShadow: "0 3px 10px rgba(0,0,0,0.15)"
        }}>
          loaf no. 412 ✦ tuesday
        </div>
      </div>

      <div style={{ position: "absolute", top: 0, left: 20, width: 220, transform: "rotate(-4deg)" }}>
        <Tape rotate={3} top={-10} left={30} width={90} color="rgba(166,75,42,0.4)" />
        <PlaceholderImg label="oho · the starter" height={240} />
        <div style={{
          position: "absolute", top: 8, left: 8,
          background: "#fff", padding: "4px 8px",
          fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
          letterSpacing: "0.2em", color: ink,
          boxShadow: "0 1px 4px rgba(0,0,0,0.15)"
        }}>
          DAY 6
        </div>
      </div>

      <div style={{ position: "absolute", top: 280, left: 60, width: 200, transform: "rotate(3deg)" }}>
        <Tape rotate={-8} top={-10} right={30} width={80} color="rgba(122,139,92,0.5)" />
        <PlaceholderImg label="hands · folding" height={220} />
      </div>

      <div style={{ position: "absolute", bottom: 10, left: 290, width: 170, transform: "rotate(-2deg)", zIndex: 3 }}>
        <PlaceholderImg label="the crumb" height={170} />
        <div style={{
          position: "absolute", bottom: -16, left: 12,
          fontFamily: "'Caveat', cursive", fontSize: 16, color: rust, transform: "rotate(-2deg)"
        }}>
          ← look at this open crumb
        </div>
      </div>

      <WheatDoodle size={56} style={{ position: "absolute", top: -10, right: -20, transform: "rotate(15deg)", opacity: 0.7 }} />
      <StarDoodle size={26} color={rust} style={{ position: "absolute", top: 200, left: 280, transform: "rotate(20deg)" }} />
      <StarDoodle size={18} color={sage} style={{ position: "absolute", bottom: 240, right: 0, transform: "rotate(-10deg)" }} />
      <Arrow size={90} rotate={-15} color={rust} style={{ position: "absolute", top: 220, left: 250, opacity: 0.7 }} />
    </div>
  );
};

// ============================================================
// MAIN
// ============================================================
const DirectionA = () => {
  const ink = "#2a1f17";
  const rust = "#a64b2a";
  const sage = "#7a8b5c";
  const muted = "#5a4a32";

  const [isMobile, setIsMobile] = useState(false);
  const [mobileLoafIndex, setMobileLoafIndex] = useState(0);

  useEffect(() => {
    if (document.getElementById("dirA-fonts")) return;
    const l = document.createElement("link");
    l.id = "dirA-fonts";
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Work+Sans:wght@300;400;500;600&family=Caveat:wght@400;600;700&family=JetBrains+Mono:wght@400&display=swap";
    document.head.appendChild(l);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const loaves: Loaf[] = [
    { name: "The Country Boule", level: "the everyday", note: "the one that started it all", time: "24 hr", weight: "900g · 78% hyd." },
    { name: "Seeded Rye", level: "the dark one", note: "caraway, fennel, a little brown sugar", time: "36 hr", weight: "850g · 72% hyd." },
    { name: "Olive & Rosemary Fougasse", level: "the leaf", note: "studded with olives, eaten warm with hands", time: "18 hr", weight: "700g · 80% hyd." },
    { name: "Walnut & Cranberry", level: "the holiday", note: "toasted walnuts, dried cranberries, a touch of honey", time: "30 hr", weight: "850g · 75% hyd." },
    { name: "Miche", level: "the giant", note: "a 2kg whole-grain wheel, lasts a whole week", time: "48 hr", weight: "2000g · 82% hyd." },
    { name: "Sesame Semolina", level: "the sunny one", note: "durum flour, golden crumb, sesame everywhere", time: "24 hr", weight: "800g · 76% hyd." }
  ];

  const goToPrevLoaf = () => {
    setMobileLoafIndex((current) => (current - 1 + loaves.length) % loaves.length);
  };

  const goToNextLoaf = () => {
    setMobileLoafIndex((current) => (current + 1) % loaves.length);
  };

  const px = (desktop: string | number, mobile: string | number) => isMobile ? mobile : desktop;

  return (
    <Paper style={{ width: "100%", minHeight: 3600, position: "relative", overflow: "hidden" }}>

      {/* NAV */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: isMobile ? "20px 24px" : "28px 120px",
        borderBottom: `1px solid rgba(60,30,10,0.2)`,
        position: "relative", zIndex: 2
      }}>
        <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: isMobile ? 18 : 22, letterSpacing: "0.02em" }}>
          CrispyCrustBoule<span style={{ color: rust }}>.</span>
        </div>
        {/* Nav links — hidden on mobile */}
        {!isMobile && (
          <div style={{ display: "flex", gap: 36, fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            <span>The Craft</span><span>Loaves</span><span>Process</span><span>Visit</span>
          </div>
        )}
        <div style={{ fontFamily: "'Caveat', cursive", fontSize: isMobile ? 18 : 22, color: rust, transform: "rotate(-3deg)" }}>
          est. 2019 ✦
        </div>
      </div>

      {/* HERO */}
      <section style={{ padding: isMobile ? "40px 24px 32px" : "70px 120px 60px", position: "relative" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 560px) 1fr",
          gap: isMobile ? 0 : 32,
          alignItems: "center"
        }}>
          <Reveal>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: isMobile ? 10 : 12,
              letterSpacing: "0.28em", textTransform: "uppercase",
              color: rust, marginBottom: isMobile ? 18 : 28
            }}>
              · a home baker&apos;s field notes ·
            </div>
            <h1 style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: isMobile ? 72 : 124,
              lineHeight: 0.94, margin: 0, fontWeight: 400,
              letterSpacing: "-0.02em"
            }}>
              Bread,<br/>
              <span style={{ fontStyle: "italic", color: rust }}>slowly.</span>
            </h1>
            <p style={{ fontSize: isMobile ? 15 : 18, lineHeight: 1.6, marginTop: isMobile ? 20 : 32, maxWidth: 460, color: muted }}>
              CrispyCrustBoule is a home showcase of seven years&apos; worth of
              sourdough — the loaves, the failures, the recipes that finally
              clicked. No shop, no schedule. Just a working kitchen, a
              six-year-old starter named Oho, and a quiet record of what
              flour and water can do, given time.
            </p>
            <div style={{ marginTop: isMobile ? 28 : 40, display: "flex", gap: 24, alignItems: "center" }}>
              <Stamp rotate={-4}>The Loaves →</Stamp>
              <Stamp rotate={3} color={sage}>meet oho</Stamp>
              {!isMobile && <Squiggle width={80} color={rust} style={{ opacity: 0.7 }} />}
            </div>
          </Reveal>

          <Reveal delay={150}>
            <HeroCollage isMobile={isMobile} />
          </Reveal>
        </div>

        {/* Section divider — hidden on mobile */}
        {!isMobile && (
          <Reveal delay={300}>
            <div style={{
              marginTop: 80, padding: "18px 0",
              borderTop: `1.5px solid ${ink}`, borderBottom: `1.5px solid ${ink}`,
              display: "flex", justifyContent: "space-between",
              fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
              letterSpacing: "0.18em", textTransform: "uppercase"
            }}>
              <span>seven loaves</span>
              <span>· wild yeast ·</span>
              <span>· 72 hr ferment ·</span>
              <span>· stone hearth ·</span>
              <span>· no shortcuts ·</span>
              <span>one starter</span>
            </div>
          </Reveal>
        )}
      </section>

      {/* OUR STORY */}
      <section style={{ padding: isMobile ? "40px 24px" : "60px 120px", position: "relative" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1.4fr",
          gap: isMobile ? 32 : 80
        }}>
          <Reveal>
            <div style={{ position: "relative" }}>
              <Tape rotate={-4} top={-12} left={20} width={130} />
              <PlaceholderImg label="the kitchen counter" height={isMobile ? 260 : 420} tilt={-1.5} />
              <div style={{
                position: "absolute", bottom: 16, left: 16,
                fontFamily: "'Caveat', cursive", fontSize: isMobile ? 15 : 18,
                color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,0.6)"
              }}>
                flour on everything, always
              </div>
              {!isMobile && (
                <div style={{
                  position: "absolute", bottom: -40, right: -28, width: 130,
                  background: "#fff", padding: "8px 8px 22px",
                  transform: "rotate(7deg)",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.18)"
                }}>
                  <PlaceholderImg label="oho · day 6" height={110} />
                  <div style={{
                    position: "absolute", bottom: 4, left: 0, right: 0, textAlign: "center",
                    fontFamily: "'Caveat', cursive", fontSize: 13, color: ink
                  }}>
                    the boss
                  </div>
                </div>
              )}
            </div>
          </Reveal>

          <Reveal delay={isMobile ? 0 : 150}>
            <div style={{ position: "relative" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.25em", color: rust, marginBottom: 16 }}>
                · 01 · OUR STORY ·
              </div>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: isMobile ? 36 : 56, lineHeight: 1.05, margin: "0 0 28px", fontWeight: 400 }}>
                It started with a jar<br/>
                of bubbles on the<br/>
                kitchen counter.
              </h2>
              <div style={{ fontSize: isMobile ? 15 : 17, lineHeight: 1.75, color: muted, columnCount: isMobile ? 1 : 2, columnGap: 32 }}>
                <p style={{ marginTop: 0 }}>
                  Three dead starters, then one that took. Fed every morning
                  with a little rye, a little patience, mostly stubbornness.
                  That fourth jar is still alive on the counter — its name
                  is Oho — and it&apos;s the reason any of this exists.
                </p>
                <p>
                  CrispyCrustBoule isn&apos;t a shop. It&apos;s a record. Seven loaves
                  worth keeping, the process behind each one, and a few
                  notes from the kitchen along the way. No classes, no
                  schedule. Just bread that took its time.
                </p>
              </div>

              <div style={{
                marginTop: 36, padding: "24px 28px 28px",
                borderTop: `1.5px solid ${rust}`,
                borderBottom: `1.5px solid ${rust}`,
                position: "relative",
                background: "rgba(244,235,217,0.5)"
              }}>
                <div style={{
                  position: "absolute", top: -22, left: 24,
                  background: "#e8dcc4", padding: "0 12px",
                  fontFamily: "'DM Serif Display', serif", fontSize: 56, lineHeight: 1, color: rust
                }}>
                  &ldquo;
                </div>
                <p style={{
                  fontFamily: "'DM Serif Display', serif", fontStyle: "italic",
                  fontSize: isMobile ? 19 : 24, lineHeight: 1.4, margin: 0, color: ink
                }}>
                  You can&apos;t ruin sourdough. You can only learn it slower.
                  That&apos;s the whole secret, honestly.
                </p>
              </div>

              <div style={{
                marginTop: 32, display: "flex", justifyContent: "space-between", alignItems: "flex-end"
              }}>
                <div style={{ fontFamily: "'Caveat', cursive", fontSize: isMobile ? 22 : 28, color: ink }}>
                  — the baker <span style={{ color: rust }}>✦</span>
                </div>
                {!isMobile && (
                  <div style={{ fontFamily: "'Caveat', cursive", fontSize: 18, color: sage, transform: "rotate(-2deg)", maxWidth: 220, textAlign: "right" }}>
                    p.s. — oho is the one running the show, mostly ✦
                  </div>
                )}
              </div>

              {!isMobile && (
                <Arrow size={70} rotate={120} color={rust} flip style={{ position: "absolute", top: -20, right: -10, opacity: 0.5 }} />
              )}
            </div>
          </Reveal>
        </div>
        {!isMobile && (
          <LoafDoodle size={90} style={{ position: "absolute", bottom: 20, right: 80, transform: "rotate(-8deg)", opacity: 0.6 }} />
        )}
      </section>

      {/* MEET OHO */}
      <section style={{ padding: isMobile ? "40px 24px" : "70px 120px", borderTop: `1px dashed rgba(60,30,10,0.3)`, position: "relative" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1.3fr 1fr",
          gap: isMobile ? 32 : 16,
          alignItems: "center"
        }}>
          <Reveal style={isMobile ? { order: 2 } : undefined}>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.25em", color: rust, marginBottom: 12 }}>
                · 02 · MEET OHO ·
              </div>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: isMobile ? 56 : 84, margin: "0 0 8px", fontWeight: 400, lineHeight: 0.95, letterSpacing: "-0.01em" }}>
                Oho.<br/><span style={{ fontStyle: "italic", color: rust, fontSize: isMobile ? 36 : 56 }}>age six, going strong.</span>
              </h2>
              <p style={{ fontSize: isMobile ? 15 : 17, lineHeight: 1.75, marginTop: 28, maxWidth: 480, color: muted }}>
                Oho is a sourdough starter. A jar of flour and water, a
                little wild yeast, a six-year habit of being fed before the
                coffee. Every loaf on this site rises because of Oho.
              </p>

              <div style={{
                marginTop: 36, display: "grid", gridTemplateColumns: "auto 1fr", rowGap: 10, columnGap: 28,
                fontFamily: "'JetBrains Mono', monospace", fontSize: isMobile ? 12 : 13, lineHeight: 1.5
              }}>
                {[
                  ["born", "a tuesday in march, 2020"],
                  ["fed with", "50/50 rye + bread flour, filtered water"],
                  ["lives in", "a 16oz weck jar, on the counter"],
                  ["smells like", "green apples on a good day, vinegar on a bad one"],
                  ["doubles in", "≈ 6 hours @ 72°F"],
                  ["has survived", "two moves, one power outage, a long vacation"],
                  ["temperament", "patient, opinionated about temperature"]
                ].map(([k, v], i) => (
                  <React.Fragment key={i}>
                    <span style={{ color: rust, textTransform: "uppercase", letterSpacing: "0.12em" }}>{k}</span>
                    <span style={{ color: ink }}>{v}</span>
                  </React.Fragment>
                ))}
              </div>

              <div style={{
                marginTop: 36, fontFamily: "'Caveat', cursive", fontSize: isMobile ? 18 : 24, color: sage, transform: "rotate(-1deg)", maxWidth: 460
              }}>
                yes — oho is short for the noise that came out the first time it doubled overnight ✦
              </div>
            </div>
          </Reveal>

          <Reveal delay={isMobile ? 0 : 150} style={isMobile ? { order: 1 } : undefined}>
            <div style={{ position: "relative", height: isMobile ? 320 : 540 }}>
              <div style={{
                position: "absolute", top: 20, left: isMobile ? 0 : 40, width: isMobile ? "85%" : 320,
                background: "#fff", padding: "14px 14px 56px",
                transform: "rotate(-3deg)",
                boxShadow: "0 14px 32px rgba(0,0,0,0.22)"
              }}>
                <Tape rotate={4} top={-12} left={90} width={120} color="rgba(166,75,42,0.5)" />
                <PlaceholderImg label="oho · this morning" height={isMobile ? 200 : 360} />
                <div style={{
                  position: "absolute", bottom: 14, left: 0, right: 0, textAlign: "center",
                  fontFamily: "'Caveat', cursive", fontSize: isMobile ? 17 : 22, color: ink
                }}>
                  oho, fed at 7am ✦
                </div>
              </div>

              {!isMobile && (
                <div style={{
                  position: "absolute", bottom: 0, right: 20, width: 250,
                  background: "#f4ebd9", padding: "16px 18px",
                  transform: "rotate(4deg)",
                  border: `1px dashed ${rust}`,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.15)"
                }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.18em", color: rust, marginBottom: 10 }}>
                    FEEDING CARD · WK 312
                  </div>
                  <div style={{ fontFamily: "'Caveat', cursive", fontSize: 18, lineHeight: 1.5, color: ink }}>
                    mon ✓ tue ✓ wed ✓<br/>
                    thu ✓ fri ✓ sat —<br/>
                    sun: rest in fridge
                  </div>
                  <StarDoodle size={20} color={sage} style={{ position: "absolute", top: -10, right: -8, transform: "rotate(20deg)" }} />
                </div>
              )}

              <Squiggle width={120} color={rust} style={{ position: "absolute", top: 10, right: 0, transform: "rotate(20deg)", opacity: 0.6 }} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* THE LOAVES — hero on mobile, 3-col grid on desktop */}
      <section style={{ borderTop: `1px dashed rgba(60,30,10,0.3)` }}>
        {isMobile ? (
          /* ── MOBILE: hero-style ── */
          <>
            <div style={{
              padding: "56px 24px 40px",
              textAlign: "center",
              position: "relative",
              background: "rgba(244,235,217,0.4)"
            }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.25em", color: rust, marginBottom: 14 }}>
                · 03 · THE LOAVES ·
              </div>
              <h2 style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 52, margin: 0, fontWeight: 400, lineHeight: 1.0, letterSpacing: "-0.01em"
              }}>
                What we bake<br/><span style={{ fontStyle: "italic", color: rust }}>together.</span>
              </h2>
              <div style={{ fontFamily: "'Caveat', cursive", fontSize: 18, color: muted, marginTop: 16 }}>
                six loaves — each one fed by oho ✦
              </div>
              <Squiggle width={80} color={rust} style={{ margin: "20px auto 0", opacity: 0.6, display: "block" }} />
            </div>
            <div style={{ padding: "32px 24px 40px" }}>
              <Reveal key={mobileLoafIndex}>
                <LoafCard loaf={loaves[mobileLoafIndex]} idx={mobileLoafIndex} isMobile={true} />
              </Reveal>
              <div style={{
                marginTop: 28,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <button
                  onClick={goToPrevLoaf}
                  aria-label="Show previous loaf"
                  style={{
                    border: `1px solid ${muted}`,
                    background: "transparent",
                    color: ink,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    padding: "10px 14px",
                    cursor: "pointer"
                  }}
                >
                  ← Prev
                </button>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: muted
                }}>
                  {String(mobileLoafIndex + 1).padStart(2, "0")} / {String(loaves.length).padStart(2, "0")}
                </div>
                <button
                  onClick={goToNextLoaf}
                  aria-label="Show next loaf"
                  style={{
                    border: `1px solid ${muted}`,
                    background: "transparent",
                    color: ink,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    padding: "10px 14px",
                    cursor: "pointer"
                  }}
                >
                  Next →
                </button>
              </div>
              <div style={{ marginTop: 18, display: "flex", justifyContent: "center", gap: 8 }}>
                {loaves.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMobileLoafIndex(idx)}
                    aria-label={`Show loaf ${idx + 1}`}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      border: "none",
                      background: idx === mobileLoafIndex ? rust : "rgba(90,74,50,0.35)",
                      padding: 0,
                      cursor: "pointer"
                    }}
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          /* ── DESKTOP: original layout ── */
          <div style={{ padding: "80px 120px" }}>
            <Reveal>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 48 }}>
                <div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.25em", color: rust, marginBottom: 12 }}>
                    · 03 · THE LOAVES ·
                  </div>
                  <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 64, margin: 0, fontWeight: 400, letterSpacing: "-0.01em" }}>
                    What we bake <span style={{ fontStyle: "italic" }}>together.</span>
                  </h2>
                </div>
                <div style={{ fontFamily: "'Caveat', cursive", fontSize: 22, color: muted, maxWidth: 320, transform: "rotate(-1deg)" }}>
                  seven loaves on the rotation — each one fed by oho, each one its own afternoon ✦
                </div>
              </div>
            </Reveal>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 36 }}>
              {loaves.map((loaf, i) => (
                <Reveal key={i} delay={i * 120}>
                  <LoafCard loaf={loaf} idx={i} isMobile={false} />
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* PROCESS */}
      <Reveal>
        <section style={{
          margin: isMobile ? "32px 24px" : "60px 120px",
          padding: isMobile ? "40px 24px 40px 40px" : "60px 56px",
          background: "#f4ebd9",
          backgroundImage: "repeating-linear-gradient(transparent, transparent 38px, rgba(120,90,40,0.18) 38px, rgba(120,90,40,0.18) 39px)",
          position: "relative",
          boxShadow: "0 4px 18px rgba(0,0,0,0.08)"
        }}>
          <div style={{ position: "absolute", left: isMobile ? 52 : 84, top: 0, bottom: 0, width: 1, background: "rgba(180,60,40,0.4)" }} />
          {!isMobile && <Tape rotate={-4} top={-14} left="45%" />}

          <div style={{ marginLeft: isMobile ? 24 : 48 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.25em", color: rust, marginBottom: 12 }}>
              · 04 · THE PROCESS ·
            </div>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: isMobile ? 40 : 56, margin: "0 0 40px", fontWeight: 400, lineHeight: 1.05 }}>
              Five days, mostly<br/><span style={{ fontStyle: "italic", color: rust }}>waiting.</span>
            </h2>

            <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 28 }}>
              {[
                { d: "Mon", t: "Feed Oho", n: "50g flour, 50g water. Doubles in 6 hours. Smells like green apples on a good day." },
                { d: "Tue", t: "Mix the dough", n: "Flour, water, salt, levain. Rest 30 min. Then fold every half hour, four times." },
                { d: "Tue pm", t: "Bulk ferment", n: "On the counter until it's puffy and jiggly. About 5 hours in winter, 3 in summer." },
                { d: "Wed", t: "Shape & cold proof", n: "Pre-shape, bench rest, final shape into a banneton. Into the fridge, overnight." },
                { d: "Thu", t: "Bake", n: "Dutch oven, 500°F, 20 min lid on, 25 min lid off. Listen for the crackle." }
              ].map((step, i) => (
                <li key={i} style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "56px 1fr" : "60px 100px 1fr",
                  gap: isMobile ? 12 : 24,
                  alignItems: "baseline"
                }}>
                  {isMobile ? (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2 }}>
                      <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: rust, fontStyle: "italic" }}>0{i+1}</span>
                      <span style={{ fontFamily: "'Caveat', cursive", fontSize: 18, color: sage, lineHeight: 1 }}>{step.d}</span>
                    </div>
                  ) : (
                    <>
                      <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: rust, fontStyle: "italic" }}>0{i+1}</span>
                      <span style={{ fontFamily: "'Caveat', cursive", fontSize: 24, color: sage }}>{step.d}</span>
                    </>
                  )}
                  <div>
                    <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: isMobile ? 19 : 24, marginBottom: 4 }}>{step.t}</div>
                    <div style={{ fontSize: isMobile ? 13 : 15, color: muted, lineHeight: 1.6 }}>{step.n}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </Reveal>

      {/* CONTACT */}
      <Reveal>
        <section style={{
          margin: isMobile ? "32px 0 0" : "40px 120px 80px",
          padding: isMobile ? "40px 28px" : "64px 56px",
          background: ink, color: "#f4ebd9", position: "relative"
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1fr",
            gap: isMobile ? 40 : 32
          }}>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.25em", color: "#d4a574", marginBottom: 12 }}>
                · 06 · ADOPT A PIECE OF OHO ·
              </div>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: isMobile ? 48 : 72, margin: 0, fontWeight: 400, lineHeight: 1 }}>
                Want a piece<br/><span style={{ fontStyle: "italic", color: "#d4a574" }}>of Oho?</span>
              </h2>
              <p style={{ fontSize: isMobile ? 15 : 17, lineHeight: 1.7, marginTop: 28, maxWidth: 460, color: "#e8dcc4" }}>
                Oho is six years old and there&apos;s plenty to share. If you&apos;re
                serious about sourdough and ready to take good care of a
                live starter — feed it, name it, keep it alive — write in.
                A jar can be packed and handed off, with a feeding card and
                a first-week schedule.
              </p>
              <p style={{ fontSize: 14, lineHeight: 1.7, marginTop: 18, maxWidth: 460, color: "#d4a574", fontStyle: "italic" }}>
                For committed home bakers only. No casual takers — Oho has
                been kept alive too long to end up forgotten on a shelf.
              </p>
              <div style={{ marginTop: 32, fontFamily: "'Caveat', cursive", fontSize: isMobile ? 22 : 30, color: "#d4a574" }}>
                hello@crispycrustboule.co
              </div>
            </div>
            <div style={{ paddingLeft: 0, paddingTop: 0 }}>
              <div style={{ fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 18, color: "#d4a574" }}>
                Adopt a piece of Oho
              </div>
              <div style={{ fontSize: isMobile ? 14 : 15, lineHeight: 1.8 }}>
                · tell us about your kitchen<br/>
                · how you&apos;ll feed it weekly<br/>
                · your first loaf plan<br/>
                <span style={{ fontStyle: "italic", color: "#d4a574" }}>we&apos;ll write back if it&apos;s a fit</span>
              </div>
              <div style={{ marginTop: 32, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 14, color: "#d4a574" }}>
                Elsewhere
              </div>
              <div style={{ fontSize: isMobile ? 14 : 15, lineHeight: 1.8 }}>
                instagram · @crispycrustboule<br/>
                substack · the slow loaf
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* FOOTER */}
      <div style={{
        padding: isMobile ? "24px 24px" : "32px 120px",
        borderTop: `1px solid rgba(60,30,10,0.2)`,
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between",
        alignItems: isMobile ? "center" : undefined,
        gap: isMobile ? 8 : 0,
        fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: muted,
        textAlign: isMobile ? "center" : undefined
      }}>
        <span>© CrispyCrustBoule · MMXXVI</span>
        <span style={{ fontFamily: "'Caveat', cursive", textTransform: "none", letterSpacing: 0, fontSize: 18, color: rust }}>
          sourdough done right ✦
        </span>
        <span>made with flour</span>
      </div>
    </Paper>
  );
};

export default DirectionA;

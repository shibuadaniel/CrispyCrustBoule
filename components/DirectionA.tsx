'use client';

import React, { useEffect, useRef, useState, ReactNode, CSSProperties } from 'react';

// ---------- atoms ----------
const Paper = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => (
  <div style={{
    backgroundColor: "#e8dcc4",
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
    backgroundColor: color,
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

const LOAF_IMAGE_PATHS = [
  "/images/loaves/loaf1-cinnamonraisin.png",
  "/images/loaves/loaf2-cranberrywalnut.png",
  "/images/loaves/loaf3-jalepinocheddar.png",
  "/images/loaves/loaf4-quinoarye.png",
  "/images/loaves/loaf5-doublechocolate.png",
  "/images/loaves/loaf6-wholewheat.png"
] as const;

const LoafCard = ({ loaf, idx, isMobile }: { loaf: Loaf; idx: number; isMobile: boolean }) => {
  const [hovered, setHovered] = useState(false);
  const baseTilt = idx === 1 ? -1 : 1;
  const photoHeight = isMobile ? 300 : 400;
  const src = LOAF_IMAGE_PATHS[idx] ?? LOAF_IMAGE_PATHS[0];
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
        <div style={{
          height: photoHeight,
          width: "100%",
          border: "1px solid rgba(60,30,10,0.3)",
          background: "#e8dcc4",
          position: "relative",
          overflow: "hidden"
        }}>
          <img
            src={src}
            alt={loaf.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block"
            }}
          />
          {hovered && isMobile && (
            <div style={{
              position: "absolute",
              left: "50%",
              bottom: 10,
              transform: "translateX(-50%)",
              background: "#e8dcc4",
              padding: "4px 10px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              letterSpacing: "0.08em",
              color: "#3a2a18",
              textTransform: "uppercase",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              maxWidth: "92%",
              textAlign: "center"
            }}>
              {loaf.weight}
            </div>
          )}
        </div>
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
const HeroFirstLoafImg = ({ height, isMobile }: { height: number; isMobile: boolean }) => (
  <div style={{
    height,
    width: "100%",
    border: "1px solid rgba(60,30,10,0.3)",
    boxShadow: "0 4px 14px rgba(0,0,0,0.18)",
    position: "relative",
    overflow: "hidden",
    background: "#e8dcc4"
  }}>
    <img
      src="/images/hero/first-loaf.png"
      alt="The very first boule"
      style={{
        position: "absolute",
        inset: -3,
        width: "calc(100% + 6px)",
        height: "calc(100% + 6px)",
        objectFit: "cover",
        objectPosition: "center 62%",
        transform: "scale(1.03)",
        display: "block"
      }}
    />
    {isMobile && (
      <span style={{
        position: "absolute",
        left: "50%",
        bottom: 22,
        transform: "translateX(-50%)",
        background: "#e8dcc4",
        padding: "5px 10px",
        color: "#3a2a18",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 9,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        textAlign: "center",
        whiteSpace: "nowrap",
        maxWidth: "calc(100% - 20px)",
        boxSizing: "border-box",
        boxShadow: "0 2px 8px rgba(0,0,0,0.12)"
      }}>
        THE VERY FIRST BOULE
      </span>
    )}
  </div>
);

/** Desktop hero collage only — small polaroid-style loaf shots */
const HeroCollageLoafImg = ({ src, height, alt }: { src: string; height: number; alt: string }) => (
  <div style={{
    height,
    width: "100%",
    border: "1px solid rgba(60,30,10,0.3)",
    boxShadow: "0 4px 14px rgba(0,0,0,0.18)",
    overflow: "hidden",
    background: "#e8dcc4",
    position: "relative"
  }}>
    <img
      src={src}
      alt={alt}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center",
        display: "block"
      }}
    />
  </div>
);

const HeroCollage = ({ isMobile }: { isMobile: boolean }) => {
  const ink = "#2a1f17";
  const rust = "#a64b2a";
  const sage = "#7a8b5c";

  if (isMobile) {
    return (
      <div style={{ position: "relative", width: "100%", marginTop: 40 }}>
        <div style={{ position: "relative", transform: "rotate(1.5deg)" }}>
          <Tape rotate={-6} top={-9} left={48} width={72} height={17} />
          <Tape rotate={5} top={-7} right={48} width={72} height={17} />
          <HeroFirstLoafImg height={260} isMobile={true} />
          <div style={{
            position: "absolute", bottom: -14, right: -7,
            background: "#f4ebd9", padding: "3px 7px",
            fontFamily: "'Caveat', cursive", fontSize: 12, color: ink,
            transform: "rotate(4deg)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.12)"
          }}>
            July 14, 2020 @ 5:37 PM
          </div>
        </div>
        <StarDoodle size={20} color={rust} style={{ position: "absolute", top: 12, right: 12, transform: "rotate(20deg)" }} />
      </div>
    );
  }

  return (
    <div style={{ position: "relative", width: "100%", height: 580 }}>
      <div style={{ position: "absolute", top: 20, right: 40, width: 360, transform: "rotate(1.5deg)" }}>
        <Tape rotate={-6} top={-10} left={52} width={82} height={19} />
        <Tape rotate={5} top={-8} right={52} width={82} height={19} />
        <HeroFirstLoafImg height={420} isMobile={false} />
      </div>

      <div style={{ position: "absolute", top: 0, left: 20, width: 220, transform: "rotate(-4deg)" }}>
        <Tape rotate={3} top={-10} left={30} width={90} color="rgba(166,75,42,0.4)" />
        <HeroCollageLoafImg src="/images/hero/hero-loaf2.png" height={240} alt="Boule from the home oven" />
      </div>

      <div style={{ position: "absolute", top: 280, left: 60, width: 200, transform: "rotate(3deg)" }}>
        <Tape rotate={-8} top={-10} right={30} width={80} color="rgba(122,139,92,0.5)" />
        <HeroCollageLoafImg src="/images/hero/hero-loaf3.png" height={220} alt="Loaf on the peel" />
      </div>

      <div style={{ position: "absolute", bottom: 10, left: 290, width: 170, transform: "rotate(-2deg)", zIndex: 3 }}>
        <HeroCollageLoafImg src="/images/hero/hero-loaf4.png" height={170} alt="Open crumb" />
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
    { name: "Cinnamon raisin", level: "sweet & spiced", note: "Soft crumb with a cinnamon swirl and plenty of plump raisins — weekend toast energy.", time: "24 hr", weight: "900g · 78% hyd." },
    { name: "Cranberry walnut", level: "tart & nutty", note: "Dried cranberries, toasted walnuts, and a touch of sweetness — sharp, earthy, a little festive.", time: "30 hr", weight: "850g · 75% hyd." },
    { name: "Jalapeño cheddar", level: "savory & bold", note: "Diced jalapeño and sharp cheddar folded through the dough — best warm, with something cold to drink.", time: "24 hr", weight: "850g · 76% hyd." },
    { name: "Rye + tri-color quinoa", level: "hearty rye", note: "Rye-forward sourdough with tri-color quinoa in the mix — nutty chew, deep color, serious slice.", time: "36 hr", weight: "850g · 72% hyd." },
    { name: "Double chocolate", level: "dark & rich", note: "Cocoa in the dough plus chocolate in the crumb — closer to cake than sandwich bread, in the best way.", time: "24 hr", weight: "900g · 78% hyd." },
    { name: "Whole wheat", level: "everyday table", note: "100% whole grain, slow ferment, straight wheat flavor — the loaf that earns a permanent spot on the board.", time: "24 hr", weight: "900g · 78% hyd." }
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
              fontSize: isMobile ? 56 : 98,
              lineHeight: 0.94, margin: 0, fontWeight: 400,
              letterSpacing: "-0.02em",
              display: "flex",
              justifyContent: "flex-start",
              paddingLeft: isMobile ? 10 : 36
            }}>
              <span style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                columnGap: isMobile ? 16 : 28,
                flexWrap: "nowrap",
                width: "fit-content",
                maxWidth: "100%"
              }}>
                <span
                  aria-hidden
                  style={{
                    width: isMobile ? 106 : 188,
                    height: isMobile ? 78 : 138,
                    display: "inline-flex",
                    alignItems: "center",
                    flexShrink: 0
                  }}
                >
                  <img
                    src="/images/logo.svg"
                    alt=""
                    style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
                  />
                </span>
                <span style={{ textAlign: "right", display: "block", flex: "0 0 auto" }}>
                  Bread,<br/>
                  <span style={{ fontStyle: "italic", color: rust }}>slowly.</span>
                </span>
              </span>
            </h1>
            <p style={{ fontSize: isMobile ? 15 : 18, lineHeight: 1.6, marginTop: isMobile ? 20 : 32, maxWidth: 460, color: muted }}>
              CrispyCrustBoule is a home showcase of six years&apos; worth of
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

      </section>

      {/* OUR STORY */}
      <section style={{ padding: isMobile ? "40px 24px" : "60px 120px", position: "relative" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1.4fr",
          gap: isMobile ? 32 : 80,
          alignItems: isMobile ? undefined : "center"
        }}>
          <Reveal>
            <div style={{ position: "relative" }}>
              <Tape rotate={-4} top={-12} left={20} width={130} />
              <div style={{
                height: isMobile ? 260 : 420,
                width: "100%",
                position: "relative",
                transform: "rotate(-1.5deg)",
                border: "1px solid rgba(60,30,10,0.3)",
                boxShadow: "0 4px 14px rgba(0,0,0,0.18)",
                overflow: "hidden",
                background: "#e8dcc4"
              }}>
                <img
                  src="/images/hero/the-beginning.png"
                  alt="The kitchen counter"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center 72%",
                    display: "block"
                  }}
                />
                {isMobile && (
                  <span style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    background: "#e8dcc4",
                    padding: "4px 10px",
                    color: "#3a2a18",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    textAlign: "center",
                    maxWidth: "90%",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                  }}>
                    the kitchen counter
                  </span>
                )}
              </div>
              {isMobile && (
                <div style={{
                  position: "absolute", bottom: 16, left: 16,
                  fontFamily: "'Caveat', cursive", fontSize: 15,
                  color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,0.6)"
                }}>
                  flour on everything, always
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
              <div style={{ fontSize: isMobile ? 15 : 17, lineHeight: 1.75, color: muted, maxWidth: isMobile ? undefined : 640 }}>
                <p style={{ marginTop: 0 }}>
                  The very first starter took off — bubbles, rise, the whole
                  deal. Fed every morning with a little rye, a little patience,
                  mostly stubbornness. That same jar is still alive on the
                  counter — its name is Oho — and it&apos;s the reason any of
                  this exists.
                </p>
                <p>
                  CrispyCrustBoule isn&apos;t a shop. It&apos;s a record. Six loaves
                  worth keeping — cinnamon raisin, cranberry walnut, jalapeño cheddar,
                  rye with tri-color quinoa, double chocolate, and whole wheat — plus
                  the process behind each one and a few notes from the kitchen along
                  the way. No classes, no schedule. Just bread that took its time.
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
                {isMobile && (
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
                  ["born", "a tuesday in july, 2020"],
                  ["fed with", "10/90 dark rye + all-purpose flour, water"],
                  ["lives in", "a 6oz mason jar, in the fridge"],
                  ["smells like", "green apples on a good day, vinegar on a bad one"],
                  ["doubles in", "≈ 6 hours @ 72°F"],
                  ["has survived", "one power outage, multiple long vacations"],
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
                <div style={{
                  position: "relative",
                  height: isMobile ? 200 : 360,
                  width: "100%",
                  overflow: "hidden",
                  background: "#e8dcc4",
                  border: "1px solid rgba(60,30,10,0.2)"
                }}>
                  <img
                    src="/images/OHO-the-starter.png"
                    alt="Oho in action"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                      display: "block"
                    }}
                  />
                </div>
                {isMobile && (
                  <div style={{
                    position: "absolute", bottom: 14, left: 0, right: 0, textAlign: "center",
                    fontFamily: "'Caveat', cursive", fontSize: 17, color: ink
                  }}>
                    Oho in action! ✦
                  </div>
                )}
              </div>

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
                Cinnamon raisin through whole wheat — six loaves, each one fed by oho ✦
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
                  The lineup: sweet, savory, rye, chocolate, and a true whole wheat — all on rotation, all from oho ✦
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
          backgroundColor: "#f4ebd9",
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
              3 days, mostly<br/><span style={{ fontStyle: "italic", color: rust }}>waiting.</span>
            </h2>

            <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 28 }}>
              {[
                { d: "Tue", t: "Feed Oho", n: "50g flour, 50g water. Doubles in 6 hours. Smells like green apples on a good day." },
                { d: "Tue", t: "Mix the dough", n: "Flour, water, salt, levain. Rest 30 min. Then fold every half hour, four times." },
                { d: "Tue pm", t: "Bulk ferment", n: "On the counter until it's puffy and jiggly. About 5 hours in winter, 3 in summer." },
                { d: "Overnight", t: "Cold proof", n: "Pre-shape, bench rest, final shape into a banneton. Into the fridge until morning." },
                { d: "Wed am", t: "Bake", n: "Dutch oven, 500°F, 20 min lid on, 25 min lid off. Listen for the crackle." }
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
                crispycrustboule@gmail.com
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

'use client';

import Link from 'next/link';
import {
  Paper,
  Tape,
  Reveal,
  ResultStamp,
  SiteFooter,
  useScrapbookFonts,
  useIsMobile,
  colors,
} from '@/components/scrapbook';
import {
  trials,
  getCurrentBest,
  cardFlag,
  type Trial,
} from '@/lib/gf-trials';

const TrialCard = ({
  trial,
  isMobile,
  compact = false,
}: {
  trial: Trial;
  isMobile: boolean;
  compact?: boolean;
}) => {
  const flag = cardFlag(trial.status);
  return (
    <Link
      href={`/gluten-free/${trial.slug}`}
      style={{
        display: "block",
        textDecoration: "none",
        color: "inherit",
        background: compact ? "transparent" : colors.lightPaper,
        border: compact ? "none" : `1px solid rgba(60,30,10,0.2)`,
        padding: compact ? "4px 0 4px 28px" : isMobile ? "22px 20px" : "28px 28px",
        position: "relative",
        boxShadow: compact ? "none" : "0 4px 14px rgba(0,0,0,0.08)",
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "8px 14px", marginBottom: 8 }}>
        <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: compact ? (isMobile ? 26 : 32) : (isMobile ? 32 : 40), fontWeight: 400, lineHeight: 1 }}>
          {trial.version}
        </span>
        <span style={{ fontFamily: "'Caveat', cursive", fontSize: isMobile ? 16 : 20, color: colors.sage }}>
          {trial.dateLabel}
        </span>
        {flag && (
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: trial.status === "current-best" ? colors.sage : colors.muted,
            border: `1px solid ${trial.status === "current-best" ? colors.sage : "rgba(60,30,10,0.25)"}`,
            padding: "2px 8px",
          }}>
            {flag}
          </span>
        )}
        <span style={{ marginLeft: "auto" }}>
          <ResultStamp tone={trial.tone}>{trial.resultTag}</ResultStamp>
        </span>
      </div>
      <p style={{ margin: 0, fontSize: isMobile ? 14 : 16, lineHeight: 1.6, color: colors.muted, maxWidth: 560 }}>
        {trial.summary}
      </p>
      {trial.includes && (
        <p style={{ margin: "10px 0 0", fontFamily: "'Caveat', cursive", fontSize: isMobile ? 15 : 17, color: colors.sage }}>
          Includes v1.1, which only added the starter feed.
        </p>
      )}
      {!compact && (
        <div style={{ marginTop: 16, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.12em", color: colors.rust }}>
          open trial →
        </div>
      )}
    </Link>
  );
};

export default function GlutenFreeTimeline() {
  const isMobile = useIsMobile();
  useScrapbookFonts();
  const currentBest = getCurrentBest();

  return (
    <div style={{ margin: 0, background: colors.darkGround, minHeight: "100vh", width: "100%" }}>
      <Paper style={{ width: "100%", minHeight: "100vh", position: "relative", overflow: "hidden" }}>
        <div style={{
          width: "100%",
          maxWidth: 760,
          margin: "0 auto",
          padding: isMobile ? "32px 24px 0" : "48px 32px 0",
          boxSizing: "border-box",
        }}>
          <Link
            href="/"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              letterSpacing: "0.12em",
              color: colors.muted,
              textDecoration: "none",
            }}
          >
            ← back to CrispyCrustBoule
          </Link>
        </div>

        <section style={{
          width: "100%",
          maxWidth: 760,
          margin: "0 auto",
          padding: isMobile ? "16px 24px 40px" : "16px 32px 56px",
          boxSizing: "border-box",
        }}>
          <Reveal>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.25em", color: colors.rust, marginBottom: 14 }}>
              · gluten-free field notes ·
            </div>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: isMobile ? 44 : 72, margin: 0, fontWeight: 400, lineHeight: 1.02 }}>
              Gluten-free, <span style={{ fontStyle: "italic", color: colors.rust }}>slowly.</span>
            </h1>
            <p style={{ fontSize: isMobile ? 15 : 17, lineHeight: 1.7, marginTop: 20, maxWidth: 560, color: colors.muted }}>
              Every trial at a gluten-free sourdough loaf, newest first. Tap one to see what changed, how it baked, and the full recipe.
            </p>
            <p style={{
              marginTop: 20,
              padding: "14px 16px",
              background: "rgba(166,75,42,0.08)",
              borderLeft: `3px solid ${colors.rust}`,
              fontSize: isMobile ? 14 : 15,
              lineHeight: 1.65,
              color: colors.ink,
              maxWidth: 560,
            }}>
              These loaves use their own gluten-free starter (light buckwheat, sorghum and brown rice flour), not Oho.
            </p>
          </Reveal>
        </section>

        {currentBest && (
          <section style={{
            width: "100%",
            maxWidth: 760,
            margin: "0 auto",
            padding: isMobile ? "0 24px 40px" : "0 32px 56px",
            boxSizing: "border-box",
          }}>
            <Reveal>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.25em", color: colors.rust, marginBottom: 16 }}>
                · current best ·
              </div>
              <div style={{
                position: "relative",
                transform: "rotate(-0.6deg)",
              }}>
                <Tape rotate={-3} top={-12} left={isMobile ? 40 : 80} width={120} />
                <TrialCard trial={currentBest} isMobile={isMobile} />
              </div>
            </Reveal>
          </section>
        )}

        <section style={{
          width: "100%",
          maxWidth: 760,
          margin: "0 auto",
          padding: isMobile ? "0 24px 48px" : "0 32px 80px",
          boxSizing: "border-box",
        }}>
          <Reveal>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.25em", color: colors.rust, marginBottom: 24 }}>
              · all trials ·
            </div>
            <div style={{ position: "relative" }}>
              <div style={{
                position: "absolute",
                left: 8,
                top: 8,
                bottom: 8,
                width: 1,
                background: "rgba(180,60,40,0.4)",
              }} />
              <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 28 }}>
                {trials.map((trial, i) => (
                  <li key={trial.slug} style={{ position: "relative" }}>
                    <span style={{
                      position: "absolute",
                      left: 3,
                      top: 14,
                      width: 11,
                      height: 11,
                      borderRadius: "50%",
                      background: colors.lightPaper,
                      border: `2px solid ${colors.rust}`,
                      zIndex: 1,
                    }} />
                    <Reveal delay={i * 60}>
                      <TrialCard trial={trial} isMobile={isMobile} compact />
                    </Reveal>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </section>

        <SiteFooter isMobile={isMobile} />
      </Paper>
    </div>
  );
}

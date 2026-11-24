'use client';

import Image from 'next/image';
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
  getNeighbours,
  getOlderTrial,
  statusLabel,
  type IngredientRow,
  type MethodStep,
  type RecipeBlock,
  type Trial,
} from '@/lib/gf-trials';

const TagChip = ({ tag }: { tag: string }) => (
  <span style={{
    display: "inline-block",
    marginLeft: 8,
    padding: "1px 8px",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 9,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: colors.rust,
    border: `1px solid ${colors.rust}`,
  }}>
    {tag}
  </span>
);

const RecipeTable = ({ rows }: { rows: IngredientRow[] }) => (
  <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch", marginBottom: 16 }}>
    <table style={{
      width: "100%",
      minWidth: 320,
      borderCollapse: "collapse",
      fontSize: 14,
      fontVariantNumeric: "tabular-nums",
    }}>
      <thead>
        <tr style={{ borderBottom: `1px solid rgba(60,30,10,0.25)` }}>
          <th style={{ textAlign: "left", padding: "8px 10px 8px 0", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: colors.muted, fontWeight: 400 }}>Item</th>
          <th style={{ textAlign: "right", padding: "8px 10px", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: colors.muted, fontWeight: 400 }}>Grams</th>
          <th style={{ textAlign: "right", padding: "8px 0 8px 10px", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: colors.muted, fontWeight: 400 }}>%</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => {
          if ("group" in row && row.group) {
            return (
              <tr key={i}>
                <td colSpan={3} style={{
                  padding: "14px 0 6px",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: colors.rust,
                }}>
                  {row.group}
                </td>
              </tr>
            );
          }
          if ("note" in row && row.note) {
            return (
              <tr key={i}>
                <td colSpan={3} style={{ padding: "6px 0", fontSize: 13, color: colors.muted, fontStyle: "italic" }}>
                  {row.note}
                </td>
              </tr>
            );
          }
          if ("item" in row && row.item) {
            return (
              <tr key={i} style={{ borderBottom: `1px solid rgba(60,30,10,0.08)` }}>
                <td style={{ padding: "8px 10px 8px 0", verticalAlign: "top" }}>
                  {row.item}
                  {row.tag && <TagChip tag={row.tag} />}
                  {row.was && (
                    <div style={{ marginTop: 2, fontSize: 12, color: colors.muted }}>{row.was}</div>
                  )}
                </td>
                <td style={{ padding: "8px 10px", textAlign: "right", verticalAlign: "top", whiteSpace: "nowrap" }}>{row.grams}</td>
                <td style={{ padding: "8px 0 8px 10px", textAlign: "right", verticalAlign: "top", whiteSpace: "nowrap" }}>{row.percent}</td>
              </tr>
            );
          }
          return null;
        })}
      </tbody>
    </table>
  </div>
);

const MethodList = ({ steps }: { steps: MethodStep[] }) => (
  <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 18 }}>
    {steps.map((step, i) => (
      <li key={i} style={{ display: "grid", gridTemplateColumns: "36px 1fr", gap: 12 }}>
        <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: colors.rust, fontStyle: "italic" }}>
          {String(i + 1).padStart(2, "0")}
        </span>
        <div>
          <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, marginBottom: 4 }}>
            {step.title}
            {step.tag && <TagChip tag={step.tag} />}
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.65, color: colors.muted }}>{step.text}</div>
          {step.note && (
            <div style={{ marginTop: 6, fontSize: 13, color: colors.muted, fontStyle: "italic" }}>{step.note}</div>
          )}
        </div>
      </li>
    ))}
  </ol>
);

const RecipeFold = ({ starter, ingredients, method }: {
  starter?: RecipeBlock;
  ingredients: RecipeBlock;
  method: MethodStep[];
}) => (
  <details style={{
    backgroundColor: colors.lightPaper,
    backgroundImage: "repeating-linear-gradient(transparent, transparent 38px, rgba(120,90,40,0.18) 38px, rgba(120,90,40,0.18) 39px)",
    padding: "20px 22px 28px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
    position: "relative",
  }}>
    <summary style={{
      cursor: "pointer",
      fontFamily: "'DM Serif Display', serif",
      fontSize: 24,
      listStyle: "none",
      color: colors.ink,
      marginBottom: 8,
    }}>
      Full recipe
      <span style={{
        marginLeft: 12,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
        letterSpacing: "0.12em",
        color: colors.rust,
      }}>
        (tap to open)
      </span>
    </summary>

    {starter && (
      <div style={{ marginTop: 28 }}>
        <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, margin: "0 0 14px", fontWeight: 400 }}>
          {starter.title ?? "Starter build"}
        </h3>
        <RecipeTable rows={starter.rows} />
        {starter.steps && <MethodList steps={starter.steps} />}
        {starter.foot && (
          <p style={{ marginTop: 14, fontSize: 13, color: colors.muted, fontStyle: "italic" }}>{starter.foot}</p>
        )}
      </div>
    )}

    <div style={{ marginTop: 32 }}>
      <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, margin: "0 0 14px", fontWeight: 400 }}>
        Ingredients
      </h3>
      <RecipeTable rows={ingredients.rows} />
      {ingredients.foot && (
        <p style={{ marginTop: 8, fontSize: 13, color: colors.muted, fontStyle: "italic" }}>{ingredients.foot}</p>
      )}
    </div>

    <div style={{ marginTop: 32 }}>
      <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, margin: "0 0 14px", fontWeight: 400 }}>
        Method
      </h3>
      <MethodList steps={method} />
    </div>
  </details>
);

export default function GlutenFreeTrialDetail({ trial }: { trial: Trial }) {
  const isMobile = useIsMobile();
  useScrapbookFonts();
  const { newer, older } = getNeighbours(trial.slug);
  const olderTrial = getOlderTrial(trial.slug);

  return (
    <div style={{ margin: 0, background: colors.darkGround, minHeight: "100vh", width: "100%" }}>
      <Paper style={{ width: "100%", minHeight: "100vh", position: "relative", overflow: "hidden" }}>
        <div style={{
          width: "100%",
          maxWidth: 760,
          margin: "0 auto",
          padding: isMobile ? "32px 24px 16px" : "48px 32px 24px",
          boxSizing: "border-box",
        }}>
          <Link
            href="/gluten-free"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              letterSpacing: "0.12em",
              color: colors.muted,
              textDecoration: "none",
            }}
          >
            ← all trials
          </Link>
        </div>

        <section style={{
          width: "100%",
          maxWidth: 760,
          margin: "0 auto",
          padding: isMobile ? "8px 24px 40px" : "8px 32px 56px",
          boxSizing: "border-box",
        }}>
          <Reveal>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.25em", color: colors.rust, marginBottom: 16 }}>
              · {statusLabel(trial.status)} · {trial.dateLabel} ·
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16, marginBottom: 18 }}>
              <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: isMobile ? 48 : 72, margin: 0, fontWeight: 400, lineHeight: 1 }}>
                {trial.version}
              </h1>
              <ResultStamp tone={trial.tone}>{trial.resultTag}</ResultStamp>
            </div>
            <p style={{ fontSize: isMobile ? 16 : 19, lineHeight: 1.55, margin: "0 0 28px", maxWidth: 560, color: colors.ink }}>
              {trial.summary}
            </p>
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(auto-fit, minmax(120px, 1fr))",
              gap: 14,
              maxWidth: 640,
              marginBottom: 40,
            }}>
              {trial.meta.map((m) => (
                <div key={m.label}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: colors.muted, marginBottom: 4 }}>
                    {m.label}
                  </div>
                  <div style={{ fontSize: 14, color: colors.ink }}>{m.value}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div style={{ marginBottom: 48 }}>
              {trial.photos.length > 0 ? (
                <div style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                  gap: 28,
                  justifyItems: "center",
                  justifyContent: "center",
                }}>
                  {trial.photos.map((photo, i) => (
                    <div key={photo.src} style={{
                      position: "relative",
                      background: "#fff",
                      padding: "12px 12px 40px",
                      boxShadow: "0 8px 22px rgba(0,0,0,0.16)",
                      transform: i % 2 === 0 ? "rotate(-1.5deg)" : "rotate(1.2deg)",
                      maxWidth: 360,
                      width: "100%",
                      margin: "0 auto",
                    }}>
                      <Tape rotate={i % 2 === 0 ? 4 : -5} top={-10} left={70} width={100} color="rgba(166,75,42,0.45)" />
                      <div style={{ position: "relative", width: "100%", aspectRatio: `${photo.width} / ${photo.height}`, overflow: "hidden", background: colors.paper }}>
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          width={photo.width}
                          height={photo.height}
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        />
                      </div>
                      <div style={{
                        position: "absolute",
                        bottom: 10,
                        left: 12,
                        right: 12,
                        fontFamily: "'Caveat', cursive",
                        fontSize: 16,
                        color: colors.ink,
                        textAlign: "center",
                      }}>
                        {photo.caption}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{
                  border: `1.5px dashed rgba(60,30,10,0.35)`,
                  padding: "36px 24px",
                  textAlign: "center",
                  maxWidth: 420,
                  background: "rgba(244,235,217,0.5)",
                }}>
                  <div style={{ fontFamily: "'Caveat', cursive", fontSize: 20, color: colors.sage }}>
                    {trial.photoNote ?? "No photos from this bake."}
                  </div>
                </div>
              )}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div style={{ marginBottom: 40, maxWidth: 640 }}>
              {trial.intro ? (
                <>
                  <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: isMobile ? 28 : 36, margin: "0 0 16px", fontWeight: 400 }}>
                    Where it started
                  </h2>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: colors.muted, margin: 0 }}>{trial.intro}</p>
                </>
              ) : (
                <>
                  <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: isMobile ? 28 : 36, margin: "0 0 16px", fontWeight: 400 }}>
                    What changed in {trial.version}
                  </h2>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 14 }}>
                    {(trial.changes ?? []).map((c, i) => (
                      <li key={i} style={{ fontSize: 15, lineHeight: 1.65, color: colors.muted }}>
                        <strong style={{ color: colors.ink, fontWeight: 600 }}>{c.lead}</strong>{" "}
                        {c.text}
                      </li>
                    ))}
                  </ul>
                  {trial.why && (
                    <p style={{ marginTop: 18, fontSize: 15, lineHeight: 1.7, color: colors.muted }}>
                      <strong style={{ color: colors.ink }}>Why:</strong> {trial.why}
                    </p>
                  )}
                  {olderTrial && (
                    <p style={{ marginTop: 14, fontSize: 14, color: colors.muted }}>
                      Everything else carries over from{" "}
                      <Link href={`/gluten-free/${olderTrial.slug}`} style={{ color: colors.rust }}>
                        {olderTrial.version}
                      </Link>
                      .
                    </p>
                  )}
                </>
              )}
            </div>
          </Reveal>

          {trial.includes && (
            <Reveal delay={140}>
              <div style={{
                marginBottom: 40,
                maxWidth: 640,
                padding: "18px 20px",
                borderTop: `1.5px solid ${colors.rust}`,
                borderBottom: `1.5px solid ${colors.rust}`,
                background: "rgba(244,235,217,0.5)",
              }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.18em", color: colors.rust, marginBottom: 8 }}>
                  {trial.includes.label}
                </div>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: colors.muted }}>{trial.includes.text}</p>
              </div>
            </Reveal>
          )}

          <Reveal delay={160}>
            <div style={{ marginBottom: 40, maxWidth: 640 }}>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: isMobile ? 28 : 36, margin: "0 0 14px", fontWeight: 400 }}>
                How it baked
              </h2>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: colors.muted }}>{trial.result}</p>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <div style={{ marginBottom: 48, maxWidth: 720 }}>
              <RecipeFold
                starter={trial.starter}
                ingredients={trial.ingredients}
                method={trial.method}
              />
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 16,
              flexWrap: "wrap",
              paddingTop: 24,
              borderTop: `1px dashed rgba(60,30,10,0.3)`,
              maxWidth: 720,
            }}>
              {newer ? (
                <Link href={`/gluten-free/${newer.slug}`} style={{ color: colors.rust, textDecoration: "none", fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: "0.1em" }}>
                  ← newer trial · {newer.version}
                </Link>
              ) : (
                <span />
              )}
              {older ? (
                <Link href={`/gluten-free/${older.slug}`} style={{ color: colors.rust, textDecoration: "none", fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: "0.1em" }}>
                  older trial · {older.version} →
                </Link>
              ) : (
                <span />
              )}
            </div>
          </Reveal>
        </section>

        <SiteFooter isMobile={isMobile} />
      </Paper>
    </div>
  );
}

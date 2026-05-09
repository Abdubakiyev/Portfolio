"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import {
  motion, useScroll, useTransform, AnimatePresence,
  useMotionValue, useSpring
} from "framer-motion";
import { translations, type Lang } from "./translations";

const Q = [0.22, 1, 0.36, 1] as const;

/* ════════════════════════════════════════
   CURSOR — vanilla DOM, zero lag
════════════════════════════════════════ */
function Cursor() {
  useEffect(() => {
    const dot  = document.createElement("div"); dot.id  = "cur-dot";
    const ring = document.createElement("div"); ring.id = "cur-ring";
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let rx = -200, ry = -200, mx = -200, my = -200;
    let raf: number;

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const onOver  = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      document.body.classList.toggle("cur-hover", !!(t.closest("a,button,[role=button]")));
    };

    const animate = () => {
      dot.style.left = mx + "px";
      dot.style.top  = my + "px";
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      ring.style.left = rx + "px";
      ring.style.top  = ry + "px";
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      dot.remove(); ring.remove();
    };
  }, []);
  return null;
}

/* ════════════════════════════════════════
   MOUSE GLOW
════════════════════════════════════════ */
function MouseGlow() {
  const x = useMotionValue(-999); const y = useMotionValue(-999);
  const sx = useSpring(x, { stiffness: 50, damping: 18 });
  const sy = useSpring(y, { stiffness: 50, damping: 18 });
  useEffect(() => {
    const fn = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, [x, y]);
  return (
    <motion.div style={{
      position: "fixed", width: 700, height: 700, borderRadius: "50%",
      background: "radial-gradient(circle, rgba(255,255,255,0.045) 0%, transparent 68%)",
      pointerEvents: "none", zIndex: 3,
      left: sx, top: sy, translateX: "-50%", translateY: "-50%",
    }} />
  );
}

/* ════════════════════════════════════════
   30 FLOATING PARTICLES
════════════════════════════════════════ */
function Particles() {
  const pts = useMemo(() => Array.from({ length: 30 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    s: Math.random() * 2 + 0.8, dur: 18 + Math.random() * 16,
    delay: Math.random() * 12, dx: (Math.random() - 0.5) * 40,
  })), []);
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1, overflow: "hidden" }}>
      {pts.map(p => (
        <motion.div key={p.id} style={{
          position: "absolute", left: `${p.x}%`, top: `${p.y}%`,
          width: p.s, height: p.s, borderRadius: "50%",
          background: "rgba(255,255,255,0.35)",
        }}
          animate={{ y: [0, -90, 0], x: [0, p.dx, 0], opacity: [0, 0.7, 0] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }} />
      ))}
    </div>
  );
}

/* ════════════════════════════════════════
   7 FLOATING 3D CUBES
════════════════════════════════════════ */
function FloatingCubes() {
  const cubes = useMemo(() => [
    { x: 6,  y: 12, sz: 28, dur: 11, fdur: 6,  del: 0,   op: 0.08 },
    { x: 88, y: 22, sz: 18, dur: 14, fdur: 7,  del: 1.2, op: 0.06 },
    { x: 14, y: 68, sz: 34, dur: 9,  fdur: 5,  del: 0.5, op: 0.07 },
    { x: 78, y: 72, sz: 22, dur: 16, fdur: 8,  del: 2,   op: 0.05 },
    { x: 48, y: 38, sz: 16, dur: 12, fdur: 6.5,del: 0.8, op: 0.05 },
    { x: 22, y: 88, sz: 30, dur: 13, fdur: 7.5,del: 1.5, op: 0.07 },
    { x: 92, y: 55, sz: 20, dur: 10, fdur: 5.5,del: 0.3, op: 0.06 },
  ], []);
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1, overflow: "hidden" }}>
      {cubes.map((c, i) => (
        <motion.div key={i} style={{
          position: "absolute", left: `${c.x}%`, top: `${c.y}%`,
          width: c.sz, height: c.sz,
          border: `1px solid rgba(255,255,255,${c.op})`,
          transformStyle: "preserve-3d",
        }}
          animate={{
            rotateX: [0, 360], rotateY: [0, 360],
            y: [0, -22, 0], opacity: [c.op, c.op * 2.8, c.op],
          }}
          transition={{
            rotateX: { duration: c.dur, repeat: Infinity, ease: "linear" },
            rotateY: { duration: c.dur * 1.4, repeat: Infinity, ease: "linear" },
            y: { duration: c.fdur, repeat: Infinity, ease: "easeInOut", delay: c.del },
            opacity: { duration: c.fdur, repeat: Infinity, ease: "easeInOut", delay: c.del },
          }} />
      ))}
    </div>
  );
}

/* ════════════════════════════════════════
   MORPHING BLOBS
════════════════════════════════════════ */
function MorphBlobs() {
  const blobs = [
    { x: "8%",  y: "18%", sz: 560, dur: 13, c: "rgba(255,255,255,0.022)" },
    { x: "78%", y: "58%", sz: 420, dur: 18, c: "rgba(255,255,255,0.016)" },
    { x: "42%", y: "82%", sz: 380, dur: 15, c: "rgba(255,255,255,0.014)" },
  ];
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {blobs.map((b, i) => (
        <motion.div key={i} style={{
          position: "absolute", left: b.x, top: b.y,
          width: b.sz, height: b.sz,
          background: b.c, filter: "blur(90px)",
          transform: "translate(-50%,-50%)",
        }}
          animate={{
            borderRadius: [
              "58% 42% 68% 32%/52% 64% 36% 48%",
              "38% 62% 28% 72%/62% 38% 62% 38%",
              "72% 28% 52% 48%/38% 72% 28% 62%",
              "58% 42% 68% 32%/52% 64% 36% 48%",
            ],
            scale: [1, 1.12, 0.92, 1],
          }}
          transition={{ duration: b.dur, repeat: Infinity, ease: "easeInOut" }} />
      ))}
    </div>
  );
}

/* ════════════════════════════════════════
   BREATHING RINGS
════════════════════════════════════════ */
function BreathRings() {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", overflow: "hidden" }}>
      {[1, 2, 3, 4, 5].map(i => (
        <motion.div key={i} style={{
          position: "absolute",
          width: i * 200, height: i * 200,
          borderRadius: "50%",
          border: `1px solid rgba(255,255,255,${0.06 - i * 0.01})`,
        }}
          animate={{ scale: [1, 1 + i * 0.04, 1], opacity: [0.5, 0.12, 0.5] }}
          transition={{ duration: 4 + i * 0.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }} />
      ))}
    </div>
  );
}

/* ════════════════════════════════════════
   STAGGERED 3-D HEADLINE
════════════════════════════════════════ */
function StagText({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span style={{ display: "inline-block" }}>
      {text.split("").map((ch, i) => (
        <motion.span key={i}
          initial={{ opacity: 0, rotateX: -80, y: 18 }}
          animate={{ opacity: 1, rotateX: 0, y: 0 }}
          transition={{ delay: delay + i * 0.028, duration: 0.55, ease: Q }}
          style={{ display: "inline-block", transformOrigin: "bottom center" }}>
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </span>
  );
}

/* ════════════════════════════════════════
   TILT CARD
════════════════════════════════════════ */
function TiltCard({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [on, setOn] = useState(false);

  const onMM = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current!.getBoundingClientRect();
    const cx = (e.clientX - r.left) / r.width;
    const cy = (e.clientY - r.top) / r.height;
    setTilt({ x: (cy - 0.5) * -16, y: (cx - 0.5) * 16 });
    setGlow({ x: cx * 100, y: cy * 100 });
  };

  return (
    <motion.div ref={ref} onMouseMove={onMM}
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => { setOn(false); setTilt({ x: 0, y: 0 }); }}
      animate={{ rotateX: tilt.x, rotateY: tilt.y, scale: on ? 1.03 : 1 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      style={{
        ...style, transformStyle: "preserve-3d", position: "relative",
        background: "#101010", border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 8, overflow: "hidden",
      }}>
      {on && (
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(255,255,255,0.08) 0%, transparent 55%)`,
        }} />
      )}
      <div style={{ position: "relative", zIndex: 1, padding: style?.padding !== undefined ? undefined : 28 }}>{children}</div>
    </motion.div>
  );
}

/* ════════════════════════════════════════
   DIVIDER
════════════════════════════════════════ */
function Divider() {
  return (
    <motion.div initial={{ scaleX: 0, opacity: 0 }} whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }} transition={{ duration: 0.9, ease: Q }}
      style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)", marginBottom: 60, transformOrigin: "left" }} />
  );
}

/* ════════════════════════════════════════
   NAVBAR
════════════════════════════════════════ */
function Navbar({ lang, setLang, t }: { lang: Lang; setLang: (l: Lang) => void; t: typeof translations.en }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = Object.entries(t.nav) as [string, string][];

  return (
    <motion.nav initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, ease: Q }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 500, height: 64,
        padding: "0 clamp(20px,5vw,80px)", display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(8,8,8,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
        transition: "all 0.4s ease",
      }}>
      <motion.span whileHover={{ scale: 1.12 }}
        style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 18, letterSpacing: "-0.04em" }}>AA</motion.span>

      <div style={{ display: "flex", gap: 32 }} className="desktop-nav">
        {links.map(([k, v], i) => (
          <motion.a key={k} href={`#${k}`}
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.06 }}
            whileHover={{ y: -2, color: "#fff" }}
            style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#666", textDecoration: "none", transition: "color 0.2s" }}>
            {v}
          </motion.a>
        ))}
      </div>

      <div style={{ display: "flex", gap: 3, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, padding: 3 }}>
        {(["en", "uz", "ru"] as Lang[]).map(l => (
          <motion.button key={l} onClick={() => setLang(l)}
            whileTap={{ scale: 0.93 }}
            style={{
              fontFamily: "'DM Mono',monospace", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em",
              padding: "5px 11px", borderRadius: 4,
              background: lang === l ? "white" : "transparent",
              color: lang === l ? "black" : "#555",
              border: "none", outline: "none",
              transition: "all 0.2s", fontWeight: lang === l ? 600 : 400,
            }}>{l}</motion.button>
        ))}
      </div>
    </motion.nav>
  );
}

/* ════════════════════════════════════════
   HERO — scroll parallax
════════════════════════════════════════ */
function Hero({ t }: { t: typeof translations.en }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y       = useTransform(scrollYProgress, [0, 1], [0, -130]);
  const scale   = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section ref={ref} style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 clamp(20px,5vw,80px) 0", paddingTop: 80, position: "relative", zIndex: 2, overflow: "hidden" }}>
      <BreathRings />
      <motion.div style={{ y, scale, opacity }}>
        {/* badge */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
          style={{ marginBottom: 40, display: "flex", alignItems: "center", gap: 12 }}>
          <motion.div animate={{ scaleX: [0, 1] }} transition={{ delay: 0.3, duration: 0.5 }}
            style={{ width: 40, height: 1, background: "#333", transformOrigin: "left" }} />
          <span className="section-label">Portfolio 2025</span>
        </motion.div>

        {/* greeting */}
        <motion.p initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25, duration: 0.5 }}
          style={{ fontFamily: "'DM Mono',monospace", fontSize: 14, color: "#555", marginBottom: 14, letterSpacing: "0.05em" }}>
          {t.hero.greeting}
        </motion.p>

        {/* 3-D staggered name */}
        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(3.2rem,10vw,8.5rem)", lineHeight: 0.92, letterSpacing: "-0.04em", marginBottom: 28 }}>
          <div><StagText text={t.hero.name.split(" ")[0]} delay={0.3} /></div>
          <div style={{ WebkitTextStroke: "1px rgba(255,255,255,0.22)", color: "transparent" }}>
            <StagText text={t.hero.name.split(" ").slice(1).join(" ")} delay={0.5} />
            <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1.1, repeat: Infinity }}
              style={{ color: "#fff", WebkitTextStroke: "0", marginLeft: 4 }}>_</motion.span>
          </div>
        </div>

        {/* status */}
        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0, type: "spring", stiffness: 220 }} style={{ marginBottom: 28 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 5, padding: "8px 18px" }}>
            <motion.div animate={{ scale: [1, 1.9, 1], opacity: [1, 0.35, 1] }} transition={{ duration: 2.2, repeat: Infinity }}
              style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", flexShrink: 0 }} />
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, color: "#bbb", letterSpacing: "0.06em" }}>
              {t.hero.title} — {t.hero.subtitle}
            </span>
          </div>
        </motion.div>

        {/* description */}
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.6 }}
          style={{ fontFamily: "'DM Mono',monospace", fontSize: 14, color: "#555", maxWidth: 500, lineHeight: 1.85, marginBottom: 48, letterSpacing: "0.02em" }}>
          {t.hero.description}
        </motion.p>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
          style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <motion.a href="#projects" className="btn btn-primary" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
            {t.hero.cta} →
          </motion.a>
          <motion.a href="#contact" className="btn btn-secondary" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
            {t.hero.contact}
          </motion.a>
        </motion.div>
      </motion.div>

      {/* scroll hint */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
        style={{ position: "absolute", bottom: 40, left: "clamp(20px,5vw,80px)", display: "flex", alignItems: "center", gap: 10 }}>
        <motion.div animate={{ y: [0, 10, 0], opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 2, repeat: Infinity }}
          style={{ width: 1, height: 42, background: "linear-gradient(to bottom, transparent, #555)" }} />
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: "#444", letterSpacing: "0.18em", textTransform: "uppercase", writingMode: "vertical-rl" }}>scroll</span>
      </motion.div>
    </section>
  );
}

/* ════════════════════════════════════════
   MARQUEE
════════════════════════════════════════ */
function Marquee() {
  const items = ["Node.js","NestJS","ExpressJS","React Native","PostgreSQL","MongoDB","Docker","JWT","Prisma","Swagger","TypeScript","RESTful API","Git","Postman"];
  const d = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "16px 0", margin: "0 0 100px", position: "relative", zIndex: 2 }}>
      <div className="marquee-track">
        {d.map((item, i) => (
          <span key={i} style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", color: i % 2 === 0 ? "#2e2e2e" : "#222", marginRight: 56 }}>
            {item} <span style={{ color: "#3a3a3a" }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   ABOUT
════════════════════════════════════════ */
function About({ t }: { t: typeof translations.en }) {
  return (
    <section id="about" style={{ padding: "0 clamp(20px,5vw,80px) 100px", position: "relative", zIndex: 2 }}>
      <Divider />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }} className="about-grid">
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: Q }}>
          <p className="section-label">// about</p>
          <h2 className="section-title" style={{ marginBottom: 28 }}>{t.about.title}</h2>
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, color: "#666", lineHeight: 1.95, letterSpacing: "0.02em" }}>{t.about.text}</p>
        </motion.div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { label: "location", value: t.about.location, icon: "◎" },
            { label: "email",    value: t.about.email,    icon: "✉" },
            { label: "phone",    value: t.about.phone,    icon: "◉" },
            { label: "telegram", value: t.about.telegram, href: `https://t.me/${t.about.telegram.replace("@","")}`, icon: "⟡" },
            { label: "github",   value: t.about.github,   href: "https://github.com/Abdubakiyev", icon: "⬡" },
          ].map((item, i) => (
            <motion.div key={item.label}
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.07, ease: Q }}
              whileHover={{ x: 6, borderColor: "rgba(255,255,255,0.18)" }}
              style={{ display: "flex", gap: 18, alignItems: "center", padding: "13px 18px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 6, transition: "border-color 0.2s" }}>
              <span style={{ fontSize: 16, minWidth: 22, textAlign: "center", color: "#3a3a3a" }}>{item.icon}</span>
              <div>
                <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: "#3a3a3a", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 3 }}>{item.label}</p>
                {item.href
                  ? <a href={item.href} target="_blank" rel="noopener noreferrer"
                      style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, color: "#bbb", textDecoration: "none", transition: "color 0.2s" }}
                      onMouseEnter={e => (e.currentTarget.style.color="#fff")}
                      onMouseLeave={e => (e.currentTarget.style.color="#bbb")}>{item.value}</a>
                  : <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, color: "#bbb" }}>{item.value}</span>
                }
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   SKILLS — TiltCard + pulsing dots
════════════════════════════════════════ */
function Skills({ t }: { t: typeof translations.en }) {
  return (
    <section id="skills" style={{ padding: "0 clamp(20px,5vw,80px) 100px", position: "relative", zIndex: 2 }}>
      <Divider />
      <p className="section-label">// skills</p>
      <h2 className="section-title" style={{ marginBottom: 48 }}>{t.skills.title}</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 16 }}>
        {t.skills.categories.map((cat, i) => (
          <motion.div key={cat.label}
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.5 }}>
            <TiltCard>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <motion.div animate={{ scale: [1, 1.9, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2.2 + i * 0.25, repeat: Infinity }}
                  style={{ width: 7, height: 7, background: "white", borderRadius: "50%", flexShrink: 0 }} />
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.2em", color: "#444", textTransform: "uppercase" }}>{cat.label}</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {cat.items.map((item, j) => (
                  <motion.span key={item} initial={{ opacity: 0, scale: 0.75 }} whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.05 + j * 0.04 }} className="tag">{item}</motion.span>
                ))}
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   PROJECTS — TiltCard
════════════════════════════════════════ */
function Projects({ t }: { t: typeof translations.en }) {
  const [imgErr, setImgErr] = useState<Record<number, boolean>>({});
  return (
    <section id="projects" style={{ padding: "0 clamp(20px,5vw,80px) 100px", position: "relative", zIndex: 2 }}>
      <Divider />
      <p className="section-label">// projects</p>
      <h2 className="section-title" style={{ marginBottom: 48 }}>{t.projects.title}</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))", gap: 24 }}>
        {t.projects.list.map((proj, i) => (
          <motion.div key={proj.name}
            initial={{ opacity: 0, y: 44 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.13, duration: 0.7, ease: Q }}>
            <TiltCard style={{ padding: "0" }}>
              {/* image */}
              <div style={{ height: 200, position: "relative", background: "#0d0d0d", overflow: "hidden", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                {proj.image && !imgErr[i]
                  ? <img src={proj.image} alt={proj.name} onError={() => setImgErr(p => ({ ...p, [i]: true }))}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }}
                      onMouseEnter={e => (e.currentTarget.style.transform="scale(1.07)")}
                      onMouseLeave={e => (e.currentTarget.style.transform="scale(1)")} />
                  : <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>
                      <div style={{ width: 48, height: 48, border: "1px solid #222", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: 22, color: "#2a2a2a" }}>⬡</span>
                      </div>
                      <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: "#2a2a2a", letterSpacing: "0.12em" }}>{proj.name.toUpperCase()}</span>
                    </div>
                }
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 64, background: "linear-gradient(to top,rgba(16,16,16,0.95),transparent)", pointerEvents: "none" }} />
              </div>
              {/* content */}
              <div style={{ padding: 24 }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 11, color: "#2e2e2e", letterSpacing: "0.16em", marginBottom: 6 }}>0{i + 1}</div>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 20, letterSpacing: "-0.02em", marginBottom: 10, color: "#efefef" }}>{proj.name}</h3>
                <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: "#555", lineHeight: 1.85, marginBottom: 14, letterSpacing: "0.02em" }}>{proj.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
                  {proj.tech.map(tag => <span key={tag} className="tag">{tag}</span>)}
                </div>
                {proj.link && (
                  <motion.a href={proj.link} target="_blank" rel="noopener noreferrer" whileHover={{ x: 5 }}
                    style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#666", letterSpacing: "0.06em", textDecoration: "none", padding: "8px 12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 4, transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.color="#fff"; e.currentTarget.style.borderColor="rgba(255,255,255,0.22)"; }}
                    onMouseLeave={e => { e.currentTarget.style.color="#666"; e.currentTarget.style.borderColor="rgba(255,255,255,0.08)"; }}>
                    ⬡ View Project →
                  </motion.a>
                )}
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
        style={{ marginTop: 32, textAlign: "center" }}>
        <motion.a href="https://github.com/Abdubakiyev" target="_blank" rel="noopener noreferrer"
          className="btn btn-secondary" whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
          ⬡ {t.projects.github}
        </motion.a>
      </motion.div>
    </section>
  );
}

/* ════════════════════════════════════════
   EXPERIENCE
════════════════════════════════════════ */
function Experience({ t }: { t: typeof translations.en }) {
  return (
    <section id="experience" style={{ padding: "0 clamp(20px,5vw,80px) 100px", position: "relative", zIndex: 2 }}>
      <Divider />
      <p className="section-label">// experience</p>
      <h2 className="section-title" style={{ marginBottom: 48 }}>{t.experience.title}</h2>
      {t.experience.list.map((exp, i) => (
        <motion.div key={exp.company}
          initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.65, ease: Q }}
          style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 40, padding: "40px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
          className="exp-row">
          <div>
            <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 16, color: "#efefef", marginBottom: 8 }}>{exp.company}</p>
            <span className="tag" style={{ marginBottom: 8, display: "inline-block" }}>{exp.period}</span>
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#555", letterSpacing: "0.04em", marginTop: 8 }}>{exp.role}</p>
          </div>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
            {exp.items.map((item, j) => (
              <motion.li key={j}
                initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 + j * 0.07 }}
                style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <motion.span animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 2.2 + j * 0.3, repeat: Infinity, ease: "easeInOut" }}
                  style={{ color: "#2e2e2e", fontSize: 14, marginTop: 2 }}>▸</motion.span>
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, color: "#666", lineHeight: 1.75, letterSpacing: "0.02em" }}>{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      ))}
    </section>
  );
}

/* ════════════════════════════════════════
   CERTIFICATES — 3D modal
════════════════════════════════════════ */
function Certificates({ t }: { t: typeof translations.en }) {
  const [certs, setCerts] = useState<string[]>([]);
  const [modal, setModal] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    Array.from(e.target.files || []).forEach(file => {
      const r = new FileReader();
      r.onload = ev => setCerts(prev => [...prev, ev.target?.result as string]);
      r.readAsDataURL(file);
    });
    e.target.value = "";
  };

  return (
    <section id="certificates" style={{ padding: "0 clamp(20px,5vw,80px) 100px", position: "relative", zIndex: 2 }}>
      <Divider />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 20 }}>
        <div>
          <p className="section-label">// certificates</p>
          <h2 className="section-title">{t.certificates.title}</h2>
        </div>
        <motion.button onClick={() => fileRef.current?.click()} className="btn btn-secondary"
          whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
          + {t.certificates.placeholder}
        </motion.button>
        <input ref={fileRef} type="file" accept="image/*" multiple style={{ display: "none" }} onChange={handleAdd} />
      </div>

      {certs.length === 0 ? (
        <motion.div onClick={() => fileRef.current?.click()}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          whileHover={{ borderColor: "rgba(255,255,255,0.28)", scale: 1.01 }}
          style={{ border: "1px dashed rgba(255,255,255,0.09)", borderRadius: 10, padding: "80px 40px", textAlign: "center", transition: "all 0.3s" }}>
          <motion.div animate={{ rotate: [0, 8, -8, 0] }} transition={{ duration: 3.5, repeat: Infinity }}
            style={{ fontSize: 48, marginBottom: 14, color: "#1e1e1e" }}>◎</motion.div>
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, color: "#333", letterSpacing: "0.06em" }}>{t.certificates.empty}</p>
        </motion.div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 18 }}>
          <AnimatePresence>
            {certs.map((src, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, scale: 0.82, rotateX: -22 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.78, rotateX: 22 }}
                transition={{ duration: 0.5, ease: Q }}
                onClick={() => setModal(src)}
                whileHover={{ scale: 1.04, y: -5 }}
                style={{ position: "relative", borderRadius: 8, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
                <img src={src} alt={`Cert ${i + 1}`} style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }} />
                <motion.button onClick={e => { e.stopPropagation(); setCerts(p => p.filter((_, j) => j !== i)); }}
                  whileHover={{ scale: 1.25, background: "rgba(0,0,0,0.9)" }}
                  style={{ position: "absolute", top: 8, right: 8, background: "rgba(0,0,0,0.7)", border: "1px solid rgba(255,255,255,0.18)", color: "white", width: 28, height: 28, borderRadius: 4, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
          <motion.div onClick={() => fileRef.current?.click()}
            whileHover={{ borderColor: "rgba(255,255,255,0.3)", scale: 1.02 }}
            style={{ border: "1px dashed rgba(255,255,255,0.08)", borderRadius: 8, height: 200, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, transition: "all 0.2s" }}>
            <span style={{ fontSize: 28, color: "#2a2a2a" }}>+</span>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#333", letterSpacing: "0.1em" }}>Add More</span>
          </motion.div>
        </div>
      )}

      {/* 3-D flip modal */}
      <AnimatePresence>
        {modal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setModal(null)}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", zIndex: 900, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
            <motion.div
              initial={{ scale: 0.65, rotateX: -45, opacity: 0 }}
              animate={{ scale: 1, rotateX: 0, opacity: 1 }}
              exit={{ scale: 0.65, rotateX: 45, opacity: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              onClick={e => e.stopPropagation()}
              style={{ maxWidth: 820, width: "100%", borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.14)", transformStyle: "preserve-3d" }}>
              <img src={modal} alt="Certificate" style={{ width: "100%", display: "block" }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ════════════════════════════════════════
   EDUCATION + LANGUAGES
════════════════════════════════════════ */
function EducationLang({ t }: { t: typeof translations.en }) {
  return (
    <section style={{ padding: "0 clamp(20px,5vw,80px) 100px", position: "relative", zIndex: 2 }}>
      <Divider />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60 }} className="edu-grid">
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease: Q }}>
          <p className="section-label">// education</p>
          <h2 className="section-title" style={{ marginBottom: 28 }}>{t.education.title}</h2>
          <TiltCard>
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.18em", color: "#3a3a3a", textTransform: "uppercase", marginBottom: 10 }}>institution</p>
            <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 20, color: "#efefef", marginBottom: 8 }}>{t.education.school}</p>
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, color: "#666", marginBottom: 14, lineHeight: 1.65 }}>{t.education.program}</p>
            <span className="tag">{t.education.period}</span>
          </TiltCard>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.65, ease: Q }}>
          <p className="section-label">// languages</p>
          <h2 className="section-title" style={{ marginBottom: 28 }}>{t.languages.title}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {t.languages.list.map((item, i) => (
              <motion.div key={item.lang}
                initial={{ opacity: 0, x: 22 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.09 }}
                whileHover={{ x: 7, borderColor: "rgba(255,255,255,0.18)" }}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 6, transition: "all 0.2s" }}>
                <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: 16, color: "#efefef" }}>{item.lang}</span>
                <span className="tag">{item.level}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   CONTACT
════════════════════════════════════════ */
function Contact({ t }: { t: typeof translations.en }) {
  return (
    <section id="contact" style={{ padding: "0 clamp(20px,5vw,80px) 100px", position: "relative", zIndex: 2 }}>
      <Divider />
      <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
        <motion.p initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-label" style={{ marginBottom: 14 }}>// contact</motion.p>
        <motion.h2 initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.06 }} className="section-title" style={{ marginBottom: 18 }}>{t.contact.title}</motion.h2>
        <motion.p initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.12 }}
          style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, color: "#555", lineHeight: 1.85, marginBottom: 48 }}>{t.contact.subtitle}</motion.p>
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.18 }}
          style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          {[
            { href: "mailto:abdullohabdubakiyev@gmail.com", label: "✉ Email",    primary: true },
            { href: "https://t.me/kaneki_798",             label: "⟡ Telegram", primary: false },
            { href: "https://github.com/Abdubakiyev",      label: "⬡ GitHub",   primary: false },
          ].map((b, i) => (
            <motion.a key={i} href={b.href} target={b.primary ? undefined : "_blank"} rel="noopener noreferrer"
              className={`btn ${b.primary ? "btn-primary" : "btn-secondary"}`}
              whileHover={{ scale: 1.06, y: -3 }} whileTap={{ scale: 0.97 }}>
              {b.label}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   FOOTER
════════════════════════════════════════ */
function Footer({ t }: { t: typeof translations.en }) {
  return (
    <footer style={{ padding: "40px clamp(20px,5vw,80px)", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 2, flexWrap: "wrap", gap: 14 }}>
      <motion.span whileHover={{ scale: 1.12, rotate: 3 }}
        style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 20, letterSpacing: "-0.04em" }}>AA</motion.span>
      <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#333", letterSpacing: "0.1em" }}>© 2025 Abdulloh Abdubakiyev</span>
      <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#2a2a2a", letterSpacing: "0.08em" }}>Built with Next.js</span>
    </footer>
  );
}

/* ════════════════════════════════════════
   ROOT
════════════════════════════════════════ */
export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const t = translations[lang];
  return (
    <>
      <Cursor />
      <MouseGlow />
      <MorphBlobs />
      <FloatingCubes />
      <Particles />
      <div className="noise" />
      <div className="grid-bg" />
      <Navbar lang={lang} setLang={setLang} t={t} />
      <main style={{ position: "relative", zIndex: 2 }}>
        <Hero t={t} />
        <Marquee />
        <About t={t} />
        <Skills t={t} />
        <Projects t={t} />
        <Experience t={t} />
        <Certificates t={t} />
        <EducationLang t={t} />
        <Contact t={t} />
      </main>
      <Footer t={t} />
    </>
  );
}
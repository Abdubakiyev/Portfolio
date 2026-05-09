"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { translations, type Lang } from "./translations";

/* ══════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════ */
const easeOutQuart = [0.22, 1, 0.36, 1] as const;

/* ══════════════════════════════════════════════════
   FLOATING PARTICLES (30 pieces)
══════════════════════════════════════════════════ */
function Particles() {
  const particles = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
      drift: (Math.random() - 0.5) * 30,
    })), []);

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1, overflow: "hidden" }}>
      {particles.map(p => (
        <motion.div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.4)",
          }}
          animate={{
            y: [0, -80, 0],
            x: [0, p.drift, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   FLOATING 3D CUBES (7 pieces)
══════════════════════════════════════════════════ */
function FloatingCubes() {
  const cubes = useMemo(() =>
    Array.from({ length: 7 }, (_, i) => ({
      id: i,
      x: [8, 85, 15, 75, 50, 25, 90][i],
      y: [15, 25, 65, 70, 40, 85, 55][i],
      size: [28, 20, 36, 24, 18, 30, 22][i],
      rotX: Math.random() * 360,
      rotY: Math.random() * 360,
      durRot: 10 + i * 3,
      durFloat: 5 + i * 1.2,
      delay: i * 0.8,
      opacity: 0.04 + i * 0.012,
    })), []);

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1, overflow: "hidden" }}>
      {cubes.map(c => (
        <motion.div
          key={c.id}
          style={{
            position: "absolute",
            left: `${c.x}%`,
            top: `${c.y}%`,
            width: c.size,
            height: c.size,
            border: `1px solid rgba(255,255,255,${c.opacity * 3})`,
            transformStyle: "preserve-3d",
          }}
          animate={{
            rotateX: [c.rotX, c.rotX + 360],
            rotateY: [c.rotY, c.rotY + 360],
            y: [0, -20, 0],
            opacity: [c.opacity, c.opacity * 2.5, c.opacity],
          }}
          transition={{
            rotateX: { duration: c.durRot, repeat: Infinity, ease: "linear" },
            rotateY: { duration: c.durRot * 1.3, repeat: Infinity, ease: "linear" },
            y: { duration: c.durFloat, repeat: Infinity, ease: "easeInOut", delay: c.delay },
            opacity: { duration: c.durFloat, repeat: Infinity, ease: "easeInOut", delay: c.delay },
          }}
        />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   MORPHING BLOBS
══════════════════════════════════════════════════ */
function MorphingBlobs() {
  const blobs = [
    { x: "10%", y: "20%", color: "rgba(255,255,255,0.025)", size: 500, dur: 12 },
    { x: "75%", y: "60%", color: "rgba(255,255,255,0.018)", size: 400, dur: 17 },
    { x: "45%", y: "80%", color: "rgba(255,255,255,0.015)", size: 350, dur: 14 },
  ];
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            left: b.x,
            top: b.y,
            width: b.size,
            height: b.size,
            background: b.color,
            filter: "blur(80px)",
            transform: "translate(-50%,-50%)",
          }}
          animate={{
            borderRadius: [
              "60% 40% 70% 30% / 50% 60% 40% 50%",
              "40% 60% 30% 70% / 60% 40% 60% 40%",
              "70% 30% 50% 50% / 40% 70% 30% 60%",
              "60% 40% 70% 30% / 50% 60% 40% 50%",
            ],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{ duration: b.dur, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   MOUSE GLOW TRACKER
══════════════════════════════════════════════════ */
function MouseGlow() {
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const sx = useSpring(x, { stiffness: 60, damping: 20 });
  const sy = useSpring(y, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const fn = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, [x, y]);

  return (
    <motion.div
      style={{
        position: "fixed",
        width: 600,
        height: 600,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 2,
        translateX: "-50%",
        translateY: "-50%",
        left: sx,
        top: sy,
      }}
    />
  );
}

/* ══════════════════════════════════════════════════
   CUSTOM CURSOR
══════════════════════════════════════════════════ */
function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (dot.current) { dot.current.style.left = e.clientX + "px"; dot.current.style.top = e.clientY + "px"; }
      setTimeout(() => { if (ring.current) { ring.current.style.left = e.clientX + "px"; ring.current.style.top = e.clientY + "px"; } }, 60);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovered(!!(t.closest("a") || t.closest("button")));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); };
  }, []);

  return (
    <>
      <div ref={dot} style={{
        position: "fixed", width: hovered ? 12 : 8, height: hovered ? 12 : 8,
        background: "white", borderRadius: "50%", pointerEvents: "none", zIndex: 9999,
        transform: "translate(-50%,-50%)", mixBlendMode: "difference", transition: "width 0.2s, height 0.2s",
      }} />
      <div ref={ring} style={{
        position: "fixed", width: hovered ? 44 : 32, height: hovered ? 44 : 32,
        border: "1px solid rgba(255,255,255,0.4)", borderRadius: "50%", pointerEvents: "none", zIndex: 9998,
        transform: "translate(-50%,-50%)", mixBlendMode: "difference", transition: "all 0.15s ease",
      }} />
    </>
  );
}

/* ══════════════════════════════════════════════════
   TILT CARD (3D hover effect)
══════════════════════════════════════════════════ */
function TiltCard({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [hovering, setHovering] = useState(false);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width;
    const cy = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (cy - 0.5) * -14, y: (cx - 0.5) * 14 });
    setGlowPos({ x: cx * 100, y: cy * 100 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => { setHovering(false); setTilt({ x: 0, y: 0 }); }}
      animate={{ rotateX: tilt.x, rotateY: tilt.y, scale: hovering ? 1.03 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      style={{
        ...style,
        transformStyle: "preserve-3d",
        position: "relative",
        background: "#111",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 8,
        padding: 28,
        overflow: "hidden",
        cursor: "none",
      }}
    >
      {hovering && (
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(255,255,255,0.07) 0%, transparent 60%)`,
          transition: "background 0.05s",
        }} />
      )}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   BREATHING RINGS (hero background)
══════════════════════════════════════════════════ */
function BreathingRings() {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", overflow: "hidden" }}>
      {[1, 2, 3, 4].map(i => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: i * 220,
            height: i * 220,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.04)",
          }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.1, 0.4] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
        />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   STAGGERED 3D HEADLINE
══════════════════════════════════════════════════ */
function StaggeredText({ text, style }: { text: string; style?: React.CSSProperties }) {
  return (
    <span style={{ display: "inline-block", perspective: 600, ...style }}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, rotateX: -90, y: 20 }}
          animate={{ opacity: 1, rotateX: 0, y: 0 }}
          transition={{ delay: 0.4 + i * 0.025, duration: 0.5, ease: easeOutQuart }}
          style={{ display: "inline-block", transformOrigin: "bottom center" }}
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </span>
  );
}

/* ══════════════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════════════ */
function Navbar({ lang, setLang, t }: { lang: Lang; setLang: (l: Lang) => void; t: typeof translations.en }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = Object.entries(t.nav) as [string, string][];

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: easeOutQuart }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
        background: scrolled ? "rgba(10,10,10,0.94)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.4s ease",
        padding: "0 clamp(20px,5vw,80px)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 64,
      }}>
      <motion.span
        whileHover={{ scale: 1.1 }}
        style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 18, letterSpacing: "-0.04em", cursor: "none" }}>
        AA
      </motion.span>

      <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="desktop-nav">
        {links.map(([k, v], i) => (
          <motion.a
            key={k}
            href={`#${k}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#888", textDecoration: "none", transition: "color 0.2s", cursor: "none", position: "relative" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={e => (e.currentTarget.style.color = "#888")}
          >{v}</motion.a>
        ))}
      </div>

      <div style={{ display: "flex", gap: 4 }}>
        {(["en", "uz", "ru"] as Lang[]).map(l => (
          <motion.button
            key={l}
            onClick={() => setLang(l)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            style={{
              fontFamily: "'DM Mono',monospace", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em",
              padding: "5px 10px", borderRadius: 3, cursor: "none", transition: "all 0.2s",
              background: lang === l ? "white" : "transparent",
              color: lang === l ? "black" : "#555",
              border: lang === l ? "1px solid white" : "1px solid transparent",
            }}>{l}</motion.button>
        ))}
      </div>
    </motion.nav>
  );
}

/* ══════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════ */
function Hero({ t }: { t: typeof translations.en }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const [tick, setTick] = useState(true);

  useEffect(() => {
    const i = setInterval(() => setTick(p => !p), 600);
    return () => clearInterval(i);
  }, []);

  return (
    <section ref={ref} style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 clamp(20px,5vw,80px)", position: "relative", zIndex: 2, paddingTop: 80, overflow: "hidden" }}>
      <BreathingRings />

      <motion.div style={{ y, scale, opacity }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 40, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 1, background: "#333" }} />
          <span className="section-label">Portfolio 2025</span>
        </motion.div>

        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ fontFamily: "'DM Mono',monospace", fontSize: 14, color: "#666", marginBottom: 12, letterSpacing: "0.05em" }}>
          {t.hero.greeting}
        </motion.p>

        {/* 3D Staggered Name */}
        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(3rem,10vw,8rem)", lineHeight: 0.95, letterSpacing: "-0.04em", marginBottom: 24 }}>
          <div><StaggeredText text={t.hero.name.split(" ")[0]} /></div>
          <div style={{ WebkitTextStroke: "1px rgba(255,255,255,0.25)", color: "transparent" }}>
            <StaggeredText text={t.hero.name.split(" ").slice(1).join(" ")} />
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              style={{ marginLeft: 4, color: "white", WebkitTextStroke: "0px" }}>_</motion.span>
          </div>
        </div>

        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
          style={{ marginBottom: 32 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 4, padding: "8px 16px" }}>
            <motion.div
              animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80" }} />
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, color: "#ccc", letterSpacing: "0.06em" }}>
              {t.hero.title} — {t.hero.subtitle}
            </span>
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          style={{ fontFamily: "'DM Mono',monospace", fontSize: 14, color: "#666", maxWidth: 500, lineHeight: 1.8, marginBottom: 48, letterSpacing: "0.02em" }}>
          {t.hero.description}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <motion.a href="#projects" className="btn btn-primary" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            {t.hero.cta} →
          </motion.a>
          <motion.a href="#contact" className="btn btn-secondary" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            {t.hero.contact}
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{ position: "absolute", bottom: 40, left: "clamp(20px,5vw,80px)", display: "flex", alignItems: "center", gap: 10 }}>
        <motion.div
          animate={{ y: [0, 10, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ width: 1, height: 40, background: "linear-gradient(to bottom, transparent, #444)" }} />
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: "#444", letterSpacing: "0.15em", textTransform: "uppercase", writingMode: "vertical-rl" }}>scroll</span>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   MARQUEE
══════════════════════════════════════════════════ */
function Marquee() {
  const items = ["Node.js", "NestJS", "ExpressJS", "React Native", "PostgreSQL", "MongoDB", "Docker", "JWT", "Prisma", "Swagger", "TypeScript", "RESTful API"];
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "16px 0", margin: "0 0 100px", position: "relative", zIndex: 2 }}>
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", color: i % 2 === 0 ? "#333" : "#222", marginRight: 60 }}>
            {item} <span style={{ color: "#444" }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   SECTION DIVIDER (animated line)
══════════════════════════════════════════════════ */
function Divider() {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: easeOutQuart }}
      style={{ height: 1, background: "rgba(255,255,255,0.08)", marginBottom: 60, transformOrigin: "left" }}
    />
  );
}

/* ══════════════════════════════════════════════════
   ABOUT
══════════════════════════════════════════════════ */
function About({ t }: { t: typeof translations.en }) {
  return (
    <section id="about" style={{ padding: "0 clamp(20px,5vw,80px) 100px", position: "relative", zIndex: 2 }}>
      <Divider />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }} className="about-grid">
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: easeOutQuart }}>
          <p className="section-label">// about</p>
          <h2 className="section-title" style={{ marginBottom: 32 }}>{t.about.title}</h2>
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, color: "#888", lineHeight: 1.9, letterSpacing: "0.02em" }}>{t.about.text}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1, ease: easeOutQuart }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { label: "location", value: t.about.location, icon: "◎" },
              { label: "email", value: t.about.email, icon: "✉" },
              { label: "phone", value: t.about.phone, icon: "◉" },
              { label: "telegram", value: t.about.telegram, href: `https://t.me/${t.about.telegram.replace("@", "")}`, icon: "⟡" },
              { label: "github", value: t.about.github, href: "https://github.com/Abdubakiyev", icon: "⬡" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, ease: easeOutQuart }}
                whileHover={{ x: 4 }}
                style={{ display: "flex", gap: 20, alignItems: "center", padding: "14px 20px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 6, transition: "border-color 0.2s" }}
              >
                <span style={{ fontSize: 16, minWidth: 24, textAlign: "center", color: "#444" }}>{item.icon}</span>
                <div>
                  <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: "#444", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 3 }}>{item.label}</p>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer"
                      style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, color: "#ccc", textDecoration: "none", cursor: "none", transition: "color 0.2s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                      onMouseLeave={e => (e.currentTarget.style.color = "#ccc")}>{item.value}</a>
                  ) : (
                    <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, color: "#ccc" }}>{item.value}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   SKILLS — with pulsing dots
══════════════════════════════════════════════════ */
function Skills({ t }: { t: typeof translations.en }) {
  return (
    <section id="skills" style={{ padding: "0 clamp(20px,5vw,80px) 100px", position: "relative", zIndex: 2 }}>
      <Divider />
      <p className="section-label">// skills</p>
      <h2 className="section-title" style={{ marginBottom: 50 }}>{t.skills.title}</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 16 }}>
        {t.skills.categories.map((cat, i) => (
          <TiltCard key={cat.label}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <motion.div
                  animate={{ scale: [1, 1.8, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2 + i * 0.3, repeat: Infinity }}
                  style={{ width: 6, height: 6, background: "white", borderRadius: "50%" }} />
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.18em", color: "#555", textTransform: "uppercase" }}>{cat.label}</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {cat.items.map((item, j) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 + j * 0.04 }}
                    className="tag">{item}</motion.span>
                ))}
              </div>
            </motion.div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   PROJECTS — TiltCard + static images
══════════════════════════════════════════════════ */
function Projects({ t }: { t: typeof translations.en }) {
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  return (
    <section id="projects" style={{ padding: "0 clamp(20px,5vw,80px) 100px", position: "relative", zIndex: 2 }}>
      <Divider />
      <p className="section-label">// projects</p>
      <h2 className="section-title" style={{ marginBottom: 50 }}>{t.projects.title}</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))", gap: 24 }}>
        {t.projects.list.map((proj, i) => (
          <motion.div
            key={proj.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.7, ease: easeOutQuart }}>
            <TiltCard style={{ padding: 0, overflow: "hidden" }}>
              <div style={{ padding: 0 }}>
                {/* Image */}
                <div style={{ width: "100%", height: 200, position: "relative", background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.08)", overflow: "hidden" }}>
                  {proj.image && !imgErrors[i] ? (
                    <img src={proj.image} alt={proj.name} onError={() => setImgErrors(p => ({ ...p, [i]: true }))}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }}
                      onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.06)")}
                      onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")} />
                  ) : (
                    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>
                      <div style={{ width: 48, height: 48, border: "1px solid #2a2a2a", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: 22, color: "#333" }}>⬡</span>
                      </div>
                      <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: "#333", letterSpacing: "0.12em" }}>{proj.name.toUpperCase()}</span>
                    </div>
                  )}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 60, background: "linear-gradient(to top,rgba(17,17,17,0.9),transparent)", pointerEvents: "none" }} />
                </div>
                {/* Content */}
                <div style={{ padding: 24 }}>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 11, color: "#333", letterSpacing: "0.15em", marginBottom: 6 }}>0{i + 1}</div>
                  <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 20, letterSpacing: "-0.02em", marginBottom: 10, color: "#f0f0f0" }}>{proj.name}</h3>
                  <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: "#666", lineHeight: 1.8, marginBottom: 14, letterSpacing: "0.02em" }}>{proj.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
                    {proj.tech.map(tag => <span key={tag} className="tag">{tag}</span>)}
                  </div>
                  {proj.link && (
                    <motion.a href={proj.link} target="_blank" rel="noopener noreferrer" whileHover={{ x: 4 }}
                      style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#888", letterSpacing: "0.06em", textDecoration: "none", padding: "8px 12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 4, transition: "all 0.2s", cursor: "none" }}
                      onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
                      onMouseLeave={e => { e.currentTarget.style.color = "#888"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}>
                      <span>⬡</span> View Project →
                    </motion.a>
                  )}
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} style={{ marginTop: 32, textAlign: "center" }}>
        <motion.a href="https://github.com/Abdubakiyev" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ cursor: "none" }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
          ⬡ {t.projects.github}
        </motion.a>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   EXPERIENCE
══════════════════════════════════════════════════ */
function Experience({ t }: { t: typeof translations.en }) {
  return (
    <section id="experience" style={{ padding: "0 clamp(20px,5vw,80px) 100px", position: "relative", zIndex: 2 }}>
      <Divider />
      <p className="section-label">// experience</p>
      <h2 className="section-title" style={{ marginBottom: 50 }}>{t.experience.title}</h2>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {t.experience.list.map((exp, i) => (
          <motion.div key={exp.company}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: easeOutQuart }}
            style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 40, padding: "40px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            className="exp-row">
            <div>
              <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 16, color: "#f0f0f0", marginBottom: 6 }}>{exp.company}</p>
              <span className="tag" style={{ marginBottom: 8, display: "inline-block" }}>{exp.period}</span>
              <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#666", letterSpacing: "0.04em", marginTop: 6 }}>{exp.role}</p>
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {exp.items.map((item, j) => (
                <motion.li key={j}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + j * 0.06 }}
                  style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <motion.span
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 2 + j * 0.3, repeat: Infinity, ease: "easeInOut" }}
                    style={{ color: "#333", fontSize: 14, marginTop: 2 }}>▸</motion.span>
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, color: "#888", lineHeight: 1.7, letterSpacing: "0.02em" }}>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   CERTIFICATES — 3D modal entrance
══════════════════════════════════════════════════ */
function Certificates({ t }: { t: typeof translations.en }) {
  const [certs, setCerts] = useState<string[]>([]);
  const [modal, setModal] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    Array.from(e.target.files || []).forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => setCerts(prev => [...prev, ev.target?.result as string]);
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  return (
    <section id="certificates" style={{ padding: "0 clamp(20px,5vw,80px) 100px", position: "relative", zIndex: 2 }}>
      <Divider />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 50, flexWrap: "wrap", gap: 20 }}>
        <div>
          <p className="section-label">// certificates</p>
          <h2 className="section-title">{t.certificates.title}</h2>
        </div>
        <motion.button onClick={() => fileRef.current?.click()} className="btn btn-secondary" style={{ cursor: "none" }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
          + {t.certificates.placeholder}
        </motion.button>
        <input ref={fileRef} type="file" accept="image/*" multiple style={{ display: "none" }} onChange={handleAdd} />
      </div>

      {certs.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          onClick={() => fileRef.current?.click()}
          whileHover={{ borderColor: "rgba(255,255,255,0.25)", scale: 1.01 }}
          style={{ border: "1px dashed rgba(255,255,255,0.1)", borderRadius: 8, padding: "80px 40px", textAlign: "center", cursor: "none", transition: "border-color 0.2s" }}>
          <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} style={{ fontSize: 48, marginBottom: 16, color: "#222" }}>◎</motion.div>
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, color: "#444", letterSpacing: "0.06em" }}>{t.certificates.empty}</p>
        </motion.div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 20 }}>
          <AnimatePresence>
            {certs.map((src, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, scale: 0.85, rotateX: -20 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateX: 20 }}
                transition={{ duration: 0.5, ease: easeOutQuart }}
                onClick={() => setModal(src)}
                whileHover={{ scale: 1.03, y: -4 }}
                style={{ position: "relative", borderRadius: 8, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", cursor: "none" }}>
                <img src={src} alt={`Certificate ${i + 1}`} style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }} />
                <motion.button
                  onClick={e => { e.stopPropagation(); setCerts(prev => prev.filter((_, j) => j !== i)); }}
                  whileHover={{ scale: 1.2 }}
                  style={{ position: "absolute", top: 8, right: 8, background: "rgba(0,0,0,0.7)", border: "1px solid rgba(255,255,255,0.2)", color: "white", width: 28, height: 28, borderRadius: 4, fontSize: 12, cursor: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
          <motion.div onClick={() => fileRef.current?.click()} whileHover={{ borderColor: "rgba(255,255,255,0.3)", scale: 1.02 }}
            style={{ border: "1px dashed rgba(255,255,255,0.1)", borderRadius: 8, height: 200, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, cursor: "none", transition: "border-color 0.2s" }}>
            <span style={{ fontSize: 28, color: "#333" }}>+</span>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#444", letterSpacing: "0.1em" }}>Add More</span>
          </motion.div>
        </div>
      )}

      {/* 3D Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModal(null)}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", zIndex: 900, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, cursor: "none" }}>
            <motion.div
              initial={{ scale: 0.7, rotateX: -40, opacity: 0 }}
              animate={{ scale: 1, rotateX: 0, opacity: 1 }}
              exit={{ scale: 0.7, rotateX: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              onClick={e => e.stopPropagation()}
              style={{ maxWidth: 800, width: "100%", borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.15)", transformStyle: "preserve-3d" }}>
              <img src={modal} alt="Certificate" style={{ width: "100%", display: "block" }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   EDUCATION + LANGUAGES
══════════════════════════════════════════════════ */
function EducationLang({ t }: { t: typeof translations.en }) {
  return (
    <section style={{ padding: "0 clamp(20px,5vw,80px) 100px", position: "relative", zIndex: 2 }}>
      <Divider />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60 }} className="edu-grid">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="section-label">// education</p>
          <h2 className="section-title" style={{ marginBottom: 32 }}>{t.education.title}</h2>
          <TiltCard>
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.15em", color: "#444", textTransform: "uppercase", marginBottom: 8 }}>institution</p>
            <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 20, color: "#f0f0f0", marginBottom: 8 }}>{t.education.school}</p>
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, color: "#888", marginBottom: 12, lineHeight: 1.6 }}>{t.education.program}</p>
            <span className="tag">{t.education.period}</span>
          </TiltCard>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.6 }}>
          <p className="section-label">// languages</p>
          <h2 className="section-title" style={{ marginBottom: 32 }}>{t.languages.title}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {t.languages.list.map((item, i) => (
              <motion.div key={item.lang}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ x: 6 }}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 6 }}>
                <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: 16, color: "#f0f0f0" }}>{item.lang}</span>
                <span className="tag">{item.level}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   CONTACT
══════════════════════════════════════════════════ */
function Contact({ t }: { t: typeof translations.en }) {
  return (
    <section id="contact" style={{ padding: "0 clamp(20px,5vw,80px) 100px", position: "relative", zIndex: 2 }}>
      <Divider />
      <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-label" style={{ marginBottom: 16 }}>// contact</motion.p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }} className="section-title" style={{ marginBottom: 20 }}>{t.contact.title}</motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, color: "#666", lineHeight: 1.8, marginBottom: 48 }}>{t.contact.subtitle}</motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
          style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          {[
            { href: "mailto:abdullohabdubakiyev@gmail.com", label: "✉ Email", primary: true },
            { href: "https://t.me/kaneki_798", label: "⟡ Telegram", primary: false },
            { href: "https://github.com/Abdubakiyev", label: "⬡ GitHub", primary: false },
          ].map((btn, i) => (
            <motion.a key={i} href={btn.href} target={btn.primary ? undefined : "_blank"} rel="noopener noreferrer"
              className={`btn ${btn.primary ? "btn-primary" : "btn-secondary"}`}
              style={{ cursor: "none" }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}>
              {btn.label}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════════ */
function Footer({ t }: { t: typeof translations.en }) {
  return (
    <footer style={{ padding: "40px clamp(20px,5vw,80px)", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 2, flexWrap: "wrap", gap: 16 }}>
      <motion.span whileHover={{ scale: 1.1 }} style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 20, letterSpacing: "-0.04em", cursor: "none" }}>AA</motion.span>
      <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#444", letterSpacing: "0.1em" }}>© 2025 Abdulloh Abdubakiyev</span>
      <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#333", letterSpacing: "0.08em" }}>Built with Next.js</span>
    </footer>
  );
}

/* ══════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════ */
export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const t = translations[lang];

  return (
    <>
      <Cursor />
      <MouseGlow />
      <MorphingBlobs />
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
      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
          .edu-grid { grid-template-columns: 1fr !important; }
          .desktop-nav { display: none !important; }
          .exp-row { grid-template-columns: 1fr !important; gap: 16px !important; }
        }
        * { perspective: 1200px; }
      `}</style>
    </>
  );
}
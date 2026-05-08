"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { translations, type Lang } from "./translations";

/* ─── helpers ─────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.7, ease: "easeOut" as const } }),
};

/* ─── Cursor ────────────────────────────────────────────── */
function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (dot.current) { dot.current.style.left = e.clientX + "px"; dot.current.style.top = e.clientY + "px"; }
      setTimeout(() => { if (ring.current) { ring.current.style.left = e.clientX + "px"; ring.current.style.top = e.clientY + "px"; } }, 60);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (<><div ref={dot} className="cursor" /><div ref={ring} className="cursor-follower" /></>);
}

/* ─── Navbar ─────────────────────────────────────────────── */
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
    <motion.nav initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut" as const }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
        background: scrolled ? "rgba(10,10,10,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.4s ease",
        padding: "0 clamp(20px, 5vw, 80px)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 64,
      }}>
      <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 18, letterSpacing: "-0.04em" }}>AA</span>
      {/* Desktop links */}
      <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="desktop-nav">
        {links.map(([k, v]) => (
          <a key={k} href={`#${k}`} style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#888", textDecoration: "none", transition: "color 0.2s", cursor: "none" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#fff")} onMouseLeave={e => (e.currentTarget.style.color = "#888")}>{v}</a>
        ))}
      </div>
      {/* Lang switcher */}
      <div style={{ display: "flex", gap: 4 }}>
        {(["en", "uz", "ru"] as Lang[]).map(l => (
          <button key={l} onClick={() => setLang(l)} style={{
            fontFamily: "'DM Mono',monospace", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em",
            padding: "5px 10px", borderRadius: 3, cursor: "none", transition: "all 0.2s",
            background: lang === l ? "white" : "transparent",
            color: lang === l ? "black" : "#555",
            border: lang === l ? "1px solid white" : "1px solid transparent",
          }}>{l}</button>
        ))}
      </div>
    </motion.nav>
  );
}

/* ─── Hero ─────────────────────────────────────────────── */
function Hero({ t }: { t: typeof translations.en }) {
  const [tick, setTick] = useState(true);
  useEffect(() => { const i = setInterval(() => setTick(p => !p), 600); return () => clearInterval(i); }, []);
  return (
    <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 clamp(20px,5vw,80px)", position: "relative", zIndex: 2, paddingTop: 80 }}>
      {/* Top label */}
      <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0} style={{ marginBottom: 40, display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 40, height: 1, background: "#333" }} />
        <span className="section-label">Portfolio 2025</span>
      </motion.div>
      {/* Greeting */}
      <motion.p variants={fadeUp} initial="hidden" animate="show" custom={1}
        style={{ fontFamily: "'DM Mono',monospace", fontSize: 14, color: "#666", marginBottom: 12, letterSpacing: "0.05em" }}>
        {t.hero.greeting}
      </motion.p>
      {/* Name */}
      <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={2}
        style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(3rem,10vw,8rem)", lineHeight: 0.9, letterSpacing: "-0.04em", marginBottom: 24, position: "relative" }}>
        <span style={{ display: "block" }}>{t.hero.name.split(" ")[0]}</span>
        <span style={{ display: "block", WebkitTextStroke: "1px rgba(255,255,255,0.3)", color: "transparent" }}>
          {t.hero.name.split(" ").slice(1).join(" ")}
          <span style={{ opacity: tick ? 1 : 0, transition: "opacity 0.1s", marginLeft: 4 }}>_</span>
        </span>
      </motion.h1>
      {/* Title */}
      <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} style={{ marginBottom: 32 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 4, padding: "8px 16px" }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", animation: "blink 2s ease-in-out infinite" }} />
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, color: "#ccc", letterSpacing: "0.06em" }}>
            {t.hero.title} — {t.hero.subtitle}
          </span>
        </div>
      </motion.div>
      {/* Description */}
      <motion.p variants={fadeUp} initial="hidden" animate="show" custom={4}
        style={{ fontFamily: "'DM Mono',monospace", fontSize: 14, color: "#666", maxWidth: 500, lineHeight: 1.8, marginBottom: 48, letterSpacing: "0.02em" }}>
        {t.hero.description}
      </motion.p>
      {/* CTA */}
      <motion.div variants={fadeUp} initial="hidden" animate="show" custom={5} style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <a href="#projects" className="btn btn-primary">{t.hero.cta} →</a>
        <a href="#contact" className="btn btn-secondary">{t.hero.contact}</a>
      </motion.div>
      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        style={{ position: "absolute", bottom: 40, left: "clamp(20px,5vw,80px)", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, transparent, #444)", animation: "float 2s ease-in-out infinite" }} />
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: "#444", letterSpacing: "0.15em", textTransform: "uppercase", writingMode: "vertical-rl" }}>scroll</span>
      </motion.div>
    </section>
  );
}

/* ─── Marquee ─────────────────────────────────────────────── */
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

/* ─── About ─────────────────────────────────────────────── */
function About({ t }: { t: typeof translations.en }) {
  return (
    <section id="about" style={{ padding: "0 clamp(20px,5vw,80px) 100px", position: "relative", zIndex: 2 }}>
      <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        style={{ height: 1, background: "rgba(255,255,255,0.08)", marginBottom: 60, transformOrigin: "left" }} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }} className="about-grid">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: "easeOut" as const }}>
          <p className="section-label">// about</p>
          <h2 className="section-title" style={{ marginBottom: 32 }}>{t.about.title}</h2>
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, color: "#888", lineHeight: 1.9, letterSpacing: "0.02em" }}>{t.about.text}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" as const }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { label: "location", value: t.about.location, icon: "◎" },
              { label: "email", value: t.about.email, icon: "✉" },
              { label: "phone", value: t.about.phone, icon: "◉" },
              { label: "telegram", value: t.about.telegram, href: `https://t.me/${t.about.telegram.replace("@","")}`, icon: "⟡" },
              { label: "github", value: t.about.github, href: `https://github.com/Abdubakiyev`, icon: "⬡" },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", gap: 20, alignItems: "center", padding: "14px 20px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 6 }}>
                <span style={{ fontSize: 16, minWidth: 24, textAlign: "center", color: "#444" }}>{item.icon}</span>
                <div>
                  <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: "#444", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 3 }}>{item.label}</p>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, color: "#ccc", textDecoration: "none", cursor: "none", transition: "color 0.2s" }}
                      onMouseEnter={e=>(e.currentTarget.style.color="#fff")} onMouseLeave={e=>(e.currentTarget.style.color="#ccc")}>{item.value}</a>
                  ) : (
                    <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, color: "#ccc" }}>{item.value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Skills ─────────────────────────────────────────────── */
function Skills({ t }: { t: typeof translations.en }) {
  return (
    <section id="skills" style={{ padding: "0 clamp(20px,5vw,80px) 100px", position: "relative", zIndex: 2 }}>
      <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        style={{ height: 1, background: "rgba(255,255,255,0.08)", marginBottom: 60, transformOrigin: "left" }} />
      <p className="section-label">// skills</p>
      <h2 className="section-title" style={{ marginBottom: 50 }}>{t.skills.title}</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 16 }}>
        {t.skills.categories.map((cat, i) => (
          <motion.div key={cat.label} className="card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.5 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 6, height: 6, background: "white", borderRadius: "50%" }} />
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.18em", color: "#555", textTransform: "uppercase" }}>{cat.label}</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {cat.items.map(item => (
                <span key={item} className="tag" style={{ fontFamily: "'DM Mono',monospace" }}>{item}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─── Projects ─────────────────────────────────────────────── */
function Projects({ t }: { t: typeof translations.en }) {
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  return (
    <section id="projects" style={{ padding: "0 clamp(20px,5vw,80px) 100px", position: "relative", zIndex: 2 }}>
      <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        style={{ height: 1, background: "rgba(255,255,255,0.08)", marginBottom: 60, transformOrigin: "left" }} />
      <p className="section-label">// projects</p>
      <h2 className="section-title" style={{ marginBottom: 50 }}>{t.projects.title}</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))", gap: 24 }}>
        {t.projects.list.map((proj, i) => (
          <motion.div key={proj.name} className="card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" as const }}>
            {/* Static image */}
            <div style={{ width: "100%", height: 200, borderRadius: 6, overflow: "hidden", marginBottom: 22, position: "relative", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
              {proj.image && !imgErrors[i] ? (
                <img
                  src={proj.image}
                  alt={proj.name}
                  onError={() => setImgErrors(prev => ({ ...prev, [i]: true }))}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s ease" }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                />
              ) : (
                <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>
                  <div style={{ width: 48, height: 48, border: "1px solid #2a2a2a", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 22, color: "#333" }}>⬡</span>
                  </div>
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: "#333", letterSpacing: "0.12em" }}>{proj.name.toUpperCase()}</span>
                </div>
              )}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 60, background: "linear-gradient(to top, rgba(17,17,17,0.8), transparent)", pointerEvents: "none" }} />
            </div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 11, color: "#333", letterSpacing: "0.15em", marginBottom: 8 }}>0{i+1}</div>
            <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 20, letterSpacing: "-0.02em", marginBottom: 12, color: "#f0f0f0" }}>{proj.name}</h3>
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: "#666", lineHeight: 1.8, marginBottom: 16, letterSpacing: "0.02em" }}>{proj.desc}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
              {proj.tech.map(tag => <span key={tag} className="tag">{tag}</span>)}
            </div>
            {proj.link && (
              <a href={proj.link} target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#888", letterSpacing: "0.06em", textDecoration: "none", padding: "8px 12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 4, transition: "all 0.2s", cursor: "none" }}
                onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "#888"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}>
                <span style={{ fontSize: 14 }}>⬡</span> View Project →
              </a>
            )}
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
        style={{ marginTop: 32, textAlign: "center" }}>
        <a href="https://github.com/Abdubakiyev" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ cursor: "none" }}>
          ⬡ {t.projects.github}
        </a>
      </motion.div>
    </section>
  )
}

/* ─── Experience ─────────────────────────────────────────────── */
function Experience({ t }: { t: typeof translations.en }) {
  return (
    <section id="experience" style={{ padding: "0 clamp(20px,5vw,80px) 100px", position: "relative", zIndex: 2 }}>
      <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        style={{ height: 1, background: "rgba(255,255,255,0.08)", marginBottom: 60, transformOrigin: "left" }} />
      <p className="section-label">// experience</p>
      <h2 className="section-title" style={{ marginBottom: 50 }}>{t.experience.title}</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {t.experience.list.map((exp, i) => (
          <motion.div key={exp.company} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}
            style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 40, padding: "40px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div>
              <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 16, color: "#f0f0f0", marginBottom: 6 }}>{exp.company}</p>
              <span className="tag" style={{ marginBottom: 8, display: "inline-block" }}>{exp.period}</span>
              <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#666", letterSpacing: "0.04em", marginTop: 6 }}>{exp.role}</p>
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {exp.items.map((item, j) => (
                <li key={j} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span style={{ color: "#333", fontSize: 14, marginTop: 2 }}>▸</span>
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, color: "#888", lineHeight: 1.7, letterSpacing: "0.02em" }}>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─── Certificates ─────────────────────────────────────────────── */
function Certificates({ t }: { t: typeof translations.en }) {
  const [certs, setCerts] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => setCerts(prev => [...prev, ev.target?.result as string]);
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  return (
    <section id="certificates" style={{ padding: "0 clamp(20px,5vw,80px) 100px", position: "relative", zIndex: 2 }}>
      <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        style={{ height: 1, background: "rgba(255,255,255,0.08)", marginBottom: 60, transformOrigin: "left" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 50, flexWrap: "wrap", gap: 20 }}>
        <div>
          <p className="section-label">// certificates</p>
          <h2 className="section-title">{t.certificates.title}</h2>
        </div>
        <button onClick={() => fileRef.current?.click()} className="btn btn-secondary" style={{ cursor: "none" }}>
          + {t.certificates.placeholder}
        </button>
        <input ref={fileRef} type="file" accept="image/*" multiple style={{ display: "none" }} onChange={handleAdd} />
      </div>
      {certs.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => fileRef.current?.click()}
          style={{ border: "1px dashed rgba(255,255,255,0.1)", borderRadius: 8, padding: "80px 40px", textAlign: "center", cursor: "none", transition: "border-color 0.2s" }}
          whileHover={{ borderColor: "rgba(255,255,255,0.25)" }}>
          <div style={{ fontSize: 48, marginBottom: 16, color: "#222" }}>◎</div>
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, color: "#444", letterSpacing: "0.06em" }}>{t.certificates.empty}</p>
        </motion.div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 20 }}>
          <AnimatePresence>
            {certs.map((src, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4 }}
                style={{ position: "relative", borderRadius: 8, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", cursor: "none" }}
                whileHover={{ scale: 1.02 }}>
                <img src={src} alt={`Certificate ${i+1}`} style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }} />
                <button onClick={() => setCerts(prev => prev.filter((_,j) => j !== i))}
                  style={{ position: "absolute", top: 8, right: 8, background: "rgba(0,0,0,0.7)", border: "1px solid rgba(255,255,255,0.2)", color: "white", width: 28, height: 28, borderRadius: 4, fontSize: 12, cursor: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
              </motion.div>
            ))}
          </AnimatePresence>
          <motion.div onClick={() => fileRef.current?.click()} whileHover={{ borderColor: "rgba(255,255,255,0.25)" }}
            style={{ border: "1px dashed rgba(255,255,255,0.1)", borderRadius: 8, height: 200, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, cursor: "none", transition: "border-color 0.2s" }}>
            <span style={{ fontSize: 28, color: "#333" }}>+</span>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#444", letterSpacing: "0.1em" }}>Add More</span>
          </motion.div>
        </div>
      )}
    </section>
  );
}

/* ─── Education + Languages ─────────────────────────────────────── */
function EducationLang({ t }: { t: typeof translations.en }) {
  return (
    <section style={{ padding: "0 clamp(20px,5vw,80px) 100px", position: "relative", zIndex: 2 }}>
      <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        style={{ height: 1, background: "rgba(255,255,255,0.08)", marginBottom: 60, transformOrigin: "left" }} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60 }} className="edu-grid">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="section-label">// education</p>
          <h2 className="section-title" style={{ marginBottom: 32 }}>{t.education.title}</h2>
          <div className="card">
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.15em", color: "#444", textTransform: "uppercase", marginBottom: 8 }}>institution</p>
            <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 20, color: "#f0f0f0", marginBottom: 8 }}>{t.education.school}</p>
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, color: "#888", marginBottom: 12, lineHeight: 1.6 }}>{t.education.program}</p>
            <span className="tag">{t.education.period}</span>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.6 }}>
          <p className="section-label">// languages</p>
          <h2 className="section-title" style={{ marginBottom: 32 }}>{t.languages.title}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {t.languages.list.map((item, i) => (
              <motion.div key={item.lang} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i*0.08, duration: 0.5 }}
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

/* ─── Contact ─────────────────────────────────────────────── */
function Contact({ t }: { t: typeof translations.en }) {
  return (
    <section id="contact" style={{ padding: "0 clamp(20px,5vw,80px) 100px", position: "relative", zIndex: 2 }}>
      <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        style={{ height: 1, background: "rgba(255,255,255,0.08)", marginBottom: 80, transformOrigin: "left" }} />
      <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-label" style={{ marginBottom: 16 }}>// contact</motion.p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }} className="section-title" style={{ marginBottom: 20 }}>{t.contact.title}</motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, color: "#666", lineHeight: 1.8, marginBottom: 48 }}>{t.contact.subtitle}</motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
          style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="mailto:abdullohabdubakiyev@gmail.com" className="btn btn-primary">✉ Email</a>
          <a href="https://t.me/kaneki_798" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">⟡ Telegram</a>
          <a href="https://github.com/Abdubakiyev" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">⬡ GitHub</a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────── */
function Footer({ t }: { t: typeof translations.en }) {
  return (
    <footer style={{ padding: "40px clamp(20px,5vw,80px)", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 2, flexWrap: "wrap", gap: 16 }}>
      <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 20, letterSpacing: "-0.04em" }}>AA</span>
      <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#444", letterSpacing: "0.1em" }}>© 2025 Abdulloh Abdubakiyev</span>
      <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#333", letterSpacing: "0.08em" }}>Built with Next.js</span>
    </footer>
  );
}

/* ─── Main Page ─────────────────────────────────────────────── */
export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const t = translations[lang];

  return (
    <>
      <Cursor />
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
        }
      `}</style>
    </>
  );
}
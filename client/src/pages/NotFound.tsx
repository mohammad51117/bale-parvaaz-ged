/* Atlas Study Hall: utility state styled as a calm folio interruption, using parchment, ink-blue type, saffron action, and book-spine language. */
import { Link } from "wouter";
import { ArrowLeft, BookOpen, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <main style={{ minHeight: "100vh", background: "#F7F2E9", color: "#253747", display: "grid", placeItems: "center", padding: "24px", fontFamily: '"DM Sans", sans-serif' }}>
      <section style={{ width: "min(620px, 100%)", background: "#FFFDF8", border: "1px solid #E2D9CB", boxShadow: "14px 14px 0 #EAE1D3", padding: "clamp(28px, 6vw, 58px)", position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 8, background: "#213F55" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 12, color: "#B08335", fontSize: 10, fontWeight: 800, letterSpacing: ".14em" }}><BookOpen size={16} /> BALE PARVAAZ GED</div>
        <div style={{ display: "flex", gap: 22, alignItems: "flex-start", marginTop: 34 }}><div style={{ color: "#D79B37", paddingTop: 7 }}><FileQuestion size={42} strokeWidth={1.4} /></div><div><div style={{ color: "#B08335", font: '500 52px/.8 "Fraunces", Georgia, serif' }}>404</div><h1 style={{ color: "#28495D", font: '500 clamp(28px, 5vw, 42px)/1.08 "Fraunces", Georgia, serif', letterSpacing: "-.04em", margin: "16px 0 12px" }}>That folio is out of order.</h1><p style={{ color: "#77827D", fontSize: 14, lineHeight: 1.65, margin: 0, maxWidth: 400 }}>The page you reached is not part of this study desk. Let’s return to the place where the questions are waiting.</p></div></div>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 32, background: "#E5A23A", color: "#213F55", padding: "12px 17px", borderRadius: 5, fontSize: 12, fontWeight: 800, textDecoration: "none" }}><ArrowLeft size={16} /> Return to study desk</Link>
        <div style={{ marginTop: 35, paddingTop: 15, borderTop: "1px solid #E3D9CA", color: "#A28F71", fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase" }}>A quiet detour · back to the book</div>
      </section>
    </main>
  );
}

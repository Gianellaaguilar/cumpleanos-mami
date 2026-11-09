import { useMemo } from "react";
import { motion } from "framer-motion";
import { BookHeart } from "lucide-react";
import { gardenText } from "../data/memories.js";
import Butterflies from "./Butterflies.jsx";

const FLOWER_SPOTS = [
  { left: "3%", stem: 70, bloom: 34, delay: 0.4 },
  { left: "8%", stem: 115, bloom: 46, delay: 0.8, variant: "pastel" },
  { left: "14%", stem: 85, bloom: 40, delay: 0.55 },
  { left: "20%", stem: 135, bloom: 54, delay: 1.0, variant: "cream" },
  { left: "26%", stem: 75, bloom: 36, delay: 0.65 },
  { left: "32%", stem: 105, bloom: 44, delay: 0.9, variant: "pastel" },
  { left: "38%", stem: 65, bloom: 32, delay: 0.5 },
  { left: "60%", stem: 70, bloom: 34, delay: 0.75 },
  { left: "66%", stem: 125, bloom: 50, delay: 0.7, variant: "cream" },
  { left: "73%", stem: 88, bloom: 42, delay: 0.95 },
  { left: "79%", stem: 118, bloom: 46, delay: 0.5, variant: "pastel" },
  { left: "85%", stem: 78, bloom: 38, delay: 0.75 },
  { left: "91%", stem: 110, bloom: 44, delay: 0.6 },
  { left: "96%", stem: 68, bloom: 34, delay: 0.85, variant: "cream" },
];

const GRASS_SPOTS = Array.from({ length: 18 }, (_, i) => ({
  left: `${(i * 5.6 + 2) % 98}%`,
  height: 18 + (i % 4) * 9,
  delay: 0.3 + (i % 6) * 0.15,
}));

const FIELD_FLOWERS = Array.from({ length: 16 }, (_, i) => ({
  left: `${(i * 6.3 + 4) % 94}%`,
  bottom: `${3 + ((i * 7) % 16)}%`,
  size: 7 + (i % 3) * 3,
  delay: (i % 5) * 0.8,
  color: i % 3 === 0 ? "#fbe9c9" : i % 3 === 1 ? "#f5d6e0" : "#d99aaf",
}));

const FinalGarden = ({ onRestart }) => {
  const fireflies = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        left: Math.random() * 96,
        top: 15 + Math.random() * 65,
        dur: 6 + Math.random() * 7,
        delay: Math.random() * 6,
        fx: (Math.random() - 0.5) * 90,
        fy: (Math.random() - 0.5) * 70,
      })),
    [],
  );

  return (
    <div className="scene">
      <div className="scene-bg garden-sky">
        <div className="garden-ground back" />
        <div className="garden-ground" />
        {GRASS_SPOTS.map((g, i) => (
          <span
            key={`g${i}`}
            className="grass"
            style={{ left: g.left, height: g.height, animationDelay: `${g.delay}s, ${g.delay + 1.2}s` }}
          />
        ))}
        {FIELD_FLOWERS.map((f, i) => (
          <span
            key={`f${i}`}
            className="field-flower"
            style={{
              left: f.left,
              bottom: f.bottom,
              width: f.size,
              height: f.size,
              background: f.color,
              animationDelay: `${f.delay}s`,
            }}
          />
        ))}
        {fireflies.map((f) => (
          <span
            key={f.id}
            className="firefly"
            style={{
              left: `${f.left}%`,
              top: `${f.top}%`,
              "--dur": `${f.dur}s`,
              "--fx": `${f.fx}px`,
              "--fy": `${f.fy}px`,
              animationDelay: `${f.delay}s`,
            }}
          />
        ))}
        {FLOWER_SPOTS.map((fl, i) => (
          <div
            key={i}
            className={`garden-flower${fl.variant ? ` ${fl.variant}` : ""}`}
            style={{ left: fl.left, "--stem-h": `${fl.stem}px`, "--bloom": `${fl.bloom}px`, animationDelay: `${fl.delay}s, ${fl.delay + 1.4}s` }}
          >
            <div className="bloom" />
            <div className="stem" />
            <span className="leaf l" />
            <span className="leaf r" />
          </div>
        ))}
        <Butterflies count={5} />
      </div>

      <div className="scene-content" style={{ maxWidth: 640 }}>
        <motion.h1
          className="handwritten"
          style={{ fontSize: "clamp(2.4rem, 7vw, 4rem)", color: "var(--rosa-profundo)", margin: 0 }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          {gardenText.title}
        </motion.h1>

        <motion.div
          className="paper paper-edge"
          style={{ borderRadius: 16, padding: "1.4rem 1.8rem", margin: "1.2rem 0", maxWidth: 560 }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.9 }}
        >
          <p style={{ margin: 0, fontSize: "clamp(0.95rem, 2.6vw, 1.1rem)", lineHeight: 1.75, fontStyle: "italic", color: "var(--tinta)" }}>
            {gardenText.message}
          </p>
        </motion.div>

        <motion.button
          className="btn-primary"
          onClick={onRestart}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          <BookHeart size={18} />
          {gardenText.button}
        </motion.button>
      </div>
    </div>
  );
};

export default FinalGarden;

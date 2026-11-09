import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, Star, BookOpen } from "lucide-react";
import { cakeText } from "../data/memories.js";
import { startHappyBirthdayLoop } from "../utils/happyBirthday.js";

const ROSES = [
  { bottom: 96, left: "64%" },
  { bottom: 90, left: "73%" },
  { bottom: 92, left: "58%", small: true },
  { bottom: 6, left: "6%" },
  { bottom: 8, left: "13%", small: true },
];

const MACARONS = [
  { bottom: 94, left: "69%", r: 10 },
  { bottom: 86, left: "71%", r: -12 },
  { bottom: 4, left: "11%", r: 8 },
];

const LEAVES = [
  { bottom: 106, left: "60%", r: -30 },
  { bottom: 102, left: "78%", r: 45 },
  { bottom: 80, left: "80%", r: -50 },
  { bottom: 12, left: "2%", r: 20 },
  { bottom: 16, left: "16%", r: -25 },
];

const Confetti = () => {
  const pieces = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => {
        const kind = i % 3; // 0 corazón, 1 estrella, 2 círculo
        const colors = ["#d99aaf", "#b96f89", "#d7b978", "#f5d6e0", "#a5ae8a"];
        return {
          id: i,
          kind,
          color: colors[i % colors.length],
          x: (Math.random() - 0.5) * Math.min(window.innerWidth * 0.8, 700),
          y: -(100 + Math.random() * 320),
          rotate: (Math.random() - 0.5) * 540,
          scale: 0.5 + Math.random() * 0.9,
          delay: Math.random() * 0.4,
        };
      }),
    [],
  );

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="confetti-piece"
          style={{ left: "50%", top: "38%", scale: p.scale }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{ x: p.x, y: [0, p.y, window.innerHeight * 0.55], opacity: [1, 1, 0], rotate: p.rotate }}
          transition={{ duration: 2.6, delay: p.delay, ease: "easeOut" }}
        >
          {p.kind === 0 && <Heart size={16} fill={p.color} color={p.color} />}
          {p.kind === 1 && <Star size={14} fill={p.color} color={p.color} />}
          {p.kind === 2 && (
            <span style={{ display: "block", width: 10, height: 10, borderRadius: "50%", background: p.color }} />
          )}
        </motion.span>
      ))}
    </div>
  );
};

const BirthdayCake = ({ onNext, musicRef }) => {
  const [blown, setBlown] = useState(false);

  // Mientras se esté en la escena de la torta, el piano de fondo se
  // pausa por completo y el "Feliz cumpleaños" suena en bucle.
  // Al salir, se detiene la melodía y vuelve el piano.
  useEffect(() => {
    musicRef?.current?.suspend();
    let hb = null;
    const t = setTimeout(() => {
      hb = startHappyBirthdayLoop();
    }, 1400);
    return () => {
      clearTimeout(t);
      hb?.stop();
      musicRef?.current?.resume();
    };
  }, [musicRef]);

  return (
    <div className="scene">
      <div className="scene-bg bg-paper" />
      {blown && <Confetti />}

      <div className="scene-content">
        <motion.h1
          className="title-xl"
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {cakeText.title}
        </motion.h1>
        <motion.p
          className="subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {cakeText.subtitle}
        </motion.p>

        <motion.div
          className="cake"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.9, type: "spring", stiffness: 60 }}
        >
          <div className="candles-row">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="candle">
                <span className="wick" />
                <span className={`flame${blown ? " out" : ""}`} style={{ animationDelay: `${i * 0.07}s` }} />
              </div>
            ))}
          </div>

          <div className="cake-tier t3"><span className="pearls" /></div>
          <div className="cake-tier t2"><span className="pearls" /></div>
          <div className="cake-tier t1"><span className="pearls" /></div>

          {ROSES.map((r, i) => (
            <span
              key={`r${i}`}
              className={`cake-rose${r.small ? " small" : ""}`}
              style={{ bottom: r.bottom, left: r.left }}
            />
          ))}
          {MACARONS.map((m, i) => (
            <span
              key={`m${i}`}
              className="macaron"
              style={{ bottom: m.bottom, left: m.left, transform: `rotate(${m.r}deg)` }}
            />
          ))}
          {LEAVES.map((l, i) => (
            <span
              key={`l${i}`}
              className="cake-leaf"
              style={{ bottom: l.bottom, left: l.left, transform: `rotate(${l.r}deg)` }}
            />
          ))}

          <div className="cake-plate" />
        </motion.div>

        <AnimatePresence mode="wait">
          {!blown ? (
            <motion.button
              key="wish"
              className="btn-primary"
              onClick={() => setBlown(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ delay: 0.9 }}
            >
              <Sparkles size={18} />
              {cakeText.button}
            </motion.button>
          ) : (
            <motion.div
              key="congrats"
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.9rem" }}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="handwritten" style={{ fontSize: "clamp(2rem, 6vw, 3rem)", margin: 0 }}>
                {cakeText.congrats}
              </h2>
              <p className="subtitle" style={{ margin: 0 }}>{cakeText.congratsSub}</p>
              <motion.button
                className="btn-primary"
                onClick={onNext}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1 }}
              >
                <BookOpen size={18} />
                {cakeText.next}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BirthdayCake;

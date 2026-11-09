import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MailOpen, Flower2, Flower } from "lucide-react";
import { MAMI_NAME, letterText } from "../data/memories.js";
import { Photo } from "./MemoryPage.jsx";

const Letter = ({ onNext }) => {
  const [phase, setPhase] = useState("closed"); // closed | opening | letter
  const [zoomedSrc, setZoomedSrc] = useState(null);

  const open = () => {
    if (phase !== "closed") return;
    setPhase("opening");
    setTimeout(() => setPhase("letter"), 1350);
  };

  return (
    <div className="scene">
      <div className="scene-bg bg-paper" />

      <div className="scene-content">
        <AnimatePresence mode="wait">
          {phase !== "letter" ? (
            <motion.div
              key="envelope"
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.6rem" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
            >
              <h1 className="title-xl" style={{ fontSize: "clamp(1.6rem, 4.6vw, 2.4rem)", maxWidth: "22ch" }}>
                {letterText.intro}
              </h1>

              <div
                className={`envelope${phase === "closed" ? " envelope-clickable" : ""}`}
                onClick={open}
                role="button"
                aria-label="Abrir la carta"
              >
                <div className="env-body">
                  <div className="env-inner" />
                  <span className="env-name">{MAMI_NAME}</span>
                </div>

                {/* Carta que se despliega desde dentro */}
                <motion.div
                  className="env-paper"
                  style={{ zIndex: phase === "opening" ? 5 : 2 }}
                  animate={phase === "opening" ? { y: "-58%" } : { y: 0 }}
                  transition={{ duration: 1.05, ease: "easeOut", delay: 0.35 }}
                />

                <motion.div
                  className="env-flap"
                  animate={phase === "opening" ? { rotateX: 180 } : { rotateX: 0 }}
                  transition={{ duration: 0.85, ease: "easeInOut" }}
                  style={{ transformStyle: "preserve-3d", zIndex: phase === "opening" ? 1 : 3 }}
                />
                <motion.div
                  className="env-seal"
                  animate={phase === "opening" ? { scale: 0, rotate: 60, opacity: 0 } : {}}
                  transition={{ duration: 0.4 }}
                >
                  <Flower2 size={24} />
                </motion.div>
              </div>

              <button className="btn-primary" onClick={open} disabled={phase !== "closed"}>
                <MailOpen size={19} />
                {letterText.button}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="letter"
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.2rem", width: "100%" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="letter-sheet paper paper-edge"
                initial={{ y: 60, opacity: 0, scale: 0.92 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
              >
                <Flower className="corner-flower tl" size={40} />
                <Flower className="corner-flower tr" size={40} />
                <Flower className="corner-flower bl" size={40} />
                <Flower className="corner-flower br" size={40} />

                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {letterText.greeting}
                </motion.h2>

                {letterText.paragraphs.map((p, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + i * 0.9, duration: 0.8 }}
                  >
                    {p}
                  </motion.p>
                ))}

                <motion.p
                  className="signature"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 + letterText.paragraphs.length * 0.9 }}
                >
                  {letterText.farewell}
                  {letterText.signature && (
                    <>
                      <br />
                      <strong>{letterText.signature}</strong>
                    </>
                  )}
                </motion.p>

                {letterText.photo && (
                  <motion.div
                    style={{ display: "flex", justifyContent: "center", marginTop: "1.4rem" }}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.6 + letterText.paragraphs.length * 0.9 }}
                  >
                    <Photo
                      src={letterText.photo.src}
                      caption={letterText.photo.caption}
                      rotate={-2}
                      onZoom={({ src, caption }) => setZoomedSrc({ src, caption })}
                    />
                  </motion.div>
                )}
              </motion.div>

              <motion.button
                className="btn-primary"
                onClick={onNext}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2 + letterText.paragraphs.length * 0.9 }}
              >
                <Flower2 size={18} />
                Entrar a nuestro jardín
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {zoomedSrc && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomedSrc(null)}
          >
            <figure>
              <img src={zoomedSrc.src} alt={zoomedSrc.caption} />
              <figcaption>{zoomedSrc.caption}</figcaption>
            </figure>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Letter;

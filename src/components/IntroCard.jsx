import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MailOpen, Heart } from "lucide-react";
import { MAMI_NAME, introText } from "../data/memories.js";
import Butterflies from "./Butterflies.jsx";
import Doily from "./Doily.jsx";

const CARD_SPARKLES = [
  { top: "18%", left: "12%" },
  { top: "14%", left: "68%" },
  { top: "30%", left: "88%" },
  { top: "55%", left: "8%" },
  { top: "42%", left: "46%" },
  { top: "66%", left: "82%" },
  { top: "22%", left: "34%" },
  { top: "72%", left: "58%" },
];

const IntroCard = ({ onOpen, onNext }) => {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    setOpened(true);
    onOpen?.();
  };

  return (
    <div className="scene">
      <div className="scene-bg bg-paper">
        <Doily className="doily tr" size={380} />
        <Doily className="doily bl" size={380} />
        <Butterflies count={3} />
      </div>

      <div className="card-3d-wrap">
        <div className="invite-card">
          {/* Interior de la tarjeta */}
          <div className="card-inside paper paper-edge golden-frame">
            <AnimatePresence>
              {opened && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.9 }}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.8rem" }}
                >
                  <Heart size={30} fill="var(--rosa-antiguo)" color="var(--rosa-intenso)" />
                  <h1 className="title-xl" style={{ fontSize: "clamp(1.7rem, 5vw, 2.6rem)" }}>
                    {introText.welcome}
                  </h1>
                  <p className="subtitle">{introText.welcomeSub}</p>
                  <motion.button
                    className="btn-primary"
                    onClick={onNext}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.6, duration: 0.5 }}
                  >
                    Continuar
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Frente de la tarjeta que se abre en 3D */}
          <motion.div
            className="card-front paper golden-frame"
            animate={opened ? { rotateY: -112, opacity: [1, 1, 0.0] } : { rotateY: 0 }}
            transition={
              opened
                ? { rotateY: { duration: 1.4, ease: "easeInOut" }, opacity: { delay: 1.1, duration: 0.4 } }
                : {}
            }
            style={{ pointerEvents: opened ? "none" : "auto" }}
          >
            {CARD_SPARKLES.map((s, i) => (
              <span
                key={i}
                className="bg-sparkle"
                style={{ top: s.top, left: s.left, animationDelay: `${i * 0.45}s` }}
              />
            ))}

            <motion.div
              className="bow-wrap"
              animate={opened ? { scale: 0, rotate: 40, opacity: 0 } : {}}
              transition={{ duration: 0.55, ease: "easeIn" }}
            >
              <div className="bow">
                <span className="tail l" />
                <span className="tail r" />
                <span className="loop l" />
                <span className="loop r" />
                <span className="knot" />
              </div>
            </motion.div>

            <h1
              className="title-xl"
              style={{ fontSize: "clamp(1.5rem, 4.6vw, 2.3rem)", color: "var(--dorado-oscuro)", marginTop: "2.6rem" }}
            >
              {introText.front}
            </h1>
            <p className="subtitle" style={{ marginBottom: "0.6rem" }}>
              {introText.frontHint}
            </p>
            <button className="btn-primary" onClick={handleOpen}>
              <MailOpen size={19} />
              {introText.button}
            </button>

            <span className="wax-seal">{MAMI_NAME}</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default IntroCard;

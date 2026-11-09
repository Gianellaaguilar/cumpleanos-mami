import { useState } from "react";
import { motion } from "framer-motion";
import { BookHeart, Flower2, Heart, Ribbon, Sparkles } from "lucide-react";
import { MAMI_NAME, coverText } from "../data/memories.js";

const ScrapbookCover = ({ onNext }) => {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(onNext, 1500);
  };

  return (
    <div className="scene">
      <div className="scene-bg bg-paper" />

      <div className="scene-content">
        <motion.h1
          className="title-xl"
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ maxWidth: "20ch" }}
        >
          {coverText.sceneTitle}
        </motion.h1>

        <div className="closed-book-wrap">
          <motion.div
            className="closed-book"
            initial={{ opacity: 0, y: 30, rotateX: 8 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.3, duration: 0.9, type: "spring", stiffness: 55 }}
          >
            <div className="book-back" />
            <div className="book-pages" />

            <motion.div
              className="book-front"
              animate={opening ? { rotateY: -105, opacity: [1, 1, 0] } : { rotateY: 0 }}
              transition={
                opening
                  ? { rotateY: { duration: 1.4, ease: "easeInOut" }, opacity: { delay: 1.05, duration: 0.35 } }
                  : {}
              }
              style={{ pointerEvents: opening ? "none" : "auto" }}
            >
              <Flower2 className="book-deco" size={34} style={{ top: 18, left: 18, opacity: 0.85 }} />
              <Flower2 className="book-deco" size={30} style={{ top: 18, right: 18, opacity: 0.7, transform: "scaleX(-1)" }} />
              <Heart className="book-deco" size={16} style={{ bottom: 90, left: 26, opacity: 0.75 }} fill="currentColor" />
              <Heart className="book-deco" size={13} style={{ bottom: 70, right: 34, opacity: 0.6 }} fill="currentColor" />
              <Ribbon className="book-deco" size={30} style={{ bottom: 22, right: 22, opacity: 0.85 }} />
              <Sparkles className="book-deco" size={18} style={{ top: 70, right: 40, opacity: 0.7 }} />

              <span className="name-tag">{MAMI_NAME}</span>
              <h2 style={{ fontFamily: "var(--font-title)", fontWeight: 500, fontSize: "clamp(1.15rem, 3.4vw, 1.5rem)", margin: "0.4rem 0 0", maxWidth: "22ch" }}>
                {coverText.title}
              </h2>
              <p style={{ fontFamily: "var(--font-hand)", fontSize: "clamp(1rem, 3vw, 1.25rem)", margin: 0, opacity: 0.95 }}>
                {coverText.subtitle}
              </p>
            </motion.div>
          </motion.div>
        </div>

        <motion.button
          className="btn-primary"
          style={{ marginTop: "1.8rem" }}
          onClick={handleOpen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          disabled={opening}
        >
          <BookHeart size={19} />
          {coverText.button}
        </motion.button>
      </div>
    </div>
  );
};

export default ScrapbookCover;

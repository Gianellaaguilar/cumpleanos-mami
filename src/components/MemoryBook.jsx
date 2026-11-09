import { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Flower2, Heart, Mail, X, Image as ImageIcon } from "lucide-react";
import { MAMI_NAME, albumPages, bookEnd } from "../data/memories.js";
import MemoryPage, { Photo } from "./MemoryPage.jsx";
import { playPageFlip } from "../utils/pageFlipSound.js";

const fileName = (src) => src.split("/").pop();

const CoverPage = () => (
  <div className="book-cover">
    <Flower2 size={40} style={{ opacity: 0.9 }} />
    <span className="cover-name">{MAMI_NAME}</span>
    <h1>Nuestro jardín de recuerdos</h1>
    <span className="cover-sub">Un pequeño libro para una persona inmensa en mi corazón</span>
    <Heart size={20} fill="currentColor" style={{ opacity: 0.8 }} />
  </div>
);

const BackCover = ({ onNext }) => (
  <div className="book-cover" style={{ background: "linear-gradient(150deg, #a35d77, var(--rosa-profundo))" }}>
    <Mail size={38} style={{ opacity: 0.9 }} />
    <h1 style={{ fontSize: "clamp(1.15rem, 3.4vw, 1.6rem)", maxWidth: "20ch", lineHeight: 1.4 }}>
      {bookEnd.text}
    </h1>
    <button
      className="btn-primary"
      onClick={onNext}
      style={{ marginTop: "0.6rem" }}
    >
      <Mail size={17} />
      {bookEnd.button}
    </button>
  </div>
);

const MemoryBook = ({ onNext }) => {
  const bookRef = useRef(null);
  const lastFlipSound = useRef(0);
  const [page, setPage] = useState(0);
  const [zoomed, setZoomed] = useState(null);
  const total = albumPages.length + 2; // + portada y contraportada

  // Abrir automáticamente la portada al llegar a esta escena
  useEffect(() => {
    const t = setTimeout(() => bookRef.current?.pageFlip()?.flipNext(), 900);
    return () => clearTimeout(t);
  }, []);

  const flip = (dir) => {
    const pf = bookRef.current?.pageFlip();
    if (!pf) return;
    dir === "next" ? pf.flipNext() : pf.flipPrev();
  };

  const isLast = page >= total - 1;

  return (
    <div className="scene">
      <div className="scene-bg bg-paper" />

      <div className="book-stage">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <HTMLFlipBook
            ref={bookRef}
            className="memory-book"
            width={460}
            height={620}
            size="stretch"
            minWidth={280}
            maxWidth={500}
            minHeight={380}
            maxHeight={680}
            maxShadowOpacity={0.45}
            showCover
            mobileScrollSupport
            usePortrait
            onFlip={(e) => {
              setPage(e.data);
              // Evita sonidos duplicados si el evento se dispara dos veces
              if (Date.now() - lastFlipSound.current > 350) {
                lastFlipSound.current = Date.now();
                playPageFlip();
              }
            }}
            style={{ margin: "0 auto" }}
          >
            <div className="page" data-density="hard">
              <CoverPage />
            </div>
            {albumPages.map((p, i) => (
              <div key={i} className="page">
                <MemoryPage page={p} index={i + 1} onZoom={setZoomed} />
              </div>
            ))}
            <div className="page" data-density="hard">
              <BackCover onNext={onNext} />
            </div>
          </HTMLFlipBook>
        </motion.div>

        <div className="book-controls">
          <button
            className="nav-arrow"
            onClick={() => flip("prev")}
            disabled={page <= 0}
            aria-label="Página anterior"
          >
            <ChevronLeft size={22} />
          </button>
          <span className="page-indicator">
            Página {Math.min(page, total - 1)} de {total - 1}
          </span>
          <button
            className="nav-arrow"
            onClick={() => flip("next")}
            disabled={isLast}
            aria-label="Página siguiente"
          >
            <ChevronRight size={22} />
          </button>
        </div>

      </div>

      {/* Visor de fotografía ampliada */}
      <AnimatePresence>
        {zoomed && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomed(null)}
          >
            <motion.figure
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 160, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="lightbox-close" onClick={() => setZoomed(null)} aria-label="Cerrar">
                <X size={20} />
              </button>
              <ZoomablePhoto {...zoomed} />
              <figcaption>{zoomed.caption}</figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ZoomablePhoto = ({ src, caption }) => {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className="photo-placeholder" style={{ width: "min(80vw, 500px)", height: 300 }}>
        <ImageIcon size={40} />
        <span>Coloca tu foto en</span>
        <strong>{fileName(src)}</strong>
      </div>
    );
  }
  return <img src={src} alt={caption} onError={() => setFailed(true)} />;
};

export default MemoryBook;

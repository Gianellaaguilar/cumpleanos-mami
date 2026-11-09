import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flower2, Heart, Image as ImageIcon, Quote } from "lucide-react";

const fileName = (src) => src.split("/").pop();

export const Photo = ({ src, caption, label, onZoom, tape = "tl", rotate = 0 }) => {
  const [failed, setFailed] = useState(false);

  return (
    <figure
      className="polaroid"
      style={{ transform: `rotate(${rotate}deg)`, cursor: "zoom-in", margin: 0 }}
      onClick={() => !failed && onZoom?.({ src, caption })}
    >
      {label && <span className="photo-label">{label}</span>}
      <span className={`tape ${tape}`} />
      <div className="photo-window">
        {failed ? (
          <div className="photo-placeholder">
            <ImageIcon size={30} />
            <span>Coloca tu foto en</span>
            <strong>{fileName(src)}</strong>
            <span>public/images/mami/</span>
          </div>
        ) : (
          <img src={src} alt={caption} onError={() => setFailed(true)} loading="lazy" />
        )}
      </div>
      <figcaption className="caption">{caption}</figcaption>
    </figure>
  );
};

// Lista interactiva "cosas que amo de ti": cada corazón se llena al tocarlo
const ReasonsList = ({ data }) => {
  const [loved, setLoved] = useState(() => new Set());
  const [bursts, setBursts] = useState([]);

  const toggle = (i) => {
    if (loved.has(i)) return;
    setLoved((s) => new Set(s).add(i));
    const id = Date.now() + i;
    setBursts((b) => [...b, { id, item: i }]);
    setTimeout(() => setBursts((b) => b.filter((x) => x.id !== id)), 900);
  };

  const all = loved.size === data.items.length;

  return (
    <div className="reasons-card" onClick={(e) => e.stopPropagation()}>
      <span className="tape" style={{ top: -10, left: "50%", marginLeft: -37 }} />
      <h4 className="reasons-title">{data.title}</h4>
      <ol style={{ margin: 0, padding: 0, listStyle: "none" }}>
        {data.items.map((item, i) => (
          <li key={i} className="reason-item">
            <button
              className="reason-heart"
              onClick={() => toggle(i)}
              aria-label={`Marcar: ${item}`}
            >
              <motion.span
                animate={loved.has(i) ? { scale: [0.6, 1.35, 1] } : {}}
                transition={{ duration: 0.45 }}
                style={{ display: "flex" }}
              >
                <Heart
                  size={19}
                  color="var(--rosa-intenso)"
                  fill={loved.has(i) ? "var(--rosa-intenso)" : "none"}
                />
              </motion.span>
              {bursts
                .filter((b) => b.item === i)
                .map((b) =>
                  [-1, 0, 1].map((k) => (
                    <motion.span
                      key={`${b.id}-${k}`}
                      className="burst-heart"
                      initial={{ y: 0, x: 0, opacity: 1, scale: 0.5 }}
                      animate={{ y: -30 - Math.abs(k) * 8, x: k * 14, opacity: 0, scale: 1 }}
                      transition={{ duration: 0.85, ease: "easeOut" }}
                    >
                      <Heart size={9} fill="var(--rosa-antiguo)" color="var(--rosa-antiguo)" />
                    </motion.span>
                  )),
                )}
            </button>
            <span className="reason-num">{i + 1}.</span>
            <span className="reason-text">{item}</span>
          </li>
        ))}
      </ol>
      <AnimatePresence>
        {all && (
          <motion.p
            className="reasons-finale"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 14 }}
          >
            {data.finale}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

const Secret = ({ icon, message }) => {
  const [open, setOpen] = useState(false);
  const Icon = icon === "heart" ? Heart : Flower2;

  return (
    <span className="secret" onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}>
      <Icon size={26} fill={icon === "heart" ? "currentColor" : "none"} />
      <AnimatePresence>
        {open && (
          <motion.span
            className="secret-pop"
            initial={{ opacity: 0, y: 8, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.8 }}
          >
            {message}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
};

const MemoryPage = ({ page, index, onZoom }) => {
  const side = index % 2 === 1 ? "left" : "right";
  const photos = page.photos || [];
  const layout = page.layout || (photos.length > 2 ? "collage" : photos.length === 1 ? "single" : "duo");

  return (
    <article className={`book-page paper paper-edge ${side}`}>
      <h3 className="page-title" style={{ textAlign: "center" }}>{page.title}</h3>
      {page.note && (
        <p className="page-note" style={{ textAlign: "center", margin: "0 0 0.5rem" }}>{page.note}</p>
      )}

      {page.text && <p className="page-text" style={{ textAlign: "center" }}>{page.text}</p>}

      {page.quotes?.map((q, i) => (
        <blockquote key={i} style={{ margin: "0.6rem 0", padding: "0 0.5rem", textAlign: "center" }}>
          <Quote size={14} style={{ opacity: 0.5, marginRight: 4 }} />
          <span className="page-text">{q}</span>
        </blockquote>
      ))}

      {photos.length > 0 && (
        <div className={`page-photos ${layout}`}>
          {photos.map((p, i) => (
            <Photo
              key={i}
              src={p.src}
              caption={p.caption}
              label={p.label}
              onZoom={onZoom}
              tape={i % 2 === 0 ? "tl" : "tr"}
              rotate={photos.length > 1 ? (i % 2 === 0 ? -2.5 : 2.5) : 0}
            />
          ))}
        </div>
      )}

      {page.reasons && <ReasonsList data={page.reasons} />}

      {page.tag && <span className="page-tag">{page.tag}</span>}

      {page.secrets?.length > 0 && (
        <div style={{ display: "flex", justifyContent: "center", gap: "0.6rem", padding: "0.3rem 0" }}>
          {page.secrets.map((s, i) => (
            <Secret key={i} icon={s.icon} message={s.message} />
          ))}
        </div>
      )}

      <span className="page-number">— {index} —</span>
    </article>
  );
};

export default MemoryPage;

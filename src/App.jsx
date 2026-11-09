import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import IntroCard from "./components/IntroCard.jsx";
import BirthdayCake from "./components/BirthdayCake.jsx";
import ScrapbookCover from "./components/ScrapbookCover.jsx";
import MemoryBook from "./components/MemoryBook.jsx";
import Letter from "./components/Letter.jsx";
import FinalGarden from "./components/FinalGarden.jsx";
import MusicPlayer from "./components/MusicPlayer.jsx";
import Petals from "./components/Petals.jsx";

const SCENES = {
  intro: IntroCard,
  cake: BirthdayCake,
  cover: ScrapbookCover,
  book: MemoryBook,
  letter: Letter,
  garden: FinalGarden,
};

const App = () => {
  const [scene, setScene] = useState("intro");
  const [musicStarted, setMusicStarted] = useState(false);
  const musicRef = useRef(null);

  const startMusic = () => {
    if (musicStarted) return;
    setMusicStarted(true);
    // La música solo comienza tras la primera interacción de Mami
    setTimeout(() => musicRef.current?.play(), 400);
  };

  const Scene = SCENES[scene];

  const props = {
    intro: { onOpen: startMusic, onNext: () => setScene("cake") },
    cake: { onNext: () => setScene("cover"), musicRef },
    cover: { onNext: () => setScene("book") },
    book: { onNext: () => setScene("letter") },
    letter: { onNext: () => setScene("garden") },
    garden: { onRestart: () => setScene("book") },
  }[scene];

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={scene}
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.015 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          style={{ position: "fixed", inset: 0 }}
        >
          <Scene {...props} />
        </motion.div>
      </AnimatePresence>

      <Petals count={18} />
      <MusicPlayer ref={musicRef} visible={musicStarted} />
    </>
  );
};

export default App;

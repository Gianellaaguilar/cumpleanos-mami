import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Music, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { MUSIC_SRC } from "../data/memories.js";

const MusicPlayer = forwardRef(function MusicPlayer({ visible }, ref) {
  const audioRef = useRef(null);
  const duckTimer = useRef(null);
  const suspendedRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [muted, setMuted] = useState(false);

  useImperativeHandle(ref, () => ({
    play() {
      const audio = audioRef.current;
      if (!audio) return;
      audio.volume = volume;
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    },
    // Baja el volumen mientras suena el "Feliz cumpleaños"
    duck(seconds) {
      const audio = audioRef.current;
      if (!audio) return;
      audio.volume = Math.max(0.05, audio.volume * 0.22);
      clearTimeout(duckTimer.current);
      duckTimer.current = setTimeout(() => {
        if (audioRef.current) audioRef.current.volume = muted ? 0 : volume;
      }, seconds * 1000);
    },
    // Restaura el volumen al salir de la escena de la torta
    unduck() {
      clearTimeout(duckTimer.current);
      if (audioRef.current) audioRef.current.volume = muted ? 0 : volume;
    },
    // Pausa el piano de fondo (p. ej., durante la escena de la torta)
    suspend() {
      const audio = audioRef.current;
      if (!audio) return;
      suspendedRef.current = !audio.paused;
      audio.pause();
    },
    // Retoma el piano de fondo donde quedó
    resume() {
      const audio = audioRef.current;
      if (audio && suspendedRef.current) audio.play().catch(() => {});
      suspendedRef.current = false;
    },
  }));

  if (!visible) {
    return <audio ref={audioRef} src={MUSIC_SRC} loop preload="auto" />;
  }

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  const changeVolume = (e) => {
    const v = Number(e.target.value);
    setVolume(v);
    setMuted(v === 0);
    if (audioRef.current) audioRef.current.volume = v;
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const next = !muted;
    setMuted(next);
    audio.volume = next ? 0 : volume || 0.6;
  };

  return (
    <div className="music-player">
      <audio ref={audioRef} src={MUSIC_SRC} loop preload="auto" />
      <Music size={18} color="var(--rosa-intenso)" />
      <button onClick={toggle} aria-label={playing ? "Pausar música" : "Reproducir música"}>
        {playing ? <Pause size={16} /> : <Play size={16} />}
      </button>
      <button
        onClick={toggleMute}
        aria-label={muted ? "Activar sonido" : "Silenciar"}
        style={{ background: "transparent", color: "var(--rosa-intenso)", width: 32, height: 32 }}
      >
        {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.05"
        value={muted ? 0 : volume}
        onChange={changeVolume}
        aria-label="Volumen"
      />
    </div>
  );
});

export default MusicPlayer;

// Melodía de "Feliz cumpleaños" sintetizada con Web Audio.
// Timbre suave tipo caja de música/piano. No requiere archivos externos.

const midiToFreq = (m) => 440 * Math.pow(2, (m - 69) / 12);

// [nota MIDI, duración en tiempos]
const MELODY = [
  [67, 0.75], [67, 0.25], [69, 1], [67, 1], [72, 1], [71, 2],
  [67, 0.75], [67, 0.25], [69, 1], [67, 1], [74, 1], [72, 2],
  [67, 0.75], [67, 0.25], [79, 1], [76, 1], [72, 1], [71, 1], [69, 2],
  [77, 0.75], [77, 0.25], [76, 1], [72, 1], [74, 1], [72, 2.5],
];

// Bajos suaves que acompañan cada frase: [nota MIDI, tiempo de inicio en tiempos, duración]
const BASS = [
  [48, 0, 6],        // Do — primera frase
  [48, 8, 3],        // Do — segunda frase (inicio)
  [43, 11, 3],       // Sol — segunda frase (final)
  [48, 16, 3.5],     // Do — tercera frase
  [53, 20, 2],       // Fa — cuarta frase (inicio)
  [48, 23.5, 4],     // Do — cierre
];

const BEAT = 0.5; // segundos por tiempo (~tempo 120 tranquilo)
export const HB_DURATION = 26 * BEAT; // duración total aproximada en segundos

const makeNote = (ctx, dest, freq, t, dur, gain) => {
  const osc = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const g = ctx.createGain();
  const g2 = ctx.createGain();

  osc.type = "sine";
  osc.frequency.value = freq;
  osc2.type = "sine";
  osc2.frequency.value = freq * 2;
  g2.gain.value = 0.18;

  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gain, t + 0.012);
  g.gain.exponentialRampToValueAtTime(gain * 0.35, t + 0.35);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);

  osc.connect(g);
  osc2.connect(g2);
  g2.connect(g);
  g.connect(dest);

  osc.start(t);
  osc2.start(t);
  osc.stop(t + dur + 0.05);
  osc2.stop(t + dur + 0.05);
};

const scheduleSong = (ctx, master) => {
  const t0 = ctx.currentTime + 0.08;
  let beat = 0;

  for (const [midi, beats] of MELODY) {
    makeNote(ctx, master, midiToFreq(midi), t0 + beat * BEAT, Math.min(beats * BEAT * 1.9, 2.4), 0.5);
    beat += beats;
  }
  for (const [midi, start, beats] of BASS) {
    makeNote(ctx, master, midiToFreq(midi), t0 + start * BEAT, beats * BEAT * 0.9, 0.16);
  }
};

// La melodía suena en bucle hasta llamar a controller.stop()
export const startHappyBirthdayLoop = () => {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const master = ctx.createGain();
  master.gain.value = 0.85;

  // Pequeño eco para darle calidez de caja de música
  const delay = ctx.createDelay(1);
  delay.delayTime.value = 0.27;
  const feedback = ctx.createGain();
  feedback.gain.value = 0.22;
  const wet = ctx.createGain();
  wet.gain.value = 0.16;

  master.connect(ctx.destination);
  master.connect(delay);
  delay.connect(feedback);
  feedback.connect(delay);
  delay.connect(wet);
  wet.connect(ctx.destination);

  let timer = null;
  let stopped = false;

  const playOnce = () => {
    if (stopped) return;
    scheduleSong(ctx, master);
    timer = setTimeout(playOnce, HB_DURATION * 1000 + 400);
  };
  playOnce();

  return {
    stop() {
      stopped = true;
      clearTimeout(timer);
      ctx.close().catch(() => {});
    },
  };
};

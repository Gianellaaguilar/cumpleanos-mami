// Sonido de pasar página sintetizado con Web Audio:
// dos ráfagas cortas de ruido filtrado que imitan el roce del papel.

let ctx = null;

const noiseBurst = (ctx, t, dur, freqStart, freqEnd, vol) => {
  const bufferSize = Math.ceil(ctx.sampleRate * dur);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

  const src = ctx.createBufferSource();
  src.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(freqStart, t);
  filter.frequency.exponentialRampToValueAtTime(freqEnd, t + dur);
  filter.Q.value = 0.9;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(vol, t + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);

  src.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  src.start(t);
  src.stop(t + dur);
};

export const playPageFlip = () => {
  ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
  if (ctx.state === "suspended") ctx.resume();

  const t = ctx.currentTime;
  // Levantar la hoja: susurro agudo descendente
  noiseBurst(ctx, t, 0.22, 3200, 900, 0.22);
  // Asentar la hoja: roce más grave y suave
  noiseBurst(ctx, t + 0.12, 0.26, 1400, 500, 0.14);
};

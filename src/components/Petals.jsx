import { useMemo } from "react";

const CONFETTI_COLORS = ["#d7b978", "#d99aaf", "#b96f89", "#e8c39a"];

const Petals = ({ count = 16 }) => {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const confetti = i % 4 === 3;
        const size = confetti ? 5 + Math.random() * 4 : 9 + Math.random() * 16;
        return {
          id: i,
          confetti,
          blurred: !confetti && size > 20,
          color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
          left: Math.random() * 100,
          size,
          duration: 8 + Math.random() * 8,
          delay: Math.random() * 9,
          drift: (Math.random() - 0.5) * 240,
        };
      }),
    [count],
  );

  return (
    <div className="petals-layer" aria-hidden="true">
      {petals.map((p) => (
        <span
          key={p.id}
          className={`petal${p.confetti ? " confetti" : ""}${p.blurred ? " blurred" : ""}`}
          style={{
            left: `${p.left}%`,
            width: p.confetti ? p.size * 0.55 : p.size,
            height: p.size,
            ...(p.confetti ? { background: p.color } : {}),
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            "--drift": `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
};

export default Petals;

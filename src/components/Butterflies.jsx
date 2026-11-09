import { useMemo } from "react";

const Butterfly = ({ style }) => (
  <div className="butterfly" style={style}>
    <span className="wing left" />
    <span className="body" />
    <span className="wing right" />
  </div>
);

const Butterflies = ({ count = 2 }) => {
  const butterflies = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: 10 + Math.random() * 60,
        left: 8 + Math.random() * 80,
        wander: 16 + Math.random() * 14,
        vars: {
          "--x1": `${(Math.random() - 0.5) * 160}px`,
          "--y1": `${(Math.random() - 0.5) * 120}px`,
          "--x2": `${(Math.random() - 0.5) * 220}px`,
          "--y2": `${(Math.random() - 0.5) * 140}px`,
          "--x3": `${(Math.random() - 0.5) * 160}px`,
          "--y3": `${(Math.random() - 0.5) * 120}px`,
          "--x4": `${(Math.random() - 0.5) * 140}px`,
          "--y4": `${(Math.random() - 0.5) * 160}px`,
        },
      })),
    [count],
  );

  return (
    <>
      {butterflies.map((b) => (
        <Butterfly
          key={b.id}
          style={{
            top: `${b.top}%`,
            left: `${b.left}%`,
            "--wander": `${b.wander}s`,
            ...b.vars,
          }}
        />
      ))}
    </>
  );
};

export default Butterflies;

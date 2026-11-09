import { useId } from "react";

// Blonda de encaje dibujada con SVG: borde festoneado y puntos de calado.
const Doily = ({ size = 340, style, className }) => {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");

  const scallops = Array.from({ length: 36 }, (_, i) => {
    const a = (i / 36) * Math.PI * 2;
    return { x: 100 + Math.cos(a) * 92, y: 100 + Math.sin(a) * 92 };
  });
  const holes = Array.from({ length: 24 }, (_, i) => {
    const a = (i / 24) * Math.PI * 2;
    return { x: 100 + Math.cos(a) * 68, y: 100 + Math.sin(a) * 68 };
  });

  return (
    <svg
      className={className}
      style={style}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      aria-hidden="true"
    >
      <defs>
        <pattern id={`lace-${id}`} width="9" height="9" patternUnits="userSpaceOnUse">
          <circle cx="4.5" cy="4.5" r="1.4" fill="rgba(255, 255, 255, 0.65)" />
        </pattern>
      </defs>

      <g fill="rgba(228, 168, 192, 0.42)">
        <circle cx="100" cy="100" r="87" />
        {scallops.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r="8.5" />
        ))}
      </g>
      <g fill={`url(#lace-${id})`}>
        <circle cx="100" cy="100" r="87" />
        {scallops.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r="8.5" />
        ))}
      </g>

      <circle cx="100" cy="100" r="77" fill="none" stroke="rgba(185, 111, 137, 0.5)" strokeWidth="1.4" strokeDasharray="1.5 5" />
      <circle cx="100" cy="100" r="55" fill="none" stroke="rgba(185, 111, 137, 0.32)" strokeWidth="1" />
      <g fill="rgba(255, 245, 233, 0.8)">
        {holes.map((h, i) => (
          <circle key={i} cx={h.x} cy={h.y} r="4.5" />
        ))}
      </g>
      <circle cx="100" cy="100" r="30" fill="none" stroke="rgba(185, 111, 137, 0.3)" strokeWidth="1" strokeDasharray="2 4" />
    </svg>
  );
};

export default Doily;

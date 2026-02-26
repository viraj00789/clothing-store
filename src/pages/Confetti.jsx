export function Confetti() {
  const pieces = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    // eslint-disable-next-line react-hooks/purity
    left: Math.random() * 100 + "vw",
    color: ["#FFD93D", "#FF6B6B", "#6BCB77", "#4D96FF", "#CC5DE8", "#FF922B"][
      i % 6
    ],
    // eslint-disable-next-line react-hooks/purity
    delay: Math.random() * 1.5 + "s",
    // eslint-disable-next-line react-hooks/purity
    duration: 2 + Math.random() * 2 + "s",
    // eslint-disable-next-line react-hooks/purity
    size: 6 + Math.random() * 10 + "px",
  }));

  return (
    <>
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: p.left,
            top: 0,
            width: p.size,
            height: p.size,
            background: p.color,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}
    </>
  );
}

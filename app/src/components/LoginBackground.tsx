export default function LoginBackground() {
  const base: React.CSSProperties = {
    position: "absolute",
    width: 162,
    height: 162,
    borderRadius: 30,
    background: "#F5EDFF",
    filter: "blur(40px)",
    transform: "rotate(-40.33deg)",
  };

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <span style={{ ...base, top: 40, right: -60 }} />
      <span style={{ ...base, top: -100, left: -100 }} />
      <span style={{ ...base, bottom: -100, left: 130 }} />
    </div>
  );
}

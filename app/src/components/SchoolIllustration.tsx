export default function SchoolIllustration() {
  return (
    <svg viewBox="0 0 400 220" className="w-full" aria-hidden>
      <rect x="0" y="180" width="400" height="40" fill="var(--color-bg-canvas)" />
      <ellipse cx="70" cy="188" rx="34" ry="10" fill="#F3D9D6" opacity="0.6" />
      <ellipse cx="330" cy="190" rx="30" ry="9" fill="#F3D9D6" opacity="0.6" />

      {/* trees */}
      <g opacity="0.55">
        <rect x="40" y="140" width="6" height="45" fill="#B8A99A" />
        <circle cx="43" cy="130" r="26" fill="#E8B4AE" />
        <rect x="352" y="150" width="6" height="35" fill="#B8A99A" />
        <circle cx="355" cy="140" r="20" fill="#EFC8C2" />
      </g>

    </svg>
  );
}

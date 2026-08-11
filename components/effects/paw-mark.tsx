export function PawMark({ className = "" }: { className?: string }) {
  return (
    <span className={`nido-paw ${className}`.trim()} aria-hidden="true">
      <span className="nido-paw__toe is-one" />
      <span className="nido-paw__toe is-two" />
      <span className="nido-paw__toe is-three" />
      <span className="nido-paw__toe is-four" />
      <span className="nido-paw__pad" />
    </span>
  );
}

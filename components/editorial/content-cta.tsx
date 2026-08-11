import Link from "next/link";

export function ContentCta({ href, label }: { href: string; label: string }) {
  const content = (
    <>
      <span>Un siguiente paso, cuando tenga sentido</span>
      <strong>{label}</strong>
      <i aria-hidden="true">→</i>
    </>
  );

  if (href.startsWith("/")) {
    return <Link className="content-cta" href={href}>{content}</Link>;
  }
  return <a className="content-cta" href={href} target="_blank" rel="noopener noreferrer">{content}</a>;
}

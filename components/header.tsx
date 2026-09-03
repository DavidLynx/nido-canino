"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const primaryLinks = [
  { href: "/#top", label: "Inicio" },
  { href: "/services", label: "Servicios" },
  { href: "/gallery", label: "Galería" },
] as const;

const overflowLinks = [
  { href: "/request", label: "Solicitar cotización" },
  { href: "/blog", label: "Blog" },
  { href: "/resources", label: "Recursos" },
] as const;

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const overflowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!overflowRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const isActive = (href: string) =>
    href === "/#top" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link className="brand" href="/">
          <Image
            src="/assets/logo/NIDO-FULL.svg"
            alt="Nido Canino"
            width={1006}
            height={512}
            priority
          />
          <span className="sr-only">Nido Canino</span>
        </Link>

        <nav className="nav-links" aria-label="Navegación principal">
          {primaryLinks.map((link) => {
            // Native anchors scroll again even when /#top is already the current URL.
            const NavLink = link.href === "/#top" ? "a" : Link;
            return <NavLink
              className={isActive(link.href) ? "active" : undefined}
              href={link.href}
              key={link.href}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </NavLink>;
          })}

          <span id="authSlot" aria-live="polite" />

          <div className={`nav-overflow${isOpen ? " is-open" : ""}`} ref={overflowRef}>
            <button
              className="nav-menu-toggle"
              type="button"
              aria-expanded={isOpen}
              aria-controls="mobileNavMenu"
              aria-label={isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
              onClick={() => setIsOpen((current) => !current)}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>
            <div className="nav-menu" id="mobileNavMenu">
              {overflowLinks.map((link) => (
                <Link
                  className={isActive(link.href) ? "active" : undefined}
                  href={link.href}
                  key={link.href}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

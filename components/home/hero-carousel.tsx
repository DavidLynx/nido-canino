"use client";

import type { FocusEvent, PointerEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";

const SLIDE_INTERVAL = 20_000;
const FADE_DURATION = 1_450;

const heroSlides = [
  {
    src: "/assets/photos/HERO-CARE.png",
    alt: "Perros descansando en distintos espacios de Nido Canino mientras reciben supervisión cercana",
  },
  {
    src: "/assets/photos/GUIDED-PLAY.png",
    alt: "Convivencia guiada con varios perros en el espacio interior de Nido Canino",
  },
  {
    src: "/assets/photos/REST-AREA.png",
    alt: "Perros descansando con calma en una zona tranquila de Nido Canino",
  },
  {
    src: "/assets/photos/SENIOR-CARE.png",
    alt: "Acompañamiento cercano a un perro senior durante un momento de descanso",
  },
  {
    src: "/assets/photos/FEEDING-AREA.png",
    alt: "Rutina organizada de alimentación para un grupo pequeño de perros en Nido Canino",
  },
] as const;

export function HeroCarousel() {
  const [mountTarget, setMountTarget] = useState<HTMLElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [cycle, setCycle] = useState(0);
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const swipeStartX = useRef<number | null>(null);

  useEffect(() => {
    const target = document.querySelector<HTMLElement>(".home-hero .nido-hero-media");
    const fallbackImage = target?.querySelector<HTMLImageElement>(":scope > img");
    if (!target) return;

    target.classList.add("has-nido-carousel");
    fallbackImage?.setAttribute("aria-hidden", "true");
    const mountFrame = window.requestAnimationFrame(() => setMountTarget(target));

    return () => {
      window.cancelAnimationFrame(mountFrame);
      target.classList.remove("has-nido-carousel");
      fallbackImage?.removeAttribute("aria-hidden");
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(media.matches);
    updatePreference();
    media.addEventListener("change", updatePreference);
    return () => media.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const onVisibilityChange = () => {
      const visible = document.visibilityState === "visible";
      setIsPageVisible(visible);
      if (visible) setCycle((value) => value + 1);
    };
    onVisibilityChange();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  useEffect(() => () => {
    if (transitionTimer.current) clearTimeout(transitionTimer.current);
  }, []);

  const goTo = useCallback((requestedIndex: number, manual = true) => {
    setCurrentIndex((current) => {
      const next = (requestedIndex + heroSlides.length) % heroSlides.length;
      if (next === current) return current;

      setPreviousIndex(current);
      if (transitionTimer.current) clearTimeout(transitionTimer.current);
      transitionTimer.current = setTimeout(() => setPreviousIndex(null), FADE_DURATION);
      return next;
    });
    if (manual) setCycle((value) => value + 1);
  }, []);

  useEffect(() => {
    if (isPaused || !isPageVisible || reducedMotion) return;
    const autoplay = window.setTimeout(
      () => goTo(currentIndex + 1, false),
      SLIDE_INTERVAL,
    );
    return () => window.clearTimeout(autoplay);
  }, [currentIndex, cycle, goTo, isPageVisible, isPaused, reducedMotion]);

  const resumeAutoplay = () => {
    setIsPaused(false);
    setCycle((value) => value + 1);
  };

  const onBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) resumeAutoplay();
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") swipeStartX.current = event.clientX;
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "touch" || swipeStartX.current === null) return;
    const distance = event.clientX - swipeStartX.current;
    swipeStartX.current = null;
    if (Math.abs(distance) < 46) return;
    goTo(currentIndex + (distance < 0 ? 1 : -1));
  };

  if (!mountTarget) return null;

  const nextIndex = (currentIndex + 1) % heroSlides.length;

  return createPortal(
    <div
      className={`home-hero-carousel${isPaused ? " is-paused" : ""}`}
      aria-roledescription="carrusel"
      aria-label="Momentos reales de Nido Canino"
      onPointerEnter={() => setIsPaused(true)}
      onPointerLeave={resumeAutoplay}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={onBlur}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <div className="home-hero-carousel__slides">
        {heroSlides.map((slide, index) => {
          const shouldRender = index === currentIndex || index === previousIndex || index === nextIndex;
          if (!shouldRender) return null;

          const stateClass = index === currentIndex
            ? "is-active"
            : index === previousIndex
              ? "is-previous"
              : "is-next";

          return (
            <div
              className={`home-hero-carousel__slide ${stateClass}`}
              aria-hidden={index !== currentIndex}
              key={slide.src}
            >
              <Image
                src={slide.src}
                alt={index === currentIndex ? slide.alt : ""}
                fill
                priority={index === 0}
                loading={index === 0 ? undefined : "lazy"}
                sizes="(max-width: 1100px) 100vw, 44vw"
              />
            </div>
          );
        })}
      </div>

      <div className="home-hero-carousel__controls">
        <button
          className="home-hero-carousel__arrow is-previous"
          type="button"
          aria-label="Mostrar fotografía anterior"
          onClick={() => goTo(currentIndex - 1)}
        >
          <span aria-hidden="true">←</span>
        </button>

        <div className="home-hero-carousel__dots" aria-label="Seleccionar fotografía">
          {heroSlides.map((_, index) => (
            <button
              className={`home-hero-carousel__dot${index === currentIndex ? " is-active" : ""}`}
              type="button"
              aria-label={`Mostrar fotografía ${index + 1} de ${heroSlides.length}`}
              aria-current={index === currentIndex ? "true" : undefined}
              onClick={() => goTo(index)}
              key={index}
            >
              <span
                className="home-hero-carousel__progress"
                key={index === currentIndex ? `${currentIndex}-${cycle}` : index}
              />
            </button>
          ))}
        </div>

        <button
          className="home-hero-carousel__arrow is-next"
          type="button"
          aria-label="Mostrar fotografía siguiente"
          onClick={() => goTo(currentIndex + 1)}
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <p className="sr-only" aria-live="polite">
        Fotografía {currentIndex + 1} de {heroSlides.length}
      </p>
    </div>,
    mountTarget,
  );
}

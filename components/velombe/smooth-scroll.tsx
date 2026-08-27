"use client";

import { useEffect } from "react";

/**
 * Lenis-style inertial scrolling in ~90 lines instead of a dependency.
 *
 * Each template folder carries its own copy: the three are meant to lift out
 * of this repo independently, and a cross-template import is exactly the
 * thread that makes that impossible. The `instance` singleton is
 * module-scoped and only one template mounts per request, so the duplication
 * is inert at runtime.
 *
 * Swapping in real Lenis is a two-line change: drop the effect body and call
 * `new Lenis({ lerp: LERP })` with a rAF loop.
 *
 * Deliberate behaviours, all matching Lenis defaults:
 *  - Touch is left alone. Native momentum beats anything a rAF loop fakes,
 *    and hijacking it breaks pull-to-refresh.
 *  - `prefers-reduced-motion` disables it entirely.
 *  - Scroll that did not come from us (scrollbar drag, arrow keys,
 *    find-in-page, restore) resyncs the target instead of fighting it.
 */

const LERP = 0.09; // per-frame approach rate — lower is heavier
const WHEEL_MULTIPLIER = 1;
const LINE_HEIGHT = 16; // px per line, for deltaMode === 1
const SETTLE = 0.12; // px below which we snap and idle the loop

type Instance = { scrollTo: (top: number) => void };

let instance: Instance | null = null;

/** Animate to an element id through the active smooth-scroll instance. */
export function velombeScrollTo(hash: string, offset = 88) {
  const el = document.querySelector(hash);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;

  if (instance) {
    instance.scrollTo(top);
  } else {
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;

    let target = window.scrollY;
    let current = target;
    let applied = target; // last offset WE wrote, to detect foreign scrolls
    let frame = 0;
    let running = false;

    const maxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    const clamp = (v: number) => Math.min(Math.max(v, 0), maxScroll());

    const tick = () => {
      const diff = target - current;

      if (Math.abs(diff) < SETTLE) {
        current = target;
        applied = current;
        window.scrollTo(0, current);
        running = false;
        return;
      }

      current += diff * LERP;
      applied = current;
      window.scrollTo(0, current);
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(tick);
    };

    const onWheel = (e: WheelEvent) => {
      // Let modifier-wheel (browser zoom) through untouched.
      if (e.ctrlKey || e.metaKey) return;
      e.preventDefault();

      const delta = e.deltaMode === 1 ? e.deltaY * LINE_HEIGHT : e.deltaY;
      target = clamp(target + delta * WHEEL_MULTIPLIER);
      start();
    };

    const onScroll = () => {
      if (Math.abs(window.scrollY - applied) > 2) {
        target = current = applied = window.scrollY;
      }
    };

    const onResize = () => {
      target = clamp(target);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    instance = {
      scrollTo: (top: number) => {
        target = clamp(top);
        start();
      },
    };

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      instance = null;
    };
  }, []);

  return null;
}

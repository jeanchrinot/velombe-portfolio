"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { AVAILABILITY, NAV_LINKS } from "./data";
import { VelombeLogo } from "./logo";
import { VelombeModeToggle } from "./mode-toggle";
import {
  anchorHandler,
  isHomePath,
  Magnetic,
  ShimmerButton,
  StatusDot,
  VELOMBE_SPRING,
} from "./primitives";
import { velombeScrollTo } from "./smooth-scroll";

export function VelombeNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The sheet locks the page; without this the body scrolls behind it on iOS.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape closes it. The X is the primary exit, but a full-screen overlay
  // with only one way out is a trap on any device with a keyboard attached.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-5">
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ...VELOMBE_SPRING, delay: 0.1 }}
        className={cn(
          // `relative z-50` is what makes the close button reachable. The
          // sheet below is `fixed z-40`; a positioned element paints above
          // non-positioned siblings whatever their z-index, so an unpositioned
          // pill sat UNDER its own overlay and every tap on the X hit the
          // sheet instead. There was no way out of the menu.
          "relative z-50 flex w-full max-w-3xl items-center justify-between gap-3 rounded-full border border-[var(--v-line)] py-2 pl-5 pr-2",
          "bg-[var(--v-surface)]/40 backdrop-blur-md",
          "transition-[background-color,box-shadow] duration-500",
          scrolled && "bg-[var(--v-surface)]/70 shadow-[0_8px_40px_-12px_var(--v-nav-shadow)]",
        )}
      >
        <Link
          href="/#top"
          onClick={anchorHandler("/#top")}
          className="flex items-center"
        >
          <VelombeLogo />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Magnetic strength={0.4}>
                <Link
                  href={link.href}
                  onClick={anchorHandler(link.href)}
                  className="v-heading block rounded-full px-3.5 py-1.5 text-[13px] font-medium text-[var(--v-muted)] transition-colors duration-300 hover:text-[var(--v-fg)]"
                >
                  {link.label}
                </Link>
              </Magnetic>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {/* A real page, not a hash — no anchorHandler needed. The
              availability signal this pill used to carry (dot + "Available")
              moved to the mobile sheet's footnote; this slot is a CTA now.
              White, not lime — same primary-CTA rule as everywhere else
              (see the accent budget in velombe.css): a lime button would
              spend most of the budget on one element in the nav. */}
          <ShimmerButton href="/hire" size="md" className="hidden sm:inline-flex">
            Hire me
            <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
          </ShimmerButton>

          <VelombeModeToggle />

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex size-9 items-center justify-center rounded-full border border-[var(--v-line)] text-[var(--v-muted)] transition-colors hover:text-[var(--v-fg)] md:hidden"
          >
            {open ? (
              <X className="size-4" strokeWidth={1.5} />
            ) : (
              <Menu className="size-4" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            // Tapping the empty space closes it too — the third exit, after
            // the X and Escape. Guarding on `currentTarget` keeps taps on the
            // links themselves from being swallowed here.
            onClick={(e) => {
              if (e.target === e.currentTarget) setOpen(false);
            }}
            className="fixed inset-0 top-0 z-40 bg-[var(--v-bg)]/95 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-1 px-8 pt-28">
              {[...NAV_LINKS, { label: "Hire me", href: "/hire" }].map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...VELOMBE_SPRING, delay: 0.05 + i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => {
                      // Release the scroll lock here rather than waiting for
                      // the effect: scrolling while `overflow: hidden` is
                      // still set is a no-op, and passive effects are not
                      // guaranteed to have flushed by the next frame. Closes
                      // the sheet either way — for a plain route ("/hire")
                      // this still lets Link navigate, it just shouldn't
                      // leave the menu open behind it.
                      document.body.style.overflow = "";
                      setOpen(false);
                      if (!link.href.includes("#") || !isHomePath(window.location.pathname)) {
                        return;
                      }
                      e.preventDefault();
                      velombeScrollTo(link.href.slice(link.href.indexOf("#")));
                    }}
                    className="v-display block border-b border-[var(--v-line-soft)] py-5 text-3xl text-[var(--v-fg)]"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <p className="v-heading flex items-center gap-2 px-8 pt-10 text-[11px] uppercase tracking-[0.16em] text-[var(--v-faint)]">
              <StatusDot className="text-[var(--v-accent)]" />
              {AVAILABILITY.detail}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

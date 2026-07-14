"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-asphalt/95 backdrop-blur-md border-b border-warm/10"
            : "bg-transparent"
        )}
      >
        <div className="container-x flex h-16 items-center justify-between lg:h-20">
          <Link
            href="/"
            aria-label={`${site.name} — accueil`}
            className="relative z-10 flex items-center gap-3"
          >
            <Logo className="h-8 w-auto" />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "font-mono text-[0.7rem] uppercase tracking-[0.18em] transition-colors duration-300",
                    active ? "text-hivis" : "text-warm/70 hover:text-warm"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={site.phoneHref}
              className="hidden font-mono text-xs tracking-[0.12em] text-warm/70 transition-colors hover:text-hivis md:block"
            >
              {site.phone}
            </a>
            <Link
              href="/soumission"
              className="hidden bg-hivis px-5 py-3 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-asphalt transition-colors hover:bg-warm sm:inline-block"
            >
              Soumission
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              className="relative z-[60] flex h-11 w-11 items-center justify-center lg:hidden"
            >
              <span className="sr-only">Menu</span>
              <div className="flex flex-col gap-[5px]">
                <span
                  className={cn(
                    "block h-[2px] w-6 bg-warm transition-all duration-300",
                    open && "translate-y-[7px] rotate-45"
                  )}
                />
                <span
                  className={cn(
                    "block h-[2px] w-6 bg-warm transition-all duration-300",
                    open && "opacity-0"
                  )}
                />
                <span
                  className={cn(
                    "block h-[2px] w-6 bg-warm transition-all duration-300",
                    open && "-translate-y-[7px] -rotate-45"
                  )}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col bg-asphalt tex-asphalt lg:hidden"
          >
            <nav className="mt-24 flex flex-1 flex-col justify-center gap-1 px-6">
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i + 0.1, ease: [0.16, 1, 0.3, 1] as const }}
                >
                  <Link
                    href={item.href}
                    className="display block border-b border-warm/10 py-4 text-4xl text-warm"
                  >
                    <span className="mr-3 font-mono text-xs align-middle text-hivis">
                      0{i + 1}
                    </span>
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="flex items-center justify-between gap-4 border-t border-warm/10 px-6 py-6">
              <a href={site.phoneHref} className="font-mono text-sm text-warm">
                {site.phone}
              </a>
              <Link
                href="/soumission"
                className="bg-hivis px-6 py-4 font-mono text-xs uppercase tracking-[0.18em] text-asphalt"
              >
                Soumission gratuite
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

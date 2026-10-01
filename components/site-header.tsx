"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation, profile } from "@/content/profile";
import { ThemeToggle } from "@/components/theme-toggle";

function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    if (!enabled) return;
    const sections = navigation
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => node !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [enabled]);

  return enabled ? active : "projects";
}

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const active = useActiveSection(isHome);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const mq = window.matchMedia("(min-width: 768px)");
    const onResize = () => mq.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onResize);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onResize);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 bg-paper transition-[border-color] duration-300 ${
        scrolled || open ? "border-b border-line" : "border-b border-transparent"
      }`}
    >
      <div className="shell flex h-16 items-center justify-between gap-6">
        <Link
          href="/#home"
          aria-label={`${profile.name}, home`}
          className="group flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <span
            aria-hidden="true"
            className="relative flex size-9 items-center justify-center rounded-[9px] bg-ink pb-1 font-serif text-xl italic leading-none text-paper transition-transform duration-300 group-hover:-rotate-3"
          >
            js
            <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-accent" />
          </span>
          {!isHome && (
            <span aria-hidden="true" className="hidden font-serif text-xl leading-none tracking-tight sm:inline md:hidden lg:inline">
              {profile.name}
            </span>
          )}
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => {
              const current = isHome && active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`/#${item.id}`}
                    aria-current={current ? "location" : undefined}
                    className={`relative rounded-full px-3 py-2 text-sm transition-colors ${
                      current ? "text-ink" : "text-ink-faint hover:text-ink"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3 -bottom-px h-px origin-left bg-accent transition-transform duration-500 ease-out-soft ${
                        current ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-full px-3 text-sm font-medium text-ink md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close" : "Menu"}
            <span aria-hidden="true" className="relative block h-2.5 w-4">
              <span
                className={`absolute left-0 h-px w-4 bg-current transition-transform duration-300 ${
                  open ? "top-1.25 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 h-px w-4 bg-current transition-transform duration-300 ${
                  open ? "top-1.25 -rotate-45" : "top-2.5"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto bg-paper md:hidden"
      >
        <nav aria-label="Primary mobile" className="shell flex min-h-full flex-col justify-between pb-10 pt-6">
          <ol className="divide-y divide-line border-y border-line">
            {navigation.map((item, index) => (
              <li key={item.id}>
                <a
                  href={`/#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between py-4"
                >
                  <span className="font-serif text-4xl tracking-tight">{item.label}</span>
                  <span className="text-sm text-green">{String(index + 1).padStart(2, "0")}</span>
                </a>
              </li>
            ))}
          </ol>
          <div className="mt-10 space-y-1 text-sm text-ink-soft">
            <a href={`mailto:${profile.email}`} className="block py-1 text-ink">
              {profile.email}
            </a>
            <p>{profile.location}</p>
          </div>
        </nav>
      </div>
    </header>
  );
}

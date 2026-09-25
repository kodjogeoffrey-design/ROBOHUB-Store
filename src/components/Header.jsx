import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cartStore";
import { getSettings } from "@/lib/settings";
import { assetUrl } from "@/lib/asset";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/shop" },
  { label: "Kits", path: "/shop?category=Kits" },
  { label: "Tutorials", path: "/tutorials" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const announcement = getSettings().announcement.trim();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      {/* Copper trace line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary to-transparent trace-line" />

      {/* Info announcement — the one moving banner, at the very top */}
      {announcement && (
        <div className="overflow-hidden border-b border-primary/30 bg-primary/10">
          <div className="ticker-track flex w-max gap-10 whitespace-nowrap py-1.5 font-mono-tech text-[10px] font-500 uppercase tracking-wider text-primary">
            {Array.from({ length: 4 }).map((_, k) => (
              <span key={k}>{announcement}</span>
            ))}
          </div>
        </div>
      )}

      <div className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
            <span className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-sm border border-primary/40">
              <img src={assetUrl("/images/robohub-logo.jpg")} alt="" className="h-full w-full object-cover" />
            </span>
            <span className="font-heading text-lg font-700 leading-none tracking-tight">
              ROBO<span className="text-primary">HUB</span>
              <span className="ml-1 align-top font-mono-tech text-[9px] font-500 text-muted-foreground">STORE</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.map((l) => (
              <NavLink
                key={l.path}
                to={l.path}
                className={({ isActive }) =>
                  `font-mono-tech text-xs font-500 uppercase tracking-wider transition-colors hover:text-primary ${
                    isActive && !l.path.includes("?") ? "text-primary" : "text-foreground/80"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/cart"
              className="relative grid h-10 w-10 place-items-center rounded-sm border border-border transition-colors hover:border-primary/60 solder-pulse"
              aria-label="Cart"
            >
              <ShoppingCart className="h-[18px] w-[18px]" />
              {count > 0 && (
                <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 font-mono-tech text-[10px] font-700 text-primary-foreground">
                  {count}
                </span>
              )}
            </Link>
            <button
              className="grid h-10 w-10 place-items-center rounded-sm border border-border md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="border-b border-border bg-card md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-4 py-2">
            {navLinks.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-3 font-mono-tech text-sm uppercase tracking-wider last:border-0"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

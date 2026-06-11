import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { company } from "@/data/company";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/industries", label: "Industries" },
  { to: "/case-studies", label: "Case Studies" },
  { to: "/our-process", label: "Our Process" },
  { to: "/insights", label: "Insights" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors",
        scrolled ? "bg-background/95 backdrop-blur border-border" : "bg-background/80 backdrop-blur border-transparent",
      )}
    >
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="font-serif text-xl font-semibold tracking-tight text-[var(--navy-deep)]">
          {company.short}
        </Link>
        <nav aria-label="Primary" className="hidden lg:flex items-center gap-7">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm text-foreground/80 hover:text-[var(--navy-deep)] transition-colors"
              activeProps={{ className: "text-[var(--navy-deep)] font-semibold" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-2">
          <Link to="/search" aria-label="Search" className="rounded-md p-2 hover:bg-muted">
            <Search className="h-4 w-4" />
          </Link>
          <Button asChild className="bg-[var(--navy-deep)] hover:bg-[var(--navy)] text-white">
            <Link to="/book-consultation">Book Consultation</Link>
          </Button>
        </div>
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="lg:hidden rounded-md p-2 hover:bg-muted"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav aria-label="Mobile" className="px-6 py-4 flex flex-col gap-1">
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to} className="rounded-md px-2 py-2 text-sm hover:bg-muted">
                {l.label}
              </Link>
            ))}
            <Link to="/faq" className="rounded-md px-2 py-2 text-sm hover:bg-muted">FAQ</Link>
            <Link to="/search" className="rounded-md px-2 py-2 text-sm hover:bg-muted">Search</Link>
            <Button asChild className="mt-2 bg-[var(--navy-deep)] hover:bg-[var(--navy)] text-white">
              <Link to="/book-consultation">Book Consultation</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}

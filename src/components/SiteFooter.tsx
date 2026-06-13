import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { company } from "@/data/company";
import { NewsletterForm } from "./forms/NewsletterForm";
import { useCookieConsent } from "./CookieConsent";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const { openPreferences } = useCookieConsent();
  return (
    <footer className="bg-[var(--navy-deep)] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          <div>
            <Link to="/" className="font-serif text-2xl font-semibold tracking-tight">
              {company.short}
            </Link>
            <p className="mt-4 text-sm text-white/70 max-w-xs">{company.description}</p>
            <div className="mt-6 space-y-2 text-sm text-white/80">
              <div className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-[var(--gold)]" /> {company.address}</div>
              <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-[var(--gold)]" /> {company.phone}</div>
              <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-[var(--gold)]" /> {company.email}</div>
            </div>
          </div>
          <div>
            <h3 className="font-serif text-sm uppercase tracking-wider text-white/60">Company</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-[var(--gold)]">About</Link></li>
              <li><Link to="/our-process" className="hover:text-[var(--gold)]">Our Process</Link></li>
              <li><Link to="/team" className="hover:text-[var(--gold)]">Team</Link></li>
              <li><Link to="/careers" className="hover:text-[var(--gold)]">Careers</Link></li>
              <li><Link to="/faq" className="hover:text-[var(--gold)]">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-[var(--gold)]">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-sm uppercase tracking-wider text-white/60">Explore</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/services" className="hover:text-[var(--gold)]">Services</Link></li>
              <li><Link to="/industries" className="hover:text-[var(--gold)]">Industries</Link></li>
              <li><Link to="/case-studies" className="hover:text-[var(--gold)]">Case Studies</Link></li>
              <li><Link to="/insights" className="hover:text-[var(--gold)]">Insights</Link></li>
              <li><Link to="/resources" className="hover:text-[var(--gold)]">Resources</Link></li>
              <li><Link to="/book-consultation" className="hover:text-[var(--gold)]">Book Consultation</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-sm uppercase tracking-wider text-white/60">Newsletter</h3>
            <p className="mt-4 text-sm text-white/70">Monthly insights for executives. No spam — unsubscribe anytime.</p>
            <div className="mt-4"><NewsletterForm variant="dark" /></div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-xs text-white/60">
          <p>© {year} {company.name}. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li><Link to="/privacy" className="hover:text-white">Privacy</Link></li>
            <li><Link to="/terms" className="hover:text-white">Terms</Link></li>
            <li><Link to="/cookie-policy" className="hover:text-white">Cookies</Link></li>
            <li><button type="button" onClick={openPreferences} className="cursor-pointer hover:text-white">Cookie Settings</button></li>
            <li><Link to="/accessibility" className="hover:text-white">Accessibility</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

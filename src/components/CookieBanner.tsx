import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { useCookieConsent } from "@/components/CookieConsent";

export function CookieBanner() {
  const { hasConsent, openPreferences, acceptAll, rejectNonEssential } = useCookieConsent();
  if (hasConsent) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-3 bottom-3 z-50 rounded-xl border border-border bg-background shadow-2xl md:left-auto md:right-6 md:max-w-md"
    >
      <div className="p-5">
        <p className="text-sm text-foreground">
          We use cookies to improve your experience, analyze traffic, and personalize content. See
          our{" "}
          <Link to="/cookie-policy" className="underline">
            Cookie Policy
          </Link>
          .
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button size="sm" onClick={acceptAll}>
            Accept All
          </Button>
          <Button size="sm" variant="outline" onClick={rejectNonEssential}>
            Reject Non-Essential
          </Button>
          <Button size="sm" variant="ghost" onClick={openPreferences}>
            Customize Preferences
          </Button>
        </div>
      </div>
    </div>
  );
}

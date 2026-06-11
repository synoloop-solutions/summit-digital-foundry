import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

const KEY = "sag:cookies";

export function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {}
  }, []);
  if (!show) return null;
  const set = (val: string) => {
    try { localStorage.setItem(KEY, JSON.stringify({ choice: val, ts: Date.now() })); } catch {}
    setShow(false);
  };
  return (
    <div role="region" aria-label="Cookie consent" className="fixed inset-x-3 bottom-3 z-50 rounded-xl border border-border bg-background shadow-2xl md:left-auto md:right-6 md:max-w-md">
      <div className="p-5">
        <p className="text-sm text-foreground">
          We use cookies to improve your experience, analyze traffic, and personalize content. See our{" "}
          <Link to="/cookie-policy" className="underline">Cookie Policy</Link>.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button size="sm" className="bg-[var(--navy-deep)] hover:bg-[var(--navy)] text-white" onClick={() => set("accept")}>Accept all</Button>
          <Button size="sm" variant="outline" onClick={() => set("reject")}>Reject non-essential</Button>
          <Button size="sm" variant="ghost" onClick={() => set("custom")}>Customize</Button>
        </div>
      </div>
    </div>
  );
}

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

const STORAGE_KEY = "sag:cookies";

export type CookiePreferences = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
  consentGiven: true;
  updatedAt: number;
};

type EditablePreferences = Pick<CookiePreferences, "analytics" | "marketing" | "preferences">;

type CookieConsentContextValue = {
  hasConsent: boolean;
  openPreferences: () => void;
  acceptAll: () => void;
  rejectNonEssential: () => void;
};

const defaults: EditablePreferences = {
  analytics: false,
  marketing: false,
  preferences: false,
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

function readPreferences(): CookiePreferences | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== "object") return null;
    const record = value as Record<string, unknown>;

    if (record.consentGiven === true) {
      return {
        necessary: true,
        analytics: record.analytics === true,
        marketing: record.marketing === true,
        preferences: record.preferences === true,
        consentGiven: true,
        updatedAt: typeof record.updatedAt === "number" ? record.updatedAt : Date.now(),
      };
    }

    if (record.choice === "accept" || record.choice === "reject") {
      const enabled = record.choice === "accept";
      return {
        necessary: true,
        analytics: enabled,
        marketing: enabled,
        preferences: enabled,
        consentGiven: true,
        updatedAt: typeof record.ts === "number" ? record.ts : Date.now(),
      };
    }
  } catch {
    return null;
  }
  return null;
}

function PreferenceRow({
  id,
  title,
  description,
  checked,
  disabled = false,
  onCheckedChange,
}: {
  id: string;
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-5 border-b border-border py-4 last:border-0">
      <div>
        <label htmlFor={id} className="text-sm font-semibold text-foreground">
          {title}
        </label>
        <p id={`${id}-description`} className="mt-1 text-sm text-muted-foreground">
          {description}
        </p>
      </div>
      <Switch
        id={id}
        checked={checked}
        disabled={disabled}
        onCheckedChange={onCheckedChange}
        aria-describedby={`${id}-description`}
        className="mt-0.5 min-h-6 min-w-11"
      />
    </div>
  );
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useState<CookiePreferences | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [draft, setDraft] = useState<EditablePreferences>(defaults);

  useEffect(() => {
    const stored = readPreferences();
    setSaved(stored);
    if (stored) {
      setDraft({
        analytics: stored.analytics,
        marketing: stored.marketing,
        preferences: stored.preferences,
      });
    }
    setHydrated(true);
  }, []);

  const persist = (next: EditablePreferences) => {
    const preferences: CookiePreferences = {
      necessary: true,
      ...next,
      consentGiven: true,
      updatedAt: Date.now(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch {
      // Consent remains active for this session if storage is unavailable.
    }
    setSaved(preferences);
    setDraft(next);
    setDialogOpen(false);
  };

  const acceptAll = () => persist({ analytics: true, marketing: true, preferences: true });
  const rejectNonEssential = () => persist(defaults);
  const openPreferences = () => {
    setDraft(
      saved
        ? {
            analytics: saved.analytics,
            marketing: saved.marketing,
            preferences: saved.preferences,
          }
        : defaults,
    );
    setDialogOpen(true);
  };

  const contextValue = useMemo(
    () => ({ hasConsent: !hydrated || saved !== null, openPreferences, acceptAll, rejectNonEssential }),
    [hydrated, saved],
  );

  return (
    <CookieConsentContext.Provider value={contextValue}>
      {children}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] overflow-y-auto sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Cookie Preferences</DialogTitle>
            <DialogDescription>
              Choose which optional cookies you allow. Necessary cookies are always enabled.
            </DialogDescription>
          </DialogHeader>

          <div className="divide-y divide-border" aria-label="Cookie categories">
            <PreferenceRow
              id="necessary-cookies"
              title="Necessary Cookies"
              description="Required for core site functionality and cannot be disabled."
              checked
              disabled
            />
            <PreferenceRow
              id="analytics-cookies"
              title="Analytics Cookies"
              description="Help us understand how visitors use the site."
              checked={draft.analytics}
              onCheckedChange={(analytics) => setDraft((current) => ({ ...current, analytics }))}
            />
            <PreferenceRow
              id="marketing-cookies"
              title="Marketing Cookies"
              description="Support relevant advertising and campaign measurement."
              checked={draft.marketing}
              onCheckedChange={(marketing) => setDraft((current) => ({ ...current, marketing }))}
            />
            <PreferenceRow
              id="preference-cookies"
              title="Preference Cookies"
              description="Remember choices that personalize your experience."
              checked={draft.preferences}
              onCheckedChange={(preferences) => setDraft((current) => ({ ...current, preferences }))}
            />
          </div>

          <DialogFooter className="gap-2 sm:flex-wrap sm:space-x-0">
            <Button type="button" variant="ghost" onClick={() => setDialogOpen(false)}>
              Close
            </Button>
            <Button type="button" variant="outline" onClick={rejectNonEssential}>
              Reject Non-Essential
            </Button>
            <Button type="button" variant="outline" onClick={acceptAll}>
              Accept All
            </Button>
            <Button type="button" onClick={() => persist(draft)}>
              Save Preferences
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) throw new Error("useCookieConsent must be used within CookieConsentProvider");
  return context;
}
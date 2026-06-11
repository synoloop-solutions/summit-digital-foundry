import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Check, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";
import { saveSubmission, downloadBlob } from "@/lib/storage";

const timeSlots = (() => {
  const out: string[] = [];
  for (let h = 9; h < 17; h++) for (const m of [0, 30]) out.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
  return out;
})();

const schema = z.object({
  name: z.string().min(2, "Enter your full name"),
  company: z.string().min(2, "Enter your company"),
  email: z.string().email("Enter a valid email"),
  service: z.string().min(1, "Choose a service"),
  date: z.date({ message: "Pick a date" }),
  time: z.string().min(1, "Pick a time"),
  notes: z.string().optional(),
});
type Values = z.infer<typeof schema>;

export function BookingForm() {
  const [success, setSuccess] = useState<null | { ref: string; values: Values }>(null);
  const form = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { service: "", time: "", notes: "" } });
  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = form;
  const date = watch("date");

  const onSubmit = (values: Values) => {
    const ref = "SAG-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    saveSubmission("bookings", { ...values, date: values.date.toISOString(), ref });
    setSuccess({ ref, values });
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const downloadIcs = () => {
    if (!success) return;
    const { values, ref } = success;
    const [h, m] = values.time.split(":").map(Number);
    const start = new Date(values.date); start.setHours(h, m, 0, 0);
    const end = new Date(start.getTime() + 30 * 60 * 1000);
    const fmt = (d: Date) => d.toISOString().replace(/[-:]|\.\d{3}/g, "");
    const ics = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Summit Advisory//EN", "BEGIN:VEVENT",
      `UID:${ref}@summitadvisory.example`, `DTSTAMP:${fmt(new Date())}`,
      `DTSTART:${fmt(start)}`, `DTEND:${fmt(end)}`,
      "SUMMARY:Summit Advisory consultation",
      `DESCRIPTION:Consultation with Summit Advisory Group. Reference ${ref}.`,
      "END:VEVENT", "END:VCALENDAR",
    ].join("\r\n");
    downloadBlob(`summit-consultation-${ref}.ics`, ics, "text/calendar");
  };

  if (success) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8">
        <Check className="h-10 w-10 text-[var(--gold)]" />
        <h2 className="mt-4 font-serif text-2xl text-[var(--navy-deep)]">Your consultation is booked.</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Reference <span className="font-mono">{success.ref}</span>. A Summit partner will confirm by email within one business day.
        </p>
        <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
          <Row k="Name" v={success.values.name} />
          <Row k="Company" v={success.values.company} />
          <Row k="Email" v={success.values.email} />
          <Row k="Service" v={services.find((s) => s.slug === success.values.service)?.name ?? success.values.service} />
          <Row k="Date" v={format(success.values.date, "PPP")} />
          <Row k="Time" v={success.values.time} />
        </dl>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button onClick={downloadIcs} className="bg-[var(--navy-deep)] hover:bg-[var(--navy)] text-white">
            <Download className="h-4 w-4" /> Add to calendar (.ics)
          </Button>
          <Button variant="outline" onClick={() => setSuccess(null)}>Book another</Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5 rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" id="b-name" error={errors.name?.message}>
          <Input id="b-name" autoComplete="name" {...register("name")} />
        </Field>
        <Field label="Company" id="b-company" error={errors.company?.message}>
          <Input id="b-company" autoComplete="organization" {...register("company")} />
        </Field>
      </div>
      <Field label="Work email" id="b-email" error={errors.email?.message}>
        <Input id="b-email" type="email" autoComplete="email" {...register("email")} />
      </Field>
      <Field label="Service of interest" id="b-service" error={errors.service?.message}>
        <Select value={watch("service")} onValueChange={(v) => setValue("service", v, { shouldValidate: true })}>
          <SelectTrigger id="b-service"><SelectValue placeholder="Select a service" /></SelectTrigger>
          <SelectContent>
            {services.map((s) => <SelectItem key={s.slug} value={s.slug}>{s.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Preferred date" id="b-date" error={errors.date?.message as string | undefined}>
          <Popover>
            <PopoverTrigger asChild>
              <Button id="b-date" type="button" variant="outline" className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
                <CalendarIcon className="h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(d) => d && setValue("date", d, { shouldValidate: true })}
                disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0)) || d.getDay() === 0 || d.getDay() === 6}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </Field>
        <Field label="Preferred time" id="b-time" error={errors.time?.message}>
          <Select value={watch("time")} onValueChange={(v) => setValue("time", v, { shouldValidate: true })}>
            <SelectTrigger id="b-time"><SelectValue placeholder="Select a time" /></SelectTrigger>
            <SelectContent>
              {timeSlots.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>
      </div>
      <Field label="Notes (optional)" id="b-notes">
        <Textarea id="b-notes" rows={4} placeholder="What would you like to focus on?" {...register("notes")} />
      </Field>
      <Button type="submit" disabled={isSubmitting} size="lg" className="w-full bg-[var(--navy-deep)] hover:bg-[var(--navy)] text-white">
        Confirm consultation
      </Button>
      <p className="text-xs text-muted-foreground">By submitting, you agree to our privacy policy. No payment required.</p>
    </form>
  );
}

function Field({ label, id, error, children }: { label: string; id: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && <p role="alert" className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-md border border-border px-3 py-2">
      <dt className="text-xs uppercase tracking-wide text-muted-foreground">{k}</dt>
      <dd className="mt-0.5 text-sm text-foreground">{v}</dd>
    </div>
  );
}

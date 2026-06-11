import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { services } from "@/data/services";
import { saveSubmission } from "@/lib/storage";
import { Check } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Enter your full name"),
  company: z.string().min(2, "Enter your company"),
  email: z.string().email("Enter a valid email"),
  service: z.string().min(1, "Pick a service"),
  message: z.string().min(10, "A few more details, please"),
});
type Values = z.infer<typeof schema>;

export function ContactForm() {
  const [done, setDone] = useState(false);
  const form = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { service: "" } });
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, watch } = form;

  if (done) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center">
        <Check className="mx-auto h-10 w-10 text-[var(--gold)]" />
        <h3 className="mt-4 font-serif text-xl">Thank you — we'll be in touch.</h3>
        <p className="mt-2 text-sm text-muted-foreground">A Summit partner will respond within one business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit((v) => { saveSubmission("contact", v); setDone(true); })} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" id="name" error={errors.name?.message}>
          <Input id="name" autoComplete="name" {...register("name")} />
        </Field>
        <Field label="Company" id="company" error={errors.company?.message}>
          <Input id="company" autoComplete="organization" {...register("company")} />
        </Field>
      </div>
      <Field label="Work email" id="email" error={errors.email?.message}>
        <Input id="email" type="email" autoComplete="email" {...register("email")} />
      </Field>
      <Field label="Service of interest" id="service" error={errors.service?.message}>
        <Select value={watch("service")} onValueChange={(v) => setValue("service", v, { shouldValidate: true })}>
          <SelectTrigger id="service"><SelectValue placeholder="Select a service" /></SelectTrigger>
          <SelectContent>
            {services.map((s) => <SelectItem key={s.slug} value={s.slug}>{s.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </Field>
      <Field label="How can we help?" id="message" error={errors.message?.message}>
        <Textarea id="message" rows={5} {...register("message")} />
      </Field>
      <Button type="submit" disabled={isSubmitting} className="bg-[var(--navy-deep)] hover:bg-[var(--navy)] text-white">
        Send message
      </Button>
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

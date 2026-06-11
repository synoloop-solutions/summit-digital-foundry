import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import { saveSubmission } from "@/lib/storage";

const schema = z.object({ email: z.string().email("Enter a valid email address") });
type Values = z.infer<typeof schema>;

export function NewsletterForm({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [done, setDone] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Values>({ resolver: zodResolver(schema) });
  const onSubmit = (values: Values) => { saveSubmission("newsletter", values); setDone(true); };
  if (done) {
    return (
      <p className={variant === "dark" ? "text-sm text-white inline-flex items-center gap-2" : "text-sm text-foreground inline-flex items-center gap-2"}>
        <Check className="h-4 w-4 text-[var(--gold)]" /> You're subscribed. Welcome aboard.
      </p>
    );
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-2 sm:flex-row">
      <label htmlFor="newsletter-email" className="sr-only">Email address</label>
      <Input
        id="newsletter-email"
        type="email"
        placeholder="you@company.com"
        autoComplete="email"
        aria-invalid={!!errors.email}
        className={variant === "dark" ? "bg-white/10 border-white/20 text-white placeholder:text-white/50" : ""}
        {...register("email")}
      />
      <Button type="submit" disabled={isSubmitting} className="bg-[var(--gold)] text-[var(--navy-deep)] hover:bg-[var(--gold)]/90">
        Subscribe
      </Button>
      {errors.email && <span role="alert" className={variant === "dark" ? "text-xs text-red-300" : "text-xs text-destructive"}>{errors.email.message}</span>}
    </form>
  );
}
